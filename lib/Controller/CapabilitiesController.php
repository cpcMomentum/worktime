<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\AppInfo\Application;
use OCP\App\IAppManager;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * Lightweight version/feature probe for clients (#714).
 *
 * New app features (personal default break #696, project favorites #710, …)
 * only exist from a certain backend version on. Clients — above all the mobile
 * app (cpcMomentum/worktime-mobile#104) — read this to gate features and to
 * show the server version, which is more robust than raw version comparisons.
 */
class CapabilitiesController extends BaseController {

    /**
     * Stable feature keys the backend advertises. Single source of truth:
     * add a key here once the matching capability ships, so clients can gate
     * on it. Only capabilities that actually exist are listed.
     */
    private const FEATURES = [
        'personal_break',    // #696: per-employee default break
        'project_favorites', // #710: starred projects
        'stopwatch',         // #584: server-authoritative punch in/out
    ];

    public function __construct(
        IRequest $request,
        ?string $userId,
        private IAppManager $appManager,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function index(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        return new JSONResponse([
            'version' => $this->appManager->getAppVersion(Application::APP_ID),
            'features' => self::FEATURES,
        ]);
    }
}
