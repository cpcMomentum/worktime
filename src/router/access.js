/**
 * Single source of truth for per-route access.
 *
 * Both the router guard (src/router/index.js) and the App.vue navigation derive
 * from this module. That prevents the 0.12.0 "tote Tabs" class of bug: a nav tab
 * can never be visible-but-blocked, because nav visibility is defined as
 * `canAccess(name) && <ux flag>` — so `isNavVisible ⟹ canAccess` by construction.
 *
 * The role × route matrix is locked down in tests/frontend/access.spec.js.
 */

/**
 * Guard truth: may this permission profile open the route at all?
 * Mirrors the backend data scoping — the frontend only gates navigation.
 */
export const accessRules = {
	// Universal, loop-safe fallback. Stays ungated on purpose.
	tracking: () => true,
	absences: (p) => !!p.employeeId,
	// Gemeinsamer Reiter: jeder Mitarbeiter sieht das Team; zusaetzlich Admin/HR
	// auch ohne eigenes Mitarbeiterprofil (GF/HR ohne WorkTime-Konto). Daten-
	// Scoping im Backend (getTeamMembers) — Admin/HR alle, Vorgesetzte ihr Team,
	// MA self + geteilte. (#357, #604)
	team: (p) => !!(p.employeeId || p.isAdmin || p.isHrManager),
	// Vorgesetzte (canApprove) genehmigen ihr Team — nicht nur Admin/HR. (#357)
	approvals: (p) => !!(p.canApprove || p.isAdmin || p.isHrManager),
	evaluation: (p) => !!(p.isAdmin || p.isHrManager),
	'my-settings': (p) => !!p.employeeId,
	// Admin (canManageSettings) ODER HR (canManageEmployees); Admin-only-Sektionen
	// bleiben in der View per v-if gegated. (#394)
	settings: (p) => !!(p.canManageSettings || p.canManageEmployees),
	audit: (p) => !!(p.isAdmin || p.isHrManager),
}

/**
 * May the given role open the route? Unknown routes (redirects, fallbacks) are
 * always allowed — they carry no guarded view.
 *
 * @param {string} routeName route `name`
 * @param {object} perms permission profile (store getter permissions/permissions)
 * @return {boolean}
 */
export function canAccess(routeName, perms) {
	const rule = accessRules[routeName]
	return rule ? !!rule(perms) : true
}

/**
 * Extra UX gating that may HIDE an otherwise-accessible tab. It can only narrow,
 * never widen — `isNavVisible` always AND-combines it with `canAccess`, so a
 * blocked route can never become a visible tab.
 */
const navUx = {
	// Zeiterfassung ist universell erreichbar, der Tab aber nur fuer Mitarbeiter.
	tracking: (p) => !!p.isEmployee,
	// Team-Tab nur zeigen, wenn es ueberhaupt andere Mitarbeiter gibt.
	team: (p) => !!p.hasEmployees,
	// Genehmigungs-Tab nur fuer aktive Genehmiger mit Team (Admin/HR ohne
	// Genehmiger-Rolle koennen die Seite erreichen, brauchen aber keinen Tab).
	approvals: (p) => !!(p.canApprove && p.hasEmployees),
}

/**
 * Should the navigation show a tab for this route for the given role?
 *
 * @param {string} routeName route `name`
 * @param {object} perms permission profile
 * @return {boolean}
 */
export function isNavVisible(routeName, perms) {
	if (!canAccess(routeName, perms)) {
		return false
	}
	const ux = navUx[routeName]
	return ux ? !!ux(perms) : true
}
