import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import TimeEntryService from '../services/TimeEntryService.js'
import { usePermissionsStore } from './permissions.ts'
import { errorMessage, replaceById, splitDeletePayload, type DeletePayload, type SelectedMonth, type TimeEntry } from './types.ts'

export const useTimeEntriesStore = defineStore('timeEntries', () => {
	const timeEntries = ref<TimeEntry[]>([])
	const selectedMonth = ref<SelectedMonth>({
		year: new Date().getFullYear(),
		month: new Date().getMonth() + 1,
	})
	const loading = ref(false)
	const error = ref<string | null>(null)

	const entriesByDate = computed(() => {
		const byDate: Record<string, TimeEntry[]> = {}
		timeEntries.value.forEach((entry) => {
			if (!byDate[entry.date]) {
				byDate[entry.date] = []
			}
			byDate[entry.date].push(entry)
		})
		return byDate
	})
	const totalWorkMinutes = computed(() => timeEntries.value.reduce((sum, entry) => sum + entry.workMinutes, 0))
	const draftEntries = computed(() => timeEntries.value.filter((e) => e.status === 'draft' || e.status === 'rejected'))
	const submittedEntries = computed(() => timeEntries.value.filter((e) => e.status === 'submitted'))
	const hasSubmittableEntries = computed(() => draftEntries.value.length > 0)
	const hasApprovableEntries = computed(() => submittedEntries.value.length > 0)
	const allEntriesSubmitted = computed(() => timeEntries.value.length > 0
		&& timeEntries.value.every((e) => e.status !== 'draft' && e.status !== 'rejected'))

	function getEntryById(id: number): TimeEntry | undefined {
		return timeEntries.value.find((e) => e.id === id)
	}

	async function fetchTimeEntries(): Promise<void> {
		const employeeId = usePermissionsStore().activeEmployeeId
		if (!employeeId) {
			return
		}
		loading.value = true
		error.value = null
		try {
			const { year, month } = selectedMonth.value
			timeEntries.value = await TimeEntryService.getByEmployee(employeeId, year, month)
		} catch (e) {
			error.value = errorMessage(e)
		} finally {
			loading.value = false
		}
	}

	function setSelectedMonth({ year, month }: SelectedMonth): void {
		selectedMonth.value = { year, month }
		fetchTimeEntries()
	}

	async function createTimeEntry(data: Record<string, unknown>): Promise<TimeEntry> {
		const employeeId = usePermissionsStore().activeEmployeeId
		const entry: TimeEntry = await TimeEntryService.create({ ...data, employeeId })
		timeEntries.value.push(entry)
		return entry
	}

	async function updateTimeEntry({ id, data }: { id: number, data: unknown }): Promise<TimeEntry> {
		const entry: TimeEntry = await TimeEntryService.update(id, data)
		replaceById(timeEntries.value, entry)
		return entry
	}

	async function deleteTimeEntry(payload: number | DeletePayload): Promise<void> {
		const { id, reason } = splitDeletePayload(payload)
		await TimeEntryService.delete(id, reason)
		timeEntries.value = timeEntries.value.filter((e) => e.id !== id)
	}

	async function submitTimeEntry(id: number): Promise<TimeEntry> {
		const entry: TimeEntry = await TimeEntryService.submit(id)
		replaceById(timeEntries.value, entry)
		return entry
	}

	async function approveTimeEntry(id: number): Promise<TimeEntry> {
		const entry: TimeEntry = await TimeEntryService.approve(id)
		replaceById(timeEntries.value, entry)
		return entry
	}

	async function rejectTimeEntry(id: number): Promise<TimeEntry> {
		const entry: TimeEntry = await TimeEntryService.reject(id)
		replaceById(timeEntries.value, entry)
		return entry
	}

	async function suggestBreak({ startTime, endTime }: { startTime: string, endTime: string }): Promise<unknown> {
		return await TimeEntryService.suggestBreak(startTime, endTime)
	}

	async function submitMonth(): Promise<unknown> {
		const employeeId = usePermissionsStore().activeEmployeeId
		const { year, month } = selectedMonth.value
		const result = await TimeEntryService.submitMonth(employeeId, year, month)
		await fetchTimeEntries()
		return result
	}

	async function approveMonth(employeeId: number): Promise<unknown> {
		const { year, month } = selectedMonth.value
		const result = await TimeEntryService.approveMonth(employeeId, year, month)
		await fetchTimeEntries()
		return result
	}

	return {
		timeEntries,
		selectedMonth,
		loading,
		error,
		entriesByDate,
		totalWorkMinutes,
		draftEntries,
		submittedEntries,
		hasSubmittableEntries,
		hasApprovableEntries,
		allEntriesSubmitted,
		getEntryById,
		fetchTimeEntries,
		setSelectedMonth,
		createTimeEntry,
		updateTimeEntry,
		deleteTimeEntry,
		submitTimeEntry,
		approveTimeEntry,
		rejectTimeEntry,
		suggestBreak,
		submitMonth,
		approveMonth,
	}
})
