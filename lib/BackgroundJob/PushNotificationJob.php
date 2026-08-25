<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\BackgroundJob;

use OCA\WorkTime\Notification\PushDelivery;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\QueuedJob;
use Psr\Log\LoggerInterface;

/**
 * Delivers one approval push out of the request path (#593 Phase B).
 *
 * The push used to run synchronously inside the HTTP request that submits an
 * absence or time entries. Each device is a blocking HTTP/2 POST with a 10 s
 * timeout, so a slow or unreachable APNs endpoint could stall — or, past
 * max_execution_time, fail — a submit whose data was already saved. This queued
 * job moves the APNs call to the next cron tick: the submit returns immediately,
 * the in-app notification is already out, and the push follows shortly after.
 *
 * The job carries {userId, subject, params} and hands them to {@see PushDelivery},
 * which renders the text in the recipient's language and swallows any delivery
 * error. A malformed argument is ignored rather than throwing in the cron runner.
 */
class PushNotificationJob extends QueuedJob {

	public function __construct(
		ITimeFactory $time,
		private PushDelivery $pushDelivery,
		private LoggerInterface $logger,
	) {
		parent::__construct($time);
	}

	protected function run($argument): void {
		if (!is_array($argument)) {
			$this->logger->warning('WorkTime push job received a non-array argument; skipping (#593).');
			return;
		}

		$userId = (string)($argument['userId'] ?? '');
		$subject = (string)($argument['subject'] ?? '');
		$params = $argument['params'] ?? [];

		if ($userId === '' || $subject === '' || !is_array($params)) {
			$this->logger->warning('WorkTime push job received an incomplete argument; skipping (#593).');
			return;
		}

		$this->pushDelivery->send($userId, $subject, $params);
	}
}
