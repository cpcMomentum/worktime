<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\ValidationException;
use PHPUnit\Framework\TestCase;

class TimeEntryServiceTest extends TestCase {

    private TimeEntryService $service;
    private TimeEntryMapper $timeEntryMapper;
    private CompanySettingMapper $settingsMapper;
    private AuditLogService $auditLogService;

    protected function setUp(): void {
        $this->timeEntryMapper = $this->createMock(TimeEntryMapper::class);
        $this->settingsMapper = $this->createMock(CompanySettingMapper::class);
        $this->auditLogService = $this->createMock(AuditLogService::class);

        // Default settings
        $this->settingsMapper->method('getValueAsInt')
            ->willReturnCallback(function (string $key) {
                return match ($key) {
                    CompanySetting::KEY_MIN_BREAK_MINUTES_6H => 30,
                    CompanySetting::KEY_MIN_BREAK_MINUTES_9H => 45,
                    default => 0,
                };
            });

        $this->settingsMapper->method('getValueAsBool')
            ->willReturnCallback(function (string $key) {
                return match ($key) {
                    CompanySetting::KEY_ALLOW_FUTURE_ENTRIES => false,
                    default => false,
                };
            });

        $this->settingsMapper->method('getValueAsFloat')
            ->willReturnCallback(function (string $key) {
                return match ($key) {
                    CompanySetting::KEY_MAX_DAILY_HOURS => 12.0,
                    default => 0.0,
                };
            });

        $this->service = new TimeEntryService(
            $this->timeEntryMapper,
            $this->settingsMapper,
            $this->auditLogService
        );
    }

    /**
     * Test break suggestion according to §4 ArbZG (German Working Hours Act)
     *
     * @dataProvider breakSuggestionProvider
     */
    public function testSuggestBreak(string $startTime, string $endTime, int $expectedBreak): void {
        $result = $this->service->suggestBreak($startTime, $endTime);

        $this->assertEquals(
            $expectedBreak,
            $result,
            "Break suggestion for $startTime - $endTime should be $expectedBreak minutes"
        );
    }

    /**
     * §4 ArbZG:
     * - ≤6h: keine Pause erforderlich (0 min)
     * - >6h bis 9h: 30 min Pause
     * - >9h: 45 min Pause
     */
    public static function breakSuggestionProvider(): array {
        return [
            // No break required (≤6h)
            ['08:00', '14:00', 0],  // 6h exactly
            ['09:00', '13:00', 0],  // 4h
            ['08:00', '12:00', 0],  // 4h
            ['10:00', '15:00', 0],  // 5h
            ['07:00', '13:00', 0],  // 6h exactly

            // 30 min break (>6h to ≤9h)
            ['08:00', '14:01', 30], // 6h 1min -> 30min break
            ['08:00', '15:00', 30], // 7h
            ['07:00', '15:00', 30], // 8h
            ['08:00', '17:00', 30], // 9h exactly
            ['06:00', '14:30', 30], // 8.5h

            // 45 min break (>9h)
            ['08:00', '17:01', 45], // 9h 1min -> 45min break
            ['07:00', '17:30', 45], // 10.5h
            ['06:00', '17:00', 45], // 11h
            ['06:00', '18:00', 45], // 12h

            // Edge cases
            ['00:00', '06:00', 0],  // 6h at midnight
            ['23:00', '05:00', 0],  // 6h overnight - handled as -18h -> +24h = 6h
        ];
    }

    /**
     * @dataProvider breakValidationProvider
     */
    public function testValidateBreak(int $grossMinutes, int $breakMinutes, bool $expectedValid): void {
        $result = $this->service->validateBreak($grossMinutes, $breakMinutes);

        $this->assertEquals(
            $expectedValid,
            $result,
            "Break validation for {$grossMinutes}min gross with {$breakMinutes}min break should be " . ($expectedValid ? 'valid' : 'invalid')
        );
    }

    public static function breakValidationProvider(): array {
        return [
            // ≤6h - any break is valid
            [360, 0, true],   // 6h, 0min break
            [360, 30, true],  // 6h, 30min break
            [300, 0, true],   // 5h, 0min break

            // >6h to ≤9h - need 30min break
            [361, 0, false],  // 6h 1min, 0min break
            [361, 29, false], // 6h 1min, 29min break
            [361, 30, true],  // 6h 1min, 30min break
            [480, 30, true],  // 8h, 30min break
            [540, 30, true],  // 9h, 30min break

            // >9h - need 45min break
            [541, 30, false], // 9h 1min, 30min break
            [541, 44, false], // 9h 1min, 44min break
            [541, 45, true],  // 9h 1min, 45min break
            [600, 45, true],  // 10h, 45min break
            [600, 60, true],  // 10h, 60min break
        ];
    }

    public function testInvalidTimeFormat(): void {
        // Test that invalid time formats return 0 for break suggestion
        $result = $this->service->suggestBreak('invalid', 'format');
        $this->assertEquals(0, $result);

        $result = $this->service->suggestBreak('25:00', '17:00');
        $this->assertEquals(0, $result);
    }

    public function testOvernightShift(): void {
        // Test overnight shift calculation (e.g., night shift)
        // 22:00 to 06:00 = 8 hours
        $result = $this->service->suggestBreak('22:00', '06:00');
        $this->assertEquals(30, $result); // 8h requires 30min break
    }

    public function testGetMonthlyStats(): void {
        $this->timeEntryMapper->method('sumWorkMinutesByEmployeeAndMonth')
            ->with(1, 2026, 1)
            ->willReturn(9600); // 160 hours in minutes

        $this->timeEntryMapper->method('countEntriesByEmployeeAndMonth')
            ->with(1, 2026, 1)
            ->willReturn(22);

        $stats = $this->service->getMonthlyStats(1, 2026, 1);

        $this->assertEquals(9600, $stats['totalWorkMinutes']);
        $this->assertEquals(160.0, $stats['totalWorkHours']);
        $this->assertEquals(22, $stats['entryCount']);
    }
}
