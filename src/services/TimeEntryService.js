import api, { handleApiError } from './api.js'

export default {
    async getByEmployee(employeeId, year = null, month = null) {
        try {
            const params = { employeeId }
            if (year) params.year = year
            if (month) params.month = month
            const response = await api.get('/time-entries', { params })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async get(id) {
        try {
            const response = await api.get(`/time-entries/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async create(data) {
        try {
            const response = await api.post('/time-entries', data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async update(id, data) {
        try {
            const response = await api.put(`/time-entries/${id}`, data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async delete(id) {
        try {
            await api.delete(`/time-entries/${id}`)
        } catch (error) {
            handleApiError(error)
        }
    },

    async submit(id) {
        try {
            const response = await api.post(`/time-entries/${id}/submit`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async approve(id) {
        try {
            const response = await api.post(`/time-entries/${id}/approve`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async reject(id) {
        try {
            const response = await api.post(`/time-entries/${id}/reject`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async suggestBreak(startTime, endTime) {
        try {
            const response = await api.post('/time-entries/suggest-break', { startTime, endTime })
            return response.data.breakMinutes
        } catch (error) {
            handleApiError(error)
        }
    },

    async getMonthlyStats(employeeId, year, month) {
        try {
            const response = await api.get('/time-entries/stats/monthly', {
                params: { employeeId, year, month },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },
}
