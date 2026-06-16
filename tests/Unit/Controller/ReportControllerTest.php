<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\ReportController;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\Project;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\ProjectService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

/**
 * Covers the project evaluation endpoint (#57): aggregation, totals and the
 * billable-only filter.
 */
class ReportControllerTest extends TestCase {

    private TimeEntryMapper $timeEntryMapper;
    private EmployeeService $employeeService;
    private ProjectService $projectService;
    private PermissionService $permissionService;
    private ReportController $controller;

    protected function setUp(): void {
        $this->timeEntryMapper = $this->createMock(TimeEntryMapper::class);
        $this->employeeService = $this->createMock(EmployeeService::class);
        $this->projectService = $this->createMock(ProjectService::class);
        $this->permissionService = $this->createMock(PermissionService::class);
        $this->permissionService->method('canManageEmployees')->willReturn(true);

        $this->controller = new ReportController(
            $this->createMock(IRequest::class),
            'admin',
            $this->createMock(TimeEntryService::class),
            $this->timeEntryMapper,
            $this->createMock(AbsenceMapper::class),
            $this->createMock(AbsenceService::class),
            $this->employeeService,
            $this->createMock(HolidayService::class),
            $this->permissionService,
            $this->createMock(PdfService::class),
            $this->createMock(WorkScheduleService::class),
            $this->createMock(YearlyCarryoverService::class),
            $this->projectService,
        );
    }

    private function project(int $id, string $name, bool $billable): Project {
        $p = new Project();
        $p->setId($id);
        $p->setName($name);
        $p->setIsBillable($billable);
        return $p;
    }

    private function employee(int $id, string $first, string $last): Employee {
        $e = new Employee();
        $e->setId($id);
        $e->setFirstName($first);
        $e->setLastName($last);
        return $e;
    }

    public function testProjectsAggregatesRowsAndTotals(): void {
        $this->projectService->method('findAll')->willReturn([
            $this->project(1, 'Intern', false),
            $this->project(2, 'Acme', true),
        ]);
        $this->employeeService->method('findAll')->willReturn([
            $this->employee(5, 'Test', 'FZA'),
            $this->employee(6, 'User', 'One'),
        ]);
        $this->timeEntryMapper->method('sumWorkMinutesGroupedByProjectAndEmployee')->willReturn([
            ['projectId' => 2, 'employeeId' => 5, 'minutes' => 120],
            ['projectId' => 2, 'employeeId' => 6, 'minutes' => 60],
            ['projectId' => 1, 'employeeId' => 5, 'minutes' => 30],
        ]);

        $data = $this->controller->projects(2026, 6, 'month')->getData();

        $this->assertCount(3, $data['rows']);
        $this->assertSame(210, $data['totals']['totalMinutes']);
        $this->assertSame(180, $data['totals']['billableMinutes']); // only the Acme rows
        $this->assertSame(2, $data['totals']['projectCount']);
        $this->assertSame(2, $data['totals']['employeeCount']);
        // Project metadata is joined onto the rows.
        $acme = array_values(array_filter($data['rows'], static fn ($r) => $r['projectId'] === 2))[0];
        $this->assertSame('Acme', $acme['projectName']);
        $this->assertTrue($acme['isBillable']);
    }

    public function testProjectsBillableOnlyExcludesInternalProject(): void {
        $this->projectService->method('findAll')->willReturn([
            $this->project(1, 'Intern', false),
            $this->project(2, 'Acme', true),
        ]);
        $this->employeeService->method('findAll')->willReturn([$this->employee(5, 'Test', 'FZA')]);
        $this->timeEntryMapper->method('sumWorkMinutesGroupedByProjectAndEmployee')->willReturn([
            ['projectId' => 2, 'employeeId' => 5, 'minutes' => 120],
            ['projectId' => 1, 'employeeId' => 5, 'minutes' => 30],
        ]);

        $data = $this->controller->projects(2026, 6, 'month', true)->getData();

        $this->assertCount(1, $data['rows']);
        $this->assertSame(2, $data['rows'][0]['projectId']);
        $this->assertSame(120, $data['totals']['totalMinutes']);
        $this->assertSame(1, $data['totals']['projectCount']);
    }

    public function testProjectsForbiddenWithoutManagePermission(): void {
        $perm = $this->createMock(PermissionService::class);
        $perm->method('canManageEmployees')->willReturn(false);
        $controller = new ReportController(
            $this->createMock(IRequest::class), 'emp',
            $this->createMock(TimeEntryService::class), $this->timeEntryMapper,
            $this->createMock(AbsenceMapper::class), $this->createMock(AbsenceService::class),
            $this->employeeService, $this->createMock(HolidayService::class), $perm,
            $this->createMock(PdfService::class), $this->createMock(WorkScheduleService::class),
            $this->createMock(YearlyCarryoverService::class), $this->projectService,
        );

        $this->assertSame(403, $controller->projects(2026, 6, 'month')->getStatus());
    }
}
