<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service\Apns;

use OCA\WorkTime\Service\Apns\ApnsException;
use OCA\WorkTime\Service\Apns\ApnsJwt;
use OCP\IAppConfig;
use PHPUnit\Framework\TestCase;

class ApnsJwtTest extends TestCase {

	private string $privateKeyPem = '';
	private string $publicKeyPem = '';

	protected function setUp(): void {
		// A throwaway P-256 key pair — same curve as an Apple .p8 APNs key.
		$key = openssl_pkey_new([
			'private_key_type' => OPENSSL_KEYTYPE_EC,
			'curve_name' => 'prime256v1',
		]);
		if ($key === false) {
			$this->markTestSkipped('OpenSSL EC key generation not available.');
		}
		openssl_pkey_export($key, $this->privateKeyPem);
		$this->publicKeyPem = openssl_pkey_get_details($key)['key'];
	}

	public function testSignedTokenIsAWellFormedEs256JwtThatVerifies(): void {
		$jwt = new ApnsJwt($this->createMock(IAppConfig::class));

		$token = $jwt->sign('TEAMID1234', 'KEYID5678', $this->privateKeyPem, 1_700_000_000);

		$parts = explode('.', $token);
		$this->assertCount(3, $parts, 'JWT must have three dot-separated parts');

		$header = json_decode($this->b64d($parts[0]), true);
		$payload = json_decode($this->b64d($parts[1]), true);
		$this->assertSame('ES256', $header['alg']);
		$this->assertSame('KEYID5678', $header['kid']);
		$this->assertSame('TEAMID1234', $payload['iss']);
		$this->assertSame(1_700_000_000, $payload['iat']);

		// The signature must verify against the matching public key — this proves
		// the DER→JOSE conversion produced a correct raw R‖S signature.
		$signingInput = $parts[0] . '.' . $parts[1];
		$der = $this->joseToDer($this->b64d($parts[2]));
		$this->assertSame(1, openssl_verify($signingInput, $der, $this->publicKeyPem, OPENSSL_ALGO_SHA256));
	}

	public function testRawSignatureIsExactly64Bytes(): void {
		$jwt = new ApnsJwt($this->createMock(IAppConfig::class));
		$token = $jwt->sign('T', 'K', $this->privateKeyPem, 1_700_000_000);
		$raw = $this->b64d(explode('.', $token)[2]);
		$this->assertSame(64, strlen($raw), 'P-256 JOSE signature is 32+32 bytes');
	}

	public function testTokenReadsConfigAndCachesUntilRefreshWindow(): void {
		$appConfig = $this->createMock(IAppConfig::class);
		$appConfig->method('getValueString')->willReturnMap([
			['worktime', 'apns_team_id', '', false, 'TEAMID1234'],
			['worktime', 'apns_key_id', '', false, 'KEYID5678'],
			['worktime', 'apns_key_p8', '', false, $this->privateKeyPem],
		]);

		$jwt = new class($appConfig) extends ApnsJwt {
			public int $clock = 1_700_000_000;
			protected function now(): int {
				return $this->clock;
			}
		};

		$first = $jwt->token();
		// Same second → cached, identical token.
		$this->assertSame($first, $jwt->token());

		// Just inside the refresh window → still cached.
		$jwt->clock += 2999;
		$this->assertSame($first, $jwt->token());

		// Past the refresh window → new iat, new token.
		$jwt->clock += 2;
		$this->assertNotSame($first, $jwt->token());
	}

	public function testMissingConfigThrows(): void {
		$appConfig = $this->createMock(IAppConfig::class);
		$appConfig->method('getValueString')->willReturn('');
		$jwt = new ApnsJwt($appConfig);

		$this->expectException(ApnsException::class);
		$jwt->token();
	}

	public function testInvalidPrivateKeyThrows(): void {
		$jwt = new ApnsJwt($this->createMock(IAppConfig::class));
		$this->expectException(ApnsException::class);
		$jwt->sign('T', 'K', 'not-a-key', 1_700_000_000);
	}

	private function b64d(string $data): string {
		return base64_decode(strtr($data, '-_', '+/'));
	}

	/**
	 * Convert a raw JOSE R‖S signature back to DER so openssl_verify can check it.
	 */
	private function joseToDer(string $raw): string {
		$r = $this->derInteger(substr($raw, 0, 32));
		$s = $this->derInteger(substr($raw, 32, 32));
		$seq = $r . $s;
		return "\x30" . chr(strlen($seq)) . $seq;
	}

	private function derInteger(string $bytes): string {
		$bytes = ltrim($bytes, "\x00");
		if ($bytes === '') {
			$bytes = "\x00";
		}
		// Prepend 0x00 if the high bit is set (would otherwise read as negative).
		if (ord($bytes[0]) & 0x80) {
			$bytes = "\x00" . $bytes;
		}
		return "\x02" . chr(strlen($bytes)) . $bytes;
	}
}
