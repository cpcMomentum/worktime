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
 * #570: Abteilungen / Organisationseinheiten (P1).
 *
 * Neue admin-verwaltete Liste `wt_departments` (wie Projekte) und ein nullable
 * `department_id` am Mitarbeiter, das `supervisor_id` spiegelt. Abteilung ist
 * ein rein organisatorisches Feld — orthogonal zur Vorgesetzten-Hierarchie und
 * ohne Einfluss auf Sichtbarkeit/Berechtigung.
 *
 * is_active als SMALLINT mit Default 1 (Fleet-Konvention, nie NOT-NULL-Boolean,
 * #596). Idempotent: existieren Tabelle/Spalte bereits, ein No-Op.
 */
class Version000033Date20260903000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wt_departments')) {
			$table = $schema->createTable('wt_departments');

			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
			]);
			$table->addColumn('name', Types::STRING, [
				'notnull' => true,
				'length' => 255,
			]);
			$table->addColumn('is_active', Types::SMALLINT, [
				'notnull' => true,
				'default' => 1,
			]);
			$table->addColumn('created_at', Types::DATETIME, [
				'notnull' => true,
			]);
			$table->addColumn('updated_at', Types::DATETIME, [
				'notnull' => true,
			]);

			$table->setPrimaryKey(['id']);
		}

		$employees = $schema->getTable('wt_employees');
		if (!$employees->hasColumn('department_id')) {
			$employees->addColumn('department_id', Types::INTEGER, [
				'notnull' => false,
			]);
		}
		if (!$employees->hasIndex('wt_emp_dept_idx')) {
			$employees->addIndex(['department_id'], 'wt_emp_dept_idx');
		}

		return $schema;
	}
}
