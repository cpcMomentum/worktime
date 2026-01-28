import api, { handleApiError } from './api.js'

export default {
    async getAll() {
        try {
            const response = await api.get('/employees')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async get(id) {
        try {
            const response = await api.get(`/employees/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getMe() {
        try {
            const response = await api.get('/employees/me')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async create(data) {
        try {
            const response = await api.post('/employees', data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async update(id, data) {
        try {
            const response = await api.put(`/employees/${id}`, data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async delete(id) {
        try {
            await api.delete(`/employees/${id}`)
        } catch (error) {
            handleApiError(error)
        }
    },

    async getTeam() {
        try {
            const response = await api.get('/employees/team')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getFederalStates() {
        try {
            const response = await api.get('/employees/federal-states')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },
}
