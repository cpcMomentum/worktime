<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class AbsenceController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private AbsenceService $absenceService,
        private EmployeeService $employeeService,
        private PermissionService $permissionService,
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
            $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
        } elseif ($year) {
            $absences = $this->absenceService->findByEmployeeAndYear($employeeId, $year);
        } else {
            $absences = $this->absenceService->findByEmployee($employeeId);
        }

        return $this->successResponse($absences);
    }

    #[NoAdminRequired]
    public function show(mixed $id): JSONResponse {
        // Handle route conflict: if $id is not numeric, this might be a misrouted request
        if (!is_numeric($id)) {
            return $this->successResponse(['error' => 'Invalid ID'], 400);
        }
        $id = (int) $id;

        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canViewEmployee($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            return $this->successResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function create(
        int $employeeId,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null,
        bool $isHalfDay = false
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canEditTimeEntry($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
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
                $this->userId,
                $isHalfDay
            );

            return $this->createdResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function update(
        int $id,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null,
        bool $isHalfDay = false
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
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
                $this->userId,
                $isHalfDay
            );

            return $this->successResponse($absence);
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
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $this->absenceService->delete($id, $this->userId);

            return $this->deletedResponse();
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
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $approverEmployee = $this->permissionService->getEmployeeForUser($this->userId);
            if (!$approverEmployee) {
                return $this->successResponse(['error' => 'Approver not found'], 400);
            }

            $absence = $this->absenceService->approve($id, $approverEmployee->getId(), $this->userId);

            return $this->successResponse($absence);
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
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $absence = $this->absenceService->reject($id, $this->userId);

            return $this->successResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function cancel(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $absence = $this->absenceService->find($id);

            // User can cancel their own absences, or admins/HR can cancel any
            if (!$this->permissionService->canEditTimeEntry($this->userId, $absence->getEmployeeId()) &&
                !$this->permissionService->canManageEmployees($this->userId)) {
                return $this->forbiddenResponse();
            }

            $absence = $this->absenceService->cancel($id, $this->userId);

            return $this->successResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function vacationStats(int $employeeId, int $year): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        try {
            $employee = $this->employeeService->find($employeeId);
            $stats = $this->absenceService->getVacationStats($employeeId, $year, $employee->getVacationDays());

            return $this->successResponse($stats);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function types(): JSONResponse {
        return $this->successResponse(Absence::TYPES);
    }

    #[NoAdminRequired]
    public function pending(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $employee = $this->permissionService->getEmployeeForUser($this->userId);

        if (!$employee && !$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
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

        // Enrich absences with employee data
        $result = [];
        foreach ($absences as $absence) {
            $absenceData = $absence->jsonSerialize();
            try {
                $emp = $this->employeeService->find($absence->getEmployeeId());
                $absenceData['employeeName'] = $emp->getFullName();
                $absenceData['employeeUserId'] = $emp->getUserId();
            } catch (\Exception $e) {
                $absenceData['employeeName'] = 'Unbekannt';
                $absenceData['employeeUserId'] = '';
            }
            $result[] = $absenceData;
        }

        return $this->successResponse($result);
    }
}
