<template>
    <div class="department-list">
        <table v-if="departments.length > 0" class="departments-table">
            <thead>
                <tr>
                    <th>{{ t('worktime', 'Name') }}</th>
                    <th>{{ t('worktime', 'Status') }}</th>
                    <th class="actions-col">{{ t('worktime', 'Aktionen') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="department in departments" :key="department.id">
                    <td>
                        <strong>{{ department.name }}</strong>
                    </td>
                    <td>
                        <span :class="['status-badge', department.isActive ? 'active' : 'inactive']">
                            {{ department.isActive ? t('worktime', 'Aktiv') : t('worktime', 'Inaktiv') }}
                        </span>
                    </td>
                    <td class="actions-col">
                        <NcButton type="tertiary"
                            :aria-label="t('worktime', 'Bearbeiten')"
                            @click="$emit('edit', department)">
                            <template #icon>
                                <Pencil :size="20" />
                            </template>
                        </NcButton>
                        <NcButton type="tertiary"
                            :aria-label="t('worktime', 'Löschen')"
                            @click="confirmDelete(department)">
                            <template #icon>
                                <Close :size="20" />
                            </template>
                        </NcButton>
                    </td>
                </tr>
            </tbody>
        </table>

        <NcEmptyContent v-else
            :name="t('worktime', 'Keine Abteilungen')"
            :description="t('worktime', 'Legen Sie Abteilungen an, um Mitarbeitende Organisationseinheiten zuzuordnen.')">
            <template #icon>
                <OfficeBuilding :size="64" />
            </template>
        </NcEmptyContent>

        <NcDialog v-if="showDeleteDialog"
            :name="t('worktime', 'Abteilung löschen?')"
            @close="showDeleteDialog = false">
            <p>{{ t('worktime', 'Möchten Sie die Abteilung "{name}" wirklich löschen?', { name: departmentToDelete?.name }) }}</p>
            <p v-if="memberCount > 0" class="delete-warning">
                {{ n('worktime',
                    '%n Mitarbeitende/r wird dieser Abteilung entzogen. Die Zeiterfassung bleibt unberührt.',
                    '%n Mitarbeitende werden dieser Abteilung entzogen. Die Zeiterfassung bleibt unberührt.',
                    memberCount) }}
            </p>
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
import OfficeBuilding from 'vue-material-design-icons/OfficeBuilding.vue'
import DepartmentService from '../services/DepartmentService.js'

export default {
    name: 'DepartmentList',
    components: {
        NcButton,
        NcEmptyContent,
        NcDialog,
        Pencil,
        Close,
        OfficeBuilding,
    },
    props: {
        departments: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            showDeleteDialog: false,
            departmentToDelete: null,
            memberCount: 0,
        }
    },
    methods: {
        async confirmDelete(department) {
            this.departmentToDelete = department
            this.memberCount = 0
            this.showDeleteDialog = true
            try {
                const impact = await DepartmentService.deletionImpact(department.id)
                this.memberCount = impact?.memberCount ?? 0
            } catch (error) {
                // Impact is advisory; the confirmation still works without it.
                this.memberCount = 0
            }
        },
        deleteConfirmed() {
            this.$emit('delete', this.departmentToDelete)
            this.showDeleteDialog = false
            this.departmentToDelete = null
            this.memberCount = 0
        },
    },
}
</script>

<style scoped>
.department-list {
    margin-top: 16px;
}

.departments-table {
    width: 100%;
    border-collapse: collapse;
}

.departments-table th,
.departments-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.departments-table th {
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
}

.departments-table tbody tr:hover {
    background: var(--color-background-hover);
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

.delete-warning {
    color: var(--color-error-text);
    font-size: 0.9em;
}
</style>
