<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\License;

use PHPUnit\Framework\Assert;

trait TraceStrings {

    /** Alles, was der Nextcloud-Logger aus der Kette schreiben koennte: Meldungen und alle Zeichenketten in den Trace-Argumenten. */
    private static function traceStrings(\Throwable $e): array {
        $strings = [];
        $argCount = 0;
        for ($t = $e; $t !== null; $t = $t->getPrevious()) {
            $strings[] = $t->getMessage();
            foreach ($t->getTrace() as $frame) {
                $args = $frame['args'] ?? [];
                $argCount += count($args);
                array_walk_recursive($args, static function (mixed $v) use (&$strings): void {
                    if (is_string($v)) {
                        $strings[] = $v;
                    }
                });
            }
        }
        Assert::assertGreaterThan(0, $argCount, 'Trace ohne Argumente: zend.exception_ignore_args ist an, der Test prueft nichts');
        return $strings;
    }

    private static function assertNotInTrace(string $secret, \Throwable $e): void {
        foreach (self::traceStrings($e) as $s) {
            Assert::assertStringNotContainsString($secret, $s);
        }
    }
}
