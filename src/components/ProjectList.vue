<template>
    <div class="project-list">
        <table v-if="projects.length > 0" class="projects-table">
            <thead>
                <tr>
                    <th class="color-col"></th>
                    <th>{{ t('worktime', 'Name') }}</th>
                    <th>{{ t('worktime', 'Projektcode') }}</th>
                    <th>{{ t('worktime', 'Status') }}</th>
                    <th class="actions-col">{{ t('worktime', 'Aktionen') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="project in projects" :key="project.id">
                    <td class="color-col">
                        <span v-if="project.color"
                            class="color-dot"
                            :style="{ backgroundColor: project.color }" />
                    </td>
                    <td>
                        <strong>{{ project.name }}</strong>
                        <div v-if="project.description" class="project-description">{{ project.description }}</div>
                    </td>
                    <td>{{ project.code || '-' }}</td>
                    <td>
                        <span :class="['status-badge', project.isActive ? 'active' : 'inactive']">
                            {{ project.isActive ? t('worktime', 'Aktiv') : t('worktime', 'Inaktiv') }}
                        </span>
                    </td>
                    <td class="actions-col">
                        <NcButton type="tertiary"
                            :aria-label="t('worktime', 'Bearbeiten')"
                            @click="$emit('edit', project)">
                            <template #icon>
                                <Pencil :size="20" />
                            </template>
                        </NcButton>
                        <NcButton type="tertiary"
                            :aria-label="t('worktime', 'Löschen')"
                            @click="confirmDelete(project)">
                            <template #icon>
                                <Close :size="20" />
                            </template>
                        </NcButton>
                    </td>
                </tr>
            </tbody>
        </table>

        <NcEmptyContent v-else
            :name="t('worktime', 'Keine Projekte')"
            :description="t('worktime', 'Lege Projekte an, um projektbezogene Zeiterfassung zu nutzen.')">
            <template #icon>
                <FolderOutline :size="64" />
            </template>
        </NcEmptyContent>

        <NcDialog v-if="showDeleteDialog"
            :name="t('worktime', 'Projekt löschen?')"
            @close="showDeleteDialog = false">
            <p>{{ t('worktime', 'Möchtest du das Projekt "{name}" wirklich löschen?', { name: projectToDelete?.name }) }}</p>
            <p class="delete-warning">{{ t('worktime', 'Diese Aktion kann nicht rückgängig gemacht werden.') }}</p>
            <template #actions>
                <NcButton type="tertiary" @click="showDeleteDialog = false">
                    {{ t('worktime', 'Abbrechen') }}
                </NcButton>
                <NcButton type="error" @click="deleteConfirmed">
                    {{ t('worktime', 'Löschen') }}
                </NcButton>
            </template>
        </NcDialog>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcDialog from '@nextcloud/vue/dist/Components/NcDialog.js'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import Close from 'vue-material-design-icons/Close.vue'
import FolderOutline from 'vue-material-design-icons/FolderOutline.vue'

export default {
    name: 'ProjectList',
    components: {
        NcButton,
        NcEmptyContent,
        NcDialog,
        Pencil,
        Close,
        FolderOutline,
    },
    props: {
        projects: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            showDeleteDialog: false,
            projectToDelete: null,
        }
    },
    methods: {
        confirmDelete(project) {
            this.projectToDelete = project
            this.showDeleteDialog = true
        },
        deleteConfirmed() {
            this.$emit('delete', this.projectToDelete)
            this.showDeleteDialog = false
            this.projectToDelete = null
        },
    },
}
</script>

<style scoped>
.project-list {
    margin-top: 16px;
}

.projects-table {
    width: 100%;
    border-collapse: collapse;
}

.projects-table th,
.projects-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.projects-table th {
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
}

.projects-table tbody tr:hover {
    background: var(--color-background-hover);
}

.color-col {
    width: 40px;
    text-align: center;
}

.color-dot {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 50%;
    border: 1px solid var(--color-border);
}

.project-description {
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

th.actions-col {
    width: 6.5rem;
    text-align: center;
}

td.actions-col {
    display: flex;
    justify-content: center;
    gap: 4px;
}

.status-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.85em;
}

.status-badge.active {
    background: var(--wt-vacation, #4a9d63);
    color: white;
}

.status-badge.inactive {
    background: var(--color-background-dark);
    color: var(--color-text-maxcontrast);
}

.billable-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.85em;
}

.billable-badge.yes {
    background: var(--color-primary-element, #1565c0);
    color: var(--color-primary-element-text, white);
}

.billable-badge.no {
    background: var(--color-background-dark);
    color: var(--color-text-maxcontrast);
}

.delete-warning {
    color: var(--color-error-text);
    font-size: 0.9em;
}
</style>
