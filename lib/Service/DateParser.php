<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;

/**
 * Strict parsing of calendar dates coming in from the API (#537).
 *
 * `new DateTime($string)` accepts far more than a calendar date: relative
 * expressions like "+1 week" or "yesterday" resolve against the server clock,
 * so the stored absence or time entry depends on when the request happened.
 *
 * `DateTime::createFromFormat('Y-m-d', ...)` alone is not enough either — it
 * silently rolls overflowing values over ("2026-02-30" becomes 2026-03-02),
 * which would book an absence on a day the caller never asked for.
 */
final class DateParser {

    /**
     * Parse an ISO calendar date (YYYY-MM-DD), normalised to midnight.
     *
     * Both zero-padded and unpadded components are accepted so existing API
     * clients keep working; anything that is not a real calendar date returns
     * null and is left to the caller to report as a validation error.
     */
    public static function parseIsoDate(string $value): ?DateTime {
        if (!preg_match('/^(\d{4})-(\d{1,2})-(\d{1,2})$/', trim($value), $parts)) {
            return null;
        }

        [, $year, $month, $day] = $parts;

        // Rejects 2026-02-30 and friends, which createFromFormat would roll over.
        if (!checkdate((int)$month, (int)$day, (int)$year)) {
            return null;
        }

        $date = new DateTime(sprintf('%04d-%02d-%02d', (int)$year, (int)$month, (int)$day));
        $date->setTime(0, 0, 0);

        return $date;
    }
}
