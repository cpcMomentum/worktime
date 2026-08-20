<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service\Apns;

use OCA\WorkTime\AppInfo\Application;
use OCP\IAppConfig;

/**
 * Builds the APNs provider authentication token (#593): a short-lived ES256 JWT
 * signed with the Apple .p8 key, exactly the token-auth scheme Apple mandates
 * (iss = Team ID, kid = Key ID, iat now, valid < 1 h). The signed token is
 * cached in memory and refreshed well before Apple's one-hour limit.
 *
 * The .p8 key, Key ID and Team ID come from app config (set on the server via
 * `occ config:app:set`, never committed).
 */
class ApnsJwt {

	// Apple rejects a provider token older than 1 h; refresh comfortably before.
	private const REFRESH_AFTER = 3000; // 50 min

	private ?string $cachedToken = null;
	private int $cachedAt = 0;

	public function __construct(
		private IAppConfig $appConfig,
	) {
	}

	/**
	 * A valid provider token, reusing the cached one until it nears expiry.
	 *
	 * @throws ApnsException when the key material is missing or invalid
	 */
	public function token(): string {
		$now = $this->now();
		if ($this->cachedToken !== null && ($now - $this->cachedAt) < self::REFRESH_AFTER) {
			return $this->cachedToken;
		}

		$token = $this->sign(
			$this->requireConfig('apns_team_id'),
			$this->requireConfig('apns_key_id'),
			$this->requireConfig('apns_key_p8'),
			$now,
		);
		$this->cachedToken = $token;
		$this->cachedAt = $now;
		return $token;
	}

	/**
	 * Sign a provider JWT from explicit material. Public so it can be exercised in
	 * isolation (and unit-verified against the matching public key).
	 *
	 * @throws ApnsException
	 */
	public function sign(string $teamId, string $keyId, string $privateKeyPem, int $iat): string {
		$signingInput = $this->b64(json_encode(['alg' => 'ES256', 'kid' => $keyId], JSON_UNESCAPED_SLASHES))
			. '.'
			. $this->b64(json_encode(['iss' => $teamId, 'iat' => $iat], JSON_UNESCAPED_SLASHES));

		$key = openssl_pkey_get_private($privateKeyPem);
		if ($key === false) {
			throw new ApnsException('APNs key is not a valid private key (.p8).');
		}

		$der = '';
		if (!openssl_sign($signingInput, $der, $key, OPENSSL_ALGO_SHA256)) {
			throw new ApnsException('APNs JWT signing failed.');
		}

		// openssl emits a DER-encoded ECDSA signature; JOSE/JWT wants the raw
		// fixed-length R‖S concatenation. P-256 → 32 bytes each.
		return $signingInput . '.' . $this->b64($this->derToJose($der, 32));
	}

	/**
	 * Convert a DER-encoded ECDSA signature (SEQUENCE of two INTEGERs) into the
	 * fixed-length R‖S form JOSE requires.
	 */
	private function derToJose(string $der, int $partLength): string {
		$offset = 0;
		$len = strlen($der);
		if ($len < 2 || ord($der[$offset++]) !== 0x30) {
			throw new ApnsException('Malformed ECDSA signature (no SEQUENCE).');
		}
		// Skip the SEQUENCE length (short or long form); we don't need its value.
		$seqLen = ord($der[$offset++]);
		if ($seqLen & 0x80) {
			$offset += ($seqLen & 0x7f);
		}
		$r = $this->readInteger($der, $offset);
		$s = $this->readInteger($der, $offset);
		return $this->pad($r, $partLength) . $this->pad($s, $partLength);
	}

	/**
	 * Read one DER INTEGER, advancing $offset past it, and return its raw bytes
	 * with any leading sign byte stripped.
	 */
	private function readInteger(string $der, int &$offset): string {
		if ($offset + 2 > strlen($der) || ord($der[$offset++]) !== 0x02) {
			throw new ApnsException('Malformed ECDSA signature (expected INTEGER).');
		}
		$intLen = ord($der[$offset++]);
		$bytes = substr($der, $offset, $intLen);
		$offset += $intLen;
		return ltrim($bytes, "\x00");
	}

	private function pad(string $bytes, int $length): string {
		if (strlen($bytes) > $length) {
			throw new ApnsException('ECDSA signature component too long.');
		}
		return str_pad($bytes, $length, "\x00", STR_PAD_LEFT);
	}

	private function b64(string $data): string {
		return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
	}

	private function requireConfig(string $key): string {
		$value = trim($this->appConfig->getValueString(Application::APP_ID, $key));
		if ($value === '') {
			throw new ApnsException(sprintf('APNs is not configured: missing "%s".', $key));
		}
		return $value;
	}

	/**
	 * Current unix time. Overridable so tests can assert the iat/exp window.
	 */
	protected function now(): int {
		return time();
	}
}
