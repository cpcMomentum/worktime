<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IGroupManager;
use OCP\IRequest;
use OCP\IUserManager;

class SettingsController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private CompanySettingsService $settingsService,
        private PermissionService $permissionService,
        private IUserManager $userManager,
        private IGroupManager $groupManager,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function index(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $settings = $this->settingsService->getAll();

        return $this->successResponse($settings);
    }

    #[NoAdminRequired]
    public function show(string $key): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
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

        $permissions = $this->permissionService->getPermissionInfo($this->userId);

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
}
