<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use Exception;

/**
 * A punch state conflict: punching in while already in, out while not in,
 * pausing while already paused, resuming while not paused. Maps to HTTP 409.
 */
class PunchConflictException extends Exception {

	public function __construct(string $message = 'Punch state conflict') {
		parent::__construct($message);
	}
}
