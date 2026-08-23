<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\Db\PushToken;
use OCA\WorkTime\Db\PushTokenMapper;
use OCA\WorkTime\Service\PushTokenService;
use OCP\DB\Exception as DbException;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class PushTokenServiceTest extends TestCase {

	private PushTokenMapper $mapper;
	private PushTokenService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(PushTokenMapper::class);
		$this->service = new PushTokenService($this->mapper, $this->createMock(LoggerInterface::class));
	}

	public function testRegisterInsertsWhenTokenIsNew(): void {
		$this->mapper->method('findByDeviceTokenOrNull')->willReturn(null);
		$this->mapper->expects($this->never())->method('update');
		$this->mapper->expects($this->once())->method('insert')
			->willReturnCallback(fn (PushToken $t): PushToken => $t);

		$result = $this->service->register('user1', 'abc123', 'ios');

		$this->assertSame('user1', $result->getUserId());
		$this->assertSame('abc123', $result->getDeviceToken());
		$this->assertSame('ios', $result->getPlatform());
		$this->assertNotNull($result->getUpdatedAt());
	}

	public function testRegisterUpdatesExistingTokenInsteadOfDuplicating(): void {
		// The device already exists, registered to another user (device handed over).
		$existing = new PushToken();
		$existing->setId(5);
		$existing->setUserId('olduser');
		$existing->setDeviceToken('abc123');
		$existing->setPlatform('ios');
		$this->mapper->method('findByDeviceTokenOrNull')->willReturn($existing);
		$this->mapper->expects($this->never())->method('insert');
		$this->mapper->expects($this->once())->method('update')
			->willReturnCallback(fn (PushToken $t): PushToken => $t);

		$result = $this->service->register('newuser', 'abc123', 'ios');

		// Reassigned to the current user, same row (id 5).
		$this->assertSame(5, $result->getId());
		$this->assertSame('newuser', $result->getUserId());
	}

	public function testRegisterRetriesAsUpdateOnUniqueRace(): void {
		// Concurrent first-time registration: our insert loses the unique-index
		// race; the row now exists, so we must update it, not surface a 500.
		$raced = new PushToken();
		$raced->setId(9);
		$raced->setDeviceToken('abc123');
		$this->mapper->method('findByDeviceTokenOrNull')
			->willReturnOnConsecutiveCalls(null, $raced);
		$unique = $this->createMock(DbException::class);
		$unique->method('getReason')->willReturn(DbException::REASON_UNIQUE_CONSTRAINT_VIOLATION);
		$this->mapper->method('insert')->willThrowException($unique);
		$this->mapper->expects($this->once())->method('update')
			->willReturnCallback(fn (PushToken $t): PushToken => $t);

		$result = $this->service->register('user1', 'abc123', 'ios');

		$this->assertSame(9, $result->getId());
		$this->assertSame('user1', $result->getUserId());
	}

	public function testRegisterRethrowsNonUniqueDbErrors(): void {
		$this->mapper->method('findByDeviceTokenOrNull')->willReturn(null);
		$other = $this->createMock(DbException::class);
		$other->method('getReason')->willReturn(DbException::REASON_CONNECTION_LOST);
		$this->mapper->method('insert')->willThrowException($other);

		$this->expectException(DbException::class);
		$this->service->register('user1', 'abc123', 'ios');
	}

	public function testUnregisterIsScopedToOwner(): void {
		$this->mapper->expects($this->once())->method('deleteByDeviceToken')
			->with('abc123', 'user1')->willReturn(1);

		$this->assertSame(1, $this->service->unregister('user1', 'abc123'));
	}

	public function testRemoveTokenIsNotScopedToOwner(): void {
		// 410 hygiene: drop the token regardless of who owns it.
		$this->mapper->expects($this->once())->method('deleteByDeviceToken')
			->with('abc123')->willReturn(1);

		$this->assertSame(1, $this->service->removeToken('abc123'));
	}

	public function testTokensForUserDelegatesToMapper(): void {
		$tokens = [new PushToken(), new PushToken()];
		$this->mapper->method('findByUser')->with('user1')->willReturn($tokens);

		$this->assertSame($tokens, $this->service->tokensForUser('user1'));
	}
}
