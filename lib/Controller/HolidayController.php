<?php

declare(strict_types=1);

namespace OCA\WorkTime\Controller;

use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Http;
use OCP\AppFramework\Http\Attribute\NoAdminRequired;
use OCP\AppFramework\Http\JSONResponse;
use OCP\IRequest;

class HolidayController extends BaseController {

    public function __construct(
        IRequest $request,
        ?string $userId,
        private HolidayService $holidayService,
        private PermissionService $permissionService,
    ) {
        parent::__construct($request, $userId);
    }

    #[NoAdminRequired]
    public function index(int $year, string $federalState = ''): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if ($federalState === '') {
            $holidays = $this->holidayService->findByYear($year);
        } else {
            $holidays = $this->holidayService->findByYearAndState($year, $federalState);
        }

        return $this->successResponse($holidays);
    }

    #[NoAdminRequired]
    public function show(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $holiday = $this->holidayService->find($id);
            return $this->successResponse($holiday);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function generate(int $year, string $federalState): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageHolidays($this->userId)) {
            return $this->forbiddenResponse();
        }

        $holidays = $this->holidayService->generateHolidays($year, $federalState, $this->userId);

        return $this->createdResponse([
            'count' => count($holidays),
            'holidays' => $holidays,
        ]);
    }

    #[NoAdminRequired]
    public function generateAll(int $year): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageHolidays($this->userId)) {
            return $this->forbiddenResponse();
        }

        $federalStates = $this->holidayService->getFederalStates();
        $totalCount = 0;

        foreach (array_keys($federalStates) as $state) {
            $holidays = $this->holidayService->generateHolidays($year, $state, $this->userId);
            $totalCount += count($holidays);
        }

        return $this->createdResponse([
            'year' => $year,
            'statesCount' => count($federalStates),
            'totalHolidays' => $totalCount,
        ]);
    }

    #[NoAdminRequired]
    public function check(int $year, string $federalState): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        $exists = $this->holidayService->existsForYearAndState($year, $federalState);

        return $this->successResponse(['exists' => $exists]);
    }

    #[NoAdminRequired]
    public function federalStates(): JSONResponse {
        return $this->successResponse($this->holidayService->getFederalStates());
    }

    #[NoAdminRequired]
    public function easter(int $year): JSONResponse {
        $easterSunday = $this->holidayService->calculateEasterSunday($year);

        return $this->successResponse([
            'year' => $year,
            'date' => $easterSunday->format('Y-m-d'),
        ]);
    }

    #[NoAdminRequired]
    public function byYear(int $year): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        try {
            $holidays = $this->holidayService->findByYear($year);
            return $this->successResponse($holidays);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function create(): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageHolidays($this->userId)) {
            return $this->forbiddenResponse();
        }

        $date = $this->request->getParam('date');
        $name = $this->request->getParam('name');
        $federalStates = $this->request->getParam('federalStates', []);
        $isHalfDay = (bool)$this->request->getParam('isHalfDay', false);

        if (!$date || !$name || empty($federalStates)) {
            return new JSONResponse(['error' => 'Missing required parameters: date, name, federalStates'], Http::STATUS_BAD_REQUEST);
        }

        try {
            $holidays = $this->holidayService->createManual($date, $name, $federalStates, $isHalfDay, $this->userId);

            return $this->createdResponse([
                'count' => count($holidays),
                'holidays' => $holidays,
            ]);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function update(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageHolidays($this->userId)) {
            return $this->forbiddenResponse();
        }

        $date = $this->request->getParam('date');
        $name = $this->request->getParam('name');
        $isHalfDay = (bool)$this->request->getParam('isHalfDay', false);

        if (!$date || !$name) {
            return new JSONResponse(['error' => 'Missing required parameters: date, name'], Http::STATUS_BAD_REQUEST);
        }

        try {
            $holiday = $this->holidayService->update($id, $date, $name, $isHalfDay, $this->userId);

            return $this->successResponse($holiday);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }

    #[NoAdminRequired]
    public function destroy(int $id): JSONResponse {
        if ($authError = $this->requireAuth()) {
            return $authError;
        }

        if (!$this->permissionService->canManageHolidays($this->userId)) {
            return $this->forbiddenResponse();
        }

        try {
            $this->holidayService->delete($id, $this->userId);

            return $this->successResponse(['deleted' => true]);
        } catch (\Exception $e) {
            return $this->handleException($e);
        }
    }
}
