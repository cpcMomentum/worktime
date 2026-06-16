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

    async getTeamYear(year) {
        try {
            const response = await api.get('/reports/team-year', {
                params: { year },
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

    async getAllEmployeesStatus(year, month) {
        try {
            const response = await api.get('/reports/all-status', {
                params: { year, month },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getProjectEvaluation({ year, month, period, billableOnly }) {
        try {
            const response = await api.get('/reports/projects', {
                params: { year, month, period, billableOnly },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getProjectEntries({ year, month, period, billableOnly }) {
        try {
            const response = await api.get('/reports/project-entries', {
                params: { year, month, period, billableOnly },
            })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    projectExportUrl(format, { year, month, period, projectIds = [], employeeIds = [], mode = 'detail' }) {
        const path = format === 'pdf' ? 'projects-pdf' : 'projects-csv'
        const params = new URLSearchParams({ year, month, period, mode })
        if (projectIds.length) params.set('projectIds', projectIds.join(','))
        if (employeeIds.length) params.set('employeeIds', employeeIds.join(','))
        return generateUrl(`/apps/worktime/api/reports/${path}`) + '?' + params.toString()
    },

    downloadProjectExport(format, params) {
        window.open(this.projectExportUrl(format, params), '_blank')
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
