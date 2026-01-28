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
 * @method string getType()
 * @method void setType(string $type)
 * @method DateTime getStartDate()
 * @method void setStartDate(DateTime $startDate)
 * @method DateTime getEndDate()
 * @method void setEndDate(DateTime $endDate)
 * @method string getDays()
 * @method void setDays(string $days)
 * @method string|null getNote()
 * @method void setNote(?string $note)
 * @method string getStatus()
 * @method void setStatus(string $status)
 * @method int|null getApprovedBy()
 * @method void setApprovedBy(?int $approvedBy)
 * @method DateTime|null getApprovedAt()
 * @method void setApprovedAt(?DateTime $approvedAt)
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 * @method DateTime getUpdatedAt()
 * @method void setUpdatedAt(DateTime $updatedAt)
 */
class Absence extends Entity implements JsonSerializable {

    public const TYPE_VACATION = 'vacation';
    public const TYPE_SICK = 'sick';
    public const TYPE_CHILD_SICK = 'child_sick';
    public const TYPE_UNPAID = 'unpaid';
    public const TYPE_SPECIAL = 'special';
    public const TYPE_TRAINING = 'training';
    public const TYPE_COMPENSATORY = 'compensatory';

    public const STATUS_PENDING = 'pending';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';
    public const STATUS_CANCELLED = 'cancelled';

    public const TYPES = [
        self::TYPE_VACATION => 'Urlaub',
        self::TYPE_SICK => 'Krank',
        self::TYPE_CHILD_SICK => 'Kind krank',
        self::TYPE_UNPAID => 'Unbezahlt',
        self::TYPE_SPECIAL => 'Sonderurlaub',
        self::TYPE_TRAINING => 'Weiterbildung',
        self::TYPE_COMPENSATORY => 'Freizeitausgleich',
    ];

    protected int $employeeId = 0;
    protected string $type = self::TYPE_VACATION;
    protected ?DateTime $startDate = null;
    protected ?DateTime $endDate = null;
    protected string $days = '0.00';
    protected ?string $note = null;
    protected string $status = self::STATUS_PENDING;
    protected ?int $approvedBy = null;
    protected ?DateTime $approvedAt = null;
    protected ?DateTime $createdAt = null;
    protected ?DateTime $updatedAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('employeeId', 'integer');
        $this->addType('startDate', 'datetime');
        $this->addType('endDate', 'datetime');
        $this->addType('approvedBy', 'integer');
        $this->addType('approvedAt', 'datetime');
        $this->addType('createdAt', 'datetime');
        $this->addType('updatedAt', 'datetime');
    }

    public function getTypeName(): string {
        return self::TYPES[$this->type] ?? $this->type;
    }

    public function isApproved(): bool {
        return $this->status === self::STATUS_APPROVED;
    }

    public function isPending(): bool {
        return $this->status === self::STATUS_PENDING;
    }

    public function countsAsVacation(): bool {
        return $this->type === self::TYPE_VACATION;
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'employeeId' => $this->employeeId,
            'type' => $this->type,
            'typeName' => $this->getTypeName(),
            'startDate' => $this->startDate?->format('Y-m-d'),
            'endDate' => $this->endDate?->format('Y-m-d'),
            'days' => (float)$this->days,
            'note' => $this->note,
            'status' => $this->status,
            'approvedBy' => $this->approvedBy,
            'approvedAt' => $this->approvedAt?->format('c'),
            'createdAt' => $this->createdAt?->format('c'),
            'updatedAt' => $this->updatedAt?->format('c'),
        ];
    }
}
