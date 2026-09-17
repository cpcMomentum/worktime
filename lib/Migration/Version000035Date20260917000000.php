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
 * Per-employee project favourites (#710).
 *
 * wt_favorite_projects: n:m mapping of which projects an employee marked as
 * favourite. A personal preference (like the default break, #696), stored
 * server-side so the mobile and web apps can show favourites first and
 * auto-select a single favourite.
 *
 * Table name kept short (oc_ prefix + name <= 30) so Oracle's identifier limit
 * holds — info.xml declares no <database>, so Oracle stays supported.
 */
class Version000035Date20260917000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wt_favorite_projects')) {
			$table = $schema->createTable('wt_favorite_projects');

			$table->addColumn('id', Types::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 20,
			]);
			$table->addColumn('employee_id', Types::BIGINT, [
				'notnull' => true,
				'length' => 20,
			]);
			$table->addColumn('project_id', Types::BIGINT, [
				'notnull' => true,
				'length' => 20,
			]);

			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['employee_id', 'project_id'], 'wt_fav_uniq_idx');
			$table->addIndex(['employee_id'], 'wt_fav_emp_idx');
		}

		return $schema;
	}
}
