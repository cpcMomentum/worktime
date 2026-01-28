import api, { handleApiError } from './api.js'
import { generateUrl } from '@nextcloud/router'

export default {
    async getMonthly(employeeId, year, month) {
        try {
            const response = await api.get('/reports/monthly', {
                params: { employeeId, year, month },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getTeam(year, month) {
        try {
            const response = await api.get('/reports/team', {
                params: { year, month },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getOvertime(employeeId, year) {
        try {
            const response = await api.get('/reports/overtime', {
                params: { employeeId, year },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    getPdfUrl(employeeId, year, month) {
        return generateUrl('/apps/worktime/api/reports/pdf') +
            `?employeeId=${employeeId}&year=${year}&month=${month}`
    },

    downloadPdf(employeeId, year, month) {
        const url = this.getPdfUrl(employeeId, year, month)
        window.open(url, '_blank')
    },
}
