import { formatDateISO } from './dateUtils.js'

// Where the time tracking view goes after an entry was saved in the day panel.
export function panelTargetAfterSave(savedDate, selectedDate, selectedMonth) {
    if (!savedDate || savedDate === selectedDate) {
        return { type: 'refresh' }
    }
    const [year, month] = savedDate.split('-').map(Number)
    if (year !== selectedMonth.year || month !== selectedMonth.month) {
        return { type: 'month', year, month, date: savedDate }
    }
    return { type: 'day', date: savedDate }
}

// Whether the picked date is still the day the form was opened for.
export function isOnPresetDay(formDate, presetDate) {
    if (!formDate || !presetDate) return true
    const preset = typeof presetDate === 'string' ? presetDate : formatDateISO(presetDate)
    return formatDateISO(formDate) === preset
}
