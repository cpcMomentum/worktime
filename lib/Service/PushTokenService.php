<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use DateTimeZone;
use OCA\WorkTime\Db\PushToken;
use OCA\WorkTime\Db\PushTokenMapper;
use OCP\DB\Exception as DbException;
use Psr\Log\LoggerInterface;

/**
 * Owns the wt_push_tokens table (#593): register a device for the current user,
 * unregister on logout, look up a user's devices for delivery, and drop a token
 * that APNs reports as gone (410).
 */
class PushTokenService {

	public function __construct(
		private PushTokenMapper $mapper,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * Register (or refresh) a device token for a user. The device_token is unique,
	 * so re-registering the same device updates the existing row — including
	 * reassigning it to the current user when the device changed hands — instead
	 * of duplicating.
	 */
	public function register(string $userId, string $deviceToken, string $platform = 'ios'): PushToken {
		$existing = $this->mapper->findByDeviceTokenOrNull($deviceToken);
		if ($existing !== null) {
			return $this->claim($existing, $userId, $platform);
		}

		$token = new PushToken();
		$token->setUserId($userId);
		$token->setDeviceToken($deviceToken);
		$token->setPlatform($platform);
		$token->setUpdatedAt($this->nowUtc());
		try {
			return $this->mapper->insert($token);
		} catch (DbException $e) {
			// Lost the race with a concurrent first-time registration of the same
			// device: the row exists now, so update it instead of surfacing a 500.
			if ($e->getReason() === DbException::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
				$now = $this->mapper->findByDeviceTokenOrNull($deviceToken);
				if ($now !== null) {
					return $this->claim($now, $userId, $platform);
				}
			}
			throw $e;
		}
	}

	/**
	 * Point an existing device row at the current user. A device is identified by
	 * its token, so a re-provisioned device legitimately changes owner — but log
	 * the handover, since the token is the only credential.
	 */
	private function claim(PushToken $token, string $userId, string $platform): PushToken {
		if ($token->getUserId() !== $userId) {
			$this->logger->info('Push device token reassigned to a different user (device re-provisioned) (#593).');
		}
		$token->setUserId($userId);
		$token->setPlatform($platform);
		$token->setUpdatedAt($this->nowUtc());
		return $this->mapper->update($token);
	}

	/**
	 * Unregister a device the current user owns (logout). Scoped to the owner so
	 * one user cannot drop another's device. Returns affected rows.
	 */
	public function unregister(string $userId, string $deviceToken): int {
		return $this->mapper->deleteByDeviceToken($deviceToken, $userId);
	}

	/**
	 * All device tokens registered for a user (delivery targets).
	 *
	 * @return PushToken[]
	 */
	public function tokensForUser(string $userId): array {
		return $this->mapper->findByUser($userId);
	}

	/**
	 * Drop a token APNs reported as gone (410 Unregistered) — regardless of owner.
	 */
	public function removeToken(string $deviceToken): int {
		return $this->mapper->deleteByDeviceToken($deviceToken);
	}

	private function nowUtc(): DateTime {
		return new DateTime('now', new DateTimeZone('UTC'));
	}
}
