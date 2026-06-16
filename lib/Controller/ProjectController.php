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

        // Users only see the active projects they may book on (#58):
        // projects open to all employees, plus the ones assigned to them.
        $employee = $this->permissionService->getEmployeeForUser($this->userId);
        if ($employee === null) {
            // No employee record (e.g. a pure admin user): show all active projects.
            $projects = $this->projectService->findAllActive();
        } else {
            $projects = $this->projectService->getProjectsForEmployee($employee->getId());
        }

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

        // Admin/HR can see all projects including inactive, with their member assignment.
        $allMemberIds = $this->projectService->getAllMemberIds();
        $projects = array_map(function ($project) use ($allMemberIds) {
            $data = $project->jsonSerialize();
            $data['memberIds'] = $allMemberIds[$project->getId()] ?? [];
            return $data;
        }, $this->projectService->findAll());

        return $this->successResponse($projects);
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $project = $this->projectService->find($id);
            $data = $project->jsonSerialize();
            // Member assignment is management data — only expose it to managers.
            if ($this->permissionService->canManageProjects($this->userId)) {
                $data['memberIds'] = $this->projectService->getMemberIds($id);
            }
            return $this->successResponse($data);
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
        ?string $customer = null,
        bool $allEmployees = true,
        ?array $memberIds = null
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
                $customer,
                $allEmployees,
                $memberIds
            );

            $data = $project->jsonSerialize();
            $data['memberIds'] = $this->projectService->getMemberIds($project->getId());
            return $this->createdResponse($data);
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
        ?string $customer = null,
        bool $allEmployees = true,
        ?array $memberIds = null
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
                $customer,
                $allEmployees,
                $memberIds
            );

            $data = $project->jsonSerialize();
            $data['memberIds'] = $this->projectService->getMemberIds($project->getId());
            return $this->successResponse($data);
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
