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
 * Add wt_employees.locked_reason: why an employee was set to resting state
 * (parental leave, long-term illness, left the company, ...) (#486).
 *
 * The resting state itself reuses the existing is_active flag; only the reason
 * needs its own column, because it is shown in the employee list and in the
 * notice banner the resting employee sees. The timestamp is not stored here:
 * it is already recorded by the audit log.
 */
class Version000022Date20260719000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('wt_employees');

		if (!$table->hasColumn('locked_reason')) {
			$table->addColumn('locked_reason', Types::STRING, [
				'notnull' => false,
				'length' => 255,
			]);
		}

		return $schema;
	}
}
