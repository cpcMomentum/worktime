<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use Exception;

class NotFoundException extends Exception {

    public function __construct(string $message = 'Entity not found') {
        parent::__construct($message);
    }
}
