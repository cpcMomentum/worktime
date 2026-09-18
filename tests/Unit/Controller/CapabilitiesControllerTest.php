<?php

declare(strict_types=1);

namespace OCA\WorkTime\Tests\Unit\Controller;

use OCA\WorkTime\Controller\CapabilitiesController;
use OCP\App\IAppManager;
use OCP\IRequest;
use PHPUnit\Framework\TestCase;

/**
 * Covers the version/feature probe (#714): auth guard, version source and the
 * advertised feature keys.
 */
class CapabilitiesControllerTest extends TestCase {

    private IAppManager $appManager;

    private function makeController(?string $userId = 'alice'): CapabilitiesController {
        return new CapabilitiesController(
            $this->createMock(IRequest::class),
            $userId,
            $this->appManager,
        );
    }

    protected function setUp(): void {
        $this->appManager = $this->createMock(IAppManager::class);
    }

    public function testUnauthenticatedIsRejected(): void {
        $controller = $this->makeController(userId: null);
        $this->assertSame(401, $controller->index()->getStatus());
    }

    public function testReportsVersionAndFeatures(): void {
        $this->appManager->method('getAppVersion')->with('worktime')->willReturn('1.2.3');

        $response = $this->makeController()->index();
        $this->assertSame(200, $response->getStatus());

        $data = $response->getData();
        $this->assertSame('1.2.3', $data['version']);
        $this->assertIsArray($data['features']);
        // The features named in the issue motivation must be advertised.
        $this->assertContains('personal_break', $data['features']);
        $this->assertContains('project_favorites', $data['features']);
        $this->assertContains('stopwatch', $data['features']);
        // No feature must be advertised that does not exist in the backend.
        $this->assertNotContains('datev_export', $data['features']);
    }
}
