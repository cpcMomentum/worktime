<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Db;

use OCP\AppFramework\Db\DoesNotExistException;
use OCP\AppFramework\Db\MultipleObjectsReturnedException;
use OCP\AppFramework\Db\QBMapper;
use OCP\DB\QueryBuilder\IQueryBuilder;
use OCP\IDBConnection;

/**
 * @template-extends QBMapper<Project>
 */
class ProjectMapper extends QBMapper {

    public function __construct(IDBConnection $db) {
        parent::__construct($db, 'wt_projects', Project::class);
    }

    /**
     * Projekte nach Projektcode ordnen (#550).
     *
     * Vorher lief alles nach Name, wodurch die Codes in den Auswahlfeldern
     * zufaellig verstreut wirkten — sie waren gar nicht der Sortierschluessel.
     *
     * Die Regel ist bewusst dreiteilig, weil die Codes gemischt sind:
     * rein numerische Codes werden numerisch verglichen (sonst stuende 1024
     * vor 98), alphanumerische kommen dahinter, und Projekte ohne Code ganz
     * zuletzt. Damit bleibt auch die Konvention wirksam, interne Toepfe ueber
     * Codes wie ZZX/ZZY/ZZZ ans Ende zu schieben.
     *
     * Warum in PHP und nicht per ORDER BY: die Zeichenkettensortierung der
     * Datenbank haette dasselbe Laengenproblem, und `code` ist nullable — die
     * Einordnung von NULL unterscheidet sich zwischen PostgreSQL (hinten),
     * MySQL und SQLite (vorn). Bei dieser Datenmenge ist das unkritisch und
     * ueber alle unterstuetzten Datenbanken gleich.
     *
     * @param Project[] $projects
     * @return Project[]
     */
    public static function sortByCode(array $projects): array {
        usort($projects, static function (Project $a, Project $b): int {
            $codeA = trim((string)$a->getCode());
            $codeB = trim((string)$b->getCode());

            if ($codeA === '' || $codeB === '') {
                // Ohne Code nach hinten; sind beide ohne, entscheidet der Name.
                if ($codeA === $codeB) {
                    return strcasecmp($a->getName(), $b->getName());
                }
                return $codeA === '' ? 1 : -1;
            }

            $numericA = ctype_digit($codeA);
            $numericB = ctype_digit($codeB);

            if ($numericA && $numericB) {
                $cmp = (int)$codeA <=> (int)$codeB;
            } elseif ($numericA !== $numericB) {
                $cmp = $numericA ? -1 : 1;
            } else {
                $cmp = strcasecmp($codeA, $codeB);
            }

            return $cmp !== 0 ? $cmp : strcasecmp($a->getName(), $b->getName());
        });

        return $projects;
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function find(int $id): Project {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('id', $qb->createNamedParameter($id, IQueryBuilder::PARAM_INT)));

        return $this->findEntity($qb);
    }

    /**
     * @return Project[]
     */
    public function findAll(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->orderBy('name', 'ASC');

        // name als stabile Grundordnung; die eigentliche Reihenfolge macht
        // sortByCode() (#550).
        return self::sortByCode($this->findEntities($qb));
    }

    /**
     * @return Project[]
     */
    public function findAllActive(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('is_active', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)))
            ->orderBy('name', 'ASC');

        // name als stabile Grundordnung; die eigentliche Reihenfolge macht
        // sortByCode() (#550).
        return self::sortByCode($this->findEntities($qb));
    }

    /**
     * @throws DoesNotExistException
     * @throws MultipleObjectsReturnedException
     */
    public function findByCode(string $code): Project {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('code', $qb->createNamedParameter($code)));

        return $this->findEntity($qb);
    }

    /**
     * @return Project[]
     */
    public function findBillable(): array {
        $qb = $this->db->getQueryBuilder();
        $qb->select('*')
            ->from($this->getTableName())
            ->where($qb->expr()->eq('is_active', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)))
            ->andWhere($qb->expr()->eq('is_billable', $qb->createNamedParameter(1, IQueryBuilder::PARAM_INT)))
            ->orderBy('name', 'ASC');

        // name als stabile Grundordnung; die eigentliche Reihenfolge macht
        // sortByCode() (#550).
        return self::sortByCode($this->findEntities($qb));
    }

    public function existsByCode(string $code, ?int $excludeId = null): bool {
        $qb = $this->db->getQueryBuilder();
        $qb->select($qb->func()->count('id'))
            ->from($this->getTableName())
            ->where($qb->expr()->eq('code', $qb->createNamedParameter($code)));

        if ($excludeId !== null) {
            $qb->andWhere($qb->expr()->neq('id', $qb->createNamedParameter($excludeId, IQueryBuilder::PARAM_INT)));
        }

        $result = $qb->executeQuery();
        $count = $result->fetchOne();
        $result->closeCursor();

        return (int)$count > 0;
    }
}
