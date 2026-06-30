import api, { handleApiError } from './api.js'

export default {
	async getByYear(year) {
		try {
			const response = await api.get(`/overtime-payouts/${year}`)
			return response.data
		} catch (error) {
			handleApiError(error)
		}
	},

	async create(employeeId, payoutDate, minutes, note) {
		try {
			const response = await api.post('/overtime-payouts', {
				employeeId,
				payoutDate,
				minutes,
				note,
			})
			return response.data
		} catch (error) {
			handleApiError(error)
		}
	},

	async delete(id) {
		try {
			const response = await api.delete(`/overtime-payouts/${id}`)
			return response.data
		} catch (error) {
			handleApiError(error)
		}
	},
}
