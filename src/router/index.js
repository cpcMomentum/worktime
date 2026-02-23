import Vue from 'vue'
import VueRouter from 'vue-router'

import DashboardView from '../views/DashboardView.vue'
import TimeTrackingView from '../views/TimeTrackingView.vue'
import AbsenceView from '../views/AbsenceView.vue'
import MonthlyReportView from '../views/MonthlyReportView.vue'
import TeamView from '../views/TeamView.vue'
import ApprovalOverviewView from '../views/ApprovalOverviewView.vue'
import MySettingsView from '../views/MySettingsView.vue'
import SettingsView from '../views/SettingsView.vue'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		name: 'dashboard',
		component: DashboardView,
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
		path: '/report',
		name: 'report',
		component: MonthlyReportView,
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
	// Fallback: unbekannte Routes -> Dashboard
	{
		path: '*',
		redirect: '/',
	},
]

const router = new VueRouter({
	mode: 'hash',
	base: '/apps/worktime/',
	routes,
})

// View-Persistierung bei Navigation
router.afterEach((to) => {
	localStorage.setItem('worktime_last_view', to.path)
})

export default router
