<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use DateTime;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<TimeEntry>
 */
class TimeEntryMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_time_entries', TimeEntry::class);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): TimeEntry {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @return TimeEntry[]
     */
    public function findByEmployee(int $employeeId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->orderBy('date', 'DESC')
            ->addOrderBy('start_time', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return TimeEntry[]
     */
    public function findByEmployeeAndMonth(int $employeeId, int $year, int $month): array {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->orderBy('date', 'ASC')
            ->addOrderBy('start_time', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Batch-load time entries for multiple employees in a single month.
     *
     * @param int[] $employeeIds
     * @return array<int, TimeEntry[]> Indexed by employee_id
     */
    public function findByEmployeeIdsAndMonth(array $employeeIds, int $year, int $month): array {
        if (empty($employeeIds)) {
            return [];
        }

        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->in('employee_id', $qb->createNamedParameter($employeeIds, IQueryBuilder::PARAM_INT_ARRAY)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->orderBy('date', 'ASC')
            ->addOrderBy('start_time', 'ASC');

        $entries = $this->findEntities($qb);

        // Group by employee_id
        $grouped = array_fill_keys($employeeIds, []);
        foreach ($entries as $entry) {
            $grouped[$entry->getEmployeeId()][] = $entry;
        }

        return $grouped;
    }

    /**
     * Batch-load time entries for multiple employees for an entire year.
     *
     * @param int[] $employeeIds
     * @return array<int, TimeEntry[]> Indexed by employee_id
     */
    public function findByEmployeeIdsAndYear(array $employeeIds, int $year): array {
        if (empty($employeeIds)) {
            return [];
        }

        $startDate = new DateTime("$year-01-01");
        $endDate = new DateTime("$year-12-31");

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->in('employee_id', $qb->createNamedParameter($employeeIds, IQueryBuilder::PARAM_INT_ARRAY)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->orderBy('date', 'ASC')
            ->addOrderBy('start_time', 'ASC');

        $entries = $this->findEntities($qb);

        $grouped = array_fill_keys($employeeIds, []);
        foreach ($entries as $entry) {
            $grouped[$entry->getEmployeeId()][] = $entry;
        }

        return $grouped;
    }

    /**
     * Batch-load monthly status summaries for multiple employees.
     *
     * @param int[] $employeeIds
     * @return array<int, array{draft: int, submitted: int, approved: int, rejected: int}> Indexed by employee_id
     */
    public function getMonthlyStatusSummaryBatch(array $employeeIds, int $year, int $month): array {
        $result = array_fill_keys($employeeIds, [
            TimeEntry::STATUS_DRAFT => 0,
            TimeEntry::STATUS_SUBMITTED => 0,
            TimeEntry::STATUS_APPROVED => 0,
            TimeEntry::STATUS_REJECTED => 0,
        ]);

        if (empty($employeeIds)) {
            return $result;
        }

        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select('employee_id', 'status', $qb->func()->count('id', 'count'))
            ->from($this->getTableName())
            ->where($qb->expr()->in('employee_id', $qb->createNamedParameter($employeeIds, IQueryBuilder::PARAM_INT_ARRAY)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->groupBy('employee_id', 'status');

        $queryResult = $qb->executeQuery();
        $rows = $queryResult->fetchAll();
        $queryResult->closeCursor();

        foreach ($rows as $row) {
            $empId = (int)$row['employee_id'];
            $status = $row['status'];
            if (isset($result[$empId][$status])) {
                $result[$empId][$status] = (int)$row['count'];
            }
        }

        return $result;
    }

    /**
     * @return TimeEntry[]
     */
    public function findByEmployeeAndDateRange(int $employeeId, DateTime $startDate, DateTime $endDate): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->orderBy('date', 'ASC')
            ->addOrderBy('start_time', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return TimeEntry[]
     */
    public function findByEmployeeAndDate(int $employeeId, DateTime $date): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('date', $qb->createNamedParameter($date, IQueryBuilder::PARAM_DATE)))
            ->orderBy('start_time', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return TimeEntry[]
     */
    public function findByProject(int $projectId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('project_id', $qb->createNamedParameter($projectId, IQueryBuilder::PARAM_INT)))
            ->orderBy('date', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * All time entries in a date range across all employees, ordered by date (#57).
     *
     * @return TimeEntry[]
     */
    public function findByDateRange(DateTime $startDate, DateTime $endDate): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->orderBy('date', 'ASC')
            ->addOrderBy('id', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Sum work minutes grouped by project and employee over a date range (#57).
     * Entries without a project are grouped under projectId 0.
     *
     * @return array<array{projectId: int, employeeId: int, minutes: int}>
     */
    public function sumWorkMinutesGroupedByProjectAndEmployee(DateTime $startDate, DateTime $endDate): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('project_id', 'employee_id')
            ->selectAlias($qb->func()->sum('work_minutes'), 'minutes')
            ->from($this->getTableName())
            ->where($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->groupBy('project_id', 'employee_id');

        $result = $qb->executeQuery();
        $rows = [];
        while ($row = $result->fetch()) {
            $rows[] = [
                'projectId' => (int)$row['project_id'],
                'employeeId' => (int)$row['employee_id'],
                'minutes' => (int)$row['minutes'],
            ];
        }
        $result->closeCursor();

        return $rows;
    }

    /**
     * @return TimeEntry[]
     */
    public function findByStatus(string $status): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter($status)))
            ->orderBy('date', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return TimeEntry[]
     */
    public function findPendingForApproval(int $supervisorEmployeeId): array {
        $qb = $this->db->getQueryBuilder();

        // Subquery to get employee IDs supervised by the given supervisor
        $supervisorParam = $qb->createNamedParameter($supervisorEmployeeId, IQueryBuilder::PARAM_INT);
        $subQb = $this->db->getQueryBuilder();
        $subQb->select('id')
            ->from('wt_employees')
            ->where($subQb->expr()->eq('supervisor_id', $supervisorParam));

        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(TimeEntry::STATUS_SUBMITTED)))
            ->andWhere($qb->expr()->in('employee_id', $qb->createFunction('(' . $subQb->getSQL() . ')')))
            ->orderBy('date', 'ASC');

        return $this->findEntities($qb);
    }

    public function sumWorkMinutesByEmployeeAndMonth(int $employeeId, int $year, int $month): int {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->sum('work_minutes'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)));

        $result = $qb->executeQuery();
        $sum = $result->fetchOne();
        $result->closeCursor();

        return (int)$sum;
    }

    public function countEntriesByEmployeeAndMonth(int $employeeId, int $year, int $month): int {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)));

        $result = $qb->executeQuery();
        $count = $result->fetchOne();
        $result->closeCursor();

        return (int)$count;
    }

    /**
     * Get monthly status summary for an employee
     *
     * @return array{draft: int, submitted: int, approved: int, rejected: int}
     */
    public function getMonthlyStatusSummary(int $employeeId, int $year, int $month): array {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select('status', $qb->func()->count('id', 'count'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->groupBy('status');

        $result = $qb->executeQuery();
        $rows = $result->fetchAll();
        $result->closeCursor();

        $summary = [
            TimeEntry::STATUS_DRAFT => 0,
            TimeEntry::STATUS_SUBMITTED => 0,
            TimeEntry::STATUS_APPROVED => 0,
            TimeEntry::STATUS_REJECTED => 0,
        ];

        foreach ($rows as $row) {
            $status = $row['status'];
            if (isset($summary[$status])) {
                $summary[$status] = (int)$row['count'];
            }
        }

        return $summary;
    }
}
