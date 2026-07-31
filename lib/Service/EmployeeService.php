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
use OCA\WorkTime\Db\WorkSchedule;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IUserManager;
use Psr\Log\LoggerInterface;

class EmployeeService {

    /** Matches the locked_reason column width (Version000022). */
    private const MAX_LOCKED_REASON_LENGTH = 500;

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
     * Copy the weeklyHours and vacationDays from a work schedule onto the
     * employee. The work schedule is the single source of truth for these
     * values; the entity is mutated in memory only and never persisted here.
     */
    private function applyScheduleValues(Employee $employee, WorkSchedule $schedule): Employee {
        $employee->setWeeklyHours((string)$schedule->getWeeklyHours());
        $employee->setVacationDays($schedule->getVacationDays());
        return $employee;
    }

    /**
     * Surface the weeklyHours and vacationDays from the work schedule that is
     * active today, so the employee overview always matches the currently
     * valid profile.
     */
    private function withActiveSchedule(Employee $employee): Employee {
        return $this->applyScheduleValues(
            $employee,
            $this->workScheduleService->getScheduleForDate($employee->getId(), new DateTime()),
        );
    }

    /**
     * Batch variant of {@see withActiveSchedule}: resolves the active schedule
     * for all employees in a single query instead of one lookup per employee.
     *
     * @param Employee[] $employees
     * @return Employee[]
     */
    private function withActiveScheduleEach(array $employees): array {
        if (empty($employees)) {
            return [];
        }

        $ids = array_map(static fn (Employee $e): int => $e->getId(), $employees);
        $active = $this->workScheduleMapper->findActiveForEmployees($ids, new DateTime());

        return array_map(
            fn (Employee $e): Employee => isset($active[$e->getId()])
                ? $this->applyScheduleValues($e, $active[$e->getId()])
                : $this->withActiveSchedule($e), // schedule-less employee: use default fallback
            $employees,
        );
    }

    /**
     * Enrich a list of employees obtained elsewhere (e.g. via PermissionService)
     * with the weeklyHours/vacationDays of their currently-active schedule, so
     * callers that bypass the find* methods still get the live values.
     *
     * @param Employee[] $employees
     * @return Employee[]
     */
    public function applyActiveSchedules(array $employees): array {
        return $this->withActiveScheduleEach($employees);
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
    /**
     * Minimal id + name list of all active employees, for pickers such as the
     * deputy selection (#343). No schedule enrichment, no sensitive fields —
     * safe to expose to any authenticated employee.
     *
     * @return array<int, array{id: int, fullName: string}>
     */
    public function getSelectableColleagues(): array {
        return array_map(
            static fn (Employee $e): array => ['id' => $e->getId(), 'fullName' => $e->getFullName()],
            $this->employeeMapper->findAllActive()
        );
    }

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
        int $workingDaysPerWeek = 5,
        ?float $vacationDaysUsed = null
    ): Employee {
        // Validate
        $errors = $this->validate($userId, $firstName, $lastName, $federalState);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        $this->validateVacationDaysUsed($vacationDaysUsed, $entryDate);

        // Weekly hours must be > 0: the initial work schedule is derived from them
        // (weeklyHours / 5). A value of 0 would produce a zero-hour profile, which
        // makes every working-day and absence-day calculation collapse to 0. A
        // genuine "currently not working" situation is modelled as an absence, not
        // as a 0-hour contract.
        if ($weeklyHours <= 0) {
            throw ValidationException::fromSingleError('weeklyHours', 'Weekly hours must be greater than zero');
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

        $employee->setVacationDaysUsed(self::normalizeVacationDaysUsed($vacationDaysUsed));

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
        ?int $supervisorId = null,
        string $federalState = 'BY',
        ?string $entryDate = null,
        ?string $exitDate = null,
        string $currentUserId = '',
        int $workingDaysPerWeek = 5,
        ?float $vacationDaysUsed = null
    ): Employee {
        $employee = $this->find($id);
        $oldValues = $employee->jsonSerialize();

        // Validate
        $errors = $this->validate($employee->getUserId(), $firstName, $lastName, $federalState);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        $this->validateVacationDaysUsed($vacationDaysUsed, $entryDate);

        // Prevent circular supervisor reference
        if ($supervisorId === $id) {
            throw ValidationException::fromSingleError('supervisorId', 'Employee cannot be their own supervisor');
        }

        // weeklyHours and vacationDays are intentionally not set here: they are
        // owned by the work schedule profile and synced via
        // WorkScheduleService::syncEmployeeFromActiveSchedule. Surfacing them on
        // read happens in withActiveSchedule().
        $employee->setFirstName($firstName);
        $employee->setLastName($lastName);
        $employee->setEmail($email);
        $employee->setPersonnelNumber($personnelNumber);
        $employee->setSupervisorId($supervisorId);
        $employee->setWorkingDaysPerWeek(max(1, min(7, $workingDaysPerWeek)));
        $employee->setFederalState($federalState);

        $employee->setEntryDate($entryDate ? new DateTime($entryDate) : null);
        $employee->setExitDate($exitDate ? new DateTime($exitDate) : null);
        $employee->setVacationDaysUsed(self::normalizeVacationDaysUsed($vacationDaysUsed));

        // isActive is intentionally not set here: the resting state is owned by
        // setResting()/reactivate(), which also clear deputy references (#486).
        $employee->setUpdatedAt(new DateTime());

        $employee = $this->withActiveSchedule($this->employeeMapper->update($employee));

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logUpdate($currentUserId, 'employee', $employee->getId(), $oldValues, $employee->jsonSerialize());
        }

        return $employee;
    }

    /**
     * Who is affected when this employee is put into the resting state (#486).
     *
     * Deputy references are cleared automatically, team members are not: their
     * supervisor link is left alone so the admin can decide, but they are
     * reported here so the confirmation dialog can name them.
     *
     * @throws NotFoundException
     * @return array{deputyFor: array<int, array{id: int, fullName: string}>, supervisorOf: array<int, array{id: int, fullName: string}>}
     */
    public function getRestingImpact(int $id): array {
        $this->find($id); // ensure the employee exists

        $toName = static fn (Employee $e): array => ['id' => $e->getId(), 'fullName' => $e->getFullName()];

        return [
            'deputyFor' => array_values(array_map($toName, $this->employeeMapper->findAllByDeputy($id))),
            'supervisorOf' => array_values(array_map($toName, $this->employeeMapper->findBySupervisor($id))),
        ];
    }

    /**
     * Put an employee into the resting state: no new time entries or absences,
     * gone from pickers and operational lists, but still visible and
     * exportable (#486, decision in #424).
     *
     * Any deputy references to this employee are cleared, because a resting
     * deputy cannot approve anything and would leave the colleague believing
     * they still have a stand-in.
     *
     * @throws NotFoundException
     * @throws ValidationException
     */
    public function setResting(int $id, ?string $reason, string $currentUserId = ''): Employee {
        $employee = $this->find($id);
        $oldValues = $employee->jsonSerialize();

        $reason = $reason !== null ? trim($reason) : null;
        if ($reason !== null && mb_strlen($reason) > self::MAX_LOCKED_REASON_LENGTH) {
            throw ValidationException::fromSingleError(
                'reason',
                'Reason must not exceed ' . self::MAX_LOCKED_REASON_LENGTH . ' characters'
            );
        }

        foreach ($this->employeeMapper->findAllByDeputy($id) as $dependent) {
            $dependentOld = $dependent->jsonSerialize();
            $dependent->setDeputyId(null);
            $dependent->setUpdatedAt(new DateTime());
            $this->employeeMapper->update($dependent);

            if ($currentUserId) {
                $this->auditLogService->logUpdate(
                    $currentUserId,
                    'employee',
                    $dependent->getId(),
                    $dependentOld,
                    $dependent->jsonSerialize(),
                );
            }
        }

        $employee->setIsActive(false);
        $employee->setLockedReason($reason === '' ? null : $reason);
        $employee->setUpdatedAt(new DateTime());

        $employee = $this->withActiveSchedule($this->employeeMapper->update($employee));

        if ($currentUserId) {
            $this->auditLogService->logUpdate($currentUserId, 'employee', $employee->getId(), $oldValues, $employee->jsonSerialize());
        }

        return $employee;
    }

    /**
     * Return a resting employee to normal operation (#486). Deputy references
     * cleared on resting are not restored: the colleagues chose a new stand-in
     * or none, and silently reinstating an old one would be surprising.
     *
     * @throws NotFoundException
     */
    public function reactivate(int $id, string $currentUserId = ''): Employee {
        $employee = $this->find($id);
        $oldValues = $employee->jsonSerialize();

        $employee->setIsActive(true);
        $employee->setLockedReason(null);
        $employee->setUpdatedAt(new DateTime());

        $employee = $this->withActiveSchedule($this->employeeMapper->update($employee));

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
     * Self-service: the current user sets (or clears) their own deputy who
     * stands in for their approvals while they are absent (#343). A null value
     * removes the deputy.
     *
     * @throws NotFoundException
     * @throws ValidationException
     */
    public function updateMyDeputy(string $userId, ?int $deputyId): Employee {
        $employee = $this->findByUserId($userId);
        $oldValues = $employee->jsonSerialize();

        // A user cannot be their own deputy.
        if ($deputyId === $employee->getId()) {
            throw ValidationException::fromSingleError('deputyId', 'You cannot be your own deputy');
        }

        $employee->setDeputyId($deputyId);
        $employee->setUpdatedAt(new DateTime());

        $employee = $this->employeeMapper->update($employee);

        $this->auditLogService->logUpdate($userId, 'employee', $employee->getId(), $oldValues, $employee->jsonSerialize());

        return $employee;
    }

    /**
     * #522: Im Eintrittsjahr bereits verbrauchte Urlaubstage.
     *
     * Der Wert wirkt ausschliesslich im Eintrittsjahr, deshalb ist er ohne
     * Eintrittsdatum wirkungslos — das wird abgewiesen statt still geschluckt,
     * sonst traegt ein Admin eine Zahl ein, die nirgends ankommt.
     *
     * @throws ValidationException
     */
    private function validateVacationDaysUsed(?float $vacationDaysUsed, ?string $entryDate): void {
        if ($vacationDaysUsed === null) {
            return;
        }

        if ($vacationDaysUsed < 0 || $vacationDaysUsed > 366) {
            throw ValidationException::fromSingleError(
                'vacationDaysUsed',
                'Vacation days already used must be between 0 and 366'
            );
        }

        if ($vacationDaysUsed > 0 && !$entryDate) {
            throw ValidationException::fromSingleError(
                'vacationDaysUsed',
                'Vacation days already used require an entry date'
            );
        }
    }

    /**
     * Null und 0 sind rechnerisch gleichbedeutend — beides wird als "kein Wert
     * hinterlegt" (NULL) abgelegt, damit Bestandsdatensaetze und bewusst
     * geleerte Felder identisch aussehen.
     */
    private static function normalizeVacationDaysUsed(?float $vacationDaysUsed): ?string {
        if ($vacationDaysUsed === null || $vacationDaysUsed <= 0) {
            return null;
        }

        return number_format($vacationDaysUsed, 1, '.', '');
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
