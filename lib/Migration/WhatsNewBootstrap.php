<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Migration;

use OCA\WorkTime\AppInfo\Application;
use OCA\WorkTime\Service\WhatsNewService;
use OCP\App\IAppManager;
use OCP\IConfig;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

/**
 * Merkt sich einmalig, dass diese Installation schon vor dem „Was ist neu?"-
 * Fenster bestand (Vue-2-Port aus rechnungswerk#308).
 *
 * Das Fenster merkt sich je Nutzer die zuletzt gesehene Version. Wer das
 * Fenster noch nie hatte, hat keinen Wert — und ein leerer Wert sieht fuer die
 * App genauso aus wie ein brandneuer Nutzer. Ohne diese Notiz bliebe das
 * Fenster deshalb ausgerechnet in dem Release stumm, das es einfuehrt: alle
 * Bestandsnutzer wuerden als Neuzugaenge behandelt und uebersprungen.
 *
 * Die Unterscheidung liefert Nextcloud selbst. Dieser Schritt haengt an
 * `post-migration`, und den fuehrt der Installer nur aus, wenn vorher schon
 * eine Version installiert war (`Installer::updateApp()`, die Ausfuehrung steht
 * unter `if ($previousVersion !== '')`). Bei einer frischen Installation laeuft
 * er nie, dort bleibt es still wie besprochen.
 *
 * Gesetzt wird nur, solange nichts gesetzt ist. Die Notiz traegt die Version,
 * die das Fenster mitgebracht hat; sie verliert ihre Wirkung von selbst, sobald
 * die App weiterzieht (siehe WhatsNewService::getPending()).
 */
class WhatsNewBootstrap implements IRepairStep {

	public function __construct(
		private readonly IConfig $config,
		private readonly IAppManager $appManager,
	) {
	}

	public function getName(): string {
		return 'Was ist neu: Bestandsinstallation markieren';
	}

	public function run(IOutput $output): void {
		$stored = $this->config->getAppValue(Application::APP_ID, WhatsNewService::KEY_BOOTSTRAP, '');
		if ($stored !== '') {
			return;
		}

		// false = nicht aus dem Cache, sondern aus der frisch kopierten info.xml.
		$version = $this->appManager->getAppVersion(Application::APP_ID, false);
		$this->config->setAppValue(Application::APP_ID, WhatsNewService::KEY_BOOTSTRAP, $version);

		$output->info('Was ist neu: Bestandsinstallation auf ' . $version . ' markiert');
	}
}
