<?php

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use DateTime;
use JsonSerializable;
use OCP\AppFramework\Db\Entity;

/**
 * @method int getId()
 * @method void setId(int $id)
 * @method string getSettingKey()
 * @method void setSettingKey(string $settingKey)
 * @method string|null getSettingValue()
 * @method void setSettingValue(?string $settingValue)
 * @method DateTime getUpdatedAt()
 * @method void setUpdatedAt(DateTime $updatedAt)
 */
class CompanySetting extends Entity implements JsonSerializable {

    public const KEY_COMPANY_NAME = 'company_name';
    public const KEY_DEFAULT_FEDERAL_STATE = 'default_federal_state';
    public const KEY_DEFAULT_WEEKLY_HOURS = 'default_weekly_hours';
    public const KEY_DEFAULT_VACATION_DAYS = 'default_vacation_days';
    public const KEY_REQUIRE_PROJECT = 'require_project';
    public const KEY_REQUIRE_DESCRIPTION = 'require_description';
    public const KEY_ALLOW_FUTURE_ENTRIES = 'allow_future_entries';
    public const KEY_MAX_DAILY_HOURS = 'max_daily_hours';
    public const KEY_MIN_BREAK_MINUTES_6H = 'min_break_minutes_6h';
    public const KEY_MIN_BREAK_MINUTES_9H = 'min_break_minutes_9h';
    public const KEY_APPROVAL_REQUIRED = 'approval_required';

    public const DEFAULTS = [
        self::KEY_COMPANY_NAME => '',
        self::KEY_DEFAULT_FEDERAL_STATE => 'BY',
        self::KEY_DEFAULT_WEEKLY_HOURS => '40',
        self::KEY_DEFAULT_VACATION_DAYS => '30',
        self::KEY_REQUIRE_PROJECT => '0',
        self::KEY_REQUIRE_DESCRIPTION => '0',
        self::KEY_ALLOW_FUTURE_ENTRIES => '0',
        self::KEY_MAX_DAILY_HOURS => '10',
        self::KEY_MIN_BREAK_MINUTES_6H => '30',
        self::KEY_MIN_BREAK_MINUTES_9H => '45',
        self::KEY_APPROVAL_REQUIRED => '1',
    ];

    protected string $settingKey = '';
    protected ?string $settingValue = null;
    protected ?DateTime $updatedAt = null;

    public function __construct() {
        $this->addType('id', 'integer');
        $this->addType('updatedAt', 'datetime');
    }

    public function getValueAsBool(): bool {
        return $this->settingValue === '1' || $this->settingValue === 'true';
    }

    public function getValueAsInt(): int {
        return (int)$this->settingValue;
    }

    public function getValueAsFloat(): float {
        return (float)$this->settingValue;
    }

    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'key' => $this->settingKey,
            'value' => $this->settingValue,
            'updatedAt' => $this->updatedAt?->format('c'),
        ];
    }
}
