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
 * #497: Ruhendstellung als Zeitraum. resting_from (Pflicht beim Ruhendstellen)
 * und resting_until (= Reaktivierungsdatum, NULL solange offen) grenzen den
 * Zeitraum ab, in dem kein Soll anfaellt. Beide NULL = nie ruhend gewesen.
 *
 * Bestandsdaten bewusst nicht befuellt: bereits inaktiv gesetzte Mitarbeiter
 * behalten resting_from NULL, der Admin traegt es bei Bedarf nach (keine
 * rueckwirkende Salden-Aenderung ohne Entscheidung).
 *
 * Idempotent: existieren die Spalten bereits, ein No-Op.
 */
class Version000032Date20260901000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('wt_employees');

		if (!$table->hasColumn('resting_from')) {
			$table->addColumn('resting_from', Types::DATE, [
				'notnull' => false,
			]);
		}
		if (!$table->hasColumn('resting_until')) {
			$table->addColumn('resting_until', Types::DATE, [
				'notnull' => false,
			]);
		}

		return $schema;
	}
}
