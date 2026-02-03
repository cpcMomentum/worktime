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
 * @method string getScope()
 * @method void setScope(string $scope)
 * @method int getYear()
 * @method void setYear(int $year)
 * @method int getIsManual()
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 */
class Holiday extends Entity implements JsonSerializable {

    protected ?DateTime $date = null;
    protected string $name = '';
    protected string $federalState = '';
    protected string $scope = '1.00';
    protected int $year = 0;
    protected int $isManual = 0;
    protected ?DateTime $createdAt = null;
    /** @deprecated Use scope instead - kept for DB compatibility during migration */
    protected int $isHalfDay = 0;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('date', 'datetime');
        $this->addType('year', 'integer');
        $this->addType('isManual', 'integer');
        $this->addType('createdAt', 'datetime');
    }

    public function getScopeValue(): float {
        return (float) $this->scope;
    }

    public function setScopeValue(float $scope): void {
        $this->scope = number_format($scope, 2, '.', '');
        $this->markFieldUpdated('scope');
    }

    public function setIsManual(bool|int $isManual): void {
        $value = is_bool($isManual) ? ($isManual ? 1 : 0) : $isManual;
        $this->isManual = $value;
        $this->markFieldUpdated('isManual');
    }

    public function isHalfDay(): bool {
        return $this->getScopeValue() < 1.0;
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'date' => $this->date?->format('Y-m-d'),
            'name' => $this->name,
            'federalState' => $this->federalState,
            'scope' => $this->getScopeValue(),
            'isManual' => (bool)$this->isManual,
            'year' => $this->year,
            'createdAt' => $this->createdAt?->format('c'),
        ];
    }
}
