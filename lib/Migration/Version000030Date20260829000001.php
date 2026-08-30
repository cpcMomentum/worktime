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
 * #626-1: Notarbeit/Bereitschaft an einem genehmigten vollen Urlaubstag.
 * is_emergency markiert solche Zeiteintraege. SMALLINT statt Boolean, weil NC
 * bei NOT-NULL-Boolean-Migrationen abbricht (#596); Default 0 = regulaerer Eintrag.
 *
 * Idempotent: existiert die Spalte bereits, ein No-Op.
 */
class Version000030Date20260829000001 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		$table = $schema->getTable('wt_time_entries');

		if (!$table->hasColumn('is_emergency')) {
			$table->addColumn('is_emergency', Types::SMALLINT, [
				'notnull' => true,
				'default' => 0,
			]);
		}

		return $schema;
	}
}
