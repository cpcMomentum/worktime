<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Project;
use OCA\WorkTime\Db\ProjectMapper;
use OCP\AppFramework\Db\DoesNotExistException;

class ProjectService {

    public function __construct(
        private ProjectMapper $projectMapper,
        private AuditLogService $auditLogService,
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
        string $currentUserId = ''
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
        $project->setColor($color);
        $project->setIsActive($isActive);
        $project->setIsBillable($isBillable);
        $project->setCreatedAt(new DateTime());
        $project->setUpdatedAt(new DateTime());

        $project = $this->projectMapper->insert($project);

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
        string $currentUserId = ''
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
        $project->setColor($color);
        $project->setIsActive($isActive);
        $project->setIsBillable($isBillable);
        $project->setUpdatedAt(new DateTime());

        $project = $this->projectMapper->update($project);

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

        $this->projectMapper->delete($project);
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

        // Validate color format
        if ($code !== null && strlen($code) > 50) {
            $errors['code'] = ['Project code must be 50 characters or less'];
        }

        return $errors;
    }
}
