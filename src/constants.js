/**
 * WorkTime Application Constants
 *
 * Zentrale Konstanten-Definitionen für die gesamte Frontend-Anwendung.
 * Diese Konstanten spiegeln die Backend-Konstanten wider und sorgen
 * für Konsistenz zwischen Frontend und Backend.
 */

import { translate as t } from '@nextcloud/l10n'

/**
 * Time Entry Status Values
 * Entspricht TimeEntry::STATUS_* in PHP
 */
export const ENTRY_STATUS = {
    DRAFT: 'draft',
    SUBMITTED: 'submitted',
    APPROVED: 'approved',
    REJECTED: 'rejected',
}

/**
 * Absence Type Values
 * Entspricht Absence::TYPE_* in PHP
 */
export const ABSENCE_TYPES = {
    VACATION: 'vacation',
    SICK: 'sick',
    CHILD_SICK: 'child_sick',
    SPECIAL: 'special',
    TRAINING: 'training',
    COMPENSATORY: 'compensatory',
    UNPAID: 'unpaid',
    // #15 Stufe 2: nur zentral über Betriebsferien setzbar, nicht beantragbar
    COMPANY_CLOSURE: 'company_closure',
}

/**
 * Absence Status Values
 * Entspricht Absence::STATUS_* in PHP
 */
export const ABSENCE_STATUS = {
    PENDING: 'pending',
    APPROVED: 'approved',
    REJECTED: 'rejected',
    CANCELLED: 'cancelled',
}

/**
 * Status Labels (translated)
 * Returns translated labels — must be a function because t() resolves at runtime
 * @returns {Object}
 */
export function STATUS_LABELS() {
    return {
        // Time Entry Status
        [ENTRY_STATUS.DRAFT]: t('worktime', 'Entwurf'),
        [ENTRY_STATUS.SUBMITTED]: t('worktime', 'Eingereicht'),
        [ENTRY_STATUS.APPROVED]: t('worktime', 'Genehmigt'),
        [ENTRY_STATUS.REJECTED]: t('worktime', 'Abgelehnt'),
        // Absence Status (same values but different semantics)
        [ABSENCE_STATUS.PENDING]: t('worktime', 'Ausstehend'),
        [ABSENCE_STATUS.CANCELLED]: t('worktime', 'Storniert'),
    }
}

/**
 * Absence Type Labels (translated)
 * @returns {Object}
 */
export function ABSENCE_TYPE_LABELS() {
    return {
        [ABSENCE_TYPES.VACATION]: t('worktime', 'Urlaub'),
        [ABSENCE_TYPES.SICK]: t('worktime', 'Krankheit'),
        [ABSENCE_TYPES.CHILD_SICK]: t('worktime', 'Kind krank'),
        [ABSENCE_TYPES.SPECIAL]: t('worktime', 'Sonderurlaub'),
        [ABSENCE_TYPES.TRAINING]: t('worktime', 'Fortbildung'),
        [ABSENCE_TYPES.COMPENSATORY]: t('worktime', 'Freizeitausgleich'),
        [ABSENCE_TYPES.UNPAID]: t('worktime', 'Unbezahlter Urlaub'),
        [ABSENCE_TYPES.COMPANY_CLOSURE]: t('worktime', 'Betriebsschließung'),
    }
}

/**
 * Federal States (German Bundesländer, translated)
 * Entspricht Employee::FEDERAL_STATES in PHP
 * @returns {Object}
 */
export function FEDERAL_STATES() {
    return {
        BW: t('worktime', 'Baden-Württemberg'),
        BY: t('worktime', 'Bayern'),
        BE: t('worktime', 'Berlin'),
        BB: t('worktime', 'Brandenburg'),
        HB: t('worktime', 'Bremen'),
        HH: t('worktime', 'Hamburg'),
        HE: t('worktime', 'Hessen'),
        MV: t('worktime', 'Mecklenburg-Vorpommern'),
        NI: t('worktime', 'Niedersachsen'),
        NW: t('worktime', 'Nordrhein-Westfalen'),
        RP: t('worktime', 'Rheinland-Pfalz'),
        SL: t('worktime', 'Saarland'),
        SN: t('worktime', 'Sachsen'),
        ST: t('worktime', 'Sachsen-Anhalt'),
        SH: t('worktime', 'Schleswig-Holstein'),
        TH: t('worktime', 'Thüringen'),
    }
}

/**
 * Default Values
 */
export const DEFAULTS = {
    WEEKLY_HOURS: 40.0,
    VACATION_DAYS: 30,
    FEDERAL_STATE: 'BY',
    BREAK_MINUTES_6H: 30,
    BREAK_MINUTES_9H: 45,
    MAX_DAILY_HOURS: 10,
}

export default {
    ENTRY_STATUS,
    ABSENCE_TYPES,
    ABSENCE_STATUS,
    STATUS_LABELS,
    ABSENCE_TYPE_LABELS,
    FEDERAL_STATES,
    DEFAULTS,
}
