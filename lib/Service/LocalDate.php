<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use DateTimeZone;

/**
 * The current calendar date, seen through the user's timezone (#713).
 *
 * Nextcloud forces the PHP runtime timezone to UTC (lib/base.php calls
 * date_default_timezone_set('UTC')), so `new DateTime('today')` names the
 * current *UTC* day. Between local midnight and the UTC offset (up to 02:00 in
 * summer for Europe/Berlin) that is still yesterday: today's bookings were
 * rejected as "in the future", and day/month boundaries shifted by a day.
 * Same class of bug as the absence-conflict fix #665.
 *
 * WorkTime stores and compares every calendar date as "the date at UTC
 * midnight" (see DateParser::parseIsoDate and `new DateTime("$year-$month-01")`).
 * So we take the local calendar date first and re-anchor it at UTC midnight,
 * keeping it directly comparable to those stored dates.
 */
final class LocalDate {

    /**
     * Today's calendar date in the given timezone, as a DateTime at midnight in
     * the runtime zone (UTC under Nextcloud) — comparable to WorkTime's stored
     * calendar dates.
     */
    public static function today(DateTimeZone $tz): DateTime {
        // Re-anchor at UTC midnight explicitly. Nextcloud forces the runtime zone
        // to UTC, so an argument-less `new DateTime(...)` already lands there —
        // but stating UTC makes the intent robust against a future runtime change
        // (#716) and keeps the result directly comparable to WorkTime's stored,
        // UTC-midnight calendar dates.
        return new DateTime((new DateTime('now', $tz))->format('Y-m-d'), new DateTimeZone('UTC'));
    }
}
