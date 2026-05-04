import api, { handleApiError } from './api.js'

export default {
    async getByYear(year) {
        try {
            const response = await api.get(`/carryover/${year}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getByEmployeeAndYear(employeeId, year) {
        try {
            const response = await api.get(`/carryover/${year}/${employeeId}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async upsert(employeeId, year, overtimeMinutes, vacationDays, note) {
        try {
            const response = await api.put('/carryover', {
                employeeId,
                year,
                overtimeMinutes,
                vacationDays,
                note,
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },
}
