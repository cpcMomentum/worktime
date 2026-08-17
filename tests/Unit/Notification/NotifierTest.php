<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Notification;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Notification\Notifier;
use OCP\IL10N;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;
use OCP\Notification\INotification;
use OCP\Notification\UnknownNotificationException;
use PHPUnit\Framework\TestCase;
use ReflectionMethod;

/**
 * Month names in notifications (#537).
 *
 * They used to be a hardcoded German array in NotificationService, so an
 * English or Czech recipient was told their time entries for "März 2026" were
 * approved. The name is now resolved per recipient in the Notifier.
 */
class NotifierTest extends TestCase {

    private ReflectionMethod $formatMonthYear;
    private Notifier $notifier;

    protected function setUp(): void {
        $l10n = $this->createMock(IL10N::class);
        $l10n->method('t')->willReturnCallback(
            static fn (string $text): string => $text
        );
        $l10nFactory = $this->createMock(IFactory::class);
        $l10nFactory->method('get')->willReturn($l10n);

        $this->notifier = new Notifier(
            $this->createMock(IURLGenerator::class),
            $l10nFactory,
        );
        $this->formatMonthYear = new ReflectionMethod(Notifier::class, 'formatMonthYear');
        $this->formatMonthYear->setAccessible(true);
    }

    /**
     * @param array<string, mixed> $params
     */
    private function buildNotification(string $subject, array $params, bool $subjectThrows = false): INotification {
        $notification = $this->createMock(INotification::class);
        $notification->method('getApp')->willReturn(Application::APP_ID);
        $notification->method('getSubject')->willReturn($subject);
        $notification->method('getSubjectParameters')->willReturn($params);
        if ($subjectThrows) {
            // Mirrors NC's INotification setters, which validate their input and
            // throw \InvalidArgumentException on an empty/oversized value.
            $notification->method('setParsedSubject')->willThrowException(new \InvalidArgumentException('invalid subject'));
        } else {
            $notification->method('setParsedSubject')->willReturnSelf();
        }
        $notification->method('setParsedMessage')->willReturnSelf();
        $notification->method('setIcon')->willReturnSelf();
        $notification->method('setLink')->willReturnSelf();
        return $notification;
    }

    public function testForeignAppNotificationIsUnknown(): void {
        $notification = $this->createMock(INotification::class);
        $notification->method('getApp')->willReturn('some_other_app');

        $this->expectException(UnknownNotificationException::class);
        $this->notifier->prepare($notification, 'de');
    }

    public function testUnknownSubjectIsUnknown(): void {
        $this->expectException(UnknownNotificationException::class);
        $this->notifier->prepare($this->buildNotification('subject_that_does_not_exist', []), 'de');
    }

    public function testKnownNotificationIsPrepared(): void {
        $notification = $this->buildNotification('time_entries_approved', ['month' => 3, 'year' => 2026]);
        $this->assertSame($notification, $this->notifier->prepare($notification, 'de'));
    }

    public function testStaleParametersAreDiscardedAsUnknown(): void {
        // #551: a known notification whose stored parameters no longer validate
        // makes an NC setter throw \InvalidArgumentException. It must not escape
        // prepare() (deprecated on NC 34+) — the undisplayable notification is
        // discarded as unknown instead, so it stops re-spamming the log.
        $notification = $this->buildNotification('time_entries_approved', ['month' => 3, 'year' => 2026], subjectThrows: true);

        $this->expectException(UnknownNotificationException::class);
        $this->notifier->prepare($notification, 'de');
    }

    /**
     * @param array<string, mixed> $params
     */
    private function format(array $params, string $languageCode): string {
        return $this->formatMonthYear->invoke($this->notifier, $params, $languageCode);
    }

    public function testKeepsPreRenderedMonthYearOfOlderNotifications(): void {
        // Notifications written before this change are still in the database and
        // carry a pre-rendered string. Dropping it would make prepare() fail and
        // hide the whole entry from the notification panel.
        $this->assertSame('Mai 2026', $this->format(['monthYear' => 'Mai 2026'], 'en'));
    }

    public function testFallsBackToYearOnUnusableMonth(): void {
        $this->assertSame('2026', $this->format(['month' => 0, 'year' => 2026], 'de'));
        $this->assertSame('2026', $this->format(['month' => 13, 'year' => 2026], 'de'));
    }

    public function testDoesNotFailOnMissingParameters(): void {
        $this->assertSame('0', $this->format([], 'de'));
    }

    /**
     * @dataProvider localisedMonths
     */
    public function testUsesRecipientLanguage(string $languageCode, string $expected): void {
        if (!class_exists(\IntlDateFormatter::class)) {
            $this->markTestSkipped('intl not available in this PHP build; the numeric fallback applies instead');
        }

        $this->assertSame($expected, $this->format(['month' => 3, 'year' => 2026], $languageCode));
    }

    /**
     * @return array<string, array{string, string}>
     */
    public static function localisedMonths(): array {
        return [
            'german' => ['de', 'März 2026'],
            'english' => ['en', 'March 2026'],
            'czech' => ['cs', 'březen 2026'],
        ];
    }

    public function testNumericFallbackWithoutIntl(): void {
        if (class_exists(\IntlDateFormatter::class)) {
            $this->markTestSkipped('intl is available, so the localised path is used');
        }

        $this->assertSame('03/2026', $this->format(['month' => 3, 'year' => 2026], 'de'));
    }
}
