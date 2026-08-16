<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\Employee;
use OCA\WorkTime\Db\TimeEntryMapper;
use OCA\WorkTime\Db\WorkSchedule;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\ValidationException;
use OCA\WorkTime\Service\WorkScheduleService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Vacation entitlement per year. Superseding #281 (which pinned the value to one
 * reference-date profile), #571 computes it zeitabschnittsweise across the
 * profiles valid in the year, weighted by scheduled working days — the legally
 * required pro-rata at a mid-year pensum change (BAG 19.03.2019 - 9 AZR 406/17).
 */
class WorkScheduleServiceTest extends TestCase {

    private WorkScheduleService $service;
    private WorkScheduleMapper $mapper;
    private EmployeeMapper $employeeMapper;
    private TimeEntryMapper $timeEntryMapper;

    protected function setUp(): void {
        $this->mapper = $this->createMock(WorkScheduleMapper::class);
        $this->employeeMapper = $this->createMock(EmployeeMapper::class);
        $this->timeEntryMapper = $this->createMock(TimeEntryMapper::class);

        $il10n = $this->createMock(IL10N::class);
        $il10n->method('t')->willReturnCallback(
            fn (string $text, array $params = []): string => vsprintf($text, $params)
        );

        $this->service = new WorkScheduleService(
            $this->mapper,
            $this->employeeMapper,
            $this->timeEntryMapper,
            $this->createMock(CompanySettingsService::class),
            $this->createMock(AuditLogService::class),
            $this->createMock(LoggerInterface::class),
            $il10n,
        );
    }

    private function employeeWithEntryDate(?string $entryDate): Employee {
        $e = new Employee();
        $e->setId(1);
        if ($entryDate !== null) {
            $e->setEntryDate(new DateTime($entryDate));
        }
        return $e;
    }

    /** @return array<string, float> */
    private function validHours(): array {
        return ['mon' => 8, 'tue' => 8, 'wed' => 8, 'thu' => 8, 'fri' => 8, 'sat' => 0, 'sun' => 0];
    }

    private function schedule(int $vacationDays): WorkSchedule {
        return $this->scheduleAt('2020-01-01', $vacationDays, 5);
    }

    /**
     * Build a profile with a given valid-from, full-year entitlement and number
     * of working days (the first $workingDays of Mon..Fri get 8h, the rest 0).
     */
    private function scheduleAt(string $validFrom, int $vacationDays, int $workingDays): WorkSchedule {
        $s = new WorkSchedule();
        $s->setEmployeeId(1);
        $s->setValidFrom(new DateTime($validFrom));
        $s->setVacationDays($vacationDays);
        $setters = ['setMonHours', 'setTueHours', 'setWedHours', 'setThuHours', 'setFriHours'];
        foreach ($setters as $i => $setter) {
            $s->$setter($i < $workingDays ? '8.00' : '0.00');
        }
        $s->setSatHours('0.00');
        $s->setSunHours('0.00');
        return $s;
    }

    /**
     * #571: a constant profile across the whole year yields exactly its own
     * full-year entitlement (regression guard — the blend must not distort the
     * simple case).
     */
    public function testConstantProfileYieldsItsOwnEntitlement(): void {
        $pastYear = (int)(new DateTime())->format('Y') - 1;
        $this->mapper->method('findByEmployeeAndDateRange')
            ->willReturn([$this->scheduleAt(($pastYear - 5) . '-01-01', 30, 5)]);

        $this->assertSame(30.0, $this->service->getVacationEntitlementForYear(1, $pastYear));
        $this->assertSame(30, $this->service->getVacationDaysForYear(1, $pastYear));
    }

    /**
     * #571: the core fix. A mid-year pensum change (4-day/24 in H1 -> full-time
     * 5-day/30 in H2) must produce the time-weighted blend (~27), NOT the
     * year-end profile's value (30) that the old reference-date logic returned.
     * BAG 19.03.2019 - 9 AZR 406/17.
     */
    public function testBlendsAcrossMidYearPensumChange(): void {
        $pastYear = (int)(new DateTime())->format('Y') - 1;
        $this->mapper->method('findByEmployeeAndDateRange')->willReturn([
            $this->scheduleAt($pastYear . '-01-01', 24, 4), // H1: 4-day week
            $this->scheduleAt($pastYear . '-07-01', 30, 5), // H2: full time
        ]);

        $entitlement = $this->service->getVacationEntitlementForYear(1, $pastYear);

        // Strictly between the two full-year values -> it is a blend, not a pick.
        $this->assertGreaterThan(24.0, $entitlement);
        $this->assertLessThan(30.0, $entitlement);
        // Half/half split lands at ~27; certainly not the old stichtag value 30.
        $this->assertEqualsWithDelta(27.0, $entitlement, 0.6);
        $this->assertSame(27, $this->service->getVacationDaysForYear(1, $pastYear));
    }

    /**
     * With no persisted schedule, buildSegments falls back to the default
     * profile (30 days, 5-day week), so the entitlement is the default.
     */
    public function testFallsBackToDefaultWhenNoScheduleExists(): void {
        $pastYear = (int)(new DateTime())->format('Y') - 1;

        $this->mapper->method('findByEmployeeAndDateRange')->willReturn([]);
        $this->mapper->method('findForDate')
            ->willThrowException(new DoesNotExistException('none'));

        $this->assertSame(30, $this->service->getVacationDaysForYear(1, $pastYear));
    }

    // ---------------------------------------------------------------------
    // #581: Anzeige-Profil bei zukünftigem Eintrittsdatum
    // ---------------------------------------------------------------------

    /**
     * #581: when a profile is active today it is used as-is for the display.
     */
    public function testGetDisplayScheduleReturnsActiveToday(): void {
        $this->mapper->method('findForDate')->willReturn($this->scheduleAt('2020-01-01', 25, 5));

        $this->assertSame(25, $this->service->getDisplaySchedule(1)->getVacationDays());
    }

    /**
     * #581: a not-yet-started employee (only future-dated profiles, e.g. entry
     * date ahead) must show their EARLIEST profile, not the synthetic 40h/30
     * default. This is the reported bug: the overview showed 30 until the entry
     * date was reached.
     */
    public function testGetDisplayScheduleFallsBackToEarliestFutureProfile(): void {
        $this->mapper->method('findForDate')
            ->willThrowException(new DoesNotExistException('no active profile today'));
        $this->mapper->method('findByEmployeeId')->willReturn([
            $this->scheduleAt('2099-06-01', 20, 4), // later
            $this->scheduleAt('2099-01-01', 12, 2), // earliest -> must win
        ]);

        $result = $this->service->getDisplaySchedule(1);

        $this->assertSame(12, $result->getVacationDays(), 'earliest profile must win, not the default 30');
        $this->assertSame('2099-01-01', $result->getValidFrom()->format('Y-m-d'));
    }

    /**
     * #581: an employee with no profile at all still falls back to the synthetic
     * default (40h / 30).
     */
    public function testGetDisplayScheduleFallsBackToDefaultWhenNoProfiles(): void {
        $this->mapper->method('findForDate')
            ->willThrowException(new DoesNotExistException('none'));
        $this->mapper->method('findByEmployeeId')->willReturn([]);

        $result = $this->service->getDisplaySchedule(1);

        $this->assertSame(30, $result->getVacationDays());
        $this->assertSame(40.0, (float)$result->getWeeklyHours());
    }

    // ---------------------------------------------------------------------
    // #453: Rückdatierung von Arbeitszeitprofilen
    // ---------------------------------------------------------------------

    /**
     * With no entry date and nothing approved, a far-past valid_from is allowed –
     * the old "first of current month" block is gone.
     */
    public function testCreateAllowsBackDatingWhenUnbounded(): void {
        $this->employeeMapper->method('find')->willReturn($this->employeeWithEntryDate(null));
        $this->timeEntryMapper->method('findLatestApprovedDate')->willReturn(null);
        $this->mapper->method('findByEmployeeId')->willReturn([]);
        // Post-insert sync reads the active schedule; fall back to the in-memory
        // default so the mock does not feed nulls into the Employee entity.
        $this->mapper->method('findForDate')->willThrowException(new DoesNotExistException('none'));
        $this->mapper->method('insert')->willReturnArgument(0);

        $result = $this->service->create(1, '2020-01-01', $this->validHours(), 30, 'admin');

        $this->assertSame('2020-01-01', $result->getValidFrom()->format('Y-m-d'));
    }

    /**
     * valid_from before the employee's entry date is rejected.
     */
    public function testCreateRejectsValidFromBeforeEntryDate(): void {
        $this->employeeMapper->method('find')->willReturn($this->employeeWithEntryDate('2026-01-01'));
        $this->timeEntryMapper->method('findLatestApprovedDate')->willReturn(null);
        $this->mapper->method('findByEmployeeId')->willReturn([]);
        $this->mapper->expects($this->never())->method('insert');

        try {
            $this->service->create(1, '2025-06-01', $this->validHours(), 30, 'admin');
            $this->fail('Expected ValidationException');
        } catch (ValidationException $e) {
            $this->assertTrue($e->hasError('validFrom'));
        }
    }

    /**
     * valid_from inside an already-approved period is rejected (its Soll would
     * change retroactively).
     */
    public function testCreateRejectsValidFromInsideApprovedPeriod(): void {
        $this->employeeMapper->method('find')->willReturn($this->employeeWithEntryDate(null));
        $this->timeEntryMapper->method('findLatestApprovedDate')->willReturn(new DateTime('2026-06-30'));
        $this->mapper->method('findByEmployeeId')->willReturn([]);
        $this->mapper->expects($this->never())->method('insert');

        try {
            $this->service->create(1, '2026-06-15', $this->validHours(), 30, 'admin');
            $this->fail('Expected ValidationException');
        } catch (ValidationException $e) {
            $this->assertTrue($e->hasError('validFrom'));
        }
    }

    /**
     * valid_from on the day after the last approved entry is allowed – approved
     * months stay untouched.
     */
    public function testCreateAllowsValidFromDayAfterLastApproved(): void {
        $this->employeeMapper->method('find')->willReturn($this->employeeWithEntryDate(null));
        $this->timeEntryMapper->method('findLatestApprovedDate')->willReturn(new DateTime('2026-06-30'));
        $this->mapper->method('findByEmployeeId')->willReturn([]);
        $this->mapper->method('findForDate')->willThrowException(new DoesNotExistException('none'));
        $this->mapper->method('insert')->willReturnArgument(0);

        $result = $this->service->create(1, '2026-07-01', $this->validHours(), 30, 'admin');

        $this->assertSame('2026-07-01', $result->getValidFrom()->format('Y-m-d'));
    }
}
