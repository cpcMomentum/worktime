import { shouldOpen, KNOWN_ICONS } from '../../src/utils/whatsnew.js'

/**
 * „Was ist neu?"-Fenster (#730): die zentrale Anzeige-Regel. WorkTimes Jest
 * testet Logik ohne .vue-Rendering, deshalb liegt die Entscheidung als reine
 * Funktion vor. Die Render-Details (Fundort-Zeile, Symbol-Fallback, Quittung)
 * werden per Playwright an der echten Oberfläche geprüft.
 */
describe('shouldOpen', () => {
	it('opens when there is at least one entry', () => {
		expect(shouldOpen({ version: '0.23.0', entries: [{ title: 'x', text: 'y' }] })).toBe(true)
	})

	it('stays closed for an empty entry list (new user, maintenance release)', () => {
		expect(shouldOpen({ version: '0.23.0', entries: [] })).toBe(false)
	})

	it('stays closed for a missing or malformed payload', () => {
		expect(shouldOpen(undefined)).toBe(false)
		expect(shouldOpen(null)).toBe(false)
		expect(shouldOpen({})).toBe(false)
		expect(shouldOpen({ entries: 'nope' })).toBe(false)
	})
})

describe('KNOWN_ICONS', () => {
	it('includes the default star fallback', () => {
		expect(KNOWN_ICONS).toContain('star')
	})

	it('has no duplicates', () => {
		expect(new Set(KNOWN_ICONS).size).toBe(KNOWN_ICONS.length)
	})
})
