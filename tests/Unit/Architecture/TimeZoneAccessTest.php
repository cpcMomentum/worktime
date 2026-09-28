<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Architecture;

use PHPUnit\Framework\TestCase;
use RecursiveDirectoryIterator;
use RecursiveIteratorIterator;

class TimeZoneAccessTest extends TestCase {

    private const ALLOWED = 'Service/UserTimeZone.php';

    public function testNurUserTimeZoneFragtNextcloudNachDerZeitzone(): void {
        $lib = dirname(__DIR__, 3) . '/lib';
        $offenders = [];

        $files = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($lib, RecursiveDirectoryIterator::SKIP_DOTS));
        foreach ($files as $file) {
            if ($file->getExtension() !== 'php') {
                continue;
            }
            $relative = substr($file->getPathname(), strlen($lib) + 1);
            if ($relative === self::ALLOWED) {
                continue;
            }
            if (str_contains((string)file_get_contents($file->getPathname()), 'IDateTimeZone')) {
                $offenders[] = $relative;
            }
        }

        self::assertSame(
            [],
            $offenders,
            'Zeitzone nur über OCA\\WorkTime\\Service\\UserTimeZone bestimmen, sonst rechnet es ohne core/timezone stumm in UTC',
        );
    }
}
