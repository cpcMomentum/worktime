<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\HolidayMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\ForbiddenException;
use OCA\WorkTime\Service\HolidayService;
use OCA\WorkTime\Service\ProjectService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\ValidationException;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\WorkScheduleService;
use OCA\WorkTime\Service\YearlyCarryoverService;
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
    private HolidayService $holidayService;
    private YearlyCarryoverService $carryoverService;
    private CompanySettingsService $companySettingsService;
    /** @var array<int,int> Per-year override for getVacationDaysForYear (#501). */
    private array $scheduleEntitlementByYear = [];
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
        $this->holidayService = $this->createMock(HolidayService::class);
        $this->carryoverService = $this->createMock(YearlyCarryoverService::class);
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

        $this->companySettingsService = $this->createMock(CompanySettingsService::class);

        $this->service = new AbsenceService(
            $this->absenceMapper,
            $this->employeeMapper,
            $this->holidayMapper,
            $timeEntryService,
            $this->auditLogService,
            $this->notificationService,
            $this->workScheduleService,
            $this->holidayService,
            $this->carryoverService,
            $this->companySettingsService,
            $this->logger,
            $this->l
        );

        // #501: remainingVacationDays() now takes the base entitlement from the
        // year's work-schedule profile (getVacationDaysForYear), not the employee
        // cache field. Every existing test was written under the invariant that
        // the two are equal, so mirror the employee's cached vacation_days here.
        // A test that needs a genuine year-over-year divergence fills
        // $scheduleEntitlementByYear[$year] to override a single year.
        $this->scheduleEntitlementByYear = [];
        $this->workScheduleService->method('getVacationDaysForYear')->willReturnCallback(
            fn(int $employeeId, int $year): int => $this->scheduleEntitlementByYear[$year]
                ?? $this->employeeMapper->find($employeeId)->getVacationDays()
        );
    }

    /**
     * An active employee for EmployeeMapper::find(). Needed because the resting
     * guard (#486) reads getIsActive(), and an unconfigured mock would report 0
     * and block every write path.
     */
    private function expectActiveEmployee(int $id = 1): Employee {
        $employee = new Employee();
        $employee->setId($id);
        $employee->setIsActive(true);
        $this->employeeMapper->method('find')->willReturn($employee);

        return $employee;
    }

    private function expectRestingEmployee(int $id = 1): Employee {
        $employee = new Employee();
        $employee->setId($id);
        $employee->setIsActive(false);
        $employee->setLockedReason('Ausgeschieden');
        $this->employeeMapper->method('find')->willReturn($employee);

        return $employee;
    }

    /**
     * Resting employees must not gain new absences (#486).
     */
    public function testCreateBlockedForRestingEmployee(): void {
        $this->expectRestingEmployee();
        $this->absenceMapper->expects($this->never())->method('insert');

        $this->expectException(ForbiddenException::class);
        $this->service->create(1, Absence::TYPE_VACATION, '2020-06-10', '2020-06-12');
    }

    public function testUpdateBlockedForRestingEmployee(): void {
        $this->expectRestingEmployee();
        $absence = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_PENDING,
            new DateTime('2020-06-10'),
            new DateTime('2020-06-12')
        );
        $this->absenceMapper->method('find')->willReturn($absence);
        $this->absenceMapper->expects($this->never())->method('update');

        $this->expectException(ForbiddenException::class);
        $this->service->update(99, Absence::TYPE_VACATION, '2020-06-10', '2020-06-12');
    }

    /**
     * Cancelling stays open on purpose: an already-approved absence must remain
     * settleable after the employee went resting (#486).
     */
    public function testCancelStillAllowedForRestingEmployee(): void {
        $this->expectRestingEmployee();
        $absence = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_APPROVED,
            new DateTime('2020-06-10'),
            new DateTime('2020-06-12')
        );
        $this->absenceMapper->method('find')->willReturn($absence);
        $this->absenceMapper->method('update')->willReturnArgument(0);

        $result = $this->service->cancel(99, 'admin');

        $this->assertSame(Absence::STATUS_CANCELLED, $result->getStatus());
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
        $this->expectActiveEmployee();
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
        $this->expectActiveEmployee();
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
        $this->expectActiveEmployee();
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
        $this->expectActiveEmployee();
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
        $this->expectActiveEmployee();
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
        $this->expectActiveEmployee();
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
        $this->expectActiveEmployee();
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
        $this->expectActiveEmployee();
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
    // #625: stundenweise Krankheit — Gate, serverseitige Deckelung, Koexistenz
    // ---------------------------------------------------------------------

    /** Gemeinsames Setup fuer einen erfolgreichen create-Aufruf am currentMonthDate('11'). */
    private function primeSuccessfulCreate(): void {
        $this->expectActiveEmployee();
        $this->absenceMapper->method('findOverlapping')->willReturn([]);
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 1, 'submitted' => 0, 'approved' => 0, 'rejected' => 0]);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturn(1.0);
        $this->absenceMapper->method('insert')->willReturnArgument(0);
    }

    private function createSick(string $start, string $end, ?int $absenceMinutes): Absence {
        return $this->service->create(
            1, Absence::TYPE_SICK, $start, $end, null, 'BY', 'user1', 1.0, null, false, $absenceMinutes
        );
    }

    public function testHourlySickCappedToDailyTargetWhenEnabled(): void {
        $this->primeSuccessfulCreate();
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->companySettingsService->method('isHourlySickEnabled')->willReturn(true);
        $this->workScheduleService->method('getDailyMinutesForDate')->willReturn(480);

        $day = $this->currentMonthDate('11')->format('Y-m-d');
        // 600 angefragt, Tagessoll 480 -> serverseitig auf 480 gedeckelt.
        $result = $this->createSick($day, $day, 600);

        $this->assertSame(480, $result->getAbsenceMinutes());
        $this->assertSame(Absence::STATUS_APPROVED, $result->getStatus());
    }

    public function testHourlySickCoexistsWithTimeEntry(): void {
        $this->primeSuccessfulCreate();
        $entry = new TimeEntry();
        $entry->setEmployeeId(1);
        $entry->setDate($this->currentMonthDate('11'));
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([$entry]);
        $this->companySettingsService->method('isHourlySickEnabled')->willReturn(true);
        $this->workScheduleService->method('getDailyMinutesForDate')->willReturn(480);

        $day = $this->currentMonthDate('11')->format('Y-m-d');
        // Trotz vorhandenem Zeiteintrag kein Konflikt (Halbtag-analog).
        $result = $this->createSick($day, $day, 300);

        $this->assertSame(300, $result->getAbsenceMinutes());
        // #625 (Review-Fix): persistierte days spiegeln den Krank-Anteil 300/480.
        $this->assertSame('0.625', $result->getDays());
    }

    public function testHourlySickIgnoredWhenFeatureDisabled(): void {
        $this->primeSuccessfulCreate();
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->companySettingsService->method('isHourlySickEnabled')->willReturn(false);

        $day = $this->currentMonthDate('11')->format('Y-m-d');
        // Feature aus -> Feld ignoriert, ganztaegige Krankmeldung wie bisher.
        $result = $this->createSick($day, $day, 300);

        $this->assertNull($result->getAbsenceMinutes());
    }

    public function testHourlySickPreservedOnEditWhenFeatureDisabled(): void {
        // #625 Review: schaltet der Admin das Feature spaeter aus, darf ein blosses
        // Bearbeiten (Feld wird gar nicht mehr gesendet -> absenceMinutes=null) die
        // bestehenden Krank-Minuten nicht still auf Ganztag umwerten.
        $this->expectActiveEmployee();
        $day = $this->currentMonthDate('11');
        $existing = $this->makeAbsence(Absence::TYPE_SICK, Absence::STATUS_APPROVED, $day, $day);
        $existing->setAbsenceMinutes(300);
        $this->absenceMapper->method('find')->willReturn($existing);
        $this->absenceMapper->method('findOverlapping')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 1, 'submitted' => 0, 'approved' => 0, 'rejected' => 0]);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturn(1.0);
        $this->workScheduleService->method('getDailyMinutesForDate')->willReturn(480);
        $this->absenceMapper->method('update')->willReturnArgument(0);
        // Feature aus.
        $this->companySettingsService->method('isHourlySickEnabled')->willReturn(false);

        $iso = $day->format('Y-m-d');
        $result = $this->service->update(
            5, Absence::TYPE_SICK, $iso, $iso, null, 'BY', 'user1', 1.0, null, false, null
        );

        $this->assertSame(300, $result->getAbsenceMinutes());
    }

    public function testHourlySickPreservedOnEditIsCappedToNewDayTarget(): void {
        // Review: preserving the old minutes verbatim (without capping) could push
        // days above 1.0 if the edit moves the absence to a day with a smaller
        // work-schedule target (e.g. a part-time day).
        $this->expectActiveEmployee();
        $day = $this->currentMonthDate('11');
        $existing = $this->makeAbsence(Absence::TYPE_SICK, Absence::STATUS_APPROVED, $day, $day);
        $existing->setAbsenceMinutes(300);
        $this->absenceMapper->method('find')->willReturn($existing);
        $this->absenceMapper->method('findOverlapping')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->timeEntryMapper->method('getMonthlyStatusSummary')
            ->willReturn(['draft' => 1, 'submitted' => 0, 'approved' => 0, 'rejected' => 0]);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturn(1.0);
        // New target day only has 120 minutes scheduled (e.g. part-time).
        $this->workScheduleService->method('getDailyMinutesForDate')->willReturn(120);
        $this->absenceMapper->method('update')->willReturnArgument(0);
        $this->companySettingsService->method('isHourlySickEnabled')->willReturn(false);

        $iso = $day->format('Y-m-d');
        $result = $this->service->update(
            5, Absence::TYPE_SICK, $iso, $iso, null, 'BY', 'user1', 1.0, null, false, null
        );

        $this->assertSame(120, $result->getAbsenceMinutes());
        $this->assertSame('1', $result->getDays());
    }

    public function testHourlySickIgnoredForMultiDayRange(): void {
        $this->primeSuccessfulCreate();
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->companySettingsService->method('isHourlySickEnabled')->willReturn(true);
        $this->workScheduleService->method('getDailyMinutesForDate')->willReturn(480);

        // Mehrtaegig -> absenceMinutes gilt nicht (nur Einzeltag).
        $result = $this->createSick(
            $this->currentMonthDate('10')->format('Y-m-d'),
            $this->currentMonthDate('12')->format('Y-m-d'),
            300
        );

        $this->assertNull($result->getAbsenceMinutes());
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
    // #528: Validierungsmeldungen laufen ueber die Uebersetzung
    // ---------------------------------------------------------------------

    /**
     * Die Kontingentmeldung wurde frueher per sprintf() hartkodiert und erschien
     * dadurch auch bei deutscher Oberflaeche auf Englisch. Der Test prueft das
     * Ergebnis: die Meldung kommt aus dem Uebersetzungskatalog und traegt beide
     * Zahlen. Der IL10N-Mock in setUp() gibt den Quelltext zurueck und fuellt
     * die %s-Platzhalter — kommt der Text nicht durch t(), fehlen die Zahlen.
     */
    public function testQuotaMessageIsTranslatedAndCarriesBothNumbers(): void {
        $employee = new Employee();
        $employee->setId(1);
        $employee->setFederalState('BW');
        $employee->setVacationDays(10);
        $employee->setIsActive(true);
        $this->employeeMapper->method('find')->willReturn($employee);
        $this->carryoverService->method('getVacationCarryoverDays')->willReturn(0.0);
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->absenceMapper->method('findOverlapping')->willReturn([]);
        $this->absenceMapper->method('insert')->willReturnArgument(0);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->timeEntryMapper->method('getMonthlyStatusSummary')->willReturn(
            ['draft' => 0, 'submitted' => 0, 'approved' => 0, 'rejected' => 0]
        );
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturn(12.0);

        try {
            $this->service->create(1, Absence::TYPE_VACATION, '2026-09-01', '2026-09-16', null, 'BW');
            $this->fail('Expected the quota check to reject the request');
        } catch (ValidationException $e) {
            $message = $e->getFieldErrors('vacationQuota')[0];
            $this->assertStringContainsString('Urlaubstage', $message, 'Meldung kommt nicht aus dem Katalog');
            $this->assertStringContainsString('10.0', $message, 'Verfuegbare Tage fehlen');
            $this->assertStringContainsString('12.0', $message, 'Beantragte Tage fehlen');
            $this->assertStringNotContainsString('%s', $message, 'Platzhalter nicht ersetzt');
        }
    }

    /**
     * Gegenprobe fuer die uebrigen umgestellten Meldungen: ueberlappende
     * Abwesenheit meldet sich ebenfalls deutsch.
     */
    public function testOverlapMessageIsTranslated(): void {
        $this->expectActiveEmployee();
        $existing = $this->makeAbsence(
            Absence::TYPE_VACATION,
            Absence::STATUS_APPROVED,
            new DateTime('2026-09-01'),
            new DateTime('2026-09-03')
        );
        $this->absenceMapper->method('findOverlapping')->willReturn([$existing]);

        try {
            $this->service->create(1, Absence::TYPE_VACATION, '2026-09-02', '2026-09-04');
            $this->fail('Expected the overlap check to reject the request');
        } catch (ValidationException $e) {
            $this->assertStringContainsString('Abwesenheit', $e->getFieldErrors('startDate')[0]);
        }
    }

    // ---------------------------------------------------------------------
    // #522: im Eintrittsjahr bereits verbrauchte Urlaubstage
    // ---------------------------------------------------------------------

    /**
     * @param string|null $used DECIMAL(4,1) wie aus der DB, null = nichts hinterlegt
     */
    private function entryYearEmployee(int $vacationDays, ?string $entryDate, ?string $used): Employee {
        $employee = new Employee();
        $employee->setId(1);
        $employee->setFederalState('BW');
        $employee->setVacationDays($vacationDays);
        $employee->setIsActive(true);
        if ($entryDate !== null) {
            $employee->setEntryDate(new DateTime($entryDate));
        }
        $employee->setVacationDaysUsed($used);
        // #522/#590: these cases model a takeover/continuation (leave carried over,
        // days already used elsewhere) -> full entitlement minus used, as before.
        // A genuine new hire (Teilurlaub) is covered separately below.
        $employee->setVacationTransferred(true);

        $this->employeeMapper->method('find')->willReturn($employee);
        $this->carryoverService->method('getVacationCarryoverDays')->willReturn(0.0);

        return $employee;
    }

    public function testEntryYearQuotaIsReducedByAlreadyUsedDays(): void {
        $this->entryYearEmployee(30, '2026-08-01', '12.5');

        $this->assertSame(17.5, $this->service->effectiveVacationDays(1, 2026));
    }

    /**
     * Halbe Tage muessen exakt durchschlagen — sowohl der bereits verbrauchte
     * Wert als auch der Vorjahresuebertrag (#525) werden ohne Rundung verrechnet.
     */
    public function testEntryYearDeductionKeepsHalfDaysExact(): void {
        $this->entryYearEmployee(30, '2026-08-01', '0.5');

        $this->assertSame(29.5, $this->service->effectiveVacationDays(1, 2026));
    }

    /**
     * Der Wert gehoert ausschliesslich ins Eintrittsjahr. Ab dem Folgejahr gilt
     * wieder der volle Jahresanspruch — sonst haette der Mitarbeiter dauerhaft
     * zu wenig Urlaub, ohne dass es jemandem auffaellt.
     */
    public function testYearAfterEntryGetsFullEntitlement(): void {
        $this->entryYearEmployee(30, '2026-08-01', '12.5');

        $this->assertSame(30.0, $this->service->effectiveVacationDays(1, 2027));
    }

    public function testYearBeforeEntryIsUnaffected(): void {
        $this->entryYearEmployee(30, '2026-08-01', '12.5');

        $this->assertSame(30.0, $this->service->effectiveVacationDays(1, 2025));
    }

    public function testWithoutEntryDateNothingIsDeducted(): void {
        $this->entryYearEmployee(30, null, '12.5');

        $this->assertSame(30.0, $this->service->effectiveVacationDays(1, 2026));
    }

    public function testBestandsdatenOhneWertRechnenWieBisher(): void {
        $this->entryYearEmployee(30, '2026-08-01', null);

        $this->assertSame(30.0, $this->service->effectiveVacationDays(1, 2026));
    }

    /**
     * Uebertrag und Verbrauch greifen gemeinsam: Anspruch + exaktem Uebertrag
     * minus exaktem Verbrauch.
     */
    public function testCarryoverAndEntryYearDeductionCombine(): void {
        $employee = new Employee();
        $employee->setId(1);
        $employee->setFederalState('BW');
        $employee->setVacationDays(30);
        $employee->setIsActive(true);
        $employee->setEntryDate(new DateTime('2026-08-01'));
        $employee->setVacationDaysUsed('12.5');
        $employee->setVacationTransferred(true);
        $this->employeeMapper->method('find')->willReturn($employee);
        $this->carryoverService->method('getVacationCarryoverDays')->willReturn(5.0);

        $this->assertSame(22.5, $this->service->effectiveVacationDays(1, 2026));
    }

    /**
     * #525: ein Uebertrag von 12,5 schlaegt exakt mit 12,5 aufs Guthaben durch,
     * nicht mit 13. Kein Eintrittsjahr, keine Verrechnung — nur Anspruch plus
     * exaktem Uebertrag.
     */
    public function testEffectiveVacationDaysCountsHalfDayCarryoverExactly(): void {
        $employee = new Employee();
        $employee->setId(1);
        $employee->setFederalState('BW');
        $employee->setVacationDays(30);
        $employee->setIsActive(true);
        $employee->setEntryDate(new DateTime('2020-01-01'));
        $employee->setVacationTransferred(true);
        $this->employeeMapper->method('find')->willReturn($employee);
        $this->carryoverService->method('getVacationCarryoverDays')->willReturn(12.5);

        $this->assertSame(42.5, $this->service->effectiveVacationDays(1, 2026));
    }

    // ---------------------------------------------------------------------
    // #590: echter Neuzugang im Eintrittsjahr -> Teilurlaub (kein Übernahme)
    // ---------------------------------------------------------------------

    private function newHireEmployee(?string $used): Employee {
        $employee = new Employee();
        $employee->setId(1);
        $employee->setFederalState('BW');
        $employee->setVacationDays(30);
        $employee->setIsActive(true);
        $employee->setEntryDate(new DateTime('2026-08-01'));
        $employee->setVacationDaysUsed($used);
        $employee->setVacationTransferred(false); // genuine new hire
        $this->employeeMapper->method('find')->willReturn($employee);
        $this->carryoverService->method('getVacationCarryoverDays')->willReturn(0.0);
        // Teilurlaub Aug-Dez ~ 13 (5/12 * 30)
        $this->workScheduleService->method('getVacationDaysForEntryYear')->willReturn(13);
        return $employee;
    }

    /** S1: Berufseinsteiger, nichts anderswo -> Teilurlaub 13, nicht 30. */
    public function testNewHireGetsProratedEntitlement(): void {
        $this->newHireEmployee(null);

        $this->assertSame(13.0, $this->service->effectiveVacationDays(1, 2026));
    }

    /** S3: anderswo bereits voller Jahresurlaub gewährt -> § 6 -> 0. */
    public function testNewHireWithFullPriorGrantGetsZero(): void {
        $this->newHireEmployee('30');

        $this->assertSame(0.0, $this->service->effectiveVacationDays(1, 2026));
    }

    /** § 6-Deckel: min(Teilurlaub, voll − anderswo). 30 − 20 = 10 < 13 -> 10. */
    public function testNewHireIsCappedByRemainingAnnualEntitlement(): void {
        $this->newHireEmployee('20');

        $this->assertSame(10.0, $this->service->effectiveVacationDays(1, 2026));
    }

    /** 0-Boden: anderswo mehr als der volle Anspruch -> nie negativ. */
    public function testNewHireNeverGoesNegative(): void {
        $this->newHireEmployee('35');

        $this->assertSame(0.0, $this->service->effectiveVacationDays(1, 2026));
    }

    /** Folgejahr: kein Eintrittsjahr mehr -> voller Anspruch, unabhängig vom Kennzeichen. */
    public function testNewHireGetsFullEntitlementInFollowingYear(): void {
        $this->newHireEmployee(null);

        $this->assertSame(30.0, $this->service->effectiveVacationDays(1, 2027));
    }

    /**
     * Der eigentliche Zweck: die Kontingentpruefung beim Beantragen muss den
     * Abzug kennen, nicht nur die Anzeige. 20 beantragte Tage passen in 30, aber
     * nicht mehr in die verbleibenden 17,5.
     */
    public function testRequestingMoreThanTheReducedQuotaIsRejected(): void {
        $this->entryYearEmployee(30, '2026-08-01', '12.5');

        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->absenceMapper->method('findOverlapping')->willReturn([]);
        // Bewusst gestubbt, obwohl hier nichts eingefuegt werden darf: faellt der
        // Abzug weg, soll der Test an fail() scheitern und nicht an einem
        // TypeError aus dem ungestubbten Mapper.
        $this->absenceMapper->method('insert')->willReturnArgument(0);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->timeEntryMapper->method('getMonthlyStatusSummary')->willReturn(
            ['draft' => 0, 'submitted' => 0, 'approved' => 0, 'rejected' => 0]
        );
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturn(20.0);

        try {
            $this->service->create(1, Absence::TYPE_VACATION, '2026-09-01', '2026-09-28', null, 'BW');
            $this->fail('Expected the quota check to reject the request');
        } catch (ValidationException $e) {
            // Auf das Quota-Feld festnageln: der Test soll nicht versehentlich
            // von einer anderen Validierung gruen gehalten werden.
            $this->assertTrue($e->hasError('vacationQuota'), 'Expected a vacationQuota error, got: ' . json_encode($e->getErrors()));
            $this->assertStringContainsString('17.5', $e->getFieldErrors('vacationQuota')[0]);
        }
    }

    /**
     * Gegenprobe: dieselbe Buchung passt, wenn nichts verbraucht ist.
     */
    public function testRequestingWithinTheFullQuotaIsAccepted(): void {
        $this->entryYearEmployee(30, '2026-08-01', null);

        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->absenceMapper->method('findOverlapping')->willReturn([]);
        $this->absenceMapper->method('insert')->willReturnArgument(0);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->timeEntryMapper->method('getMonthlyStatusSummary')->willReturn(
            ['draft' => 0, 'submitted' => 0, 'approved' => 0, 'rejected' => 0]
        );
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->workScheduleService->method('countWorkingDays')->willReturn(20.0);

        $absence = $this->service->create(1, Absence::TYPE_VACATION, '2026-09-01', '2026-09-28', null, 'BW');

        $this->assertSame(Absence::TYPE_VACATION, $absence->getType());
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
        $this->mockWeekdayWorkingDays();
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
        $this->mockWeekdayWorkingDays();
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

    // ---------------------------------------------------------------------
    // #454: Überlappung mit bestehenden persönlichen Abwesenheiten
    // ---------------------------------------------------------------------

    /** A stored, approved absence covering [$start, $end] for findOverlapping stubs. */
    private function cvExistingAbsence(string $start, string $end): Absence {
        $a = new Absence();
        $a->setEmployeeId(1);
        $a->setType(Absence::TYPE_VACATION);
        $a->setStartDate(new DateTime($start));
        $a->setEndDate(new DateTime($end));
        $a->setStatus(Absence::STATUS_APPROVED);
        return $a;
    }

    public function testCompanyVacationSkipsDaysCoveredByExistingAbsence(): void {
        // Mon–Fri Betriebsferien, but the employee already has own vacation
        // Wed–Thu. Only Mon, Tue and Fri get booked; the central entry must not
        // span the already-absent days (would double-count).
        $emp = $this->cvEmployee(1, 'Anna', 30);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->absenceMapper->method('findOverlapping')->willReturn([
            $this->cvExistingAbsence('2026-08-05', '2026-08-06'),
        ]);
        $inserted = &$this->collectInserts();

        $result = $this->service->createCompanyVacation('2026-08-03', '2026-08-07', [1], null, 'admin');

        $this->assertCount(1, $result['booked']);
        $this->assertSame(3.0, $result['booked'][0]['days']);
        $this->assertSame(3.0, $result['booked'][0]['vacationDays']);
        $this->assertSame(2.0, $result['booked'][0]['skippedDays']);
        $this->assertCount(0, $result['skipped']);

        // Two entries: Mon–Tue and Fri; nothing touching Wed/Thu.
        $this->assertCount(2, $inserted);
        $this->assertSame('2026-08-03', $inserted[0]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-08-04', $inserted[0]->getEndDate()->format('Y-m-d'));
        $this->assertSame(2.0, (float)$inserted[0]->getDays());
        $this->assertSame('2026-08-07', $inserted[1]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-08-07', $inserted[1]->getEndDate()->format('Y-m-d'));
        $this->assertSame(1.0, (float)$inserted[1]->getDays());
    }

    public function testCompanyVacationSkipsEmployeeFullyCoveredByExistingAbsence(): void {
        // The whole Betriebsferien range is already the employee's own absence.
        $emp = $this->cvEmployee(1, 'Anna', 30);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->absenceMapper->method('findOverlapping')->willReturn([
            $this->cvExistingAbsence('2026-08-03', '2026-08-07'),
        ]);
        $this->absenceMapper->expects($this->never())->method('insert');

        $result = $this->service->createCompanyVacation('2026-08-03', '2026-08-07', [1], null, 'admin');

        $this->assertCount(0, $result['booked']);
        $this->assertCount(1, $result['skipped']);
        $this->assertSame('absence_conflict', $result['skipped'][0]['reason']);
    }

    public function testCompanyVacationDoesNotSkipDaysCoveredByRejectedAbsence(): void {
        // A rejected request is not an actual absence — the employee worked
        // those days, so the central booking must still cover the full period.
        $emp = $this->cvEmployee(1, 'Anna', 30);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $rejected = $this->cvExistingAbsence('2026-08-05', '2026-08-06');
        $rejected->setStatus(Absence::STATUS_REJECTED);
        $this->absenceMapper->method('findOverlapping')->willReturn([$rejected]);
        $inserted = &$this->collectInserts();

        $result = $this->service->createCompanyVacation('2026-08-03', '2026-08-07', [1], null, 'admin');

        $this->assertCount(1, $result['booked']);
        $this->assertSame(5.0, $result['booked'][0]['days']);
        $this->assertSame(0.0, $result['booked'][0]['skippedDays']);
        $this->assertCount(1, $inserted);
        $this->assertSame('2026-08-03', $inserted[0]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-08-07', $inserted[0]->getEndDate()->format('Y-m-d'));
    }

    public function testCompanyVacationClosureDoesNotSpanExistingAbsence(): void {
        // 3 vacation days left, own absence on Wed. Bookable: Mon, Tue, Thu, Fri.
        // Mon/Tue/Thu = vacation (quota), Fri = closure. The Wed block forces a
        // segment boundary so no entry spans it.
        $emp = $this->cvEmployee(1, 'Anna', 3);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->holidayMapper->method('findHolidaysInRange')->willReturn([]);
        $this->mockWeekdayWorkingDays();
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->absenceMapper->method('findOverlapping')->willReturn([
            $this->cvExistingAbsence('2026-08-05', '2026-08-05'),
        ]);
        $inserted = &$this->collectInserts();

        $result = $this->service->createCompanyVacation(
            '2026-08-03', '2026-08-07', [1], null, 'admin', AbsenceService::OVERAGE_CLOSURE
        );

        $this->assertSame(3.0, $result['booked'][0]['vacationDays']);
        $this->assertSame(1.0, $result['booked'][0]['overageDays']);
        $this->assertSame(1.0, $result['booked'][0]['skippedDays']);

        // Mon–Tue vacation, Thu vacation, Fri closure — none covering Wed.
        $this->assertCount(3, $inserted);
        $this->assertSame(Absence::TYPE_VACATION, $inserted[0]->getType());
        $this->assertSame('2026-08-03', $inserted[0]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-08-04', $inserted[0]->getEndDate()->format('Y-m-d'));
        $this->assertSame(Absence::TYPE_VACATION, $inserted[1]->getType());
        $this->assertSame('2026-08-06', $inserted[1]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-08-06', $inserted[1]->getEndDate()->format('Y-m-d'));
        $this->assertSame(Absence::TYPE_COMPANY_CLOSURE, $inserted[2]->getType());
        $this->assertSame('2026-08-07', $inserted[2]->getStartDate()->format('Y-m-d'));
        $this->assertSame('2026-08-07', $inserted[2]->getEndDate()->format('Y-m-d'));
    }

    public function testCompanyVacationRejectsInvalidOverageOption(): void {
        $this->expectException(ValidationException::class);
        $this->service->createCompanyVacation('2026-08-03', '2026-08-07', [1], null, 'admin', 'whatever');
    }

    public function testCreateRejectsCompanyClosureType(): void {
        $this->expectActiveEmployee();
        // Betriebsschließung ist nicht beantragbar — nur der zentrale Weg darf sie setzen.
        $this->absenceMapper->expects($this->never())->method('insert');

        $this->expectException(ValidationException::class);
        $this->service->create(1, Absence::TYPE_COMPANY_CLOSURE, '2026-08-03', '2026-08-07');
    }

    // ---------------------------------------------------------------------
    // #443 A: a REJECTED vacation request must not consume the yearly quota
    // ---------------------------------------------------------------------

    private function vacation(string $status, string $start, string $end, string $days): Absence {
        $a = $this->makeAbsence(Absence::TYPE_VACATION, $status, new DateTime($start), new DateTime($end));
        $a->setDays($days);
        return $a;
    }

    private function remaining(int $year): float {
        $m = new \ReflectionMethod($this->service, 'remainingVacationDays');
        $m->setAccessible(true);
        return $m->invoke($this->service, 1, $year, 'BY', null);
    }

    public function testRejectedVacationDoesNotConsumeQuota(): void {
        $emp = new Employee();
        $emp->setId(1);
        $emp->setVacationDays(30);
        $this->employeeMapper->method('find')->willReturn($emp);
        // The only vacation of the year was REJECTED — the days must be released.
        $this->absenceMapper->method('findByEmployeeAndYear')
            ->willReturn([$this->vacation(Absence::STATUS_REJECTED, '2026-03-02', '2026-03-06', '5.00')]);

        $this->assertSame(30.0, $this->remaining(2026));
    }

    public function testApprovedVacationConsumesQuota(): void {
        // Control: an APPROVED vacation of the same length DOES reduce the quota.
        $emp = new Employee();
        $emp->setId(1);
        $emp->setVacationDays(30);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->absenceMapper->method('findByEmployeeAndYear')
            ->willReturn([$this->vacation(Absence::STATUS_APPROVED, '2026-03-02', '2026-03-06', '5.00')]);

        $this->assertSame(25.0, $this->remaining(2026));
    }

    // ---------------------------------------------------------------------
    // #500: the request-time quota must include the previous-year carryover,
    // exactly like the overview the employee sees. Without it a request the
    // overview shows as covered was wrongly rejected.
    // ---------------------------------------------------------------------

    public function testRemainingVacationIncludesCarryover(): void {
        // Reporter's case: 30 base + 16 carryover − 27 approved = 19 remaining.
        // The buggy code returned 30 − 27 = 3 and blocked the request.
        $emp = new Employee();
        $emp->setId(1);
        $emp->setVacationDays(30);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->carryoverService->method('getVacationCarryoverDays')->willReturn(16.0);
        $this->absenceMapper->method('findByEmployeeAndYear')
            ->willReturn([$this->vacation(Absence::STATUS_APPROVED, '2026-01-05', '2026-02-10', '27.00')]);

        $this->assertSame(19.0, $this->remaining(2026));
    }

    public function testRemainingVacationCountsHalfDayCarryoverExactly(): void {
        // #525: the carryover is entered and stored with half-day precision
        // (step 0.5, DECIMAL(4,1)). It must be counted exactly in the quota, not
        // rounded to a whole day — otherwise the charged and the displayed
        // carryover disagree and a half day appears or vanishes.
        $emp = new Employee();
        $emp->setId(1);
        $emp->setVacationDays(30);
        $this->employeeMapper->method('find')->willReturn($emp);
        $this->carryoverService->method('getVacationCarryoverDays')->willReturn(15.5);
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);

        // 30 + 15.5 = 45.5, nothing used — no rounding to 46.
        $this->assertSame(45.5, $this->remaining(2026));
    }

    public function testRemainingVacationUsesTheYearsOwnEntitlement(): void {
        // #501: the employee's cache field holds today's profile (30), but in
        // 2024 the profile granted only 20 days. The quota for a 2024 request
        // must use 20 — the same figure the overview shows for 2024 — not the
        // cached 30. The buggy code returned 30 and would wave through requests
        // the overview shows as over budget.
        $emp = new Employee();
        $emp->setId(1);
        $emp->setVacationDays(30); // cache = today's profile
        $this->employeeMapper->method('find')->willReturn($emp);
        // In 2024 the profile granted only 20 days, unlike today's cached 30.
        $this->scheduleEntitlementByYear = [2024 => 20];
        $this->absenceMapper->method('findByEmployeeAndYear')->willReturn([]);

        $this->assertSame(20.0, $this->remaining(2024));
    }

    // ---------------------------------------------------------------------
    // #443 B: a REJECTED absence must not block a new/overlapping request
    // ---------------------------------------------------------------------

    private function validateOverlap(string $existingStatus): array {
        $existing = $this->makeAbsence(Absence::TYPE_VACATION, $existingStatus, new DateTime('2026-03-02'), new DateTime('2026-03-06'));
        $this->absenceMapper->method('findOverlapping')->willReturn([$existing]);

        $m = new \ReflectionMethod($this->service, 'validate');
        $m->setAccessible(true);
        return $m->invoke($this->service, 1, Absence::TYPE_VACATION, new DateTime('2026-03-02'), new DateTime('2026-03-06'), null, 1.0);
    }

    public function testRejectedAbsenceDoesNotBlockOverlappingRequest(): void {
        $errors = $this->validateOverlap(Absence::STATUS_REJECTED);
        $this->assertArrayNotHasKey('startDate', $errors);
    }

    public function testPendingAbsenceBlocksOverlappingRequest(): void {
        // Control: a still-standing (pending) absence DOES block.
        $errors = $this->validateOverlap(Absence::STATUS_PENDING);
        $this->assertArrayHasKey('startDate', $errors);
    }

    // ---------------------------------------------------------------------
    // #443 D: approving a full-day absence must re-check time-entry conflicts
    // ---------------------------------------------------------------------

    public function testApproveBlocksWhenTimeEntriesExistOnFullDayAbsence(): void {
        $absence = $this->makeAbsence(Absence::TYPE_VACATION, Absence::STATUS_PENDING, new DateTime('2026-03-02'), new DateTime('2026-03-02'));
        $this->absenceMapper->method('find')->willReturn($absence);
        // A time entry was booked on the day while the absence was still pending.
        $entry = new TimeEntry();
        $entry->setDate(new DateTime('2026-03-02'));
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([$entry]);
        // The approval must be refused — no status flip.
        $this->absenceMapper->expects($this->never())->method('update');

        $this->expectException(ValidationException::class);
        $this->service->approve(99, 1, 'admin');
    }

    public function testApproveSucceedsWithoutTimeEntryConflict(): void {
        // Control: no entries on the day → approval goes through.
        $absence = $this->makeAbsence(Absence::TYPE_VACATION, Absence::STATUS_PENDING, new DateTime('2026-03-02'), new DateTime('2026-03-02'));
        $this->absenceMapper->method('find')->willReturn($absence);
        $this->timeEntryMapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->absenceMapper->method('update')->willReturnArgument(0);

        $result = $this->service->approve(99, 1, 'admin');
        $this->assertSame(Absence::STATUS_APPROVED, $result->getStatus());
    }
}
