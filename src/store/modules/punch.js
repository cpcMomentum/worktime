import TimeEntryService from '../../services/TimeEntryService.js'

/**
 * Stopwatch state (#585). Holds the single server-authoritative open punch for
 * the current employee; the running timer is rendered client-side from
 * `activePunch.startedAt`, but the truth always comes from the server.
 */
const state = {
    activePunch: null,
    loading: false,
}

const getters = {
    activePunch: (state) => state.activePunch,
    isPunchedIn: (state) => state.activePunch !== null,
    isPunchPaused: (state) => state.activePunch?.isPaused === true,
    punchLoading: (state) => state.loading,
}

const mutations = {
    SET_ACTIVE_PUNCH(state, punch) {
        state.activePunch = punch
    },
    SET_PUNCH_LOADING(state, loading) {
        state.loading = loading
    },
}

const actions = {
    async fetchActivePunch({ commit }, employeeId) {
        if (!employeeId) {
            commit('SET_ACTIVE_PUNCH', null)
            return
        }
        commit('SET_PUNCH_LOADING', true)
        try {
            const punch = await TimeEntryService.getActivePunch(employeeId)
            commit('SET_ACTIVE_PUNCH', punch || null)
        } finally {
            commit('SET_PUNCH_LOADING', false)
        }
    },

    async punchIn({ commit }, { employeeId, projectId = null, description = null }) {
        const punch = await TimeEntryService.punchIn(employeeId, projectId, description)
        commit('SET_ACTIVE_PUNCH', punch)
        return punch
    },

    async punchPause({ commit }, employeeId) {
        const punch = await TimeEntryService.punchPause(employeeId)
        commit('SET_ACTIVE_PUNCH', punch)
        return punch
    },

    async punchResume({ commit }, employeeId) {
        const punch = await TimeEntryService.punchResume(employeeId)
        commit('SET_ACTIVE_PUNCH', punch)
        return punch
    },

    async punchOut({ commit }, { employeeId, ...overrides }) {
        const entry = await TimeEntryService.punchOut(employeeId, overrides)
        // Booked successfully → the punch is consumed server-side.
        commit('SET_ACTIVE_PUNCH', null)
        return entry
    },

    async punchDiscard({ commit }, employeeId) {
        // #613: drop the open punch without booking (stale / multi-day / mistaken).
        await TimeEntryService.punchDiscard(employeeId)
        commit('SET_ACTIVE_PUNCH', null)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
