<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class YearlyCarryoverController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private YearlyCarryoverService $carryoverService,
        private PermissionService $permissionService,
    ) {
        parent::__construct($request, $userId);
    }

    /**
     * Get all carryovers for a given year.
     */
    #[NoAdminRequired]
    public function index(int $year): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        $carryovers = $this->carryoverService->findByYear($year);
        return $this->successResponse($carryovers);
    }

    /**
     * Get carryover for a specific employee and year.
     */
    #[NoAdminRequired]
    public function show(int $employeeId, int $year): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        // Employees can see their own carryover
        $ownEmployee = $this->permissionService->getEmployeeForUser($this->userId);
        $ownEmployeeId = $ownEmployee?->getId();
        if ($employeeId !== $ownEmployeeId && !$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        $carryover = $this->carryoverService->findByEmployeeAndYear($employeeId, $year);
        return $this->successResponse($carryover);
    }

    /**
     * Create or update carryover for an employee and year.
     */
    #[NoAdminRequired]
    public function upsert(
        int $employeeId,
        int $year,
        int $overtimeMinutes = 0,
        float $vacationDays = 0,
        ?string $note = null,
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $carryover = $this->carryoverService->upsert(
                $employeeId,
                $year,
                $overtimeMinutes,
                $vacationDays,
                $note,
                $this->userId
            );

            return $this->successResponse($carryover);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
