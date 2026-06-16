<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\ProjectService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class ProjectController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private ProjectService $projectService,
        private PermissionService $permissionService,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function index(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // All users can see active projects
        $projects = $this->projectService->findAllActive();

        return $this->successResponse($projects);
    }

    #[NoAdminRequired]
    public function indexAll(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageProjects($this->userId)) {
            return $this->forbiddenResponse();
        }

        // Admin/HR can see all projects including inactive
        $projects = $this->projectService->findAll();

        return $this->successResponse($projects);
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $project = $this->projectService->find($id);
            return $this->successResponse($project);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function create(
        string $name,
        ?string $code = null,
        ?string $description = null,
        ?string $color = null,
        bool $isActive = true,
        bool $isBillable = true,
        ?string $customer = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageProjects($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $project = $this->projectService->create(
                $name,
                $code,
                $description,
                $color,
                $isActive,
                $isBillable,
                $this->userId,
                $customer
            );

            return $this->createdResponse($project);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function update(
        int $id,
        string $name,
        ?string $code = null,
        ?string $description = null,
        ?string $color = null,
        bool $isActive = true,
        bool $isBillable = true,
        ?string $customer = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageProjects($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $project = $this->projectService->update(
                $id,
                $name,
                $code,
                $description,
                $color,
                $isActive,
                $isBillable,
                $this->userId,
                $customer
            );

            return $this->successResponse($project);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function destroy(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageProjects($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $this->projectService->delete($id, $this->userId);
            return $this->deletedResponse();
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
