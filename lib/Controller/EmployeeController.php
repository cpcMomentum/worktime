<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class EmployeeController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private EmployeeService $employeeService,
        private PermissionService $permissionService,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function index(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($this->permissionService->canManageEmployees($this->userId)) {
            $employees = $this->employeeService->findAll();
        } else {
            // Regular users can only see their team or themselves
            $employees = $this->permissionService->getTeamMembers($this->userId);
        }

        return $this->successResponse($employees);
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $id)) {
            return $this->forbiddenResponse();
        }

        try {
            $employee = $this->employeeService->find($id);
            return $this->successResponse($employee);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function me(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $employee = $this->employeeService->findByUserId($this->userId);
            return $this->successResponse($employee);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function create(
        string $userId,
        string $firstName,
        string $lastName,
        ?string $email = null,
        ?string $personnelNumber = null,
        float $weeklyHours = 40.0,
        int $vacationDays = 30,
        ?int $supervisorId = null,
        string $federalState = 'BY',
        ?string $entryDate = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $employee = $this->employeeService->create(
                $userId,
                $firstName,
                $lastName,
                $email,
                $personnelNumber,
                $weeklyHours,
                $vacationDays,
                $supervisorId,
                $federalState,
                $entryDate,
                $this->userId
            );

            return $this->createdResponse($employee);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function update(
        int $id,
        string $firstName,
        string $lastName,
        ?string $email = null,
        ?string $personnelNumber = null,
        float $weeklyHours = 40.0,
        int $vacationDays = 30,
        ?int $supervisorId = null,
        string $federalState = 'BY',
        ?string $entryDate = null,
        ?string $exitDate = null,
        bool $isActive = true
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $employee = $this->employeeService->update(
                $id,
                $firstName,
                $lastName,
                $email,
                $personnelNumber,
                $weeklyHours,
                $vacationDays,
                $supervisorId,
                $federalState,
                $entryDate,
                $exitDate,
                $isActive,
                $this->userId
            );

            return $this->successResponse($employee);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function destroy(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $this->employeeService->delete($id, $this->userId);
            return $this->deletedResponse();
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function team(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $teamMembers = $this->permissionService->getTeamMembers($this->userId);

        return $this->successResponse($teamMembers);
    }

    #[NoAdminRequired]
    public function federalStates(): JSONResponse {
        return $this->successResponse(Employee::FEDERAL_STATES);
    }

    #[NoAdminRequired]
    public function availableUsers(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        $users = $this->employeeService->getAvailableUsers();
        return $this->successResponse($users);
    }
}
