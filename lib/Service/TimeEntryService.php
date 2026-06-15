<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class TimeEntryService {

    public function __construct(
        private TimeEntryMapper $timeEntryMapper,
        private CompanySettingMapper $settingsMapper,
        private EmployeeMapper $employeeMapper,
        private AbsenceMapper $absenceMapper,
        private AuditLogService $auditLogService,
        private NotificationService $notificationService,
        private LoggerInterface $logger,
        private IL10N $l,
    ) {
    }

    /**
     * Get employee ID for a user ID
     */
    private function getEmployeeIdForUser(string $userId): ?int {
        try {
            $employee = $this->employeeMapper->findByUserId($userId);
            return $employee->getId();
        } catch (DoesNotExistException) {
            return null;
        }
    }

    /**
     * @return TimeEntry[]
     */
    public function findByEmployee(int $employeeId): array {
        return $this->timeEntryMapper->findByEmployee($employeeId);
    }

    /**
     * @return TimeEntry[]
     */
    public function findByEmployeeAndMonth(int $employeeId, int $year, int $month): array {
        return $this->timeEntryMapper->findByEmployeeAndMonth($employeeId, $year, $month);
    }

    /**
     * @return TimeEntry[]
     */
    public function findByEmployeeAndDateRange(int $employeeId, DateTime $startDate, DateTime $endDate): array {
        return $this->timeEntryMapper->findByEmployeeAndDateRange($employeeId, $startDate, $endDate);
    }

    /**
     * @return TimeEntry[]
     */
    public function findByEmployeeAndDate(int $employeeId, DateTime $date): array {
        return $this->timeEntryMapper->findByEmployeeAndDate($employeeId, $date);
    }

    /**
     * @throws NotFoundException
     */
    public function find(int $id): TimeEntry {
        try {
            return $this->timeEntryMapper->find($id);
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Time entry not found');
        }
    }

    /**
     * @throws ValidationException
     */
    public function create(
        int $employeeId,
        string $date,
        string $startTime,
        string $endTime,
        int $breakMinutes,
        ?int $projectId = null,
        ?string $description = null,
        string $currentUserId = '',
        ?string $reason = null,
        bool $allowLockedOverride = false
    ): TimeEntry {
        $dateObj = new DateTime($date);
        $startTimeObj = DateTime::createFromFormat('H:i', $startTime) ?: null;
        $endTimeObj = DateTime::createFromFormat('H:i', $endTime) ?: null;

        // Validate (including absence conflict check)
        $errors = $this->validate($dateObj, $startTimeObj, $endTimeObj, $breakMinutes, $employeeId);

        // Check for overlapping entries (only when times are valid)
        if ($startTimeObj !== null && $endTimeObj !== null) {
            $overlapError = $this->checkOverlap($employeeId, $dateObj, $startTimeObj, $endTimeObj);
            if ($overlapError) {
                $errors['overlap'] = [$overlapError];
            }
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Closed-month rules (#148): block employees, require a reason for HR corrections.
        $lockedMonths = $this->lockedMonthsInRange($employeeId, $dateObj, $dateObj);
        $effectiveReason = $this->requireReasonForLockedMonths($lockedMonths, $allowLockedOverride, $reason);

        // Calculate work minutes
        $workMinutes = $this->calculateWorkMinutes($startTimeObj, $endTimeObj, $breakMinutes);

        $entry = new TimeEntry();
        $entry->setEmployeeId($employeeId);
        $entry->setDate($dateObj);
        $entry->setStartTime($startTimeObj);
        $entry->setEndTime($endTimeObj);
        $entry->setBreakMinutes($breakMinutes);
        $entry->setWorkMinutes($workMinutes);
        $entry->setProjectId($projectId);
        $entry->setDescription($description);
        $entry->setStatus(TimeEntry::STATUS_DRAFT);
        $entry->setCreatedAt(new DateTime());
        $entry->setUpdatedAt(new DateTime());

        $entry = $this->timeEntryMapper->insert($entry);

        // Audit log (record the HR correction reason when present)
        if ($currentUserId) {
            $auditReason = $this->auditReason($effectiveReason, $allowLockedOverride, $reason);
            $newValues = $entry->jsonSerialize();
            if ($auditReason !== null) {
                $newValues['reason'] = $auditReason;
            }
            $this->auditLogService->logCreate($currentUserId, 'time_entry', $entry->getId(), $newValues);
        }

        // HR correction in a closed month: reopen the affected months for re-approval.
        if ($effectiveReason !== null) {
            $this->reopenLockedMonths($employeeId, $lockedMonths, $effectiveReason, $currentUserId);
        }

        return $entry;
    }

    /**
     * @throws NotFoundException
     * @throws ValidationException
     */
    public function update(
        int $id,
        string $date,
        string $startTime,
        string $endTime,
        int $breakMinutes,
        ?int $projectId = null,
        ?string $description = null,
        string $currentUserId = '',
        ?string $reason = null,
        bool $allowLockedOverride = false
    ): TimeEntry {
        $entry = $this->find($id);
        $oldValues = $entry->jsonSerialize();
        $oldDate = clone $entry->getDate();

        $dateObj = new DateTime($date);
        $startTimeObj = DateTime::createFromFormat('H:i', $startTime) ?: null;
        $endTimeObj = DateTime::createFromFormat('H:i', $endTime) ?: null;

        // Validate (including absence conflict check)
        $errors = $this->validate($dateObj, $startTimeObj, $endTimeObj, $breakMinutes, $entry->getEmployeeId());

        // Check for overlapping entries (exclude current entry; only when times are valid)
        if ($startTimeObj !== null && $endTimeObj !== null) {
            $overlapError = $this->checkOverlap($entry->getEmployeeId(), $dateObj, $startTimeObj, $endTimeObj, $id);
            if ($overlapError) {
                $errors['overlap'] = [$overlapError];
            }
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Closed-month rules (#148): block employees, require a reason for HR
        // corrections. Cover both the old and the new date (a move can leave a
        // closed month).
        $rangeStart = $oldDate <= $dateObj ? $oldDate : $dateObj;
        $rangeEnd = $oldDate <= $dateObj ? $dateObj : $oldDate;
        $lockedMonths = $this->lockedMonthsInRange($entry->getEmployeeId(), $rangeStart, $rangeEnd);
        $effectiveReason = $this->requireReasonForLockedMonths($lockedMonths, $allowLockedOverride, $reason);

        // Employees cannot edit approved/submitted entries; an HR correction may.
        if (!$allowLockedOverride) {
            if ($entry->getStatus() === TimeEntry::STATUS_APPROVED) {
                throw ValidationException::fromSingleError('status', 'Cannot edit approved time entries');
            }
            if ($entry->getStatus() === TimeEntry::STATUS_SUBMITTED) {
                throw ValidationException::fromSingleError('status', 'Cannot edit submitted time entries');
            }
        }

        // Calculate work minutes
        $workMinutes = $this->calculateWorkMinutes($startTimeObj, $endTimeObj, $breakMinutes);

        $entry->setDate($dateObj);
        $entry->setStartTime($startTimeObj);
        $entry->setEndTime($endTimeObj);
        $entry->setBreakMinutes($breakMinutes);
        $entry->setWorkMinutes($workMinutes);
        $entry->setProjectId($projectId);
        $entry->setDescription($description);
        $entry->setUpdatedAt(new DateTime());

        if ($effectiveReason !== null) {
            // HR correction in a closed month: the entry returns to draft and the
            // month is reopened for re-approval.
            $entry->setStatus(TimeEntry::STATUS_DRAFT);
            $entry->setApprovedAt(null);
            $entry->setApprovedBy(null);
            $entry->setSubmittedAt(null);
            $entry->setSubmittedBy(null);
        } elseif ($entry->getStatus() === TimeEntry::STATUS_REJECTED) {
            // Reset to draft if was rejected
            $entry->setStatus(TimeEntry::STATUS_DRAFT);
        }

        $entry = $this->timeEntryMapper->update($entry);

        // Audit log (record the HR correction reason when present)
        if ($currentUserId) {
            $auditReason = $this->auditReason($effectiveReason, $allowLockedOverride, $reason);
            $newValues = $entry->jsonSerialize();
            if ($auditReason !== null) {
                $newValues['reason'] = $auditReason;
            }
            $this->auditLogService->logUpdate($currentUserId, 'time_entry', $entry->getId(), $oldValues, $newValues);
        }

        // Reopen the affected closed months for re-approval.
        if ($effectiveReason !== null) {
            $this->reopenLockedMonths($entry->getEmployeeId(), $lockedMonths, $effectiveReason, $currentUserId);
        }

        return $entry;
    }

    /**
     * @throws NotFoundException
     * @throws ValidationException
     * @throws ForbiddenException
     */
    public function delete(int $id, string $currentUserId = '', ?string $reason = null, bool $allowLockedOverride = false): void {
        $entry = $this->find($id);

        // Closed-month rules (#148): block employees, require a reason for HR corrections.
        $lockedMonths = $this->lockedMonthsInRange($entry->getEmployeeId(), $entry->getDate(), $entry->getDate());
        $effectiveReason = $this->requireReasonForLockedMonths($lockedMonths, $allowLockedOverride, $reason);

        // Approved/submitted entries cannot be deleted — except by an HR correction
        // of a CLOSED month (which requires a reason and reopens the month). In open
        // months the rule applies to everyone (use reopen/reject instead).
        if (!($allowLockedOverride && !empty($lockedMonths))) {
            if ($entry->getStatus() === TimeEntry::STATUS_APPROVED) {
                throw new ForbiddenException('Cannot delete approved time entries');
            }
            if ($entry->getStatus() === TimeEntry::STATUS_SUBMITTED) {
                throw new ForbiddenException('Cannot delete submitted time entries');
            }
        }

        // Audit log (record the HR correction reason when present)
        if ($currentUserId) {
            $auditReason = $this->auditReason($effectiveReason, $allowLockedOverride, $reason);
            $values = $entry->jsonSerialize();
            if ($auditReason !== null) {
                $values['reason'] = $auditReason;
            }
            $this->auditLogService->logDelete($currentUserId, 'time_entry', $entry->getId(), $values);
        }

        $this->timeEntryMapper->delete($entry);

        // HR correction in a closed month: reopen the affected months for re-approval.
        if ($effectiveReason !== null) {
            $this->reopenLockedMonths($entry->getEmployeeId(), $lockedMonths, $effectiveReason, $currentUserId);
        }
    }

    /**
     * @throws NotFoundException
     */
    public function submit(int $id, string $currentUserId = ''): TimeEntry {
        $entry = $this->find($id);
        $oldValues = $entry->jsonSerialize();

        if ($entry->getStatus() !== TimeEntry::STATUS_DRAFT && $entry->getStatus() !== TimeEntry::STATUS_REJECTED) {
            throw new ForbiddenException('Can only submit draft or rejected entries');
        }

        $entry->setStatus(TimeEntry::STATUS_SUBMITTED);
        $entry->setUpdatedAt(new DateTime());
        $entry->setSubmittedAt(new DateTime());
        if ($currentUserId) {
            $entry->setSubmittedBy($this->getEmployeeIdForUser($currentUserId));
        }
        // Clear any previous approval data when re-submitting
        $entry->setApprovedAt(null);
        $entry->setApprovedBy(null);

        $entry = $this->timeEntryMapper->update($entry);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'submit', 'time_entry', $entry->getId(), $oldValues, $entry->jsonSerialize());
        }

        return $entry;
    }

    /**
     * Submit all draft entries for a month
     *
     * @return array{submitted: int, skipped: int}
     */
    public function submitMonth(int $employeeId, int $year, int $month, string $currentUserId = ''): array {
        $entries = $this->findByEmployeeAndMonth($employeeId, $year, $month);

        $submitted = 0;
        $skipped = 0;
        $submittedByEmployeeId = $currentUserId ? $this->getEmployeeIdForUser($currentUserId) : null;
        $now = new DateTime();

        foreach ($entries as $entry) {
            if ($entry->getStatus() === TimeEntry::STATUS_DRAFT || $entry->getStatus() === TimeEntry::STATUS_REJECTED) {
                $oldValues = $entry->jsonSerialize();
                $entry->setStatus(TimeEntry::STATUS_SUBMITTED);
                $entry->setUpdatedAt($now);
                $entry->setSubmittedAt($now);
                $entry->setSubmittedBy($submittedByEmployeeId);
                // Clear any previous approval data when re-submitting
                $entry->setApprovedAt(null);
                $entry->setApprovedBy(null);
                $this->timeEntryMapper->update($entry);

                // Audit log
                if ($currentUserId) {
                    $this->auditLogService->log($currentUserId, 'submit', 'time_entry', $entry->getId(), $oldValues, $entry->jsonSerialize());
                }

                $submitted++;
            } else {
                $skipped++;
            }
        }

        if ($submitted > 0) {
            try {
                $this->notificationService->notifyTimeEntriesSubmitted($employeeId, $year, $month);
            } catch (\Throwable $e) {
                $this->logger->error('Failed to send time entries submitted notification', ['exception' => $e]);
            }
        }

        return [
            'submitted' => $submitted,
            'skipped' => $skipped,
        ];
    }

    /**
     * @throws NotFoundException
     */
    public function approve(int $id, string $currentUserId = ''): TimeEntry {
        $entry = $this->find($id);
        $oldValues = $entry->jsonSerialize();

        if ($entry->getStatus() !== TimeEntry::STATUS_SUBMITTED) {
            throw new ForbiddenException('Can only approve submitted entries');
        }

        $entry->setStatus(TimeEntry::STATUS_APPROVED);
        $entry->setUpdatedAt(new DateTime());
        $entry->setApprovedAt(new DateTime());
        if ($currentUserId) {
            $entry->setApprovedBy($this->getEmployeeIdForUser($currentUserId));
        }

        $entry = $this->timeEntryMapper->update($entry);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'approve', 'time_entry', $entry->getId(), $oldValues, $entry->jsonSerialize());
        }

        try {
            $date = $entry->getDate();
            $this->notificationService->notifyTimeEntriesApproved(
                $entry->getEmployeeId(),
                (int)$date->format('Y'),
                (int)$date->format('n')
            );
        } catch (\Throwable $e) {
            $this->logger->error('Failed to send time entry approval notification', ['exception' => $e]);
        }

        return $entry;
    }

    /**
     * @throws NotFoundException
     */
    public function reject(int $id, string $currentUserId = ''): TimeEntry {
        $entry = $this->find($id);
        $oldValues = $entry->jsonSerialize();

        if ($entry->getStatus() !== TimeEntry::STATUS_SUBMITTED) {
            throw new ForbiddenException('Can only reject submitted entries');
        }

        $entry->setStatus(TimeEntry::STATUS_REJECTED);
        $entry->setUpdatedAt(new DateTime());
        // Also track who rejected and when
        $entry->setApprovedAt(new DateTime());
        if ($currentUserId) {
            $entry->setApprovedBy($this->getEmployeeIdForUser($currentUserId));
        }

        $entry = $this->timeEntryMapper->update($entry);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'reject', 'time_entry', $entry->getId(), $oldValues, $entry->jsonSerialize());
        }

        try {
            $date = $entry->getDate();
            $this->notificationService->notifyTimeEntriesRejected(
                $entry->getEmployeeId(),
                (int)$date->format('Y'),
                (int)$date->format('n')
            );
        } catch (\Throwable $e) {
            $this->logger->error('Failed to send time entry rejection notification', ['exception' => $e]);
        }

        return $entry;
    }

    /**
     * Approve all submitted entries for a month
     *
     * @return array{approved: int, skipped: int}
     */
    public function approveMonth(int $employeeId, int $year, int $month, string $currentUserId = ''): array {
        $entries = $this->findByEmployeeAndMonth($employeeId, $year, $month);

        $approved = 0;
        $skipped = 0;
        $approvedByEmployeeId = $currentUserId ? $this->getEmployeeIdForUser($currentUserId) : null;
        $now = new DateTime();

        foreach ($entries as $entry) {
            if ($entry->getStatus() === TimeEntry::STATUS_SUBMITTED) {
                $oldValues = $entry->jsonSerialize();
                $entry->setStatus(TimeEntry::STATUS_APPROVED);
                $entry->setUpdatedAt($now);
                $entry->setApprovedAt($now);
                $entry->setApprovedBy($approvedByEmployeeId);
                $this->timeEntryMapper->update($entry);

                // Audit log
                if ($currentUserId) {
                    $this->auditLogService->log($currentUserId, 'approve', 'time_entry', $entry->getId(), $oldValues, $entry->jsonSerialize());
                }

                $approved++;
            } else {
                $skipped++;
            }
        }

        if ($approved > 0) {
            try {
                $this->notificationService->notifyTimeEntriesApproved($employeeId, $year, $month);
            } catch (\Throwable $e) {
                $this->logger->error('Failed to send time entries approved notification', ['exception' => $e]);
            }
        }

        return [
            'approved' => $approved,
            'skipped' => $skipped,
        ];
    }

    /**
     * Reopen an approved month for correction: approved entries go back to draft.
     * A reason is mandatory and recorded in the audit log.
     *
     * @return array{reopened: int, skipped: int}
     * @throws ValidationException
     */
    public function reopenMonth(int $employeeId, int $year, int $month, string $reason, string $currentUserId = ''): array {
        $reason = trim($reason);
        if ($reason === '') {
            throw ValidationException::fromSingleError('reason', $this->l->t('Begründung erforderlich'));
        }

        $entries = $this->findByEmployeeAndMonth($employeeId, $year, $month);
        $reopened = 0;
        $skipped = 0;
        $now = new DateTime();

        foreach ($entries as $entry) {
            if ($entry->getStatus() === TimeEntry::STATUS_APPROVED) {
                $oldValues = $entry->jsonSerialize();
                $entry->setStatus(TimeEntry::STATUS_DRAFT);
                $entry->setApprovedAt(null);
                $entry->setApprovedBy(null);
                $entry->setSubmittedAt(null);
                $entry->setSubmittedBy(null);
                $entry->setUpdatedAt($now);
                $this->timeEntryMapper->update($entry);

                if ($currentUserId) {
                    $newValues = $entry->jsonSerialize();
                    $newValues['reason'] = $reason;
                    $this->auditLogService->log($currentUserId, 'reopen', 'time_entry', $entry->getId(), $oldValues, $newValues);
                }

                $reopened++;
            } else {
                $skipped++;
            }
        }

        if ($reopened > 0) {
            $this->notificationService->notifyTimeEntriesReopened($employeeId, $year, $month, $reason);
        }

        return [
            'reopened' => $reopened,
            'skipped' => $skipped,
        ];
    }

    /**
     * Calculate suggested break time based on German labor law (§4 ArbZG)
     *
     * Rules:
     * - ≤6h working time: 0 min break
     * - >6h to 9h working time: 30 min break
     * - >9h working time: 45 min break
     */
    public function suggestBreak(string $startTime, string $endTime): int {
        $startTimeObj = DateTime::createFromFormat('H:i', $startTime);
        $endTimeObj = DateTime::createFromFormat('H:i', $endTime);

        if (!$startTimeObj || !$endTimeObj) {
            return 0;
        }

        $grossMinutes = ($endTimeObj->getTimestamp() - $startTimeObj->getTimestamp()) / 60;

        // Handle overnight shifts
        if ($grossMinutes < 0) {
            $grossMinutes += 24 * 60;
        }

        $grossHours = $grossMinutes / 60;

        // Get configured break times from settings
        $break6h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_6H);
        $break9h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_9H);

        if ($grossHours <= 6) {
            return 0;
        } elseif ($grossHours <= 9) {
            return $break6h;
        } else {
            return $break9h;
        }
    }

    /**
     * Validate break time against labor law requirements
     */
    public function validateBreak(int $grossMinutes, int $breakMinutes): bool {
        $grossHours = $grossMinutes / 60;

        $break6h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_6H);
        $break9h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_9H);

        if ($grossHours <= 6) {
            return true; // No break required
        } elseif ($grossHours <= 9) {
            return $breakMinutes >= $break6h;
        } else {
            return $breakMinutes >= $break9h;
        }
    }

    /**
     * Get monthly statistics for an employee
     */
    public function getMonthlyStats(int $employeeId, int $year, int $month): array {
        $totalWorkMinutes = $this->timeEntryMapper->sumWorkMinutesByEmployeeAndMonth($employeeId, $year, $month);
        $entryCount = $this->timeEntryMapper->countEntriesByEmployeeAndMonth($employeeId, $year, $month);

        return [
            'totalWorkMinutes' => $totalWorkMinutes,
            'totalWorkHours' => round($totalWorkMinutes / 60, 2),
            'entryCount' => $entryCount,
        ];
    }

    /**
     * Check if a month is fully approved (all time entries approved)
     */
    public function isMonthApproved(int $employeeId, int $year, int $month): bool {
        $summary = $this->timeEntryMapper->getMonthlyStatusSummary($employeeId, $year, $month);
        $total = $summary['draft'] + $summary['submitted'] + $summary['approved'] + $summary['rejected'];
        return $total > 0 && $summary['approved'] === $total;
    }

    /**
     * Whether a month is locked for employee self-service (#148): a month is
     * locked when it is fully approved, or when it lies in a past calendar year
     * (regardless of approval status). HR/Admin can still correct it via the
     * HR correction flow (reason + month reopening).
     */
    public function isMonthLocked(int $employeeId, int $year, int $month): bool {
        $currentYear = (int)(new DateTime())->format('Y');
        if ($year < $currentYear) {
            return true;
        }
        return $this->isMonthApproved($employeeId, $year, $month);
    }

    /**
     * The locked months that a date range touches.
     *
     * @return array<array{0: int, 1: int}> list of [year, month] pairs
     */
    public function lockedMonthsInRange(int $employeeId, DateTime $start, DateTime $end): array {
        $locked = [];
        $cursor = new DateTime($start->format('Y-m-01'));
        $last = new DateTime($end->format('Y-m-01'));
        while ($cursor <= $last) {
            $year = (int)$cursor->format('Y');
            $month = (int)$cursor->format('n');
            if ($this->isMonthLocked($employeeId, $year, $month)) {
                $locked[] = [$year, $month];
            }
            $cursor->modify('+1 month');
        }
        return $locked;
    }

    /**
     * Enforce the closed-month rules for a create/update (#148), shared by the
     * time-entry and absence services.
     *
     * - No locked month touched: returns null (normal save).
     * - Locked month touched without override: blocks (employee self-service).
     * - Locked month touched with override (HR/Admin): requires a reason of at
     *   least 10 characters and returns it (the caller records it in the audit
     *   log and reopens the affected months).
     *
     * @param array<array{0: int, 1: int}> $lockedMonths
     * @throws ValidationException
     */
    public function requireReasonForLockedMonths(array $lockedMonths, bool $allowOverride, ?string $reason): ?string {
        if (empty($lockedMonths)) {
            return null;
        }
        if (!$allowOverride) {
            throw ValidationException::fromSingleError(
                'period',
                $this->l->t('Dieser Zeitraum ist abgeschlossen. Bitte wende dich an HR.')
            );
        }
        $reason = trim((string)$reason);
        if (mb_strlen($reason) < 10) {
            throw ValidationException::fromSingleError(
                'reason',
                $this->l->t('Begründung erforderlich (mindestens 10 Zeichen).')
            );
        }
        return $reason;
    }

    /**
     * The reason to record in the audit log for a create/update (#148): the
     * enforced reason for a closed month, otherwise any reason an HR/Admin
     * deliberately supplied (so every HR correction stays documented), else null.
     */
    public function auditReason(?string $effectiveReason, bool $allowOverride, ?string $reason): ?string {
        if ($effectiveReason !== null) {
            return $effectiveReason;
        }
        if ($allowOverride) {
            $trimmed = trim((string)$reason);
            if ($trimmed !== '') {
                return $trimmed;
            }
        }
        return null;
    }

    /**
     * Reopen the given (closed) months after an HR correction: their approved
     * entries go back to draft and the employee is notified.
     *
     * @param array<array{0: int, 1: int}> $lockedMonths
     */
    private function reopenLockedMonths(int $employeeId, array $lockedMonths, string $reason, string $currentUserId): void {
        foreach ($lockedMonths as [$year, $month]) {
            $this->reopenMonth($employeeId, $year, $month, $reason, $currentUserId);
        }
    }

    /**
     * Calculate work minutes from start/end time and break
     */
    private function calculateWorkMinutes(DateTime $startTime, DateTime $endTime, int $breakMinutes): int {
        $grossMinutes = ($endTime->getTimestamp() - $startTime->getTimestamp()) / 60;

        // Handle overnight shifts
        if ($grossMinutes < 0) {
            $grossMinutes += 24 * 60;
        }

        return max(0, (int)$grossMinutes - $breakMinutes);
    }

    /**
     * @return array<string, string[]>
     */
    private function validate(DateTime $date, ?DateTime $startTime, ?DateTime $endTime, int $breakMinutes, ?int $employeeId = null): array {
        $errors = [];

        // Check future dates
        $allowFuture = $this->settingsMapper->getValueAsBool(CompanySetting::KEY_ALLOW_FUTURE_ENTRIES);
        if (!$allowFuture && $date > new DateTime('today')) {
            $errors['date'] = [$this->l->t('Zukünftige Einträge sind nicht erlaubt')];
        }

        if (!$startTime) {
            $errors['startTime'] = [$this->l->t('Ungültiges Zeitformat')];
        }

        if (!$endTime) {
            $errors['endTime'] = [$this->l->t('Ungültiges Zeitformat')];
        }

        if ($startTime && $endTime) {
            $grossMinutes = ($endTime->getTimestamp() - $startTime->getTimestamp()) / 60;
            if ($grossMinutes < 0) {
                $grossMinutes += 24 * 60;
            }

            // Check max daily hours
            $maxHours = $this->settingsMapper->getValueAsFloat(CompanySetting::KEY_MAX_DAILY_HOURS);
            if ($grossMinutes / 60 > $maxHours) {
                $errors['endTime'] = [$this->l->t('Maximale tägliche Arbeitszeit (%s Std.) überschritten', [(string)$maxHours])];
            }

            // Validate break
            if (!$this->validateBreak((int)$grossMinutes, $breakMinutes)) {
                $break6h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_6H);
                $break9h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_9H);
                $minBreak = $grossMinutes > 9 * 60 ? $break9h : $break6h;
                $errors['breakMinutes'] = [$this->l->t('Mindestpause von %d Minuten erforderlich', [$minBreak])];
            }

            // Check for absence conflict
            if ($employeeId !== null) {
                $absenceError = $this->checkAbsenceConflict($employeeId, $date, (int)$grossMinutes - $breakMinutes);
                if ($absenceError !== null) {
                    $errors['date'] = [$absenceError];
                }
            }
        }

        if ($breakMinutes < 0) {
            $errors['breakMinutes'] = [$this->l->t('Pause kann nicht negativ sein')];
        }

        return $errors;
    }

    /**
     * Check if a time entry conflicts with an approved absence
     *
     * @param int $employeeId Employee ID
     * @param DateTime $date Date of the time entry
     * @param int $workMinutes Net work minutes planned
     * @return string|null Error message if conflict, null otherwise
     */
    private function checkAbsenceConflict(int $employeeId, DateTime $date, int $workMinutes): ?string {
        // Find absences that cover this date
        $absences = $this->absenceMapper->findByEmployeeAndDate($employeeId, $date);

        foreach ($absences as $absence) {
            // Only check approved absences
            if ($absence->getStatus() !== Absence::STATUS_APPROVED) {
                continue;
            }

            if ($absence->isHalfDay()) {
                // Half-day absence: allow time entry without restriction
                // The overtime calculation handles the reduced target time correctly
                continue;
            } else {
                // Full-day absence: block entry completely
                return $this->l->t('An diesem Tag haben Sie %s. Bitte stornieren Sie zuerst die Abwesenheit.', [$absence->getTypeName()]);
            }
        }

        return null;
    }

    /**
     * Check if new time entry overlaps with existing entries
     *
     * @param int $employeeId
     * @param DateTime $date
     * @param DateTime $startTime
     * @param DateTime $endTime
     * @param int|null $excludeId Entry ID to exclude (for updates)
     * @return string|null Error message if overlap found, null otherwise
     */
    private function checkOverlap(int $employeeId, DateTime $date, DateTime $startTime, DateTime $endTime, ?int $excludeId = null): ?string {
        $existingEntries = $this->timeEntryMapper->findByEmployeeAndDate($employeeId, $date);

        $newStart = (int)$startTime->format('H') * 60 + (int)$startTime->format('i');
        $newEnd = (int)$endTime->format('H') * 60 + (int)$endTime->format('i');

        // Handle overnight shifts
        if ($newEnd <= $newStart) {
            $newEnd += 24 * 60;
        }

        foreach ($existingEntries as $entry) {
            // Skip the entry being updated
            if ($excludeId !== null && $entry->getId() === $excludeId) {
                continue;
            }

            $existingStart = (int)$entry->getStartTime()->format('H') * 60 + (int)$entry->getStartTime()->format('i');
            $existingEnd = (int)$entry->getEndTime()->format('H') * 60 + (int)$entry->getEndTime()->format('i');

            // Handle overnight shifts
            if ($existingEnd <= $existingStart) {
                $existingEnd += 24 * 60;
            }

            // Check for overlap: two time ranges overlap if one starts before the other ends
            // and ends after the other starts
            if ($newStart < $existingEnd && $newEnd > $existingStart) {
                $existingStartStr = $entry->getStartTime()->format('H:i');
                $existingEndStr = $entry->getEndTime()->format('H:i');
                return $this->l->t('Überlappung mit bestehendem Eintrag (%1$s - %2$s)', [$existingStartStr, $existingEndStr]);
            }
        }

        return null;
    }
}
