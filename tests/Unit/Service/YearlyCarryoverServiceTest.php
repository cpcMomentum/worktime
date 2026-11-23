<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use OCA\WorkTime\Db\YearlyCarryover;
use OCA\WorkTime\Db\YearlyCarryoverMapper;
use OCA\WorkTime\Migration\Version000036Date20261123000000;
use OCA\WorkTime\Service\AuditLogService;
use OCA\WorkTime\Service\YearlyCarryoverService;
use OCP\AppFramework\Db\DoesNotExistException;
use OCP\DB\Exception as DbException;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;

/**
 * #889: parallel auto-saves must not create a second active carryover.
 */
class YearlyCarryoverServiceTest extends TestCase {

	private YearlyCarryoverMapper $mapper;
	private AuditLogService $audit;
	private YearlyCarryoverService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(YearlyCarryoverMapper::class);
		$this->audit = $this->createMock(AuditLogService::class);
		$l = $this->createMock(IL10N::class);
		$l->method('t')->willReturnArgument(0);
		$this->service = new YearlyCarryoverService($this->mapper, $this->audit, $l);
	}

	private function row(int $id, ?DateTime $updatedAt = null, bool $locked = false): YearlyCarryover {
		$c = new YearlyCarryover();
		$c->setId($id);
		$c->setEmployeeId(4);
		$c->setYear(2026);
		$c->setUpdatedAt($updatedAt ?? new DateTime('2026-11-01 10:00:00'));
		if ($locked) {
			$c->setLockedAt(new DateTime('2026-11-02 10:00:00'));
		}
		return $c;
	}

	public function testUpsertInsertsWhenNoActiveRowExists(): void {
		$this->mapper->method('findActiveByEmployeeAndYear')->willThrowException(new DoesNotExistException(''));
		$this->mapper->expects($this->once())->method('insert')
			->willReturnCallback(function (YearlyCarryover $c): YearlyCarryover {
				$c->setId(1);
				return $c;
			});
		$this->mapper->expects($this->never())->method('update');
		$this->audit->expects($this->once())->method('logCreate');

		$result = $this->service->upsert(4, 2026, 120, 2.5, null, 'admin');

		$this->assertSame(120, $result->getOvertimeMinutes());
		$this->assertSame('2.5', $result->getVacationDays());
	}

	public function testUpsertUpdatesWinnerRowOnUniqueRace(): void {
		// Both requests saw no active row; the parallel one inserted first, the
		// unique index rejects ours. We must update that row, not answer 500.
		$winner = $this->row(7);
		$winner->setOvertimeMinutes(60);
		$this->mapper->method('findActiveByEmployeeAndYear')
			->willReturnOnConsecutiveCalls($this->throwException(new DoesNotExistException('')), $winner);
		$unique = $this->createMock(DbException::class);
		$unique->method('getReason')->willReturn(DbException::REASON_UNIQUE_CONSTRAINT_VIOLATION);
		$this->mapper->method('insert')->willThrowException($unique);
		$this->mapper->expects($this->once())->method('update')
			->willReturnCallback(fn (YearlyCarryover $c): YearlyCarryover => $c);
		$this->audit->expects($this->once())->method('logUpdate');
		$this->audit->expects($this->never())->method('logCreate');

		$result = $this->service->upsert(4, 2026, 180, 3.0, 'zuletzt', 'admin');

		$this->assertSame(7, $result->getId());
		$this->assertSame(180, $result->getOvertimeMinutes());
		$this->assertSame('3.0', $result->getVacationDays());
		$this->assertSame('zuletzt', $result->getNote());
	}

	public function testUpsertRethrowsOtherDatabaseErrors(): void {
		$this->mapper->method('findActiveByEmployeeAndYear')->willThrowException(new DoesNotExistException(''));
		$other = $this->createMock(DbException::class);
		$other->method('getReason')->willReturn(DbException::REASON_CONNECTION_LOST);
		$this->mapper->method('insert')->willThrowException($other);
		$this->mapper->expects($this->never())->method('update');

		$this->expectException(DbException::class);
		$this->service->upsert(4, 2026, 180, 3.0, null, 'admin');
	}

	public function testCancelAndReplaceFreesTheActiveSlotFirst(): void {
		$existing = $this->row(7, null, true);
		$this->mapper->method('find')->willReturn($existing);
		$order = [];
		$this->mapper->method('update')->willReturnCallback(function (YearlyCarryover $c) use (&$order): YearlyCarryover {
			$order[] = 'update:' . $c->getActiveKey();
			return $c;
		});
		$this->mapper->method('insert')->willReturnCallback(function (YearlyCarryover $c) use (&$order): YearlyCarryover {
			$order[] = 'insert:' . $c->getActiveKey();
			$c->setId(8);
			return $c;
		});

		$result = $this->service->cancelAndReplace(7, 90, 1.0, 'Korrektur', 'admin');

		// Cancelled row gets its own id as key before the replacement takes key 0.
		$this->assertSame(['update:7', 'insert:0'], $order);
		$this->assertSame(7, $result->getReplacesId());
	}

	public function testRepairKeepsLockedRowThenMostRecentThenHighestId(): void {
		$old = $this->row(1, new DateTime('2026-11-01 10:00:00'));
		$recent = $this->row(2, new DateTime('2026-11-01 10:00:05'));
		$sameTimeHigherId = $this->row(3, new DateTime('2026-11-01 10:00:05'));
		$rows = [$old, $recent, $sameTimeHigherId];
		usort($rows, [Version000036Date20261123000000::class, 'compareKeeper']);
		$this->assertSame(3, $rows[0]->getId());

		$locked = $this->row(4, new DateTime('2026-10-01 10:00:00'), true);
		$rows = [$old, $recent, $locked];
		usort($rows, [Version000036Date20261123000000::class, 'compareKeeper']);
		$this->assertSame(4, $rows[0]->getId());
	}
}
