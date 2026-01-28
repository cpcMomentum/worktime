<?php

declare(strict_types=1);

/**
 * PHPUnit Bootstrap für WorkTime Tests
 *
 * Lädt die Nextcloud Autoloader und Test-Umgebung.
 */

// Nextcloud Server Root (anpassen falls nötig)
$ncRoot = getenv('NC_ROOT') ?: '/var/www/nextcloud';

// Autoloader laden
require_once $ncRoot . '/lib/base.php';

// PHPUnit Compatibility
if (!class_exists('\PHPUnit\Framework\TestCase')) {
    class_alias('\PHPUnit_Framework_TestCase', '\PHPUnit\Framework\TestCase');
}

// OCP Classes mocken für Unit Tests
\OC::$loader->addValidRoot(__DIR__ . '/..');

// App Namespace registrieren
\OC_App::loadApp('worktime');
