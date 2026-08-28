import { accessRules, canAccess, isNavVisible } from '../../src/router/access.js'

/**
 * Regression lock for the 0.12.0 "tote Tabs" bug (#357): the navigation must
 * never show a tab that the router guard blocks. 0.12.0 widened the nav but
 * forgot the guards, so employees clicked a visible "Team" tab and got bounced.
 *
 * The invariant `isNavVisible ⟹ canAccess` is asserted across the full role ×
 * route matrix, so any future drift between nav and guard fails CI.
 */

// Permission profiles per role, shaped like the store getter permissions/permissions.
const ROLES = {
	admin: {
		isAdmin: true, isHrManager: false, isSupervisor: false, isEmployee: true,
		employeeId: 1, hasEmployees: true,
		canManageEmployees: true, canManageSettings: true,
		canManageProjects: true, canManageHolidays: true, canApprove: true,
	},
	hrManager: {
		isAdmin: false, isHrManager: true, isSupervisor: false, isEmployee: true,
		employeeId: 2, hasEmployees: true,
		canManageEmployees: true, canManageSettings: false,
		canManageProjects: true, canManageHolidays: true, canApprove: true,
	},
	supervisor: {
		isAdmin: false, isHrManager: false, isSupervisor: true, isEmployee: true,
		employeeId: 3, hasEmployees: true,
		canManageEmployees: false, canManageSettings: false,
		canManageProjects: false, canManageHolidays: false, canApprove: true,
	},
	employee: {
		isAdmin: false, isHrManager: false, isSupervisor: false, isEmployee: true,
		employeeId: 4, hasEmployees: false,
		canManageEmployees: false, canManageSettings: false,
		canManageProjects: false, canManageHolidays: false, canApprove: false,
	},
	// HR manager (or managing director) WITHOUT an own employee record (#604):
	// role comes from group membership, not from wt_employees, so employeeId is
	// null. Must still reach the Team tab — the backend scopes team data by role.
	hrNoProfile: {
		isAdmin: false, isHrManager: true, isSupervisor: false, isEmployee: false,
		employeeId: null, hasEmployees: true,
		canManageEmployees: true, canManageSettings: false,
		canManageProjects: true, canManageHolidays: true, canApprove: true,
	},
	// Same class as hrNoProfile, but Admin without an own record — the fix rule
	// (employeeId || isAdmin || isHrManager) is symmetric, so lock both sides.
	adminNoProfile: {
		isAdmin: true, isHrManager: false, isSupervisor: false, isEmployee: false,
		employeeId: null, hasEmployees: true,
		canManageEmployees: true, canManageSettings: true,
		canManageProjects: true, canManageHolidays: true, canApprove: true,
	},
	// #631: hrNoProfile WHILE correcting an employee. The correction target is
	// merged into the access profile (store getter accessProfile), so the
	// correctable tabs (tracking, absences) must become reachable even though the
	// user has no own profile. my-settings stays own-only (not correctable).
	hrNoProfileCorrecting: {
		isAdmin: false, isHrManager: true, isSupervisor: false, isEmployee: false,
		employeeId: null, hasEmployees: true, targetEmployeeId: 42,
		canManageEmployees: true, canManageSettings: false,
		canManageProjects: true, canManageHolidays: true, canApprove: true,
	},
	// Degenerate: authenticated user with no employee record and no role at all.
	bare: {
		isAdmin: false, isHrManager: false, isSupervisor: false, isEmployee: false,
		employeeId: null, hasEmployees: false,
		canManageEmployees: false, canManageSettings: false,
		canManageProjects: false, canManageHolidays: false, canApprove: false,
	},
}

const ROUTES = Object.keys(accessRules)

describe('route access matrix', () => {
	// The core anti-0.12.0 invariant.
	describe.each(Object.entries(ROLES))('role: %s', (roleName, perms) => {
		it.each(ROUTES)('nav tab "%s" is never visible-but-blocked', (route) => {
			if (isNavVisible(route, perms)) {
				expect(canAccess(route, perms)).toBe(true)
			}
		})
	})

	// Pin the concrete regression: a plain employee can open the Team tab (#357/#392).
	it('employee can access the Team tab (router guard passes, nav hidden when hasEmployees=false)', () => {
		expect(canAccess('team', ROLES.employee)).toBe(true)
	})

	// Pin the concrete #604 regression: an HR manager without an own profile can
	// open and see the Team tab (role-based, not profile-based).
	it('HR manager without own profile can access and see the Team tab (#604)', () => {
		expect(canAccess('team', ROLES.hrNoProfile)).toBe(true)
		expect(isNavVisible('team', ROLES.hrNoProfile)).toBe(true)
	})

	// Symmetric case: Admin without an own profile reaches the Team tab too (#604).
	it('Admin without own profile can access and see the Team tab (#604)', () => {
		expect(canAccess('team', ROLES.adminNoProfile)).toBe(true)
		expect(isNavVisible('team', ROLES.adminNoProfile)).toBe(true)
	})

	// Pin the #631 regression: an HR manager without an own profile, while
	// correcting an employee, can reach AND see the Tracking and Absences tabs —
	// but only while correcting.
	it('HR without own profile can access + see tracking/absences WHILE correcting (#631)', () => {
		for (const route of ['tracking', 'absences']) {
			expect(canAccess(route, ROLES.hrNoProfileCorrecting)).toBe(true)
			expect(isNavVisible(route, ROLES.hrNoProfileCorrecting)).toBe(true)
		}
	})

	it('HR without own profile does NOT see tracking/absences when NOT correcting (#631)', () => {
		expect(canAccess('absences', ROLES.hrNoProfile)).toBe(false)
		expect(isNavVisible('absences', ROLES.hrNoProfile)).toBe(false)
		expect(isNavVisible('tracking', ROLES.hrNoProfile)).toBe(false)
		// my-settings stays own-only even while correcting (#631).
		expect(canAccess('my-settings', ROLES.hrNoProfileCorrecting)).toBe(false)
	})

	// Pin the degenerate fallback: a roleless user is bounced everywhere except
	// the universal /tracking fallback, and sees no tabs.
	it('bare user can only reach tracking', () => {
		expect(canAccess('tracking', ROLES.bare)).toBe(true)
		for (const route of ROUTES.filter((r) => r !== 'tracking')) {
			expect(canAccess(route, ROLES.bare)).toBe(false)
		}
		expect(ROUTES.some((r) => isNavVisible(r, ROLES.bare))).toBe(false)
	})

	// Expected nav visibility per role — a change here must be deliberate.
	it('matches the expected nav-visibility snapshot', () => {
		const snapshot = {}
		for (const [roleName, perms] of Object.entries(ROLES)) {
			snapshot[roleName] = ROUTES.filter((r) => isNavVisible(r, perms))
		}
		expect(snapshot).toEqual({
			admin: ['tracking', 'absences', 'team', 'approvals', 'evaluation', 'my-settings', 'settings', 'audit'],
			hrManager: ['tracking', 'absences', 'team', 'approvals', 'evaluation', 'my-settings', 'settings', 'audit'],
			supervisor: ['tracking', 'absences', 'team', 'approvals', 'my-settings'],
			employee: ['tracking', 'absences', 'my-settings'],
			hrNoProfile: ['team', 'approvals', 'evaluation', 'settings', 'audit'],
			adminNoProfile: ['team', 'approvals', 'evaluation', 'settings', 'audit'],
			// #631: correcting adds tracking + absences (but not my-settings).
			hrNoProfileCorrecting: ['tracking', 'absences', 'team', 'approvals', 'evaluation', 'settings', 'audit'],
			bare: [],
		})
	})
})
