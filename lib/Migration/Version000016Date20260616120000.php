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
 * Project-to-employee assignment (#58).
 *
 * - wt_projects.all_employees: when 1 (default), every employee may book on
 *   the project (current behaviour, nothing breaks for existing projects).
 *   When 0, only the assigned employees in wt_project_employees may book.
 * - wt_project_employees: n:m mapping of which employees a restricted project
 *   is assigned to.
 */
class Version000016Date20260616120000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$projects = $schema->getTable('wt_projects');
		if (!$projects->hasColumn('all_employees')) {
			$projects->addColumn('all_employees', Types::SMALLINT, [
				'notnull' => true,
				'default' => 1,
			]);
		}

		if (!$schema->hasTable('wt_project_employees')) {
			$table = $schema->createTable('wt_project_employees');

			$table->addColumn('id', Types::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 20,
			]);
			$table->addColumn('project_id', Types::BIGINT, [
				'notnull' => true,
				'length' => 20,
			]);
			$table->addColumn('employee_id', Types::BIGINT, [
				'notnull' => true,
				'length' => 20,
			]);

			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['project_id', 'employee_id'], 'wt_proj_emp_uniq_idx');
			$table->addIndex(['employee_id'], 'wt_proj_emp_emp_idx');
		}

		return $schema;
	}
}
