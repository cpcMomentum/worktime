<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\Db\Project;
use OCA\WorkTime\Db\ProjectEmployeeMapper;
use OCA\WorkTime\Db\ProjectMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\ProjectService;
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
}
