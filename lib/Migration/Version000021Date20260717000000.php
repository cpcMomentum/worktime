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
 * Add wt_employees.deputy_id: an optional second, subordinate approver who may
 * approve for the employee while the direct supervisor is absent (#343).
 */
class Version000021Date20260717000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('wt_employees');

		if (!$table->hasColumn('deputy_id')) {
			$table->addColumn('deputy_id', Types::INTEGER, [
				'notnull' => false,
			]);
		}

		if (!$table->hasIndex('wt_emp_deputy_idx')) {
			$table->addIndex(['deputy_id'], 'wt_emp_deputy_idx');
		}

		return $schema;
	}
}
