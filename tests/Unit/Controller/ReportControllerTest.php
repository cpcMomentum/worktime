<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\ReportController;
use OCA\WorkTime\Db\AbsenceMapper;
use DateTime;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\Project;
use OCA\WorkTime\Db\TimeEntry;
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
use OCA\WorkTime\Service\OvertimePayoutService;
use OCA\WorkTime\Service\OvertimeCalculationService;
use OCP\IL10N;
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
            $this->createMock(OvertimePayoutService::class),
            $this->createMock(OvertimeCalculationService::class),
            $this->projectService,
            $this->createMock(IL10N::class),
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

    private function timeEntry(int $id, string $date, int $projectId, int $employeeId, int $minutes, string $desc = ''): TimeEntry {
        $te = new TimeEntry();
        $te->setId($id);
        $te->setDate(new DateTime($date));
        $te->setProjectId($projectId);
        $te->setEmployeeId($employeeId);
        $te->setWorkMinutes($minutes);
        $te->setDescription($desc);
        return $te;
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
            $this->createMock(YearlyCarryoverService::class), $this->createMock(OvertimePayoutService::class),
            $this->createMock(OvertimeCalculationService::class), $this->projectService,
            $this->createMock(IL10N::class),
        );

        $this->assertSame(403, $controller->projects(2026, 6, 'month')->getStatus());
    }

    public function testProjectEntriesReturnsEnrichedBookings(): void {
        $this->projectService->method('findAll')->willReturn([$this->project(2, 'Acme', true)]);
        $this->employeeService->method('findAll')->willReturn([$this->employee(5, 'Test', 'User')]);
        $this->timeEntryMapper->method('findByDateRange')->willReturn([
            $this->timeEntry(10, '2026-06-15', 2, 5, 120, 'Arbeit'),
        ]);

        $data = $this->controller->projectEntries(2026, 6, 'month')->getData();

        $this->assertCount(1, $data['entries']);
        $this->assertSame(120, $data['totals']['totalMinutes']);
        $entry = $data['entries'][0];
        $this->assertSame('Acme', $entry['projectName']);
        $this->assertSame('Test User', $entry['employeeName']);
        $this->assertTrue($entry['isBillable']);
    }

    public function testProjectsCsvDetailContainsBookingRow(): void {
        $this->projectService->method('findAll')->willReturn([$this->project(2, 'Acme', true)]);
        $this->employeeService->method('findAll')->willReturn([$this->employee(5, 'Test', 'User')]);
        $this->timeEntryMapper->method('findByDateRange')->willReturn([
            $this->timeEntry(10, '2026-06-15', 2, 5, 120, 'Arbeit'),
        ]);

        $csv = $this->controller->projectsCsv(2026, 6, 'month', false, '', '', 'detail')->render();

        $this->assertStringContainsString('Datum', $csv);   // header present
        $this->assertStringContainsString('Acme', $csv);
        $this->assertStringContainsString('15.06.2026', $csv);
        $this->assertStringContainsString('2,00', $csv);     // 120 min as decimal hours
    }

    public function testProjectsCsvAggModeSumsMinutesPerEmployee(): void {
        $this->projectService->method('findAll')->willReturn([$this->project(2, 'Acme', true)]);
        $this->employeeService->method('findAll')->willReturn([$this->employee(5, 'Test', 'User')]);
        $this->timeEntryMapper->method('findByDateRange')->willReturn([
            $this->timeEntry(10, '2026-06-15', 2, 5, 120),
            $this->timeEntry(11, '2026-06-16', 2, 5, 60),
        ]);

        $csv = $this->controller->projectsCsv(2026, 6, 'month', false, '', '', 'agg')->render();

        $this->assertStringContainsString('Mitarbeiter', $csv); // aggregate header
        $this->assertStringContainsString('Test User', $csv);
        $this->assertStringContainsString('3,00', $csv);        // 120 + 60 = 180 min
        $this->assertStringContainsString('100 %', $csv);       // sole employee = 100 %
    }

    /**
     * Regression guard for #311: the PDF export must load the project and
     * employee lists exactly once. The previous code loaded them again in
     * selectionLabels() whenever a filter was set (4 queries instead of 2).
     */
    public function testProjectsPdfLoadsProjectsAndEmployeesOnce(): void {
        $this->projectService->expects($this->once())->method('findAll')
            ->willReturn([$this->project(2, 'Acme', true)]);
        $this->employeeService->expects($this->once())->method('findAll')
            ->willReturn([$this->employee(5, 'Test', 'User')]);
        $this->timeEntryMapper->method('findByDateRange')->willReturn([
            $this->timeEntry(10, '2026-06-15', 2, 5, 120),
        ]);

        // Filters set, so the old code would have re-queried in selectionLabels().
        $response = $this->controller->projectsPdf(2026, 6, 'month', false, '2', '5', 'detail');

        $this->assertSame(200, $response->getStatus());
    }
}
