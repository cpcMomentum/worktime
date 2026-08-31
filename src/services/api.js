import axios from '@nextcloud/axios'
import { generateUrl } from '@nextcloud/router'

const baseUrl = generateUrl('/apps/worktime/api')

export const api = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
        'OCS-APIREQUEST': 'true',
    },
})

export function handleApiError(error) {
    if (error.response) {
        // Check for validation errors (array of field-specific errors)
        const validationErrors = error.response.data?.errors
        if (validationErrors && typeof validationErrors === 'object') {
            // Flatten validation errors into a single message
            const messages = []
            for (const field in validationErrors) {
                if (Array.isArray(validationErrors[field])) {
                    messages.push(...validationErrors[field])
                } else if (typeof validationErrors[field] === 'string') {
                    messages.push(validationErrors[field])
                }
            }
            if (messages.length > 0) {
                throw new Error(messages.join('. '))
            }
        }
        const data = error.response.data
        const message = data?.error || data?.message || 'Ein Fehler ist aufgetreten'
        const err = new Error(message)
        // Preserve the server's machine-readable hints (e.g. #664 reason_required,
        // #584 confirmation_required) so callers can react beyond the message.
        if (data?.code) err.code = data.code
        if (data?.suggested) err.suggested = data.suggested
        throw err
    }
    throw error
}

export default api
