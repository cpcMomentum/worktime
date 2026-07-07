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
        // Overlap semantics: include every absence that TOUCHES the year, even
        // when it starts in the previous year or ends in the next one (e.g. a
        // Christmas→New Year vacation). A containment filter (start >= Jan 1 AND
        // end <= Dec 31) silently dropped such absences from the personal list
        // and the vacation balance (#439). The per-year day split is handled by
        // AbsenceService::vacationDaysInYear().
        $startDate = new DateTime("$year-01-01");
        $endDate = new DateTime("$year-12-31");

        return $this->findByEmployeeAndDateRange($employeeId, $startDate, $endDate);
    }

    /**
     * @return Absence[]
     */
    public function findByEmployeeAndMonth(int $employeeId, int $year, int $month): array {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');
        return $this->findByEmployeeAndDateRange($employeeId, $startDate, $endDate);
    }

    /**
     * All absences of an employee overlapping the inclusive [start, end] range.
     *
     * @return Absence[]
     */
    public function findByEmployeeAndDateRange(int $employeeId, DateTime $startDate, DateTime $endDate): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere(
                $qb->expr()->orX(
                    // Absence starts within the range
                    $qb->expr()->andX(
                        $qb->expr()->gte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    // Absence ends within the range
                    $qb->expr()->andX(
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    // Absence spans the entire range
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
     * Batch-load absences for multiple employees in a single month.
     *
     * @param int[] $employeeIds
     * @return array<int, Absence[]> Indexed by employee_id
     */
    public function findByEmployeeIdsAndMonth(array $employeeIds, int $year, int $month): array {
        if (empty($employeeIds)) {
            return [];
        }

        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->in('employee_id', $qb->createNamedParameter($employeeIds, IQueryBuilder::PARAM_INT_ARRAY)))
            ->andWhere(
                $qb->expr()->orX(
                    $qb->expr()->andX(
                        $qb->expr()->gte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    $qb->expr()->andX(
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    $qb->expr()->andX(
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    )
                )
            )
            ->orderBy('start_date', 'ASC');

        $absences = $this->findEntities($qb);

        $grouped = array_fill_keys($employeeIds, []);
        foreach ($absences as $absence) {
            $grouped[$absence->getEmployeeId()][] = $absence;
        }

        return $grouped;
    }

    /**
     * Batch-load absences for multiple employees for an entire year.
     *
     * @param int[] $employeeIds
     * @return array<int, Absence[]> Indexed by employee_id
     */
    public function findByEmployeeIdsAndYear(array $employeeIds, int $year): array {
        if (empty($employeeIds)) {
            return [];
        }

        $startDate = new DateTime("$year-01-01");
        $endDate = new DateTime("$year-12-31");

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->in('employee_id', $qb->createNamedParameter($employeeIds, IQueryBuilder::PARAM_INT_ARRAY)))
            ->andWhere(
                $qb->expr()->orX(
                    $qb->expr()->andX(
                        $qb->expr()->gte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    $qb->expr()->andX(
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    $qb->expr()->andX(
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    )
                )
            )
            ->orderBy('start_date', 'ASC');

        $absences = $this->findEntities($qb);

        $grouped = array_fill_keys($employeeIds, []);
        foreach ($absences as $absence) {
            $grouped[$absence->getEmployeeId()][] = $absence;
        }

        return $grouped;
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

        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(Absence::STATUS_PENDING)));

        // If supervisorEmployeeId > 0, filter by supervisor's team
        // If 0, return all pending (for Admin/HR)
        if ($supervisorEmployeeId > 0) {
            $supervisorParam = $qb->createNamedParameter($supervisorEmployeeId, IQueryBuilder::PARAM_INT);
            $subQb = $this->db->getQueryBuilder();
            $subQb->select('id')
                ->from('wt_employees')
                ->where($subQb->expr()->eq('supervisor_id', $supervisorParam));

            $qb->andWhere($qb->expr()->in('employee_id', $qb->createFunction('(' . $subQb->getSQL() . ')')));
        }

        $qb->orderBy('start_date', 'ASC');

        return $this->findEntities($qb);
    }

    /**
     * Laufende und zukuenftige Krankmeldungen (sick, child_sick) fuer "Zur Kenntnisnahme"-Liste.
     * Filter: approved, type in sick/child_sick, end_date >= heute.
     *
     * @param int $supervisorEmployeeId 0 = alle (Admin/HR), >0 = nur Team des Supervisors
     * @return Absence[]
     */
    public function findActiveInformationalForSupervisor(int $supervisorEmployeeId): array {
        $qb = $this->db->getQueryBuilder();
        $today = (new DateTime())->format('Y-m-d');

        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('status', $qb->createNamedParameter(Absence::STATUS_APPROVED)))
            ->andWhere($qb->expr()->in('type', $qb->createNamedParameter(
                [Absence::TYPE_SICK, Absence::TYPE_CHILD_SICK],
                IQueryBuilder::PARAM_STR_ARRAY
            )))
            ->andWhere($qb->expr()->gte('end_date', $qb->createNamedParameter($today)));

        if ($supervisorEmployeeId > 0) {
            $supervisorParam = $qb->createNamedParameter($supervisorEmployeeId, IQueryBuilder::PARAM_INT);
            $subQb = $this->db->getQueryBuilder();
            $subQb->select('id')
                ->from('wt_employees')
                ->where($subQb->expr()->eq('supervisor_id', $supervisorParam));

            $qb->andWhere($qb->expr()->in('employee_id', $qb->createFunction('(' . $subQb->getSQL() . ')')));
        }

        $qb->orderBy('start_date', 'ASC');

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

    /**
     * Find absences for a specific employee and date
     *
     * @return Absence[]
     */
    public function findByEmployeeAndDate(int $employeeId, DateTime $date): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->lte('start_date', $qb->createNamedParameter($date, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->gte('end_date', $qb->createNamedParameter($date, IQueryBuilder::PARAM_DATE)));

        return $this->findEntities($qb);
    }

    /**
     * Find approved absences for a specific employee within a month.
     *
     * @return Absence[]
     */
    public function findApprovedByEmployeeAndMonth(int $employeeId, int $year, int $month): array {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');

        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('status', $qb->createNamedParameter(Absence::STATUS_APPROVED)))
            ->andWhere(
                $qb->expr()->orX(
                    $qb->expr()->andX(
                        $qb->expr()->gte('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('start_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
                    $qb->expr()->andX(
                        $qb->expr()->gte('end_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)),
                        $qb->expr()->lte('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE))
                    ),
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
     * All centrally created (admin-set) absences — Betriebsferien (#15).
     * Cancelled ones are excluded so the settings list only shows active entries.
     *
     * @return Absence[]
     */
    public function findCentral(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('is_central', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->neq('status', $qb->createNamedParameter(Absence::STATUS_CANCELLED)))
            ->orderBy('start_date', 'DESC');

        return $this->findEntities($qb);
    }

    /**
     * Centrally created absences for one exact date range — identifies a single
     * Betriebsferien operation for bulk removal (#15).
     *
     * @return Absence[]
     */
    public function findCentralByRange(DateTime $startDate, DateTime $endDate): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('is_central', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('start_date', $qb->createNamedParameter($startDate, IQueryBuilder::PARAM_DATE)))
            ->andWhere($qb->expr()->eq('end_date', $qb->createNamedParameter($endDate, IQueryBuilder::PARAM_DATE)));

        return $this->findEntities($qb);
    }
}
