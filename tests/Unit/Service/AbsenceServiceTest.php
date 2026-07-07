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
}
