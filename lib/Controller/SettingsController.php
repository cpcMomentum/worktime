<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\OCSController;
use OCP\IGroupManager;
use OCP\IRequest;
use OCP\IUserManager;

class SettingsController extends OCSController {

    public function __construct(
        IRequest $request,
        private ?string $userId,
        private CompanySettingsService $settingsService,
        private PermissionService $permissionService,
        private IUserManager $userManager,
        private IGroupManager $groupManager,
    ) {
        parent::__construct(Application::APP_ID, $request);
    }

    #[NoAdminRequired]
    public function index(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        $settings = $this->settingsService->getAll();

        return new JSONResponse($settings);
    }

    #[NoAdminRequired]
    public function show(string $key): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        $value = $this->settingsService->get($key);

        return new JSONResponse(['key' => $key, 'value' => $value]);
    }

    #[NoAdminRequired]
    public function update(string $key, ?string $value): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
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

        return new JSONResponse($setting);
    }

    #[NoAdminRequired]
    public function updateMultiple(array $settings): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $this->settingsService->setMultiple($settings, $this->userId);

        return new JSONResponse($this->settingsService->getAll());
    }

    #[NoAdminRequired]
    public function reset(string $key): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $setting = $this->settingsService->reset($key, $this->userId);

        if ($setting) {
            return new JSONResponse($setting);
        }

        return new JSONResponse(['error' => 'Setting not found'], Http::STATUS_NOT_FOUND);
    }

    #[NoAdminRequired]
    public function resetAll(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $this->settingsService->resetAll($this->userId);

        return new JSONResponse($this->settingsService->getAll());
    }

    #[NoAdminRequired]
    public function permissions(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        $permissions = $this->permissionService->getPermissionInfo($this->userId);

        return new JSONResponse($permissions);
    }

    #[NoAdminRequired]
    public function hrManagers(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $hrManagers = $this->permissionService->getHrManagers();

        return new JSONResponse($hrManagers);
    }

    #[NoAdminRequired]
    public function setHrManagers(array $entries): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $this->permissionService->setHrManagers($entries);

        return new JSONResponse($this->permissionService->getHrManagers());
    }

    #[NoAdminRequired]
    public function availablePrincipals(): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageSettings($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
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

        return new JSONResponse($principals);
    }
}
