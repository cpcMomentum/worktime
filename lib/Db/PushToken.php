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
 * A registered push device for a user (#593). At most one row per device_token
 * (unique index); a user may have several devices.
 *
 * @method string getUserId()
 * @method void setUserId(string $userId)
 * @method string getDeviceToken()
 * @method void setDeviceToken(string $deviceToken)
 * @method string getPlatform()
 * @method void setPlatform(string $platform)
 * @method DateTime getUpdatedAt()
 * @method void setUpdatedAt(DateTime $updatedAt)
 */
class PushToken extends Entity implements JsonSerializable {

	protected string $userId = '';
	protected string $deviceToken = '';
	protected string $platform = 'ios';
	protected ?DateTime $updatedAt = null;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('userId', 'string');
		$this->addType('deviceToken', 'string');
		$this->addType('platform', 'string');
		$this->addType('updatedAt', 'datetime');
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'userId' => $this->userId,
			'deviceToken' => $this->deviceToken,
			'platform' => $this->platform,
			'updatedAt' => $this->updatedAt?->format('c'),
		];
	}
}
