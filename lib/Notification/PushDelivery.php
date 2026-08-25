<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Notification;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Service\Apns\ApnsClient;
use OCP\IUserManager;
use OCP\L10N\IFactory;
use Psr\Log\LoggerInterface;

/**
 * Phase B/C (#593, worktime-mobile#19): mirror the relevant in-app
 * notifications to an APNs push, so the recipient is reached on their phone —
 * a supervisor when something needs approval (submitted), an employee when a
 * decision is made (approved/rejected) or a stopwatch reminder fires (#588).
 *
 * This sits next to {@see NotificationService}: that class writes the on-screen
 * notification, this one additionally pushes it. The push text is rendered in
 * the *recipient's* language and reuses the exact same source strings as the
 * {@see Notifier}, so the two channels never drift apart and no separate
 * translation is needed.
 *
 * A push must never break the in-app notification: {@see send()} swallows every
 * error and only logs. It is called *after* notify() has already run, so even a
 * throw could not undo it — but the guarantee is made explicit here regardless.
 */
class PushDelivery {

	public function __construct(
		private ApnsClient $apnsClient,
		private IUserManager $userManager,
		private IFactory $l10nFactory,
		private LoggerInterface $logger,
	) {
	}

	/**
	 * Push one of the supported notification subjects to every device the
	 * recipient has registered. Unknown subjects and any failure are ignored
	 * (logged), so a push problem can never surface to the caller.
	 *
	 * @param array<string, mixed> $params the same subject parameters passed to
	 *                                      the in-app notification
	 */
	public function send(string $userId, string $subject, array $params): void {
		try {
			$body = $this->renderBody($userId, $subject, $params);
			if ($body === null) {
				return;
			}

			$payload = ApnsClient::alertPayload('WorkTime', $body, ['type' => $subject]);
			$this->apnsClient->sendToUser($userId, $payload);
		} catch (\Throwable $e) {
			// A push is best-effort. The in-app notification already went out;
			// never let a push failure propagate to the caller (#593 Phase B).
			$this->logger->warning('WorkTime push delivery failed (#593).', [
				'exception' => $e,
				'subject' => $subject,
			]);
		}
	}

	/**
	 * Render the push body in the recipient's language, or null if the subject is
	 * not one we push. Wording is kept identical to {@see Notifier} on purpose.
	 *
	 * @param array<string, mixed> $params
	 */
	private function renderBody(string $userId, string $subject, array $params): ?string {
		$user = $this->userManager->get($userId);
		$lang = $this->l10nFactory->getUserLanguage($user);
		$l = $this->l10nFactory->get(Application::APP_ID, $lang);

		switch ($subject) {
			case 'absence_submitted':
				return $l->t(
					'%1$s hat eine Abwesenheit (%2$s, %3$s - %4$s) zur Genehmigung eingereicht',
					[
						$params['employeeName'] ?? '',
						$params['typeName'] ?? '',
						$params['startDate'] ?? '',
						$params['endDate'] ?? '',
					]
				);

			case 'time_entries_submitted':
				return $l->t(
					'%1$s hat Zeiteinträge für %2$s zur Genehmigung eingereicht',
					[
						$params['employeeName'] ?? '',
						$this->formatMonthYear($params, $lang),
					]
				);

			case 'absence_approved':
				return $l->t(
					'Deine Abwesenheit (%1$s, %2$s - %3$s) wurde genehmigt',
					[
						$params['typeName'] ?? '',
						$params['startDate'] ?? '',
						$params['endDate'] ?? '',
					]
				);

			case 'absence_rejected':
				return $l->t(
					'Deine Abwesenheit (%1$s, %2$s - %3$s) wurde abgelehnt',
					[
						$params['typeName'] ?? '',
						$params['startDate'] ?? '',
						$params['endDate'] ?? '',
					]
				);

			case 'time_entries_approved':
				return $l->t(
					'Deine Zeiteinträge für %s wurden genehmigt',
					[$this->formatMonthYear($params, $lang)]
				);

			case 'time_entries_rejected':
				return $l->t(
					'Deine Zeiteinträge für %s wurden abgelehnt',
					[$this->formatMonthYear($params, $lang)]
				);

			case 'punch_pause_reminder':
				return $l->t(
					'Bist du noch in der Pause? Sie läuft seit über %d Minuten.',
					[(int)($params['maxPause'] ?? 60)]
				);

			case 'punch_out_reminder':
				return $l->t(
					'Du bist seit über %d Stunden eingestempelt. Nicht vergessen auszustempeln.',
					[(int)($params['hours'] ?? 10)]
				);

			default:
				return null;
		}
	}

	/**
	 * Month and year in the recipient's language, mirroring Notifier::formatMonthYear()
	 * so the pushed month name matches the in-app one (#537).
	 *
	 * @param array<string, mixed> $params
	 */
	private function formatMonthYear(array $params, string $languageCode): string {
		$month = (int)($params['month'] ?? 0);
		$year = (int)($params['year'] ?? 0);
		if ($month < 1 || $month > 12) {
			return (string)$year;
		}

		if (class_exists(\IntlDateFormatter::class)) {
			$formatter = new \IntlDateFormatter(
				$languageCode,
				\IntlDateFormatter::LONG,
				\IntlDateFormatter::NONE,
				null,
				null,
				// Standalone month name ("März"), not the genitive form.
				'LLLL yyyy'
			);
			$formatted = $formatter->format(mktime(0, 0, 0, $month, 1, $year));
			if ($formatted !== false) {
				return $formatted;
			}
		}

		return sprintf('%02d/%04d', $month, $year);
	}
}
