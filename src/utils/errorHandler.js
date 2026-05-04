import { showError, showWarning, showSuccess, DialogSeverity, getDialogBuilder } from '@nextcloud/dialogs'

/**
 * Handle and display API errors
 * @param {Error} error
 * @param {string} defaultMessage
 */
export function handleError(error, defaultMessage = 'Ein Fehler ist aufgetreten') {
    console.error('Error:', error)
    const message = error.message || defaultMessage
    showError(message)
}

/**
 * Show a success message
 * @param {string} message
 */
export function showSuccessMessage(message) {
    showSuccess(message)
}

/**
 * Show a warning message
 * @param {string} message
 */
export function showWarningMessage(message) {
    showWarning(message)
}

/**
 * Show an error message
 * @param {string} message
 */
export function showErrorMessage(message) {
    showError(message)
}

/**
 * Extract validation errors from API response
 * @param {Object} errors
 * @returns {Array<string>}
 */
export function extractValidationErrors(errors) {
    if (!errors || typeof errors !== 'object') return []
    const messages = []
    for (const field in errors) {
        if (Array.isArray(errors[field])) {
            messages.push(...errors[field])
        } else if (typeof errors[field] === 'string') {
            messages.push(errors[field])
        }
    }
    return messages
}

/**
 * Confirm action with Nextcloud dialog
 * @param {string} message
 * @param {string} title
 * @param {string} confirmLabel
 * @param {boolean} destructive - If true, shows destructive/warning style
 * @returns {Promise<boolean>}
 */
export function confirmAction(message, title = 'Bestätigung', confirmLabel = 'OK', destructive = false) {
    return new Promise((resolve) => {
        const dialog = getDialogBuilder(title)
            .setText(message)
            .setButtons([
                {
                    label: 'Abbrechen',
                    type: 'secondary',
                    callback: () => resolve(false),
                },
                {
                    label: confirmLabel,
                    type: destructive ? 'error' : 'primary',
                    callback: () => resolve(true),
                },
            ])
        if (destructive) {
            dialog.setSeverity(DialogSeverity.Warning)
        }
        dialog.build().show()
    })
}

export default {
    handleError,
    showSuccessMessage,
    showWarningMessage,
    showErrorMessage,
    extractValidationErrors,
    confirmAction,
}
