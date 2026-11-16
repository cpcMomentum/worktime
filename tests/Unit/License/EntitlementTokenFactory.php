<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\License;

use OCA\WorkTime\License\EntitlementTokenVerifier;

// Signiert Test-Tokens mit echten RSA-Schluesseln, damit die Signaturpruefung wirklich laeuft.
trait EntitlementTokenFactory {

    protected const TEST_KID = 'test-kid';
    protected const NOW = 1_792_332_723;
    protected const INSTANCE_ID = 'ocx7k2m9qz4t';
    protected const UUID = '8cb3c100-9e4c-5375-9e63-1f4d122ea315';

    /** @var array{private: \OpenSSLAsymmetricKey, public: string}|null */
    private static ?array $testKey = null;
    /** @var array{private: \OpenSSLAsymmetricKey, public: string}|null */
    private static ?array $foreignKey = null;

    /**
     * @return array{private: \OpenSSLAsymmetricKey, public: string}
     */
    protected static function testKey(): array {
        return self::$testKey ??= self::generateKey();
    }

    /**
     * @return array{private: \OpenSSLAsymmetricKey, public: string}
     */
    protected static function foreignKey(): array {
        return self::$foreignKey ??= self::generateKey();
    }

    /**
     * @return array{private: \OpenSSLAsymmetricKey, public: string}
     */
    private static function generateKey(): array {
        $key = openssl_pkey_new(['private_key_bits' => 2048, 'private_key_type' => OPENSSL_KEYTYPE_RSA]);
        if ($key === false) {
            throw new \RuntimeException('openssl_pkey_new fehlgeschlagen');
        }
        return ['private' => $key, 'public' => openssl_pkey_get_details($key)['key']];
    }

    protected function verifier(): EntitlementTokenVerifier {
        return new EntitlementTokenVerifier([self::TEST_KID => self::testKey()['public']]);
    }

    /**
     * @param array<string, mixed> $overrides null entfernt den Anspruch
     * @return array<string, mixed>
     */
    protected function claims(array $overrides = []): array {
        $claims = [
            'iss' => 'https://api.werkwolke.de',
            'aud' => 'werkplus',
            'sub' => self::UUID,
            'iat' => self::NOW,
            'nbf' => self::NOW,
            'exp' => self::NOW + 30 * 86400,
            'tier' => 'werkplus',
            'features' => ['wt_mobile', 'api_keys', 'pw_multi_board'],
            'seatsBucket' => null,
            'graceUntil' => self::NOW + 44 * 86400,
        ];
        foreach ($overrides as $name => $value) {
            if ($value === null) {
                unset($claims[$name]);
            } else {
                $claims[$name] = $value;
            }
        }
        return $claims;
    }

    /**
     * @param array<string, mixed> $claims
     * @param array<string, mixed> $header
     */
    protected function token(array $claims, array $header = [], ?\OpenSSLAsymmetricKey $signWith = null): string {
        $header = array_merge(['alg' => 'RS256', 'typ' => 'JWT', 'kid' => self::TEST_KID], $header);
        $input = self::b64(json_encode($header, JSON_THROW_ON_ERROR)) . '.' . self::b64(json_encode($claims, JSON_THROW_ON_ERROR));
        openssl_sign($input, $signature, $signWith ?? self::testKey()['private'], OPENSSL_ALGO_SHA256);
        return $input . '.' . self::b64($signature);
    }

    protected static function b64(string $data): string {
        return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
    }
}
