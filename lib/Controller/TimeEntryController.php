<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use DateTime;
use OCA\WorkTime\Db\ArchiveQueue;
use OCA\WorkTime\Db\ArchiveQueueMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Service\CompanySettingsService;
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
        private LoggerInterface $logger,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function index(int $employeeId, ?int $year = null, ?int $month = null): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
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
        int $employeeId,
        string $date,
        string $startTime,
        string $endTime,
        int $breakMinutes,
        ?int $projectId = null,
        ?string $description = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canEditTimeEntry($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
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
        ?string $description = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

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
                $this->userId
            );

            return $this->successResponse($entry);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function destroy(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $entry = $this->timeEntryService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $entry->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $this->timeEntryService->delete($id, $this->userId);

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
    public function submitMonth(int $employeeId, int $year, int $month): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
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
        $breakMinutes = $this->timeEntryService->suggestBreak($startTime, $endTime);

        return $this->successResponse(['breakMinutes' => $breakMinutes]);
    }

    #[NoAdminRequired]
    public function monthlyStats(int $employeeId, int $year, int $month): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        $stats = $this->timeEntryService->getMonthlyStats($employeeId, $year, $month);

        return $this->successResponse($stats);
    }
}
