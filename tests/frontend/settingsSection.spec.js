import { pickSection, sectionFromHash, sectionHash, shouldRestoreLastView } from '../../src/utils/settingsSection.js'

describe('shouldRestoreLastView', () => {
    it.each(['', '#/', '#', '#/?x=1'])('stellt ohne Ziel in der URL (%s) die letzte Ansicht her', (hash) => {
        expect(shouldRestoreLastView(hash, '/settings')).toBe(true)
    })

    it.each(['#/my-settings?sec=sec-vertretung', '#/settings?sec=sec-werkplus', '#/approvals'])('laesst einen Link (%s) stehen', (hash) => {
        expect(shouldRestoreLastView(hash, '/settings')).toBe(false)
    })

    it.each([null, '', '/'])('ohne gespeicherte Ansicht (%s) passiert nichts', (saved) => {
        expect(shouldRestoreLastView('#/', saved)).toBe(false)
    })
})

describe('sectionFromHash', () => {
    it('liest den Abschnitt aus der Query', () => {
        expect(sectionFromHash('#/settings?sec=sec-werkplus')).toBe('sec-werkplus')
        expect(sectionFromHash('#/settings?x=1&sec=sec-pdf')).toBe('sec-pdf')
    })

    it('liefert null ohne Abschnitt', () => {
        expect(sectionFromHash('#/settings')).toBeNull()
        expect(sectionFromHash('')).toBeNull()
        expect(sectionFromHash(undefined)).toBeNull()
        expect(sectionFromHash('#/settings?parsec=x')).toBeNull()
    })

    it('wirft bei kaputt kodiertem Abschnitt nicht', () => {
        expect(sectionFromHash('#/settings?sec=%E0%A4%A')).toBeNull()
    })

    it('ist die Umkehrung von sectionHash', () => {
        expect(sectionFromHash(sectionHash('/my-settings', 'sec-ä b'))).toBe('sec-ä b')
    })
})

describe('pickSection', () => {
    const ids = ['sec-arbeitszeiten', 'sec-datenschutz']

    it('nimmt den Abschnitt aus der URL, wenn er erlaubt ist', () => {
        expect(pickSection('sec-datenschutz', ids)).toBe('sec-datenschutz')
    })

    it('faellt bei unbekanntem oder nicht erlaubtem Abschnitt auf den ersten zurueck', () => {
        expect(pickSection('sec-vertretung', ids)).toBe('sec-arbeitszeiten')
        expect(pickSection(null, ids)).toBe('sec-arbeitszeiten')
    })

    it('behaelt den aktuellen Abschnitt, solange er erlaubt ist', () => {
        expect(pickSection(null, ids, 'sec-datenschutz')).toBe('sec-datenschutz')
        expect(pickSection('sec-vertretung', ids, 'sec-datenschutz')).toBe('sec-datenschutz')
    })

    it('waehlt einen per Link gewaehlten Abschnitt, sobald er erlaubt wird', () => {
        expect(pickSection('sec-vertretung', [...ids, 'sec-vertretung'], 'sec-arbeitszeiten')).toBe('sec-vertretung')
    })

    it('liefert null ohne erlaubte Abschnitte', () => {
        expect(pickSection('sec-x', [])).toBeNull()
    })
})
