<?php

declare(strict_types=1);

namespace OCA\WorkTime\BackgroundJob;

use DateTime;
use OCA\WorkTime\Db\ArchiveQueue;
use OCA\WorkTime\Db\ArchiveQueueMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\NotFoundException;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\TimeEntryService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use Psr\Log\LoggerInterface;

/**
 * Background job that processes the PDF archive queue.
 * Runs every 5 minutes and archives approved monthly reports.
 */
class ArchivePdfJob extends TimedJob {

    public function __construct(
        ITimeFactory $time,
        private ArchiveQueueMapper $queueMapper,
        private CompanySettingsService $settingsService,
        private PdfService $pdfService,
        private EmployeeService $employeeService,
        private TimeEntryService $timeEntryService,
        private AbsenceService $absenceService,
        private HolidayService $holidayService,
        private LoggerInterface $logger,
    ) {
        parent::__construct($time);
        // Run every 5 minutes
        $this->setInterval(300);
    }

    protected function run($argument): void {
        $archiveUserId = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_USER);
        $archivePath = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_PATH);

        if (empty($archiveUserId) || empty($archivePath)) {
            // Not configured, skip silently
            return;
        }

        // Get pending jobs (max 10 per run to avoid timeout)
        $pendingJobs = $this->queueMapper->findPending(10);

        foreach ($pendingJobs as $job) {
            $this->processJob($job, $archiveUserId);
        }

        // Clean up old completed jobs (older than 30 days)
        $this->queueMapper->deleteOldCompleted(30);
    }

    private function processJob(ArchiveQueue $job, string $archiveUserId): void {
        // Mark as processing
        $job->setStatus(ArchiveQueue::STATUS_PROCESSING);
        $this->queueMapper->update($job);

        try {
            $employee = $this->employeeService->find($job->getEmployeeId());

            $timeEntries = $this->timeEntryService->findByEmployeeAndMonth(
                $job->getEmployeeId(),
                $job->getYear(),
                $job->getMonth()
            );

            $absences = $this->absenceService->findByEmployeeAndMonth(
                $job->getEmployeeId(),
                $job->getYear(),
                $job->getMonth()
            );

            $holidays = $this->holidayService->findByMonth(
                $job->getYear(),
                $job->getMonth(),
                $employee->getFederalState()
            );

            $stats = $this->calculateMonthlyStats(
                $employee,
                $job->getYear(),
                $job->getMonth(),
                $timeEntries,
                $absences,
                $holidays
            );

            // Build approval info (includes submission and approval data)
            $approvalInfo = [
                'submittedBy' => $employee,
                'submittedAt' => $job->getSubmittedAt(),
                'approvedBy' => null,
                'approvedAt' => $job->getApprovedAt(),
            ];

            if ($job->getApproverId()) {
                try {
                    $approver = $this->employeeService->find($job->getApproverId());
                    $approvalInfo['approvedBy'] = $approver;
                } catch (NotFoundException) {
                    // Approver not found, continue without
                }
            }

            $pdfContent = $this->pdfService->generateMonthlyReport(
                $employee,
                $job->getYear(),
                $job->getMonth(),
                $timeEntries,
                $absences,
                $holidays,
                $stats,
                $approvalInfo
            );

            // Archive using the configured admin user
            $this->pdfService->archiveMonthlyReport(
                $archiveUserId,
                $employee,
                $job->getYear(),
                $job->getMonth(),
                $pdfContent
            );

            // Mark as completed
            $job->setStatus(ArchiveQueue::STATUS_COMPLETED);
            $job->setProcessedAt(new DateTime());
            $this->queueMapper->update($job);

            $this->logger->info(
                'PDF archived successfully for employee {employeeId}, {year}-{month}',
                [
                    'employeeId' => $job->getEmployeeId(),
                    'year' => $job->getYear(),
                    'month' => $job->getMonth(),
                ]
            );

        } catch (\Exception $e) {
            $job->setAttempts($job->getAttempts() + 1);
            $job->setLastError($e->getMessage());

            if ($job->getAttempts() >= ArchiveQueue::MAX_ATTEMPTS) {
                $job->setStatus(ArchiveQueue::STATUS_FAILED);
                $this->logger->error(
                    'PDF archive permanently failed for employee {employeeId}, {year}-{month}: {error}',
                    [
                        'employeeId' => $job->getEmployeeId(),
                        'year' => $job->getYear(),
                        'month' => $job->getMonth(),
                        'error' => $e->getMessage(),
                    ]
                );
            } else {
                // Reset to pending for retry
                $job->setStatus(ArchiveQueue::STATUS_PENDING);
                $this->logger->warning(
                    'PDF archive failed for employee {employeeId}, {year}-{month}, will retry: {error}',
                    [
                        'employeeId' => $job->getEmployeeId(),
                        'year' => $job->getYear(),
                        'month' => $job->getMonth(),
                        'error' => $e->getMessage(),
                        'attempts' => $job->getAttempts(),
                    ]
                );
            }

            $this->queueMapper->update($job);
        }
    }

    /**
     * Calculate monthly statistics for PDF generation
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

        // Count working days in the month
        $workingDays = $this->countWorkingDays($startDate, $endDate, $holidays);

        // Calculate target minutes based on weekly hours
        $dailyMinutes = ((float)$employee->getWeeklyHours() / 5) * 60;
        $targetMinutes = (int)round($workingDays * $dailyMinutes);

        // Count absence days
        $absenceDays = 0;
        foreach ($absences as $absence) {
            if ($absence->isApproved()) {
                $absenceStart = $absence->getStartDate();
                $absenceEnd = $absence->getEndDate();

                // Limit to month boundaries
                if ($absenceStart < $startDate) {
                    $absenceStart = $startDate;
                }
                if ($absenceEnd > $endDate) {
                    $absenceEnd = $endDate;
                }

                $absenceDays += $this->countWorkingDays($absenceStart, $absenceEnd, $holidays);
            }
        }

        // Adjusted target (reduced by absences)
        $adjustedTargetMinutes = (int)round($targetMinutes - ($absenceDays * $dailyMinutes));

        // Sum actual work minutes
        $actualMinutes = 0;
        foreach ($timeEntries as $entry) {
            $actualMinutes += $entry->getWorkMinutes();
        }

        // Calculate overtime
        $overtimeMinutes = $actualMinutes - $adjustedTargetMinutes;

        return [
            'workingDays' => $workingDays,
            'holidayCount' => count($holidays),
            'absenceDays' => $absenceDays,
            'dailyMinutes' => (int)$dailyMinutes,
            'targetMinutes' => $targetMinutes,
            'adjustedTargetMinutes' => $adjustedTargetMinutes,
            'actualMinutes' => $actualMinutes,
            'actualHours' => round($actualMinutes / 60, 2),
            'overtimeMinutes' => $overtimeMinutes,
            'overtimeHours' => round($overtimeMinutes / 60, 2),
            'entryCount' => count($timeEntries),
        ];
    }

    /**
     * Count working days (Mon-Fri) excluding holidays
     */
    private function countWorkingDays(DateTime $startDate, DateTime $endDate, array $holidays): int {
        $holidayDates = [];
        foreach ($holidays as $holiday) {
            $holidayDates[] = $holiday->getDate()->format('Y-m-d');
        }

        $workingDays = 0;
        $current = clone $startDate;

        while ($current <= $endDate) {
            $dayOfWeek = (int)$current->format('N');
            $dateStr = $current->format('Y-m-d');

            // Count if Monday-Friday and not a holiday
            if ($dayOfWeek < 6 && !in_array($dateStr, $holidayDates)) {
                $workingDays++;
            }

            $current->modify('+1 day');
        }

        return $workingDays;
    }
}
