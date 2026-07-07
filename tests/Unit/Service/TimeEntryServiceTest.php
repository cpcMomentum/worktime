<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\ProjectService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\ValidationException;
use OCA\WorkTime\Service\ForbiddenException;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class TimeEntryServiceTest extends TestCase {

    private TimeEntryService $service;
    private TimeEntryMapper $timeEntryMapper;
    private CompanySettingMapper $settingsMapper;
    private EmployeeMapper $employeeMapper;
    private AbsenceMapper $absenceMapper;
    private AuditLogService $auditLogService;
    private NotificationService $notificationService;
    private ProjectService $projectService;
    private LoggerInterface $logger;
    private IL10N $l;

    protected function setUp(): void {
        $this->timeEntryMapper = $this->createMock(TimeEntryMapper::class);
        $this->settingsMapper = $this->createMock(CompanySettingMapper::class);
        $this->employeeMapper = $this->createMock(EmployeeMapper::class);
        $this->absenceMapper = $this->createMock(AbsenceMapper::class);
        $this->auditLogService = $this->createMock(AuditLogService::class);
        $this->notificationService = $this->createMock(NotificationService::class);
        $this->projectService = $this->createMock(ProjectService::class);
        // By default, any project is allowed; the assignment guard (#58) is tested separately.
        $this->projectService->method('isProjectAllowedForEmployee')->willReturn(true);
        $this->logger = $this->createMock(LoggerInterface::class);
        $this->l = $this->createMock(IL10N::class);
        $this->l->method('t')->willReturnCallback(
            fn(string $text, array $parameters = []): string => $parameters === [] ? $text : vsprintf($text, $parameters)
        );

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
            $this->employeeMapper,
            $this->absenceMapper,
            $this->auditLogService,
            $this->notificationService,
            $this->projectService,
            $this->logger,
            $this->l
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
     * §4 ArbZG knüpft an die ARBEITSZEIT (netto) an. Auf die Brutto-Anwesenheit
     * umgerechnet liegen die Schwellen bei 6h und (9h + break6h = 9,5h): (#403)
     * - ≤6h Anwesenheit: keine Pause (0 min)
     * - >6h bis 9,5h Anwesenheit: 30 min (Arbeitszeit ≤ 9h)
     * - >9,5h Anwesenheit: 45 min
     */
    public static function breakSuggestionProvider(): array {
        return [
            // No break required (≤6h)
            ['08:00', '14:00', 0],  // 6h exactly
            ['09:00', '13:00', 0],  // 4h
            ['08:00', '12:00', 0],  // 4h
            ['10:00', '15:00', 0],  // 5h
            ['07:00', '13:00', 0],  // 6h exactly

            // 30 min break (>6h gross, up to 9h + 30min = 9.5h gross)
            ['08:00', '14:01', 30], // 6h 1min -> 30min break
            ['08:00', '15:00', 30], // 7h
            ['07:00', '15:00', 30], // 8h
            ['08:00', '17:00', 30], // 9h exactly
            ['06:00', '14:30', 30], // 8.5h
            ['08:00', '17:01', 30], // 9h 1min -> 30 (Arbeitszeit mit 30min = 8h31 ≤ 9h) #403
            ['07:43', '16:44', 30], // Sören Schneider, gemeldeter Fall (9h01) -> 30 #403
            ['08:00', '17:30', 30], // 9h30 gross = obere Grenze -> 30 #403

            // 45 min break (>9.5h gross)
            ['08:00', '17:31', 45], // 9h31 gross -> 45 (mit 30min Pause wäre Arbeitszeit 9h01 > 9h) #403
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

            // >6h gross, up to 9h + 30min = 570 -> need 30min break (#403)
            [361, 0, false],  // 6h 1min, 0min break
            [361, 29, false], // 6h 1min, 29min break
            [361, 30, true],  // 6h 1min, 30min break
            [480, 30, true],  // 8h, 30min break
            [540, 30, true],  // 9h, 30min break
            [541, 30, true],  // 9h 1min, 30min -> valid (Arbeitszeit 8h31 ≤ 9h) #403
            [541, 44, true],  // 9h 1min, 44min -> valid #403
            [541, 29, false], // 9h 1min, 29min -> invalid (unter 30) #403
            [570, 30, true],  // 9h30 gross = obere Grenze -> 30 genügt #403
            [570, 0, false],  // 9h30 gross, 0min -> invalid

            // >9.5h gross (>570) -> need 45min break (#403)
            [571, 30, false], // 9h31 gross, 30min -> invalid (need 45)
            [571, 44, false], // 9h31 gross, 44min -> invalid
            [571, 45, true],  // 9h31 gross, 45min -> valid
            [600, 45, true],  // 10h, 45min break
            [600, 60, true],  // 10h, 60min break
            [600, 30, false], // 10h, 30min -> invalid
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

    // --- #148: closed-month locking + HR correction override ---

    public function testIsMonthLockedPastYearIsAlwaysLocked(): void {
        $pastYear = (int)(new DateTime())->format('Y') - 1;
        // A past calendar year is locked regardless of approval status.
        $this->assertTrue($this->service->isMonthLocked(1, $pastYear, 6));
    }

    public function testIsMonthLockedCurrentYearApprovedIsLocked(): void {
        $year = (int)(new DateTime())->format('Y');
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 0, 'submitted' => 0, 'approved' => 3, 'rejected' => 0]);
        $this->assertTrue($this->service->isMonthLocked(1, $year, 3));
    }

    public function testIsMonthLockedCurrentYearNotApprovedIsOpen(): void {
        $year = (int)(new DateTime())->format('Y');
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 1, 'submitted' => 1, 'approved' => 2, 'rejected' => 0]);
        $this->assertFalse($this->service->isMonthLocked(1, $year, 3));
    }

    public function testRequireReasonReturnsNullWhenNoLockedMonths(): void {
        $this->assertNull($this->service->requireReasonForLockedMonths([], true, null));
        $this->assertNull($this->service->requireReasonForLockedMonths([], false, 'whatever'));
    }

    public function testRequireReasonBlocksEmployeeOnLockedMonth(): void {
        $this->expectException(ValidationException::class);
        $this->service->requireReasonForLockedMonths([[2025, 5]], false, null);
    }

    public function testRequireReasonRejectsTooShortReasonForHrOverride(): void {
        $this->expectException(ValidationException::class);
        $this->service->requireReasonForLockedMonths([[2025, 5]], true, 'zu kurz'); // 7 chars
    }

    public function testRequireReasonReturnsTrimmedReasonForHrOverride(): void {
        $reason = $this->service->requireReasonForLockedMonths([[2025, 5]], true, '  Stempelfehler korrigiert  ');
        $this->assertSame('Stempelfehler korrigiert', $reason);
    }

    public function testLockedMonthsInRangeListsEachLockedMonth(): void {
        $pastYear = (int)(new DateTime())->format('Y') - 1;
        $start = new DateTime("$pastYear-01-15");
        $end = new DateTime("$pastYear-03-10");
        $this->assertSame(
            [[$pastYear, 1], [$pastYear, 2], [$pastYear, 3]],
            $this->service->lockedMonthsInRange(1, $start, $end)
        );
    }

    public function testAuditReasonPrefersEnforcedReason(): void {
        $this->assertSame('Pflichtgrund', $this->service->auditReason('Pflichtgrund', true, 'anderer'));
    }

    public function testAuditReasonRecordsHrReasonOnOpenMonth(): void {
        $this->assertSame('Stempelfehler korrigiert', $this->service->auditReason(null, true, '  Stempelfehler korrigiert  '));
    }

    public function testAuditReasonIgnoresReasonWithoutOverride(): void {
        $this->assertNull($this->service->auditReason(null, false, 'kein Override'));
    }

    public function testAuditReasonNullWhenNoReason(): void {
        $this->assertNull($this->service->auditReason(null, true, '  '));
        $this->assertNull($this->service->auditReason(null, true, null));
    }

    // --- #296: delete() respects the closed-month lock ---

    private function makePastYearEntry(): TimeEntry {
        $entry = new TimeEntry();
        $entry->setId(99);
        $entry->setEmployeeId(1);
        $entry->setDate(new DateTime(((int)(new DateTime())->format('Y') - 1) . '-06-15'));
        $entry->setStatus(TimeEntry::STATUS_DRAFT);
        return $entry;
    }

    public function testDeleteBlocksEmployeeInLockedMonth(): void {
        // A DRAFT entry in a past (locked) year must not be deletable without HR override.
        $this->timeEntryMapper->method('find')->willReturn($this->makePastYearEntry());
        $this->expectException(ValidationException::class);
        $this->service->delete(99, 'user1', null, false);
    }

    public function testDeleteRequiresReasonForHrInLockedMonth(): void {
        $this->timeEntryMapper->method('find')->willReturn($this->makePastYearEntry());
        $this->expectException(ValidationException::class);
        $this->service->delete(99, 'admin', null, true); // override but no reason
    }

    public function testDeleteApprovedStillBlockedForHrInOpenMonth(): void {
        // An APPROVED entry in the current (not fully approved → not locked) month
        // must stay undeletable even for HR — the override only bypasses the block
        // for closed months. HR should reopen/reject instead.
        $year = (int)(new DateTime())->format('Y');
        $entry = new TimeEntry();
        $entry->setId(99);
        $entry->setEmployeeId(1);
        $entry->setDate(new DateTime("$year-" . (new DateTime())->format('m') . '-10'));
        $entry->setStatus(TimeEntry::STATUS_APPROVED);
        $this->timeEntryMapper->method('find')->willReturn($entry);
        // Month is NOT fully approved → not locked.
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 1, 'submitted' => 0, 'approved' => 1, 'rejected' => 0]);
        $this->expectException(ForbiddenException::class);
        $this->service->delete(99, 'admin', 'genug lange Begründung', true);
    }

    /**
     * Project assignment guard (#58): an employee who is not assigned to a
     * restricted project must be rejected when booking on it. The guard runs
     * after the basic time validation, so we use a valid past entry that clears
     * all other checks (no future date, no overlap, no absence conflict).
     */
    public function testCreateRejectsBookingOnUnassignedProject(): void {
        $projectService = $this->createMock(ProjectService::class);
        $projectService->method('isProjectAllowedForEmployee')->willReturn(false);
        $service = new TimeEntryService(
            $this->timeEntryMapper,
            $this->settingsMapper,
            $this->employeeMapper,
            $this->absenceMapper,
            $this->auditLogService,
            $this->notificationService,
            $projectService,
            $this->logger,
            $this->l,
        );
        // No overlapping entries and no absence on that day.
        $this->timeEntryMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([]);
        // The booking must never be persisted when the guard rejects it.
        $this->timeEntryMapper->expects($this->never())->method('insert');

        try {
            $service->create(5, '2020-01-06', '08:00', '14:00', 0, 7);
            $this->fail('Expected ValidationException for unassigned project');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('projectId', $e->getErrors());
        }
    }

    /**
     * Required-field rule (#329): with "Projekt erforderlich" on, a booking
     * without a project must be rejected and never persisted.
     */
    public function testCreateRejectsMissingProjectWhenRequired(): void {
        $service = $this->serviceWithRequiredFields(true, false);
        $this->timeEntryMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->timeEntryMapper->expects($this->never())->method('insert');

        // Both null and 0 (an empty form value binds to 0) count as "no project".
        foreach ([null, 0] as $noProject) {
            try {
                $service->create(5, '2020-01-06', '08:00', '14:00', 0, $noProject, 'Doku');
                $this->fail('Expected ValidationException for missing project');
            } catch (ValidationException $e) {
                $this->assertTrue($e->hasError('projectId'));
                $this->assertFalse($e->hasError('description'));
            }
        }
    }

    /**
     * Required-field rule (#329): with "Beschreibung erforderlich" on, a blank
     * description must be rejected (whitespace does not satisfy the rule).
     */
    public function testCreateRejectsBlankDescriptionWhenRequired(): void {
        $service = $this->serviceWithRequiredFields(false, true);
        $this->timeEntryMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->timeEntryMapper->expects($this->never())->method('insert');

        try {
            $service->create(5, '2020-01-06', '08:00', '14:00', 0, 7, '   ');
            $this->fail('Expected ValidationException for blank description');
        } catch (ValidationException $e) {
            $this->assertTrue($e->hasError('description'));
        }
    }

    /**
     * Required-field rule (#329): update() also rejects a missing project when
     * the rule is active, and must never persist the change.
     */
    public function testUpdateRejectsMissingProjectWhenRequired(): void {
        $service = $this->serviceWithRequiredFields(true, false);
        $entry = new TimeEntry();
        $entry->setId(42);
        $entry->setEmployeeId(5);
        $entry->setDate(new DateTime('2020-01-06'));
        $entry->setStatus(TimeEntry::STATUS_DRAFT);
        $this->timeEntryMapper->method('find')->willReturn($entry);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->timeEntryMapper->expects($this->never())->method('update');

        try {
            $service->update(42, '2020-01-06', '08:00', '14:00', 0, null, 'Doku');
            $this->fail('Expected ValidationException for missing project');
        } catch (ValidationException $e) {
            $this->assertTrue($e->hasError('projectId'));
            $this->assertFalse($e->hasError('description'));
        }
    }

    /**
     * Required-field rule (#329): update() also rejects a blank description when
     * the rule is active, and must never persist the change.
     */
    public function testUpdateRejectsBlankDescriptionWhenRequired(): void {
        $service = $this->serviceWithRequiredFields(false, true);
        $entry = new TimeEntry();
        $entry->setId(42);
        $entry->setEmployeeId(5);
        $entry->setDate(new DateTime('2020-01-06'));
        $entry->setStatus(TimeEntry::STATUS_DRAFT);
        $this->timeEntryMapper->method('find')->willReturn($entry);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->timeEntryMapper->expects($this->never())->method('update');

        try {
            $service->update(42, '2020-01-06', '08:00', '14:00', 0, 7, '   ');
            $this->fail('Expected ValidationException for blank description');
        } catch (ValidationException $e) {
            $this->assertTrue($e->hasError('description'));
        }
    }

    private function serviceWithRequiredFields(bool $requireProject, bool $requireDescription, bool $hasSelectableProject = true): TimeEntryService {
        $settings = $this->createMock(CompanySettingMapper::class);
        $settings->method('getValueAsBool')->willReturnCallback(fn(string $key): bool => match ($key) {
            CompanySetting::KEY_REQUIRE_PROJECT => $requireProject,
            CompanySetting::KEY_REQUIRE_DESCRIPTION => $requireDescription,
            default => false,
        });
        $settings->method('getValueAsInt')->willReturnCallback(fn(string $key): int => match ($key) {
            CompanySetting::KEY_MIN_BREAK_MINUTES_6H => 30,
            CompanySetting::KEY_MIN_BREAK_MINUTES_9H => 45,
            default => 0,
        });
        $settings->method('getValueAsFloat')->willReturnCallback(
            fn(string $key): float => $key === CompanySetting::KEY_MAX_DAILY_HOURS ? 12.0 : 0.0
        );
        // "Projekt erforderlich" only bites when the employee actually has a
        // selectable project (#329 follow-up).
        $projectService = $this->createMock(ProjectService::class);
        $projectService->method('isProjectAllowedForEmployee')->willReturn(true);
        $projectService->method('getProjectsForEmployee')
            ->willReturn($hasSelectableProject ? [new \OCA\WorkTime\Db\Project()] : []);
        return new TimeEntryService(
            $this->timeEntryMapper,
            $settings,
            $this->employeeMapper,
            $this->absenceMapper,
            $this->auditLogService,
            $this->notificationService,
            $projectService,
            $this->logger,
            $this->l,
        );
    }

    /**
     * #329 follow-up: with "Projekt erforderlich" on but the employee having no
     * selectable project, a booking without a project must still succeed (no
     * projectId error) — otherwise they could not book at all.
     */
    public function testCreateAllowsMissingProjectWhenEmployeeHasNoProjects(): void {
        $service = $this->serviceWithRequiredFields(true, false, false);
        $this->timeEntryMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([]);
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 0, 'submitted' => 0, 'approved' => 0, 'rejected' => 0]);
        $this->timeEntryMapper->method('insert')->willReturnArgument(0);

        // Must not throw a ValidationException for the missing project.
        $entry = $service->create(5, '2026-06-10', '08:00', '14:00', 0, null, null);
        $this->assertNull($entry->getProjectId());
    }

    // ---------------------------------------------------------------------
    // #338: day-level break & max-daily-hours warnings
    // ---------------------------------------------------------------------

    private function makeEntry(string $start, string $end, int $break): TimeEntry {
        $entry = new TimeEntry();
        $entry->setDate(new DateTime('2026-04-08'));
        $entry->setStartTime(DateTime::createFromFormat('H:i', $start));
        $entry->setEndTime(DateTime::createFromFormat('H:i', $end));
        $entry->setBreakMinutes($break);
        return $entry;
    }

    /**
     * #338: a day split into two short entries without any break (and without a
     * gap between them) still exceeds 6h of working time and must warn about the
     * missing §4 ArbZG break — even though no single entry would.
     */
    public function testDayWarningsSplitWithoutBreakWarns(): void {
        // 06:00–11:30 (5.5h) + 11:30–14:00 (2.5h) = 8h gross, no break, no gap.
        $warnings = $this->service->dayWarnings([
            $this->makeEntry('06:00', '11:30', 0),
            $this->makeEntry('11:30', '14:00', 0),
        ]);

        $this->assertCount(1, $warnings);
        $this->assertStringContainsString('Mindestpause', $warnings[0]);
    }

    /**
     * #338: the same 8h day, but split with a 30 min gap between the entries —
     * the gap counts as a break, so no warning is raised.
     */
    public function testDayWarningsSplitWithGapIsClean(): void {
        // 06:00–11:30 + 12:00–14:30 → 8h gross, 30 min gap = break taken.
        $warnings = $this->service->dayWarnings([
            $this->makeEntry('06:00', '11:30', 0),
            $this->makeEntry('12:00', '14:30', 0),
        ]);

        $this->assertSame([], $warnings);
    }

    /**
     * #338: a single 8.5h entry with the recorded 30 min break is compliant and
     * must not warn.
     */
    public function testDayWarningsRecordedBreakIsClean(): void {
        // 06:00–14:30 = 8.5h gross, 30 min recorded break.
        $warnings = $this->service->dayWarnings([
            $this->makeEntry('06:00', '14:30', 30),
        ]);

        $this->assertSame([], $warnings);
    }

    /**
     * #403: two SEAMLESS entries (no gap) totalling 9h01 gross with a 30 min
     * break are compliant — §4 ties the threshold to the working time, and
     * 8h31 net ≤ 9h only requires 30 min. Before #403 the day-level check used
     * the gross attendance and falsely demanded 45 min, raising a warning.
     */
    public function testDayWarningsSeamlessNineHourBandWith30MinIsClean(): void {
        // 08:00–12:00 + 12:00–17:01 = 9h01 gross, no gap, 30 min recorded break.
        $warnings = $this->service->dayWarnings([
            $this->makeEntry('08:00', '12:00', 30),
            $this->makeEntry('12:00', '17:01', 0),
        ]);

        $this->assertSame([], $warnings);
    }

    /**
     * #403: the same seamless split but totalling 9h31 gross with only 30 min
     * break must still warn — the net working time would exceed 9h, so 45 min
     * are required.
     */
    public function testDayWarningsSeamlessAboveNineAndAHalfStillWarns(): void {
        // 08:00–12:00 + 12:00–17:31 = 9h31 gross, no gap, 30 min recorded break.
        $warnings = $this->service->dayWarnings([
            $this->makeEntry('08:00', '12:00', 30),
            $this->makeEntry('12:00', '17:31', 0),
        ]);

        $this->assertCount(1, $warnings);
        $this->assertStringContainsString('Mindestpause', $warnings[0]);
    }

    /**
     * #338: a day whose total exceeds the configured maximum daily hours (12h in
     * the test settings) warns — break is satisfied here so only the max-hours
     * warning is expected.
     */
    public function testDayWarningsMaxDailyHoursWarns(): void {
        // 06:00–19:00 = 13h gross with the required 45 min break → only max-hours.
        $warnings = $this->service->dayWarnings([
            $this->makeEntry('06:00', '19:00', 45),
        ]);

        $this->assertCount(1, $warnings);
        $this->assertStringContainsString('Maximale tägliche Arbeitszeit', $warnings[0]);
    }

    /**
     * #338: a day at or below 6h of working time needs no break and stays clean.
     */
    public function testDayWarningsShortDayIsClean(): void {
        $warnings = $this->service->dayWarnings([
            $this->makeEntry('08:00', '14:00', 0), // 6h exactly
        ]);

        $this->assertSame([], $warnings);
    }

    /**
     * #338: an empty day yields no warnings.
     */
    public function testDayWarningsEmptyDay(): void {
        $this->assertSame([], $this->service->dayWarnings([]));
    }

    // ---------------------------------------------------------------------
    // #344: cross-month approval inbox (submitted months)
    // ---------------------------------------------------------------------

    private function submittedEntry(int $employeeId, string $date, int $workMinutes, string $submittedAt): TimeEntry {
        $entry = new TimeEntry();
        $entry->setEmployeeId($employeeId);
        $entry->setDate(new DateTime($date));
        $entry->setWorkMinutes($workMinutes);
        $entry->setStatus(TimeEntry::STATUS_SUBMITTED);
        $entry->setSubmittedAt(new DateTime($submittedAt));
        return $entry;
    }

    private function makeEmployee(int $id, string $userId, string $first, string $last): Employee {
        $e = new Employee();
        $e->setId($id);
        $e->setUserId($userId);
        $e->setFirstName($first);
        $e->setLastName($last);
        return $e;
    }

    /**
     * #344: submitted entries are grouped per (employee, year, month) and the
     * resulting months are returned oldest-submission-first (FIFO).
     */
    public function testFindSubmittedMonthsGroupsByMonthAndSortsFifo(): void {
        $e1 = $this->makeEmployee(1, 'u1', 'Ben', 'Conradi');
        $e2 = $this->makeEmployee(2, 'u2', 'Carla', 'Adam');
        $this->employeeMapper->method('find')
            ->willReturnCallback(fn(int $id): Employee => $id === 1 ? $e1 : $e2);

        $entries = [
            $this->submittedEntry(1, '2026-04-10', 480, '2026-05-02T10:00:00+00:00'),
            $this->submittedEntry(1, '2026-03-05', 300, '2026-04-01T09:00:00+00:00'),
            $this->submittedEntry(1, '2026-03-06', 180, '2026-04-01T09:30:00+00:00'),
            $this->submittedEntry(2, '2026-04-15', 420, '2026-05-03T08:00:00+00:00'),
        ];
        $this->timeEntryMapper->method('findSubmittedByEmployeeIds')
            ->with([1, 2])->willReturn($entries);

        $result = $this->service->findSubmittedMonths([1, 2]);

        // Three submitted months: (1,März), (1,April), (2,April).
        $this->assertCount(3, $result);

        // FIFO: März (submitted 2026-04-01) first, aggregated 300+180 over 2 entries.
        $this->assertSame(1, $result[0]['employeeId']);
        $this->assertSame(2026, $result[0]['year']);
        $this->assertSame(3, $result[0]['month']);
        $this->assertSame(480, $result[0]['actualMinutes']);
        $this->assertSame(2, $result[0]['entryCount']);
        $this->assertSame('Ben Conradi', $result[0]['employeeName']);
        $this->assertSame('u1', $result[0]['employeeUserId']);

        // Last by submission time: Carla's April (2026-05-03).
        $this->assertSame(2, $result[2]['employeeId']);
        $this->assertSame(4, $result[2]['month']);
    }

    /**
     * #344: no visible employees → empty inbox, no query side effects.
     */
    public function testFindSubmittedMonthsEmptyWhenNoEmployees(): void {
        $this->timeEntryMapper->method('findSubmittedByEmployeeIds')
            ->with([])->willReturn([]);
        $this->assertSame([], $this->service->findSubmittedMonths([]));
    }

    /**
     * #437: The §3 ArbZG max-daily-hours warning must evaluate NET working time
     * (after breaks), not the gross presence span. 08:00–20:40 minus 45 min
     * break is 11:55 net — within the 12h cap — so no warning may fire, even
     * though the gross span (12:40) exceeds it.
     */
    public function testDayMaxHoursWarningUsesNetNotGross(): void {
        $warnings = $this->service->dayWarnings([
            $this->makeEntry('08:00', '20:40', 45),
        ]);

        $maxWarnings = array_filter(
            $warnings,
            static fn(string $w): bool => str_contains($w, 'Maximale tägliche Arbeitszeit')
        );
        $this->assertCount(
            0,
            $maxWarnings,
            'Net time (11:55) is within the 12h cap; the gross span must not trigger the warning'
        );
    }

    /**
     * #437: When the NET working time actually exceeds the cap, the warning must
     * still fire and report the net hours. 06:00–19:00 minus 45 min break =
     * 12:15 net (12.25 h), which exceeds the 12h cap.
     */
    public function testDayMaxHoursWarningFiresOnNetExceedance(): void {
        $warnings = $this->service->dayWarnings([
            $this->makeEntry('06:00', '19:00', 45),
        ]);

        $maxWarnings = array_values(array_filter(
            $warnings,
            static fn(string $w): bool => str_contains($w, 'Maximale tägliche Arbeitszeit')
        ));
        $this->assertCount(1, $maxWarnings, 'Net 12:15 exceeds the 12h cap → warning expected');
        $this->assertStringContainsString(
            '12.25 Std. erfasst',
            $maxWarnings[0],
            'The warning must report NET hours (12.25), not gross (13)'
        );
    }
}
