<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\License;

use OCA\WorkTime\License\WerkwolkeStore;
use OCP\IAppConfig;
use PHPUnit\Framework\TestCase;

class WerkwolkeStoreTest extends TestCase {

    /** @var array<string, string> */
    private array $config = [];
    /** @var array<string, bool> */
    private array $sensitive = [];

    private function store(): WerkwolkeStore {
        $appConfig = $this->createMock(IAppConfig::class);
        $appConfig->method('getValueString')->willReturnCallback(
            fn (string $app, string $key, string $default = '') => $this->config["$app/$key"] ?? $default
        );
        $appConfig->method('setValueString')->willReturnCallback(function (string $app, string $key, string $value, bool $lazy = false, bool $sensitive = false): bool {
            $this->config["$app/$key"] = $value;
            $this->sensitive["$app/$key"] = $sensitive;
            $this->assertFalse($lazy);
            return true;
        });
        $appConfig->method('deleteKey')->willReturnCallback(function (string $app, string $key): void {
            unset($this->config["$app/$key"]);
        });
        return new WerkwolkeStore($appConfig);
    }

    public function testAdoptingAKeyNeverOverwritesOneAnotherAppJustStored(): void {
        $this->config['werkwolke/key'] = 'wp_VONPROJEKTWERK';

        $this->assertFalse($this->store()->adoptKeyIfEmpty('wp_ALT'));
        $this->assertSame('wp_VONPROJEKTWERK', $this->config['werkwolke/key']);
    }

    public function testAdoptingAKeyIntoAnEmptyStoreWritesKeyAndVersion(): void {
        $this->assertTrue($this->store()->adoptKeyIfEmpty('wp_ALT'));
        $this->assertSame(['werkwolke/store_version' => '1', 'werkwolke/key' => 'wp_ALT'], $this->config);
    }

    public function testKeyAndTokenAreStoredAsSensitive(): void {
        $store = $this->store();
        $store->setKeyAndToken('wp_A', 't1');
        $this->assertSame(['werkwolke/store_version' => false, 'werkwolke/key' => true, 'werkwolke/token' => true], $this->sensitive);

        $this->sensitive = [];
        $this->assertTrue($store->replaceTokenIfNewer('wp_A', 't2', 2, fn () => 1));
        $this->assertTrue($this->sensitive['werkwolke/token']);
    }

    public function testANewerFormatIsReadButNeverWritten(): void {
        $this->config = ['werkwolke/store_version' => '2', 'werkwolke/key' => 'wp_NEU', 'werkwolke/token' => 't'];
        $before = $this->config;
        $store = $this->store();

        $this->assertTrue($store->isTooNew());
        $this->assertSame('wp_NEU', $store->getKey());
        $this->assertSame('t', $store->getToken());
        $store->setKeyAndToken('wp_X', 't2');
        $store->setKeyOnly('wp_X');
        $store->clear();
        $store->deleteTokenOfKey('wp_NEU');
        $this->assertFalse($store->adoptKeyIfEmpty('wp_X'));
        $this->assertFalse($store->replaceTokenIfNewer('wp_NEU', 't3', 99, fn () => 1));
        $this->assertSame($before, $this->config);
    }

    public function testClearKeepsTheFormatVersion(): void {
        $this->config = ['werkwolke/store_version' => '1', 'werkwolke/key' => 'wp_A', 'werkwolke/token' => 't'];
        $this->store()->clear();

        $this->assertSame(['werkwolke/store_version' => '1'], $this->config);
    }
}
