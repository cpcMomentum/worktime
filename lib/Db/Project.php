<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use DateTime;
use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getId()
 * @method void setId(int $id)
 * @method string getName()
 * @method void setName(string $name)
 * @method string|null getCode()
 * @method void setCode(?string $code)
 * @method string|null getDescription()
 * @method void setDescription(?string $description)
 * @method string|null getCustomer()
 * @method void setCustomer(?string $customer)
 * @method string|null getColor()
 * @method void setColor(?string $color)
 * @method int getIsActive()
 * @method int getIsBillable()
 * @method int getAllEmployees()
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 * @method DateTime getUpdatedAt()
 * @method void setUpdatedAt(DateTime $updatedAt)
 */
class Project extends Entity implements JsonSerializable {

    protected string $name = '';
    protected ?string $code = null;
    protected ?string $description = null;
    protected ?string $customer = null;
    protected ?string $color = null;
    protected int $isActive = 1;
    protected int $isBillable = 1;
    protected int $allEmployees = 1;
    protected ?DateTime $createdAt = null;
    protected ?DateTime $updatedAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('isActive', 'integer');
        $this->addType('isBillable', 'integer');
        $this->addType('allEmployees', 'integer');
        $this->addType('createdAt', 'datetime');
        $this->addType('updatedAt', 'datetime');
    }

    public function setIsActive(bool|int $isActive): void {
        $value = is_bool($isActive) ? ($isActive ? 1 : 0) : $isActive;
        $this->isActive = $value;
        $this->markFieldUpdated('isActive');
    }

    public function setIsBillable(bool|int $isBillable): void {
        $value = is_bool($isBillable) ? ($isBillable ? 1 : 0) : $isBillable;
        $this->isBillable = $value;
        $this->markFieldUpdated('isBillable');
    }

    public function setAllEmployees(bool|int $allEmployees): void {
        $value = is_bool($allEmployees) ? ($allEmployees ? 1 : 0) : $allEmployees;
        $this->allEmployees = $value;
        $this->markFieldUpdated('allEmployees');
    }

    public function getDisplayName(): string {
        if ($this->code) {
            return "[{$this->code}] {$this->name}";
        }
        return $this->name;
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'code' => $this->code,
            'displayName' => $this->getDisplayName(),
            'description' => $this->description,
            'customer' => $this->customer,
            'color' => $this->color,
            'isActive' => (bool)$this->isActive,
            'isBillable' => (bool)$this->isBillable,
            'allEmployees' => (bool)$this->allEmployees,
            'createdAt' => $this->createdAt?->format('c'),
            'updatedAt' => $this->updatedAt?->format('c'),
        ];
    }
}
