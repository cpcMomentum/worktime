<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\HolidayMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use Psr\Log\LoggerInterface;

class AbsenceService {

    public function __construct(
        private AbsenceMapper $absenceMapper,
        private HolidayMapper $holidayMapper,
        private TimeEntryService $timeEntryService,
        private AuditLogService $auditLogService,
        private LoggerInterface $logger,
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
        float $scope = 1.0
    ): Absence {
        $startDateObj = new DateTime($startDate);
        $endDateObj = new DateTime($endDate);

        // Validate
        $errors = $this->validate($employeeId, $type, $startDateObj, $endDateObj, null, $scope);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Calculate working days and apply scope
        // e.g., 5 working days * 0.5 scope = 2.5 effective days
        $workingDays = $this->calculateWorkingDays($startDateObj, $endDateObj, $federalState);
        $days = $workingDays * $scope;

        $absence = new Absence();
        $absence->setEmployeeId($employeeId);
        $absence->setType($type);
        $absence->setStartDate($startDateObj);
        $absence->setEndDate($endDateObj);
        $absence->setDays((string)$days);
        $absence->setScopeValue($scope);
        $absence->setNote($note);
        $absence->setStatus(Absence::STATUS_PENDING);
        $absence->setCreatedAt(new DateTime());
        $absence->setUpdatedAt(new DateTime());

        $absence = $this->absenceMapper->insert($absence);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logCreate($currentUserId, 'absence', $absence->getId(), $absence->jsonSerialize());
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
        float $scope = 1.0
    ): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();

        // Cannot edit cancelled absences
        if ($absence->getStatus() === Absence::STATUS_CANCELLED) {
            throw new ForbiddenException('Cannot edit cancelled absences');
        }

        $startDateObj = new DateTime($startDate);
        $endDateObj = new DateTime($endDate);

        // Validate basic rules
        $errors = $this->validate($absence->getEmployeeId(), $type, $startDateObj, $endDateObj, $id, $scope);

        // Validate modification if this is an approved absence being edited
        if ($absence->getStatus() === Absence::STATUS_APPROVED) {
            $modificationErrors = $this->validateModification($absence, $startDateObj, $endDateObj);
            if (!empty($modificationErrors)) {
                $errors['modification'] = $modificationErrors;
            }
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Calculate working days and apply scope
        $workingDays = $this->calculateWorkingDays($startDateObj, $endDateObj, $federalState);
        $days = $workingDays * $scope;

        $absence->setType($type);
        $absence->setStartDate($startDateObj);
        $absence->setEndDate($endDateObj);
        $absence->setDays((string)$days);
        $absence->setScopeValue($scope);
        $absence->setNote($note);
        $absence->setStatus(Absence::STATUS_PENDING);
        $absence->setUpdatedAt(new DateTime());
        // Clear approval data since re-approval is required
        $absence->setApprovedBy(null);
        $absence->setApprovedAt(null);

        $absence = $this->absenceMapper->update($absence);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logUpdate($currentUserId, 'absence', $absence->getId(), $oldValues, $absence->jsonSerialize());
        }

        return $absence;
    }

    /**
     * @throws NotFoundException
     */
    public function delete(int $id, string $currentUserId = ''): void {
        $absence = $this->find($id);

        // Cannot delete approved absences
        if ($absence->getStatus() === Absence::STATUS_APPROVED) {
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

        return $absence;
    }

    /**
     * @throws NotFoundException
     */
    public function cancel(int $id, string $currentUserId = ''): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();

        $absence->setStatus(Absence::STATUS_CANCELLED);
        $absence->setUpdatedAt(new DateTime());

        $absence = $this->absenceMapper->update($absence);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'cancel', 'absence', $absence->getId(), $oldValues, $absence->jsonSerialize());
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
     * Calculate number of working days between two dates
     * Excludes weekends and holidays
     */
    public function calculateWorkingDays(DateTime $startDate, DateTime $endDate, string $federalState): float {
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
            $errors['scope'] = ['Scope muss zwischen 0 und 1 liegen'];
        }

        // Half day (scope < 1) must be single day
        if ($scope < 1.0 && $startDate->format('Y-m-d') !== $endDate->format('Y-m-d')) {
            $errors['scope'] = ['Halber Tag ist nur für einen einzelnen Tag möglich'];
        }

        // Check for overlapping absences
        $overlapping = $this->absenceMapper->findOverlapping($employeeId, $startDate, $endDate, $excludeId);
        if (!empty($overlapping)) {
            $errors['startDate'] = ['Overlapping absence exists'];
        }

        return $errors;
    }

    /**
     * Validate that no days from approved months are being removed
     *
     * @return string[] Error messages
     */
    private function validateModification(Absence $absence, DateTime $newStart, DateTime $newEnd): array {
        $errors = [];
        $today = new DateTime('today');

        // Get all days from original range
        $originalDays = $this->getDaysInRange($absence->getStartDate(), $absence->getEndDate());
        $newDays = $this->getDaysInRange($newStart, $newEnd);

        // Convert new days to string array for comparison
        $newDayStrings = array_map(fn(DateTime $d) => $d->format('Y-m-d'), $newDays);

        // Find days being removed
        foreach ($originalDays as $day) {
            $dayString = $day->format('Y-m-d');
            if (!in_array($dayString, $newDayStrings)) {
                // Day is being removed - check if allowed
                if ($day < $today) {
                    // Day in past - check if month is approved
                    $year = (int)$day->format('Y');
                    $month = (int)$day->format('n');
                    if ($this->timeEntryService->isMonthApproved($absence->getEmployeeId(), $year, $month)) {
                        $errors[] = sprintf(
                            'Tag %s kann nicht entfernt werden (Monat %02d/%d ist genehmigt)',
                            $day->format('d.m.Y'),
                            $month,
                            $year
                        );
                    }
                }
            }
        }

        return $errors;
    }

    /**
     * Get all days in a date range
     *
     * @return DateTime[]
     */
    private function getDaysInRange(DateTime $start, DateTime $end): array {
        $days = [];
        $current = clone $start;
        while ($current <= $end) {
            $days[] = clone $current;
            $current->modify('+1 day');
        }
        return $days;
    }
}
