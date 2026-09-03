<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Service\DepartmentService;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class DepartmentController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private DepartmentService $departmentService,
        private PermissionService $permissionService,
    ) {
        parent::__construct($request, $userId);
    }

    /**
     * Active departments — readable by any authenticated user, since they back
     * the department selector on the employee form and the employee-list filter.
     */
    #[NoAdminRequired]
    public function index(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        return $this->successResponse($this->departmentService->findAllActive());
    }

    /**
     * All departments including inactive ones — management data.
     */
    #[NoAdminRequired]
    public function indexAll(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        return $this->successResponse($this->departmentService->findAll());
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            return $this->successResponse($this->departmentService->find($id));
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function create(string $name, bool $isActive = true): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $department = $this->departmentService->create($name, $isActive, $this->userId);
            return $this->createdResponse($department->jsonSerialize());
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function update(int $id, string $name, bool $isActive = true): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $department = $this->departmentService->update($id, $name, $isActive, $this->userId);
            return $this->successResponse($department->jsonSerialize());
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
            $this->departmentService->delete($id, $this->userId);
            return $this->deletedResponse();
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function deletionImpact(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            return $this->successResponse($this->departmentService->deletionImpact($id));
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
