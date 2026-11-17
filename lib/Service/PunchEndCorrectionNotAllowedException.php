<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Service;

// Im Stempeluhr-Modus korrigiert nur HR die Endzeit.
class PunchEndCorrectionNotAllowedException extends \RuntimeException {
}
