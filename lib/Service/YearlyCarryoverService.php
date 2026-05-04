<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\YearlyCarryover;
use OCA\WorkTime\Db\YearlyCarryoverMapper;
use OCP\AppFramework\Db\DoesNotExistException;

class YearlyCarryoverService {

    public function __construct(
        private YearlyCarryoverMapper $mapper,
        private AuditLogService $auditLogService,
    ) {
    }

    /**
     * @return YearlyCarryover[]
     */
    public function findByEmployee(int $employeeId): array {
        return $this->mapper->findByEmployee($employeeId);
    }

    /**
     * @return YearlyCarryover[]
     */
    public function findByYear(int $year): array {
        return $this->mapper->findByYear($year);
    }

    public function findByEmployeeAndYear(int $employeeId, int $year): ?YearlyCarryover {
        try {
            return $this->mapper->findByEmployeeAndYear($employeeId, $year);
        } catch (DoesNotExistException) {
            return null;
        }
    }

    public function getOvertimeCarryoverMinutes(int $employeeId, int $year): int {
        $carryover = $this->findByEmployeeAndYear($employeeId, $year);
        return $carryover ? $carryover->getOvertimeMinutes() : 0;
    }

    public function getVacationCarryoverDays(int $employeeId, int $year): float {
        $carryover = $this->findByEmployeeAndYear($employeeId, $year);
        return $carryover ? $carryover->getVacationDaysFloat() : 0.0;
    }

    /**
     * @throws ValidationException
     */
    public function upsert(
        int $employeeId,
        int $year,
        int $overtimeMinutes,
        float $vacationDays,
        ?string $note,
        string $currentUserId,
    ): YearlyCarryover {
        $existing = $this->findByEmployeeAndYear($employeeId, $year);

        if ($existing) {
            $oldValues = $existing->jsonSerialize();
            $existing->setOvertimeMinutes($overtimeMinutes);
            $existing->setVacationDays(number_format($vacationDays, 1, '.', ''));
            $existing->setNote($note);
            $existing->setUpdatedAt(new DateTime());

            $result = $this->mapper->update($existing);

            $this->auditLogService->logUpdate(
                $currentUserId, 'yearly_carryover', $result->getId(),
                $oldValues, $result->jsonSerialize()
            );

            return $result;
        }

        $carryover = new YearlyCarryover();
        $carryover->setEmployeeId($employeeId);
        $carryover->setYear($year);
        $carryover->setOvertimeMinutes($overtimeMinutes);
        $carryover->setVacationDays(number_format($vacationDays, 1, '.', ''));
        $carryover->setNote($note);
        $carryover->setCreatedBy($currentUserId);
        $carryover->setCreatedAt(new DateTime());
        $carryover->setUpdatedAt(new DateTime());

        $result = $this->mapper->insert($carryover);

        $this->auditLogService->logCreate(
            $currentUserId, 'yearly_carryover', $result->getId(),
            $result->jsonSerialize()
        );

        return $result;
    }

    public function deleteByEmployeeId(int $employeeId): void {
        $this->mapper->deleteByEmployeeId($employeeId);
    }
}
