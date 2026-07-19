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
use OCA\WorkTime\Service\ValidationException;
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

    /**
     * Putting an employee to rest must clear every deputy reference pointing at
     * them (#486): a resting deputy cannot approve anything, and leaving the
     * link would make colleagues believe they still have a stand-in.
     */
    public function testSetRestingClearsDeputyReferences(): void {
        $resting = $this->makeEmployee(3, '40.00', 30);
        $colleague = $this->makeEmployee(4, '40.00', 30);
        $colleague->setDeputyId(3);

        $this->employeeMapper->method('find')->willReturn($resting);
        $this->workScheduleService->method('getScheduleForDate')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->method('findAllByDeputy')->with(3)->willReturn([$colleague]);

        $updated = [];
        $this->employeeMapper->method('update')->willReturnCallback(
            function (Employee $e) use (&$updated): Employee {
                $updated[] = $e;
                return $e;
            }
        );

        $result = $this->service->setResting(3, 'Elternzeit', 'admin');

        $this->assertNull($colleague->getDeputyId(), 'deputy reference must be cleared');
        $this->assertSame(0, $result->getIsActive());
        $this->assertSame('Elternzeit', $result->getLockedReason());
        $this->assertContains($colleague, $updated);
    }

    public function testSetRestingNormalisesBlankReasonToNull(): void {
        $employee = $this->makeEmployee(3, '40.00', 30);
        $this->employeeMapper->method('find')->willReturn($employee);
        $this->workScheduleService->method('getScheduleForDate')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->method('findAllByDeputy')->willReturn([]);
        $this->employeeMapper->method('update')->willReturnArgument(0);

        $result = $this->service->setResting(3, '   ', 'admin');

        $this->assertNull($result->getLockedReason());
    }

    /**
     * A too-long reason must be rejected before any deputy reference is
     * cleared: otherwise a failed setResting() call would leave colleagues'
     * deputy links wiped while the employee itself stays active.
     */
    public function testSetRestingRejectsOverlongReasonBeforeClearingDeputies(): void {
        $resting = $this->makeEmployee(3, '40.00', 30);
        $colleague = $this->makeEmployee(4, '40.00', 30);
        $colleague->setDeputyId(3);

        $this->employeeMapper->method('find')->willReturn($resting);
        $this->employeeMapper->method('findAllByDeputy')->with(3)->willReturn([$colleague]);
        $this->employeeMapper->expects($this->never())->method('update');

        $this->expectException(ValidationException::class);
        $this->service->setResting(3, str_repeat('x', 501), 'admin');
    }

    public function testReactivateClearsLockedReason(): void {
        $employee = $this->makeEmployee(3, '40.00', 30);
        $employee->setIsActive(false);
        $employee->setLockedReason('Elternzeit');

        $this->employeeMapper->method('find')->willReturn($employee);
        $this->workScheduleService->method('getScheduleForDate')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->method('update')->willReturnArgument(0);

        $result = $this->service->reactivate(3, 'admin');

        $this->assertSame(1, $result->getIsActive());
        $this->assertNull($result->getLockedReason());
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
    // #343: self-service — each user sets their own deputy
    // ---------------------------------------------------------------------

    public function testUpdateMyDeputyPersistsDeputyId(): void {
        $this->employeeMapper->method('findByUserId')->with('user2')->willReturn($this->makeEmployee(2, '40.00', 30));
        $this->employeeMapper->method('update')->willReturnArgument(0);
        $this->workScheduleService->method('getScheduleForDate')->willReturn($this->makeSchedule(8.0, 30));

        $result = $this->service->updateMyDeputy('user2', 7);

        $this->assertSame(7, $result->getDeputyId());
    }

    public function testUpdateMyDeputyCanBeCleared(): void {
        $this->employeeMapper->method('findByUserId')->with('user2')->willReturn($this->makeEmployee(2, '40.00', 30));
        $this->employeeMapper->method('update')->willReturnArgument(0);
        $this->workScheduleService->method('getScheduleForDate')->willReturn($this->makeSchedule(8.0, 30));

        $result = $this->service->updateMyDeputy('user2', null);

        $this->assertNull($result->getDeputyId());
    }

    public function testUpdateMyDeputyRejectsSelf(): void {
        $this->employeeMapper->method('findByUserId')->with('user2')->willReturn($this->makeEmployee(2, '40.00', 30));
        $this->workScheduleService->method('getScheduleForDate')->willReturn($this->makeSchedule(8.0, 30));

        $this->expectException(\OCA\WorkTime\Service\ValidationException::class);
        $this->service->updateMyDeputy('user2', 2);
    }
}
