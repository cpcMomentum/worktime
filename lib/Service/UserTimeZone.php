<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTimeZone;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCP\IConfig;
use OCP\IDateTimeZone;
use OCP\IRequest;
use OCP\IUserSession;

/** Einzige Stelle für die Nutzer-Zeitzone: ohne core/timezone rechnete Nextcloud stumm in UTC. */
class UserTimeZone implements IDateTimeZone {

    public const HEADER = 'X-WorkTime-Timezone';
    public const FALLBACK = 'Europe/Berlin';

    /** @var array<string, DateTimeZone> */
    private array $resolved = [];

    public function __construct(
        private IConfig $config,
        private IUserSession $userSession,
        private IRequest $request,
        private CompanySettingMapper $settingsMapper,
    ) {
    }

    // $timestamp bleibt ungetypt: NC 33 deklariert ihn so, ein Typ wäre dort ein fataler Signaturkonflikt
    public function getTimeZone($timestamp = false, ?string $userId = null): DateTimeZone {
        $sessionUid = $this->userSession->getUser()?->getUID();
        $uid = $userId ?? $sessionUid;
        if ($uid === null) {
            return $this->getDefaultTimeZone();
        }
        if (isset($this->resolved[$uid])) {
            return $this->resolved[$uid];
        }

        $stored = self::create($this->config->getUserValue($uid, 'core', 'timezone', ''));
        if ($stored !== null) {
            return $this->resolved[$uid] = $stored;
        }

        // Der Header beschreibt nur den Browser des angemeldeten Nutzers, nie einen anderen
        if ($uid === $sessionUid) {
            $header = trim($this->request->getHeader(self::HEADER));
            $fromBrowser = self::create($header);
            if ($fromBrowser !== null) {
                $this->config->setUserValue($uid, 'core', 'timezone', $header);
                return $this->resolved[$uid] = $fromBrowser;
            }
        }

        return $this->resolved[$uid] = $this->getDefaultTimeZone();
    }

    public function getDefaultTimeZone(): DateTimeZone {
        $system = $this->config->getSystemValueString('default_timezone', '');
        // UTC ist der Nextcloud-Standard ohne Einstellung, keine bewusste Wahl für Arbeitszeiten
        return self::create((string)$this->settingsMapper->getValue(CompanySetting::KEY_TIMEZONE, ''))
            ?? ($system !== 'UTC' ? self::create($system) : null)
            ?? new DateTimeZone(self::FALLBACK);
    }

    private static function create(string $name): ?DateTimeZone {
        if ($name === '' || !in_array($name, DateTimeZone::listIdentifiers(), true)) {
            return null;
        }
        return new DateTimeZone($name);
    }
}
