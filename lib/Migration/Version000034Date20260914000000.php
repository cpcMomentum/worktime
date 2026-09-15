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
 * #696: Persönliche Standard-Pause pro Mitarbeiter.
 *
 * Nullable `default_break_minutes` am Mitarbeiter, analog zu
 * `default_start_time`/`default_end_time`. Null = kein persönlicher Default →
 * es greift die gesetzliche Mindestpause (§4 ArbZG). Der Wert ist nur eine
 * Vorbelegung; der server-seitige Gate (TimeEntryService::validateBreak) bleibt
 * unverändert und kann nie unterschritten werden.
 *
 * Idempotent: existiert die Spalte bereits, ein No-Op.
 */
class Version000034Date20260914000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$employees = $schema->getTable('wt_employees');
		if (!$employees->hasColumn('default_break_minutes')) {
			$employees->addColumn('default_break_minutes', Types::INTEGER, [
				'notnull' => false,
			]);
		}

		return $schema;
	}
}
