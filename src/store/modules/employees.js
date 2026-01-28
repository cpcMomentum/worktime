import EmployeeService from '../../services/EmployeeService.js'

const state = {
    employees: [],
    currentEmployee: null,
    federalStates: {},
    loading: false,
    error: null,
}

const getters = {
    employees: (state) => state.employees,
    currentEmployee: (state) => state.currentEmployee,
    federalStates: (state) => state.federalStates,
    loading: (state) => state.loading,
    error: (state) => state.error,
    getEmployeeById: (state) => (id) => state.employees.find((e) => e.id === id),
}

const mutations = {
    SET_EMPLOYEES(state, employees) {
        state.employees = employees
    },
    SET_CURRENT_EMPLOYEE(state, employee) {
        state.currentEmployee = employee
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
    ADD_EMPLOYEE(state, employee) {
        state.employees.push(employee)
    },
    UPDATE_EMPLOYEE(state, employee) {
        const index = state.employees.findIndex((e) => e.id === employee.id)
        if (index !== -1) {
            state.employees.splice(index, 1, employee)
        }
        if (state.currentEmployee?.id === employee.id) {
            state.currentEmployee = employee
        }
    },
    REMOVE_EMPLOYEE(state, id) {
        state.employees = state.employees.filter((e) => e.id !== id)
    },
}

const actions = {
    async fetchEmployees({ commit }) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const employees = await EmployeeService.getAll()
            commit('SET_EMPLOYEES', employees)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchCurrentEmployee({ commit }) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const employee = await EmployeeService.getMe()
            commit('SET_CURRENT_EMPLOYEE', employee)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async fetchFederalStates({ commit }) {
        try {
            const states = await EmployeeService.getFederalStates()
            commit('SET_FEDERAL_STATES', states)
        } catch (error) {
            console.error('Failed to fetch federal states:', error)
        }
    },

    async createEmployee({ commit }, data) {
        const employee = await EmployeeService.create(data)
        commit('ADD_EMPLOYEE', employee)
        return employee
    },

    async updateEmployee({ commit }, { id, data }) {
        const employee = await EmployeeService.update(id, data)
        commit('UPDATE_EMPLOYEE', employee)
        return employee
    },

    async deleteEmployee({ commit }, id) {
        await EmployeeService.delete(id)
        commit('REMOVE_EMPLOYEE', id)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
