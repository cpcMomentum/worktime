<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\Db\Project;
use OCA\WorkTime\Db\ProjectEmployeeMapper;
use OCA\WorkTime\Db\ProjectMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\ProjectService;
use OCA\WorkTime\Service\ValidationException;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Covers the project-to-employee assignment logic (#58).
 */
class ProjectServiceTest extends TestCase {

    private ProjectMapper $projectMapper;
    private ProjectEmployeeMapper $projectEmployeeMapper;
    private ProjectService $service;

    protected function setUp(): void {
        $this->projectMapper = $this->createMock(ProjectMapper::class);
        $this->projectEmployeeMapper = $this->createMock(ProjectEmployeeMapper::class);
        $this->service = new ProjectService(
            $this->projectMapper,
            $this->projectEmployeeMapper,
            $this->createMock(AuditLogService::class),
            $this->createMock(LoggerInterface::class),
        );
    }

    private function makeProject(int $id, bool $allEmployees): Project {
        $project = new Project();
        $project->setId($id);
        $project->setName('P' . $id);
        $project->setAllEmployees($allEmployees);
        return $project;
    }

    public function testAllEmployeesProjectIsAllowedForAnyone(): void {
        $this->projectMapper->method('find')->willReturn($this->makeProject(1, true));
        // Membership must not even be consulted for an open project.
        $this->projectEmployeeMapper->expects($this->never())->method('findEmployeeIdsForProject');

        $this->assertTrue($this->service->isProjectAllowedForEmployee(1, 99));
    }

    public function testRestrictedProjectAllowedForAssignedEmployee(): void {
        $this->projectMapper->method('find')->willReturn($this->makeProject(2, false));
        $this->projectEmployeeMapper->method('findEmployeeIdsForProject')->willReturn([5, 6]);

        $this->assertTrue($this->service->isProjectAllowedForEmployee(2, 6));
    }

    public function testRestrictedProjectDeniedForNonAssignedEmployee(): void {
        $this->projectMapper->method('find')->willReturn($this->makeProject(2, false));
        $this->projectEmployeeMapper->method('findEmployeeIdsForProject')->willReturn([5, 6]);

        $this->assertFalse($this->service->isProjectAllowedForEmployee(2, 99));
    }

    public function testGetProjectsForEmployeeReturnsGlobalsPlusAssigned(): void {
        $global = $this->makeProject(1, true);
        $restrictedAssigned = $this->makeProject(2, false);
        $restrictedOther = $this->makeProject(3, false);

        $this->projectMapper->method('findAllActive')->willReturn([$global, $restrictedAssigned, $restrictedOther]);
        // Employee 6 is explicitly assigned to project 2 only.
        $this->projectEmployeeMapper->method('findProjectIdsForEmployee')->willReturn([2]);

        $result = $this->service->getProjectsForEmployee(6);
        $ids = array_map(static fn (Project $p) => $p->getId(), $result);

        $this->assertSame([1, 2], $ids);
    }

    public function testCreateRejectsEmptyName(): void {
        // Validation must fail before any insert happens.
        $this->projectMapper->expects($this->never())->method('insert');

        try {
            $this->service->create('   ');
            $this->fail('Expected ValidationException for empty name');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('name', $e->getErrors());
        }
    }

    public function testCreateRejectsDuplicateCode(): void {
        $this->projectMapper->method('existsByCode')->with('DUP', null)->willReturn(true);
        $this->projectMapper->expects($this->never())->method('insert');

        try {
            $this->service->create('Gültiger Name', 'DUP');
            $this->fail('Expected ValidationException for duplicate code');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('code', $e->getErrors());
        }
    }

    public function testCreateRejectsTooLongCode(): void {
        $this->projectMapper->method('existsByCode')->willReturn(false);
        $this->projectMapper->expects($this->never())->method('insert');

        try {
            $this->service->create('Gültiger Name', str_repeat('X', 51));
            $this->fail('Expected ValidationException for code exceeding 50 chars');
        } catch (ValidationException $e) {
            $this->assertArrayHasKey('code', $e->getErrors());
        }
    }

    public function testDeleteRemovesMembershipsAndProject(): void {
        $project = $this->makeProject(7, true);
        $this->projectMapper->method('find')->willReturn($project);

        // Memberships must be cleared before the project row itself is deleted.
        $this->projectEmployeeMapper->expects($this->once())->method('deleteForProject')->with(7);
        $this->projectMapper->expects($this->once())->method('delete')->with($project);

        $this->service->delete(7);
    }

    // ---------------------------------------------------------------------
    // #682: server-side project search (pure filter over a scoped set)
    // ---------------------------------------------------------------------

    private function makeNamed(int $id, string $name, ?string $code): Project {
        $project = new Project();
        $project->setId($id);
        $project->setName($name);
        $project->setCode($code);
        return $project;
    }

    private function nameList(array $projects): array {
        return array_map(static fn (Project $p): string => $p->getName(), $projects);
    }

    public function testSearchMatchesName(): void {
        $projects = [
            $this->makeNamed(1, 'Website Relaunch', 'P-100'),
            $this->makeNamed(2, 'Mobile App', 'P-200'),
            $this->makeNamed(3, 'Intranet', 'P-300'),
        ];
        $this->assertSame(['Mobile App'], $this->nameList($this->service->search($projects, 'mobile', 20)));
    }

    public function testSearchMatchesCode(): void {
        $projects = [
            $this->makeNamed(1, 'Website Relaunch', 'P-100'),
            $this->makeNamed(2, 'Mobile App', 'P-200'),
        ];
        $this->assertSame(['Mobile App'], $this->nameList($this->service->search($projects, 'P-200', 20)));
    }

    public function testSearchIsCaseInsensitive(): void {
        $projects = [$this->makeNamed(1, 'Website Relaunch', 'P-100')];
        $this->assertCount(1, $this->service->search($projects, 'WEBSITE', 20));
        $this->assertCount(1, $this->service->search($projects, 'relaunch', 20));
    }

    public function testSearchEmptyQueryReturnsAllWithinLimit(): void {
        $projects = [
            $this->makeNamed(1, 'A', null),
            $this->makeNamed(2, 'B', null),
            $this->makeNamed(3, 'C', null),
        ];
        $this->assertCount(3, $this->service->search($projects, '', 20));
        $this->assertCount(3, $this->service->search($projects, '   ', 20));
    }

    public function testSearchAppliesLimitAndPreservesOrder(): void {
        $projects = [
            $this->makeNamed(1, 'Alpha', null),
            $this->makeNamed(2, 'Aladin', null),
            $this->makeNamed(3, 'Alarm', null),
        ];
        $result = $this->service->search($projects, 'Al', 2);
        $this->assertSame(['Alpha', 'Aladin'], $this->nameList($result));
    }

    public function testSearchHandlesProjectsWithoutCode(): void {
        $projects = [$this->makeNamed(1, 'Onboarding', null)];
        $this->assertCount(1, $this->service->search($projects, 'onboard', 20));
        $this->assertCount(0, $this->service->search($projects, 'xyz', 20));
    }

    public function testSearchNoMatchReturnsEmpty(): void {
        $projects = [$this->makeNamed(1, 'Website', 'P-100')];
        $this->assertSame([], $this->service->search($projects, 'nonexistent', 20));
    }
}
