import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

vi.mock('../../src/services/AbsenceService.js', () => ({ default: {
	update: vi.fn(), delete: vi.fn(), getByEmployee: vi.fn(), create: vi.fn(),
} }))
vi.mock('../../src/services/TimeEntryService.js', () => ({ default: {
	getByEmployee: vi.fn(), create: vi.fn(), delete: vi.fn(), update: vi.fn(),
} }))
vi.mock('../../src/services/WorkScheduleService.js', () => ({ default: {
	create: vi.fn(), update: vi.fn(), delete: vi.fn(),
} }))
vi.mock('../../src/services/SettingsService.js', () => ({ default: { getPermissions: vi.fn() } }))

const { default: AbsenceService } = await import('../../src/services/AbsenceService.js')
const { default: TimeEntryService } = await import('../../src/services/TimeEntryService.js')
const { default: WorkScheduleService } = await import('../../src/services/WorkScheduleService.js')
const { useAbsencesStore } = await import('../../src/stores/absences.ts')
const { usePermissionsStore } = await import('../../src/stores/permissions.ts')
const { useTimeEntriesStore } = await import('../../src/stores/timeEntries.ts')
const { useWorkSchedulesStore } = await import('../../src/stores/workSchedules.ts')
const { splitDeletePayload } = await import('../../src/stores/types.ts')

beforeEach(() => {
	setActivePinia(createPinia())
	vi.clearAllMocks()
})

describe('splitDeletePayload', () => {
	it('accepts a bare id', () => {
		expect(splitDeletePayload(7)).toEqual({ id: 7, reason: null })
	})

	it('accepts id with reason', () => {
		expect(splitDeletePayload({ id: 7, reason: 'Korrektur' })).toEqual({ id: 7, reason: 'Korrektur' })
	})

	it('defaults a missing reason to null', () => {
		expect(splitDeletePayload({ id: 7 })).toEqual({ id: 7, reason: null })
	})
})

describe('permissions store', () => {
	it('uses the correction target as active employee and in the access profile', () => {
		const store = usePermissionsStore()
		store.initFromInitialState({ employeeId: 3, isHrManager: true })
		expect(store.activeEmployeeId).toBe(3)
		expect(store.isCorrectionMode).toBe(false)

		store.startCorrection({ employeeId: 9, employeeName: 'Lea' })
		expect(store.activeEmployeeId).toBe(9)
		expect(store.accessProfile.targetEmployeeId).toBe(9)
		expect(store.accessProfile.employeeId).toBe(3)
		expect(store.correctionEmployeeName).toBe('Lea')

		store.endCorrection()
		expect(store.activeEmployeeId).toBe(3)
		expect(store.accessProfile.targetEmployeeId).toBeNull()
	})
})

describe('absences store', () => {
	it('replaces a still pending absence in both lists', async () => {
		const store = useAbsencesStore()
		store.absences = [{ id: 1, status: 'pending', note: 'alt' }]
		store.pendingAbsences = [{ id: 1, status: 'pending', note: 'alt' }]
		AbsenceService.update.mockResolvedValue({ id: 1, status: 'pending', note: 'neu' })

		await store.updateAbsence({ id: 1, data: {} })

		expect(store.absences[0].note).toBe('neu')
		expect(store.pendingAbsences).toHaveLength(1)
		expect(store.pendingAbsences[0].note).toBe('neu')
	})

	it('drops an absence from the pending list once it is no longer pending', async () => {
		const store = useAbsencesStore()
		store.absences = [{ id: 1, status: 'pending' }]
		store.pendingAbsences = [{ id: 1, status: 'pending' }, { id: 2, status: 'pending' }]
		AbsenceService.update.mockResolvedValue({ id: 1, status: 'approved' })

		await store.updateAbsence({ id: 1, data: {} })

		expect(store.absences[0].status).toBe('approved')
		expect(store.pendingAbsences.map((a) => a.id)).toEqual([2])
	})

	it('passes the reason to the service and removes the absence everywhere', async () => {
		const store = useAbsencesStore()
		store.absences = [{ id: 1, status: 'pending' }, { id: 2, status: 'approved' }]
		store.pendingAbsences = [{ id: 1, status: 'pending' }]
		AbsenceService.delete.mockResolvedValue(undefined)

		await store.deleteAbsence({ id: 1, reason: 'Irrtum' })

		expect(AbsenceService.delete).toHaveBeenCalledWith(1, 'Irrtum')
		expect(store.absences.map((a) => a.id)).toEqual([2])
		expect(store.pendingAbsences).toEqual([])
	})

	it('does not load absences without an active employee', async () => {
		await useAbsencesStore().fetchAbsences(2026)
		expect(AbsenceService.getByEmployee).not.toHaveBeenCalled()
	})
})

describe('time entries store', () => {
	it('does not load entries without an active employee', async () => {
		await useTimeEntriesStore().fetchTimeEntries()
		expect(TimeEntryService.getByEmployee).not.toHaveBeenCalled()
	})

	it('loads the selected month for the correction target', async () => {
		const permissions = usePermissionsStore()
		permissions.initFromInitialState({ employeeId: 3 })
		permissions.startCorrection({ employeeId: 9, employeeName: 'Lea' })
		const store = useTimeEntriesStore()
		store.selectedMonth = { year: 2026, month: 10 }
		TimeEntryService.getByEmployee.mockResolvedValue([{ id: 1, date: '2026-10-01', status: 'draft', workMinutes: 60 }])

		await store.fetchTimeEntries()

		expect(TimeEntryService.getByEmployee).toHaveBeenCalledWith(9, 2026, 10)
		expect(store.totalWorkMinutes).toBe(60)
		expect(store.hasSubmittableEntries).toBe(true)
	})

	it('creates entries for the active employee', async () => {
		usePermissionsStore().initFromInitialState({ employeeId: 3 })
		TimeEntryService.create.mockResolvedValue({ id: 5, date: '2026-11-09', status: 'draft', workMinutes: 480 })

		await useTimeEntriesStore().createTimeEntry({ date: '2026-11-09' })

		expect(TimeEntryService.create).toHaveBeenCalledWith({ date: '2026-11-09', employeeId: 3 })
		expect(useTimeEntriesStore().entriesByDate['2026-11-09']).toHaveLength(1)
	})
})

describe('work schedules store', () => {
	it('keeps quota warnings out of the stored schedule and sorts newest first', async () => {
		const store = useWorkSchedulesStore()
		store.schedules = [{ id: 1, validFrom: '2026-01-01' }]
		WorkScheduleService.create.mockResolvedValue({ id: 2, validFrom: '2026-06-01', quotaWarnings: ['zu viel'] })

		const result = await store.createSchedule({ employeeId: 3, data: {} })

		expect(result.quotaWarnings).toEqual(['zu viel'])
		expect(store.schedules.map((s) => s.id)).toEqual([2, 1])
		expect(store.schedules[0]).not.toHaveProperty('quotaWarnings')
	})

	it('returns an empty warning list when the service sends none on delete', async () => {
		const store = useWorkSchedulesStore()
		store.schedules = [{ id: 1, validFrom: '2026-01-01' }]
		WorkScheduleService.delete.mockResolvedValue(undefined)

		const result = await store.deleteSchedule({ employeeId: 3, id: 1 })

		expect(result).toEqual({ quotaWarnings: [] })
		expect(store.schedules).toEqual([])
	})
})
