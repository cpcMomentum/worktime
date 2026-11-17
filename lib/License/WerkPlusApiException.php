<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\License;

// Verzweigt wird nur ueber den Code; die Servermeldung wird hoechstens angezeigt.
class WerkPlusApiException extends \RuntimeException {

    public function __construct(
        private readonly string $errorCode,
        private readonly string $serverMessage = '',
        ?\Throwable $previous = null,
    ) {
        parent::__construct('WerkPlus: ' . $errorCode, 0, $previous);
    }

    public function getErrorCode(): string {
        return $this->errorCode;
    }

    public function getServerMessage(): string {
        return $this->serverMessage;
    }
}
