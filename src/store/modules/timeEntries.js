import TimeEntryService from '../../services/TimeEntryService.js'

const state = {
    timeEntries: [],
    selectedMonth: {
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1,
    },
    loading: false,
    error: null,
}

const getters = {
    timeEntries: (state) => state.timeEntries,
    selectedMonth: (state) => state.selectedMonth,
    loading: (state) => state.loading,
    error: (state) => state.error,
    getEntryById: (state) => (id) => state.timeEntries.find((e) => e.id === id),
    entriesByDate: (state) => {
        const byDate = {}
        state.timeEntries.forEach((entry) => {
            if (!byDate[entry.date]) {
                byDate[entry.date] = []
            }
            byDate[entry.date].push(entry)
        })
        return byDate
    },
    totalWorkMinutes: (state) => {
        return state.timeEntries.reduce((sum, entry) => sum + entry.workMinutes, 0)
    },
    draftEntries: (state) => {
        return state.timeEntries.filter((e) => e.status === 'draft' || e.status === 'rejected')
    },
    submittedEntries: (state) => {
        return state.timeEntries.filter((e) => e.status === 'submitted')
    },
    hasSubmittableEntries: (state, getters) => {
        return getters.draftEntries.length > 0
    },
    hasApprovableEntries: (state, getters) => {
        return getters.submittedEntries.length > 0
    },
    allEntriesSubmitted: (state) => {
        return state.timeEntries.length > 0 && state.timeEntries.every((e) => e.status !== 'draft' && e.status !== 'rejected')
    },
}

const mutations = {
    SET_TIME_ENTRIES(state, entries) {
        state.timeEntries = entries
    },
    SET_SELECTED_MONTH(state, { year, month }) {
        state.selectedMonth = { year, month }
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    ADD_TIME_ENTRY(state, entry) {
        state.timeEntries.push(entry)
    },
    UPDATE_TIME_ENTRY(state, entry) {
        const index = state.timeEntries.findIndex((e) => e.id === entry.id)
        if (index !== -1) {
            state.timeEntries.splice(index, 1, entry)
        }
    },
    REMOVE_TIME_ENTRY(state, id) {
        state.timeEntries = state.timeEntries.filter((e) => e.id !== id)
    },
}

const actions = {
    async fetchTimeEntries({ commit, state, rootGetters }) {
        const employeeId = rootGetters['permissions/employeeId']
        if (!employeeId) return

        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const { year, month } = state.selectedMonth
            const entries = await TimeEntryService.getByEmployee(employeeId, year, month)
            commit('SET_TIME_ENTRIES', entries)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    setSelectedMonth({ commit, dispatch }, { year, month }) {
        commit('SET_SELECTED_MONTH', { year, month })
        dispatch('fetchTimeEntries')
    },

    async createTimeEntry({ commit, rootGetters }, data) {
        const employeeId = rootGetters['permissions/employeeId']
        const entry = await TimeEntryService.create({ ...data, employeeId })
        commit('ADD_TIME_ENTRY', entry)
        return entry
    },

    async updateTimeEntry({ commit }, { id, data }) {
        const entry = await TimeEntryService.update(id, data)
        commit('UPDATE_TIME_ENTRY', entry)
        return entry
    },

    async deleteTimeEntry({ commit }, id) {
        await TimeEntryService.delete(id)
        commit('REMOVE_TIME_ENTRY', id)
    },

    async submitTimeEntry({ commit }, id) {
        const entry = await TimeEntryService.submit(id)
        commit('UPDATE_TIME_ENTRY', entry)
        return entry
    },

    async approveTimeEntry({ commit }, id) {
        const entry = await TimeEntryService.approve(id)
        commit('UPDATE_TIME_ENTRY', entry)
        return entry
    },

    async rejectTimeEntry({ commit }, id) {
        const entry = await TimeEntryService.reject(id)
        commit('UPDATE_TIME_ENTRY', entry)
        return entry
    },

    async suggestBreak(_, { startTime, endTime }) {
        return await TimeEntryService.suggestBreak(startTime, endTime)
    },

    async submitMonth({ dispatch, state, rootGetters }) {
        const employeeId = rootGetters['permissions/employeeId']
        const { year, month } = state.selectedMonth
        const result = await TimeEntryService.submitMonth(employeeId, year, month)
        // Reload entries to get updated status
        await dispatch('fetchTimeEntries')
        return result
    },

    async approveMonth({ dispatch, state }, employeeId) {
        const { year, month } = state.selectedMonth
        const result = await TimeEntryService.approveMonth(employeeId, year, month)
        // Reload entries to get updated status
        await dispatch('fetchTimeEntries')
        return result
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
