import { archiveGroups, shouldOpen, KNOWN_ICONS } from '../../src/utils/whatsnew.js'

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

describe('archiveGroups', () => {
	it('keeps all version groups in server order', () => {
		const payload = {
			versions: [
				{ version: '0.24.0', entries: [{ title: 'a' }] },
				{ version: '0.23.0', entries: [{ title: 'b' }, { title: 'c' }] },
			],
		}
		expect(archiveGroups(payload).map(g => g.version)).toEqual(['0.24.0', '0.23.0'])
	})

	it('drops malformed or empty groups', () => {
		const payload = {
			versions: [
				{ version: '0.24.0', entries: [] },
				{ version: 23, entries: [{ title: 'x' }] },
				{ version: '0.22.0' },
				null,
				{ version: '0.21.0', entries: [{ title: 'ok' }] },
			],
		}
		expect(archiveGroups(payload).map(g => g.version)).toEqual(['0.21.0'])
	})

	it('returns an empty list for a missing or malformed payload', () => {
		expect(archiveGroups(undefined)).toEqual([])
		expect(archiveGroups({})).toEqual([])
		expect(archiveGroups({ versions: 'nope' })).toEqual([])
	})
})
