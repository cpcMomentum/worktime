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
 * Regression coverage for issue #281: the annual vacation entitlement must equal
 * the value of the work-schedule profile that is valid for the year, identical
 * across the profile editor, the employee overview and the team view. It must
 * NOT be pro-rated/blended across an overlapping (e.g. auto-created default)
 * profile, which previously produced surprising numbers such as 21 instead of 14.
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
        $s = new WorkSchedule();
        $s->setEmployeeId(1);
        $s->setValidFrom(new DateTime('2020-01-01'));
        $s->setVacationDays($vacationDays);
        return $s;
    }

    /**
     * The entitlement equals the valid profile's value – not a blend with any
     * earlier/overlapping profile. We query a past year so the reference date is
     * deterministic (the year's end), independent of the current date.
     */
    public function testReturnsValidProfileVacationDaysWithoutBlending(): void {
        $pastYear = (int)(new DateTime())->format('Y') - 1;

        // Whatever date is asked for in that year, the valid profile has 14 days.
        $this->mapper->method('findForDate')->willReturn($this->schedule(14));

        $this->assertSame(14, $this->service->getVacationDaysForYear(1, $pastYear));
    }

    /**
     * With no persisted schedule, getScheduleForDate falls back to a default
     * (30 days), so the entitlement is the default rather than an error.
     */
    public function testFallsBackToDefaultWhenNoScheduleExists(): void {
        $pastYear = (int)(new DateTime())->format('Y') - 1;

        $this->mapper->method('findForDate')
            ->willThrowException(new DoesNotExistException('none'));

        $this->assertSame(30, $this->service->getVacationDaysForYear(1, $pastYear));
    }

    /**
     * For a past year the reference date is that year's 31 December, ensuring the
     * profile valid back then drives the entitlement.
     */
    public function testPastYearUsesYearEndAsReference(): void {
        $pastYear = (int)(new DateTime())->format('Y') - 1;
        $expectedReference = $pastYear . '-12-31';

        $this->mapper->expects($this->once())
            ->method('findForDate')
            ->with(
                $this->equalTo(1),
                $this->callback(fn (DateTime $d): bool => $d->format('Y-m-d') === $expectedReference),
            )
            ->willReturn($this->schedule(20));

        $this->assertSame(20, $this->service->getVacationDaysForYear(1, $pastYear));
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
