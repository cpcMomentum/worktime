<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Notification;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\ActivePunch;
use OCA\WorkTime\Db\EmployeeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
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
	) {
	}

	public function notifyAbsenceSubmitted(Absence $absence): void {
		try {
			$employee = $this->employeeMapper->find($absence->getEmployeeId());
			$supervisorUserId = $this->getSupervisorUserId($employee->getSupervisorId());
			if ($supervisorUserId === null) {
				return;
			}

			$notification = $this->createNotification('absence_submitted', $supervisorUserId, [
				'employeeName' => $employee->getFullName(),
				'typeName' => $absence->getTypeName(),
				'startDate' => $absence->getStartDate()->format('d.m.'),
				'endDate' => $absence->getEndDate()->format('d.m.'),
			]);
			$notification->setObject('absence', (string)$absence->getId());

			$this->notificationManager->notify($notification);
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

			$notification = $this->createNotification('time_entries_submitted', $supervisorUserId, [
				'employeeName' => $employee->getFullName(),
				'month' => $month,
				'year' => $year,
			]);
			$notification->setObject('time_entry', $employeeId . '-' . $year . '-' . $month);

			$this->notificationManager->notify($notification);
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

			$notification = $this->createNotification($subject, $employee->getUserId(), [
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

	private function sendTimeEntryDecisionNotification(int $employeeId, int $year, int $month, string $subject, string $reason = ''): void {
		try {
			$employee = $this->employeeMapper->find($employeeId);

			$notification = $this->createNotification($subject, $employee->getUserId(), [
				'month' => $month,
				'year' => $year,
				'reason' => $reason,
			]);
			$notification->setObject('time_entry', $employeeId . '-' . $year . '-' . $month);

			$this->notificationManager->notify($notification);
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
