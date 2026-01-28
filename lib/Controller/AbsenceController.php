<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\ForbiddenException;
use OCA\WorkTime\Service\NotFoundException;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\ValidationException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class AbsenceController extends OCSController {

    public function __construct(
        IRequest $request,
        private ?string $userId,
        private AbsenceService $absenceService,
        private EmployeeService $employeeService,
        private PermissionService $permissionService,
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
            $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
        } elseif ($year) {
            $absences = $this->absenceService->findByEmployeeAndYear($employeeId, $year);
        } else {
            $absences = $this->absenceService->findByEmployee($employeeId);
        }

        return new JSONResponse($absences);
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canViewEmployee($this->userId, $absence->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            return new JSONResponse($absence);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function create(
        int $employeeId,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null
    ): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canEditTimeEntry($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        try {
            // Get employee's federal state
            $employee = $this->employeeService->find($employeeId);
            $federalState = $employee->getFederalState();

            $absence = $this->absenceService->create(
                $employeeId,
                $type,
                $startDate,
                $endDate,
                $note,
                $federalState,
                $this->userId
            );

            return new JSONResponse($absence, Http::STATUS_CREATED);
        } catch (ValidationException $e) {
            return new JSONResponse(['error' => $e->getMessage(), 'errors' => $e->getErrors()], Http::STATUS_BAD_REQUEST);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function update(
        int $id,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null
    ): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $absence->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            // Get employee's federal state
            $employee = $this->employeeService->find($absence->getEmployeeId());
            $federalState = $employee->getFederalState();

            $absence = $this->absenceService->update(
                $id,
                $type,
                $startDate,
                $endDate,
                $note,
                $federalState,
                $this->userId
            );

            return new JSONResponse($absence);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        } catch (ValidationException $e) {
            return new JSONResponse(['error' => $e->getMessage(), 'errors' => $e->getErrors()], Http::STATUS_BAD_REQUEST);
        } catch (ForbiddenException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_FORBIDDEN);
        }
    }

    #[NoAdminRequired]
    public function destroy(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $absence->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            $this->absenceService->delete($id, $this->userId);

            return new JSONResponse(['status' => 'deleted']);
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
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $absence->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            $approverEmployee = $this->permissionService->getEmployeeForUser($this->userId);
            if (!$approverEmployee) {
                return new JSONResponse(['error' => 'Approver not found'], Http::STATUS_BAD_REQUEST);
            }

            $absence = $this->absenceService->approve($id, $approverEmployee->getId(), $this->userId);

            return new JSONResponse($absence);
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
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $absence->getEmployeeId())) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            $absence = $this->absenceService->reject($id, $this->userId);

            return new JSONResponse($absence);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        } catch (ForbiddenException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_FORBIDDEN);
        }
    }

    #[NoAdminRequired]
    public function cancel(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $absence = $this->absenceService->find($id);

            // User can cancel their own absences, or admins/HR can cancel any
            if (!$this->permissionService->canEditTimeEntry($this->userId, $absence->getEmployeeId()) &&
                !$this->permissionService->canManageEmployees($this->userId)) {
                return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
            }

            $absence = $this->absenceService->cancel($id, $this->userId);

            return new JSONResponse($absence);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function vacationStats(int $employeeId, int $year): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        try {
            $employee = $this->employeeService->find($employeeId);
            $stats = $this->absenceService->getVacationStats($employeeId, $year, $employee->getVacationDays());

            return new JSONResponse($stats);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function types(): JSONResponse {
        return new JSONResponse(Absence::TYPES);
    }

    #[NoAdminRequired]
    public function pending(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        $employee = $this->permissionService->getEmployeeForUser($this->userId);

        if (!$employee && !$this->permissionService->canManageEmployees($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        if ($this->permissionService->canManageEmployees($this->userId)) {
            // Admin/HR sees all pending
            $absences = $this->absenceService->findPendingForApproval(0);
        } elseif ($employee) {
            // Supervisor sees their team's pending
            $absences = $this->absenceService->findPendingForApproval($employee->getId());
        } else {
            $absences = [];
        }

        return new JSONResponse($absences);
    }
}
