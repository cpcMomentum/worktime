<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\Holiday;
use OCA\WorkTime\Db\OvertimePayoutMapper;
use OCA\WorkTime\Db\TimeEntry;

/**
 * Overtime / monthly-statistics engine (#426).
 *
 * Holds the Soll/Ist/overtime calculation that previously lived private in
 * ReportController. Extracted so the net overtime balance can be reused outside
 * the report endpoints — notably the server-side payout guard in
 * OvertimePayoutService::create().
 *
 * Depends only on lower-level services and the payout mapper (never the payout
 * service) so it can be injected into OvertimePayoutService without a cycle.
 */
class OvertimeCalculationService {

    public function __construct(
        private WorkScheduleService $workScheduleService,
        private YearlyCarryoverService $carryoverService,
        private OvertimePayoutMapper $payoutMapper,
        private EmployeeService $employeeService,
        private TimeEntryService $timeEntryService,
        private AbsenceService $absenceService,
        private HolidayService $holidayService,
    ) {
    }

    /**
     * Net overtime balance for an employee in a given year, in minutes:
     * sum of the monthly proportional overtime + carryover from previous years
     * − overtime already paid out in money (#401).
     *
     * This is the authoritative balance used by the payout guard: a new payout
     * of X minutes is only permissible while X does not exceed this value.
     */
    public function getNetOvertimeMinutes(int $employeeId, int $year): int {
        $employee = $this->employeeService->find($employeeId);

        $totalOvertime = 0;
        for ($month = 1; $month <= 12; $month++) {
            $startDate = new DateTime("$year-$month-01");

            // Skip future months (no overtime accrued yet).
            if ($startDate > $this->currentDate()) {
                break;
            }

            $timeEntries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
            $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
            $holidays = $this->holidayService->findByMonth($year, $month, $employee->getFederalState());

            $stats = $this->getMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);
            $totalOvertime += $stats['overtimeMinutes'];
        }

        $carryoverMinutes = $this->carryoverService->getOvertimeCarryoverMinutes($employeeId, $year);
        $paidOutMinutes = $this->payoutMapper->sumMinutesByEmployeeAndYear($employeeId, $year);

        return $totalOvertime + $carryoverMinutes - $paidOutMinutes;
    }

    /**
     * Returns the current date (today, time zeroed). Wrapped in a method so tests
     * can pin "today" to a fixed date and verify the proportional Soll/overtime logic.
     */
    protected function currentDate(): DateTime {
        return new DateTime('today');
    }

    /**
     * Whether the given day has activity that makes it count toward the proportional
     * Soll: a time entry on that day or an approved absence covering it.
     *
     * @param TimeEntry[] $timeEntries
     * @param Absence[] $absences
     */
    private function hasActivityOnDay(DateTime $day, array $timeEntries, array $absences): bool {
        $dayStr = $day->format('Y-m-d');
        foreach ($timeEntries as $entry) {
            $entryDate = $entry->getDate();
            if ($entryDate instanceof DateTime && $entryDate->format('Y-m-d') === $dayStr) {
                return true;
            }
        }
        foreach ($absences as $absence) {
            if ($absence->isApproved()
                && $absence->getStartDate() <= $day
                && $absence->getEndDate() >= $day) {
                return true;
            }
        }
        return false;
    }

    /**
     * Statistics for a custom [start, end] range (#102). Unlike the monthly
     * calculation there is no "until today" proportional logic: a custom-period
     * timesheet covers a fixed, user-chosen span, so Soll/Ist/Saldo are computed
     * over the whole range.
     *
     * @param TimeEntry[] $timeEntries
     * @param Absence[] $absences
     * @param Holiday[] $holidays
     * @return array<string, mixed>
     */
    public function getRangeStats(
        Employee $employee,
        DateTime $startDate,
        DateTime $endDate,
        array $timeEntries,
        array $absences,
        array $holidays
    ): array {
        $employeeId = $employee->getId();

        // Clip the range to the employment period.
        $entryDate = $employee->getEntryDate();
        $exitDate = $employee->getExitDate();
        if ($entryDate !== null && $startDate < $entryDate) {
            $startDate = clone $entryDate;
        }
        if ($exitDate !== null && $endDate > $exitDate) {
            $endDate = clone $exitDate;
        }

        $entryCount = count($timeEntries);
        if ($startDate > $endDate) {
            return [
                'workingDays' => 0, 'holidayCount' => count($holidays),
                'paidAbsenceDays' => 0, 'targetReductionDays' => 0, 'compensatoryDays' => 0,
                'absenceDays' => 0, 'adjustedTargetMinutes' => 0, 'actualMinutes' => 0,
                'overtimeMinutes' => 0, 'entryCount' => $entryCount,
            ];
        }

        $workingDays = $this->workScheduleService->countWorkingDays($employeeId, $startDate, $endDate, $holidays);
        $targetMinutes = $this->workScheduleService->calculateTargetMinutes($employeeId, $startDate, $endDate, $holidays);

        $targetReductionTypes = [Absence::TYPE_UNPAID];
        $overtimeConsumingTypes = [Absence::TYPE_COMPENSATORY];

        $paidAbsenceMinutes = 0;
        $paidAbsenceDays = 0;
        $targetReductionMinutes = 0;
        $targetReductionDays = 0;
        $compensatoryDays = 0;

        foreach ($absences as $absence) {
            if (!$absence->isApproved()) {
                continue;
            }
            $aStart = $absence->getStartDate() < $startDate ? $startDate : $absence->getStartDate();
            $aEnd = $absence->getEndDate() > $endDate ? $endDate : $absence->getEndDate();
            if ($aStart > $aEnd) {
                continue;
            }
            $scope = $absence->getScopeValue();
            $days = $this->workScheduleService->countWorkingDays($employeeId, $aStart, $aEnd, $holidays) * $scope;
            $minutes = $this->calculateAbsenceMinutes($employeeId, $aStart, $aEnd, $scope, $holidays);

            if (in_array($absence->getType(), $targetReductionTypes, true)) {
                $targetReductionDays += $days;
                $targetReductionMinutes += $minutes;
            } elseif (in_array($absence->getType(), $overtimeConsumingTypes, true)) {
                $compensatoryDays += $days;
            } else {
                $paidAbsenceDays += $days;
                $paidAbsenceMinutes += $minutes;
            }
        }

        $adjustedTargetMinutes = $targetMinutes - $targetReductionMinutes;

        $workedMinutes = 0;
        foreach ($timeEntries as $entry) {
            $workedMinutes += $entry->getWorkMinutes();
        }
        $actualMinutes = $workedMinutes + $paidAbsenceMinutes;
        $overtimeMinutes = $actualMinutes - $adjustedTargetMinutes;

        return [
            'workingDays' => $workingDays,
            'holidayCount' => count($holidays),
            'paidAbsenceDays' => $paidAbsenceDays,
            'targetReductionDays' => $targetReductionDays,
            'compensatoryDays' => $compensatoryDays,
            'absenceDays' => $paidAbsenceDays + $targetReductionDays + $compensatoryDays,
            'adjustedTargetMinutes' => $adjustedTargetMinutes,
            'actualMinutes' => $actualMinutes,
            'overtimeMinutes' => $overtimeMinutes,
            'entryCount' => $entryCount,
        ];
    }

    /**
     * @param TimeEntry[] $timeEntries
     * @param Absence[] $absences
     * @param Holiday[] $holidays
     * @return array<string, mixed>
     */
    public function getMonthlyStats(
        Employee $employee,
        int $year,
        int $month,
        array $timeEntries,
        array $absences,
        array $holidays
    ): array {
        $startDate = new DateTime("$year-$month-01");
        $monthEndDate = (clone $startDate)->modify('last day of this month');
        $today = $this->currentDate();
        $employeeId = $employee->getId();

        // Clip to employee's employment period
        $entryDate = $employee->getEntryDate();
        $exitDate = $employee->getExitDate();

        // Month entirely before employment start → return zeros
        if ($entryDate !== null && $monthEndDate < $entryDate) {
            return $this->zeroMonthStats(workingDaysOverride: 0);
        }

        // Month entirely after employment end → return zeros
        if ($exitDate !== null && $startDate > $exitDate) {
            return $this->zeroMonthStats(workingDaysOverride: 0);
        }

        // Clip start/end to employment period
        if ($entryDate !== null && $startDate < $entryDate) {
            $startDate = clone $entryDate;
        }
        if ($exitDate !== null && $monthEndDate > $exitDate) {
            $monthEndDate = clone $exitDate;
        }

        // Determine if this is a future month (hasn't started yet)
        $isFutureMonth = $startDate > $today;

        // For future months: return zeros for Soll/Ist/Überstunden
        if ($isFutureMonth) {
            $workingDaysMonth = $this->workScheduleService->countWorkingDays($employeeId, $startDate, $monthEndDate, $holidays);
            $monthlyTargetMinutes = $this->workScheduleService->calculateTargetMinutes($employeeId, $startDate, $monthEndDate, $holidays);

            // Count planned absences for display only
            $absenceDaysMonth = 0;
            foreach ($absences as $absence) {
                if ($absence->isApproved()) {
                    $absenceStart = $absence->getStartDate() < $startDate ? $startDate : $absence->getStartDate();
                    $absenceEnd = $absence->getEndDate() > $monthEndDate ? $monthEndDate : $absence->getEndDate();
                    $absenceDaysMonth += $this->workScheduleService->countWorkingDays($employeeId, $absenceStart, $absenceEnd, $holidays);
                }
            }

            // dailyMinutes approximation for display
            $dailyMinutes = $workingDaysMonth > 0 ? (int)round($monthlyTargetMinutes / $workingDaysMonth) : 0;

            return [
                'workingDays' => $workingDaysMonth,
                'workingDaysMonth' => $workingDaysMonth,
                'workingDaysUntilToday' => 0,
                'holidayCount' => count($holidays),
                'paidAbsenceDays' => $absenceDaysMonth,
                'targetReductionDays' => 0,
                'compensatoryDays' => 0,
                'absenceDays' => $absenceDaysMonth,
                'dailyMinutes' => $dailyMinutes,
                'targetMinutes' => 0,
                'monthlyTargetMinutes' => 0,
                'adjustedTargetMinutes' => 0,
                'adjustedMonthlyTargetMinutes' => 0,
                'workedMinutes' => 0,
                'workedHours' => 0,
                'paidAbsenceMinutes' => 0,
                'paidAbsenceHours' => 0,
                'actualMinutes' => 0,
                'actualHours' => 0,
                'overtimeMinutes' => 0,
                'overtimeHours' => 0,
                'entryCount' => 0,
                'isFutureMonth' => true,
            ];
        }

        // Determine if this is the current month
        $isCurrentMonth = $year === (int)$today->format('Y') && $month === (int)$today->format('n');

        // For "up to today" calculations.
        // The running day only counts toward the proportional Soll once it has activity
        // (a time entry today or an approved absence covering today). Without that,
        // today is excluded so the balance shows no spurious morning deficit.
        $endDateForActual = $monthEndDate;
        if ($isCurrentMonth && $today < $monthEndDate) {
            $endDateForActual = $this->hasActivityOnDay($today, $timeEntries, $absences)
                ? $today
                : (clone $today)->modify('-1 day');
        }

        // If today is excluded and it is the first (working) day of the month, the
        // "until today" range falls before the month start -> no proportional Soll yet.
        $hasProportionalRange = $endDateForActual >= $startDate;

        // Count working days using schedule-aware service
        $workingDaysMonth = $this->workScheduleService->countWorkingDays($employeeId, $startDate, $monthEndDate, $holidays);
        $workingDaysUntilToday = $hasProportionalRange
            ? $this->workScheduleService->countWorkingDays($employeeId, $startDate, $endDateForActual, $holidays)
            : 0.0;

        // Calculate target minutes using schedule-aware service
        $monthlyTargetMinutes = $this->workScheduleService->calculateTargetMinutes($employeeId, $startDate, $monthEndDate, $holidays);
        $proportionalTargetMinutes = $hasProportionalRange
            ? $this->workScheduleService->calculateTargetMinutes($employeeId, $startDate, $endDateForActual, $holidays)
            : 0;

        // dailyMinutes approximation for display
        $dailyMinutes = $workingDaysMonth > 0 ? (int)round($monthlyTargetMinutes / $workingDaysMonth) : 0;

        // Process absences: paid (credit Ist) vs. target-reducing (Soll) vs. compensatory.
        $paidAbsenceMinutesMonth = 0;
        $paidAbsenceDaysMonth = 0;
        $targetReductionMinutesMonth = 0;
        $targetReductionDaysMonth = 0;
        $compensatoryDaysMonth = 0;

        $paidAbsenceMinutesUntilToday = 0;
        $paidAbsenceDaysUntilToday = 0;
        $targetReductionMinutesUntilToday = 0;
        $targetReductionDaysUntilToday = 0;
        $compensatoryDaysUntilToday = 0;

        // Types that reduce the target (Soll) instead of crediting work time (Ist).
        $targetReductionTypes = [
            Absence::TYPE_UNPAID,
        ];

        // Compensatory time (Freizeitausgleich) is neither credited to the Ist nor
        // deducted from the Soll: the day stays a target day with no work credited, so
        // the overtime balance drops by one daily target when FZA is taken (#149, #186).
        $overtimeConsumingTypes = [
            Absence::TYPE_COMPENSATORY,
        ];

        foreach ($absences as $absence) {
            if ($absence->isApproved()) {
                $absenceStart = $absence->getStartDate();
                $absenceEnd = $absence->getEndDate();
                $absenceScope = $absence->getScopeValue();

                // For full month display
                if ($absenceStart <= $monthEndDate) {
                    $monthAbsenceStart = $absenceStart < $startDate ? $startDate : $absenceStart;
                    $monthAbsenceEnd = $absenceEnd > $monthEndDate ? $monthEndDate : $absenceEnd;
                    $daysInMonth = $this->workScheduleService->countWorkingDays($employeeId, $monthAbsenceStart, $monthAbsenceEnd, $holidays);
                    $effectiveDays = $daysInMonth * $absenceScope;

                    // Calculate absence minutes per day using actual schedule
                    $absenceMinutes = $this->calculateAbsenceMinutes($employeeId, $monthAbsenceStart, $monthAbsenceEnd, $absenceScope, $holidays);

                    if (in_array($absence->getType(), $targetReductionTypes, true)) {
                        $targetReductionDaysMonth += $effectiveDays;
                        $targetReductionMinutesMonth += $absenceMinutes;
                    } elseif (in_array($absence->getType(), $overtimeConsumingTypes, true)) {
                        // FZA: counted as an absence day, but not credited to the Ist.
                        $compensatoryDaysMonth += $effectiveDays;
                    } else {
                        $paidAbsenceDaysMonth += $effectiveDays;
                        $paidAbsenceMinutesMonth += $absenceMinutes;
                    }
                }

                // For actual/overtime calculation: only count absences up to today
                if ($hasProportionalRange && $absenceStart <= $endDateForActual) {
                    $actualAbsenceStart = $absenceStart < $startDate ? $startDate : $absenceStart;
                    $actualAbsenceEnd = $absenceEnd > $endDateForActual ? $endDateForActual : $absenceEnd;
                    $daysUntilToday = $this->workScheduleService->countWorkingDays($employeeId, $actualAbsenceStart, $actualAbsenceEnd, $holidays);
                    $effectiveDaysUntilToday = $daysUntilToday * $absenceScope;

                    $absenceMinutesUntilToday = $this->calculateAbsenceMinutes($employeeId, $actualAbsenceStart, $actualAbsenceEnd, $absenceScope, $holidays);

                    if (in_array($absence->getType(), $targetReductionTypes, true)) {
                        $targetReductionDaysUntilToday += $effectiveDaysUntilToday;
                        $targetReductionMinutesUntilToday += $absenceMinutesUntilToday;
                    } elseif (in_array($absence->getType(), $overtimeConsumingTypes, true)) {
                        // FZA: not credited to the Ist -> overtime decreases by the daily target.
                        $compensatoryDaysUntilToday += $effectiveDaysUntilToday;
                    } else {
                        $paidAbsenceDaysUntilToday += $effectiveDaysUntilToday;
                        $paidAbsenceMinutesUntilToday += $absenceMinutesUntilToday;
                    }
                }
            }
        }

        // Adjust targets for unpaid leave (compensatory time deliberately keeps the target).
        $adjustedMonthlyTargetMinutes = $monthlyTargetMinutes - $targetReductionMinutesMonth;
        $adjustedProportionalTargetMinutes = $proportionalTargetMinutes - $targetReductionMinutesUntilToday;

        // Sum actual work minutes from time entries
        $workedMinutes = 0;
        foreach ($timeEntries as $entry) {
            $workedMinutes += $entry->getWorkMinutes();
        }

        // Effective actual = worked + paid absences (up to today)
        $actualMinutes = $workedMinutes + $paidAbsenceMinutesUntilToday;

        // Calculate overtime against proportional target (not full month)
        $overtimeMinutes = $actualMinutes - $adjustedProportionalTargetMinutes;

        return [
            // Full month values (for display in Monatsübersicht)
            'workingDays' => $workingDaysMonth,
            'workingDaysMonth' => $workingDaysMonth,
            'workingDaysUntilToday' => $workingDaysUntilToday,
            'holidayCount' => count($holidays),
            'paidAbsenceDays' => $paidAbsenceDaysMonth,
            'targetReductionDays' => $targetReductionDaysMonth,  // Unpaid leave
            'compensatoryDays' => $compensatoryDaysMonth,
            'absenceDays' => $paidAbsenceDaysMonth + $targetReductionDaysMonth + $compensatoryDaysMonth,
            'dailyMinutes' => $dailyMinutes,

            // Target values
            'targetMinutes' => $adjustedMonthlyTargetMinutes,
            'monthlyTargetMinutes' => $monthlyTargetMinutes,
            'adjustedTargetMinutes' => $adjustedProportionalTargetMinutes,
            'adjustedMonthlyTargetMinutes' => $adjustedMonthlyTargetMinutes,

            // Actual values (up to today)
            'workedMinutes' => $workedMinutes,
            'workedHours' => round($workedMinutes / 60, 2),
            'paidAbsenceMinutes' => $paidAbsenceMinutesUntilToday,
            'paidAbsenceHours' => round($paidAbsenceMinutesUntilToday / 60, 2),
            'actualMinutes' => $actualMinutes,
            'actualHours' => round($actualMinutes / 60, 2),

            // Overtime (proportional)
            'overtimeMinutes' => $overtimeMinutes,
            'overtimeHours' => round($overtimeMinutes / 60, 2),
            'entryCount' => count($timeEntries),
            'isFutureMonth' => false,
        ];
    }

    /**
     * @return array<string, mixed>
     */
    private function zeroMonthStats(int $workingDaysOverride = 0): array {
        return [
            'workingDays' => $workingDaysOverride,
            'workingDaysMonth' => $workingDaysOverride,
            'workingDaysUntilToday' => 0,
            'holidayCount' => 0,
            'paidAbsenceDays' => 0,
            'targetReductionDays' => 0,
            'compensatoryDays' => 0,
            'absenceDays' => 0,
            'dailyMinutes' => 0,
            'targetMinutes' => 0,
            'monthlyTargetMinutes' => 0,
            'adjustedTargetMinutes' => 0,
            'adjustedMonthlyTargetMinutes' => 0,
            'workedMinutes' => 0,
            'workedHours' => 0,
            'paidAbsenceMinutes' => 0,
            'paidAbsenceHours' => 0,
            'actualMinutes' => 0,
            'actualHours' => 0,
            'overtimeMinutes' => 0,
            'overtimeHours' => 0,
            'entryCount' => 0,
            'isFutureMonth' => false,
        ];
    }

    /**
     * Calculate absence minutes using actual schedule for each day.
     *
     * @param Holiday[] $holidays
     */
    private function calculateAbsenceMinutes(int $employeeId, DateTime $start, DateTime $end, float $scope, array $holidays): int {
        $holidayMap = [];
        foreach ($holidays as $holiday) {
            $holidayMap[$holiday->getDate()->format('Y-m-d')] = $holiday;
        }

        $totalMinutes = 0;
        $current = clone $start;
        while ($current <= $end) {
            $dateStr = $current->format('Y-m-d');
            $dayMinutes = $this->workScheduleService->getDailyMinutesForDate($employeeId, $current);

            if ($dayMinutes > 0 && !isset($holidayMap[$dateStr])) {
                $totalMinutes += (int)round($dayMinutes * $scope);
            }
            $current->modify('+1 day');
        }

        return $totalMinutes;
    }
}
