<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

class Version000001Date20260127000000 extends SimpleMigrationStep {

    /**
     * @param IOutput $output
     * @param Closure(): ISchemaWrapper $schemaClosure
     * @param array $options
     * @return null|ISchemaWrapper
     */
    public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
        /** @var ISchemaWrapper $schema */
        $schema = $schemaClosure();

        // Employees table
        if (!$schema->hasTable('wt_employees')) {
            $table = $schema->createTable('wt_employees');

            $table->addColumn('id', Types::INTEGER, [
                'autoincrement' => true,
                'notnull' => true,
            ]);
            $table->addColumn('user_id', Types::STRING, [
                'notnull' => true,
                'length' => 64,
            ]);
            $table->addColumn('personnel_number', Types::STRING, [
                'notnull' => false,
                'length' => 50,
            ]);
            $table->addColumn('first_name', Types::STRING, [
                'notnull' => true,
                'length' => 100,
            ]);
            $table->addColumn('last_name', Types::STRING, [
                'notnull' => true,
                'length' => 100,
            ]);
            $table->addColumn('email', Types::STRING, [
                'notnull' => false,
                'length' => 255,
            ]);
            $table->addColumn('weekly_hours', Types::DECIMAL, [
                'notnull' => true,
                'precision' => 5,
                'scale' => 2,
                'default' => 40.00,
            ]);
            $table->addColumn('vacation_days', Types::INTEGER, [
                'notnull' => true,
                'default' => 30,
            ]);
            $table->addColumn('supervisor_id', Types::INTEGER, [
                'notnull' => false,
            ]);
            $table->addColumn('federal_state', Types::STRING, [
                'notnull' => true,
                'length' => 2,
                'default' => 'BY',
            ]);
            $table->addColumn('entry_date', Types::DATE, [
                'notnull' => false,
            ]);
            $table->addColumn('exit_date', Types::DATE, [
                'notnull' => false,
            ]);
            $table->addColumn('is_active', Types::SMALLINT, [
                'notnull' => true,
                'default' => 1,
            ]);
            $table->addColumn('created_at', Types::DATETIME, [
                'notnull' => true,
            ]);
            $table->addColumn('updated_at', Types::DATETIME, [
                'notnull' => true,
            ]);

            $table->setPrimaryKey(['id']);
            $table->addUniqueIndex(['user_id'], 'wt_emp_user_idx');
            $table->addIndex(['supervisor_id'], 'wt_emp_super_idx');
            $table->addIndex(['is_active'], 'wt_emp_active_idx');
        }

        // Time entries table
        if (!$schema->hasTable('wt_time_entries')) {
            $table = $schema->createTable('wt_time_entries');

            $table->addColumn('id', Types::INTEGER, [
                'autoincrement' => true,
                'notnull' => true,
            ]);
            $table->addColumn('employee_id', Types::INTEGER, [
                'notnull' => true,
            ]);
            $table->addColumn('date', Types::DATE, [
                'notnull' => true,
            ]);
            $table->addColumn('start_time', Types::TIME, [
                'notnull' => true,
            ]);
            $table->addColumn('end_time', Types::TIME, [
                'notnull' => true,
            ]);
            $table->addColumn('break_minutes', Types::INTEGER, [
                'notnull' => true,
                'default' => 0,
            ]);
            $table->addColumn('work_minutes', Types::INTEGER, [
                'notnull' => true,
            ]);
            $table->addColumn('project_id', Types::INTEGER, [
                'notnull' => false,
            ]);
            $table->addColumn('description', Types::TEXT, [
                'notnull' => false,
            ]);
            $table->addColumn('status', Types::STRING, [
                'notnull' => true,
                'length' => 20,
                'default' => 'draft',
            ]);
            $table->addColumn('created_at', Types::DATETIME, [
                'notnull' => true,
            ]);
            $table->addColumn('updated_at', Types::DATETIME, [
                'notnull' => true,
            ]);

            $table->setPrimaryKey(['id']);
            $table->addIndex(['employee_id'], 'wt_te_emp_idx');
            $table->addIndex(['date'], 'wt_te_date_idx');
            $table->addIndex(['employee_id', 'date'], 'wt_te_emp_date_idx');
            $table->addIndex(['project_id'], 'wt_te_proj_idx');
            $table->addIndex(['status'], 'wt_te_status_idx');
        }

        // Absences table
        if (!$schema->hasTable('wt_absences')) {
            $table = $schema->createTable('wt_absences');

            $table->addColumn('id', Types::INTEGER, [
                'autoincrement' => true,
                'notnull' => true,
            ]);
            $table->addColumn('employee_id', Types::INTEGER, [
                'notnull' => true,
            ]);
            $table->addColumn('type', Types::STRING, [
                'notnull' => true,
                'length' => 30,
            ]);
            $table->addColumn('start_date', Types::DATE, [
                'notnull' => true,
            ]);
            $table->addColumn('end_date', Types::DATE, [
                'notnull' => true,
            ]);
            $table->addColumn('days', Types::DECIMAL, [
                'notnull' => true,
                'precision' => 5,
                'scale' => 2,
            ]);
            $table->addColumn('note', Types::TEXT, [
                'notnull' => false,
            ]);
            $table->addColumn('status', Types::STRING, [
                'notnull' => true,
                'length' => 20,
                'default' => 'pending',
            ]);
            $table->addColumn('approved_by', Types::INTEGER, [
                'notnull' => false,
            ]);
            $table->addColumn('approved_at', Types::DATETIME, [
                'notnull' => false,
            ]);
            $table->addColumn('created_at', Types::DATETIME, [
                'notnull' => true,
            ]);
            $table->addColumn('updated_at', Types::DATETIME, [
                'notnull' => true,
            ]);

            $table->setPrimaryKey(['id']);
            $table->addIndex(['employee_id'], 'wt_abs_emp_idx');
            $table->addIndex(['type'], 'wt_abs_type_idx');
            $table->addIndex(['start_date', 'end_date'], 'wt_abs_dates_idx');
            $table->addIndex(['status'], 'wt_abs_status_idx');
        }

        // Holidays table
        if (!$schema->hasTable('wt_holidays')) {
            $table = $schema->createTable('wt_holidays');

            $table->addColumn('id', Types::INTEGER, [
                'autoincrement' => true,
                'notnull' => true,
            ]);
            $table->addColumn('date', Types::DATE, [
                'notnull' => true,
            ]);
            $table->addColumn('name', Types::STRING, [
                'notnull' => true,
                'length' => 100,
            ]);
            $table->addColumn('federal_state', Types::STRING, [
                'notnull' => true,
                'length' => 2,
            ]);
            $table->addColumn('is_half_day', Types::SMALLINT, [
                'notnull' => true,
                'default' => 0,
            ]);
            $table->addColumn('year', Types::INTEGER, [
                'notnull' => true,
            ]);
            $table->addColumn('created_at', Types::DATETIME, [
                'notnull' => true,
            ]);

            $table->setPrimaryKey(['id']);
            $table->addUniqueIndex(['date', 'federal_state'], 'wt_hol_date_state_idx');
            $table->addIndex(['year', 'federal_state'], 'wt_hol_year_state_idx');
        }

        // Projects table
        if (!$schema->hasTable('wt_projects')) {
            $table = $schema->createTable('wt_projects');

            $table->addColumn('id', Types::INTEGER, [
                'autoincrement' => true,
                'notnull' => true,
            ]);
            $table->addColumn('name', Types::STRING, [
                'notnull' => true,
                'length' => 255,
            ]);
            $table->addColumn('code', Types::STRING, [
                'notnull' => false,
                'length' => 50,
            ]);
            $table->addColumn('description', Types::TEXT, [
                'notnull' => false,
            ]);
            $table->addColumn('color', Types::STRING, [
                'notnull' => false,
                'length' => 7,
            ]);
            $table->addColumn('is_active', Types::SMALLINT, [
                'notnull' => true,
                'default' => 1,
            ]);
            $table->addColumn('is_billable', Types::SMALLINT, [
                'notnull' => true,
                'default' => 1,
            ]);
            $table->addColumn('created_at', Types::DATETIME, [
                'notnull' => true,
            ]);
            $table->addColumn('updated_at', Types::DATETIME, [
                'notnull' => true,
            ]);

            $table->setPrimaryKey(['id']);
            $table->addIndex(['is_active'], 'wt_proj_active_idx');
            $table->addIndex(['code'], 'wt_proj_code_idx');
        }

        // Audit logs table
        if (!$schema->hasTable('wt_audit_logs')) {
            $table = $schema->createTable('wt_audit_logs');

            $table->addColumn('id', Types::INTEGER, [
                'autoincrement' => true,
                'notnull' => true,
            ]);
            $table->addColumn('user_id', Types::STRING, [
                'notnull' => true,
                'length' => 64,
            ]);
            $table->addColumn('action', Types::STRING, [
                'notnull' => true,
                'length' => 50,
            ]);
            $table->addColumn('entity_type', Types::STRING, [
                'notnull' => true,
                'length' => 50,
            ]);
            $table->addColumn('entity_id', Types::INTEGER, [
                'notnull' => true,
            ]);
            $table->addColumn('old_values', Types::TEXT, [
                'notnull' => false,
            ]);
            $table->addColumn('new_values', Types::TEXT, [
                'notnull' => false,
            ]);
            $table->addColumn('ip_address', Types::STRING, [
                'notnull' => false,
                'length' => 45,
            ]);
            $table->addColumn('created_at', Types::DATETIME, [
                'notnull' => true,
            ]);

            $table->setPrimaryKey(['id']);
            $table->addIndex(['user_id'], 'wt_audit_user_idx');
            $table->addIndex(['entity_type', 'entity_id'], 'wt_audit_entity_idx');
            $table->addIndex(['created_at'], 'wt_audit_date_idx');
        }

        // Company settings table
        if (!$schema->hasTable('wt_company_settings')) {
            $table = $schema->createTable('wt_company_settings');

            $table->addColumn('id', Types::INTEGER, [
                'autoincrement' => true,
                'notnull' => true,
            ]);
            $table->addColumn('setting_key', Types::STRING, [
                'notnull' => true,
                'length' => 100,
            ]);
            $table->addColumn('setting_value', Types::TEXT, [
                'notnull' => false,
            ]);
            $table->addColumn('updated_at', Types::DATETIME, [
                'notnull' => true,
            ]);

            $table->setPrimaryKey(['id']);
            $table->addUniqueIndex(['setting_key'], 'wt_settings_key_idx');
        }

        return $schema;
    }
}
