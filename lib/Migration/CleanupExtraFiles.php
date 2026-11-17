<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Migration;

use OCP\App\AppPathNotFoundException;
use OCP\App\IAppManager;
use OCP\Migration\IOutput;
use OCP\Migration\IRepairStep;

/**
 * Remove extra files that were accidentally included in earlier releases
 * and cause integrity check failures.
 */
class CleanupExtraFiles implements IRepairStep {

	private const ENTRY_FILE = 'js/worktime-main.mjs';

	public function __construct(
		private IAppManager $appManager,
	) {
	}

	public function getName(): string {
		return 'Remove extra files from earlier releases';
	}

	public function run(IOutput $output): void {
		try {
			$appPath = $this->appManager->getAppPath('worktime');
		} catch (AppPathNotFoundException) {
			return;
		}

		$filesToRemove = [
			$appPath . '/appinfo/worktime.crt',
			$appPath . '/test-results/.last-run.json',
		];

		$dirsToRemove = [
			$appPath . '/test-results',
		];

		foreach ($filesToRemove as $file) {
			if (file_exists($file)) {
				@unlink($file);
				$output->info('Removed: ' . basename($file));
			}
		}

		foreach ($dirsToRemove as $dir) {
			if (is_dir($dir)) {
				@rmdir($dir);
				$output->info('Removed directory: ' . basename($dir));
			}
		}

		$this->removeStaleJsBundles($appPath, $output);
	}

	// Unsignierte Dateien in js/ stammen aus einer Vorversion und wuerden als EXTRA_FILE gemeldet
	private function removeStaleJsBundles(string $appPath, IOutput $output): void {
		$jsDir = $appPath . '/js';
		if (!is_dir($jsDir)) {
			return;
		}

		$signaturePath = $appPath . '/appinfo/signature.json';
		if (!is_file($signaturePath)) {
			return;
		}

		$raw = file_get_contents($signaturePath);
		$signature = $raw === false ? null : json_decode($raw, true);
		$signedFiles = is_array($signature) ? ($signature['hashes'] ?? null) : null;
		if (!is_array($signedFiles)) {
			return;
		}

		// Nur aufraeumen, wenn die Signatur nachweislich zu den Dateien auf der Platte gehoert
		$entry = $appPath . '/' . self::ENTRY_FILE;
		$signedHash = $signedFiles[self::ENTRY_FILE] ?? null;
		if (!is_string($signedHash) || !is_file($entry) || !hash_equals($signedHash, (string)hash_file('sha512', $entry))) {
			$output->info('signature.json does not match this build, js/ is left untouched');
			return;
		}

		foreach (scandir($jsDir) ?: [] as $entry) {
			if ($entry === '.' || $entry === '..') {
				continue;
			}
			$path = $jsDir . '/' . $entry;
			if (!is_file($path) || isset($signedFiles['js/' . $entry])) {
				continue;
			}
			if (@unlink($path)) {
				$output->info('Removed stale JS bundle: ' . $entry);
			}
		}
	}
}
