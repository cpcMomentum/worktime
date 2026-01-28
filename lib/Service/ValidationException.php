<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use Exception;

class ValidationException extends Exception {

    /** @var array<string, string[]> */
    private array $errors;

    /**
     * @param array<string, string[]> $errors
     */
    public function __construct(array $errors, string $message = 'Validation failed') {
        parent::__construct($message);
        $this->errors = $errors;
    }

    /**
     * @return array<string, string[]>
     */
    public function getErrors(): array {
        return $this->errors;
    }

    public function hasError(string $field): bool {
        return isset($this->errors[$field]);
    }

    /**
     * @return string[]
     */
    public function getFieldErrors(string $field): array {
        return $this->errors[$field] ?? [];
    }

    public static function fromSingleError(string $field, string $message): self {
        return new self([$field => [$message]]);
    }
}
