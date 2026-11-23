<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * #889: unique index (employee_id, year, active_key) on wt_yearly_carryover.
 *
 * Runs after Version000036, which added active_key and resolved existing
 * duplicate active rows, so the index can always be created. A parallel
 * auto-save that would create a second active row now fails on the index and
 * YearlyCarryoverService::upsert() updates the existing row instead.
 */
class Version000037Date20261123000001 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wt_yearly_carryover')) {
			return null;
		}
		$table = $schema->getTable('wt_yearly_carryover');
		if (!$table->hasColumn('active_key') || $table->hasIndex('wt_yc_active_uidx')) {
			return null;
		}

		$table->addUniqueIndex(['employee_id', 'year', 'active_key'], 'wt_yc_active_uidx');

		return $schema;
	}
}
