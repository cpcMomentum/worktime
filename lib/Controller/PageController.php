<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Service\CompanySettingsService;
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
        private CompanySettingsService $settingsService,
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

        // Provide permission info via Initial State API
        if ($this->userId !== null) {
            $permissions = $this->permissionService->getPermissionInfo($this->userId);
            $this->initialState->provideInitialState('permissions', $permissions);
        }

        // Whether the approval workflow is active for this instance
        $this->initialState->provideInitialState('approvalRequired', $this->settingsService->isApprovalRequired());

        // Company rules for required fields on time entries (#329)
        $this->initialState->provideInitialState('requireProject', $this->settingsService->isProjectRequired());
        $this->initialState->provideInitialState('requireDescription', $this->settingsService->isDescriptionRequired());

        // #625: whether hourly sick leave for a single day is offered in the form.
        $this->initialState->provideInitialState('hourlySickEnabled', $this->settingsService->isHourlySickEnabled());

        // #626: whether emergency work during an approved vacation day is offered.
        $this->initialState->provideInitialState('emergencyWorkEnabled', $this->settingsService->isEmergencyWorkEnabled());

        return new TemplateResponse(
            Application::APP_ID,
            'main'
        );
    }
}
