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
 * @method DateTime getDate()
 * @method void setDate(DateTime $date)
 * @method DateTime getStartTime()
 * @method void setStartTime(DateTime $startTime)
 * @method DateTime getEndTime()
 * @method void setEndTime(DateTime $endTime)
 * @method int getBreakMinutes()
 * @method void setBreakMinutes(int $breakMinutes)
 * @method int getWorkMinutes()
 * @method void setWorkMinutes(int $workMinutes)
 * @method int|null getProjectId()
 * @method void setProjectId(?int $projectId)
 * @method string|null getDescription()
 * @method void setDescription(?string $description)
 * @method string getStatus()
 * @method void setStatus(string $status)
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 * @method DateTime getUpdatedAt()
 * @method void setUpdatedAt(DateTime $updatedAt)
 * @method DateTime|null getSubmittedAt()
 * @method void setSubmittedAt(?DateTime $submittedAt)
 * @method int|null getSubmittedBy()
 * @method void setSubmittedBy(?int $submittedBy)
 * @method DateTime|null getApprovedAt()
 * @method void setApprovedAt(?DateTime $approvedAt)
 * @method int|null getApprovedBy()
 * @method void setApprovedBy(?int $approvedBy)
 */
class TimeEntry extends Entity implements JsonSerializable {

    public const STATUS_DRAFT = 'draft';
    public const STATUS_SUBMITTED = 'submitted';
    public const STATUS_APPROVED = 'approved';
    public const STATUS_REJECTED = 'rejected';

    protected int $employeeId = 0;
    protected ?DateTime $date = null;
    protected ?DateTime $startTime = null;
    protected ?DateTime $endTime = null;
    protected int $breakMinutes = 0;
    protected int $workMinutes = 0;
    protected ?int $projectId = null;
    protected ?string $description = null;
    protected string $status = self::STATUS_DRAFT;
    protected ?DateTime $createdAt = null;
    protected ?DateTime $updatedAt = null;
    protected ?DateTime $submittedAt = null;
    protected ?int $submittedBy = null;
    protected ?DateTime $approvedAt = null;
    protected ?int $approvedBy = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('employeeId', 'integer');
        $this->addType('date', 'date');
        $this->addType('startTime', 'time');
        $this->addType('endTime', 'time');
        $this->addType('breakMinutes', 'integer');
        $this->addType('workMinutes', 'integer');
        $this->addType('projectId', 'integer');
        $this->addType('createdAt', 'datetime');
        $this->addType('updatedAt', 'datetime');
        $this->addType('submittedAt', 'datetime');
        $this->addType('submittedBy', 'integer');
        $this->addType('approvedAt', 'datetime');
        $this->addType('approvedBy', 'integer');
    }

    public function getWorkHours(): float {
        return $this->workMinutes / 60;
    }

    public function getBreakHours(): float {
        return $this->breakMinutes / 60;
    }

    public function getGrossMinutes(): int {
        return $this->workMinutes + $this->breakMinutes;
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'employeeId' => $this->employeeId,
            'date' => $this->date?->format('Y-m-d'),
            'startTime' => $this->startTime?->format('H:i'),
            'endTime' => $this->endTime?->format('H:i'),
            'breakMinutes' => $this->breakMinutes,
            'workMinutes' => $this->workMinutes,
            'workHours' => $this->getWorkHours(),
            'projectId' => $this->projectId,
            'description' => $this->description,
            'status' => $this->status,
            'createdAt' => $this->createdAt?->format('c'),
            'updatedAt' => $this->updatedAt?->format('c'),
            'submittedAt' => $this->submittedAt?->format('c'),
            'submittedBy' => $this->submittedBy,
            'approvedAt' => $this->approvedAt?->format('c'),
            'approvedBy' => $this->approvedBy,
        ];
    }
}
