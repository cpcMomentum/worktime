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
        private ProjectService $projectService,
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

        // Company rule (#329): enforce required project / description when configured.
        $errors = array_merge($errors, $this->requiredFieldErrors($employeeId, $projectId, $description));

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

        // Project assignment (#58): the employee must be allowed to book on the project.
        if ($projectId !== null && !$this->projectService->isProjectAllowedForEmployee($projectId, $employeeId)) {
            throw ValidationException::fromSingleError('projectId', $this->l->t('Dieses Projekt ist dem Mitarbeiter nicht zugeordnet.'));
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

        // Company rule (#329): enforce required project / description when configured.
        $errors = array_merge($errors, $this->requiredFieldErrors($entry->getEmployeeId(), $projectId, $description));

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

        // Project assignment (#58): only validate when the project actually changes,
        // so existing entries on a now-restricted project stay editable (grandfathering).
        if ($projectId !== null
            && $projectId !== $entry->getProjectId()
            && !$this->projectService->isProjectAllowedForEmployee($projectId, $entry->getEmployeeId())) {
            throw ValidationException::fromSingleError('projectId', $this->l->t('Dieses Projekt ist dem Mitarbeiter nicht zugeordnet.'));
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
     * Reject a submitted month: set all submitted entries back to rejected so the
     * employee can correct and resubmit. Mirrors the per-entry reject (submitted → rejected).
     */
    public function rejectMonth(int $employeeId, int $year, int $month, string $reason, string $currentUserId = ''): array {
        $reason = trim($reason);
        if ($reason === '') {
            throw ValidationException::fromSingleError('reason', $this->l->t('Begründung erforderlich'));
        }

        $entries = $this->findByEmployeeAndMonth($employeeId, $year, $month);
        $rejected = 0;
        $skipped = 0;
        $rejectedByEmployeeId = $currentUserId ? $this->getEmployeeIdForUser($currentUserId) : null;
        $now = new DateTime();

        foreach ($entries as $entry) {
            if ($entry->getStatus() === TimeEntry::STATUS_SUBMITTED) {
                $oldValues = $entry->jsonSerialize();
                $entry->setStatus(TimeEntry::STATUS_REJECTED);
                $entry->setUpdatedAt($now);
                // Track who rejected and when (same fields as the per-entry reject)
                $entry->setApprovedAt($now);
                $entry->setApprovedBy($rejectedByEmployeeId);
                $this->timeEntryMapper->update($entry);

                if ($currentUserId) {
                    $newValues = $entry->jsonSerialize();
                    $newValues['reason'] = $reason;
                    $this->auditLogService->log($currentUserId, 'reject', 'time_entry', $entry->getId(), $oldValues, $newValues);
                }

                $rejected++;
            } else {
                $skipped++;
            }
        }

        if ($rejected > 0) {
            try {
                $this->notificationService->notifyTimeEntriesRejected($employeeId, $year, $month);
            } catch (\Throwable $e) {
                $this->logger->error('Failed to send time entries rejected notification', ['exception' => $e]);
            }
        }

        return [
            'rejected' => $rejected,
            'skipped' => $skipped,
        ];
    }

    /**
     * Calculate suggested break time based on German labor law (§4 ArbZG).
     *
     * §4 ArbZG ties the thresholds to the WORKING time (net, without the break;
     * §2 Abs. 1 ArbZG). Because the break itself reduces the working time, the
     * smallest legally sufficient break is determined — equivalently, the gross
     * (attendance) thresholds are 6h and (9h + break6h). Example: 9h01 attendance
     * with a 30 min break = 8h31 working time ≤ 9h → 30 min suffice, not 45. (#403)
     *
     * Rules (on working time):
     * - ≤6h working time: 0 min break
     * - >6h to 9h working time: break6h (default 30)
     * - >9h working time: break9h (default 45)
     */
    public function suggestBreak(string $startTime, string $endTime): int {
        $startTimeObj = DateTime::createFromFormat('H:i', $startTime);
        $startErrors = DateTime::getLastErrors();
        $endTimeObj = DateTime::createFromFormat('H:i', $endTime);
        $endErrors = DateTime::getLastErrors();

        // createFromFormat('H:i', ...) is lenient: '25:00' rolls over to the next
        // day instead of failing. Reject any overflow/invalid input (e.g. hour > 23)
        // via getLastErrors so garbage does not produce a bogus break suggestion.
        if (!$startTimeObj || !$endTimeObj
            || ($startErrors && ($startErrors['warning_count'] || $startErrors['error_count']))
            || ($endErrors && ($endErrors['warning_count'] || $endErrors['error_count']))) {
            return 0;
        }

        $grossMinutes = ($endTimeObj->getTimestamp() - $startTimeObj->getTimestamp()) / 60;

        // Handle overnight shifts
        if ($grossMinutes < 0) {
            $grossMinutes += 24 * 60;
        }

        // Get configured break times from settings
        $break6h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_6H);
        $break9h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_9H);

        if ($grossMinutes <= 6 * 60) {
            return 0;
        } elseif ($grossMinutes <= 9 * 60 + $break6h) {
            return $break6h;
        } else {
            return $break9h;
        }
    }

    /**
     * Validate break time against labor law requirements (§4 ArbZG).
     * Uses the same threshold as suggestBreak() so the gate matches the suggested
     * minimum: the upper step is 9h + break6h gross, not a flat 9h. (#403)
     */
    public function validateBreak(int $grossMinutes, int $breakMinutes): bool {
        $break6h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_6H);
        $break9h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_9H);

        if ($grossMinutes <= 6 * 60) {
            return true; // No break required
        } elseif ($grossMinutes <= 9 * 60 + $break6h) {
            return $breakMinutes >= $break6h;
        } else {
            return $breakMinutes >= $break9h;
        }
    }

    /**
     * Evaluate labor-law constraints for a single day across ALL of its entries
     * (#338). A day may be split into several entries; checking each one in
     * isolation lets a long working day slip past the §4 ArbZG break requirement
     * and the configured maximum daily hours. Both are therefore aggregated here
     * and returned as non-blocking warnings.
     *
     * Convention (kept consistent with validateBreak()/suggestBreak()): the §4
     * threshold is evaluated against the total GROSS minutes of the day (sum of
     * each entry's start→end span, excluding the gaps between entries), while the
     * §3 max-hours check is evaluated against the total NET minutes (gross minus
     * breaks, #437). Gaps between consecutive entries count as break time, on top
     * of the explicitly recorded break minutes.
     *
     * @param TimeEntry[] $entries All time entries of one day (same date).
     * @return string[] Human-readable warning messages (empty when compliant).
     */
    public function dayWarnings(array $entries): array {
        if (empty($entries)) {
            return [];
        }

        // Sort by start time so the gaps between entries can be measured.
        usort($entries, static function (TimeEntry $a, TimeEntry $b): int {
            return $a->getStartTime()->getTimestamp() <=> $b->getStartTime()->getTimestamp();
        });

        $totalGrossMinutes = 0;
        $totalBreakMinutes = 0;
        $previousEnd = null;

        foreach ($entries as $entry) {
            $start = $entry->getStartTime();
            $end = $entry->getEndTime();
            if (!$start || !$end) {
                continue;
            }

            $gross = ($end->getTimestamp() - $start->getTimestamp()) / 60;
            if ($gross < 0) {
                $gross += 24 * 60; // overnight shift
            }
            $totalGrossMinutes += (int)$gross;
            $totalBreakMinutes += max(0, $entry->getBreakMinutes());

            // A gap between the previous entry's end and this entry's start counts
            // as a (taken) break. Only positive gaps are counted; overlaps are
            // prevented elsewhere.
            if ($previousEnd !== null) {
                $gap = ($start->getTimestamp() - $previousEnd->getTimestamp()) / 60;
                if ($gap > 0) {
                    $totalBreakMinutes += (int)$gap;
                }
            }
            $previousEnd = $end;
        }

        $warnings = [];

        // §4 ArbZG minimum break, evaluated on the whole day. Upper step is
        // 9h + break6h gross (not a flat 9h), consistent with suggestBreak()/
        // validateBreak(): the threshold targets the WORKING time (#403).
        $break6h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_6H);
        $break9h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_9H);
        $requiredBreak = 0;
        if ($totalGrossMinutes > 9 * 60 + $break6h) {
            $requiredBreak = $break9h;
        } elseif ($totalGrossMinutes > 6 * 60) {
            $requiredBreak = $break6h;
        }
        if ($requiredBreak > 0 && $totalBreakMinutes < $requiredBreak) {
            $warnings[] = $this->l->t(
                'Mindestpause nicht eingehalten: Bei %1$d Min Arbeitszeit sind %2$d Min Pause erforderlich (§4 ArbZG), erfasst sind %3$d Min (Lücken zwischen Einträgen zählen als Pause).',
                [$totalGrossMinutes, $requiredBreak, $totalBreakMinutes]
            );
        }

        // Maximum daily working hours (§3 ArbZG). The legal cap targets the
        // WORKING time (net), not the presence span — mirrors suggestBreak()/
        // dayWarnings §4 above and the fix in #403. Comparing gross wrongly
        // flagged days whose net time is within the limit (#437).
        $netMinutes = max(0, $totalGrossMinutes - $totalBreakMinutes);
        $netHours = $netMinutes / 60;
        $maxHours = $this->settingsMapper->getValueAsFloat(CompanySetting::KEY_MAX_DAILY_HOURS);
        if ($maxHours > 0 && $netHours > $maxHours) {
            $warnings[] = $this->l->t(
                'Maximale tägliche Arbeitszeit (%1$s Std.) überschritten: an diesem Tag sind %2$s Std. erfasst.',
                [(string)$maxHours, (string)round($netHours, 2)]
            );
        }

        return $warnings;
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
     * Build the cross-month approval inbox for submitted month-ends (#344).
     * Groups all submitted entries of the given (already permission-scoped)
     * employees by (employee, year, month) and returns one item per submitted
     * month, oldest submission first (FIFO).
     *
     * @param int[] $employeeIds Employees the requester may see/approve.
     * @return array<int, array{employeeId:int, employeeName:string, employeeUserId:string, year:int, month:int, actualMinutes:int, entryCount:int, submittedAt:?string}>
     */
    public function findSubmittedMonths(array $employeeIds): array {
        $entries = $this->timeEntryMapper->findSubmittedByEmployeeIds($employeeIds);

        $groups = [];
        foreach ($entries as $entry) {
            $employeeId = $entry->getEmployeeId();
            $date = $entry->getDate();
            $year = (int)$date->format('Y');
            $month = (int)$date->format('n');
            $key = $employeeId . '-' . $year . '-' . $month;

            if (!isset($groups[$key])) {
                $groups[$key] = [
                    'employeeId' => $employeeId,
                    'year' => $year,
                    'month' => $month,
                    'actualMinutes' => 0,
                    'entryCount' => 0,
                    'submittedAt' => null,
                ];
            }
            $groups[$key]['actualMinutes'] += $entry->getWorkMinutes();
            $groups[$key]['entryCount']++;

            // FIFO key: earliest submission timestamp of the month.
            $submittedAt = $entry->getSubmittedAt();
            if ($submittedAt !== null) {
                $iso = $submittedAt->format('c');
                if ($groups[$key]['submittedAt'] === null || $iso < $groups[$key]['submittedAt']) {
                    $groups[$key]['submittedAt'] = $iso;
                }
            }
        }

        // Resolve employee names (once per employee).
        $employeeCache = [];
        $items = [];
        foreach ($groups as $group) {
            $employeeId = $group['employeeId'];
            if (!isset($employeeCache[$employeeId])) {
                try {
                    $employeeCache[$employeeId] = $this->employeeMapper->find($employeeId);
                } catch (\Exception) {
                    $employeeCache[$employeeId] = null;
                }
            }
            $employee = $employeeCache[$employeeId];
            $group['employeeName'] = $employee?->getFullName() ?? '';
            $group['employeeUserId'] = $employee?->getUserId() ?? '';
            $items[] = $group;
        }

        // Oldest first: by submission time, then by calendar month as fallback.
        usort($items, static function (array $a, array $b): int {
            $byTime = ($a['submittedAt'] ?? '') <=> ($b['submittedAt'] ?? '');
            if ($byTime !== 0) {
                return $byTime;
            }
            return [$a['year'], $a['month']] <=> [$b['year'], $b['month']];
        });

        return $items;
    }

    /**
     * Approved months for the given employees, newest approval first (#387).
     * Lets HR find and reopen a recently approved month for correction.
     *
     * @param int[] $employeeIds
     */
    public function findApprovedMonths(array $employeeIds): array {
        $entries = $this->timeEntryMapper->findApprovedByEmployeeIds($employeeIds);

        $groups = [];
        foreach ($entries as $entry) {
            $employeeId = $entry->getEmployeeId();
            $date = $entry->getDate();
            $year = (int)$date->format('Y');
            $month = (int)$date->format('n');
            $key = $employeeId . '-' . $year . '-' . $month;

            if (!isset($groups[$key])) {
                $groups[$key] = [
                    'employeeId' => $employeeId,
                    'year' => $year,
                    'month' => $month,
                    'actualMinutes' => 0,
                    'entryCount' => 0,
                    'approvedAt' => null,
                ];
            }
            $groups[$key]['actualMinutes'] += $entry->getWorkMinutes();
            $groups[$key]['entryCount']++;

            // Newest approval timestamp of the month (for sorting newest first).
            $approvedAt = $entry->getApprovedAt();
            if ($approvedAt !== null) {
                $iso = $approvedAt->format('c');
                if ($groups[$key]['approvedAt'] === null || $iso > $groups[$key]['approvedAt']) {
                    $groups[$key]['approvedAt'] = $iso;
                }
            }
        }

        $employeeCache = [];
        $items = [];
        foreach ($groups as $group) {
            $employeeId = $group['employeeId'];
            if (!isset($employeeCache[$employeeId])) {
                try {
                    $employeeCache[$employeeId] = $this->employeeMapper->find($employeeId);
                } catch (\Exception) {
                    $employeeCache[$employeeId] = null;
                }
            }
            $employee = $employeeCache[$employeeId];
            $group['employeeName'] = $employee?->getFullName() ?? '';
            $group['employeeUserId'] = $employee?->getUserId() ?? '';
            $items[] = $group;
        }

        // Newest approval first.
        usort($items, static function (array $a, array $b): int {
            $byTime = ($b['approvedAt'] ?? '') <=> ($a['approvedAt'] ?? '');
            if ($byTime !== 0) {
                return $byTime;
            }
            return [$b['year'], $b['month']] <=> [$a['year'], $a['month']];
        });

        return $items;
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
     * Enforce the company rules "Projekt erforderlich" / "Beschreibung erforderlich"
     * (#329). Returns field errors for any required-but-missing value; empty when
     * the rules are off or satisfied.
     *
     * @return array<string, string[]>
     */
    private function requiredFieldErrors(int $employeeId, ?int $projectId, ?string $description): array {
        $errors = [];
        // No project selected = null or 0 (an empty form value binds to 0); real
        // projects always have a positive id.
        //
        // "Projekt erforderlich" only applies to employees who actually have at
        // least one selectable project (#329 follow-up): otherwise an employee
        // without any assigned/open project could not book time at all.
        if ($this->settingsMapper->getValueAsBool(CompanySetting::KEY_REQUIRE_PROJECT)
            && empty($projectId)
            && $this->projectService->getProjectsForEmployee($employeeId) !== []) {
            $errors['projectId'] = [$this->l->t('Projekt ist erforderlich.')];
        }
        if ($this->settingsMapper->getValueAsBool(CompanySetting::KEY_REQUIRE_DESCRIPTION) && trim((string)$description) === '') {
            $errors['description'] = [$this->l->t('Beschreibung ist erforderlich.')];
        }
        return $errors;
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

            // Note (#338): the minimum-break (§4 ArbZG) and max-daily-hours checks
            // are NOT enforced here anymore. A single entry cannot see the rest of
            // the day, so splitting a day into several short entries used to bypass
            // them entirely. Both are now evaluated on DAY level (see dayWarnings())
            // and surfaced as non-blocking warnings, so retroactive corrections are
            // never hard-blocked.

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
