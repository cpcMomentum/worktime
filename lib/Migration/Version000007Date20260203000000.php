<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\IDBConnection;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Replace is_half_day (boolean) with scope (decimal) for absences and holidays.
 *
 * - scope = 1.0 means full day
 * - scope = 0.5 means half day
 *
 * Data migration:
 * - is_half_day = 1 → scope = 0.5
 * - is_half_day = 0 → scope = 1.0
 */
class Version000007Date20260203000000 extends SimpleMigrationStep {

    private IDBConnection $connection;

    public function __construct(IDBConnection $connection) {
        $this->connection = $connection;
    }

    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        // Add scope column to wt_absences
        if ($schema->hasTable('wt_absences')) {
            $table = $schema->getTable('wt_absences');

            if (!$table->hasColumn('scope')) {
                $table->addColumn('scope', Types::DECIMAL, [
                    'precision' => 3,
                    'scale' => 2,
                    'notnull' => true,
                    'default' => '1.00',
                ]);
            }
        }

        // Add scope column to wt_holidays
        if ($schema->hasTable('wt_holidays')) {
            $table = $schema->getTable('wt_holidays');

            if (!$table->hasColumn('scope')) {
                $table->addColumn('scope', Types::DECIMAL, [
                    'precision' => 3,
                    'scale' => 2,
                    'notnull' => true,
                    'default' => '1.00',
                ]);
            }
        }

        return $schema;
    }

    public function postSchemaChange(IOutput $output, Closure $schemaClosure, array $options): void {
        // Migrate data from is_half_day to scope for absences
        // is_half_day = 1 means half day → scope = 0.5
        // is_half_day = 0 means full day → scope = 1.0
        $this->connection->executeStatement(
            'UPDATE `*PREFIX*wt_absences` SET `scope` = 0.50 WHERE `is_half_day` = 1'
        );
        $this->connection->executeStatement(
            'UPDATE `*PREFIX*wt_absences` SET `scope` = 1.00 WHERE `is_half_day` = 0 OR `is_half_day` IS NULL'
        );

        // Migrate data from is_half_day to scope for holidays
        $this->connection->executeStatement(
            'UPDATE `*PREFIX*wt_holidays` SET `scope` = 0.50 WHERE `is_half_day` = 1'
        );
        $this->connection->executeStatement(
            'UPDATE `*PREFIX*wt_holidays` SET `scope` = 1.00 WHERE `is_half_day` = 0 OR `is_half_day` IS NULL'
        );

        $output->info('Migrated is_half_day to scope for absences and holidays');
    }
}
