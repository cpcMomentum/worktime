<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IUserManager;
use Psr\Log\LoggerInterface;

class EmployeeService {

    public function __construct(
        private EmployeeMapper $employeeMapper,
        private WorkScheduleMapper $workScheduleMapper,
        private WorkScheduleService $workScheduleService,
        private AuditLogService $auditLogService,
        private IUserManager $userManager,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * Surface the weeklyHours and vacationDays from the work schedule that is
     * active today, so the employee overview always matches the currently
     * valid profile (the work schedule is the single source of truth).
     *
     * The entity is mutated in memory only; it is never persisted here.
     */
    private function withActiveSchedule(Employee $employee): Employee {
        $active = $this->workScheduleService->getScheduleForDate($employee->getId(), new DateTime());
        $employee->setWeeklyHours((string)$active->getWeeklyHours());
        $employee->setVacationDays($active->getVacationDays());
        return $employee;
    }

    /**
     * @param Employee[] $employees
     * @return Employee[]
     */
    private function withActiveScheduleEach(array $employees): array {
        return array_map(fn (Employee $e): Employee => $this->withActiveSchedule($e), $employees);
    }

    /**
     * @return Employee[]
     */
    public function findAll(): array {
        return $this->withActiveScheduleEach($this->employeeMapper->findAll());
    }

    /**
     * @return Employee[]
     */
    public function findAllActive(): array {
        return $this->withActiveScheduleEach($this->employeeMapper->findAllActive());
    }

    /**
     * @throws NotFoundException
     */
    public function find(int $id): Employee {
        try {
            return $this->withActiveSchedule($this->employeeMapper->find($id));
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Employee not found');
        }
    }

    /**
     * @throws NotFoundException
     */
    public function findByUserId(string $userId): Employee {
        try {
            return $this->withActiveSchedule($this->employeeMapper->findByUserId($userId));
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Employee not found for user');
        }
    }

    /**
     * @return Employee[]
     */
    public function findBySupervisor(int $supervisorId): array {
        return $this->withActiveScheduleEach($this->employeeMapper->findBySupervisor($supervisorId));
    }

    /**
     * @throws ValidationException
     */
    public function create(
        string $userId,
        string $firstName,
        string $lastName,
        ?string $email = null,
        ?string $personnelNumber = null,
        float $weeklyHours = 40.0,
        int $vacationDays = 30,
        ?int $supervisorId = null,
        string $federalState = 'BY',
        ?string $entryDate = null,
        string $currentUserId = '',
        int $workingDaysPerWeek = 5
    ): Employee {
        // Validate
        $errors = $this->validate($userId, $firstName, $lastName, $federalState);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Check if user already exists
        if ($this->employeeMapper->existsByUserId($userId)) {
            throw ValidationException::fromSingleError('userId', 'Employee already exists for this user');
        }

        $employee = new Employee();
        $employee->setUserId($userId);
        $employee->setFirstName($firstName);
        $employee->setLastName($lastName);
        $employee->setEmail($email);
        $employee->setPersonnelNumber($personnelNumber);
        $employee->setWeeklyHours((string)$weeklyHours);
        $employee->setVacationDays($vacationDays);
        $employee->setSupervisorId($supervisorId);
        $employee->setWorkingDaysPerWeek(max(1, min(7, $workingDaysPerWeek)));
        $employee->setFederalState($federalState);

        if ($entryDate) {
            $employee->setEntryDate(new DateTime($entryDate));
        }

        $employee->setIsActive(true);
        $employee->setCreatedAt(new DateTime());
        $employee->setUpdatedAt(new DateTime());

        $employee = $this->employeeMapper->insert($employee);

        // Create initial work schedule profile
        $this->createInitialWorkSchedule($employee);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logCreate($currentUserId, 'employee', $employee->getId(), $employee->jsonSerialize());
        }

        return $employee;
    }

    /**
     * @throws NotFoundException
     * @throws ValidationException
     */
    public function update(
        int $id,
        string $firstName,
        string $lastName,
        ?string $email = null,
        ?string $personnelNumber = null,
        float $weeklyHours = 40.0,
        int $vacationDays = 30,
        ?int $supervisorId = null,
        string $federalState = 'BY',
        ?string $entryDate = null,
        ?string $exitDate = null,
        bool $isActive = true,
        string $currentUserId = '',
        int $workingDaysPerWeek = 5
    ): Employee {
        $employee = $this->find($id);
        $oldValues = $employee->jsonSerialize();

        // Validate
        $errors = $this->validate($employee->getUserId(), $firstName, $lastName, $federalState);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // Prevent circular supervisor reference
        if ($supervisorId === $id) {
            throw ValidationException::fromSingleError('supervisorId', 'Employee cannot be their own supervisor');
        }

        $employee->setFirstName($firstName);
        $employee->setLastName($lastName);
        $employee->setEmail($email);
        $employee->setPersonnelNumber($personnelNumber);
        $employee->setWeeklyHours((string)$weeklyHours);
        $employee->setVacationDays($vacationDays);
        $employee->setSupervisorId($supervisorId);
        $employee->setWorkingDaysPerWeek(max(1, min(7, $workingDaysPerWeek)));
        $employee->setFederalState($federalState);

        $employee->setEntryDate($entryDate ? new DateTime($entryDate) : null);
        $employee->setExitDate($exitDate ? new DateTime($exitDate) : null);

        $employee->setIsActive($isActive);
        $employee->setUpdatedAt(new DateTime());

        $employee = $this->withActiveSchedule($this->employeeMapper->update($employee));

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logUpdate($currentUserId, 'employee', $employee->getId(), $oldValues, $employee->jsonSerialize());
        }

        return $employee;
    }

    /**
     * @throws NotFoundException
     */
    public function delete(int $id, string $currentUserId = ''): void {
        $employee = $this->find($id);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logDelete($currentUserId, 'employee', $employee->getId(), $employee->jsonSerialize());
        }

        // Delete associated work schedules
        $this->workScheduleMapper->deleteByEmployeeId($id);

        $this->employeeMapper->delete($employee);
    }

    /**
     * @return array<string, string[]>
     */
    private function validate(string $userId, string $firstName, string $lastName, string $federalState): array {
        $errors = [];

        if (empty($userId)) {
            $errors['userId'] = ['User ID is required'];
        }

        if (empty(trim($firstName))) {
            $errors['firstName'] = ['First name is required'];
        }

        if (empty(trim($lastName))) {
            $errors['lastName'] = ['Last name is required'];
        }

        if (!array_key_exists($federalState, Employee::FEDERAL_STATES)) {
            $errors['federalState'] = ['Invalid federal state'];
        }

        return $errors;
    }

    /**
     * Update the current user's default working times.
     *
     * @throws NotFoundException
     */
    public function updateMyDefaults(
        string $userId,
        ?string $defaultStartTime = null,
        ?string $defaultEndTime = null,
        ?string $absenceVisibility = null,
        ?string $absenceDetail = null
    ): Employee {
        $employee = $this->findByUserId($userId);
        $oldValues = $employee->jsonSerialize();

        // Validate time format (HH:MM)
        if ($defaultStartTime !== null && !preg_match('/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/', $defaultStartTime)) {
            throw ValidationException::fromSingleError('defaultStartTime', 'Invalid time format. Use HH:MM.');
        }
        if ($defaultEndTime !== null && !preg_match('/^([01]?[0-9]|2[0-3]):[0-5][0-9]$/', $defaultEndTime)) {
            throw ValidationException::fromSingleError('defaultEndTime', 'Invalid time format. Use HH:MM.');
        }

        $employee->setDefaultStartTime($defaultStartTime ? new DateTime($defaultStartTime) : null);
        $employee->setDefaultEndTime($defaultEndTime ? new DateTime($defaultEndTime) : null);

        if ($absenceVisibility !== null && in_array($absenceVisibility, ['all', 'team', 'none'], true)) {
            $employee->setAbsenceVisibility($absenceVisibility);
        }

        if ($absenceDetail !== null && in_array($absenceDetail, ['detailed', 'hidden'], true)) {
            $employee->setAbsenceDetail($absenceDetail);
        }

        $employee->setUpdatedAt(new DateTime());

        $employee = $this->employeeMapper->update($employee);

        // Audit log
        $this->auditLogService->logUpdate($userId, 'employee', $employee->getId(), $oldValues, $employee->jsonSerialize());

        return $employee;
    }

    /**
     * Create the initial work schedule profile for a new employee.
     */
    private function createInitialWorkSchedule(Employee $employee): void {
        try {
            $dailyHours = round((float)$employee->getWeeklyHours() / 5, 2);
            $validFrom = $employee->getEntryDate() ?? new DateTime('2020-01-01');

            $schedule = new \OCA\WorkTime\Db\WorkSchedule();
            $schedule->setEmployeeId($employee->getId());
            $schedule->setValidFrom($validFrom);
            $schedule->setMonHours(number_format($dailyHours, 2, '.', ''));
            $schedule->setTueHours(number_format($dailyHours, 2, '.', ''));
            $schedule->setWedHours(number_format($dailyHours, 2, '.', ''));
            $schedule->setThuHours(number_format($dailyHours, 2, '.', ''));
            $schedule->setFriHours(number_format($dailyHours, 2, '.', ''));
            $schedule->setSatHours('0.00');
            $schedule->setSunHours('0.00');
            $schedule->setVacationDays($employee->getVacationDays());
            $schedule->setCreatedAt(new DateTime());
            $schedule->setUpdatedAt(new DateTime());

            $this->workScheduleMapper->insert($schedule);
        } catch (\Exception $e) {
            $this->logger->error('Failed to create initial work schedule: ' . $e->getMessage());
        }
    }

    /**
     * Get all Nextcloud users that don't have an employee profile yet.
     *
     * @return array<array{user: string, displayName: string, subname: string}>
     */
    public function getAvailableUsers(): array {
        $existingUserIds = $this->employeeMapper->getAllUserIds();
        $users = [];

        $this->userManager->callForAllUsers(function ($user) use (&$users, $existingUserIds) {
            $uid = $user->getUID();
            if (!in_array($uid, $existingUserIds, true)) {
                $users[] = [
                    'user' => $uid,
                    'displayName' => $user->getDisplayName(),
                    'subname' => $user->getEMailAddress() ?? '',
                ];
            }
        });

        // Sort by display name
        usort($users, fn($a, $b) => strcasecmp($a['displayName'], $b['displayName']));

        return $users;
    }
}
