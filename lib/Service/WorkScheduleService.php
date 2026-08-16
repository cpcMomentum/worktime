<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Db\WorkSchedule;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class WorkScheduleService {

    public function __construct(
        private WorkScheduleMapper $mapper,
        private EmployeeMapper $employeeMapper,
        private TimeEntryMapper $timeEntryMapper,
        private CompanySettingsService $companySettingsService,
        private AuditLogService $auditLogService,
        private LoggerInterface $logger,
        private IL10N $l,
    ) {
    }

    /**
     * @return WorkSchedule[]
     */
    public function findByEmployee(int $employeeId): array {
        return $this->mapper->findByEmployeeId($employeeId);
    }

    /**
     * @throws NotFoundException
     */
    public function find(int $id): WorkSchedule {
        try {
            return $this->mapper->find($id);
        } catch (DoesNotExistException) {
            throw new NotFoundException('Work schedule not found');
        }
    }

    /**
     * Get the active schedule for a specific date.
     * Falls back to a default 40h/5-day schedule if none exists.
     */
    public function getScheduleForDate(int $employeeId, DateTime $date): WorkSchedule {
        try {
            return $this->mapper->findForDate($employeeId, $date);
        } catch (DoesNotExistException) {
            // Fallback: create a default in-memory schedule (not persisted)
            $schedule = new WorkSchedule();
            $schedule->setEmployeeId($employeeId);
            $schedule->setValidFrom(new DateTime('2020-01-01'));
            $schedule->setMonHours('8.00');
            $schedule->setTueHours('8.00');
            $schedule->setWedHours('8.00');
            $schedule->setThuHours('8.00');
            $schedule->setFriHours('8.00');
            $schedule->setSatHours('0.00');
            $schedule->setSunHours('0.00');
            $schedule->setVacationDays(30);
            return $schedule;
        }
    }

    /**
     * Schedule to SHOW for an employee today (#581).
     *
     * Unlike getScheduleForDate(), which returns the synthetic 40h/30 default as
     * soon as no profile is active *today*, this prefers the employee's earliest
     * profile when they only have future-dated ones - e.g. a new hire whose entry
     * date (and therefore the initial profile's valid_from) lies ahead. Without
     * this, the overview would show 40h/30 until the entry date is reached and the
     * employee could appear to have more leave than they do.
     *
     * Display only: the calculation paths (buildSegments, calculateTargetMinutes)
     * keep using getScheduleForDate() unchanged, so Soll and entitlement - which
     * already clip by entry/exit date elsewhere - are untouched.
     */
    public function getDisplaySchedule(int $employeeId): WorkSchedule {
        try {
            return $this->mapper->findForDate($employeeId, new DateTime());
        } catch (DoesNotExistException) {
            // No profile active today - fall back to the earliest one if any exist.
        }

        $schedules = $this->mapper->findByEmployeeId($employeeId);
        if (!empty($schedules)) {
            usort(
                $schedules,
                static fn (WorkSchedule $a, WorkSchedule $b): int => $a->getValidFrom() <=> $b->getValidFrom(),
            );
            return $schedules[0];
        }

        // Truly profile-less employee: keep the synthetic default.
        return $this->getScheduleForDate($employeeId, new DateTime());
    }

    /**
     * @throws ValidationException
     */
    public function create(
        int $employeeId,
        string $validFrom,
        array $dayHours,
        int $vacationDays,
        string $currentUserId
    ): WorkSchedule {
        $errors = $this->validate($dayHours, $vacationDays);

        // #453: Rückdatierung ist erlaubt, solange sie keinen bereits genehmigten
        // Zeitraum verändert und nicht vor dem Eintrittsdatum liegt. Die alte
        // Sperre auf den 1. des aktuellen Monats war zu grob und verhinderte das
        // legitime Nachtragen wechselnder Arbeitszeiten für die Vergangenheit.
        $validFromDate = new DateTime($validFrom);
        $validFromDate->setTime(0, 0, 0);
        [$earliestAllowed, $reason] = $this->earliestValidFrom($employeeId);
        if ($earliestAllowed !== null && $validFromDate < $earliestAllowed) {
            $formatted = $earliestAllowed->format('d.m.Y');
            if ($reason === 'approved') {
                $errors['validFrom'] = [$this->l->t('Gültig-ab darf nicht in einen bereits genehmigten Zeitraum fallen. Frühestens möglich: %s', [$formatted])];
            } else {
                $errors['validFrom'] = [$this->l->t('Gültig-ab darf nicht vor dem Eintrittsdatum liegen (%s)', [$formatted])];
            }
        }

        // Check for duplicate valid_from date
        if (empty($errors['validFrom'])) {
            $existingSchedules = $this->mapper->findByEmployeeId($employeeId);
            foreach ($existingSchedules as $existing) {
                if ($existing->getValidFrom()->format('Y-m-d') === $validFrom) {
                    $errors['validFrom'] = [$this->l->t('Ein Profil mit diesem Gültig-ab Datum existiert bereits')];
                    break;
                }
            }
        }

        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        $schedule = new WorkSchedule();
        $schedule->setEmployeeId($employeeId);
        $schedule->setValidFrom(new DateTime($validFrom));
        $schedule->setMonHours(number_format((float)($dayHours['mon'] ?? 8), 2, '.', ''));
        $schedule->setTueHours(number_format((float)($dayHours['tue'] ?? 8), 2, '.', ''));
        $schedule->setWedHours(number_format((float)($dayHours['wed'] ?? 8), 2, '.', ''));
        $schedule->setThuHours(number_format((float)($dayHours['thu'] ?? 8), 2, '.', ''));
        $schedule->setFriHours(number_format((float)($dayHours['fri'] ?? 8), 2, '.', ''));
        $schedule->setSatHours(number_format((float)($dayHours['sat'] ?? 0), 2, '.', ''));
        $schedule->setSunHours(number_format((float)($dayHours['sun'] ?? 0), 2, '.', ''));
        $schedule->setVacationDays($vacationDays);
        $schedule->setCreatedAt(new DateTime());
        $schedule->setUpdatedAt(new DateTime());

        try {
            $schedule = $this->mapper->insert($schedule);
        } catch (\Exception $e) {
            if (str_contains($e->getMessage(), 'wt_ws_emp_valid_idx') || str_contains($e->getMessage(), 'Unique violation')) {
                throw new ValidationException(['validFrom' => [$this->l->t('Ein Profil mit diesem Gültig-ab Datum existiert bereits')]]);
            }
            throw $e;
        }

        // Sync the employee's cached values from the schedule active today
        $this->syncEmployeeFromActiveSchedule($employeeId);

        if ($currentUserId) {
            $this->auditLogService->logCreate($currentUserId, 'work_schedule', $schedule->getId(), $schedule->jsonSerialize());
        }

        return $schedule;
    }

    /**
     * #453: earliest date a new work schedule may become valid. Back-dating is
     * allowed, but must not reach into an already-approved period (its Soll would
     * change retroactively) and must not predate the employee's entry date.
     *
     * Returns [?DateTime $earliest, string $reason] where reason is 'approved'
     * (bound comes from an approved period), 'entry' (bound comes from the entry
     * date), or '' (no lower bound at all).
     *
     * @return array{0: ?DateTime, 1: string}
     */
    private function earliestValidFrom(int $employeeId): array {
        $earliest = null;
        $reason = '';

        // Entry date lower bound.
        try {
            $employee = $this->employeeMapper->find($employeeId);
            $entryDate = $employee->getEntryDate();
            if ($entryDate !== null) {
                $earliest = (clone $entryDate)->setTime(0, 0, 0);
                $reason = 'entry';
            }
        } catch (DoesNotExistException) {
            // No employee row -> no entry-date bound.
        }

        // Approved-period lower bound: a schedule may start at the earliest on the
        // day AFTER the last approved entry, so approved months stay untouched.
        $lastApproved = $this->timeEntryMapper->findLatestApprovedDate($employeeId);
        if ($lastApproved !== null) {
            $dayAfterApproved = (clone $lastApproved)->modify('+1 day')->setTime(0, 0, 0);
            if ($earliest === null || $dayAfterApproved > $earliest) {
                $earliest = $dayAfterApproved;
                $reason = 'approved';
            }
        }

        return [$earliest, $reason];
    }

    /**
     * @throws NotFoundException
     * @throws ValidationException
     */
    public function update(
        int $id,
        int $employeeId,
        array $dayHours,
        int $vacationDays,
        string $currentUserId
    ): WorkSchedule {
        $schedule = $this->find($id);

        if ($schedule->getEmployeeId() !== $employeeId) {
            throw new NotFoundException('Work schedule not found');
        }
        $oldValues = $schedule->jsonSerialize();

        $errors = $this->validate($dayHours, $vacationDays);
        if (!empty($errors)) {
            throw new ValidationException($errors);
        }

        $schedule->setMonHours(number_format((float)($dayHours['mon'] ?? 8), 2, '.', ''));
        $schedule->setTueHours(number_format((float)($dayHours['tue'] ?? 8), 2, '.', ''));
        $schedule->setWedHours(number_format((float)($dayHours['wed'] ?? 8), 2, '.', ''));
        $schedule->setThuHours(number_format((float)($dayHours['thu'] ?? 8), 2, '.', ''));
        $schedule->setFriHours(number_format((float)($dayHours['fri'] ?? 8), 2, '.', ''));
        $schedule->setSatHours(number_format((float)($dayHours['sat'] ?? 0), 2, '.', ''));
        $schedule->setSunHours(number_format((float)($dayHours['sun'] ?? 0), 2, '.', ''));
        $schedule->setVacationDays($vacationDays);
        $schedule->setUpdatedAt(new DateTime());

        $schedule = $this->mapper->update($schedule);

        $this->syncEmployeeFromActiveSchedule($schedule->getEmployeeId());

        if ($currentUserId) {
            $this->auditLogService->logUpdate($currentUserId, 'work_schedule', $schedule->getId(), $oldValues, $schedule->jsonSerialize());
        }

        return $schedule;
    }

    /**
     * @throws NotFoundException
     * @throws ForbiddenException
     */
    public function delete(int $id, int $employeeId, string $currentUserId): void {
        $schedule = $this->find($id);

        if ($schedule->getEmployeeId() !== $employeeId) {
            throw new NotFoundException('Work schedule not found');
        }

        // Cannot delete the last schedule
        $allSchedules = $this->mapper->findByEmployeeId($schedule->getEmployeeId());
        if (count($allSchedules) <= 1) {
            throw new ForbiddenException('Cannot delete the last work schedule');
        }

        if ($currentUserId) {
            $this->auditLogService->logDelete($currentUserId, 'work_schedule', $schedule->getId(), $schedule->jsonSerialize());
        }

        $this->mapper->delete($schedule);

        // Re-sync employee from the schedule that is now active today
        $this->syncEmployeeFromActiveSchedule($schedule->getEmployeeId());
    }

    /**
     * Delete all schedules for an employee.
     */
    public function deleteByEmployeeId(int $employeeId): void {
        $this->mapper->deleteByEmployeeId($employeeId);
    }

    // ---- Calculation methods ----

    /**
     * Calculate target minutes for a date range, respecting schedule changes and holidays.
     *
     * @param int $employeeId
     * @param DateTime $start
     * @param DateTime $end
     * @param array $holidays Holiday objects with getDate() and getScopeValue()
     * @return int Target minutes
     */
    public function calculateTargetMinutes(int $employeeId, DateTime $start, DateTime $end, array $holidays): int {
        $segments = $this->buildSegments($employeeId, $start, $end);

        // Build holiday lookup
        $holidayMap = [];
        foreach ($holidays as $holiday) {
            $holidayMap[$holiday->getDate()->format('Y-m-d')] = $holiday;
        }

        $totalMinutes = 0;

        foreach ($segments as $segment) {
            /** @var WorkSchedule $schedule */
            $schedule = $segment['schedule'];
            $segStart = $segment['start'];
            $segEnd = $segment['end'];

            $current = clone $segStart;
            while ($current <= $segEnd) {
                $dow = (int)$current->format('N');
                $dateStr = $current->format('Y-m-d');
                $hours = $schedule->getHoursForDayOfWeek($dow);

                if ($hours > 0) {
                    if (isset($holidayMap[$dateStr])) {
                        $holidayScope = $holidayMap[$dateStr]->getScopeValue();
                        // scope=1.0 = full holiday → 0 hours; scope=0.5 = half holiday → 50% hours
                        $totalMinutes += (int)round($hours * (1.0 - $holidayScope) * 60);
                    } else {
                        $totalMinutes += (int)round($hours * 60);
                    }
                }

                $current->modify('+1 day');
            }
        }

        return $totalMinutes;
    }

    /**
     * Count working days for a date range, respecting schedule changes and holidays.
     *
     * @return float Working days (fractional for half-holidays)
     */
    public function countWorkingDays(int $employeeId, DateTime $start, DateTime $end, array $holidays): float {
        $segments = $this->buildSegments($employeeId, $start, $end);

        $holidayMap = [];
        foreach ($holidays as $holiday) {
            $holidayMap[$holiday->getDate()->format('Y-m-d')] = $holiday;
        }

        $workingDays = 0.0;

        foreach ($segments as $segment) {
            /** @var WorkSchedule $schedule */
            $schedule = $segment['schedule'];
            $segStart = $segment['start'];
            $segEnd = $segment['end'];

            $current = clone $segStart;
            while ($current <= $segEnd) {
                $dow = (int)$current->format('N');
                $dateStr = $current->format('Y-m-d');

                if ($schedule->isWorkingDay($dow)) {
                    if (isset($holidayMap[$dateStr])) {
                        $workingDays += (1.0 - $holidayMap[$dateStr]->getScopeValue());
                    } else {
                        $workingDays += 1.0;
                    }
                }

                $current->modify('+1 day');
            }
        }

        return $workingDays;
    }

    /**
     * Get the daily target minutes for a specific date.
     */
    public function getDailyMinutesForDate(int $employeeId, DateTime $date): int {
        $schedule = $this->getScheduleForDate($employeeId, $date);
        $dow = (int)$date->format('N');
        return (int)round($schedule->getHoursForDayOfWeek($dow) * 60);
    }

    /**
     * Whole-day vacation entitlement for a calendar year (rounded per
     * getVacationEntitlementForYear + § 5 Abs. 2 BUrlG).
     */
    public function getVacationDaysForYear(int $employeeId, int $year): int {
        return (int)round($this->getVacationEntitlementForYear($employeeId, $year));
    }

    /**
     * Exact (unrounded) vacation entitlement for a year, computed
     * zeitabschnittsweise across the work-schedule profiles that apply during
     * the year (#571, BAG 19.03.2019 - 9 AZR 406/17; EuGH C-415/12, C-219/14).
     *
     * Each vacation_days on a profile is read as the full-year entitlement of
     * that day pattern (e.g. 24 for a 4-day week, 30 for a 5-day week). The
     * year's entitlement is the sum of each segment's full-year value weighted
     * by the share of scheduled working days that fall into the segment:
     *
     *   sum( profil.vacationDays * Arbeitstage_im_Abschnitt / Arbeitstage_im_vollen_Jahr_des_Musters )
     *
     * Weighting is by scheduled working days, not calendar days, matching the
     * legal reference (... x arbeitspflichtige Tage / 260) and the day-by-day
     * logic of calculateTargetMinutes. Public holidays are deliberately NOT
     * netted out here - they reduce the Soll, not the contractual leave rhythm.
     *
     * This replaces the earlier reference-date pick (#281), which took a single
     * profile's value and therefore ignored mid-year pensum changes. The reason
     * #281 avoided a blend - it disagreed with the per-profile editor - is
     * resolved by reading each profile's value as its own full-year entitlement
     * and labelling the year total as a distinct figure.
     */
    public function getVacationEntitlementForYear(int $employeeId, int $year): float {
        $yearStart = new DateTime("$year-01-01");
        $yearEnd = new DateTime("$year-12-31");

        $total = 0.0;
        foreach ($this->buildSegments($employeeId, $yearStart, $yearEnd) as $segment) {
            /** @var WorkSchedule $schedule */
            $schedule = $segment['schedule'];
            $workingDaysFullYear = $this->countScheduledWorkingDays($schedule, $yearStart, $yearEnd);
            if ($workingDaysFullYear <= 0) {
                continue; // a profile without working days carries no entitlement
            }
            $workingDaysInSegment = $this->countScheduledWorkingDays($schedule, $segment['start'], $segment['end']);
            $total += $schedule->getVacationDays() * $workingDaysInSegment / $workingDaysFullYear;
        }

        return $total;
    }

    /**
     * Scheduled working days of one profile's day pattern within [start, end],
     * inclusive. No holiday adjustment - see getVacationEntitlementForYear.
     */
    private function countScheduledWorkingDays(WorkSchedule $schedule, DateTime $start, DateTime $end): int {
        $count = 0;
        $current = clone $start;
        while ($current <= $end) {
            if ($schedule->isWorkingDay((int)$current->format('N'))) {
                $count++;
            }
            $current->modify('+1 day');
        }
        return $count;
    }

    /**
     * Check if an employee had a work schedule active in a given year.
     * Returns true if any schedule has valid_from <= Dec 31 of that year.
     */
    public function wasActiveInYear(int $employeeId, int $year): bool {
        $schedules = $this->mapper->findByEmployeeId($employeeId);
        $yearEnd = new DateTime("$year-12-31");

        foreach ($schedules as $schedule) {
            if ($schedule->getValidFrom() <= $yearEnd) {
                return true;
            }
        }

        return false;
    }

    // ---- Private helpers ----

    /**
     * Build date segments for a range, each with the applicable schedule.
     *
     * @return array<array{schedule: WorkSchedule, start: DateTime, end: DateTime}>
     */
    private function buildSegments(int $employeeId, DateTime $start, DateTime $end): array {
        $schedules = $this->mapper->findByEmployeeAndDateRange($employeeId, $start, $end);

        if (empty($schedules)) {
            // Fallback: use default schedule
            return [[
                'schedule' => $this->getScheduleForDate($employeeId, $start),
                'start' => clone $start,
                'end' => clone $end,
            ]];
        }

        $segments = [];
        $scheduleCount = count($schedules);

        for ($i = 0; $i < $scheduleCount; $i++) {
            $schedule = $schedules[$i];
            $segStart = $schedule->getValidFrom() > $start ? clone $schedule->getValidFrom() : clone $start;

            if ($i + 1 < $scheduleCount) {
                $nextValidFrom = clone $schedules[$i + 1]->getValidFrom();
                $nextValidFrom->modify('-1 day');
                $segEnd = $nextValidFrom < $end ? $nextValidFrom : clone $end;
            } else {
                $segEnd = clone $end;
            }

            if ($segStart <= $segEnd) {
                $segments[] = [
                    'schedule' => $schedule,
                    'start' => $segStart,
                    'end' => $segEnd,
                ];
            }
        }

        // If the earliest schedule starts after our range start, we need a segment for the gap
        if (!empty($schedules) && $schedules[0]->getValidFrom() > $start) {
            $gapEnd = clone $schedules[0]->getValidFrom();
            $gapEnd->modify('-1 day');
            if ($gapEnd >= $start) {
                // Use fallback schedule for dates before the first schedule
                $fallback = $this->getScheduleForDate($employeeId, $start);
                array_unshift($segments, [
                    'schedule' => $fallback,
                    'start' => clone $start,
                    'end' => $gapEnd > $end ? clone $end : $gapEnd,
                ]);
            }
        }

        return $segments;
    }

    /**
     * Sync the employee's cached weeklyHours and vacationDays from the
     * schedule that is active today (newest valid_from <= today).
     *
     * A future-dated schedule must not overwrite the stored values, otherwise
     * the employee overview would show a value that does not yet apply.
     */
    private function syncEmployeeFromActiveSchedule(int $employeeId): void {
        try {
            $active = $this->getScheduleForDate($employeeId, new DateTime());
            $employee = $this->employeeMapper->find($employeeId);
            $employee->setWeeklyHours((string)$active->getWeeklyHours());
            $employee->setVacationDays($active->getVacationDays());
            $employee->setUpdatedAt(new DateTime());
            $this->employeeMapper->update($employee);
        } catch (\Exception $e) {
            $this->logger->warning('Failed to sync employee from active schedule: ' . $e->getMessage());
        }
    }

    /**
     * @return array<string, string[]>
     */
    private function validate(array $dayHours, int $vacationDays): array {
        $errors = [];

        $maxDailyHours = $this->companySettingsService->getMaxDailyHours();
        if ($maxDailyHours <= 0) {
            $maxDailyHours = (float)(CompanySetting::DEFAULTS[CompanySetting::KEY_MAX_DAILY_HOURS]);
        }

        $days = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        foreach ($days as $day) {
            $value = (float)($dayHours[$day] ?? 0);
            if ($value < 0 || $value > $maxDailyHours) {
                $errors[$day] = [$this->l->t('Maximale tägliche Arbeitszeit ist %s Stunden (siehe Einstellungen)', [(string)$maxDailyHours])];
            }
        }

        if ($vacationDays < 0 || $vacationDays > 365) {
            $errors['vacationDays'] = ['Vacation days must be between 0 and 365'];
        }

        // Check total weekly hours
        $total = 0;
        foreach ($days as $day) {
            $total += (float)($dayHours[$day] ?? 0);
        }
        if ($total < 0) {
            $errors['weeklyHours'] = ['Total weekly hours must not be negative'];
        }

        return $errors;
    }
}
