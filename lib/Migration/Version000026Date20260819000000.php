<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * #584 Stempeluhr: one open punch per employee (server-authoritative running
 * timer). The unique index on employee_id enforces "at most one open punch".
 */
class Version000026Date20260819000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wt_active_punch')) {
			$table = $schema->createTable('wt_active_punch');

			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
			]);
			$table->addColumn('employee_id', Types::INTEGER, [
				'notnull' => true,
			]);
			// Authoritative start timestamp (UTC). The client renders now - started_at.
			$table->addColumn('started_at', Types::DATETIME, [
				'notnull' => true,
			]);
			// Set while a live break is running (UTC); null otherwise.
			$table->addColumn('paused_at', Types::DATETIME, [
				'notnull' => false,
			]);
			// Accumulated live-break seconds from finished pause segments.
			$table->addColumn('break_seconds', Types::INTEGER, [
				'notnull' => true,
				'default' => 0,
			]);
			$table->addColumn('project_id', Types::INTEGER, [
				'notnull' => false,
			]);
			$table->addColumn('description', Types::TEXT, [
				'notnull' => false,
			]);
			// 'web' / 'ios' — for audit/debug.
			$table->addColumn('created_via', Types::STRING, [
				'notnull' => true,
				'length' => 16,
				'default' => 'web',
			]);
			$table->addColumn('created_at', Types::DATETIME, [
				'notnull' => true,
			]);

			$table->setPrimaryKey(['id']);
			// Enforces "at most one open punch per employee" at the DB level.
			$table->addUniqueIndex(['employee_id'], 'wt_ap_emp_uidx');
		}

		return $schema;
	}
}
