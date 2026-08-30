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
    approvalRequired: false,
    // Company rules for time-entry fields (#329)
    requireProject: false,
    requireDescription: false,
    // #625: hourly sick leave for a single day offered in the absence form.
    hourlySickEnabled: false,
    // #626: emergency work during an approved vacation day offered in the entry form.
    emergencyWorkEnabled: false,
    // HR/Admin correction context (#148): when set, the tracking and absence
    // views operate on this employee instead of the logged-in user.
    correction: {
        targetEmployeeId: null,
        employeeName: null,
    },
}

const getters = {
    permissions: (state) => state.permissions,
    // #631: the profile the access layer (src/router/access.js) gates on — the
    // raw permissions plus the correction target. That makes the correctable
    // tabs (tracking, absences) reachable while correcting an employee, even for
    // an HR/admin without an own profile (employeeId null). Without this the
    // access rules only ever see the user's own (empty) profile.
    accessProfile: (state) => ({
        ...state.permissions,
        targetEmployeeId: state.correction.targetEmployeeId,
    }),
    approvalRequired: (state) => state.approvalRequired,
    requireProject: (state) => state.requireProject,
    requireDescription: (state) => state.requireDescription,
    hourlySickEnabled: (state) => state.hourlySickEnabled,
    emergencyWorkEnabled: (state) => state.emergencyWorkEnabled,
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
    SET_REQUIRED_FIELDS(state, { requireProject, requireDescription }) {
        state.requireProject = requireProject
        state.requireDescription = requireDescription
    },
    SET_HOURLY_SICK_ENABLED(state, hourlySickEnabled) {
        state.hourlySickEnabled = hourlySickEnabled
    },
    SET_EMERGENCY_WORK_ENABLED(state, emergencyWorkEnabled) {
        state.emergencyWorkEnabled = emergencyWorkEnabled
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

    setRequiredFields({ commit }, { requireProject, requireDescription }) {
        commit('SET_REQUIRED_FIELDS', { requireProject, requireDescription })
    },

    setHourlySickEnabled({ commit }, hourlySickEnabled) {
        commit('SET_HOURLY_SICK_ENABLED', hourlySickEnabled)
    },

    setEmergencyWorkEnabled({ commit }, emergencyWorkEnabled) {
        commit('SET_EMERGENCY_WORK_ENABLED', emergencyWorkEnabled)
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
