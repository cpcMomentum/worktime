<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IConfig;
use OCP\IGroupManager;

/**
 * Service to check user permissions for WorkTime
 *
 * Permission hierarchy:
 * - Admin: Nextcloud admin, has all permissions
 * - Supervisor: Can view/approve time entries and absences of their team members
 * - Employee: Can manage their own time entries and absences
 */
class PermissionService {

    public function __construct(
        private IConfig $config,
        private IGroupManager $groupManager,
        private EmployeeMapper $employeeMapper,
        private AbsenceMapper $absenceMapper,
    ) {
    }

    /**
     * Check if user is a Nextcloud admin
     */
    public function isAdmin(string $userId): bool {
        return $this->groupManager->isAdmin($userId);
    }

    /**
     * Check if user has HR Manager permission (can manage all employees)
     */
    public function isHrManager(string $userId): bool {
        return $this->hasPermission($userId, 'hr_managers');
    }

    /**
     * Check if user is a supervisor (has team members assigned)
     */
    public function isSupervisor(string $userId): bool {
        try {
            $employee = $this->employeeMapper->findByUserId($userId);
            $teamMembers = $this->employeeMapper->findBySupervisor($employee->getId());
            return count($teamMembers) > 0;
        } catch (DoesNotExistException) {
            return false;
        }
    }

    /**
     * Check if user has any access to the app
     */
    public function hasAccess(string $userId): bool {
        return $this->isAdmin($userId) || $this->isHrManager($userId) || $this->isEmployee($userId);
    }

    /**
     * Check if user is registered as an employee
     */
    public function isEmployee(string $userId): bool {
        return $this->employeeMapper->existsByUserId($userId);
    }

    /**
     * Get the employee entity for a user
     */
    public function getEmployeeForUser(string $userId): ?Employee {
        try {
            return $this->employeeMapper->findByUserId($userId);
        } catch (DoesNotExistException) {
            return null;
        }
    }

    /**
     * Check if user can manage employees (Admin or HR Manager)
     */
    public function canManageEmployees(string $userId): bool {
        return $this->isAdmin($userId) || $this->isHrManager($userId);
    }

    /**
     * Check if user can manage settings (Admin only)
     */
    public function canManageSettings(string $userId): bool {
        return $this->isAdmin($userId);
    }

    /**
     * Check if user can manage projects (Admin or HR Manager)
     */
    public function canManageProjects(string $userId): bool {
        return $this->isAdmin($userId) || $this->isHrManager($userId);
    }

    /**
     * Check if user can manage holidays (Admin or HR Manager)
     */
    public function canManageHolidays(string $userId): bool {
        return $this->isAdmin($userId) || $this->isHrManager($userId);
    }

    /**
     * Check if user can view a specific employee's data
     */
    public function canViewEmployee(string $userId, int $employeeId): bool {
        // Admin and HR Manager can view all
        if ($this->isAdmin($userId) || $this->isHrManager($userId)) {
            return true;
        }

        // Check if it's the user's own data
        $userEmployee = $this->getEmployeeForUser($userId);
        if ($userEmployee && $userEmployee->getId() === $employeeId) {
            return true;
        }

        // Check if user is supervisor of the employee
        if ($userEmployee && $this->isEmployeeSupervisedBy($employeeId, $userEmployee->getId())) {
            return true;
        }

        return false;
    }

    /**
     * Check if user can edit a specific employee's time entries
     */
    public function canEditTimeEntry(string $userId, int $employeeId): bool {
        // Admin and HR Manager can edit all
        if ($this->isAdmin($userId) || $this->isHrManager($userId)) {
            return true;
        }

        // Check if it's the user's own data
        $userEmployee = $this->getEmployeeForUser($userId);
        return $userEmployee && $userEmployee->getId() === $employeeId;
    }

    /**
     * Check if user can approve time entries/absences for an employee
     */
    public function canApprove(string $userId, int $employeeId): bool {
        // Admin and HR Manager can approve all
        if ($this->isAdmin($userId) || $this->isHrManager($userId)) {
            return true;
        }

        $userEmployee = $this->getEmployeeForUser($userId);
        if (!$userEmployee) {
            return false;
        }

        // Check if user is the direct supervisor of the employee
        if ($this->isEmployeeSupervisedBy($employeeId, $userEmployee->getId())) {
            return true;
        }

        // Deputy (#343): may approve for the employee only while the employee's
        // direct supervisor is currently absent (subordinate fallback).
        try {
            $target = $this->employeeMapper->find($employeeId);
        } catch (DoesNotExistException) {
            return false;
        }
        if ($target->getDeputyId() === $userEmployee->getId()
            && $target->getSupervisorId() !== null
            && $this->isSupervisorAbsentToday($target->getSupervisorId())) {
            return true;
        }

        return false;
    }

    /**
     * True if the given supervisor has an approved absence covering today (#343).
     * Any approved absence (full or half day) counts as "absent" for the purpose
     * of activating the deputy fallback.
     */
    public function isSupervisorAbsentToday(int $supervisorEmployeeId): bool {
        $today = new DateTime('today');
        foreach ($this->absenceMapper->findByEmployeeAndDate($supervisorEmployeeId, $today) as $absence) {
            if ($absence->isApproved()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Employee ids a user may currently approve for (#343): their own direct
     * team, plus deputized employees whose direct supervisor is absent today.
     * Admin/HR get all active employees. Used to scope the approval queues;
     * intentionally NOT used for calendar/evaluation visibility, so a deputy
     * gains no permanent extra insight.
     *
     * @return int[]
     */
    public function getApprovableEmployeeIds(string $userId): array {
        if ($this->isAdmin($userId) || $this->isHrManager($userId)) {
            return array_map(
                static fn (Employee $e): int => $e->getId(),
                $this->employeeMapper->findAllActive()
            );
        }

        $userEmployee = $this->getEmployeeForUser($userId);
        if (!$userEmployee) {
            return [];
        }

        $ids = array_map(
            static fn (Employee $e): int => $e->getId(),
            $this->employeeMapper->findBySupervisor($userEmployee->getId())
        );

        // Deputized employees whose direct supervisor is currently absent.
        foreach ($this->employeeMapper->findByDeputy($userEmployee->getId()) as $deputized) {
            $supervisorId = $deputized->getSupervisorId();
            if ($supervisorId !== null && $this->isSupervisorAbsentToday($supervisorId)) {
                $ids[] = $deputized->getId();
            }
        }

        return array_values(array_unique($ids));
    }

    /**
     * Check if employee is supervised by supervisor
     */
    public function isEmployeeSupervisedBy(int $employeeId, int $supervisorId): bool {
        try {
            $employee = $this->employeeMapper->find($employeeId);
            return $employee->getSupervisorId() === $supervisorId;
        } catch (DoesNotExistException) {
            return false;
        }
    }

    /**
     * Get team members for a supervisor
     *
     * @return Employee[]
     */
    public function getTeamMembers(string $userId): array {
        // Admin and HR Manager see all active employees
        if ($this->isAdmin($userId) || $this->isHrManager($userId)) {
            return $this->employeeMapper->findAllActive();
        }

        // Supervisor sees their team
        $employee = $this->getEmployeeForUser($userId);
        if ($employee) {
            return $this->employeeMapper->findBySupervisor($employee->getId());
        }

        return [];
    }

    /**
     * Team members a user may SEE (calendar, evaluation) — recursively over the
     * whole subtree (#347). A higher-level manager sees everyone below them.
     * Genehmigen bleibt davon UNBERUEHRT: dafuer gilt weiterhin der direkte
     * Vorgesetzte (canApprove / getTeamMembers, eine Ebene).
     *
     * @return Employee[]
     */
    public function getVisibleTeamMembers(string $userId): array {
        // Admin and HR Manager see all active employees
        if ($this->isAdmin($userId) || $this->isHrManager($userId)) {
            return $this->employeeMapper->findAllActive();
        }

        $employee = $this->getEmployeeForUser($userId);
        if ($employee === null) {
            return [];
        }

        return $this->getSubordinateEmployees($employee->getId());
    }

    /**
     * All employees in the subtree below the given employee (direct AND indirect
     * reports), via the supervisor relation. Cycle-guarded; the root itself is
     * not included. For SIGHT only — not for approval.
     *
     * @return Employee[]
     */
    public function getSubordinateEmployees(int $rootEmployeeId): array {
        $result = [];
        $visited = [$rootEmployeeId => true];
        $queue = [$rootEmployeeId];

        while (!empty($queue)) {
            $current = array_shift($queue);
            foreach ($this->employeeMapper->findBySupervisor($current) as $report) {
                $id = $report->getId();
                if (isset($visited[$id])) {
                    continue; // protect against accidental supervisor cycles
                }
                $visited[$id] = true;
                $result[] = $report;
                $queue[] = $id;
            }
        }

        return $result;
    }

    /**
     * Get permission info for frontend
     */
    public function getPermissionInfo(string $userId): array {
        $isAdmin = $this->isAdmin($userId);
        $isHrManager = $this->isHrManager($userId);
        $isSupervisor = $this->isSupervisor($userId);
        $isEmployee = $this->isEmployee($userId);
        $employee = $this->getEmployeeForUser($userId);

        // Deputy (#343): the Approvals tab must also open for a user who has no
        // own team but is currently the active deputy for at least one employee
        // whose direct supervisor is absent today. Without this, canApprove()
        // per-employee would allow the approval, but the frontend route/tab
        // (gated on this flag) would never let the deputy reach it.
        $canApproveAsDeputy = $employee !== null && $this->hasActiveDeputyApprovals($employee->getId());

        return [
            'isAdmin' => $isAdmin,
            'isHrManager' => $isHrManager || $isAdmin,
            'isSupervisor' => $isSupervisor,
            'isEmployee' => $isEmployee,
            'employeeId' => $employee?->getId(),
            'hasEmployees' => $this->employeeMapper->hasAny(),
            'canManageEmployees' => $isAdmin || $isHrManager,
            'canManageSettings' => $isAdmin,
            'canManageProjects' => $isAdmin || $isHrManager,
            'canManageHolidays' => $isAdmin || $isHrManager,
            'canApprove' => $isAdmin || $isHrManager || $isSupervisor || $canApproveAsDeputy,
        ];
    }

    /**
     * True if the given employee is currently the active deputy for at least
     * one other employee (#343): assigned as deputy AND that employee's direct
     * supervisor is absent today.
     */
    private function hasActiveDeputyApprovals(int $employeeId): bool {
        foreach ($this->employeeMapper->findByDeputy($employeeId) as $deputized) {
            $supervisorId = $deputized->getSupervisorId();
            if ($supervisorId !== null && $this->isSupervisorAbsentToday($supervisorId)) {
                return true;
            }
        }
        return false;
    }

    /**
     * Get configured HR Managers
     *
     * @return string[] Array of "group:groupId" or "user:userId" entries
     */
    public function getHrManagers(): array {
        $value = $this->config->getAppValue(Application::APP_ID, 'hr_managers', '[]');
        $decoded = json_decode($value, true);
        return is_array($decoded) ? $decoded : [];
    }

    /**
     * Set configured HR Managers
     *
     * @param string[] $entries Array of "group:groupId" or "user:userId" entries
     */
    public function setHrManagers(array $entries): void {
        $this->config->setAppValue(Application::APP_ID, 'hr_managers', json_encode(array_values($entries)));
    }

    /**
     * Check if user has a specific permission based on config
     */
    private function hasPermission(string $userId, string $configKey): bool {
        $value = $this->config->getAppValue(Application::APP_ID, $configKey, '[]');
        $entries = json_decode($value, true);

        if (!is_array($entries)) {
            return false;
        }

        foreach ($entries as $entry) {
            if (!is_string($entry)) {
                continue;
            }

            if (str_starts_with($entry, 'user:')) {
                $entryUserId = substr($entry, 5);
                if ($entryUserId === $userId) {
                    return true;
                }
            } elseif (str_starts_with($entry, 'group:')) {
                $groupId = substr($entry, 6);
                if ($this->groupManager->isInGroup($userId, $groupId)) {
                    return true;
                }
            }
        }

        return false;
    }
}
