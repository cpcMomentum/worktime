<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use DateTime;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\OvertimePayoutService;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class OvertimePayoutController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private OvertimePayoutService $payoutService,
        private PermissionService $permissionService,
        private EmployeeService $employeeService,
    ) {
        parent::__construct($request, $userId);
    }

    /**
     * All payouts in a year (across employees). Admin/HR only.
     */
    #[NoAdminRequired]
    public function index(int $year): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        return $this->successResponse($this->payoutService->findByYear($year));
    }

    /**
     * Record an overtime payout. Admin/HR only.
     */
    #[NoAdminRequired]
    public function create(
        int $employeeId,
        string $payoutDate = '',
        int $minutes = 0,
        string $note = '',
    ): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        $date = DateTime::createFromFormat('!Y-m-d', $payoutDate);
        $dateErrors = DateTime::getLastErrors();
        if ($date === false || ($dateErrors !== false && ($dateErrors['error_count'] > 0 || $dateErrors['warning_count'] > 0))) {
            return new JSONResponse(['error' => 'Invalid payout date.'], Http::STATUS_BAD_REQUEST);
        }

        try {
            // Verify the employee exists (throws NotFoundException -> 404)
            $this->employeeService->find($employeeId);
            $payout = $this->payoutService->create(
                $employeeId, $date, $minutes, $note, $this->userId
            );
            return $this->successResponse($payout, Http::STATUS_CREATED);
        } catch (\InvalidArgumentException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_BAD_REQUEST);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    /**
     * Delete a payout. Admin/HR only.
     */
    #[NoAdminRequired]
    public function destroy(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageEmployees($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $this->payoutService->delete($id, $this->userId);
            return $this->successResponse(['success' => true]);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
