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
 * #625: stundenweise Krankheit fuer einen Einzeltag. absence_minutes traegt die
 * Krank-Minuten; NULL bedeutet unveraendertes scope-Verhalten (ganz/halb), daher
 * kein Backfill noetig.
 *
 * Idempotent: existiert die Spalte bereits, ein No-Op.
 */
class Version000029Date20260829000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('wt_absences');

		if (!$table->hasColumn('absence_minutes')) {
			$table->addColumn('absence_minutes', Types::INTEGER, [
				'notnull' => false,
			]);
		}

		return $schema;
	}
}
