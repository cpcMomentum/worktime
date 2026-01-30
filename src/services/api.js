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
        const message = error.response.data?.error || error.response.data?.message || 'Ein Fehler ist aufgetreten'
        throw new Error(message)
    }
    throw error
}

export default api
