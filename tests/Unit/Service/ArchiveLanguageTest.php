<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\ArchiveService;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCP\IConfig;
use OCP\IL10N;
use OCP\L10N\IFactory;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;

/** Archive PDFs use the instance language, not the approver's; German when unset. */
class ArchiveLanguageTest extends TestCase {

    /** @return array{0: string, 1: string} language and locale passed to IFactory::get() */
    private function archiveLanguage(array $system): array {
        $config = $this->createMock(IConfig::class);
        $config->method('getSystemValue')->willReturnCallback(
            static fn (string $key, $default = '') => $system[$key] ?? $default
        );

        $requested = [];
        $factory = $this->createMock(IFactory::class);
        $factory->method('languageExists')->willReturnCallback(
            static fn ($app, $lang) => in_array($lang, ['de', 'en', 'cs'], true)
        );
        $factory->method('localeExists')->willReturnCallback(
            static fn ($locale) => in_array($locale, ['de', 'en', 'cs', 'de_AT', 'en_GB'], true)
        );
        $factory->method('get')->willReturnCallback(function ($app, $lang, $locale) use (&$requested) {
            $requested = [$lang, $locale];
            return $this->createMock(IL10N::class);
        });

        $service = new ArchiveService(
            $this->createMock(CompanySettingsService::class),
            $this->createMock(EmployeeService::class),
            $this->createMock(TimeEntryService::class),
            $this->createMock(AbsenceService::class),
            $this->createMock(HolidayService::class),
            $this->createMock(WorkScheduleService::class),
            $this->createMock(PdfService::class),
            $factory,
            $config,
        );
        $method = new ReflectionMethod(ArchiveService::class, 'archiveL10n');
        $method->setAccessible(true);
        $method->invoke($service);

        return $requested;
    }

    public function testWithoutConfigurationTheArchiveStaysGerman(): void {
        $this->assertSame(['de', 'de'], $this->archiveLanguage([]));
    }

    public function testDefaultLanguageOfTheInstanceIsUsed(): void {
        $this->assertSame(['cs', 'cs'], $this->archiveLanguage(['default_language' => 'cs']));
    }

    public function testRegionalVariantFallsBackToItsBaseLanguage(): void {
        $this->assertSame(['en', 'en'], $this->archiveLanguage(['default_language' => 'en_GB']));
    }

    public function testUnsupportedLanguageStaysGerman(): void {
        $this->assertSame(['de', 'de'], $this->archiveLanguage(['default_language' => 'fr']));
    }

    public function testForcedLanguageWinsOverDefaultLanguage(): void {
        $this->assertSame(['en', 'en'], $this->archiveLanguage(['force_language' => 'en', 'default_language' => 'cs']));
    }

    public function testDefaultLocaleDecidesTheFormats(): void {
        $this->assertSame(['de', 'de_AT'], $this->archiveLanguage(['default_locale' => 'de_AT']));
    }
}
