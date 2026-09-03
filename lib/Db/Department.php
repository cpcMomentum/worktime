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
 * @method int getIsActive()
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 * @method DateTime getUpdatedAt()
 * @method void setUpdatedAt(DateTime $updatedAt)
 */
class Department extends Entity implements JsonSerializable {

    protected string $name = '';
    protected int $isActive = 1;
    protected ?DateTime $createdAt = null;
    protected ?DateTime $updatedAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('isActive', 'integer');
        $this->addType('createdAt', 'datetime');
        $this->addType('updatedAt', 'datetime');
    }

    public function setIsActive(bool|int $isActive): void {
        $value = is_bool($isActive) ? ($isActive ? 1 : 0) : $isActive;
        $this->isActive = $value;
        $this->markFieldUpdated('isActive');
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'isActive' => (bool)$this->isActive,
            'createdAt' => $this->createdAt?->format('c'),
            'updatedAt' => $this->updatedAt?->format('c'),
        ];
    }
}
