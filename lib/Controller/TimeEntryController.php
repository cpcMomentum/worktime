<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use DateTime;
use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\ForbiddenException;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\NotFoundException;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\ValidationException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

class TimeEntryController extends OCSController {

    public function __construct(
        IRequest $request,
        private ?string $userId,
        private TimeEntryService $timeEntryService,
        private PermissionService $permissionService,
        private EmployeeService $employeeService,
        private AbsenceService $absenceService,
        private HolidayService $holidayService,
        private PdfService $pdfService,
        private LoggerInterface $logger,
    ) {
        parent::__construct(Application::APP_ID, $request);
    }

    #[NoAdminRequired]
    public function index(int $employeeId, ?int $year = null, ?int $month = null): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        if ($year && $month) {
            $entries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
        } else {
            $entries = $this->timeEntryService->findByEmployee($employeeId);
        }

        return new JSONResponse($entries);
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canViewEmployee($this->userId, $entry->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            return new JSONResponse($entry);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function create(
        int $employeeId,
        string $date,
        string $startTime,
        string $endTime,
        int $breakMinutes,
        ?int $projectId = null,
        ?string $description = null
    ): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canEditTimeEntry($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        try {
            $entry = $this->timeEntryService->create(
                $employeeId,
                $date,
                $startTime,
                $endTime,
                $breakMinutes,
                $projectId,
                $description,
                $this->userId
            );

            return new JSONResponse($entry, Http::STATUS_CREATED);
        } catch (ValidationException $e) {
            return new JSONResponse(['error' => $e->getMessage(), 'errors' => $e->getErrors()], Http::STATUS_BAD_REQUEST);
        }
    }

    #[NoAdminRequired]
    public function update(
        int $id,
        string $date,
        string $startTime,
        string $endTime,
        int $breakMinutes,
        ?int $projectId = null,
        ?string $description = null
    ): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $entry->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            $entry = $this->timeEntryService->update(
                $id,
                $date,
                $startTime,
                $endTime,
                $breakMinutes,
                $projectId,
                $description,
                $this->userId
            );

            return new JSONResponse($entry);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        } catch (ValidationException $e) {
            return new JSONResponse(['error' => $e->getMessage(), 'errors' => $e->getErrors()], Http::STATUS_BAD_REQUEST);
        }
    }

    #[NoAdminRequired]
    public function destroy(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $entry->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            $this->timeEntryService->delete($id, $this->userId);

            return new JSONResponse(['status' => 'deleted']);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        } catch (ForbiddenException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_FORBIDDEN);
        }
    }

    #[NoAdminRequired]
    public function submit(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $entry->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            $entry = $this->timeEntryService->submit($id, $this->userId);

            return new JSONResponse($entry);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        } catch (ForbiddenException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_FORBIDDEN);
        }
    }

    #[NoAdminRequired]
    public function approve(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $entry->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            $entry = $this->timeEntryService->approve($id, $this->userId);

            return new JSONResponse($entry);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        } catch (ForbiddenException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_FORBIDDEN);
        }
    }

    #[NoAdminRequired]
    public function reject(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $entry->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            $entry = $this->timeEntryService->reject($id, $this->userId);

            return new JSONResponse($entry);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        } catch (ForbiddenException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_FORBIDDEN);
        }
    }

    #[NoAdminRequired]
    public function submitMonth(int $employeeId, int $year, int $month): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canEditTimeEntry($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $result = $this->timeEntryService->submitMonth($employeeId, $year, $month, $this->userId);

        return new JSONResponse([
            'status' => 'success',
            'submitted' => $result['submitted'],
            'skipped' => $result['skipped'],
        ]);
    }

    #[NoAdminRequired]
    public function approveMonth(int $employeeId, int $year, int $month): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canApprove($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $result = $this->timeEntryService->approveMonth($employeeId, $year, $month, $this->userId);

        // Archive PDF if any entries were approved
        $archivePath = null;
        if ($result['approved'] > 0) {
            try {
                $archivePath = $this->archiveApprovedMonth($employeeId, $year, $month);
            } catch (\Exception $e) {
                $this->logger->warning('Failed to archive PDF for employee ' . $employeeId . ': ' . $e->getMessage());
                // Don't fail the approval if archiving fails
            }
        }

        return new JSONResponse([
            'status' => 'success',
            'approved' => $result['approved'],
            'skipped' => $result['skipped'],
            'archivePath' => $archivePath,
        ]);
    }

    /**
     * Archive approved month as PDF
     */
    private function archiveApprovedMonth(int $employeeId, int $year, int $month): ?string {
        try {
            $employee = $this->employeeService->find($employeeId);
            $approver = $this->permissionService->getEmployeeForUser($this->userId);

            $timeEntries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
            $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
            $holidays = $this->holidayService->findByMonth($year, $month, $employee->getFederalState());

            $stats = $this->calculateMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);

            // Find the approval timestamp from one of the approved entries
            $approvedAt = new DateTime();
            foreach ($timeEntries as $entry) {
                if ($entry->getApprovedAt() !== null) {
                    $approvedAt = $entry->getApprovedAt();
                    break;
                }
            }

            $approvalInfo = [
                'approvedBy' => $approver,
                'approvedAt' => $approvedAt,
            ];

            $pdfContent = $this->pdfService->generateMonthlyReport(
                $employee,
                $year,
                $month,
                $timeEntries,
                $absences,
                $holidays,
                $stats,
                $approvalInfo
            );

            return $this->pdfService->archiveMonthlyReport(
                $this->userId,
                $employee,
                $year,
                $month,
                $pdfContent
            );
        } catch (NotFoundException $e) {
            $this->logger->error('Employee not found for archiving: ' . $e->getMessage());
            return null;
        }
    }

    /**
     * Calculate monthly statistics (copied from ReportController)
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

    #[NoAdminRequired]
    public function suggestBreak(string $startTime, string $endTime): JSONResponse {
        $breakMinutes = $this->timeEntryService->suggestBreak($startTime, $endTime);

        return new JSONResponse(['breakMinutes' => $breakMinutes]);
    }

    #[NoAdminRequired]
    public function monthlyStats(int $employeeId, int $year, int $month): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $stats = $this->timeEntryService->getMonthlyStats($employeeId, $year, $month);

        return new JSONResponse($stats);
    }
}
