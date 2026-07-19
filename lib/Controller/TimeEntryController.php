<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use DateTime;
use OCA\WorkTime\Db\ArchiveQueue;
use OCA\WorkTime\Db\ArchiveQueueMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Service\ArchiveService;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\TimeEntryService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

class TimeEntryController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private TimeEntryService $timeEntryService,
        private PermissionService $permissionService,
        private ArchiveQueueMapper $archiveQueueMapper,
        private CompanySettingsService $settingsService,
        private PdfService $pdfService,
        private EmployeeService $employeeService,
        private ArchiveService $archiveService,
        private LoggerInterface $logger,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function index(?int $employeeId = null, ?int $year = null, ?int $month = null): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        if ($year && $month) {
            $entries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
        } else {
            $entries = $this->timeEntryService->findByEmployee($employeeId);
        }

        return $this->successResponse($entries);
    }

    /**
     * Cross-month approval inbox of submitted month-ends (#344). Scope is the
     * requester's visible employees (Admin/HR: all; supervisor: their team);
     * non-approvers get an empty list.
     */
    #[NoAdminRequired]
    public function pendingMonths(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // Approvable scope: own team, plus deputized employees whose supervisor
        // is currently absent (#343).
        $employeeIds = $this->permissionService->getApprovableEmployeeIds($this->userId);

        return $this->successResponse($this->timeEntryService->findSubmittedMonths($employeeIds));
    }

    /**
     * Already-approved months in the requester's scope, newest approval first (#387),
     * so HR can find and reopen a month for correction.
     */
    #[NoAdminRequired]
    public function approvedMonths(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $employeeIds = array_map(
            static fn($employee) => $employee->getId(),
            $this->permissionService->getTeamMembers($this->userId)
        );

        return $this->successResponse($this->timeEntryService->findApprovedMonths($employeeIds));
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canViewEmployee($this->userId, $entry->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            return $this->successResponse($entry);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function create(
        ?int $employeeId = null,
        string $date = '',
        string $startTime = '',
        string $endTime = '',
        int $breakMinutes = 0,
        ?int $projectId = null,
        ?string $description = null,
        ?string $reason = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canEditTimeEntry($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        // Only HR/Admin may correct closed months (with a mandatory reason).
        $allowLockedOverride = $this->permissionService->canManageEmployees($this->userId);

        try {
            $entry = $this->timeEntryService->create(
                $employeeId,
                $date,
                $startTime,
                $endTime,
                $breakMinutes,
                $projectId,
                $description,
                $this->userId,
                $reason,
                $allowLockedOverride
            );

            return $this->createdResponse($entry);
        } catch (\Exception $e) {
            return $this->handleException($e);
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
        ?string $description = null,
        ?string $reason = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // Only HR/Admin may correct closed months (with a mandatory reason).
        $allowLockedOverride = $this->permissionService->canManageEmployees($this->userId);

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $entry->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $entry = $this->timeEntryService->update(
                $id,
                $date,
                $startTime,
                $endTime,
                $breakMinutes,
                $projectId,
                $description,
                $this->userId,
                $reason,
                $allowLockedOverride
            );

            return $this->successResponse($entry);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function destroy(int $id, ?string $reason = null): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // Only HR/Admin may delete in closed months (with a mandatory reason).
        $allowLockedOverride = $this->permissionService->canManageEmployees($this->userId);

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $entry->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $this->timeEntryService->delete($id, $this->userId, $reason, $allowLockedOverride);

            return $this->deletedResponse();
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function submit(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $entry->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $entry = $this->timeEntryService->submit($id, $this->userId);

            return $this->successResponse($entry);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function approve(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $entry->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $entry = $this->timeEntryService->approve($id, $this->userId);

            return $this->successResponse($entry);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function reject(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $entry->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $entry = $this->timeEntryService->reject($id, $this->userId);

            return $this->successResponse($entry);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function submitMonth(?int $employeeId = null, int $year = 0, int $month = 0): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canEditTimeEntry($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        $result = $this->timeEntryService->submitMonth($employeeId, $year, $month, $this->userId);

        return $this->successResponse([
            'status' => 'success',
            'submitted' => $result['submitted'],
            'skipped' => $result['skipped'],
        ]);
    }

    #[NoAdminRequired]
    public function approveMonth(int $employeeId, int $year, int $month): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canApprove($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        $result = $this->timeEntryService->approveMonth($employeeId, $year, $month, $this->userId);

        // Queue PDF archiving if any entries were approved
        $archiveQueued = false;
        if ($result['approved'] > 0) {
            $archiveQueued = $this->queueArchiveJob($employeeId, $year, $month);
        }

        return $this->successResponse([
            'status' => 'success',
            'approved' => $result['approved'],
            'skipped' => $result['skipped'],
            'archiveQueued' => $archiveQueued,
        ]);
    }

    #[NoAdminRequired]
    public function reopenMonth(int $employeeId, int $year, int $month, string $reason = ''): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canApprove($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        try {
            $result = $this->timeEntryService->reopenMonth($employeeId, $year, $month, $reason, $this->userId);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }

        // The archived PDF no longer reflects an approved month — remove it and cancel
        // any still-queued archive job so the archive stays consistent (#323).
        if ($result['reopened'] > 0) {
            $this->cleanupArchiveOnReopen($employeeId, $year, $month);
        }

        return $this->successResponse([
            'status' => 'success',
            'reopened' => $result['reopened'],
            'skipped' => $result['skipped'],
        ]);
    }

    #[NoAdminRequired]
    public function rejectMonth(int $employeeId, int $year, int $month, string $reason = ''): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canApprove($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        try {
            $result = $this->timeEntryService->rejectMonth($employeeId, $year, $month, $reason, $this->userId);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }

        return $this->successResponse([
            'status' => 'success',
            'rejected' => $result['rejected'],
            'skipped' => $result['skipped'],
        ]);
    }

    #[NoAdminRequired]
    public function archiveStatus(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }
        if (!$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        $jobs = $this->archiveQueueMapper->findRecent(20);
        $names = [];
        $items = array_map(function (ArchiveQueue $job) use (&$names) {
            $empId = $job->getEmployeeId();
            if (!isset($names[$empId])) {
                try {
                    $names[$empId] = $this->employeeService->find($empId)->getFullName();
                } catch (\Throwable) {
                    $names[$empId] = '#' . $empId;
                }
            }
            return [
                'id' => $job->getId(),
                'employeeName' => $names[$empId],
                'year' => $job->getYear(),
                'month' => $job->getMonth(),
                'status' => $job->getStatus(),
                'attempts' => $job->getAttempts(),
                'lastError' => $job->getLastError(),
                'processedAt' => $job->getProcessedAt()?->format('c'),
            ];
        }, $jobs);

        $pending = $this->archiveQueueMapper->countByStatus([ArchiveQueue::STATUS_PENDING, ArchiveQueue::STATUS_PROCESSING]);
        $failed = $this->archiveQueueMapper->countByStatus([ArchiveQueue::STATUS_FAILED]);

        return $this->successResponse([
            'configured' => !empty($this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_USER)),
            'pending' => $pending,
            'failed' => $failed,
            'jobs' => $items,
        ]);
    }

    #[NoAdminRequired]
    public function archiveRetry(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }
        if (!$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $job = $this->archiveQueueMapper->find($id);
            if ($job->getStatus() !== ArchiveQueue::STATUS_FAILED) {
                return $this->successResponse(['status' => 'skipped']);
            }
            $job->setStatus(ArchiveQueue::STATUS_PENDING);
            $job->setAttempts(0);
            $job->setLastError(null);
            $this->archiveQueueMapper->update($job);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }

        return $this->successResponse(['status' => 'success']);
    }

    #[NoAdminRequired]
    public function archiveNow(int $employeeId, int $year, int $month): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }
        if (!$this->permissionService->canApprove($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        try {
            $approver = $this->permissionService->getEmployeeForUser($this->userId);
            $result = $this->archiveService->archiveMonth($employeeId, $year, $month, $approver?->getId(), new DateTime());
            // A queued background archive for this month would now be redundant.
            $this->archiveQueueMapper->deletePendingFor($employeeId, $year, $month);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }

        return $this->successResponse([
            'status' => 'success',
            'result' => $result,
        ]);
    }

    /**
     * Remove the archived PDF and cancel queued archive jobs for a month that has
     * been un-approved (reopened), so the archive never holds a stale PDF (#323).
     */
    private function cleanupArchiveOnReopen(int $employeeId, int $year, int $month): void {
        try {
            $this->archiveQueueMapper->deletePendingFor($employeeId, $year, $month);

            $archiveUserId = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_USER);
            if (!empty($archiveUserId)) {
                $employee = $this->employeeService->find($employeeId);
                $this->pdfService->deleteArchivedReport($archiveUserId, $employee, $year, $month);
            }
        } catch (\Throwable $e) {
            $this->logger->warning('Archive cleanup on reopen failed: ' . $e->getMessage());
        }
    }

    /**
     * Queue a PDF archive job for background processing
     */
    private function queueArchiveJob(int $employeeId, int $year, int $month): bool {
        // Check if archive is configured
        $archiveUserId = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_USER);
        if (empty($archiveUserId)) {
            $this->logger->info('PDF archive not configured, skipping archive job');
            return false;
        }

        // Check if job already exists
        if ($this->archiveQueueMapper->existsPending($employeeId, $year, $month)) {
            $this->logger->info('Archive job already pending for employee ' . $employeeId);
            return true;
        }

        try {
            $approverEmployee = $this->permissionService->getEmployeeForUser($this->userId);

            // Get submittedAt from time entries
            $timeEntries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
            $submittedAt = null;
            foreach ($timeEntries as $entry) {
                if ($entry->getSubmittedAt() !== null) {
                    $submittedAt = $entry->getSubmittedAt();
                    break;
                }
            }

            $job = new ArchiveQueue();
            $job->setEmployeeId($employeeId);
            $job->setYear($year);
            $job->setMonth($month);
            $job->setApproverId($approverEmployee?->getId());
            $job->setApprovedAt(new DateTime());
            $job->setSubmittedAt($submittedAt);
            $job->setStatus(ArchiveQueue::STATUS_PENDING);
            $job->setAttempts(0);
            $job->setCreatedAt(new DateTime());

            $this->archiveQueueMapper->insert($job);

            $this->logger->info('Archive job queued for employee ' . $employeeId . ', ' . $year . '-' . $month);
            return true;
        } catch (\Exception $e) {
            $this->logger->error('Failed to queue archive job: ' . $e->getMessage());
            return false;
        }
    }

    #[NoAdminRequired]
    public function suggestBreak(string $startTime, string $endTime): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $breakMinutes = $this->timeEntryService->suggestBreak($startTime, $endTime);

        return $this->successResponse(['breakMinutes' => $breakMinutes]);
    }

    #[NoAdminRequired]
    public function monthlyStats(?int $employeeId = null, int $year = 0, int $month = 0): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        $stats = $this->timeEntryService->getMonthlyStats($employeeId, $year, $month);

        return $this->successResponse($stats);
    }
}
