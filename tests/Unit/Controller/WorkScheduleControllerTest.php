<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\WorkScheduleController;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

/**
 * #526: Lesen des Arbeitszeitprofils war an canManageEmployees() gebunden — der
 * gleichen Huerde wie Anlegen, Aendern und Loeschen. Ein Mitarbeiter kam damit
 * nicht an sein eigenes Profil. Diese Tests nageln die Rollentrennung fest:
 * lesen darf, wer den Mitarbeiter sehen darf; schreiben nur die Verwaltung.
 */
class WorkScheduleControllerTest extends TestCase {

    private WorkScheduleService $workScheduleService;
    private PermissionService $permissionService;

    protected function setUp(): void {
        $this->workScheduleService = $this->createMock(WorkScheduleService::class);
        $this->permissionService = $this->createMock(PermissionService::class);
    }

    private function makeController(string $userId = 'employee'): WorkScheduleController {
        return new WorkScheduleController(
            $this->createMock(IRequest::class),
            $userId,
            $this->workScheduleService,
            $this->permissionService,
        );
    }

    /**
     * Der gemeldete Fall: eigene Mitarbeiter-ID, kein Verwaltungsrecht.
     */
    public function testEmployeeMayReadOwnSchedule(): void {
        $this->permissionService->method('canViewEmployee')->with('employee', 3)->willReturn(true);
        $this->permissionService->method('canManageEmployees')->willReturn(false);
        $this->workScheduleService->method('findByEmployee')->with(3)->willReturn([]);

        $this->assertSame(200, $this->makeController()->index(3)->getStatus());
    }

    /**
     * Gegenprobe: fremder Mitarbeiter bleibt gesperrt. Die Lockerung darf nicht
     * zum Freibrief auf alle Profile werden.
     */
    public function testEmployeeMayNotReadForeignSchedule(): void {
        $this->permissionService->method('canViewEmployee')->with('employee', 99)->willReturn(false);
        $this->permissionService->method('canManageEmployees')->willReturn(false);
        $this->workScheduleService->expects($this->never())->method('findByEmployee');

        $this->assertSame(403, $this->makeController()->index(99)->getStatus());
    }

    /**
     * Vorgesetzte und Verwaltung kommen ueber dieselbe Pruefung herein.
     */
    public function testSupervisorMayReadSubordinateSchedule(): void {
        $this->permissionService->method('canViewEmployee')->with('supervisor', 3)->willReturn(true);
        $this->permissionService->method('canManageEmployees')->willReturn(false);
        $this->workScheduleService->method('findByEmployee')->with(3)->willReturn([]);

        $this->assertSame(200, $this->makeController('supervisor')->index(3)->getStatus());
    }

    /**
     * Schreiben bleibt der Verwaltung vorbehalten — auch fuer das eigene Profil.
     */
    public function testEmployeeMayNotCreateOwnSchedule(): void {
        $this->permissionService->method('canViewEmployee')->willReturn(true);
        $this->permissionService->method('canManageEmployees')->willReturn(false);
        $this->workScheduleService->expects($this->never())->method('create');

        $this->assertSame(403, $this->makeController()->create(3, '2026-01-01')->getStatus());
    }

    public function testEmployeeMayNotUpdateOwnSchedule(): void {
        $this->permissionService->method('canViewEmployee')->willReturn(true);
        $this->permissionService->method('canManageEmployees')->willReturn(false);
        $this->workScheduleService->expects($this->never())->method('update');

        $this->assertSame(403, $this->makeController()->update(3, 5)->getStatus());
    }

    public function testEmployeeMayNotDeleteOwnSchedule(): void {
        $this->permissionService->method('canViewEmployee')->willReturn(true);
        $this->permissionService->method('canManageEmployees')->willReturn(false);
        $this->workScheduleService->expects($this->never())->method('delete');

        $this->assertSame(403, $this->makeController()->destroy(3, 5)->getStatus());
    }
}
