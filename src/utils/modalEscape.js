// NcModal ignoriert Esc bei Fokus im Eingabefeld, der Fokus-Trap setzt ihn aber beim Oeffnen dorthin
export function closeModalOnEscape(event) {
	if (event.key !== 'Escape' || event.defaultPrevented || event.isComposing) {
		return
	}
	const target = event.target
	if (!target?.matches?.('input, textarea, select')) {
		return
	}
	const mask = target.closest('.modal-mask')
	if (!mask) {
		return
	}
	// Ein offenes Auswahlfeld oder Datumsmenue schliesst zuerst sich selbst
	if (target.closest('.vs--open') || document.querySelector('.dp__menu')) {
		return
	}
	mask.querySelector('.modal-container__close')?.click()
}

export function registerModalEscape() {
	document.addEventListener('keydown', closeModalOnEscape)
}
