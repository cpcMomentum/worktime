<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use Exception;

/**
 * #664: Raised by punch-out when the punch falls on a full approved vacation day
 * with emergency work enabled (#626) but no reason was given. A reason is
 * mandatory for emergency work, so the controller turns this into HTTP 409 with
 * the derived values — mirroring PunchConfirmationRequiredException — so the UI
 * can ask for the reason and re-submit instead of failing.
 */
class PunchReasonRequiredException extends Exception {

	/**
	 * @param array{date: string, startTime: string, endTime: string, breakMinutes: int} $suggested
	 */
	public function __construct(
		private array $suggested,
		string $message = 'A reason is required for emergency work during vacation',
	) {
		parent::__construct($message);
	}

	/**
	 * @return array{date: string, startTime: string, endTime: string, breakMinutes: int}
	 */
	public function getSuggested(): array {
		return $this->suggested;
	}
}
