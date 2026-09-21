import { api, handleApiError } from './api.js'

/**
 * „Was ist neu?"-Fenster (#730). Anbindung an die beiden Endpunkte des
 * WhatsNewController; nutzt den gemeinsamen Axios-Client von WorkTime.
 */
export default {
	/** Noch nicht gesehene Neuerungen der laufenden Version. */
	async getPending() {
		try {
			const response = await api.get('/whatsnew')
			return response.data
		} catch (error) {
			handleApiError(error)
		}
	},

	/** Quittiert das Fenster; es kommt für diese Version nicht wieder. */
	async markSeen() {
		try {
			await api.post('/whatsnew/seen', {})
		} catch (error) {
			handleApiError(error)
		}
	},
}
