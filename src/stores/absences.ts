import { defineStore } from 'pinia'
import { ref } from 'vue'
import AbsenceService from '../services/AbsenceService.js'
import { usePermissionsStore } from './permissions.ts'
import { errorMessage, replaceById, splitDeletePayload, type Absence, type DeletePayload } from './types.ts'

export const useAbsencesStore = defineStore('absences', () => {
	const absences = ref<Absence[]>([])
	const absenceTypes = ref<Record<string, unknown>>({})
	const vacationStats = ref<unknown>(null)
	const pendingAbsences = ref<Absence[]>([])
	const loading = ref(false)
	const error = ref<string | null>(null)

	function getAbsenceById(id: number): Absence | undefined {
		return absences.value.find((a) => a.id === id)
	}

	function applyUpdate(absence: Absence): void {
		replaceById(absences.value, absence)
		const pendingIndex = pendingAbsences.value.findIndex((a) => a.id === absence.id)
		if (pendingIndex !== -1) {
			if (absence.status === 'pending') {
				pendingAbsences.value.splice(pendingIndex, 1, absence)
			} else {
				pendingAbsences.value.splice(pendingIndex, 1)
			}
		}
	}

	async function fetchAbsences(year: number | null = null): Promise<void> {
		const employeeId = usePermissionsStore().activeEmployeeId
		if (!employeeId) {
			return
		}
		loading.value = true
		error.value = null
		try {
			absences.value = await AbsenceService.getByEmployee(employeeId, year)
		} catch (e) {
			error.value = errorMessage(e)
		} finally {
			loading.value = false
		}
	}

	async function fetchAbsenceTypes(): Promise<void> {
		try {
			absenceTypes.value = await AbsenceService.getTypes()
		} catch (e) {
			console.error('Failed to fetch absence types:', e)
		}
	}

	async function fetchVacationStats(year: number | null = null): Promise<void> {
		const employeeId = usePermissionsStore().activeEmployeeId
		if (!employeeId) {
			return
		}
		const targetYear = year || new Date().getFullYear()
		try {
			vacationStats.value = await AbsenceService.getVacationStats(employeeId, targetYear)
		} catch (e) {
			console.error('Failed to fetch vacation stats:', e)
		}
	}

	async function fetchPendingAbsences(): Promise<void> {
		try {
			pendingAbsences.value = await AbsenceService.getPending()
		} catch (e) {
			console.error('Failed to fetch pending absences:', e)
		}
	}

	async function createAbsence(data: Record<string, unknown>): Promise<Absence> {
		const employeeId = usePermissionsStore().activeEmployeeId
		const absence: Absence = await AbsenceService.create({ ...data, employeeId })
		absences.value.push(absence)
		return absence
	}

	async function updateAbsence({ id, data }: { id: number, data: unknown }): Promise<Absence> {
		const absence: Absence = await AbsenceService.update(id, data)
		applyUpdate(absence)
		return absence
	}

	async function deleteAbsence(payload: number | DeletePayload): Promise<void> {
		const { id, reason } = splitDeletePayload(payload)
		await AbsenceService.delete(id, reason)
		absences.value = absences.value.filter((a) => a.id !== id)
		pendingAbsences.value = pendingAbsences.value.filter((a) => a.id !== id)
	}

	async function approveAbsence(id: number): Promise<Absence> {
		const absence: Absence = await AbsenceService.approve(id)
		applyUpdate(absence)
		return absence
	}

	async function rejectAbsence(id: number): Promise<Absence> {
		const absence: Absence = await AbsenceService.reject(id)
		applyUpdate(absence)
		return absence
	}

	async function cancelAbsence(id: number): Promise<Absence> {
		const absence: Absence = await AbsenceService.cancel(id)
		applyUpdate(absence)
		return absence
	}

	return {
		absences,
		absenceTypes,
		vacationStats,
		pendingAbsences,
		loading,
		error,
		getAbsenceById,
		fetchAbsences,
		fetchAbsenceTypes,
		fetchVacationStats,
		fetchPendingAbsences,
		createAbsence,
		updateAbsence,
		deleteAbsence,
		approveAbsence,
		rejectAbsence,
		cancelAbsence,
	}
})
