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
 * @template-extends QBMapper<ProjectEmployee>
 */
class ProjectEmployeeMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_project_employees', ProjectEmployee::class);
    }

    /**
     * Employee IDs assigned to a project.
     *
     * @return int[]
     */
    public function findEmployeeIdsForProject(int $projectId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('employee_id')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('project_id', $qb->createNamedParameter($projectId, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery();
        $ids = array_map('intval', $result->fetchAll(\PDO::FETCH_COLUMN));
        $result->closeCursor();

        return $ids;
    }

    /**
     * Project IDs a given employee is explicitly assigned to.
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

    /**
     * Replace the full set of employees assigned to a project.
     *
     * @param int[] $employeeIds
     */
    public function setMembers(int $projectId, array $employeeIds): void {
        $unique = array_values(array_unique(array_map('intval', $employeeIds)));

        // Atomic replace: a failing insert must not leave a half-applied assignment.
        $this->db->beginTransaction();
        try {
            $this->deleteForProject($projectId);
            foreach ($unique as $employeeId) {
                $member = new ProjectEmployee();
                $member->setProjectId($projectId);
                $member->setEmployeeId($employeeId);
                $this->insert($member);
            }
            $this->db->commit();
        } catch (\Throwable $e) {
            $this->db->rollBack();
            throw $e;
        }
    }

    /**
     * All project→employee assignments as a map keyed by project_id.
     * Used to load member lists for a full project listing in one query.
     *
     * @return array<int, int[]>
     */
    public function findAllGroupedByProject(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('project_id', 'employee_id')
            ->from($this->getTableName());

        $result = $qb->executeQuery();
        $grouped = [];
        while ($row = $result->fetch()) {
            $grouped[(int)$row['project_id']][] = (int)$row['employee_id'];
        }
        $result->closeCursor();

        return $grouped;
    }

    public function deleteForProject(int $projectId): void {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('project_id', $qb->createNamedParameter($projectId, IQueryBuilder::PARAM_INT)));
        $qb->executeStatement();
    }
}
