import api, { handleApiError } from './api.js'

export default {
    async getByYearAndState(year, federalState) {
        try {
            const response = await api.get('/holidays', {
                params: { year, federalState },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async get(id) {
        try {
            const response = await api.get(`/holidays/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async generate(year, federalState) {
        try {
            const response = await api.post('/holidays/generate', { year, federalState })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async generateAll(year) {
        try {
            const response = await api.post('/holidays/generate-all', { year })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async check(year, federalState) {
        try {
            const response = await api.get('/holidays/check', {
                params: { year, federalState },
            })
            return response.data.exists
        } catch (error) {
            handleApiError(error)
        }
    },

    async getFederalStates() {
        try {
            const response = await api.get('/holidays/federal-states')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getByYear(year) {
        try {
            const response = await api.get('/holidays', {
                params: { year },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async create(data) {
        try {
            const response = await api.post('/holidays', data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async update(id, data) {
        try {
            const response = await api.put(`/holidays/${id}`, data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async delete(id) {
        try {
            const response = await api.delete(`/holidays/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },
}
