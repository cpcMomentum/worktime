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
 * #588 Stopwatch reminders: mark when a punch-pause / forgot-clock-out reminder
 * was already sent, so the recurring job does not re-notify every run.
 */
class Version000027Date20260820000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if ($schema->hasTable('wt_active_punch')) {
			$table = $schema->getTable('wt_active_punch');
			if (!$table->hasColumn('pause_reminded_at')) {
				$table->addColumn('pause_reminded_at', Types::DATETIME, [
					'notnull' => false,
				]);
			}
			if (!$table->hasColumn('out_reminded_at')) {
				$table->addColumn('out_reminded_at', Types::DATETIME, [
					'notnull' => false,
				]);
			}
		}

		return $schema;
	}
}
