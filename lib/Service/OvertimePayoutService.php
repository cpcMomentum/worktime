<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\AuditLog;
use OCA\WorkTime\Db\OvertimePayout;
use OCA\WorkTime\Db\OvertimePayoutMapper;
use OCP\AppFramework\Db\DoesNotExistException;

class OvertimePayoutService {

    public function __construct(
        private OvertimePayoutMapper $mapper,
        private AuditLogService $auditLogService,
    ) {
    }

    /**
     * @return OvertimePayout[]
     */
    public function findByEmployeeAndYear(int $employeeId, int $year): array {
        return $this->mapper->findByEmployeeAndYear($employeeId, $year);
    }

    /**
     * @return OvertimePayout[]
     */
    public function findByYear(int $year): array {
        return $this->mapper->findByYear($year);
    }

    public function getPaidOutMinutes(int $employeeId, int $year): int {
        return $this->mapper->sumMinutesByEmployeeAndYear($employeeId, $year);
    }

    /**
     * Record an overtime payout. Reduces the overtime balance of the year the
     * payout is dated in.
     *
     * @throws \InvalidArgumentException on invalid input
     */
    public function create(
        int $employeeId,
        DateTime $payoutDate,
        int $minutes,
        string $note,
        string $currentUserId,
    ): OvertimePayout {
        if ($minutes <= 0) {
            throw new \InvalidArgumentException('Die auszuzahlenden Stunden müssen größer als 0 sein.');
        }
        if (mb_strlen(trim($note)) < 10) {
            throw new \InvalidArgumentException('Bitte einen Grund mit mindestens 10 Zeichen angeben.');
        }

        $payout = new OvertimePayout();
        $payout->setEmployeeId($employeeId);
        $payout->setPayoutDate($payoutDate);
        $payout->setMinutes($minutes);
        $payout->setNote(trim($note));
        $payout->setCreatedBy($currentUserId);
        $payout->setCreatedAt(new DateTime());
        $payout->setUpdatedAt(new DateTime());

        $result = $this->mapper->insert($payout);

        $this->auditLogService->logCreate(
            $currentUserId, AuditLog::ENTITY_OVERTIME_PAYOUT, $result->getId(),
            $result->jsonSerialize()
        );

        return $result;
    }

    public function delete(int $id, string $currentUserId): void {
        try {
            $payout = $this->mapper->find($id);
        } catch (DoesNotExistException) {
            throw new NotFoundException('Overtime payout not found');
        }
        $oldValues = $payout->jsonSerialize();

        $this->mapper->delete($payout);

        $this->auditLogService->logDelete(
            $currentUserId, AuditLog::ENTITY_OVERTIME_PAYOUT, $id, $oldValues
        );
    }

    public function deleteByEmployeeId(int $employeeId): void {
        $this->mapper->deleteByEmployeeId($employeeId);
    }
}
