<?php

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
        $subQb = $this->db->getQueryBuilder();
        $subQb->select('id')
            ->from('wt_employees')
            ->where($subQb->expr()->eq('supervisor_id', $subQb->createNamedParameter($supervisorEmployeeId, IQueryBuilder::PARAM_INT)));

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
}
