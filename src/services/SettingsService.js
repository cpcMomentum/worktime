import api, { handleApiError } from './api.js'

export default {
    async getAll() {
        try {
            const response = await api.get('/settings')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async get(key) {
        try {
            const response = await api.get(`/settings/${key}`)
            return response.data.value
        } catch (error) {
            handleApiError(error)
        }
    },

    async update(key, value) {
        try {
            const response = await api.put(`/settings/${key}`, { value })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async updateMultiple(settings) {
        try {
            const response = await api.put('/settings', { settings })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async reset(key) {
        try {
            const response = await api.post(`/settings/${key}/reset`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async resetAll() {
        try {
            const response = await api.post('/settings/reset-all')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getPermissions() {
        try {
            const response = await api.get('/settings/permissions')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getHrManagers() {
        try {
            const response = await api.get('/settings/hr-managers')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async setHrManagers(entries) {
        try {
            const response = await api.put('/settings/hr-managers', { entries })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },
}
