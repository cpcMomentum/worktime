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
	 * All open punches (for the reminder scan #588).
	 *
	 * @return ActivePunch[]
	 */
	public function findAll(): array {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')->from($this->getTableName());

		return $this->findEntities($qb);
	}

	/**
	 * A punch by id, or null when it no longer exists (e.g. already punched out).
	 * Used by the Notifier to lazily retract a stale reminder (#588).
	 */
	public function findByIdOrNull(int $id): ?ActivePunch {
		$qb = $this->db->getQueryBuilder();
		$qb->select('*')
			->from($this->getTableName())
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

		try {
			return $this->findEntity($qb);
		} catch (DoesNotExistException|MultipleObjectsReturnedException $e) {
			return null;
		}
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

	/**
	 * Delete the punch row by id, returning the number of affected rows. Used as
	 * the atomic "consume" step inside punch-out: two concurrent punch-outs both
	 * try this; the second blocks on the row lock and then sees 0 affected once
	 * the first committed — so only one can proceed to book an entry.
	 */
	public function deleteById(int $id): int {
		$qb = $this->db->getQueryBuilder();
		$qb->delete($this->getTableName())
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

		return $qb->executeStatement();
	}

	/**
	 * Atomically start a live break: set paused_at only if the punch is currently
	 * running (paused_at IS NULL). Returns affected rows — 0 means it was already
	 * paused (or gone). The row lock + WHERE re-evaluation serializes two
	 * concurrent pause calls so only one wins (#612).
	 *
	 * @param string $nowUtc UTC timestamp formatted 'Y-m-d H:i:s'
	 */
	public function pauseIfRunning(int $id, string $nowUtc): int {
		$qb = $this->db->getQueryBuilder();
		$qb->update($this->getTableName())
			->set('paused_at', $qb->createNamedParameter($nowUtc))
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->isNull('paused_at'));

		return $qb->executeStatement();
	}

	/**
	 * Atomically end a live break: add the elapsed seconds to break_seconds and
	 * clear paused_at, only if a break is currently running (paused_at IS NOT
	 * NULL). Returns affected rows — 0 means no break was running (already
	 * resumed, or gone). The increment is done as column arithmetic in one
	 * statement, so two concurrent resumes cannot double-count: the row lock
	 * serializes them and the second sees paused_at already NULL → 0 affected
	 * (#612). Portable across pgsql/mysql/sqlite (no datetime SQL functions).
	 */
	public function accumulateBreakAndResume(int $id, int $deltaSeconds): int {
		$delta = max(0, $deltaSeconds);
		$qb = $this->db->getQueryBuilder();
		$qb->update($this->getTableName())
			// func()->add() yields an IQueryFunction that set() passes through
			// unquoted — a raw "break_seconds + :p" string would be quoted as a
			// column name and break.
			->set('break_seconds', $qb->func()->add('break_seconds', $qb->createNamedParameter($delta, IQueryBuilder::PARAM_INT)))
			->set('paused_at', $qb->createNamedParameter(null, IQueryBuilder::PARAM_NULL))
			// Clear the pause reminder so a later long break can remind again (#588).
			->set('pause_reminded_at', $qb->createNamedParameter(null, IQueryBuilder::PARAM_NULL))
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->isNotNull('paused_at'));

		return $qb->executeStatement();
	}

	/**
	 * Atomically mark the punch-pause reminder as sent, only if it wasn't already
	 * (#588). Returns affected rows — 1 means this call may send the notification,
	 * 0 means another run already did (dedup).
	 */
	public function markPauseReminded(int $id, string $nowUtc): int {
		return $this->markReminded('pause_reminded_at', $id, $nowUtc);
	}

	/**
	 * Atomically mark the forgot-clock-out reminder as sent, only if it wasn't
	 * already (#588).
	 */
	public function markOutReminded(int $id, string $nowUtc): int {
		return $this->markReminded('out_reminded_at', $id, $nowUtc);
	}

	private function markReminded(string $column, int $id, string $nowUtc): int {
		$qb = $this->db->getQueryBuilder();
		$qb->update($this->getTableName())
			->set($column, $qb->createNamedParameter($nowUtc))
			->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)))
			->andWhere($qb->expr()->isNull($column));

		return $qb->executeStatement();
	}
}
