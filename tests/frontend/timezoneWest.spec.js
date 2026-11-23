import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { formatDate, formatDateWithWeekday, formatDateShort, formatDateISO, isWeekend, parseDate, parseISODate } from '../../src/utils/dateUtils.js'
import { formatDate as formatDateFmt, formatDateWithWeekday as formatDateWithWeekdayFmt } from '../../src/utils/formatters.js'

describe('date-only strings west of UTC', () => {
	let previous
	beforeAll(() => {
		previous = process.env.TZ
		process.env.TZ = 'America/New_York'
	})
	afterAll(() => {
		process.env.TZ = previous
	})

	it('parseISODate keeps the calendar day', () => {
		expect(parseISODate('2026-11-05').getDate()).toBe(5)
	})

	it('round-trips through formatDateISO', () => {
		expect(formatDateISO('2026-11-05')).toBe('2026-11-05')
		expect(formatDateISO(parseDate('2026-11-05'))).toBe('2026-11-05')
	})

	it('formats the stored day', () => {
		expect(formatDate('2026-11-05')).toContain('05')
		expect(formatDateShort('2026-11-05')).toContain('05')
		expect(formatDateWithWeekday('2026-11-05')).toContain('05')
		expect(formatDateFmt('2026-11-05', 'short')).toContain('05')
		expect(formatDateWithWeekdayFmt('2026-11-05')).toContain('05')
	})

	it('reads January 1st as the same year', () => {
		expect(parseDate('2026-01-01').getFullYear()).toBe(2026)
	})

	it('detects weekends on the stored day', () => {
		expect(isWeekend('2026-11-07')).toBe(true)
		expect(isWeekend('2026-11-06')).toBe(false)
	})

	it('still parses timestamps with time as instants', () => {
		expect(parseISODate('2026-11-05T10:00:00Z').toISOString()).toBe('2026-11-05T10:00:00.000Z')
	})
})
