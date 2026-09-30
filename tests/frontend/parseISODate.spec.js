import { parseISODate, formatDateISO } from '../../src/utils/dateUtils.js'

describe('parseISODate', () => {
	it('parses YYYY-MM-DD as local midnight', () => {
		const d = parseISODate('2027-01-11')
		expect(d.getFullYear()).toBe(2027)
		expect(d.getMonth()).toBe(0)
		expect(d.getDate()).toBe(11)
		expect(d.getHours()).toBe(0)
	})

	it('equals a date picked in the UI for the same day (#761)', () => {
		const picked = new Date(2027, 0, 11)
		expect(parseISODate('2027-01-11').getTime()).toBe(picked.getTime())
	})

	it('round-trips through formatDateISO', () => {
		expect(formatDateISO(parseISODate('2026-12-31'))).toBe('2026-12-31')
	})

	it('falls back to Date parsing for other formats', () => {
		expect(parseISODate('2027-01-11T10:00:00Z').toISOString()).toBe('2027-01-11T10:00:00.000Z')
	})
})
