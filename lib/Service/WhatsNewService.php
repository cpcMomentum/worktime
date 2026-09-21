<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Service;

use OCA\WorkTime\AppInfo\Application;
use OCP\App\AppPathNotFoundException;
use OCP\App\IAppManager;
use OCP\IConfig;
use OCP\IL10N;
use Psr\Log\LoggerInterface;

/**
 * „Was ist neu?"-Fenster (Baustein 0b, Vue-2-Port aus rechnungswerk#308).
 *
 * Die Inhalte liegen als `whatsnew/whatsnew.json` im App-Paket — kein Nachladen
 * von fremden Servern, die App telefoniert nicht nach Hause. Gemerkt wird pro
 * Nutzer die zuletzt gesehene App-Version.
 *
 * Verhalten (Entscheidungen 21.09.2026, Konzept v1.1 plus Abnahme am Prototyp):
 *  - Erstkontakt (neue Installation, neuer Nutzer): Marke still auf die laufende
 *    Version setzen, kein Fenster. Niemand wird mit einem Changelog begruesst.
 *  - Sonst die NEUESTE Version aus der Datei, die neuer als die Marke und nicht
 *    neuer als die installierte App ist. Bewusst keine Kumulation ueber mehrere
 *    Versionen: das Fenster soll kein Changelog werden.
 *  - Nichts zu zeigen: Marke still fortschreiben, kein Fenster.
 *
 * Diese Klasse ist stackneutral und aus dem RechnungsWerk-Piloten uebernommen;
 * der PHP-Teil traegt keine App-Besonderheiten.
 */
class WhatsNewService {

	/** Nutzer-Einstellung auf der App-ID, Wert = zuletzt gesehene App-Version. */
	public const KEY_LAST_SEEN = 'whatsnew_last_seen';

	/**
	 * App-weite Notiz „diese Installation bestand schon vor dem Fenster",
	 * gesetzt von {@see \OCA\WorkTime\Migration\WhatsNewBootstrap}.
	 * Wert = die Version, die das Fenster mitgebracht hat.
	 */
	public const KEY_BOOTSTRAP = 'whatsnew_bootstrap';

	private const RELATIVE_PATH = '/whatsnew/whatsnew.json';

	/** Anzeigesprache, wenn die Nutzersprache im Eintrag fehlt. */
	private const FALLBACK_LANGUAGE = 'en';

	/** Einmal je Request gelesen, nicht je Aufruf. */
	private ?array $catalogue = null;

	public function __construct(
		private readonly IAppManager $appManager,
		private readonly IConfig $config,
		private readonly IL10N $l10n,
		private readonly LoggerInterface $logger,
	) {
	}

	/**
	 * Was dieser Nutzer beim Oeffnen der App sehen soll. Leere Eintragsliste
	 * heisst: kein Fenster.
	 *
	 * @return array{version: string, entries: list<array{title: string, text: string, icon: string, where: string, adminOnly: bool, plus: bool}>}
	 */
	public function getPending(string $userId): array {
		$current = $this->currentVersion();
		$lastSeen = $this->config->getUserValue($userId, Application::APP_ID, self::KEY_LAST_SEEN, '');

		if ($lastSeen === '') {
			// Leerer Merkzettel heisst zweierlei: entweder ist der Nutzer neu,
			// oder die Installation hat das Fenster gerade erst bekommen. Nur im
			// zweiten Fall soll etwas erscheinen.
			$bootstrap = $this->config->getAppValue(Application::APP_ID, self::KEY_BOOTSTRAP, '');
			if ($bootstrap === '' || version_compare($bootstrap, $current, '!=')) {
				// Erstkontakt: still mitschreiben, nichts zeigen.
				$this->markSeen($userId);
				return ['version' => $current, 'entries' => []];
			}
			// Bestandsinstallation im Einfuehrungs-Release: so behandeln, als
			// haette der Nutzer noch gar nichts gesehen.
			$lastSeen = '0.0.0';
		}

		$version = $this->newestVersionToShow($lastSeen, $current);
		if ($version === null) {
			// Nichts Berichtenswertes seit der Marke: Marke nachziehen, kein Fenster.
			$this->markSeen($userId);
			return ['version' => $current, 'entries' => []];
		}

		return [
			'version' => $version,
			'entries' => $this->localise($this->catalogue()[$version]),
		];
	}

	/** Quittiert das Fenster: die laufende Version gilt als gesehen. */
	public function markSeen(string $userId): void {
		$this->config->setUserValue(
			$userId,
			Application::APP_ID,
			self::KEY_LAST_SEEN,
			$this->currentVersion(),
		);
	}

	/**
	 * Neueste Version mit Eintraegen, die neuer als die Marke und nicht neuer
	 * als die installierte App ist. Der obere Deckel schuetzt davor, dass ein
	 * versehentlich zu frueh gepflegter Eintrag vorab erscheint.
	 */
	private function newestVersionToShow(string $lastSeen, string $current): ?string {
		$candidates = [];
		foreach ($this->catalogue() as $version => $entries) {
			if ($entries === []) {
				continue;
			}
			if (version_compare($version, $lastSeen, '<=')) {
				continue;
			}
			if (version_compare($version, $current, '>')) {
				continue;
			}
			$candidates[] = $version;
		}
		if ($candidates === []) {
			return null;
		}
		usort($candidates, static fn (string $a, string $b): int => version_compare($b, $a));
		return $candidates[0];
	}

	/**
	 * Eintraege der Datei, nach Version. Fehlt oder klemmt die Datei, bleibt das
	 * Fenster einfach aus — es darf nie die App blockieren.
	 *
	 * @return array<string, list<array<string, mixed>>>
	 */
	private function catalogue(): array {
		if ($this->catalogue !== null) {
			return $this->catalogue;
		}
		$this->catalogue = $this->readCatalogue();
		return $this->catalogue;
	}

	/**
	 * @return array<string, list<array<string, mixed>>>
	 */
	private function readCatalogue(): array {
		try {
			$path = $this->appManager->getAppPath(Application::APP_ID) . self::RELATIVE_PATH;
		} catch (AppPathNotFoundException $e) {
			$this->logger->warning('Was-ist-neu: App-Pfad nicht auflösbar', ['exception' => $e]);
			return [];
		}

		if (!is_readable($path)) {
			return [];
		}

		$raw = file_get_contents($path);
		if ($raw === false) {
			return [];
		}

		try {
			$decoded = json_decode($raw, true, 512, JSON_THROW_ON_ERROR);
		} catch (\JsonException $e) {
			$this->logger->warning('Was-ist-neu: whatsnew.json ist kein gültiges JSON', ['exception' => $e]);
			return [];
		}

		if (!is_array($decoded)) {
			return [];
		}

		$catalogue = [];
		foreach ($decoded as $version => $entries) {
			// json_decode macht aus einem Schluessel wie "3" einen int. Mit dem
			// x.y.z-Schema kommt das nicht vor, aber die Vorlage wandert durch die
			// Flotte — dort faellt ein stilles continue niemandem auf.
			$version = (string)$version;
			if (!is_array($entries)) {
				$this->logger->warning('Was-ist-neu: Eintraege zu Version {version} sind keine Liste', [
					'version' => $version,
				]);
				continue;
			}
			$catalogue[$version] = array_values(array_filter(
				$entries,
				static fn ($entry): bool => is_array($entry),
			));
		}
		return $catalogue;
	}

	/**
	 * Uebersetzt die Eintraege in die Sprache des Nutzers. `de` und `en` sind
	 * Pflicht, weitere Sprachen optional; fehlt die Nutzersprache, greift
	 * Englisch.
	 *
	 * @param list<array<string, mixed>> $entries
	 * @return list<array{title: string, text: string, icon: string, where: string, adminOnly: bool, plus: bool}>
	 */
	private function localise(array $entries): array {
		$language = $this->languageCode();
		$result = [];
		foreach ($entries as $entry) {
			$title = $this->pick($entry['title'] ?? null, $language);
			$text = $this->pick($entry['text'] ?? null, $language);
			// Ohne Titel gaebe es eine leere Ueberschrift ueber dem Text. Fehlt
			// die Nutzersprache im Eintrag, hat pick() schon auf Englisch und
			// dann auf die erste gepflegte Sprache zurueckgegriffen — hier ist
			// also wirklich nichts da.
			if ($title === '') {
				continue;
			}
			$result[] = [
				'title' => $title,
				'text' => $text,
				// Symbol statt Bild: ein Wort in der Datei, sprachneutral, altert
				// nicht. Welche Namen es gibt, entscheidet der Dialog.
				'icon' => is_string($entry['icon'] ?? null) ? $entry['icon'] : '',
				// „Zu finden unter ..." — die Stelle, an der die Neuerung sitzt.
				'where' => $this->pick($entry['where'] ?? null, $language),
				// Sagt dem Nutzer, warum er die Stelle nicht findet.
				'adminOnly' => (bool)($entry['adminOnly'] ?? false),
				'plus' => (bool)($entry['plus'] ?? false),
			];
		}
		return $result;
	}

	/**
	 * Sprachcode des Nutzers, auf die Basissprache gekuerzt: Nextcloud liefert
	 * je nach Konto „de" oder „de_DE", die Datei fuehrt nur „de".
	 */
	private function languageCode(): string {
		$code = strtolower($this->l10n->getLanguageCode());
		$separator = strpbrk($code, '_-');
		if ($separator !== false) {
			$code = substr($code, 0, strlen($code) - strlen($separator));
		}
		return $code;
	}

	/** Wert in Nutzersprache, sonst Englisch, sonst die erste gepflegte Sprache. */
	private function pick(mixed $translations, string $language): string {
		if (is_string($translations)) {
			return $translations;
		}
		if (!is_array($translations)) {
			return '';
		}
		foreach ([$language, self::FALLBACK_LANGUAGE] as $candidate) {
			if (isset($translations[$candidate]) && is_string($translations[$candidate])) {
				return $translations[$candidate];
			}
		}
		foreach ($translations as $value) {
			if (is_string($value)) {
				return $value;
			}
		}
		return '';
	}

	private function currentVersion(): string {
		return $this->appManager->getAppVersion(Application::APP_ID);
	}
}
