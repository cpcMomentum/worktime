import api, { handleApiError } from './api.js'

export default {
	async getAll(employeeId) {
		try {
			const response = await api.get(`/employees/${employeeId}/schedules`)
			return response.data
		} catch (error) {
			handleApiError(error)
		}
	},

	async create(employeeId, data) {
		try {
			const response = await api.post(`/employees/${employeeId}/schedules`, data)
			return response.data
		} catch (error) {
			handleApiError(error)
		}
	},

	async update(employeeId, id, data) {
		try {
			const response = await api.put(`/employees/${employeeId}/schedules/${id}`, data)
			return response.data
		} catch (error) {
			handleApiError(error)
		}
	},

	async delete(employeeId, id) {
		try {
			const response = await api.delete(`/employees/${employeeId}/schedules/${id}`)
			return response.data
		} catch (error) {
			handleApiError(error)
		}
	},
}
