import { describe, it, expect, beforeEach, vi } from 'vitest'

const dialog = { buttons: [], severity: null, show: null }

vi.mock('@nextcloud/dialogs', () => ({
	showError: vi.fn(),
	showWarning: vi.fn(),
	showSuccess: vi.fn(),
	getDialogBuilder: () => {
		const builder = {
			setText: () => builder,
			setButtons: (buttons) => { dialog.buttons = buttons; return builder },
			setSeverity: (severity) => { dialog.severity = severity; return builder },
			build: () => ({ show: dialog.show }),
		}
		return builder
	},
}))

const { confirmAction } = await import('../../src/utils/errorHandler.js')

describe('confirmAction', () => {
	beforeEach(() => {
		dialog.buttons = []
		dialog.severity = null
	})

	it('resolves true when the confirm button is used', async () => {
		dialog.show = () => { dialog.buttons[1].callback(); return Promise.resolve() }
		await expect(confirmAction('Frage', 'Titel', 'Löschen', true)).resolves.toBe(true)
	})

	it('resolves false when the cancel button is used', async () => {
		dialog.show = () => { dialog.buttons[0].callback(); return Promise.resolve() }
		await expect(confirmAction('Frage')).resolves.toBe(false)
	})

	it('resolves false when the dialog is closed without a choice', async () => {
		dialog.show = () => Promise.reject(new Error('Dialog closed'))
		await expect(confirmAction('Frage')).resolves.toBe(false)
	})

	it('marks destructive dialogs as warning with an error button', async () => {
		dialog.show = () => { dialog.buttons[1].callback(); return Promise.resolve() }
		await confirmAction('Frage', 'Titel', 'Löschen', true)
		expect(dialog.severity).toBe('warning')
		expect(dialog.buttons[1].variant).toBe('error')
	})
})
