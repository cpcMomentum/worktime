<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\BackgroundJob;

use OCA\WorkTime\BackgroundJob\PushNotificationJob;
use OCA\WorkTime\Notification\PushDelivery;
use OCP\AppFramework\Utility\ITimeFactory;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;
use ReflectionMethod;

/**
 * The queued push job (#593 Phase B) that runs the APNs delivery off the request
 * path. It must hand a well-formed argument to PushDelivery and quietly skip a
 * malformed one rather than throwing inside the cron runner.
 */
class PushNotificationJobTest extends TestCase {

	private PushDelivery $pushDelivery;
	private ReflectionMethod $run;
	private PushNotificationJob $job;

	protected function setUp(): void {
		$this->pushDelivery = $this->createMock(PushDelivery::class);
		$this->job = new PushNotificationJob(
			$this->createMock(ITimeFactory::class),
			$this->pushDelivery,
			$this->createMock(LoggerInterface::class),
		);
		$this->run = new ReflectionMethod(PushNotificationJob::class, 'run');
		$this->run->setAccessible(true);
	}

	public function testDelegatesToPushDelivery(): void {
		$params = ['employeeName' => 'Erika Muster', 'month' => 8, 'year' => 2026];
		$this->pushDelivery->expects($this->once())
			->method('send')
			->with('boss', 'time_entries_submitted', $params);

		$this->run->invoke($this->job, [
			'userId' => 'boss',
			'subject' => 'time_entries_submitted',
			'params' => $params,
		]);
	}

	public function testSkipsNonArrayArgument(): void {
		$this->pushDelivery->expects($this->never())->method('send');
		$this->run->invoke($this->job, 'not-an-array');
	}

	public function testSkipsIncompleteArgument(): void {
		$this->pushDelivery->expects($this->never())->method('send');
		$this->run->invoke($this->job, ['userId' => 'boss']); // no subject
	}
}
