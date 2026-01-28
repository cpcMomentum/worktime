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
}
