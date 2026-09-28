// DOM-frei, damit Jest die Sprung-Entscheidungen ohne Rendering prüfen kann

export const LEAD_DAYS = 2

/**
 * @param {number} dayIndex Index des Zieltags in der Liste
 * @param {number} [lead] Anzahl Vortage darüber
 * @return {number} Index der Zeile oben im Sichtbereich, -1 wenn der Tag fehlt
 */
export function scrollTargetIndex(dayIndex, lead = LEAD_DAYS) {
	if (!Number.isInteger(dayIndex) || dayIndex < 0) {
		return -1
	}
	return Math.max(0, dayIndex - lead)
}

/**
 * @param {{ top: number, bottom: number }} row Rechteck der Zeile
 * @param {{ top: number, bottom: number }} view Rechteck des Scroll-Bereichs
 * @return {boolean} true, wenn die Zeile ganz sichtbar ist und nicht gescrollt werden muss
 */
export function isFullyVisible(row, view) {
	if (!row || !view) {
		return false
	}
	return row.top >= view.top && row.bottom <= view.bottom
}

/**
 * @param {HTMLElement} el Element innerhalb des Scroll-Bereichs
 * @return {HTMLElement|null} nächster scrollbarer Vorfahr
 */
export function findScrollContainer(el) {
	for (let node = el?.parentElement; node; node = node.parentElement) {
		if (/(auto|scroll)/.test(getComputedStyle(node).overflowY) && node.scrollHeight > node.clientHeight) {
			return node
		}
	}
	return null
}
