<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCA\WorkTime\Db\CompanySetting;
use OCP\DB\ISchemaWrapper;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * #472 Monatsgenehmigung standardmaessig AUS.
 *
 * Der neue Default fuer approval_required ist '0' (CompanySetting::DEFAULTS).
 * Damit erhalten Neuinstallationen die Genehmigung ausgeschaltet.
 *
 * Bestandsinstanzen, die den Workflow bislang (ueber den alten Default '1')
 * genutzt haben, duerfen NICHT still umgeschaltet werden. Erkennung einer
 * in Benutzung befindlichen Instanz: es existiert mindestens ein Mitarbeiter.
 * Fehlt in einer solchen Instanz noch eine explizite approval_required-Zeile,
 * wird '1' explizit geschrieben, um das bisherige Verhalten zu erhalten.
 *
 * Fresh-Installs haben zu diesem Zeitpunkt keine Mitarbeiter -> es wird nichts
 * geschrieben -> der neue Default '0' greift.
 */
class Version000020Date20260712000000 extends SimpleMigrationStep {

	public function __construct(
		private IDBConnection $db,
	) {
	}

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		return null;
	}

	public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wt_employees') || !$schema->hasTable('wt_company_settings')) {
			return;
		}

		// Bestandsinstanz? -> mindestens ein Mitarbeiter vorhanden.
		$qb = $this->db->getQueryBuilder();
		$qb->select($qb->func()->count('id'))->from('wt_employees');
		$result = $qb->executeQuery();
		$employeeCount = (int)$result->fetchOne();
		$result->closeCursor();

		if ($employeeCount === 0) {
			$output->info('#472: Neuinstallation erkannt (keine Mitarbeiter) - Genehmigung bleibt standardmaessig AUS');
			return;
		}

		// Existiert bereits eine explizite Einstellung? Dann nicht anfassen.
		$qb = $this->db->getQueryBuilder();
		$qb->select($qb->func()->count('id'))
			->from('wt_company_settings')
			->where($qb->expr()->eq('setting_key', $qb->createNamedParameter(CompanySetting::KEY_APPROVAL_REQUIRED)));
		$result = $qb->executeQuery();
		$settingExists = (int)$result->fetchOne() > 0;
		$result->closeCursor();

		if ($settingExists) {
			$output->info('#472: approval_required bereits explizit gesetzt - unveraendert');
			return;
		}

		// Bestandsinstanz ohne explizite Zeile: bisheriges AN-Verhalten festschreiben.
		$insert = $this->db->getQueryBuilder();
		$insert->insert('wt_company_settings')
			->values([
				'setting_key' => $insert->createNamedParameter(CompanySetting::KEY_APPROVAL_REQUIRED),
				'setting_value' => $insert->createNamedParameter('1'),
				'updated_at' => $insert->createNamedParameter((new \DateTime())->format('Y-m-d H:i:s')),
			]);
		$insert->executeStatement();

		$output->info('#472: Bestandsinstanz - approval_required explizit auf AN gesetzt (bisheriges Verhalten erhalten)');
	}
}
