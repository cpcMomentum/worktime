<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Project;
use OCA\WorkTime\Db\ProjectMapper;
use OCA\WorkTime\Db\ProjectEmployeeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use Psr\Log\LoggerInterface;

class ProjectService {

    public function __construct(
        private ProjectMapper $projectMapper,
        private ProjectEmployeeMapper $projectEmployeeMapper,
        private AuditLogService $auditLogService,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * @return Project[]
     */
    public function findAll(): array {
        return $this->projectMapper->findAll();
    }

    /**
     * @return Project[]
     */
    public function findAllActive(): array {
        return $this->projectMapper->findAllActive();
    }

    /**
     * @throws NotFoundException
     */
    public function find(int $id): Project {
        try {
            return $this->projectMapper->find($id);
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Project not found');
        }
    }

    /**
     * @throws ValidationException
     */
    public function create(
        string $name,
        ?string $code = null,
        ?string $description = null,
        ?string $color = null,
        bool $isActive = true,
        bool $isBillable = true,
        string $currentUserId = '',
        ?string $customer = null,
        bool $allEmployees = true,
        ?array $memberIds = null
    ): Project {
        // Validate
        $errors = $this->validate($name, $code);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        $project = new Project();
        $project->setName($name);
        $project->setCode($code);
        $project->setDescription($description);
        $project->setCustomer($customer);
        $project->setColor($color);
        $project->setIsActive($isActive);
        $project->setIsBillable($isBillable);
        $project->setAllEmployees($allEmployees);
        $project->setCreatedAt(new DateTime());
        $project->setUpdatedAt(new DateTime());

        $project = $this->projectMapper->insert($project);

        if ($memberIds !== null) {
            $this->projectEmployeeMapper->setMembers($project->getId(), $memberIds);
        }

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logCreate($currentUserId, 'project', $project->getId(), $project->jsonSerialize());
        }

        return $project;
    }

    /**
     * @throws NotFoundException
     * @throws ValidationException
     */
    public function update(
        int $id,
        string $name,
        ?string $code = null,
        ?string $description = null,
        ?string $color = null,
        bool $isActive = true,
        bool $isBillable = true,
        string $currentUserId = '',
        ?string $customer = null,
        bool $allEmployees = true,
        ?array $memberIds = null
    ): Project {
        $project = $this->find($id);
        $oldValues = $project->jsonSerialize();

        // Validate
        $errors = $this->validate($name, $code, $id);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        $project->setName($name);
        $project->setCode($code);
        $project->setDescription($description);
        $project->setCustomer($customer);
        $project->setColor($color);
        $project->setIsActive($isActive);
        $project->setIsBillable($isBillable);
        $project->setAllEmployees($allEmployees);
        $project->setUpdatedAt(new DateTime());

        $project = $this->projectMapper->update($project);

        if ($memberIds !== null) {
            $this->projectEmployeeMapper->setMembers($project->getId(), $memberIds);
        }

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logUpdate($currentUserId, 'project', $project->getId(), $oldValues, $project->jsonSerialize());
        }

        return $project;
    }

    /**
     * @throws NotFoundException
     */
    public function delete(int $id, string $currentUserId = ''): void {
        $project = $this->find($id);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logDelete($currentUserId, 'project', $project->getId(), $project->jsonSerialize());
        }

        $this->projectEmployeeMapper->deleteForProject($id);
        $this->projectMapper->delete($project);
    }

    /**
     * Employee IDs assigned to a project (only meaningful when allEmployees=0).
     *
     * @return int[]
     */
    public function getMemberIds(int $projectId): array {
        return $this->projectEmployeeMapper->findEmployeeIdsForProject($projectId);
    }

    /**
     * All project member IDs in a single query, grouped by project ID.
     * Use this instead of calling getMemberIds() per project to avoid N+1 queries.
     *
     * @return array<int, int[]>
     */
    public function getAllMemberIds(): array {
        return $this->projectEmployeeMapper->findAllGroupedByProject();
    }

    /**
     * Active projects an employee may book on: projects open to all employees,
     * plus the ones the employee is explicitly assigned to (#58).
     *
     * @return Project[]
     */
    public function getProjectsForEmployee(int $employeeId): array {
        $assignedIds = $this->projectEmployeeMapper->findProjectIdsForEmployee($employeeId);
        $assigned = array_fill_keys($assignedIds, true);

        return array_values(array_filter(
            $this->projectMapper->findAllActive(),
            static fn (Project $p) => (bool)$p->getAllEmployees() || isset($assigned[$p->getId()])
        ));
    }

    /**
     * Whether the given employee may book on the given project (#58).
     */
    public function isProjectAllowedForEmployee(int $projectId, int $employeeId): bool {
        try {
            $project = $this->find($projectId);
        } catch (NotFoundException $e) {
            return false;
        }
        if ((bool)$project->getAllEmployees()) {
            return true;
        }
        return in_array($employeeId, $this->projectEmployeeMapper->findEmployeeIdsForProject($projectId), true);
    }

    /**
     * @return array<string, string[]>
     */
    private function validate(string $name, ?string $code, ?int $excludeId = null): array {
        $errors = [];

        if (empty(trim($name))) {
            $errors['name'] = ['Project name is required'];
        }

        // Check for duplicate code
        if ($code && $this->projectMapper->existsByCode($code, $excludeId)) {
            $errors['code'] = ['Project code already exists'];
        }

        // Validate code length
        if ($code !== null && strlen($code) > 50) {
            $errors['code'] = ['Project code must be 50 characters or less'];
        }

        return $errors;
    }
}
