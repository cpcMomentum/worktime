import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import SettingsService from '../services/SettingsService.js'
import type { AccessProfile, Permissions } from './types.ts'

export const usePermissionsStore = defineStore('permissions', () => {
	const permissions = ref<Permissions>({
		isAdmin: false,
		isHrManager: false,
		isSupervisor: false,
		isEmployee: false,
		employeeId: null,
		hasEmployees: false,
		canManageEmployees: false,
		canManageSettings: false,
		canManageProjects: false,
		canManageHolidays: false,
		canApprove: false,
		punchOnly: false,
		punchOnlyLicensed: false,
	})
	const loading = ref(false)
	const loaded = ref(false)
	const approvalRequired = ref(false)
	const requireProject = ref(false)
	const requireDescription = ref(false)
	const hourlySickEnabled = ref(false)
	const emergencyWorkEnabled = ref(false)
	// Korrekturkontext: Zeiterfassung und Abwesenheiten arbeiten dann auf diesem Mitarbeiter
	const correction = ref<{ targetEmployeeId: number | null, employeeName: string | null }>({
		targetEmployeeId: null,
		employeeName: null,
	})

	// Zugriffsprofil samt Korrekturziel, damit HR ohne eigenes Profil die korrigierbaren Reiter erreicht
	const accessProfile = computed<AccessProfile>(() => ({
		...permissions.value,
		targetEmployeeId: correction.value.targetEmployeeId,
	}))
	const isCorrectionMode = computed(() => correction.value.targetEmployeeId !== null)
	const correctionEmployeeName = computed(() => correction.value.employeeName)
	const activeEmployeeId = computed(() => correction.value.targetEmployeeId ?? permissions.value.employeeId)
	const isAdmin = computed(() => permissions.value.isAdmin)
	const isHrManager = computed(() => permissions.value.isHrManager)
	const isSupervisor = computed(() => permissions.value.isSupervisor)
	const isEmployee = computed(() => permissions.value.isEmployee)
	const employeeId = computed(() => permissions.value.employeeId)
	const hasEmployees = computed(() => permissions.value.hasEmployees)
	const canManageEmployees = computed(() => permissions.value.canManageEmployees)
	const canManageSettings = computed(() => permissions.value.canManageSettings)
	const canManageProjects = computed(() => permissions.value.canManageProjects)
	const canManageHolidays = computed(() => permissions.value.canManageHolidays)
	const canApprove = computed(() => permissions.value.canApprove)
	const punchOnly = computed(() => permissions.value.punchOnly)
	const punchOnlyLicensed = computed(() => permissions.value.punchOnlyLicensed)

	function initFromInitialState(initial: Partial<Permissions>): void {
		permissions.value = { ...permissions.value, ...initial }
		loaded.value = true
	}

	async function fetchPermissions(): Promise<void> {
		loading.value = true
		try {
			initFromInitialState(await SettingsService.getPermissions())
		} catch (error) {
			console.error('Failed to fetch permissions:', error)
		} finally {
			loading.value = false
		}
	}

	function setApprovalRequired(value: boolean): void {
		approvalRequired.value = value
	}

	function setRequiredFields(fields: { requireProject: boolean, requireDescription: boolean }): void {
		requireProject.value = fields.requireProject
		requireDescription.value = fields.requireDescription
	}

	function setHourlySickEnabled(value: boolean): void {
		hourlySickEnabled.value = value
	}

	function setEmergencyWorkEnabled(value: boolean): void {
		emergencyWorkEnabled.value = value
	}

	function startCorrection(target: { employeeId: number, employeeName: string }): void {
		correction.value = { targetEmployeeId: target.employeeId, employeeName: target.employeeName }
	}

	function endCorrection(): void {
		correction.value = { targetEmployeeId: null, employeeName: null }
	}

	return {
		permissions,
		loading,
		loaded,
		approvalRequired,
		requireProject,
		requireDescription,
		hourlySickEnabled,
		emergencyWorkEnabled,
		correction,
		accessProfile,
		isCorrectionMode,
		correctionEmployeeName,
		activeEmployeeId,
		isAdmin,
		isHrManager,
		isSupervisor,
		isEmployee,
		employeeId,
		hasEmployees,
		canManageEmployees,
		canManageSettings,
		canManageProjects,
		canManageHolidays,
		canApprove,
		punchOnly,
		punchOnlyLicensed,
		initFromInitialState,
		fetchPermissions,
		setApprovalRequired,
		setRequiredFields,
		setHourlySickEnabled,
		setEmergencyWorkEnabled,
		startCorrection,
		endCorrection,
	}
})
