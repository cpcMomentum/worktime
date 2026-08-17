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

    /**
     * @return int Number of rows actually removed (#424).
     */
    public function deleteByEmployeeId(int $employeeId): int {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    public function countByEmployeeId(int $employeeId): int {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery();
        $count = $result->fetchOne();
        $result->closeCursor();

        return (int)$count;
    }

    /**
     * Ids only: the audit purge in #424 needs to know which rows belonged to
     * this employee, and loading full entities for that would pull thousands
     * of records just to read one column.
     *
     * @return int[]
     */
    public function findIdsByEmployeeId(int $employeeId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('id')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery();
        $ids = [];
        // fetch() statt fetchFirstColumn(): letzteres gibt es in OCP erst ab
        // NC 33, die App unterstuetzt aber ab NC 32 (info.xml min-version).
        while ($row = $result->fetch()) {
            $ids[] = (int)$row['id'];
        }
        $result->closeCursor();

        return $ids;
    }

}
