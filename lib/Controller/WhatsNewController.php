<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\WhatsNewService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

/**
 * „Was ist neu?"-Fenster (Baustein 0b, Vue-2-Port aus rechnungswerk#308).
 * Liefert die noch nicht gesehenen Eintraege der laufenden Version und nimmt
 * die Quittung entgegen.
 */
class WhatsNewController extends BaseController {

	public function __construct(
		IRequest $request,
		?string $userId,
		private readonly PermissionService $permissionService,
		private readonly WhatsNewService $whatsNewService,
	) {
		parent::__construct($request, $userId);
	}

	/**
	 * Eintraege, die dieser Nutzer noch nicht gesehen hat. Leere Liste heisst:
	 * kein Fenster.
	 */
	#[NoAdminRequired]
	public function index(): JSONResponse {
		if ($authError = $this->requireAuth()) {
			return $authError;
		}
		if (!$this->permissionService->hasAccess($this->userId)) {
			return $this->forbiddenResponse();
		}
		return new JSONResponse($this->whatsNewService->getPending($this->userId));
	}

	/** Quittiert das Fenster: die laufende Version gilt als gesehen. */
	#[NoAdminRequired]
	public function seen(): JSONResponse {
		if ($authError = $this->requireAuth()) {
			return $authError;
		}
		if (!$this->permissionService->hasAccess($this->userId)) {
			return $this->forbiddenResponse();
		}
		$this->whatsNewService->markSeen($this->userId);
		return new JSONResponse([], Http::STATUS_NO_CONTENT);
	}
}
