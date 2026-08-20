<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\PushController;
use OCA\WorkTime\Db\PushToken;
use OCA\WorkTime\Service\PushTokenService;
use OCP\AppFramework\Http;
use OCP\IL10N;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class PushControllerTest extends TestCase {

	private PushTokenService $service;
	private IL10N $l;

	protected function setUp(): void {
		$this->service = $this->createMock(PushTokenService::class);
		$this->l = $this->createMock(IL10N::class);
		$this->l->method('t')->willReturnCallback(fn (string $t): string => $t);
	}

	private function controller(?string $userId): PushController {
		return new PushController(
			$this->createMock(IRequest::class),
			$userId,
			$this->service,
			$this->l,
			$this->createMock(LoggerInterface::class),
		);
	}

	public function testRegisterStoresTokenForCurrentUser(): void {
		$this->service->expects($this->once())->method('register')
			->with('user1', 'abc123', 'ios')->willReturn(new PushToken());

		$response = $this->controller('user1')->register('abc123', 'ios');

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
		$this->assertSame(['status' => 'registered'], $response->getData());
	}

	public function testRegisterTrimsToken(): void {
		$this->service->expects($this->once())->method('register')
			->with('user1', 'abc123', 'ios')->willReturn(new PushToken());

		$this->controller('user1')->register('  abc123 ');
	}

	public function testRegisterRejectsEmptyToken(): void {
		$this->service->expects($this->never())->method('register');

		$response = $this->controller('user1')->register('   ');

		$this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
		$this->assertArrayHasKey('error', $response->getData());
	}

	public function testRegisterRejectsUnsupportedPlatform(): void {
		$this->service->expects($this->never())->method('register');

		$response = $this->controller('user1')->register('abc123', 'android');

		$this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
	}

	public function testRegisterRequiresAuthentication(): void {
		$this->service->expects($this->never())->method('register');

		$response = $this->controller(null)->register('abc123');

		$this->assertSame(Http::STATUS_UNAUTHORIZED, $response->getStatus());
	}

	public function testUnregisterDeletesOwnToken(): void {
		$this->service->expects($this->once())->method('unregister')
			->with('user1', 'abc123')->willReturn(1);

		$response = $this->controller('user1')->unregister('abc123');

		$this->assertSame(Http::STATUS_OK, $response->getStatus());
		$this->assertSame(['status' => 'deleted'], $response->getData());
	}

	public function testUnregisterRejectsEmptyToken(): void {
		$this->service->expects($this->never())->method('unregister');

		$response = $this->controller('user1')->unregister('');

		$this->assertSame(Http::STATUS_BAD_REQUEST, $response->getStatus());
	}
}
