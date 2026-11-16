<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\SettingsController;
use OCA\WorkTime\Controller\TimeEntryController;
use OCA\WorkTime\Db\ArchiveQueueMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\License\EntitlementService;
use OCA\WorkTime\Service\ArchiveService;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\ProjectService;
use OCA\WorkTime\Service\PunchEndCorrectionNotAllowedException;
use OCA\WorkTime\Service\PunchOnlyService;
use OCA\WorkTime\Service\PunchService;
use OCA\WorkTime\Service\TimeEntryService;
use OCP\IGroupManager;
use OCP\IL10N;
use OCP\IRequest;
use OCP\IUserManager;
use PHPUnit\Framework\MockObject\MockObject;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class PunchOnlyTest extends TestCase {

    private bool $settingOn = true;
    private bool $licensed = true;
    private bool $isHr = false;
    private TimeEntryService&MockObject $timeEntries;
    private PunchService&MockObject $punch;
    private CompanySettingsService&MockObject $settings;

    protected function setUp(): void {
        parent::setUp();
        $this->timeEntries = $this->createMock(TimeEntryService::class);
        $this->punch = $this->createMock(PunchService::class);
        $this->settings = $this->createMock(CompanySettingsService::class);
        $this->settings->method('getBool')->willReturnCallback(
            fn (string $key) => $key === CompanySetting::KEY_PUNCH_ONLY && $this->settingOn
        );
        $entry = new TimeEntry();
        $entry->setEmployeeId(7);
        $this->timeEntries->method('find')->willReturn($entry);
    }

    private function permissions(): PermissionService {
        $permissions = $this->createMock(PermissionService::class);
        $permissions->method('canEditTimeEntry')->willReturn(true);
        $permissions->method('canManageEmployees')->willReturnCallback(fn () => $this->isHr);
        $permissions->method('canManageSettings')->willReturn(true);
        $permissions->method('getPermissionInfo')->willReturn([]);
        return $permissions;
    }

    private function punchOnly(PermissionService $permissions): PunchOnlyService {
        $entitlement = $this->createMock(EntitlementService::class);
        $entitlement->method('hasFeature')->willReturnCallback(fn (string $flag) => $flag === 'wt_punch_only' && $this->licensed);
        return new PunchOnlyService($this->settings, $entitlement, $permissions);
    }

    private function l10n(): IL10N {
        $l10n = $this->createMock(IL10N::class);
        $l10n->method('t')->willReturnCallback(fn (string $text) => $text);
        return $l10n;
    }

    private function timeEntryController(): TimeEntryController {
        $permissions = $this->permissions();
        return new TimeEntryController(
            $this->createMock(IRequest::class),
            'lea',
            $this->timeEntries,
            $permissions,
            $this->createMock(ArchiveQueueMapper::class),
            $this->settings,
            $this->createMock(PdfService::class),
            $this->createMock(EmployeeService::class),
            $this->createMock(ArchiveService::class),
            $this->punch,
            $this->createMock(ProjectService::class),
            $this->createMock(LoggerInterface::class),
            $this->punchOnly($permissions),
            $this->l10n(),
        );
    }

    private function settingsController(): SettingsController {
        $permissions = $this->permissions();
        return new SettingsController(
            $this->createMock(IRequest::class),
            'admin',
            $this->settings,
            $permissions,
            $this->createMock(IUserManager::class),
            $this->createMock(IGroupManager::class),
            $this->punchOnly($permissions),
            $this->l10n(),
        );
    }

    public function testEmployeesCannotCreateUpdateOrDeleteEntries(): void {
        $this->timeEntries->expects($this->never())->method('create');
        $this->timeEntries->expects($this->never())->method('update');
        $this->timeEntries->expects($this->never())->method('delete');
        $controller = $this->timeEntryController();

        foreach ([
            $controller->create(7, '2026-11-17', '08:00', '16:00', 30),
            $controller->update(1, '2026-11-17', '08:00', '16:00', 30),
            $controller->destroy(1),
        ] as $response) {
            $this->assertSame(403, $response->getStatus());
            $this->assertSame('punch_only', $response->getData()['code']);
        }
    }

    public function testEmployeesPunchOutWithoutTheRightToCorrectTheEndTime(): void {
        $this->punch->expects($this->once())->method('punchOut')
            ->with(7, 'lea', 30, null, null, '15:00', false, false)
            ->willReturn(new TimeEntry());

        $this->assertSame(201, $this->timeEntryController()->punchOut(7, 30, null, null, '15:00')->getStatus());
    }

    public function testARejectedEndCorrectionAnswersWithThePunchOnlyCode(): void {
        $this->punch->method('punchOut')->willThrowException(new PunchEndCorrectionNotAllowedException());
        $response = $this->timeEntryController()->punchOut(7, 30, null, null, '15:00');

        $this->assertSame(403, $response->getStatus());
        $this->assertSame('punch_only', $response->getData()['code']);
    }

    public function testHrMayCorrectTheEndTimeOnPunchOut(): void {
        $this->isHr = true;
        $this->punch->expects($this->once())->method('punchOut')
            ->with(7, 'lea', 30, null, null, '15:00', false, true)
            ->willReturn(new TimeEntry());

        $this->timeEntryController()->punchOut(7, 30, null, null, '15:00');
    }

    public function testHrKeepsMaintainingEntries(): void {
        $this->isHr = true;
        $this->timeEntries->expects($this->once())->method('create')->willReturn(new TimeEntry());

        $this->assertSame(201, $this->timeEntryController()->create(7, '2026-11-17', '08:00', '16:00', 30)->getStatus());
    }

    public function testWithoutTheFlagTheStoredSettingIsNotApplied(): void {
        $this->licensed = false;
        $this->timeEntries->expects($this->once())->method('create')->willReturn(new TimeEntry());

        $this->assertSame(201, $this->timeEntryController()->create(7, '2026-11-17', '08:00', '16:00', 30)->getStatus());
    }

    public function testSettingOffLeavesEntriesOpen(): void {
        $this->settingOn = false;
        $this->timeEntries->expects($this->once())->method('delete');

        $this->assertNotSame(403, $this->timeEntryController()->destroy(1)->getStatus());
    }

    public function testEnablingWithoutWerkPlusIsRefused(): void {
        $this->licensed = false;
        $this->settings->expects($this->never())->method('set');
        $this->settings->expects($this->never())->method('setMultiple');
        $controller = $this->settingsController();

        $this->assertSame('werkplus_required', $controller->update(CompanySetting::KEY_PUNCH_ONLY, '1')->getData()['code']);
        $this->assertSame(403, $controller->updateMultiple([CompanySetting::KEY_PUNCH_ONLY => '1'])->getStatus());
    }

    public function testDisablingWithoutWerkPlusIsAllowed(): void {
        $this->licensed = false;
        $this->settings->expects($this->once())->method('set')->willReturn(new CompanySetting());

        $this->assertSame(200, $this->settingsController()->update(CompanySetting::KEY_PUNCH_ONLY, '0')->getStatus());
    }

    public function testPermissionsTellTheFrontendWhetherTheLockApplies(): void {
        $data = $this->settingsController()->permissions()->getData();

        $this->assertTrue($data['punchOnly']);
        $this->assertTrue($data['punchOnlyLicensed']);
    }
}
