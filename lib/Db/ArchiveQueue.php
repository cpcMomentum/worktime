<?php

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use DateTime;
use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getId()
 * @method void setId(int $id)
 * @method int getEmployeeId()
 * @method void setEmployeeId(int $employeeId)
 * @method int getYear()
 * @method void setYear(int $year)
 * @method int getMonth()
 * @method void setMonth(int $month)
 * @method int|null getApproverId()
 * @method void setApproverId(?int $approverId)
 * @method DateTime getApprovedAt()
 * @method void setApprovedAt(DateTime $approvedAt)
 * @method string getStatus()
 * @method void setStatus(string $status)
 * @method int getAttempts()
 * @method void setAttempts(int $attempts)
 * @method string|null getLastError()
 * @method void setLastError(?string $lastError)
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 * @method DateTime|null getProcessedAt()
 * @method void setProcessedAt(?DateTime $processedAt)
 * @method DateTime|null getSubmittedAt()
 * @method void setSubmittedAt(?DateTime $submittedAt)
 */
class ArchiveQueue extends Entity implements JsonSerializable {

    public const STATUS_PENDING = 'pending';
    public const STATUS_PROCESSING = 'processing';
    public const STATUS_COMPLETED = 'completed';
    public const STATUS_FAILED = 'failed';

    public const MAX_ATTEMPTS = 3;

    protected int $employeeId = 0;
    protected int $year = 0;
    protected int $month = 0;
    protected ?int $approverId = null;
    protected ?DateTime $approvedAt = null;
    protected string $status = self::STATUS_PENDING;
    protected int $attempts = 0;
    protected ?string $lastError = null;
    protected ?DateTime $createdAt = null;
    protected ?DateTime $processedAt = null;
    protected ?DateTime $submittedAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('employeeId', 'integer');
        $this->addType('year', 'integer');
        $this->addType('month', 'integer');
        $this->addType('approverId', 'integer');
        $this->addType('approvedAt', 'datetime');
        $this->addType('attempts', 'integer');
        $this->addType('createdAt', 'datetime');
        $this->addType('processedAt', 'datetime');
        $this->addType('submittedAt', 'datetime');
    }

    public function canRetry(): bool {
        return $this->attempts < self::MAX_ATTEMPTS;
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'employeeId' => $this->employeeId,
            'year' => $this->year,
            'month' => $this->month,
            'approverId' => $this->approverId,
            'approvedAt' => $this->approvedAt?->format('c'),
            'status' => $this->status,
            'attempts' => $this->attempts,
            'lastError' => $this->lastError,
            'createdAt' => $this->createdAt?->format('c'),
            'processedAt' => $this->processedAt?->format('c'),
            'submittedAt' => $this->submittedAt?->format('c'),
        ];
    }
}
