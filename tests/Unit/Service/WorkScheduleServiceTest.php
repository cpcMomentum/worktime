<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\WorkSchedule;
use OCA\WorkTime\Db\WorkScheduleMapper;
use OCA\WorkTime\Db\EmployeeMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\CompanySettingsService;
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

    protected function setUp(): void {
        $this->mapper = $this->createMock(WorkScheduleMapper::class);

        $this->service = new WorkScheduleService(
            $this->mapper,
            $this->createMock(EmployeeMapper::class),
            $this->createMock(CompanySettingsService::class),
            $this->createMock(AuditLogService::class),
            $this->createMock(LoggerInterface::class),
            $this->createMock(IL10N::class),
        );
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
}
