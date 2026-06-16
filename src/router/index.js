import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'

import TimeTrackingView from '../views/TimeTrackingView.vue'
import AbsenceView from '../views/AbsenceView.vue'
import TeamView from '../views/TeamView.vue'
import ApprovalOverviewView from '../views/ApprovalOverviewView.vue'
import MySettingsView from '../views/MySettingsView.vue'
import SettingsView from '../views/SettingsView.vue'
import AuditView from '../views/AuditView.vue'
import EvaluationView from '../views/EvaluationView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: '/tracking',
	},
	{
		path: '/tracking',
		name: 'tracking',
		component: TimeTrackingView,
	},
	{
		path: '/absences',
		name: 'absences',
		component: AbsenceView,
	},
	{
		// Zusammengeführt in Abwesenheit → Team-Tab
		path: '/absence-overview',
		redirect: '/absences',
	},
	{
		path: '/team',
		name: 'team',
		component: TeamView,
		meta: { requiresApprove: true },
	},
	{
		path: '/approvals',
		name: 'approvals',
		component: ApprovalOverviewView,
		meta: { requiresAdminOrHr: true },
	},
	{
		path: '/evaluation',
		name: 'evaluation',
		component: EvaluationView,
		meta: { requiresAdminOrHr: true },
	},
	{
		path: '/my-settings',
		name: 'my-settings',
		component: MySettingsView,
		meta: { requiresEmployee: true },
	},
	{
		path: '/settings',
		name: 'settings',
		component: SettingsView,
		meta: { requiresSettings: true },
	},
	{
		path: '/audit',
		name: 'audit',
		component: AuditView,
		meta: { requiresAdminOrHr: true },
	},
	// Fallback: unbekannte Routes -> Zeiterfassung
	{
		path: '*',
		redirect: '/tracking',
	},
]

const router = new VueRouter({
	mode: 'hash',
	base: '/apps/worktime/',
	routes,
})

// Route guards: enforce meta permissions
router.beforeEach((to, from, next) => {
	const perms = store.getters['permissions/permissions']

	if (to.meta.requiresSettings && !perms.canManageSettings) {
		return next('/')
	}
	if (to.meta.requiresApprove && !perms.canApprove && !perms.isAdmin && !perms.isHrManager) {
		return next('/')
	}
	if (to.meta.requiresAdminOrHr && !perms.isAdmin && !perms.isHrManager) {
		return next('/')
	}
	if (to.meta.requiresEmployee && !perms.employeeId) {
		return next('/')
	}
	next()
})

// View-Persistierung bei Navigation
router.afterEach((to) => {
	localStorage.setItem('worktime_last_view', to.path)
})

export default router
