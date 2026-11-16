<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\License\EntitlementService;
use OCA\WorkTime\License\WerkPlusApiException;
use OCA\WorkTime\License\WerkPlusClient;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IL10N;
use OCP\IRequest;
use Psr\Log\LoggerInterface;

// Status lesen duerfen HR und Admins, aendern nur Nextcloud-Admins: der Schluessel gilt fuer alle Werk-Apps.
class LicenseController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private readonly PermissionService $permissionService,
        private readonly EntitlementService $entitlementService,
        private readonly IL10N $l10n,
        private readonly LoggerInterface $logger,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function show(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }
        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }
        return new JSONResponse($this->status());
    }

    // Fuer die Mobile-App: liest nur das gespeicherte Token, ruft nie den Lizenzserver.
    #[NoAdminRequired]
    public function publicStatus(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }
        try {
            return new JSONResponse($this->entitlementService->getPublicStatus());
        } catch (\Throwable $e) {
            $this->logger->warning('WorkTime: WerkPlus-Status nicht lesbar', ['exception' => $e]);
            return new JSONResponse(['licensed' => false, 'tier' => 'free', 'state' => EntitlementService::STATE_INVALID, 'graceUntil' => null]);
        }
    }

    #[NoAdminRequired]
    public function activate(#[\SensitiveParameter] string $key = ''): JSONResponse {
        if ($resp = $this->requireAdmin()) {
            return $resp;
        }
        try {
            $this->entitlementService->activate($key);
        } catch (\InvalidArgumentException $e) {
            return $this->invalidInput($e->getMessage());
        } catch (WerkPlusApiException $e) {
            return $this->apiError($e);
        }
        return new JSONResponse($this->status());
    }

    // Der Schluessel steht nur in dieser Antwort; spaeter liefert der Status nur noch den Hinweis.
    #[NoAdminRequired]
    public function trial(): JSONResponse {
        if ($resp = $this->requireAdmin()) {
            return $resp;
        }
        try {
            $key = $this->entitlementService->startTrial();
        } catch (\InvalidArgumentException $e) {
            return $this->invalidInput($e->getMessage());
        } catch (WerkPlusApiException $e) {
            return $this->apiError($e);
        }
        return new JSONResponse(['key' => $key, 'status' => $this->status()]);
    }

    #[NoAdminRequired]
    public function refresh(): JSONResponse {
        if ($resp = $this->requireAdmin()) {
            return $resp;
        }
        try {
            $this->entitlementService->refresh();
        } catch (\InvalidArgumentException $e) {
            return $this->invalidInput($e->getMessage());
        } catch (WerkPlusApiException $e) {
            return $this->apiError($e);
        }
        return new JSONResponse($this->status());
    }

    #[NoAdminRequired]
    public function destroy(): JSONResponse {
        if ($resp = $this->requireAdmin()) {
            return $resp;
        }
        try {
            $this->entitlementService->removeKey();
        } catch (\InvalidArgumentException $e) {
            return $this->invalidInput($e->getMessage());
        }
        return new JSONResponse($this->status());
    }

    /** @return array<string, mixed> */
    private function status(): array {
        $status = $this->entitlementService->getStatus();
        $lastError = $status['lastError'];
        $status['lastError'] = $lastError === null ? null : [
            'code' => $lastError['code'],
            'message' => $this->messageFor($lastError['code'], $lastError['serverMessage']),
            'at' => $lastError['at'] > 0 ? gmdate('Y-m-d\TH:i:s\Z', $lastError['at']) : null,
        ];
        $status['canManage'] = $this->userId !== null && $this->permissionService->isAdmin($this->userId);
        return $status;
    }

    private function apiError(WerkPlusApiException $e): JSONResponse {
        return new JSONResponse([
            'error' => $this->messageFor($e->getErrorCode(), $e->getServerMessage()),
            'code' => $e->getErrorCode(),
            'status' => $this->status(),
        ], Http::STATUS_BAD_REQUEST);
    }

    private function invalidInput(string $field): JSONResponse {
        $message = match ($field) {
            'keySet' => $this->l10n->t('Es ist bereits ein WerkPlus-Schlüssel hinterlegt. Ein Testzeitraum ist nur ohne Schlüssel möglich.'),
            'storeTooNew' => $this->l10n->t('Eine andere Werk-App hat die Lizenz in einem neueren Format gespeichert. Bitte aktualisiere WorkTime.'),
            default => $this->l10n->t('Bitte gib einen gültigen WerkPlus-Schlüssel ein.'),
        };
        return new JSONResponse(['error' => $message, 'code' => 'INPUT_INVALID'], Http::STATUS_BAD_REQUEST);
    }

    // Verzweigt wird ueber den Code; die Servermeldung erscheint nur, wenn der Code unbekannt ist.
    private function messageFor(string $code, string $serverMessage): string {
        return match ($code) {
            'REQUEST_INVALID' => $this->l10n->t('Die Anfrage an WerkPlus war fehlerhaft. Bitte melde den Fehler dem Anbieter.'),
            'KEY_UNKNOWN' => $this->l10n->t('Dieser Schlüssel ist nicht bekannt. Bitte prüfe die Schreibweise.'),
            'KEY_REVOKED' => $this->l10n->t('Dieser Schlüssel wurde gesperrt. WorkTime arbeitet im freien Umfang weiter.'),
            'KEY_EXPIRED' => $this->l10n->t('Die Lizenz ist abgelaufen. WorkTime arbeitet im freien Umfang weiter.'),
            'INSTANCE_LIMIT_REACHED' => $this->l10n->t('Diese Lizenz ist einer anderen Nextcloud zugeordnet. Den Umzug kannst du im Kundenportal veranlassen.'),
            'TRIAL_ALREADY_USED' => $this->l10n->t('Für diese Nextcloud wurde bereits ein Testzeitraum genutzt. Für WerkPlus brauchst du einen Schlüssel.'),
            'TRIAL_UNAVAILABLE' => $this->l10n->t('Der Testzeitraum lässt sich gerade nicht in der App starten. Unter werkwolke.de/testen steht, wie du ihn trotzdem bekommst.'),
            'RATE_LIMITED' => $this->l10n->t('Zu viele Versuche. Bitte versuche es später erneut.'),
            WerkPlusClient::UNREACHABLE => $this->l10n->t('WerkPlus ist gerade nicht erreichbar. Bitte versuche es später erneut.'),
            EntitlementService::TOKEN_REJECTED => $this->l10n->t('Die Antwort von WerkPlus ließ sich nicht prüfen. Die Lizenz wurde nicht übernommen.'),
            'SERVER_ERROR', WerkPlusClient::INVALID_RESPONSE => $this->l10n->t('WerkPlus hat einen Fehler gemeldet. Bitte versuche es später erneut.'),
            default => $serverMessage !== '' ? $serverMessage : $this->l10n->t('WerkPlus hat einen Fehler gemeldet. Bitte versuche es später erneut.'),
        };
    }

    private function requireAdmin(): ?JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }
        if (!$this->permissionService->isAdmin($this->userId)) {
            return $this->forbiddenResponse($this->l10n->t('Die WerkPlus-Lizenz gilt für alle Werk-Apps dieser Nextcloud und kann nur von Nextcloud-Admins geändert werden.'));
        }
        return null;
    }
}
