import { describe, it, expect } from 'vitest'
import { panelTargetAfterSave, isOnPresetDay } from '../../src/utils/entryDate.js'

describe('panelTargetAfterSave', () => {
	const nov = { year: 2026, month: 11 }

	it('stays on the day when the entry was saved there', () => {
		expect(panelTargetAfterSave('2026-11-17', '2026-11-17', nov)).toEqual({ type: 'refresh' })
	})

	it('only refreshes without a date (e.g. after delete)', () => {
		expect(panelTargetAfterSave(undefined, '2026-11-17', nov)).toEqual({ type: 'refresh' })
	})

	it('moves to the saved day in the same month', () => {
		expect(panelTargetAfterSave('2026-11-18', '2026-11-17', nov)).toEqual({ type: 'day', date: '2026-11-18' })
	})

	it('switches month when the entry lands in another month', () => {
		expect(panelTargetAfterSave('2026-10-30', '2026-11-02', nov)).toEqual({ type: 'month', year: 2026, month: 10, date: '2026-10-30' })
		expect(panelTargetAfterSave('2025-11-03', '2026-11-02', nov)).toEqual({ type: 'month', year: 2025, month: 11, date: '2025-11-03' })
	})
})

describe('isOnPresetDay', () => {
	it('is true on the panel day', () => {
		expect(isOnPresetDay(new Date(2026, 7, 4), '2026-08-04')).toBe(true)
		expect(isOnPresetDay(new Date(2026, 7, 4), new Date(2026, 7, 4))).toBe(true)
	})

	it('is false once the date is moved off the panel day', () => {
		expect(isOnPresetDay(new Date(2026, 7, 5), '2026-08-04')).toBe(false)
	})

	it('is true while nothing is picked or no day is preset', () => {
		expect(isOnPresetDay(null, '2026-08-04')).toBe(true)
		expect(isOnPresetDay(new Date(2026, 7, 5), null)).toBe(true)
	})
})
