<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\BackgroundJob;

use DateTime;
use DateTimeZone;
use OCA\WorkTime\Db\ActivePunch;
use OCA\WorkTime\Db\ActivePunchMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCA\WorkTime\Notification\NotificationService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\TimedJob;
use Psr\Log\LoggerInterface;

/**
 * Stopwatch reminders (#588). Scans open punches and notifies the employee when
 * a live break runs too long or a punch runs past the daily threshold (likely a
 * forgotten clock-out). Runs on the server, so it works cross-device and covers
 * a closed browser — and because it re-checks the live state each run, punching
 * out or resuming stops the reminders (no cross-device false alarm).
 *
 * The notifications carry a deterministic datetime + object id, so a repeated
 * run produces an identical notification that Nextcloud deduplicates instead of
 * spamming.
 */
class PunchReminderJob extends TimedJob {

	public function __construct(
		ITimeFactory $time,
		private ActivePunchMapper $punchMapper,
		private CompanySettingMapper $settingsMapper,
		private NotificationService $notificationService,
		private LoggerInterface $logger,
	) {
		parent::__construct($time);
		// Every 15 minutes — reminder granularity, not real-time.
		$this->setInterval(900);
	}

	protected function run($argument): void {
		$punches = $this->punchMapper->findAll();
		if (empty($punches)) {
			return;
		}

		$maxPauseMinutes = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MAX_PAUSE_MINUTES);
		$maxDailyHours = $this->settingsMapper->getValueAsFloat(CompanySetting::KEY_MAX_DAILY_HOURS);
		$break9h = $this->settingsMapper->getValueAsInt(CompanySetting::KEY_MIN_BREAK_MINUTES_9H);
		// Same threshold as the punch-out overlong guard (#584).
		$overlongMinutes = (int)round($maxDailyHours * 60) + $break9h;

		$now = $this->time->getTime();

		foreach ($punches as $punch) {
			try {
				$this->checkPunch($punch, $now, $maxPauseMinutes, $overlongMinutes);
			} catch (\Throwable $e) {
				// One bad row must not stop the scan.
				$this->logger->warning('WorkTime punch reminder failed for punch ' . $punch->getId(), ['exception' => $e]);
			}
		}
	}

	private function checkPunch(ActivePunch $punch, int $now, int $maxPauseMinutes, int $overlongMinutes): void {
		$nowUtc = gmdate('Y-m-d H:i:s', $now);

		if ($punch->isPaused()) {
			if ($maxPauseMinutes <= 0) {
				return;
			}
			$pausedAt = $this->toUtcTimestamp($punch->getPausedAt());
			$thresholdTs = $pausedAt + $maxPauseMinutes * 60;
			// markPauseReminded returns 1 only on the first run past the threshold
			// for this pause segment — so the reminder fires exactly once (#588).
			if ($now >= $thresholdTs && $this->punchMapper->markPauseReminded($punch->getId(), $nowUtc) === 1) {
				$this->notificationService->notifyPunchPauseTooLong(
					$punch,
					new DateTime('@' . $thresholdTs),
					$maxPauseMinutes
				);
			}
			return;
		}

		$startedAt = $this->toUtcTimestamp($punch->getStartedAt());
		$thresholdTs = $startedAt + $overlongMinutes * 60;
		if ($now >= $thresholdTs && $this->punchMapper->markOutReminded($punch->getId(), $nowUtc) === 1) {
			$this->notificationService->notifyPunchForgotClockOut(
				$punch,
				new DateTime('@' . $thresholdTs),
				(int)ceil($overlongMinutes / 60)
			);
		}
	}

	/**
	 * Stored datetimes carry UTC wall-clock digits but are hydrated in the PHP
	 * default timezone; reinterpret them as UTC (same as PunchService).
	 */
	private function toUtcTimestamp(?DateTime $stored): int {
		if ($stored === null) {
			return 0;
		}
		$utc = DateTime::createFromFormat('Y-m-d H:i:s', $stored->format('Y-m-d H:i:s'), new DateTimeZone('UTC'));
		return ($utc ?: $stored)->getTimestamp();
	}
}
