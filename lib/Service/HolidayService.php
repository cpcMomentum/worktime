<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\Holiday;
use OCA\WorkTime\Db\HolidayMapper;
use OCP\AppFramework\Db\DoesNotExistException;

class HolidayService {

    /**
     * German holidays by federal state
     * Format: 'name' => ['all' => true] for nationwide, or ['states' => ['BY', 'BW', ...]]
     */
    private const FIXED_HOLIDAYS = [
        'Neujahr' => ['month' => 1, 'day' => 1, 'all' => true],
        'Heilige Drei Könige' => ['month' => 1, 'day' => 6, 'states' => ['BY', 'BW', 'ST']],
        'Tag der Arbeit' => ['month' => 5, 'day' => 1, 'all' => true],
        'Mariä Himmelfahrt' => ['month' => 8, 'day' => 15, 'states' => ['BY', 'SL']],
        'Tag der Deutschen Einheit' => ['month' => 10, 'day' => 3, 'all' => true],
        'Reformationstag' => ['month' => 10, 'day' => 31, 'states' => ['BB', 'HB', 'HH', 'MV', 'NI', 'SN', 'ST', 'SH', 'TH']],
        'Allerheiligen' => ['month' => 11, 'day' => 1, 'states' => ['BY', 'BW', 'NW', 'RP', 'SL']],
        '1. Weihnachtstag' => ['month' => 12, 'day' => 25, 'all' => true],
        '2. Weihnachtstag' => ['month' => 12, 'day' => 26, 'all' => true],
    ];

    /**
     * States with Fronleichnam
     */
    private const FRONLEICHNAM_STATES = ['BY', 'BW', 'HE', 'NW', 'RP', 'SL'];

    public function __construct(
        private HolidayMapper $holidayMapper,
        private AuditLogService $auditLogService,
    ) {
    }

    /**
     * @return Holiday[]
     */
    public function findByYearAndState(int $year, string $federalState): array {
        return $this->holidayMapper->findByYearAndState($year, $federalState);
    }

    /**
     * @return Holiday[]
     */
    public function findByMonth(int $year, int $month, string $federalState): array {
        return $this->holidayMapper->findByMonth($year, $month, $federalState);
    }

    /**
     * @throws NotFoundException
     */
    public function find(int $id): Holiday {
        try {
            return $this->holidayMapper->find($id);
        } catch (DoesNotExistException $e) {
            throw new NotFoundException('Holiday not found');
        }
    }

    /**
     * Check if a specific date is a holiday
     */
    public function isHoliday(DateTime $date, string $federalState): bool {
        return $this->holidayMapper->isHoliday($date, $federalState);
    }

    /**
     * Generate all holidays for a year and federal state
     *
     * @return Holiday[]
     */
    public function generateHolidays(int $year, string $federalState, string $currentUserId = ''): array {
        // Delete existing holidays for this year/state
        $this->holidayMapper->deleteByYearAndState($year, $federalState);

        $holidays = [];

        // Add fixed holidays
        foreach (self::FIXED_HOLIDAYS as $name => $config) {
            if ($this->isHolidayInState($config, $federalState)) {
                $holidays[] = $this->createHoliday($year, $config['month'], $config['day'], $name, $federalState);
            }
        }

        // Add Easter-dependent holidays
        $easterSunday = $this->calculateEasterSunday($year);

        // Karfreitag (Good Friday) - 2 days before Easter
        $karfreitag = (clone $easterSunday)->modify('-2 days');
        $holidays[] = $this->createHoliday($year, (int)$karfreitag->format('m'), (int)$karfreitag->format('d'), 'Karfreitag', $federalState);

        // Ostermontag (Easter Monday) - 1 day after Easter
        $ostermontag = (clone $easterSunday)->modify('+1 day');
        $holidays[] = $this->createHoliday($year, (int)$ostermontag->format('m'), (int)$ostermontag->format('d'), 'Ostermontag', $federalState);

        // Christi Himmelfahrt (Ascension Day) - 39 days after Easter
        $himmelfahrt = (clone $easterSunday)->modify('+39 days');
        $holidays[] = $this->createHoliday($year, (int)$himmelfahrt->format('m'), (int)$himmelfahrt->format('d'), 'Christi Himmelfahrt', $federalState);

        // Pfingstmontag (Whit Monday) - 50 days after Easter
        $pfingstmontag = (clone $easterSunday)->modify('+50 days');
        $holidays[] = $this->createHoliday($year, (int)$pfingstmontag->format('m'), (int)$pfingstmontag->format('d'), 'Pfingstmontag', $federalState);

        // Fronleichnam (Corpus Christi) - 60 days after Easter, only in some states
        if (in_array($federalState, self::FRONLEICHNAM_STATES)) {
            $fronleichnam = (clone $easterSunday)->modify('+60 days');
            $holidays[] = $this->createHoliday($year, (int)$fronleichnam->format('m'), (int)$fronleichnam->format('d'), 'Fronleichnam', $federalState);
        }

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logCreate($currentUserId, 'holiday', 0, [
                'year' => $year,
                'federalState' => $federalState,
                'count' => count($holidays),
            ]);
        }

        return $holidays;
    }

    /**
     * Calculate Easter Sunday using the Gauss algorithm
     *
     * The algorithm calculates the date of Easter Sunday for any year
     * in the Gregorian calendar.
     *
     * Known dates for verification:
     * - 2025: April 20
     * - 2026: April 5
     * - 2027: March 28
     * - 2028: April 16
     */
    public function calculateEasterSunday(int $year): DateTime {
        // Gauss algorithm for Easter calculation
        $a = $year % 19;
        $b = intdiv($year, 100);
        $c = $year % 100;
        $d = intdiv($b, 4);
        $e = $b % 4;
        $f = intdiv($b + 8, 25);
        $g = intdiv($b - $f + 1, 3);
        $h = (19 * $a + $b - $d - $g + 15) % 30;
        $i = intdiv($c, 4);
        $k = $c % 4;
        $l = (32 + 2 * $e + 2 * $i - $h - $k) % 7;
        $m = intdiv($a + 11 * $h + 22 * $l, 451);
        $month = intdiv($h + $l - 7 * $m + 114, 31);
        $day = (($h + $l - 7 * $m + 114) % 31) + 1;

        return new DateTime("$year-$month-$day");
    }

    /**
     * Create and save a holiday
     */
    private function createHoliday(int $year, int $month, int $day, string $name, string $federalState): Holiday {
        $holiday = new Holiday();
        $holiday->setDate(new DateTime("$year-$month-$day"));
        $holiday->setName($name);
        $holiday->setFederalState($federalState);
        $holiday->setIsHalfDay(false);
        $holiday->setYear($year);
        $holiday->setCreatedAt(new DateTime());

        return $this->holidayMapper->insert($holiday);
    }

    /**
     * Check if a holiday applies to a specific federal state
     */
    private function isHolidayInState(array $config, string $federalState): bool {
        if (isset($config['all']) && $config['all']) {
            return true;
        }

        if (isset($config['states']) && in_array($federalState, $config['states'])) {
            return true;
        }

        return false;
    }

    /**
     * Count holidays in a date range for a federal state
     */
    public function countHolidaysInRange(DateTime $startDate, DateTime $endDate, string $federalState): int {
        return $this->holidayMapper->countHolidaysInRange($startDate, $endDate, $federalState);
    }

    /**
     * Get holidays in a date range for a federal state
     *
     * @return Holiday[]
     */
    public function findHolidaysInRange(DateTime $startDate, DateTime $endDate, string $federalState): array {
        return $this->holidayMapper->findHolidaysInRange($startDate, $endDate, $federalState);
    }

    /**
     * Check if holidays exist for a year and state
     */
    public function existsForYearAndState(int $year, string $federalState): bool {
        return $this->holidayMapper->existsForYearAndState($year, $federalState);
    }

    /**
     * Get all federal states
     */
    public function getFederalStates(): array {
        return Employee::FEDERAL_STATES;
    }
}
