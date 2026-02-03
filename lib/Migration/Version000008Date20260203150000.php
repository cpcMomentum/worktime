<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Add default working time columns to employees table.
 *
 * - default_start_time: Default start time for new time entries
 * - default_end_time: Default end time for new time entries
 */
class Version000008Date20260203150000 extends SimpleMigrationStep {

    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        if ($schema->hasTable('wt_employees')) {
            $table = $schema->getTable('wt_employees');

            if (!$table->hasColumn('default_start_time')) {
                $table->addColumn('default_start_time', Types::TIME, [
                    'notnull' => false,
                    'default' => null,
                ]);
            }

            if (!$table->hasColumn('default_end_time')) {
                $table->addColumn('default_end_time', Types::TIME, [
                    'notnull' => false,
                    'default' => null,
                ]);
            }
        }

        return $schema;
    }
}
