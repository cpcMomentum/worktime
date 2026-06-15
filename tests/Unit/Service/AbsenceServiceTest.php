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
        $timeEntryService = new TimeEntryService(
            $this->timeEntryMapper,
            $settingsMapper,
            $this->employeeMapper,
            $this->absenceMapper,
            $this->auditLogService,
            $this->notificationService,
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
}
