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
 * Add absence_visibility column to wt_employees table.
 */
class Version000010Date20260411000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('wt_employees');

		if (!$table->hasColumn('absence_visibility')) {
			$table->addColumn('absence_visibility', Types::STRING, [
				'notnull' => true,
				'length' => 16,
				'default' => 'all',
			]);
		}

		return $schema;
	}
}
