<?php

declare(strict_types=1);

namespace OCA\WorkTime\Notification;

use OCA\WorkTime\AppInfo\Application;
use OCP\IURLGenerator;
use OCP\Notification\INotification;
use OCP\Notification\INotifier;
use OCP\Notification\UnknownNotificationException;

class Notifier implements INotifier {

	public function __construct(
		private IURLGenerator $urlGenerator,
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

		$params = $notification->getSubjectParameters();

		switch ($notification->getSubject()) {
			case 'absence_submitted':
				$notification->setParsedSubject(
					sprintf(
						'%s hat eine Abwesenheit (%s, %s - %s) zur Genehmigung eingereicht',
						$params['employeeName'],
						$params['typeName'],
						$params['startDate'],
						$params['endDate']
					)
				);
				break;

			case 'absence_approved':
				$notification->setParsedSubject(
					sprintf(
						'Deine Abwesenheit (%s, %s - %s) wurde genehmigt',
						$params['typeName'],
						$params['startDate'],
						$params['endDate']
					)
				);
				break;

			case 'absence_rejected':
				$notification->setParsedSubject(
					sprintf(
						'Deine Abwesenheit (%s, %s - %s) wurde abgelehnt',
						$params['typeName'],
						$params['startDate'],
						$params['endDate']
					)
				);
				break;

			case 'time_entries_submitted':
				$notification->setParsedSubject(
					sprintf(
						'%s hat Zeiteinträge für %s zur Genehmigung eingereicht',
						$params['employeeName'],
						$params['monthYear']
					)
				);
				break;

			case 'time_entries_approved':
				$notification->setParsedSubject(
					sprintf(
						'Deine Zeiteinträge für %s wurden genehmigt',
						$params['monthYear']
					)
				);
				break;

			case 'time_entries_rejected':
				$notification->setParsedSubject(
					sprintf(
						'Deine Zeiteinträge für %s wurden abgelehnt',
						$params['monthYear']
					)
				);
				break;

			default:
				throw new UnknownNotificationException();
		}

		$notification->setIcon(
			$this->urlGenerator->imagePath(Application::APP_ID, 'app-dark.svg')
		);
		$notification->setLink(
			$this->urlGenerator->linkToRouteAbsolute('worktime.page.index')
		);

		return $notification;
	}
}
