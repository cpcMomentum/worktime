import Vue from 'vue'
import Vuex from 'vuex'

import permissions from './modules/permissions.js'
import employees from './modules/employees.js'
import timeEntries from './modules/timeEntries.js'
import absences from './modules/absences.js'
import holidays from './modules/holidays.js'
import projects from './modules/projects.js'

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        permissions,
        employees,
        timeEntries,
        absences,
        holidays,
        projects,
    },
})
