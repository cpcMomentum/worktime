<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Notification;

use OCA\WorkTime\Notification\Notifier;
use OCP\IURLGenerator;
use OCP\L10N\IFactory;
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
        $this->notifier = new Notifier(
            $this->createMock(IURLGenerator::class),
            $this->createMock(IFactory::class),
        );
        $this->formatMonthYear = new ReflectionMethod(Notifier::class, 'formatMonthYear');
        $this->formatMonthYear->setAccessible(true);
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
