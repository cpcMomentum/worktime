import api, { handleApiError } from './api.js'

export default {
    async getActive() {
        try {
            const response = await api.get('/departments')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getAll() {
        try {
            const response = await api.get('/departments/all')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async get(id) {
        try {
            const response = await api.get(`/departments/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async create(data) {
        try {
            const response = await api.post('/departments', data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async update(id, data) {
        try {
            const response = await api.put(`/departments/${id}`, data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async delete(id) {
        try {
            await api.delete(`/departments/${id}`)
        } catch (error) {
            handleApiError(error)
        }
    },

    async deletionImpact(id) {
        try {
            const response = await api.get(`/departments/${id}/deletion-impact`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },
}
