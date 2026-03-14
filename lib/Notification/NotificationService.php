<?php

declare(strict_types=1);

namespace OCA\WorkTime\Notification;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\EmployeeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\Notification\IManager as INotificationManager;
use Psr\Log\LoggerInterface;

class NotificationService {

	private const MONTH_NAMES = [
		1 => 'Januar', 2 => 'Februar', 3 => 'März',
		4 => 'April', 5 => 'Mai', 6 => 'Juni',
		7 => 'Juli', 8 => 'August', 9 => 'September',
		10 => 'Oktober', 11 => 'November', 12 => 'Dezember',
	];

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

	public function notifyTimeEntriesSubmitted(int $employeeId, int $year, int $month): void {
		try {
			$employee = $this->employeeMapper->find($employeeId);
			$supervisorUserId = $this->getSupervisorUserId($employee->getSupervisorId());
			if ($supervisorUserId === null) {
				return;
			}

			$monthYear = self::MONTH_NAMES[$month] . ' ' . $year;

			$notification = $this->createNotification('time_entries_submitted', $supervisorUserId, [
				'employeeName' => $employee->getFullName(),
				'monthYear' => $monthYear,
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

	private function sendTimeEntryDecisionNotification(int $employeeId, int $year, int $month, string $subject): void {
		try {
			$employee = $this->employeeMapper->find($employeeId);
			$monthYear = self::MONTH_NAMES[$month] . ' ' . $year;

			$notification = $this->createNotification($subject, $employee->getUserId(), [
				'monthYear' => $monthYear,
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

	private function createNotification(string $subject, string $userId, array $parameters = []): \OCP\Notification\INotification {
		$notification = $this->notificationManager->createNotification();
		$notification->setApp(Application::APP_ID);
		$notification->setUser($userId);
		$notification->setDateTime(new \DateTime());
		$notification->setSubject($subject, $parameters);

		return $notification;
	}
}
