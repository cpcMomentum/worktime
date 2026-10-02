import { countWorkingDays, normalize, sum } from '../../src/utils/dayHours.js'

const week = (overrides = {}) => ({ mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, sat: 0, sun: 0, ...overrides })

describe('dayHours (#579)', () => {
	it('treats an emptied field as 0 and keeps the sum a number', () => {
		expect(normalize('')).toBe(0)
		expect(normalize(null)).toBe(0)
		expect(normalize('abc')).toBe(0)
		expect(sum(week({ fri: '' }))).toBe(32)
	})

	it('reads numeric strings from the input', () => {
		expect(normalize('7.5')).toBe(7.5)
	})

	it('sums quarter hours exactly', () => {
		expect(sum(week({ mon: 7.75, tue: 7.75, wed: 7.75, thu: 7.75, fri: 0 }))).toBe(31)
	})

	it('rounds each day like the server before summing', () => {
		expect(sum(week({ mon: 7.333, tue: 0, wed: 7.333, thu: 0, fri: 7.333 }))).toBe(21.99)
		// PHP round(1.005, 2) = 1.01; naive Math.round(1.005 * 100) / 100 gives 1
		expect(sum(week({ mon: 1.005, tue: 0, wed: 0, thu: 0, fri: 0 }))).toBe(1.01)
	})

	it('does not count a day that rounds to 0 as working day', () => {
		expect(countWorkingDays(week({ thu: 0.004 }))).toBe(4)
		expect(countWorkingDays(week({ thu: 0.005 }))).toBe(5)
	})

	it('counts working days of an uneven pattern', () => {
		expect(countWorkingDays(week({ tue: 0, thu: 0 }))).toBe(3)
	})
})
