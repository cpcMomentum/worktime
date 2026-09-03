<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Department>
 */
class DepartmentMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_departments', Department::class);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): Department {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @return Department[]
     */
    public function findAll(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('name', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return Department[]
     */
    public function findAllActive(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('is_active', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)))
            ->orderBy('name', 'ASC');

        return $this->findEntities($qb);
    }

    public function existsByName(string $name, ?int $excludeId = null): bool {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('name', $qb->createNamedParameter($name)));

        if ($excludeId !== null) {
            $qb->andWhere($qb->expr()->neq('id', $qb->createNamedParameter($excludeId, IQueryBuilder::PARAM_INT)));
        }

        $result = $qb->executeQuery();
        $count = $result->fetchOne();
        $result->closeCursor();

        return (int)$count > 0;
    }
}
