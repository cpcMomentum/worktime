<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Command;

use OCA\WorkTime\Service\Apns\ApnsClient;
use OCA\WorkTime\Service\Apns\ApnsException;
use OCA\WorkTime\Service\Apns\ApnsResult;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;

/**
 * `occ worktime:push:test` — send one APNs test push (#593), either to an
 * explicit device token or to every device a user has registered. This is the
 * "Hello Push" proof: with a valid .p8 configured, APNs authenticates the
 * provider JWT and either delivers (200) or reports a token error (e.g. 400
 * BadDeviceToken) — a 403 would instead mean the key/JWT is wrong.
 */
class PushTest extends Command {

	public function __construct(
		private ApnsClient $apnsClient,
	) {
		parent::__construct();
	}

	protected function configure(): void {
		$this->setName('worktime:push:test')
			->setDescription('Send an APNs test push (#593) to a device token or all of a user\'s devices.')
			->addOption('token', 't', InputOption::VALUE_REQUIRED, 'Device token to push to')
			->addOption('user', 'u', InputOption::VALUE_REQUIRED, 'User id; pushes to all devices registered for that user')
			->addOption('title', null, InputOption::VALUE_REQUIRED, 'Notification title', 'WorkTime')
			->addOption('message', 'm', InputOption::VALUE_REQUIRED, 'Notification body', 'Test-Push von WorkTime');
	}

	protected function execute(InputInterface $input, OutputInterface $output): int {
		$token = $input->getOption('token');
		$user = $input->getOption('user');
		if ($token === null && $user === null) {
			$output->writeln('<error>Bitte --token oder --user angeben.</error>');
			return 1;
		}

		$payload = ApnsClient::alertPayload(
			(string)$input->getOption('title'),
			(string)$input->getOption('message'),
		);

		try {
			if ($token !== null) {
				$this->printResult($output, (string)$token, $this->apnsClient->send((string)$token, $payload));
				return 0;
			}

			$results = $this->apnsClient->sendToUser((string)$user, $payload);
			if ($results === []) {
				$output->writeln('<comment>Keine registrierten Geraete fuer diesen Benutzer.</comment>');
				return 0;
			}
			foreach ($results as $deviceToken => $result) {
				$this->printResult($output, $deviceToken, $result);
			}
			return 0;
		} catch (ApnsException $e) {
			$output->writeln('<error>' . $e->getMessage() . '</error>');
			return 1;
		}
	}

	private function printResult(OutputInterface $output, string $token, ApnsResult $result): void {
		$short = substr($token, 0, 8) . '…';
		$tag = $result->isSuccess() ? 'info' : 'error';
		$output->writeln(sprintf(
			'<%s>[%s] HTTP %d  reason=%s  apns-id=%s</%s>',
			$tag,
			$short,
			$result->status,
			$result->reason ?? '-',
			$result->apnsId ?? '-',
			$tag,
		));
	}
}
