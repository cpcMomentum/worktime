<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use DateTimeZone;
use OCA\WorkTime\Db\Absence;
use OCA\WorkTime\Db\AbsenceMapper;
use OCA\WorkTime\Db\ActivePunch;
use OCA\WorkTime\Db\ActivePunchMapper;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\HolidayMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IDateTimeZone;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class AbsenceService {

    /** #15 Stufe 2: Überhang-Behandlung wenn der Resturlaub die Betriebsferien nicht deckt. */
    public const OVERAGE_SKIP = 'skip';
    public const OVERAGE_CLOSURE = 'closure';
    public const OVERAGE_COMPENSATORY = 'compensatory';
    public const OVERAGE_NEGATIVE = 'negative';

    public const OVERAGE_OPTIONS = [
        self::OVERAGE_SKIP,
        self::OVERAGE_CLOSURE,
        self::OVERAGE_COMPENSATORY,
        self::OVERAGE_NEGATIVE,
    ];

    public function __construct(
        private AbsenceMapper $absenceMapper,
        private EmployeeMapper $employeeMapper,
        private HolidayMapper $holidayMapper,
        private TimeEntryService $timeEntryService,
        private AuditLogService $auditLogService,
        private NotificationService $notificationService,
        private WorkScheduleService $workScheduleService,
        private HolidayService $holidayService,
        private YearlyCarryoverService $carryoverService,
        private CompanySettingsService $companySettingsService,
        private ActivePunchMapper $activePunchMapper,
        private IDateTimeZone $dateTimeZone,
        private LoggerInterface $logger,
        private IL10N $l,
    ) {
    }

    /**
     * Parse a date coming in from the API, or fail with a validation error (#537).
     *
     * Without this, `new DateTime($string)` accepted relative expressions like
     * "+1 week" — the resulting absence then depended on the request time.
     *
     * @throws ValidationException
     */
    private function parseDateOrFail(string $value, string $field): DateTime {
        $date = DateParser::parseIsoDate($value);
        if ($date === null) {
            throw ValidationException::fromSingleError(
                $field,
                $this->l->t('Ungültiges Datum. Erwartet wird das Format JJJJ-MM-TT.')
            );
        }

        return $date;
    }

    /**
     * Resting employees must not gain new or changed absences (#486).
     *
     * Mirrors TimeEntryService::assertEmployeeNotResting(). Approving, rejecting
     * and cancelling stay open so an already-recorded absence can still be
     * settled after the employee went resting.
     *
     * @throws ForbiddenException
     */
    private function assertEmployeeNotResting(int $employeeId, bool $allowCorrection = false): void {
        // HR/Admin correction (#148 override) stays possible — see the same
        // reasoning in TimeEntryService::assertEmployeeNotResting().
        if ($allowCorrection) {
            return;
        }

        try {
            $employee = $this->employeeMapper->find($employeeId);
        } catch (DoesNotExistException) {
            return; // absent employee is handled by the regular validation paths
        }

        if (!$employee->getIsActive()) {
            throw new ForbiddenException(
                $this->l->t('Für ruhende Mitarbeiter können keine Abwesenheiten erfasst oder geändert werden.')
            );
        }
    }

    /**
     * @return Absence[]
     */
    public function findByEmployee(int $employeeId): array {
        return $this->absenceMapper->findByEmployee($employeeId);
    }

    /**
     * @return Absence[]
     */
    public function findByEmployeeAndYear(int $employeeId, int $year): array {
        return $this->absenceMapper->findByEmployeeAndYear($employeeId, $year);
    }

    /**
     * @return Absence[]
     */
    public function findByEmployeeAndMonth(int $employeeId, int $year, int $month): array {
        return $this->absenceMapper->findByEmployeeAndMonth($employeeId, $year, $month);
    }

    /**
     * @return Absence[]
     */
    public function findByEmployeeAndDateRange(int $employeeId, DateTime $startDate, DateTime $endDate): array {
        return $this->absenceMapper->findByEmployeeAndDateRange($employeeId, $startDate, $endDate);
    }

    /**
     * @return Absence[]
     */
    public function findActiveInformationalForSupervisor(int $supervisorEmployeeId): array {
        return $this->absenceMapper->findActiveInformationalForSupervisor($supervisorEmployeeId);
    }

    public function findPendingForApproval(int $supervisorEmployeeId): array {
        return $this->absenceMapper->findPendingForApproval($supervisorEmployeeId);
    }

    /**
     * Pending absences for an explicit set of approvable employee ids (#343).
     *
     * @param int[] $employeeIds
     * @return \OCA\WorkTime\Db\Absence[]
     */
    public function findPendingByEmployeeIds(array $employeeIds): array {
        return $this->absenceMapper->findPendingByEmployeeIds($employeeIds);
    }

    /**
     * @throws NotFoundException
     */
    public function find(int $id): Absence {
        try {
            return $this->absenceMapper->find($id);
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Absence not found');
        }
    }

    /**
     * @throws ValidationException
     */
    public function create(
        int $employeeId,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null,
        string $federalState = 'BY',
        string $currentUserId = '',
        float $scope = 1.0,
        ?string $reason = null,
        bool $allowLockedOverride = false,
        ?int $absenceMinutes = null
    ): Absence {
        $this->assertEmployeeNotResting($employeeId, $allowLockedOverride);

        $startDateObj = $this->parseDateOrFail($startDate, 'startDate');
        $endDateObj = $this->parseDateOrFail($endDate, 'endDate');

        // #625: serverseitig gedeckelte Krank-Minuten (oder null, wenn n/a).
        $hourlySick = $this->resolveHourlySickMinutes($type, $startDateObj, $endDateObj, $employeeId, $absenceMinutes);
        $effectiveAbsenceMinutes = $hourlySick['minutes'] ?? null;

        // #15 Stufe 2: Betriebsschließung entsteht nur über den zentralen Weg.
        if ($type === Absence::TYPE_COMPANY_CLOSURE) {
            throw new ValidationException(['type' => [$this->l->t('Betriebsschließung kann nur zentral über die Betriebsferien gesetzt werden')]]);
        }

        // Validate
        $errors = $this->validate($employeeId, $type, $startDateObj, $endDateObj, null, $scope);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // #360: a full-day absence must not overlap existing time entries.
        $this->checkTimeEntryConflict($employeeId, $startDateObj, $endDateObj, $scope, $effectiveAbsenceMinutes);

        // Closed-month rules (#148): block employees, require a reason for HR corrections.
        $lockedMonths = $this->timeEntryService->lockedMonthsInRange($employeeId, $startDateObj, $endDateObj);
        $effectiveReason = $this->timeEntryService->requireReasonForLockedMonths($lockedMonths, $allowLockedOverride, $reason);

        // Calculate working days and apply scope (schedule-aware)
        $workingDays = $this->calculateWorkingDays($startDateObj, $endDateObj, $federalState, $employeeId);
        $days = $workingDays * $scope;

        // #625: persisted days reflect the sick share (minutes/daily target) so
        // reports that read Absence.days directly show a partial, not a full, day.
        // Das Tagessoll kommt aus resolveHourlySickMinutes (keine zweite Abfrage).
        if ($hourlySick !== null) {
            $days = $hourlySick['dayTarget'] > 0 ? $hourlySick['minutes'] / $hourlySick['dayTarget'] : 0.0;
        }

        if ($type === Absence::TYPE_VACATION) {
            $this->checkVacationQuota($employeeId, $startDateObj, $endDateObj, $federalState, $scope);
        }

        $isInformational = in_array($type, [Absence::TYPE_SICK, Absence::TYPE_CHILD_SICK], true);

        $absence = new Absence();
        $absence->setEmployeeId($employeeId);
        $absence->setType($type);
        $absence->setStartDate($startDateObj);
        $absence->setEndDate($endDateObj);
        $absence->setDays((string)$days);
        $absence->setScopeValue($scope);
        $absence->setAbsenceMinutes($effectiveAbsenceMinutes);
        $absence->setNote($note);
        $absence->setCreatedAt(new DateTime());
        $absence->setUpdatedAt(new DateTime());

        if ($isInformational) {
            // #665: informational absences (Krank/Kind krank) are approved on the
            // spot, so a full day of one would trap a running punch immediately —
            // the same trap approve() guards against for pending absences. A pending
            // (non-informational) create cannot trap anything yet, so it is not
            // checked here; approve() catches it later.
            $this->checkActivePunchConflict($absence);
            // Krankheit/Kind krank werden nicht genehmigt — direkt approved
            $absence->setStatus(Absence::STATUS_APPROVED);
            $absence->setApprovedAt(new DateTime());
            $absence->setApprovedBy(null);
        } else {
            $absence->setStatus(Absence::STATUS_PENDING);
        }

        $absence = $this->absenceMapper->insert($absence);

        // Audit log (record the HR correction reason when present)
        if ($currentUserId) {
            $auditReason = $this->timeEntryService->auditReason($effectiveReason, $allowLockedOverride, $reason);
            $newValues = $absence->jsonSerialize();
            if ($auditReason !== null) {
                $newValues['reason'] = $auditReason;
            }
            $this->auditLogService->logCreate($currentUserId, 'absence', $absence->getId(), $newValues);
        }

        // HR correction in a closed month: reopen the affected time-entry months.
        if ($effectiveReason !== null) {
            foreach ($lockedMonths as [$lockedYear, $lockedMonth]) {
                $this->timeEntryService->reopenMonth($employeeId, $lockedYear, $lockedMonth, $effectiveReason, $currentUserId);
            }
        }

        try {
            if ($isInformational) {
                $this->notificationService->notifyAbsenceInformational($absence);
            } else {
                $this->notificationService->notifyAbsenceSubmitted($absence);
            }
        } catch (\Throwable $e) {
            $this->logger->error('Failed to send absence notification', ['exception' => $e]);
        }

        return $absence;
    }

    /**
     * #15 Betriebsferien: book a company-wide (or selected) closure as vacation.
     *
     * Each targeted employee gets approved, centrally-marked absence entries for
     * the period (schedule-aware, so part-time and holidays are handled per
     * person). Employees who already have time entries in the period are never
     * booked — they are returned in `skipped` for the admin to handle.
     *
     * When the remaining vacation does not cover the period, `$overageHandling`
     * decides (#15 Stufe 2 — a deliberate admin choice, the app makes no legal
     * assessment):
     *  - OVERAGE_SKIP: do not book, report as skipped (Stufe-1 behaviour).
     *  - OVERAGE_CLOSURE: vacation until the quota is used up, the rest as paid
     *    company closure (no vacation/overtime deduction).
     *  - OVERAGE_COMPENSATORY: vacation until the quota is used up, the rest as
     *    compensatory time (reduces the overtime balance).
     *  - OVERAGE_NEGATIVE: book everything as vacation, allowing the account to
     *    go negative (advance on next year's quota).
     *
     * All entries of one call share a `centralGroup` id so the operation can be
     * listed and removed as a whole even when it splits into several entries.
     *
     * @param int[]|null $employeeIds null/empty = all active employees
     * @return array{group: string, booked: list<array{employeeId:int,name:string,days:float,vacationDays:float,overageDays:float}>, skipped: list<array{employeeId:int,name:string,reason:string}>}
     * @throws ValidationException on invalid dates or overage option
     */
    public function createCompanyVacation(
        string $startDate,
        string $endDate,
        ?array $employeeIds,
        ?string $note,
        string $currentUserId = '',
        string $overageHandling = self::OVERAGE_SKIP
    ): array {
        $startDateObj = $this->parseDateOrFail($startDate, 'startDate');
        $endDateObj = $this->parseDateOrFail($endDate, 'endDate');
        if ($startDateObj > $endDateObj) {
            throw new ValidationException(['endDate' => [$this->l->t('Enddatum muss nach dem Startdatum liegen')]]);
        }
        if (!in_array($overageHandling, self::OVERAGE_OPTIONS, true)) {
            throw new ValidationException(['overageHandling' => [$this->l->t('Ungültige Option für den Umgang mit fehlendem Resturlaub')]]);
        }

        $employees = [];
        if ($employeeIds === null || $employeeIds === []) {
            $employees = $this->employeeMapper->findAllActive();
        } else {
            foreach ($employeeIds as $id) {
                try {
                    $employees[] = $this->employeeMapper->find((int)$id);
                } catch (\Exception) {
                    // Unknown/removed employee id — silently ignore.
                }
            }
        }

        $group = bin2hex(random_bytes(16));
        $booked = [];
        $skipped = [];

        // Overage handling drives two things: the type booked once the yearly
        // quota is exhausted, and whether the quota is a hard limit at all.
        // NEGATIVE books everything as vacation (account goes negative), so it is
        // not limited by the quota; SKIP treats any overage as a reason to skip.
        $overageType = match ($overageHandling) {
            self::OVERAGE_CLOSURE => Absence::TYPE_COMPANY_CLOSURE,
            self::OVERAGE_COMPENSATORY => Absence::TYPE_COMPENSATORY,
            default => Absence::TYPE_VACATION,
        };
        $limitByQuota = $overageHandling !== self::OVERAGE_NEGATIVE;

        foreach ($employees as $employee) {
            $employeeId = $employee->getId();
            $name = trim($employee->getFirstName() . ' ' . $employee->getLastName());
            $federalState = $employee->getFederalState();

            // #454: days already covered by the employee's own (non-cancelled)
            // absences are skipped so the central booking never overlaps them —
            // double crediting/deducting would result otherwise.
            $blocked = $this->blockedDatesInPeriod($employeeId, $startDateObj, $endDateObj);

            [$segments, $vacationDays, $overageDays, $bookableDays, $rawWorkingDays] =
                $this->splitPeriod($employeeId, $startDateObj, $endDateObj, $federalState, $overageType, $limitByQuota, $blocked);

            if ($rawWorkingDays <= 0) {
                // No working day in the period for this employee (part-time not
                // scheduled, or only holidays) — nothing to book or report.
                continue;
            }

            try {
                $this->checkTimeEntryConflict($employeeId, $startDateObj, $endDateObj, 1.0);
            } catch (ValidationException) {
                $skipped[] = ['employeeId' => $employeeId, 'name' => $name, 'reason' => 'time_entry_conflict'];
                continue;
            }

            if ($bookableDays <= 0) {
                // Every working day is already covered by an existing absence.
                $skipped[] = ['employeeId' => $employeeId, 'name' => $name, 'reason' => 'absence_conflict'];
                continue;
            }

            if ($overageHandling === self::OVERAGE_SKIP && $overageDays > 0) {
                $skipped[] = ['employeeId' => $employeeId, 'name' => $name, 'reason' => 'insufficient_vacation'];
                continue;
            }

            foreach ($segments as $segment) {
                $this->insertCentralAbsence(
                    $employeeId, $segment['type'], $segment['start'], $segment['end'],
                    $segment['days'], $note, $group, $currentUserId
                );
            }

            $booked[] = [
                'employeeId' => $employeeId,
                'name' => $name,
                'days' => $vacationDays + $overageDays,
                'vacationDays' => $vacationDays,
                'overageDays' => $overageDays,
                'skippedDays' => $rawWorkingDays - $bookableDays,
            ];
        }

        return ['group' => $group, 'booked' => $booked, 'skipped' => $skipped];
    }

    /**
     * #454: collect the set of calendar days (Y-m-d) within [start, end] that are
     * already covered by the employee's own approved or pending absences. Those
     * days must not be re-booked by a central Betriebsferien entry, otherwise the
     * overtime and vacation accounting would count them twice. Rejected absences
     * are excluded — a declined request means the employee is not actually absent.
     *
     * @return array<string, true> keyed by 'Y-m-d' for O(1) lookup
     */
    private function blockedDatesInPeriod(int $employeeId, DateTime $startDate, DateTime $endDate): array {
        $existing = $this->absenceMapper->findOverlapping($employeeId, $startDate, $endDate);
        $blocked = [];
        foreach ($existing as $absence) {
            if ($absence->getStatus() === Absence::STATUS_REJECTED) {
                continue;
            }
            $from = $absence->getStartDate() < $startDate ? clone $startDate : clone $absence->getStartDate();
            $to = $absence->getEndDate() > $endDate ? $endDate : $absence->getEndDate();
            for ($day = clone $from; $day <= $to; $day->modify('+1 day')) {
                $blocked[$day->format('Y-m-d')] = true;
            }
        }
        return $blocked;
    }

    /**
     * #15 Stufe 2 / #454: walk the period day by day and classify each bookable
     * working day as vacation (while the employee's yearly quota still covers it,
     * unless $limitByQuota is false) or as the chosen overage type. Consecutive
     * days of the same class become one entry; non-working days in between attach
     * to the running segment. Year-aware: a period crossing New Year draws on each
     * year's own remaining quota.
     *
     * Days present in $blocked (already covered by the employee's own absences)
     * are skipped entirely — they neither count nor get booked — and act as hard
     * segment boundaries so no emitted entry ever spans an already-absent day.
     *
     * @param array<string, true> $blocked calendar days ('Y-m-d') to skip
     * @return array{0: list<array{type:string,start:DateTime,end:DateTime,days:float}>, 1: float, 2: float, 3: float, 4: float}
     *         [segments, vacationDays, overageDays, bookableWorkingDays, rawWorkingDays]
     */
    private function splitPeriod(
        int $employeeId,
        DateTime $startDate,
        DateTime $endDate,
        string $federalState,
        string $overageType,
        bool $limitByQuota,
        array $blocked
    ): array {
        // #438: ensure the period's holidays exist so the day-walk classifies them
        // as non-working (not vacation/overage).
        $this->holidayService->ensureHolidaysForRange($startDate, $endDate, $federalState);
        $holidays = $this->holidayMapper->findHolidaysInRange($startDate, $endDate, $federalState);

        $remaining = [];
        $segments = [];
        $currentType = null;
        $segStart = null;
        $segDays = 0.0;
        $vacationDays = 0.0;
        $overageDays = 0.0;
        $bookableWorkingDays = 0.0;
        $rawWorkingDays = 0.0;
        // Earliest calendar day that may belong to the next segment; advances past
        // every blocked day so leading non-working days are absorbed but a segment
        // never reaches back across an already-absent day.
        $pendingStart = clone $startDate;

        for ($day = clone $startDate; $day <= $endDate; $day->modify('+1 day')) {
            $dayValue = $this->workScheduleService->countWorkingDays($employeeId, $day, $day, $holidays);

            if (isset($blocked[$day->format('Y-m-d')])) {
                if ($dayValue > 0) {
                    $rawWorkingDays += $dayValue;
                }
                // Close the open segment before the block and forbid the next one
                // from starting any earlier than the day after it.
                if ($currentType !== null) {
                    $segments[] = [
                        'type' => $currentType,
                        'start' => $segStart,
                        'end' => (clone $day)->modify('-1 day'),
                        'days' => $segDays,
                    ];
                    $currentType = null;
                    $segStart = null;
                    $segDays = 0.0;
                }
                $pendingStart = (clone $day)->modify('+1 day');
                continue;
            }

            if ($dayValue <= 0) {
                // Non-working, non-blocked day: absorbed by the surrounding segment.
                continue;
            }

            $rawWorkingDays += $dayValue;
            $bookableWorkingDays += $dayValue;

            $year = (int)$day->format('Y');
            if ($limitByQuota) {
                $remaining[$year] ??= $this->remainingVacationDays($employeeId, $year, $federalState);
            }

            if (!$limitByQuota || $remaining[$year] >= $dayValue - 1e-9) {
                $type = Absence::TYPE_VACATION;
                if ($limitByQuota) {
                    $remaining[$year] -= $dayValue;
                }
                $vacationDays += $dayValue;
            } else {
                $type = $overageType;
                $overageDays += $dayValue;
            }

            if ($currentType === null) {
                // Open a segment; it covers leading non-working days back to the
                // last boundary (period start or the day after a block).
                $currentType = $type;
                $segStart = clone $pendingStart;
            } elseif ($type !== $currentType) {
                $segments[] = [
                    'type' => $currentType,
                    'start' => $segStart,
                    'end' => (clone $day)->modify('-1 day'),
                    'days' => $segDays,
                ];
                $currentType = $type;
                $segStart = clone $day;
                $segDays = 0.0;
            }
            $segDays += $dayValue;
        }

        if ($currentType !== null) {
            // No block follows the last working day (a trailing block would have
            // closed the segment), so extend it over trailing non-working days.
            $segments[] = [
                'type' => $currentType,
                'start' => $segStart,
                'end' => clone $endDate,
                'days' => $segDays,
            ];
        }

        return [$segments, $vacationDays, $overageDays, $bookableWorkingDays, $rawWorkingDays];
    }

    private function insertCentralAbsence(
        int $employeeId,
        string $type,
        DateTime $startDate,
        DateTime $endDate,
        float $days,
        ?string $note,
        string $group,
        string $currentUserId
    ): Absence {
        $absence = new Absence();
        $absence->setEmployeeId($employeeId);
        $absence->setType($type);
        $absence->setStartDate($startDate);
        $absence->setEndDate($endDate);
        $absence->setDays((string)$days);
        $absence->setScopeValue(1.0);
        $absence->setNote($note);
        $absence->setIsCentral(1);
        $absence->setCentralGroup($group);
        $absence->setStatus(Absence::STATUS_APPROVED);
        $absence->setApprovedAt(new DateTime());
        $absence->setApprovedBy(null);
        $absence->setCreatedAt(new DateTime());
        $absence->setUpdatedAt(new DateTime());
        $absence = $this->absenceMapper->insert($absence);

        if ($currentUserId) {
            $this->auditLogService->logCreate($currentUserId, 'absence', $absence->getId(), $absence->jsonSerialize());
        }

        return $absence;
    }

    /**
     * @return Absence[]
     */
    public function findCentralAbsences(): array {
        return $this->absenceMapper->findCentral();
    }

    /**
     * Remove a whole Betriebsferien operation (all central entries for the exact
     * date range). Returns the number of removed entries (#15).
     */
    public function deleteCompanyVacation(string $startDate, string $endDate, string $currentUserId = ''): int {
        $entries = $this->absenceMapper->findCentralByRange(
            $this->parseDateOrFail($startDate, 'startDate'),
            $this->parseDateOrFail($endDate, 'endDate')
        );
        return $this->deleteCentralEntries($entries, $currentUserId);
    }

    /**
     * #15 Stufe 2: remove a whole Betriebsferien operation by its group id —
     * covers split entries whose date ranges differ per employee.
     */
    public function deleteCompanyVacationByGroup(string $group, string $currentUserId = ''): int {
        $entries = $this->absenceMapper->findCentralByGroup($group);
        return $this->deleteCentralEntries($entries, $currentUserId);
    }

    /**
     * @param Absence[] $entries
     */
    private function deleteCentralEntries(array $entries, string $currentUserId): int {
        foreach ($entries as $absence) {
            if ($currentUserId) {
                $this->auditLogService->logDelete($currentUserId, 'absence', $absence->getId(), $absence->jsonSerialize());
            }
            $this->absenceMapper->delete($absence);
        }
        return count($entries);
    }

    /**
     * @throws NotFoundException
     * @throws ValidationException
     * @throws ForbiddenException
     */
    public function update(
        int $id,
        string $type,
        string $startDate,
        string $endDate,
        ?string $note = null,
        string $federalState = 'BY',
        string $currentUserId = '',
        float $scope = 1.0,
        ?string $reason = null,
        bool $allowLockedOverride = false,
        ?int $absenceMinutes = null
    ): Absence {
        $absence = $this->find($id);
        $this->assertEmployeeNotResting($absence->getEmployeeId(), $allowLockedOverride);
        $oldValues = $absence->jsonSerialize();
        $oldStart = clone $absence->getStartDate();
        $oldEnd = clone $absence->getEndDate();

        // Cannot edit cancelled absences
        if ($absence->getStatus() === Absence::STATUS_CANCELLED) {
            throw new ForbiddenException('Cannot edit cancelled absences');
        }

        // #15 Stufe 2: Betriebsschließung entsteht nur über den zentralen Weg —
        // ein bestehender zentraler Eintrag darf den Typ aber behalten.
        if ($type === Absence::TYPE_COMPANY_CLOSURE && $absence->getType() !== Absence::TYPE_COMPANY_CLOSURE) {
            throw new ValidationException(['type' => [$this->l->t('Betriebsschließung kann nur zentral über die Betriebsferien gesetzt werden')]]);
        }

        $startDateObj = $this->parseDateOrFail($startDate, 'startDate');
        $endDateObj = $this->parseDateOrFail($endDate, 'endDate');

        // Validate basic rules
        $errors = $this->validate($absence->getEmployeeId(), $type, $startDateObj, $endDateObj, $id, $scope);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        // #625: serverseitig gedeckelte Krank-Minuten (oder null, wenn n/a).
        $hourlySick = $this->resolveHourlySickMinutes($type, $startDateObj, $endDateObj, $absence->getEmployeeId(), $absenceMinutes);
        $effectiveAbsenceMinutes = $hourlySick['minutes'] ?? null;

        // #625: schaltet der Admin das Feature spaeter aus, darf ein blosses Bearbeiten
        // einer bestehenden stundenweisen Krankmeldung sie nicht still auf Ganztag
        // umwerten. Wert erhalten, solange Typ sick + Einzeltag; nur bei aktivem
        // Feature kann der Client ihn bewusst aendern/leeren.
        if ($hourlySick === null
            && $absence->getAbsenceMinutes() !== null
            && !$this->companySettingsService->isHourlySickEnabled()
            && $type === Absence::TYPE_SICK
            && $startDateObj->format('Y-m-d') === $endDateObj->format('Y-m-d')) {
            // Cap to the (possibly different, e.g. after a date change) target day's
            // minutes, same as resolveHourlySickMinutes — otherwise days could exceed
            // 1.0, or silently become 0.0 on a day with no schedule.
            $dayTarget = $this->workScheduleService->getDailyMinutesForDate($absence->getEmployeeId(), $startDateObj);
            $preservedMinutes = min($absence->getAbsenceMinutes(), $dayTarget);
            if ($preservedMinutes > 0) {
                $hourlySick = ['minutes' => $preservedMinutes, 'dayTarget' => $dayTarget];
                $effectiveAbsenceMinutes = $preservedMinutes;
            }
        }

        // #360: a full-day absence must not overlap existing time entries.
        $this->checkTimeEntryConflict($absence->getEmployeeId(), $startDateObj, $endDateObj, $scope, $effectiveAbsenceMinutes);

        // Closed-month rules (#148): employees are blocked from any change that
        // touches a closed month (old or new range); HR corrections require a
        // reason and reopen the affected months.
        $rangeStart = min($oldStart, $startDateObj);
        $rangeEnd = max($oldEnd, $endDateObj);
        $lockedMonths = $this->timeEntryService->lockedMonthsInRange($absence->getEmployeeId(), $rangeStart, $rangeEnd);
        $effectiveReason = $this->timeEntryService->requireReasonForLockedMonths($lockedMonths, $allowLockedOverride, $reason);

        // Calculate working days and apply scope (schedule-aware)
        $workingDays = $this->calculateWorkingDays($startDateObj, $endDateObj, $federalState, $absence->getEmployeeId());
        $days = $workingDays * $scope;

        // #625: persisted days reflect the sick share (minutes/daily target).
        if ($hourlySick !== null) {
            $days = $hourlySick['dayTarget'] > 0 ? $hourlySick['minutes'] / $hourlySick['dayTarget'] : 0.0;
        }

        if ($type === Absence::TYPE_VACATION) {
            $this->checkVacationQuota($absence->getEmployeeId(), $startDateObj, $endDateObj, $federalState, $scope, $id);
        }

        $isInformational = in_array($type, [Absence::TYPE_SICK, Absence::TYPE_CHILD_SICK], true);

        $absence->setType($type);
        $absence->setStartDate($startDateObj);
        $absence->setEndDate($endDateObj);
        $absence->setDays((string)$days);
        $absence->setScopeValue($scope);
        $absence->setAbsenceMinutes($effectiveAbsenceMinutes);
        $absence->setNote($note);
        $absence->setUpdatedAt(new DateTime());

        if ($isInformational) {
            // #665: stays approved without a re-approval step, so re-check the
            // running punch here too (same trap as create/approve).
            $this->checkActivePunchConflict($absence);
            // Krankheit/Kind krank bleiben approved (kein Re-Approval noetig)
            $absence->setStatus(Absence::STATUS_APPROVED);
            $absence->setApprovedAt(new DateTime());
            $absence->setApprovedBy(null);
        } else {
            // Urlaub & Co: Re-Approval erforderlich
            $absence->setStatus(Absence::STATUS_PENDING);
            $absence->setApprovedBy(null);
            $absence->setApprovedAt(null);
        }

        $absence = $this->absenceMapper->update($absence);

        // Audit log (record the HR correction reason when present)
        if ($currentUserId) {
            $auditReason = $this->timeEntryService->auditReason($effectiveReason, $allowLockedOverride, $reason);
            $newValues = $absence->jsonSerialize();
            if ($auditReason !== null) {
                $newValues['reason'] = $auditReason;
            }
            $this->auditLogService->logUpdate($currentUserId, 'absence', $absence->getId(), $oldValues, $newValues);
        }

        // HR correction in a closed month: reopen the affected time-entry months.
        if ($effectiveReason !== null) {
            foreach ($lockedMonths as [$lockedYear, $lockedMonth]) {
                $this->timeEntryService->reopenMonth($absence->getEmployeeId(), $lockedYear, $lockedMonth, $effectiveReason, $currentUserId);
            }
        }

        return $absence;
    }

    /**
     * @throws NotFoundException
     * @throws ValidationException
     * @throws ForbiddenException
     */
    public function delete(int $id, string $currentUserId = '', ?string $reason = null, bool $allowLockedOverride = false): void {
        $absence = $this->find($id);
        $this->assertEmployeeNotResting($absence->getEmployeeId(), $allowLockedOverride);

        // Closed-month rules (#148): block employees, require a reason for HR corrections.
        $lockedMonths = $this->timeEntryService->lockedMonthsInRange($absence->getEmployeeId(), $absence->getStartDate(), $absence->getEndDate());
        $effectiveReason = $this->timeEntryService->requireReasonForLockedMonths($lockedMonths, $allowLockedOverride, $reason);

        // Approved absences cannot be deleted (they are cancelled instead) — except by
        // an HR correction of a CLOSED month. In open months the rule applies to
        // everyone, regardless of role.
        if (!($allowLockedOverride && !empty($lockedMonths))
            && $absence->getStatus() === Absence::STATUS_APPROVED
            && !in_array($absence->getType(), [Absence::TYPE_SICK, Absence::TYPE_CHILD_SICK], true)) {
            throw new ForbiddenException('Cannot delete approved absences');
        }

        // Audit log (record the HR correction reason when present)
        if ($currentUserId) {
            $auditReason = $this->timeEntryService->auditReason($effectiveReason, $allowLockedOverride, $reason);
            $values = $absence->jsonSerialize();
            if ($auditReason !== null) {
                $values['reason'] = $auditReason;
            }
            $this->auditLogService->logDelete($currentUserId, 'absence', $absence->getId(), $values);
        }

        $this->absenceMapper->delete($absence);

        // HR correction in a closed month: reopen the affected time-entry months.
        if ($effectiveReason !== null) {
            foreach ($lockedMonths as [$lockedYear, $lockedMonth]) {
                $this->timeEntryService->reopenMonth($absence->getEmployeeId(), $lockedYear, $lockedMonth, $effectiveReason, $currentUserId);
            }
        }
    }

    /**
     * @throws NotFoundException
     */
    public function approve(int $id, ?int $approverEmployeeId, string $currentUserId = ''): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();

        if ($absence->getStatus() !== Absence::STATUS_PENDING) {
            throw new ForbiddenException('Can only approve pending absences');
        }

        // #443: re-check the time-entry conflict at approval time. The create-time
        // #360 guard cannot see entries booked AFTER the (still pending) absence,
        // and TimeEntryService only blocks entries against ALREADY-approved
        // absences — so the order "pending full-day absence → book entries →
        // approve" would otherwise create an approved full-day absence coexisting
        // with time entries on the same day, double-counted in the overtime
        // calculation. Block the approval until the entries are removed.
        $this->checkTimeEntryConflict(
            $absence->getEmployeeId(),
            $absence->getStartDate(),
            $absence->getEndDate(),
            $absence->getScopeValue()
        );

        // #665: a running punch is invisible to the committed-entry check above, but
        // approving a full-day absence over it would trap it (punchOut can no longer
        // book). Block the approval until the punch is closed.
        $this->checkActivePunchConflict($absence);

        $absence->setStatus(Absence::STATUS_APPROVED);
        $absence->setApprovedBy($approverEmployeeId);
        $absence->setApprovedAt(new DateTime());
        $absence->setUpdatedAt(new DateTime());

        $absence = $this->absenceMapper->update($absence);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'approve', 'absence', $absence->getId(), $oldValues, $absence->jsonSerialize());
        }

        try {
            $this->notificationService->notifyAbsenceApproved($absence);
        } catch (\Throwable $e) {
            $this->logger->error('Failed to send absence approval notification', ['exception' => $e]);
        }

        return $absence;
    }

    /**
     * @throws NotFoundException
     */
    public function reject(int $id, string $currentUserId = ''): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();

        if ($absence->getStatus() !== Absence::STATUS_PENDING) {
            throw new ForbiddenException('Can only reject pending absences');
        }

        $absence->setStatus(Absence::STATUS_REJECTED);
        $absence->setUpdatedAt(new DateTime());

        $absence = $this->absenceMapper->update($absence);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'reject', 'absence', $absence->getId(), $oldValues, $absence->jsonSerialize());
        }

        try {
            $this->notificationService->notifyAbsenceRejected($absence);
        } catch (\Throwable $e) {
            $this->logger->error('Failed to send absence rejection notification', ['exception' => $e]);
        }

        return $absence;
    }

    /**
     * @throws NotFoundException
     */
    public function cancel(int $id, string $currentUserId = ''): Absence {
        $absence = $this->find($id);
        $oldValues = $absence->jsonSerialize();
        $wasInformational = in_array($absence->getType(), [Absence::TYPE_SICK, Absence::TYPE_CHILD_SICK], true);

        $absence->setStatus(Absence::STATUS_CANCELLED);
        $absence->setUpdatedAt(new DateTime());

        $absence = $this->absenceMapper->update($absence);

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->log($currentUserId, 'cancel', 'absence', $absence->getId(), $oldValues, $absence->jsonSerialize());
        }

        // Fuer Krankheit/Kind krank: Vorgesetzten ueber Stornierung informieren
        if ($wasInformational) {
            try {
                $this->notificationService->notifyAbsenceCancelled($absence);
            } catch (\Throwable $e) {
                $this->logger->error('Failed to send absence_cancelled notification', ['exception' => $e]);
            }
        }

        return $absence;
    }

    /**
     * Get vacation statistics for an employee in a given year
     */
    public function getVacationStats(int $employeeId, int $year, float $totalVacationDays): array {
        $federalState = $this->employeeMapper->find($employeeId)->getFederalState();

        // Overlap query + per-year day split (#439): a vacation spanning the year
        // boundary is counted only with the portion that falls into this year.
        $usedDays = 0.0;
        $pendingDays = 0.0;
        foreach ($this->absenceMapper->findByEmployeeAndYear($employeeId, $year) as $absence) {
            if ($absence->getType() !== Absence::TYPE_VACATION) {
                continue;
            }
            $daysInYear = $this->vacationDaysInYear($absence, $year, $federalState);
            if ($absence->getStatus() === Absence::STATUS_APPROVED) {
                $usedDays += $daysInYear;
            } elseif ($absence->getStatus() === Absence::STATUS_PENDING) {
                $pendingDays += $daysInYear;
            }
        }

        return [
            'total' => $totalVacationDays,
            'used' => $usedDays,
            'pending' => $pendingDays,
            'remaining' => $totalVacationDays - $usedDays,
        ];
    }

    /**
     * Calculate number of working days between two dates.
     * Schedule-aware: uses the employee's work schedule to determine which days are working days.
     * Falls back to Mon-Fri if no employeeId is available.
     */
    public function calculateWorkingDays(DateTime $startDate, DateTime $endDate, string $federalState, ?int $employeeId = null): float {
        // #438: make sure the range's holidays exist before subtracting them —
        // otherwise a holiday in a never-generated year/state counts as a working
        // (and thus deducted) day.
        $this->holidayService->ensureHolidaysForRange($startDate, $endDate, $federalState);

        if ($employeeId !== null) {
            // Use schedule-aware calculation
            $holidays = $this->holidayMapper->findHolidaysInRange($startDate, $endDate, $federalState);
            return $this->workScheduleService->countWorkingDays($employeeId, $startDate, $endDate, $holidays);
        }

        // Fallback: standard Mon-Fri calculation
        $days = 0;
        $current = clone $startDate;

        while ($current <= $endDate) {
            $dayOfWeek = (int)$current->format('N');

            // Skip weekends (6 = Saturday, 7 = Sunday)
            if ($dayOfWeek < 6) {
                // Check for holidays
                if (!$this->holidayMapper->isHoliday($current, $federalState)) {
                    $days++;
                }
            }

            $current->modify('+1 day');
        }

        return $days;
    }

    /**
     * Vacation working days of an absence that fall WITHIN the given calendar year.
     *
     * This is the single source of truth for "how many vacation days does this
     * absence count towards year X". For an absence fully contained in the year
     * it is the stored `days`; for one spanning the year boundary (e.g. a
     * Christmas→New Year vacation) only the clipped, in-year portion is counted —
     * schedule- and holiday-aware — so the days are split across both years and
     * never counted twice (#439). All per-year vacation counting must go through
     * this method.
     */
    public function vacationDaysInYear(Absence $absence, int $year, string $federalState): float {
        $yearStart = new DateTime("$year-01-01");
        $yearEnd = new DateTime("$year-12-31");
        $start = $absence->getStartDate();
        $end = $absence->getEndDate();

        // No overlap with the year at all.
        if ($end < $yearStart || $start > $yearEnd) {
            return 0.0;
        }
        // Fully within the year → the stored value already reflects it exactly.
        if ($start >= $yearStart && $end <= $yearEnd) {
            return (float)$absence->getDays();
        }
        // Spans the year boundary → count only the clipped, in-year working days.
        $clipStart = $start < $yearStart ? $yearStart : $start;
        $clipEnd = $end > $yearEnd ? $yearEnd : $end;
        return $this->calculateWorkingDays($clipStart, $clipEnd, $federalState, $absence->getEmployeeId())
            * $absence->getScopeValue();
    }

    /**
     * #360: A full-day absence is logically incompatible with time entries on the
     * same day — you cannot work and take the whole day off, and the overtime
     * would be counted twice (the absence consumes the daily target while the
     * booked work credits the actual time). Block creation/edit when the covered
     * range already contains time entries.
     *
     * Half-day absences (scope < 1.0) are deliberately allowed to coexist: the
     * overtime calculation handles the reduced target correctly. The overlap is
     * surfaced as a non-blocking day warning in the monthly report instead
     * (ReportController::buildDayWarnings).
     *
     * @throws ValidationException
     */
    /**
     * #625 stundenweise Krank: liefert die serverseitig gedeckelten Krank-Minuten
     * samt Tagessoll (fuer die days-Berechnung, spart eine zweite DB-Abfrage) oder
     * null, wenn der Fall nicht zutrifft. Server ist Autoritaet: nur bei aktivem
     * Feature, Typ sick, Einzeltag und positivem Wert; gedeckelt auf das Tagessoll.
     *
     * @return array{minutes: int, dayTarget: int}|null
     */
    private function resolveHourlySickMinutes(string $type, DateTime $startDate, DateTime $endDate, int $employeeId, ?int $absenceMinutes): ?array {
        if ($absenceMinutes === null || $absenceMinutes <= 0) {
            return null;
        }
        if (!$this->companySettingsService->isHourlySickEnabled()) {
            return null;
        }
        if ($type !== Absence::TYPE_SICK) {
            return null;
        }
        if ($startDate->format('Y-m-d') !== $endDate->format('Y-m-d')) {
            return null;
        }
        $dayTarget = $this->workScheduleService->getDailyMinutesForDate($employeeId, $startDate);
        $capped = min($absenceMinutes, $dayTarget);
        return $capped > 0 ? ['minutes' => $capped, 'dayTarget' => $dayTarget] : null;
    }

    private function checkTimeEntryConflict(int $employeeId, DateTime $startDate, DateTime $endDate, float $scope, ?int $absenceMinutes = null): void {
        // #625: stundenweise Krank (absenceMinutes gesetzt) koexistiert wie ein Halbtag.
        if ($absenceMinutes !== null) {
            return;
        }
        // Half-day absences may coexist with time entries — no hard block.
        if ($scope < 1.0) {
            return;
        }

        $entries = $this->timeEntryService->findByEmployeeAndDateRange($employeeId, $startDate, $endDate);
        if (empty($entries)) {
            return;
        }

        // Collect the distinct conflicting days for a helpful error message.
        $dates = [];
        foreach ($entries as $entry) {
            $entryDate = $entry->getDate();
            if ($entryDate) {
                $dates[$entryDate->format('Y-m-d')] = $entryDate->format('d.m.Y');
            }
        }
        ksort($dates);

        throw new ValidationException([
            'timeEntryConflict' => [$this->l->t(
                'An folgenden Tagen sind bereits Zeiteinträge erfasst: %s. Eine ganztägige Abwesenheit ist dort nicht möglich. Bitte zuerst die Zeiteinträge entfernen.',
                [implode(', ', array_values($dates))]
            )],
        ]);
    }

    /**
     * #665: block approving a full-day absence while the employee has a running
     * punch on a day the absence covers. Otherwise the punch is trapped: punchOut()
     * books through create(), which blocks a full-day absence, the transaction rolls
     * back, and the open punch cannot be closed until the absence is cancelled.
     *
     * Mirrors checkTimeEntryConflict's coexistence rules — hourly (absenceMinutes)
     * and half-day absences never block work, so a punch is fine there. And a
     * vacation day with emergency work enabled is deliberately allowed: once
     * approved, the running punch becomes emergency work (#664/#626) and punchOut()
     * succeeds, so there is no trap to prevent.
     */
    private function checkActivePunchConflict(Absence $absence): void {
        if ($absence->getAbsenceMinutes() !== null || $absence->getScopeValue() < 1.0) {
            return;
        }
        if ($absence->getType() === Absence::TYPE_VACATION && $this->companySettingsService->isEmergencyWorkEnabled()) {
            return;
        }

        $punch = $this->activePunchMapper->findByEmployeeOrNull($absence->getEmployeeId());
        if ($punch === null) {
            return;
        }

        // Compare calendar days as Y-m-d strings, NOT DateTime instants: the punch
        // day is in the local zone while the absence dates are UTC-midnight, so a
        // setTime()+instant comparison would place local midnight two hours before
        // UTC midnight and silently drop the conflict (found live in a UTC+2 zone).
        // Formatting each in its own zone yields the intended calendar day, and
        // lexicographic Y-m-d order equals chronological order.
        $punchLocal = $this->punchLocalDate($punch);
        $punchDay = $punchLocal->format('Y-m-d');
        if ($punchDay < $absence->getStartDate()->format('Y-m-d')
            || $punchDay > $absence->getEndDate()->format('Y-m-d')) {
            return;
        }

        throw new ValidationException([
            'activePunchConflict' => [$this->l->t(
                'Der Mitarbeiter hat am %s eine laufende Stempelung. Bitte zuerst die Stempelung beenden, dann die ganztägige Abwesenheit genehmigen.',
                [$punchLocal->format('d.m.Y')]
            )],
        ]);
    }

    /**
     * The running punch's local calendar day. Stored datetimes are UTC wall-clock
     * digits hydrated with the PHP default timezone (see ActivePunch::jsonSerialize
     * and PunchService); reinterpret them as UTC, then convert to the configured
     * local zone so the day is correct regardless of the server's default timezone.
     */
    private function punchLocalDate(ActivePunch $punch): DateTime {
        $stored = $punch->getStartedAt();
        $utc = DateTime::createFromFormat('Y-m-d H:i:s', $stored->format('Y-m-d H:i:s'), new DateTimeZone('UTC')) ?: $stored;
        return $utc->setTimezone($this->dateTimeZone->getTimeZone());
    }

    /**
     * Enforce the yearly vacation quota for a new/edited absence. Checked per
     * calendar year the request touches: a vacation spanning the year boundary
     * consumes each year's quota only with its in-year portion (#439), so the
     * quota is neither over- nor under-counted.
     */
    private function checkVacationQuota(
        int $employeeId,
        DateTime $startDate,
        DateTime $endDate,
        string $federalState,
        float $scope,
        ?int $excludeId = null
    ): void {
        $startYear = (int)$startDate->format('Y');
        $endYear = (int)$endDate->format('Y');

        for ($year = $startYear; $year <= $endYear; $year++) {
            $yearStart = new DateTime("$year-01-01");
            $yearEnd = new DateTime("$year-12-31");
            $clipStart = $startDate < $yearStart ? $yearStart : $startDate;
            $clipEnd = $endDate > $yearEnd ? $yearEnd : $endDate;

            $requestedInYear = $this->calculateWorkingDays($clipStart, $clipEnd, $federalState, $employeeId) * $scope;
            if ($requestedInYear <= 0) {
                continue;
            }

            $remaining = $this->remainingVacationDays($employeeId, $year, $federalState, $excludeId);
            if ($requestedInYear > $remaining) {
                throw new ValidationException([
                    'vacationQuota' => [$this->l->t(
                        'Nicht genügend Urlaubstage. Verfügbar: %s, beantragt: %s.',
                        [
                            number_format(max(0, $remaining), 1, '.', ''),
                            number_format($requestedInYear, 1, '.', ''),
                        ]
                    )],
                ]);
            }
        }
    }

    /**
     * The vacation quota of one calendar year, as every part of the app must see
     * it. This is the single place where the three components are combined:
     *
     *  - base entitlement from the year's own work-schedule profile
     *    (#501 — the employee cache field only ever holds today's profile),
     *  - plus the previous-year carryover (#500), counted exactly, including
     *    half days (#525),
     *  - minus the days already used in the entry year (#522).
     *
     * Callers (vacation overview, quota check when requesting, Betriebsferien,
     * yearly report) used to assemble this themselves and drifted apart; #500 and
     * #501 were both symptoms of exactly that.
     */
    public function effectiveVacationDays(int $employeeId, int $year): float {
        // #525: the carryover is stored and entered with half-day precision
        // (step 0.5, DECIMAL(4,1)); count it exactly instead of rounding, so the
        // displayed and the charged carryover match in balance and quota check.
        $carryover = $this->carryoverService->getVacationCarryoverDays($employeeId, $year);
        $used = $this->vacationDaysUsedInYear($employeeId, $year);
        $fullYear = (float)$this->workScheduleService->getVacationDaysForYear($employeeId, $year);

        $employee = $this->employeeMapper->find($employeeId);
        $entryDate = $employee->getEntryDate();
        $isEntryYear = $entryDate !== null && (int)$entryDate->format('Y') === $year;

        // #590: a genuine new hire in the entry year (not a takeover) only accrues
        // Teilurlaub (§ 5), capped by the still-open annual entitlement (§ 6,
        // "already granted elsewhere" = $used) and never negative. A takeover /
        // continuation (vacation_transferred) keeps the full annual entitlement
        // minus already-used, exactly as before. Every existing employee with an
        // entry date is migrated to takeover, so no current/historical value moves.
        if ($isEntryYear && !$employee->getVacationTransferred()) {
            $teilurlaub = (float)$this->workScheduleService->getVacationDaysForEntryYear($employeeId, $year);
            return max(0.0, min($teilurlaub, $fullYear - $used)) + $carryover;
        }

        return $fullYear + $carryover - $used;
    }

    /**
     * #522: days already used in the year the employee joined — at a previous
     * employer, or before the company moved to this app. The value belongs to
     * that one year only; every later year gets the full entitlement.
     *
     * Deliberately exact: half days are not rounded (same as the carryover).
     */
    public function vacationDaysUsedInYear(int $employeeId, int $year): float {
        $employee = $this->employeeMapper->find($employeeId);
        $entryDate = $employee->getEntryDate();

        if ($entryDate === null || (int)$entryDate->format('Y') !== $year) {
            return 0.0;
        }

        return $employee->getVacationDaysUsedFloat();
    }

    /**
     * Remaining vacation days of one calendar year: quota minus the in-year
     * portion of all approved + pending vacation entries (#439). May be
     * negative after an OVERAGE_NEGATIVE booking (#15 Stufe 2).
     */
    private function remainingVacationDays(int $employeeId, int $year, string $federalState, ?int $excludeId = null): float {
        $totalVacationDays = $this->effectiveVacationDays($employeeId, $year);

        $usedDays = 0.0;
        foreach ($this->absenceMapper->findByEmployeeAndYear($employeeId, $year) as $absence) {
            if ($absence->getType() !== Absence::TYPE_VACATION) {
                continue;
            }
            // #443: only APPROVED + PENDING consume quota (matches this method's
            // docstring and getVacationStats). Previously only CANCELLED was
            // skipped, so a REJECTED request permanently ate quota and wrongly
            // blocked later bookings / mis-classified Betriebsferien days.
            if ($absence->getStatus() !== Absence::STATUS_APPROVED
                && $absence->getStatus() !== Absence::STATUS_PENDING) {
                continue;
            }
            if ($excludeId !== null && $absence->getId() === $excludeId) {
                continue;
            }
            $usedDays += $this->vacationDaysInYear($absence, $year, $federalState);
        }

        return $totalVacationDays - $usedDays;
    }

    private function validate(int $employeeId, string $type, DateTime $startDate, DateTime $endDate, ?int $excludeId = null, float $scope = 1.0): array {
        $errors = [];

        if (!array_key_exists($type, Absence::TYPES)) {
            $errors['type'] = [$this->l->t('Ungültige Abwesenheitsart')];
        }

        if ($startDate > $endDate) {
            $errors['endDate'] = [$this->l->t('Enddatum muss nach dem Startdatum liegen')];
        }

        // Scope must be between 0 and 1
        if ($scope < 0 || $scope > 1) {
            $errors['scope'] = [$this->l->t('Scope muss zwischen 0 und 1 liegen')];
        }

        // Half day (scope < 1) must be single day
        if ($scope < 1.0 && $startDate->format('Y-m-d') !== $endDate->format('Y-m-d')) {
            $errors['scope'] = [$this->l->t('Halber Tag ist nur für einen einzelnen Tag möglich')];
        }

        // Check for overlapping absences. #443: only a STANDING absence
        // (pending or approved) blocks — a REJECTED request means the employee is
        // not actually absent (same reasoning blockedDatesInPeriod already
        // applies). findOverlapping already excludes CANCELLED at the query level.
        $overlapping = $this->absenceMapper->findOverlapping($employeeId, $startDate, $endDate, $excludeId);
        $blocking = array_filter(
            $overlapping,
            static fn (Absence $a): bool => $a->getStatus() === Absence::STATUS_APPROVED
                || $a->getStatus() === Absence::STATUS_PENDING
        );
        if (!empty($blocking)) {
            $errors['startDate'] = [$this->l->t('Es existiert bereits eine Abwesenheit in diesem Zeitraum')];
        }

        return $errors;
    }

    /**
     * Get absence overview for all visible employees in a given month.
     *
     * @param int[] $subtreeEmployeeIds Employees the viewer supervises (recursively, #347) — shown unmasked incl. pending. Empty for non-supervisors.
     * @return array[] Array of { employeeId, employeeName, absences }
     */
    public function getAbsenceOverview(int $year, int $month, string $currentUserId, bool $isPrivileged, ?int $currentEmployeeId, array $subtreeEmployeeIds = []): array {
        $allEmployees = $this->employeeMapper->findAllActive();
        $result = [];

        foreach ($allEmployees as $employee) {
            if (!$this->isEmployeeVisibleInOverview($employee, $isPrivileged, $currentEmployeeId, $subtreeEmployeeIds)) {
                continue;
            }

            $isTeamMember = in_array($employee->getId(), $subtreeEmployeeIds, true);
            $unmasked = $isPrivileged || $isTeamMember;

            // Status-Kalender (#345): wer den Mitarbeiter unmaskiert sieht (Admin/HR
            // oder dessen Vorgesetzter), bekommt auch OFFENE Anträge (Status
            // 'pending') zur Engpass-Planung. Kollegen sehen unverändert NUR
            // genehmigte Abwesenheiten – kein Datenschutz-Leak offener Anträge.
            if ($unmasked) {
                $absences = array_values(array_filter(
                    $this->absenceMapper->findByEmployeeAndMonth($employee->getId(), $year, $month),
                    static fn($absence) => in_array(
                        $absence->getStatus(),
                        [Absence::STATUS_APPROVED, Absence::STATUS_PENDING],
                        true
                    )
                ));
            } else {
                $absences = $this->absenceMapper->findApprovedByEmployeeAndMonth($employee->getId(), $year, $month);
            }

            $absenceData = [];
            $detail = $employee->getAbsenceDetail();
            foreach ($absences as $absence) {
                $data = $absence->jsonSerialize();

                if (!$unmasked && $detail !== 'detailed') {
                    $data['type'] = 'absent';
                    $data['typeName'] = 'Abwesend';
                }

                $absenceData[] = $data;
            }

            $result[] = [
                'employeeId' => $employee->getId(),
                'employeeName' => $employee->getFullName(),
                'absences' => $absenceData,
            ];
        }

        // Sort by employee name
        usort($result, fn(array $a, array $b) => strcasecmp($a['employeeName'], $b['employeeName']));

        return $result;
    }

    /**
     * Check if an employee's absences should be visible to the current user.
     */
    private function isEmployeeVisibleInOverview(Employee $employee, bool $isPrivileged, ?int $currentEmployeeId, array $subtreeEmployeeIds): bool {
        // Admin/HR see all employees
        if ($isPrivileged) {
            return true;
        }

        // Own entry is always visible
        if ($currentEmployeeId !== null && $employee->getId() === $currentEmployeeId) {
            return true;
        }

        // Supervisors see everyone in their (recursive) subtree, regardless of
        // the per-employee visibility setting.
        if (in_array($employee->getId(), $subtreeEmployeeIds, true)) {
            return true;
        }

        $visibility = $employee->getAbsenceVisibility();

        if ($visibility === 'none') {
            return false;
        }

        if ($visibility === 'team') {
            // Visible only if same supervisor
            if ($currentEmployeeId === null) {
                return false;
            }
            try {
                $currentEmployee = $this->employeeMapper->find($currentEmployeeId);
                // Same team = same supervisor, or the viewer is the supervisor
                return $employee->getSupervisorId() === $currentEmployee->getSupervisorId()
                    || $employee->getSupervisorId() === $currentEmployeeId;
            } catch (DoesNotExistException) {
                return false;
            }
        }

        // 'all' — visible to everyone
        return true;
    }
}
