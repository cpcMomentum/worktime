<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\Holiday;
use OCA\WorkTime\Db\TimeEntry;
use OCP\Files\IRootFolder;
use OCP\Files\NotFoundException as FilesNotFoundException;
use TCPDF;

class PdfService {

    private const FONT_FAMILY = 'helvetica';
    private const FONT_SIZE_NORMAL = 10;
    private const FONT_SIZE_SMALL = 8;
    private const FONT_SIZE_TITLE = 14;
    private const FONT_SIZE_HEADER = 12;

    public function __construct(
        private CompanySettingsService $settingsService,
        private IRootFolder $rootFolder,
    ) {
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
        ?array $approvalInfo = null
    ): string {
        $pdf = $this->createPdf();

        // Header
        $this->addHeader($pdf, $employee, $year, $month);

        // Time entries table
        $this->addTimeEntriesTable($pdf, $timeEntries, $holidays, $year, $month);

        // Absences section
        if (!empty($absences)) {
            $this->addAbsencesSection($pdf, $absences);
        }

        // Summary
        $this->addSummary($pdf, $employee, $statistics);

        // Signature section
        $this->addSignatureSection($pdf);

        // Approval info section (if provided)
        if ($approvalInfo !== null) {
            $this->addApprovalInfoSection($pdf, $approvalInfo);
        }

        return $pdf->Output('', 'S');
    }

    /**
     * Create and configure TCPDF instance
     */
    private function createPdf(): TCPDF {
        $pdf = new TCPDF('P', 'mm', 'A4', true, 'UTF-8', false);

        // Set document information
        $companyName = $this->settingsService->getCompanyName() ?: 'Arbeitszeitnachweis';
        $pdf->SetCreator('WorkTime Nextcloud App');
        $pdf->SetAuthor($companyName);
        $pdf->SetTitle('Arbeitszeitnachweis');

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
    private function addHeader(TCPDF $pdf, Employee $employee, int $year, int $month): void {
        $companyName = $this->settingsService->getCompanyName();
        $monthName = $this->getGermanMonthName($month);

        // Company name
        if ($companyName) {
            $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_TITLE);
            $pdf->Cell(0, 10, $companyName, 0, 1, 'C');
            $pdf->Ln(2);
        }

        // Title
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_HEADER);
        $pdf->Cell(0, 8, 'Arbeitszeitnachweis', 0, 1, 'C');

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 6, "$monthName $year", 0, 1, 'C');
        $pdf->Ln(5);

        // Employee info
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(40, 6, 'Mitarbeiter:', 0, 0);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 6, $employee->getFullName(), 0, 1);

        if ($employee->getPersonnelNumber()) {
            $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
            $pdf->Cell(40, 6, 'Personalnummer:', 0, 0);
            $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
            $pdf->Cell(0, 6, $employee->getPersonnelNumber(), 0, 1);
        }

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(40, 6, 'Wochenstunden:', 0, 0);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 6, number_format((float)$employee->getWeeklyHours(), 1, ',', '.') . ' Std.', 0, 1);

        $pdf->Ln(5);
    }

    /**
     * Add time entries table
     */
    private function addTimeEntriesTable(TCPDF $pdf, array $timeEntries, array $holidays, int $year, int $month): void {
        // Build holiday lookup
        $holidayDates = [];
        foreach ($holidays as $holiday) {
            $holidayDates[$holiday->getDate()->format('Y-m-d')] = $holiday->getName();
        }

        // Build entries by date
        $entriesByDate = [];
        foreach ($timeEntries as $entry) {
            $date = $entry->getDate()->format('Y-m-d');
            if (!isset($entriesByDate[$date])) {
                $entriesByDate[$date] = [];
            }
            $entriesByDate[$date][] = $entry;
        }

        // Table header
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_SMALL);
        $pdf->SetFillColor(230, 230, 230);

        $pdf->Cell(25, 7, 'Datum', 1, 0, 'C', true);
        $pdf->Cell(15, 7, 'Tag', 1, 0, 'C', true);
        $pdf->Cell(20, 7, 'Beginn', 1, 0, 'C', true);
        $pdf->Cell(20, 7, 'Ende', 1, 0, 'C', true);
        $pdf->Cell(20, 7, 'Pause', 1, 0, 'C', true);
        $pdf->Cell(20, 7, 'Arbeitszeit', 1, 0, 'C', true);
        $pdf->Cell(0, 7, 'Bemerkung', 1, 1, 'C', true);

        // Table body
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);

        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');
        $current = clone $startDate;

        while ($current <= $endDate) {
            $dateStr = $current->format('Y-m-d');
            $dayOfWeek = (int)$current->format('N');
            $isWeekend = $dayOfWeek > 5;
            $isHoliday = isset($holidayDates[$dateStr]);

            // Background color for weekends/holidays
            if ($isWeekend || $isHoliday) {
                $pdf->SetFillColor(245, 245, 245);
                $fill = true;
            } else {
                $fill = false;
            }

            $dateFormatted = $current->format('d.m.Y');
            $dayName = $this->getGermanDayName($dayOfWeek);

            if (isset($entriesByDate[$dateStr])) {
                // Has time entries
                foreach ($entriesByDate[$dateStr] as $entry) {
                    $pdf->Cell(25, 6, $dateFormatted, 1, 0, 'C', $fill);
                    $pdf->Cell(15, 6, $dayName, 1, 0, 'C', $fill);
                    $pdf->Cell(20, 6, $entry->getStartTime()->format('H:i'), 1, 0, 'C', $fill);
                    $pdf->Cell(20, 6, $entry->getEndTime()->format('H:i'), 1, 0, 'C', $fill);
                    $pdf->Cell(20, 6, $this->formatMinutes($entry->getBreakMinutes()), 1, 0, 'C', $fill);
                    $pdf->Cell(20, 6, $this->formatMinutes($entry->getWorkMinutes()), 1, 0, 'C', $fill);
                    $pdf->Cell(0, 6, $entry->getDescription() ?? '', 1, 1, 'L', $fill);
                    $dateFormatted = ''; // Clear for subsequent entries on same day
                    $dayName = '';
                }
            } elseif ($isHoliday) {
                // Holiday
                $pdf->Cell(25, 6, $dateFormatted, 1, 0, 'C', $fill);
                $pdf->Cell(15, 6, $dayName, 1, 0, 'C', $fill);
                $pdf->Cell(20, 6, '-', 1, 0, 'C', $fill);
                $pdf->Cell(20, 6, '-', 1, 0, 'C', $fill);
                $pdf->Cell(20, 6, '-', 1, 0, 'C', $fill);
                $pdf->Cell(20, 6, '-', 1, 0, 'C', $fill);
                $pdf->Cell(0, 6, 'Feiertag: ' . $holidayDates[$dateStr], 1, 1, 'L', $fill);
            } elseif (!$isWeekend) {
                // Regular workday without entry
                $pdf->Cell(25, 6, $dateFormatted, 1, 0, 'C', $fill);
                $pdf->Cell(15, 6, $dayName, 1, 0, 'C', $fill);
                $pdf->Cell(20, 6, '', 1, 0, 'C', $fill);
                $pdf->Cell(20, 6, '', 1, 0, 'C', $fill);
                $pdf->Cell(20, 6, '', 1, 0, 'C', $fill);
                $pdf->Cell(20, 6, '', 1, 0, 'C', $fill);
                $pdf->Cell(0, 6, '', 1, 1, 'L', $fill);
            }

            $current->modify('+1 day');
        }

        $pdf->Ln(5);
    }

    /**
     * Add absences section
     */
    private function addAbsencesSection(TCPDF $pdf, array $absences): void {
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 8, 'Abwesenheiten', 0, 1);

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_SMALL);
        $pdf->SetFillColor(230, 230, 230);
        $pdf->Cell(30, 6, 'Zeitraum', 1, 0, 'C', true);
        $pdf->Cell(20, 6, 'Tage', 1, 0, 'C', true);
        $pdf->Cell(30, 6, 'Art', 1, 0, 'C', true);
        $pdf->Cell(25, 6, 'Status', 1, 0, 'C', true);
        $pdf->Cell(0, 6, 'Bemerkung', 1, 1, 'C', true);

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);

        foreach ($absences as $absence) {
            $period = $absence->getStartDate()->format('d.m.') . ' - ' . $absence->getEndDate()->format('d.m.');
            $days = number_format((float)$absence->getDays(), 1, ',', '.');

            $statusTranslation = [
                Absence::STATUS_PENDING => 'Ausstehend',
                Absence::STATUS_APPROVED => 'Genehmigt',
                Absence::STATUS_REJECTED => 'Abgelehnt',
                Absence::STATUS_CANCELLED => 'Storniert',
            ];
            $status = $statusTranslation[$absence->getStatus()] ?? $absence->getStatus();

            $pdf->Cell(30, 6, $period, 1, 0, 'C');
            $pdf->Cell(20, 6, $days, 1, 0, 'C');
            $pdf->Cell(30, 6, $absence->getTypeName(), 1, 0, 'L');
            $pdf->Cell(25, 6, $status, 1, 0, 'C');
            $pdf->Cell(0, 6, $absence->getNote() ?? '', 1, 1, 'L');
        }

        $pdf->Ln(5);
    }

    /**
     * Add summary section
     */
    private function addSummary(TCPDF $pdf, Employee $employee, array $statistics): void {
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 8, 'Zusammenfassung', 0, 1);

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);

        // Left column
        $pdf->Cell(50, 6, 'Arbeitstage im Monat:', 0, 0);
        $pdf->Cell(30, 6, $statistics['workingDays'] . ' Tage', 0, 0);
        $pdf->Cell(50, 6, 'Feiertage:', 0, 0);
        $pdf->Cell(0, 6, $statistics['holidayCount'] . ' Tage', 0, 1);

        $pdf->Cell(50, 6, 'Abwesenheitstage:', 0, 0);
        $pdf->Cell(30, 6, number_format($statistics['absenceDays'], 1, ',', '.') . ' Tage', 0, 0);
        $pdf->Cell(50, 6, 'Einträge:', 0, 0);
        $pdf->Cell(0, 6, $statistics['entryCount'], 0, 1);

        $pdf->Ln(3);

        // Time calculations
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(50, 6, 'Soll-Arbeitszeit:', 0, 0);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(30, 6, $this->formatMinutes($statistics['adjustedTargetMinutes']), 0, 0);

        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(50, 6, 'Ist-Arbeitszeit:', 0, 0);
        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 6, $this->formatMinutes($statistics['actualMinutes']), 0, 1);

        // Overtime
        $pdf->Ln(2);
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_HEADER);
        $overtimeMinutes = $statistics['overtimeMinutes'];
        $overtimeLabel = $overtimeMinutes >= 0 ? 'Überstunden:' : 'Minusstunden:';
        $overtimeFormatted = $this->formatMinutes(abs($overtimeMinutes));

        if ($overtimeMinutes < 0) {
            $overtimeFormatted = '-' . $overtimeFormatted;
        }

        $pdf->Cell(50, 8, $overtimeLabel, 0, 0);
        $pdf->Cell(0, 8, $overtimeFormatted, 0, 1);

        $pdf->Ln(5);
    }

    /**
     * Add signature section
     */
    private function addSignatureSection(TCPDF $pdf): void {
        $pdf->Ln(10);

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);
        $pdf->Cell(0, 5, 'Ich bestätige die Richtigkeit der oben aufgeführten Arbeitszeiten.', 0, 1);

        $pdf->Ln(15);

        // Signature lines
        $lineWidth = 60;
        $pdf->Cell($lineWidth, 6, '', 'B', 0);
        $pdf->Cell(20, 6, '', 0, 0);
        $pdf->Cell($lineWidth, 6, '', 'B', 0);
        $pdf->Cell(20, 6, '', 0, 0);
        $pdf->Cell(40, 6, '', 'B', 1);

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);
        $pdf->Cell($lineWidth, 5, 'Mitarbeiter', 0, 0, 'C');
        $pdf->Cell(20, 5, '', 0, 0);
        $pdf->Cell($lineWidth, 5, 'Vorgesetzter', 0, 0, 'C');
        $pdf->Cell(20, 5, '', 0, 0);
        $pdf->Cell(40, 5, 'Datum', 0, 1, 'C');
    }

    /**
     * Format minutes as hours:minutes string
     */
    private function formatMinutes(int $minutes): string {
        $hours = intdiv(abs($minutes), 60);
        $mins = abs($minutes) % 60;
        return sprintf('%d:%02d Std.', $hours, $mins);
    }

    /**
     * Get German month name
     */
    private function getGermanMonthName(int $month): string {
        $months = [
            1 => 'Januar', 2 => 'Februar', 3 => 'März', 4 => 'April',
            5 => 'Mai', 6 => 'Juni', 7 => 'Juli', 8 => 'August',
            9 => 'September', 10 => 'Oktober', 11 => 'November', 12 => 'Dezember',
        ];
        return $months[$month] ?? '';
    }

    /**
     * Get German day name abbreviation
     */
    private function getGermanDayName(int $dayOfWeek): string {
        $days = [
            1 => 'Mo', 2 => 'Di', 3 => 'Mi', 4 => 'Do',
            5 => 'Fr', 6 => 'Sa', 7 => 'So',
        ];
        return $days[$dayOfWeek] ?? '';
    }

    /**
     * Add approval info section to PDF
     */
    private function addApprovalInfoSection(TCPDF $pdf, array $approvalInfo): void {
        $pdf->Ln(10);

        $pdf->SetFillColor(240, 248, 255);
        $pdf->SetFont(self::FONT_FAMILY, 'B', self::FONT_SIZE_NORMAL);
        $pdf->Cell(0, 8, 'Genehmigungsvermerk', 1, 1, 'L', true);

        $pdf->SetFont(self::FONT_FAMILY, '', self::FONT_SIZE_SMALL);

        $approvedBy = $approvalInfo['approvedBy'] ?? null;
        $approvedAt = $approvalInfo['approvedAt'] ?? null;

        $approverName = $approvedBy instanceof Employee ? $approvedBy->getFullName() : 'Unbekannt';
        $approvalDate = $approvedAt instanceof DateTime ? $approvedAt->format('d.m.Y H:i') : 'Unbekannt';

        $pdf->Cell(40, 6, 'Genehmigt von:', 1, 0, 'L');
        $pdf->Cell(0, 6, $approverName, 1, 1, 'L');

        $pdf->Cell(40, 6, 'Genehmigt am:', 1, 0, 'L');
        $pdf->Cell(0, 6, $approvalDate . ' Uhr', 1, 1, 'L');
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
        $folderPath = sprintf(
            '%s/%d/%s_%s',
            trim($archivePath, '/'),
            $year,
            $employee->getLastName(),
            $employee->getFirstName()
        );

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
}
