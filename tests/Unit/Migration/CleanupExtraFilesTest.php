<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Migration;

use OCA\WorkTime\Migration\CleanupExtraFiles;
use OCP\App\IAppManager;
use OCP\Migration\IOutput;
use PHPUnit\Framework\TestCase;

class CleanupExtraFilesTest extends TestCase {

	private string $appPath;

	protected function setUp(): void {
		$this->appPath = sys_get_temp_dir() . '/wt-cleanup-' . bin2hex(random_bytes(6));
		mkdir($this->appPath . '/js', 0777, true);
		mkdir($this->appPath . '/appinfo', 0777, true);
	}

	protected function tearDown(): void {
		foreach (['js', 'appinfo'] as $dir) {
			foreach (glob($this->appPath . '/' . $dir . '/*') ?: [] as $file) {
				unlink($file);
			}
			rmdir($this->appPath . '/' . $dir);
		}
		rmdir($this->appPath);
	}

	private function writeJs(string ...$names): void {
		foreach ($names as $name) {
			file_put_contents($this->appPath . '/js/' . $name, '// ' . $name);
		}
	}

	private function writeSignature(string ...$signedJs): void {
		$hashes = ['lib/AppInfo/Application.php' => 'x'];
		foreach ($signedJs as $name) {
			$file = $this->appPath . '/js/' . $name;
			$hashes['js/' . $name] = is_file($file) ? hash_file('sha512', $file) : 'x';
		}
		file_put_contents($this->appPath . '/appinfo/signature.json', json_encode(['hashes' => $hashes]));
	}

	private function run_(): void {
		$appManager = $this->createMock(IAppManager::class);
		$appManager->method('getAppPath')->with('worktime')->willReturn($this->appPath);
		(new CleanupExtraFiles($appManager))->run($this->createMock(IOutput::class));
	}

	/** @return list<string> */
	private function jsFiles(): array {
		$files = array_map('basename', glob($this->appPath . '/js/*') ?: []);
		sort($files);
		return $files;
	}

	public function testRemovesBundlesOfThePreviousBuild(): void {
		$this->writeJs(
			'worktime-main.mjs',
			'NcSelect-abc123.chunk.mjs',
			'worktime-main.js',
			'worktime-main.js.map',
			'worktime-5552986b7cd3bd00e16d.js',
			'NcSelect-old999.chunk.mjs',
		);
		$this->writeSignature('worktime-main.mjs', 'NcSelect-abc123.chunk.mjs');

		$this->run_();

		$this->assertSame(['NcSelect-abc123.chunk.mjs', 'worktime-main.mjs'], $this->jsFiles());
	}

	public function testLeavesJsAloneWhenSignatureBelongsToAnotherBuild(): void {
		$this->writeJs('worktime-main.mjs', 'NcSelect-abc123.chunk.mjs');
		$this->writeSignature('worktime-main.js');

		$this->run_();

		$this->assertSame(['NcSelect-abc123.chunk.mjs', 'worktime-main.mjs'], $this->jsFiles());
	}

	public function testLeavesJsAloneWhenSignatureIsFromAnotherViteBuild(): void {
		$this->writeJs('worktime-main.mjs', 'NcSelect-old999.chunk.mjs');
		$this->writeSignature('worktime-main.mjs', 'NcSelect-old999.chunk.mjs');
		file_put_contents($this->appPath . '/js/worktime-main.mjs', '// newer build');
		unlink($this->appPath . '/js/NcSelect-old999.chunk.mjs');
		$this->writeJs('NcSelect-new111.chunk.mjs');

		$this->run_();

		$this->assertSame(['NcSelect-new111.chunk.mjs', 'worktime-main.mjs'], $this->jsFiles());
	}

	public function testLeavesJsAloneWithoutSignature(): void {
		$this->writeJs('worktime-main.mjs', 'worktime-main.js');

		$this->run_();

		$this->assertSame(['worktime-main.js', 'worktime-main.mjs'], $this->jsFiles());
	}
}
