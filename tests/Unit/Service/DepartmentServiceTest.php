<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\Db\Department;
use OCA\WorkTime\Db\DepartmentMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\DepartmentService;
use OCA\WorkTime\Service\ValidationException;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Covers department master data and, above all, the delete = unassign rule
 * (#570): deleting a department must clear department_id on every member
 * (including resting ones) and must never touch anything else.
 */
class DepartmentServiceTest extends TestCase {

    private DepartmentMapper $departmentMapper;
    private EmployeeMapper $employeeMapper;
    private DepartmentService $service;

    protected function setUp(): void {
        $this->departmentMapper = $this->createMock(DepartmentMapper::class);
        $this->employeeMapper = $this->createMock(EmployeeMapper::class);
        $this->service = new DepartmentService(
            $this->departmentMapper,
            $this->employeeMapper,
            $this->createMock(AuditLogService::class),
            $this->createMock(LoggerInterface::class),
        );
    }

    private function makeDepartment(int $id, string $name = 'D'): Department {
        $department = new Department();
        $department->setId($id);
        $department->setName($name);
        return $department;
    }

    private function makeEmployee(int $id, ?int $departmentId): Employee {
        $employee = new Employee();
        $employee->setId($id);
        $employee->setUserId('user' . $id);
        $employee->setDepartmentId($departmentId);
        return $employee;
    }

    public function testCreateRejectsEmptyName(): void {
        $this->departmentMapper->expects($this->never())->method('insert');

        try {
            $this->service->create('   ');
            $this->fail('Expected ValidationException for empty name');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('name', $e->getErrors());
        }
    }

    public function testCreateRejectsDuplicateName(): void {
        $this->departmentMapper->method('existsByName')->with('Vertrieb', null)->willReturn(true);
        $this->departmentMapper->expects($this->never())->method('insert');

        try {
            $this->service->create('Vertrieb');
            $this->fail('Expected ValidationException for duplicate name');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('name', $e->getErrors());
        }
    }

    public function testCreateRejectsTooLongName(): void {
        $this->departmentMapper->method('existsByName')->willReturn(false);
        $this->departmentMapper->expects($this->never())->method('insert');

        try {
            $this->service->create(str_repeat('X', 256));
            $this->fail('Expected ValidationException for name exceeding 255 chars');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('name', $e->getErrors());
        }
    }

    public function testCreateTrimsAndInsertsValidDepartment(): void {
        $this->departmentMapper->method('existsByName')->willReturn(false);
        $this->departmentMapper->expects($this->once())
            ->method('insert')
            ->willReturnCallback(function (Department $d): Department {
                // Name is trimmed before persisting.
                $this->assertSame('Vertrieb', $d->getName());
                $d->setId(42);
                return $d;
            });

        $result = $this->service->create('  Vertrieb  ');
        $this->assertSame(42, $result->getId());
    }

    public function testDeleteUnassignsEveryMemberThenDeletes(): void {
        $department = $this->makeDepartment(7, 'Vertrieb');
        $this->departmentMapper->method('find')->willReturn($department);

        $m1 = $this->makeEmployee(1, 7);
        $m2 = $this->makeEmployee(2, 7);
        $this->employeeMapper->method('findByDepartment')->with(7)->willReturn([$m1, $m2]);

        $updated = [];
        $this->employeeMapper->expects($this->exactly(2))
            ->method('update')
            ->willReturnCallback(function (Employee $e) use (&$updated): Employee {
                // Every member must have its assignment cleared.
                $this->assertNull($e->getDepartmentId());
                $updated[] = $e->getId();
                return $e;
            });

        // The department row itself is deleted after the members are unassigned.
        $this->departmentMapper->expects($this->once())->method('delete')->with($department);

        $this->service->delete(7);
        $this->assertSame([1, 2], $updated);
    }

    public function testDeletionImpactCountsMembers(): void {
        $this->departmentMapper->method('find')->willReturn($this->makeDepartment(7));
        $this->employeeMapper->method('findByDepartment')->with(7)->willReturn([
            $this->makeEmployee(1, 7),
            $this->makeEmployee(2, 7),
            $this->makeEmployee(3, 7),
        ]);

        $this->assertSame(['memberCount' => 3], $this->service->deletionImpact(7));
    }
}
