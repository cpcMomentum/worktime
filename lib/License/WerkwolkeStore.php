<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\License;

use OCP\IAppConfig;

// Kennung `werkwolke` gehoert keiner App, damit die Lizenz das Entfernen jeder einzelnen Werk-App uebersteht.
class WerkwolkeStore {

    public const APP = 'werkwolke';
    public const VERSION = 1;

    private const K_VERSION = 'store_version';
    private const K_KEY = 'key';
    private const K_TOKEN = 'token';

    public function __construct(
        private readonly IAppConfig $appConfig,
    ) {
    }

    /** Neueres Format: `key` und `token` bleiben lesbar, geschrieben wird nichts. */
    public function isTooNew(): bool {
        return (int)$this->appConfig->getValueString(self::APP, self::K_VERSION) > self::VERSION;
    }

    public function getKey(): string {
        return $this->appConfig->getValueString(self::APP, self::K_KEY);
    }

    public function getToken(): string {
        return $this->appConfig->getValueString(self::APP, self::K_TOKEN);
    }

    /** Ein neuer Schluessel ersetzt Schluessel und Token gemeinsam. */
    public function setKeyAndToken(#[\SensitiveParameter] string $key, #[\SensitiveParameter] string $token): void {
        if ($this->isTooNew()) {
            return;
        }
        $this->writeVersion();
        $this->appConfig->setValueString(self::APP, self::K_KEY, $key, sensitive: true);
        $this->appConfig->setValueString(self::APP, self::K_TOKEN, $token, sensitive: true);
    }

    /** Uebernimmt einen Schluessel nur in eine leere Ablage und laesst ein vorhandenes Token stehen. */
    public function adoptKeyIfEmpty(#[\SensitiveParameter] string $key): bool {
        if ($this->isTooNew() || $this->appConfig->getValueString(self::APP, self::K_KEY) !== '') {
            return false;
        }
        $this->writeVersion();
        $this->appConfig->setValueString(self::APP, self::K_KEY, $key, sensitive: true);
        return true;
    }

    /** Schluessel ohne Token, z. B. ein Testschluessel, dessen Token die Pruefung nicht bestand. */
    public function setKeyOnly(#[\SensitiveParameter] string $key): void {
        if ($this->isTooNew()) {
            return;
        }
        $this->writeVersion();
        $this->appConfig->setValueString(self::APP, self::K_KEY, $key, sensitive: true);
        $this->appConfig->deleteKey(self::APP, self::K_TOKEN);
    }

    /** @param callable(string): ?int $issuedAt `iat` des gespeicherten Tokens, null wenn unlesbar */
    public function replaceTokenIfNewer(#[\SensitiveParameter] string $forKey, #[\SensitiveParameter] string $token, int $newIssuedAt, callable $issuedAt): bool {
        // Wurde der Schluessel waehrend des Abrufs entfernt oder gewechselt, gehoert das Token nicht mehr dazu.
        if ($this->isTooNew() || $this->appConfig->getValueString(self::APP, self::K_KEY) !== $forKey) {
            return false;
        }
        $current = $this->appConfig->getValueString(self::APP, self::K_TOKEN);
        if ($current !== '') {
            $currentIssuedAt = $issuedAt($current);
            if ($currentIssuedAt !== null && $currentIssuedAt >= $newIssuedAt) {
                return false;
            }
        }
        $this->writeVersion();
        $this->appConfig->setValueString(self::APP, self::K_TOKEN, $token, sensitive: true);
        return true;
    }

    public function deleteTokenOfKey(#[\SensitiveParameter] string $key): void {
        if ($this->isTooNew() || $this->appConfig->getValueString(self::APP, self::K_KEY) !== $key) {
            return;
        }
        $this->appConfig->deleteKey(self::APP, self::K_TOKEN);
    }

    /** Nur fuer die ausdrueckliche Admin-Aktion „Schluessel entfernen“. */
    public function clear(): void {
        if ($this->isTooNew()) {
            return;
        }
        $this->appConfig->deleteKey(self::APP, self::K_KEY);
        $this->appConfig->deleteKey(self::APP, self::K_TOKEN);
    }

    private function writeVersion(): void {
        $this->appConfig->setValueString(self::APP, self::K_VERSION, (string)self::VERSION);
    }
}
