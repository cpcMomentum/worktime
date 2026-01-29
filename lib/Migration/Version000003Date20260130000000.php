<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Add approval timestamps to time_entries table
 * - submitted_at: When the entry was submitted for approval
 * - submitted_by: Employee ID who submitted (usually the owner)
 * - approved_at: When the entry was approved/rejected
 * - approved_by: Employee ID who approved/rejected
 */
class Version000003Date20260130000000 extends SimpleMigrationStep {

    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        if ($schema->hasTable('wt_time_entries')) {
            $table = $schema->getTable('wt_time_entries');

            if (!$table->hasColumn('submitted_at')) {
                $table->addColumn('submitted_at', Types::DATETIME, [
                    'notnull' => false,
                ]);
            }

            if (!$table->hasColumn('submitted_by')) {
                $table->addColumn('submitted_by', Types::INTEGER, [
                    'notnull' => false,
                ]);
            }

            if (!$table->hasColumn('approved_at')) {
                $table->addColumn('approved_at', Types::DATETIME, [
                    'notnull' => false,
                ]);
            }

            if (!$table->hasColumn('approved_by')) {
                $table->addColumn('approved_by', Types::INTEGER, [
                    'notnull' => false,
                ]);
            }
        }

        return $schema;
    }
}
