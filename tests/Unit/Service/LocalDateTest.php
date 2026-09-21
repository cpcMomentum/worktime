<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use DateTimeZone;
use OCA\WorkTime\Service\LocalDate;
use PHPUnit\Framework\TestCase;

/**
 * #713: LocalDate::today() must return the current *local* calendar date
 * (in the given timezone), anchored at midnight, so it stays comparable to
 * WorkTime's stored "date at UTC midnight" values.
 */
class LocalDateTest extends TestCase {

    public function testReturnsLocalCalendarDateAtMidnight(): void {
        $tz = new DateTimeZone('Europe/Berlin');
        $expected = (new DateTime('now', $tz))->format('Y-m-d');

        $today = LocalDate::today($tz);

        $this->assertSame($expected, $today->format('Y-m-d'));
        $this->assertSame('00:00:00', $today->format('H:i:s'));
        // #716: the result is anchored at UTC midnight explicitly.
        $this->assertSame('UTC', $today->getTimezone()->getName());
        $this->assertSame(0, $today->getOffset());
    }

    /**
     * The whole point of the fix: with a far-eastern timezone the local day can
     * already be ahead of the UTC day. today() must follow the given timezone,
     * not the UTC runtime clock.
     */
    public function testFollowsGivenTimezoneNotUtc(): void {
        $tzAhead = new DateTimeZone('Pacific/Kiritimati'); // UTC+14
        $expected = (new DateTime('now', $tzAhead))->format('Y-m-d');

        $this->assertSame($expected, LocalDate::today($tzAhead)->format('Y-m-d'));
    }
}
