<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Service\UserTimeZone;
use OCP\IConfig;
use OCP\IRequest;
use OCP\IUser;
use OCP\IUserSession;
use PHPUnit\Framework\TestCase;

class UserTimeZoneTest extends TestCase {

    /** @var array<string, string> */
    private array $userValues = [];
    /** @var array<string, string> */
    private array $written = [];

    private function build(
        ?string $sessionUid = 'alice',
        string $header = '',
        string $companySetting = '',
        string $systemDefault = '',
    ): UserTimeZone {
        $config = $this->createMock(IConfig::class);
        $config->method('getUserValue')->willReturnCallback(
            fn (string $uid, string $app, string $key, $default = '') => $app === 'core' && $key === 'timezone'
                ? ($this->userValues[$uid] ?? $default)
                : $default,
        );
        $config->method('setUserValue')->willReturnCallback(
            function (string $uid, string $app, string $key, $value): void {
                $this->written[$uid . '/' . $app . '/' . $key] = (string)$value;
            },
        );
        $config->method('getSystemValueString')->willReturnCallback(
            fn (string $key, string $default = '') => $key === 'default_timezone' ? ($systemDefault !== '' ? $systemDefault : $default) : $default,
        );

        $session = $this->createMock(IUserSession::class);
        if ($sessionUid === null) {
            $session->method('getUser')->willReturn(null);
        } else {
            $user = $this->createMock(IUser::class);
            $user->method('getUID')->willReturn($sessionUid);
            $session->method('getUser')->willReturn($user);
        }

        $request = $this->createMock(IRequest::class);
        $request->method('getHeader')->willReturnCallback(
            fn (string $name) => $name === UserTimeZone::HEADER ? $header : '',
        );

        $mapper = $this->createMock(CompanySettingMapper::class);
        $mapper->method('getValue')->willReturnCallback(
            fn (string $key, ?string $default = null) => $key === CompanySetting::KEY_TIMEZONE ? $companySetting : $default,
        );

        return new UserTimeZone($config, $session, $request, $mapper);
    }

    public function testGespeicherteNutzerZeitzoneGewinnt(): void {
        $this->userValues['alice'] = 'America/New_York';
        $tz = $this->build(header: 'Europe/Berlin', companySetting: 'Asia/Tokyo');

        self::assertSame('America/New_York', $tz->getTimeZone()->getName());
        self::assertSame([], $this->written);
    }

    public function testOhneNutzerZeitzoneGiltDerBrowserUndWirdGespeichert(): void {
        $tz = $this->build(header: 'Europe/Vienna');

        self::assertSame('Europe/Vienna', $tz->getTimeZone()->getName());
        self::assertSame(['alice/core/timezone' => 'Europe/Vienna'], $this->written);
    }

    public function testUngueltigerHeaderWirdIgnoriertUndNichtGespeichert(): void {
        $tz = $this->build(header: 'Mars/Olympus');

        self::assertSame(UserTimeZone::FALLBACK, $tz->getTimeZone()->getName());
        self::assertSame([], $this->written);
    }

    public function testHeaderGiltNieFuerEinenAnderenNutzer(): void {
        $tz = $this->build(header: 'Asia/Tokyo');

        self::assertSame(UserTimeZone::FALLBACK, $tz->getTimeZone(false, 'bob')->getName());
        self::assertSame([], $this->written);
    }

    public function testAdminEinstellungVorServerStandard(): void {
        $tz = $this->build(companySetting: 'Europe/Zurich', systemDefault: 'Europe/London');

        self::assertSame('Europe/Zurich', $tz->getTimeZone()->getName());
    }

    public function testServerStandardWennKeineAdminEinstellung(): void {
        $tz = $this->build(systemDefault: 'Europe/London');

        self::assertSame('Europe/London', $tz->getTimeZone()->getName());
    }

    public function testUtcAlsServerStandardFaelltAufEuropeBerlin(): void {
        $tz = $this->build(systemDefault: 'UTC');

        self::assertSame(UserTimeZone::FALLBACK, $tz->getTimeZone()->getName());
    }

    public function testUtcAlsBewussteAdminEinstellungBleibtUtc(): void {
        $tz = $this->build(companySetting: 'UTC');

        self::assertSame('UTC', $tz->getTimeZone()->getName());
    }

    public function testOhneSitzungGiltDieRueckfallebene(): void {
        $tz = $this->build(sessionUid: null, header: 'Asia/Tokyo');

        self::assertSame(UserTimeZone::FALLBACK, $tz->getTimeZone()->getName());
        self::assertSame([], $this->written);
    }

    public function testNieStummUtcFuerNutzerOhneZeitzone(): void {
        // Kein core/timezone, kein Header, nichts konfiguriert: Nextcloud selbst lieferte hier UTC
        $tz = $this->build();

        self::assertNotSame('UTC', $tz->getTimeZone()->getName());
    }
}
