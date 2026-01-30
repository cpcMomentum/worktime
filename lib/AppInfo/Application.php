<?php

declare(strict_types=1);

namespace OCA\WorkTime\AppInfo;

use OCP\AppFramework\App;
use OCP\AppFramework\Bootstrap\IBootContext;
use OCP\AppFramework\Bootstrap\IBootstrap;
use OCP\AppFramework\Bootstrap\IRegistrationContext;

class Application extends App implements IBootstrap {
    public const APP_ID = 'worktime';

    public function __construct() {
        parent::__construct(self::APP_ID);
    }

    public function register(IRegistrationContext $context): void {
        // Load Composer autoloader for TCPDF (must be in register(), not global scope)
        include_once __DIR__ . '/../../vendor/autoload.php';
    }

    public function boot(IBootContext $context): void {
        // Boot logic
    }
}
