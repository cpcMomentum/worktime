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
 * #626 Notarbeit im genehmigten Urlaub: der volle Urlaubstag schreibt das
 * Tagessoll gut, die Notarbeit-Stunden kommen additiv als Ueberstunden obendrauf.
 * Ist der Freigabe-Schalter an und die Notarbeit noch nicht freigegeben
 * (emergency_approved=0), bleibt sie aus der Ist-Summe, bis der Chef sie freigibt.
 *
 * April 2026 ist zum Laufzeitpunkt ein abgeschlossener Monat (Muster wie
 * CompensatoryOvertimeTest / HourlySickCappingTest).
 */
class EmergencyWorkOvertimeTest extends TestCase {

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

	private function fullVacation(): Absence {
		$absence = new Absence();
		$absence->setStatus(Absence::STATUS_APPROVED);
		$absence->setType(Absence::TYPE_VACATION);
		$absence->setStartDate(new DateTime(self::DAY));
		$absence->setEndDate(new DateTime(self::DAY));
		$absence->setScopeValue(1.0);
		return $absence;
	}

	private function emergencyEntry(int $workMinutes, int $approved): TimeEntry {
		$entry = new TimeEntry();
		$entry->setDate(new DateTime(self::DAY));
		$entry->setWorkMinutes($workMinutes);
		$entry->setIsEmergency(1);
		$entry->setEmergencyApproved($approved);
		return $entry;
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

	public function testApprovedEmergencyAddsOvertimeOnTopOfVacation(): void {
		// Voller Urlaub (525 gutgeschrieben) + 2h freigegebene Notarbeit -> +120 Ueberstunden.
		$r = $this->stats([$this->emergencyEntry(120, 1)], [$this->fullVacation()]);
		$this->assertSame(525, $r['paidAbsence']);
		$this->assertSame(120, $r['overtime']);
	}

	public function testPendingEmergencyIsExcludedUntilApproved(): void {
		// Freigabe-Schalter an, noch nicht freigegeben -> Notarbeit zaehlt nicht,
		// nur der Urlaub deckt das Soll -> Saldo 0.
		$r = $this->stats([$this->emergencyEntry(120, 0)], [$this->fullVacation()]);
		$this->assertSame(525, $r['paidAbsence']);
		$this->assertSame(0, $r['overtime']);
	}

	public function testVacationCreditUnchangedByEmergency(): void {
		// Der Urlaubstag bleibt in beiden Faellen voll gutgeschrieben (nicht gekuerzt).
		$approved = $this->stats([$this->emergencyEntry(120, 1)], [$this->fullVacation()]);
		$pending = $this->stats([$this->emergencyEntry(120, 0)], [$this->fullVacation()]);
		$this->assertSame(525, $approved['paidAbsence']);
		$this->assertSame(525, $pending['paidAbsence']);
	}

	/**
	 * Der Gate greift auch im Range-Pfad (getRangeStats speist Reports/Payout).
	 */
	public function testGateAppliesInRangeStats(): void {
		$service = $this->makeService($this->schedule());
		$start = new DateTime(self::DAY);
		$end = new DateTime(self::DAY);

		$pending = $service->getRangeStats($this->employee(), $start, $end,
			[$this->emergencyEntry(120, 0)], [$this->fullVacation()], []);
		$approved = $service->getRangeStats($this->employee(), $start, $end,
			[$this->emergencyEntry(120, 1)], [$this->fullVacation()], []);

		// Pending: nur Urlaub deckt Soll -> 0; freigegeben: +120 obendrauf.
		$this->assertSame(0, $pending['overtimeMinutes']);
		$this->assertSame(120, $approved['overtimeMinutes']);
	}
}
