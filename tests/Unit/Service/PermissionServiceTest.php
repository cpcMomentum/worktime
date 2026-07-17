<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\AbsenceMapper;
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
    private AbsenceMapper $absenceMapper;

    protected function setUp(): void {
        $this->config = $this->createMock(IConfig::class);
        $this->groupManager = $this->createMock(IGroupManager::class);
        $this->employeeMapper = $this->createMock(EmployeeMapper::class);
        $this->absenceMapper = $this->createMock(AbsenceMapper::class);

        $this->service = new PermissionService(
            $this->config,
            $this->groupManager,
            $this->employeeMapper,
            $this->absenceMapper
        );
    }

    /**
     * Echte Employee-Entity statt Mock: getId() ist in der NC-Entity final und
     * daher nicht mockbar. setId()/setSupervisorId() füllen die Felder direkt.
     */
    private function makeEmployee(?int $id = null, ?int $supervisorId = null, ?int $deputyId = null): Employee {
        $employee = new Employee();
        if ($id !== null) {
            $employee->setId($id);
        }
        if ($supervisorId !== null) {
            $employee->setSupervisorId($supervisorId);
        }
        if ($deputyId !== null) {
            $employee->setDeputyId($deputyId);
        }
        return $employee;
    }

    private function approvedAbsence(): Absence {
        $a = new Absence();
        $a->setStatus(Absence::STATUS_APPROVED);
        return $a;
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
        $supervisor = $this->makeEmployee(1);

        $this->employeeMapper->method('findByUserId')
            ->with('supervisor_user')
            ->willReturn($supervisor);

        $teamMember = $this->makeEmployee();
        $this->employeeMapper->method('findBySupervisor')
            ->with(1)
            ->willReturn([$teamMember]);

        $this->assertTrue($this->service->isSupervisor('supervisor_user'));
    }

    public function testIsSupervisorWithoutTeamMembers(): void {
        $employee = $this->makeEmployee(1);

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
        $employee = $this->makeEmployee(1);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('findByUserId')
            ->willReturn($employee);

        $this->assertTrue($this->service->canViewEmployee('regular_user', 1));
    }

    public function testCanViewEmployeeAsSupervisor(): void {
        $supervisor = $this->makeEmployee(1);

        $teamMember = $this->makeEmployee(null, 1);

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
        $employee = $this->makeEmployee(1);

        $otherEmployee = $this->makeEmployee(null, 99); // Different supervisor

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
        $supervisor = $this->makeEmployee(1);

        $teamMember = $this->makeEmployee(null, 1);

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
        $employee = $this->makeEmployee(1);

        // Target 2 has supervisor 99; supervisor 99 has no deputy → user 1 is
        // neither supervisor nor the supervisor's deputy.
        $otherEmployee = $this->makeEmployee(2, 99);
        $supervisor99 = $this->makeEmployee(99);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');

        $this->employeeMapper->method('findByUserId')
            ->with('regular_user')
            ->willReturn($employee);

        $this->employeeMapper->method('find')
            ->willReturnMap([[2, $otherEmployee], [99, $supervisor99]]);

        $this->assertFalse($this->service->canApprove('regular_user', 2));
    }

    // ---------------------------------------------------------------------
    // #343: the deputy is set on the supervisor; the supervisor's deputy may
    // approve for the supervisor's team while that supervisor is absent.
    // ---------------------------------------------------------------------

    public function testDeputyCanApproveWhenSupervisorAbsent(): void {
        $deputyUser = $this->makeEmployee(5); // the requesting user (deputy)
        $member = $this->makeEmployee(2, 1); // team member, supervisor = 1
        $supervisor = $this->makeEmployee(1, null, 5); // supervisor 1, deputy = 5

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('findByUserId')->with('deputy_user')->willReturn($deputyUser);
        $this->employeeMapper->method('find')->willReturnMap([[2, $member], [1, $supervisor]]);
        // Supervisor 1 has an approved absence today → deputy fallback active.
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([$this->approvedAbsence()]);

        $this->assertTrue($this->service->canApprove('deputy_user', 2));
    }

    public function testDeputyCannotApproveWhenSupervisorPresent(): void {
        $deputyUser = $this->makeEmployee(5);
        $member = $this->makeEmployee(2, 1);
        $supervisor = $this->makeEmployee(1, null, 5);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('findByUserId')->with('deputy_user')->willReturn($deputyUser);
        $this->employeeMapper->method('find')->willReturnMap([[2, $member], [1, $supervisor]]);
        // Supervisor not absent today → deputy has no approval right.
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([]);

        $this->assertFalse($this->service->canApprove('deputy_user', 2));
    }

    public function testGetApprovableEmployeeIdsIncludesTeamWhenDeputizedSupervisorAbsent(): void {
        $deputyUser = $this->makeEmployee(5);
        $supervisor = $this->makeEmployee(1, null, 5); // supervisor 1, deputy = 5
        $member = $this->makeEmployee(2, 1); // in supervisor 1's team

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('findByUserId')->with('deputy_user')->willReturn($deputyUser);
        // 5 has no own direct team; supervisor 1's team is [member 2].
        $this->employeeMapper->method('findBySupervisor')->willReturnMap([[5, []], [1, [$member]]]);
        $this->employeeMapper->method('findByDeputy')->with(5)->willReturn([$supervisor]);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([$this->approvedAbsence()]);

        $this->assertSame([2], $this->service->getApprovableEmployeeIds('deputy_user'));
    }

    public function testGetApprovableEmployeeIdsExcludesTeamWhenDeputizedSupervisorPresent(): void {
        $deputyUser = $this->makeEmployee(5);
        $supervisor = $this->makeEmployee(1, null, 5);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('findByUserId')->with('deputy_user')->willReturn($deputyUser);
        $this->employeeMapper->method('findBySupervisor')->willReturnMap([[5, []]]);
        $this->employeeMapper->method('findByDeputy')->with(5)->willReturn([$supervisor]);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([]); // supervisor present

        $this->assertSame([], $this->service->getApprovableEmployeeIds('deputy_user'));
    }

    public function testGetPermissionInfo(): void {
        $employee = $this->makeEmployee(5);

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
        $this->assertFalse($info['canApprove']);
    }

    public function testGetPermissionInfoCanApproveTrueForActiveDeputy(): void {
        $deputy = $this->makeEmployee(5);
        $deputized = $this->makeEmployee(2, 1, 5); // supervisor 1, deputy 5

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('existsByUserId')->willReturn(true);
        $this->employeeMapper->method('findByUserId')->willReturn($deputy);
        $this->employeeMapper->method('findBySupervisor')->with(5)->willReturn([]); // no own team
        $this->employeeMapper->method('findByDeputy')->with(5)->willReturn([$deputized]);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([$this->approvedAbsence()]);

        $info = $this->service->getPermissionInfo('deputy_user');

        $this->assertTrue($info['canApprove']);
        $this->assertFalse($info['isSupervisor']);
    }

    public function testGetPermissionInfoCanApproveFalseForInactiveDeputy(): void {
        $deputy = $this->makeEmployee(5);
        $deputized = $this->makeEmployee(2, 1, 5);

        $this->groupManager->method('isAdmin')->willReturn(false);
        $this->config->method('getAppValue')->willReturn('[]');
        $this->employeeMapper->method('existsByUserId')->willReturn(true);
        $this->employeeMapper->method('findByUserId')->willReturn($deputy);
        $this->employeeMapper->method('findBySupervisor')->with(5)->willReturn([]);
        $this->employeeMapper->method('findByDeputy')->with(5)->willReturn([$deputized]);
        $this->absenceMapper->method('findByEmployeeAndDate')->willReturn([]); // supervisor present

        $info = $this->service->getPermissionInfo('deputy_user');

        $this->assertFalse($info['canApprove']);
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

    // ---------------------------------------------------------------------
    // #347: recursive subtree for SIGHT (getSubordinateEmployees)
    // ---------------------------------------------------------------------

    private function subEmp(int $id, ?int $supervisorId): Employee {
        $e = new Employee();
        $e->setId($id);
        $e->setSupervisorId($supervisorId);
        $e->setFirstName('E');
        $e->setLastName((string)$id);
        return $e;
    }

    /**
     * #347: getSubordinateEmployees walks the whole subtree (direct + indirect),
     * e.g. Frank(10) → Anna(20) → Ben(30)/Carla(31).
     */
    public function testGetSubordinateEmployeesIsRecursive(): void {
        $anna = $this->subEmp(20, 10);
        $ben = $this->subEmp(30, 20);
        $carla = $this->subEmp(31, 20);
        $this->employeeMapper->method('findBySupervisor')->willReturnCallback(
            fn(int $sid): array => match ($sid) {
                10 => [$anna],
                20 => [$ben, $carla],
                default => [],
            }
        );

        $ids = array_map(fn(Employee $e) => $e->getId(), $this->service->getSubordinateEmployees(10));
        sort($ids);
        $this->assertSame([20, 30, 31], $ids);
    }

    /**
     * #347: an accidental supervisor cycle must not loop forever.
     */
    public function testGetSubordinateEmployeesHandlesCycles(): void {
        $a = $this->subEmp(2, 1);
        $b = $this->subEmp(3, 2);
        $this->employeeMapper->method('findBySupervisor')->willReturnCallback(
            fn(int $sid): array => match ($sid) {
                1 => [$a],
                2 => [$b],
                3 => [$a], // cycle back to id 2's subtree
                default => [],
            }
        );

        $ids = array_map(fn(Employee $e) => $e->getId(), $this->service->getSubordinateEmployees(1));
        sort($ids);
        $this->assertSame([2, 3], $ids); // each visited once, no infinite loop
    }
}
