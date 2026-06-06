<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use DateTime;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<WorkSchedule>
 */
class WorkScheduleMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_work_schedules', WorkSchedule::class);
    }

    /**
     * @throws DoesNotExistException
     */
    public function find(int $id): WorkSchedule {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * Get all schedules for an employee, newest first.
     *
     * @return WorkSchedule[]
     */
    public function findByEmployeeId(int $employeeId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->orderBy('valid_from', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Get the schedule that is active for a specific date.
     * Returns the schedule with the highest valid_from that is <= $date.
     *
     * @throws DoesNotExistException
     */
    public function findForDate(int $employeeId, DateTime $date): WorkSchedule {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->lte('valid_from', $qb->createNamedParameter($date->format('Y-m-d'))))
            ->orderBy('valid_from', 'DESC')
            ->setMaxResults(1);

        return $this->findEntity($qb);
    }

    /**
     * Get the active schedule (highest valid_from <= $date) for each of the
     * given employees in a single query, avoiding an N+1 lookup.
     *
     * @param int[] $employeeIds
     * @return array<int, WorkSchedule> keyed by employee_id
     */
    public function findActiveForEmployees(array $employeeIds, DateTime $date): array {
        if (empty($employeeIds)) {
            return [];
        }

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->in('employee_id', $qb->createNamedParameter($employeeIds, IQueryBuilder::PARAM_INT_ARRAY)))
            ->andWhere($qb->expr()->lte('valid_from', $qb->createNamedParameter($date->format('Y-m-d'))))
            ->orderBy('valid_from', 'ASC');

        // ASC order: later rows have a higher valid_from, so each overwrite
        // leaves the schedule with the highest valid_from (<= $date) in the map.
        $result = [];
        foreach ($this->findEntities($qb) as $schedule) {
            $result[$schedule->getEmployeeId()] = $schedule;
        }

        return $result;
    }

    /**
     * Get all schedules that overlap with a date range.
     * Returns schedules where valid_from <= end, ordered by valid_from ASC.
     *
     * @return WorkSchedule[]
     */
    public function findByEmployeeAndDateRange(int $employeeId, DateTime $start, DateTime $end): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->lte('valid_from', $qb->createNamedParameter($end->format('Y-m-d'))))
            ->orderBy('valid_from', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Delete all schedules for an employee (cascade on employee delete).
     */
    public function deleteByEmployeeId(int $employeeId): void {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }
}
