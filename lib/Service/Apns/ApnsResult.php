<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service\Apns;

use JsonSerializable;

/**
 * Outcome of one APNs delivery (#593).
 */
class ApnsResult implements JsonSerializable {

	public function __construct(
		public readonly int $status,
		public readonly ?string $reason = null,
		public readonly ?string $apnsId = null,
	) {
	}

	/**
	 * APNs accepted the notification.
	 */
	public function isSuccess(): bool {
		return $this->status >= 200 && $this->status < 300;
	}

	/**
	 * The device token is no longer valid and should be dropped (APNs 410).
	 */
	public function isUnregistered(): bool {
		return $this->status === 410 || $this->reason === 'Unregistered';
	}

	public function jsonSerialize(): array {
		return [
			'status' => $this->status,
			'reason' => $this->reason,
			'apnsId' => $this->apnsId,
			'success' => $this->isSuccess(),
		];
	}
}
