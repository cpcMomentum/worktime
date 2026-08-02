<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class WorkScheduleController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private WorkScheduleService $workScheduleService,
        private PermissionService $permissionService,
    ) {
        parent::__construct($request, $userId);
    }

    /**
     * #526: Lesen ist bewusst schwaecher geschuetzt als Schreiben. Vorher stand
     * hier canManageEmployees() — dieselbe Huerde wie fuer create/update/destroy
     * weiter unten. Damit kam ein Mitarbeiter nicht einmal an sein EIGENES
     * Arbeitszeitprofil, weil die eigene Mitarbeiter-ID in der Pruefung gar
     * nicht vorkam. In der Weboberflaeche faellt das nie auf: der Profil-Editor
     * haengt im Mitarbeiter-Formular, das ohnehin nur Admin/HR erreichen. Ueber
     * die API war es ein harter Blocker.
     *
     * canViewEmployee() deckt die drei sinnvollen Faelle ab (Admin/HR, eigene
     * Daten, Unterstellte) und ist das, was vergleichbare Lese-Endpunkte
     * ohnehin verwenden — AbsenceController::vacationStats() etwa.
     * Schreibend bleibt es bei canManageEmployees().
     */
    #[NoAdminRequired]
    public function index(int $employeeId): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canViewEmployee($this->userId, $employeeId)) {
            return $this->forbiddenResponse();
        }

        $schedules = $this->workScheduleService->findByEmployee($employeeId);
        return $this->successResponse($schedules);
    }

    #[NoAdminRequired]
    public function create(
        int $employeeId,
        string $validFrom,
        array $dayHours = [],
        int $vacationDays = 30
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $schedule = $this->workScheduleService->create(
                $employeeId,
                $validFrom,
                $dayHours,
                $vacationDays,
                $this->userId
            );

            return $this->createdResponse($schedule);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function update(
        int $employeeId,
        int $id,
        array $dayHours = [],
        int $vacationDays = 30
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $schedule = $this->workScheduleService->update(
                $id,
                $employeeId,
                $dayHours,
                $vacationDays,
                $this->userId
            );

            return $this->successResponse($schedule);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function destroy(int $employeeId, int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $this->workScheduleService->delete($id, $employeeId, $this->userId);
            return $this->deletedResponse();
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
