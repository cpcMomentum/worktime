import AbsenceService from '../../services/AbsenceService.js'

const state = {
    absences: [],
    absenceTypes: {},
    vacationStats: null,
    pendingAbsences: [],
    loading: false,
    error: null,
}

const getters = {
    absences: (state) => state.absences,
    absenceTypes: (state) => state.absenceTypes,
    vacationStats: (state) => state.vacationStats,
    pendingAbsences: (state) => state.pendingAbsences,
    loading: (state) => state.loading,
    error: (state) => state.error,
    getAbsenceById: (state) => (id) => state.absences.find((a) => a.id === id),
}

const mutations = {
    SET_ABSENCES(state, absences) {
        state.absences = absences
    },
    SET_ABSENCE_TYPES(state, types) {
        state.absenceTypes = types
    },
    SET_VACATION_STATS(state, stats) {
        state.vacationStats = stats
    },
    SET_PENDING_ABSENCES(state, absences) {
        state.pendingAbsences = absences
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    ADD_ABSENCE(state, absence) {
        state.absences.push(absence)
    },
    UPDATE_ABSENCE(state, absence) {
        const index = state.absences.findIndex((a) => a.id === absence.id)
        if (index !== -1) {
            state.absences.splice(index, 1, absence)
        }
        // Also update in pending if present
        const pendingIndex = state.pendingAbsences.findIndex((a) => a.id === absence.id)
        if (pendingIndex !== -1) {
            if (absence.status === 'pending') {
                state.pendingAbsences.splice(pendingIndex, 1, absence)
            } else {
                state.pendingAbsences.splice(pendingIndex, 1)
            }
        }
    },
    REMOVE_ABSENCE(state, id) {
        state.absences = state.absences.filter((a) => a.id !== id)
        state.pendingAbsences = state.pendingAbsences.filter((a) => a.id !== id)
    },
}

const actions = {
    async fetchAbsences({ commit, rootGetters }, year = null) {
        const employeeId = rootGetters['permissions/employeeId']
        if (!employeeId) return

        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const absences = await AbsenceService.getByEmployee(employeeId, year)
            commit('SET_ABSENCES', absences)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchAbsenceTypes({ commit }) {
        try {
            const types = await AbsenceService.getTypes()
            commit('SET_ABSENCE_TYPES', types)
        } catch (error) {
            console.error('Failed to fetch absence types:', error)
        }
    },

    async fetchVacationStats({ commit, rootGetters }, year = null) {
        const employeeId = rootGetters['permissions/employeeId']
        if (!employeeId) return

        const targetYear = year || new Date().getFullYear()
        try {
            const stats = await AbsenceService.getVacationStats(employeeId, targetYear)
            commit('SET_VACATION_STATS', stats)
        } catch (error) {
            console.error('Failed to fetch vacation stats:', error)
        }
    },

    async fetchPendingAbsences({ commit }) {
        try {
            const absences = await AbsenceService.getPending()
            commit('SET_PENDING_ABSENCES', absences)
        } catch (error) {
            console.error('Failed to fetch pending absences:', error)
        }
    },

    async createAbsence({ commit, rootGetters }, data) {
        const employeeId = rootGetters['permissions/employeeId']
        const absence = await AbsenceService.create({ ...data, employeeId })
        commit('ADD_ABSENCE', absence)
        return absence
    },

    async updateAbsence({ commit }, { id, data }) {
        const absence = await AbsenceService.update(id, data)
        commit('UPDATE_ABSENCE', absence)
        return absence
    },

    async deleteAbsence({ commit }, id) {
        await AbsenceService.delete(id)
        commit('REMOVE_ABSENCE', id)
    },

    async approveAbsence({ commit }, id) {
        const absence = await AbsenceService.approve(id)
        commit('UPDATE_ABSENCE', absence)
        return absence
    },

    async rejectAbsence({ commit }, id) {
        const absence = await AbsenceService.reject(id)
        commit('UPDATE_ABSENCE', absence)
        return absence
    },

    async cancelAbsence({ commit }, id) {
        const absence = await AbsenceService.cancel(id)
        commit('UPDATE_ABSENCE', absence)
        return absence
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
