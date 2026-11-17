import { defineStore } from 'pinia'
import { ref } from 'vue'
import WorkScheduleService from '../services/WorkScheduleService.js'
import { errorMessage, replaceById, type WorkSchedule } from './types.ts'

export const useWorkSchedulesStore = defineStore('workSchedules', () => {
	const schedules = ref<WorkSchedule[]>([])
	const loading = ref(false)
	const error = ref<string | null>(null)

	async function fetchSchedules(employeeId: number): Promise<void> {
		loading.value = true
		error.value = null
		try {
			schedules.value = await WorkScheduleService.getAll(employeeId)
		} catch (e) {
			error.value = errorMessage(e)
		} finally {
			loading.value = false
		}
	}

	// Die Antwort traegt neben dem Modell die Kontingentwarnungen; die gehen an den Aufrufer zurueck
	async function createSchedule({ employeeId, data }: { employeeId: number, data: unknown }) {
		const { quotaWarnings = [], ...schedule } = await WorkScheduleService.create(employeeId, data)
		schedules.value.push(schedule as WorkSchedule)
		schedules.value.sort((a, b) => b.validFrom.localeCompare(a.validFrom))
		return { schedule, quotaWarnings }
	}

	async function updateSchedule({ employeeId, id, data }: { employeeId: number, id: number, data: unknown }) {
		const { quotaWarnings = [], ...schedule } = await WorkScheduleService.update(employeeId, id, data)
		replaceById(schedules.value, schedule as WorkSchedule)
		return { schedule, quotaWarnings }
	}

	async function deleteSchedule({ employeeId, id }: { employeeId: number, id: number }) {
		const { quotaWarnings = [] } = await WorkScheduleService.delete(employeeId, id) || {}
		schedules.value = schedules.value.filter((s) => s.id !== id)
		return { quotaWarnings }
	}

	return {
		schedules,
		loading,
		error,
		fetchSchedules,
		createSchedule,
		updateSchedule,
		deleteSchedule,
	}
})
