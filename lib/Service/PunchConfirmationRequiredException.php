<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use Exception;

/**
 * Raised by punch-out when the elapsed time exceeds the overlong threshold
 * (max_daily_hours + §4 break) and the client has neither confirmed nor
 * corrected the end. The controller turns this into HTTP 409 with the derived
 * values so the UI can show a confirm/correct dialog instead of booking blindly.
 */
class PunchConfirmationRequiredException extends Exception {

	/**
	 * @param array{date: string, startTime: string, endTime: string, breakMinutes: int, hoursElapsed: float} $suggested
	 */
	public function __construct(
		private array $suggested,
		string $message = 'Confirmation required for an overlong punch',
	) {
		parent::__construct($message);
	}

	/**
	 * @return array{date: string, startTime: string, endTime: string, breakMinutes: int, hoursElapsed: float}
	 */
	public function getSuggested(): array {
		return $this->suggested;
	}
}
