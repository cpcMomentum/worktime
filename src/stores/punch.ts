import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import TimeEntryService from '../services/TimeEntryService.js'
import type { Punch } from './types.ts'

// Der offene Stempel kommt immer vom Server; die laufende Uhr wird nur clientseitig gerendert
export const usePunchStore = defineStore('punch', () => {
	const activePunch = ref<Punch | null>(null)
	const punchLoading = ref(false)

	const isPunchedIn = computed(() => activePunch.value !== null)
	const isPunchPaused = computed(() => activePunch.value?.isPaused === true)

	async function fetchActivePunch(employeeId: number | null): Promise<void> {
		if (!employeeId) {
			activePunch.value = null
			return
		}
		punchLoading.value = true
		try {
			activePunch.value = (await TimeEntryService.getActivePunch(employeeId)) || null
		} finally {
			punchLoading.value = false
		}
	}

	async function punchIn({ employeeId, projectId = null, description = null }: { employeeId: number, projectId?: number | null, description?: string | null }): Promise<Punch> {
		const punch: Punch = await TimeEntryService.punchIn(employeeId, projectId, description)
		activePunch.value = punch
		return punch
	}

	async function punchPause(employeeId: number): Promise<Punch> {
		const punch: Punch = await TimeEntryService.punchPause(employeeId)
		activePunch.value = punch
		return punch
	}

	async function punchResume(employeeId: number): Promise<Punch> {
		const punch: Punch = await TimeEntryService.punchResume(employeeId)
		activePunch.value = punch
		return punch
	}

	async function punchOut({ employeeId, ...overrides }: { employeeId: number, [key: string]: unknown }): Promise<unknown> {
		const entry = await TimeEntryService.punchOut(employeeId, overrides)
		activePunch.value = null
		return entry
	}

	async function punchDiscard(employeeId: number): Promise<void> {
		await TimeEntryService.punchDiscard(employeeId)
		activePunch.value = null
	}

	return {
		activePunch,
		punchLoading,
		isPunchedIn,
		isPunchPaused,
		fetchActivePunch,
		punchIn,
		punchPause,
		punchResume,
		punchOut,
		punchDiscard,
	}
})
