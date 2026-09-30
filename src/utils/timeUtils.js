import { translate as t } from '@nextcloud/l10n'
import { getLocale } from './dateUtils.js'

/**
 * Format minutes to hours:minutes string
 * @param {number} minutes
 * @returns {string}
 */
export function formatMinutes(minutes) {
    if (minutes === null || minutes === undefined) return '0:00'
    const sign = minutes < 0 ? '-' : ''
    const absMinutes = Math.abs(minutes)
    const hours = Math.floor(absMinutes / 60)
    const mins = absMinutes % 60
    return `${sign}${hours}:${mins.toString().padStart(2, '0')}`
}

/**
 * Format minutes to hours string with unit
 * @param {number} minutes
 * @returns {string}
 */
export function formatMinutesWithUnit(minutes) {
    return `${formatMinutes(minutes)} ${t('worktime', 'Std.')}`
}

/**
 * Format hours as decimal
 * @param {number} minutes
 * @returns {string}
 */
export function formatHoursDecimal(minutes) {
    if (minutes === null || minutes === undefined) return '0,00'
    const hours = minutes / 60
    return hours.toLocaleString(getLocale(), { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

/**
 * Parse time string (HH:MM) to minutes since midnight
 * @param {string} timeStr
 * @returns {number}
 */
export function parseTime(timeStr) {
    if (!timeStr) return 0
    const [hours, minutes] = timeStr.split(':').map(Number)
    return hours * 60 + minutes
}

/**
 * Format minutes since midnight to time string (HH:MM)
 * @param {number} minutes
 * @returns {string}
 */
export function minutesToTime(minutes) {
    if (minutes === null || minutes === undefined) return '00:00'
    const hours = Math.floor(minutes / 60) % 24
    const mins = minutes % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}`
}

/**
 * Calculate work minutes from start/end time and break
 * @param {string} startTime (HH:MM)
 * @param {string} endTime (HH:MM)
 * @param {number} breakMinutes
 * @returns {number}
 */
export function calculateWorkMinutes(startTime, endTime, breakMinutes = 0) {
    const startMinutes = parseTime(startTime)
    let endMinutes = parseTime(endTime)

    // Handle overnight shifts
    if (endMinutes < startMinutes) {
        endMinutes += 24 * 60
    }

    return Math.max(0, endMinutes - startMinutes - breakMinutes)
}

/**
 * Calculate gross minutes from start/end time
 * @param {string} startTime (HH:MM)
 * @param {string} endTime (HH:MM)
 * @returns {number}
 */
export function calculateGrossMinutes(startTime, endTime) {
    const startMinutes = parseTime(startTime)
    let endMinutes = parseTime(endTime)

    // Handle overnight shifts
    if (endMinutes < startMinutes) {
        endMinutes += 24 * 60
    }

    return endMinutes - startMinutes
}

/**
 * Minimum legally required break (§4 ArbZG) for a given gross attendance span.
 *
 * §4 ArbZG knüpft die Schwellen an die ARBEITSZEIT (netto, ohne Pause) an
 * (§2 Abs. 1 ArbZG). Da die Pause selbst von der Arbeitszeit abhängt, wird die
 * kleinste gesetzlich ausreichende Pause bestimmt — äquivalent: die Brutto-
 * Schwellen liegen bei 6 h und (9 h + Pause-ab-6h). Beispiel: 9 h 01 Anwesenheit
 * mit 30 min Pause = 8 h 31 Arbeitszeit ≤ 9 h → 30 min genügen (nicht 45). #403
 *
 * @param {number} grossMinutes
 * @param {number} break6h - Min break for >6h working time (from settings, default 30)
 * @param {number} break9h - Min break for >9h working time (from settings, default 45)
 * @returns {number}
 */
export function suggestBreak(grossMinutes, break6h = 30, break9h = 45) {
    if (grossMinutes <= 6 * 60) return 0
    if (grossMinutes <= 9 * 60 + break6h) return break6h
    return break9h
}

/**
 * Validate that a break meets the §4 ArbZG minimum for the given gross span.
 * Uses the same threshold as suggestBreak() so the validation gate matches the
 * displayed minimum. #403
 * @param {number} grossMinutes
 * @param {number} breakMinutes
 * @param {number} break6h - Min break for >6h working time (from settings, default 30)
 * @param {number} break9h - Min break for >9h working time (from settings, default 45)
 * @returns {boolean}
 */
export function validateBreak(grossMinutes, breakMinutes, break6h = 30, break9h = 45) {
    return breakMinutes >= suggestBreak(grossMinutes, break6h, break9h)
}

/**
 * Get current time as HH:MM string
 * @returns {string}
 */
export function getCurrentTime() {
    const now = new Date()
    return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}

/**
 * Suggested end for a follow-up entry today: the current time, but only if it
 * lies after the suggested start. Otherwise '' so the end must be entered
 * deliberately; an end before the start would be saved as overnight work.
 * @param {string|null} startTime (HH:MM)
 * @param {string} nowTime (HH:MM)
 * @returns {string}
 */
export function followUpEndTime(startTime, nowTime) {
    if (!startTime) return nowTime
    return parseTime(nowTime) > parseTime(startTime) ? nowTime : ''
}

/**
 * Round time to nearest 5 minutes
 * @param {string} timeStr (HH:MM)
 * @returns {string}
 */
export function roundToNearestFive(timeStr) {
    const minutes = parseTime(timeStr)
    const rounded = Math.round(minutes / 5) * 5
    return minutesToTime(rounded)
}
