import SettingsService from '../../services/SettingsService.js'

const state = {
    permissions: {
        isAdmin: false,
        isHrManager: false,
        isSupervisor: false,
        isEmployee: false,
        employeeId: null,
        hasEmployees: false,
        canManageEmployees: false,
        canManageSettings: false,
        canManageProjects: false,
        canManageHolidays: false,
        canApprove: false,
    },
    loading: false,
    loaded: false,
    approvalRequired: true,
    // HR/Admin correction context (#148): when set, the tracking and absence
    // views operate on this employee instead of the logged-in user.
    correction: {
        targetEmployeeId: null,
        employeeName: null,
    },
}

const getters = {
    permissions: (state) => state.permissions,
    approvalRequired: (state) => state.approvalRequired,
    isCorrectionMode: (state) => state.correction.targetEmployeeId !== null,
    correctionEmployeeName: (state) => state.correction.employeeName,
    // The employee whose data the views should load/edit: the correction target
    // when active, otherwise the logged-in user's own employee.
    activeEmployeeId: (state) => state.correction.targetEmployeeId ?? state.permissions.employeeId,
    isAdmin: (state) => state.permissions.isAdmin,
    isHrManager: (state) => state.permissions.isHrManager,
    isSupervisor: (state) => state.permissions.isSupervisor,
    isEmployee: (state) => state.permissions.isEmployee,
    employeeId: (state) => state.permissions.employeeId,
    hasEmployees: (state) => state.permissions.hasEmployees,
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
    SET_APPROVAL_REQUIRED(state, approvalRequired) {
        state.approvalRequired = approvalRequired
    },
    SET_CORRECTION(state, { targetEmployeeId, employeeName }) {
        state.correction = { targetEmployeeId, employeeName }
    },
    CLEAR_CORRECTION(state) {
        state.correction = { targetEmployeeId: null, employeeName: null }
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

    setApprovalRequired({ commit }, approvalRequired) {
        commit('SET_APPROVAL_REQUIRED', approvalRequired)
    },

    startCorrection({ commit }, { employeeId, employeeName }) {
        commit('SET_CORRECTION', { targetEmployeeId: employeeId, employeeName })
    },

    endCorrection({ commit }) {
        commit('CLEAR_CORRECTION')
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
