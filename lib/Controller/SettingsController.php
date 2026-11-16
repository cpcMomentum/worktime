<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\PunchOnlyService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;

class SettingsController extends BaseController {

    /** Settings readable by any authenticated user (needed for validation in forms) */
    private const PUBLIC_SETTINGS = [
        CompanySetting::KEY_MIN_BREAK_MINUTES_6H,
        CompanySetting::KEY_MIN_BREAK_MINUTES_9H,
        CompanySetting::KEY_MAX_DAILY_HOURS,
        CompanySetting::KEY_REQUIRE_PROJECT,
        CompanySetting::KEY_REQUIRE_DESCRIPTION,
        CompanySetting::KEY_ALLOW_FUTURE_ENTRIES,
        CompanySetting::KEY_APPROVAL_REQUIRED,
    ];

    public function __construct(
        IRequest $request,
        ?string $userId,
        private CompanySettingsService $settingsService,
        private PermissionService $permissionService,
        private IUserManager $userManager,
        private IGroupManager $groupManager,
        private PunchOnlyService $punchOnlyService,
        private IL10N $l10n,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function index(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // Non-admins only see public settings
        if (!$this->permissionService->canManageSettings($this->userId)) {
            $allSettings = $this->settingsService->getAll();
            $filtered = array_intersect_key($allSettings, array_flip(self::PUBLIC_SETTINGS));
            return $this->successResponse($filtered);
        }

        return $this->successResponse($this->settingsService->getAll());
    }

    #[NoAdminRequired]
    public function show(string $key): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // Non-admins can only read public settings
        if (!in_array($key, self::PUBLIC_SETTINGS, true) && !$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        $value = $this->settingsService->get($key);

        return $this->successResponse(['key' => $key, 'value' => $value]);
    }

    #[NoAdminRequired]
    public function update(string $key, ?string $value): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        if ($resp = $this->refusePunchOnlyWithoutLicense([$key => $value])) {
            return $resp;
        }

        // When setting the archive path, also save the user who configured it
        // This user's folder will be used for storing archived PDFs
        if ($key === CompanySetting::KEY_PDF_ARCHIVE_PATH) {
            $this->settingsService->set(
                CompanySetting::KEY_PDF_ARCHIVE_USER,
                $this->userId,
                $this->userId
            );
        }

        $setting = $this->settingsService->set($key, $value, $this->userId);

        return $this->successResponse($setting);
    }

    #[NoAdminRequired]
    public function updateMultiple(array $settings): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        if ($resp = $this->refusePunchOnlyWithoutLicense($settings)) {
            return $resp;
        }

        $this->settingsService->setMultiple($settings, $this->userId);

        return $this->successResponse($this->settingsService->getAll());
    }

    #[NoAdminRequired]
    public function reset(string $key): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        $setting = $this->settingsService->reset($key, $this->userId);

        if ($setting) {
            return $this->successResponse($setting);
        }

        return $this->successResponse(['error' => 'Setting not found'], Http::STATUS_NOT_FOUND);
    }

    #[NoAdminRequired]
    public function resetAll(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        $this->settingsService->resetAll($this->userId);

        return $this->successResponse($this->settingsService->getAll());
    }

    #[NoAdminRequired]
    public function permissions(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $permissions = $this->permissionService->getPermissionInfo($this->userId)
            + $this->punchOnlyService->permissionFields($this->userId);

        return $this->successResponse($permissions);
    }

    #[NoAdminRequired]
    public function hrManagers(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        $hrManagers = $this->permissionService->getHrManagers();

        return $this->successResponse($hrManagers);
    }

    #[NoAdminRequired]
    public function setHrManagers(array $entries): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        $this->permissionService->setHrManagers($entries);

        return $this->successResponse($this->permissionService->getHrManagers());
    }

    #[NoAdminRequired]
    public function availablePrincipals(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return $this->forbiddenResponse();
        }

        $principals = [];

        // Add users
        $this->userManager->callForAllUsers(function ($user) use (&$principals) {
            $principals[] = [
                'id' => 'user:' . $user->getUID(),
                'type' => 'user',
                'label' => $user->getDisplayName(),
                'sublabel' => $user->getUID(),
            ];
        });

        // Add groups
        $groups = $this->groupManager->search('');
        foreach ($groups as $group) {
            $principals[] = [
                'id' => 'group:' . $group->getGID(),
                'type' => 'group',
                'label' => $group->getDisplayName(),
                'sublabel' => $group->getGID(),
            ];
        }

        // Sort by label
        usort($principals, fn($a, $b) => strcasecmp($a['label'], $b['label']));

        return $this->successResponse($principals);
    }

    // Ausschalten geht immer, Einschalten nur mit WerkPlus.
    /** @param array<string, mixed> $settings */
    private function refusePunchOnlyWithoutLicense(array $settings): ?JSONResponse {
        $value = $settings[CompanySetting::KEY_PUNCH_ONLY] ?? null;
        if ($value === null || (string)$value === '0' || $this->punchOnlyService->isLicensed()) {
            return null;
        }
        return new JSONResponse(
            ['error' => $this->l10n->t('Diese Einstellung ist nur mit WerkPlus verfügbar.'), 'code' => 'werkplus_required'],
            Http::STATUS_FORBIDDEN,
        );
    }
}
