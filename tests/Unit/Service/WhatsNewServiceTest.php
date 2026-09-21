<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\Service;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Service\WhatsNewService;
use OCP\App\IAppManager;
use OCP\IConfig;
use OCP\IL10N;
use PHPUnit\Framework\TestCase;
use Psr\Log\LoggerInterface;

/**
 * Anzeige-Logik des „Was ist neu?"-Fensters (#730, Port aus rechnungswerk#308).
 *
 * Die Entscheidungen aus Konzept v1.1 und der Abnahme am Prototyp sind hier
 * festgenagelt: kein Fenster beim Erstkontakt, keine Kumulation ueber mehrere
 * Versionen, nichts aus der Zukunft, Sprachwahl mit Fallback Englisch.
 */
class WhatsNewServiceTest extends TestCase {

	/**
	 * Symbolnamen, die `src/components/WhatsNewDialog.vue` kennt. Ein Tippfehler
	 * in der Datei faellt sonst niemandem auf, das Fenster zeigt stumm den Stern.
	 */
	private const BEKANNTE_SYMBOLE = [
		'account-group', 'chart-bar', 'cog', 'counter', 'email',
		'file-document', 'folder', 'magnify', 'star', 'translate',
	];

	private string $appDir;

	protected function setUp(): void {
		parent::setUp();
		$this->appDir = sys_get_temp_dir() . '/wt-whatsnew-' . bin2hex(random_bytes(6));
		mkdir($this->appDir . '/whatsnew', 0o777, true);
	}

	protected function tearDown(): void {
		$file = $this->appDir . '/whatsnew/whatsnew.json';
		if (is_file($file)) {
			unlink($file);
		}
		if (is_dir($this->appDir . '/whatsnew')) {
			rmdir($this->appDir . '/whatsnew');
		}
		if (is_dir($this->appDir)) {
			rmdir($this->appDir);
		}
		parent::tearDown();
	}

	/**
	 * @param array<string, mixed> $catalogue
	 */
	private function writeCatalogue(array $catalogue): void {
		file_put_contents(
			$this->appDir . '/whatsnew/whatsnew.json',
			json_encode($catalogue, JSON_THROW_ON_ERROR),
		);
	}

	/**
	 * @param array<string, string> $stored Vorbelegte Nutzer-Einstellungen
	 * @param array<string, string> $written Sammelt, was der Service schreibt
	 */
	private function buildService(
		string $appVersion,
		array $stored,
		array &$written,
		string $language = 'de',
		string $bootstrap = '',
	): WhatsNewService {
		$appManager = $this->createMock(IAppManager::class);
		$appManager->method('getAppVersion')->willReturn($appVersion);
		$appManager->method('getAppPath')->willReturn($this->appDir);

		// Absichtlich auf Nutzer UND Schluessel geschluesselt: waere nur der
		// Schluessel die Ablage, bliebe die ganze Suite gruen, wenn der Dienst
		// die Marke unter der falschen Nutzer-ID liest oder schreibt.
		$config = $this->createMock(IConfig::class);
		$config->method('getAppValue')->willReturnCallback(
			static fn (string $app, string $key, $default = '') => $key === WhatsNewService::KEY_BOOTSTRAP
				? ($bootstrap !== '' ? $bootstrap : $default)
				: $default,
		);
		$config->method('getUserValue')->willReturnCallback(
			static fn (string $userId, string $app, string $key, $default = '') => $stored[$userId . '/' . $key] ?? $default,
		);
		$config->method('setUserValue')->willReturnCallback(
			static function (string $userId, string $app, string $key, string $value) use (&$written): void {
				$written[$userId . '/' . $key] = $value;
			},
		);

		$l10n = $this->createMock(IL10N::class);
		$l10n->method('getLanguageCode')->willReturn($language);

		return new WhatsNewService($appManager, $config, $l10n, $this->createMock(LoggerInterface::class));
	}

	/** @return array<string, mixed> */
	private function catalogueFixture(): array {
		return [
			'0.5.1' => [[
				'title' => ['de' => 'Aelter DE', 'en' => 'Older EN'],
				'text' => ['de' => 'Alter Text', 'en' => 'Old text'],
				'plus' => false,
			]],
			'0.5.3' => [
				[
					'title' => ['de' => 'Adresszusatz', 'en' => 'Address supplement'],
					'text' => ['de' => 'Zweite Adresszeile', 'en' => 'Second address line'],
					'icon' => 'account-group',
					'where' => ['de' => 'Kunden', 'en' => 'Customers'],
					'adminOnly' => false,
					'plus' => false,
				],
				[
					'title' => ['de' => 'Ablageordner', 'en' => 'Archive folder'],
					'text' => ['de' => 'Pfad bleibt stehen', 'en' => 'Path stays'],
					'icon' => 'folder',
					'where' => ['de' => 'Einstellungen', 'en' => 'Settings'],
					'adminOnly' => true,
					'plus' => false,
				],
			],
		];
	}

	public function testErstkontaktZeigtNichtsUndSetztDieMarke(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', [], $written);

		$result = $service->getPending('alice');

		self::assertSame([], $result['entries'], 'Neue Nutzer werden nicht mit einem Changelog begruesst');
		self::assertSame('0.5.3', $written['alice/' . WhatsNewService::KEY_LAST_SEEN] ?? null);
	}

	public function testBestandsinstallationSiehtDasEinfuehrungsFenster(): void {
		// Kein Merkzettel, aber die Installation bestand schon vor dem Fenster:
		// genau der Fall beim Update auf das einfuehrende Release.
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', [], $written, 'de', '0.5.3');

		$result = $service->getPending('alice');

		self::assertCount(2, $result['entries'], 'Bestandsnutzer sollen das Fenster sehen');
		self::assertArrayNotHasKey(
			'alice/' . WhatsNewService::KEY_LAST_SEEN,
			$written,
			'Die Marke wandert erst mit der Quittung',
		);
	}

	public function testNotizGiltNurFuerDasEinfuehrendeRelease(): void {
		// Die Notiz stammt von 0.5.3, installiert ist inzwischen 0.5.4. Ein
		// Konto, das erst jetzt dazukommt, ist wirklich neu.
		$this->writeCatalogue(['0.5.3' => $this->catalogueFixture()['0.5.3'], '0.5.4' => [[
			'title' => ['de' => 'Spaeter', 'en' => 'Later'],
			'text' => ['de' => 'Text', 'en' => 'Text'],
		]]]);
		$written = [];
		$service = $this->buildService('0.5.4', [], $written, 'de', '0.5.3');

		$result = $service->getPending('alice');

		self::assertSame([], $result['entries'], 'Spaetere Neuzugaenge werden nicht begruesst');
		self::assertSame('0.5.4', $written['alice/' . WhatsNewService::KEY_LAST_SEEN] ?? null);
	}

	public function testOhneNotizBleibtEsBeimErstkontakt(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', [], $written, 'de', '');

		$result = $service->getPending('alice');

		self::assertSame([], $result['entries'], 'Frische Installation begruesst niemanden mit einer Aenderungsliste');
		self::assertSame('0.5.3', $written['alice/' . WhatsNewService::KEY_LAST_SEEN] ?? null);
	}

	public function testNeueVersionLiefertDerenEintraege(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written);

		$result = $service->getPending('alice');

		self::assertSame('0.5.3', $result['version']);
		self::assertCount(2, $result['entries']);
		self::assertSame('Adresszusatz', $result['entries'][0]['title']);
		self::assertSame('Zweite Adresszeile', $result['entries'][0]['text']);
		self::assertFalse($result['entries'][0]['plus']);
		self::assertSame('account-group', $result['entries'][0]['icon']);
		self::assertSame('Kunden', $result['entries'][0]['where']);
		self::assertFalse($result['entries'][0]['adminOnly']);
		self::assertTrue($result['entries'][1]['adminOnly'], 'Die Einstellungen sind adminpflichtig');
		self::assertArrayNotHasKey(
			'alice/' . WhatsNewService::KEY_LAST_SEEN,
			$written,
			'Die Marke wandert erst mit der Quittung, sonst geht das Fenster bei einem Reload verloren',
		);
	}

	public function testVersionssprungKumuliertNicht(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.4.0'], $written);

		$result = $service->getPending('alice');

		self::assertSame('0.5.3', $result['version']);
		self::assertCount(2, $result['entries'], 'Nur die neueste Version, nicht die uebersprungenen');
	}

	public function testNichtsNeuesSchreibtDieMarkeStillFort(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.4', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.3'], $written);

		$result = $service->getPending('alice');

		self::assertSame([], $result['entries']);
		self::assertSame('0.5.4', $written['alice/' . WhatsNewService::KEY_LAST_SEEN] ?? null);
	}

	public function testEintraegeAusDerZukunftBleibenAus(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		// Installiert ist 0.5.2, die Datei kennt schon 0.5.3.
		$service = $this->buildService('0.5.2', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.0'], $written);

		$result = $service->getPending('alice');

		self::assertSame('0.5.1', $result['version'], 'Nur was auch installiert ist');
		self::assertCount(1, $result['entries']);
	}

	public function testEnglischeNutzerBekommenDenEnglischenText(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written, 'en');

		$result = $service->getPending('alice');

		self::assertSame('Address supplement', $result['entries'][0]['title']);
	}

	public function testFundortFolgtDerSprache(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written, 'en');

		$result = $service->getPending('alice');

		self::assertSame('Customers', $result['entries'][0]['where']);
	}

	public function testEintragOhneSymbolUndFundortBleibtGueltig(): void {
		$this->writeCatalogue(['0.5.3' => [[
			'title' => ['de' => 'Ohne alles', 'en' => 'Without anything'],
			'text' => ['de' => 'Nur Text', 'en' => 'Text only'],
		]]]);
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written);

		$result = $service->getPending('alice');

		self::assertCount(1, $result['entries']);
		self::assertSame('', $result['entries'][0]['icon'], 'Der Dialog faellt dann auf sein Standardsymbol zurueck');
		self::assertSame('', $result['entries'][0]['where'], 'Ohne Fundort bleibt die Zeile weg');
		self::assertFalse($result['entries'][0]['adminOnly']);
	}

	public function testRegionalcodeFaelltAufDieBasisspracheZurueck(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written, 'de_DE');

		$result = $service->getPending('alice');

		self::assertSame('Adresszusatz', $result['entries'][0]['title']);
	}

	public function testUnbekannteSpracheFaelltAufEnglischZurueck(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written, 'fr');

		$result = $service->getPending('alice');

		self::assertSame('Address supplement', $result['entries'][0]['title']);
	}

	public function testFehlendeDateiBlockiertNichts(): void {
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written);

		$result = $service->getPending('alice');

		self::assertSame([], $result['entries']);
		self::assertSame('0.5.3', $written['alice/' . WhatsNewService::KEY_LAST_SEEN] ?? null);
	}

	public function testKaputtesJsonBlockiertNichts(): void {
		file_put_contents($this->appDir . '/whatsnew/whatsnew.json', '{ das ist kein JSON');
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written);

		$result = $service->getPending('alice');

		self::assertSame([], $result['entries']);
	}

	public function testVersionOhneEintraegeErzeugtKeinFenster(): void {
		$this->writeCatalogue(['0.5.3' => []]);
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written);

		$result = $service->getPending('alice');

		self::assertSame([], $result['entries'], 'Wartungsrelease ohne Berichtenswertes zeigt kein Fenster');
		self::assertSame('0.5.3', $written['alice/' . WhatsNewService::KEY_LAST_SEEN] ?? null);
	}

	public function testMarkenZweierNutzerBleibenGetrennt(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		// Alice hat das Fenster schon gesehen, Bob steht noch auf 0.5.2.
		$service = $this->buildService('0.5.3', [
			'alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.3',
			'bob/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2',
		], $written);

		self::assertSame([], $service->getPending('alice')['entries'], 'Alice hat es schon gesehen');
		self::assertCount(2, $service->getPending('bob')['entries'], 'Bob noch nicht');

		// Bobs Quittung darf ausschliesslich Bobs Marke bewegen.
		$vorher = $written;
		$service->markSeen('bob');
		$veraendert = array_keys(array_diff_assoc($written, $vorher));

		self::assertSame(['bob/' . WhatsNewService::KEY_LAST_SEEN], $veraendert);
		self::assertSame('0.5.3', $written['bob/' . WhatsNewService::KEY_LAST_SEEN]);
	}

	public function testEintragOhneTitelWirdUebersprungen(): void {
		$this->writeCatalogue(['0.5.3' => [
			['title' => ['de' => '', 'en' => ''], 'text' => ['de' => 'Text ohne Titel', 'en' => 'Text without title']],
			['title' => ['de' => 'Mit Titel', 'en' => 'With title'], 'text' => ['de' => 'Text', 'en' => 'Text']],
		]]);
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written);

		$result = $service->getPending('alice');

		self::assertCount(1, $result['entries'], 'Ein titelloser Eintrag ergaebe eine leere Ueberschrift');
		self::assertSame('Mit Titel', $result['entries'][0]['title']);
	}

	public function testQuittungSetztDieLaufendeVersion(): void {
		$this->writeCatalogue($this->catalogueFixture());
		$written = [];
		$service = $this->buildService('0.5.3', ['alice/' . WhatsNewService::KEY_LAST_SEEN => '0.5.2'], $written);

		$service->markSeen('alice');

		self::assertSame('0.5.3', $written['alice/' . WhatsNewService::KEY_LAST_SEEN] ?? null);
	}

	public function testDieAusgelieferteDateiIstGueltig(): void {
		$file = dirname(__DIR__, 3) . '/whatsnew/whatsnew.json';
		self::assertFileExists($file);

		$catalogue = json_decode((string)file_get_contents($file), true, 512, JSON_THROW_ON_ERROR);
		self::assertIsArray($catalogue);
		self::assertNotEmpty($catalogue);

		foreach ($catalogue as $version => $entries) {
			self::assertMatchesRegularExpression('/^\d+\.\d+\.\d+$/', (string)$version);
			self::assertIsArray($entries);
			foreach ($entries as $entry) {
				// de und en sind Pflicht (Konzept v1.1, Abschnitt 2).
				foreach (['title', 'text'] as $field) {
					self::assertArrayHasKey($field, $entry);
					self::assertArrayHasKey('de', $entry[$field], "$version: $field braucht de");
					self::assertArrayHasKey('en', $entry[$field], "$version: $field braucht en");
					self::assertNotSame('', trim((string)$entry[$field]['de']));
					self::assertNotSame('', trim((string)$entry[$field]['en']));
				}
				self::assertArrayHasKey('plus', $entry);
				self::assertIsBool($entry['plus']);

				// Fundort ist optional, aber wenn da, dann zweisprachig.
				if (isset($entry['where'])) {
					self::assertArrayHasKey('de', $entry['where'], "$version: where braucht de");
					self::assertArrayHasKey('en', $entry['where'], "$version: where braucht en");
				}
				// Symbol muss der Dialog kennen, sonst erscheint stumm der Stern.
				if (isset($entry['icon'])) {
					self::assertContains($entry['icon'], self::BEKANNTE_SYMBOLE, "$version: unbekanntes Symbol");
				}
			}
		}
	}

	public function testAppIdBleibtDerAblageortDerMarke(): void {
		// Die Marke haengt an der App-ID, nicht an einem eigenen Namensraum —
		// sonst findet sie eine Kopie der Vorlage in einer anderen App nicht.
		self::assertSame('worktime', Application::APP_ID);
	}
}
