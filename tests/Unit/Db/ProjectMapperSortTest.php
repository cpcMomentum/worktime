<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Db;

use OCA\WorkTime\Db\Project;
use OCA\WorkTime\Db\ProjectMapper;
use PHPUnit\Framework\TestCase;

/**
 * Sortierung der Projektlisten nach Projektcode (#550).
 *
 * Vorher lief alles nach Name, wodurch die Codes in den Auswahlfeldern
 * zufaellig verstreut wirkten. Die Faelle hier sind genau die, an denen eine
 * naive Loesung scheitert.
 */
class ProjectMapperSortTest extends TestCase {

    private function project(?string $code, string $name): Project {
        $project = new Project();
        $project->setCode($code);
        $project->setName($name);

        return $project;
    }

    /**
     * @param array<array{0: ?string, 1: string}> $input
     * @return string[] Codes in sortierter Reihenfolge, '-' fuer ohne Code
     */
    private function sortedCodes(array $input): array {
        $projects = array_map(fn (array $p): Project => $this->project($p[0], $p[1]), $input);

        return array_map(
            static fn (Project $p): string => $p->getCode() ?? '-',
            ProjectMapper::sortByCode($projects),
        );
    }

    public function testRealWorldOrderFromTheIssue(): void {
        // Die Liste aus dem Screenshot, vorher nach Name sortiert.
        $sorted = $this->sortedCodes([
            ['ZZX', 'Akquise'],
            ['514', 'EUDI-Wallet'],
            ['512', 'Fraktionsbüro'],
            ['498', 'HSH'],
            ['ZZZ', 'Interne IT'],
            ['501', 'Politpilot'],
            ['517', 'Valore'],
            ['ZZY', 'Verwaltung und Orga'],
        ]);

        $this->assertSame(
            ['498', '501', '512', '514', '517', 'ZZX', 'ZZY', 'ZZZ'],
            $sorted,
        );
    }

    public function testNumericCodesAreComparedNumerically(): void {
        // Reine Zeichenkettensortierung ergaebe 1024, 498, 98 — falsch.
        $sorted = $this->sortedCodes([
            ['1024', 'Tausend'],
            ['98', 'Achtundneunzig'],
            ['498', 'Vierhundert'],
        ]);

        $this->assertSame(['98', '498', '1024'], $sorted);
    }

    public function testNumericCodesComeBeforeAlphanumericOnes(): void {
        // Traegt die Konvention, interne Toepfe ueber ZZ-Codes ans Ende zu legen.
        $sorted = $this->sortedCodes([
            ['ZZX', 'Akquise'],
            ['1024', 'Projekt'],
            ['A1', 'Sonderfall'],
        ]);

        $this->assertSame(['1024', 'A1', 'ZZX'], $sorted);
    }

    public function testProjectsWithoutCodeGoLast(): void {
        // Leerer String und null zaehlen beide als "kein Code"; untereinander
        // entscheidet der Name (Leerer Code vor Ohne Code).
        $projects = ProjectMapper::sortByCode([
            $this->project(null, 'Ohne Code'),
            $this->project('ZZZ', 'Interne IT'),
            $this->project('', 'Leerer Code'),
            $this->project('501', 'Politpilot'),
        ]);

        $this->assertSame(
            ['Politpilot', 'Interne IT', 'Leerer Code', 'Ohne Code'],
            array_map(static fn (Project $p): string => $p->getName(), $projects),
        );
    }

    public function testProjectsWithoutCodeAreOrderedByName(): void {
        $projects = ProjectMapper::sortByCode([
            $this->project(null, 'Zebra'),
            $this->project(null, 'Anton'),
        ]);

        $this->assertSame(
            ['Anton', 'Zebra'],
            array_map(static fn (Project $p): string => $p->getName(), $projects),
        );
    }

    public function testEqualCodesFallBackToName(): void {
        // Codes sind nicht eindeutigkeitspflichtig, die Reihenfolge muss
        // trotzdem stabil sein.
        $projects = ProjectMapper::sortByCode([
            $this->project('500', 'Zweitprojekt'),
            $this->project('500', 'Erstprojekt'),
        ]);

        $this->assertSame(
            ['Erstprojekt', 'Zweitprojekt'],
            array_map(static fn (Project $p): string => $p->getName(), $projects),
        );
    }

    public function testAlphanumericCodesIgnoreCase(): void {
        $sorted = $this->sortedCodes([
            ['zzb', 'Klein'],
            ['ZZA', 'Gross'],
        ]);

        $this->assertSame(['ZZA', 'zzb'], $sorted);
    }

    public function testSurroundingWhitespaceDoesNotBreakOrder(): void {
        $sorted = $this->sortedCodes([
            [' 512 ', 'Mit Leerzeichen'],
            ['498', 'Ohne'],
        ]);

        $this->assertSame(['498', ' 512 '], $sorted);
    }

    public function testEmptyListStaysEmpty(): void {
        $this->assertSame([], ProjectMapper::sortByCode([]));
    }
}
