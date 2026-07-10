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
 * #15 Betriebsferien Stufe 2: one central booking can now split into several
 * absences per employee (vacation until the quota is used up, the overage as
 * paid closure / compensatory time). The entries of one operation no longer
 * share an exact date range, so they are tied together by a group id for
 * listing and bulk removal.
 */
class Version000019Date20260708000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if ($schema->hasTable('wt_absences')) {
			$table = $schema->getTable('wt_absences');
			if (!$table->hasColumn('central_group')) {
				$table->addColumn('central_group', Types::STRING, [
					'notnull' => false,
					'length' => 64,
					'default' => null,
				]);
			}
		}

		return $schema;
	}
}
