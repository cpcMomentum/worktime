<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\NotFoundException;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\ValidationException;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class EmployeeController extends OCSController {

    public function __construct(
        IRequest $request,
        private ?string $userId,
        private EmployeeService $employeeService,
        private PermissionService $permissionService,
    ) {
        parent::__construct(Application::APP_ID, $request);
    }

    #[NoAdminRequired]
    public function index(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if ($this->permissionService->canManageEmployees($this->userId)) {
            $employees = $this->employeeService->findAll();
        } else {
            // Regular users can only see their team or themselves
            $employees = $this->permissionService->getTeamMembers($this->userId);
        }

        return new JSONResponse($employees);
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $id)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        try {
            $employee = $this->employeeService->find($id);
            return new JSONResponse($employee);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function me(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $employee = $this->employeeService->findByUserId($this->userId);
            return new JSONResponse($employee);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => 'Employee profile not found'], Http::STATUS_NOT_FOUND);
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
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
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

            return new JSONResponse($employee, Http::STATUS_CREATED);
        } catch (ValidationException $e) {
            return new JSONResponse(['error' => $e->getMessage(), 'errors' => $e->getErrors()], Http::STATUS_BAD_REQUEST);
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
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
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

            return new JSONResponse($employee);
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

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        try {
            $this->employeeService->delete($id, $this->userId);
            return new JSONResponse(['status' => 'deleted']);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function team(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        $teamMembers = $this->permissionService->getTeamMembers($this->userId);

        return new JSONResponse($teamMembers);
    }

    #[NoAdminRequired]
    public function federalStates(): JSONResponse {
        return new JSONResponse(Employee::FEDERAL_STATES);
    }

    #[NoAdminRequired]
    public function availableUsers(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $users = $this->employeeService->getAvailableUsers();
        return new JSONResponse($users);
    }
}
