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
        const message = error.response.data?.error || error.response.data?.message || 'Ein Fehler ist aufgetreten'
        throw new Error(message)
    }
    throw error
}

export default api
