<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\HolidayMapper;
use OCP\AppFramework\Db\DoesNotExistException;

class AbsenceService {

    public function __construct(
        private AbsenceMapper $absenceMapper,
        private HolidayMapper $holidayMapper,
        private AuditLogService $auditLogService,
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
        string $currentUserId = ''
    ): Absence {
        $startDateObj = new DateTime($startDate);
        $endDateObj = new DateTime($endDate);

        // Validate
        $errors = $this->validate($employeeId, $type, $startDateObj, $endDateObj);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Calculate working days
        $days = $this->calculateWorkingDays($startDateObj, $endDateObj, $federalState);

        $absence = new Absence();
        $absence->setEmployeeId($employeeId);
        $absence->setType($type);
        $absence->setStartDate($startDateObj);
        $absence->setEndDate($endDateObj);
        $absence->setDays((string)$days);
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
     */
    public function update(
        int $id,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null,
        string $federalState = 'BY',
        string $currentUserId = ''
    ): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();

        // Cannot edit approved/cancelled absences
        if ($absence->getStatus() === Absence::STATUS_APPROVED || $absence->getStatus() === Absence::STATUS_CANCELLED) {
            throw new ForbiddenException('Cannot edit approved or cancelled absences');
        }

        $startDateObj = new DateTime($startDate);
        $endDateObj = new DateTime($endDate);

        // Validate
        $errors = $this->validate($absence->getEmployeeId(), $type, $startDateObj, $endDateObj, $id);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Calculate working days
        $days = $this->calculateWorkingDays($startDateObj, $endDateObj, $federalState);

        $absence->setType($type);
        $absence->setStartDate($startDateObj);
        $absence->setEndDate($endDateObj);
        $absence->setDays((string)$days);
        $absence->setNote($note);
        $absence->setStatus(Absence::STATUS_PENDING);
        $absence->setUpdatedAt(new DateTime());

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
    private function validate(int $employeeId, string $type, DateTime $startDate, DateTime $endDate, ?int $excludeId = null): array {
        $errors = [];

        if (!array_key_exists($type, Absence::TYPES)) {
            $errors['type'] = ['Invalid absence type'];
        }

        if ($startDate > $endDate) {
            $errors['endDate'] = ['End date must be after start date'];
        }

        // Check for overlapping absences
        $overlapping = $this->absenceMapper->findOverlapping($employeeId, $startDate, $endDate, $excludeId);
        if (!empty($overlapping)) {
            $errors['startDate'] = ['Overlapping absence exists'];
        }

        return $errors;
    }
}
