<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\License;

final class EntitlementToken {

    public const STATE_VALID = 'valid';
    public const STATE_GRACE = 'grace';
    public const STATE_EXPIRED = 'expired';

    /**
     * @param string[] $features
     */
    public function __construct(
        public readonly string $tier,
        public readonly array $features,
        public readonly int $issuedAt,
        public readonly int $expiresAt,
        public readonly int $graceUntil,
        public readonly ?int $licensedEmployees,
    ) {
    }

    public function stateAt(int $now): string {
        if ($now < $this->expiresAt) {
            return self::STATE_VALID;
        }
        if ($now < $this->graceUntil) {
            return self::STATE_GRACE;
        }
        return self::STATE_EXPIRED;
    }
}
