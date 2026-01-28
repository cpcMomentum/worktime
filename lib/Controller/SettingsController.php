<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class SettingsController extends OCSController {

    public function __construct(
        IRequest $request,
        private ?string $userId,
        private CompanySettingsService $settingsService,
        private PermissionService $permissionService,
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
}
