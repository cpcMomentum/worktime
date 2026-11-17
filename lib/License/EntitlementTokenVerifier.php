<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\License;


// Ohne JWT-Bibliothek: RS256 ist fest, und ein Ablauf ist ein Zustand (Grace), keine Ausnahme.
final class EntitlementTokenVerifier {

    public const ISSUER = 'https://api.werkwolke.de';
    public const AUDIENCE = 'werkplus';
    public const TIERS = ['free', 'werkplus'];
    private const CLOCK_LEEWAY = 60;

    /**
     * @param array<string, string> $publicKeys kid => PEM; nur Tests reichen eine andere Liste herein
     */
    public function __construct(
        private readonly array $publicKeys = EntitlementKeys::PUBLIC_KEYS,
    ) {
    }

    /**
     * @throws InvalidTokenException
     */
    public function verify(#[\SensitiveParameter] string $jwt, string $instanceUuid, int $now): EntitlementToken {
        $parts = explode('.', $jwt);
        if (count($parts) !== 3) {
            throw new InvalidTokenException('Token hat nicht drei Teile');
        }
        foreach ($parts as $part) {
            if (preg_match('/^[A-Za-z0-9_-]+$/', $part) !== 1) {
                throw new InvalidTokenException('Token ist nicht base64url-kodiert');
            }
        }
        [$headerPart, $payloadPart, $signaturePart] = $parts;

        $header = $this->decodeJson($headerPart);
        $kid = $header['kid'] ?? null;
        // Die kid ist noch unverifiziert: nur als Index in die feste Liste, nie als Pfad oder URL.
        if (!is_string($kid) || !array_key_exists($kid, $this->publicKeys)) {
            throw new InvalidTokenException('Unbekannte Key-ID');
        }

        $key = openssl_pkey_get_public($this->publicKeys[$kid]);
        if ($key === false || (openssl_pkey_get_details($key)['type'] ?? null) !== OPENSSL_KEYTYPE_RSA) {
            throw new InvalidTokenException('Eingebrannter Schluessel ist kein RSA-Schluessel');
        }
        $signature = $this->base64UrlDecode($signaturePart);
        if (openssl_verify($headerPart . '.' . $payloadPart, $signature, $key, OPENSSL_ALGO_SHA256) !== 1) {
            throw new InvalidTokenException('Signatur ungueltig');
        }

        $claims = $this->decodeJson($payloadPart);

        if (($claims['iss'] ?? null) !== self::ISSUER) {
            throw new InvalidTokenException('Falscher Aussteller');
        }
        $aud = $claims['aud'] ?? null;
        $audiences = is_array($aud) ? $aud : [$aud];
        if (!in_array(self::AUDIENCE, $audiences, true)) {
            throw new InvalidTokenException('Falsche Zielgruppe');
        }
        $sub = $claims['sub'] ?? null;
        if (!is_string($sub) || $instanceUuid === '' || strtolower($sub) !== strtolower($instanceUuid)) {
            throw new InvalidTokenException('Token gehoert zu einer anderen Installation');
        }

        foreach (['iat', 'nbf', 'exp', 'graceUntil'] as $name) {
            if (!is_int($claims[$name] ?? null)) {
                throw new InvalidTokenException('Anspruch fehlt oder ist keine Zahl: ' . $name);
            }
        }
        if ($claims['nbf'] > $now + self::CLOCK_LEEWAY) {
            throw new InvalidTokenException('Token ist noch nicht gueltig');
        }

        $tier = $claims['tier'] ?? null;
        if (!in_array($tier, self::TIERS, true)) {
            throw new InvalidTokenException('Unbekannter Tarif');
        }
        $features = $claims['features'] ?? null;
        if (!is_array($features) || !array_is_list($features)) {
            throw new InvalidTokenException('features ist keine Liste');
        }
        foreach ($features as $feature) {
            if (!is_string($feature)) {
                throw new InvalidTokenException('features enthaelt einen Nicht-Namen');
            }
        }
        $licensedEmployees = $claims['licensedEmployees'] ?? null;

        return new EntitlementToken(
            $tier,
            $features,
            $claims['iat'],
            $claims['exp'],
            max($claims['exp'], $claims['graceUntil']),
            self::positiveCount($licensedEmployees),
        );
    }

    /**
     * @return array<string, mixed>
     */
    private function decodeJson(#[\SensitiveParameter] string $part): array {
        $data = json_decode($this->base64UrlDecode($part), true);
        if (!is_array($data) || array_is_list($data)) {
            throw new InvalidTokenException('Token-Teil ist kein JSON-Objekt');
        }
        return $data;
    }

    private function base64UrlDecode(#[\SensitiveParameter] string $part): string {
        $padded = strtr($part, '-_', '+/') . str_repeat('=', (4 - strlen($part) % 4) % 4);
        $decoded = base64_decode($padded, true);
        if ($decoded === false) {
            throw new InvalidTokenException('Token-Teil ist nicht base64url-kodiert');
        }
        return $decoded;
    }

    /** JSON may carry a whole number as 12.0; anything else is treated as absent. */
    private static function positiveCount(mixed $value): ?int {
        if (is_float($value) && floor($value) === $value) {
            $value = (int)$value;
        }
        return is_int($value) && $value > 0 ? $value : null;
    }
}
