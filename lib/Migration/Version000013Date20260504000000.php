<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Create wt_yearly_carryover table for overtime and vacation carryover between years.
 */
class Version000013Date20260504000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wt_yearly_carryover')) {
			$table = $schema->createTable('wt_yearly_carryover');

			$table->addColumn('id', Types::BIGINT, [
				'autoincrement' => true,
				'notnull' => true,
				'length' => 8,
			]);
			$table->addColumn('employee_id', Types::BIGINT, [
				'notnull' => true,
				'length' => 8,
			]);
			$table->addColumn('year', Types::INTEGER, [
				'notnull' => true,
			]);
			$table->addColumn('overtime_minutes', Types::INTEGER, [
				'notnull' => true,
				'default' => 0,
			]);
			$table->addColumn('vacation_days', Types::DECIMAL, [
				'notnull' => true,
				'default' => 0,
				'precision' => 4,
				'scale' => 1,
			]);
			$table->addColumn('note', Types::STRING, [
				'notnull' => false,
				'length' => 500,
			]);
			$table->addColumn('created_by', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			$table->addColumn('created_at', Types::DATETIME, [
				'notnull' => true,
			]);
			$table->addColumn('updated_at', Types::DATETIME, [
				'notnull' => true,
			]);

			$table->setPrimaryKey(['id']);
			$table->addUniqueIndex(['employee_id', 'year'], 'wt_yc_emp_year_idx');
		}

		return $schema;
	}
}
