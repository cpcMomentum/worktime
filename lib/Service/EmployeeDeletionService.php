<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\ArchiveQueueMapper;
use OCA\WorkTime\Db\AuditLog;
use OCA\WorkTime\Db\AuditLogMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\OvertimePayoutMapper;
use OCA\WorkTime\Db\ProjectEmployeeMapper;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCA\WorkTime\Db\YearlyCarryoverMapper;
use OCP\IDBConnection;
use Psr\Log\LoggerInterface;

/**
 * Removes an employee together with every record that belongs to them (#424).
 *
 * Why this is a service of its own: it is the single place that has to know
 * about *all* employee-scoped tables. Spreading that across the per-entity
 * services is how the gap arose in the first place — each new feature added a
 * table and nobody owned the question what happens to it on deletion.
 *
 * Scope decision from #424: WorkTime does not anonymise (what is technically
 * achievable is pseudonymisation and stays fully personal data) and never
 * deletes on a timer (retention periods depend on the operator's trade and
 * audit cycle, which this app cannot know). Deletion is therefore always an
 * explicit administrator action, and the everyday path for someone who leaves
 * is the resting state from #486.
 */
class EmployeeDeletionService {

    public function __construct(
        private EmployeeMapper $employeeMapper,
        private TimeEntryMapper $timeEntryMapper,
        private AbsenceMapper $absenceMapper,
        private WorkScheduleMapper $workScheduleMapper,
        private YearlyCarryoverMapper $yearlyCarryoverMapper,
        private OvertimePayoutMapper $overtimePayoutMapper,
        private ProjectEmployeeMapper $projectEmployeeMapper,
        private ArchiveQueueMapper $archiveQueueMapper,
        private AuditLogMapper $auditLogMapper,
        private AuditLogService $auditLogService,
        private IDBConnection $db,
        private LoggerInterface $logger,
    ) {
    }

    /**
     * What disappears if this employee is deleted.
     *
     * Feeds the confirmation dialog, which states the actual numbers instead
     * of warning in the abstract. Colleagues pointing at this employee are
     * listed by name because losing a supervisor changes who approves their
     * months.
     *
     * @return array{
     *     counts: array<string, int>,
     *     deputyFor: list<array{id: int, fullName: string}>,
     *     supervisorOf: list<array{id: int, fullName: string}>
     * }
     */
    public function getImpact(Employee $employee): array {
        $id = $employee->getId();
        $toName = static fn (Employee $e): array => ['id' => $e->getId(), 'fullName' => $e->getFullName()];

        $auditLogs = $this->auditLogMapper->countForEmployee($employee->getUserId(), $id);
        foreach ($this->childEntityIds($id) as $entityType => $entityIds) {
            $auditLogs += $this->auditLogMapper->countForEntities($entityType, $entityIds, $employee->getUserId());
        }

        return [
            'counts' => [
                'timeEntries' => $this->timeEntryMapper->countByEmployeeId($id),
                'absences' => $this->absenceMapper->countByEmployeeId($id),
                'workSchedules' => $this->workScheduleMapper->countByEmployeeId($id),
                'carryovers' => $this->yearlyCarryoverMapper->countByEmployeeId($id),
                'payouts' => $this->overtimePayoutMapper->countByEmployeeId($id),
                'projectAssignments' => $this->projectEmployeeMapper->countByEmployeeId($id),
                'archiveJobs' => $this->archiveQueueMapper->countByEmployeeId($id),
                'auditLogs' => $auditLogs,
            ],
            'deputyFor' => array_values(array_map($toName, $this->employeeMapper->findAllByDeputy($id))),
            'supervisorOf' => array_values(array_map($toName, $this->employeeMapper->findBySupervisor($id))),
        ];
    }

    /**
     * Ids of the audit-logged records that hang off this employee.
     *
     * Only these five entity types are written to the audit log with an
     * own-row id (verified against the logCreate/logUpdate/logDelete calls in
     * the services). Project assignments are not audited at all, so they have
     * nothing to purge.
     *
     * @return array<string, int[]>
     */
    private function childEntityIds(int $employeeId): array {
        return [
            AuditLog::ENTITY_TIME_ENTRY => $this->timeEntryMapper->findIdsByEmployeeId($employeeId),
            AuditLog::ENTITY_ABSENCE => $this->absenceMapper->findIdsByEmployeeId($employeeId),
            AuditLog::ENTITY_OVERTIME_PAYOUT => $this->overtimePayoutMapper->findIdsByEmployeeId($employeeId),
            // Logged as a plain string, there is no ENTITY_ constant for it.
            'work_schedule' => $this->workScheduleMapper->findIdsByEmployeeId($employeeId),
            'yearly_carryover' => $this->yearlyCarryoverMapper->findIdsByEmployeeId($employeeId),
        ];
    }

    /**
     * Delete the employee and everything attached to them.
     *
     * Runs in one transaction: a half-removed employee would leave rows
     * pointing at an id that no longer resolves, which is exactly the state
     * this change exists to end.
     *
     * Two orderings matter and are easy to get wrong:
     *
     * 1. References from colleagues are cleared *first*, while the employee
     *    still exists, so each change can be audited against a resolvable id.
     * 2. The audit trail of the deleted person is purged *before* the closing
     *    record is written. The other way round the service would delete its
     *    own entry, because that entry carries entity_type=employee and the
     *    same entity_id.
     *
     * @return array<string, int> Rows actually removed, per table.
     */
    public function delete(Employee $employee, string $currentUserId = ''): array {
        $id = $employee->getId();
        $userId = $employee->getUserId();

        $this->db->beginTransaction();
        try {
            // Collected before the rows go: afterwards there is no way left to
            // tell which log entries described this employee's records.
            $childIds = $this->childEntityIds($id);

            $removed = [
                'supervisorLinksCleared' => $this->clearSupervisorLinks($id, $currentUserId),
                'deputyLinksCleared' => $this->clearDeputyLinks($id, $currentUserId),
                'timeEntries' => $this->timeEntryMapper->deleteByEmployeeId($id),
                'absences' => $this->absenceMapper->deleteByEmployeeId($id),
                'workSchedules' => $this->workScheduleMapper->deleteByEmployeeId($id),
                'carryovers' => $this->yearlyCarryoverMapper->deleteByEmployeeId($id),
                'payouts' => $this->overtimePayoutMapper->deleteByEmployeeId($id),
                'projectAssignments' => $this->projectEmployeeMapper->deleteByEmployeeId($id),
                'archiveJobs' => $this->archiveQueueMapper->deleteByEmployeeId($id),
                'auditLogs' => $this->auditLogMapper->deleteForEmployee($userId, $id),
            ];

            foreach ($childIds as $entityType => $entityIds) {
                $removed['auditLogs'] += $this->auditLogMapper->deleteForEntities($entityType, $entityIds, $userId);
            }

            $this->employeeMapper->delete($employee);

            if ($currentUserId) {
                $this->auditLogService->logDelete(
                    $currentUserId,
                    AuditLog::ENTITY_EMPLOYEE,
                    $id,
                    $this->closingRecord($id, $removed),
                );
            }

            $this->db->commit();
        } catch (\Throwable $e) {
            $this->db->rollBack();
            throw $e;
        }

        $this->logger->info('WorkTime: employee {id} deleted with {rows} dependent rows', [
            'id' => $id,
            'rows' => array_sum($removed),
        ]);

        return $removed;
    }

    /**
     * What stays behind once the person is gone.
     *
     * Deliberately holds no name, no personnel number and no mail address.
     * Writing the full record into old_values — as the previous implementation
     * did — would delete the data and keep a complete copy of it in the same
     * breath, which defeats the deletion. What remains provable is *that* an
     * administrator deleted employee X at a point in time, and how much went
     * with it.
     *
     * @param array<string, int> $removed
     * @return array<string, mixed>
     */
    private function closingRecord(int $id, array $removed): array {
        return [
            'employeeId' => $id,
            'deletedAt' => (new DateTime())->format('c'),
            'removedRecords' => $removed,
            'note' => 'Personal data removed on deletion; this record is kept without personal reference (#424).',
        ];
    }

    /**
     * Colleagues supervised by the deleted employee lose their supervisor.
     *
     * Not silently reassigned: who takes over is an organisational decision,
     * so the link is cleared and the confirmation dialog names the people
     * affected. Their approvals then run through admin or HR.
     */
    private function clearSupervisorLinks(int $id, string $currentUserId): int {
        return $this->clearLinks(
            $this->employeeMapper->findBySupervisor($id),
            static fn (Employee $e) => $e->setSupervisorId(null),
            $currentUserId,
        );
    }

    private function clearDeputyLinks(int $id, string $currentUserId): int {
        return $this->clearLinks(
            $this->employeeMapper->findAllByDeputy($id),
            static fn (Employee $e) => $e->setDeputyId(null),
            $currentUserId,
        );
    }

    /**
     * @param Employee[] $affected
     * @param callable(Employee): void $clear
     */
    private function clearLinks(array $affected, callable $clear, string $currentUserId): int {
        foreach ($affected as $colleague) {
            $before = $colleague->jsonSerialize();
            $clear($colleague);
            $colleague->setUpdatedAt(new DateTime());
            $this->employeeMapper->update($colleague);

            if ($currentUserId) {
                $this->auditLogService->logUpdate(
                    $currentUserId,
                    AuditLog::ENTITY_EMPLOYEE,
                    $colleague->getId(),
                    $before,
                    $colleague->jsonSerialize(),
                );
            }
        }

        return count($affected);
    }
}
