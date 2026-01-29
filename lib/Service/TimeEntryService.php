<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCP\AppFramework\Db\DoesNotExistException;

class TimeEntryService {

    public function __construct(
        private TimeEntryMapper $timeEntryMapper,
        private CompanySettingMapper $settingsMapper,
        private EmployeeMapper $employeeMapper,
        private AuditLogService $auditLogService,
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
        string $currentUserId = ''
    ): TimeEntry {
        $dateObj = new DateTime($date);
        $startTimeObj = DateTime::createFromFormat('H:i', $startTime);
        $endTimeObj = DateTime::createFromFormat('H:i', $endTime);

        // Validate
        $errors = $this->validate($dateObj, $startTimeObj, $endTimeObj, $breakMinutes);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

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

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logCreate($currentUserId, 'time_entry', $entry->getId(), $entry->jsonSerialize());
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
        string $currentUserId = ''
    ): TimeEntry {
        $entry = $this->find($id);
        $oldValues = $entry->jsonSerialize();

        $dateObj = new DateTime($date);
        $startTimeObj = DateTime::createFromFormat('H:i', $startTime);
        $endTimeObj = DateTime::createFromFormat('H:i', $endTime);

        // Validate
        $errors = $this->validate($dateObj, $startTimeObj, $endTimeObj, $breakMinutes);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Cannot edit approved entries
        if ($entry->getStatus() === TimeEntry::STATUS_APPROVED) {
            throw ValidationException::fromSingleError('status', 'Cannot edit approved time entries');
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

        // Reset to draft if was rejected
        if ($entry->getStatus() === TimeEntry::STATUS_REJECTED) {
            $entry->setStatus(TimeEntry::STATUS_DRAFT);
        }

        $entry = $this->timeEntryMapper->update($entry);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logUpdate($currentUserId, 'time_entry', $entry->getId(), $oldValues, $entry->jsonSerialize());
        }

        return $entry;
    }

    /**
     * @throws NotFoundException
     */
    public function delete(int $id, string $currentUserId = ''): void {
        $entry = $this->find($id);

        // Cannot delete approved entries
        if ($entry->getStatus() === TimeEntry::STATUS_APPROVED) {
            throw new ForbiddenException('Cannot delete approved time entries');
        }

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logDelete($currentUserId, 'time_entry', $entry->getId(), $entry->jsonSerialize());
        }

        $this->timeEntryMapper->delete($entry);
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

        return [
            'approved' => $approved,
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
    private function validate(DateTime $date, ?DateTime $startTime, ?DateTime $endTime, int $breakMinutes): array {
        $errors = [];

        // Check future dates
        $allowFuture = $this->settingsMapper->getValueAsBool(CompanySetting::KEY_ALLOW_FUTURE_ENTRIES);
        if (!$allowFuture && $date > new DateTime('today')) {
            $errors['date'] = ['Future dates are not allowed'];
        }

        if (!$startTime) {
            $errors['startTime'] = ['Invalid start time format'];
        }

        if (!$endTime) {
            $errors['endTime'] = ['Invalid end time format'];
        }

        if ($startTime && $endTime) {
            $grossMinutes = ($endTime->getTimestamp() - $startTime->getTimestamp()) / 60;
            if ($grossMinutes < 0) {
                $grossMinutes += 24 * 60;
            }

            // Check max daily hours
            $maxHours = $this->settingsMapper->getValueAsFloat(CompanySetting::KEY_MAX_DAILY_HOURS);
            if ($grossMinutes / 60 > $maxHours) {
                $errors['endTime'] = ["Maximum daily hours ({$maxHours}h) exceeded"];
            }

            // Validate break
            if (!$this->validateBreak((int)$grossMinutes, $breakMinutes)) {
                $errors['breakMinutes'] = ['Break time does not meet legal requirements'];
            }
        }

        if ($breakMinutes < 0) {
            $errors['breakMinutes'] = ['Break cannot be negative'];
        }

        return $errors;
    }
}
