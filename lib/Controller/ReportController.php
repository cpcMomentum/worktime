<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use DateTime;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\ProjectService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class ReportController extends BaseController {

    /** @var array<string, array> Holiday cache by "state-year-month" */
    private array $holidayCache = [];

    public function __construct(
        IRequest $request,
        ?string $userId,
        private TimeEntryService $timeEntryService,
        private TimeEntryMapper $timeEntryMapper,
        private AbsenceMapper $absenceMapper,
        private AbsenceService $absenceService,
        private EmployeeService $employeeService,
        private HolidayService $holidayService,
        private PermissionService $permissionService,
        private PdfService $pdfService,
        private WorkScheduleService $workScheduleService,
        private YearlyCarryoverService $carryoverService,
        private ProjectService $projectService,
    ) {
        parent::__construct($request, $userId);
    }

    private function getHolidaysCached(int $year, int $month, string $federalState): array {
        $key = "$federalState-$year-$month";
        if (!isset($this->holidayCache[$key])) {
            $this->holidayCache[$key] = $this->holidayService->findByMonth($year, $month, $federalState);
        }
        return $this->holidayCache[$key];
    }

    #[NoAdminRequired]
    public function monthly(?int $employeeId = null, int $year = 0, int $month = 0): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        try {
            $employee = $this->employeeService->find($employeeId);
            $timeEntries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
            $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
            $holidays = $this->holidayService->findByMonth($year, $month, $employee->getFederalState());

            // Calculate statistics
            $stats = $this->calculateMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);

            return $this->successResponse([
                'employee' => $employee,
                'year' => $year,
                'month' => $month,
                'timeEntries' => $timeEntries,
                'absences' => $absences,
                'holidays' => $holidays,
                'statistics' => $stats,
            ]);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Project evaluation (#57): work minutes grouped by project and employee
     * over a month/quarter/year, for Admin/HR.
     */
    #[NoAdminRequired]
    public function projects(int $year = 0, int $month = 0, string $period = 'month', bool $billableOnly = false): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            [$start, $end, $label] = $this->resolvePeriod($year, $month, $period);

            $aggregates = $this->timeEntryMapper->sumWorkMinutesGroupedByProjectAndEmployee($start, $end);

            // Lookup maps for project metadata and employee names.
            $projects = [];
            foreach ($this->projectService->findAll() as $p) {
                $projects[$p->getId()] = $p;
            }
            $employees = [];
            foreach ($this->employeeService->findAll() as $e) {
                $employees[$e->getId()] = $e;
            }

            $rows = [];
            $totalMinutes = 0;
            $billableMinutes = 0;
            $projectIds = [];
            $employeeIds = [];

            foreach ($aggregates as $agg) {
                $projectId = $agg['projectId'];
                $project = $projects[$projectId] ?? null;
                $isBillable = $project !== null && (bool)$project->getIsBillable();

                if ($billableOnly && !$isBillable) {
                    continue;
                }

                $employee = $employees[$agg['employeeId']] ?? null;
                $minutes = $agg['minutes'];

                $rows[] = [
                    'projectId' => $projectId,
                    'projectName' => $project?->getName(),
                    'projectCode' => $project?->getCode(),
                    'customer' => $project?->getCustomer(),
                    'color' => $project?->getColor(),
                    'isBillable' => $isBillable,
                    'employeeId' => $agg['employeeId'],
                    'employeeName' => $employee?->getFullName(),
                    'minutes' => $minutes,
                ];

                $totalMinutes += $minutes;
                if ($isBillable) {
                    $billableMinutes += $minutes;
                }
                if ($projectId > 0) {
                    $projectIds[$projectId] = true;
                }
                $employeeIds[$agg['employeeId']] = true;
            }

            return $this->successResponse([
                'period' => [
                    'year' => $year,
                    'month' => $month,
                    'type' => $period,
                    'label' => $label,
                    'start' => $start->format('Y-m-d'),
                    'end' => $end->format('Y-m-d'),
                ],
                'totals' => [
                    'totalMinutes' => $totalMinutes,
                    'billableMinutes' => $billableMinutes,
                    'projectCount' => count($projectIds),
                    'employeeCount' => count($employeeIds),
                ],
                'rows' => $rows,
            ]);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Resolve the date range and a human label for a period selection.
     *
     * @return array{0: DateTime, 1: DateTime, 2: string}
     */
    private function resolvePeriod(int $year, int $month, string $period): array {
        if ($period === 'year') {
            $start = new DateTime("$year-01-01");
            $end = new DateTime("$year-12-31");
            return [$start, $end, (string)$year];
        }

        if ($period === 'quarter') {
            $quarter = intdiv(max(1, min(12, $month)) - 1, 3); // 0..3
            $startMonth = $quarter * 3 + 1;
            $start = new DateTime(sprintf('%d-%02d-01', $year, $startMonth));
            $end = (clone $start)->modify('+2 months')->modify('last day of this month');
            return [$start, $end, sprintf('Q%d %d', $quarter + 1, $year)];
        }

        // default: month
        $start = new DateTime(sprintf('%d-%02d-01', $year, max(1, min(12, $month))));
        $end = (clone $start)->modify('last day of this month');
        return [$start, $end, $start->format('m/Y')];
    }

    #[NoAdminRequired]
    #[NoCSRFRequired]
    public function pdf(?int $employeeId = null, int $year = 0, int $month = 0): DataDownloadResponse|JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        try {
            $employee = $this->employeeService->find($employeeId);
            $timeEntries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
            $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
            $holidays = $this->holidayService->findByMonth($year, $month, $employee->getFederalState());

            $stats = $this->calculateMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);

            $pdfContent = $this->pdfService->generateMonthlyReport(
                $employee,
                $year,
                $month,
                $timeEntries,
                $absences,
                $holidays,
                $stats
            );

            $filename = sprintf(
                'Arbeitszeitnachweis_%s_%s_%d-%02d.pdf',
                $employee->getLastName(),
                $employee->getFirstName(),
                $year,
                $month
            );

            return new DataDownloadResponse($pdfContent, $filename, 'application/pdf');
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function team(int $year, int $month): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $teamMembers = $this->permissionService->getTeamMembers($this->userId);

        if (empty($teamMembers)) {
            return $this->successResponse([]);
        }

        // Batch-load all data in 3 queries instead of 4×N
        $employeeIds = array_map(fn(Employee $e) => $e->getId(), $teamMembers);
        $allTimeEntries = $this->timeEntryMapper->findByEmployeeIdsAndMonth($employeeIds, $year, $month);
        $allAbsences = $this->absenceMapper->findByEmployeeIdsAndMonth($employeeIds, $year, $month);
        $allStatusSummaries = $this->timeEntryMapper->getMonthlyStatusSummaryBatch($employeeIds, $year, $month);

        $report = [];

        foreach ($teamMembers as $employee) {
            $empId = $employee->getId();
            $timeEntries = $allTimeEntries[$empId] ?? [];
            $absences = $allAbsences[$empId] ?? [];
            $holidays = $this->getHolidaysCached($year, $month, $employee->getFederalState());

            $stats = $this->calculateMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);
            $statusSummary = $allStatusSummaries[$empId] ?? ['draft' => 0, 'submitted' => 0, 'approved' => 0, 'rejected' => 0];

            $report[] = [
                'employee' => $employee,
                'statistics' => $stats,
                'monthStatus' => [
                    'draft' => $statusSummary['draft'],
                    'submitted' => $statusSummary['submitted'],
                    'approved' => $statusSummary['approved'],
                    'rejected' => $statusSummary['rejected'],
                    'canApprove' => $statusSummary['submitted'] > 0,
                ],
            ];
        }

        return $this->successResponse($report);
    }

    #[NoAdminRequired]
    public function teamYear(int $year): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $teamMembers = $this->permissionService->getTeamMembers($this->userId);

        if (empty($teamMembers)) {
            return $this->successResponse([]);
        }

        // Batch-load all year data: 2 queries for all employees
        $employeeIds = array_map(fn(Employee $e) => $e->getId(), $teamMembers);
        $allTimeEntries = $this->timeEntryMapper->findByEmployeeIdsAndYear($employeeIds, $year);
        $allAbsences = $this->absenceMapper->findByEmployeeIdsAndYear($employeeIds, $year);

        // Batch-load status summaries for all months (12 queries total, not 12×N)
        $allStatusByMonth = [];
        for ($m = 1; $m <= 12; $m++) {
            $allStatusByMonth[$m] = $this->timeEntryMapper->getMonthlyStatusSummaryBatch($employeeIds, $year, $m);
        }

        $report = [];

        foreach ($teamMembers as $employee) {
            $empId = $employee->getId();
            $empTimeEntries = $allTimeEntries[$empId] ?? [];
            $empAbsences = $allAbsences[$empId] ?? [];

            // Split time entries by month in-memory
            $entriesByMonth = [];
            foreach ($empTimeEntries as $entry) {
                $entryMonth = (int)$entry->getDate()->format('n');
                $entriesByMonth[$entryMonth][] = $entry;
            }

            // Split absences by month in-memory (an absence can span multiple months)
            $absencesByMonth = [];
            for ($month = 1; $month <= 12; $month++) {
                $monthStart = new DateTime("$year-$month-01");
                $monthEnd = (clone $monthStart)->modify('last day of this month');
                $absencesByMonth[$month] = [];
                foreach ($empAbsences as $absence) {
                    if ($absence->getStartDate() <= $monthEnd && $absence->getEndDate() >= $monthStart) {
                        $absencesByMonth[$month][] = $absence;
                    }
                }
            }

            $months = [];
            $totalOvertimeMinutes = 0;

            for ($month = 1; $month <= 12; $month++) {
                $startDate = new DateTime("$year-$month-01");

                // Future months: only load vacation, skip time entries
                if ($startDate > new DateTime()) {
                    $futureAbsences = $absencesByMonth[$month];
                    $futureVacationDays = 0;
                    foreach ($futureAbsences as $absence) {
                        if ($absence->countsAsVacation() && $absence->getStatus() === Absence::STATUS_APPROVED) {
                            $futureVacationDays += $this->countWorkingDaysInMonth($absence, $year, $month);
                        }
                    }
                    $months[] = [
                        'month' => $month,
                        'overtimeMinutes' => null,
                        'vacationDays' => $futureVacationDays > 0 ? $futureVacationDays : null,
                        'status' => null,
                        'canApprove' => false,
                    ];
                    continue;
                }

                $timeEntries = $entriesByMonth[$month] ?? [];
                $absences = $absencesByMonth[$month];
                $holidays = $this->getHolidaysCached($year, $month, $employee->getFederalState());

                $stats = $this->calculateMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);
                $statusSummary = $allStatusByMonth[$month][$empId] ?? ['draft' => 0, 'submitted' => 0, 'approved' => 0, 'rejected' => 0];

                // Determine dominant status
                $status = 'draft';
                if ($statusSummary['approved'] > 0 && $statusSummary['submitted'] === 0 && $statusSummary['draft'] === 0 && $statusSummary['rejected'] === 0) {
                    $status = 'approved';
                } elseif ($statusSummary['submitted'] > 0) {
                    $status = 'submitted';
                } elseif ($statusSummary['rejected'] > 0) {
                    $status = 'rejected';
                }

                // Count vacation days in this month
                $vacationDays = 0;
                foreach ($absences as $absence) {
                    if ($absence->countsAsVacation() && $absence->getStatus() === Absence::STATUS_APPROVED) {
                        $vacationDays += $this->countWorkingDaysInMonth($absence, $year, $month);
                    }
                }

                $months[] = [
                    'month' => $month,
                    'overtimeMinutes' => $stats['overtimeMinutes'],
                    'vacationDays' => $vacationDays,
                    'status' => $status,
                    'canApprove' => $statusSummary['submitted'] > 0,
                ];

                $totalOvertimeMinutes += $stats['overtimeMinutes'];
            }

            // Vacation stats - use schedule-aware vacation days + carryover
            $vacationDaysForYear = $this->workScheduleService->getVacationDaysForYear($empId, $year);
            $vacationCarryover = $this->carryoverService->getVacationCarryoverDays($empId, $year);
            $vacationStats = $this->absenceService->getVacationStats(
                $empId,
                $year,
                $vacationDaysForYear + (int)round($vacationCarryover)
            );
            $vacationStats['carryover'] = $vacationCarryover;

            // Overtime carryover
            $overtimeCarryover = $this->carryoverService->getOvertimeCarryoverMinutes($empId, $year);

            $report[] = [
                'employee' => [
                    'id' => $empId,
                    'userId' => $employee->getUserId(),
                    'fullName' => $employee->getFullName(),
                    'weeklyHours' => $employee->getWeeklyHours(),
                ],
                'vacationStats' => $vacationStats,
                'months' => $months,
                'carryoverMinutes' => $overtimeCarryover,
                'totalOvertimeMinutes' => $totalOvertimeMinutes + $overtimeCarryover,
            ];
        }

        return $this->successResponse($report);
    }

    #[NoAdminRequired]
    public function overtime(?int $employeeId = null, int $year = 0): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        try {
            $employee = $this->employeeService->find($employeeId);
            $monthlyData = [];
            $totalOvertime = 0;

            for ($month = 1; $month <= 12; $month++) {
                $startDate = new DateTime("$year-$month-01");

                // Skip future months
                if ($startDate > new DateTime()) {
                    break;
                }

                $timeEntries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
                $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
                $holidays = $this->holidayService->findByMonth($year, $month, $employee->getFederalState());

                $stats = $this->calculateMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);

                $monthlyData[] = [
                    'month' => $month,
                    'targetMinutes' => $stats['targetMinutes'],
                    'actualMinutes' => $stats['actualMinutes'],
                    'overtimeMinutes' => $stats['overtimeMinutes'],
                ];

                $totalOvertime += $stats['overtimeMinutes'];
            }

            $carryoverMinutes = $this->carryoverService->getOvertimeCarryoverMinutes($employeeId, $year);

            return $this->successResponse([
                'employee' => $employee,
                'year' => $year,
                'monthly' => $monthlyData,
                'carryoverMinutes' => $carryoverMinutes,
                'totalOvertimeMinutes' => $totalOvertime + $carryoverMinutes,
                'totalOvertimeHours' => round(($totalOvertime + $carryoverMinutes) / 60, 2),
                // Average daily target (weekly hours / 5), used for the Freizeitausgleich ≈ hours hint.
                'dailyMinutes' => (int)round($employee->getWeeklyHours() / 5 * 60),
            ]);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function allEmployeesStatus(int $year, int $month): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // Only Admin and HR Manager can see all employees
        if (!$this->permissionService->isAdmin($this->userId) && !$this->permissionService->isHrManager($this->userId)) {
            return $this->forbiddenResponse();
        }

        $allEmployees = $this->employeeService->findAllActive();

        $report = [];

        foreach ($allEmployees as $employee) {
            $statusSummary = $this->timeEntryMapper->getMonthlyStatusSummary($employee->getId(), $year, $month);
            $totalEntries = $statusSummary['draft'] + $statusSummary['submitted'] + $statusSummary['approved'] + $statusSummary['rejected'];

            $report[] = [
                'employee' => $employee,
                'monthStatus' => [
                    'draft' => $statusSummary['draft'],
                    'submitted' => $statusSummary['submitted'],
                    'approved' => $statusSummary['approved'],
                    'rejected' => $statusSummary['rejected'],
                    'total' => $totalEntries,
                    'canApprove' => $statusSummary['submitted'] > 0,
                    'isFullyApproved' => $totalEntries > 0 && $statusSummary['approved'] === $totalEntries,
                ],
            ];
        }

        return $this->successResponse($report);
    }

    /**
     * Calculate monthly statistics
     *
     * Logic:
     * - Display values (workingDays, absenceDays, targetMinutes) = full month
     * - Actual (Ist) = worked hours + credited absence hours up to today
     * - Overtime = Actual - proportional target (based on working days up to today)
     *
     * Absence types:
     * - Paid (vacation, sick, child_sick, special, training):
     *   Credited as work time (added to Ist)
     * - Unpaid: Reduces target (Soll), not credited as work time
     * - Compensatory (Freizeitausgleich): keeps the target and is NOT credited to Ist,
     *   so the overtime balance decreases by one daily target per FZA day
     */

    /**
     * Count working days of an absence that fall within a specific month.
     * Uses schedule-aware logic (only counts days where the employee has >0 hours).
     */
    private function countWorkingDaysInMonth(Absence $absence, int $year, int $month): float {
        $monthStart = new DateTime("$year-$month-01");
        $monthEnd = (clone $monthStart)->modify('last day of this month');

        $absStart = $absence->getStartDate();
        $absEnd = $absence->getEndDate();

        // Clamp to month boundaries
        $start = $absStart > $monthStart ? $absStart : $monthStart;
        $end = $absEnd < $monthEnd ? $absEnd : $monthEnd;

        if ($start > $end) {
            return 0;
        }

        return $this->workScheduleService->countWorkingDays($absence->getEmployeeId(), $start, $end, []);
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
     * @param object[] $timeEntries
     * @param object[] $absences
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

    private function calculateMonthlyStats(
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
            \OCA\WorkTime\Db\Absence::TYPE_UNPAID,
        ];

        // Compensatory time (Freizeitausgleich) is neither credited to the Ist nor
        // deducted from the Soll: the day stays a target day with no work credited, so
        // the overtime balance drops by one daily target when FZA is taken (#149, #186).
        $overtimeConsumingTypes = [
            \OCA\WorkTime\Db\Absence::TYPE_COMPENSATORY,
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

    /**
     * Count working days (Mon-Fri) excluding holidays
     * Holiday scope determines how much of the day is free:
     * - scope = 1.0: full holiday = 0 working days
     * - scope = 0.5: half holiday = 0.5 working days remaining
     */
    private function countWorkingDays(DateTime $startDate, DateTime $endDate, array $holidays): float {
        // Build holiday lookup: date => Holiday object
        $holidayMap = [];
        foreach ($holidays as $holiday) {
            $holidayMap[$holiday->getDate()->format('Y-m-d')] = $holiday;
        }

        $workingDays = 0.0;
        $current = clone $startDate;

        while ($current <= $endDate) {
            $dayOfWeek = (int)$current->format('N');
            $dateStr = $current->format('Y-m-d');

            // Only count Monday-Friday
            if ($dayOfWeek < 6) {
                if (isset($holidayMap[$dateStr])) {
                    // Holiday exists - add remaining working portion
                    // scope = 1.0 (full holiday) → 0 working days
                    // scope = 0.5 (half holiday) → 0.5 working days
                    $holiday = $holidayMap[$dateStr];
                    $workingDays += (1.0 - $holiday->getScopeValue());
                } else {
                    // Regular working day
                    $workingDays += 1.0;
                }
            }

            $current->modify('+1 day');
        }

        return $workingDays;
    }
}
