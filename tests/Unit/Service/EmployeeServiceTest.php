<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\WorkSchedule;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\EmployeeDeletionService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\ValidationException;
use OCA\WorkTime\Service\WorkScheduleService;
use OCP\IL10N;
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
    private EmployeeDeletionService $deletionService;
    private AuditLogService $auditLogService;
    private IUserManager $userManager;
    private LoggerInterface $logger;

    protected function setUp(): void {
        $this->employeeMapper = $this->createMock(EmployeeMapper::class);
        $this->workScheduleMapper = $this->createMock(WorkScheduleMapper::class);
        $this->workScheduleService = $this->createMock(WorkScheduleService::class);
        $this->auditLogService = $this->createMock(AuditLogService::class);
        $this->deletionService = $this->createMock(EmployeeDeletionService::class);
        $this->userManager = $this->createMock(IUserManager::class);
        $this->logger = $this->createMock(LoggerInterface::class);
        $l = $this->createMock(IL10N::class);
        $l->method('t')->willReturnCallback(fn (string $t, array $p = []): string => $p === [] ? $t : vsprintf($t, $p));

        $this->service = new EmployeeService(
            $this->employeeMapper,
            $this->workScheduleMapper,
            $this->workScheduleService,
            $this->auditLogService,
            $this->deletionService,
            $this->userManager,
            $this->logger,
            $l,
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
        $this->workScheduleService->method('getDisplaySchedule')
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
        $this->workScheduleService->method('getDisplaySchedule')
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
        // find() enriches via withActiveSchedule(); without this stub the mocked
        // schedule returns null and the entity setter throws a TypeError before
        // the validation under test is ever reached.
        $this->workScheduleService->method('getDisplaySchedule')
            ->willReturn($this->makeSchedule(8.0, 30));
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
        $this->workScheduleService->method('getDisplaySchedule')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->method('update')->willReturnArgument(0);

        $result = $this->service->reactivate(3, 'admin');

        $this->assertSame(1, $result->getIsActive());
        $this->assertNull($result->getLockedReason());
    }

    // ---------------------------------------------------------------------
    // #497: resting_from / resting_until (Ruhend-Zeitraum)
    // ---------------------------------------------------------------------

    public function testSetRestingStoresProvidedRestingFromAndClearsUntil(): void {
        $employee = $this->makeEmployee(3, '40.00', 30);
        $employee->setRestingUntil(new DateTime('2026-01-01')); // stale, from a prior spell

        $this->employeeMapper->method('find')->willReturn($employee);
        $this->workScheduleService->method('getDisplaySchedule')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->method('findAllByDeputy')->willReturn([]);
        $this->employeeMapper->method('update')->willReturnArgument(0);

        $result = $this->service->setResting(3, null, 'admin', '2026-05-01');

        $this->assertSame('2026-05-01', $result->getRestingFrom()->format('Y-m-d'));
        $this->assertNull($result->getRestingUntil());
    }

    public function testSetRestingDefaultsRestingFromToTodayWhenNotProvided(): void {
        $employee = $this->makeEmployee(3, '40.00', 30);

        $this->employeeMapper->method('find')->willReturn($employee);
        $this->workScheduleService->method('getDisplaySchedule')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->method('findAllByDeputy')->willReturn([]);
        $this->employeeMapper->method('update')->willReturnArgument(0);

        $result = $this->service->setResting(3, null, 'admin');

        $this->assertSame((new DateTime('today'))->format('Y-m-d'), $result->getRestingFrom()->format('Y-m-d'));
    }

    public function testSetRestingRejectsMalformedRestingFrom(): void {
        $employee = $this->makeEmployee(3, '40.00', 30);

        $this->employeeMapper->method('find')->willReturn($employee);
        $this->workScheduleService->method('getDisplaySchedule')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->expects($this->never())->method('update');

        $this->expectException(ValidationException::class);
        $this->service->setResting(3, null, 'admin', '01.05.2026');
    }

    public function testReactivateStoresProvidedRestingUntil(): void {
        $employee = $this->makeEmployee(3, '40.00', 30);
        $employee->setIsActive(false);
        $employee->setRestingFrom(new DateTime('2026-05-01'));

        $this->employeeMapper->method('find')->willReturn($employee);
        $this->workScheduleService->method('getDisplaySchedule')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->method('update')->willReturnArgument(0);

        $result = $this->service->reactivate(3, 'admin', '2026-08-01');

        $this->assertSame('2026-08-01', $result->getRestingUntil()->format('Y-m-d'));
    }

    public function testReactivateRejectsRestingUntilBeforeRestingFrom(): void {
        $employee = $this->makeEmployee(3, '40.00', 30);
        $employee->setIsActive(false);
        $employee->setRestingFrom(new DateTime('2026-05-01'));

        $this->employeeMapper->method('find')->willReturn($employee);
        $this->workScheduleService->method('getDisplaySchedule')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->expects($this->never())->method('update');

        $this->expectException(ValidationException::class);
        $this->service->reactivate(3, 'admin', '2026-04-01');
    }

    public function testReactivateLeavesRestingUntilUntouchedWhenAlreadyClosed(): void {
        // Guards against a double reactivate() call overwriting an already-closed
        // spell's end date with a new one derived from "today".
        $employee = $this->makeEmployee(3, '40.00', 30);
        $employee->setIsActive(true);
        $employee->setRestingFrom(new DateTime('2026-05-01'));
        $employee->setRestingUntil(new DateTime('2026-06-01'));

        $this->employeeMapper->method('find')->willReturn($employee);
        $this->workScheduleService->method('getDisplaySchedule')
            ->willReturn($this->makeSchedule(8.0, 30));
        $this->employeeMapper->method('update')->willReturnArgument(0);

        $result = $this->service->reactivate(3, 'admin');

        $this->assertSame('2026-06-01', $result->getRestingUntil()->format('Y-m-d'));
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
        $this->workScheduleService->method('getDisplaySchedule')
            ->willReturn($this->makeSchedule(6.3, 28)); // 6.3 * 5 = 31.5

        $employee = $this->service->find(6);

        $this->assertSame(31.5, (float)$employee->getWeeklyHours());
        $this->assertSame(28, $employee->getVacationDays());
    }

    public function testFindIgnoresFutureProfileForOverview(): void {
        // Active profile today = 31.5h; a future-dated 40h profile must not leak
        // into the overview. getDisplaySchedule returns the active one.
        $this->employeeMapper->method('find')
            ->willReturn($this->makeEmployee(6, '40.00', 30));
        $this->workScheduleService->method('getDisplaySchedule')
            ->with(6)
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
        $this->workScheduleService->method('getDisplaySchedule')->willReturn($this->makeSchedule(8.0, 30));

        $result = $this->service->updateMyDeputy('user2', 7);

        $this->assertSame(7, $result->getDeputyId());
    }

    public function testUpdateMyDeputyCanBeCleared(): void {
        $this->employeeMapper->method('findByUserId')->with('user2')->willReturn($this->makeEmployee(2, '40.00', 30));
        $this->employeeMapper->method('update')->willReturnArgument(0);
        $this->workScheduleService->method('getDisplaySchedule')->willReturn($this->makeSchedule(8.0, 30));

        $result = $this->service->updateMyDeputy('user2', null);

        $this->assertNull($result->getDeputyId());
    }

    public function testUpdateMyDeputyRejectsSelf(): void {
        $this->employeeMapper->method('findByUserId')->with('user2')->willReturn($this->makeEmployee(2, '40.00', 30));
        $this->workScheduleService->method('getDisplaySchedule')->willReturn($this->makeSchedule(8.0, 30));

        $this->expectException(\OCA\WorkTime\Service\ValidationException::class);
        $this->service->updateMyDeputy('user2', 2);
    }

    // ---------------------------------------------------------------------
    // #573: workingDaysPerWeek is owned by the profile day pattern
    // ---------------------------------------------------------------------

    /**
     * The initial work schedule must honour the requested working days per week
     * (#573): a 4-day week produces a Mon-Thu profile at weeklyHours / 4, not the
     * old hard-coded Mon-Fri at weeklyHours / 5.
     */
    public function testCreateInitialScheduleHonoursWorkingDaysPerWeek(): void {
        $this->employeeMapper->method('existsByUserId')->willReturn(false);
        $this->employeeMapper->method('insert')->willReturnCallback(
            function (Employee $e): Employee {
                $e->setId(9);
                return $e;
            }
        );

        $captured = null;
        $this->workScheduleMapper->method('insert')->willReturnCallback(
            function (WorkSchedule $s) use (&$captured): WorkSchedule {
                $captured = $s;
                return $s;
            }
        );

        // 30h across 4 days => 7.5h on Mon-Thu, nothing Fri-Sun.
        $this->service->create('user9', 'Nina', 'Vier', null, null, 30.0, 24, null, 'BY', null, 'admin', 4);

        $this->assertNotNull($captured, 'initial work schedule must be persisted');
        $this->assertSame(7.5, (float)$captured->getMonHours());
        $this->assertSame(7.5, (float)$captured->getTueHours());
        $this->assertSame(7.5, (float)$captured->getWedHours());
        $this->assertSame(7.5, (float)$captured->getThuHours());
        $this->assertSame(0.0, (float)$captured->getFriHours());
        $this->assertSame(0.0, (float)$captured->getSatHours());
        $this->assertSame(0.0, (float)$captured->getSunHours());
        $this->assertSame(4, $captured->getWorkingDaysPerWeek());
    }

    /**
     * #570: the department assignment is threaded through create() (append-last
     * parameter) and persisted on the employee, untouched by the schedule logic.
     */
    public function testCreatePersistsDepartmentId(): void {
        $this->employeeMapper->method('existsByUserId')->willReturn(false);
        $captured = null;
        $this->employeeMapper->method('insert')->willReturnCallback(
            function (Employee $e) use (&$captured): Employee {
                $captured = $e;
                $e->setId(11);
                return $e;
            }
        );

        // ... vacationDaysUsed, vacationTransferred, departmentId (last param).
        $this->service->create('user11', 'Dana', 'Abt', null, null, 40.0, 30, null, 'BY', null, 'admin', 5, null, false, 3);

        $this->assertNotNull($captured);
        $this->assertSame(3, $captured->getDepartmentId());
    }

    /**
     * A 5-day week keeps the previous Mon-Fri / weeklyHours-÷-5 behaviour
     * unchanged (regression guard for the default path).
     */
    public function testCreateInitialScheduleFiveDayWeekUnchanged(): void {
        $this->employeeMapper->method('existsByUserId')->willReturn(false);
        $this->employeeMapper->method('insert')->willReturnCallback(
            function (Employee $e): Employee {
                $e->setId(10);
                return $e;
            }
        );

        $captured = null;
        $this->workScheduleMapper->method('insert')->willReturnCallback(
            function (WorkSchedule $s) use (&$captured): WorkSchedule {
                $captured = $s;
                return $s;
            }
        );

        $this->service->create('user10', 'Erik', 'Fünf', null, null, 40.0, 30, null, 'BY', null, 'admin', 5);

        $this->assertNotNull($captured);
        $this->assertSame(8.0, (float)$captured->getMonHours());
        $this->assertSame(8.0, (float)$captured->getFriHours());
        $this->assertSame(0.0, (float)$captured->getSatHours());
        $this->assertSame(5, $captured->getWorkingDaysPerWeek());
    }

    /**
     * update() no longer accepts workingDaysPerWeek from the client (#573). The
     * value surfaced on the returned employee must come from the active profile's
     * day pattern (here 4 days), never a stale persisted entity value.
     */
    public function testUpdateDerivesWorkingDaysPerWeekFromProfile(): void {
        $employee = $this->makeEmployee(5, '30.00', 24);
        $employee->setWorkingDaysPerWeek(7); // stale value that must be ignored
        $this->employeeMapper->method('find')->willReturn($employee);
        $this->employeeMapper->method('update')->willReturnArgument(0);

        $fourDay = new WorkSchedule();
        $fourDay->setMonHours('7.50');
        $fourDay->setTueHours('7.50');
        $fourDay->setWedHours('7.50');
        $fourDay->setThuHours('7.50');
        $fourDay->setFriHours('0.00');
        $fourDay->setSatHours('0.00');
        $fourDay->setSunHours('0.00');
        $fourDay->setVacationDays(24);
        $this->workScheduleService->method('getDisplaySchedule')->willReturn($fourDay);

        $result = $this->service->update(5, 'Nina', 'Vier', null, null, null, 'BY', null, null, 'admin', null);

        $this->assertSame(4, $result->getWorkingDaysPerWeek());
    }
}
