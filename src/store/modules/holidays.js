import HolidayService from '../../services/HolidayService.js'

const state = {
    holidays: [],
    federalStates: {},
    loading: false,
    error: null,
}

const getters = {
    holidays: (state) => state.holidays,
    federalStates: (state) => state.federalStates,
    loading: (state) => state.loading,
    error: (state) => state.error,
    holidaysByDate: (state) => {
        const byDate = {}
        state.holidays.forEach((holiday) => {
            byDate[holiday.date] = holiday
        })
        return byDate
    },
    isHoliday: (state) => (date) => {
        return state.holidays.some((h) => h.date === date)
    },
}

const mutations = {
    SET_HOLIDAYS(state, holidays) {
        state.holidays = holidays
    },
    SET_FEDERAL_STATES(state, states) {
        state.federalStates = states
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
}

const actions = {
    async fetchHolidays({ commit, rootGetters }, { year, federalState }) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const holidays = await HolidayService.getByYearAndState(year, federalState)
            commit('SET_HOLIDAYS', holidays)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchFederalStates({ commit }) {
        try {
            const states = await HolidayService.getFederalStates()
            commit('SET_FEDERAL_STATES', states)
        } catch (error) {
            console.error('Failed to fetch federal states:', error)
        }
    },

    async generateHolidays({ commit, dispatch }, { year, federalState }) {
        commit('SET_LOADING', true)
        try {
            await HolidayService.generate(year, federalState)
            await dispatch('fetchHolidays', { year, federalState })
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async generateAllHolidays({ commit }, year) {
        commit('SET_LOADING', true)
        try {
            const result = await HolidayService.generateAll(year)
            return result
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async checkHolidaysExist(_, { year, federalState }) {
        return await HolidayService.check(year, federalState)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
