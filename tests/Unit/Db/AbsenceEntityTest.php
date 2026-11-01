<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Db;

use OCA\WorkTime\Db\Absence;
use OCP\IL10N;
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

    private function prefixingL10n(): IL10N {
        $l = $this->createMock(IL10N::class);
        $l->method('t')->willReturnCallback(static fn (string $text): string => 'EN:' . $text);
        return $l;
    }

    public function testTypeLabelsCoverEveryTypeAndAreTranslated(): void {
        $labels = Absence::typeLabels($this->prefixingL10n());

        $this->assertSame(array_keys(Absence::TYPES), array_keys($labels));
        foreach ($labels as $type => $label) {
            $this->assertStringStartsWith('EN:', $label, $type);
        }
    }

    public function testTypeLabelUsesFrontendSourceStrings(): void {
        $l = $this->prefixingL10n();

        $this->assertSame('EN:Krankheit', Absence::typeLabel($l, Absence::TYPE_SICK));
        $this->assertSame('EN:Fortbildung', Absence::typeLabel($l, Absence::TYPE_TRAINING));
        $this->assertSame('EN:Unbezahlter Urlaub', Absence::typeLabel($l, Absence::TYPE_UNPAID));
        $this->assertSame('EN:Abwesend', Absence::typeLabel($l, Absence::TYPE_MASKED));
    }

    public function testTypeLabelReturnsUnknownTypeUnchanged(): void {
        $this->assertSame('mystery', Absence::typeLabel($this->prefixingL10n(), 'mystery'));
    }
}
