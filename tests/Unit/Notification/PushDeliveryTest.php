<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Notification;

use OCA\WorkTime\Notification\PushDelivery;
use OCA\WorkTime\Service\Apns\ApnsClient;
use OCA\WorkTime\Service\Apns\ApnsException;
use OCP\IL10N;
use OCP\IUser;
use OCP\IUserManager;
use OCP\L10N\IFactory;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Genehmigungs-Push (#593 Phase B, worktime-mobile#19).
 *
 * PushDelivery mirrors the two "submitted" in-app notifications to an APNs push.
 * Two things matter and are pinned here: the body is rendered in the recipient's
 * language with the same wording as the in-app Notifier, and a push must never
 * throw — the in-app notification has already gone out.
 */
class PushDeliveryTest extends TestCase {

	private ApnsClient $apnsClient;
	private IUserManager $userManager;
	private PushDelivery $delivery;

	protected function setUp(): void {
		$this->apnsClient = $this->createMock(ApnsClient::class);
		$this->userManager = $this->createMock(IUserManager::class);

		// t() applies the parameters, so the assertions see the real rendered text.
		$l10n = $this->createMock(IL10N::class);
		$l10n->method('t')->willReturnCallback(
			static fn (string $text, $params = []): string => vsprintf($text, (array)$params)
		);
		$l10nFactory = $this->createMock(IFactory::class);
		$l10nFactory->method('getUserLanguage')->willReturn('de');
		$l10nFactory->method('get')->willReturn($l10n);

		$this->userManager->method('get')->willReturn($this->createMock(IUser::class));

		$this->delivery = new PushDelivery(
			$this->apnsClient,
			$this->userManager,
			$l10nFactory,
			$this->createMock(LoggerInterface::class),
		);
	}

	public function testAbsenceSubmittedPushesRenderedBody(): void {
		$captured = null;
		$this->apnsClient->expects($this->once())
			->method('sendToUser')
			->with('supervisor', $this->callback(function (array $payload) use (&$captured): bool {
				$captured = $payload;
				return true;
			}))
			->willReturn([]);

		$this->delivery->send('supervisor', 'absence_submitted', [
			'employeeName' => 'Bob Doe',
			'typeName' => 'Urlaub',
			'startDate' => '01.08.',
			'endDate' => '05.08.',
		]);

		$this->assertSame('WorkTime', $captured['aps']['alert']['title']);
		$this->assertSame(
			'Bob Doe hat eine Abwesenheit (Urlaub, 01.08. - 05.08.) zur Genehmigung eingereicht',
			$captured['aps']['alert']['body']
		);
		$this->assertSame('absence_submitted', $captured['data']['type']);
	}

	public function testTimeEntriesSubmittedPushesRenderedBody(): void {
		$captured = null;
		$this->apnsClient->expects($this->once())
			->method('sendToUser')
			->with('supervisor', $this->callback(function (array $payload) use (&$captured): bool {
				$captured = $payload;
				return true;
			}))
			->willReturn([]);

		$this->delivery->send('supervisor', 'time_entries_submitted', [
			'employeeName' => 'Bob Doe',
			'month' => 8,
			'year' => 2026,
		]);

		// Month name depends on whether intl is loaded; assert the stable parts
		// plus the year, not a locale-specific month spelling.
		$this->assertStringStartsWith('Bob Doe hat Zeiteinträge für ', $captured['aps']['alert']['body']);
		$this->assertStringContainsString('2026', $captured['aps']['alert']['body']);
		$this->assertStringEndsWith(' zur Genehmigung eingereicht', $captured['aps']['alert']['body']);
		$this->assertSame('time_entries_submitted', $captured['data']['type']);
	}

	public function testUnknownSubjectIsNotPushed(): void {
		$this->apnsClient->expects($this->never())->method('sendToUser');

		$this->delivery->send('supervisor', 'absence_approved', [
			'typeName' => 'Urlaub',
			'startDate' => '01.08.',
			'endDate' => '05.08.',
		]);
	}

	public function testApnsFailureIsSwallowed(): void {
		$this->apnsClient->method('sendToUser')
			->willThrowException(new ApnsException('APNs is not configured'));

		// Must not throw: the in-app notification already went out (#593).
		$this->delivery->send('supervisor', 'absence_submitted', [
			'employeeName' => 'Bob Doe',
			'typeName' => 'Urlaub',
			'startDate' => '01.08.',
			'endDate' => '05.08.',
		]);

		$this->addToAssertionCount(1);
	}
}
