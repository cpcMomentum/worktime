import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import ProjectService from '../services/ProjectService.js'
import { errorMessage, replaceById, type Activatable } from './types.ts'

export const useProjectsStore = defineStore('projects', () => {
	const projects = ref<Activatable[]>([])
	const loading = ref(false)
	const error = ref<string | null>(null)

	const activeProjects = computed(() => projects.value.filter((item) => item.isActive))

	function getProjectById(id: number): Activatable | undefined {
		return projects.value.find((item) => item.id === id)
	}

	async function fetchProjects(includeInactive = false): Promise<void> {
		loading.value = true
		error.value = null
		try {
			projects.value = includeInactive
				? await ProjectService.getAll()
				: await ProjectService.getActive()
		} catch (e) {
			error.value = errorMessage(e)
		} finally {
			loading.value = false
		}
	}

	async function createProject(data: unknown): Promise<Activatable> {
		const item: Activatable = await ProjectService.create(data)
		projects.value.push(item)
		return item
	}

	async function updateProject({ id, data }: { id: number, data: unknown }): Promise<Activatable> {
		const item: Activatable = await ProjectService.update(id, data)
		replaceById(projects.value, item)
		return item
	}

	async function deleteProject(id: number): Promise<void> {
		await ProjectService.delete(id)
		projects.value = projects.value.filter((item) => item.id !== id)
	}

	return {
		projects,
		loading,
		error,
		activeProjects,
		getProjectById,
		fetchProjects,
		createProject,
		updateProject,
		deleteProject,
	}
})
