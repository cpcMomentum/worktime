<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Notification;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\BackgroundJob\PushNotificationJob;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\ActivePunch;
use OCA\WorkTime\Db\EmployeeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\BackgroundJob\IJobList;
use OCP\Notification\IManager as INotificationManager;
use Psr\Log\LoggerInterface;

/**
 * Notifications are created here but rendered in the Notifier, once per
 * recipient and in that recipient's language. Anything language-dependent
 * therefore has to travel as raw data (month, year) rather than as a
 * pre-rendered string — a German month name baked in here would reach an
 * English or Czech recipient unchanged (#537).
 */
class NotificationService {

	public function __construct(
		private INotificationManager $notificationManager,
		private EmployeeMapper $employeeMapper,
		private LoggerInterface $logger,
		private IJobList $jobList,
	) {
	}

	/**
	 * Queue the approval push so it runs on the next cron tick instead of
	 * blocking the submit request on APNs (#593 Phase B). Enqueuing is a fast DB
	 * insert; the actual HTTP/2 delivery happens in {@see PushNotificationJob}.
	 *
	 * @param array<string, mixed> $params the same subject parameters as the
	 *                                      in-app notification
	 */
	private function queuePush(string $userId, string $subject, array $params): void {
		// Only enqueue when the subject actually has a push rendering, so
		// in-app-only subjects (e.g. time_entries_reopened) don't insert a job
		// that would no-op in PushDelivery.
		if (!PushDelivery::supports($subject)) {
			return;
		}

		$this->jobList->add(PushNotificationJob::class, [
			'userId' => $userId,
			'subject' => $subject,
			'params' => $params,
		]);
	}

	public function notifyAbsenceSubmitted(Absence $absence): void {
		try {
			$employee = $this->employeeMapper->find($absence->getEmployeeId());
			$supervisorUserId = $this->getSupervisorUserId($employee->getSupervisorId());
			if ($supervisorUserId === null) {
				return;
			}

			$params = [
				'employeeName' => $employee->getFullName(),
				'typeName' => $absence->getTypeName(),
				'startDate' => $absence->getStartDate()->format('d.m.'),
				'endDate' => $absence->getEndDate()->format('d.m.'),
			];

			$notification = $this->createNotification('absence_submitted', $supervisorUserId, $params);
			$notification->setObject('absence', (string)$absence->getId());

			$this->notificationManager->notify($notification);

			// Phase B (#593): also push the supervisor, but out of the request path
			// via a queued job so a slow APNs endpoint can never stall the submit.
			$this->queuePush($supervisorUserId, 'absence_submitted', $params);
		} catch (\Throwable $e) {
			$this->logger->error('Failed to send absence_submitted notification', [
				'exception' => $e,
				'absenceId' => $absence->getId(),
			]);
		}
	}

	public function notifyAbsenceApproved(Absence $absence): void {
		$this->sendAbsenceDecisionNotification($absence, 'absence_approved');
	}

	public function notifyAbsenceRejected(Absence $absence): void {
		$this->sendAbsenceDecisionNotification($absence, 'absence_rejected');
	}

	public function notifyAbsenceInformational(Absence $absence): void {
		$this->sendSupervisorAbsenceNotification($absence, 'absence_informational');
	}

	public function notifyAbsenceCancelled(Absence $absence): void {
		$this->sendSupervisorAbsenceNotification($absence, 'absence_cancelled');
	}

	public function notifyTimeEntriesSubmitted(int $employeeId, int $year, int $month): void {
		try {
			$employee = $this->employeeMapper->find($employeeId);
			$supervisorUserId = $this->getSupervisorUserId($employee->getSupervisorId());
			if ($supervisorUserId === null) {
				return;
			}

			$params = [
				'employeeName' => $employee->getFullName(),
				'month' => $month,
				'year' => $year,
			];

			$notification = $this->createNotification('time_entries_submitted', $supervisorUserId, $params);
			$notification->setObject('time_entry', $employeeId . '-' . $year . '-' . $month);

			$this->notificationManager->notify($notification);

			// Phase B (#593): also push the supervisor, but out of the request path
			// via a queued job so a slow APNs endpoint can never stall the submit.
			$this->queuePush($supervisorUserId, 'time_entries_submitted', $params);
		} catch (\Throwable $e) {
			$this->logger->error('Failed to send time_entries_submitted notification', [
				'exception' => $e,
				'employeeId' => $employeeId,
			]);
		}
	}

	public function notifyTimeEntriesApproved(int $employeeId, int $year, int $month): void {
		$this->sendTimeEntryDecisionNotification($employeeId, $year, $month, 'time_entries_approved');
	}

	public function notifyTimeEntriesRejected(int $employeeId, int $year, int $month): void {
		$this->sendTimeEntryDecisionNotification($employeeId, $year, $month, 'time_entries_rejected');
	}

	public function notifyTimeEntriesReopened(int $employeeId, int $year, int $month, string $reason = ''): void {
		$this->sendTimeEntryDecisionNotification($employeeId, $year, $month, 'time_entries_reopened', $reason);
	}

	/**
	 * Tell the archive admin that automatic PDF archiving for a month failed
	 * permanently, instead of failing silently in the background (#323).
	 */
	public function notifyArchiveFailed(string $recipientUserId, int $employeeId, string $employeeName, int $year, int $month, string $error): void {
		try {
			$notification = $this->createNotification('archive_failed', $recipientUserId, [
				'employeeName' => $employeeName,
				'month' => $month,
				'year' => $year,
				'error' => $error,
			]);
			$notification->setObject('archive', $employeeId . '-' . $year . '-' . $month);

			$this->notificationManager->notify($notification);
		} catch (\Throwable $e) {
			$this->logger->error('Failed to send archive_failed notification', ['exception' => $e]);
		}
	}

	private function sendSupervisorAbsenceNotification(Absence $absence, string $subject): void {
		try {
			$employee = $this->employeeMapper->find($absence->getEmployeeId());
			$supervisorUserId = $this->getSupervisorUserId($employee->getSupervisorId());
			if ($supervisorUserId === null) {
				return;
			}

			$notification = $this->createNotification($subject, $supervisorUserId, [
				'employeeName' => $employee->getFullName(),
				'typeName' => $absence->getTypeName(),
				'startDate' => $absence->getStartDate()->format('d.m.'),
				'endDate' => $absence->getEndDate()->format('d.m.'),
			]);
			$notification->setObject('absence', (string)$absence->getId());

			$this->notificationManager->notify($notification);
		} catch (\Throwable $e) {
			$this->logger->error('Failed to send ' . $subject . ' notification', [
				'exception' => $e,
				'absenceId' => $absence->getId(),
			]);
		}
	}

	private function sendAbsenceDecisionNotification(Absence $absence, string $subject): void {
		try {
			$employee = $this->employeeMapper->find($absence->getEmployeeId());

			$params = [
				'typeName' => $absence->getTypeName(),
				'startDate' => $absence->getStartDate()->format('d.m.'),
				'endDate' => $absence->getEndDate()->format('d.m.'),
			];

			$notification = $this->createNotification($subject, $employee->getUserId(), $params);
			$notification->setObject('absence', (string)$absence->getId());

			$this->notificationManager->notify($notification);

			// Phase B/C (#593): mirror the decision to the employee's phone.
			$this->queuePush($employee->getUserId(), $subject, $params);
		} catch (\Throwable $e) {
			$this->logger->error('Failed to send ' . $subject . ' notification', [
				'exception' => $e,
				'absenceId' => $absence->getId(),
			]);
		}
	}

	private function sendTimeEntryDecisionNotification(int $employeeId, int $year, int $month, string $subject, string $reason = ''): void {
		try {
			$employee = $this->employeeMapper->find($employeeId);

			$params = [
				'month' => $month,
				'year' => $year,
				'reason' => $reason,
			];

			$notification = $this->createNotification($subject, $employee->getUserId(), $params);
			$notification->setObject('time_entry', $employeeId . '-' . $year . '-' . $month);

			$this->notificationManager->notify($notification);

			// Phase B/C (#593): mirror the decision to the employee's phone.
			$this->queuePush($employee->getUserId(), $subject, $params);
		} catch (\Throwable $e) {
			$this->logger->error('Failed to send ' . $subject . ' notification', [
				'exception' => $e,
				'employeeId' => $employeeId,
			]);
		}
	}

	private function getSupervisorUserId(?int $supervisorId): ?string {
		if ($supervisorId === null) {
			return null;
		}

		try {
			$supervisor = $this->employeeMapper->find($supervisorId);
			return $supervisor->getUserId();
		} catch (DoesNotExistException) {
			$this->logger->warning('Supervisor not found', ['supervisorId' => $supervisorId]);
			return null;
		}
	}

	/**
	 * Reminder (#588): a live break has been running too long. Sent to the
	 * employee themselves. The datetime is pinned to the threshold moment and the
	 * object to the punch id, so re-running the cron produces an identical
	 * notification that Nextcloud deduplicates instead of spamming.
	 */
	public function notifyPunchPauseTooLong(ActivePunch $punch, \DateTimeInterface $thresholdMoment, int $maxPauseMinutes): void {
		$userId = $this->getEmployeeUserId($punch->getEmployeeId());
		if ($userId === null) {
			return;
		}

		$notification = $this->notificationManager->createNotification();
		$notification->setApp(Application::APP_ID);
		$notification->setUser($userId);
		$notification->setDateTime(\DateTime::createFromInterface($thresholdMoment));
		$notification->setObject('wt_punch_pause', (string)$punch->getId());
		$notification->setSubject('punch_pause_reminder', ['maxPause' => $maxPauseMinutes]);

		$this->notificationManager->notify($notification);

		// Phase C (#593): the reminder job runs server-side, so also push it to
		// the employee's phone.
		$this->queuePush($userId, 'punch_pause_reminder', ['maxPause' => $maxPauseMinutes]);
	}

	/**
	 * Reminder (#588): the punch has been running past the daily threshold —
	 * likely a forgotten clock-out. Deterministic datetime/object as above.
	 */
	public function notifyPunchForgotClockOut(ActivePunch $punch, \DateTimeInterface $thresholdMoment, int $thresholdHours): void {
		$userId = $this->getEmployeeUserId($punch->getEmployeeId());
		if ($userId === null) {
			return;
		}

		$notification = $this->notificationManager->createNotification();
		$notification->setApp(Application::APP_ID);
		$notification->setUser($userId);
		$notification->setDateTime(\DateTime::createFromInterface($thresholdMoment));
		$notification->setObject('wt_punch_out', (string)$punch->getId());
		$notification->setSubject('punch_out_reminder', ['hours' => $thresholdHours]);

		$this->notificationManager->notify($notification);

		// Phase C (#593): the reminder job runs server-side, so also push it to
		// the employee's phone.
		$this->queuePush($userId, 'punch_out_reminder', ['hours' => $thresholdHours]);
	}

	/**
	 * The Nextcloud user id behind an employee, or null if the employee is gone
	 * or not linked to a user.
	 */
	private function getEmployeeUserId(int $employeeId): ?string {
		try {
			$userId = $this->employeeMapper->find($employeeId)->getUserId();
			return $userId !== '' ? $userId : null;
		} catch (DoesNotExistException $e) {
			return null;
		}
	}

	private function createNotification(string $subject, string $userId, array $parameters = []): \OCP\Notification\INotification {
		$notification = $this->notificationManager->createNotification();
		$notification->setApp(Application::APP_ID);
		$notification->setUser($userId);
		$notification->setDateTime(new \DateTime());
		$notification->setSubject($subject, $parameters);

		return $notification;
	}
}
