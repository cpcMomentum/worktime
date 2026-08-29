<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Db;

use OCA\WorkTime\Db\Absence;
use PHPUnit\Framework\TestCase;

/**
 * Fundament fuer stundenweise Krankheit (#625): das neue Feld absenceMinutes
 * traegt die Krank-Minuten eines Einzeltags. NULL = bisheriges scope-Verhalten.
 */
class AbsenceEntityTest extends TestCase {

    public function testAbsenceMinutesDefaultsToNull(): void {
        $absence = new Absence();
        $absence->setType(Absence::TYPE_SICK);

        $this->assertNull($absence->getAbsenceMinutes());
        $this->assertArrayHasKey('absenceMinutes', $absence->jsonSerialize());
        $this->assertNull($absence->jsonSerialize()['absenceMinutes']);
    }

    public function testAbsenceMinutesRoundtrips(): void {
        $absence = new Absence();
        $absence->setType(Absence::TYPE_SICK);
        $absence->setAbsenceMinutes(315);

        $this->assertSame(315, $absence->getAbsenceMinutes());
        $this->assertSame(315, $absence->jsonSerialize()['absenceMinutes']);
    }
}
