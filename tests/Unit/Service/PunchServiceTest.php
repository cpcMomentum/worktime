<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Service;

use DateTime;
use DateTimeZone;
use OCA\WorkTime\Db\ActivePunch;
use OCA\WorkTime\Db\ActivePunchMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCA\WorkTime\Service\PunchConfirmationRequiredException;
use OCA\WorkTime\Service\PunchConflictException;
use OCA\WorkTime\Service\PunchService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\ValidationException;
use OCP\IDateTimeZone;
use OCP\IDBConnection;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

class PunchServiceTest extends TestCase {

	private ActivePunchMapper $mapper;
	private TimeEntryService $timeEntryService;
	private CompanySettingMapper $settingsMapper;
	private IDateTimeZone $dateTimeZone;
	private IDBConnection $db;
	private LoggerInterface $logger;
	private IL10N $l;
	private PunchService $service;

	protected function setUp(): void {
		$this->mapper = $this->createMock(ActivePunchMapper::class);
		$this->timeEntryService = $this->createMock(TimeEntryService::class);
		$this->settingsMapper = $this->createMock(CompanySettingMapper::class);
		$this->dateTimeZone = $this->createMock(IDateTimeZone::class);
		$this->db = $this->createMock(IDBConnection::class);
		$this->logger = $this->createMock(LoggerInterface::class);
		$this->l = $this->createMock(IL10N::class);

		$this->dateTimeZone->method('getTimeZone')->willReturn(new DateTimeZone('UTC'));
		$this->l->method('t')->willReturnCallback(
			fn (string $text, array $p = []): string => $p === [] ? $text : vsprintf($text, $p)
		);
		// Threshold = 10h * 60 + 45 = 645 minutes.
		$this->settingsMapper->method('getValueAsFloat')
			->with(CompanySetting::KEY_MAX_DAILY_HOURS)->willReturn(10.0);
		$this->settingsMapper->method('getValueAsInt')
			->with(CompanySetting::KEY_MIN_BREAK_MINUTES_9H)->willReturn(45);

		$this->service = new PunchService(
			$this->mapper,
			$this->timeEntryService,
			$this->settingsMapper,
			$this->dateTimeZone,
			$this->db,
			$this->logger,
			$this->l,
		);
	}

	private function punch(DateTime $startedAt, int $breakSeconds = 0, ?DateTime $pausedAt = null): ActivePunch {
		$p = new ActivePunch();
		$p->setId(1);
		$p->setEmployeeId(7);
		$p->setStartedAt($startedAt);
		$p->setPausedAt($pausedAt);
		$p->setBreakSeconds($breakSeconds);
		$p->setCreatedAt($startedAt);
		return $p;
	}

	private function utc(string $iso): DateTime {
		return new DateTime($iso, new DateTimeZone('UTC'));
	}

	// --- punch-in ---------------------------------------------------------

	public function testPunchInWhenAlreadyOpenThrowsConflict(): void {
		$this->mapper->method('findByEmployeeOrNull')->willReturn($this->punch($this->utc('2020-01-01 08:00:00')));
		$this->mapper->expects($this->never())->method('insert');

		$this->expectException(PunchConflictException::class);
		$this->service->punchIn(7, null, null, 'web');
	}

	public function testPunchInInsertsFreshPunch(): void {
		$this->mapper->method('findByEmployeeOrNull')->willReturn(null);
		$this->mapper->expects($this->once())->method('insert')
			->willReturnCallback(fn (ActivePunch $p): ActivePunch => $p);

		$result = $this->service->punchIn(7, 3, 'Aussentermin', 'web');

		$this->assertSame(7, $result->getEmployeeId());
		$this->assertSame(0, $result->getBreakSeconds());
		$this->assertNull($result->getPausedAt());
		$this->assertSame(3, $result->getProjectId());
		$this->assertSame('Aussentermin', $result->getDescription());
		$this->assertSame('web', $result->getCreatedVia());
		$this->assertNotNull($result->getStartedAt());
	}

	// --- pause / resume ---------------------------------------------------

	public function testResumeAccumulatesBreakSeconds(): void {
		$pausedAt = (new DateTime('now', new DateTimeZone('UTC')))->modify('-600 seconds');
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 100, $pausedAt);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->method('update')->willReturnCallback(fn (ActivePunch $p): ActivePunch => $p);

		$result = $this->service->punchResume(7);

		// 100 prior + ~600 elapsed; allow a couple of seconds of execution slack.
		$this->assertGreaterThanOrEqual(699, $result->getBreakSeconds());
		$this->assertLessThanOrEqual(603 + 100, $result->getBreakSeconds());
		$this->assertNull($result->getPausedAt());
	}

	public function testPauseWhenNotOpenThrowsConflict(): void {
		$this->mapper->method('findByEmployeeOrNull')->willReturn(null);
		$this->expectException(PunchConflictException::class);
		$this->service->punchPause(7);
	}

	public function testPauseWhenAlreadyPausedThrowsConflict(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0, $this->utc('2020-01-01 12:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->expectException(PunchConflictException::class);
		$this->service->punchPause(7);
	}

	public function testResumeWhenNotPausedThrowsConflict(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->expectException(PunchConflictException::class);
		$this->service->punchResume(7);
	}

	// --- punch-out --------------------------------------------------------

	public function testPunchOutWithoutLiveBreakUsesSuggestedBreak(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->expects($this->once())->method('suggestBreak')
			->with('08:00', '16:30')->willReturn(30);
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '16:30', 30, null, null, 'user1')
			->willReturn(new TimeEntry());
		$this->mapper->expects($this->once())->method('delete')->with($punch);
		$this->db->expects($this->once())->method('beginTransaction');
		$this->db->expects($this->once())->method('commit');

		$this->service->punchOut(7, 'user1', null, null, null, '16:30', false);
	}

	public function testPunchOutWithLiveBreakUsesAccumulatedSeconds(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 3600); // 1h live break
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->expects($this->never())->method('suggestBreak');
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '16:30', 60, null, null, 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', null, null, null, '16:30', false);
	}

	public function testPunchOutBreakOverrideWins(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 3600);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->expects($this->never())->method('suggestBreak');
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '16:30', 15, null, null, 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', 15, null, null, '16:30', false);
	}

	public function testPunchOutInheritsPunchProjectAndDescription(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0);
		$punch->setProjectId(9);
		$punch->setDescription('Notiz');
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->method('suggestBreak')->willReturn(30);
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '16:30', 30, 9, 'Notiz', 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', null, null, null, '16:30', false);
	}

	public function testPunchOutCreateFailureLeavesPunchOpen(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->method('suggestBreak')->willReturn(30);
		$this->timeEntryService->method('create')
			->willThrowException(new ValidationException(['overlap' => ['Overlap']]));
		$this->mapper->expects($this->never())->method('delete');
		$this->db->expects($this->once())->method('beginTransaction');
		$this->db->expects($this->once())->method('rollBack');
		$this->db->expects($this->never())->method('commit');

		$this->expectException(ValidationException::class);
		$this->service->punchOut(7, 'user1', null, null, null, '16:30', false);
	}

	public function testPunchOutWhenNotOpenThrowsConflict(): void {
		$this->mapper->method('findByEmployeeOrNull')->willReturn(null);
		$this->timeEntryService->expects($this->never())->method('create');
		$this->expectException(PunchConflictException::class);
		$this->service->punchOut(7, 'user1', null, null, null, null, false);
	}

	public function testOverlongPunchRequiresConfirmation(): void {
		$startedAt = (new DateTime('now', new DateTimeZone('UTC')))->modify('-20 hours');
		$punch = $this->punch($startedAt, 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->method('suggestBreak')->willReturn(45);
		$this->timeEntryService->expects($this->never())->method('create');

		try {
			$this->service->punchOut(7, 'user1', null, null, null, null, false);
			$this->fail('Expected PunchConfirmationRequiredException');
		} catch (PunchConfirmationRequiredException $e) {
			$s = $e->getSuggested();
			$this->assertSame(45, $s['breakMinutes']);
			$this->assertGreaterThanOrEqual(19.9, $s['hoursElapsed']);
			$this->assertArrayHasKey('startTime', $s);
			$this->assertArrayHasKey('endTime', $s);
		}
	}

	public function testOverlongPunchWithConfirmBooks(): void {
		$startedAt = (new DateTime('now', new DateTimeZone('UTC')))->modify('-20 hours');
		$punch = $this->punch($startedAt, 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->method('suggestBreak')->willReturn(45);
		$this->timeEntryService->expects($this->once())->method('create')->willReturn(new TimeEntry());
		$this->mapper->expects($this->once())->method('delete')->with($punch);

		$result = $this->service->punchOut(7, 'user1', null, null, null, null, true);
		$this->assertInstanceOf(TimeEntry::class, $result);
	}

	// --- getActive --------------------------------------------------------

	public function testGetActiveReturnsNullWhenNone(): void {
		$this->mapper->method('findByEmployeeOrNull')->willReturn(null);
		$this->assertNull($this->service->getActive(7));
	}

	public function testGetActiveReturnsPunch(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->assertSame($punch, $this->service->getActive(7));
	}
}
