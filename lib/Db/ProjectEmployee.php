<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getProjectId()
 * @method void setProjectId(int $projectId)
 * @method int getEmployeeId()
 * @method void setEmployeeId(int $employeeId)
 */
class ProjectEmployee extends Entity implements JsonSerializable {

    protected int $projectId = 0;
    protected int $employeeId = 0;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('projectId', 'integer');
        $this->addType('employeeId', 'integer');
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'projectId' => $this->projectId,
            'employeeId' => $this->employeeId,
        ];
    }
}
