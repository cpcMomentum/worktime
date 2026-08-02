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
 * #522: Urlaubstage, die ein Mitarbeiter im Jahr seines Eintritts bereits
 * verbraucht hat — beim vorherigen Arbeitgeber oder vor der Umstellung auf die
 * App. Der Wert wirkt ausschliesslich im Eintrittsjahr und laesst den dauerhaften
 * Jahresanspruch unberuehrt.
 *
 * DECIMAL(4,1) wie wt_yearly_carryover.vacation_days, damit halbe Tage exakt
 * abgebildet werden. NULL = kein Verbrauch hinterlegt (Verhalten wie bisher).
 *
 * Idempotent: existiert die Spalte bereits, ein No-Op.
 */
class Version000024Date20260731000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('wt_employees');

		if (!$table->hasColumn('vacation_days_used')) {
			$table->addColumn('vacation_days_used', Types::DECIMAL, [
				'notnull' => false,
				'precision' => 4,
				'scale' => 1,
			]);
		}

		return $schema;
	}
}
