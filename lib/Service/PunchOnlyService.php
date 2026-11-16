<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Service;

use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\License\EntitlementService;

// Ohne WerkPlus-Flag bleibt der gespeicherte Wert erhalten, wird aber nicht angewendet.
class PunchOnlyService {

    public const FLAG = 'wt_punch_only';

    public function __construct(
        private CompanySettingsService $settingsService,
        private EntitlementService $entitlementService,
        private PermissionService $permissionService,
    ) {
    }

    public function isLicensed(): bool {
        return $this->entitlementService->hasFeature(self::FLAG);
    }

    public function isEnabled(): bool {
        return $this->settingsService->getBool(CompanySetting::KEY_PUNCH_ONLY);
    }

    public function isActive(): bool {
        return $this->isEnabled() && $this->isLicensed();
    }

    /** HR und Admins pflegen Eintraege weiter, auch fuer sich selbst. */
    public function restricts(string $userId): bool {
        return !$this->permissionService->canManageEmployees($userId) && $this->isActive();
    }

    /** @return array{punchOnly: bool, punchOnlyLicensed: bool} */
    public function permissionFields(string $userId): array {
        return ['punchOnly' => $this->restricts($userId), 'punchOnlyLicensed' => $this->isLicensed()];
    }
}
