/**
 * Helpers for a Mon-Sun hour pattern of a work schedule (#579).
 * Same rules as the server (WorkScheduleService::normalizeDayHours):
 * values are rounded to 2 decimals before summing or counting days.
 */

export const DAY_KEYS = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun']

/**
 * Round to 2 decimals, half away from zero like PHP round()
 * (plain Math.round(x * 100) / 100 turns 7.335 into 7.33).
 * @param {number} value
 * @returns {number}
 */
function round2(value) {
	return Math.sign(value) * Number(Math.round(Number(Math.abs(value) + 'e2')) + 'e-2')
}

/**
 * Input value to hours. An emptied or unreadable field counts as 0, so the
 * weekly sum never turns into NaN or a concatenated string.
 * type="number" already delivers "7.5" for a typed "7,5" (checked in
 * Chromium and Firefox with de-DE, see #579 Phase 0).
 * @param {string|number|null|undefined} value
 * @returns {number}
 */
export function normalize(value) {
	const n = Number(value)
	return Number.isFinite(n) ? n : 0
}

/**
 * Weekly sum of a pattern, rounded to 2 decimals.
 * @param {Object<string, number>} dayHours
 * @returns {number}
 */
export function sum(dayHours) {
	return round2(DAY_KEYS.reduce((total, day) => total + round2(normalize(dayHours[day])), 0))
}

/**
 * Days with more than 0 hours after rounding (0.004 is no working day).
 * @param {Object<string, number>} dayHours
 * @returns {number}
 */
export function countWorkingDays(dayHours) {
	return DAY_KEYS.filter(day => round2(normalize(dayHours[day])) > 0).length
}
