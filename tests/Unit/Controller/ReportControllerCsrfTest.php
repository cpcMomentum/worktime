<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\ReportController;
use OCP\AppFramework\Http\Attribute\NoCSRFRequired;
use PHPUnit\Framework\TestCase;
use ReflectionClass;
use ReflectionMethod;

/**
 * Prevention for #620: every file-download endpoint is opened via
 * window.open() in the frontend — a direct browser navigation that carries no
 * Nextcloud requesttoken — so each must be exempt from the CSRF check or NC
 * rejects it ("CSRF check failed"). pdfRange() shipped without the attribute
 * while its siblings had it; this test locks the attribute onto every download
 * method so the omission cannot recur.
 */
class ReportControllerCsrfTest extends TestCase {

	public function testEveryDownloadEndpointIsCsrfExempt(): void {
		$class = new ReflectionClass(ReportController::class);
		$checked = [];
		foreach ($class->getMethods(ReflectionMethod::IS_PUBLIC) as $method) {
			if ($method->getDeclaringClass()->getName() !== ReportController::class) {
				continue;
			}
			// A method that can return a DataDownloadResponse is a file download.
			if (!str_contains((string)$method->getReturnType(), 'DataDownloadResponse')) {
				continue;
			}
			$checked[] = $method->getName();
			$this->assertNotEmpty(
				$method->getAttributes(NoCSRFRequired::class),
				sprintf(
					'%s() returns a file download opened via window.open() and must carry #[NoCSRFRequired] (#620).',
					$method->getName(),
				),
			);
		}

		// Guard against the reflection silently matching nothing and passing vacuously.
		$this->assertGreaterThanOrEqual(
			4,
			count($checked),
			'Expected at least the four known download endpoints (pdf, pdfRange, projectsPdf, projectsCsv); found: ' . implode(', ', $checked),
		);
	}
}
