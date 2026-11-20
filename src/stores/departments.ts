import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import DepartmentService from '../services/DepartmentService.js'
import { errorMessage, replaceById, type Activatable } from './types.ts'

export const useDepartmentsStore = defineStore('departments', () => {
	const departments = ref<Activatable[]>([])
	const loading = ref(false)
	const error = ref<string | null>(null)

	const activeDepartments = computed(() => departments.value.filter((item) => item.isActive))

	function getDepartmentById(id: number): Activatable | undefined {
		return departments.value.find((item) => item.id === id)
	}

	async function fetchDepartments(includeInactive = false): Promise<void> {
		loading.value = true
		error.value = null
		try {
			departments.value = includeInactive
				? await DepartmentService.getAll()
				: await DepartmentService.getActive()
		} catch (e) {
			error.value = errorMessage(e)
		} finally {
			loading.value = false
		}
	}

	async function createDepartment(data: unknown): Promise<Activatable> {
		const item: Activatable = await DepartmentService.create(data)
		departments.value.push(item)
		return item
	}

	async function updateDepartment({ id, data }: { id: number, data: unknown }): Promise<Activatable> {
		const item: Activatable = await DepartmentService.update(id, data)
		replaceById(departments.value, item)
		return item
	}

	async function deleteDepartment(id: number): Promise<void> {
		await DepartmentService.delete(id)
		departments.value = departments.value.filter((item) => item.id !== id)
	}

	return {
		departments,
		loading,
		error,
		activeDepartments,
		getDepartmentById,
		fetchDepartments,
		createDepartment,
		updateDepartment,
		deleteDepartment,
	}
})
