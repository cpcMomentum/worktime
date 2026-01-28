<?php

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use DateTime;
use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getId()
 * @method void setId(int $id)
 * @method DateTime getDate()
 * @method void setDate(DateTime $date)
 * @method string getName()
 * @method void setName(string $name)
 * @method string getFederalState()
 * @method void setFederalState(string $federalState)
 * @method int getIsHalfDay()
 * @method int getYear()
 * @method void setYear(int $year)
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 */
class Holiday extends Entity implements JsonSerializable {

    protected ?DateTime $date = null;
    protected string $name = '';
    protected string $federalState = '';
    protected int $isHalfDay = 0;
    protected int $year = 0;
    protected ?DateTime $createdAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('date', 'datetime');
        $this->addType('isHalfDay', 'integer');
        $this->addType('year', 'integer');
        $this->addType('createdAt', 'datetime');
    }

    public function setIsHalfDay(bool|int $isHalfDay): void {
        $value = is_bool($isHalfDay) ? ($isHalfDay ? 1 : 0) : $isHalfDay;
        $this->isHalfDay = $value;
        $this->markFieldUpdated('isHalfDay');
    }

    public function getWorkDayValue(): float {
        return $this->isHalfDay ? 0.5 : 1.0;
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'date' => $this->date?->format('Y-m-d'),
            'name' => $this->name,
            'federalState' => $this->federalState,
            'isHalfDay' => (bool)$this->isHalfDay,
            'year' => $this->year,
            'createdAt' => $this->createdAt?->format('c'),
        ];
    }
}
