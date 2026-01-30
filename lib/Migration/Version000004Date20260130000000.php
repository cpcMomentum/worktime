<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Create archive_queue table for background PDF archiving
 */
class Version000004Date20260130000000 extends SimpleMigrationStep {

    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        if (!$schema->hasTable('wt_archive_queue')) {
            $table = $schema->createTable('wt_archive_queue');

            $table->addColumn('id', Types::INTEGER, [
                'autoincrement' => true,
                'notnull' => true,
            ]);

            $table->addColumn('employee_id', Types::INTEGER, [
                'notnull' => true,
            ]);

            $table->addColumn('year', Types::INTEGER, [
                'notnull' => true,
            ]);

            $table->addColumn('month', Types::INTEGER, [
                'notnull' => true,
            ]);

            $table->addColumn('approver_id', Types::INTEGER, [
                'notnull' => false,
            ]);

            $table->addColumn('approved_at', Types::DATETIME, [
                'notnull' => true,
            ]);

            $table->addColumn('status', Types::STRING, [
                'length' => 20,
                'notnull' => true,
                'default' => 'pending',
            ]);

            $table->addColumn('attempts', Types::INTEGER, [
                'notnull' => true,
                'default' => 0,
            ]);

            $table->addColumn('last_error', Types::TEXT, [
                'notnull' => false,
            ]);

            $table->addColumn('created_at', Types::DATETIME, [
                'notnull' => true,
            ]);

            $table->addColumn('processed_at', Types::DATETIME, [
                'notnull' => false,
            ]);

            $table->setPrimaryKey(['id']);
            $table->addIndex(['status'], 'wt_archive_queue_status_idx');
            $table->addIndex(['employee_id'], 'wt_archive_queue_employee_idx');
        }

        return $schema;
    }
}
