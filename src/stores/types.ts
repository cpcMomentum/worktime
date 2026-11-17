export interface Entity {
	id: number
	[key: string]: unknown
}

export interface Permissions {
	isAdmin: boolean
	isHrManager: boolean
	isSupervisor: boolean
	isEmployee: boolean
	employeeId: number | null
	hasEmployees: boolean
	canManageEmployees: boolean
	canManageSettings: boolean
	canManageProjects: boolean
	canManageHolidays: boolean
	canApprove: boolean
	punchOnly: boolean
	punchOnlyLicensed: boolean
}

export interface AccessProfile extends Permissions {
	targetEmployeeId: number | null
}

export interface SelectedMonth {
	year: number
	month: number
}

export interface TimeEntry extends Entity {
	date: string
	status: string
	workMinutes: number
}

export interface Absence extends Entity {
	status: string
}

export interface Holiday extends Entity {
	date: string
}

export interface Activatable extends Entity {
	isActive: boolean
}

export interface WorkSchedule extends Entity {
	validFrom: string
}

export interface Punch {
	isPaused?: boolean
	[key: string]: unknown
}

export interface DeletePayload {
	id: number
	reason?: string | null
}

export function errorMessage(error: unknown): string {
	return error instanceof Error ? error.message : String(error)
}

export function replaceById<T extends Entity>(list: T[], item: T): void {
	const index = list.findIndex((e) => e.id === item.id)
	if (index !== -1) {
		list.splice(index, 1, item)
	}
}

export function splitDeletePayload(payload: number | DeletePayload): { id: number, reason: string | null } {
	if (typeof payload === 'object' && payload !== null) {
		return { id: payload.id, reason: payload.reason ?? null }
	}
	return { id: payload, reason: null }
}
