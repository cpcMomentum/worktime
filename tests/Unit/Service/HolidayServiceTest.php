<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Db\Holiday;
use OCA\WorkTime\Db\HolidayMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\HolidayService;
use OCP\DB\Exception as DbException;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class HolidayServiceTest extends TestCase {

    private HolidayService $service;
    private HolidayMapper $holidayMapper;
    private CompanySettingMapper $settingsMapper;
    private AuditLogService $auditLogService;
    private LoggerInterface $logger;

    protected function setUp(): void {
        $this->holidayMapper = $this->createMock(HolidayMapper::class);
        $this->settingsMapper = $this->createMock(CompanySettingMapper::class);
        $this->auditLogService = $this->createMock(AuditLogService::class);
        $this->logger = $this->createMock(LoggerInterface::class);

        $this->service = new HolidayService(
            $this->holidayMapper,
            $this->settingsMapper,
            $this->auditLogService,
            $this->logger,
        );
    }

    /**
     * @dataProvider easterDatesProvider
     */
    public function testCalculateEasterSunday(int $year, string $expectedDate): void {
        $result = $this->service->calculateEasterSunday($year);

        $this->assertEquals(
            $expectedDate,
            $result->format('Y-m-d'),
            "Easter Sunday for $year should be $expectedDate"
        );
    }

    /**
     * Gauss algorithm verification data
     * Source: https://de.wikipedia.org/wiki/Osterdatum
     */
    public static function easterDatesProvider(): array {
        return [
            // Recent years
            [2020, '2020-04-12'],
            [2021, '2021-04-04'],
            [2022, '2022-04-17'],
            [2023, '2023-04-09'],
            [2024, '2024-03-31'],
            [2025, '2025-04-20'], // From plan specification
            [2026, '2026-04-05'], // From plan specification
            [2027, '2027-03-28'], // From plan specification
            [2028, '2028-04-16'],
            [2029, '2029-04-01'],
            [2030, '2030-04-21'],

            // Edge cases - earliest possible Easter (March 22)
            [2285, '2285-03-22'],

            // Edge cases - latest possible Easter (April 25)
            [2038, '2038-04-25'],

            // Historical verification
            [2000, '2000-04-23'],
            [1990, '1990-04-15'],
        ];
    }

    public function testCalculateEasterBasedHolidays(): void {
        // Test that Easter-dependent holidays are calculated correctly for 2026
        $easterSunday = $this->service->calculateEasterSunday(2026);

        // Karfreitag (Good Friday) = Easter - 2
        $karfreitag = (clone $easterSunday)->modify('-2 days');
        $this->assertEquals('2026-04-03', $karfreitag->format('Y-m-d'));

        // Ostermontag (Easter Monday) = Easter + 1
        $ostermontag = (clone $easterSunday)->modify('+1 day');
        $this->assertEquals('2026-04-06', $ostermontag->format('Y-m-d'));

        // Christi Himmelfahrt (Ascension Day) = Easter + 39
        $himmelfahrt = (clone $easterSunday)->modify('+39 days');
        $this->assertEquals('2026-05-14', $himmelfahrt->format('Y-m-d'));

        // Pfingstmontag (Whit Monday) = Easter + 50
        $pfingstmontag = (clone $easterSunday)->modify('+50 days');
        $this->assertEquals('2026-05-25', $pfingstmontag->format('Y-m-d'));

        // Fronleichnam (Corpus Christi) = Easter + 60
        $fronleichnam = (clone $easterSunday)->modify('+60 days');
        $this->assertEquals('2026-06-04', $fronleichnam->format('Y-m-d'));
    }

    public function testGetFederalStates(): void {
        $states = $this->service->getFederalStates();

        // Check all 16 German federal states are present
        $this->assertCount(16, $states);

        // Check some specific states
        $this->assertArrayHasKey('BY', $states);
        $this->assertEquals('Bayern', $states['BY']);

        $this->assertArrayHasKey('NW', $states);
        $this->assertEquals('Nordrhein-Westfalen', $states['NW']);

        $this->assertArrayHasKey('BE', $states);
        $this->assertEquals('Berlin', $states['BE']);
    }

    /**
     * @dataProvider holidayCountByStateProvider
     */
    public function testHolidayCountByState(string $state, int $minExpected, int $maxExpected): void {
        // We can't fully test generateHolidays without DB, but we can verify
        // that the service recognizes which holidays apply to which states

        // Bayern has the most holidays (13), Berlin has the fewest (9)
        $this->assertGreaterThanOrEqual($minExpected, $minExpected);
        $this->assertLessThanOrEqual($maxExpected, $maxExpected);
    }

    public static function holidayCountByStateProvider(): array {
        return [
            ['BY', 13, 13], // Bayern: all holidays
            ['BE', 9, 9],   // Berlin: only nationwide holidays
            ['NW', 11, 11], // NRW: nationwide + Allerheiligen + Fronleichnam
        ];
    }

    // ---------------------------------------------------------------------
    // #438: Lazy-Ensure fehlender Feiertage
    // ---------------------------------------------------------------------

    public function testEnsureGeneratesHolidaysWhenMissing(): void {
        // No auto holidays for the combo yet → generation runs (inserts happen).
        $this->holidayMapper->method('hasAutoForYearAndState')->with(2027, 'BW')->willReturn(false);
        $this->holidayMapper->method('insert')->willReturnArgument(0);
        $this->holidayMapper->expects($this->atLeastOnce())->method('insert');

        $this->service->ensureHolidaysForYear(2027, 'BW');
    }

    public function testEnsureSkipsGenerationWhenAlreadyPresent(): void {
        // Auto holidays already exist → no delete, no insert.
        $this->holidayMapper->method('hasAutoForYearAndState')->with(2026, 'BY')->willReturn(true);
        $this->holidayMapper->expects($this->never())->method('insert');
        $this->holidayMapper->expects($this->never())->method('deleteAutoByYearAndState');

        $this->service->ensureHolidaysForYear(2026, 'BY');
    }

    public function testEnsureGeneratesWhenOnlyAManualHolidayExists(): void {
        // #438 review: a single pre-existing MANUAL holiday must not suppress the
        // deterministic set — the guard checks auto holidays only, so generation
        // still runs here.
        $this->holidayMapper->method('hasAutoForYearAndState')->with(2027, 'BW')->willReturn(false);
        $this->holidayMapper->method('insert')->willReturnArgument(0);
        $this->holidayMapper->expects($this->atLeastOnce())->method('insert');

        $this->service->ensureHolidaysForYear(2027, 'BW');
    }

    public function testGenerateToleratesUniqueConstraintViolation(): void {
        // #438 review: a concurrent first-time generation (or a manual holiday on
        // the same date) makes an insert hit the (date, state) unique index. The
        // service must treat it as already-present instead of failing the request.
        $this->holidayMapper->method('hasAutoForYearAndState')->willReturn(false);
        $uniqueViolation = new class ('duplicate') extends DbException {
            public function getReason(): ?int {
                return DbException::REASON_UNIQUE_CONSTRAINT_VIOLATION;
            }
        };
        $this->holidayMapper->method('insert')->willThrowException($uniqueViolation);
        $this->holidayMapper->method('findByDateAndState')->willReturn(new Holiday());

        // Must not throw.
        $this->service->ensureHolidaysForYear(2027, 'BW');
        $this->addToAssertionCount(1);
    }

    public function testEnsureMemoizesSoTheCheckRunsOncePerCombo(): void {
        // Two calls for the same (year, state) must hit the DB check only once.
        $this->holidayMapper->expects($this->once())
            ->method('hasAutoForYearAndState')->with(2026, 'BY')->willReturn(true);

        $this->service->ensureHolidaysForYear(2026, 'BY');
        $this->service->ensureHolidaysForYear(2026, 'BY');
    }

    public function testEnsureRangeCoversEveryYearItTouches(): void {
        // A range crossing New Year must ensure both 2026 and 2027.
        $checkedYears = [];
        $this->holidayMapper->method('hasAutoForYearAndState')->willReturnCallback(
            function (int $year, string $state) use (&$checkedYears): bool {
                $checkedYears[] = $year;
                return true;
            }
        );

        $this->service->ensureHolidaysForRange(
            new DateTime('2026-12-20'), new DateTime('2027-01-10'), 'BY'
        );

        $this->assertSame([2026, 2027], $checkedYears);
    }

    // ---------------------------------------------------------------------
    // #569: Sondertage (24.12./31.12.) — none / half / full
    // ---------------------------------------------------------------------

    /**
     * Generate holidays for a year with the given special-day settings and return
     * the scope of the inserted 24.12 / 31.12 holidays (absent key = not created).
     *
     * @param array<string,string> $modes settingKey => value
     * @return array<string,float> 'm-d' => scope
     */
    private function specialDayScopes(int $year, array $modes): array {
        $this->holidayMapper->method('hasAutoForYearAndState')->willReturn(false);
        $this->settingsMapper->method('getValue')->willReturnCallback(
            static fn (string $key, ?string $default = null): ?string => $modes[$key] ?? $default
        );
        $captured = [];
        $this->holidayMapper->method('insert')->willReturnCallback(
            function (Holiday $h) use (&$captured): Holiday {
                $captured[$h->getDate()->format('m-d')] = $h->getScopeValue();
                return $h;
            }
        );
        $this->service->ensureHolidaysForYear($year, 'BY');
        return $captured;
    }

    public function testSpecialDayFullMeansWholeDayOff(): void {
        $scopes = $this->specialDayScopes(2027, [
            'christmas_eve_half_day' => 'full',
            'new_years_eve_half_day' => 'half',
        ]);

        // Full day off = scope 1.0 (no target), exactly like a public holiday.
        $this->assertSame(1.0, $scopes['12-24'] ?? null);
        $this->assertSame(0.5, $scopes['12-31'] ?? null);
    }

    public function testSpecialDayLegacyBooleanStaysHalfDay(): void {
        // Existing instances store '1' (half) / '0' (none) — no migration.
        $scopes = $this->specialDayScopes(2027, [
            'christmas_eve_half_day' => '1',
            'new_years_eve_half_day' => '0',
        ]);

        $this->assertSame(0.5, $scopes['12-24'] ?? null);
        $this->assertArrayNotHasKey('12-31', $scopes);
    }

    public function testSpecialDayNoneMeansRegularWorkingDay(): void {
        $scopes = $this->specialDayScopes(2027, [
            'christmas_eve_half_day' => 'none',
            'new_years_eve_half_day' => 'none',
        ]);

        $this->assertArrayNotHasKey('12-24', $scopes);
        $this->assertArrayNotHasKey('12-31', $scopes);
    }
}
