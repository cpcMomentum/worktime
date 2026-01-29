<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Add is_half_day column to absences table
 * - is_half_day: Flag to mark absence as half day (0.5 days)
 */
class Version000004Date20260129000000 extends SimpleMigrationStep {

    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        if ($schema->hasTable('wt_absences')) {
            $table = $schema->getTable('wt_absences');

            if (!$table->hasColumn('is_half_day')) {
                $table->addColumn('is_half_day', Types::SMALLINT, [
                    'notnull' => true,
                    'default' => 0,
                ]);
            }
        }

        return $schema;
    }
}
