<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Make entity_id nullable in audit_logs table
 * This allows logging bulk operations (like "generate holidays") where no single entity_id exists
 */
class Version000002Date20260129000000 extends SimpleMigrationStep {

    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        if ($schema->hasTable('wt_audit_logs')) {
            $table = $schema->getTable('wt_audit_logs');
            $column = $table->getColumn('entity_id');
            $column->setNotnull(false);
        }

        return $schema;
    }
}
