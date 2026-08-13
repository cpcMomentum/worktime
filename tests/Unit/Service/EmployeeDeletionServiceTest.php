<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\ArchiveQueueMapper;
use OCA\WorkTime\Db\AuditLogMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\OvertimePayoutMapper;
use OCA\WorkTime\Db\ProjectEmployeeMapper;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCA\WorkTime\Db\YearlyCarryoverMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\EmployeeDeletionService;
use OCP\IDBConnection;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Coverage for #424: deleting an employee has to take every employee-scoped
 * record with it, and must not leave a full copy of the person behind in the
 * audit log while claiming to have deleted them.
 */
class EmployeeDeletionServiceTest extends TestCase {

    private EmployeeMapper $employeeMapper;
    private TimeEntryMapper $timeEntryMapper;
    private AbsenceMapper $absenceMapper;
    private WorkScheduleMapper $workScheduleMapper;
    private YearlyCarryoverMapper $yearlyCarryoverMapper;
    private OvertimePayoutMapper $overtimePayoutMapper;
    private ProjectEmployeeMapper $projectEmployeeMapper;
    private ArchiveQueueMapper $archiveQueueMapper;
    private AuditLogMapper $auditLogMapper;
    private AuditLogService $auditLogService;
    private IDBConnection $db;

    protected function setUp(): void {
        $this->employeeMapper = $this->createMock(EmployeeMapper::class);
        $this->timeEntryMapper = $this->createMock(TimeEntryMapper::class);
        $this->absenceMapper = $this->createMock(AbsenceMapper::class);
        $this->workScheduleMapper = $this->createMock(WorkScheduleMapper::class);
        $this->yearlyCarryoverMapper = $this->createMock(YearlyCarryoverMapper::class);
        $this->overtimePayoutMapper = $this->createMock(OvertimePayoutMapper::class);
        $this->projectEmployeeMapper = $this->createMock(ProjectEmployeeMapper::class);
        $this->archiveQueueMapper = $this->createMock(ArchiveQueueMapper::class);
        $this->auditLogMapper = $this->createMock(AuditLogMapper::class);
        $this->auditLogService = $this->createMock(AuditLogService::class);
        $this->db = $this->createMock(IDBConnection::class);
    }

    /**
     * Make a mapper mock behave like the table it stands for: findIds returns
     * the ids until deleteByEmployeeId has run, and an empty list afterwards.
     *
     * @param int[] $ids
     */
    private function stubIdsUntilDeleted(object $mapper, array $ids): void {
        $deleted = false;

        $mapper->method('findIdsByEmployeeId')
            ->willReturnCallback(static function () use (&$deleted, $ids): array {
                return $deleted ? [] : $ids;
            });
        $mapper->method('deleteByEmployeeId')
            ->willReturnCallback(static function () use (&$deleted, $ids): int {
                $deleted = true;
                return count($ids);
            });
    }

    /** Nobody points at the employee. Tests about colleagues stub their own. */
    private function stubNoColleagues(): void {
        $this->employeeMapper->method('findBySupervisor')->willReturn([]);
        $this->employeeMapper->method('findAllByDeputy')->willReturn([]);
    }

    private function makeService(): EmployeeDeletionService {
        return new EmployeeDeletionService(
            $this->employeeMapper,
            $this->timeEntryMapper,
            $this->absenceMapper,
            $this->workScheduleMapper,
            $this->yearlyCarryoverMapper,
            $this->overtimePayoutMapper,
            $this->projectEmployeeMapper,
            $this->archiveQueueMapper,
            $this->auditLogMapper,
            $this->auditLogService,
            $this->db,
            $this->createMock(LoggerInterface::class),
        );
    }

    /**
     * Real entity instead of a mock: getId() is final in the NC entity and
     * therefore not mockable.
     */
    private function makeEmployee(int $id = 7, string $userId = 'jdoe'): Employee {
        $employee = new Employee();
        $employee->setId($id);
        $employee->setUserId($userId);
        $employee->setFirstName('Jane');
        $employee->setLastName('Doe');
        $employee->setEmail('jane.doe@example.com');

        return $employee;
    }

    /**
     * The point of #424: every employee-scoped table is cleaned, not just the
     * work schedules. Before this change five of these were left as orphaned
     * rows pointing at an id that no longer resolved.
     */
    public function testDeleteClearsEveryEmployeeScopedTable(): void {
        $this->stubNoColleagues();
        $this->timeEntryMapper->expects($this->once())->method('deleteByEmployeeId')->with(7)->willReturn(128);
        $this->absenceMapper->expects($this->once())->method('deleteByEmployeeId')->with(7)->willReturn(14);
        $this->workScheduleMapper->expects($this->once())->method('deleteByEmployeeId')->with(7)->willReturn(2);
        $this->yearlyCarryoverMapper->expects($this->once())->method('deleteByEmployeeId')->with(7)->willReturn(3);
        $this->overtimePayoutMapper->expects($this->once())->method('deleteByEmployeeId')->with(7)->willReturn(1);
        $this->projectEmployeeMapper->expects($this->once())->method('deleteByEmployeeId')->with(7)->willReturn(5);
        $this->archiveQueueMapper->expects($this->once())->method('deleteByEmployeeId')->with(7)->willReturn(0);
        $this->auditLogMapper->expects($this->once())->method('deleteForEmployee')->with('jdoe', 7)->willReturn(42);
        $this->employeeMapper->expects($this->once())->method('delete');

        $removed = $this->makeService()->delete($this->makeEmployee(), 'admin');

        $this->assertSame(128, $removed['timeEntries']);
        $this->assertSame(14, $removed['absences']);
        $this->assertSame(42, $removed['auditLogs']);
    }

    /**
     * The closing record must not reintroduce what the deletion removed.
     * The previous implementation passed the whole entity into old_values,
     * which kept name, personnel number and mail address on file.
     */
    public function testClosingRecordCarriesNoPersonalData(): void {
        $this->stubDeletesAsEmpty();

        $logged = null;
        $this->auditLogService->expects($this->once())
            ->method('logDelete')
            ->willReturnCallback(function (string $userId, string $type, ?int $id, array $values) use (&$logged) {
                $logged = $values;
                return $this->createMock(\OCA\WorkTime\Db\AuditLog::class);
            });

        $this->makeService()->delete($this->makeEmployee(), 'admin');

        $serialised = json_encode($logged);
        $this->assertStringNotContainsString('Jane', $serialised);
        $this->assertStringNotContainsString('Doe', $serialised);
        $this->assertStringNotContainsString('jane.doe@example.com', $serialised);
        $this->assertSame(7, $logged['employeeId']);
        $this->assertArrayHasKey('removedRecords', $logged);
    }

    /**
     * Ordering trap: the audit trail of the deleted person is purged with a
     * condition that also matches the closing record (entity_type=employee,
     * same entity_id). Written first, the service would delete its own entry
     * and leave no trace of the deletion at all.
     */
    public function testAuditTrailIsPurgedBeforeTheClosingRecordIsWritten(): void {
        $this->stubTableDeletesAsEmpty();

        $order = [];
        $this->auditLogMapper->expects($this->once())
            ->method('deleteForEmployee')
            ->willReturnCallback(function () use (&$order) {
                $order[] = 'purge';
                return 0;
            });
        $this->auditLogService->expects($this->once())
            ->method('logDelete')
            ->willReturnCallback(function () use (&$order) {
                $order[] = 'closing-record';
                return $this->createMock(\OCA\WorkTime\Db\AuditLog::class);
            });

        $this->makeService()->delete($this->makeEmployee(), 'admin');

        $this->assertSame(['purge', 'closing-record'], $order);
    }

    /**
     * The employee's own trail is not the whole story. A row like "admin
     * created time_entry 42" names neither the person nor their user id, but
     * its payload holds that day's working hours — personal data that outlived
     * the deletion until this was added.
     *
     * The ids have to be read before the rows are deleted; afterwards nothing
     * links a log entry to the employee any more.
     */
    public function testAuditRowsAboutTheEmployeesRecordsArePurgedToo(): void {
        $this->stubNoColleagues();
        // The two tables this test does not model in detail.
        $this->projectEmployeeMapper->method('deleteByEmployeeId')->willReturn(0);
        $this->archiveQueueMapper->method('deleteByEmployeeId')->willReturn(0);

        // Modelled like the real table, not like a constant: once the rows are
        // gone the lookup returns nothing. Without this the test would pass
        // even if the ids were collected after the delete, which is precisely
        // the mistake that would make the purge a silent no-op.
        $this->stubIdsUntilDeleted($this->timeEntryMapper, [3, 4, 5]);
        $this->stubIdsUntilDeleted($this->absenceMapper, [7]);
        $this->stubIdsUntilDeleted($this->overtimePayoutMapper, []);
        $this->stubIdsUntilDeleted($this->workScheduleMapper, [1]);
        $this->stubIdsUntilDeleted($this->yearlyCarryoverMapper, [9]);

        $this->auditLogMapper->method('deleteForEmployee')->willReturn(1);
        $this->auditLogMapper->expects($this->exactly(5))
            ->method('deleteForEntities')
            ->willReturnCallback(function (string $type, array $ids): int {
                $this->assertContains($type, ['time_entry', 'absence', 'overtime_payout', 'work_schedule', 'yearly_carryover']);
                return count($ids);
            });

        $removed = $this->makeService()->delete($this->makeEmployee(), 'admin');

        // 1 own row + 3 time entries + 1 absence + 0 payouts + 1 schedule + 1 carryover
        $this->assertSame(7, $removed['auditLogs']);
    }

    /**
     * A half-deleted employee is the state this change exists to prevent, so a
     * failure part-way through must take the whole thing back.
     */
    public function testFailureRollsBackTheWholeDeletion(): void {
        $this->stubNoColleagues();
        $this->timeEntryMapper->method('deleteByEmployeeId')->willReturn(0);
        $this->absenceMapper->method('deleteByEmployeeId')
            ->willThrowException(new \RuntimeException('database went away'));

        $this->db->expects($this->once())->method('beginTransaction');
        $this->db->expects($this->once())->method('rollBack');
        $this->db->expects($this->never())->method('commit');
        $this->employeeMapper->expects($this->never())->method('delete');

        $this->expectException(\RuntimeException::class);

        $this->makeService()->delete($this->makeEmployee(), 'admin');
    }

    public function testHappyPathCommits(): void {
        $this->stubDeletesAsEmpty();

        $this->db->expects($this->once())->method('beginTransaction');
        $this->db->expects($this->once())->method('commit');
        $this->db->expects($this->never())->method('rollBack');

        $this->makeService()->delete($this->makeEmployee(), 'admin');
    }

    /**
     * Colleagues are reported by name, not silently reassigned: losing a
     * supervisor changes who approves their months.
     */
    public function testImpactReportsCountsAndAffectedColleagues(): void {
        $this->timeEntryMapper->method('countByEmployeeId')->willReturn(128);
        $this->absenceMapper->method('countByEmployeeId')->willReturn(14);
        $this->workScheduleMapper->method('countByEmployeeId')->willReturn(2);
        $this->yearlyCarryoverMapper->method('countByEmployeeId')->willReturn(0);
        $this->overtimePayoutMapper->method('countByEmployeeId')->willReturn(0);
        $this->projectEmployeeMapper->method('countByEmployeeId')->willReturn(5);
        $this->archiveQueueMapper->method('countByEmployeeId')->willReturn(0);
        $this->auditLogMapper->method('countForEmployee')->with('jdoe', 7)->willReturn(42);

        $this->employeeMapper->method('findBySupervisor')->willReturn([$this->makeEmployee(9, 'rroe')]);
        $this->employeeMapper->method('findAllByDeputy')->willReturn([]);

        $impact = $this->makeService()->getImpact($this->makeEmployee());

        $this->assertSame(128, $impact['counts']['timeEntries']);
        $this->assertSame(42, $impact['counts']['auditLogs']);
        $this->assertSame(0, $impact['counts']['carryovers']);
        $this->assertCount(1, $impact['supervisorOf']);
        $this->assertSame(9, $impact['supervisorOf'][0]['id']);
        $this->assertSame([], $impact['deputyFor']);
    }

    /**
     * The preview must not count a row twice. A log entry the employee wrote
     * about their own time entry matches both the person condition and the
     * child condition; adding the two counts naively reported 13 where the
     * database held 12. The child count therefore excludes the person's own
     * rows, which is what the userId argument is for.
     */
    public function testImpactDoesNotCountOverlappingAuditRowsTwice(): void {
        $this->stubNoColleagues();
        foreach ([$this->timeEntryMapper, $this->absenceMapper, $this->workScheduleMapper,
            $this->yearlyCarryoverMapper, $this->overtimePayoutMapper,
            $this->projectEmployeeMapper, $this->archiveQueueMapper] as $mapper) {
            $mapper->method('countByEmployeeId')->willReturn(0);
        }
        $this->timeEntryMapper->method('findIdsByEmployeeId')->willReturn([3]);
        $this->absenceMapper->method('findIdsByEmployeeId')->willReturn([]);
        $this->overtimePayoutMapper->method('findIdsByEmployeeId')->willReturn([]);
        $this->workScheduleMapper->method('findIdsByEmployeeId')->willReturn([]);
        $this->auditLogMapper->method('countForEmployee')->willReturn(4);

        $seenExclusions = [];
        $this->auditLogMapper->method('countForEntities')
            ->willReturnCallback(function (string $type, array $ids, ?string $exclude) use (&$seenExclusions): int {
                $seenExclusions[] = $exclude;
                return count($ids);
            });

        $impact = $this->makeService()->getImpact($this->makeEmployee());

        $this->assertSame(['jdoe', 'jdoe', 'jdoe', 'jdoe', 'jdoe'], $seenExclusions);
        $this->assertSame(5, $impact['counts']['auditLogs']);
    }

    /**
     * Without a current user there is nobody to attribute the deletion to, so
     * no audit record is written — but the cleanup still has to happen.
     */
    public function testDeletionWithoutCurrentUserWritesNoAuditRecord(): void {
        $this->stubDeletesAsEmpty();

        $this->auditLogService->expects($this->never())->method('logDelete');
        $this->employeeMapper->expects($this->once())->method('delete');

        $this->makeService()->delete($this->makeEmployee(), '');
    }

    private function stubDeletesAsEmpty(): void {
        $this->stubTableDeletesAsEmpty();
        $this->auditLogMapper->method('deleteForEmployee')->willReturn(0);
    }

    /** Everything except the audit purge, so tests can assert on that one. */
    private function stubTableDeletesAsEmpty(): void {
        $this->stubNoColleagues();
        $this->timeEntryMapper->method('deleteByEmployeeId')->willReturn(0);
        $this->absenceMapper->method('deleteByEmployeeId')->willReturn(0);
        $this->workScheduleMapper->method('deleteByEmployeeId')->willReturn(0);
        $this->yearlyCarryoverMapper->method('deleteByEmployeeId')->willReturn(0);
        $this->overtimePayoutMapper->method('deleteByEmployeeId')->willReturn(0);
        $this->projectEmployeeMapper->method('deleteByEmployeeId')->willReturn(0);
        $this->archiveQueueMapper->method('deleteByEmployeeId')->willReturn(0);
    }
}
