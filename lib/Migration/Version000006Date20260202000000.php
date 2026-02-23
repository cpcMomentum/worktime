<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Add is_manual column to holidays table for distinguishing manual vs auto-generated holidays
 */
class Version000006Date20260202000000 extends SimpleMigrationStep {

    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        if ($schema->hasTable('wt_holidays')) {
            $table = $schema->getTable('wt_holidays');

            if (!$table->hasColumn('is_manual')) {
                $table->addColumn('is_manual', Types::SMALLINT, [
                    'notnull' => true,
                    'default' => 0,
                    'unsigned' => true,
                ]);
            }
        }

        return $schema;
    }
}
