<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use DateTime;
use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\NotFoundException;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\TimeEntryService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\DataDownloadResponse;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class ReportController extends OCSController {

    public function __construct(
        IRequest $request,
        private ?string $userId,
        private TimeEntryService $timeEntryService,
        private TimeEntryMapper $timeEntryMapper,
        private AbsenceService $absenceService,
        private EmployeeService $employeeService,
        private HolidayService $holidayService,
        private PermissionService $permissionService,
        private PdfService $pdfService,
    ) {
        parent::__construct(Application::APP_ID, $request);
    }

    #[NoAdminRequired]
    public function monthly(int $employeeId, int $year, int $month): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        try {
            $employee = $this->employeeService->find($employeeId);
            $timeEntries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
            $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
            $holidays = $this->holidayService->findByMonth($year, $month, $employee->getFederalState());

            // Calculate statistics
            $stats = $this->calculateMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);

            return new JSONResponse([
                'employee' => $employee,
                'year' => $year,
                'month' => $month,
                'timeEntries' => $timeEntries,
                'absences' => $absences,
                'holidays' => $holidays,
                'statistics' => $stats,
            ]);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function pdf(int $employeeId, int $year, int $month): DataDownloadResponse|JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
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
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function team(int $year, int $month): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        $teamMembers = $this->permissionService->getTeamMembers($this->userId);

        if (empty($teamMembers)) {
            return new JSONResponse([]);
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

        return new JSONResponse($report);
    }

    #[NoAdminRequired]
    public function overtime(int $employeeId, int $year): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        try {
            $employee = $this->employeeService->find($employeeId);
            $monthlyData = [];
            $totalOvertime = 0;

            for ($month = 1; $month <= 12; $month++) {
                $startDate = new DateTime("$year-$month-01");
                $endDate = (clone $startDate)->modify('last day of this month');

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

            return new JSONResponse([
                'employee' => $employee,
                'year' => $year,
                'monthly' => $monthlyData,
                'totalOvertimeMinutes' => $totalOvertime,
                'totalOvertimeHours' => round($totalOvertime / 60, 2),
            ]);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function allEmployeesStatus(int $year, int $month): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        // Only Admin and HR Manager can see all employees
        if (!$this->permissionService->isAdmin($this->userId) && !$this->permissionService->isHrManager($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
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

        return new JSONResponse($report);
    }

    /**
     * Calculate monthly statistics
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
        $endDate = (clone $startDate)->modify('last day of this month');

        // Count working days in the month
        $workingDays = $this->countWorkingDays($startDate, $endDate, $holidays);

        // Calculate target minutes based on weekly hours
        $dailyMinutes = ((float)$employee->getWeeklyHours() / 5) * 60;
        $targetMinutes = (int)round($workingDays * $dailyMinutes);

        // Count absence days that reduce target
        $absenceDays = 0;
        foreach ($absences as $absence) {
            if ($absence->isApproved()) {
                $absenceDays += (float)$absence->getDays();
            }
        }

        // Reduce target by absence days
        $adjustedTargetMinutes = (int)round($targetMinutes - ($absenceDays * $dailyMinutes));

        // Sum actual work minutes
        $actualMinutes = 0;
        foreach ($timeEntries as $entry) {
            $actualMinutes += $entry->getWorkMinutes();
        }

        // Calculate overtime
        $overtimeMinutes = $actualMinutes - $adjustedTargetMinutes;

        return [
            'workingDays' => $workingDays,
            'holidayCount' => count($holidays),
            'absenceDays' => $absenceDays,
            'dailyMinutes' => (int)$dailyMinutes,
            'targetMinutes' => $targetMinutes,
            'adjustedTargetMinutes' => $adjustedTargetMinutes,
            'actualMinutes' => $actualMinutes,
            'actualHours' => round($actualMinutes / 60, 2),
            'overtimeMinutes' => $overtimeMinutes,
            'overtimeHours' => round($overtimeMinutes / 60, 2),
            'entryCount' => count($timeEntries),
        ];
    }

    /**
     * Count working days (Mon-Fri) excluding holidays
     */
    private function countWorkingDays(DateTime $startDate, DateTime $endDate, array $holidays): int {
        $holidayDates = [];
        foreach ($holidays as $holiday) {
            $holidayDates[] = $holiday->getDate()->format('Y-m-d');
        }

        $workingDays = 0;
        $current = clone $startDate;

        while ($current <= $endDate) {
            $dayOfWeek = (int)$current->format('N');
            $dateStr = $current->format('Y-m-d');

            // Count if Monday-Friday and not a holiday
            if ($dayOfWeek < 6 && !in_array($dateStr, $holidayDates)) {
                $workingDays++;
            }

            $current->modify('+1 day');
        }

        return $workingDays;
    }
}
