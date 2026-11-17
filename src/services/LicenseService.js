import { api, handleApiError } from './api.js'

// Fehler tragen `code` vom Server, damit die Oberfläche ruhige Fälle wie TRIAL_ALREADY_USED erkennt.
async function call(request) {
	try {
		const response = await request()
		return response.data
	} catch (error) {
		handleApiError(error)
	}
}

export default {
	get: () => call(() => api.get('/license')),
	activate: (key) => call(() => api.put('/license', { key })),
	startTrial: () => call(() => api.post('/license/trial', {})),
	refresh: () => call(() => api.post('/license/refresh', {})),
	remove: () => call(() => api.delete('/license')),
}
