<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\HolidayMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\ForbiddenException;
use OCA\WorkTime\Service\ProjectService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\ValidationException;
use OCA\WorkTime\Service\WorkScheduleService;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Covers the closed-month locking paths of AbsenceService::delete() (#148/#296).
 *
 * The locking logic itself lives in TimeEntryService; AbsenceService delegates
 * to it. These tests therefore use a REAL TimeEntryService (driven by a mocked
 * TimeEntryMapper) so the lock behaviour is exercised end-to-end, while focusing
 * on the absence-specific branching — in particular the STATUS_APPROVED bypass
 * for sick/child_sick absences in a closed month.
 */
class AbsenceServiceTest extends TestCase {

    private AbsenceService $service;
    private AbsenceMapper $absenceMapper;
    private EmployeeMapper $employeeMapper;
    private HolidayMapper $holidayMapper;
    private TimeEntryMapper $timeEntryMapper;
    private AuditLogService $auditLogService;
    private NotificationService $notificationService;
    private WorkScheduleService $workScheduleService;
    private LoggerInterface $logger;
    private IL10N $l;

    protected function setUp(): void {
        $this->absenceMapper = $this->createMock(AbsenceMapper::class);
        $this->employeeMapper = $this->createMock(EmployeeMapper::class);
        $this->holidayMapper = $this->createMock(HolidayMapper::class);
        $this->timeEntryMapper = $this->createMock(TimeEntryMapper::class);
        $this->auditLogService = $this->createMock(AuditLogService::class);
        $this->notificationService = $this->createMock(NotificationService::class);
        $this->workScheduleService = $this->createMock(WorkScheduleService::class);
        $this->logger = $this->createMock(LoggerInterface::class);
        $this->l = $this->createMock(IL10N::class);
        $this->l->method('t')->willReturnCallback(
            fn(string $text, array $parameters = []): string => $parameters === [] ? $text : vsprintf($text, $parameters)
        );

        // Real TimeEntryService so the lock helpers (lockedMonthsInRange,
        // requireReasonForLockedMonths, auditReason, reopenMonth) run for real.
        $settingsMapper = $this->createMock(CompanySettingMapper::class);
        $projectService = $this->createMock(ProjectService::class);
        $projectService->method('isProjectAllowedForEmployee')->willReturn(true);
        $timeEntryService = new TimeEntryService(
            $this->timeEntryMapper,
            $settingsMapper,
            $this->employeeMapper,
            $this->absenceMapper,
            $this->auditLogService,
            $this->notificationService,
            $projectService,
            $this->logger,
            $this->l
        );

        $this->service = new AbsenceService(
            $this->absenceMapper,
            $this->employeeMapper,
            $this->holidayMapper,
            $timeEntryService,
            $this->auditLogService,
            $this->notificationService,
            $this->workScheduleService,
            $this->logger,
            $this->l
        );
    }

    private function makeAbsence(string $type, string $status, DateTime $start, DateTime $end): Absence {
        $absence = new Absence();
        $absence->setId(99);
        $absence->setEmployeeId(1);
        $absence->setType($type);
        $absence->setStatus($status);
        $absence->setStartDate($start);
        $absence->setEndDate($end);
        return $absence;
    }

    private function pastYearDate(string $monthDay): DateTime {
        $pastYear = (int)(new DateTime())->format('Y') - 1;
        return new DateTime("$pastYear-$monthDay");
    }

    private function currentMonthDate(string $day): DateTime {
        $now = new DateTime();
        return new DateTime($now->format('Y-m') . "-$day");
    }

    public function testDeleteBlocksEmployeeInLockedMonth(): void {
        // A pending vacation in a past (locked) year must not be deletable by an
        // employee (no HR override, no reason).
        $absence = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_PENDING,
            $this->pastYearDate('06-10'),
            $this->pastYearDate('06-12')
        );
        $this->absenceMapper->method('find')->willReturn($absence);
        $this->absenceMapper->expects($this->never())->method('delete');

        $this->expectException(ValidationException::class);
        $this->service->delete(99, 'user1', null, false);
    }

    public function testDeleteRequiresReasonForHrInLockedMonth(): void {
        // HR override but no reason → still blocked.
        $absence = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_PENDING,
            $this->pastYearDate('06-10'),
            $this->pastYearDate('06-12')
        );
        $this->absenceMapper->method('find')->willReturn($absence);
        $this->absenceMapper->expects($this->never())->method('delete');

        $this->expectException(ValidationException::class);
        $this->service->delete(99, 'admin', null, true);
    }

    public function testDeleteApprovedVacationStillBlockedInOpenMonth(): void {
        // An APPROVED vacation in the current (not fully approved → open) month
        // must stay undeletable even for HR with a reason — the override only
        // bypasses the approved-block for CLOSED months. HR should cancel instead.
        $absence = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_APPROVED,
            $this->currentMonthDate('10'),
            $this->currentMonthDate('12')
        );
        $this->absenceMapper->method('find')->willReturn($absence);
        // Month is NOT fully approved → not locked.
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 1, 'submitted' => 0, 'approved' => 1, 'rejected' => 0]);
        $this->absenceMapper->expects($this->never())->method('delete');

        $this->expectException(ForbiddenException::class);
        $this->service->delete(99, 'admin', 'genug lange Begründung', true);
    }

    public function testDeleteApprovedSickAllowedInOpenMonth(): void {
        // Absence-specific bypass: APPROVED sick leave is informational and may be
        // deleted even though it is approved — the sick/child_sick exclusion lets
        // it through in an open month for everyone.
        $absence = $this->makeAbsence(
            Absence::TYPE_SICK,
            Absence::STATUS_APPROVED,
            $this->currentMonthDate('10'),
            $this->currentMonthDate('11')
        );
        $this->absenceMapper->method('find')->willReturn($absence);
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 1, 'submitted' => 0, 'approved' => 1, 'rejected' => 0]);
        $this->absenceMapper->expects($this->once())->method('delete')->with($absence);

        $this->service->delete(99, 'user1', null, false);
    }

    public function testDeleteApprovedChildSickAllowedInOpenMonth(): void {
        // Same bypass for child-sick leave.
        $absence = $this->makeAbsence(
            Absence::TYPE_CHILD_SICK,
            Absence::STATUS_APPROVED,
            $this->currentMonthDate('10'),
            $this->currentMonthDate('10')
        );
        $this->absenceMapper->method('find')->willReturn($absence);
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 1, 'submitted' => 0, 'approved' => 1, 'rejected' => 0]);
        $this->absenceMapper->expects($this->once())->method('delete')->with($absence);

        $this->service->delete(99, 'user1', null, false);
    }

    public function testDeleteHrCorrectionInClosedMonthDeletesAndRecordsReason(): void {
        // HR deletes an approved vacation in a past (locked) year WITH a valid
        // reason: the override bypasses the approved-block, the deletion goes
        // through, the reason lands in the audit log and the month is reopened.
        $absence = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_APPROVED,
            $this->pastYearDate('06-10'),
            $this->pastYearDate('06-12')
        );
        $this->absenceMapper->method('find')->willReturn($absence);
        $this->absenceMapper->expects($this->once())->method('delete')->with($absence);

        // The locked month holds one approved time entry, so reopening it has a
        // real effect (approved → draft) and triggers the reopen notification.
        $approvedEntry = new TimeEntry();
        $approvedEntry->setId(7);
        $approvedEntry->setEmployeeId(1);
        $approvedEntry->setDate($this->pastYearDate('06-11'));
        $approvedEntry->setStatus(TimeEntry::STATUS_APPROVED);
        $this->timeEntryMapper->method('findByEmployeeAndMonth')->willReturn([$approvedEntry]);
        $this->timeEntryMapper->expects($this->once())->method('update');

        // Reason must be written to the audit log.
        $this->auditLogService->expects($this->once())
            ->method('logDelete')
            ->with(
                'admin',
                'absence',
                99,
                $this->callback(fn(array $values): bool =>
                    isset($values['reason']) && $values['reason'] === 'Korrektur nach Rückfrage'
                )
            );

        // Past June is a single locked month → exactly one reopen notification.
        $this->notificationService->expects($this->once())
            ->method('notifyTimeEntriesReopened');

        $this->service->delete(99, 'admin', 'Korrektur nach Rückfrage', true);
    }

    /**
     * Regression (#approve-without-profile): an HR/Admin approver that has no own
     * employee profile (approverEmployeeId === null) must still be able to approve.
     * The absence becomes APPROVED with approvedBy left null — no exception, no
     * "Approver not found" abort.
     */
    public function testApproveSucceedsWithoutApproverEmployeeProfile(): void {
        $pending = $this->makeAbsence(Absence::TYPE_VACATION, Absence::STATUS_PENDING, new DateTime('2026-07-13'), new DateTime('2026-07-13'));
        $this->absenceMapper->method('find')->with(99)->willReturn($pending);
        $this->absenceMapper->method('update')->willReturnArgument(0);

        $result = $this->service->approve(99, null, 'admin');

        $this->assertSame(Absence::STATUS_APPROVED, $result->getStatus());
        $this->assertNull($result->getApprovedBy());
        $this->assertNotNull($result->getApprovedAt());
    }

    // ---------------------------------------------------------------------
    // #360: Überlappungs-Schutz Abwesenheit ↔ Zeiteinträge
    // ---------------------------------------------------------------------

    /**
     * #360: a FULL-day absence over days that already contain time entries is a
     * logical contradiction (work + take the whole day off) and must be hard-
     * blocked — the absence is never inserted.
     */
    public function testFullDayAbsenceBlockedWhenTimeEntriesExist(): void {
        $this->absenceMapper->method('findOverlapping')->willReturn([]);

        $entry = new TimeEntry();
        $entry->setId(5);
        $entry->setEmployeeId(1);
        $entry->setDate($this->currentMonthDate('11'));
        $entry->setStatus(TimeEntry::STATUS_DRAFT);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([$entry]);

        $this->absenceMapper->expects($this->never())->method('insert');

        $this->expectException(ValidationException::class);
        $this->service->create(
            1,
            Absence::TYPE_COMPENSATORY,
            $this->currentMonthDate('10')->format('Y-m-d'),
            $this->currentMonthDate('12')->format('Y-m-d'),
            null,
            'BY',
            'user1',
            1.0
        );
    }

    /**
     * #360: a HALF-day absence may coexist with time entries (the overtime
     * calculation handles the reduced target). It must NOT be blocked — the
     * absence is inserted normally.
     */
    public function testHalfDayAbsenceAllowedDespiteTimeEntries(): void {
        $this->absenceMapper->method('findOverlapping')->willReturn([]);

        $entry = new TimeEntry();
        $entry->setId(5);
        $entry->setEmployeeId(1);
        $entry->setDate($this->currentMonthDate('11'));
        $entry->setStatus(TimeEntry::STATUS_DRAFT);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([$entry]);

        // Current month is open (a draft entry) → not locked.
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 1, 'submitted' => 0, 'approved' => 0, 'rejected' => 0]);
        // Schedule-aware working-day count for setDays().
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturn(1.0);
        $this->absenceMapper->method('insert')->willReturnArgument(0);

        $this->absenceMapper->expects($this->once())->method('insert');

        $result = $this->service->create(
            1,
            Absence::TYPE_COMPENSATORY,
            $this->currentMonthDate('11')->format('Y-m-d'),
            $this->currentMonthDate('11')->format('Y-m-d'),
            null,
            'BY',
            'user1',
            0.5
        );

        $this->assertSame(Absence::STATUS_PENDING, $result->getStatus());
    }

    // ---------------------------------------------------------------------
    // #345: Status-Kalender — Sichtbarkeit offener Anträge (Datenschutz)
    // ---------------------------------------------------------------------

    private function ovEmployee(int $id, ?int $supervisorId, string $visibility): \OCA\WorkTime\Db\Employee {
        $e = new \OCA\WorkTime\Db\Employee();
        $e->setId($id);
        $e->setUserId('u' . $id);
        $e->setFirstName('E');
        $e->setLastName((string)$id);
        $e->setSupervisorId($supervisorId);
        $e->setAbsenceVisibility($visibility);
        $e->setAbsenceDetail('hidden');
        $e->setIsActive(true);
        return $e;
    }

    private function ovAbsence(int $employeeId, string $status): Absence {
        $a = new Absence();
        $a->setEmployeeId($employeeId);
        $a->setType('vacation');
        $a->setStatus($status);
        $a->setStartDate(new DateTime('2026-06-10'));
        $a->setEndDate(new DateTime('2026-06-12'));
        return $a;
    }

    /**
     * #345: A supervisor sees their team member's OPEN (pending) requests in the
     * team calendar — needed for capacity planning.
     */
    public function testAbsenceOverviewIncludesPendingForSupervisorTeam(): void {
        $member = $this->ovEmployee(1, 10, 'none'); // team member of supervisor 10
        $this->employeeMapper->method('findAllActive')->willReturn([$member]);
        $this->absenceMapper->method('findByEmployeeAndMonth')->willReturn([
            $this->ovAbsence(1, Absence::STATUS_APPROVED),
            $this->ovAbsence(1, Absence::STATUS_PENDING),
        ]);

        // Viewer is supervisor (employeeId 10); subtree contains member id 1.
        $result = $this->service->getAbsenceOverview(2026, 6, 'sv', false, 10, [1]);

        $this->assertCount(1, $result);
        $statuses = array_column($result[0]['absences'], 'status');
        $this->assertContains(Absence::STATUS_PENDING, $statuses);
        $this->assertContains(Absence::STATUS_APPROVED, $statuses);
    }

    /**
     * #345 (Datenschutz): A normal colleague must NOT see another employee's open
     * requests — only approved absences, via findApprovedByEmployeeAndMonth.
     */
    public function testAbsenceOverviewHidesPendingFromPeers(): void {
        $colleague = $this->ovEmployee(1, 5, 'team');
        $viewer = $this->ovEmployee(2, 5, 'team');
        $this->employeeMapper->method('findAllActive')->willReturn([$colleague]);
        $this->employeeMapper->method('find')->willReturn($viewer);
        $this->absenceMapper->method('findApprovedByEmployeeAndMonth')->willReturn([
            $this->ovAbsence(1, Absence::STATUS_APPROVED),
        ]);

        // Viewer is a normal employee (id 2), not privileged, no subtree.
        $result = $this->service->getAbsenceOverview(2026, 6, 'peer', false, 2, []);

        $this->assertCount(1, $result);
        $statuses = array_column($result[0]['absences'], 'status');
        $this->assertSame([Absence::STATUS_APPROVED], $statuses);
        $this->assertNotContains(Absence::STATUS_PENDING, $statuses);
    }

    // ---------------------------------------------------------------------
    // #439: Jahresübergreifende Abwesenheiten — anteilige Zählung pro Jahr
    // ---------------------------------------------------------------------

    public function testVacationDaysInYearFullyWithinReturnsStoredDays(): void {
        $absence = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_APPROVED,
            new DateTime('2026-06-10'),
            new DateTime('2026-06-12')
        );
        $absence->setDays('3.00');

        // Fully inside the year → returns the stored value, no recomputation.
        $this->assertSame(3.0, $this->service->vacationDaysInYear($absence, 2026, 'BW'));
    }

    public function testVacationDaysInYearNoOverlapReturnsZero(): void {
        $absence = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_APPROVED,
            new DateTime('2025-06-10'),
            new DateTime('2025-06-12')
        );
        $absence->setDays('3.00');

        $this->assertSame(0.0, $this->service->vacationDaysInYear($absence, 2026, 'BW'));
    }

    public function testVacationDaysInYearSpanningCountsOnlyInYearPortion(): void {
        // Christmas → New Year vacation: 3 working days in 2025, 1 in 2026.
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturnCallback(
            static fn(int $empId, DateTime $start, DateTime $end, array $holidays): float
                => $start->format('Y') === '2025' ? 3.0 : 1.0
        );

        $absence = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_APPROVED,
            new DateTime('2025-12-29'),
            new DateTime('2026-01-02')
        );
        // Stored total days (4) must be IGNORED for the spanning case — each year
        // gets only its clipped portion, so no double counting across the two years.
        $absence->setDays('4.00');

        $this->assertSame(3.0, $this->service->vacationDaysInYear($absence, 2025, 'BW'));
        $this->assertSame(1.0, $this->service->vacationDaysInYear($absence, 2026, 'BW'));
    }

    public function testGetVacationStatsDeductsOnlyInYearPortionOfSpanningVacation(): void {
        $employee = new \OCA\WorkTime\Db\Employee();
        $employee->setFederalState('BW');
        $this->employeeMapper->method('find')->with(1)->willReturn($employee);

        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturnCallback(
            static fn(int $empId, DateTime $start, DateTime $end, array $holidays): float
                => $start->format('Y') === '2025' ? 3.0 : 1.0
        );

        $spanning = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_APPROVED,
            new DateTime('2025-12-29'),
            new DateTime('2026-01-02')
        );
        $spanning->setDays('4.00');
        // The year query (overlap) surfaces the spanning absence for 2025.
        $this->absenceMapper->method('findByEmployeeAndYear')->with(1, 2025)->willReturn([$spanning]);

        $stats = $this->service->getVacationStats(1, 2025, 30);

        // Only the 3 in-year days count against 2025, not the full 4.
        $this->assertSame(3.0, $stats['used']);
        $this->assertSame(27.0, $stats['remaining']);
    }

    // ---------------------------------------------------------------------
    // #15: Betriebsferien — zentrale Urlaubsbuchung für alle/ausgewählte MA
    // ---------------------------------------------------------------------

    private function cvEmployee(int $id, string $first, int $vacationDays): \OCA\WorkTime\Db\Employee {
        $e = new \OCA\WorkTime\Db\Employee();
        $e->setId($id);
        $e->setUserId('u' . $id);
        $e->setFirstName($first);
        $e->setLastName('Test');
        $e->setFederalState('BW');
        $e->setVacationDays($vacationDays);
        $e->setIsActive(true);
        return $e;
    }

    public function testCompanyVacationBooksEligibleAndSkipsInsufficient(): void {
        // Emp 1 has 30 vacation days, Emp 2 only 3. The Betriebsferien needs 5.
        $emp1 = $this->cvEmployee(1, 'Anna', 30);
        $emp2 = $this->cvEmployee(2, 'Bea', 3);
        $this->employeeMapper->method('find')->willReturnCallback(
            static fn(int $id) => $id === 1 ? $emp1 : $emp2
        );
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturn(5.0);
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]); // no prior vacation
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]); // no conflicts

        $inserted = [];
        $this->absenceMapper->method('insert')->willReturnCallback(
            static function (Absence $a) use (&$inserted): Absence {
                $a->setId(100 + count($inserted));
                $inserted[] = $a;
                return $a;
            }
        );

        $result = $this->service->createCompanyVacation('2026-08-03', '2026-08-07', [1, 2], 'Betriebsferien', 'admin');

        // Emp 1 booked, Emp 2 skipped (not enough vacation).
        $this->assertCount(1, $result['booked']);
        $this->assertSame(1, $result['booked'][0]['employeeId']);
        $this->assertSame(5.0, $result['booked'][0]['days']);

        $this->assertCount(1, $result['skipped']);
        $this->assertSame(2, $result['skipped'][0]['employeeId']);
        $this->assertSame('insufficient_vacation', $result['skipped'][0]['reason']);

        // Exactly one absence was inserted, marked central + approved vacation.
        $this->assertCount(1, $inserted);
        $this->assertTrue($inserted[0]->isCentral());
        $this->assertSame(Absence::STATUS_APPROVED, $inserted[0]->getStatus());
        $this->assertSame(Absence::TYPE_VACATION, $inserted[0]->getType());
    }

    public function testCompanyVacationSkipsEmployeesWithTimeEntryConflict(): void {
        $emp = $this->cvEmployee(1, 'Anna', 30);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturn(5.0);
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);

        // A time entry exists in the period → full-day absence conflict (#360).
        $entry = new TimeEntry();
        $entry->setEmployeeId(1);
        $entry->setDate(new DateTime('2026-08-04'));
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([$entry]);
        $this->absenceMapper->expects($this->never())->method('insert');

        $result = $this->service->createCompanyVacation('2026-08-03', '2026-08-07', [1], null, 'admin');

        $this->assertCount(0, $result['booked']);
        $this->assertCount(1, $result['skipped']);
        $this->assertSame('time_entry_conflict', $result['skipped'][0]['reason']);
    }

    // ---------------------------------------------------------------------
    // #15 Stufe 2: Überhang-Behandlung (closure / compensatory / negative)
    // ---------------------------------------------------------------------

    /**
     * Weekday-aware working days (Mon-Fri = 1.0), so the day-walk of the
     * split logic sees realistic single-day values.
     */
    private function mockWeekdayWorkingDays(): void {
        $this->workScheduleService->method('countWorkingDays')->willReturnCallback(
            static function (int $empId, DateTime $start, DateTime $end, array $holidays): float {
                $days = 0.0;
                for ($d = clone $start; $d <= $end; $d->modify('+1 day')) {
                    if ((int)$d->format('N') <= 5) {
                        $days += 1.0;
                    }
                }
                return $days;
            }
        );
    }

    /** @return Absence[] collected inserts */
    private function &collectInserts(): array {
        $inserted = [];
        $this->absenceMapper->method('insert')->willReturnCallback(
            static function (Absence $a) use (&$inserted): Absence {
                $a->setId(100 + count($inserted));
                $inserted[] = $a;
                return $a;
            }
        );
        return $inserted;
    }

    public function testCompanyVacationClosureSplitsWhenQuotaExhausted(): void {
        // 3 remaining vacation days, 5 working days needed → 3 Tage Urlaub
        // (Mo-Mi), 2 Tage Betriebsschließung (Do-Fr).
        $emp = $this->cvEmployee(1, 'Anna', 3);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $inserted = &$this->collectInserts();

        $result = $this->service->createCompanyVacation(
            '2026-08-03', '2026-08-07', [1], 'Sommer', 'admin', AbsenceService::OVERAGE_CLOSURE
        );

        $this->assertCount(1, $result['booked']);
        $this->assertSame(3.0, $result['booked'][0]['vacationDays']);
        $this->assertSame(2.0, $result['booked'][0]['overageDays']);
        $this->assertSame(5.0, $result['booked'][0]['days']);
        $this->assertCount(0, $result['skipped']);

        $this->assertCount(2, $inserted);
        $this->assertSame(Absence::TYPE_VACATION, $inserted[0]->getType());
        $this->assertSame('2026-08-03', $inserted[0]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-08-05', $inserted[0]->getEndDate()->format('Y-m-d'));
        $this->assertSame(3.0, (float)$inserted[0]->getDays());

        $this->assertSame(Absence::TYPE_COMPANY_CLOSURE, $inserted[1]->getType());
        $this->assertSame('2026-08-06', $inserted[1]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-08-07', $inserted[1]->getEndDate()->format('Y-m-d'));
        $this->assertSame(2.0, (float)$inserted[1]->getDays());

        // Both entries are approved, central, and tied to the same group.
        foreach ($inserted as $a) {
            $this->assertTrue($a->isCentral());
            $this->assertSame(Absence::STATUS_APPROVED, $a->getStatus());
            $this->assertSame($result['group'], $a->getCentralGroup());
        }
    }

    public function testCompanyVacationClosureBooksSingleVacationEntryWhenQuotaSuffices(): void {
        $emp = $this->cvEmployee(1, 'Anna', 30);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $inserted = &$this->collectInserts();

        $result = $this->service->createCompanyVacation(
            '2026-08-03', '2026-08-07', [1], null, 'admin', AbsenceService::OVERAGE_CLOSURE
        );

        $this->assertCount(1, $inserted);
        $this->assertSame(Absence::TYPE_VACATION, $inserted[0]->getType());
        $this->assertSame(5.0, (float)$inserted[0]->getDays());
        $this->assertSame(5.0, $result['booked'][0]['vacationDays']);
        $this->assertSame(0.0, $result['booked'][0]['overageDays']);
    }

    public function testCompanyVacationClosureBooksWholePeriodAsClosureWhenNoVacationLeft(): void {
        $emp = $this->cvEmployee(1, 'Anna', 0);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $inserted = &$this->collectInserts();

        $result = $this->service->createCompanyVacation(
            '2026-08-03', '2026-08-07', [1], null, 'admin', AbsenceService::OVERAGE_CLOSURE
        );

        $this->assertCount(1, $inserted);
        $this->assertSame(Absence::TYPE_COMPANY_CLOSURE, $inserted[0]->getType());
        $this->assertSame('2026-08-03', $inserted[0]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-08-07', $inserted[0]->getEndDate()->format('Y-m-d'));
        $this->assertSame(0.0, $result['booked'][0]['vacationDays']);
        $this->assertSame(5.0, $result['booked'][0]['overageDays']);
    }

    public function testCompanyVacationCompensatoryUsesCompensatoryTypeForOverage(): void {
        $emp = $this->cvEmployee(1, 'Anna', 3);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $inserted = &$this->collectInserts();

        $this->service->createCompanyVacation(
            '2026-08-03', '2026-08-07', [1], null, 'admin', AbsenceService::OVERAGE_COMPENSATORY
        );

        $this->assertCount(2, $inserted);
        $this->assertSame(Absence::TYPE_VACATION, $inserted[0]->getType());
        $this->assertSame(Absence::TYPE_COMPENSATORY, $inserted[1]->getType());
    }

    public function testCompanyVacationNegativeBooksEverythingAsVacation(): void {
        // Only 3 vacation days left, but OVERAGE_NEGATIVE books all 5 as
        // vacation — the account goes into advance on next year.
        $emp = $this->cvEmployee(1, 'Anna', 3);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $inserted = &$this->collectInserts();

        $result = $this->service->createCompanyVacation(
            '2026-08-03', '2026-08-07', [1], null, 'admin', AbsenceService::OVERAGE_NEGATIVE
        );

        $this->assertCount(1, $inserted);
        $this->assertSame(Absence::TYPE_VACATION, $inserted[0]->getType());
        $this->assertSame(5.0, (float)$inserted[0]->getDays());
        $this->assertCount(0, $result['skipped']);
        $this->assertSame(5.0, $result['booked'][0]['vacationDays']);
    }

    public function testCompanyVacationSplitIsYearAware(): void {
        // 2026-12-28 (Mon) – 2027-01-05 (Tue), 2 vacation days per year.
        // 2026: Mon 28 + Tue 29 vacation, Wed 30 + Thu 31 closure.
        // 2027: fresh quota — Fri 1 + Mon 4 vacation, Tue 5 closure.
        $emp = $this->cvEmployee(1, 'Anna', 2);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $inserted = &$this->collectInserts();

        $result = $this->service->createCompanyVacation(
            '2026-12-28', '2027-01-05', [1], null, 'admin', AbsenceService::OVERAGE_CLOSURE
        );

        $this->assertCount(4, $inserted);

        $this->assertSame(Absence::TYPE_VACATION, $inserted[0]->getType());
        $this->assertSame('2026-12-28', $inserted[0]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-12-29', $inserted[0]->getEndDate()->format('Y-m-d'));

        $this->assertSame(Absence::TYPE_COMPANY_CLOSURE, $inserted[1]->getType());
        $this->assertSame('2026-12-30', $inserted[1]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-12-31', $inserted[1]->getEndDate()->format('Y-m-d'));

        $this->assertSame(Absence::TYPE_VACATION, $inserted[2]->getType());
        $this->assertSame('2027-01-01', $inserted[2]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2027-01-04', $inserted[2]->getEndDate()->format('Y-m-d'));

        $this->assertSame(Absence::TYPE_COMPANY_CLOSURE, $inserted[3]->getType());
        $this->assertSame('2027-01-05', $inserted[3]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2027-01-05', $inserted[3]->getEndDate()->format('Y-m-d'));

        $this->assertSame(4.0, $result['booked'][0]['vacationDays']);
        $this->assertSame(3.0, $result['booked'][0]['overageDays']);
    }

    public function testCompanyVacationRejectsInvalidOverageOption(): void {
        $this->expectException(ValidationException::class);
        $this->service->createCompanyVacation('2026-08-03', '2026-08-07', [1], null, 'admin', 'whatever');
    }

    public function testCreateRejectsCompanyClosureType(): void {
        // Betriebsschließung ist nicht beantragbar — nur der zentrale Weg darf sie setzen.
        $this->absenceMapper->expects($this->never())->method('insert');

        $this->expectException(ValidationException::class);
        $this->service->create(1, Absence::TYPE_COMPANY_CLOSURE, '2026-08-03', '2026-08-07');
    }
}
