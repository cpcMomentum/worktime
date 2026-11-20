import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import HolidayService from '../services/HolidayService.js'
import { errorMessage, type Holiday } from './types.ts'

interface YearAndState {
	year: number
	federalState: string
}

export const useHolidaysStore = defineStore('holidays', () => {
	const holidays = ref<Holiday[]>([])
	const federalStates = ref<Record<string, string>>({})
	const loading = ref(false)
	const error = ref<string | null>(null)

	const holidaysByDate = computed(() => {
		const byDate: Record<string, Holiday> = {}
		holidays.value.forEach((holiday) => {
			byDate[holiday.date] = holiday
		})
		return byDate
	})

	function isHoliday(date: string): boolean {
		return holidays.value.some((h) => h.date === date)
	}

	async function fetchHolidays({ year, federalState }: YearAndState): Promise<void> {
		loading.value = true
		error.value = null
		try {
			holidays.value = await HolidayService.getByYearAndState(year, federalState)
		} catch (e) {
			error.value = errorMessage(e)
		} finally {
			loading.value = false
		}
	}

	async function fetchFederalStates(): Promise<void> {
		try {
			federalStates.value = await HolidayService.getFederalStates()
		} catch (e) {
			console.error('Failed to fetch federal states:', e)
		}
	}

	async function generateHolidays({ year, federalState }: YearAndState): Promise<void> {
		loading.value = true
		try {
			await HolidayService.generate(year, federalState)
			await fetchHolidays({ year, federalState })
		} finally {
			loading.value = false
		}
	}

	async function generateAllHolidays(year: number): Promise<unknown> {
		loading.value = true
		try {
			return await HolidayService.generateAll(year)
		} finally {
			loading.value = false
		}
	}

	async function checkHolidaysExist({ year, federalState }: YearAndState): Promise<unknown> {
		return await HolidayService.check(year, federalState)
	}

	return {
		holidays,
		federalStates,
		loading,
		error,
		holidaysByDate,
		isHoliday,
		fetchHolidays,
		fetchFederalStates,
		generateHolidays,
		generateAllHolidays,
		checkHolidaysExist,
	}
})
