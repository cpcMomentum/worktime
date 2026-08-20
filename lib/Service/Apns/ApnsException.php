<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service\Apns;

use RuntimeException;

/**
 * APNs configuration or transport failure (#593).
 */
class ApnsException extends RuntimeException {
}
