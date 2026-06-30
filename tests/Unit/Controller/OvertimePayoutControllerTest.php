<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\OvertimePayoutController;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\OvertimePayout;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\NotFoundException;
use OCA\WorkTime\Service\OvertimePayoutService;
use OCA\WorkTime\Service\PermissionService;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

/**
 * Covers authorization, validation and error paths of the payout controller (#401).
 */
class OvertimePayoutControllerTest extends TestCase {

    private OvertimePayoutService $payoutService;
    private PermissionService $permissionService;
    private EmployeeService $employeeService;

    private function makeController(bool $canManage = true): OvertimePayoutController {
        $this->permissionService->method('canManageEmployees')->willReturn($canManage);
        return new OvertimePayoutController(
            $this->createMock(IRequest::class),
            'admin',
            $this->payoutService,
            $this->permissionService,
            $this->employeeService,
        );
    }

    protected function setUp(): void {
        $this->payoutService = $this->createMock(OvertimePayoutService::class);
        $this->permissionService = $this->createMock(PermissionService::class);
        $this->employeeService = $this->createMock(EmployeeService::class);
    }

    public function testIndexForbiddenWithoutPermission(): void {
        $controller = $this->makeController(false);
        $this->assertSame(403, $controller->index(2026)->getStatus());
    }

    public function testCreateForbiddenWithoutPermission(): void {
        $controller = $this->makeController(false);
        $this->assertSame(403, $controller->create(1, '2026-06-30', 600, 'Gültiger Grund')->getStatus());
    }

    public function testCreateRejectsInvalidDate(): void {
        $controller = $this->makeController();
        $this->assertSame(400, $controller->create(1, '2026-13-45', 600, 'Gültiger Grund')->getStatus());
    }

    public function testCreateRejectsEmptyDate(): void {
        $controller = $this->makeController();
        $this->assertSame(400, $controller->create(1, '', 600, 'Gültiger Grund')->getStatus());
    }

    public function testCreateReturns404ForUnknownEmployee(): void {
        $controller = $this->makeController();
        $this->employeeService->method('find')->willThrowException(new NotFoundException('Employee not found'));
        $this->assertSame(404, $controller->create(999, '2026-06-30', 600, 'Gültiger Grund')->getStatus());
    }

    public function testCreateSucceeds(): void {
        $controller = $this->makeController();
        $this->employeeService->method('find')->willReturn($this->createMock(Employee::class));
        $this->payoutService->method('create')->willReturn(new OvertimePayout());
        $this->assertSame(201, $controller->create(1, '2026-06-30', 600, 'Gültiger Grund')->getStatus());
    }

    public function testDestroyForbiddenWithoutPermission(): void {
        $controller = $this->makeController(false);
        $this->assertSame(403, $controller->destroy(5)->getStatus());
    }

    public function testDestroyReturns404WhenMissing(): void {
        $controller = $this->makeController();
        $this->payoutService->method('delete')->willThrowException(new NotFoundException('Overtime payout not found'));
        $this->assertSame(404, $controller->destroy(999)->getStatus());
    }

    public function testDestroySucceeds(): void {
        $controller = $this->makeController();
        $this->payoutService->expects($this->once())->method('delete')->with(5, 'admin');
        $this->assertSame(200, $controller->destroy(5)->getStatus());
    }
}
