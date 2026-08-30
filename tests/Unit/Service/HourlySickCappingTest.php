<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\OvertimePayoutMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\OvertimeCalculationService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use PHPUnit\Framework\TestCase;

/**
 * #625 stundenweise Krankheit: eine Krank-Absence mit gesetztem absenceMinutes
 * fuellt den Einzeltag nur bis zum Resttagessoll (Tagessoll minus gearbeitet).
 * So entstehen keine kuenstlichen Ueberstunden, wenn an einem Krank-Tag zusaetzlich
 * gearbeitet wurde. Der Wert wird nicht ueber scope, sondern ueber absenceMinutes
 * getragen; die Pro-Tag-Deckelung ist das Herzstueck der Phase.
 *
 * April 2026 ist zum Laufzeitpunkt ein abgeschlossener Monat, daher entspricht die
 * "bis heute"-Rechnung dem vollen Monat (Muster wie CompensatoryOvertimeTest).
 */
class HourlySickCappingTest extends TestCase {

	private const DAY = '2026-04-15';

	/** Ein Arbeitstag, Tagessoll 525 min (8,75h). */
	private function schedule(): WorkScheduleService {
		$schedule = $this->createMock(WorkScheduleService::class);
		$schedule->method('countWorkingDays')->willReturn(1.0);
		$schedule->method('calculateTargetMinutes')->willReturn(525);
		$schedule->method('getDailyMinutesForDate')->willReturn(525);
		return $schedule;
	}

	private function makeService(WorkScheduleService $schedule): OvertimeCalculationService {
		return new OvertimeCalculationService(
			$schedule,
			$this->createMock(YearlyCarryoverService::class),
			$this->createMock(OvertimePayoutMapper::class),
			$this->createMock(EmployeeService::class),
			$this->createMock(TimeEntryService::class),
			$this->createMock(AbsenceService::class),
			$this->createMock(HolidayService::class),
		);
	}

	private function employee(): Employee {
		return new class extends Employee {
			public function getId(): int {
				return 1;
			}
			public function getEntryDate(): ?DateTime {
				return null;
			}
			public function getExitDate(): ?DateTime {
				return null;
			}
		};
	}

	private function workEntry(int $workMinutes): TimeEntry {
		$entry = new TimeEntry();
		$entry->setDate(new DateTime(self::DAY));
		$entry->setWorkMinutes($workMinutes);
		return $entry;
	}

	private function hourlySick(int $absenceMinutes): Absence {
		$absence = new Absence();
		$absence->setStatus(Absence::STATUS_APPROVED);
		$absence->setType(Absence::TYPE_SICK);
		$absence->setStartDate(new DateTime(self::DAY));
		$absence->setEndDate(new DateTime(self::DAY));
		$absence->setScopeValue(1.0);
		$absence->setAbsenceMinutes($absenceMinutes);
		return $absence;
	}

	/**
	 * @return array{overtime:int, paidAbsence:int}
	 */
	private function stats(array $entries, array $absences): array {
		$stats = $this->makeService($this->schedule())
			->getMonthlyStats($this->employee(), 2026, 4, $entries, $absences, []);
		return [
			'overtime' => $stats['overtimeMinutes'],
			'paidAbsence' => $stats['paidAbsenceMinutes'],
		];
	}

	public function testSickFillsRemainingTargetWhenPartlyWorked(): void {
		// 210 gearbeitet + 315 krank = 525 (genau Tagessoll) -> keine Ueberstunden.
		$r = $this->stats([$this->workEntry(210)], [$this->hourlySick(315)]);
		$this->assertSame(315, $r['paidAbsence']);
		$this->assertSame(0, $r['overtime']);
	}

	public function testSickCreditIsCappedToRemainingTarget(): void {
		// 480 gearbeitet, 315 krank angefragt -> nur 525-480=45 gutgeschrieben,
		// keine Ueberstunden durch Krank.
		$r = $this->stats([$this->workEntry(480)], [$this->hourlySick(315)]);
		$this->assertSame(45, $r['paidAbsence']);
		$this->assertSame(0, $r['overtime']);
	}

	public function testSickAloneCreditsRequestedMinutes(): void {
		// 0 gearbeitet, 315 krank -> 315 gutgeschrieben, 210 fehlen zum Soll.
		$r = $this->stats([], [$this->hourlySick(315)]);
		$this->assertSame(315, $r['paidAbsence']);
		$this->assertSame(-210, $r['overtime']);
	}

	public function testSickCreditsNothingWhenAlreadyFull(): void {
		// Tagessoll bereits voll gearbeitet -> Krank-Gutschrift 0, keine Ueberstunden.
		$r = $this->stats([$this->workEntry(525)], [$this->hourlySick(315)]);
		$this->assertSame(0, $r['paidAbsence']);
		$this->assertSame(0, $r['overtime']);
	}
}
