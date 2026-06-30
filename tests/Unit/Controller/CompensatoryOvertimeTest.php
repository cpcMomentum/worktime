<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Controller;

use DateTime;
use OCA\WorkTime\Controller\ReportController;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\PermissionService;
use OCA\WorkTime\Service\ProjectService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use OCA\WorkTime\Service\OvertimePayoutService;
use OCP\IL10N;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;

/**
 * Regression test for #186 / #149: taking a Freizeitausgleich (compensatory) day
 * must REDUCE the overtime balance by one daily target.
 *
 * Asserts the resulting overtime number, not the internal mechanism — the previous
 * "fix" only ever checked where the FZA value landed (Ist vs. Soll), and both
 * placements cancel out to a net-zero overtime change.
 */
class CompensatoryOvertimeTest extends TestCase {

	private function makeController(WorkScheduleService $schedule): ReportController {
		return new ReportController(
			$this->createMock(IRequest::class),
			'tester',
			$this->createMock(TimeEntryService::class),
			$this->createMock(TimeEntryMapper::class),
			$this->createMock(AbsenceMapper::class),
			$this->createMock(AbsenceService::class),
			$this->createMock(EmployeeService::class),
			$this->createMock(HolidayService::class),
			$this->createMock(PermissionService::class),
			$this->createMock(PdfService::class),
			$schedule,
			$this->createMock(YearlyCarryoverService::class),
			$this->createMock(OvertimePayoutService::class),
			$this->createMock(ProjectService::class),
			$this->createMock(IL10N::class),
		);
	}

	/**
	 * @param object[] $entries
	 * @param object[] $absences
	 */
	private function overtimeFor(WorkScheduleService $schedule, array $entries, array $absences): int {
		$controller = $this->makeController($schedule);
		$method = new ReflectionMethod(ReportController::class, 'calculateMonthlyStats');
		$method->setAccessible(true);
		// April 2026 is a fully completed month relative to any later run date,
		// so the proportional ("up to today") logic equals the full month.
		$stats = $method->invoke($controller, $this->employee(), 2026, 4, $entries, $absences, []);
		return $stats['overtimeMinutes'];
	}

	private function schedule(int $targetMinutes, int $dailyMinutes, int $workingDays): WorkScheduleService {
		$schedule = $this->createMock(WorkScheduleService::class);
		$schedule->method('countWorkingDays')->willReturn((float)$workingDays);
		$schedule->method('calculateTargetMinutes')->willReturn($targetMinutes);
		$schedule->method('getDailyMinutesForDate')->willReturn($dailyMinutes);
		return $schedule;
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

	private function timeEntry(int $workMinutes): object {
		return new class($workMinutes) {
			public function __construct(private int $workMinutes) {
			}
			public function getWorkMinutes(): int {
				return $this->workMinutes;
			}
		};
	}

	private function compensatoryDay(string $date): object {
		return new class($date) {
			public function __construct(private string $date) {
			}
			public function isApproved(): bool {
				return true;
			}
			public function getType(): string {
				return Absence::TYPE_COMPENSATORY;
			}
			public function getStartDate(): DateTime {
				return new DateTime($this->date);
			}
			public function getEndDate(): DateTime {
				return new DateTime($this->date);
			}
			public function getScopeValue(): float {
				return 1.0;
			}
		};
	}

	public function testCompensatoryDayReducesOvertimeByOneDailyTarget(): void {
		// 10 working days * 480 min = 4800 target. Employee worked 9 days (4320)
		// and took one compensatory (FZA) day.
		$schedule = $this->schedule(targetMinutes: 4800, dailyMinutes: 480, workingDays: 10);

		$overtime = $this->overtimeFor(
			$schedule,
			[$this->timeEntry(4320)],
			[$this->compensatoryDay('2026-04-15')],
		);

		// The FZA day stays in the target but is NOT credited as worked time,
		// so the balance drops by exactly one daily target: 4320 - 4800 = -480.
		$this->assertSame(-480, $overtime);
	}

	public function testFullWorkWithoutAbsenceIsBalanced(): void {
		// Control case: worked the full target, no absence -> overtime 0.
		$schedule = $this->schedule(targetMinutes: 4800, dailyMinutes: 480, workingDays: 10);

		$overtime = $this->overtimeFor($schedule, [$this->timeEntry(4800)], []);

		$this->assertSame(0, $overtime);
	}
}
