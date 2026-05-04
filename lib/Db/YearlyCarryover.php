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
 * @method int getOvertimeMinutes()
 * @method void setOvertimeMinutes(int $overtimeMinutes)
 * @method string getVacationDays()
 * @method void setVacationDays(string $vacationDays)
 * @method string|null getNote()
 * @method void setNote(?string $note)
 * @method string getCreatedBy()
 * @method void setCreatedBy(string $createdBy)
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 * @method DateTime getUpdatedAt()
 * @method void setUpdatedAt(DateTime $updatedAt)
 */
class YearlyCarryover extends Entity implements JsonSerializable {

    protected int $employeeId = 0;
    protected int $year = 0;
    protected int $overtimeMinutes = 0;
    protected string $vacationDays = '0';
    protected ?string $note = null;
    protected string $createdBy = '';
    protected ?DateTime $createdAt = null;
    protected ?DateTime $updatedAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('employeeId', 'integer');
        $this->addType('year', 'integer');
        $this->addType('overtimeMinutes', 'integer');
        $this->addType('createdAt', 'datetime');
        $this->addType('updatedAt', 'datetime');
    }

    public function getVacationDaysFloat(): float {
        return (float)$this->vacationDays;
    }

    public function getOvertimeHours(): float {
        return round($this->overtimeMinutes / 60, 2);
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->getId(),
            'employeeId' => $this->getEmployeeId(),
            'year' => $this->getYear(),
            'overtimeMinutes' => $this->getOvertimeMinutes(),
            'overtimeHours' => $this->getOvertimeHours(),
            'vacationDays' => $this->getVacationDaysFloat(),
            'note' => $this->getNote(),
            'createdBy' => $this->getCreatedBy(),
            'createdAt' => $this->getCreatedAt()?->format('Y-m-d H:i:s'),
            'updatedAt' => $this->getUpdatedAt()?->format('Y-m-d H:i:s'),
        ];
    }
}
