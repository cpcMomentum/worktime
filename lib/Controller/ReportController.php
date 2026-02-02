<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use DateTime;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\TimeEntryService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class ReportController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private TimeEntryService $timeEntryService,
        private TimeEntryMapper $timeEntryMapper,
        private AbsenceService $absenceService,
        private EmployeeService $employeeService,
        private HolidayService $holidayService,
        private PermissionService $permissionService,
        private PdfService $pdfService,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function monthly(int $employeeId, int $year, int $month): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
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

    #[NoAdminRequired]
    #[NoCSRFRequired]
    public function pdf(int $employeeId, int $year, int $month): DataDownloadResponse|JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
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

        $report = [];

        foreach ($teamMembers as $employee) {
            $timeEntries = $this->timeEntryService->findByEmployeeAndMonth($employee->getId(), $year, $month);
            $absences = $this->absenceService->findByEmployeeAndMonth($employee->getId(), $year, $month);
            $holidays = $this->holidayService->findByMonth($year, $month, $employee->getFederalState());

            $stats = $this->calculateMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);

            // Get status summary for approval workflow
            $statusSummary = $this->timeEntryMapper->getMonthlyStatusSummary($employee->getId(), $year, $month);

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
    public function overtime(int $employeeId, int $year): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
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

            return $this->successResponse([
                'employee' => $employee,
                'year' => $year,
                'monthly' => $monthlyData,
                'totalOvertimeMinutes' => $totalOvertime,
                'totalOvertimeHours' => round($totalOvertime / 60, 2),
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
     * - Paid (vacation, sick, child_sick, special, training, compensatory):
     *   Credited as work time (added to Ist)
     * - Unpaid: Reduces target (Soll), not credited as work time
     */
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
        $today = new DateTime('today');

        // Determine if this is a future month (hasn't started yet)
        $isFutureMonth = $startDate > $today;

        // For future months: return zeros for Soll/Ist/Überstunden
        // (the month hasn't started, so no meaningful calculation possible)
        if ($isFutureMonth) {
            $workingDaysMonth = $this->countWorkingDays($startDate, $monthEndDate, $holidays);
            $dailyMinutes = ((float)$employee->getWeeklyHours() / 5) * 60;

            // Count planned absences for display only
            $absenceDaysMonth = 0;
            foreach ($absences as $absence) {
                if ($absence->isApproved()) {
                    $absenceStart = $absence->getStartDate() < $startDate ? $startDate : $absence->getStartDate();
                    $absenceEnd = $absence->getEndDate() > $monthEndDate ? $monthEndDate : $absence->getEndDate();
                    $absenceDaysMonth += $this->countWorkingDays($absenceStart, $absenceEnd, $holidays);
                }
            }

            return [
                'workingDays' => $workingDaysMonth,
                'workingDaysMonth' => $workingDaysMonth,
                'workingDaysUntilToday' => 0,
                'holidayCount' => count($holidays),
                'paidAbsenceDays' => $absenceDaysMonth,
                'unpaidAbsenceDays' => 0,
                'absenceDays' => $absenceDaysMonth,
                'dailyMinutes' => (int)$dailyMinutes,
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

        // For "up to today" calculations
        $endDateForActual = ($isCurrentMonth && $today < $monthEndDate) ? $today : $monthEndDate;

        // Count working days for entire month (for display)
        $workingDaysMonth = $this->countWorkingDays($startDate, $monthEndDate, $holidays);

        // Count working days up to today (for proportional overtime calculation)
        $workingDaysUntilToday = $this->countWorkingDays($startDate, $endDateForActual, $holidays);

        // Calculate target minutes based on weekly hours
        $dailyMinutes = ((float)$employee->getWeeklyHours() / 5) * 60;
        $monthlyTargetMinutes = (int)round($workingDaysMonth * $dailyMinutes);
        $proportionalTargetMinutes = (int)round($workingDaysUntilToday * $dailyMinutes);

        // Process absences: separate paid vs unpaid
        $paidAbsenceMinutesMonth = 0;
        $paidAbsenceDaysMonth = 0;
        $unpaidAbsenceDaysMonth = 0;

        $paidAbsenceMinutesUntilToday = 0;
        $paidAbsenceDaysUntilToday = 0;
        $unpaidAbsenceDaysUntilToday = 0;

        foreach ($absences as $absence) {
            if ($absence->isApproved()) {
                $absenceStart = $absence->getStartDate();
                $absenceEnd = $absence->getEndDate();

                // For full month display: count all absences in the month
                if ($absenceStart <= $monthEndDate) {
                    $monthAbsenceStart = $absenceStart < $startDate ? $startDate : $absenceStart;
                    $monthAbsenceEnd = $absenceEnd > $monthEndDate ? $monthEndDate : $absenceEnd;
                    $daysInMonth = $this->countWorkingDays($monthAbsenceStart, $monthAbsenceEnd, $holidays);

                    if ($absence->getType() === \OCA\WorkTime\Db\Absence::TYPE_UNPAID) {
                        $unpaidAbsenceDaysMonth += $daysInMonth;
                    } else {
                        $paidAbsenceDaysMonth += $daysInMonth;
                        $paidAbsenceMinutesMonth += (int)round($daysInMonth * $dailyMinutes);
                    }
                }

                // For actual/overtime calculation: only count absences up to today
                if ($absenceStart <= $endDateForActual) {
                    $actualAbsenceStart = $absenceStart < $startDate ? $startDate : $absenceStart;
                    $actualAbsenceEnd = $absenceEnd > $endDateForActual ? $endDateForActual : $absenceEnd;
                    $daysUntilToday = $this->countWorkingDays($actualAbsenceStart, $actualAbsenceEnd, $holidays);

                    if ($absence->getType() === \OCA\WorkTime\Db\Absence::TYPE_UNPAID) {
                        $unpaidAbsenceDaysUntilToday += $daysUntilToday;
                    } else {
                        $paidAbsenceDaysUntilToday += $daysUntilToday;
                        $paidAbsenceMinutesUntilToday += (int)round($daysUntilToday * $dailyMinutes);
                    }
                }
            }
        }

        // Adjust targets for unpaid leave
        $adjustedMonthlyTargetMinutes = (int)round($monthlyTargetMinutes - ($unpaidAbsenceDaysMonth * $dailyMinutes));
        $adjustedProportionalTargetMinutes = (int)round($proportionalTargetMinutes - ($unpaidAbsenceDaysUntilToday * $dailyMinutes));

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
            'unpaidAbsenceDays' => $unpaidAbsenceDaysMonth,
            'absenceDays' => $paidAbsenceDaysMonth + $unpaidAbsenceDaysMonth,
            'dailyMinutes' => (int)$dailyMinutes,

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
     * Count working days (Mon-Fri) excluding holidays
     * Half-day holidays count as 0.5 working days
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
                    // Holiday exists - check if half day
                    $holiday = $holidayMap[$dateStr];
                    if ($holiday->getIsHalfDay()) {
                        // Half-day holiday = 0.5 working days
                        $workingDays += 0.5;
                    }
                    // Full holiday = 0 working days (nothing added)
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
