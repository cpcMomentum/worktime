import { translate as t } from '@nextcloud/l10n'

/**
 * Get the user's locale from Nextcloud (falls back to navigator or 'de-DE')
 * @returns {string}
 */
function getLocale() {
    return document.documentElement.lang || navigator.language || 'de-DE'
}

/**
 * Format a date string to locale format
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDate(date) {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString(getLocale(), {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
}

/**
 * Format a date string with weekday (e.g., "Mo, 07.01.2026")
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateWithWeekday(date) {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    const weekday = getDayName(d.getDay())
    const dateStr = d.toLocaleDateString(getLocale(), {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    })
    return `${weekday}, ${dateStr}`
}

/**
 * Format a date to short format (DD.MM.)
 * @param {string|Date} date
 * @returns {string}
 */
export function formatDateShort(date) {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    return d.toLocaleDateString(getLocale(), {
        day: '2-digit',
        month: '2-digit',
    })
}

/**
 * Format a date to ISO format (YYYY-MM-DD)
 * Uses local timezone to avoid date shifts
 * @param {Date} date
 * @returns {string}
 */
export function formatDateISO(date) {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
}

/**
 * Get translated month name
 * @param {number} month (1-12)
 * @returns {string}
 */
export function getMonthName(month) {
    const months = [
        t('worktime', 'Januar'), t('worktime', 'Februar'), t('worktime', 'März'),
        t('worktime', 'April'), t('worktime', 'Mai'), t('worktime', 'Juni'),
        t('worktime', 'Juli'), t('worktime', 'August'), t('worktime', 'September'),
        t('worktime', 'Oktober'), t('worktime', 'November'), t('worktime', 'Dezember'),
    ]
    return months[month - 1] || ''
}

/**
 * Get short translated month name (3 chars)
 * @param {number} month (1-12)
 * @returns {string}
 */
export function getMonthNameShort(month) {
    const months = [
        t('worktime', 'Jan'), t('worktime', 'Feb'), t('worktime', 'Mrz'),
        t('worktime', 'Apr'), t('worktime', 'Mai'), t('worktime', 'Jun'),
        t('worktime', 'Jul'), t('worktime', 'Aug'), t('worktime', 'Sep'),
        t('worktime', 'Okt'), t('worktime', 'Nov'), t('worktime', 'Dez'),
    ]
    return months[month - 1] || ''
}

/**
 * Get translated day name
 * @param {number} dayOfWeek (0-6, 0 = Sunday)
 * @returns {string}
 */
export function getDayName(dayOfWeek) {
    const days = [
        t('worktime', 'So'), t('worktime', 'Mo'), t('worktime', 'Di'),
        t('worktime', 'Mi'), t('worktime', 'Do'), t('worktime', 'Fr'),
        t('worktime', 'Sa'),
    ]
    return days[dayOfWeek] || ''
}

/**
 * Get the current year
 * @returns {number}
 */
export function getCurrentYear() {
    return new Date().getFullYear()
}

/**
 * Get the current month (1-12)
 * @returns {number}
 */
export function getCurrentMonth() {
    return new Date().getMonth() + 1
}

/**
 * Get today's date in ISO format
 * @returns {string}
 */
export function getToday() {
    return formatDateISO(new Date())
}

/**
 * Check if a date is a weekend
 * @param {string|Date} date
 * @returns {boolean}
 */
export function isWeekend(date) {
    const d = typeof date === 'string' ? new Date(date) : date
    const day = d.getDay()
    return day === 0 || day === 6
}

/**
 * Get first day of month
 * @param {number} year
 * @param {number} month (1-12)
 * @returns {Date}
 */
export function getFirstDayOfMonth(year, month) {
    return new Date(year, month - 1, 1)
}

/**
 * Get last day of month
 * @param {number} year
 * @param {number} month (1-12)
 * @returns {Date}
 */
export function getLastDayOfMonth(year, month) {
    return new Date(year, month, 0)
}

/**
 * Get number of days in a month
 * @param {number} year
 * @param {number} month (1-12)
 * @returns {number}
 */
export function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate()
}

/**
 * Generate array of days in a month
 * @param {number} year
 * @param {number} month (1-12)
 * @returns {Array<{date: string, day: number, dayOfWeek: number, isWeekend: boolean}>}
 */
export function getMonthDays(year, month) {
    const days = []
    const daysInMonth = getDaysInMonth(year, month)

    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month - 1, day)
        days.push({
            date: formatDateISO(date),
            day,
            dayOfWeek: date.getDay(),
            isWeekend: isWeekend(date),
        })
    }

    return days
}

/**
 * Parse a date string to Date object
 * @param {string} dateStr
 * @returns {Date|null}
 */
export function parseDate(dateStr) {
    if (!dateStr) return null
    const date = new Date(dateStr)
    return isNaN(date.getTime()) ? null : date
}

/**
 * Get ISO week number for a date
 * @param {Date} date
 * @returns {number}
 */
export function getISOWeek(date) {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7))
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil(((d - yearStart) / 86400000 + 1) / 7)
}
