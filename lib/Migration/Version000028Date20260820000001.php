<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use Closure;
use OCP\DB\ISchemaWrapper;
use OCP\DB\Types;
use OCP\Migration\IOutput;
use OCP\Migration\SimpleMigrationStep;

/**
 * #593 Push backend (APNs): device tokens per user. The unique index on
 * device_token enforces "one row per device"; re-registering the same device
 * updates the existing row instead of duplicating.
 */
class Version000028Date20260820000001 extends SimpleMigrationStep {

	public function changeSchema(IOutput $output, Closure $schemaClosure, array $options): ?ISchemaWrapper {
		/** @var ISchemaWrapper $schema */
		$schema = $schemaClosure();

		if (!$schema->hasTable('wt_push_tokens')) {
			$table = $schema->createTable('wt_push_tokens');

			$table->addColumn('id', Types::INTEGER, [
				'autoincrement' => true,
				'notnull' => true,
			]);
			$table->addColumn('user_id', Types::STRING, [
				'notnull' => true,
				'length' => 64,
			]);
			// APNs device token (hex). 255 leaves room for other platforms later.
			$table->addColumn('device_token', Types::STRING, [
				'notnull' => true,
				'length' => 255,
			]);
			$table->addColumn('platform', Types::STRING, [
				'notnull' => true,
				'length' => 16,
				'default' => 'ios',
			]);
			$table->addColumn('updated_at', Types::DATETIME, [
				'notnull' => true,
			]);

			$table->setPrimaryKey(['id']);
			// One row per device; re-registration updates in place.
			$table->addUniqueIndex(['device_token'], 'wt_pt_token_uidx');
			// Sending to a user looks up all their devices.
			$table->addIndex(['user_id'], 'wt_pt_user_idx');
		}

		return $schema;
	}
}
