<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\Service\DateParser;
use PHPUnit\Framework\TestCase;

/**
 * Strict date parsing for API input (#537).
 *
 * The original review fix only checked `DateTime::createFromFormat(...) === false`.
 * That is not enough: PHP happily rolls overflowing values over, so "2026-02-30"
 * would have passed as 2026-03-02 and booked an absence on a day nobody asked
 * for. The overflow cases below are what that check would have missed.
 */
class DateParserTest extends TestCase {

    public function testAcceptsIsoDate(): void {
        $date = DateParser::parseIsoDate('2026-08-04');

        $this->assertNotNull($date);
        $this->assertSame('2026-08-04', $date->format('Y-m-d'));
    }

    public function testNormalisesToMidnight(): void {
        $date = DateParser::parseIsoDate('2026-08-04');

        $this->assertNotNull($date);
        $this->assertSame('00:00:00', $date->format('H:i:s'));
    }

    public function testAcceptsUnpaddedComponents(): void {
        // Existing API clients may send 2026-8-4; that is unambiguous.
        $date = DateParser::parseIsoDate('2026-8-4');

        $this->assertNotNull($date);
        $this->assertSame('2026-08-04', $date->format('Y-m-d'));
    }

    public function testTrimsSurroundingWhitespace(): void {
        $date = DateParser::parseIsoDate("  2026-08-04\n");

        $this->assertNotNull($date);
        $this->assertSame('2026-08-04', $date->format('Y-m-d'));
    }

    /**
     * @dataProvider overflowingDates
     */
    public function testRejectsOverflowingDates(string $input): void {
        // createFromFormat() would silently roll these over into the next month.
        $this->assertNull(DateParser::parseIsoDate($input));
    }

    /**
     * @return array<string, array{string}>
     */
    public static function overflowingDates(): array {
        return [
            '31st of February' => ['2026-02-30'],
            'month 13' => ['2026-13-01'],
            'day 45' => ['2026-01-45'],
            'month 0' => ['2026-00-10'],
            'day 0' => ['2026-01-00'],
        ];
    }

    /**
     * @dataProvider relativeExpressions
     */
    public function testRejectsRelativeExpressions(string $input): void {
        // These resolve against the server clock, so the stored date would
        // depend on when the request happened.
        $this->assertNull(DateParser::parseIsoDate($input));
    }

    /**
     * @return array<string, array{string}>
     */
    public static function relativeExpressions(): array {
        return [
            'plus one week' => ['+1 week'],
            'yesterday' => ['yesterday'],
            'now' => ['now'],
            'german word' => ['morgen'],
        ];
    }

    /**
     * @dataProvider malformedInput
     */
    public function testRejectsMalformedInput(string $input): void {
        $this->assertNull(DateParser::parseIsoDate($input));
    }

    /**
     * @return array<string, array{string}>
     */
    public static function malformedInput(): array {
        return [
            'empty' => [''],
            'german format' => ['04.08.2026'],
            'us format' => ['08/04/2026'],
            'with time' => ['2026-08-04 12:00'],
            'two digit year' => ['26-08-04'],
            'trailing garbage' => ['2026-08-04x'],
        ];
    }

    public function testAcceptsLeapDayInLeapYear(): void {
        $date = DateParser::parseIsoDate('2028-02-29');

        $this->assertNotNull($date);
        $this->assertSame('2028-02-29', $date->format('Y-m-d'));
    }

    public function testRejectsLeapDayInNonLeapYear(): void {
        $this->assertNull(DateParser::parseIsoDate('2026-02-29'));
    }
}
