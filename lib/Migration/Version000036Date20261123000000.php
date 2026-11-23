<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use DateTime;
use OCA\WorkTime\Db\YearlyCarryover;
use OCA\WorkTime\Db\YearlyCarryoverMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCP\DB\ISchemaWrapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * #889: at most one active yearly carryover per employee and year.
 *
 * Adds wt_yearly_carryover.active_key: 0 while a row is active, the row's own
 * id once it is cancelled. Version000037 then puts a unique index on
 * (employee_id, year, active_key). A partial unique index ("WHERE cancelled_at
 * IS NULL") is not portable across the supported databases; NULL-based tricks
 * fail on Oracle, which treats partly-NULL composite keys as equal.
 *
 * Before the index can exist, existing data is repaired here:
 * 1. Cancelled rows get active_key = id.
 * 2. Duplicate active rows (from the auto-save race) are resolved without
 *    deleting anything: the locked row wins, otherwise the most recently
 *    updated one (then the highest id). The others are cancelled by "system"
 *    and every change is written to the audit log.
 *
 * Idempotent: an existing column is left alone, the repair only touches rows
 * that still need it.
 */
class Version000036Date20261123000000 extends SimpleMigrationStep {

	public const REPAIR_USER = 'system';

	public function __construct(
		private IDBConnection $db,
		private YearlyCarryoverMapper $mapper,
		private AuditLogService $auditLogService,
	) {
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wt_yearly_carryover')) {
			return null;
		}
		$table = $schema->getTable('wt_yearly_carryover');
		if ($table->hasColumn('active_key')) {
			return null;
		}

		$table->addColumn('active_key', Types::BIGINT, [
			'notnull' => true,
			'default' => 0,
			'length' => 20,
		]);

		return $schema;
	}

	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();
		if (!$schema->hasTable('wt_yearly_carryover')) {
			return;
		}

		// 1. Cancelled rows release the active slot.
		$qb = $this->db->getQueryBuilder();
		$qb->update('wt_yearly_carryover')
			->set('active_key', 'id')
			->where($qb->expr()->isNotNull('cancelled_at'))
			->andWhere($qb->expr()->eq('active_key', $qb->createNamedParameter(0, IQueryBuilder::PARAM_INT)));
		$qb->executeStatement();

		// 2. Resolve duplicate active rows.
		$active = $this->mapper->findAllActive();

		$groups = [];
		foreach ($active as $row) {
			$groups[$row->getEmployeeId() . '-' . $row->getYear()][] = $row;
		}

		$resolved = 0;
		foreach ($groups as $rows) {
			if (count($rows) < 2) {
				continue;
			}
			usort($rows, [self::class, 'compareKeeper']);
			array_shift($rows); // keeper stays active
			foreach ($rows as $duplicate) {
				$oldValues = $duplicate->jsonSerialize();
				$duplicate->setCancelledAt(new DateTime());
				$duplicate->setCancelledBy(self::REPAIR_USER);
				$duplicate->setActiveKey($duplicate->getId());
				$duplicate->setUpdatedAt(new DateTime());
				$this->mapper->update($duplicate);
				$this->auditLogService->logUpdate(
					self::REPAIR_USER, 'yearly_carryover', $duplicate->getId(),
					$oldValues, $duplicate->jsonSerialize()
				);
				$resolved++;
			}
		}

		if ($resolved > 0) {
			$output->info("#889: $resolved doppelte aktive Jahresübertrag-Zeile(n) storniert");
		}
	}

	/**
	 * Sort order for the row that stays active: locked first, then the most
	 * recently updated, then the highest id.
	 */
	public static function compareKeeper(YearlyCarryover $a, YearlyCarryover $b): int {
		$locked = (int)$b->isLocked() <=> (int)$a->isLocked();
		if ($locked !== 0) {
			return $locked;
		}
		$updated = ($b->getUpdatedAt()?->getTimestamp() ?? 0) <=> ($a->getUpdatedAt()?->getTimestamp() ?? 0);
		if ($updated !== 0) {
			return $updated;
		}
		return $b->getId() <=> $a->getId();
	}
}
