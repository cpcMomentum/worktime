<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use Exception;

/**
 * #613: Raised by punch-out when the punch has been open for more than 24 hours.
 * A time entry has a single date plus start/end time, so it can span at most one
 * midnight — a punch left open across several calendar days cannot be booked as
 * one entry (it would silently cap at ~24h). The controller turns this into
 * HTTP 409 so the client can point the user at discarding the stale punch and
 * entering the time manually.
 */
class PunchTooLongException extends Exception {
}
