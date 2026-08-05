/**
 * Farben für Projekte (#548).
 */

/**
 * Nextclouds eigene `defaultPalette` aus `@nextcloud/vue`, hier als Kopie.
 *
 * Die Werte sind NICHT erfunden — sie stammen aus
 * `@nextcloud/vue/dist/utils/colors` (Version 8.35.3). Importieren lässt sich
 * das Modul aber nicht: die `exports`-Map des Pakets gibt nur
 * `dist/Components/*`, `dist/Functions/*`, `dist/Mixins/*` und
 * `dist/Composables/*` frei, ein Zugriff auf `dist/utils/colors.js` scheitert
 * mit `ERR_PACKAGE_PATH_NOT_EXPORTED`.
 *
 * Gebraucht wird die Liste nur für die automatische Vorbelegung beim Anlegen.
 * Die Auswahl selbst zeigt `NcColorPicker` aus seiner eigenen Palette, dort
 * sind dieselben Farben hinterlegt.
 *
 * @type {string[]}
 */
export const PROJECT_PALETTE = [
    '#b6469d', // Lila
    '#bf678b', // Rosiges Braun
    '#c98879', // Feldspat
    '#d3a967', // Whiskey
    '#ddcb55', // Gold
    '#a5b872', // Olivin
    '#6ea68f', // Acapulco
    '#3794ac', // Boston-Blau
    '#0082c9', // Nextcloud Blau
    '#2d73be', // Seemann
    '#5b64b3', // Blau Violett
    '#8855a8', // Sintflut
]

/**
 * Relative Helligkeit nach WCAG 2.1.
 *
 * @param {string} hex Farbe als #rrggbb oder #rgb
 * @return {number|null} 0..1, oder null wenn die Eingabe kein Hexwert ist
 */
function relativeLuminance(hex) {
    if (typeof hex !== 'string') return null
    let h = hex.trim().replace(/^#/, '')
    if (h.length === 3) h = h.split('').map(c => c + c).join('')
    if (!/^[0-9a-fA-F]{6}$/.test(h)) return null

    const channel = (v) => {
        const c = v / 255
        return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4)
    }
    const n = parseInt(h, 16)
    return 0.2126 * channel((n >> 16) & 255)
        + 0.7152 * channel((n >> 8) & 255)
        + 0.0722 * channel(n & 255)
}

/**
 * Kontrastverhältnis zweier Helligkeiten nach WCAG 2.1.
 *
 * @param {number} a Helligkeit 0..1
 * @param {number} b Helligkeit 0..1
 * @return {number} Verhältnis von 1 bis 21
 */
function contrast(a, b) {
    const [hi, lo] = a > b ? [a, b] : [b, a]
    return (hi + 0.05) / (lo + 0.05)
}

/**
 * Lesbare Textfarbe für einen farbigen Hintergrund (#548).
 *
 * Der Projekt-Chip in der Auswertung hatte weißen Text fest verdrahtet. Von
 * den zwölf Palettenfarben tragen nur vier weiß nach WCAG AA — Gold kam auf
 * 1,65:1. Weil die Farbe zusätzlich frei wählbar bleibt, lässt sich das nicht
 * durch eine engere Palette lösen, die Textfarbe muss dem Hintergrund folgen.
 *
 * Reines Schwarz und Weiß, weil abgemildertes `#222` bei Nextcloud Blau in
 * beide Richtungen unter 4,5:1 bleibt.
 *
 * @param {string|null} hex Hintergrundfarbe
 * @return {string} '#ffffff' oder '#000000'
 */
export function textColorOn(hex) {
    const lum = relativeLuminance(hex)
    // Ohne verwertbare Farbe ist der Hintergrund der normale Flächenton;
    // dort gilt die Textfarbe des Themes, hier als Schwarz angenähert.
    if (lum === null) return '#000000'

    return contrast(lum, 1) >= contrast(lum, 0) ? '#ffffff' : '#000000'
}

/**
 * Nächste Palettenfarbe, die noch kein Projekt benutzt (#548).
 *
 * Die Farbe muss nicht eindeutig sein — es gibt weder einen Unique-Index noch
 * eine Prüfung im ProjectService. Trotzdem wird die Palette erst ausgeschöpft,
 * bevor wiederholt wird, damit gleichzeitig sichtbare Projekte so lange wie
 * möglich unterscheidbar bleiben.
 *
 * @param {Array<{color?: string|null}>} projects bestehende Projekte
 * @return {string} Hexfarbe aus der Palette
 */
export function nextUnusedColor(projects) {
    const used = new Set(
        (projects || [])
            .map(p => (p && typeof p.color === 'string' ? p.color.toLowerCase() : null))
            .filter(Boolean),
    )

    const free = PROJECT_PALETTE.find(c => !used.has(c.toLowerCase()))
    if (free) return free

    // Palette ausgeschöpft: gleichmäßig weiterzählen statt immer bei der
    // ersten Farbe zu landen.
    return PROJECT_PALETTE[used.size % PROJECT_PALETTE.length]
}
