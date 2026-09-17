<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<EmployeeFavoriteProject>
 */
class EmployeeFavoriteProjectMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_favorite_projects', EmployeeFavoriteProject::class);
    }

    /**
     * Project IDs an employee marked as favourite.
     *
     * @return int[]
     */
    public function findProjectIdsForEmployee(int $employeeId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('project_id')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery();
        $ids = array_map('intval', $result->fetchAll(\PDO::FETCH_COLUMN));
        $result->closeCursor();

        return $ids;
    }

    public function isFavorite(int $employeeId, int $projectId): bool {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('project_id', $qb->createNamedParameter($projectId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery();
        $count = (int)$result->fetchOne();
        $result->closeCursor();

        return $count > 0;
    }

    /**
     * Mark a project as favourite. Idempotent: an already-set favourite is
     * left untouched (the unique index would otherwise throw on re-insert).
     */
    public function add(int $employeeId, int $projectId): void {
        if ($this->isFavorite($employeeId, $projectId)) {
            return;
        }
        $fav = new EmployeeFavoriteProject();
        $fav->setEmployeeId($employeeId);
        $fav->setProjectId($projectId);
        $this->insert($fav);
    }

    /**
     * Remove a favourite. No-op when it is not set.
     */
    public function remove(int $employeeId, int $projectId): void {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('project_id', $qb->createNamedParameter($projectId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }

    /**
     * Remove every favourite of an employee (employee deletion, #424 pattern).
     * A stale row would otherwise silently attach to a future employee reusing
     * the same id.
     *
     * @return int Number of rows removed.
     */
    public function deleteByEmployeeId(int $employeeId): int {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }

    /**
     * Remove every favourite pointing at a project (project deletion).
     *
     * @return int Number of rows removed.
     */
    public function deleteForProject(int $projectId): int {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('project_id', $qb->createNamedParameter($projectId, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }
}
