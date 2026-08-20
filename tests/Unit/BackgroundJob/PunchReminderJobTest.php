<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\BackgroundJob;

use DateTime;
use DateTimeZone;
use OCA\WorkTime\BackgroundJob\PunchReminderJob;
use OCA\WorkTime\Db\ActivePunch;
use OCA\WorkTime\Db\ActivePunchMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCP\AppFramework\Utility\ITimeFactory;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class PunchReminderJobTest extends TestCase {

	private ActivePunchMapper $punchMapper;
	private CompanySettingMapper $settingsMapper;
	private NotificationService $notificationService;
	private ITimeFactory $time;
	private PunchReminderJob $job;

	protected function setUp(): void {
		$this->punchMapper = $this->createMock(ActivePunchMapper::class);
		$this->settingsMapper = $this->createMock(CompanySettingMapper::class);
		$this->notificationService = $this->createMock(NotificationService::class);
		$this->time = $this->createMock(ITimeFactory::class);
		$logger = $this->createMock(LoggerInterface::class);

		// Defaults: max_pause 60, max_daily_hours 10, break9h 45 → overlong 645 min.
		$this->settingsMapper->method('getValueAsInt')->willReturnMap([
			[CompanySetting::KEY_MAX_PAUSE_MINUTES, 60],
			[CompanySetting::KEY_MIN_BREAK_MINUTES_9H, 45],
		]);
		$this->settingsMapper->method('getValueAsFloat')
			->with(CompanySetting::KEY_MAX_DAILY_HOURS)->willReturn(10.0);

		$this->job = new PunchReminderJob(
			$this->time,
			$this->punchMapper,
			$this->settingsMapper,
			$this->notificationService,
			$logger,
		);
	}

	private function runJob(): void {
		$m = new \ReflectionMethod($this->job, 'run');
		$m->setAccessible(true);
		$m->invoke($this->job, null);
	}

	private function ts(string $iso): int {
		return (new DateTime($iso, new DateTimeZone('UTC')))->getTimestamp();
	}

	private function punch(int $id, ?string $startedAt, ?string $pausedAt = null): ActivePunch {
		$p = new ActivePunch();
		$p->setId($id);
		$p->setEmployeeId(7);
		$p->setStartedAt($startedAt !== null ? new DateTime($startedAt, new DateTimeZone('UTC')) : null);
		$p->setPausedAt($pausedAt !== null ? new DateTime($pausedAt, new DateTimeZone('UTC')) : null);
		return $p;
	}

	public function testNoPunchesSendsNothing(): void {
		$this->punchMapper->method('findAll')->willReturn([]);
		$this->notificationService->expects($this->never())->method('notifyPunchPauseTooLong');
		$this->notificationService->expects($this->never())->method('notifyPunchForgotClockOut');
		$this->runJob();
	}

	public function testPauseOverThresholdNotifies(): void {
		// paused at 10:00, now 11:30 → 90 min > 60.
		$punch = $this->punch(1, '2020-01-01 08:00:00', '2020-01-01 10:00:00');
		$this->punchMapper->method('findAll')->willReturn([$punch]);
		$this->punchMapper->method('markPauseReminded')->willReturn(1);
		$this->time->method('getTime')->willReturn($this->ts('2020-01-01 11:30:00'));

		$this->notificationService->expects($this->once())->method('notifyPunchPauseTooLong')
			->with($punch, $this->isInstanceOf(\DateTimeInterface::class), 60);
		$this->notificationService->expects($this->never())->method('notifyPunchForgotClockOut');
		$this->runJob();
	}

	public function testPauseAlreadyRemindedDoesNotNotify(): void {
		// Over threshold, but the reminder was already sent this segment → mark
		// returns 0 → no duplicate notification (#588 dedup).
		$punch = $this->punch(1, '2020-01-01 08:00:00', '2020-01-01 10:00:00');
		$this->punchMapper->method('findAll')->willReturn([$punch]);
		$this->punchMapper->method('markPauseReminded')->willReturn(0);
		$this->time->method('getTime')->willReturn($this->ts('2020-01-01 11:30:00'));

		$this->notificationService->expects($this->never())->method('notifyPunchPauseTooLong');
		$this->runJob();
	}

	public function testPauseUnderThresholdIsQuiet(): void {
		// paused at 11:00, now 11:30 → 30 min < 60.
		$punch = $this->punch(1, '2020-01-01 08:00:00', '2020-01-01 11:00:00');
		$this->punchMapper->method('findAll')->willReturn([$punch]);
		$this->time->method('getTime')->willReturn($this->ts('2020-01-01 11:30:00'));

		$this->notificationService->expects($this->never())->method('notifyPunchPauseTooLong');
		$this->runJob();
	}

	public function testRunningOverThresholdNotifiesForgotClockOut(): void {
		// started 00:00, now 12:00 → 720 min > 645.
		$punch = $this->punch(1, '2020-01-01 00:00:00', null);
		$this->punchMapper->method('findAll')->willReturn([$punch]);
		$this->punchMapper->method('markOutReminded')->willReturn(1);
		$this->time->method('getTime')->willReturn($this->ts('2020-01-01 12:00:00'));

		$this->notificationService->expects($this->once())->method('notifyPunchForgotClockOut')
			->with($punch, $this->isInstanceOf(\DateTimeInterface::class), 11);
		$this->notificationService->expects($this->never())->method('notifyPunchPauseTooLong');
		$this->runJob();
	}

	public function testRunningUnderThresholdIsQuiet(): void {
		// started 08:00, now 12:00 → 240 min < 645.
		$punch = $this->punch(1, '2020-01-01 08:00:00', null);
		$this->punchMapper->method('findAll')->willReturn([$punch]);
		$this->time->method('getTime')->willReturn($this->ts('2020-01-01 12:00:00'));

		$this->notificationService->expects($this->never())->method('notifyPunchForgotClockOut');
		$this->runJob();
	}

	public function testPausedPunchNeverTriggersForgotClockOut(): void {
		// A long-running but currently paused punch: only the pause branch applies.
		$punch = $this->punch(1, '2020-01-01 00:00:00', '2020-01-01 11:00:00');
		$this->punchMapper->method('findAll')->willReturn([$punch]);
		$this->punchMapper->method('markPauseReminded')->willReturn(1);
		$this->time->method('getTime')->willReturn($this->ts('2020-01-01 12:30:00'));

		$this->notificationService->expects($this->never())->method('notifyPunchForgotClockOut');
		$this->notificationService->expects($this->once())->method('notifyPunchPauseTooLong');
		$this->runJob();
	}
}
