<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Db\WorkSchedule;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

class WorkScheduleService {

    public function __construct(
        private WorkScheduleMapper $mapper,
        private EmployeeMapper $employeeMapper,
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

        // valid_from darf nicht vor dem 1. des aktuellen Monats liegen
        $validFromDate = new DateTime($validFrom);
        $firstOfCurrentMonth = new DateTime('first day of this month');
        $firstOfCurrentMonth->setTime(0, 0, 0);
        if ($validFromDate < $firstOfCurrentMonth) {
            $errors['validFrom'] = [$this->l->t('Gültig-ab darf frühestens der 1. des aktuellen Monats sein')];
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

        // Sync employee if this is the latest schedule
        $this->syncEmployeeIfLatest($employeeId, $schedule);

        if ($currentUserId) {
            $this->auditLogService->logCreate($currentUserId, 'work_schedule', $schedule->getId(), $schedule->jsonSerialize());
        }

        return $schedule;
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

        $this->syncEmployeeIfLatest($schedule->getEmployeeId(), $schedule);

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

        // Re-sync employee with the now-latest schedule
        $remaining = $this->mapper->findByEmployeeId($schedule->getEmployeeId());
        if (!empty($remaining)) {
            $this->syncEmployeeIfLatest($schedule->getEmployeeId(), $remaining[0]);
        }
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
     * Get vacation days entitlement for a year.
     * Pro-rates across multiple schedules if profile changes occur mid-year.
     */
    public function getVacationDaysForYear(int $employeeId, int $year): int {
        $jan1 = new DateTime("$year-01-01");
        $dec31 = new DateTime("$year-12-31");
        $segments = $this->buildSegments($employeeId, $jan1, $dec31);

        // Nur ein Profil das ganze Jahr → direkt zurueckgeben
        if (count($segments) === 1) {
            return $segments[0]['schedule']->getVacationDays();
        }

        // Mehrere Profile → anteilig berechnen
        $daysInYear = (int)$jan1->diff($dec31)->days + 1;
        $totalDays = 0.0;

        foreach ($segments as $segment) {
            $daysInSegment = (int)$segment['start']->diff($segment['end'])->days + 1;
            $fraction = $daysInSegment / $daysInYear;
            $totalDays += $segment['schedule']->getVacationDays() * $fraction;
        }

        return (int)round($totalDays);
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
     * If this schedule is the latest (newest valid_from) for the employee,
     * sync the employee's weeklyHours and vacationDays.
     */
    private function syncEmployeeIfLatest(int $employeeId, WorkSchedule $schedule): void {
        try {
            $allSchedules = $this->mapper->findByEmployeeId($employeeId);
            // findByEmployeeId returns DESC by valid_from, so [0] is latest
            if (!empty($allSchedules) && $allSchedules[0]->getId() === $schedule->getId()) {
                $employee = $this->employeeMapper->find($employeeId);
                $employee->setWeeklyHours((string)$schedule->getWeeklyHours());
                $employee->setVacationDays($schedule->getVacationDays());
                $employee->setUpdatedAt(new DateTime());
                $this->employeeMapper->update($employee);
            }
        } catch (\Exception $e) {
            $this->logger->warning('Failed to sync employee from schedule: ' . $e->getMessage());
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
