<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\Holiday;
use OCA\WorkTime\Db\OvertimePayoutMapper;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\OvertimeCalculationService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use PHPUnit\Framework\TestCase;

/**
 * Covers the net overtime balance formula used by the payout guard (#426):
 * net = Σ monthly overtime (up to today) + carryover − already paid out.
 *
 * getMonthlyStats() itself is exercised by CompensatoryOvertimeTest and
 * ProportionalOvertimeTodayTest; here it is stubbed so the balance aggregation
 * (month loop, future-month cutoff, carryover, payout subtraction) is asserted
 * in isolation.
 */
class OvertimeCalculationServiceTest extends TestCase {

    private EmployeeService $employeeService;
    private TimeEntryService $timeEntryService;
    private AbsenceService $absenceService;
    private HolidayService $holidayService;
    private YearlyCarryoverService $carryoverService;
    private OvertimePayoutMapper $payoutMapper;

    /**
     * @param int $perMonthOvertime overtime minutes each month's stats reports
     */
    private function makeService(int $perMonthOvertime, string $today): OvertimeCalculationService {
        $this->employeeService = $this->createMock(EmployeeService::class);
        $this->timeEntryService = $this->createMock(TimeEntryService::class);
        $this->absenceService = $this->createMock(AbsenceService::class);
        $this->holidayService = $this->createMock(HolidayService::class);
        $this->carryoverService = $this->createMock(YearlyCarryoverService::class);
        $this->payoutMapper = $this->createMock(OvertimePayoutMapper::class);

        $employee = new Employee();
        $employee->setId(1);
        $employee->setFederalState('BY');
        $this->employeeService->method('find')->willReturn($employee);
        $this->timeEntryService->method('findByEmployeeAndMonth')->willReturn([]);
        $this->absenceService->method('findByEmployeeAndMonth')->willReturn([]);
        $this->holidayService->method('findByMonth')->willReturn([]);

        return new class(
            $this->createMock(WorkScheduleService::class),
            $this->carryoverService,
            $this->payoutMapper,
            $this->employeeService,
            $this->timeEntryService,
            $this->absenceService,
            $this->holidayService,
            $perMonthOvertime,
            $today,
        ) extends OvertimeCalculationService {
            public function __construct(
                WorkScheduleService $ws,
                YearlyCarryoverService $co,
                OvertimePayoutMapper $pm,
                EmployeeService $es,
                TimeEntryService $ts,
                AbsenceService $as,
                HolidayService $hs,
                private int $perMonthOvertime,
                private string $pinnedToday,
            ) {
                parent::__construct($ws, $co, $pm, $es, $ts, $as, $hs);
            }

            protected function currentDate(): DateTime {
                return new DateTime($this->pinnedToday);
            }

            public function getMonthlyStats(
                Employee $employee,
                int $year,
                int $month,
                array $timeEntries,
                array $absences,
                array $holidays
            ): array {
                return ['overtimeMinutes' => $this->perMonthOvertime];
            }
        };
    }

    public function testNetBalanceSumsMonthsPlusCarryoverMinusPaidOut(): void {
        // "today" = 2026-03-15 → months Jan/Feb/Mar accrue, April onward is skipped.
        $service = $this->makeService(perMonthOvertime: 100, today: '2026-03-15');
        $this->carryoverService->method('getOvertimeCarryoverMinutes')->willReturn(50);
        $this->payoutMapper->method('sumMinutesByEmployeeAndYear')->willReturn(120);

        // 3 × 100 + 50 − 120 = 230
        $this->assertSame(230, $service->getNetOvertimeMinutes(1, 2026));
    }

    public function testFutureMonthsAreExcludedFromBalance(): void {
        // "today" = 2026-01-10 → only January accrues.
        $service = $this->makeService(perMonthOvertime: 480, today: '2026-01-10');
        $this->carryoverService->method('getOvertimeCarryoverMinutes')->willReturn(0);
        $this->payoutMapper->method('sumMinutesByEmployeeAndYear')->willReturn(0);

        $this->assertSame(480, $service->getNetOvertimeMinutes(1, 2026));
    }

    public function testExistingPayoutsCanDriveBalanceNegative(): void {
        // Carryover 60, one month of 100 overtime, but 400 already paid out.
        $service = $this->makeService(perMonthOvertime: 100, today: '2026-01-10');
        $this->carryoverService->method('getOvertimeCarryoverMinutes')->willReturn(60);
        $this->payoutMapper->method('sumMinutesByEmployeeAndYear')->willReturn(400);

        // 100 + 60 − 400 = -240
        $this->assertSame(-240, $service->getNetOvertimeMinutes(1, 2026));
    }

    // ---------------------------------------------------------------------
    // #443 C: paid-absence credit must honour half-day holidays
    // ---------------------------------------------------------------------

    private function serviceWithDailyMinutes(int $dailyMinutes): OvertimeCalculationService {
        $ws = $this->createMock(WorkScheduleService::class);
        $ws->method('getDailyMinutesForDate')->willReturn($dailyMinutes);
        return new OvertimeCalculationService(
            $ws,
            $this->createMock(YearlyCarryoverService::class),
            $this->createMock(OvertimePayoutMapper::class),
            $this->createMock(EmployeeService::class),
            $this->createMock(TimeEntryService::class),
            $this->createMock(AbsenceService::class),
            $this->createMock(HolidayService::class),
        );
    }

    private function holiday(string $date, float $scope): Holiday {
        $h = new Holiday();
        $h->setDate(new DateTime($date));
        $h->setScopeValue($scope);
        return $h;
    }

    private function absenceMinutes(OvertimeCalculationService $s, float $absenceScope, array $holidays): int {
        $m = new \ReflectionMethod($s, 'calculateAbsenceMinutes');
        $m->setAccessible(true);
        // single day 2026-12-24, full-day paid absence over it
        return $m->invoke($s, 1, new DateTime('2026-12-24'), new DateTime('2026-12-24'), $absenceScope, $holidays);
    }

    public function testHalfDayHolidayCreditsRemainingHalfToPaidAbsence(): void {
        // 8h/day, full-day vacation over a half-holiday (scope 0.5): the reduced
        // 240-min target must be balanced by 240 credited absence minutes, not 0.
        $service = $this->serviceWithDailyMinutes(480);
        $this->assertSame(240, $this->absenceMinutes($service, 1.0, [$this->holiday('2026-12-24', 0.5)]));
    }

    public function testFullDayHolidayCreditsZero(): void {
        // Control: a full holiday (scope 1.0) still credits 0 (target is also 0).
        $service = $this->serviceWithDailyMinutes(480);
        $this->assertSame(0, $this->absenceMinutes($service, 1.0, [$this->holiday('2026-12-24', 1.0)]));
    }

    // ---------------------------------------------------------------------
    // #443 G: future-month display must weight absence days by scope
    // ---------------------------------------------------------------------

    private function futureMonthService(string $pinnedToday): OvertimeCalculationService {
        $ws = $this->createMock(WorkScheduleService::class);
        // Single-day ranges → 1 working day; whole-month call is irrelevant here.
        $ws->method('countWorkingDays')->willReturn(1.0);
        $ws->method('calculateTargetMinutes')->willReturn(480);

        return new class(
            $ws,
            $this->createMock(YearlyCarryoverService::class),
            $this->createMock(OvertimePayoutMapper::class),
            $this->createMock(EmployeeService::class),
            $this->createMock(TimeEntryService::class),
            $this->createMock(AbsenceService::class),
            $this->createMock(HolidayService::class),
            $pinnedToday,
        ) extends OvertimeCalculationService {
            public function __construct(
                WorkScheduleService $ws,
                YearlyCarryoverService $co,
                OvertimePayoutMapper $pm,
                EmployeeService $es,
                TimeEntryService $ts,
                AbsenceService $as,
                HolidayService $hs,
                private string $pinnedToday,
            ) {
                parent::__construct($ws, $co, $pm, $es, $ts, $as, $hs);
            }

            protected function currentDate(): DateTime {
                return new DateTime($this->pinnedToday);
            }
        };
    }

    public function testFutureMonthHalfDayAbsenceCountsAsHalf(): void {
        // "today" pinned before June 2026 → June is a future month. An approved
        // half-day (scope 0.5) absence must show as 0.5 days, not 1.0 (#443 G).
        $service = $this->futureMonthService('2026-01-01');

        $employee = new Employee();
        $employee->setId(1);

        $absence = new Absence();
        $absence->setStatus(Absence::STATUS_APPROVED);
        $absence->setScopeValue(0.5);
        $absence->setStartDate(new DateTime('2026-06-15'));
        $absence->setEndDate(new DateTime('2026-06-15'));

        $stats = $service->getMonthlyStats($employee, 2026, 6, [], [$absence], []);

        $this->assertTrue($stats['isFutureMonth']);
        $this->assertSame(0.5, $stats['paidAbsenceDays']);
        $this->assertSame(0.5, $stats['absenceDays']);
    }
}
