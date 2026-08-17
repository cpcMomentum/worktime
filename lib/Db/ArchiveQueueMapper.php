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
 * @template-extends QBMapper<ArchiveQueue>
 */
class ArchiveQueueMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_archive_queue', ArchiveQueue::class);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): ArchiveQueue {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * Find pending jobs ready for processing
     *
     * @param int $limit Maximum number of jobs to return
     * @return ArchiveQueue[]
     */
    public function findPending(int $limit = 10): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(ArchiveQueue::STATUS_PENDING)))
            ->orderBy('created_at', 'ASC')
            ->setMaxResults($limit);

        return $this->findEntities($qb);
    }

    /**
     * Find failed jobs that can be retried
     *
     * @return ArchiveQueue[]
     */
    public function findRetryable(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(ArchiveQueue::STATUS_FAILED)))
            ->andWhere($qb->expr()->lt('attempts', $qb->createNamedParameter(ArchiveQueue::MAX_ATTEMPTS, IQueryBuilder::PARAM_INT)))
            ->orderBy('created_at', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Check if a job for this employee/month already exists and is pending
     */
    public function existsPending(int $employeeId, int $year, int $month): bool {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('month', $qb->createNamedParameter($month, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->in('status', $qb->createNamedParameter(
                [ArchiveQueue::STATUS_PENDING, ArchiveQueue::STATUS_PROCESSING],
                IQueryBuilder::PARAM_STR_ARRAY
            )));

        $result = $qb->executeQuery();
        $count = (int)$result->fetchOne();
        $result->closeCursor();

        return $count > 0;
    }

    /**
     * Find jobs by employee
     *
     * @return ArchiveQueue[]
     */
    public function findByEmployee(int $employeeId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->orderBy('year', 'DESC')
            ->addOrderBy('month', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Count jobs in the given statuses (exact counts for the status view, #323)
     */
    public function countByStatus(array $statuses): int {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->in('status', $qb->createNamedParameter($statuses, IQueryBuilder::PARAM_STR_ARRAY)));

        $result = $qb->executeQuery();
        $count = (int)$result->fetchOne();
        $result->closeCursor();

        return $count;
    }

    /**
     * Most recently created jobs (for the archive status view, #323)
     */
    public function findRecent(int $limit = 20): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('created_at', 'DESC')
            ->setMaxResults($limit);

        return $this->findEntities($qb);
    }

    /**
     * Remove pending/processing jobs for a month — called when it is reopened so a
     * queued archive job does not later write a PDF for a no-longer-approved month (#323).
     */
    public function deletePendingFor(int $employeeId, int $year, int $month): int {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('month', $qb->createNamedParameter($month, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->in('status', $qb->createNamedParameter(
                [ArchiveQueue::STATUS_PENDING, ArchiveQueue::STATUS_PROCESSING],
                IQueryBuilder::PARAM_STR_ARRAY
            )));

        return $qb->executeStatement();
    }

    /**
     * Delete completed jobs older than given days
     */
    public function deleteOldCompleted(int $daysOld = 30): int {
        $cutoff = new \DateTime("-{$daysOld} days");

        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(ArchiveQueue::STATUS_COMPLETED)))
            ->andWhere($qb->expr()->lt('processed_at', $qb->createNamedParameter($cutoff, IQueryBuilder::PARAM_DATETIME_MUTABLE)));

        return $qb->executeStatement();
    }

    /**
     * Remove every queued archive job of an employee (#424, employee deletion).
     *
     * Left behind, a pending job would keep pointing the background worker at
     * an employee that no longer exists.
     *
     * @return int Number of rows actually removed.
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
}
