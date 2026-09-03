import DepartmentService from '../../services/DepartmentService.js'

const state = {
    departments: [],
    loading: false,
    error: null,
}

const getters = {
    departments: (state) => state.departments,
    activeDepartments: (state) => state.departments.filter((d) => d.isActive),
    loading: (state) => state.loading,
    error: (state) => state.error,
    getDepartmentById: (state) => (id) => state.departments.find((d) => d.id === id),
}

const mutations = {
    SET_DEPARTMENTS(state, departments) {
        state.departments = departments
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    ADD_DEPARTMENT(state, department) {
        state.departments.push(department)
    },
    UPDATE_DEPARTMENT(state, department) {
        const index = state.departments.findIndex((d) => d.id === department.id)
        if (index !== -1) {
            state.departments.splice(index, 1, department)
        }
    },
    REMOVE_DEPARTMENT(state, id) {
        state.departments = state.departments.filter((d) => d.id !== id)
    },
}

const actions = {
    async fetchDepartments({ commit }, includeInactive = false) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const departments = includeInactive
                ? await DepartmentService.getAll()
                : await DepartmentService.getActive()
            commit('SET_DEPARTMENTS', departments)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async createDepartment({ commit }, data) {
        const department = await DepartmentService.create(data)
        commit('ADD_DEPARTMENT', department)
        return department
    },

    async updateDepartment({ commit }, { id, data }) {
        const department = await DepartmentService.update(id, data)
        commit('UPDATE_DEPARTMENT', department)
        return department
    },

    async deleteDepartment({ commit }, id) {
        await DepartmentService.delete(id)
        commit('REMOVE_DEPARTMENT', id)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
