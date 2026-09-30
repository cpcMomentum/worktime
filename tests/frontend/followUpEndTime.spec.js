import { followUpEndTime } from '../../src/utils/timeUtils.js'

describe('followUpEndTime', () => {
	it('suggests the current time when it lies after the start', () => {
		expect(followUpEndTime('12:00', '15:30')).toBe('15:30')
	})

	it('leaves the end empty when the latest entry reaches into the future (#763)', () => {
		expect(followUpEndTime('01:29', '00:59')).toBe('')
	})

	it('leaves the end empty when now equals the start', () => {
		expect(followUpEndTime('15:30', '15:30')).toBe('')
	})

	it('accepts HH:MM:SS start times', () => {
		expect(followUpEndTime('12:00:00', '12:05')).toBe('12:05')
		expect(followUpEndTime('18:00:00', '12:05')).toBe('')
	})

	it('suggests the current time without a start', () => {
		expect(followUpEndTime(null, '09:00')).toBe('09:00')
	})
})
