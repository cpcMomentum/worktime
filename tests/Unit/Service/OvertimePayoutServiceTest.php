<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\OvertimePayout;
use OCA\WorkTime\Db\OvertimePayoutMapper;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\OvertimePayoutService;
use PHPUnit\Framework\TestCase;

/**
 * Covers the overtime payout creation/validation logic (#401).
 */
class OvertimePayoutServiceTest extends TestCase {

    private OvertimePayoutMapper $mapper;
    private AuditLogService $auditLogService;
    private OvertimePayoutService $service;

    protected function setUp(): void {
        $this->mapper = $this->createMock(OvertimePayoutMapper::class);
        $this->auditLogService = $this->createMock(AuditLogService::class);
        $this->service = new OvertimePayoutService($this->mapper, $this->auditLogService);
    }

    public function testCreateRejectsZeroMinutes(): void {
        $this->mapper->expects($this->never())->method('insert');
        $this->expectException(\InvalidArgumentException::class);
        $this->service->create(1, new DateTime('2026-06-30'), 0, 'Gültiger Grund hier', 'admin');
    }

    public function testCreateRejectsNegativeMinutes(): void {
        $this->mapper->expects($this->never())->method('insert');
        $this->expectException(\InvalidArgumentException::class);
        $this->service->create(1, new DateTime('2026-06-30'), -60, 'Gültiger Grund hier', 'admin');
    }

    public function testCreateRejectsShortNote(): void {
        $this->mapper->expects($this->never())->method('insert');
        $this->expectException(\InvalidArgumentException::class);
        $this->service->create(1, new DateTime('2026-06-30'), 600, 'zu kurz', 'admin');
    }

    public function testCreateInsertsAndLogsAudit(): void {
        $this->mapper->expects($this->once())
            ->method('insert')
            ->willReturnCallback(function (OvertimePayout $p) {
                $p->setId(42);
                return $p;
            });
        $this->auditLogService->expects($this->once())
            ->method('logCreate')
            ->with('admin', 'overtime_payout', 42, $this->anything());

        $result = $this->service->create(1, new DateTime('2026-06-30'), 600, 'Auszahlung mit Juni-Gehalt', 'admin');

        $this->assertSame(42, $result->getId());
        $this->assertSame(600, $result->getMinutes());
        $this->assertSame('Auszahlung mit Juni-Gehalt', $result->getNote());
    }

    public function testGetPaidOutMinutesDelegatesToMapper(): void {
        $this->mapper->expects($this->once())
            ->method('sumMinutesByEmployeeAndYear')
            ->with(7, 2026)
            ->willReturn(900);

        $this->assertSame(900, $this->service->getPaidOutMinutes(7, 2026));
    }

    public function testDeleteLogsAudit(): void {
        $payout = new OvertimePayout();
        $payout->setId(5);
        $payout->setEmployeeId(1);
        $payout->setMinutes(120);
        $this->mapper->method('find')->with(5)->willReturn($payout);
        $this->mapper->expects($this->once())->method('delete')->with($payout);
        $this->auditLogService->expects($this->once())
            ->method('logDelete')
            ->with('admin', 'overtime_payout', 5, $this->anything());

        $this->service->delete(5, 'admin');
    }
}
