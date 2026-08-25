<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Notification;

use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCA\WorkTime\Notification\PushDelivery;
use OCP\Notification\IManager as INotificationManager;
use OCP\Notification\INotification;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Genehmigungs-Push wiring (#593 Phase B).
 *
 * The two "submitted" events must, in addition to the in-app notification, hand
 * the recipient and subject to PushDelivery. These tests pin that the push is
 * fired for exactly those events and reaches the resolved supervisor.
 */
class NotificationServiceTest extends TestCase {

	private INotificationManager $notificationManager;
	private EmployeeMapper $employeeMapper;
	private PushDelivery $pushDelivery;
	private NotificationService $service;

	protected function setUp(): void {
		$this->notificationManager = $this->createMock(INotificationManager::class);
		$this->notificationManager->method('createNotification')
			->willReturn($this->createMock(INotification::class));

		$this->employeeMapper = $this->createMock(EmployeeMapper::class);
		$this->pushDelivery = $this->createMock(PushDelivery::class);

		$this->service = new NotificationService(
			$this->notificationManager,
			$this->employeeMapper,
			$this->createMock(LoggerInterface::class),
			$this->pushDelivery,
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

	public function testAbsenceSubmittedAlsoPushesSupervisor(): void {
		$this->stubEmployeeAndSupervisor();
		$this->notificationManager->expects($this->once())->method('notify');

		$this->pushDelivery->expects($this->once())
			->method('send')
			->with(
				'boss',
				'absence_submitted',
				$this->callback(static fn (array $p): bool => ($p['employeeName'] ?? null) === 'Erika Muster')
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

	public function testTimeEntriesSubmittedAlsoPushesSupervisor(): void {
		$this->stubEmployeeAndSupervisor();
		$this->notificationManager->expects($this->once())->method('notify');

		$this->pushDelivery->expects($this->once())
			->method('send')
			->with(
				'boss',
				'time_entries_submitted',
				$this->callback(static fn (array $p): bool => ($p['month'] ?? null) === 8 && ($p['year'] ?? null) === 2026)
			);

		$this->service->notifyTimeEntriesSubmitted(1, 2026, 8);
	}

	public function testNoSupervisorMeansNoPush(): void {
		$employee = new Employee();
		$employee->setId(1);
		$employee->setFirstName('Erika');
		$employee->setLastName('Muster');
		$employee->setUserId('erika');
		$employee->setSupervisorId(null);
		$this->employeeMapper->method('find')->willReturn($employee);

		$this->notificationManager->expects($this->never())->method('notify');
		$this->pushDelivery->expects($this->never())->method('send');

		$this->service->notifyTimeEntriesSubmitted(1, 2026, 8);
	}
}
