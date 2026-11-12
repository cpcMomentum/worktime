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
        private UserTimeZone $dateTimeZone,
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
        return LocalDate::today($this->dateTimeZone->getTimeZone());
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
                'workingDays' => 0, 'holidayCount' => 0,
                'paidAbsenceDays' => 0, 'targetReductionDays' => 0, 'compensatoryDays' => 0,
                'absenceDays' => 0, 'adjustedTargetMinutes' => 0, 'actualMinutes' => 0,
                'overtimeMinutes' => 0, 'entryCount' => $entryCount,
                'paidAbsenceByDay' => [],
            ];
        }

        $workingDays = $this->workScheduleService->countWorkingDays($employeeId, $startDate, $endDate, $holidays);
        $targetMinutes = $this->workScheduleService->calculateTargetMinutes($employeeId, $startDate, $endDate, $holidays);
        $holidayDays = $this->workScheduleService->countHolidayDays($employeeId, $startDate, $endDate, $holidays);

        // #497: no target accrues while the employee is on a resting spell
        // (Elternzeit, Langzeiterkrankung, …). Subtract the resting window's share
        // of the target/working days — mirrors the entry/exit clipping above, but
        // as an interior exclusion since a spell can sit inside the range.
        [$restStart, $restEnd] = $this->restingOverlap($employee, $startDate, $endDate);
        if ($restStart !== null) {
            $workingDays = max(0.0, $workingDays - $this->workScheduleService->countWorkingDays($employeeId, $restStart, $restEnd, $holidays));
            $targetMinutes = max(0, $targetMinutes - $this->workScheduleService->calculateTargetMinutes($employeeId, $restStart, $restEnd, $holidays));
            $holidayDays = max(0.0, $holidayDays - $this->workScheduleService->countHolidayDays($employeeId, $restStart, $restEnd, $holidays));
        }

        $targetReductionTypes = [Absence::TYPE_UNPAID];
        $overtimeConsumingTypes = [Absence::TYPE_COMPENSATORY];

        $paidAbsenceMinutes = 0;
        $paidAbsenceDays = 0;
        $paidAbsenceByDay = [];
        $targetReductionMinutes = 0;
        $targetReductionDays = 0;
        $compensatoryDays = 0;

        $workedByDate = $this->workedMinutesByDate($timeEntries);

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
            $minutesByDay = $this->absenceMinutesByDay($employeeId, $aStart, $aEnd, $scope, $holidays);
            $minutes = array_sum($minutesByDay);

            // #625: single-day hourly sick is capped to the remaining daily target
            // instead of the scope-based full/half credit.
            if ($absence instanceof Absence && $absence->getAbsenceMinutes() !== null) {
                $dayTarget = $this->workScheduleService->getDailyMinutesForDate($employeeId, $aStart);
                $worked = $workedByDate[$aStart->format('Y-m-d')] ?? 0;
                $minutes = $this->capSubDayCredit($absence->getAbsenceMinutes(), $dayTarget, $worked);
                $minutesByDay = [$aStart->format('Y-m-d') => $minutes];
                $days = $dayTarget > 0 ? $minutes / $dayTarget : 0.0;
            }

            if (in_array($absence->getType(), $targetReductionTypes, true)) {
                $targetReductionDays += $days;
                $targetReductionMinutes += $minutes;
            } elseif (in_array($absence->getType(), $overtimeConsumingTypes, true)) {
                $compensatoryDays += $days;
            } else {
                $paidAbsenceDays += $days;
                $paidAbsenceMinutes += $minutes;
                $paidAbsenceByDay = $this->addDayCredits($paidAbsenceByDay, $minutesByDay);
            }
        }

        // #497: clamp at 0 — resting already trimmed the target; an overlapping
        // unpaid absence must not double-subtract into a negative target.
        $adjustedTargetMinutes = max(0, $targetMinutes - $targetReductionMinutes);

        $workedMinutes = 0;
        foreach ($timeEntries as $entry) {
            if ($this->isUnapprovedEmergency($entry)) {
                continue;
            }
            $workedMinutes += $entry->getWorkMinutes();
        }
        $actualMinutes = $workedMinutes + $paidAbsenceMinutes;
        $overtimeMinutes = $actualMinutes - $adjustedTargetMinutes;

        return [
            'workingDays' => $workingDays,
            'holidayCount' => $holidayDays,
            'paidAbsenceDays' => $paidAbsenceDays,
            'targetReductionDays' => $targetReductionDays,
            'compensatoryDays' => $compensatoryDays,
            'absenceDays' => $paidAbsenceDays + $targetReductionDays + $compensatoryDays,
            'adjustedTargetMinutes' => $adjustedTargetMinutes,
            'actualMinutes' => $actualMinutes,
            'overtimeMinutes' => $overtimeMinutes,
            'entryCount' => $entryCount,
            'paidAbsenceByDay' => $paidAbsenceByDay,
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

            // Count planned absences for display only. Weight by the absence
            // scope (0.5 for half days) so a half-day absence in a future month
            // shows as 0.5, consistent with the non-future branch (see #443 G).
            $absenceDaysMonth = 0;
            foreach ($absences as $absence) {
                if ($absence->isApproved()) {
                    $absenceStart = $absence->getStartDate() < $startDate ? $startDate : $absence->getStartDate();
                    $absenceEnd = $absence->getEndDate() > $monthEndDate ? $monthEndDate : $absence->getEndDate();
                    $absenceDaysMonth += $this->workScheduleService->countWorkingDays($employeeId, $absenceStart, $absenceEnd, $holidays) * $absence->getScopeValue();
                }
            }

            // dailyMinutes approximation for display
            $dailyMinutes = $workingDaysMonth > 0 ? (int)round($monthlyTargetMinutes / $workingDaysMonth) : 0;

            return [
                'workingDays' => $workingDaysMonth,
                'workingDaysMonth' => $workingDaysMonth,
                'workingDaysUntilToday' => 0,
                'holidayCount' => $this->workScheduleService->countHolidayDays($employeeId, $startDate, $monthEndDate, $holidays),
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
                'paidAbsenceByDay' => [],
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

        // #497: no target accrues during a resting spell — subtract its share from
        // both the full-month and the proportional-until-today figures.
        [$restStart, $restEnd] = $this->restingOverlap($employee, $startDate, $monthEndDate);
        $holidayDaysMonth = $this->workScheduleService->countHolidayDays($employeeId, $startDate, $monthEndDate, $holidays);
        if ($restStart !== null) {
            $holidayDaysMonth = max(0.0, $holidayDaysMonth - $this->workScheduleService->countHolidayDays($employeeId, $restStart, $restEnd, $holidays));
            $workingDaysMonth = max(0.0, $workingDaysMonth - $this->workScheduleService->countWorkingDays($employeeId, $restStart, $restEnd, $holidays));
            $monthlyTargetMinutes = max(0, $monthlyTargetMinutes - $this->workScheduleService->calculateTargetMinutes($employeeId, $restStart, $restEnd, $holidays));
        }
        if ($hasProportionalRange) {
            [$restStartP, $restEndP] = $this->restingOverlap($employee, $startDate, $endDateForActual);
            if ($restStartP !== null) {
                $workingDaysUntilToday = max(0.0, $workingDaysUntilToday - $this->workScheduleService->countWorkingDays($employeeId, $restStartP, $restEndP, $holidays));
                $proportionalTargetMinutes = max(0, $proportionalTargetMinutes - $this->workScheduleService->calculateTargetMinutes($employeeId, $restStartP, $restEndP, $holidays));
            }
        }

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
        $paidAbsenceByDay = [];
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

        $workedByDate = $this->workedMinutesByDate($timeEntries);

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

                    // #625: single-day hourly sick caps to the remaining daily target.
                    if ($absence instanceof Absence && $absence->getAbsenceMinutes() !== null) {
                        $dayTarget = $this->workScheduleService->getDailyMinutesForDate($employeeId, $absenceStart);
                        $worked = $workedByDate[$absenceStart->format('Y-m-d')] ?? 0;
                        $absenceMinutes = $this->capSubDayCredit($absence->getAbsenceMinutes(), $dayTarget, $worked);
                        $effectiveDays = $dayTarget > 0 ? $absenceMinutes / $dayTarget : 0.0;
                    }

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

                    $creditByDay = $this->absenceMinutesByDay($employeeId, $actualAbsenceStart, $actualAbsenceEnd, $absenceScope, $holidays);
                    $absenceMinutesUntilToday = array_sum($creditByDay);

                    // #625: single-day hourly sick caps to the remaining daily target.
                    if ($absence instanceof Absence && $absence->getAbsenceMinutes() !== null) {
                        $dayTarget = $this->workScheduleService->getDailyMinutesForDate($employeeId, $absenceStart);
                        $worked = $workedByDate[$absenceStart->format('Y-m-d')] ?? 0;
                        $absenceMinutesUntilToday = $this->capSubDayCredit($absence->getAbsenceMinutes(), $dayTarget, $worked);
                        $creditByDay = [$absenceStart->format('Y-m-d') => $absenceMinutesUntilToday];
                        $effectiveDaysUntilToday = $dayTarget > 0 ? $absenceMinutesUntilToday / $dayTarget : 0.0;
                    }

                    if (in_array($absence->getType(), $targetReductionTypes, true)) {
                        $targetReductionDaysUntilToday += $effectiveDaysUntilToday;
                        $targetReductionMinutesUntilToday += $absenceMinutesUntilToday;
                    } elseif (in_array($absence->getType(), $overtimeConsumingTypes, true)) {
                        // FZA: not credited to the Ist -> overtime decreases by the daily target.
                        $compensatoryDaysUntilToday += $effectiveDaysUntilToday;
                    } else {
                        $paidAbsenceDaysUntilToday += $effectiveDaysUntilToday;
                        $paidAbsenceMinutesUntilToday += $absenceMinutesUntilToday;
                        $paidAbsenceByDay = $this->addDayCredits($paidAbsenceByDay, $creditByDay);
                    }
                }
            }
        }

        // Adjust targets for unpaid leave (compensatory time deliberately keeps the target).
        // #497: clamp at 0 — the resting reduction already trimmed the target, and an
        // unpaid absence on the same (retroactively resting) days must not push it
        // negative through double subtraction.
        $adjustedMonthlyTargetMinutes = max(0, $monthlyTargetMinutes - $targetReductionMinutesMonth);
        $adjustedProportionalTargetMinutes = max(0, $proportionalTargetMinutes - $targetReductionMinutesUntilToday);

        // Sum actual work minutes from time entries
        $workedMinutes = 0;
        foreach ($timeEntries as $entry) {
            if ($this->isUnapprovedEmergency($entry)) {
                continue;
            }
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
            'holidayCount' => $holidayDaysMonth,
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
            // Gutschrift je Tag (Y-m-d => Minuten); die Summe ist paidAbsenceMinutes (#833).
            'paidAbsenceByDay' => $paidAbsenceByDay,
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
            'paidAbsenceByDay' => [],
        ];
    }

    /**
     * Calculate absence minutes using actual schedule for each day.
     *
     * @param Holiday[] $holidays
     */
    private function calculateAbsenceMinutes(int $employeeId, DateTime $start, DateTime $end, float $scope, array $holidays): int {
        return array_sum($this->absenceMinutesByDay($employeeId, $start, $end, $scope, $holidays));
    }

    /**
     * @param Holiday[] $holidays
     * @return array<string, int> Y-m-d => Minuten, nur Tage mit Tagessoll
     */
    private function absenceMinutesByDay(int $employeeId, DateTime $start, DateTime $end, float $scope, array $holidays): array {
        $holidayMap = [];
        foreach ($holidays as $holiday) {
            $holidayMap[$holiday->getDate()->format('Y-m-d')] = $holiday;
        }

        $byDay = [];
        $current = clone $start;
        while ($current <= $end) {
            $dateStr = $current->format('Y-m-d');
            $dayMinutes = $this->workScheduleService->getDailyMinutesForDate($employeeId, $current);

            if ($dayMinutes > 0) {
                // #443: ein halber Feiertag laesst die andere Tageshaelfte als Gutschrift stehen, ein ganzer nichts.
                $holidayScope = isset($holidayMap[$dateStr]) ? $holidayMap[$dateStr]->getScopeValue() : 0.0;
                $byDay[$dateStr] = (int)round($dayMinutes * (1.0 - $holidayScope) * $scope);
            }
            $current->modify('+1 day');
        }

        return $byDay;
    }

    /**
     * @param array<string, int> $total
     * @param array<string, int> $credits
     * @return array<string, int>
     */
    private function addDayCredits(array $total, array $credits): array {
        foreach ($credits as $date => $minutes) {
            if ($minutes > 0) {
                $total[$date] = ($total[$date] ?? 0) + $minutes;
            }
        }
        return $total;
    }

    /**
     * #497: the overlap of the employee's resting spell with [start, end], or
     * [null, null] if there is none. An open spell (resting_until NULL) runs to the
     * range end; a closed one is a bounded interior hole.
     *
     * @return array{0: ?DateTime, 1: ?DateTime}
     */
    private function restingOverlap(Employee $employee, DateTime $start, DateTime $end): array {
        $from = $employee->getRestingFrom();
        if ($from === null) {
            return [null, null];
        }
        $until = $employee->getRestingUntil() ?? $end;
        $overlapStart = $from > $start ? clone $from : clone $start;
        $overlapEnd = $until < $end ? clone $until : clone $end;
        if ($overlapStart > $overlapEnd) {
            return [null, null];
        }
        return [$overlapStart, $overlapEnd];
    }

    /**
     * Sum worked minutes per calendar day (Y-m-d). Only real TimeEntry rows carry
     * a date; lightweight test doubles without one are ignored.
     *
     * @param TimeEntry[] $timeEntries
     * @return array<string, int>
     */
    private function workedMinutesByDate(array $timeEntries): array {
        $map = [];
        foreach ($timeEntries as $entry) {
            if (!$entry instanceof TimeEntry) {
                continue;
            }
            $date = $entry->getDate();
            if ($date === null) {
                continue;
            }
            $key = $date->format('Y-m-d');
            $map[$key] = ($map[$key] ?? 0) + $entry->getWorkMinutes();
        }
        return $map;
    }

    /**
     * #625 Pro-Tag-Deckelung fuer stundenweise Krankheit: die Gutschrift eines
     * Einzeltags fuellt hoechstens bis zum Resttagessoll (Tagessoll minus der an
     * dem Tag bereits gearbeiteten Minuten). So entstehen keine kuenstlichen
     * Ueberstunden, wenn an einem Krank-Tag zusaetzlich gearbeitet wurde.
     *
     * Der Aufrufer holt das Tagessoll einmal und reicht es (sowie die an dem Tag
     * gearbeiteten Minuten) herein, um eine zweite identische DB-Abfrage zu sparen.
     */
    private function capSubDayCredit(int $absenceMinutes, int $dayTarget, int $workedOnDay): int {
        return max(0, min($absenceMinutes, $dayTarget - $workedOnDay));
    }

    /**
     * #626: Notarbeit im Urlaub, die noch nicht freigegeben ist, zaehlt nicht in
     * die Ist-Summe (bis der Chef sie freigibt). Beruehrt ausschliesslich
     * Notarbeit-Eintraege; normale Eintraege bleiben unberuehrt. Der instanceof-
     * Guard schuetzt die schlanken Test-Doubles ohne diese Methoden.
     */
    private function isUnapprovedEmergency(mixed $entry): bool {
        return $entry instanceof TimeEntry
            && $entry->isEmergency()
            && !$entry->isEmergencyApproved();
    }
}
