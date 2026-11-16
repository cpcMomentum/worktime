<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\License;

use OCA\WorkTime\License\WerkPlusApiException;
use OCA\WorkTime\License\EntitlementService;
use OCA\WorkTime\License\WerkPlusClient;
use OCA\WorkTime\License\WerkwolkeStore;
use OCP\App\IAppManager;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\IAppConfig;
use OCP\IConfig;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class EntitlementServiceTest extends TestCase {
    use EntitlementTokenFactory;

    private const KEY = 'wp_B7K2M9QX4TN6RJ8VC3HD5PKW2FSY7GZA3EFA69B6';
    private const OTHER_KEY = 'wp_ANDERERSCHLUESSEL';

    /** @var array<string, string> Schluessel „app/key“ */
    private array $config = [];
    /** @var array<string, bool> */
    private array $sensitive = [];
    /** @var array<string, string> */
    private array $installedApps = [];
    private int $now = self::NOW;
    private WerkPlusClient&MockObject $client;
    private LoggerInterface&MockObject $logger;

    protected function setUp(): void {
        parent::setUp();
        $this->config = [];
        $this->sensitive = [];
        $this->installedApps = ['worktime' => '0.25.0'];
        $this->now = self::NOW;
        $this->client = $this->createMock(WerkPlusClient::class);
        $this->logger = $this->createMock(LoggerInterface::class);
    }

    private function service(): EntitlementService {
        $appConfig = $this->createMock(IAppConfig::class);
        $appConfig->method('getValueString')->willReturnCallback(
            fn (string $app, string $key, string $default = '') => $this->config["$app/$key"] ?? $default
        );
        $appConfig->method('setValueString')->willReturnCallback(
            function (string $app, string $key, string $value, bool $lazy = false, bool $sensitive = false): bool {
                $this->config["$app/$key"] = $value;
                $this->sensitive["$app/$key"] = $sensitive;
                return true;
            }
        );
        $appConfig->method('deleteKey')->willReturnCallback(function (string $app, string $key): void {
            unset($this->config["$app/$key"]);
        });
        $appConfig->expects($this->never())->method('getValueInt');

        $config = $this->createMock(IConfig::class);
        $config->method('getSystemValueString')->willReturnCallback(
            fn (string $key, string $default = '') => $key === 'instanceid' ? self::INSTANCE_ID : $default
        );
        $time = $this->createMock(ITimeFactory::class);
        $time->method('getTime')->willReturnCallback(fn () => $this->now);
        $appManager = $this->createMock(IAppManager::class);
        $appManager->method('getAppVersion')->willReturnCallback(fn (string $app) => $this->installedApps[$app] ?? '0');
        $appManager->method('isEnabledForAnyone')->willReturnCallback(fn (string $app) => isset($this->installedApps[$app]));

        return new EntitlementService(
            $appConfig,
            $config,
            new WerkwolkeStore($appConfig),
            $time,
            $this->client,
            $this->verifier(),
            $appManager,
            $this->logger,
        );
    }

    private function shared(string $key): ?string {
        return $this->config["werkwolke/$key"] ?? null;
    }

    private function own(string $key): ?string {
        return $this->config["worktime/$key"] ?? null;
    }

    private function storeToken(array $overrides = []): void {
        $this->config['werkwolke/store_version'] = '1';
        $this->config['werkwolke/key'] = self::KEY;
        $this->config['werkwolke/token'] = $this->token($this->claims($overrides));
    }

    /**
     * @return array{token: string, expiresAt: string, graceUntil: string}
     */
    private function response(array $overrides = []): array {
        return ['token' => $this->token($this->claims($overrides)), 'expiresAt' => 'x', 'graceUntil' => 'y'];
    }

    /**
     * @return array<string, array{string, string}>
     */
    public static function contractVectors(): array {
        return [
            'Vektor 1' => ['ocx7k2m9qz4t', '8cb3c100-9e4c-5375-9e63-1f4d122ea315'],
            'Vektor 2' => ['oc1a2b3c4d5e', '62536685-aff2-57b3-b406-0cdac03ffb2b'],
        ];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('contractVectors')]
    public function testInstanceUuidMatchesTheContractVectors(string $instanceId, string $uuid): void {
        $this->assertSame($uuid, EntitlementService::deriveInstanceUuid($instanceId));
    }

    public function testInstanceUuidIsDerivedFromTheInstanceIdAndNeverStored(): void {
        $this->client->expects($this->once())->method('validate')
            ->with(self::KEY, self::UUID)
            ->willReturn($this->response());
        $service = $this->service();
        $service->activate(self::KEY);

        $this->assertSame(self::UUID, $service->getInstanceUuid());
        $this->assertSame(self::UUID, $service->getStatus()['instanceUuid']);
        $this->assertEmpty(array_filter(array_keys($this->config), fn ($k) => str_contains($k, 'uuid')));
    }

    public function testWithoutTokenEverythingIsFree(): void {
        $this->client->expects($this->never())->method('validate');
        $service = $this->service();

        $this->assertSame(EntitlementService::STATE_NONE, $service->state());
        $this->assertSame('free', $service->tier());
        $this->assertFalse($service->hasFeature('wt_mobile'));
    }

    public function testValidTokenUnlocksFeaturesWithoutAnyNetworkCall(): void {
        $this->storeToken();
        $this->client->expects($this->never())->method('validate');
        $service = $this->service();

        $this->assertSame('werkplus', $service->tier());
        $this->assertTrue($service->hasFeature('wt_mobile'));
        $this->assertTrue($service->hasFeature('api_keys'));
        $this->assertFalse($service->hasFeature('kontingent'));
        $service->getStatus();
    }

    public function testKeyEnteredInAnotherWerkAppShowsAnActiveLicense(): void {
        $this->storeToken();
        $this->client->expects($this->never())->method('validate');
        $status = $this->service()->getStatus();

        $this->assertTrue($status['keySet']);
        $this->assertSame('valid', $status['state']);
        $this->assertSame(gmdate('Y-m-d\TH:i:s\Z', self::NOW), $status['lastCheckAt']);
    }

    public function testGraceKeepsFeaturesAndAfterGraceFallsBackToFree(): void {
        $this->storeToken();
        $this->now = self::NOW + 31 * 86400;
        $service = $this->service();
        $this->assertSame('grace', $service->state());
        $this->assertTrue($service->hasFeature('wt_mobile'));

        $this->now = self::NOW + 45 * 86400;
        $service = $this->service();
        $this->assertSame('expired', $service->state());
        $this->assertSame('free', $service->tier());
        $this->assertFalse($service->hasFeature('wt_mobile'));
    }

    public function testStateIsRecomputedOnEveryCallInALongRunningProcess(): void {
        $this->storeToken();
        $service = $this->service();
        $this->assertSame('valid', $service->state());

        $this->now = self::NOW + 31 * 86400;
        $this->assertSame('grace', $service->state());

        $this->now = self::NOW + 45 * 86400;
        $this->assertSame('expired', $service->state());
        $this->assertFalse($service->hasFeature('wt_mobile'));
    }

    public function testALongRunningProcessSeesATokenStoredByAnotherWerkApp(): void {
        $service = $this->service();
        $this->assertSame(EntitlementService::STATE_NONE, $service->state());

        $this->storeToken();
        $this->assertSame('valid', $service->state());
        $this->assertTrue($service->hasFeature('wt_mobile'));
    }

    public function testTokenOfAnotherInstallationGrantsNothing(): void {
        $this->storeToken(['sub' => '00000000-0000-4000-8000-000000000000']);
        $service = $this->service();

        $this->assertSame(EntitlementService::STATE_INVALID, $service->state());
        $this->assertFalse($service->hasFeature('wt_mobile'));
    }

    public function testUnknownFlagIsAProgrammingError(): void {
        $this->expectException(\InvalidArgumentException::class);
        $this->service()->hasFeature('pw_multi_board');
    }

    public function testActivateStoresKeyAndTokenInTheSharedStore(): void {
        $this->client->expects($this->once())->method('validate')
            ->with(self::KEY, self::UUID, ['worktime' => '0.25.0'])
            ->willReturn($this->response());
        $service = $this->service();
        $service->activate('  ' . self::KEY . ' ');

        $this->assertSame('1', $this->shared('store_version'));
        $this->assertSame(self::KEY, $this->shared('key'));
        $this->assertTrue($this->sensitive['werkwolke/key']);
        $this->assertNotNull($this->shared('token'));
        $this->assertTrue($this->sensitive['werkwolke/token']);
        $this->assertTrue($service->hasFeature('wt_mobile'));
        $this->assertNull($service->lastError());
    }

    public function testAppVersionsListEveryEnabledWerkAppByItsAppId(): void {
        $this->installedApps += ['projektwerk' => '0.4.26', 'rechnungswerk' => '0.9.1', 'deck' => '1.15.0'];
        $this->client->expects($this->once())->method('validate')
            ->with(self::KEY, self::UUID, ['worktime' => '0.25.0', 'rechnungswerk' => '0.9.1', 'projektwerk' => '0.4.26'])
            ->willReturn($this->response());
        $this->service()->activate(self::KEY);
    }

    public function testFailedActivationStoresNoKey(): void {
        $this->client->method('validate')->willThrowException(new WerkPlusApiException('KEY_UNKNOWN', 'Schlüssel unbekannt'));
        $service = $this->service();
        try {
            $service->activate(self::KEY);
            $this->fail('Ausnahme erwartet');
        } catch (WerkPlusApiException $e) {
            $this->assertSame('KEY_UNKNOWN', $e->getErrorCode());
        }

        $this->assertNull($this->shared('key'));
        $this->assertNull($service->lastError());
    }

    public function testKeyIsNormalizedLikeTheServerDoes(): void {
        $this->client->expects($this->once())->method('validate')
            ->with(self::KEY)
            ->willReturn($this->response());
        $this->service()->activate(' WP_b7k2-m9qx-4tn6 rj8v-c3hd-5pkw-2fsy-7gza 3efa69b6 ');

        $this->assertSame(self::KEY, $this->shared('key'));
    }

    public function testRevokedStoredKeyInDisplayFormStillFallsBackToFree(): void {
        $this->storeToken();
        $this->client->method('validate')->willThrowException(new WerkPlusApiException('KEY_REVOKED'));
        $service = $this->service();
        try {
            $service->activate('wp_b7k2-m9qx-4tn6-rj8v-c3hd-5pkw-2fsy-7gza-3efa-69b6');
        } catch (WerkPlusApiException) {
        }

        $this->assertSame('free', $service->tier());
    }

    public function testFailedNewKeyDoesNotDelayRenewalOfTheStoredOne(): void {
        $this->storeToken();
        $this->now = self::NOW + 8 * 86400;
        $this->client->method('validate')->willThrowException(new WerkPlusApiException('KEY_UNKNOWN'));
        $service = $this->service();
        try {
            $service->activate('wp_VERTIPPT');
        } catch (WerkPlusApiException) {
        }

        $this->assertNull($this->own('werkplus_last_attempt_at'));
        $this->assertNull($this->own('werkplus_last_error'));
        $this->assertTrue($service->isRefreshDue());
    }

    public function testTheKeyNeverAppearsInAStackTrace(): void {
        $this->client->method('validate')->willReturn([
            'token' => $this->token($this->claims(), [], self::foreignKey()['private']),
            'expiresAt' => 'x',
            'graceUntil' => 'y',
        ]);
        try {
            $this->service()->activate(self::KEY);
            $this->fail('Ausnahme erwartet');
        } catch (WerkPlusApiException $e) {
            $args = [];
            for ($t = $e; $t !== null; $t = $t->getPrevious()) {
                foreach ($t->getTrace() as $frame) {
                    $args = array_merge($args, $frame['args'] ?? []);
                }
            }
            $this->assertNotEmpty($args, 'Trace ohne Argumente: zend.exception_ignore_args ist an, der Test prueft nichts');
            $this->assertNotContains(self::KEY, $args);
        }
    }

    public function testRevokedNewKeyDoesNotCostTheStoredToken(): void {
        $this->storeToken();
        $this->client->method('validate')->willThrowException(new WerkPlusApiException('KEY_REVOKED'));
        $service = $this->service();
        try {
            $service->activate(self::OTHER_KEY);
        } catch (WerkPlusApiException) {
        }

        $this->assertSame(self::KEY, $this->shared('key'));
        $this->assertTrue($service->hasFeature('wt_mobile'));
    }

    public function testNewKeyReplacesKeyAndTokenTogether(): void {
        $this->storeToken(['iat' => self::NOW + 100]);
        $this->client->method('validate')->willReturn($this->response(['features' => ['kontingent']]));
        $service = $this->service();
        $service->activate(self::OTHER_KEY);

        $this->assertSame(self::OTHER_KEY, $this->shared('key'));
        $this->assertTrue($service->hasFeature('kontingent'));
        $this->assertFalse($service->hasFeature('wt_mobile'));
    }

    public function testRevokedStoredKeyFallsBackToFree(): void {
        $this->storeToken();
        $this->client->method('validate')->willThrowException(new WerkPlusApiException('KEY_REVOKED'));
        $service = $this->service();
        try {
            $service->refresh();
        } catch (WerkPlusApiException) {
        }

        $this->assertSame('free', $service->tier());
        $this->assertNull($this->shared('token'));
        $this->assertSame(self::KEY, $this->shared('key'));
    }

    /**
     * @return array<string, array{string}>
     */
    public static function transientErrors(): array {
        return [
            'RATE_LIMITED' => ['RATE_LIMITED'],
            'SERVER_ERROR' => ['SERVER_ERROR'],
            'UNREACHABLE' => [WerkPlusClient::UNREACHABLE],
            'INVALID_RESPONSE' => [WerkPlusClient::INVALID_RESPONSE],
            'INSTANCE_LIMIT_REACHED' => ['INSTANCE_LIMIT_REACHED'],
        ];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('transientErrors')]
    public function testFailedRenewalKeepsTheOldToken(string $code): void {
        $this->storeToken();
        $before = $this->shared('token');
        $this->client->method('validate')->willThrowException(new WerkPlusApiException($code));
        $service = $this->service();
        try {
            $service->refresh();
        } catch (WerkPlusApiException) {
        }

        $this->assertSame($before, $this->shared('token'));
        $this->assertTrue($service->hasFeature('wt_mobile'));
    }

    public function testAnOlderTokenNeverReplacesANewerOne(): void {
        $this->storeToken(['iat' => self::NOW + 600]);
        $newer = $this->shared('token');
        $this->now = self::NOW + 600;
        $this->client->method('validate')->willReturn($this->response(['iat' => self::NOW]));
        $this->service()->refresh();

        $this->assertSame($newer, $this->shared('token'));
    }

    public function testANewerTokenReplacesTheStoredOne(): void {
        $this->storeToken();
        $this->now = self::NOW + 600;
        $fresh = $this->response(['iat' => self::NOW + 600]);
        $this->client->method('validate')->willReturn($fresh);
        $this->service()->refresh();

        $this->assertSame($fresh['token'], $this->shared('token'));
    }

    public function testTokenThatFailsLocalVerificationIsNotStored(): void {
        $this->client->method('validate')->willReturn([
            'token' => $this->token($this->claims(), [], self::foreignKey()['private']),
            'expiresAt' => 'x',
            'graceUntil' => 'y',
        ]);
        $service = $this->service();
        try {
            $service->activate(self::KEY);
            $this->fail('Ausnahme erwartet');
        } catch (WerkPlusApiException $e) {
            $this->assertSame(EntitlementService::TOKEN_REJECTED, $e->getErrorCode());
        }

        $this->assertNull($this->shared('token'));
        $this->assertNull($this->shared('key'));
    }

    public function testInvalidInputIsRejectedBeforeAnyCall(): void {
        $this->client->expects($this->never())->method('validate');
        $service = $this->service();
        foreach (['', 'wp_<script>', 'wp_' . str_repeat('A', 130)] as $key) {
            try {
                $service->activate($key);
                $this->fail('Ausnahme erwartet fuer ' . $key);
            } catch (\InvalidArgumentException) {
            }
        }
    }

    public function testEmptyKeyReusesTheStoredOne(): void {
        $this->storeToken();
        $this->client->expects($this->once())->method('validate')
            ->with(self::KEY, self::UUID, $this->anything())
            ->willReturn($this->response());
        $this->service()->activate('');
    }

    public function testFreshTokenIsNotRenewed(): void {
        $this->storeToken();
        $this->now = self::NOW + 6 * 86400;
        $this->assertFalse($this->service()->isRefreshDue());
    }

    public function testTokenOlderThanSevenDaysIsRenewed(): void {
        $this->storeToken();
        $this->now = self::NOW + 7 * 86400;
        $this->assertTrue($this->service()->isRefreshDue());
    }

    public function testTokenCloseToExpiryIsRenewed(): void {
        $this->storeToken(['exp' => self::NOW + 10 * 86400, 'graceUntil' => self::NOW + 10 * 86400]);
        $this->now = self::NOW + 4 * 86400;
        $this->assertTrue($this->service()->isRefreshDue());
    }

    public function testNoRenewalWithoutKeyOrRightAfterAnAttempt(): void {
        $this->assertFalse($this->service()->isRefreshDue());

        $this->storeToken();
        $this->now = self::NOW + 8 * 86400;
        $this->config['worktime/werkplus_last_attempt_at'] = (string)($this->now - 3600);
        $this->assertFalse($this->service()->isRefreshDue());
    }

    public function testRetryWaitIsShorterThanTheJobInterval(): void {
        $this->storeToken();
        $this->now = self::NOW + 8 * 86400;

        $this->config['worktime/werkplus_last_attempt_at'] = (string)($this->now - 6 * 3600 + 60);
        $this->assertTrue($this->service()->isRefreshDue(), 'Ein Lauf kurz vor dem vollen Jobtakt muss erneuern');

        $this->config['worktime/werkplus_last_attempt_at'] = (string)($this->now - 5 * 3600 + 60);
        $this->assertFalse($this->service()->isRefreshDue());
    }

    public function testPermanentErrorsAreRetriedOnlyOnceADay(): void {
        $this->storeToken();
        $this->now = self::NOW + 8 * 86400;
        $this->config['worktime/werkplus_last_error'] = json_encode(['code' => 'KEY_REVOKED', 'serverMessage' => '', 'at' => $this->now - 7 * 3600]);
        $this->assertFalse($this->service()->isRefreshDue());

        $this->config['worktime/werkplus_last_error'] = json_encode(['code' => 'KEY_REVOKED', 'serverMessage' => '', 'at' => $this->now - 25 * 3600]);
        $this->assertTrue($this->service()->isRefreshDue());

        $this->config['worktime/werkplus_last_error'] = json_encode(['code' => 'SERVER_ERROR', 'serverMessage' => '', 'at' => $this->now - 7 * 3600]);
        $this->assertTrue($this->service()->isRefreshDue());
    }

    public function testTrialStoresKeyAndTokenAndReturnsTheKey(): void {
        $this->installedApps['projektwerk'] = '0.4.26';
        $this->client->expects($this->never())->method('validate');
        $this->client->expects($this->once())->method('trial')
            ->with(self::UUID, ['worktime' => '0.25.0', 'projektwerk' => '0.4.26'])
            ->willReturn(['key' => strtolower(self::KEY)] + $this->response());
        $service = $this->service();

        $this->assertSame(self::KEY, $service->startTrial());
        $this->assertSame(self::KEY, $this->shared('key'));
        $this->assertTrue($this->sensitive['werkwolke/key']);
        $this->assertNotNull($this->shared('token'));
        $this->assertTrue($this->sensitive['werkwolke/token']);
        $this->assertTrue($service->hasFeature('wt_mobile'));
        $this->assertNull($service->lastError());
    }

    public function testNoTrialWhenAKeyIsStored(): void {
        $this->storeToken();
        $this->client->expects($this->never())->method('trial');
        $this->expectException(\InvalidArgumentException::class);
        $this->expectExceptionMessage('keySet');
        $this->service()->startTrial();
    }

    public function testRefusedTrialStoresNothing(): void {
        $this->client->method('trial')->willThrowException(new WerkPlusApiException('TRIAL_ALREADY_USED', 'schon genutzt'));
        $service = $this->service();
        try {
            $service->startTrial();
            $this->fail('Ausnahme erwartet');
        } catch (WerkPlusApiException $e) {
            $this->assertSame('TRIAL_ALREADY_USED', $e->getErrorCode());
        }

        $this->assertNull($this->shared('key'));
        $this->assertNull($this->shared('token'));
        $this->assertNull($service->getStatus()['lastError']);
    }

    public function testTrialKeyIsKeptWhenItsTokenFailsVerification(): void {
        $this->client->method('trial')->willReturn([
            'key' => self::KEY,
            'token' => $this->token($this->claims(), [], self::foreignKey()['private']),
            'expiresAt' => 'x',
            'graceUntil' => 'y',
        ]);
        $service = $this->service();

        $this->assertSame(self::KEY, $service->startTrial());
        $this->assertSame(self::KEY, $this->shared('key'));
        $this->assertNull($this->shared('token'));
        $this->assertSame(EntitlementService::TOKEN_REJECTED, $service->getStatus()['lastError']['code']);
        $this->assertSame('free', $service->tier());
        $this->assertTrue($service->isRefreshDue());
    }

    public function testTrialKeyIsKeptWhenTheTokenIsMissing(): void {
        $this->client->method('trial')->willReturn(['key' => self::KEY, 'token' => '', 'expiresAt' => '', 'graceUntil' => '']);
        $service = $this->service();

        $this->assertSame(self::KEY, $service->startTrial());
        $this->assertSame(self::KEY, $this->shared('key'));
        $this->assertSame(EntitlementService::TOKEN_REJECTED, $service->lastError()['code']);
    }

    public function testRefreshIfDueSwallowsFailures(): void {
        $this->storeToken();
        $this->now = self::NOW + 8 * 86400;
        $this->client->expects($this->once())->method('validate')->willThrowException(new WerkPlusApiException(WerkPlusClient::UNREACHABLE));
        $service = $this->service();
        $service->refreshIfDue();

        $this->assertSame(WerkPlusClient::UNREACHABLE, $service->lastError()['code']);
        $this->assertTrue($service->hasFeature('wt_mobile'));
    }

    public function testRefreshIfDueDoesNothingWhenNotDue(): void {
        $this->storeToken();
        $this->client->expects($this->never())->method('validate');
        $this->service()->refreshIfDue();
    }

    public function testRemoveKeyClearsTheSharedLicenseAndOwnRenewalData(): void {
        $this->storeToken();
        $this->config['worktime/werkplus_last_attempt_at'] = (string)self::NOW;
        $this->config['worktime/werkplus_last_error'] = json_encode(['code' => 'SERVER_ERROR', 'serverMessage' => '', 'at' => self::NOW]);
        $service = $this->service();
        $service->removeKey();

        $this->assertSame(['werkwolke/store_version' => '1'], $this->config);
        $this->assertSame('free', $service->tier());
    }

    public function testStoreOfANewerFormatIsReadButNeverWritten(): void {
        $this->storeToken();
        $this->config['werkwolke/store_version'] = '2';
        $this->now = self::NOW + 31 * 86400;
        $before = $this->config;
        $this->client->expects($this->never())->method('validate');
        $this->client->expects($this->never())->method('trial');
        $service = $this->service();

        $status = $service->getStatus();
        $this->assertTrue($status['storeTooNew']);
        $this->assertTrue($status['keySet']);
        $this->assertSame('…69B6', $status['keyHint']);
        $this->assertSame('grace', $status['state']);
        $this->assertSame('werkplus', $service->tier());
        $this->assertFalse($service->isRefreshDue());
        $service->refreshIfDue();
        foreach ([fn () => $service->activate(self::KEY), fn () => $service->startTrial(), fn () => $service->removeKey(), fn () => $service->refresh()] as $action) {
            try {
                $action();
                $this->fail('Ausnahme erwartet');
            } catch (\InvalidArgumentException $e) {
                $this->assertSame('storeTooNew', $e->getMessage());
            }
        }
        $this->assertSame($before, $this->config);
    }

    public function testStatusHidesAnOldErrorWhenNoKeyIsStored(): void {
        $this->config['worktime/werkplus_last_error'] = json_encode(['code' => 'UNREACHABLE', 'serverMessage' => '', 'at' => self::NOW]);
        $this->assertNull($this->service()->getStatus()['lastError']);

        $this->storeToken();
        $this->assertSame('UNREACHABLE', $this->service()->getStatus()['lastError']['code']);
    }

    public function testStatusMasksTheKey(): void {
        $this->storeToken();
        $status = $this->service()->getStatus();

        $this->assertSame('…69B6', $status['keyHint']);
        $this->assertStringNotContainsString(self::KEY, (string)json_encode($status));
        $this->assertSame('valid', $status['state']);
        $this->assertSame(['wt_mobile', 'api_keys', 'pw_multi_board'], $status['features']);
        $this->assertFalse($status['storeTooNew']);
    }

    public function testStatusShowsTheLicensedEmployeesFromTheToken(): void {
        $this->storeToken(['licensedEmployees' => 12]);

        $this->assertSame(12, $this->service()->getStatus()['licensedEmployees']);
    }

    public function testStatusHasNoLicensedEmployeesWithoutTheClaim(): void {
        $this->storeToken();
        $status = $this->service()->getStatus();

        $this->assertNull($status['licensedEmployees']);
        $this->assertArrayNotHasKey('employeeBucket', $status);
    }

    public function testATokenWithoutKeyGrantsNothing(): void {
        $this->storeToken();
        unset($this->config['werkwolke/key']);

        $this->assertSame(EntitlementService::STATE_NONE, $this->service()->state());
        $this->assertFalse($this->service()->hasFeature('wt_mobile'));
    }

    public function testRenewalFinishingAfterTheKeyWasRemovedStoresNothing(): void {
        $this->storeToken();
        $this->now = self::NOW + 600;
        $this->client->method('validate')->willReturnCallback(function (): array {
            unset($this->config['werkwolke/key'], $this->config['werkwolke/token']);
            return $this->response(['iat' => self::NOW + 600]);
        });
        $this->service()->refresh();

        $this->assertNull($this->shared('token'));
    }

    public function testRevocationOfAnOldKeyDoesNotDropTheTokenOfANewOne(): void {
        $this->storeToken();
        $this->client->method('validate')->willReturnCallback(function (): array {
            $this->config['werkwolke/key'] = self::OTHER_KEY;
            $this->config['werkwolke/token'] = 'token-des-neuen-schluessels';
            throw new WerkPlusApiException('KEY_REVOKED');
        });
        try {
            $this->service()->refresh();
        } catch (WerkPlusApiException) {
        }

        $this->assertSame('token-des-neuen-schluessels', $this->shared('token'));
    }

    public function testAnErrorOfAnEarlierKeyIsNoLongerShown(): void {
        $this->storeToken();
        $this->client->method('validate')->willThrowException(new WerkPlusApiException('SERVER_ERROR'));
        try {
            $this->service()->refresh();
        } catch (WerkPlusApiException) {
        }
        $this->assertSame('SERVER_ERROR', $this->service()->getStatus()['lastError']['code']);

        $this->config['werkwolke/key'] = self::OTHER_KEY;
        $this->assertNull($this->service()->getStatus()['lastError']);
    }

    public function testAnErrorIsOverriddenByALaterRenewalOfAnotherWerkApp(): void {
        $this->storeToken();
        $this->now = self::NOW + 8 * 86400;
        $this->config['worktime/werkplus_last_error'] = json_encode(['code' => 'KEY_EXPIRED', 'serverMessage' => '', 'at' => self::NOW + 8 * 86400 - 3600]);
        $this->assertSame('KEY_EXPIRED', $this->service()->getStatus()['lastError']['code']);

        $this->config['werkwolke/token'] = $this->token($this->claims(['iat' => self::NOW + 8 * 86400 - 60, 'exp' => self::NOW + 38 * 86400]));
        $this->assertNull($this->service()->getStatus()['lastError']);
    }


    public function testPublicStatusWithoutTokenIsFree(): void {
        $this->assertSame(
            ['licensed' => false, 'tier' => 'free', 'state' => EntitlementService::STATE_NONE, 'graceUntil' => null],
            $this->service()->getPublicStatus(),
        );
    }

    public function testPublicStatusOfAValidLicenseRevealsNoKeyOrInstance(): void {
        $this->storeToken();
        $status = $this->service()->getPublicStatus();

        $this->assertSame(['licensed' => true, 'tier' => 'werkplus', 'state' => 'valid', 'graceUntil' => null], $status);
        $this->assertStringNotContainsString(self::UUID, json_encode($status));
    }

    public function testPublicStatusInGraceNamesTheEndOfTheGracePeriod(): void {
        $this->storeToken();
        $this->now = self::NOW + 31 * 86400;
        $status = $this->service()->getPublicStatus();

        $this->assertTrue($status['licensed']);
        $this->assertSame('grace', $status['state']);
        $this->assertSame(gmdate('Y-m-d\TH:i:s\Z', self::NOW + 44 * 86400), $status['graceUntil']);
    }

    public function testPublicStatusAfterTheGracePeriodFallsBackToFree(): void {
        $this->storeToken();
        $this->now = self::NOW + 45 * 86400;
        $status = $this->service()->getPublicStatus();

        $this->assertFalse($status['licensed']);
        $this->assertSame('free', $status['tier']);
        $this->assertSame('expired', $status['state']);
    }

    public function testPublicStatusNeverCallsTheLicenseServer(): void {
        $this->storeToken(['iat' => self::NOW - 20 * 86400]);
        $this->client->expects($this->never())->method('validate');
        $this->client->expects($this->never())->method('trial');
        $this->service()->getPublicStatus();
    }

    public function testAValidFreeTokenIsNotLicensed(): void {
        $this->storeToken(['tier' => 'free', 'features' => []]);
        $status = $this->service()->getPublicStatus();

        $this->assertFalse($status['licensed']);
        $this->assertSame('free', $status['tier']);
        $this->assertSame('valid', $status['state']);
    }
}
