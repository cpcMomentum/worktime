<?php

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<CompanySetting>
 */
class CompanySettingMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_company_settings', CompanySetting::class);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): CompanySetting {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByKey(string $key): CompanySetting {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('setting_key', $qb->createNamedParameter($key)));

        return $this->findEntity($qb);
    }

    /**
     * @return CompanySetting[]
     */
    public function findAll(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('setting_key', 'ASC');

        return $this->findEntities($qb);
    }

    public function getValue(string $key, ?string $default = null): ?string {
        try {
            $setting = $this->findByKey($key);
            return $setting->getSettingValue();
        } catch (DoesNotExistException) {
            return $default ?? (CompanySetting::DEFAULTS[$key] ?? null);
        }
    }

    public function getValueAsBool(string $key): bool {
        $value = $this->getValue($key);
        return $value === '1' || $value === 'true';
    }

    public function getValueAsInt(string $key): int {
        return (int)$this->getValue($key);
    }

    public function getValueAsFloat(string $key): float {
        return (float)$this->getValue($key);
    }

    /**
     * @return array<string, string|null>
     */
    public function getAllAsArray(): array {
        $settings = $this->findAll();
        $result = CompanySetting::DEFAULTS;

        foreach ($settings as $setting) {
            $result[$setting->getSettingKey()] = $setting->getSettingValue();
        }

        return $result;
    }
}
