<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Db;

use OCA\WorkTime\Db\TimeEntry;
use PHPUnit\Framework\TestCase;

/**
 * Fundament fuer Notarbeit im Urlaub (#626-1): das neue Flag isEmergency
 * markiert einen Zeiteintrag als Notarbeit. Default 0 = regulaerer Eintrag.
 */
class TimeEntryEntityTest extends TestCase {

    public function testIsEmergencyDefaultsToZero(): void {
        $entry = new TimeEntry();

        $this->assertSame(0, $entry->getIsEmergency());
        $this->assertArrayHasKey('isEmergency', $entry->jsonSerialize());
        $this->assertFalse($entry->jsonSerialize()['isEmergency']);
    }

    public function testIsEmergencyRoundtripsAsBoolInJson(): void {
        $entry = new TimeEntry();
        $entry->setIsEmergency(1);

        $this->assertSame(1, $entry->getIsEmergency());
        $this->assertTrue($entry->jsonSerialize()['isEmergency']);
    }

    public function testIsEmergencyHelper(): void {
        $entry = new TimeEntry();
        $this->assertFalse($entry->isEmergency());

        $entry->setIsEmergency(1);
        $this->assertTrue($entry->isEmergency());
    }

    /**
     * #626: emergency_approved defaults to 1 (wirksam), so the overtime gate never
     * touches normal entries or existing rows.
     */
    public function testEmergencyApprovedDefaultsToApproved(): void {
        $entry = new TimeEntry();

        $this->assertSame(1, $entry->getEmergencyApproved());
        $this->assertTrue($entry->isEmergencyApproved());
        $this->assertTrue($entry->jsonSerialize()['emergencyApproved']);
    }

    public function testEmergencyApprovedPending(): void {
        $entry = new TimeEntry();
        $entry->setEmergencyApproved(0);

        $this->assertFalse($entry->isEmergencyApproved());
        $this->assertFalse($entry->jsonSerialize()['emergencyApproved']);
    }
}
