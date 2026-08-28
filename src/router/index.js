import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/index.js'
import { canAccess } from './access.js'

import TimeTrackingView from '../views/TimeTrackingView.vue'
import AbsenceView from '../views/AbsenceView.vue'
import TeamView from '../views/TeamView.vue'
import ApprovalOverviewView from '../views/ApprovalOverviewView.vue'
import MySettingsView from '../views/MySettingsView.vue'
import SettingsView from '../views/SettingsView.vue'
import AuditView from '../views/AuditView.vue'
import EvaluationView from '../views/EvaluationView.vue'

Vue.use(VueRouter)

// Rollenabhaengiges Default-Ziel (#394): Mitarbeiter -> Zeiterfassung, sonst die
// erste fuer die Rolle sinnvolle Ansicht. Verhindert, dass ein Approver/HR ohne
// eigenes Mitarbeiter-Profil per Default-Redirect auf einer leeren Zeiterfassung
// landet. /tracking bleibt bewusst ungeguardet (universeller, loop-sicherer
// Fallback fuer den degenerierten Fall ohne jede Rolle).
const defaultRoute = () => {
	const perms = store.getters['permissions/permissions']
	if (perms.employeeId) return '/tracking'
	if (perms.canManageSettings || perms.canManageEmployees) return '/settings'
	if (perms.canApprove || perms.isAdmin || perms.isHrManager) return '/approvals'
	return '/tracking'
}

const routes = [
	{
		path: '/',
		redirect: defaultRoute,
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
		// Gemeinsamer Reiter: jeder Mitarbeiter sieht das Team (Daten-Scoping
		// im Backend — Admin/HR alle, Vorgesetzte ihr Team, MA self + geteilte).
		component: TeamView,
	},
	{
		path: '/approvals',
		name: 'approvals',
		component: ApprovalOverviewView,
	},
	{
		path: '/evaluation',
		name: 'evaluation',
		component: EvaluationView,
	},
	{
		path: '/my-settings',
		name: 'my-settings',
		component: MySettingsView,
	},
	{
		path: '/settings',
		name: 'settings',
		component: SettingsView,
	},
	{
		path: '/audit',
		name: 'audit',
		component: AuditView,
	},
	// Fallback: unbekannte Routes -> Zeiterfassung
	{
		path: '*',
		redirect: defaultRoute,
	},
]

const router = new VueRouter({
	mode: 'hash',
	base: '/apps/worktime/',
	routes,
})

// Route guard: single source of truth in access.js — the same rules feed the
// App.vue navigation, so a tab can never be visible-but-blocked (0.12.0 #357).
router.beforeEach((to, from, next) => {
	// #631: gate on the correction-aware profile so an HR/admin correcting an
	// employee can reach the correctable routes even without an own profile.
	const perms = store.getters['permissions/accessProfile']
	if (!canAccess(to.name, perms)) {
		return next('/')
	}
	next()
})

// View-Persistierung bei Navigation
router.afterEach((to) => {
	localStorage.setItem('worktime_last_view', to.path)
})

export default router
