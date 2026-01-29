<?php

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use DateTime;
use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getId()
 * @method void setId(int $id)
 * @method string getUserId()
 * @method void setUserId(string $userId)
 * @method string getAction()
 * @method void setAction(string $action)
 * @method string getEntityType()
 * @method void setEntityType(string $entityType)
 * @method int|null getEntityId()
 * @method void setEntityId(?int $entityId)
 * @method string|null getOldValues()
 * @method void setOldValues(?string $oldValues)
 * @method string|null getNewValues()
 * @method void setNewValues(?string $newValues)
 * @method string|null getIpAddress()
 * @method void setIpAddress(?string $ipAddress)
 * @method DateTime getCreatedAt()
 * @method void setCreatedAt(DateTime $createdAt)
 */
class AuditLog extends Entity implements JsonSerializable {

    public const ACTION_CREATE = 'create';
    public const ACTION_UPDATE = 'update';
    public const ACTION_DELETE = 'delete';
    public const ACTION_APPROVE = 'approve';
    public const ACTION_REJECT = 'reject';
    public const ACTION_SUBMIT = 'submit';

    public const ENTITY_TIME_ENTRY = 'time_entry';
    public const ENTITY_ABSENCE = 'absence';
    public const ENTITY_EMPLOYEE = 'employee';
    public const ENTITY_PROJECT = 'project';
    public const ENTITY_HOLIDAY = 'holiday';
    public const ENTITY_SETTING = 'setting';

    protected string $userId = '';
    protected string $action = '';
    protected string $entityType = '';
    protected ?int $entityId = null;
    protected ?string $oldValues = null;
    protected ?string $newValues = null;
    protected ?string $ipAddress = null;
    protected ?DateTime $createdAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('entityId', 'integer');
        $this->addType('createdAt', 'datetime');
    }

    public function getOldValuesArray(): array {
        if ($this->oldValues === null) {
            return [];
        }
        return json_decode($this->oldValues, true) ?? [];
    }

    public function getNewValuesArray(): array {
        if ($this->newValues === null) {
            return [];
        }
        return json_decode($this->newValues, true) ?? [];
    }

    public function setOldValuesArray(array $values): void {
        $this->oldValues = json_encode($values);
        $this->markFieldUpdated('oldValues');
    }

    public function setNewValuesArray(array $values): void {
        $this->newValues = json_encode($values);
        $this->markFieldUpdated('newValues');
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'userId' => $this->userId,
            'action' => $this->action,
            'entityType' => $this->entityType,
            'entityId' => $this->entityId,
            'oldValues' => $this->getOldValuesArray(),
            'newValues' => $this->getNewValuesArray(),
            'ipAddress' => $this->ipAddress,
            'createdAt' => $this->createdAt?->format('c'),
        ];
    }
}
