<?php

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<YearlyCarryover>
 */
class YearlyCarryoverMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_yearly_carryover', YearlyCarryover::class);
    }

    /**
     * @throws DoesNotExistException
     */
    public function find(int $id): YearlyCarryover {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @throws DoesNotExistException
     */
    public function findByEmployeeAndYear(int $employeeId, int $year): YearlyCarryover {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @return YearlyCarryover[]
     */
    public function findByEmployee(int $employeeId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->orderBy('year', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return YearlyCarryover[]
     */
    public function findByYear(int $year): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)))
            ->orderBy('employee_id', 'ASC');

        return $this->findEntities($qb);
    }

    public function deleteByEmployeeId(int $employeeId): void {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }
}
