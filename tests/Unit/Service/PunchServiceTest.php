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
use OCA\WorkTime\Service\PunchReasonRequiredException;
use OCA\WorkTime\Service\PunchService;
use OCA\WorkTime\Service\PunchTooLongException;
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

	public function testPunchInBlockedByFullDayAbsenceThrowsConflict(): void {
		// #664: a full-day absence must block punch-in early, so no clock starts that
		// punch-out could not later close.
		$this->mapper->method('findByEmployeeOrNull')->willReturn(null);
		$this->timeEntryService->method('punchInBlockMessage')
			->willReturn('An diesem Tag haben Sie Urlaub. Bitte stornieren Sie zuerst die Abwesenheit.');
		$this->mapper->expects($this->never())->method('insert');

		$this->expectException(PunchConflictException::class);
		$this->service->punchIn(7, null, null, 'web');
	}

	public function testPunchInAllowedOnEmergencyEligibleVacationDay(): void {
		// #664: emergency work enabled on a full vacation day → not blocked; the clock
		// starts and punch-out will ask for the reason.
		$this->mapper->method('findByEmployeeOrNull')->willReturn(null);
		$this->timeEntryService->method('punchInBlockMessage')->willReturn(null);
		$this->mapper->expects($this->once())->method('insert')
			->willReturnCallback(fn (ActivePunch $p): ActivePunch => $p);

		$result = $this->service->punchIn(7, null, null, 'ios');
		$this->assertSame(7, $result->getEmployeeId());
	}

	// --- pause / resume ---------------------------------------------------

	public function testPauseUsesAtomicConditionalUpdate(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		// Atomic pause must run as a guarded UPDATE, not a read-then-update.
		$this->mapper->expects($this->never())->method('update');
		$this->mapper->expects($this->once())->method('pauseIfRunning')
			->with(1, $this->isType('string'))->willReturn(1);

		$result = $this->service->punchPause(7);
		$this->assertInstanceOf(ActivePunch::class, $result);
	}

	public function testPauseLosingTheRaceThrowsConflict(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		// A concurrent pause already flipped paused_at → 0 affected.
		$this->mapper->method('pauseIfRunning')->willReturn(0);

		$this->expectException(PunchConflictException::class);
		$this->service->punchPause(7);
	}

	public function testResumeAccumulatesElapsedViaAtomicUpdate(): void {
		$pausedAt = (new DateTime('now', new DateTimeZone('UTC')))->modify('-600 seconds');
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 100, $pausedAt);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->expects($this->never())->method('update');
		// The elapsed pause (~600s) is added as column arithmetic, not in PHP.
		$this->mapper->expects($this->once())->method('accumulateBreakAndResume')
			->with(1, $this->callback(fn (int $d): bool => $d >= 599 && $d <= 602))
			->willReturn(1);

		$result = $this->service->punchResume(7);
		$this->assertInstanceOf(ActivePunch::class, $result);
	}

	public function testResumeLosingTheRaceThrowsConflict(): void {
		$pausedAt = (new DateTime('now', new DateTimeZone('UTC')))->modify('-600 seconds');
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 100, $pausedAt);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		// A concurrent resume already cleared paused_at → 0 affected, no double-count.
		$this->mapper->method('accumulateBreakAndResume')->willReturn(0);

		$this->expectException(PunchConflictException::class);
		$this->service->punchResume(7);
	}

	public function testPauseWhenNotOpenThrowsConflict(): void {
		$this->mapper->method('findByEmployeeOrNull')->willReturn(null);
		$this->expectException(PunchConflictException::class);
		$this->service->punchPause(7);
	}

	public function testPauseWhenAlreadyPausedThrowsConflict(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0, $this->utc('2020-01-01 12:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->expects($this->never())->method('pauseIfRunning');
		$this->expectException(PunchConflictException::class);
		$this->service->punchPause(7);
	}

	public function testResumeWhenNotPausedThrowsConflict(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->expects($this->never())->method('accumulateBreakAndResume');
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
		$this->mapper->expects($this->once())->method('deleteById')->with(1)->willReturn(1);
		$this->db->expects($this->once())->method('beginTransaction');
		$this->db->expects($this->once())->method('commit');

		$this->service->punchOut(7, 'user1', null, null, null, '16:30', false);
	}

	public function testPunchOutWithLiveBreakUsesAccumulatedSeconds(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 3600); // 1h live break
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->method('deleteById')->willReturn(1);
		$this->timeEntryService->expects($this->never())->method('suggestBreak');
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '16:30', 60, null, null, 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', null, null, null, '16:30', false);
	}

	public function testPunchOutBreakOverrideWins(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 3600);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->method('deleteById')->willReturn(1);
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
		$this->mapper->method('deleteById')->willReturn(1);
		$this->timeEntryService->method('suggestBreak')->willReturn(30);
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '16:30', 30, 9, 'Notiz', 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', null, null, null, '16:30', false);
	}

	public function testPunchOutClearsProjectWithSentinelZero(): void {
		// #615: projectId 0 = explicit "no project" — the punch-in project (9) is
		// dropped, create() receives null, not the inherited 9.
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0);
		$punch->setProjectId(9);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->method('deleteById')->willReturn(1);
		$this->timeEntryService->method('suggestBreak')->willReturn(30);
		// identicalTo(null): PHPUnit's default with() uses loose ==, and 0 == null in
		// PHP — so a plain null would also match a leaked 0. Strict === is what
		// actually distinguishes "cleared" (null) from the un-fixed sentinel (0).
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '16:30', 30, $this->identicalTo(null), null, 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', null, 0, null, '16:30', false);
	}

	public function testPunchOutSetsExplicitProjectOverInherited(): void {
		// #615: a real project id overrides the punch-in project.
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0);
		$punch->setProjectId(9);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->method('deleteById')->willReturn(1);
		$this->timeEntryService->method('suggestBreak')->willReturn(30);
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '16:30', 30, 3, null, 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', null, 3, null, '16:30', false);
	}

	public function testPunchOutCreateFailureLeavesPunchOpen(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->method('deleteById')->willReturn(1);
		$this->timeEntryService->method('suggestBreak')->willReturn(30);
		$this->timeEntryService->method('create')
			->willThrowException(new ValidationException(['overlap' => ['Overlap']]));
		// The consuming delete runs inside the transaction, so the rollback (not a
		// skipped delete) is what keeps the punch open on a create() failure.
		$this->db->expects($this->once())->method('beginTransaction');
		$this->db->expects($this->once())->method('rollBack');
		$this->db->expects($this->never())->method('commit');

		$this->expectException(ValidationException::class);
		$this->service->punchOut(7, 'user1', null, null, null, '16:30', false);
	}

	public function testConcurrentPunchOutSecondFindsNoPunchAndBooksNothing(): void {
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		// A parallel punch-out already consumed the row: 0 affected.
		$this->mapper->method('deleteById')->willReturn(0);
		$this->timeEntryService->method('suggestBreak')->willReturn(30);
		$this->timeEntryService->expects($this->never())->method('create');
		$this->db->expects($this->once())->method('rollBack');
		$this->db->expects($this->never())->method('commit');

		$this->expectException(PunchConflictException::class);
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

	public function testPunchOutOver24hRejectedAsTooLong(): void {
		// #613: open > 24h spans multiple calendar days — cannot book as one entry.
		// Rejected unconditionally, even with confirm=true.
		$startedAt = (new DateTime('now', new DateTimeZone('UTC')))->modify('-25 hours');
		$punch = $this->punch($startedAt, 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->method('suggestBreak')->willReturn(45);
		$this->timeEntryService->expects($this->never())->method('create');
		$this->mapper->expects($this->never())->method('deleteById');

		$this->expectException(PunchTooLongException::class);
		$this->service->punchOut(7, 'user1', null, null, null, null, true);
	}

	public function testDiscardRemovesOpenPunch(): void {
		// #613: discard drops the punch without booking anything.
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->expects($this->once())->method('deleteById')->with(1)->willReturn(1);
		$this->timeEntryService->expects($this->never())->method('create');

		$this->service->discard(7);
	}

	public function testDiscardWithoutOpenPunchThrows(): void {
		$this->mapper->method('findByEmployeeOrNull')->willReturn(null);
		$this->mapper->expects($this->never())->method('deleteById');

		$this->expectException(PunchConflictException::class);
		$this->service->discard(7);
	}

	public function testOverlongPunchWithConfirmBooks(): void {
		$startedAt = (new DateTime('now', new DateTimeZone('UTC')))->modify('-20 hours');
		$punch = $this->punch($startedAt, 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->method('suggestBreak')->willReturn(45);
		$this->timeEntryService->expects($this->once())->method('create')->willReturn(new TimeEntry());
		$this->mapper->expects($this->once())->method('deleteById')->with(1)->willReturn(1);

		$result = $this->service->punchOut(7, 'user1', null, null, null, null, true);
		$this->assertInstanceOf(TimeEntry::class, $result);
	}

	// --- emergency work on a vacation day (#664 / #626) --------------------

	public function testPunchOutEmergencyWithoutReasonAsksForReason(): void {
		// #664: punching out on a full approved vacation day (emergency enabled) with
		// no reason must not consume the punch — it asks for the reason via 409.
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->timeEntryService->method('suggestBreak')->willReturn(30);
		$this->timeEntryService->method('isEmergencyEligible')->willReturn(true);
		$this->timeEntryService->expects($this->never())->method('create');
		$this->mapper->expects($this->never())->method('deleteById');
		$this->db->expects($this->never())->method('beginTransaction');

		try {
			$this->service->punchOut(7, 'user1', null, null, null, '16:30', false);
			$this->fail('Expected PunchReasonRequiredException');
		} catch (PunchReasonRequiredException $e) {
			$s = $e->getSuggested();
			$this->assertSame('2020-01-01', $s['date']);
			$this->assertSame('08:00', $s['startTime']);
			$this->assertSame('16:30', $s['endTime']);
			$this->assertSame(30, $s['breakMinutes']);
		}
	}

	public function testIsPunchEmergencyEligibleDelegatesForTheOpenPunch(): void {
		// #664: the punch-out dialog reads this to show the emergency hint proactively.
		$punch = $this->punch($this->utc('2026-08-31 07:00:00'));
		$this->timeEntryService->expects($this->once())->method('isEmergencyEligible')
			->with(7, $this->isInstanceOf(DateTime::class))->willReturn(true);

		$this->assertTrue($this->service->isPunchEmergencyEligible($punch));
	}

	public function testPunchOutEmergencyWithReasonBooksAsEmergency(): void {
		// #664: with a reason, the entry books through the emergency path — create()
		// receives isEmergency = true (11th argument).
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->method('deleteById')->willReturn(1);
		$this->timeEntryService->method('suggestBreak')->willReturn(30);
		$this->timeEntryService->method('isEmergencyEligible')->willReturn(true);
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '16:30', 30, null, 'Serverausfall', 'user1', null, false, true)
			->willReturn(new TimeEntry());

		$result = $this->service->punchOut(7, 'user1', null, null, 'Serverausfall', '16:30', false);
		$this->assertInstanceOf(TimeEntry::class, $result);
	}

	// --- punch-out from a running pause (#617) ----------------------------

	public function testPunchOutFromRunningPauseEndsAtPausedAtAndDiscardsPause(): void {
		// Paused, punched out without resuming, no completed breaks: the entry ends
		// at pausedAt and books no break — the running pause is discarded, not folded.
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0, $this->utc('2020-01-01 08:05:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->expects($this->once())->method('deleteById')->with(1)->willReturn(1);
		// End is pausedAt (08:05), so the §4 suggestion sees the real 5-minute span.
		$this->timeEntryService->expects($this->once())->method('suggestBreak')
			->with('08:00', '08:05')->willReturn(0);
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '08:05', 0, null, null, 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', null, null, null, null, false);
	}

	public function testPunchOutFromRunningPauseKeepsCompletedBreaksAndDiscardsLast(): void {
		// One completed break (30 min in break_seconds) plus a second, still-running
		// pause at 12:00. Punch-out ends at 12:00, books only the completed 30 min;
		// the running pause is neither folded nor counted.
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 1800, $this->utc('2020-01-01 12:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->method('deleteById')->willReturn(1);
		// break_seconds > 0 → accumulated break wins, no §4 suggestion.
		$this->timeEntryService->expects($this->never())->method('suggestBreak');
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '12:00', 30, null, null, 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', null, null, null, null, false);
	}

	public function testPunchOutFromPauseWithEndOverrideLetsOverrideWin(): void {
		// An explicit end override (HR correction) beats pausedAt.
		$punch = $this->punch($this->utc('2020-01-01 08:00:00'), 0, $this->utc('2020-01-01 12:00:00'));
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->method('deleteById')->willReturn(1);
		$this->timeEntryService->method('suggestBreak')->with('08:00', '17:00')->willReturn(45);
		$this->timeEntryService->expects($this->once())->method('create')
			->with(7, '2020-01-01', '08:00', '17:00', 45, null, null, 'user1')
			->willReturn(new TimeEntry());

		$this->service->punchOut(7, 'user1', null, null, null, '17:00', false);
	}

	public function testPunchOutLongPausedIsNotFlaggedOverlong(): void {
		// Punched in 20h ago but paused 5 minutes in and left running: the effective
		// end is pausedAt, so the real work span is 5 minutes — the overlong guard
		// must not fire (regression: guard once measured now − start).
		$startedAt = (new DateTime('now', new DateTimeZone('UTC')))->modify('-20 hours');
		$pausedAt = (clone $startedAt)->modify('+5 minutes');
		$punch = $this->punch($startedAt, 0, $pausedAt);
		$this->mapper->method('findByEmployeeOrNull')->willReturn($punch);
		$this->mapper->expects($this->once())->method('deleteById')->with(1)->willReturn(1);
		$this->timeEntryService->method('suggestBreak')->willReturn(0);
		$this->timeEntryService->expects($this->once())->method('create')->willReturn(new TimeEntry());

		// No confirmation needed despite the 20h-old start.
		$result = $this->service->punchOut(7, 'user1', null, null, null, null, false);
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
