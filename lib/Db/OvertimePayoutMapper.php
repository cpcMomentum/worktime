<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<OvertimePayout>
 */
class OvertimePayoutMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_overtime_payouts', OvertimePayout::class);
    }

    /**
     * @throws DoesNotExistException
     */
    public function find(int $id): OvertimePayout {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * All payouts of an employee in a given year, newest first.
     *
     * @return OvertimePayout[]
     */
    public function findByEmployeeAndYear(int $employeeId, int $year): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->gte('payout_date', $qb->createNamedParameter($year . '-01-01')))
            ->andWhere($qb->expr()->lte('payout_date', $qb->createNamedParameter($year . '-12-31')))
            ->orderBy('payout_date', 'DESC')
            ->addOrderBy('id', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * All payouts in a given year (across employees), newest first.
     *
     * @return OvertimePayout[]
     */
    public function findByYear(int $year): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->gte('payout_date', $qb->createNamedParameter($year . '-01-01')))
            ->andWhere($qb->expr()->lte('payout_date', $qb->createNamedParameter($year . '-12-31')))
            ->orderBy('payout_date', 'DESC')
            ->addOrderBy('id', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Sum of paid-out minutes for an employee in a given year.
     */
    public function sumMinutesByEmployeeAndYear(int $employeeId, int $year): int {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->sum('minutes'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->gte('payout_date', $qb->createNamedParameter($year . '-01-01')))
            ->andWhere($qb->expr()->lte('payout_date', $qb->createNamedParameter($year . '-12-31')));

        $result = $qb->executeQuery();
        $sum = $result->fetchOne();
        $result->closeCursor();

        return (int)($sum ?? 0);
    }

    public function deleteByEmployeeId(int $employeeId): void {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }
}
