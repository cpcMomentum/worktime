<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\AbsenceController;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\UserTimeZone;
use OCA\WorkTime\Service\ValidationException;
use OCA\WorkTime\Service\WorkScheduleService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

/**
 * Tage-Vorschau im Abwesenheitsformular: lesen darf, wer den Mitarbeiter sehen darf.
 */
class AbsenceControllerPreviewTest extends TestCase {

    private AbsenceService $absenceService;
    private EmployeeService $employeeService;
    private PermissionService $permissionService;

    protected function setUp(): void {
        $this->absenceService = $this->createMock(AbsenceService::class);
        $this->employeeService = $this->createMock(EmployeeService::class);
        $this->permissionService = $this->createMock(PermissionService::class);
    }

    private function makeController(string $userId = 'employee'): AbsenceController {
        return new AbsenceController(
            $this->createMock(IRequest::class),
            $userId,
            $this->absenceService,
            $this->employeeService,
            $this->permissionService,
            $this->createMock(WorkScheduleService::class),
            $this->createMock(YearlyCarryoverService::class),
            $this->createMock(UserTimeZone::class),
        );
    }

    public function testReturnsDaysForVisibleEmployeeWithTheirFederalState(): void {
        $employee = new Employee();
        $employee->setFederalState('NW');
        $this->permissionService->method('canViewEmployee')->with('employee', 3)->willReturn(true);
        $this->employeeService->method('find')->with(3)->willReturn($employee);
        $this->absenceService->expects($this->once())
            ->method('previewDays')
            ->with(3, '2026-12-22', '2026-12-31', 1.0, 'NW')
            ->willReturn(5.0);

        $response = $this->makeController()->previewDays(3, '2026-12-22', '2026-12-31', 1.0);

        $this->assertSame(200, $response->getStatus());
        $this->assertSame(['days' => 5.0], $response->getData());
    }

    public function testForeignEmployeeIsForbidden(): void {
        $this->permissionService->method('canViewEmployee')->with('employee', 99)->willReturn(false);
        $this->absenceService->expects($this->never())->method('previewDays');

        $response = $this->makeController()->previewDays(99, '2026-12-22', '2026-12-31', 1.0);

        $this->assertSame(403, $response->getStatus());
    }

    public function testMissingEmployeeIdIsRejected(): void {
        $this->absenceService->expects($this->never())->method('previewDays');

        $this->assertSame(400, $this->makeController()->previewDays(null, '2026-12-22', '2026-12-31', 1.0)->getStatus());
    }

    public function testValidationErrorBecomesBadRequestWithErrors(): void {
        $employee = new Employee();
        $employee->setFederalState('NW');
        $this->permissionService->method('canViewEmployee')->willReturn(true);
        $this->employeeService->method('find')->willReturn($employee);
        $this->absenceService->method('previewDays')
            ->willThrowException(new ValidationException(['endDate' => ['Enddatum muss nach dem Startdatum liegen']]));

        $response = $this->makeController()->previewDays(3, '2026-12-31', '2026-12-22', 1.0);

        $this->assertSame(400, $response->getStatus());
        $this->assertArrayHasKey('endDate', $response->getData()['errors']);
    }
}
