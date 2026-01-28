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
    return `${formatMinutes(minutes)} Std.`
}

/**
 * Format hours as decimal
 * @param {number} minutes
 * @returns {string}
 */
export function formatHoursDecimal(minutes) {
    if (minutes === null || minutes === undefined) return '0,00'
    const hours = minutes / 60
    return hours.toFixed(2).replace('.', ',')
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
 * Suggest break time based on German labor law
 * @param {number} grossMinutes
 * @returns {number}
 */
export function suggestBreak(grossMinutes) {
    const hours = grossMinutes / 60
    if (hours <= 6) return 0
    if (hours <= 9) return 30
    return 45
}

/**
 * Validate break time against German labor law
 * @param {number} grossMinutes
 * @param {number} breakMinutes
 * @returns {boolean}
 */
export function validateBreak(grossMinutes, breakMinutes) {
    const hours = grossMinutes / 60
    if (hours <= 6) return true
    if (hours <= 9) return breakMinutes >= 30
    return breakMinutes >= 45
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
 * Round time to nearest 5 minutes
 * @param {string} timeStr (HH:MM)
 * @returns {string}
 */
export function roundToNearestFive(timeStr) {
    const minutes = parseTime(timeStr)
    const rounded = Math.round(minutes / 5) * 5
    return minutesToTime(rounded)
}
