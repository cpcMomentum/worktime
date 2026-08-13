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
use OCP\DB\QueryBuilder\ICompositeExpression;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<AuditLog>
 */
class AuditLogMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_audit_logs', AuditLog::class);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): AuditLog {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @return AuditLog[]
     */
    public function findByUser(string $userId, int $limit = 100): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)))
            ->orderBy('created_at', 'DESC')
            ->setMaxResults($limit);

        return $this->findEntities($qb);
    }

    /**
     * @return AuditLog[]
     */
    public function findByEntity(string $entityType, int $entityId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('entity_type', $qb->createNamedParameter($entityType)))
            ->andWhere($qb->expr()->eq('entity_id', $qb->createNamedParameter($entityId, IQueryBuilder::PARAM_INT)))
            ->orderBy('created_at', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return AuditLog[]
     */
    public function findByDateRange(DateTime $startDate, DateTime $endDate, int $limit = 1000): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->gte('created_at', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATETIME_MUTABLE)))
            ->andWhere($qb->expr()->lte('created_at', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATETIME_MUTABLE)))
            ->orderBy('created_at', 'DESC')
            ->setMaxResults($limit);

        return $this->findEntities($qb);
    }

    /**
     * @return AuditLog[]
     */
    public function findByAction(string $action, int $limit = 100): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('action', $qb->createNamedParameter($action)))
            ->orderBy('created_at', 'DESC')
            ->setMaxResults($limit);

        return $this->findEntities($qb);
    }

    /**
     * @return AuditLog[]
     */
    public function findRecent(int $limit = 50): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('created_at', 'DESC')
            ->setMaxResults($limit);

        return $this->findEntities($qb);
    }

    /**
     * @return AuditLog[]
     */
    public function findFiltered(
        ?string $action = null,
        ?string $entityType = null,
        ?DateTime $from = null,
        ?DateTime $to = null,
        int $limit = 500,
        int $offset = 0,
        ?string $userId = null
    ): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('created_at', 'DESC')
            ->setMaxResults($limit)
            ->setFirstResult($offset);

        if ($action !== null) {
            $qb->andWhere($qb->expr()->eq('action', $qb->createNamedParameter($action)));
        }
        if ($entityType !== null) {
            $qb->andWhere($qb->expr()->eq('entity_type', $qb->createNamedParameter($entityType)));
        }
        if ($from !== null) {
            $qb->andWhere($qb->expr()->gte('created_at', $qb->createNamedParameter($from, IQueryBuilder::PARAM_DATETIME_MUTABLE)));
        }
        if ($to !== null) {
            $to = clone $to;
            $to->setTime(23, 59, 59);
            $qb->andWhere($qb->expr()->lte('created_at', $qb->createNamedParameter($to, IQueryBuilder::PARAM_DATETIME_MUTABLE)));
        }
        if ($userId !== null) {
            $qb->andWhere($qb->expr()->eq('user_id', $qb->createNamedParameter($userId)));
        }

        return $this->findEntities($qb);
    }

    public function deleteOlderThan(DateTime $date): int {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->lt('created_at', $qb->createNamedParameter($date, IQueryBuilder::PARAM_DATETIME_MUTABLE)));

        return $qb->executeStatement();
    }

    /**
     * Remove the audit trail belonging to one employee (#424).
     *
     * The log knows a person two ways and both are personal data: rows they
     * caused (`user_id`) and rows recorded about them (`entity_type`/
     * `entity_id`). A single OR condition covers both without counting the
     * overlap twice — a row where someone edited their own record matches on
     * both sides.
     *
     * @return int Number of rows actually removed.
     */
    public function deleteForEmployee(string $userId, int $employeeId): int {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($this->belongsToEmployee($qb, $userId, $employeeId));

        return $qb->executeStatement();
    }

    public function countForEmployee(string $userId, int $employeeId): int {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($this->belongsToEmployee($qb, $userId, $employeeId));

        $result = $qb->executeQuery();
        $count = $result->fetchOne();
        $result->closeCursor();

        return (int)$count;
    }

    /**
     * Remove log rows recorded about specific child records (#424).
     *
     * The employee's own trail is not the whole story: a row like
     * "admin created time_entry 42" carries that entry's date and working
     * hours in its payload, so it stays personal data about the deleted person
     * even though it names neither them nor their user id.
     *
     * `$excludeUserId` keeps this disjoint from {@see countForEmployee}: a row
     * the employee wrote about their own record matches both conditions, and
     * adding the two counts would report it twice. The preview said 13 where
     * the database held 12 until this was excluded. Deletion is unaffected by
     * the overlap — the row is already gone by then — but both paths take the
     * same argument so the predicates cannot drift apart.
     *
     * @param int[] $entityIds
     * @return int Number of rows actually removed.
     */
    public function deleteForEntities(string $entityType, array $entityIds, ?string $excludeUserId = null): int {
        return $this->forEntities(
            $entityType,
            $entityIds,
            $excludeUserId,
            static fn (IQueryBuilder $qb): int => $qb->executeStatement(),
            true,
        );
    }

    /**
     * @param int[] $entityIds
     */
    public function countForEntities(string $entityType, array $entityIds, ?string $excludeUserId = null): int {
        return $this->forEntities(
            $entityType,
            $entityIds,
            $excludeUserId,
            function (IQueryBuilder $qb): int {
                $result = $qb->executeQuery();
                $count = (int)$result->fetchOne();
                $result->closeCursor();

                return $count;
            },
            false,
        );
    }

    /**
     * Shared body for the two methods above so their WHERE clauses stay identical.
     *
     * Chunked: a long-serving employee can have thousands of entries, and an
     * unbounded IN list runs into the placeholder limit of the backend.
     *
     * @param int[] $entityIds
     * @param callable(IQueryBuilder): int $run
     */
    private function forEntities(
        string $entityType,
        array $entityIds,
        ?string $excludeUserId,
        callable $run,
        bool $isDelete,
    ): int {
        if (empty($entityIds)) {
            return 0;
        }

        $total = 0;
        foreach (array_chunk($entityIds, 500) as $chunk) {
            $qb = $this->db->getQueryBuilder();

            if ($isDelete) {
                $qb->delete($this->getTableName());
            } else {
                $qb->select($qb->func()->count('id'))->from($this->getTableName());
            }

            $qb->where($qb->expr()->eq('entity_type', $qb->createNamedParameter($entityType)))
                ->andWhere($qb->expr()->in('entity_id', $qb->createNamedParameter($chunk, IQueryBuilder::PARAM_INT_ARRAY)));

            if ($excludeUserId !== null) {
                $qb->andWhere($qb->expr()->neq('user_id', $qb->createNamedParameter($excludeUserId)));
            }

            $total += $run($qb);
        }

        return $total;
    }

    private function belongsToEmployee(IQueryBuilder $qb, string $userId, int $employeeId): ICompositeExpression {
        return $qb->expr()->orX(
            $qb->expr()->eq('user_id', $qb->createNamedParameter($userId)),
            $qb->expr()->andX(
                $qb->expr()->eq('entity_type', $qb->createNamedParameter('employee')),
                $qb->expr()->eq('entity_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)),
            ),
        );
    }
}
