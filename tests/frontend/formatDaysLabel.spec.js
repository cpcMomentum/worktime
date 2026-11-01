import { formatDaysLabel } from '../../src/utils/formatters.js'

// getLocale() reads the page language; the node test environment has no DOM.
global.document = { documentElement: { lang: '' } }

jest.mock('@nextcloud/l10n', () => ({
	translate: (app, text) => text,
	translatePlural: (app, singular, plural, count, vars) =>
		(count === 1 ? singular : plural).replace('{days}', vars.days),
}))

describe('formatDaysLabel', () => {
	afterEach(() => {
		document.documentElement.lang = ''
	})

	it('uses the singular for exactly one day', () => {
		document.documentElement.lang = 'de-DE'
		expect(formatDaysLabel(1)).toBe('1 Tag')
	})

	it('uses the plural for several and for fractional days', () => {
		document.documentElement.lang = 'de-DE'
		expect(formatDaysLabel(2)).toBe('2 Tage')
		expect(formatDaysLabel(0.5)).toBe('0,5 Tage')
		expect(formatDaysLabel(0)).toBe('0 Tage')
	})

	it('accepts the numeric strings the API returns', () => {
		document.documentElement.lang = 'en-US'
		expect(formatDaysLabel('1.00')).toBe('1 Tag')
		expect(formatDaysLabel('0.53')).toBe('0.53 Tage')
	})
})
