<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\NotFoundException;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\AppFramework\OCSController;
use OCP\IRequest;

class HolidayController extends OCSController {

    public function __construct(
        IRequest $request,
        private ?string $userId,
        private HolidayService $holidayService,
        private PermissionService $permissionService,
    ) {
        parent::__construct(Application::APP_ID, $request);
    }

    #[NoAdminRequired]
    public function index(int $year, string $federalState): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        $holidays = $this->holidayService->findByYearAndState($year, $federalState);

        return new JSONResponse($holidays);
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        try {
            $holiday = $this->holidayService->find($id);
            return new JSONResponse($holiday);
        } catch (NotFoundException $e) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
    }

    #[NoAdminRequired]
    public function generate(int $year, string $federalState): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageHolidays($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $holidays = $this->holidayService->generateHolidays($year, $federalState, $this->userId);

        return new JSONResponse([
            'count' => count($holidays),
            'holidays' => $holidays,
        ], Http::STATUS_CREATED);
    }

    #[NoAdminRequired]
    public function generateAll(int $year): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        if (!$this->permissionService->canManageHolidays($this->userId)) {
            return new JSONResponse(['error' => 'Access denied'], Http::STATUS_FORBIDDEN);
        }

        $federalStates = $this->holidayService->getFederalStates();
        $totalCount = 0;

        foreach (array_keys($federalStates) as $state) {
            $holidays = $this->holidayService->generateHolidays($year, $state, $this->userId);
            $totalCount += count($holidays);
        }

        return new JSONResponse([
            'year' => $year,
            'statesCount' => count($federalStates),
            'totalHolidays' => $totalCount,
        ], Http::STATUS_CREATED);
    }

    #[NoAdminRequired]
    public function check(int $year, string $federalState): JSONResponse {
        if (!$this->userId) {
            return new JSONResponse(['error' => 'Unauthorized'], Http::STATUS_UNAUTHORIZED);
        }

        $exists = $this->holidayService->existsForYearAndState($year, $federalState);

        return new JSONResponse(['exists' => $exists]);
    }

    #[NoAdminRequired]
    public function federalStates(): JSONResponse {
        return new JSONResponse($this->holidayService->getFederalStates());
    }

    #[NoAdminRequired]
    public function easter(int $year): JSONResponse {
        $easterSunday = $this->holidayService->calculateEasterSunday($year);

        return new JSONResponse([
            'year' => $year,
            'date' => $easterSunday->format('Y-m-d'),
        ]);
    }
}
