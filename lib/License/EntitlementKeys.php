<?php

declare(strict_types=1);

/**
 * SPDX-FileCopyrightText: 2026 cpcMomentum
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

namespace OCA\WorkTime\License;

// Fest im Code statt per Abruf, damit die Tokenpruefung nie ins Netz geht.
final class EntitlementKeys {

    // Rotation: neuen Schluessel ergaenzen und ausliefern, den alten erst in einem spaeteren Release entfernen.
    /** @var array<string, string> kid => PEM */
    public const PUBLIC_KEYS = [
        // Produktiv seit 11.10.2026, Quelle: werkplus-backend docs/contracts/entitlement-v1-keys/
        '7WBuRbqysQOJFkKSkhBjOmh30VZ1q_iTMunZu29Lnek' => <<<'PEM'
            -----BEGIN PUBLIC KEY-----
            MIICIjANBgkqhkiG9w0BAQEFAAOCAg8AMIICCgKCAgEA1wUp3aZL+Fum8PAL8C0P
            2Mfxp9biKfCH6ZmAkoeds6dVg+Et1U2jt/ENDAbheUfjYgqL4T36dsJAqZU81ORQ
            NoDzxhuBRspTnAvrk/KhwhERN0OWw/HZTLPQ03bKyOMXa7mgQG6370BI2pFFc8tk
            pv4ZLLzHwa0hmXYhTQdnCoEg7XAgxvVYRklSNlpoZUcPj+glPBRlP3e3u9WBmPNh
            mbRXsbw/GaRu5kadGnKN2mLnH+exckVQ0tA1wDhLYH5gI7aX1jayFTRyuBpLqxNF
            UHr5NRwkpayc9wxE0xof52oydjht6HjVnF3rabmkJDc80XJCPieoi3T+hc4tcxXv
            Zdjoc/oNtcOCglYKDzNTWcXupzDC1QA0thR8RiBprb0TzMjlqXMmwQeF0hbuRIzg
            THPstIXGWtKXSF3FjEzqu2pzbwa/GqMqWAmdDk0oax45BYBi+Mc5szGoC6I1mzT7
            1+umcMH5zJzUfaQQmdi63d2iaDnQr+hQlLTCGor/g7QHW+tWZn1Ypl0cT+FfFIjr
            4S+J6HH1wFq5nxWDQcPDj7UIqSsCQpTku/7PqLVxfxY21ONm6fkbhUvJAbRLX/Lf
            VyGgGH+jt8T8yqknym/kkJdMntneI8rOim1F56S1OCaRWvufoi3P2W1UYf6lyPxl
            I+s6eZhxMrAe6d4wTNzRZ0MCAwEAAQ==
            -----END PUBLIC KEY-----
            PEM,
    ];
}
