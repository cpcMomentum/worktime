import SettingsService from '../../services/SettingsService.js'

const state = {
    permissions: {
        isAdmin: false,
        isHrManager: false,
        isSupervisor: false,
        isEmployee: false,
        employeeId: null,
        canManageEmployees: false,
        canManageSettings: false,
        canManageProjects: false,
        canManageHolidays: false,
        canApprove: false,
    },
    loading: false,
    loaded: false,
}

const getters = {
    permissions: (state) => state.permissions,
    isAdmin: (state) => state.permissions.isAdmin,
    isHrManager: (state) => state.permissions.isHrManager,
    isSupervisor: (state) => state.permissions.isSupervisor,
    isEmployee: (state) => state.permissions.isEmployee,
    employeeId: (state) => state.permissions.employeeId,
    canManageEmployees: (state) => state.permissions.canManageEmployees,
    canManageSettings: (state) => state.permissions.canManageSettings,
    canManageProjects: (state) => state.permissions.canManageProjects,
    canManageHolidays: (state) => state.permissions.canManageHolidays,
    canApprove: (state) => state.permissions.canApprove,
    loading: (state) => state.loading,
    loaded: (state) => state.loaded,
}

const mutations = {
    SET_PERMISSIONS(state, permissions) {
        state.permissions = { ...state.permissions, ...permissions }
        state.loaded = true
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
}

const actions = {
    async fetchPermissions({ commit }) {
        commit('SET_LOADING', true)
        try {
            const permissions = await SettingsService.getPermissions()
            commit('SET_PERMISSIONS', permissions)
        } catch (error) {
            console.error('Failed to fetch permissions:', error)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    initFromInitialState({ commit }, permissions) {
        commit('SET_PERMISSIONS', permissions)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
