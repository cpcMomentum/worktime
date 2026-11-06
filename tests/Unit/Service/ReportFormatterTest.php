<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Service\ReportFormatter;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;

class ReportFormatterTest extends TestCase {

    private function formatter(string $lang, string $locale): ReportFormatter {
        $catalog = $lang === 'de'
            ? []
            : json_decode((string)file_get_contents(__DIR__ . "/../../../l10n/$lang.json"), true)['translations'];
        $l = $this->createMock(IL10N::class);
        $l->method('t')->willReturnCallback(
            static fn (string $text, $params = []) => vsprintf($catalog[$text] ?? $text, (array)$params)
        );
        $l->method('getLanguageCode')->willReturn($lang);
        $l->method('getLocaleCode')->willReturn($locale);
        return new ReportFormatter($l);
    }

    public function testGermanKeepsTheFormerReportFormats(): void {
        $fmt = $this->formatter('de', 'de_DE');
        $date = new DateTime('2026-03-02 14:05');

        $this->assertSame('02.03.2026', $fmt->date($date));
        $this->assertSame('März 2026', $fmt->monthYear(2026, 3));
        $this->assertSame('1.234,5', $fmt->number(1234.5, 1));
        $this->assertSame('1234,50', $fmt->number(1234.5, 2, false));
        $this->assertSame('02.03.2026 14:05 Uhr', $fmt->dateTime($date));
        $this->assertSame('7:30 Std.', $fmt->hours(450));
    }

    public function testEnglishUsesTheLocaleAndTheCatalog(): void {
        $fmt = $this->formatter('en', 'en_US');
        $date = new DateTime('2026-03-02 14:05');

        $this->assertSame('Mar 2, 2026', $fmt->date($date));
        $this->assertSame('Mon', $fmt->weekday($date));
        $this->assertSame('3/2', $fmt->dayMonth($date));
        $this->assertSame('March 2026', $fmt->monthYear(2026, 3));
        $this->assertSame('1,234.5', $fmt->number(1234.5, 1));
        $this->assertSame('7:30 h', $fmt->hours(450));
    }

    public function testWordsFollowTheLanguageAndNumbersTheLocale(): void {
        $fmt = $this->formatter('en', 'de_DE');
        $date = new DateTime('2026-03-02');

        $this->assertSame('March 2026', $fmt->monthYear(2026, 3));
        $this->assertSame('Mon', $fmt->weekday($date));
        $this->assertSame('02.03.2026', $fmt->date($date));
        $this->assertSame('2,5', $fmt->number(2.5, 1));
    }
}
