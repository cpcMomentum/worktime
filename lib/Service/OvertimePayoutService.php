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
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

class OvertimePayoutService {

    public function __construct(
        private OvertimePayoutMapper $mapper,
        private AuditLogService $auditLogService,
        private OvertimeCalculationService $overtimeCalc,
        private IDBConnection $db,
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

        $year = (int)$payoutDate->format('Y');

        $payout = new OvertimePayout();
        $payout->setEmployeeId($employeeId);
        $payout->setPayoutDate($payoutDate);
        $payout->setMinutes($minutes);
        $payout->setNote(trim($note));
        $payout->setCreatedBy($currentUserId);
        $payout->setCreatedAt(new DateTime());
        $payout->setUpdatedAt(new DateTime());

        // Server-side balance guard (#426): the frontend caps a payout at the
        // available overtime balance, but a direct POST could bypass that and push
        // the balance negative. The net balance for the payout's year already
        // accounts for existing payouts, so a new payout of $minutes is only valid
        // while it does not exceed what remains.
        //
        // The read-check-insert runs in a transaction that first locks the employee
        // row FOR UPDATE (#428). This serializes concurrent payout creations for the
        // same employee: a second request blocks on the lock until the first commits,
        // then reads the now-updated balance and is rejected if it would overdraw.
        $this->db->beginTransaction();
        try {
            $this->lockEmployeeRow($employeeId);

            $available = $this->overtimeCalc->getNetOvertimeMinutes($employeeId, $year);
            if ($minutes > $available) {
                throw new \InvalidArgumentException(sprintf(
                    'Die Auszahlung (%d Min.) überschreitet den verfügbaren Überstundensaldo (%d Min.).',
                    $minutes,
                    $available
                ));
            }

            $result = $this->mapper->insert($payout);

            $this->auditLogService->logCreate(
                $currentUserId, AuditLog::ENTITY_OVERTIME_PAYOUT, $result->getId(),
                $result->jsonSerialize()
            );

            $this->db->commit();
        } catch (\Throwable $e) {
            $this->db->rollBack();
            throw $e;
        }

        return $result;
    }

    /**
     * Take a pessimistic row lock on the employee to serialize concurrent overtime
     * payout creations for that employee (#428). Must be called inside a transaction.
     *
     * Protected so unit tests can stub the lock (mocking IQueryBuilder would pull in
     * Doctrine DBAL types that are absent from the ocp-only test environment); there
     * is no automated integration test against a real MySQL/PostgreSQL/SQLite backend,
     * so the actual FOR UPDATE behaviour must be verified manually against each.
     *
     * Known gap: SQLite has no row-level locking, so Doctrine's SQLite platform drops
     * the FOR UPDATE clause silently (no-op). On SQLite-backed installs this method
     * does not lock anything; serialization there depends entirely on SQLite's own
     * whole-database write locking, not on this call.
     *
     * This SQLite gap is a consciously accepted trade-off (#428): the lock is fully
     * effective on the real deployment backends (PostgreSQL/MySQL/MariaDB), and this
     * is an admin/HR-only path where the underlying race is already implausible, so
     * no SQLite-specific serialization is added.
     */
    protected function lockEmployeeRow(int $employeeId): void {
        $qb = $this->db->getQueryBuilder();
        $qb->select('id')
            ->from('wt_employees')
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->forUpdate();
        $qb->executeQuery()->closeCursor();
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
