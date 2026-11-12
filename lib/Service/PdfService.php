<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\Holiday;
use OCA\WorkTime\Db\ProjectMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException as FilesNotFoundException;
use OCP\IL10N;
use TCPDF;

class PdfService {

    private const FONT_FAMILY = 'freesans';
    private const FONT_SIZE_NORMAL = 10;
    private const FONT_SIZE_SMALL = 8;
    private const FONT_SIZE_TITLE = 14;
    private const FONT_SIZE_HEADER = 12;

    private IL10N $l;
    private ReportFormatter $fmt;

    public function __construct(
        private CompanySettingsService $settingsService,
        private IRootFolder $rootFolder,
        private ProjectMapper $projectMapper,
        private WorkScheduleService $workScheduleService,
        private IL10N $defaultL10n,
    ) {
        $this->useLanguage(null);
    }

    /** Null means the language of the current request; the archive passes its own. */
    private function useLanguage(?IL10N $l): void {
        $this->l = $l ?? $this->defaultL10n;
        $this->fmt = new ReportFormatter($this->l);
    }

    /**
     * Generate a monthly time report PDF
     *
     * @param Employee $employee
     * @param int $year
     * @param int $month
     * @param TimeEntry[] $timeEntries
     * @param Absence[] $absences
     * @param Holiday[] $holidays
     * @param array $statistics
     * @param array|null $approvalInfo Optional approval info: ['approvedBy' => Employee, 'approvedAt' => DateTime]
     * @return string PDF content
     */
    public function generateMonthlyReport(
        Employee $employee,
        int $year,
        int $month,
        array $timeEntries,
        array $absences,
        array $holidays,
        array $statistics,
        ?array $approvalInfo = null,
        ?IL10N $l = null
    ): string {
        $this->useLanguage($l);
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');
        $periodLabel = $this->fmt->monthYear($year, $month);

        return $this->renderReport($employee, $periodLabel, $startDate, $endDate, $timeEntries, $absences, $holidays, $statistics, $approvalInfo, $this->l->t('Arbeitstage im Monat:'));
    }

    /**
     * Generate an Arbeitszeitnachweis PDF for an arbitrary inclusive [start, end]
     * range (#102 custom period, e.g. the 20th to the 20th).
     */
    public function generateRangeReport(
        Employee $employee,
        DateTime $startDate,
        DateTime $endDate,
        array $timeEntries,
        array $absences,
        array $holidays,
        array $statistics,
        ?array $approvalInfo = null,
        ?IL10N $l = null
    ): string {
        $this->useLanguage($l);
        $periodLabel = $this->fmt->date($startDate) . ' – ' . $this->fmt->date($endDate);
        return $this->renderReport($employee, $periodLabel, $startDate, $endDate, $timeEntries, $absences, $holidays, $statistics, $approvalInfo, $this->l->t('Arbeitstage im Zeitraum:'));
    }

    /**
     * Shared rendering for both the monthly and the custom-period timesheet.
     */
    private function renderReport(
        Employee $employee,
        string $periodLabel,
        DateTime $startDate,
        DateTime $endDate,
        array $timeEntries,
        array $absences,
        array $holidays,
        array $statistics,
        ?array $approvalInfo,
        string $workingDaysLabel
    ): string {
        $pdf = $this->createPdf();

        // Header
        $this->addHeader($pdf, $employee, $periodLabel, $startDate);

        // Time entries table
        $this->addTimeEntriesTable($pdf, $timeEntries, $absences, $holidays, $startDate, $endDate, $statistics['paidAbsenceByDay'] ?? []);

        // Absences section
        if (!empty($absences)) {
            $this->addAbsencesSection($pdf, $absences);
        }

        // Summary
        $this->addSummary($pdf, $employee, $statistics, $workingDaysLabel);

        // Signature section
        $this->addSignatureSection($pdf);

        // Approval info section (if provided)
        if ($approvalInfo !== null) {
            $this->addApprovalInfoSection($pdf, $approvalInfo);
        }

        return $pdf->Output('', 'S');
    }

    /**
     * Generate a project evaluation PDF (#57): individual bookings over a period,
     * usable as a customer proof. Landscape for the wide table.
     *
     * @param string $label Period label (e.g. "06/2026", "Q2 2026", "2026")
     * @param array<array{date: string, projectName: ?string, customer: ?string, employeeName: ?string, minutes: int, description: ?string, isBillable: bool}> $entries
     * @param array{totalMinutes: int, billableMinutes: int} $totals
     * @return string PDF content
     */
    public function generateProjectEvaluation(string $label, array $entries, array $totals, array $filter = [], ?IL10N $l = null): string {
        $this->useLanguage($l);
        $pdf = new TCPDF('L', 'mm', 'A4', true, 'UTF-8', false);
        $companyName = $this->settingsService->getCompanyName() ?: $this->l->t('Projektauswertung');
        $pdf->SetCreator('WorkTime Nextcloud App');
        $pdf->SetAuthor($companyName);
        $pdf->SetTitle($this->l->t('Projektauswertung'));
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(true);
        $pdf->setFooterFont([self::FONT_FAMILY, '', self::FONT_SIZE_SMALL]);
        $pdf->setFooterMargin(10);
        $pdf->SetMargins(15, 15, 15);
        $pdf->SetAutoPageBreak(true, 20);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->AddPage();

        if ($this->settingsService->getCompanyName()) {
            $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_TITLE);
            $pdf->Cell(0, 10, $companyName, 0, 1, 'C');
            $pdf->Ln(1);
        }
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_HEADER);
        $pdf->Cell(0, 8, $this->l->t('Projektauswertung'), 0, 1, 'C');
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 6, $label, 0, 1, 'C');
        $this->addFilterContext($pdf, $filter);
        $pdf->Ln(4);

        // Column widths (landscape A4 content width ~267mm)
        $cols = [
            [$this->l->t('Datum'), 24, 'L'],
            [$this->l->t('Zeit'), 24, 'L'],
            [$this->l->t('Projekt'), 50, 'L'],
            [$this->l->t('Kunde'), 36, 'L'],
            [$this->l->t('Mitarbeiter'), 38, 'L'],
            [$this->l->t('Stunden'), 20, 'R'],
            [$this->l->t('Tätigkeit'), 75, 'L'],
        ];

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_SMALL);
        $pdf->SetFillColor(240, 240, 240);
        foreach ($cols as $col) {
            $pdf->Cell($col[1], 7, $col[0], 1, 0, $col[2], true);
        }
        $pdf->Ln();

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);
        foreach ($entries as $entry) {
            $date = $this->fmt->date(new DateTime($entry['date']));
            $start = $entry['startTime'] ?? null;
            $end = $entry['endTime'] ?? null;
            $time = ($start !== null && $start !== '' && $end !== null && $end !== '') ? $start . '–' . $end : '–';
            $row = [
                $date,
                $time,
                $entry['projectName'] ?? $this->l->t('Kein Projekt'),
                $entry['customer'] ?? '',
                $entry['employeeName'] ?? '',
                $this->minutesToHours($entry['minutes']),
                $entry['description'] ?? '',
            ];
            foreach ($cols as $i => $col) {
                $pdf->Cell($col[1], 6, $this->truncate($row[$i], $col[1]), 1, 0, $col[2]);
            }
            $pdf->Ln();
        }

        // Totals
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_SMALL);
        $pdf->Cell(172, 7, $this->l->t('Gesamt'), 1, 0, 'R');
        $pdf->Cell(20, 7, $this->minutesToHours($totals['totalMinutes']), 1, 0, 'R');
        $pdf->Cell(75, 7, '', 1, 0, 'L');
        $pdf->Ln();

        return $pdf->Output('', 'S');
    }

    /**
     * Generate an aggregated project evaluation PDF (#57): hours per employee
     * over a period, for the current selection. Portrait.
     *
     * @param array<array{name: string, minutes: int}> $rows
     * @return string PDF content
     */
    public function generateProjectAggregate(string $label, array $rows, int $totalMinutes, array $filter = [], ?IL10N $l = null): string {
        $this->useLanguage($l);
        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);
        $companyName = $this->settingsService->getCompanyName() ?: $this->l->t('Projektauswertung');
        $pdf->SetCreator('WorkTime Nextcloud App');
        $pdf->SetAuthor($companyName);
        $pdf->SetTitle($this->l->t('Projektauswertung'));
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(true);
        $pdf->setFooterFont([self::FONT_FAMILY, '', self::FONT_SIZE_SMALL]);
        $pdf->setFooterMargin(10);
        $pdf->SetMargins(15, 15, 15);
        $pdf->SetAutoPageBreak(true, 20);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->AddPage();

        if ($this->settingsService->getCompanyName()) {
            $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_TITLE);
            $pdf->Cell(0, 10, $companyName, 0, 1, 'C');
            $pdf->Ln(1);
        }
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_HEADER);
        $pdf->Cell(0, 8, $this->l->t('Projektauswertung'), 0, 1, 'C');
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 6, $label, 0, 1, 'C');
        $this->addFilterContext($pdf, $filter);
        $pdf->Ln(4);

        // Portrait A4 content width ~180mm: 110 + 35 + 35
        $total = max(1, $totalMinutes);
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_SMALL);
        $pdf->SetFillColor(240, 240, 240);
        $pdf->Cell(110, 7, $this->l->t('Mitarbeiter'), 1, 0, 'L', true);
        $pdf->Cell(35, 7, $this->l->t('Stunden'), 1, 0, 'R', true);
        $pdf->Cell(35, 7, $this->l->t('Anteil'), 1, 0, 'R', true);
        $pdf->Ln();

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);
        foreach ($rows as $row) {
            $pct = round($row['minutes'] / $total * 100);
            $pdf->Cell(110, 6, $this->truncate($row['name'], 110), 1, 0, 'L');
            $pdf->Cell(35, 6, $this->minutesToHours($row['minutes']), 1, 0, 'R');
            $pdf->Cell(35, 6, $pct . ' %', 1, 0, 'R');
            $pdf->Ln();
        }

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_SMALL);
        $pdf->Cell(110, 7, $this->l->t('Gesamt'), 1, 0, 'R');
        $pdf->Cell(35, 7, $this->minutesToHours($totalMinutes), 1, 0, 'R');
        $pdf->Cell(35, 7, '100 %', 1, 0, 'R');
        $pdf->Ln();

        return $pdf->Output('', 'S');
    }

    private function minutesToHours(int $minutes): string {
        $h = intdiv($minutes, 60);
        $m = $minutes % 60;
        return sprintf('%d:%02d', $h, $m);
    }

    /**
     * Render the filter context (which projects/employees the report covers)
     * under the title, so an exported PDF is self-documenting.
     *
     * @param array{projects?: string, employees?: string} $filter
     */
    private function addFilterContext(TCPDF $pdf, array $filter): void {
        if (empty($filter)) {
            return;
        }
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);
        $pdf->SetTextColor(90, 90, 90);
        $pdf->Cell(0, 5, $this->l->t('Projekte: %s', [$filter['projects'] ?? $this->l->t('Alle')]), 0, 1, 'C');
        $pdf->Cell(0, 5, $this->l->t('Mitarbeitende: %s', [$filter['employees'] ?? $this->l->t('Alle')]), 0, 1, 'C');
        $pdf->SetTextColor(0, 0, 0);
    }

    private function truncate(string $text, float $widthMm): string {
        // Rough character budget for the small font at the given column width.
        $max = (int)max(4, $widthMm / 1.7);
        if (mb_strlen($text) <= $max) {
            return $text;
        }
        return mb_substr($text, 0, $max - 1) . '…';
    }

    /**
     * Create and configure TCPDF instance
     */
    private function createPdf(): TCPDF {
        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);

        // Set document information
        $companyName = $this->settingsService->getCompanyName() ?: $this->l->t('Arbeitszeitnachweis');
        $pdf->SetCreator('WorkTime Nextcloud App');
        $pdf->SetAuthor($companyName);
        $pdf->SetTitle($this->l->t('Arbeitszeitnachweis'));

        // Remove default header/footer
        $pdf->setPrintHeader(false);
        $pdf->setPrintFooter(true);

        // Set footer
        $pdf->setFooterFont([self::FONT_FAMILY, '', self::FONT_SIZE_SMALL]);
        $pdf->setFooterMargin(10);

        // Set margins
        $pdf->SetMargins(15, 15, 15);
        $pdf->SetAutoPageBreak(true, 25);

        // Set default font
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);

        // Add page
        $pdf->AddPage();

        return $pdf;
    }

    /**
     * Add header with company name and employee info
     */
    private function addHeader(TCPDF $pdf, Employee $employee, string $periodLabel, DateTime $periodStart): void {
        $companyName = $this->settingsService->getCompanyName();

        // Company name
        if ($companyName) {
            $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_TITLE);
            $pdf->Cell(0, 10, $companyName, 0, 1, 'C');
            $pdf->Ln(2);
        }

        // Title
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_HEADER);
        $pdf->Cell(0, 8, $this->l->t('Arbeitszeitnachweis'), 0, 1, 'C');

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 6, $periodLabel, 0, 1, 'C');
        $pdf->Ln(5);

        // Employee info
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(40, 6, $this->l->t('Mitarbeiter:'), 0, 0);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 6, $employee->getFullName(), 0, 1);

        if ($employee->getPersonnelNumber()) {
            $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
            $pdf->Cell(40, 6, $this->l->t('Personalnummer:'), 0, 0);
            $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
            $pdf->Cell(0, 6, $employee->getPersonnelNumber(), 0, 1);
        }

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(40, 6, $this->l->t('Wochenstunden:'), 0, 0);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        // Wochenstunden des im Berichtszeitraum gültigen Arbeitszeitprofils anzeigen,
        // nicht das aktuelle Mitarbeiter-Feld – sonst weicht der Kopf bei mehreren
        // Profilen von der zeitraumgültigen Soll-Berechnung ab (#356).
        $weeklyHours = $this->workScheduleService->getScheduleForDate($employee->getId(), $periodStart)->getWeeklyHours();
        $pdf->Cell(0, 6, $this->l->t('%s Std.', [$this->fmt->number((float)$weeklyHours, 1)]), 0, 1);

        $pdf->Ln(5);
    }

    /**
     * Add time entries table
     */
    private function addTimeEntriesTable(TCPDF $pdf, array $timeEntries, array $absences, array $holidays, DateTime $startDate, DateTime $endDate, array $dayCredits = []): void {
        // Project id -> name lookup (including inactive projects for historical entries).
        $projectNames = [];
        foreach ($this->projectMapper->findAll() as $project) {
            $projectNames[$project->getId()] = $project->getName();
        }

        $rows = $this->buildDayRowsBetween($timeEntries, $absences, $holidays, $startDate, $endDate, $projectNames, $dayCredits);

        // Table header
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_SMALL);
        $pdf->SetFillColor(230, 230, 230);

        $pdf->Cell(22, 7, $this->l->t('Datum'), 1, 0, 'C', true);
        $pdf->Cell(12, 7, $this->l->t('Tag'), 1, 0, 'C', true);
        $pdf->Cell(17, 7, $this->l->t('Beginn'), 1, 0, 'C', true);
        $pdf->Cell(17, 7, $this->l->t('Ende'), 1, 0, 'C', true);
        $pdf->Cell(17, 7, $this->l->t('Pause'), 1, 0, 'C', true);
        $pdf->Cell(20, 7, $this->l->t('Arbeitszeit'), 1, 0, 'C', true);
        $pdf->Cell(28, 7, $this->l->t('Projekt'), 1, 0, 'C', true);
        $pdf->Cell(0, 7, $this->l->t('Bemerkung'), 1, 1, 'C', true);

        // Table body
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);
        foreach ($rows as $row) {
            if ($row['fill']) {
                $pdf->SetFillColor(245, 245, 245);
            }
            $this->renderTimeEntryRow(
                $pdf, $row['date'], $row['day'], $row['start'], $row['end'],
                $row['break'], $row['work'], $row['project'], $row['note'], $row['fill']
            );
        }

        $pdf->Ln(5);
    }

    /**
     * Build the ordered list of day rows for the monthly overview (#318).
     *
     * Every calendar day of the month produces at least one row so the overview
     * is gap-free:
     *  - days with bookings → one row per booking (plus a marker row for a
     *    genuine half-day absence on the same day);
     *  - full-day absence days → the absence type;
     *  - holidays → "Feiertag: …";
     *  - regular workdays without a booking → blank time cells (a visible gap);
     *  - weekends without anything → dashes and no label.
     *
     * Pure (no PDF/DB side effects) so it can be unit-tested.
     *
     * @param TimeEntry[] $timeEntries
     * @param Absence[] $absences
     * @param Holiday[] $holidays
     * @param array<int, string> $projectNames id => name
     * @return list<array{date: string, day: string, start: string, end: string, break: string, work: string, project: string, note: string, fill: bool}>
     */
    private function buildDayRows(array $timeEntries, array $absences, array $holidays, int $year, int $month, array $projectNames): array {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');
        return $this->buildDayRowsBetween($timeEntries, $absences, $holidays, $startDate, $endDate, $projectNames);
    }

    /**
     * Same as buildDayRows() but for an arbitrary inclusive [start, end] range
     * (#102 custom-period timesheet). Pure (no PDF/DB side effects).
     *
     * @param TimeEntry[] $timeEntries
     * @param Absence[] $absences
     * @param Holiday[] $holidays
     * @param array<int, string> $projectNames id => name
     * @param array<string, int> $dayCredits Y-m-d => dem Ist gutgeschriebene Minuten (#833)
     * @return list<array{date: string, day: string, start: string, end: string, break: string, work: string, project: string, note: string, fill: bool}>
     */
    private function buildDayRowsBetween(array $timeEntries, array $absences, array $holidays, DateTime $startDate, DateTime $endDate, array $projectNames, array $dayCredits = []): array {
        // Holiday lookup
        $holidayDates = [];
        foreach ($holidays as $holiday) {
            $holidayDates[$holiday->getDate()->format('Y-m-d')] = $holiday->getName();
        }

        // Absence lookup per calendar day: expand each absence's start–end range
        // to individual dates. Rejected/cancelled absences are ignored — they
        // did not actually happen.
        $absencesByDate = [];
        foreach ($absences as $absence) {
            if (in_array($absence->getStatus(), [Absence::STATUS_REJECTED, Absence::STATUS_CANCELLED], true)) {
                continue;
            }
            $cursor = clone $absence->getStartDate();
            $absenceEnd = $absence->getEndDate();
            while ($cursor <= $absenceEnd) {
                $absencesByDate[$cursor->format('Y-m-d')] = $absence;
                $cursor->modify('+1 day');
            }
        }

        // Entries by date
        $entriesByDate = [];
        foreach ($timeEntries as $entry) {
            $entriesByDate[$entry->getDate()->format('Y-m-d')][] = $entry;
        }

        $rows = [];
        $current = clone $startDate;

        while ($current <= $endDate) {
            $dateStr = $current->format('Y-m-d');
            $dayOfWeek = (int)$current->format('N');
            $isWeekend = $dayOfWeek > 5;
            $isHoliday = isset($holidayDates[$dateStr]);
            $fill = $isWeekend || $isHoliday;

            $date = $this->fmt->date($current);
            $day = $this->fmt->weekday($current);

            $absence = $absencesByDate[$dateStr] ?? null;
            $credit = $dayCredits[$dateStr] ?? 0;
            $absenceLabel = '';
            if ($absence !== null) {
                $typeLabel = Absence::typeLabel($this->l, (string)$absence->getType());
                if ($absence->getAbsenceMinutes() !== null) {
                    // #625: stundenweise Krank -> Stundenzahl statt "halber Tag".
                    $absenceLabel = $typeLabel . ' (' . $this->fmt->number($absence->getAbsenceMinutes() / 60, 2) . ' h)';
                } else {
                    $absenceLabel = $absence->isHalfDay() ? $this->l->t('%s (halber Tag)', [$typeLabel]) : $typeLabel;
                }
            }

            if (isset($entriesByDate[$dateStr])) {
                $hasEmergency = false;
                foreach ($entriesByDate[$dateStr] as $entry) {
                    $note = $entry->getDescription() ?? '';
                    if ($entry->isEmergency()) {
                        // #626: Notarbeit klar kennzeichnen; ausstehende Freigabe markieren.
                        $hasEmergency = true;
                        $marker = $entry->isEmergencyApproved() ? $this->l->t('Notarbeit') : $this->l->t('Notarbeit (wartet auf Freigabe)');
                        $note = $note !== '' ? $marker . ': ' . $note : $marker;
                    }
                    $rows[] = [
                        'date' => $date,
                        'day' => $day,
                        'start' => $entry->getStartTime()->format('H:i'),
                        'end' => $entry->getEndTime()->format('H:i'),
                        'break' => $this->formatMinutes($entry->getBreakMinutes()),
                        'work' => $this->formatMinutes($entry->getWorkMinutes()),
                        'project' => $entry->getProjectId() !== null ? ($projectNames[$entry->getProjectId()] ?? '') : '',
                        'note' => $note,
                        'fill' => $fill,
                    ];
                    $date = ''; // Clear for subsequent entries on the same day
                    $day = '';
                }
                // Only a genuine half-day absence is shown alongside a booking
                // (morning work + afternoon off). A full-day absence never
                // coexists with a booking in valid data, so we don't add a
                // marker row there to avoid a confusing "worked + absent" day.
                // #625: stundenweise Krank koexistiert mit gebuchter Arbeit — die
                // Krank-Zeile ergaenzt die Arbeitszeilen (wie beim Halbtag).
                // #626: an einem Notarbeit-Tag ergaenzt die (volle) Urlaubszeile die
                // Arbeitszeilen, damit "Urlaub + Notarbeit" im Report sichtbar bleibt.
                if ($absence !== null && ($absence->isHalfDay() || $absence->getAbsenceMinutes() !== null || $hasEmergency)) {
                    $rows[] = $this->markerRow($date, $day, $absenceLabel, $fill, $credit);
                }
            } elseif ($absence !== null) {
                // Absence day (#318): show the type directly in the day row.
                $rows[] = $this->markerRow($date, $day, $absenceLabel, $fill, $credit);
            } elseif ($isHoliday) {
                $rows[] = $this->markerRow($date, $day, $this->l->t('Feiertag: %s', [$holidayDates[$dateStr]]), $fill);
            } elseif (!$isWeekend) {
                // Regular workday without entry: blank cells signal a gap
                // (a missing booking that may need attention).
                $rows[] = [
                    'date' => $date, 'day' => $day, 'start' => '', 'end' => '',
                    'break' => '', 'work' => '', 'project' => '', 'note' => '', 'fill' => $fill,
                ];
            } else {
                // Weekend without entry/absence: show the day so the overview is
                // gap-free (#318), with dashes and no label — the "Sa"/"So" day
                // and grey shading already mark it as a non-working day.
                $rows[] = $this->markerRow($date, $day, '', $fill);
            }

            $current->modify('+1 day');
        }

        return $rows;
    }

    /**
     * A non-working day row: dashes in the time columns plus an optional note.
     *
     * @return array{date: string, day: string, start: string, end: string, break: string, work: string, project: string, note: string, fill: bool}
     */
    private function markerRow(string $date, string $day, string $note, bool $fill, int $creditMinutes = 0): array {
        return [
            'date' => $date, 'day' => $day, 'start' => '-', 'end' => '-',
            'break' => '-', 'work' => $creditMinutes > 0 ? $this->formatMinutes($creditMinutes) : '-',
            'project' => '', 'note' => $note, 'fill' => $fill,
        ];
    }

    /**
     * Move to the next page if the given block height would not fit in the
     * remaining space on the current page. Keeps a section (heading + content)
     * from being orphaned across a page break (#318).
     */
    private function ensureSpace(TCPDF $pdf, float $neededMm): void {
        if ($pdf->GetY() + $neededMm > $pdf->getPageHeight() - $pdf->getBreakMargin()) {
            $pdf->AddPage();
        }
    }

    /**
     * Add absences section
     */
    private function addAbsencesSection(TCPDF $pdf, array $absences): void {
        // Keep heading + table header + at least the first rows together.
        $this->ensureSpace($pdf, 14 + min(count($absences), 3) * 6 + 5);

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 8, $this->l->t('Abwesenheiten'), 0, 1);

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_SMALL);
        $pdf->SetFillColor(230, 230, 230);
        $pdf->Cell(30, 6, $this->l->t('Zeitraum'), 1, 0, 'C', true);
        $pdf->Cell(20, 6, $this->l->t('Tage'), 1, 0, 'C', true);
        $pdf->Cell(30, 6, $this->l->t('Art'), 1, 0, 'C', true);
        $pdf->Cell(25, 6, $this->l->t('Status'), 1, 0, 'C', true);
        $pdf->Cell(0, 6, $this->l->t('Bemerkung'), 1, 1, 'C', true);

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);

        foreach ($absences as $absence) {
            $period = $this->fmt->dayMonth($absence->getStartDate()) . ' - ' . $this->fmt->dayMonth($absence->getEndDate());
            $days = $this->fmt->number((float)$absence->getDays(), 1);

            $statusTranslation = [
                Absence::STATUS_PENDING => $this->l->t('Ausstehend'),
                Absence::STATUS_APPROVED => $this->l->t('Genehmigt'),
                Absence::STATUS_REJECTED => $this->l->t('Abgelehnt'),
                Absence::STATUS_CANCELLED => $this->l->t('Storniert'),
            ];
            $status = $statusTranslation[$absence->getStatus()] ?? $absence->getStatus();

            $this->renderAbsenceRow($pdf, $period, $days, Absence::typeLabel($this->l, (string)$absence->getType()), $status, $absence->getNote() ?? '');
        }

        $pdf->Ln(5);
    }

    /**
     * Width of the note column = page width minus margins and the sum of the fixed columns.
     */
    private function getNoteCellWidth(TCPDF $pdf, float $fixedColumnsWidth): float {
        $margins = $pdf->getMargins();
        return $pdf->getPageWidth() - $margins['left'] - $margins['right'] - $fixedColumnsWidth;
    }

    /**
     * Calculate the row height needed so a wrapping note fits, with $minHeight as the floor.
     */
    private function calculateRowHeight(TCPDF $pdf, string $note, float $noteWidth, float $minHeight = 6.0): float {
        if ($note === '') {
            return $minHeight;
        }
        return max($minHeight, $pdf->getStringHeight($noteWidth, $note));
    }

    /**
     * Render one row of the time entries table; the note column wraps and dictates row height.
     */
    private function renderTimeEntryRow(
        TCPDF $pdf,
        string $date,
        string $day,
        string $start,
        string $end,
        string $break,
        string $work,
        string $project,
        string $note,
        bool $fill
    ): void {
        $noteWidth = $this->getNoteCellWidth($pdf, 133.0);
        $rowHeight = $this->calculateRowHeight($pdf, $note, $noteWidth);

        $pdf->Cell(22, $rowHeight, $date, 1, 0, 'C', $fill, '', 0, false, 'T', 'M');
        $pdf->Cell(12, $rowHeight, $day, 1, 0, 'C', $fill, '', 0, false, 'T', 'M');
        $pdf->Cell(17, $rowHeight, $start, 1, 0, 'C', $fill, '', 0, false, 'T', 'M');
        $pdf->Cell(17, $rowHeight, $end, 1, 0, 'C', $fill, '', 0, false, 'T', 'M');
        $pdf->Cell(17, $rowHeight, $break, 1, 0, 'C', $fill, '', 0, false, 'T', 'M');
        $pdf->Cell(20, $rowHeight, $work, 1, 0, 'C', $fill, '', 0, false, 'T', 'M');
        $pdf->Cell(28, $rowHeight, $this->truncate($project, 28), 1, 0, 'L', $fill, '', 0, false, 'T', 'M');
        $pdf->MultiCell($noteWidth, $rowHeight, $note, 1, 'L', $fill, 1, '', '', true, 0, false, true, 0, 'M');
    }

    /**
     * Render one row of the absences table; the note column wraps and dictates row height.
     */
    private function renderAbsenceRow(
        TCPDF $pdf,
        string $period,
        string $days,
        string $type,
        string $status,
        string $note,
        bool $fill = false
    ): void {
        $noteWidth = $this->getNoteCellWidth($pdf, 105.0);
        $rowHeight = $this->calculateRowHeight($pdf, $note, $noteWidth);

        $pdf->Cell(30, $rowHeight, $period, 1, 0, 'C', $fill, '', 0, false, 'T', 'M');
        $pdf->Cell(20, $rowHeight, $days, 1, 0, 'C', $fill, '', 0, false, 'T', 'M');
        $pdf->Cell(30, $rowHeight, $type, 1, 0, 'L', $fill, '', 0, false, 'T', 'M');
        $pdf->Cell(25, $rowHeight, $status, 1, 0, 'C', $fill, '', 0, false, 'T', 'M');
        $pdf->MultiCell($noteWidth, $rowHeight, $note, 1, 'L', $fill, 1, '', '', true, 0, false, true, 0, 'M');
    }

    /**
     * Add summary section
     */
    private function addSummary(TCPDF $pdf, Employee $employee, array $statistics, string $workingDaysLabel): void {
        // Keep the whole summary block on one page.
        $this->ensureSpace($pdf, 48);

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 8, $this->l->t('Zusammenfassung'), 0, 1);

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);

        // Left column
        $pdf->Cell(50, 6, $workingDaysLabel, 0, 0);
        $pdf->Cell(30, 6, $this->formatDayCount((float)$statistics['workingDays']), 0, 0);
        $pdf->Cell(50, 6, $this->l->t('Feiertage:'), 0, 0);
        $pdf->Cell(0, 6, $this->formatDayCount((float)$statistics['holidayCount']), 0, 1);

        $pdf->Cell(50, 6, $this->l->t('Abwesenheitstage:'), 0, 0);
        $pdf->Cell(30, 6, $this->fmt->number((float)$statistics['absenceDays'], 1), 0, 0);
        $pdf->Cell(50, 6, $this->l->t('Einträge:'), 0, 0);
        $pdf->Cell(0, 6, $statistics['entryCount'], 0, 1);

        $pdf->Ln(3);

        // Time calculations
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(50, 6, $this->l->t('Soll-Arbeitszeit:'), 0, 0);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(30, 6, $this->formatMinutes($statistics['adjustedTargetMinutes']), 0, 0);

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(50, 6, $this->l->t('Ist-Arbeitszeit:'), 0, 0);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 6, $this->formatMinutes($statistics['actualMinutes']), 0, 1);

        // Overtime
        $pdf->Ln(2);
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_HEADER);
        $overtimeMinutes = $statistics['overtimeMinutes'];
        // Qualify with "(Monat)" so this month-only value is not confused with
        // the cumulative year balance shown in the app tile (#430).
        $overtimeLabel = $overtimeMinutes >= 0 ? $this->l->t('Überstunden (Monat):') : $this->l->t('Minusstunden (Monat):');
        $overtimeFormatted = $this->formatMinutes(abs($overtimeMinutes));

        if ($overtimeMinutes < 0) {
            $overtimeFormatted = '-' . $overtimeFormatted;
        }

        // Translated labels can be longer than the German one.
        $pdf->Cell(max(50, $pdf->GetStringWidth($overtimeLabel) + 3), 8, $overtimeLabel, 0, 0);
        $pdf->Cell(0, 8, $overtimeFormatted, 0, 1);

        // Defensive hint: a zero-hour work schedule makes every working-day and
        // absence-day count collapse to 0. Surface the likely cause instead of
        // silently showing "0,0 Tage" (which looks like a data error to the user).
        if ((float)$statistics['workingDays'] === 0.0) {
            $pdf->Ln(2);
            $pdf->SetTextColor(180, 0, 0);
            $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);
            $pdf->MultiCell(0, 5, $this->l->t('Hinweis: Für diesen Monat sind 0 Arbeitstage hinterlegt. Vermutlich fehlt ein gültiges Arbeitszeitprofil mit Wochenstunden größer als 0. Bitte das Arbeitszeitprofil des Mitarbeiters prüfen.'), 0, 'L');
            $pdf->SetTextColor(0, 0, 0);
            $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        }

        $pdf->Ln(5);
    }

    /**
     * Add signature section
     */
    private function addSignatureSection(TCPDF $pdf): void {
        // Keep the confirmation text + signature lines together on one page.
        $this->ensureSpace($pdf, 50);

        $pdf->Ln(10);

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);
        $pdf->Cell(0, 5, $this->l->t('Ich bestätige die Richtigkeit der oben aufgeführten Arbeitszeiten.'), 0, 1);

        $pdf->Ln(10);

        $lineWidth = 70;
        $gap = 40;

        // "Ort, Datum" labels above signature lines
        $pdf->Cell($lineWidth, 5, $this->l->t('Ort, Datum'), 0, 0, 'L');
        $pdf->Cell($gap, 5, '', 0, 0);
        $pdf->Cell($lineWidth, 5, $this->l->t('Ort, Datum'), 0, 1, 'L');

        $pdf->Ln(10);

        // Signature lines
        $pdf->Cell($lineWidth, 6, '', 'B', 0);
        $pdf->Cell($gap, 6, '', 0, 0);
        $pdf->Cell($lineWidth, 6, '', 'B', 1);

        // Labels below signature lines
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);
        $pdf->Cell($lineWidth, 5, $this->l->t('Mitarbeiter'), 0, 0, 'C');
        $pdf->Cell($gap, 5, '', 0, 0);
        $pdf->Cell($lineWidth, 5, $this->l->t('Vorgesetzter'), 0, 1, 'C');
    }

    /** Half holidays make day counts fractional; whole days stay without decimals. */
    private function formatDayCount(float $days): string {
        return $this->fmt->number($days, floor($days) === $days ? 0 : 1);
    }

    private function formatMinutes(int $minutes): string {
        return $this->fmt->hours($minutes);
    }

    /**
     * Add approval info section to PDF (two columns: submitted / approved)
     */
    private function addApprovalInfoSection(TCPDF $pdf, array $approvalInfo): void {
        // Keep the approval info block together on one page.
        $this->ensureSpace($pdf, 45);

        $pdf->Ln(10);

        // Extract data
        $submittedBy = $approvalInfo['submittedBy'] ?? null;
        $submittedAt = $approvalInfo['submittedAt'] ?? null;
        $approvedBy = $approvalInfo['approvedBy'] ?? null;
        $approvedAt = $approvalInfo['approvedAt'] ?? null;

        $unknown = $this->l->t('Unbekannt');
        $submitterName = $submittedBy instanceof Employee ? $submittedBy->getFullName() : $unknown;
        $submissionDate = $submittedAt instanceof DateTime ? $this->fmt->dateTime($submittedAt) : $unknown;
        $approverName = $approvedBy instanceof Employee ? $approvedBy->getFullName() : $unknown;
        $approvalDate = $approvedAt instanceof DateTime ? $this->fmt->dateTime($approvedAt) : $unknown;

        // Header
        $pdf->SetFillColor(240, 248, 255);
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 8, $this->l->t('Genehmigungsvermerk'), 1, 1, 'L', true);

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);

        $colWidth = 90;

        // Row 1: Von labels and values
        $pdf->Cell(30, 6, $this->l->t('Eingereicht von:'), 1, 0, 'L');
        $pdf->Cell($colWidth - 30, 6, $submitterName, 1, 0, 'L');
        $pdf->Cell(30, 6, $this->l->t('Genehmigt von:'), 1, 0, 'L');
        $pdf->Cell(0, 6, $approverName, 1, 1, 'L');

        // Row 2: Am labels and values
        $pdf->Cell(30, 6, $this->l->t('Eingereicht am:'), 1, 0, 'L');
        $pdf->Cell($colWidth - 30, 6, $submissionDate, 1, 0, 'L');
        $pdf->Cell(30, 6, $this->l->t('Genehmigt am:'), 1, 0, 'L');
        $pdf->Cell(0, 6, $approvalDate, 1, 1, 'L');
    }

    /**
     * Build the archive folder for one employee and year (#537).
     *
     * Employee names end up as a path segment here, so anything that could
     * escape the archive tree — slashes, "..", control characters — is folded
     * into an underscore. Umlauts stay readable because the folder is meant to
     * be found by a human in the Files app.
     *
     * All three archive operations share this method: writing, deleting and the
     * existence check have to agree on the path, otherwise a report would be
     * archived under one name and looked for under another.
     */
    private function buildArchiveFolderPath(string $archivePath, Employee $employee, int $year): string {
        $lastName = self::sanitizePathSegment($employee->getLastName());
        $firstName = self::sanitizePathSegment($employee->getFirstName());

        return sprintf(
            '%s/%d/%s_%s',
            trim($archivePath, '/'),
            $year,
            $lastName,
            $firstName
        );
    }

    private static function sanitizePathSegment(string $value): string {
        $sanitized = preg_replace('/[^\p{L}\p{N}\- ]/u', '_', $value) ?? '';
        $sanitized = trim($sanitized);

        // An employee whose name consists only of stripped characters must not
        // collapse into an empty segment — that would move the file one level up.
        return $sanitized === '' ? '_' : $sanitized;
    }

    /**
     * Archive monthly report PDF to Nextcloud folder
     *
     * @param string $adminUserId User ID with write access (usually admin or HR)
     * @param Employee $employee The employee whose report is archived
     * @param int $year
     * @param int $month
     * @param string $pdfContent PDF content to save
     * @return string Path where the file was saved
     * @throws \Exception If archive folder cannot be created or file cannot be written
     */
    public function archiveMonthlyReport(
        string $adminUserId,
        Employee $employee,
        int $year,
        int $month,
        string $pdfContent
    ): string {
        $archivePath = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_PATH);

        // Build folder path: {archivePath}/{Jahr}/{Nachname_Vorname}/
        $folderPath = $this->buildArchiveFolderPath($archivePath, $employee, $year);

        // Build filename: Arbeitszeitnachweis_{YYYY-MM}.pdf
        $filename = sprintf('Arbeitszeitnachweis_%d-%02d.pdf', $year, $month);

        try {
            $userFolder = $this->rootFolder->getUserFolder($adminUserId);

            // Create folder structure if it doesn't exist
            $currentPath = '';
            foreach (explode('/', $folderPath) as $folder) {
                if (empty($folder)) {
                    continue;
                }
                $currentPath .= '/' . $folder;
                $relativePath = ltrim($currentPath, '/');

                try {
                    $userFolder->get($relativePath);
                } catch (FilesNotFoundException) {
                    $userFolder->newFolder($relativePath);
                }
            }

            $fullPath = $folderPath . '/' . $filename;
            $relativePath = ltrim($fullPath, '/');

            // Check if file already exists and delete it
            try {
                $existingFile = $userFolder->get($relativePath);
                $existingFile->delete();
            } catch (FilesNotFoundException) {
                // File doesn't exist, that's fine
            }

            // Write the file
            $userFolder->newFile($relativePath, $pdfContent);

            return $fullPath;
        } catch (\Exception $e) {
            throw new \Exception('Could not archive PDF: ' . $e->getMessage());
        }
    }

    /**
     * Remove an archived monthly report. Called when a month is un-approved (reopened),
     * so the archive never holds a PDF for a month that is no longer approved (#323).
     * No-op if archiving is not configured or the file does not exist.
     */
    public function deleteArchivedReport(
        string $adminUserId,
        Employee $employee,
        int $year,
        int $month
    ): bool {
        $archivePath = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_PATH);
        if (empty($archivePath)) {
            return false;
        }

        $folderPath = $this->buildArchiveFolderPath($archivePath, $employee, $year);
        $filename = sprintf('Arbeitszeitnachweis_%d-%02d.pdf', $year, $month);
        $relativePath = ltrim($folderPath . '/' . $filename, '/');

        try {
            $userFolder = $this->rootFolder->getUserFolder($adminUserId);
            $file = $userFolder->get($relativePath);
            $file->delete();
            return true;
        } catch (FilesNotFoundException) {
            // Already gone — nothing to delete.
            return false;
        }
        // Other errors (permissions, storage) propagate so the calling
        // controller can log them instead of failing silently.
    }

    /**
     * Whether an archived report already exists for this month (#323),
     * so callers can distinguish a fresh archive from a replacement.
     */
    public function archivedReportExists(
        string $adminUserId,
        Employee $employee,
        int $year,
        int $month
    ): bool {
        $archivePath = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_PATH);
        if (empty($archivePath)) {
            return false;
        }

        $folderPath = $this->buildArchiveFolderPath($archivePath, $employee, $year);
        $filename = sprintf('Arbeitszeitnachweis_%d-%02d.pdf', $year, $month);
        $relativePath = ltrim($folderPath . '/' . $filename, '/');

        try {
            $this->rootFolder->getUserFolder($adminUserId)->get($relativePath);
            return true;
        } catch (FilesNotFoundException) {
            return false;
        } catch (\Exception) {
            return false;
        }
    }
}
