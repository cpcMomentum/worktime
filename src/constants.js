/**
 * WorkTime Application Constants
 *
 * Zentrale Konstanten-Definitionen für die gesamte Frontend-Anwendung.
 * Diese Konstanten spiegeln die Backend-Konstanten wider und sorgen
 * für Konsistenz zwischen Frontend und Backend.
 */

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
 * Status Labels (German)
 * Für die Anzeige in der UI
 */
export const STATUS_LABELS = {
    // Time Entry Status
    [ENTRY_STATUS.DRAFT]: 'Entwurf',
    [ENTRY_STATUS.SUBMITTED]: 'Eingereicht',
    [ENTRY_STATUS.APPROVED]: 'Genehmigt',
    [ENTRY_STATUS.REJECTED]: 'Abgelehnt',
    // Absence Status (same values but different semantics)
    [ABSENCE_STATUS.PENDING]: 'Ausstehend',
    [ABSENCE_STATUS.CANCELLED]: 'Storniert',
}

/**
 * Absence Type Labels (German)
 */
export const ABSENCE_TYPE_LABELS = {
    [ABSENCE_TYPES.VACATION]: 'Urlaub',
    [ABSENCE_TYPES.SICK]: 'Krankheit',
    [ABSENCE_TYPES.CHILD_SICK]: 'Kind krank',
    [ABSENCE_TYPES.SPECIAL]: 'Sonderurlaub',
    [ABSENCE_TYPES.TRAINING]: 'Weiterbildung',
    [ABSENCE_TYPES.COMPENSATORY]: 'Freizeitausgleich',
    [ABSENCE_TYPES.UNPAID]: 'Unbezahlter Urlaub',
}

/**
 * Federal States (German Bundesländer)
 * Entspricht Employee::FEDERAL_STATES in PHP
 */
export const FEDERAL_STATES = {
    BW: 'Baden-Württemberg',
    BY: 'Bayern',
    BE: 'Berlin',
    BB: 'Brandenburg',
    HB: 'Bremen',
    HH: 'Hamburg',
    HE: 'Hessen',
    MV: 'Mecklenburg-Vorpommern',
    NI: 'Niedersachsen',
    NW: 'Nordrhein-Westfalen',
    RP: 'Rheinland-Pfalz',
    SL: 'Saarland',
    SN: 'Sachsen',
    ST: 'Sachsen-Anhalt',
    SH: 'Schleswig-Holstein',
    TH: 'Thüringen',
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
