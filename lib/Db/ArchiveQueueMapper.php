<?php

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
     * Delete completed jobs older than given days
     */
    public function deleteOldCompleted(int $daysOld = 30): int {
        $cutoff = new \DateTime("-{$daysOld} days");

        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(ArchiveQueue::STATUS_COMPLETED)))
            ->andWhere($qb->expr()->lt('processed_at', $qb->createNamedParameter($cutoff, IQueryBuilder::PARAM_DATETIME)));

        return $qb->executeStatement();
    }
}
