<?php

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Employee>
 */
class EmployeeMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_employees', Employee::class);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): Employee {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByUserId(string $userId): Employee {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)));

        return $this->findEntity($qb);
    }

    /**
     * @return Employee[]
     */
    public function findAll(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('last_name', 'ASC')
            ->addOrderBy('first_name', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return Employee[]
     */
    public function findAllActive(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('is_active', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)))
            ->orderBy('last_name', 'ASC')
            ->addOrderBy('first_name', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return Employee[]
     */
    public function findBySupervisor(int $supervisorId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('supervisor_id', $qb->createNamedParameter($supervisorId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('is_active', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)))
            ->orderBy('last_name', 'ASC')
            ->addOrderBy('first_name', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return Employee[]
     */
    public function findByFederalState(string $federalState): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)))
            ->andWhere($qb->expr()->eq('is_active', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)))
            ->orderBy('last_name', 'ASC');

        return $this->findEntities($qb);
    }

    public function existsByUserId(string $userId): bool {
        try {
            $this->findByUserId($userId);
            return true;
        } catch (DoesNotExistException) {
            return false;
        }
    }

    /**
     * @return string[]
     */
    public function getAllUserIds(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('user_id')
            ->from($this->getTableName());

        $result = $qb->executeQuery();
        $userIds = [];
        while ($row = $result->fetch()) {
            $userIds[] = $row['user_id'];
        }
        $result->closeCursor();

        return $userIds;
    }
}
