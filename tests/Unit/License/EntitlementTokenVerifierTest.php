<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\Tests\Unit\License;

use OCA\WorkTime\License\InvalidTokenException;
use OCA\WorkTime\License\EntitlementToken;
use OCA\WorkTime\License\EntitlementTokenVerifier;
use PHPUnit\Framework\Attributes\DataProvider;
use PHPUnit\Framework\TestCase;

// Die Pflichtpruefungen aus entitlement-v1, Abschnitte 3 bis 5.
class EntitlementTokenVerifierTest extends TestCase {
    use EntitlementTokenFactory;
    use TraceStrings;

    public function testARejectedTokenNeverAppearsInTheTrace(): void {
        $parts = explode('.', $this->token($this->claims(), [], self::foreignKey()['private']));
        foreach ([implode('.', $parts), $parts[0] . '.!!.' . $parts[2], $parts[0] . '.' . $parts[1]] as $jwt) {
            try {
                $this->verifier()->verify($jwt, self::UUID, self::NOW);
                $this->fail('Ausnahme erwartet');
            } catch (InvalidTokenException $e) {
                foreach ($parts as $part) {
                    self::assertNotInTrace($part, $e);
                }
            }
        }
    }

    public function testLicensedEmployeesIsReadWhenItIsAPositiveNumber(): void {
        $read = fn (mixed $value) => $this->verifier()->verify($this->token($this->claims(['licensedEmployees' => $value])), self::UUID, self::NOW)->licensedEmployees;

        $this->assertSame(12, $read(12));
        $this->assertNull($read(0));
        $this->assertNull($read('12'));
        $this->assertNull($read(12.5));
        $this->assertSame(12, $read(12.0));
    }

    public function testValidTokenYieldsTierAndFeatures(): void {
        $token = $this->verifier()->verify($this->token($this->claims()), self::UUID, self::NOW);

        $this->assertSame('werkplus', $token->tier);
        $this->assertSame(['wt_mobile', 'api_keys', 'pw_multi_board'], $token->features);
        $this->assertSame(EntitlementToken::STATE_VALID, $token->stateAt(self::NOW));
        $this->assertNull($token->licensedEmployees);
    }

    public function testSubIsComparedIgnoringCase(): void {
        $upperOwn = strtoupper(self::UUID);
        $token = $this->verifier()->verify($this->token($this->claims()), $upperOwn, self::NOW);
        $this->assertSame('werkplus', $token->tier);

        $upperSub = $this->token($this->claims(['sub' => strtoupper(self::UUID)]));
        $this->assertSame('werkplus', $this->verifier()->verify($upperSub, self::UUID, self::NOW)->tier);
    }

    public function testExpiryIsAStateNotAnException(): void {
        $verifier = $this->verifier();
        $jwt = $this->token($this->claims());

        $inGrace = $verifier->verify($jwt, self::UUID, self::NOW + 31 * 86400);
        $this->assertSame(EntitlementToken::STATE_GRACE, $inGrace->stateAt(self::NOW + 31 * 86400));

        $afterGrace = $verifier->verify($jwt, self::UUID, self::NOW + 45 * 86400);
        $this->assertSame(EntitlementToken::STATE_EXPIRED, $afterGrace->stateAt(self::NOW + 45 * 86400));
    }

    public function testGraceBeforeExpIsRaisedToExp(): void {
        $jwt = $this->token($this->claims(['graceUntil' => self::NOW + 86400]));
        $token = $this->verifier()->verify($jwt, self::UUID, self::NOW);

        $this->assertSame($token->expiresAt, $token->graceUntil);
        $this->assertSame(EntitlementToken::STATE_VALID, $token->stateAt(self::NOW + 2 * 86400));
    }

    public function testAudienceMayBeAList(): void {
        $jwt = $this->token($this->claims(['aud' => ['other', 'werkplus']]));
        $this->assertSame('werkplus', $this->verifier()->verify($jwt, self::UUID, self::NOW)->tier);
    }

    public function testSmallClockSkewOnNbfIsTolerated(): void {
        $jwt = $this->token($this->claims(['nbf' => self::NOW + 30]));
        $this->assertSame('werkplus', $this->verifier()->verify($jwt, self::UUID, self::NOW)->tier);
    }

    public function testBakedInListIsEmptyAndRejectsEveryToken(): void {
        $this->expectException(InvalidTokenException::class);
        (new EntitlementTokenVerifier())->verify($this->token($this->claims()), self::UUID, self::NOW);
    }

    /**
     * @return array<string, array{0: \Closure(self): string, 1?: string}>
     */
    public static function rejectedTokens(): array {
        return [
            'fremde Installation' => [fn (self $t) => $t->token($t->claims(['sub' => '00000000-0000-4000-8000-000000000000']))],
            'eigene UUID leer' => [fn (self $t) => $t->token($t->claims()), ''],
            'unbekannte kid' => [fn (self $t) => $t->token($t->claims(), ['kid' => 'other-kid'])],
            'kid fehlt' => [fn (self $t) => $t->token($t->claims(), ['kid' => null])],
            'kid als Liste' => [fn (self $t) => $t->token($t->claims(), ['kid' => [self::TEST_KID]])],
            'kid als Pfad' => [fn (self $t) => $t->token($t->claims(), ['kid' => '../../config/config.php'])],
            'fremder Schluessel, gleiche kid' => [fn (self $t) => $t->token($t->claims(), [], self::foreignKey()['private'])],
            'alg none ohne Signatur' => [fn (self $t) => self::b64('{"alg":"none","typ":"JWT","kid":"test-kid"}') . '.' . self::b64((string)json_encode($t->claims())) . '.'],
            'alg none mit Fuellsignatur' => [fn (self $t) => self::b64('{"alg":"none","typ":"JWT","kid":"test-kid"}') . '.' . self::b64((string)json_encode($t->claims())) . '.AA'],
            'HS256 mit Public Key als Geheimnis' => [fn (self $t) => $t->hs256Token()],
            'Nutzlast nachtraeglich veraendert' => [fn (self $t) => $t->tamperedToken()],
            'falscher Aussteller' => [fn (self $t) => $t->token($t->claims(['iss' => 'https://staging.werkwolke.de']))],
            'falsche Zielgruppe' => [fn (self $t) => $t->token($t->claims(['aud' => 'andere-app']))],
            'Zielgruppe fehlt' => [fn (self $t) => $t->token($t->claims(['aud' => null]))],
            'noch nicht gueltig' => [fn (self $t) => $t->token($t->claims(['nbf' => self::NOW + 3600]))],
            'graceUntil fehlt' => [fn (self $t) => $t->token($t->claims(['graceUntil' => null]))],
            'exp als Text' => [fn (self $t) => $t->token($t->claims(['exp' => (string)(self::NOW + 86400)]))],
            'unbekannter Tarif' => [fn (self $t) => $t->token($t->claims(['tier' => 'enterprise']))],
            'Zahl in features' => [fn (self $t) => $t->token($t->claims(['features' => ['wt_mobile', 5]]))],
            'features als Objekt' => [fn (self $t) => $t->token($t->claims(['features' => ['wt_mobile' => true]]))],
            'nur zwei Teile' => [fn (self $t) => 'abc.def'],
            'kein base64url' => [fn (self $t) => 'a+b.c/d.e=f'],
        ];
    }

    /**
     * @param \Closure(self): string $build
     */
    #[DataProvider('rejectedTokens')]
    public function testRejects(\Closure $build, string $ownUuid = self::UUID): void {
        $this->expectException(InvalidTokenException::class);
        $this->verifier()->verify($build($this), $ownUuid, self::NOW);
    }

    private function hs256Token(): string {
        $input = self::b64('{"alg":"HS256","typ":"JWT","kid":"test-kid"}') . '.' . self::b64((string)json_encode($this->claims()));
        return $input . '.' . self::b64(hash_hmac('sha256', $input, self::testKey()['public'], true));
    }

    private function tamperedToken(): string {
        [$header, , $signature] = explode('.', $this->token($this->claims(['tier' => 'free', 'features' => []])));
        return $header . '.' . self::b64((string)json_encode($this->claims())) . '.' . $signature;
    }
}
