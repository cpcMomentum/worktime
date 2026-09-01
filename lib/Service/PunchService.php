<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use DateTimeZone;
use OCA\WorkTime\Db\ActivePunch;
use OCA\WorkTime\Db\ActivePunchMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Db\TimeEntry;
use OCP\DB\Exception as DbException;
use OCP\IDateTimeZone;
use OCP\IDBConnection;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

/**
 * Server-authoritative stopwatch (#584). Holds a single open punch per employee
 * and turns punch-out into a normal time entry through TimeEntryService::create(),
 * inheriting every validation (overlap, locked month #148, absence, §4 break,
 * required fields #329).
 */
class PunchService {

	public function __construct(
		private ActivePunchMapper $mapper,
		private TimeEntryService $timeEntryService,
		private CompanySettingMapper $settingsMapper,
		private IDateTimeZone $dateTimeZone,
		private IDBConnection $db,
		private LoggerInterface $logger,
		private IL10N $l,
	) {
	}

	/**
	 * The employee's open punch, or null.
	 */
	public function getActive(int $employeeId): ?ActivePunch {
		return $this->mapper->findByEmployeeOrNull($employeeId);
	}

	/**
	 * #664: Liegt diese offene Stempelung auf einem Notarbeit-berechtigten Tag
	 * (ganztägiger genehmigter Urlaub + Feature an)? Der Ausstempel-Dialog nutzt
	 * das, um den Notarbeit-Hinweis und das Pflicht-Begründungsfeld PROAKTIV zu
	 * zeigen — nicht erst nach einem reason_required-409. Sonst bliebe die Buchung
	 * still, wenn beim Einstempeln bereits eine (fachfremde) Notiz gesetzt wurde.
	 */
	public function isPunchEmergencyEligible(ActivePunch $punch): bool {
		$startLocal = $this->reinterpretAsUtc($punch->getStartedAt())->setTimezone($this->dateTimeZone->getTimeZone());
		return $this->timeEntryService->isEmergencyEligible($punch->getEmployeeId(), $startLocal);
	}

	/**
	 * Start a punch. Fails if one is already open (DB unique index is the final
	 * guard against a race between two devices).
	 *
	 * @throws PunchConflictException
	 */
	public function punchIn(int $employeeId, ?int $projectId, ?string $description, string $createdVia): ActivePunch {
		if ($this->mapper->findByEmployeeOrNull($employeeId) !== null) {
			throw new PunchConflictException($this->l->t('Es läuft bereits eine Stempelung.'));
		}

		$now = $this->nowUtc();

		// #664: Abwesenheits-Sperre schon beim Einstempeln prüfen. Sonst startet am
		// ganztägigen Urlaubstag eine Uhr, die punchOut später nicht mehr schließen
		// kann (create() blockt dort). Ein Notarbeit-berechtigter Urlaubstag (Feature
		// an) blockt nicht — dort läuft die Uhr bewusst, das Ausstempeln fragt dann
		// nach der Begründung.
		$startLocalDate = (clone $now)->setTimezone($this->dateTimeZone->getTimeZone());
		$blockMessage = $this->timeEntryService->punchInBlockMessage($employeeId, $startLocalDate);
		if ($blockMessage !== null) {
			throw new PunchConflictException($blockMessage);
		}
		$punch = new ActivePunch();
		$punch->setEmployeeId($employeeId);
		$punch->setStartedAt($now);
		$punch->setPausedAt(null);
		$punch->setBreakSeconds(0);
		$punch->setProjectId($projectId);
		$punch->setDescription($description !== null && $description !== '' ? $description : null);
		$punch->setCreatedVia($createdVia === 'ios' ? 'ios' : 'web');
		$punch->setCreatedAt($now);

		try {
			return $this->mapper->insert($punch);
		} catch (DbException $e) {
			// Unique-index violation: a parallel punch-in won the race.
			if ($e->getReason() === DbException::REASON_UNIQUE_CONSTRAINT_VIOLATION) {
				throw new PunchConflictException($this->l->t('Es läuft bereits eine Stempelung.'));
			}
			throw $e;
		}
	}

	/**
	 * Start a live break.
	 *
	 * @throws PunchConflictException
	 */
	public function punchPause(int $employeeId): ActivePunch {
		$punch = $this->requireOpen($employeeId);
		if ($punch->isPaused()) {
			throw new PunchConflictException($this->l->t('Die Stempelung ist bereits pausiert.'));
		}
		// Atomic conditional update (#612): two concurrent pauses serialize on the
		// row lock; only one flips paused_at, the other gets 0 affected.
		if ($this->mapper->pauseIfRunning($punch->getId(), $this->nowUtc()->format('Y-m-d H:i:s')) === 0) {
			throw new PunchConflictException($this->l->t('Die Stempelung ist bereits pausiert.'));
		}
		return $this->requireOpen($employeeId);
	}

	/**
	 * End a live break, accumulating its seconds.
	 *
	 * @throws PunchConflictException
	 */
	public function punchResume(int $employeeId): ActivePunch {
		$punch = $this->requireOpen($employeeId);
		if (!$punch->isPaused()) {
			throw new PunchConflictException($this->l->t('Es läuft gerade keine Pause.'));
		}
		// Accumulate the elapsed pause and clear paused_at in one atomic statement
		// (#612): the delta is added as column arithmetic guarded on paused_at IS
		// NOT NULL, so two concurrent resumes cannot double-count — the loser gets
		// 0 affected.
		$elapsed = $this->nowUtc()->getTimestamp() - $this->reinterpretAsUtc($punch->getPausedAt())->getTimestamp();
		if ($this->mapper->accumulateBreakAndResume($punch->getId(), $elapsed) === 0) {
			throw new PunchConflictException($this->l->t('Es läuft gerade keine Pause.'));
		}
		return $this->requireOpen($employeeId);
	}

	/**
	 * End the punch and book a time entry. Runs through TimeEntryService::create()
	 * so all entry validations apply; the open punch is removed only after a
	 * successful create (same transaction) — a failed create leaves it open.
	 *
	 * @throws PunchConflictException          no open punch
	 * @throws PunchConfirmationRequiredException  overlong and neither confirmed nor corrected
	 * @throws PunchReasonRequiredException    emergency work on a vacation day without a reason (#664)
	 * @throws ValidationException             from create() (overlap, locked month, absence, required fields)
	 */
	public function punchOut(
		int $employeeId,
		string $userId,
		?int $breakMinutes,
		?int $projectId,
		?string $description,
		?string $endTimeOverride,
		bool $confirmOverlong,
	): TimeEntry {
		$punch = $this->requireOpen($employeeId);

		$startedUtc = $this->reinterpretAsUtc($punch->getStartedAt());
		$tz = $this->dateTimeZone->getTimeZone();
		$startLocal = (clone $startedUtc)->setTimezone($tz);
		$date = $startLocal->format('Y-m-d');
		$startTime = $startLocal->format('H:i');

		// Resolve the end. An explicit override (HR correction) always wins.
		// Otherwise, punching out while still paused means the employee stopped
		// working at pausedAt — WorkTime measures work, not attendance, so the
		// running pause is discarded (end = pausedAt), not folded into the break
		// (#617). A running punch ends now. Completed pauses (pause → resume) stay
		// in break_seconds regardless.
		if ($endTimeOverride !== null && $endTimeOverride !== '') {
			$endTime = $endTimeOverride;
			$effectiveEndUtc = $this->nowUtc();
		} elseif ($punch->isPaused()) {
			$effectiveEndUtc = $this->reinterpretAsUtc($punch->getPausedAt());
			$endTime = (clone $effectiveEndUtc)->setTimezone($tz)->format('H:i');
		} else {
			$effectiveEndUtc = $this->nowUtc();
			$endTime = (clone $effectiveEndUtc)->setTimezone($tz)->format('H:i');
		}

		// Real elapsed time drives the overlong guard — the wall-clock H:i span
		// caps at 24h and would miss a multi-day "forgot to punch out" (edge case 3).
		// It runs to the effective end (pausedAt when punching out of a pause), so a
		// punch left paused for hours is not falsely flagged as overlong.
		$realElapsedMinutes = (int)floor(($effectiveEndUtc->getTimestamp() - $startedUtc->getTimestamp()) / 60);

		// Break: explicit override wins; otherwise the accumulated live break;
		// otherwise the automatic §4 suggestion.
		if ($breakMinutes !== null) {
			$resolvedBreak = max(0, $breakMinutes);
		} elseif ($punch->getBreakSeconds() > 0) {
			$resolvedBreak = (int)round($punch->getBreakSeconds() / 60);
		} else {
			$resolvedBreak = $this->timeEntryService->suggestBreak($startTime, $endTime);
		}

		// Overlong guard (#584): don't book blindly. The client must confirm or
		// correct the end. A supplied endTime override counts as a correction.
		if ($endTimeOverride === null && !$confirmOverlong && $realElapsedMinutes > $this->overlongThresholdMinutes()) {
			throw new PunchConfirmationRequiredException([
				'date' => $date,
				'startTime' => $startTime,
				'endTime' => $endTime,
				'breakMinutes' => $resolvedBreak,
				'hoursElapsed' => round($realElapsedMinutes / 60, 2),
			]);
		}

		// #615: distinguish "not specified" (inherit the punch-in project) from
		// "explicitly cleared". A nullable int cannot express both, so the client
		// sends the sentinel 0 to mean "no project"; null/omitted still inherits.
		// Without this there was no way to remove a project at punch-out — the
		// "Kein Projekt" choice in the dialog had no effect.
		$resolvedProject = $projectId === 0 ? null : ($projectId ?? $punch->getProjectId());
		$resolvedDescription = $description ?? $punch->getDescription();

		// #664: Fällt die Stempelung auf einen Notarbeit-berechtigten Urlaubstag
		// (voller genehmigter Urlaub + Feature an, #626), braucht sie eine Pflicht-
		// Begründung. Fehlt sie, den Punch NICHT konsumieren, sondern per 409
		// reason_required zurückfragen — analog zum Overlong-confirmation-Flow.
		$isEmergency = $this->timeEntryService->isEmergencyEligible($employeeId, $startLocal);
		if ($isEmergency && trim((string)$resolvedDescription) === '') {
			throw new PunchReasonRequiredException(
				[
					'date' => $date,
					'startTime' => $startTime,
					'endTime' => $endTime,
					'breakMinutes' => $resolvedBreak,
				],
				$this->l->t('Für Notarbeit im Urlaub ist eine Begründung erforderlich.'),
			);
		}

		$this->db->beginTransaction();
		try {
			// Consume the punch first (inside the transaction). A concurrent
			// punch-out — double click, retry — blocks on this row and then finds
			// 0 affected once we commit, so it cannot book a second entry. If
			// create() fails afterwards, the rollback restores this row, so the
			// punch stays open (nothing lost).
			if ($this->mapper->deleteById($punch->getId()) === 0) {
				throw new PunchConflictException($this->l->t('Es läuft keine Stempelung.'));
			}

			$entry = $this->timeEntryService->create(
				$employeeId,
				$date,
				$startTime,
				$endTime,
				$resolvedBreak,
				$resolvedProject,
				$resolvedDescription,
				$userId,
				null,
				false,
				$isEmergency,
			);
			$this->db->commit();
			return $entry;
		} catch (\Throwable $e) {
			$this->db->rollBack();
			throw $e;
		}
	}

	/**
	 * @throws PunchConflictException
	 */
	private function requireOpen(int $employeeId): ActivePunch {
		$punch = $this->mapper->findByEmployeeOrNull($employeeId);
		if ($punch === null) {
			throw new PunchConflictException($this->l->t('Es läuft keine Stempelung.'));
		}
		return $punch;
	}

	private function overlongThresholdMinutes(): int {
		$maxDailyHours = $this->settingsMapper->getValueAsFloat(CompanySetting::KEY_MAX_DAILY_HOURS);
		$break9h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_9H);
		return (int)round($maxDailyHours * 60) + $break9h;
	}

	private function nowUtc(): DateTime {
		return new DateTime('now', new DateTimeZone('UTC'));
	}

	/**
	 * Reinterpret a stored datetime's wall-clock digits as UTC, independent of the
	 * PHP default timezone the mapper used when reading it back.
	 */
	private function reinterpretAsUtc(DateTime $stored): DateTime {
		return DateTime::createFromFormat('Y-m-d H:i:s', $stored->format('Y-m-d H:i:s'), new DateTimeZone('UTC'))
			?: (clone $stored);
	}
}
