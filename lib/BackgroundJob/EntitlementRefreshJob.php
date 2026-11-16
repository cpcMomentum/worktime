<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\BackgroundJob;

use OCA\WorkTime\License\EntitlementService;
use OCP\AppFramework\Utility\ITimeFactory;
use OCP\BackgroundJob\IJob;
use OCP\BackgroundJob\TimedJob;

// Schaut alle sechs Stunden nach; ein Abruf geht nur raus, wenn die 7-Tage-Regel greift.
class EntitlementRefreshJob extends TimedJob {

    public function __construct(
        ITimeFactory $time,
        private readonly EntitlementService $entitlementService,
    ) {
        parent::__construct($time);
        $this->setInterval(6 * 3600);
        // Im Wartungsfenster der Instanz statt zur vollen Stunde, das verteilt die Last.
        $this->setTimeSensitivity(IJob::TIME_INSENSITIVE);
    }

    protected function run($argument): void {
        $this->entitlementService->refreshIfDue();
    }
}
