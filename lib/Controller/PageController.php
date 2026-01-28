<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Controller;
use OCP\AppFramework\Http\TemplateResponse;
use OCP\AppFramework\Services\IInitialState;
use OCP\IRequest;
use OCP\Util;

class PageController extends Controller {

    public function __construct(
        IRequest $request,
        private ?string $userId,
        private PermissionService $permissionService,
        private IInitialState $initialState,
    ) {
        parent::__construct(Application::APP_ID, $request);
    }

    /**
     * @NoAdminRequired
     * @NoCSRFRequired
     */
    public function index(): TemplateResponse {
        Util::addScript(Application::APP_ID, 'worktime-main');
        Util::addStyle(Application::APP_ID, 'main');

        // Provide permission info via Initial State API
        if ($this->userId !== null) {
            $permissions = $this->permissionService->getPermissionInfo($this->userId);
            $this->initialState->provideInitialState('permissions', $permissions);
        }

        return new TemplateResponse(
            Application::APP_ID,
            'main'
        );
    }
}
