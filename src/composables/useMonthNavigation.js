/**
 * Composable for month navigation logic.
 *
 * Provides reactive state and methods for navigating between months,
 * commonly used in TimeTrackingView and MonthlyReportView.
 */

import { ref, computed, watch } from 'vue'
import { getCurrentYear, getCurrentMonth, getMonthName } from '../utils/dateUtils.js'

/**
 * Create a month navigation composable.
 *
 * @param {Object} options - Configuration options
 * @param {number} options.initialYear - Initial year (defaults to current year)
 * @param {number} options.initialMonth - Initial month 1-12 (defaults to current month)
 * @param {Function} options.onChange - Callback when month changes
 * @returns {Object} Month navigation state and methods
 */
export function useMonthNavigation(options = {}) {
    const {
        initialYear = getCurrentYear(),
        initialMonth = getCurrentMonth(),
        onChange = null,
    } = options

    // Reactive state
    const year = ref(initialYear)
    const month = ref(initialMonth)

    // Computed properties
    const monthName = computed(() => getMonthName(month.value))

    const monthLabel = computed(() => `${monthName.value} ${year.value}`)

    const selectedMonth = computed(() => ({
        year: year.value,
        month: month.value,
    }))

    const isCurrentMonth = computed(() => {
        const now = new Date()
        return year.value === now.getFullYear() && month.value === now.getMonth() + 1
    })

    const isFutureMonth = computed(() => {
        const now = new Date()
        const currentYear = now.getFullYear()
        const currentMonth = now.getMonth() + 1
        return year.value > currentYear || (year.value === currentYear && month.value > currentMonth)
    })

    // Methods
    function previousMonth() {
        if (month.value === 1) {
            month.value = 12
            year.value -= 1
        } else {
            month.value -= 1
        }
    }

    function nextMonth() {
        if (month.value === 12) {
            month.value = 1
            year.value += 1
        } else {
            month.value += 1
        }
    }

    function setMonth(newYear, newMonth) {
        year.value = newYear
        month.value = newMonth
    }

    function goToCurrentMonth() {
        year.value = getCurrentYear()
        month.value = getCurrentMonth()
    }

    // Watch for changes and call onChange callback
    if (onChange) {
        watch([year, month], () => {
            onChange({ year: year.value, month: month.value })
        })
    }

    return {
        // State
        year,
        month,

        // Computed
        monthName,
        monthLabel,
        selectedMonth,
        isCurrentMonth,
        isFutureMonth,

        // Methods
        previousMonth,
        nextMonth,
        setMonth,
        goToCurrentMonth,
    }
}

export default useMonthNavigation
