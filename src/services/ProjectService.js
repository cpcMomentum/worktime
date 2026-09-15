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

    // #682: server-side search over the bookable, visibility-scoped projects.
    // Returns only matches (name or code), capped by `limit`, so the client
    // never has to load the whole project list.
    async search(query = '', limit = 20) {
        try {
            const response = await api.get('/projects/search', { params: { q: query, limit } })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getById(id) {
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
