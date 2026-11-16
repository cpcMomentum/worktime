<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\LicenseController;
use OCA\WorkTime\License\WerkPlusApiException;
use OCA\WorkTime\License\EntitlementService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\License\WerkPlusClient;
use OCP\AppFramework\Http;
use OCP\IL10N;
use OCP\IRequest;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class LicenseControllerTest extends TestCase {

    private EntitlementService&MockObject $entitlement;

    protected function setUp(): void {
        parent::setUp();
        $this->entitlement = $this->createMock(EntitlementService::class);
        $this->entitlement->method('getStatus')->willReturn(['keySet' => true, 'lastError' => null]);
    }

    private function controller(?string $userId = 'admin', bool $nextcloudAdmin = true, bool $hr = true): LicenseController {
        $permissions = $this->createMock(PermissionService::class);
        $permissions->method('isAdmin')->willReturn($nextcloudAdmin);
        $permissions->method('canManageEmployees')->willReturn($nextcloudAdmin || $hr);
        $l10n = $this->createMock(IL10N::class);
        $l10n->method('t')->willReturnCallback(fn (string $text) => $text);
        return new LicenseController(
            $this->createMock(IRequest::class),
            $userId,
            $permissions,
            $this->entitlement,
            $l10n,
            $this->createMock(LoggerInterface::class),
        );
    }

    public function testHrSeesTheStatusButCannotManageIt(): void {
        $response = $this->controller('hr', false)->show();

        $this->assertSame(Http::STATUS_OK, $response->getStatus());
        $this->assertFalse($response->getData()['canManage']);
    }

    public function testEmployeesDoNotSeeTheAdminStatus(): void {
        $this->assertSame(Http::STATUS_FORBIDDEN, $this->controller('lea', false, false)->show()->getStatus());
    }

    public function testOnlyNextcloudAdminsChangeTheKey(): void {
        $this->entitlement->expects($this->never())->method('activate');
        $this->entitlement->expects($this->never())->method('removeKey');
        $controller = $this->controller('hr', false);
        foreach ([$controller->activate('wp_X'), $controller->trial(), $controller->refresh(), $controller->destroy()] as $response) {
            $this->assertSame(Http::STATUS_FORBIDDEN, $response->getStatus());
            $this->assertStringContainsString('Nextcloud-Admins', $response->getData()['error']);
        }
    }

    public function testEveryLoggedInUserGetsThePublicStatus(): void {
        $this->entitlement->method('getPublicStatus')->willReturn(['licensed' => true, 'tier' => 'werkplus', 'state' => 'valid', 'graceUntil' => null]);
        $response = $this->controller('lea', false, false)->publicStatus();

        $this->assertSame(Http::STATUS_OK, $response->getStatus());
        $this->assertTrue($response->getData()['licensed']);
    }

    public function testPublicStatusNeverFailsWithAServerError(): void {
        $this->entitlement->method('getPublicStatus')->willThrowException(new \RuntimeException('kaputt'));
        $response = $this->controller('lea', false, false)->publicStatus();

        $this->assertSame(Http::STATUS_OK, $response->getStatus());
        $this->assertFalse($response->getData()['licensed']);
    }

    public function testWithoutLoginEveryActionIsRefused(): void {
        $controller = $this->controller(null);
        foreach ([$controller->show(), $controller->publicStatus(), $controller->refresh(), $controller->activate('wp_X'), $controller->trial(), $controller->destroy()] as $response) {
            $this->assertSame(Http::STATUS_UNAUTHORIZED, $response->getStatus());
        }
    }

    public function testStatusCarriesTheLastErrorWithItsOwnText(): void {
        $this->entitlement = $this->createMock(EntitlementService::class);
        $this->entitlement->method('getStatus')->willReturn([
            'keySet' => true,
            'lastError' => ['code' => 'KEY_REVOKED', 'serverMessage' => 'Servertext', 'at' => 1_792_332_723],
        ]);
        $error = $this->controller()->show()->getData()['lastError'];

        $this->assertSame('KEY_REVOKED', $error['code']);
        $this->assertStringContainsString('gesperrt', $error['message']);
        $this->assertSame(gmdate('Y-m-d\\TH:i:s\\Z', 1_792_332_723), $error['at']);
    }

    public function testActivateReturnsTheStatus(): void {
        $this->entitlement->expects($this->once())->method('activate')->with('wp_X');
        $response = $this->controller()->activate('wp_X');

        $this->assertSame(Http::STATUS_OK, $response->getStatus());
        $this->assertTrue($response->getData()['canManage']);
    }

    public function testInvalidKeyGetsAnInputError(): void {
        $this->entitlement->method('activate')->willThrowException(new \InvalidArgumentException('key'));
        $response = $this->controller()->activate('wp_<');

        $this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
        $this->assertSame('INPUT_INVALID', $response->getData()['code']);
    }

    public function testRefreshWithoutKeyGetsAnInputError(): void {
        $this->entitlement->method('refresh')->willThrowException(new \InvalidArgumentException('key'));

        $this->assertSame('INPUT_INVALID', $this->controller()->refresh()->getData()['code']);
    }

    public function testDestroyRemovesTheKey(): void {
        $this->entitlement->expects($this->once())->method('removeKey');

        $this->assertSame(Http::STATUS_OK, $this->controller()->destroy()->getStatus());
    }

    /**
     * @return array<string, array{string, string}>
     */
    public static function errorTexts(): array {
        return [
            'REQUEST_INVALID' => ['REQUEST_INVALID', 'fehlerhaft'],
            'KEY_UNKNOWN' => ['KEY_UNKNOWN', 'nicht bekannt'],
            'KEY_REVOKED' => ['KEY_REVOKED', 'gesperrt'],
            'KEY_EXPIRED' => ['KEY_EXPIRED', 'abgelaufen'],
            'INSTANCE_LIMIT_REACHED' => ['INSTANCE_LIMIT_REACHED', 'einer anderen Nextcloud zugeordnet'],
            'RATE_LIMITED' => ['RATE_LIMITED', 'Zu viele Versuche'],
            'UNREACHABLE' => [WerkPlusClient::UNREACHABLE, 'nicht erreichbar'],
            'TOKEN_REJECTED' => [EntitlementService::TOKEN_REJECTED, 'ließ sich nicht prüfen'],
            'SERVER_ERROR' => ['SERVER_ERROR', 'Fehler gemeldet'],
            'unbekannt mit Servertext' => ['NEW_CODE', 'Servertext'],
        ];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('errorTexts')]
    public function testServerErrorsAreTranslatedByCodeNotByMessage(string $code, string $text): void {
        $this->entitlement->method('refresh')->willThrowException(new WerkPlusApiException($code, 'Servertext'));
        $response = $this->controller()->refresh();

        $this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
        $this->assertSame($code, $response->getData()['code']);
        $this->assertStringContainsString($text, $response->getData()['error']);
    }

    public function testUnknownCodeWithoutServerTextFallsBackToAGeneralText(): void {
        $this->entitlement->method('refresh')->willThrowException(new WerkPlusApiException('NEW_CODE', ''));

        $this->assertStringContainsString('Fehler gemeldet', $this->controller()->refresh()->getData()['error']);
    }

    public function testDestroyWithANewerStoreFormatIsAnInputError(): void {
        $this->entitlement->method('removeKey')->willThrowException(new \InvalidArgumentException('storeTooNew'));
        $response = $this->controller()->destroy();

        $this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
        $this->assertStringContainsString('neueren Format', $response->getData()['error']);
    }
}
