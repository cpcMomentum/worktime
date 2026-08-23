import api, { handleApiError } from './api.js'

export default {
    // Cross-month approval inbox of submitted month-ends (#344).
    async getPendingMonths() {
        try {
            const response = await api.get('/time-entries/pending-months')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getApprovedMonths() {
        try {
            const response = await api.get('/time-entries/approved-months')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

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

    async delete(id, reason = null) {
        try {
            await api.delete(`/time-entries/${id}`, reason ? { params: { reason } } : undefined)
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

    // Stopwatch (#585). The running punch is server-authoritative (#584); the
    // client only reads the state and sends punch commands.
    async getActivePunch(employeeId) {
        try {
            const response = await api.get('/time-entries/active', { params: { employeeId } })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async punchIn(employeeId, projectId = null, description = null) {
        try {
            const response = await api.post('/time-entries/punch-in', { employeeId, projectId, description })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async punchPause(employeeId) {
        try {
            const response = await api.post('/time-entries/punch-pause', { employeeId })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async punchResume(employeeId) {
        try {
            const response = await api.post('/time-entries/punch-resume', { employeeId })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async punchOut(employeeId, { breakMinutes = null, projectId = null, description = null, endTime = null, confirm = false } = {}) {
        try {
            const response = await api.post('/time-entries/punch-out', {
                employeeId, breakMinutes, projectId, description, endTime, confirm,
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async submitMonth(employeeId, year, month) {
        try {
            const response = await api.post('/time-entries/submit-month', { employeeId, year, month })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async approveMonth(employeeId, year, month) {
        try {
            const response = await api.post('/time-entries/approve-month', { employeeId, year, month })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async reopenMonth(employeeId, year, month, reason) {
        try {
            const response = await api.post('/time-entries/reopen-month', { employeeId, year, month, reason })
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

    async rejectMonth(employeeId, year, month, reason) {
        try {
            const response = await api.post('/time-entries/reject-month', { employeeId, year, month, reason })
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
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

    async getArchiveStatus() {
        try {
            const response = await api.get('/time-entries/archive-status')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async retryArchive(id) {
        try {
            const response = await api.post(`/time-entries/archive-retry/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },

    async archiveNow(employeeId, year, month) {
        try {
            const response = await api.post('/time-entries/archive-now', { employeeId, year, month })
            return response.data
        } catch (error) {
            handleApiError(error)
            throw error
        }
    },
}
