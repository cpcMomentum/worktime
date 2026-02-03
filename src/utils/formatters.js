/**
 * Formatting utility functions for WorkTime application.
 *
 * Consolidates formatting functions used across multiple components.
 */

import { STATUS_LABELS, ABSENCE_TYPE_LABELS, ENTRY_STATUS, ABSENCE_STATUS } from '../constants.js'
import { formatDate as formatDateFromDateUtils } from './dateUtils.js'
import { formatMinutes, formatMinutesWithUnit, formatHoursDecimal } from './timeUtils.js'

// Re-export time formatting functions for convenience
export { formatMinutes, formatMinutesWithUnit, formatHoursDecimal }

/**
 * Format minutes to hours as decimal with comma separator
 * @param {number} minutes
 * @returns {string} e.g., "8,5 Std."
 */
export function formatMinutesToHours(minutes) {
    if (minutes === null || minutes === undefined) return '0 Std.'
    const hours = minutes / 60
    return `${hours.toFixed(1).replace('.', ',')} Std.`
}

/**
 * Get localized status label for time entry or absence status
 * @param {string} status - Status value (draft, submitted, approved, rejected, pending, cancelled)
 * @returns {string} Localized label
 */
export function getStatusLabel(status) {
    return STATUS_LABELS[status] || status
}

/**
 * Get localized label for absence type
 * @param {string} type - Absence type (vacation, sick, etc.)
 * @returns {string} Localized label
 */
export function getAbsenceTypeLabel(type) {
    return ABSENCE_TYPE_LABELS[type] || type
}

/**
 * Format a date for display
 * @param {string|Date} date
 * @param {string} format - 'short' (DD.MM.), 'medium' (DD.MM.YYYY), 'long' (DD. MMMM YYYY)
 * @returns {string}
 */
export function formatDate(date, format = 'medium') {
    if (!date) return ''
    const d = typeof date === 'string' ? new Date(date) : date

    switch (format) {
        case 'short':
            return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit' })
        case 'long':
            return d.toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' })
        case 'medium':
        default:
            return formatDateFromDateUtils(date)
    }
}

/**
 * Format a date range for display
 * @param {string|Date} startDate
 * @param {string|Date} endDate
 * @returns {string} e.g., "01.01.2026 - 05.01.2026"
 */
export function formatDateRange(startDate, endDate) {
    const start = formatDate(startDate)
    const end = formatDate(endDate)
    return `${start} - ${end}`
}

/**
 * Get CSS class for status badge
 * @param {string} status
 * @returns {string}
 */
export function getStatusClass(status) {
    const classMap = {
        [ENTRY_STATUS.DRAFT]: 'status-draft',
        [ENTRY_STATUS.SUBMITTED]: 'status-submitted',
        [ENTRY_STATUS.APPROVED]: 'status-approved',
        [ENTRY_STATUS.REJECTED]: 'status-rejected',
        [ABSENCE_STATUS.PENDING]: 'status-pending',
        [ABSENCE_STATUS.CANCELLED]: 'status-cancelled',
    }
    return classMap[status] || ''
}

/**
 * Format overtime minutes with sign and color indication
 * @param {number} minutes
 * @returns {{ value: string, isPositive: boolean, isNegative: boolean }}
 */
export function formatOvertime(minutes) {
    const value = formatMinutesWithUnit(minutes)
    return {
        value: minutes > 0 ? `+${value}` : value,
        isPositive: minutes > 0,
        isNegative: minutes < 0,
    }
}

/**
 * Format employee name
 * @param {Object} employee
 * @returns {string}
 */
export function formatEmployeeName(employee) {
    if (!employee) return ''
    if (employee.fullName) return employee.fullName
    return `${employee.firstName} ${employee.lastName}`.trim()
}

/**
 * Format a number as German locale
 * @param {number} value
 * @param {number} decimals
 * @returns {string}
 */
export function formatNumber(value, decimals = 0) {
    if (value === null || value === undefined) return '0'
    return value.toLocaleString('de-DE', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    })
}

export default {
    formatMinutes,
    formatMinutesWithUnit,
    formatMinutesToHours,
    formatHoursDecimal,
    getStatusLabel,
    getAbsenceTypeLabel,
    formatDate,
    formatDateRange,
    getStatusClass,
    formatOvertime,
    formatEmployeeName,
    formatNumber,
}
