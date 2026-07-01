<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\Employee;
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
}
