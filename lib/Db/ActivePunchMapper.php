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
 * @template-extends QBMapper<ActivePunch>
 */
class ActivePunchMapper extends QBMapper {

	public function __construct(IDBConnection $db) {
		parent::__construct($db, 'wt_active_punch', ActivePunch::class);
	}

	/**
	 * The open punch for an employee.
	 *
	 * @throws DoesNotExistException if none is open
	 * @throws MultipleObjectsReturnedException
	 */
	public function findByEmployee(int $employeeId): ActivePunch {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('employee_id', $qb->createNamedParameter($employeeId, IQueryBuilder::PARAM_INT)));

		return $this->findEntity($qb);
	}

	/**
	 * The open punch for an employee, or null when none is open.
	 */
	public function findByEmployeeOrNull(int $employeeId): ?ActivePunch {
		try {
			return $this->findByEmployee($employeeId);
		} catch (DoesNotExistException|MultipleObjectsReturnedException $e) {
			return null;
		}
	}
}
