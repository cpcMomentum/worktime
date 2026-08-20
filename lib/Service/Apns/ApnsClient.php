<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service\Apns;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Service\PushTokenService;
use OCP\IAppConfig;
use Psr\Log\LoggerInterface;

/**
 * Sends notifications to Apple Push (#593) over HTTP/2 with a provider-token
 * (ES256 JWT). Token hygiene is built in: a 410 Unregistered response drops the
 * dead device token from wt_push_tokens.
 *
 * Transport is isolated in {@see transport()} so the request assembly and
 * response handling can be unit-tested without a network.
 */
class ApnsClient {

	private const HOST_PROD = 'api.push.apple.com';
	private const HOST_SANDBOX = 'api.sandbox.push.apple.com';

	public function __construct(
		private ApnsJwt $jwt,
		private IAppConfig $appConfig,
		private PushTokenService $pushTokenService,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * Send a payload to one device. On APNs 410 the token is removed.
	 *
	 * @param array $payload the full APNs body, e.g. ['aps' => ['alert' => …]]
	 * @throws ApnsException on missing config or a transport failure
	 */
	public function send(string $deviceToken, array $payload): ApnsResult {
		$topic = $this->topic();
		$host = $this->host();
		$headers = [
			'authorization: bearer ' . $this->jwt->token(),
			'apns-topic: ' . $topic,
			'apns-push-type: alert',
			'content-type: application/json',
		];
		$body = json_encode($payload, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);
		if ($body === false) {
			// Fail fast rather than POST an empty body APNs would reject opaquely.
			throw new ApnsException('APNs payload could not be encoded: ' . json_last_error_msg());
		}

		$response = $this->transport('https://' . $host . '/3/device/' . $deviceToken, $headers, $body);
		$result = $this->parse($response);

		if ($result->isUnregistered()) {
			$this->pushTokenService->removeToken($deviceToken);
			$this->logger->info('APNs reported an unregistered device token; dropped it (#593).');
		}
		return $result;
	}

	/**
	 * Send the same payload to every device registered for a user.
	 *
	 * @return array<string, ApnsResult> keyed by device token
	 */
	public function sendToUser(string $userId, array $payload): array {
		$results = [];
		foreach ($this->pushTokenService->tokensForUser($userId) as $token) {
			$deviceToken = $token->getDeviceToken();
			try {
				$results[$deviceToken] = $this->send($deviceToken, $payload);
			} catch (ApnsException $e) {
				// One dead connection must not block delivery to the other
				// devices — record it and carry on.
				$this->logger->warning('APNs delivery to a device failed (#593).', ['exception' => $e]);
				$results[$deviceToken] = new ApnsResult(0, 'transport_error');
			}
		}
		return $results;
	}

	/**
	 * Build a simple alert payload.
	 */
	public static function alertPayload(string $title, string $body, array $data = []): array {
		$payload = ['aps' => ['alert' => ['title' => $title, 'body' => $body], 'sound' => 'default']];
		if ($data !== []) {
			$payload['data'] = $data;
		}
		return $payload;
	}

	/**
	 * Perform the HTTP/2 POST. Returns the raw status, body and apns-id. Isolated
	 * so tests can stub it.
	 *
	 * @return array{status: int, body: string, apnsId: ?string}
	 * @throws ApnsException on a transport-level failure
	 */
	protected function transport(string $url, array $headers, string $body): array {
		$ch = curl_init($url);
		if ($ch === false) {
			throw new ApnsException('Could not initialise the APNs request.');
		}
		$apnsId = null;
		curl_setopt_array($ch, [
			CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_2_0,
			CURLOPT_POST => true,
			CURLOPT_POSTFIELDS => $body,
			CURLOPT_HTTPHEADER => $headers,
			CURLOPT_RETURNTRANSFER => true,
			CURLOPT_TIMEOUT => 10,
			CURLOPT_HEADERFUNCTION => static function ($ch, string $line) use (&$apnsId): int {
				if (stripos($line, 'apns-id:') === 0) {
					$apnsId = trim(substr($line, strlen('apns-id:')));
				}
				return strlen($line);
			},
		]);

		$responseBody = curl_exec($ch);
		if ($responseBody === false) {
			$error = curl_error($ch);
			curl_close($ch);
			throw new ApnsException('APNs request failed: ' . $error);
		}
		$status = (int)curl_getinfo($ch, CURLINFO_RESPONSE_CODE);
		curl_close($ch);

		return ['status' => $status, 'body' => (string)$responseBody, 'apnsId' => $apnsId];
	}

	/**
	 * @param array{status: int, body: string, apnsId: ?string} $response
	 */
	private function parse(array $response): ApnsResult {
		$reason = null;
		if ($response['body'] !== '') {
			$decoded = json_decode($response['body'], true);
			if (is_array($decoded) && isset($decoded['reason'])) {
				$reason = (string)$decoded['reason'];
			}
		}
		return new ApnsResult($response['status'], $reason, $response['apnsId']);
	}

	private function topic(): string {
		return $this->appConfig->getValueString(Application::APP_ID, 'apns_topic', 'com.cpcmomentum.worktime');
	}

	private function host(): string {
		$env = $this->appConfig->getValueString(Application::APP_ID, 'apns_environment', 'prod');
		return $env === 'sandbox' ? self::HOST_SANDBOX : self::HOST_PROD;
	}
}
