import { isFullyVisible, scrollTargetIndex, LEAD_DAYS } from '../../src/utils/scrollToDay.js'

describe('scrollTargetIndex', () => {
	it('keeps two previous days above the target by default', () => {
		expect(LEAD_DAYS).toBe(2)
		expect(scrollTargetIndex(27)).toBe(25)
	})

	it('never goes before the first day of the month', () => {
		expect(scrollTargetIndex(0)).toBe(0)
		expect(scrollTargetIndex(1)).toBe(0)
		expect(scrollTargetIndex(2)).toBe(0)
	})

	it('returns -1 when the day is not in the list', () => {
		expect(scrollTargetIndex(-1)).toBe(-1)
		expect(scrollTargetIndex(undefined)).toBe(-1)
	})
})

describe('isFullyVisible', () => {
	const view = { top: 50, bottom: 900 }

	it('is true when the row lies completely inside the view', () => {
		expect(isFullyVisible({ top: 400, bottom: 460 }, view)).toBe(true)
	})

	it('is false when the row is cut off below the fold', () => {
		expect(isFullyVisible({ top: 880, bottom: 940 }, view)).toBe(false)
	})

	it('is false when the row is scrolled above or hidden behind the header', () => {
		expect(isFullyVisible({ top: 20, bottom: 80 }, view)).toBe(false)
		expect(isFullyVisible({ top: -300, bottom: -240 }, view)).toBe(false)
	})

	it('is false for missing rectangles', () => {
		expect(isFullyVisible(null, view)).toBe(false)
		expect(isFullyVisible({ top: 0, bottom: 1 }, null)).toBe(false)
	})
})
