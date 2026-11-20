import { describe, it, expect, beforeEach, vi } from 'vitest'
import { closeModalOnEscape } from '../../src/utils/modalEscape.js'

function press(target, key = 'Escape') {
	const event = new KeyboardEvent('keydown', { key, bubbles: true })
	Object.defineProperty(event, 'target', { value: target })
	closeModalOnEscape(event)
}

describe('closeModalOnEscape', () => {
	let closeClicked

	beforeEach(() => {
		document.body.innerHTML = `
			<input id="outside">
			<div class="modal-mask">
				<button class="modal-container__close"></button>
				<input id="inside">
				<div class="vs--open"><input id="in-open-select"></div>
				<button id="plain-button"></button>
			</div>`
		closeClicked = vi.fn()
		document.querySelector('.modal-container__close').addEventListener('click', closeClicked)
	})

	it('closes the dialog when Esc is pressed inside an input', () => {
		press(document.getElementById('inside'))
		expect(closeClicked).toHaveBeenCalledTimes(1)
	})

	it('ignores other keys', () => {
		press(document.getElementById('inside'), 'Enter')
		expect(closeClicked).not.toHaveBeenCalled()
	})

	it('ignores inputs outside a dialog', () => {
		press(document.getElementById('outside'))
		expect(closeClicked).not.toHaveBeenCalled()
	})

	it('leaves non-input targets to NcModal itself', () => {
		press(document.getElementById('plain-button'))
		expect(closeClicked).not.toHaveBeenCalled()
	})

	it('lets an open select close itself first', () => {
		press(document.getElementById('in-open-select'))
		expect(closeClicked).not.toHaveBeenCalled()
	})

	it('lets an open date menu close itself first', () => {
		document.body.insertAdjacentHTML('beforeend', '<div class="dp__menu"></div>')
		press(document.getElementById('inside'))
		expect(closeClicked).not.toHaveBeenCalled()
	})
})
