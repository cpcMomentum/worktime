<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\BackgroundJob;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\ArchiveService;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCP\IConfig;
use OCP\L10N\IFactory;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;

/**
 * Regression test for #186: the archived monthly PDF uses its own overtime
 * calculation (separate from ReportController), implemented in ArchiveService.
 * A Freizeitausgleich (compensatory) day must REDUCE the overtime balance here
 * too — not net to zero.
 */
class CompensatoryOvertimeArchiveTest extends TestCase {

	private function makeService(WorkScheduleService $schedule): ArchiveService {
		return new ArchiveService(
			$this->createMock(CompanySettingsService::class),
			$this->createMock(EmployeeService::class),
			$this->createMock(TimeEntryService::class),
			$this->createMock(AbsenceService::class),
			$this->createMock(HolidayService::class),
			$schedule,
			$this->createMock(PdfService::class),
			$this->createMock(IFactory::class),
			$this->createMock(IConfig::class),
		);
	}

	/**
	 * @param object[] $entries
	 * @param object[] $absences
	 */
	private function overtimeFor(WorkScheduleService $schedule, array $entries, array $absences): int {
		$service = $this->makeService($schedule);
		$method = new ReflectionMethod(ArchiveService::class, 'calculateMonthlyStats');
		$method->setAccessible(true);
		$stats = $method->invoke($service, $this->employee(), 2026, 4, $entries, $absences, []);
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
		};
	}

	public function testCompensatoryDayReducesArchivedOvertimeByOneDailyTarget(): void {
		$schedule = $this->schedule(targetMinutes: 4800, dailyMinutes: 480, workingDays: 10);

		$overtime = $this->overtimeFor(
			$schedule,
			[$this->timeEntry(4320)],
			[$this->compensatoryDay('2026-04-15')],
		);

		// Worked 4320 against a 4800 target that stays intact for FZA: 4320 - 4800 = -480.
		$this->assertSame(-480, $overtime);
	}
}
