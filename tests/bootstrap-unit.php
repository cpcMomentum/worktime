<?php

declare(strict_types=1);

/**
 * Lightweight bootstrap for pure unit tests that do not need a running Nextcloud.
 *
 * Nextcloud's public API (the OCP / NCU namespaces) is provided at runtime by the
 * server. For isolated unit tests we autoload the class definitions shipped by the
 * dev dependency nextcloud/ocp instead, so calculation logic can be tested without
 * booting the full platform or a database.
 */

// Shims for private OC\* symbols referenced by the ocp stubs (container-free runs).
require __DIR__ . '/stubs/oc-shims.php';

$ocpRoot = __DIR__ . '/../vendor/nextcloud/ocp';

spl_autoload_register(static function (string $class) use ($ocpRoot): void {
	foreach (['OCP', 'NCU'] as $prefix) {
		if (str_starts_with($class, $prefix . '\\')) {
			$relative = str_replace('\\', '/', substr($class, strlen($prefix) + 1));
			$file = $ocpRoot . '/' . $prefix . '/' . $relative . '.php';
			if (is_file($file)) {
				require $file;
			}
			return;
		}
	}
});

// Gemeinsame Test-Helfer (Traits) liegen neben den Tests und sind keine Testklassen.
spl_autoload_register(static function (string $class): void {
	$prefix = 'OCA\\WorkTime\\Tests\\';
	if (str_starts_with($class, $prefix)) {
		$file = __DIR__ . '/' . str_replace('\\', '/', substr($class, strlen($prefix))) . '.php';
		if (is_file($file)) {
			require $file;
		}
	}
});

require __DIR__ . '/../vendor/autoload.php';
