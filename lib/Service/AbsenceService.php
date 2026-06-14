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
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\HolidayMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class AbsenceService {

    public function __construct(
        private AbsenceMapper $absenceMapper,
        private EmployeeMapper $employeeMapper,
        private HolidayMapper $holidayMapper,
        private TimeEntryService $timeEntryService,
        private AuditLogService $auditLogService,
        private NotificationService $notificationService,
        private WorkScheduleService $workScheduleService,
        private LoggerInterface $logger,
        private IL10N $l,
    ) {
    }

    /**
     * @return Absence[]
     */
    public function findByEmployee(int $employeeId): array {
        return $this->absenceMapper->findByEmployee($employeeId);
    }

    /**
     * @return Absence[]
     */
    public function findByEmployeeAndYear(int $employeeId, int $year): array {
        return $this->absenceMapper->findByEmployeeAndYear($employeeId, $year);
    }

    /**
     * @return Absence[]
     */
    public function findByEmployeeAndMonth(int $employeeId, int $year, int $month): array {
        return $this->absenceMapper->findByEmployeeAndMonth($employeeId, $year, $month);
    }

    /**
     * @return Absence[]
     */
    public function findActiveInformationalForSupervisor(int $supervisorEmployeeId): array {
        return $this->absenceMapper->findActiveInformationalForSupervisor($supervisorEmployeeId);
    }

    public function findPendingForApproval(int $supervisorEmployeeId): array {
        return $this->absenceMapper->findPendingForApproval($supervisorEmployeeId);
    }

    /**
     * @throws NotFoundException
     */
    public function find(int $id): Absence {
        try {
            return $this->absenceMapper->find($id);
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Absence not found');
        }
    }

    /**
     * @throws ValidationException
     */
    public function create(
        int $employeeId,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null,
        string $federalState = 'BY',
        string $currentUserId = '',
        float $scope = 1.0,
        ?string $reason = null,
        bool $allowLockedOverride = false
    ): Absence {
        $startDateObj = new DateTime($startDate);
        $endDateObj = new DateTime($endDate);

        // Validate
        $errors = $this->validate($employeeId, $type, $startDateObj, $endDateObj, null, $scope);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Closed-month rules (#148): block employees, require a reason for HR corrections.
        $lockedMonths = $this->timeEntryService->lockedMonthsInRange($employeeId, $startDateObj, $endDateObj);
        $effectiveReason = $this->timeEntryService->requireReasonForLockedMonths($lockedMonths, $allowLockedOverride, $reason);

        // Calculate working days and apply scope (schedule-aware)
        $workingDays = $this->calculateWorkingDays($startDateObj, $endDateObj, $federalState, $employeeId);
        $days = $workingDays * $scope;

        if ($type === Absence::TYPE_VACATION) {
            $this->checkVacationQuota($employeeId, $days, (int)$startDateObj->format('Y'));
        }

        $isInformational = in_array($type, [Absence::TYPE_SICK, Absence::TYPE_CHILD_SICK], true);

        $absence = new Absence();
        $absence->setEmployeeId($employeeId);
        $absence->setType($type);
        $absence->setStartDate($startDateObj);
        $absence->setEndDate($endDateObj);
        $absence->setDays((string)$days);
        $absence->setScopeValue($scope);
        $absence->setNote($note);
        $absence->setCreatedAt(new DateTime());
        $absence->setUpdatedAt(new DateTime());

        if ($isInformational) {
            // Krankheit/Kind krank werden nicht genehmigt — direkt approved
            $absence->setStatus(Absence::STATUS_APPROVED);
            $absence->setApprovedAt(new DateTime());
            $absence->setApprovedBy(null);
        } else {
            $absence->setStatus(Absence::STATUS_PENDING);
        }

        $absence = $this->absenceMapper->insert($absence);

        // Audit log (record the HR correction reason when present)
        if ($currentUserId) {
            $auditReason = $this->timeEntryService->auditReason($effectiveReason, $allowLockedOverride, $reason);
            $newValues = $absence->jsonSerialize();
            if ($auditReason !== null) {
                $newValues['reason'] = $auditReason;
            }
            $this->auditLogService->logCreate($currentUserId, 'absence', $absence->getId(), $newValues);
        }

        // HR correction in a closed month: reopen the affected time-entry months.
        if ($effectiveReason !== null) {
            foreach ($lockedMonths as [$lockedYear, $lockedMonth]) {
                $this->timeEntryService->reopenMonth($employeeId, $lockedYear, $lockedMonth, $effectiveReason, $currentUserId);
            }
        }

        try {
            if ($isInformational) {
                $this->notificationService->notifyAbsenceInformational($absence);
            } else {
                $this->notificationService->notifyAbsenceSubmitted($absence);
            }
        } catch (\Throwable $e) {
            $this->logger->error('Failed to send absence notification', ['exception' => $e]);
        }

        return $absence;
    }

    /**
     * @throws NotFoundException
     * @throws ValidationException
     * @throws ForbiddenException
     */
    public function update(
        int $id,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null,
        string $federalState = 'BY',
        string $currentUserId = '',
        float $scope = 1.0,
        ?string $reason = null,
        bool $allowLockedOverride = false
    ): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();
        $oldStart = clone $absence->getStartDate();
        $oldEnd = clone $absence->getEndDate();

        // Cannot edit cancelled absences
        if ($absence->getStatus() === Absence::STATUS_CANCELLED) {
            throw new ForbiddenException('Cannot edit cancelled absences');
        }

        $startDateObj = new DateTime($startDate);
        $endDateObj = new DateTime($endDate);

        // Validate basic rules
        $errors = $this->validate($absence->getEmployeeId(), $type, $startDateObj, $endDateObj, $id, $scope);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Closed-month rules (#148): employees are blocked from any change that
        // touches a closed month (old or new range); HR corrections require a
        // reason and reopen the affected months.
        $rangeStart = min($oldStart, $startDateObj);
        $rangeEnd = max($oldEnd, $endDateObj);
        $lockedMonths = $this->timeEntryService->lockedMonthsInRange($absence->getEmployeeId(), $rangeStart, $rangeEnd);
        $effectiveReason = $this->timeEntryService->requireReasonForLockedMonths($lockedMonths, $allowLockedOverride, $reason);

        // Calculate working days and apply scope (schedule-aware)
        $workingDays = $this->calculateWorkingDays($startDateObj, $endDateObj, $federalState, $absence->getEmployeeId());
        $days = $workingDays * $scope;

        if ($type === Absence::TYPE_VACATION) {
            $this->checkVacationQuota($absence->getEmployeeId(), $days, (int)$startDateObj->format('Y'), $id);
        }

        $isInformational = in_array($type, [Absence::TYPE_SICK, Absence::TYPE_CHILD_SICK], true);

        $absence->setType($type);
        $absence->setStartDate($startDateObj);
        $absence->setEndDate($endDateObj);
        $absence->setDays((string)$days);
        $absence->setScopeValue($scope);
        $absence->setNote($note);
        $absence->setUpdatedAt(new DateTime());

        if ($isInformational) {
            // Krankheit/Kind krank bleiben approved (kein Re-Approval noetig)
            $absence->setStatus(Absence::STATUS_APPROVED);
            $absence->setApprovedAt(new DateTime());
            $absence->setApprovedBy(null);
        } else {
            // Urlaub & Co: Re-Approval erforderlich
            $absence->setStatus(Absence::STATUS_PENDING);
            $absence->setApprovedBy(null);
            $absence->setApprovedAt(null);
        }

        $absence = $this->absenceMapper->update($absence);

        // Audit log (record the HR correction reason when present)
        if ($currentUserId) {
            $auditReason = $this->timeEntryService->auditReason($effectiveReason, $allowLockedOverride, $reason);
            $newValues = $absence->jsonSerialize();
            if ($auditReason !== null) {
                $newValues['reason'] = $auditReason;
            }
            $this->auditLogService->logUpdate($currentUserId, 'absence', $absence->getId(), $oldValues, $newValues);
        }

        // HR correction in a closed month: reopen the affected time-entry months.
        if ($effectiveReason !== null) {
            foreach ($lockedMonths as [$lockedYear, $lockedMonth]) {
                $this->timeEntryService->reopenMonth($absence->getEmployeeId(), $lockedYear, $lockedMonth, $effectiveReason, $currentUserId);
            }
        }

        return $absence;
    }

    /**
     * @throws NotFoundException
     */
    public function delete(int $id, string $currentUserId = ''): void {
        $absence = $this->find($id);

        // Cannot delete approved absences (except sick/child_sick, which are info, not requests)
        if ($absence->getStatus() === Absence::STATUS_APPROVED
            && !in_array($absence->getType(), [Absence::TYPE_SICK, Absence::TYPE_CHILD_SICK], true)) {
            throw new ForbiddenException('Cannot delete approved absences');
        }

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logDelete($currentUserId, 'absence', $absence->getId(), $absence->jsonSerialize());
        }

        $this->absenceMapper->delete($absence);
    }

    /**
     * @throws NotFoundException
     */
    public function approve(int $id, int $approverEmployeeId, string $currentUserId = ''): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();

        if ($absence->getStatus() !== Absence::STATUS_PENDING) {
            throw new ForbiddenException('Can only approve pending absences');
        }

        $absence->setStatus(Absence::STATUS_APPROVED);
        $absence->setApprovedBy($approverEmployeeId);
        $absence->setApprovedAt(new DateTime());
        $absence->setUpdatedAt(new DateTime());

        $absence = $this->absenceMapper->update($absence);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'approve', 'absence', $absence->getId(), $oldValues, $absence->jsonSerialize());
        }

        try {
            $this->notificationService->notifyAbsenceApproved($absence);
        } catch (\Throwable $e) {
            $this->logger->error('Failed to send absence approval notification', ['exception' => $e]);
        }

        return $absence;
    }

    /**
     * @throws NotFoundException
     */
    public function reject(int $id, string $currentUserId = ''): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();

        if ($absence->getStatus() !== Absence::STATUS_PENDING) {
            throw new ForbiddenException('Can only reject pending absences');
        }

        $absence->setStatus(Absence::STATUS_REJECTED);
        $absence->setUpdatedAt(new DateTime());

        $absence = $this->absenceMapper->update($absence);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'reject', 'absence', $absence->getId(), $oldValues, $absence->jsonSerialize());
        }

        try {
            $this->notificationService->notifyAbsenceRejected($absence);
        } catch (\Throwable $e) {
            $this->logger->error('Failed to send absence rejection notification', ['exception' => $e]);
        }

        return $absence;
    }

    /**
     * @throws NotFoundException
     */
    public function cancel(int $id, string $currentUserId = ''): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();
        $wasInformational = in_array($absence->getType(), [Absence::TYPE_SICK, Absence::TYPE_CHILD_SICK], true);

        $absence->setStatus(Absence::STATUS_CANCELLED);
        $absence->setUpdatedAt(new DateTime());

        $absence = $this->absenceMapper->update($absence);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'cancel', 'absence', $absence->getId(), $oldValues, $absence->jsonSerialize());
        }

        // Fuer Krankheit/Kind krank: Vorgesetzten ueber Stornierung informieren
        if ($wasInformational) {
            try {
                $this->notificationService->notifyAbsenceCancelled($absence);
            } catch (\Throwable $e) {
                $this->logger->error('Failed to send absence_cancelled notification', ['exception' => $e]);
            }
        }

        return $absence;
    }

    /**
     * Get vacation statistics for an employee in a given year
     */
    public function getVacationStats(int $employeeId, int $year, int $totalVacationDays): array {
        $usedDays = $this->absenceMapper->sumVacationDaysByEmployeeAndYear($employeeId, $year);
        $pendingAbsences = $this->absenceMapper->findByType($employeeId, Absence::TYPE_VACATION);
        $pendingDays = 0;

        foreach ($pendingAbsences as $absence) {
            if ($absence->getStatus() === Absence::STATUS_PENDING) {
                $absenceYear = (int)$absence->getStartDate()->format('Y');
                if ($absenceYear === $year) {
                    $pendingDays += (float)$absence->getDays();
                }
            }
        }

        return [
            'total' => $totalVacationDays,
            'used' => $usedDays,
            'pending' => $pendingDays,
            'remaining' => $totalVacationDays - $usedDays,
        ];
    }

    /**
     * Calculate number of working days between two dates.
     * Schedule-aware: uses the employee's work schedule to determine which days are working days.
     * Falls back to Mon-Fri if no employeeId is available.
     */
    public function calculateWorkingDays(DateTime $startDate, DateTime $endDate, string $federalState, ?int $employeeId = null): float {
        if ($employeeId !== null) {
            // Use schedule-aware calculation
            $holidays = $this->holidayMapper->findHolidaysInRange($startDate, $endDate, $federalState);
            return $this->workScheduleService->countWorkingDays($employeeId, $startDate, $endDate, $holidays);
        }

        // Fallback: standard Mon-Fri calculation
        $days = 0;
        $current = clone $startDate;

        while ($current <= $endDate) {
            $dayOfWeek = (int)$current->format('N');

            // Skip weekends (6 = Saturday, 7 = Sunday)
            if ($dayOfWeek < 6) {
                // Check for holidays
                if (!$this->holidayMapper->isHoliday($current, $federalState)) {
                    $days++;
                }
            }

            $current->modify('+1 day');
        }

        return $days;
    }

    /**
     * @return array<string, string[]>
     */
    private function checkVacationQuota(int $employeeId, float $requestedDays, int $year, ?int $excludeId = null): void {
        $employee = $this->employeeMapper->find($employeeId);
        $totalVacationDays = (int)$employee->getVacationDays();

        // Sum all active (approved + pending) vacation days for the year, excluding the current record
        $allVacations = $this->absenceMapper->findByEmployeeAndYear($employeeId, $year);
        $usedDays = 0.0;
        foreach ($allVacations as $absence) {
            if ($absence->getType() !== Absence::TYPE_VACATION) {
                continue;
            }
            if ($absence->getStatus() === Absence::STATUS_CANCELLED) {
                continue;
            }
            if ($excludeId !== null && $absence->getId() === $excludeId) {
                continue;
            }
            $usedDays += (float)$absence->getDays();
        }

        $remaining = $totalVacationDays - $usedDays;
        if ($requestedDays > $remaining) {
            throw new ValidationException([
                'vacationQuota' => [sprintf(
                    'Not enough vacation days. Available: %.1f, requested: %.1f.',
                    max(0, $remaining),
                    $requestedDays
                )],
            ]);
        }
    }

    private function validate(int $employeeId, string $type, DateTime $startDate, DateTime $endDate, ?int $excludeId = null, float $scope = 1.0): array {
        $errors = [];

        if (!array_key_exists($type, Absence::TYPES)) {
            $errors['type'] = ['Invalid absence type'];
        }

        if ($startDate > $endDate) {
            $errors['endDate'] = ['End date must be after start date'];
        }

        // Scope must be between 0 and 1
        if ($scope < 0 || $scope > 1) {
            $errors['scope'] = [$this->l->t('Scope muss zwischen 0 und 1 liegen')];
        }

        // Half day (scope < 1) must be single day
        if ($scope < 1.0 && $startDate->format('Y-m-d') !== $endDate->format('Y-m-d')) {
            $errors['scope'] = [$this->l->t('Halber Tag ist nur für einen einzelnen Tag möglich')];
        }

        // Check for overlapping absences
        $overlapping = $this->absenceMapper->findOverlapping($employeeId, $startDate, $endDate, $excludeId);
        if (!empty($overlapping)) {
            $errors['startDate'] = ['Overlapping absence exists'];
        }

        return $errors;
    }

    /**
     * Get absence overview for all visible employees in a given month.
     *
     * @return array[] Array of { employeeId, employeeName, absences }
     */
    public function getAbsenceOverview(int $year, int $month, string $currentUserId, bool $isPrivileged, ?int $currentEmployeeId, ?int $supervisorEmployeeId): array {
        $allEmployees = $this->employeeMapper->findAllActive();
        $result = [];

        foreach ($allEmployees as $employee) {
            if (!$this->isEmployeeVisibleInOverview($employee, $isPrivileged, $currentEmployeeId, $supervisorEmployeeId)) {
                continue;
            }

            $isTeamMember = $supervisorEmployeeId !== null
                && $employee->getSupervisorId() === $supervisorEmployeeId;
            $unmasked = $isPrivileged || $isTeamMember;

            $absences = $this->absenceMapper->findApprovedByEmployeeAndMonth($employee->getId(), $year, $month);

            $absenceData = [];
            $detail = $employee->getAbsenceDetail();
            foreach ($absences as $absence) {
                $data = $absence->jsonSerialize();

                if (!$unmasked && $detail !== 'detailed') {
                    $data['type'] = 'absent';
                    $data['typeName'] = 'Abwesend';
                }

                $absenceData[] = $data;
            }

            $result[] = [
                'employeeId' => $employee->getId(),
                'employeeName' => $employee->getFullName(),
                'absences' => $absenceData,
            ];
        }

        // Sort by employee name
        usort($result, fn(array $a, array $b) => strcasecmp($a['employeeName'], $b['employeeName']));

        return $result;
    }

    /**
     * Check if an employee's absences should be visible to the current user.
     */
    private function isEmployeeVisibleInOverview(Employee $employee, bool $isPrivileged, ?int $currentEmployeeId, ?int $supervisorEmployeeId): bool {
        // Admin/HR see all employees
        if ($isPrivileged) {
            return true;
        }

        // Own entry is always visible
        if ($currentEmployeeId !== null && $employee->getId() === $currentEmployeeId) {
            return true;
        }

        // Supervisors see their own team members regardless of per-employee visibility setting
        if ($supervisorEmployeeId !== null && $employee->getSupervisorId() === $supervisorEmployeeId) {
            return true;
        }

        $visibility = $employee->getAbsenceVisibility();

        if ($visibility === 'none') {
            return false;
        }

        if ($visibility === 'team') {
            // Visible only if same supervisor
            if ($currentEmployeeId === null) {
                return false;
            }
            try {
                $currentEmployee = $this->employeeMapper->find($currentEmployeeId);
                // Same team = same supervisor, or the viewer is the supervisor
                return $employee->getSupervisorId() === $currentEmployee->getSupervisorId()
                    || $employee->getSupervisorId() === $currentEmployeeId;
            } catch (DoesNotExistException) {
                return false;
            }
        }

        // 'all' — visible to everyone
        return true;
    }
}
