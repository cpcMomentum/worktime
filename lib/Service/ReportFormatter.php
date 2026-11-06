<?php

/**
 * SPDX-FileCopyrightText: 2026 Axel Deffner <axel@cpcmomentum.com>
 * SPDX-License-Identifier: AGPL-3.0-or-later
 */

declare(strict_types=1);

namespace OCA\WorkTime\Service;

use DateTimeInterface;
use OCP\IL10N;

/** Report dates and numbers in the IL10N's locale; without intl the former German formats. */
class ReportFormatter {

    private string $locale;
    private string $language;
    private bool $intl;

    public function __construct(
        private IL10N $l,
    ) {
        $this->language = $l->getLanguageCode();
        $this->locale = $l->getLocaleCode() ?: $this->language;
        $this->intl = class_exists(\IntlDateFormatter::class) && class_exists(\NumberFormatter::class);
    }

    public function l10n(): IL10N {
        return $this->l;
    }

    /** Full date, e.g. "02.11.2026" / "Nov 2, 2026". */
    public function date(DateTimeInterface $date): string {
        return $this->pattern($date, null, 'd.m.Y');
    }

    /** Day and month without the year, e.g. "2.11." / "11/2". */
    public function dayMonth(DateTimeInterface $date): string {
        $pattern = null;
        if ($this->intl && class_exists(\IntlDatePatternGenerator::class)) {
            $pattern = (new \IntlDatePatternGenerator($this->locale))->getBestPattern('dM') ?: null;
        }
        return $pattern === null ? $date->format('d.m.') : $this->pattern($date, $pattern, 'd.m.');
    }

    /** Abbreviated weekday, e.g. "Mo." / "Mon". */
    public function weekday(DateTimeInterface $date): string {
        if (!$this->intl) {
            return ['', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'][(int)$date->format('N')];
        }
        return $this->pattern($date, 'EEE', 'D', $this->language);
    }

    /** Standalone month name with year, e.g. "März 2026" / "March 2026". */
    public function monthYear(int $year, int $month): string {
        $date = new \DateTimeImmutable(sprintf('%04d-%02d-01', $year, $month));
        if (!$this->intl) {
            return sprintf('%02d/%04d', $month, $year);
        }
        return $this->pattern($date, 'LLLL yyyy', 'm/Y', $this->language);
    }

    /** Date plus 24-hour time, e.g. "02.11.2026 14:05 Uhr" / "Nov 2, 2026 14:05". */
    public function dateTime(DateTimeInterface $date): string {
        return $this->l->t('%1$s %2$s Uhr', [$this->date($date), $date->format('H:i')]);
    }

    /** Number with the locale's separators and a fixed number of decimals. */
    public function number(float $value, int $decimals, bool $grouping = true): string {
        if ($this->intl) {
            $formatter = new \NumberFormatter($this->locale, \NumberFormatter::DECIMAL);
            $formatter->setAttribute(\NumberFormatter::GROUPING_USED, $grouping ? 1 : 0);
            $formatter->setAttribute(\NumberFormatter::MIN_FRACTION_DIGITS, $decimals);
            $formatter->setAttribute(\NumberFormatter::MAX_FRACTION_DIGITS, $decimals);
            $formatted = $formatter->format($value);
            if ($formatted !== false) {
                return $formatted;
            }
        }
        return number_format($value, $decimals, ',', $grouping ? '.' : '');
    }

    /** "7:30 Std." / "7:30 h". */
    public function hours(int $minutes): string {
        return $this->l->t('%s Std.', [sprintf('%d:%02d', intdiv(abs($minutes), 60), abs($minutes) % 60)]);
    }

    /** Words (month, weekday) follow the report language, numeric formats the user's locale. */
    private function pattern(DateTimeInterface $date, ?string $pattern, string $fallback, ?string $locale = null): string {
        if ($this->intl) {
            $locale ??= $this->locale;
            $formatter = $pattern === null
                ? new \IntlDateFormatter($locale, \IntlDateFormatter::MEDIUM, \IntlDateFormatter::NONE, $date->getTimezone())
                : new \IntlDateFormatter($locale, \IntlDateFormatter::NONE, \IntlDateFormatter::NONE, $date->getTimezone(), null, $pattern);
            $formatted = $formatter->format($date);
            if ($formatted !== false) {
                return $formatted;
            }
        }
        return $date->format($fallback);
    }
}
