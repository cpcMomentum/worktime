import { defineStore } from 'pinia'
import { ref } from 'vue'
import EmployeeService from '../services/EmployeeService.js'
import { errorMessage, replaceById, type Entity } from './types.ts'

export const useEmployeesStore = defineStore('employees', () => {
	const employees = ref<Entity[]>([])
	const currentEmployee = ref<Entity | null>(null)
	const federalStates = ref<Record<string, string>>({})
	const availableUsers = ref<unknown[]>([])
	const loading = ref(false)
	const error = ref<string | null>(null)

	function getEmployeeById(id: number): Entity | undefined {
		return employees.value.find((e) => e.id === id)
	}

	async function fetchEmployees(): Promise<void> {
		loading.value = true
		error.value = null
		try {
			employees.value = await EmployeeService.getAll()
		} catch (e) {
			error.value = errorMessage(e)
		} finally {
			loading.value = false
		}
	}

	async function fetchCurrentEmployee(): Promise<void> {
		loading.value = true
		error.value = null
		try {
			currentEmployee.value = await EmployeeService.getMe()
		} catch (e) {
			error.value = errorMessage(e)
		} finally {
			loading.value = false
		}
	}

	async function fetchFederalStates(): Promise<void> {
		try {
			federalStates.value = await EmployeeService.getFederalStates()
		} catch (e) {
			console.error('Failed to fetch federal states:', e)
		}
	}

	async function fetchAvailableUsers(): Promise<void> {
		try {
			availableUsers.value = await EmployeeService.getAvailableUsers()
		} catch (e) {
			console.error('Failed to fetch available users:', e)
		}
	}

	async function createEmployee(data: unknown): Promise<Entity> {
		const employee: Entity = await EmployeeService.create(data)
		employees.value.push(employee)
		return employee
	}

	async function updateEmployee({ id, data }: { id: number, data: unknown }): Promise<Entity> {
		const employee: Entity = await EmployeeService.update(id, data)
		replaceById(employees.value, employee)
		if (currentEmployee.value?.id === employee.id) {
			currentEmployee.value = employee
		}
		return employee
	}

	async function deleteEmployee(id: number): Promise<void> {
		await EmployeeService.delete(id)
		employees.value = employees.value.filter((e) => e.id !== id)
	}

	async function updateMyDefaults(data: unknown): Promise<Entity> {
		const employee: Entity = await EmployeeService.updateMyDefaults(data)
		currentEmployee.value = employee
		return employee
	}

	async function updateMyDeputy(deputyId: number | null): Promise<Entity> {
		const employee: Entity = await EmployeeService.updateMyDeputy(deputyId)
		currentEmployee.value = employee
		return employee
	}

	return {
		employees,
		currentEmployee,
		federalStates,
		availableUsers,
		loading,
		error,
		getEmployeeById,
		fetchEmployees,
		fetchCurrentEmployee,
		fetchFederalStates,
		fetchAvailableUsers,
		createEmployee,
		updateEmployee,
		deleteEmployee,
		updateMyDefaults,
		updateMyDeputy,
	}
})
