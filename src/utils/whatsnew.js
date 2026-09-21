/**
 * Reine Anzeige-Entscheidungen des „Was ist neu?"-Fensters (#730).
 *
 * Als eigenes Modul, weil WorkTimes Jest-Harness Logik ohne .vue-Rendering
 * testet: so ist die zentrale Regel „kein Fenster ohne Einträge" abgesichert,
 * ohne den Dialog rendern zu müssen.
 */

/**
 * Symbolnamen, die der Dialog kennt. Ein unbekannter Name fällt im Dialog auf
 * den Stern zurück; die ausgelieferte whatsnew.json wird serverseitig gegen
 * dieselbe Liste geprüft (WhatsNewServiceTest).
 */
export const KNOWN_ICONS = [
	'account-group', 'chart-bar', 'cog', 'counter', 'email',
	'file-document', 'folder', 'magnify', 'star', 'translate',
]

/**
 * Ob das Fenster für die Server-Antwort überhaupt aufgehen soll. Nur wenn es
 * mindestens einen Eintrag gibt — eine leere Liste (neuer Nutzer, Wartungs-
 * release ohne Berichtenswertes) darf nie ein leeres Fenster zeigen.
 *
 * @param {{ entries?: unknown }} payload Antwort von GET /whatsnew
 * @return {boolean}
 */
export function shouldOpen(payload) {
	return !!(payload && Array.isArray(payload.entries) && payload.entries.length > 0)
}
