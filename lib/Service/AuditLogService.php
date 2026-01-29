<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\AuditLog;
use OCA\WorkTime\Db\AuditLogMapper;
use OCP\IRequest;

class AuditLogService {

    public function __construct(
        private AuditLogMapper $auditLogMapper,
        private ?IRequest $request = null,
    ) {
    }

    /**
     * @return AuditLog[]
     */
    public function findByUser(string $userId, int $limit = 100): array {
        return $this->auditLogMapper->findByUser($userId, $limit);
    }

    /**
     * @return AuditLog[]
     */
    public function findByEntity(string $entityType, int $entityId): array {
        return $this->auditLogMapper->findByEntity($entityType, $entityId);
    }

    /**
     * @return AuditLog[]
     */
    public function findByDateRange(DateTime $startDate, DateTime $endDate, int $limit = 1000): array {
        return $this->auditLogMapper->findByDateRange($startDate, $endDate, $limit);
    }

    /**
     * @return AuditLog[]
     */
    public function findRecent(int $limit = 50): array {
        return $this->auditLogMapper->findRecent($limit);
    }

    /**
     * Log an action
     */
    public function log(
        string $userId,
        string $action,
        string $entityType,
        ?int $entityId = null,
        ?array $oldValues = null,
        ?array $newValues = null
    ): AuditLog {
        $auditLog = new AuditLog();
        $auditLog->setUserId($userId);
        $auditLog->setAction($action);
        $auditLog->setEntityType($entityType);
        $auditLog->setEntityId($entityId);

        if ($oldValues !== null) {
            $auditLog->setOldValuesArray($oldValues);
        }

        if ($newValues !== null) {
            $auditLog->setNewValuesArray($newValues);
        }

        // Get IP address from request
        if ($this->request) {
            $auditLog->setIpAddress($this->request->getRemoteAddress());
        }

        $auditLog->setCreatedAt(new DateTime());

        return $this->auditLogMapper->insert($auditLog);
    }

    /**
     * Log a create action
     */
    public function logCreate(string $userId, string $entityType, ?int $entityId, array $newValues): AuditLog {
        return $this->log($userId, AuditLog::ACTION_CREATE, $entityType, $entityId, null, $newValues);
    }

    /**
     * Log an update action
     */
    public function logUpdate(string $userId, string $entityType, ?int $entityId, array $oldValues, array $newValues): AuditLog {
        return $this->log($userId, AuditLog::ACTION_UPDATE, $entityType, $entityId, $oldValues, $newValues);
    }

    /**
     * Log a delete action
     */
    public function logDelete(string $userId, string $entityType, ?int $entityId, array $oldValues): AuditLog {
        return $this->log($userId, AuditLog::ACTION_DELETE, $entityType, $entityId, $oldValues, null);
    }

    /**
     * Delete audit logs older than a specific date
     */
    public function deleteOlderThan(DateTime $date): int {
        return $this->auditLogMapper->deleteOlderThan($date);
    }

    /**
     * Clean up old audit logs (e.g., older than 1 year)
     */
    public function cleanup(int $retentionDays = 365): int {
        $cutoffDate = new DateTime("-{$retentionDays} days");
        return $this->deleteOlderThan($cutoffDate);
    }
}
