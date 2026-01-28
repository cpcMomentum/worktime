import ProjectService from '../../services/ProjectService.js'

const state = {
    projects: [],
    loading: false,
    error: null,
}

const getters = {
    projects: (state) => state.projects,
    activeProjects: (state) => state.projects.filter((p) => p.isActive),
    loading: (state) => state.loading,
    error: (state) => state.error,
    getProjectById: (state) => (id) => state.projects.find((p) => p.id === id),
}

const mutations = {
    SET_PROJECTS(state, projects) {
        state.projects = projects
    },
    SET_LOADING(state, loading) {
        state.loading = loading
    },
    SET_ERROR(state, error) {
        state.error = error
    },
    ADD_PROJECT(state, project) {
        state.projects.push(project)
    },
    UPDATE_PROJECT(state, project) {
        const index = state.projects.findIndex((p) => p.id === project.id)
        if (index !== -1) {
            state.projects.splice(index, 1, project)
        }
    },
    REMOVE_PROJECT(state, id) {
        state.projects = state.projects.filter((p) => p.id !== id)
    },
}

const actions = {
    async fetchProjects({ commit }, includeInactive = false) {
        commit('SET_LOADING', true)
        commit('SET_ERROR', null)
        try {
            const projects = includeInactive
                ? await ProjectService.getAll()
                : await ProjectService.getActive()
            commit('SET_PROJECTS', projects)
        } catch (error) {
            commit('SET_ERROR', error.message)
        } finally {
            commit('SET_LOADING', false)
        }
    },

    async createProject({ commit }, data) {
        const project = await ProjectService.create(data)
        commit('ADD_PROJECT', project)
        return project
    },

    async updateProject({ commit }, { id, data }) {
        const project = await ProjectService.update(id, data)
        commit('UPDATE_PROJECT', project)
        return project
    },

    async deleteProject({ commit }, id) {
        await ProjectService.delete(id)
        commit('REMOVE_PROJECT', id)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions,
}
