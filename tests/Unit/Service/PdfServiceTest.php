<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\Holiday;
use OCA\WorkTime\Db\ProjectMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCP\Files\IRootFolder;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;

/**
 * Covers the gap-free day overview of the monthly PDF report (#318):
 * absences shown in the day row, holidays, weekends and blank workdays.
 */
class PdfServiceTest extends TestCase {

    private PdfService $service;
    private ReflectionMethod $buildDayRows;
    private ReflectionMethod $buildDayRowsBetween;

    protected function setUp(): void {
        $this->service = new PdfService(
            $this->createMock(CompanySettingsService::class),
            $this->createMock(IRootFolder::class),
            $this->createMock(ProjectMapper::class),
            $this->createMock(WorkScheduleService::class),
            $this->l10n('de', 'de_DE'),
        );
        $this->buildDayRows = new ReflectionMethod(PdfService::class, 'buildDayRows');
        $this->buildDayRows->setAccessible(true);
        $this->buildDayRowsBetween = new ReflectionMethod(PdfService::class, 'buildDayRowsBetween');
        $this->buildDayRowsBetween->setAccessible(true);
    }

    /** IL10N double backed by the shipped catalog; German returns the source strings. */
    private function l10n(string $lang, string $locale): IL10N {
        $catalog = $lang === 'de'
            ? []
            : json_decode((string)file_get_contents(__DIR__ . "/../../../l10n/$lang.json"), true)['translations'];
        $l = $this->createMock(IL10N::class);
        $l->method('t')->willReturnCallback(
            static fn (string $text, $params = []) => vsprintf($catalog[$text] ?? $text, (array)$params)
        );
        $l->method('getLanguageCode')->willReturn($lang);
        $l->method('getLocaleCode')->willReturn($locale);
        return $l;
    }

    /**
     * @return array<string, array<int, array<string, mixed>>> day (d.m.Y) => rows,
     *   with the date carried forward across multi-row days.
     */
    private function rowsByDay(array $timeEntries, array $absences, array $holidays, int $year, int $month, array $projectNames = []): array {
        $rows = $this->buildDayRows->invoke($this->service, $timeEntries, $absences, $holidays, $year, $month, $projectNames);
        $byDay = [];
        $current = null;
        foreach ($rows as $row) {
            if ($row['date'] !== '') {
                $current = $row['date'];
            }
            $byDay[$current][] = $row;
        }
        return $byDay;
    }

    /**
     * Same as rowsByDay() but for an arbitrary [start, end] range (#102).
     */
    private function rowsByDayBetween(array $timeEntries, array $absences, array $holidays, string $start, string $end, array $projectNames = []): array {
        $rows = $this->buildDayRowsBetween->invoke(
            $this->service, $timeEntries, $absences, $holidays, new DateTime($start), new DateTime($end), $projectNames
        );
        $byDay = [];
        $current = null;
        foreach ($rows as $row) {
            if ($row['date'] !== '') {
                $current = $row['date'];
            }
            $byDay[$current][] = $row;
        }
        return $byDay;
    }

    public function testRangeSpanningMonthBoundaryIsGapFree(): void {
        // 30.05.–02.06.2026: a custom period crossing the month boundary must
        // produce exactly one (and only one) day group per calendar day (#102).
        $entries = [$this->entry('2026-06-01', '09:00', '16:45', 30, 435, 7, 'Bugfixing')];

        $byDay = $this->rowsByDayBetween($entries, [], [], '2026-05-30', '2026-06-02', [7 => 'Mobile App']);

        $this->assertSame(['30.05.2026', '31.05.2026', '01.06.2026', '02.06.2026'], array_keys($byDay));
        $row = $byDay['01.06.2026'][0];
        $this->assertSame('09:00', $row['start']);
        $this->assertSame('Mobile App', $row['project']);
    }

    public function testEmergencyWorkOnVacationDayIsMarkedAndVacationShown(): void {
        // #626: Notarbeit an einem vollen genehmigten Urlaubstag — der Eintrag wird
        // als Notarbeit (ausstehende Freigabe) markiert, und die Urlaubszeile bleibt
        // sichtbar, damit "Urlaub + Notarbeit" im Report unterscheidbar ist.
        $entry = $this->entry('2026-06-01', '18:00', '20:00', 0, 120, null, 'Server-Ausfall');
        $entry->setIsEmergency(1);
        $entry->setEmergencyApproved(0);
        $vacation = $this->absence('vacation', '2026-06-01', '2026-06-01', 'approved', 1.0);

        $rows = $this->rowsByDay([$entry], [$vacation], [], 2026, 6)['01.06.2026'];

        $this->assertStringContainsString('Notarbeit', $rows[0]['note']);
        $this->assertStringContainsString('wartet auf Freigabe', $rows[0]['note']);
        $this->assertStringContainsString('Server-Ausfall', $rows[0]['note']);
        $notes = array_map(static fn ($r) => $r['note'], $rows);
        $this->assertNotEmpty(array_filter($notes, static fn ($n) => str_contains($n, 'Urlaub')));
    }

    private function entry(string $date, string $start, string $end, int $break, int $work, ?int $projectId, string $desc): TimeEntry {
        $e = new TimeEntry();
        $e->setDate(new DateTime($date));
        $e->setStartTime(new DateTime("$date $start"));
        $e->setEndTime(new DateTime("$date $end"));
        $e->setBreakMinutes($break);
        $e->setWorkMinutes($work);
        $e->setProjectId($projectId);
        $e->setDescription($desc);
        return $e;
    }

    private function absence(string $type, string $start, string $end, string $status, float $scope = 1.0): Absence {
        $a = new Absence();
        $a->setType($type);
        $a->setStartDate(new DateTime($start));
        $a->setEndDate(new DateTime($end));
        $a->setStatus($status);
        $a->setScopeValue($scope);
        return $a;
    }

    private function holiday(string $date, string $name): Holiday {
        $h = new Holiday();
        $h->setDate(new DateTime($date));
        $h->setName($name);
        return $h;
    }

    public function testOverviewIsGapFreeWithOneEntryPerCalendarDay(): void {
        // June 2026 has 30 days; with no data every day must still produce a row.
        $byDay = $this->rowsByDay([], [], [], 2026, 6);

        $this->assertCount(30, $byDay);
        $this->assertArrayHasKey('01.06.2026', $byDay);
        $this->assertArrayHasKey('30.06.2026', $byDay);
    }

    public function testFullDayAbsenceShowsTypeInTheDayRow(): void {
        // Vacation 08.–10.06. with no bookings on those days.
        $absences = [$this->absence(Absence::TYPE_VACATION, '2026-06-08', '2026-06-10', Absence::STATUS_APPROVED)];

        $byDay = $this->rowsByDay([], $absences, [], 2026, 6);

        foreach (['08.06.2026', '09.06.2026', '10.06.2026'] as $day) {
            $this->assertCount(1, $byDay[$day]);
            $this->assertSame('Urlaub', $byDay[$day][0]['note']);
            $this->assertSame('-', $byDay[$day][0]['start']);
        }
    }

    public function testPaidAbsenceDayShowsTheCreditedHours(): void {
        $vacation = $this->absence('vacation', '2026-06-01', '2026-06-02', 'approved', 1.0);

        $rows = $this->buildDayRowsBetween->invoke(
            $this->service, [], [$vacation], [], new DateTime('2026-06-01'), new DateTime('2026-06-02'), [], ['2026-06-01' => 252]
        );

        $this->assertSame('4:12 Std.', $rows[0]['work']);
        $this->assertSame('-', $rows[0]['start']);
        $this->assertSame('-', $rows[1]['work'], 'Tag ohne Gutschrift behält den Strich');
    }

    public function testHalfDayAbsenceMarkerRowCarriesTheCredit(): void {
        $entries = [$this->entry('2026-06-01', '08:00', '12:00', 0, 240, null, '')];
        $vacation = $this->absence('vacation', '2026-06-01', '2026-06-01', 'approved', 0.5);

        $rows = $this->buildDayRowsBetween->invoke(
            $this->service, $entries, [$vacation], [], new DateTime('2026-06-01'), new DateTime('2026-06-01'), [], ['2026-06-01' => 240]
        );

        $this->assertSame(['4:00 Std.', '4:00 Std.'], array_column($rows, 'work'));
    }

    public function testBookingShowsTimesAndProject(): void {
        $entries = [$this->entry('2026-06-01', '08:00', '16:00', 30, 450, 2, 'Arbeit')];

        $byDay = $this->rowsByDay($entries, [], [], 2026, 6, [2 => 'Projekt X']);

        $row = $byDay['01.06.2026'][0];
        $this->assertSame('08:00', $row['start']);
        $this->assertSame('Projekt X', $row['project']);
        $this->assertSame('Arbeit', $row['note']);
    }

    public function testHalfDayAbsenceAddsMarkerRowAlongsideBooking(): void {
        // Morning work + afternoon compensatory leave on the same day.
        $entries = [$this->entry('2026-06-15', '08:00', '12:00', 0, 240, null, 'Vormittag')];
        $absences = [$this->absence(Absence::TYPE_COMPENSATORY, '2026-06-15', '2026-06-15', Absence::STATUS_APPROVED, 0.5)];

        $byDay = $this->rowsByDay($entries, $absences, [], 2026, 6);

        $this->assertCount(2, $byDay['15.06.2026']);
        $this->assertSame('Vormittag', $byDay['15.06.2026'][0]['note']);
        $this->assertSame('Freizeitausgleich (halber Tag)', $byDay['15.06.2026'][1]['note']);
        $this->assertSame('-', $byDay['15.06.2026'][1]['start']);
    }

    public function testFullDayAbsenceWithBookingDoesNotAddMarkerRow(): void {
        // Contradictory data (full work + full-day vacation): show only the
        // booking, no confusing "worked + absent" marker row.
        $entries = [$this->entry('2026-06-09', '08:00', '17:00', 30, 480, null, 'Projektarbeit')];
        $absences = [$this->absence(Absence::TYPE_VACATION, '2026-06-09', '2026-06-09', Absence::STATUS_APPROVED)];

        $byDay = $this->rowsByDay($entries, $absences, [], 2026, 6);

        $this->assertCount(1, $byDay['09.06.2026']);
        $this->assertSame('Projektarbeit', $byDay['09.06.2026'][0]['note']);
    }

    public function testRejectedAbsenceIsIgnored(): void {
        // 22.06.2026 is a Monday; a rejected absence must not appear, leaving a
        // blank workday row (empty time cells, not dashes).
        $absences = [$this->absence(Absence::TYPE_VACATION, '2026-06-22', '2026-06-22', Absence::STATUS_REJECTED)];

        $byDay = $this->rowsByDay([], $absences, [], 2026, 6);

        $this->assertCount(1, $byDay['22.06.2026']);
        $this->assertSame('', $byDay['22.06.2026'][0]['note']);
        $this->assertSame('', $byDay['22.06.2026'][0]['start']);
    }

    public function testCancelledAbsenceIsIgnored(): void {
        // Like a rejected absence, a cancelled one must not appear in the day row.
        $absences = [$this->absence(Absence::TYPE_VACATION, '2026-06-22', '2026-06-22', Absence::STATUS_CANCELLED)];

        $byDay = $this->rowsByDay([], $absences, [], 2026, 6);

        $this->assertCount(1, $byDay['22.06.2026']);
        $this->assertSame('', $byDay['22.06.2026'][0]['note']);
        $this->assertSame('', $byDay['22.06.2026'][0]['start']);
    }

    public function testPendingAbsenceIsShown(): void {
        // A still-pending (planned) absence is intentionally visible in the
        // overview — only rejected/cancelled ones are filtered out.
        $absences = [$this->absence(Absence::TYPE_VACATION, '2026-06-22', '2026-06-22', Absence::STATUS_PENDING)];

        $byDay = $this->rowsByDay([], $absences, [], 2026, 6);

        $this->assertSame('Urlaub', $byDay['22.06.2026'][0]['note']);
        $this->assertSame('-', $byDay['22.06.2026'][0]['start']);
    }

    public function testHolidayShowsLabel(): void {
        $holidays = [$this->holiday('2026-06-18', 'Testfeiertag')];

        $byDay = $this->rowsByDay([], [], $holidays, 2026, 6);

        $this->assertSame('Feiertag: Testfeiertag', $byDay['18.06.2026'][0]['note']);
        $this->assertSame('-', $byDay['18.06.2026'][0]['start']);
    }

    public function testWeekendRowHasDashesAndNoLabel(): void {
        // 06.06.2026 is a Saturday: dashes, empty note, grey fill.
        $byDay = $this->rowsByDay([], [], [], 2026, 6);

        $row = $byDay['06.06.2026'][0];
        $this->assertSame('-', $row['start']);
        $this->assertSame('', $row['note']);
        $this->assertTrue($row['fill']);
    }

    public function testEnglishDayRowsAreTranslated(): void {
        $english = $this->l10n('en', 'en_US');
        $absences = [$this->absence(Absence::TYPE_COMPENSATORY, '2026-06-15', '2026-06-15', Absence::STATUS_APPROVED, 0.5)];
        $entries = [$this->entry('2026-06-15', '08:00', '12:00', 0, 240, null, 'Morning')];
        $holidays = [$this->holiday('2026-06-18', 'Test holiday')];

        // The language is chosen per report; generating once switches the service to English.
        $this->service->generateMonthlyReport($this->employee(), 2026, 6, [], [], [], $this->stats(), null, $english);
        $byDay = $this->rowsByDay($entries, $absences, $holidays, 2026, 6);

        $this->assertArrayHasKey('Jun 18, 2026', $byDay);
        $this->assertSame('Thu', $byDay['Jun 18, 2026'][0]['day']);
        $this->assertSame('Public holiday: Test holiday', $byDay['Jun 18, 2026'][0]['note']);
        $this->assertStringEndsWith('(half day)', $byDay['Jun 15, 2026'][1]['note']);
        $this->assertStringNotContainsString('Freizeitausgleich', $byDay['Jun 15, 2026'][1]['note']);
    }

    public function testEnglishMonthlyPdfContainsNoGermanFixedText(): void {
        $employee = $this->employee();
        $employee->setFirstName('Lea');
        $employee->setLastName('Test');
        $absences = [$this->absence(Absence::TYPE_VACATION, '2026-06-08', '2026-06-09', Absence::STATUS_APPROVED)];
        $absences[0]->setDays('2.00');
        $approval = ['submittedBy' => $employee, 'submittedAt' => new DateTime('2026-07-01 09:00'), 'approvedBy' => $employee, 'approvedAt' => new DateTime('2026-07-02 10:30')];

        $text = $this->pdfText($this->service->generateMonthlyReport(
            $employee, 2026, 6, [], $absences, [], $this->stats(), $approval, $this->l10n('en', 'en_US')
        ));

        foreach (['Timesheet', 'June 2026', 'Summary', 'Working days in month:', 'Approval record', 'Vacation', 'Place, date'] as $english) {
            $this->assertStringContainsString($english, $text);
        }
        foreach (['Arbeitszeitnachweis', 'Zusammenfassung', 'Arbeitstage', 'Mitarbeiter', 'Bemerkung', 'Urlaub', 'Genehmigt', 'Std.', 'Tage', 'Uhr'] as $german) {
            $this->assertStringNotContainsString($german, $text);
        }
    }

    public function testGermanStaysTheDefaultLanguage(): void {
        $this->service->generateMonthlyReport($this->employee(), 2026, 6, [], [], [], $this->stats(), null, $this->l10n('en', 'en_US'));

        // A report without an explicit language falls back to the request language again.
        $text = $this->pdfText($this->service->generateMonthlyReport($this->employee(), 2026, 6, [], [], [], $this->stats()));

        $this->assertStringContainsString('Arbeitszeitnachweis', $text);
        $this->assertStringNotContainsString('Timesheet', $text);
    }

    private function employee(): Employee {
        $employee = new Employee();
        $employee->setId(1);
        return $employee;
    }

    private function stats(): array {
        return [
            'workingDays' => 22, 'holidayCount' => 0, 'absenceDays' => 2.0, 'entryCount' => 0,
            'adjustedTargetMinutes' => 9600, 'actualMinutes' => 0, 'overtimeMinutes' => -9600,
        ];
    }

    /** Uncompressed content streams; dropping the UTF-16 high bytes leaves ASCII labels readable. */
    private function pdfText(string $pdf): string {
        preg_match_all('/stream\r?\n(.*?)\r?\nendstream/s', $pdf, $matches);
        $text = '';
        foreach ($matches[1] as $stream) {
            $text .= @gzuncompress($stream) ?: $stream;
        }
        return str_replace("\0", '', $text);
    }

    // --- Archive path sanitising (#537) -----------------------------------

    private function archiveFolderPath(string $lastName, string $firstName, int $year = 2026): string {
        $employee = new Employee();
        $employee->setLastName($lastName);
        $employee->setFirstName($firstName);

        $method = new ReflectionMethod(PdfService::class, 'buildArchiveFolderPath');
        $method->setAccessible(true);

        return $method->invoke($this->service, '/WorkTime/Archiv', $employee, $year);
    }

    public function testArchivePathKeepsOrdinaryNames(): void {
        $this->assertSame(
            'WorkTime/Archiv/2026/Testfall_Lea',
            $this->archiveFolderPath('Testfall', 'Lea')
        );
    }

    public function testArchivePathKeepsUmlautsReadable(): void {
        // The folder is meant to be found by a human in the Files app.
        $this->assertSame(
            'WorkTime/Archiv/2026/Müller-Lüdenscheidt_Jörg',
            $this->archiveFolderPath('Müller-Lüdenscheidt', 'Jörg')
        );
    }

    public function testArchivePathStripsTraversalSequences(): void {
        $path = $this->archiveFolderPath('../../etc', 'passwd');

        $this->assertStringNotContainsString('..', $path);
        $this->assertSame('WorkTime/Archiv/2026/______etc_passwd', $path);
    }

    public function testArchivePathStripsSlashes(): void {
        $path = $this->archiveFolderPath('Fremd/Ordner', 'Lea');

        // Exactly two slashes after the archive root: year and employee folder.
        $this->assertSame('WorkTime/Archiv/2026/Fremd_Ordner_Lea', $path);
    }

    public function testArchivePathNeverCollapsesToEmptySegment(): void {
        // A name made only of stripped characters would otherwise move the file
        // one directory level up.
        // "..." becomes three underscores, "/" becomes one, plus the separator.
        $path = $this->archiveFolderPath('...', '/');

        $this->assertSame('WorkTime/Archiv/2026/_____', $path);
        $this->assertStringNotContainsString('//', $path);
    }
}
