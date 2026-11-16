<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\License;

use OCA\WorkTime\AppInfo\Application;
use OCP\App\IAppManager;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IAppConfig;
use OCP\IConfig;
use Psr\Log\LoggerInterface;

/**
 * Einzige Stelle fuer Lizenzstand und Feature-Gates (entitlement-v1).
 */
class EntitlementService {

    /** WorkTime-Flags aus der Registry `flags.md` des Backends. */
    public const FLAGS = ['wt_mobile', 'wt_punch_only', 'api_keys', 'kontingent', 'pw_ticket_time'];

    /** Nextcloud-App-IDs der Werk-Apps, gemeldet in `appVersions`. */
    public const WERK_APPS = ['rechnungswerk', 'projektwerk', 'worktime', 'contractmanager'];

    public const STATE_NONE = 'none';
    public const STATE_INVALID = 'invalid';

    /** Eigener Code: Der Server antwortete, aber das Token bestand die lokale Pruefung nicht. */
    public const TOKEN_REJECTED = 'TOKEN_REJECTED';

    /** Fest fuer alle Werk-Apps, damit jede ohne Absprache dieselbe Instanz-UUID berechnet. */
    private const UUID_NAMESPACE = '8c743ff9fc504a3b9ab57b376b8ea840';

    private const RENEW_AFTER = 7 * 86400;
    private const RENEW_BEFORE_EXPIRY = 7 * 86400;
    /** Kuerzer als der Takt des Hintergrundjobs, sonst faellt jeder zweite Lauf aus. */
    private const RETRY_AFTER = 5 * 3600;
    /** Nach diesen Codes hilft sofortiges Wiederholen nicht; einmal taeglich, damit eine Verlaengerung von selbst greift. */
    private const SLOW_RETRY = ['REQUEST_INVALID', 'KEY_UNKNOWN', 'KEY_REVOKED', 'KEY_EXPIRED', 'INSTANCE_LIMIT_REACHED'];
    private const SLOW_RETRY_AFTER = 86400;
    /** Nach diesen Codes faellt die Instanz auf Free, das Token wird verworfen. */
    private const DROP_TOKEN = ['KEY_REVOKED', 'KEY_EXPIRED'];

    private const K_LAST_ATTEMPT = 'werkplus_last_attempt_at';
    private const K_LAST_ERROR = 'werkplus_last_error';

    /** @var array{jwt: string, token: ?EntitlementToken, state: string}|null */
    private ?array $current = null;

    public function __construct(
        private readonly IAppConfig $appConfig,
        private readonly IConfig $config,
        private readonly WerkwolkeStore $store,
        private readonly ITimeFactory $timeFactory,
        private readonly WerkPlusClient $client,
        private readonly EntitlementTokenVerifier $verifier,
        private readonly IAppManager $appManager,
        private readonly LoggerInterface $logger,
    ) {
    }

    public function hasFeature(string $flag): bool {
        if (!in_array($flag, self::FLAGS, true)) {
            throw new \InvalidArgumentException('Unbekanntes Flag: ' . $flag);
        }
        $token = $this->activeToken();
        return $token !== null && in_array($flag, $token->features, true);
    }

    public function tier(): string {
        return $this->activeToken()?->tier ?? 'free';
    }

    public function state(): string {
        return $this->current()['state'];
    }

    /** UUIDv5 aus der `instanceid` der Nextcloud; wird nie gespeichert. */
    public function getInstanceUuid(): string {
        return self::deriveInstanceUuid($this->config->getSystemValueString('instanceid'));
    }

    public static function deriveInstanceUuid(string $instanceId): string {
        $hash = substr(sha1((string)hex2bin(self::UUID_NAMESPACE) . $instanceId, true), 0, 16);
        $hash[6] = chr((ord($hash[6]) & 0x0f) | 0x50);
        $hash[8] = chr((ord($hash[8]) & 0x3f) | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($hash), 4));
    }

    /**
     * Ein leerer Schluessel nimmt den gespeicherten.
     *
     * @throws WerkPlusApiException
     * @throws \InvalidArgumentException
     */
    public function activate(#[\SensitiveParameter] string $key): void {
        $this->assertStoreWritable();
        $key = self::normalizeKey($key);
        $storedKey = $this->key();
        if ($key === '') {
            $key = $storedKey;
        }
        if ($key === '' || strlen($key) > 128 || preg_match('/^[A-Za-z0-9_]+$/', $key) !== 1) {
            throw new \InvalidArgumentException('key');
        }
        [$jwt, $token] = $this->fetchToken($key);
        if ($key === $storedKey) {
            $this->storeToken($key, $jwt, $token);
        } else {
            $this->store->setKeyAndToken($key, $jwt);
            $this->afterSuccess();
        }
    }

    /**
     * @throws WerkPlusApiException
     * @throws \InvalidArgumentException
     */
    public function startTrial(): string {
        $this->assertStoreWritable();
        if ($this->key() !== '') {
            throw new \InvalidArgumentException('keySet');
        }
        $now = $this->now();
        $this->appConfig->setValueString(Application::APP_ID, self::K_LAST_ATTEMPT, (string)$now);
        $uuid = $this->getInstanceUuid();
        $response = $this->client->trial($uuid, $this->appVersions());

        // Vor der Pruefung sichern: Der Server schickt den Schluessel nur dieses eine Mal.
        $key = self::normalizeKey($response['key']);
        $this->store->setKeyOnly($key);
        try {
            $this->verifier->verify($response['token'], $uuid, $now);
        } catch (InvalidTokenException $e) {
            // Kein Abbruch, sonst sieht der Betreiber den Schluessel nie; die Erneuerung holt ein gueltiges Token.
            $this->logger->warning('WorkTime: WerkPlus-Token abgelehnt', ['exception' => $e]);
            $this->recordError(new WerkPlusApiException(self::TOKEN_REJECTED, '', $e), $now, $key);
            // Die naechste Erneuerung soll nicht auf die Wartezeit warten.
            $this->appConfig->deleteKey(Application::APP_ID, self::K_LAST_ATTEMPT);
            return $key;
        }
        $this->store->setKeyAndToken($key, $response['token']);
        $this->afterSuccess();
        return $key;
    }

    /**
     * @throws WerkPlusApiException
     * @throws \InvalidArgumentException wenn kein Schluessel hinterlegt ist
     */
    public function refresh(): void {
        $this->assertStoreWritable();
        $key = $this->key();
        if ($key === '') {
            throw new \InvalidArgumentException('key');
        }
        [$jwt, $token] = $this->fetchToken($key);
        $this->storeToken($key, $jwt, $token);
    }

    /** Fuer den Hintergrundjob: erneuert nur, wenn faellig, und wirft nie. */
    public function refreshIfDue(): void {
        if (!$this->isRefreshDue()) {
            return;
        }
        try {
            $this->refresh();
        } catch (\Throwable $e) {
            $this->logger->info('WorkTime: WerkPlus-Lizenz nicht erneuert', ['exception' => $e]);
        }
    }

    public function isRefreshDue(): bool {
        if ($this->store->isTooNew() || $this->key() === '') {
            return false;
        }
        $now = $this->now();
        if ($now - (int)$this->own(self::K_LAST_ATTEMPT) < self::RETRY_AFTER) {
            return false;
        }
        $lastError = $this->lastError();
        if ($lastError !== null
            && in_array($lastError['code'], self::SLOW_RETRY, true)
            && $now - $lastError['at'] < self::SLOW_RETRY_AFTER) {
            return false;
        }
        // Hat eine andere Werk-App schon erneuert, ist das gemeinsame Token frisch und der Abruf entfaellt.
        $token = $this->current()['token'];
        if ($token === null) {
            return true;
        }
        return $now - $token->issuedAt >= self::RENEW_AFTER
            || $token->expiresAt - $now < self::RENEW_BEFORE_EXPIRY;
    }

    /** Gilt fuer alle Werk-Apps dieser Nextcloud. */
    public function removeKey(): void {
        $this->assertStoreWritable();
        $this->store->clear();
        foreach ([self::K_LAST_ATTEMPT, self::K_LAST_ERROR] as $configKey) {
            $this->appConfig->deleteKey(Application::APP_ID, $configKey);
        }
        $this->current = null;
    }

    /**
     * @return array<string, mixed>
     */
    public function getStatus(): array {
        $current = $this->current();
        $token = $current['token'];
        $active = $this->activeToken();
        $key = $this->key();
        return [
            'instanceUuid' => $this->getInstanceUuid(),
            'keySet' => $key !== '',
            'keyHint' => $key !== '' ? '…' . substr($key, -4) : null,
            'state' => $current['state'],
            'tier' => $this->tier(),
            'features' => $active?->features ?? [],
            'licensedEmployees' => $active?->licensedEmployees,
            'expiresAt' => $token !== null ? $this->iso($token->expiresAt) : null,
            'graceUntil' => $token !== null ? $this->iso($token->graceUntil) : null,
            // Aus dem gemeinsamen Token, damit auch eine Erneuerung durch eine andere Werk-App zaehlt.
            'lastCheckAt' => $token !== null ? $this->iso($token->issuedAt) : null,
            // Ohne hinterlegten Schluessel waere ein alter Fehlversuch nur noch Rauschen.
            'lastError' => $key !== '' ? $this->lastError() : null,
            'storeTooNew' => $this->store->isTooNew(),
        ];
    }

    // Fuer Clients ohne Adminrechte wie die Mobile-App: ohne Schluessel, Kennung oder Personendaten.
    /** @return array{licensed: bool, tier: string, state: string, graceUntil: ?string} */
    public function getPublicStatus(): array {
        $current = $this->current();
        $token = $current['token'];
        return [
            'licensed' => $this->tier() === 'werkplus',
            'tier' => $this->tier(),
            'state' => $current['state'],
            'graceUntil' => $current['state'] === EntitlementToken::STATE_GRACE && $token !== null ? $this->iso($token->graceUntil) : null,
        ];
    }

    /**
     * @return array{code: string, serverMessage: string, at: int}|null
     */
    public function lastError(): ?array {
        $data = json_decode($this->own(self::K_LAST_ERROR), true);
        if (!is_array($data) || !is_string($data['code'] ?? null)) {
            return null;
        }
        // Ein Fehler zu einem frueheren Schluessel gilt nicht mehr, auch wenn eine andere Werk-App den neuen eingetragen hat.
        if (isset($data['key']) && $data['key'] !== self::fingerprint($this->store->getKey())) {
            return null;
        }
        $at = is_int($data['at'] ?? null) ? $data['at'] : 0;
        // Hat eine andere Werk-App seither erfolgreich erneuert, ist der Fehler ueberholt.
        $token = $this->current()['token'];
        if ($token !== null && $token->issuedAt > $at) {
            return null;
        }
        return [
            'code' => $data['code'],
            'serverMessage' => is_string($data['serverMessage'] ?? null) ? $data['serverMessage'] : '',
            'at' => $at,
        ];
    }

    /** @return array{string, EntitlementToken} */
    private function fetchToken(#[\SensitiveParameter] string $key): array {
        $now = $this->now();
        $isStoredKey = $key === $this->key();
        // Ein Versuch mit einem neuen Schluessel darf die Erneuerung des gespeicherten nicht aufschieben.
        if ($isStoredKey) {
            $this->appConfig->setValueString(Application::APP_ID, self::K_LAST_ATTEMPT, (string)$now);
        }
        $uuid = $this->getInstanceUuid();
        try {
            $response = $this->client->validate($key, $uuid, $this->appVersions());
            try {
                $token = $this->verifier->verify($response['token'], $uuid, $now);
            } catch (InvalidTokenException $e) {
                $this->logger->warning('WorkTime: WerkPlus-Token abgelehnt', ['exception' => $e]);
                throw new WerkPlusApiException(self::TOKEN_REJECTED, '', $e);
            }
        } catch (WerkPlusApiException $e) {
            $this->recordError($e, $now, $isStoredKey ? $key : null);
            throw $e;
        }
        return [$response['token'], $token];
    }

    private function storeToken(#[\SensitiveParameter] string $key, string $jwt, EntitlementToken $token): void {
        $this->store->replaceTokenIfNewer($key, $jwt, $token->issuedAt, fn (string $stored): ?int => $this->issuedAtOf($stored));
        $this->afterSuccess();
    }

    private function afterSuccess(): void {
        $this->appConfig->deleteKey(Application::APP_ID, self::K_LAST_ERROR);
        $this->current = null;
    }

    private function issuedAtOf(string $jwt): ?int {
        try {
            return $this->verifier->verify($jwt, $this->getInstanceUuid(), $this->now())->issuedAt;
        } catch (InvalidTokenException) {
            return null;
        }
    }

    private function recordError(WerkPlusApiException $e, int $now, #[\SensitiveParameter] ?string $storedKey): void {
        // Fehler eines NEUEN Schluessels nur an den Aufrufer, sonst bremst er die Erneuerung des gespeicherten.
        if ($storedKey === null) {
            return;
        }
        $this->appConfig->setValueString(Application::APP_ID, self::K_LAST_ERROR, json_encode([
            'code' => $e->getErrorCode(),
            'serverMessage' => $e->getServerMessage(),
            'at' => $now,
            'key' => self::fingerprint($storedKey),
        ], JSON_THROW_ON_ERROR));
        if (in_array($e->getErrorCode(), self::DROP_TOKEN, true)) {
            $this->store->deleteTokenOfKey($storedKey);
        }
        $this->current = null;
    }

    /**
     * @return array<string, string>
     */
    private function appVersions(): array {
        $versions = [Application::APP_ID => $this->appManager->getAppVersion(Application::APP_ID)];
        foreach (self::WERK_APPS as $appId) {
            if ($appId !== Application::APP_ID && $this->appManager->isEnabledForAnyone($appId)) {
                $versions[$appId] = $this->appManager->getAppVersion($appId);
            }
        }
        return $versions;
    }

    // WorkTime hatte vor der gemeinsamen Ablage keinen eigenen Schluessel, deshalb gibt es nichts zu uebernehmen.
    private function key(): string {
        return $this->store->getKey();
    }

    /** @throws \InvalidArgumentException */
    private function assertStoreWritable(): void {
        if ($this->store->isTooNew()) {
            throw new \InvalidArgumentException('storeTooNew');
        }
    }

    private function activeToken(): ?EntitlementToken {
        $current = $this->current();
        return in_array($current['state'], [EntitlementToken::STATE_VALID, EntitlementToken::STATE_GRACE], true)
            ? $current['token']
            : null;
    }

    /**
     * @return array{jwt: string, token: ?EntitlementToken, state: string}
     */
    private function current(): array {
        // Ohne Schluessel gilt kein Token, etwa wenn eine Erneuerung nach „Schluessel entfernen“ noch eines schrieb.
        $jwt = $this->store->getKey() === '' ? '' : $this->store->getToken();
        // Ein im selben Prozess neu gespeichertes Token gilt sofort.
        if ($this->current !== null && $this->current['jwt'] === $jwt) {
            $token = $this->current['token'];
            // Ablauf und Nachfrist haengen an der Uhr, nicht am Token.
            return $token === null ? $this->current : ['state' => $token->stateAt($this->now())] + $this->current;
        }
        if ($jwt === '') {
            return $this->current = ['jwt' => $jwt, 'token' => null, 'state' => self::STATE_NONE];
        }
        $now = $this->now();
        try {
            $token = $this->verifier->verify($jwt, $this->getInstanceUuid(), $now);
        } catch (InvalidTokenException $e) {
            $this->logger->debug('WorkTime: gespeichertes WerkPlus-Token ungueltig', ['exception' => $e]);
            return $this->current = ['jwt' => $jwt, 'token' => null, 'state' => self::STATE_INVALID];
        }
        return $this->current = ['jwt' => $jwt, 'token' => $token, 'state' => $token->stateAt($now)];
    }

    // Wie der Server: Leerraum und Bindestriche weg, Koerper und Pruefsumme gross, Praefix klein.
    private static function normalizeKey(#[\SensitiveParameter] string $key): string {
        $key = (string)preg_replace('/[\s-]+/u', '', $key);
        if (strncasecmp($key, 'wp_', 3) === 0) {
            return 'wp_' . strtoupper(substr($key, 3));
        }
        return strtoupper($key);
    }

    private static function fingerprint(#[\SensitiveParameter] string $key): string {
        return substr(hash('sha256', $key), 0, 16);
    }

    private function own(string $configKey): string {
        return $this->appConfig->getValueString(Application::APP_ID, $configKey);
    }

    private function now(): int {
        return $this->timeFactory->getTime();
    }

    private function iso(int $timestamp): string {
        return gmdate('Y-m-d\TH:i:s\Z', $timestamp);
    }
}
