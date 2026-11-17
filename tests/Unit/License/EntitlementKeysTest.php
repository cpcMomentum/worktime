<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\License;

use OCA\WorkTime\License\EntitlementKeys;
use PHPUnit\Framework\TestCase;

// Jeder eingebaute Schluessel ist RSA und steht unter seinem RFC-7638-Thumbprint.
class EntitlementKeysTest extends TestCase {

    public function testListIsNotEmpty(): void {
        $this->assertNotEmpty(EntitlementKeys::PUBLIC_KEYS);
    }

    public function testEveryKidIsTheThumbprintOfItsKey(): void {
        foreach (EntitlementKeys::PUBLIC_KEYS as $kid => $pem) {
            $key = openssl_pkey_get_public($pem);
            $this->assertNotFalse($key, "Schluessel $kid laesst sich nicht lesen");
            $details = openssl_pkey_get_details($key);
            $this->assertSame(OPENSSL_KEYTYPE_RSA, $details['type'], "Schluessel $kid ist kein RSA-Schluessel");
            $this->assertGreaterThanOrEqual(2048, $details['bits'], "Schluessel $kid ist zu kurz");

            $b64 = static fn (string $raw): string => rtrim(strtr(base64_encode($raw), '+/', '-_'), '=');
            $jwk = '{"e":"' . $b64($details['rsa']['e']) . '","kty":"RSA","n":"' . $b64($details['rsa']['n']) . '"}';
            $this->assertSame($b64(hash('sha256', $jwk, true)), $kid);
        }
    }
}
