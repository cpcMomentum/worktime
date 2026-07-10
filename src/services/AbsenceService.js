import api, { handleApiError } from './api.js'

export default {
    async getByEmployee(employeeId, year = null, month = null) {
        try {
            const params = { employeeId }
            if (year) params.year = year
            if (month) params.month = month
            const response = await api.get('/absences', { params })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async get(id) {
        try {
            const response = await api.get(`/absences/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async create(data) {
        try {
            const response = await api.post('/absences', data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async update(id, data) {
        try {
            const response = await api.put(`/absences/${id}`, data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async delete(id, reason = null) {
        try {
            await api.delete(`/absences/${id}`, reason ? { params: { reason } } : undefined)
        } catch (error) {
            handleApiError(error)
        }
    },

    async approve(id) {
        try {
            const response = await api.post(`/absences/${id}/approve`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async reject(id) {
        try {
            const response = await api.post(`/absences/${id}/reject`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async cancel(id) {
        try {
            const response = await api.post(`/absences/${id}/cancel`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getVacationStats(employeeId, year) {
        try {
            const response = await api.get('/absences/vacation-stats', {
                params: { employeeId, year },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getTypes() {
        try {
            const response = await api.get('/absences/types')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getPending() {
        try {
            const response = await api.get('/absences/pending')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getInformational() {
        try {
            const response = await api.get('/absences/informational')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getOverview(year, month) {
        try {
            const response = await api.get('/absences/overview', {
                params: { year, month },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    // #15 Betriebsferien
    async createCompanyVacation(data) {
        try {
            const response = await api.post('/absences/company-vacation', data)
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

    async getCentralAbsences() {
        try {
            const response = await api.get('/absences/central')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async deleteCompanyVacation(startDate, endDate, group = null) {
        try {
            // #15 Stufe 2: bevorzugt per Gruppen-ID (deckt Split-Einträge ab),
            // Zeitraum bleibt als Fallback für Alt-Einträge ohne Gruppe.
            const response = await api.post('/absences/company-vacation/delete', { startDate, endDate, group: group || '' })
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },
}
