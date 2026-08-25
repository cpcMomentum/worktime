<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Notification;

use OCA\WorkTime\BackgroundJob\PushNotificationJob;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\ActivePunch;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCP\BackgroundJob\IJobList;
use OCP\Notification\IManager as INotificationManager;
use OCP\Notification\INotification;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Genehmigungs-Push wiring (#593 Phase B).
 *
 * The two "submitted" events must, besides the in-app notification, *queue* a
 * push job (never call APNs synchronously in the submit request). These tests
 * pin that the job is enqueued for exactly those events, carrying the resolved
 * supervisor and subject.
 */
class NotificationServiceTest extends TestCase {

	private INotificationManager $notificationManager;
	private EmployeeMapper $employeeMapper;
	private IJobList $jobList;
	private NotificationService $service;

	protected function setUp(): void {
		$this->notificationManager = $this->createMock(INotificationManager::class);
		$this->notificationManager->method('createNotification')
			->willReturn($this->createMock(INotification::class));

		$this->employeeMapper = $this->createMock(EmployeeMapper::class);
		$this->jobList = $this->createMock(IJobList::class);

		$this->service = new NotificationService(
			$this->notificationManager,
			$this->employeeMapper,
			$this->createMock(LoggerInterface::class),
			$this->jobList,
		);
	}

	private function stubEmployeeAndSupervisor(): void {
		$employee = new Employee();
		$employee->setId(1);
		$employee->setFirstName('Erika');
		$employee->setLastName('Muster');
		$employee->setUserId('erika');
		$employee->setSupervisorId(2);

		$supervisor = new Employee();
		$supervisor->setId(2);
		$supervisor->setUserId('boss');

		$this->employeeMapper->method('find')->willReturnCallback(
			static function (int $id) use ($employee, $supervisor): Employee {
				return $id === 2 ? $supervisor : $employee;
			}
		);
	}

	public function testAbsenceSubmittedQueuesPushForSupervisor(): void {
		$this->stubEmployeeAndSupervisor();
		$this->notificationManager->expects($this->once())->method('notify');

		$this->jobList->expects($this->once())
			->method('add')
			->with(
				PushNotificationJob::class,
				$this->callback(static function (array $arg): bool {
					return $arg['userId'] === 'boss'
						&& $arg['subject'] === 'absence_submitted'
						&& ($arg['params']['employeeName'] ?? null) === 'Erika Muster';
				})
			);

		$absence = new Absence();
		$absence->setId(99);
		$absence->setEmployeeId(1);
		$absence->setType(Absence::TYPE_VACATION);
		$absence->setStatus(Absence::STATUS_PENDING);
		$absence->setStartDate(new \DateTime('2026-08-01'));
		$absence->setEndDate(new \DateTime('2026-08-05'));

		$this->service->notifyAbsenceSubmitted($absence);
	}

	public function testTimeEntriesSubmittedQueuesPushForSupervisor(): void {
		$this->stubEmployeeAndSupervisor();
		$this->notificationManager->expects($this->once())->method('notify');

		$this->jobList->expects($this->once())
			->method('add')
			->with(
				PushNotificationJob::class,
				$this->callback(static function (array $arg): bool {
					return $arg['userId'] === 'boss'
						&& $arg['subject'] === 'time_entries_submitted'
						&& ($arg['params']['month'] ?? null) === 8
						&& ($arg['params']['year'] ?? null) === 2026;
				})
			);

		$this->service->notifyTimeEntriesSubmitted(1, 2026, 8);
	}

	public function testNoSupervisorMeansNoPushForTimeEntries(): void {
		$this->stubEmployeeWithoutSupervisor();

		$this->notificationManager->expects($this->never())->method('notify');
		$this->jobList->expects($this->never())->method('add');

		$this->service->notifyTimeEntriesSubmitted(1, 2026, 8);
	}

	public function testNoSupervisorMeansNoPushForAbsence(): void {
		$this->stubEmployeeWithoutSupervisor();

		$this->notificationManager->expects($this->never())->method('notify');
		$this->jobList->expects($this->never())->method('add');

		$absence = new Absence();
		$absence->setId(99);
		$absence->setEmployeeId(1);
		$absence->setType(Absence::TYPE_VACATION);
		$absence->setStatus(Absence::STATUS_PENDING);
		$absence->setStartDate(new \DateTime('2026-08-01'));
		$absence->setEndDate(new \DateTime('2026-08-05'));

		$this->service->notifyAbsenceSubmitted($absence);
	}

	public function testAbsenceApprovedQueuesPushForEmployee(): void {
		$employee = new Employee();
		$employee->setId(1);
		$employee->setUserId('erika');
		$this->employeeMapper->method('find')->willReturn($employee);
		$this->notificationManager->expects($this->once())->method('notify');

		$this->jobList->expects($this->once())
			->method('add')
			->with(
				PushNotificationJob::class,
				$this->callback(static function (array $arg): bool {
					return $arg['userId'] === 'erika'
						&& $arg['subject'] === 'absence_approved'
						&& ($arg['params']['typeName'] ?? null) === 'Urlaub';
				})
			);

		$absence = new Absence();
		$absence->setId(99);
		$absence->setEmployeeId(1);
		$absence->setType(Absence::TYPE_VACATION);
		$absence->setStatus(Absence::STATUS_APPROVED);
		$absence->setStartDate(new \DateTime('2026-08-01'));
		$absence->setEndDate(new \DateTime('2026-08-05'));

		$this->service->notifyAbsenceApproved($absence);
	}

	public function testPunchPauseReminderQueuesPushForEmployee(): void {
		$employee = new Employee();
		$employee->setId(7);
		$employee->setUserId('erika');
		$this->employeeMapper->method('find')->willReturn($employee);
		$this->notificationManager->expects($this->once())->method('notify');

		$this->jobList->expects($this->once())
			->method('add')
			->with(
				PushNotificationJob::class,
				$this->callback(static function (array $arg): bool {
					return $arg['userId'] === 'erika'
						&& $arg['subject'] === 'punch_pause_reminder'
						&& ($arg['params']['maxPause'] ?? null) === 60;
				})
			);

		$punch = new ActivePunch();
		$punch->setId(3);
		$punch->setEmployeeId(7);

		$this->service->notifyPunchPauseTooLong($punch, new \DateTime('2026-08-24 12:00:00'), 60);
	}

	public function testReopenedNotifiesInAppButQueuesNoPush(): void {
		$employee = new Employee();
		$employee->setId(1);
		$employee->setUserId('erika');
		$this->employeeMapper->method('find')->willReturn($employee);

		// In-app notification is sent, but reopened has no push rendering, so no
		// job is queued (avoids a no-op job insert).
		$this->notificationManager->expects($this->once())->method('notify');
		$this->jobList->expects($this->never())->method('add');

		$this->service->notifyTimeEntriesReopened(1, 2026, 8, 'Bitte korrigieren');
	}

	private function stubEmployeeWithoutSupervisor(): void {
		$employee = new Employee();
		$employee->setId(1);
		$employee->setFirstName('Erika');
		$employee->setLastName('Muster');
		$employee->setUserId('erika');
		$employee->setSupervisorId(null);
		$this->employeeMapper->method('find')->willReturn($employee);
	}
}
