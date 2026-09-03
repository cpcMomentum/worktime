<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Department;
use OCA\WorkTime\Db\DepartmentMapper;
use OCA\WorkTime\Db\EmployeeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use Psr\Log\LoggerInterface;

class DepartmentService {

    public function __construct(
        private DepartmentMapper $departmentMapper,
        private EmployeeMapper $employeeMapper,
        private AuditLogService $auditLogService,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * @return Department[]
     */
    public function findAll(): array {
        return $this->departmentMapper->findAll();
    }

    /**
     * @return Department[]
     */
    public function findAllActive(): array {
        return $this->departmentMapper->findAllActive();
    }

    /**
     * @throws NotFoundException
     */
    public function find(int $id): Department {
        try {
            return $this->departmentMapper->find($id);
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Department not found');
        }
    }

    /**
     * @throws ValidationException
     */
    public function create(
        string $name,
        bool $isActive = true,
        string $currentUserId = ''
    ): Department {
        $errors = $this->validate($name);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        $department = new Department();
        $department->setName(trim($name));
        $department->setIsActive($isActive);
        $department->setCreatedAt(new DateTime());
        $department->setUpdatedAt(new DateTime());

        $department = $this->departmentMapper->insert($department);

        if ($currentUserId) {
            $this->auditLogService->logCreate($currentUserId, 'department', $department->getId(), $department->jsonSerialize());
        }

        return $department;
    }

    /**
     * @throws NotFoundException
     * @throws ValidationException
     */
    public function update(
        int $id,
        string $name,
        bool $isActive = true,
        string $currentUserId = ''
    ): Department {
        $department = $this->find($id);
        $oldValues = $department->jsonSerialize();

        $errors = $this->validate($name, $id);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        $department->setName(trim($name));
        $department->setIsActive($isActive);
        $department->setUpdatedAt(new DateTime());

        $department = $this->departmentMapper->update($department);

        if ($currentUserId) {
            $this->auditLogService->logUpdate($currentUserId, 'department', $department->getId(), $oldValues, $department->jsonSerialize());
        }

        return $department;
    }

    /**
     * Delete a department and unassign its members (department_id -> null).
     * History is untouched; only the organisational assignment is cleared.
     *
     * @throws NotFoundException
     */
    public function delete(int $id, string $currentUserId = ''): void {
        $department = $this->find($id);

        if ($currentUserId) {
            $this->auditLogService->logDelete($currentUserId, 'department', $department->getId(), $department->jsonSerialize());
        }

        // Unassign all members (including resting/inactive ones).
        foreach ($this->employeeMapper->findByDepartment($id) as $employee) {
            $employee->setDepartmentId(null);
            $employee->setUpdatedAt(new DateTime());
            $this->employeeMapper->update($employee);
        }

        $this->departmentMapper->delete($department);
    }

    /**
     * How many employees would be unassigned if this department were deleted.
     * Backs the delete-confirmation dialog (#570, G1).
     *
     * @throws NotFoundException
     */
    public function deletionImpact(int $id): array {
        $this->find($id);
        return [
            'memberCount' => count($this->employeeMapper->findByDepartment($id)),
        ];
    }

    /**
     * @return array<string, string[]>
     */
    private function validate(string $name, ?int $excludeId = null): array {
        $errors = [];

        $trimmed = trim($name);
        if ($trimmed === '') {
            $errors['name'] = ['Department name is required'];
        } elseif (strlen($trimmed) > 255) {
            $errors['name'] = ['Department name must be 255 characters or less'];
        } elseif ($this->departmentMapper->existsByName($trimmed, $excludeId)) {
            $errors['name'] = ['Department name already exists'];
        }

        return $errors;
    }
}
