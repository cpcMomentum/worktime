<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\CompanySettingsService;
use PHPUnit\Framework\TestCase;

/**
 * Die drei Admin-Schalter des Teiltages-Absenzen-Clusters (Phase 1 Fundament).
 * Bool-Getter delegieren an den Mapper; fehlender Wert ergibt false.
 */
class CompanySettingsServiceTest extends TestCase {

    private CompanySettingMapper $settingMapper;
    private CompanySettingsService $service;

    protected function setUp(): void {
        $this->settingMapper = $this->createMock(CompanySettingMapper::class);
        $auditLogService = $this->createMock(AuditLogService::class);

        $this->service = new CompanySettingsService(
            $this->settingMapper,
            $auditLogService,
        );
    }

    /**
     * @return array<string, array{0: string, 1: string}>
     */
    public static function switchProvider(): array {
        return [
            'hourly sick' => ['isHourlySickEnabled', CompanySetting::KEY_HOURLY_SICK_ENABLED],
            'emergency work' => ['isEmergencyWorkEnabled', CompanySetting::KEY_EMERGENCY_WORK_ENABLED],
            'emergency approval' => ['emergencyWorkRequiresApproval', CompanySetting::KEY_EMERGENCY_WORK_REQUIRES_APPROVAL],
        ];
    }

    /**
     * @dataProvider switchProvider
     */
    public function testSwitchDefaultsToFalse(string $method, string $key): void {
        $this->settingMapper->method('getValueAsBool')
            ->with($key)
            ->willReturn(false);

        $this->assertFalse($this->service->{$method}());
    }

    /**
     * @dataProvider switchProvider
     */
    public function testSwitchReadsEnabledValue(string $method, string $key): void {
        $this->settingMapper->method('getValueAsBool')
            ->with($key)
            ->willReturn(true);

        $this->assertTrue($this->service->{$method}());
    }
}
