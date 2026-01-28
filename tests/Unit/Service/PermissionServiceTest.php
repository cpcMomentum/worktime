<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Service\PermissionService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IConfig;
use OCP\IGroupManager;
use PHPUnit\Framework\TestCase;

class PermissionServiceTest extends TestCase {

    private PermissionService $service;
    private IConfig $config;
    private IGroupManager $groupManager;
    private EmployeeMapper $employeeMapper;

    protected function setUp(): void {
        $this->config = $this->createMock(IConfig::class);
        $this->groupManager = $this->createMock(IGroupManager::class);
        $this->employeeMapper = $this->createMock(EmployeeMapper::class);

        $this->service = new PermissionService(
            $this->config,
            $this->groupManager,
            $this->employeeMapper
        );
    }

    public function testIsAdminReturnsTrueForAdmin(): void {
        $this->groupManager->method('isAdmin')
            ->with('admin_user')
            ->willReturn(true);

        $this->assertTrue($this->service->isAdmin('admin_user'));
    }

    public function testIsAdminReturnsFalseForNonAdmin(): void {
        $this->groupManager->method('isAdmin')
            ->with('regular_user')
            ->willReturn(false);

        $this->assertFalse($this->service->isAdmin('regular_user'));
    }

    public function testIsHrManagerWithUserEntry(): void {
        $this->config->method('getAppValue')
            ->with(Application::APP_ID, 'hr_managers', '[]')
            ->willReturn('["user:hr_user"]');

        $this->assertTrue($this->service->isHrManager('hr_user'));
    }

    public function testIsHrManagerWithGroupEntry(): void {
        $this->config->method('getAppValue')
            ->with(Application::APP_ID, 'hr_managers', '[]')
            ->willReturn('["group:hr_group"]');

        $this->groupManager->method('isInGroup')
            ->with('group_member', 'hr_group')
            ->willReturn(true);

        $this->assertTrue($this->service->isHrManager('group_member'));
    }

    public function testIsHrManagerReturnsFalse(): void {
        $this->config->method('getAppValue')
            ->with(Application::APP_ID, 'hr_managers', '[]')
            ->willReturn('["user:other_hr"]');

        $this->assertFalse($this->service->isHrManager('regular_user'));
    }

    public function testIsSupervisorWithTeamMembers(): void {
        $supervisor = $this->createMock(Employee::class);
        $supervisor->method('getId')->willReturn(1);

        $this->employeeMapper->method('findByUserId')
            ->with('supervisor_user')
            ->willReturn($supervisor);

        $teamMember = $this->createMock(Employee::class);
        $this->employeeMapper->method('findBySupervisor')
            ->with(1)
            ->willReturn([$teamMember]);

        $this->assertTrue($this->service->isSupervisor('supervisor_user'));
    }

    public function testIsSupervisorWithoutTeamMembers(): void {
        $employee = $this->createMock(Employee::class);
        $employee->method('getId')->willReturn(1);

        $this->employeeMapper->method('findByUserId')
            ->with('employee_user')
            ->willReturn($employee);

        $this->employeeMapper->method('findBySupervisor')
            ->with(1)
            ->willReturn([]);

        $this->assertFalse($this->service->isSupervisor('employee_user'));
    }

    public function testIsSupervisorWithNoEmployee(): void {
        $this->employeeMapper->method('findByUserId')
            ->with('external_user')
            ->willThrowException(new DoesNotExistException(''));

        $this->assertFalse($this->service->isSupervisor('external_user'));
    }

    public function testIsEmployeeReturnsTrue(): void {
        $this->employeeMapper->method('existsByUserId')
            ->with('employee_user')
            ->willReturn(true);

        $this->assertTrue($this->service->isEmployee('employee_user'));
    }

    public function testIsEmployeeReturnsFalse(): void {
        $this->employeeMapper->method('existsByUserId')
            ->with('external_user')
            ->willReturn(false);

        $this->assertFalse($this->service->isEmployee('external_user'));
    }

    public function testHasAccessForAdmin(): void {
        $this->groupManager->method('isAdmin')
            ->with('admin_user')
            ->willReturn(true);

        $this->assertTrue($this->service->hasAccess('admin_user'));
    }

    public function testHasAccessForEmployee(): void {
        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('existsByUserId')
            ->with('employee_user')
            ->willReturn(true);

        $this->assertTrue($this->service->hasAccess('employee_user'));
    }

    public function testHasAccessDeniedForExternal(): void {
        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('existsByUserId')->willReturn(false);

        $this->assertFalse($this->service->hasAccess('external_user'));
    }

    public function testCanManageEmployeesAdmin(): void {
        $this->groupManager->method('isAdmin')->willReturn(true);

        $this->assertTrue($this->service->canManageEmployees('admin_user'));
    }

    public function testCanManageEmployeesHrManager(): void {
        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')
            ->willReturn('["user:hr_user"]');

        $this->assertTrue($this->service->canManageEmployees('hr_user'));
    }

    public function testCanManageEmployeesRegularEmployee(): void {
        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');

        $this->assertFalse($this->service->canManageEmployees('employee_user'));
    }

    public function testCanManageSettingsOnlyAdmin(): void {
        $this->groupManager->method('isAdmin')
            ->willReturnCallback(fn($userId) => $userId === 'admin_user');

        $this->assertTrue($this->service->canManageSettings('admin_user'));
        $this->assertFalse($this->service->canManageSettings('hr_user'));
    }

    public function testCanViewEmployeeOwnData(): void {
        $employee = $this->createMock(Employee::class);
        $employee->method('getId')->willReturn(1);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('findByUserId')
            ->willReturn($employee);

        $this->assertTrue($this->service->canViewEmployee('regular_user', 1));
    }

    public function testCanViewEmployeeAsSupervisor(): void {
        $supervisor = $this->createMock(Employee::class);
        $supervisor->method('getId')->willReturn(1);

        $teamMember = $this->createMock(Employee::class);
        $teamMember->method('getSupervisorId')->willReturn(1);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');

        $this->employeeMapper->method('findByUserId')
            ->with('supervisor_user')
            ->willReturn($supervisor);

        $this->employeeMapper->method('find')
            ->with(2)
            ->willReturn($teamMember);

        $this->assertTrue($this->service->canViewEmployee('supervisor_user', 2));
    }

    public function testCanViewEmployeeDenied(): void {
        $employee = $this->createMock(Employee::class);
        $employee->method('getId')->willReturn(1);

        $otherEmployee = $this->createMock(Employee::class);
        $otherEmployee->method('getSupervisorId')->willReturn(99); // Different supervisor

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');

        $this->employeeMapper->method('findByUserId')
            ->with('regular_user')
            ->willReturn($employee);

        $this->employeeMapper->method('find')
            ->with(2)
            ->willReturn($otherEmployee);

        $this->assertFalse($this->service->canViewEmployee('regular_user', 2));
    }

    public function testCanApproveAsSupervisor(): void {
        $supervisor = $this->createMock(Employee::class);
        $supervisor->method('getId')->willReturn(1);

        $teamMember = $this->createMock(Employee::class);
        $teamMember->method('getSupervisorId')->willReturn(1);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');

        $this->employeeMapper->method('findByUserId')
            ->with('supervisor_user')
            ->willReturn($supervisor);

        $this->employeeMapper->method('find')
            ->with(2)
            ->willReturn($teamMember);

        $this->assertTrue($this->service->canApprove('supervisor_user', 2));
    }

    public function testCanApproveDeniedForNonSupervisor(): void {
        $employee = $this->createMock(Employee::class);
        $employee->method('getId')->willReturn(1);

        $otherEmployee = $this->createMock(Employee::class);
        $otherEmployee->method('getSupervisorId')->willReturn(99);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');

        $this->employeeMapper->method('findByUserId')
            ->with('regular_user')
            ->willReturn($employee);

        $this->employeeMapper->method('find')
            ->with(2)
            ->willReturn($otherEmployee);

        $this->assertFalse($this->service->canApprove('regular_user', 2));
    }

    public function testGetPermissionInfo(): void {
        $employee = $this->createMock(Employee::class);
        $employee->method('getId')->willReturn(5);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('existsByUserId')->willReturn(true);
        $this->employeeMapper->method('findByUserId')->willReturn($employee);
        $this->employeeMapper->method('findBySupervisor')->willReturn([]);

        $info = $this->service->getPermissionInfo('employee_user');

        $this->assertIsArray($info);
        $this->assertArrayHasKey('isAdmin', $info);
        $this->assertArrayHasKey('isHrManager', $info);
        $this->assertArrayHasKey('isSupervisor', $info);
        $this->assertArrayHasKey('isEmployee', $info);
        $this->assertArrayHasKey('employeeId', $info);
        $this->assertArrayHasKey('canManageEmployees', $info);
        $this->assertArrayHasKey('canManageSettings', $info);
        $this->assertArrayHasKey('canApprove', $info);

        $this->assertFalse($info['isAdmin']);
        $this->assertTrue($info['isEmployee']);
        $this->assertEquals(5, $info['employeeId']);
    }

    public function testGetHrManagers(): void {
        $this->config->method('getAppValue')
            ->with(Application::APP_ID, 'hr_managers', '[]')
            ->willReturn('["user:hr1", "group:hr_group"]');

        $managers = $this->service->getHrManagers();

        $this->assertIsArray($managers);
        $this->assertCount(2, $managers);
        $this->assertContains('user:hr1', $managers);
        $this->assertContains('group:hr_group', $managers);
    }

    public function testSetHrManagers(): void {
        $this->config->expects($this->once())
            ->method('setAppValue')
            ->with(
                Application::APP_ID,
                'hr_managers',
                '["user:new_hr","group:new_group"]'
            );

        $this->service->setHrManagers(['user:new_hr', 'group:new_group']);
    }
}
