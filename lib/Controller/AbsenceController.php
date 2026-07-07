<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class AbsenceController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private AbsenceService $absenceService,
        private EmployeeService $employeeService,
        private PermissionService $permissionService,
        private WorkScheduleService $workScheduleService,
        private YearlyCarryoverService $carryoverService,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function index(?int $employeeId = null, ?int $year = null, ?int $month = null): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        if ($year && $month) {
            $absences = $this->absenceService->findByEmployeeAndMonth($employeeId, $year, $month);
        } elseif ($year) {
            $absences = $this->absenceService->findByEmployeeAndYear($employeeId, $year);
        } else {
            $absences = $this->absenceService->findByEmployee($employeeId);
        }

        return $this->successResponse($absences);
    }

    #[NoAdminRequired]
    public function show(mixed $id): JSONResponse {
        // Handle route conflict: if $id is not numeric, this might be a misrouted request
        if (!is_numeric($id)) {
            return $this->successResponse(['error' => 'Invalid ID'], 400);
        }
        $id = (int) $id;

        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canViewEmployee($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            return $this->successResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function create(
        ?int $employeeId = null,
        string $type = '',
        string $startDate = '',
        string $endDate = '',
        ?string $note = null,
        float $scope = 1.0,
        ?string $reason = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canEditTimeEntry($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        // Validate scope
        if ($scope < 0 || $scope > 1) {
            return $this->successResponse(['error' => 'Scope must be between 0 and 1'], 400);
        }

        // Only HR/Admin may correct closed months (with a mandatory reason).
        $allowLockedOverride = $this->permissionService->canManageEmployees($this->userId);

        try {
            // Get employee's federal state
            $employee = $this->employeeService->find($employeeId);
            $federalState = $employee->getFederalState();

            $absence = $this->absenceService->create(
                $employeeId,
                $type,
                $startDate,
                $endDate,
                $note,
                $federalState,
                $this->userId,
                $scope,
                $reason,
                $allowLockedOverride
            );

            return $this->createdResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function update(
        int $id,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null,
        float $scope = 1.0,
        ?string $reason = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // Validate scope
        if ($scope < 0 || $scope > 1) {
            return $this->successResponse(['error' => 'Scope must be between 0 and 1'], 400);
        }

        // Only HR/Admin may correct closed months (with a mandatory reason).
        $allowLockedOverride = $this->permissionService->canManageEmployees($this->userId);

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            // #15: centrally set Betriebsferien may only be changed by HR/Admin.
            if ($absence->isCentral() && !$this->permissionService->canManageEmployees($this->userId)) {
                return $this->forbiddenResponse();
            }

            // Get employee's federal state
            $employee = $this->employeeService->find($absence->getEmployeeId());
            $federalState = $employee->getFederalState();

            $absence = $this->absenceService->update(
                $id,
                $type,
                $startDate,
                $endDate,
                $note,
                $federalState,
                $this->userId,
                $scope,
                $reason,
                $allowLockedOverride
            );

            return $this->successResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function destroy(int $id, ?string $reason = null): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // Only HR/Admin may delete in closed months (with a mandatory reason).
        $allowLockedOverride = $this->permissionService->canManageEmployees($this->userId);

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canEditTimeEntry($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            // #15: centrally set Betriebsferien may only be removed by HR/Admin.
            if ($absence->isCentral() && !$this->permissionService->canManageEmployees($this->userId)) {
                return $this->forbiddenResponse();
            }

            $this->absenceService->delete($id, $this->userId, $reason, $allowLockedOverride);

            return $this->deletedResponse();
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function approve(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            // The approver does not need an own employee profile: HR/Admins may
            // manage staff without being tracked as employees themselves. If no
            // profile exists, approvedBy stays null (same as reject()).
            $approverEmployee = $this->permissionService->getEmployeeForUser($this->userId);
            $approverEmployeeId = $approverEmployee?->getId();

            $absence = $this->absenceService->approve($id, $approverEmployeeId, $this->userId);

            return $this->successResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function reject(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $absence = $this->absenceService->find($id);

            if (!$this->permissionService->canApprove($this->userId, $absence->getEmployeeId())) {
                return $this->forbiddenResponse();
            }

            $absence = $this->absenceService->reject($id, $this->userId);

            return $this->successResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function cancel(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $absence = $this->absenceService->find($id);

            // User can cancel their own absences, or admins/HR can cancel any
            if (!$this->permissionService->canEditTimeEntry($this->userId, $absence->getEmployeeId()) &&
                !$this->permissionService->canManageEmployees($this->userId)) {
                return $this->forbiddenResponse();
            }

            // #15: centrally set Betriebsferien may only be cancelled by HR/Admin,
            // never by the affected employee.
            if ($absence->isCentral() && !$this->permissionService->canManageEmployees($this->userId)) {
                return $this->forbiddenResponse();
            }

            $absence = $this->absenceService->cancel($id, $this->userId);

            return $this->successResponse($absence);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * #15 Betriebsferien: book a closure as vacation for all/selected employees.
     */
    #[NoAdminRequired]
    public function companyVacation(
        string $startDate = '',
        string $endDate = '',
        ?array $employeeIds = null,
        ?string $note = null
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }
        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $result = $this->absenceService->createCompanyVacation($startDate, $endDate, $employeeIds, $note, $this->userId);
            return $this->createdResponse($result);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * #15: list all active Betriebsferien entries for the settings overview.
     */
    #[NoAdminRequired]
    public function centralAbsences(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }
        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        return $this->successResponse($this->absenceService->findCentralAbsences());
    }

    /**
     * #15: remove a whole Betriebsferien operation (all central entries for the range).
     */
    #[NoAdminRequired]
    public function deleteCompanyVacation(string $startDate = '', string $endDate = ''): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }
        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $count = $this->absenceService->deleteCompanyVacation($startDate, $endDate, $this->userId);
            return $this->successResponse(['removed' => $count]);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function vacationStats(?int $employeeId = null, int $year = 0): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($error = $this->requireEmployeeId($employeeId)) {
            return $error;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        try {
            if ($year === 0) {
                $year = (int)(new \DateTime())->format('Y');
            }

            // Schedule-aware base entitlement + previous-year carryover,
            // consistent with the monthly/yearly report (ReportController).
            $baseEntitlement = $this->workScheduleService->getVacationDaysForYear($employeeId, $year);
            $carryover = $this->carryoverService->getVacationCarryoverDays($employeeId, $year);

            $stats = $this->absenceService->getVacationStats(
                $employeeId,
                $year,
                $baseEntitlement + (int)round($carryover)
            );
            $stats['entitlement'] = $baseEntitlement;
            $stats['carryover'] = $carryover;

            return $this->successResponse($stats);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function overview(int $year = 0, int $month = 0): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($year === 0) {
            $year = (int)date('Y');
        }
        if ($month === 0) {
            $month = (int)date('n');
        }

        // Admin/HR see everything unmasked across all employees.
        // Supervisors see their whole subtree (recursive) unmasked incl. pending (#347).
        // Everyone else falls back to per-employee visibility rules.
        $isPrivileged = $this->permissionService->canManageEmployees($this->userId);
        $isSupervisor = $this->permissionService->isSupervisor($this->userId);

        $currentEmployee = $this->permissionService->getEmployeeForUser($this->userId);
        $currentEmployeeId = $currentEmployee?->getId();

        // Sicht (#347): ein Vorgesetzter sieht seinen ganzen Unterbaum rekursiv,
        // nicht nur direkte Unterstellte. Genehmigen bleibt davon unberuehrt.
        $subtreeEmployeeIds = ($isSupervisor && $currentEmployeeId !== null)
            ? array_map(
                static fn($e) => $e->getId(),
                $this->permissionService->getSubordinateEmployees($currentEmployeeId)
            )
            : [];

        $overview = $this->absenceService->getAbsenceOverview(
            $year,
            $month,
            $this->userId,
            $isPrivileged,
            $currentEmployeeId,
            $subtreeEmployeeIds
        );

        return $this->successResponse($overview);
    }

    #[NoAdminRequired]
    public function types(): JSONResponse {
        return $this->successResponse(Absence::TYPES);
    }

    #[NoAdminRequired]
    public function pending(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $employee = $this->permissionService->getEmployeeForUser($this->userId);

        if (!$employee && !$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        if ($this->permissionService->canManageEmployees($this->userId)) {
            // Admin/HR sees all pending
            $absences = $this->absenceService->findPendingForApproval(0);
        } elseif ($employee) {
            // Supervisor sees their team's pending
            $absences = $this->absenceService->findPendingForApproval($employee->getId());
        } else {
            $absences = [];
        }

        return $this->successResponse($this->enrichWithEmployeeData($absences));
    }

    #[NoAdminRequired]
    public function informational(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $employee = $this->permissionService->getEmployeeForUser($this->userId);

        if (!$employee && !$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        if ($this->permissionService->canManageEmployees($this->userId)) {
            // Admin/HR sees all active sick leaves
            $absences = $this->absenceService->findActiveInformationalForSupervisor(0);
        } elseif ($employee) {
            // Supervisor sees their team's active sick leaves
            $absences = $this->absenceService->findActiveInformationalForSupervisor($employee->getId());
        } else {
            $absences = [];
        }

        return $this->successResponse($this->enrichWithEmployeeData($absences));
    }

    private function enrichWithEmployeeData(array $absences): array {
        $result = [];
        foreach ($absences as $absence) {
            $absenceData = $absence->jsonSerialize();
            try {
                $emp = $this->employeeService->find($absence->getEmployeeId());
                $absenceData['employeeName'] = $emp->getFullName();
                $absenceData['employeeUserId'] = $emp->getUserId();
            } catch (\Exception $e) {
                $absenceData['employeeName'] = 'Unbekannt';
                $absenceData['employeeUserId'] = '';
            }
            $result[] = $absenceData;
        }
        return $result;
    }
}
