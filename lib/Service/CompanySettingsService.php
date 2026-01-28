<?php

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTime;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Db\CompanySettingMapper;
use OCP\AppFramework\Db\DoesNotExistException;

class CompanySettingsService {

    public function __construct(
        private CompanySettingMapper $settingMapper,
        private AuditLogService $auditLogService,
    ) {
    }

    /**
     * Get all settings as an associative array
     *
     * @return array<string, string|null>
     */
    public function getAll(): array {
        return $this->settingMapper->getAllAsArray();
    }

    /**
     * Get a single setting value
     */
    public function get(string $key, ?string $default = null): ?string {
        return $this->settingMapper->getValue($key, $default);
    }

    /**
     * Get a setting value as boolean
     */
    public function getBool(string $key): bool {
        return $this->settingMapper->getValueAsBool($key);
    }

    /**
     * Get a setting value as integer
     */
    public function getInt(string $key): int {
        return $this->settingMapper->getValueAsInt($key);
    }

    /**
     * Get a setting value as float
     */
    public function getFloat(string $key): float {
        return $this->settingMapper->getValueAsFloat($key);
    }

    /**
     * Set a setting value
     */
    public function set(string $key, ?string $value, string $currentUserId = ''): CompanySetting {
        $oldValue = $this->get($key);

        try {
            $setting = $this->settingMapper->findByKey($key);
            $setting->setSettingValue($value);
            $setting->setUpdatedAt(new DateTime());
            $setting = $this->settingMapper->update($setting);
        } catch (DoesNotExistException) {
            $setting = new CompanySetting();
            $setting->setSettingKey($key);
            $setting->setSettingValue($value);
            $setting->setUpdatedAt(new DateTime());
            $setting = $this->settingMapper->insert($setting);
        }

        // Audit log
        if ($currentUserId) {
            $this->auditLogService->logUpdate(
                $currentUserId,
                'setting',
                $setting->getId(),
                ['key' => $key, 'value' => $oldValue],
                ['key' => $key, 'value' => $value]
            );
        }

        return $setting;
    }

    /**
     * Set multiple settings at once
     *
     * @param array<string, string|null> $settings
     */
    public function setMultiple(array $settings, string $currentUserId = ''): void {
        foreach ($settings as $key => $value) {
            $this->set($key, $value, $currentUserId);
        }
    }

    /**
     * Reset a setting to its default value
     */
    public function reset(string $key, string $currentUserId = ''): ?CompanySetting {
        $default = CompanySetting::DEFAULTS[$key] ?? null;

        if ($default !== null) {
            return $this->set($key, $default, $currentUserId);
        }

        return null;
    }

    /**
     * Reset all settings to defaults
     */
    public function resetAll(string $currentUserId = ''): void {
        foreach (CompanySetting::DEFAULTS as $key => $value) {
            $this->set($key, $value, $currentUserId);
        }
    }

    /**
     * Get company name
     */
    public function getCompanyName(): string {
        return $this->get(CompanySetting::KEY_COMPANY_NAME) ?? '';
    }

    /**
     * Get default federal state
     */
    public function getDefaultFederalState(): string {
        return $this->get(CompanySetting::KEY_DEFAULT_FEDERAL_STATE) ?? 'BY';
    }

    /**
     * Get default weekly hours
     */
    public function getDefaultWeeklyHours(): float {
        return $this->getFloat(CompanySetting::KEY_DEFAULT_WEEKLY_HOURS);
    }

    /**
     * Get default vacation days
     */
    public function getDefaultVacationDays(): int {
        return $this->getInt(CompanySetting::KEY_DEFAULT_VACATION_DAYS);
    }

    /**
     * Check if project is required for time entries
     */
    public function isProjectRequired(): bool {
        return $this->getBool(CompanySetting::KEY_REQUIRE_PROJECT);
    }

    /**
     * Check if description is required for time entries
     */
    public function isDescriptionRequired(): bool {
        return $this->getBool(CompanySetting::KEY_REQUIRE_DESCRIPTION);
    }

    /**
     * Check if approval is required for time entries
     */
    public function isApprovalRequired(): bool {
        return $this->getBool(CompanySetting::KEY_APPROVAL_REQUIRED);
    }

    /**
     * Get minimum break minutes for >6h work
     */
    public function getMinBreakMinutes6h(): int {
        return $this->getInt(CompanySetting::KEY_MIN_BREAK_MINUTES_6H);
    }

    /**
     * Get minimum break minutes for >9h work
     */
    public function getMinBreakMinutes9h(): int {
        return $this->getInt(CompanySetting::KEY_MIN_BREAK_MINUTES_9H);
    }

    /**
     * Get maximum daily hours
     */
    public function getMaxDailyHours(): float {
        return $this->getFloat(CompanySetting::KEY_MAX_DAILY_HOURS);
    }
}
