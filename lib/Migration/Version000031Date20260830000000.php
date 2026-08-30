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
 * #626-1: Freigabe-Zustand fuer Notarbeit im Urlaub. 0 = wartet auf Freigabe
 * (zaehlt nicht in die Ueberstunden), 1 = wirksam. Default 1, damit Bestandsdaten
 * und alle Nicht-Notarbeit-Eintraege den Engine-Filter nie sehen. SMALLINT statt
 * Boolean (NC bricht bei NOT-NULL-Boolean ab, #596).
 *
 * Idempotent: existiert die Spalte bereits, ein No-Op.
 */
class Version000031Date20260830000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('wt_time_entries');

		if (!$table->hasColumn('emergency_approved')) {
			$table->addColumn('emergency_approved', Types::SMALLINT, [
				'notnull' => true,
				'default' => 1,
			]);
		}

		return $schema;
	}
}
