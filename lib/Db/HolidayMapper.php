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
 * @template-extends QBMapper<Holiday>
 */
class HolidayMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_holidays', Holiday::class);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): Holiday {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @return Holiday[]
     */
    public function findByYearAndState(int $year, string $federalState): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)))
            ->orderBy('date', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return Holiday[]
     */
    public function findByMonth(int $year, int $month, string $federalState): array {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->orderBy('date', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByDateAndState(DateTime $date, string $federalState): Holiday {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('date', $qb->createNamedParameter($date, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)));

        return $this->findEntity($qb);
    }

    public function existsForYearAndState(int $year, string $federalState): bool {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)));

        $result = $qb->executeQuery();
        $count = $result->fetchOne();
        $result->closeCursor();

        return (int)$count > 0;
    }

    /**
     * #438: whether AUTO-generated holidays (is_manual = 0) already exist for a
     * (year, state). The lazy-ensure guard must use this rather than
     * existsForYearAndState — a single pre-existing MANUAL holiday must not
     * suppress generation of the deterministic set (Neujahr, Ostermontag, …).
     */
    public function hasAutoForYearAndState(int $year, string $federalState): bool {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)))
            ->andWhere($qb->expr()->eq('is_manual', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)));

        $result = $qb->executeQuery();
        $count = $result->fetchOne();
        $result->closeCursor();

        return (int)$count > 0;
    }

    public function deleteByYearAndState(int $year, string $federalState): int {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)));

        return $qb->executeStatement();
    }

    public function isHoliday(DateTime $date, string $federalState): bool {
        try {
            $this->findByDateAndState($date, $federalState);
            return true;
        } catch (DoesNotExistException) {
            return false;
        }
    }

    public function countHolidaysInRange(DateTime $startDate, DateTime $endDate, string $federalState): int {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)));

        $result = $qb->executeQuery();
        $count = $result->fetchOne();
        $result->closeCursor();

        return (int)$count;
    }

    /**
     * @return Holiday[]
     */
    public function findHolidaysInRange(DateTime $startDate, DateTime $endDate, string $federalState): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)))
            ->andWhere($qb->expr()->gte('date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->orderBy('date', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Find all holidays for a year (across all federal states)
     *
     * @return Holiday[]
     */
    public function findByYear(int $year): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)))
            ->orderBy('date', 'ASC')
            ->addOrderBy('federal_state', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Delete only auto-generated (non-manual) holidays for a year and state
     */
    public function deleteAutoByYearAndState(int $year, string $federalState): int {
        $qb = $this->db->getQueryBuilder();
        $qb->delete($this->getTableName())
            ->where($qb->expr()->eq('year', $qb->createNamedParameter($year, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('federal_state', $qb->createNamedParameter($federalState)))
            ->andWhere($qb->expr()->eq('is_manual', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)));

        return $qb->executeStatement();
    }
}
