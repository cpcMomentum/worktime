<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service\Apns;

use OCA\WorkTime\Db\PushToken;
use OCA\WorkTime\Service\Apns\ApnsClient;
use OCA\WorkTime\Service\Apns\ApnsException;
use OCA\WorkTime\Service\Apns\ApnsJwt;
use OCA\WorkTime\Service\PushTokenService;
use OCP\IAppConfig;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class ApnsClientTest extends TestCase {

	private ApnsJwt $jwt;
	private IAppConfig $appConfig;
	private PushTokenService $pushTokenService;
	private LoggerInterface $logger;

	protected function setUp(): void {
		$this->jwt = $this->createMock(ApnsJwt::class);
		$this->jwt->method('token')->willReturn('JWT123');
		$this->appConfig = $this->createMock(IAppConfig::class);
		$this->pushTokenService = $this->createMock(PushTokenService::class);
		$this->logger = $this->createMock(LoggerInterface::class);
	}

	private function config(string $environment = 'prod'): void {
		$this->appConfig->method('getValueString')->willReturnMap([
			['worktime', 'apns_topic', 'com.cpcmomentum.worktime', false, 'com.cpcmomentum.worktime'],
			['worktime', 'apns_environment', 'prod', false, $environment],
		]);
	}

	/**
	 * @param array{status:int,body:string,apnsId:?string} $canned
	 */
	private function client(array $canned): object {
		return new class($this->jwt, $this->appConfig, $this->pushTokenService, $this->logger, $canned) extends ApnsClient {
			public array $lastCall = [];
			public function __construct($jwt, $appConfig, $service, $logger, private array $canned) {
				parent::__construct($jwt, $appConfig, $service, $logger);
			}
			protected function transport(string $url, array $headers, string $body): array {
				$this->lastCall = ['url' => $url, 'headers' => $headers, 'body' => $body];
				return $this->canned;
			}
		};
	}

	public function testSendBuildsProdRequestWithAuthAndTopic(): void {
		$this->config('prod');
		$client = $this->client(['status' => 200, 'body' => '', 'apnsId' => 'apns-1']);

		$result = $client->send('DEVICETOKEN', ApnsClient::alertPayload('Titel', 'Text'));

		$this->assertSame('https://api.push.apple.com/3/device/DEVICETOKEN', $client->lastCall['url']);
		$this->assertContains('authorization: bearer JWT123', $client->lastCall['headers']);
		$this->assertContains('apns-topic: com.cpcmomentum.worktime', $client->lastCall['headers']);
		$this->assertContains('apns-push-type: alert', $client->lastCall['headers']);
		$body = json_decode($client->lastCall['body'], true);
		$this->assertSame('Titel', $body['aps']['alert']['title']);
		$this->assertSame('Text', $body['aps']['alert']['body']);
		$this->assertTrue($result->isSuccess());
		$this->assertSame('apns-1', $result->apnsId);
	}

	public function testSendUsesSandboxHostWhenConfigured(): void {
		$this->config('sandbox');
		$client = $this->client(['status' => 200, 'body' => '', 'apnsId' => null]);

		$client->send('DEVICETOKEN', ApnsClient::alertPayload('t', 'b'));

		$this->assertStringStartsWith('https://api.sandbox.push.apple.com/3/device/', $client->lastCall['url']);
	}

	public function testUnregisteredTokenIsDropped(): void {
		$this->config();
		// APNs 410 Unregistered → the token must be removed.
		$this->pushTokenService->expects($this->once())->method('removeToken')->with('DEADTOKEN');
		$client = $this->client(['status' => 410, 'body' => '{"reason":"Unregistered"}', 'apnsId' => null]);

		$result = $client->send('DEADTOKEN', ApnsClient::alertPayload('t', 'b'));

		$this->assertTrue($result->isUnregistered());
		$this->assertFalse($result->isSuccess());
		$this->assertSame('Unregistered', $result->reason);
	}

	public function testBadDeviceTokenIsNotDropped(): void {
		$this->config();
		// 400 BadDeviceToken is a client error but not a reason to forget the token.
		$this->pushTokenService->expects($this->never())->method('removeToken');
		$client = $this->client(['status' => 400, 'body' => '{"reason":"BadDeviceToken"}', 'apnsId' => null]);

		$result = $client->send('SOMETOKEN', ApnsClient::alertPayload('t', 'b'));

		$this->assertFalse($result->isSuccess());
		$this->assertFalse($result->isUnregistered());
		$this->assertSame('BadDeviceToken', $result->reason);
	}

	public function testSendToUserContinuesWhenOneDeviceFails(): void {
		$this->config();
		$fail = new PushToken();
		$fail->setDeviceToken('TOKFAIL');
		$ok = new PushToken();
		$ok->setDeviceToken('TOKOK');
		$this->pushTokenService->method('tokensForUser')->willReturn([$fail, $ok]);
		$client = new class($this->jwt, $this->appConfig, $this->pushTokenService, $this->logger) extends ApnsClient {
			protected function transport(string $url, array $headers, string $body): array {
				if (str_contains($url, 'TOKFAIL')) {
					throw new ApnsException('boom');
				}
				return ['status' => 200, 'body' => '', 'apnsId' => null];
			}
		};

		$results = $client->sendToUser('user1', ApnsClient::alertPayload('t', 'b'));

		$this->assertCount(2, $results);
		$this->assertFalse($results['TOKFAIL']->isSuccess());
		$this->assertSame('transport_error', $results['TOKFAIL']->reason);
		$this->assertTrue($results['TOKOK']->isSuccess());
	}

	public function testSendThrowsOnUnencodablePayload(): void {
		$this->config();
		$client = $this->client(['status' => 200, 'body' => '', 'apnsId' => null]);

		$this->expectException(ApnsException::class);
		// Invalid UTF-8 makes json_encode return false — must fail fast, not POST empty.
		$client->send('TOK', ['aps' => ['alert' => "\xB1\x31"]]);
	}

	public function testResultJsonIncludesComputedSuccessFlag(): void {
		$json = json_decode(json_encode(new \OCA\WorkTime\Service\Apns\ApnsResult(200, null, 'id-1')), true);
		$this->assertTrue($json['success']);
		$this->assertSame(200, $json['status']);
	}

	public function testSendToUserFansOutToEveryDevice(): void {
		$this->config();
		$t1 = new PushToken();
		$t1->setDeviceToken('TOK1');
		$t2 = new PushToken();
		$t2->setDeviceToken('TOK2');
		$this->pushTokenService->method('tokensForUser')->with('user1')->willReturn([$t1, $t2]);
		$client = $this->client(['status' => 200, 'body' => '', 'apnsId' => null]);

		$results = $client->sendToUser('user1', ApnsClient::alertPayload('t', 'b'));

		$this->assertCount(2, $results);
		$this->assertArrayHasKey('TOK1', $results);
		$this->assertArrayHasKey('TOK2', $results);
		$this->assertTrue($results['TOK2']->isSuccess());
	}
}
