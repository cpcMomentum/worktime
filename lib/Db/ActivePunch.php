<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use DateTime;
use DateTimeZone;
use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * A single open punch (running timer) for an employee — the server-authoritative
 * state behind the stopwatch (#584). At most one row per employee (unique index).
 *
 * @method int getId()
 * @method void setId(int $id)
 * @method int getEmployeeId()
 * @method void setEmployeeId(int $employeeId)
 * @method DateTime getStartedAt()
 * @method void setStartedAt(DateTime $startedAt)
 * @method DateTime|null getPausedAt()
 * @method void setPausedAt(?DateTime $pausedAt)
 * @method int getBreakSeconds()
 * @method void setBreakSeconds(int $breakSeconds)
 * @method int|null getProjectId()
 * @method void setProjectId(?int $projectId)
 * @method string|null getDescription()
 * @method void setDescription(?string $description)
 * @method string getCreatedVia()
 * @method void setCreatedVia(string $createdVia)
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 */
class ActivePunch extends Entity implements JsonSerializable {

	protected int $employeeId = 0;
	protected ?DateTime $startedAt = null;
	protected ?DateTime $pausedAt = null;
	protected int $breakSeconds = 0;
	protected ?int $projectId = null;
	protected ?string $description = null;
	protected string $createdVia = 'web';
	protected ?DateTime $createdAt = null;

	public function __construct() {
		$this->addType('id', 'integer');
		$this->addType('employeeId', 'integer');
		$this->addType('startedAt', 'datetime');
		$this->addType('pausedAt', 'datetime');
		$this->addType('breakSeconds', 'integer');
		$this->addType('projectId', 'integer');
		$this->addType('createdVia', 'string');
		$this->addType('createdAt', 'datetime');
	}

	public function isPaused(): bool {
		return $this->pausedAt !== null;
	}

	public function jsonSerialize(): array {
		return [
			'id' => $this->id,
			'employeeId' => $this->employeeId,
			'startedAt' => self::reinterpretAsUtc($this->startedAt)?->format('c'),
			'pausedAt' => self::reinterpretAsUtc($this->pausedAt)?->format('c'),
			'breakSeconds' => $this->breakSeconds,
			'isPaused' => $this->isPaused(),
			'projectId' => $this->projectId,
			'description' => $this->description,
			'createdVia' => $this->createdVia,
			'createdAt' => self::reinterpretAsUtc($this->createdAt)?->format('c'),
		];
	}

	/**
	 * Stored datetimes are always written as UTC wall-clock digits (see
	 * PunchService::nowUtc()), but QBMapper hydrates them via `new DateTime($value)`,
	 * which applies the PHP process's default timezone rather than UTC. Reinterpret
	 * the wall-clock digits as UTC so serialized timestamps carry the correct offset
	 * regardless of the server's default timezone.
	 */
	private static function reinterpretAsUtc(?DateTime $stored): ?DateTime {
		if ($stored === null) {
			return null;
		}
		return DateTime::createFromFormat('Y-m-d H:i:s', $stored->format('Y-m-d H:i:s'), new DateTimeZone('UTC'))
			?: $stored;
	}
}
