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
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\Holiday;
use OCA\WorkTime\Db\OvertimePayoutMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Db\WorkSchedule;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\OvertimeCalculationService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\UserTimeZone;
use OCA\WorkTime\Service\WorkScheduleService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/** Verbindliche Grundregeln der Soll/Ist-Rechnung; ändert sich eine Regel, wird ihr Beispiel im selben PR angepasst. */
class RechenregelnTest extends TestCase {

    // Juni 2026 hat 22 Arbeitstage Mo bis Fr und ist abgeschlossen, die Rechnung hängt also nicht vom Laufdatum ab.
    private const FULL_TIME_DAY = 480;
    private const FULL_TIME_MONTH = 22 * 480;

    public function testVacationIsCreditedToActualAndLeavesTargetUntouched(): void {
        $r = $this->june(
            self::fullTime(),
            [$this->worked('2026-06-01', 480)],
            [$this->absence(Absence::TYPE_VACATION, '2026-06-08', '2026-06-08')],
        );

        $this->assertSame(self::FULL_TIME_MONTH, $r['soll']);
        $this->assertSame(480 + self::FULL_TIME_DAY, $r['ist']);
    }

    public function testSickLeaveIsCreditedToActualAndLeavesTargetUntouched(): void {
        $r = $this->june(
            self::fullTime(),
            [$this->worked('2026-06-01', 480)],
            [$this->absence(Absence::TYPE_SICK, '2026-06-08', '2026-06-08')],
        );

        $this->assertSame(self::FULL_TIME_MONTH, $r['soll']);
        $this->assertSame(480 + self::FULL_TIME_DAY, $r['ist']);
    }

    public function testUnpaidLeaveReducesTargetAndCreditsNothing(): void {
        $r = $this->june(
            self::fullTime(),
            [$this->worked('2026-06-01', 480)],
            [$this->absence(Absence::TYPE_UNPAID, '2026-06-08', '2026-06-08')],
        );

        $this->assertSame(self::FULL_TIME_MONTH - self::FULL_TIME_DAY, $r['soll']);
        $this->assertSame(480, $r['ist']);
    }

    public function testCompensatoryTimeChangesNeitherTargetNorActual(): void {
        $r = $this->june(
            self::fullTime(),
            [$this->worked('2026-06-01', 480)],
            [$this->absence(Absence::TYPE_COMPENSATORY, '2026-06-08', '2026-06-08')],
        );

        $this->assertSame(self::FULL_TIME_MONTH, $r['soll']);
        $this->assertSame(480, $r['ist']);
    }

    public function testPublicHolidayReducesTargetAndCreditsNothing(): void {
        $r = $this->june(
            self::fullTime(),
            [$this->worked('2026-06-01', 480)],
            [],
            [$this->holiday('2026-06-04')],
        );

        $this->assertSame(self::FULL_TIME_MONTH - self::FULL_TIME_DAY, $r['soll']);
        $this->assertSame(480, $r['ist']);
    }

    // 21 h pro Woche gleichmäßig auf Mo bis Fr: der Kranktag zählt 4:12 h, egal an welchen Tagen gearbeitet wird.
    public function testPartTimeSickDayIsCreditedWithTheProfileDayValue(): void {
        $r = $this->june(
            self::evenWeek('4.20'),
            [$this->worked('2026-06-08', 420), $this->worked('2026-06-09', 420)],
            [$this->absence(Absence::TYPE_SICK, '2026-06-10', '2026-06-12')],
        );

        $this->assertSame(22 * 252, $r['soll']);
        $this->assertSame(420 + 420 + 3 * 252, $r['ist']);
        $this->assertSame(['2026-06-10' => 252, '2026-06-11' => 252, '2026-06-12' => 252], $r['tage']);
    }

    // Die Tagesliste zeigt je Tag, was die Monatssumme gutschreibt: Wochenende und Feiertag bekommen nichts.
    public function testDayCreditsSkipWeekendsAndHolidays(): void {
        $r = $this->june(
            self::fullTime(),
            [],
            [$this->absence(Absence::TYPE_VACATION, '2026-06-03', '2026-06-08')],
            [$this->holiday('2026-06-04')],
        );

        $this->assertSame(['2026-06-03' => 480, '2026-06-05' => 480, '2026-06-08' => 480], $r['tage']);
    }

    public function testHalfDayVacationCreditsHalfTheDayValue(): void {
        $r = $this->june(
            self::fullTime(),
            [$this->worked('2026-06-08', 240)],
            [$this->absence(Absence::TYPE_VACATION, '2026-06-08', '2026-06-08', 0.5)],
        );

        $this->assertSame(['2026-06-08' => 240], $r['tage']);
        $this->assertSame(480, $r['ist']);
    }

    // Stundenweise Krankheit füllt höchstens bis zum Tagessoll auf: 5 h gearbeitet, 4 h krank gemeldet, 3 h Gutschrift.
    public function testHourlySickLeaveIsCappedAtTheRemainingDayTarget(): void {
        $sick = $this->absence(Absence::TYPE_SICK, '2026-06-08', '2026-06-08');
        $sick->setAbsenceMinutes(240);

        $r = $this->june(self::fullTime(), [$this->worked('2026-06-08', 300)], [$sick]);

        $this->assertSame(['2026-06-08' => 180], $r['tage']);
        $this->assertSame(480, $r['ist']);
    }

    public function testUnpaidCompensatoryAndPendingAbsencesHaveNoDayCredit(): void {
        $pending = $this->absence(Absence::TYPE_VACATION, '2026-06-10', '2026-06-10');
        $pending->setStatus(Absence::STATUS_PENDING);

        $r = $this->june(
            self::fullTime(),
            [],
            [
                $this->absence(Absence::TYPE_UNPAID, '2026-06-08', '2026-06-08'),
                $this->absence(Absence::TYPE_COMPENSATORY, '2026-06-09', '2026-06-09'),
                $pending,
            ],
        );

        $this->assertSame([], $r['tage']);
        $this->assertSame(0, $r['ist']);
    }

    // Im laufenden Monat zählt das Ist nur bis heute, also zeigt auch die Tagesliste künftigen Urlaub noch nicht.
    public function testDayCreditsOfTheRunningMonthStopToday(): void {
        $service = $this->service(self::fullTime(), new DateTime('2026-06-10'));

        $stats = $service->getMonthlyStats(
            $this->employee(),
            2026,
            6,
            [],
            [$this->absence(Absence::TYPE_VACATION, '2026-06-09', '2026-06-12')],
            [],
        );

        $this->assertSame(['2026-06-09' => 480, '2026-06-10' => 480], $stats['paidAbsenceByDay']);
        $this->assertSame(960, $stats['paidAbsenceMinutes']);
    }

    /**
     * @param TimeEntry[] $entries
     * @param Absence[] $absences
     * @param Holiday[] $holidays
     * @return array{soll:int, ist:int, tage:array<string,int>}
     */
    private function june(WorkSchedule $schedule, array $entries, array $absences, array $holidays = []): array {
        $service = $this->service($schedule);
        $employee = $this->employee();

        $monthly = $service->getMonthlyStats($employee, 2026, 6, $entries, $absences, $holidays);
        $range = $service->getRangeStats(
            $employee,
            new DateTime('2026-06-01'),
            new DateTime('2026-06-30'),
            $entries,
            $absences,
            $holidays,
        );

        $this->assertSame($monthly['targetMinutes'], $range['adjustedTargetMinutes'], 'Soll: Monat und Zeitraum weichen ab');
        $this->assertSame($monthly['actualMinutes'], $range['actualMinutes'], 'Ist: Monat und Zeitraum weichen ab');
        $this->assertSame(
            $monthly['actualMinutes'] - $monthly['targetMinutes'],
            $monthly['overtimeMinutes'],
            'Saldo ist nicht Ist minus Soll',
        );

        $this->assertSame(
            $monthly['paidAbsenceMinutes'],
            array_sum($monthly['paidAbsenceByDay']),
            'Tageswerte ergeben nicht die Monatssumme der bezahlten Abwesenheiten',
        );
        $this->assertSame($monthly['paidAbsenceByDay'], $range['paidAbsenceByDay'], 'Tageswerte: Monat und Zeitraum weichen ab');

        return [
            'soll' => $monthly['targetMinutes'],
            'ist' => $monthly['actualMinutes'],
            'tage' => $monthly['paidAbsenceByDay'],
        ];
    }

    private static function fullTime(): WorkSchedule {
        return self::evenWeek('8.00');
    }

    private static function evenWeek(string $hoursPerDay): WorkSchedule {
        $s = new WorkSchedule();
        $s->setEmployeeId(1);
        $s->setValidFrom(new DateTime('2020-01-01'));
        foreach (['setMonHours', 'setTueHours', 'setWedHours', 'setThuHours', 'setFriHours'] as $setter) {
            $s->$setter($hoursPerDay);
        }
        $s->setSatHours('0.00');
        $s->setSunHours('0.00');
        return $s;
    }

    private function service(WorkSchedule $schedule, ?DateTime $today = null): OvertimeCalculationService {
        $mapper = $this->createMock(WorkScheduleMapper::class);
        $mapper->method('findForDate')->willReturn($schedule);
        $mapper->method('findByEmployeeAndDateRange')->willReturn([$schedule]);
        $mapper->method('findByEmployeeId')->willReturn([$schedule]);

        $timeZone = $this->createConfiguredMock(UserTimeZone::class, ['getTimeZone' => new \DateTimeZone('Europe/Berlin')]);

        $scheduleService = new WorkScheduleService(
            $mapper,
            $this->createMock(EmployeeMapper::class),
            $this->createMock(TimeEntryMapper::class),
            $this->createMock(CompanySettingsService::class),
            $this->createMock(AuditLogService::class),
            $this->createMock(LoggerInterface::class),
            $this->createMock(IL10N::class),
            $timeZone,
        );

        $deps = [
            $scheduleService,
            $this->createMock(YearlyCarryoverService::class),
            $this->createMock(OvertimePayoutMapper::class),
            $this->createMock(EmployeeService::class),
            $this->createMock(TimeEntryService::class),
            $this->createMock(AbsenceService::class),
            $this->createMock(HolidayService::class),
            $timeZone,
        ];

        if ($today === null) {
            return new OvertimeCalculationService(...$deps);
        }

        return new class($today, ...$deps) extends OvertimeCalculationService {
            public function __construct(private DateTime $pinnedToday, mixed ...$deps) {
                parent::__construct(...$deps);
            }
            protected function currentDate(): DateTime {
                return clone $this->pinnedToday;
            }
        };
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

    private function worked(string $date, int $minutes): TimeEntry {
        $entry = new TimeEntry();
        $entry->setDate(new DateTime($date));
        $entry->setWorkMinutes($minutes);
        return $entry;
    }

    private function absence(string $type, string $from, string $until, float $scope = 1.0): Absence {
        $absence = new Absence();
        $absence->setStatus(Absence::STATUS_APPROVED);
        $absence->setType($type);
        $absence->setStartDate(new DateTime($from));
        $absence->setEndDate(new DateTime($until));
        $absence->setScopeValue($scope);
        return $absence;
    }

    private function holiday(string $date): Holiday {
        $holiday = new Holiday();
        $holiday->setDate(new DateTime($date));
        $holiday->setScopeValue(1.0);
        return $holiday;
    }
}
