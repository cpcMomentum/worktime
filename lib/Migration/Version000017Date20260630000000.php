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
 * Create wt_overtime_payouts table: overtime paid out in money reduces the balance.
 */
class Version000017Date20260630000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wt_overtime_payouts')) {
			$table = $schema->createTable('wt_overtime_payouts');

			$table->addColumn('id', Types::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 8,
			]);
			$table->addColumn('employee_id', Types::BIGINT, [
				'notnull' => true,
				'length' => 8,
			]);
			$table->addColumn('payout_date', Types::DATE, [
				'notnull' => true,
			]);
			$table->addColumn('minutes', Types::INTEGER, [
				'notnull' => true,
				'default' => 0,
			]);
			$table->addColumn('note', Types::STRING, [
				'notnull' => true,
				'default' => '',
				'length' => 500,
			]);
			$table->addColumn('created_by', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('created_at', Types::DATETIME, [
				'notnull' => true,
			]);
			$table->addColumn('updated_at', Types::DATETIME, [
				'notnull' => true,
			]);

			$table->setPrimaryKey(['id']);
			$table->addIndex(['employee_id', 'payout_date'], 'wt_payout_emp_date_idx');
		}

		return $schema;
	}
}
