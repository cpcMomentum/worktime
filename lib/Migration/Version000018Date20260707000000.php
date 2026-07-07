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
 * #15 Betriebsferien: mark centrally created (admin-set) absences so they are
 * protected from employee edits/deletes and can be listed/removed in bulk.
 */
class Version000018Date20260707000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if ($schema->hasTable('wt_absences')) {
			$table = $schema->getTable('wt_absences');
			if (!$table->hasColumn('is_central')) {
				$table->addColumn('is_central', Types::SMALLINT, [
					'notnull' => true,
					'default' => 0,
				]);
			}
		}

		return $schema;
	}
}
