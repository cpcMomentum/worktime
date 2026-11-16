<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\License;

use OCA\WorkTime\License\WerkPlusApiException;
use OCA\WorkTime\License\WerkPlusClient;
use OCP\Http\Client\IClient;
use OCP\Http\Client\IClientService;
use OCP\Http\Client\IResponse;
use PHPUnit\Framework\TestCase;

class WerkPlusClientTest extends TestCase {

    private function client(int $status, string $body, ?array &$captured = null): WerkPlusClient {
        $response = $this->createMock(IResponse::class);
        $response->method('getStatusCode')->willReturn($status);
        $response->method('getBody')->willReturn($body);
        $http = $this->createMock(IClient::class);
        $http->method('post')->willReturnCallback(function (string $uri, array $options) use ($response, &$captured): IResponse {
            $captured = ['uri' => $uri, 'options' => $options];
            return $response;
        });
        $service = $this->createMock(IClientService::class);
        $service->method('newClient')->willReturn($http);
        return new WerkPlusClient($service);
    }

    private function call(WerkPlusClient $client): array {
        return $client->validate('wp_KEY', 'uuid', ['rechnungswerk' => '0.7.0']);
    }

    public function testSendsOnlyTheThreeContractFieldsWithoutSizeClass(): void {
        $captured = null;
        $result = $this->call($this->client(200, '{"token":"a.b.c","expiresAt":"e","graceUntil":"g"}', $captured));

        $this->assertSame('https://api.werkwolke.de/validate', $captured['uri']);
        $this->assertSame([
            'key' => 'wp_KEY',
            'instanceUuid' => 'uuid',
            'appVersions' => ['rechnungswerk' => '0.7.0'],
        ], $captured['options']['json']);
        $this->assertFalse($captured['options']['http_errors']);
        $this->assertSame(['token' => 'a.b.c', 'expiresAt' => 'e', 'graceUntil' => 'g'], $result);
    }

    public function testTrialSendsTheContractFieldsWithoutKeyAndReturnsTheKey(): void {
        $captured = null;
        $client = $this->client(200, '{"key":"wp_NEU","token":"a.b.c","expiresAt":"e","graceUntil":"g"}', $captured);
        $result = $client->trial('uuid', ['rechnungswerk' => '0.7.0']);

        $this->assertSame('https://api.werkwolke.de/trial', $captured['uri']);
        $this->assertSame([
            'instanceUuid' => 'uuid',
            'appVersions' => ['rechnungswerk' => '0.7.0'],
        ], $captured['options']['json']);
        $this->assertSame(['key' => 'wp_NEU', 'token' => 'a.b.c', 'expiresAt' => 'e', 'graceUntil' => 'g'], $result);
    }

    public function testTrialWithoutKeyInTheAnswerIsInvalid(): void {
        foreach (['{"token":"a.b.c","expiresAt":"e","graceUntil":"g"}', '{"key":"","token":"a.b.c","expiresAt":"e","graceUntil":"g"}'] as $body) {
            try {
                $this->client(200, $body)->trial('uuid', []);
                $this->fail('Ausnahme erwartet fuer ' . $body);
            } catch (WerkPlusApiException $e) {
                $this->assertSame(WerkPlusClient::INVALID_RESPONSE, $e->getErrorCode());
            }
        }
    }

    public function testTrialKeySurvivesBrokenTokenFields(): void {
        $result = $this->client(200, '{"key":"wp_NEU","token":"a.b.c","graceUntil":"g"}')->trial('uuid', []);

        $this->assertSame('wp_NEU', $result['key']);
        $this->assertSame('', $result['token']);
    }

    public function testTrialAlreadyUsedIsPassedThrough(): void {
        try {
            $this->client(409, '{"error":{"code":"TRIAL_ALREADY_USED","message":"schon genutzt"}}')->trial('uuid', []);
            $this->fail('Ausnahme erwartet');
        } catch (WerkPlusApiException $e) {
            $this->assertSame('TRIAL_ALREADY_USED', $e->getErrorCode());
        }
    }

    public function testContractErrorCodeIsPassedThroughWithItsMessage(): void {
        try {
            $this->call($this->client(403, '{"error":{"code":"KEY_REVOKED","message":"gesperrt"}}'));
            $this->fail('Ausnahme erwartet');
        } catch (WerkPlusApiException $e) {
            $this->assertSame('KEY_REVOKED', $e->getErrorCode());
            $this->assertSame('gesperrt', $e->getServerMessage());
        }
    }

    /**
     * @return array<string, array{int, string, string}>
     */
    public static function failures(): array {
        return [
            'unbekannter Code' => [409, '{"error":{"code":"SOMETHING_NEW","message":"x"}}', 'SERVER_ERROR'],
            'kein JSON' => [502, '<html>Bad Gateway</html>', 'SERVER_ERROR'],
            'Code steht nur im Text' => [403, '{"error":{"message":"KEY_REVOKED"}}', 'SERVER_ERROR'],
            '200 ohne Token' => [200, '{"expiresAt":"e","graceUntil":"g"}', WerkPlusClient::INVALID_RESPONSE],
            '200 kein JSON' => [200, 'ok', WerkPlusClient::INVALID_RESPONSE],
        ];
    }

    #[\PHPUnit\Framework\Attributes\DataProvider('failures')]
    public function testFailuresMapToStableCodes(int $status, string $body, string $expected): void {
        try {
            $this->call($this->client($status, $body));
            $this->fail('Ausnahme erwartet');
        } catch (WerkPlusApiException $e) {
            $this->assertSame($expected, $e->getErrorCode());
        }
    }

    public function testNetworkFailureIsUnreachable(): void {
        $http = $this->createMock(IClient::class);
        $http->method('post')->willThrowException(new \RuntimeException('cURL error 6'));
        $service = $this->createMock(IClientService::class);
        $service->method('newClient')->willReturn($http);

        try {
            $this->call(new WerkPlusClient($service));
            $this->fail('Ausnahme erwartet');
        } catch (WerkPlusApiException $e) {
            $this->assertSame(WerkPlusClient::UNREACHABLE, $e->getErrorCode());
        }
    }

    public function testUnreachableServerKeepsTheKeyOutOfTheExceptionChain(): void {
        $key = 'wp_GEHEIMERTESTSCHLUESSEL1234';
        $http = $this->createMock(IClient::class);
        $http->method('post')->willReturnCallback(function (): never {
            throw new \RuntimeException('cURL error 7: Failed to connect');
        });
        $service = $this->createMock(IClientService::class);
        $service->method('newClient')->willReturn($http);
        try {
            (new WerkPlusClient($service))->validate($key, '8cb3c100-9e4c-5375-9e63-1f4d122ea315', ['worktime' => '0.25.0']);
            $this->fail('Ausnahme erwartet');
        } catch (WerkPlusApiException $e) {
            $this->assertSame(WerkPlusClient::UNREACHABLE, $e->getErrorCode());
            $messages = '';
            $args = [];
            for ($t = $e; $t !== null; $t = $t->getPrevious()) {
                $messages .= $t->getMessage();
                foreach ($t->getTrace() as $frame) {
                    $frameArgs = $frame['args'] ?? [];
                    array_walk_recursive($frameArgs, function ($value) use (&$args): void {
                        $args[] = is_string($value) ? $value : get_debug_type($value);
                    });
                }
            }
            $this->assertStringContainsString('Failed to connect', $messages);
            $this->assertNotEmpty($args, 'Trace ohne Argumente: zend.exception_ignore_args ist an, der Test prueft nichts');
            $this->assertNotContains($key, $args);
        }
    }
}
