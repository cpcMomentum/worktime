<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * #590: Add vacation_transferred flag to wt_employees.
 *
 * The flag distinguishes, in the entry year, a genuine new hire (flag = false →
 * Teilurlaub, § 5) from a takeover/continuation where the leave balance is
 * carried over (flag = true → full annual entitlement minus already-used, the
 * behaviour the app had before).
 *
 * Bestandsschutz: every existing employee that has an entry date is marked as a
 * takeover, so their (and their historical) entitlement stays exactly as today.
 * Only newly created employees default to false (Teilurlaub).
 */
class Version000025Date20260816000000 extends SimpleMigrationStep {

    public function __construct(
        private IDBConnection $db,
    ) {
    }

    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        $table = $schema->getTable('wt_employees');

        if (!$table->hasColumn('vacation_transferred')) {
            $table->addColumn('vacation_transferred', Types::BOOLEAN, [
                'notnull' => true,
                'default' => false,
            ]);
        }

        return $schema;
    }

    public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
        // Bestandsschutz: existing employees with an entry date keep the old
        // "full entitlement minus already used" behaviour, so no current or
        // historical number changes. New employees default to false (Teilurlaub).
        $qb = $this->db->getQueryBuilder();
        $qb->update('wt_employees')
            ->set('vacation_transferred', $qb->createNamedParameter(true, IQueryBuilder::PARAM_BOOL))
            ->where($qb->expr()->isNotNull('entry_date'));
        $affected = $qb->executeStatement();

        $output->info("#590: vacation_transferred=true fuer $affected bestehende Mitarbeiter mit Eintrittsdatum gesetzt (Bestandsschutz).");
    }
}
