import api, { handleApiError } from './api.js'

export default {
    async getActive() {
        try {
            const response = await api.get('/projects')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getAll() {
        try {
            const response = await api.get('/projects/all')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async get(id) {
        try {
            const response = await api.get(`/projects/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async create(data) {
        try {
            const response = await api.post('/projects', data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async update(id, data) {
        try {
            const response = await api.put(`/projects/${id}`, data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async delete(id) {
        try {
            await api.delete(`/projects/${id}`)
        } catch (error) {
            handleApiError(error)
        }
    },
}
