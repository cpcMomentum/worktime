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
 * @template-extends QBMapper<Absence>
 */
class AbsenceMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_absences', Absence::class);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): Absence {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @return Absence[]
     */
    public function findByEmployee(int $employeeId): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->orderBy('start_date', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return Absence[]
     */
    public function findByEmployeeAndYear(int $employeeId, int $year): array {
        $startDate = new DateTime("$year-01-01");
        $endDate = new DateTime("$year-12-31");

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->gte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)))
            ->orderBy('start_date', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return Absence[]
     */
    public function findByEmployeeAndMonth(int $employeeId, int $year, int $month): array {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere(
                $qb->expr()->orX(
                    // Absence starts within the month
                    $qb->expr()->andX(
                        $qb->expr()->gte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    // Absence ends within the month
                    $qb->expr()->andX(
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    // Absence spans the entire month
                    $qb->expr()->andX(
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    )
                )
            )
            ->orderBy('start_date', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return Absence[]
     */
    public function findByType(int $employeeId, string $type): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('type', $qb->createNamedParameter($type)))
            ->orderBy('start_date', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * @return Absence[]
     */
    public function findByStatus(string $status): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter($status)))
            ->orderBy('start_date', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return Absence[]
     */
    public function findPendingForApproval(int $supervisorEmployeeId): array {
        $qb = $this->db->getQueryBuilder();

        // Subquery to get employee IDs supervised by the given supervisor
        $subQb = $this->db->getQueryBuilder();
        $subQb->select('id')
            ->from('wt_employees')
            ->where($subQb->expr()->eq('supervisor_id', $subQb->createNamedParameter($supervisorEmployeeId, IQueryBuilder::PARAM_INT)));

        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(Absence::STATUS_PENDING)))
            ->andWhere($qb->expr()->in('employee_id', $qb->createFunction('(' . $subQb->getSQL() . ')')))
            ->orderBy('start_date', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * @return Absence[]
     */
    public function findOverlapping(int $employeeId, DateTime $startDate, DateTime $endDate, ?int $excludeId = null): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->neq('status', $qb->createNamedParameter(Absence::STATUS_CANCELLED)))
            ->andWhere(
                $qb->expr()->orX(
                    // New period starts within existing
                    $qb->expr()->andX(
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE))
                    ),
                    // New period ends within existing
                    $qb->expr()->andX(
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    // New period contains existing
                    $qb->expr()->andX(
                        $qb->expr()->gte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    )
                )
            );

        if ($excludeId !== null) {
            $qb->andWhere($qb->expr()->neq('id', $qb->createNamedParameter($excludeId, IQueryBuilder::PARAM_INT)));
        }

        return $this->findEntities($qb);
    }

    public function sumVacationDaysByEmployeeAndYear(int $employeeId, int $year): float {
        $startDate = new DateTime("$year-01-01");
        $endDate = new DateTime("$year-12-31");

        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->sum('days'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('type', $qb->createNamedParameter(Absence::TYPE_VACATION)))
            ->andWhere($qb->expr()->eq('status', $qb->createNamedParameter(Absence::STATUS_APPROVED)))
            ->andWhere($qb->expr()->gte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->lte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)));

        $result = $qb->executeQuery();
        $sum = $result->fetchOne();
        $result->closeCursor();

        return (float)$sum;
    }
}
