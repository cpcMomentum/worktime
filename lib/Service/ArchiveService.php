<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\Employee;
use OCP\IConfig;
use OCP\IL10N;
use OCP\L10N\IFactory;

/**
 * Generates and stores the monthly report PDF in the configured archive folder.
 * Used both by the background job (ArchivePdfJob) and the on-demand
 * "archive now" action (#323), so the archive logic lives in one place.
 */
class ArchiveService {

    public const RESULT_CREATED = 'created';
    public const RESULT_REPLACED = 'replaced';
    public const RESULT_NOT_CONFIGURED = 'not_configured';

    public function __construct(
        private CompanySettingsService $settingsService,
        private EmployeeService $employeeService,
        private TimeEntryService $timeEntryService,
        private AbsenceService $absenceService,
        private HolidayService $holidayService,
        private WorkScheduleService $workScheduleService,
        private PdfService $pdfService,
        private IFactory $l10nFactory,
        private IConfig $config,
    ) {
    }

    /** Company record: instance language rather than the triggering user's, German if unset. */
    private function archiveL10n(): IL10N {
        foreach (['force_language', 'default_language'] as $key) {
            $configured = $this->config->getSystemValue($key, false);
            if (!is_string($configured) || $configured === '') {
                continue;
            }
            // A regional variant without its own catalog (en_GB) uses the base language.
            foreach ([$configured, explode('_', $configured)[0]] as $lang) {
                if ($this->l10nFactory->languageExists(Application::APP_ID, $lang)) {
                    return $this->l10nFactory->get(Application::APP_ID, $lang, $this->archiveLocale($lang));
                }
            }
        }
        return $this->l10nFactory->get(Application::APP_ID, 'de', $this->archiveLocale('de'));
    }

    private function archiveLocale(string $lang): string {
        $locale = $this->config->getSystemValue('default_locale', false);
        return is_string($locale) && $this->l10nFactory->localeExists($locale) ? $locale : $lang;
    }

    /**
     * Generate the monthly report PDF and store it in the archive folder.
     * Returns RESULT_CREATED / RESULT_REPLACED / RESULT_NOT_CONFIGURED.
     * Throws on generation/storage failure.
     */
    public function archiveMonth(
        int $employeeId,
        int $year,
        int $month,
        ?int $approverId = null,
        ?DateTime $approvedAt = null,
        ?DateTime $submittedAt = null
    ): string {
        $archiveUserId = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_USER);
        $archivePath = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_PATH);
        if (empty($archiveUserId) || empty($archivePath)) {
            return self::RESULT_NOT_CONFIGURED;
        }

        $employee = $this->employeeService->find($employeeId);
        $timeEntries = $this->timeEntryService->findByEmployeeAndMonth($employeeId, $year, $month);
        $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
        $holidays = $this->holidayService->findByMonth($year, $month, $employee->getFederalState());

        // For on-demand archiving the submission timestamp is not passed in; derive
        // it from the entries so the PDF footer still shows when the month was submitted.
        if ($submittedAt === null) {
            foreach ($timeEntries as $entry) {
                if ($entry->getSubmittedAt() !== null) {
                    $submittedAt = $entry->getSubmittedAt();
                    break;
                }
            }
        }

        $stats = $this->calculateMonthlyStats($employee, $year, $month, $timeEntries, $absences, $holidays);

        $approvalInfo = [
            'submittedBy' => $employee,
            'submittedAt' => $submittedAt,
            'approvedBy' => null,
            'approvedAt' => $approvedAt,
        ];
        if ($approverId) {
            try {
                $approvalInfo['approvedBy'] = $this->employeeService->find($approverId);
            } catch (NotFoundException) {
                // Approver not found, continue without
            }
        }

        $existed = $this->pdfService->archivedReportExists($archiveUserId, $employee, $year, $month);

        $pdfContent = $this->pdfService->generateMonthlyReport(
            $employee,
            $year,
            $month,
            $timeEntries,
            $absences,
            $holidays,
            $stats,
            $approvalInfo,
            $this->archiveL10n()
        );

        $this->pdfService->archiveMonthlyReport($archiveUserId, $employee, $year, $month, $pdfContent);

        return $existed ? self::RESULT_REPLACED : self::RESULT_CREATED;
    }

    /**
     * Calculate monthly statistics for PDF generation.
     * Uses WorkScheduleService for schedule-aware calculations.
     */
    private function calculateMonthlyStats(
        Employee $employee,
        int $year,
        int $month,
        array $timeEntries,
        array $absences,
        array $holidays
    ): array {
        $startDate = new DateTime("$year-$month-01");
        $endDate = (clone $startDate)->modify('last day of this month');
        $employeeId = $employee->getId();

        // Count working days using schedule-aware service
        $workingDays = $this->workScheduleService->countWorkingDays($employeeId, $startDate, $endDate, $holidays);

        // Calculate target minutes using schedule-aware service
        $targetMinutes = $this->workScheduleService->calculateTargetMinutes($employeeId, $startDate, $endDate, $holidays);

        // dailyMinutes approximation for display
        $dailyMinutes = $workingDays > 0 ? (int)round($targetMinutes / $workingDays) : 0;

        // Count absence days and calculate absence minutes
        $absenceDays = 0;
        $absenceMinutesTotal = 0;
        foreach ($absences as $absence) {
            if ($absence->isApproved()) {
                $absenceStart = $absence->getStartDate();
                $absenceEnd = $absence->getEndDate();

                // Limit to month boundaries
                if ($absenceStart < $startDate) {
                    $absenceStart = clone $startDate;
                }
                if ($absenceEnd > $endDate) {
                    $absenceEnd = clone $endDate;
                }

                $absenceDays += $this->workScheduleService->countWorkingDays($employeeId, $absenceStart, $absenceEnd, $holidays);

                // Compensatory time (Freizeitausgleich) keeps the target and is not credited
                // as work, so it is counted as an absence day but NOT deducted from the target
                // minutes -> the overtime balance decreases by the daily target (#186).
                if ($absence->getType() === Absence::TYPE_COMPENSATORY) {
                    continue;
                }

                // Calculate actual absence minutes per day from schedule
                $current = clone $absenceStart;
                $holidayMap = [];
                foreach ($holidays as $holiday) {
                    $holidayMap[$holiday->getDate()->format('Y-m-d')] = true;
                }
                while ($current <= $absenceEnd) {
                    $dateStr = $current->format('Y-m-d');
                    $dayMin = $this->workScheduleService->getDailyMinutesForDate($employeeId, $current);
                    if ($dayMin > 0 && !isset($holidayMap[$dateStr])) {
                        $absenceMinutesTotal += $dayMin;
                    }
                    $current->modify('+1 day');
                }
            }
        }

        // Adjusted target (reduced by absences)
        $adjustedTargetMinutes = $targetMinutes - $absenceMinutesTotal;

        // Sum actual work minutes
        $actualMinutes = 0;
        foreach ($timeEntries as $entry) {
            $actualMinutes += $entry->getWorkMinutes();
        }

        // Calculate overtime
        $overtimeMinutes = $actualMinutes - $adjustedTargetMinutes;

        return [
            'workingDays' => $workingDays,
            'holidayCount' => $this->workScheduleService->countHolidayDays($employeeId, $startDate, $endDate, $holidays),
            'absenceDays' => $absenceDays,
            'dailyMinutes' => $dailyMinutes,
            'targetMinutes' => $targetMinutes,
            'adjustedTargetMinutes' => $adjustedTargetMinutes,
            'actualMinutes' => $actualMinutes,
            'actualHours' => round($actualMinutes / 60, 2),
            'overtimeMinutes' => $overtimeMinutes,
            'overtimeHours' => round($overtimeMinutes / 60, 2),
            'entryCount' => count($timeEntries),
        ];
    }
}
