<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\WorkSchedule;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCP\IUserManager;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Regression coverage for issue #202: the employee overview must reflect the
 * work schedule that is active today, never a stale cache or a future-dated
 * profile. The work schedule is the single source of truth.
 */
class EmployeeServiceTest extends TestCase {

    private EmployeeService $service;
    private EmployeeMapper $employeeMapper;
    private WorkScheduleMapper $workScheduleMapper;
    private WorkScheduleService $workScheduleService;
    private AuditLogService $auditLogService;
    private IUserManager $userManager;
    private LoggerInterface $logger;

    protected function setUp(): void {
        $this->employeeMapper = $this->createMock(EmployeeMapper::class);
        $this->workScheduleMapper = $this->createMock(WorkScheduleMapper::class);
        $this->workScheduleService = $this->createMock(WorkScheduleService::class);
        $this->auditLogService = $this->createMock(AuditLogService::class);
        $this->userManager = $this->createMock(IUserManager::class);
        $this->logger = $this->createMock(LoggerInterface::class);

        $this->service = new EmployeeService(
            $this->employeeMapper,
            $this->workScheduleMapper,
            $this->workScheduleService,
            $this->auditLogService,
            $this->userManager,
            $this->logger,
        );
    }

    private function makeEmployee(int $id, string $weeklyHours, int $vacationDays): Employee {
        $employee = new Employee();
        $employee->setId($id);
        $employee->setUserId('user' . $id);
        $employee->setWeeklyHours($weeklyHours);
        $employee->setVacationDays($vacationDays);
        return $employee;
    }

    private function makeSchedule(float $dailyHours, int $vacationDays): WorkSchedule {
        $schedule = new WorkSchedule();
        $schedule->setMonHours(number_format($dailyHours, 2, '.', ''));
        $schedule->setTueHours(number_format($dailyHours, 2, '.', ''));
        $schedule->setWedHours(number_format($dailyHours, 2, '.', ''));
        $schedule->setThuHours(number_format($dailyHours, 2, '.', ''));
        $schedule->setFriHours(number_format($dailyHours, 2, '.', ''));
        $schedule->setSatHours('0.00');
        $schedule->setSunHours('0.00');
        $schedule->setVacationDays($vacationDays);
        return $schedule;
    }

    public function testCreateRejectsZeroWeeklyHours(): void {
        // weeklyHours = 0 would create a zero-hour initial schedule (0/5 per day),
        // which collapses every working-day/absence-day calculation to 0. Must be
        // blocked before any persistence happens.
        $this->employeeMapper->expects($this->never())->method('insert');
        $this->workScheduleMapper->expects($this->never())->method('insert');

        $this->expectException(\OCA\WorkTime\Service\ValidationException::class);
        $this->service->create('user42', 'Erika', 'Musterfrau', null, null, 0.0, 30, null, 'BY', null, 'admin');
    }

    public function testFindSurfacesActiveScheduleValuesOverStaleCache(): void {
        // Cache holds 40h / 30 days, but the schedule active today is 31.5h / 28 days.
        $this->employeeMapper->method('find')
            ->willReturn($this->makeEmployee(6, '40.00', 30));
        $this->workScheduleService->method('getScheduleForDate')
            ->willReturn($this->makeSchedule(6.3, 28)); // 6.3 * 5 = 31.5

        $employee = $this->service->find(6);

        $this->assertSame(31.5, (float)$employee->getWeeklyHours());
        $this->assertSame(28, $employee->getVacationDays());
    }

    public function testFindIgnoresFutureProfileForOverview(): void {
        // Active profile today = 31.5h; a future-dated 40h profile must not leak
        // into the overview. getScheduleForDate already returns the active one.
        $this->employeeMapper->method('find')
            ->willReturn($this->makeEmployee(6, '40.00', 30));
        $this->workScheduleService->method('getScheduleForDate')
            ->with(6, $this->isInstanceOf(DateTime::class))
            ->willReturn($this->makeSchedule(6.3, 28));

        $employee = $this->service->find(6);

        $this->assertSame(31.5, (float)$employee->getWeeklyHours());
    }

    public function testFindAllAppliesActiveScheduleToEachEmployeeViaBatchQuery(): void {
        $this->employeeMapper->method('findAll')->willReturn([
            $this->makeEmployee(1, '40.00', 30),
            $this->makeEmployee(2, '40.00', 30),
        ]);
        // A single batch query resolves the active schedule for every employee.
        $this->workScheduleMapper->expects($this->once())
            ->method('findActiveForEmployees')
            ->with([1, 2], $this->isInstanceOf(DateTime::class))
            ->willReturn([
                1 => $this->makeSchedule(6.3, 28),   // 31.5h
                2 => $this->makeSchedule(8.0, 30),    // 40h
            ]);

        $employees = $this->service->findAll();

        $this->assertSame(31.5, (float)$employees[0]->getWeeklyHours());
        $this->assertSame(28, $employees[0]->getVacationDays());
        $this->assertSame(40.0, (float)$employees[1]->getWeeklyHours());
        $this->assertSame(30, $employees[1]->getVacationDays());
    }

    public function testApplyActiveSchedulesEnrichesExternallyFetchedEmployees(): void {
        // Employees obtained via PermissionService (team view) must also be
        // enriched with the active schedule values.
        $this->workScheduleMapper->expects($this->once())
            ->method('findActiveForEmployees')
            ->with([3], $this->isInstanceOf(DateTime::class))
            ->willReturn([3 => $this->makeSchedule(6.3, 28)]);

        $result = $this->service->applyActiveSchedules([
            $this->makeEmployee(3, '40.00', 30),
        ]);

        $this->assertSame(31.5, (float)$result[0]->getWeeklyHours());
        $this->assertSame(28, $result[0]->getVacationDays());
    }

    // ---------------------------------------------------------------------
    // #343: deputy is persisted through the positional update() arg list
    // ---------------------------------------------------------------------

    public function testUpdatePersistsDeputyId(): void {
        $this->employeeMapper->method('find')->with(2)->willReturn($this->makeEmployee(2, '40.00', 30));
        $this->employeeMapper->method('update')->willReturnArgument(0);
        $this->workScheduleService->method('getScheduleForDate')->willReturn($this->makeSchedule(8.0, 30));

        $result = $this->service->update(
            2, 'Erika', 'Musterfrau', null, null,
            1, 'BY', null, null, true, 'admin', 5, 7
        );

        $this->assertSame(7, $result->getDeputyId());
    }

    public function testUpdateRejectsSelfDeputy(): void {
        $this->employeeMapper->method('find')->with(2)->willReturn($this->makeEmployee(2, '40.00', 30));
        $this->workScheduleService->method('getScheduleForDate')->willReturn($this->makeSchedule(8.0, 30));

        $this->expectException(\OCA\WorkTime\Service\ValidationException::class);
        $this->service->update(
            2, 'Erika', 'Musterfrau', null, null,
            null, 'BY', null, null, true, 'admin', 5, 2
        );
    }
}
