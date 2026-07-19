import api, { handleApiError } from './api.js'

export default {
    async getAll() {
        try {
            const response = await api.get('/employees')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async get(id) {
        try {
            const response = await api.get(`/employees/${id}`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getMe() {
        try {
            const response = await api.get('/employees/me')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async create(data) {
        try {
            const response = await api.post('/employees', data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async update(id, data) {
        try {
            const response = await api.put(`/employees/${id}`, data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async delete(id) {
        try {
            await api.delete(`/employees/${id}`)
        } catch (error) {
            handleApiError(error)
        }
    },

    async getTeam() {
        try {
            const response = await api.get('/employees/team')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getFederalStates() {
        try {
            const response = await api.get('/employees/federal-states')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getAvailableUsers() {
        try {
            const response = await api.get('/employees/available-users')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    /**
     * Preview which colleagues are affected when this employee is put to rest
     * (#486): deputy links that get cleared, team members losing a supervisor.
     */
    async getRestingImpact(id) {
        try {
            const response = await api.get(`/employees/${id}/resting-impact`)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async setResting(id, resting, reason = null) {
        try {
            const response = await api.put(`/employees/${id}/resting`, { resting, reason })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async updateMyDefaults(data) {
        try {
            const response = await api.put('/employees/me/defaults', data)
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async updateMyDeputy(deputyId) {
        try {
            const response = await api.put('/employees/me/deputy', { deputyId })
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },

    async getSelectableEmployees() {
        try {
            const response = await api.get('/employees/selectable')
            return response.data
        } catch (error) {
            handleApiError(error)
        }
    },
}
