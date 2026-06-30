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
 * @method int getEmployeeId()
 * @method void setEmployeeId(int $employeeId)
 * @method DateTime getPayoutDate()
 * @method void setPayoutDate(DateTime $payoutDate)
 * @method int getMinutes()
 * @method void setMinutes(int $minutes)
 * @method string getNote()
 * @method void setNote(string $note)
 * @method string getCreatedBy()
 * @method void setCreatedBy(string $createdBy)
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 * @method DateTime getUpdatedAt()
 * @method void setUpdatedAt(DateTime $updatedAt)
 */
class OvertimePayout extends Entity implements JsonSerializable {

    protected int $employeeId = 0;
    protected ?DateTime $payoutDate = null;
    protected int $minutes = 0;
    protected string $note = '';
    protected string $createdBy = '';
    protected ?DateTime $createdAt = null;
    protected ?DateTime $updatedAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('employeeId', 'integer');
        $this->addType('payoutDate', 'datetime');
        $this->addType('minutes', 'integer');
        $this->addType('createdAt', 'datetime');
        $this->addType('updatedAt', 'datetime');
    }

    public function getHours(): float {
        return round($this->minutes / 60, 2);
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->getId(),
            'employeeId' => $this->getEmployeeId(),
            'payoutDate' => $this->getPayoutDate()?->format('Y-m-d'),
            'minutes' => $this->getMinutes(),
            'hours' => $this->getHours(),
            'note' => $this->getNote(),
            'createdBy' => $this->getCreatedBy(),
            'createdAt' => $this->getCreatedAt()?->format('Y-m-d H:i:s'),
            'updatedAt' => $this->getUpdatedAt()?->format('Y-m-d H:i:s'),
        ];
    }
}
