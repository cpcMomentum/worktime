<?php

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * Add performance indexes for report batch queries.
 */
class Version000012Date20260504000000 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		// Index on wt_time_entries (employee_id, date) for monthly/year range queries
		$timeEntries = $schema->getTable('wt_time_entries');
		if (!$timeEntries->hasIndex('wt_te_emp_date_idx')) {
			$timeEntries->addIndex(['employee_id', 'date'], 'wt_te_emp_date_idx');
		}

		// Index on wt_time_entries (status) for status filtering
		if (!$timeEntries->hasIndex('wt_te_status_idx')) {
			$timeEntries->addIndex(['status'], 'wt_te_status_idx');
		}

		// Index on wt_absences (employee_id, start_date, end_date) for range queries
		$absences = $schema->getTable('wt_absences');
		if (!$absences->hasIndex('wt_abs_emp_dates_idx')) {
			$absences->addIndex(['employee_id', 'start_date', 'end_date'], 'wt_abs_emp_dates_idx');
		}

		// Index on wt_holidays (federal_state, date) for monthly holiday lookups
		$holidays = $schema->getTable('wt_holidays');
		if (!$holidays->hasIndex('wt_hol_state_date_idx')) {
			$holidays->addIndex(['federal_state', 'date'], 'wt_hol_state_date_idx');
		}

		return $schema;
	}
}
