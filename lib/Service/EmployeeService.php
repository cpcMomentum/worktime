<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCP\AppFramework\Db\DoesNotExistException;

class EmployeeService {

    public function __construct(
        private EmployeeMapper $employeeMapper,
        private AuditLogService $auditLogService,
    ) {
    }

    /**
     * @return Employee[]
     */
    public function findAll(): array {
        return $this->employeeMapper->findAll();
    }

    /**
     * @return Employee[]
     */
    public function findAllActive(): array {
        return $this->employeeMapper->findAllActive();
    }

    /**
     * @throws NotFoundException
     */
    public function find(int $id): Employee {
        try {
            return $this->employeeMapper->find($id);
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Employee not found');
        }
    }

    /**
     * @throws NotFoundException
     */
    public function findByUserId(string $userId): Employee {
        try {
            return $this->employeeMapper->findByUserId($userId);
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Employee not found for user');
        }
    }

    /**
     * @return Employee[]
     */
    public function findBySupervisor(int $supervisorId): array {
        return $this->employeeMapper->findBySupervisor($supervisorId);
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
        string $currentUserId = ''
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
        $employee->setFederalState($federalState);

        if ($entryDate) {
            $employee->setEntryDate(new DateTime($entryDate));
        }

        $employee->setIsActive(true);
        $employee->setCreatedAt(new DateTime());
        $employee->setUpdatedAt(new DateTime());

        $employee = $this->employeeMapper->insert($employee);

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
        string $currentUserId = ''
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
        $employee->setFederalState($federalState);

        $employee->setEntryDate($entryDate ? new DateTime($entryDate) : null);
        $employee->setExitDate($exitDate ? new DateTime($exitDate) : null);

        $employee->setIsActive($isActive);
        $employee->setUpdatedAt(new DateTime());

        $employee = $this->employeeMapper->update($employee);

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
}
