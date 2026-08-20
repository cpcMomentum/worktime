<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Service\PushTokenService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IL10N;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

/**
 * Device-token registration for push (#593). Both endpoints act on the current
 * user only — a device belongs to whoever registered it.
 */
class PushController extends BaseController {

	public function __construct(
		IRequest $request,
		?string $userId,
		private PushTokenService $pushTokenService,
		private IL10N $l,
		private LoggerInterface $logger,
	) {
		parent::__construct($request, $userId);
	}

	/**
	 * Register (or refresh) the caller's device token. Re-registering the same
	 * device updates the row instead of duplicating.
	 */
	#[NoAdminRequired]
	public function register(?string $token = null, string $platform = 'ios'): JSONResponse {
		if ($unauth = $this->requireAuth()) {
			return $unauth;
		}
		$token = $token !== null ? trim($token) : '';
		if ($token === '') {
			return new JSONResponse(
				['error' => $this->l->t('Kein Gerätetoken übergeben.')],
				Http::STATUS_BAD_REQUEST,
			);
		}
		// Only iOS/APNs today; ignore anything else rather than storing junk.
		if ($platform !== 'ios') {
			return new JSONResponse(
				['error' => $this->l->t('Nicht unterstützte Plattform.')],
				Http::STATUS_BAD_REQUEST,
			);
		}

		try {
			$this->pushTokenService->register($this->userId, $token, $platform);
			return new JSONResponse(['status' => 'registered']);
		} catch (\Throwable $e) {
			$this->logger->error('Push token registration failed', ['exception' => $e]);
			return new JSONResponse(
				['error' => $this->l->t('Gerätetoken konnte nicht gespeichert werden.')],
				Http::STATUS_INTERNAL_SERVER_ERROR,
			);
		}
	}

	/**
	 * Unregister the caller's device token (logout). Scoped to the owner.
	 */
	#[NoAdminRequired]
	public function unregister(?string $token = null): JSONResponse {
		if ($unauth = $this->requireAuth()) {
			return $unauth;
		}
		$token = $token !== null ? trim($token) : '';
		if ($token === '') {
			return new JSONResponse(
				['error' => $this->l->t('Kein Gerätetoken übergeben.')],
				Http::STATUS_BAD_REQUEST,
			);
		}

		try {
			$this->pushTokenService->unregister($this->userId, $token);
			return new JSONResponse(['status' => 'deleted']);
		} catch (\Throwable $e) {
			$this->logger->error('Push token unregistration failed', ['exception' => $e]);
			return new JSONResponse(
				['error' => $this->l->t('Gerätetoken konnte nicht entfernt werden.')],
				Http::STATUS_INTERNAL_SERVER_ERROR,
			);
		}
	}
}
