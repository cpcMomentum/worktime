<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use DateTime;
use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\ArchiveQueue;
use OCA\WorkTime\Db\ArchiveQueueMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\ForbiddenException;
use OCA\WorkTime\Service\NotFoundException;
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
        private ArchiveQueueMapper $archiveQueueMapper,
        private CompanySettingsService $settingsService,
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

        // Queue PDF archiving if any entries were approved
        $archiveQueued = false;
        if ($result['approved'] > 0) {
            $archiveQueued = $this->queueArchiveJob($employeeId, $year, $month);
        }

        return new JSONResponse([
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

            $job = new ArchiveQueue();
            $job->setEmployeeId($employeeId);
            $job->setYear($year);
            $job->setMonth($month);
            $job->setApproverId($approverEmployee?->getId());
            $job->setApprovedAt(new DateTime());
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
