<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Notification;

use OCA\WorkTime\AppInfo\Application;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;
use OCP\Notification\UnknownNotificationException;

class Notifier implements INotifier {

	public function __construct(
		private IURLGenerator $urlGenerator,
		private IFactory $l10nFactory,
	) {
	}

	public function getID(): string {
		return Application::APP_ID;
	}

	public function getName(): string {
		return 'WorkTime';
	}

	public function prepare(INotification $notification, string $languageCode): INotification {
		if ($notification->getApp() !== Application::APP_ID) {
			throw new UnknownNotificationException();
		}

		try {
			return $this->prepareWorkTimeNotification($notification, $languageCode);
		} catch (UnknownNotificationException $e) {
			// Genuinely unknown subject — let NC handle it.
			throw $e;
		} catch (\InvalidArgumentException $e) {
			// Safety net: an NC INotification setter rejected a value while
			// building a known notification. The concrete #551 cause (a relative
			// icon URL) is fixed above with getAbsoluteURL(), so this should no
			// longer fire in normal operation; it stays to guard against any
			// other setter rejection on a future NC version. NC 34+ deprecates
			// letting \InvalidArgumentException escape prepare(), so convert it
			// and discard the undisplayable notification cleanly.
			throw new UnknownNotificationException();
		}
	}

	/**
	 * Build a known WorkTime notification. Any \InvalidArgumentException raised
	 * by an NC setter while building it (e.g. a value NC rejects on a given
	 * version) is caught and handled by prepare().
	 */
	private function prepareWorkTimeNotification(INotification $notification, string $languageCode): INotification {
		$l = $this->l10nFactory->get(Application::APP_ID, $languageCode);
		$params = $notification->getSubjectParameters();
		$monthYear = $this->formatMonthYear($params, $languageCode);

		switch ($notification->getSubject()) {
			case 'absence_submitted':
				$notification->setParsedSubject(
					$l->t(
						'%1$s hat eine Abwesenheit (%2$s, %3$s - %4$s) zur Genehmigung eingereicht',
						[
							$params['employeeName'],
							$params['typeName'],
							$params['startDate'],
							$params['endDate'],
						]
					)
				);
				break;

			case 'absence_approved':
				$notification->setParsedSubject(
					$l->t(
						'Deine Abwesenheit (%1$s, %2$s - %3$s) wurde genehmigt',
						[
							$params['typeName'],
							$params['startDate'],
							$params['endDate'],
						]
					)
				);
				break;

			case 'absence_rejected':
				$notification->setParsedSubject(
					$l->t(
						'Deine Abwesenheit (%1$s, %2$s - %3$s) wurde abgelehnt',
						[
							$params['typeName'],
							$params['startDate'],
							$params['endDate'],
						]
					)
				);
				break;

			case 'absence_informational':
				$notification->setParsedSubject(
					$l->t(
						'Information: %1$s ist abwesend (%2$s, %3$s - %4$s)',
						[
							$params['employeeName'],
							$params['typeName'],
							$params['startDate'],
							$params['endDate'],
						]
					)
				);
				break;

			case 'absence_cancelled':
				$notification->setParsedSubject(
					$l->t(
						'%1$s hat Abwesenheit (%2$s, %3$s - %4$s) storniert',
						[
							$params['employeeName'],
							$params['typeName'],
							$params['startDate'],
							$params['endDate'],
						]
					)
				);
				break;

			case 'time_entries_submitted':
				$notification->setParsedSubject(
					$l->t(
						'%1$s hat Zeiteinträge für %2$s zur Genehmigung eingereicht',
						[
							$params['employeeName'],
							$monthYear,
						]
					)
				);
				break;

			case 'time_entries_approved':
				$notification->setParsedSubject(
					$l->t(
						'Deine Zeiteinträge für %s wurden genehmigt',
						[$monthYear]
					)
				);
				break;

			case 'time_entries_rejected':
				$notification->setParsedSubject(
					$l->t(
						'Deine Zeiteinträge für %s wurden abgelehnt',
						[$monthYear]
					)
				);
				break;

			case 'time_entries_reopened':
				if (!empty($params['reason'])) {
					$notification->setParsedSubject(
						$l->t(
							'Die Genehmigung deiner Zeiteinträge für %1$s wurde zurückgenommen (Grund: %2$s). Bitte erneut einreichen.',
							[$monthYear, $params['reason']]
						)
					);
				} else {
					$notification->setParsedSubject(
						$l->t(
							'Die Genehmigung deiner Zeiteinträge für %s wurde zurückgenommen. Bitte erneut einreichen.',
							[$monthYear]
						)
					);
				}
				break;

			case 'archive_failed':
				$notification->setParsedSubject(
					$l->t(
						'PDF-Archivierung für %1$s (%2$s) ist fehlgeschlagen',
						[$params['employeeName'], $monthYear]
					)
				);
				if (!empty($params['error'])) {
					$notification->setParsedMessage(
						$l->t('Fehler: %s', [$params['error']])
					);
				}
				break;

			default:
				throw new UnknownNotificationException();
		}

		// #551: NC 34's setIcon() rejects anything that is not an absolute
		// http(s) URL, and imagePath() returns a relative path. Passing the raw
		// imagePath() throws InvalidValueException (⊂ \InvalidArgumentException),
		// which aborts prepare() before setLink() — the notification then loses
		// both its icon and its link (and NC 34 logs the throw on every cycle).
		// Wrap it in getAbsoluteURL() so the icon is a valid absolute URL.
		$notification->setIcon(
			$this->urlGenerator->getAbsoluteURL(
				$this->urlGenerator->imagePath(Application::APP_ID, 'app-dark.svg')
			)
		);
		$notification->setLink(
			$this->urlGenerator->linkToRouteAbsolute('worktime.page.index')
		);

		return $notification;
	}

	/**
	 * Month and year in the recipient's language (#537).
	 *
	 * Notifications written before this change carry a pre-rendered German
	 * `monthYear` string and are still sitting in the notification table. They
	 * keep their old text rather than breaking — a missing parameter would make
	 * prepare() fail and hide the whole entry from the panel.
	 *
	 * @param array<string, mixed> $params
	 */
	private function formatMonthYear(array $params, string $languageCode): string {
		if (isset($params['monthYear'])) {
			return (string)$params['monthYear'];
		}

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
				// Standalone month name ("März"), not the genitive form some
				// languages use inside a full date.
				'LLLL yyyy'
			);
			$formatted = $formatter->format(mktime(0, 0, 0, $month, 1, $year));
			if ($formatted !== false) {
				return $formatted;
			}
		}

		// Without intl a numeric month still says which month is meant.
		return sprintf('%02d/%04d', $month, $year);
	}
}
