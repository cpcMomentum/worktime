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
 * Regression test for #251.5: the running ("current") day must not produce a
 * spurious morning deficit. The proportional Soll only counts today once there
 * is activity (a time entry today or an approved absence covering today).
 *
 * Asserts the resulting overtimeMinutes, not the internal mechanism.
 *
 * The mocked schedule treats every calendar day as a working day worth 480 min,
 * so the expected numbers are simple day counts and fully deterministic
 * regardless of when the test runs ("today" is pinned via the subclass).
 */
class ProportionalOvertimeTodayTest extends TestCase {

	private const DAILY = 480;

	private function makeController(WorkScheduleService $schedule, string $today): ReportController {
		$controller = new class(
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
		) extends ReportController {
			public string $pinnedToday = '';
			protected function currentDate(): DateTime {
				return new DateTime($this->pinnedToday);
			}
		};
		$controller->pinnedToday = $today;
		return $controller;
	}

	/**
	 * @param object[] $entries
	 * @param object[] $absences
	 */
	private function overtimeFor(string $today, array $entries, array $absences): int {
		$controller = $this->makeController($this->schedule(), $today);
		$method = new ReflectionMethod(ReportController::class, 'calculateMonthlyStats');
		$method->setAccessible(true);
		// June 2026 is the "current" month relative to the pinned today.
		$stats = $method->invoke($controller, $this->employee(), 2026, 6, $entries, $absences, []);
		return $stats['overtimeMinutes'];
	}

	private function schedule(): WorkScheduleService {
		$schedule = $this->createMock(WorkScheduleService::class);
		$schedule->method('calculateTargetMinutes')->willReturnCallback(
			function (int $employeeId, DateTime $start, DateTime $end, array $holidays): int {
				if ($end < $start) {
					return 0;
				}
				return self::DAILY * ((int)$start->diff($end)->days + 1);
			}
		);
		$schedule->method('countWorkingDays')->willReturnCallback(
			function (int $employeeId, DateTime $start, DateTime $end, array $holidays): float {
				if ($end < $start) {
					return 0.0;
				}
				return (float)((int)$start->diff($end)->days + 1);
			}
		);
		$schedule->method('getDailyMinutesForDate')->willReturn(self::DAILY);
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

	private function timeEntry(int $workMinutes, string $date): object {
		return new class($workMinutes, $date) {
			public function __construct(private int $workMinutes, private string $date) {
			}
			public function getWorkMinutes(): int {
				return $this->workMinutes;
			}
			public function getDate(): DateTime {
				return new DateTime($this->date);
			}
		};
	}

	private function absence(string $type, string $date): object {
		return new class($type, $date) {
			public function __construct(private string $type, private string $date) {
			}
			public function isApproved(): bool {
				return true;
			}
			public function getType(): string {
				return $this->type;
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

	/**
	 * #251.5 core: mid-month morning, prior days fully worked, nothing logged today
	 * and no absence today -> today is excluded, balance is exactly 0 (no morning minus).
	 */
	public function testMorningOnWorkingDayWithoutEntryHasNoDeficit(): void {
		// Worked Jun 1..14 (14 * 480 = 6720); today is Jun 15, not yet logged.
		$overtime = $this->overtimeFor(
			'2026-06-15',
			[$this->timeEntry(6720, '2026-06-10')],
			[],
		);
		$this->assertSame(0, $overtime);
	}

	/**
	 * #251.5 core: on the 1st of the month with nothing logged, the balance is 0
	 * (excluding today drops the range below the month start -> proportional Soll 0).
	 */
	public function testFirstOfMonthWithoutEntryIsZero(): void {
		$overtime = $this->overtimeFor('2026-06-01', [], []);
		$this->assertSame(0, $overtime);
	}

	/**
	 * Guard: once a time entry exists today, today's target counts again. Prior days
	 * 6720 + 240 logged today = 6960 actual vs. 15 * 480 = 7200 -> -240.
	 */
	public function testEntryTodayCountsTowardSoll(): void {
		$overtime = $this->overtimeFor(
			'2026-06-15',
			[$this->timeEntry(6720, '2026-06-10'), $this->timeEntry(240, '2026-06-15')],
			[],
		);
		$this->assertSame(-240, $overtime);
	}

	/**
	 * Guard: a compensatory (FZA) day today counts today in (absence covers today)
	 * and consumes one daily target -> 6720 worked, 7200 target -> -480.
	 */
	public function testCompensatoryTodayReducesOvertime(): void {
		$overtime = $this->overtimeFor(
			'2026-06-15',
			[$this->timeEntry(6720, '2026-06-10')],
			[$this->absence(Absence::TYPE_COMPENSATORY, '2026-06-15')],
		);
		$this->assertSame(-480, $overtime);
	}

	/**
	 * Guard: a paid vacation day today counts today in and is credited to the Ist,
	 * so it nets out -> 6720 worked + 480 credited = 7200 vs 7200 target -> 0.
	 */
	public function testVacationTodayNetsOut(): void {
		$overtime = $this->overtimeFor(
			'2026-06-15',
			[$this->timeEntry(6720, '2026-06-10')],
			[$this->absence(Absence::TYPE_VACATION, '2026-06-15')],
		);
		$this->assertSame(0, $overtime);
	}
}
