<template>
    <div class="employee-list">
        <table v-if="employees.length > 0" class="employees-table">
            <thead>
                <tr>
                    <th>{{ t('worktime', 'Name') }}</th>
                    <th>{{ t('worktime', 'Personalnr.') }}</th>
                    <th class="text-right">{{ t('worktime', 'Wochenstd.') }}</th>
                    <th class="text-right">{{ t('worktime', 'Urlaubstage') }}</th>
                    <th>{{ t('worktime', 'Bundesland') }}</th>
                    <th>{{ t('worktime', 'Status') }}</th>
                    <th class="actions-col">{{ t('worktime', 'Aktionen') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="employee in employees" :key="employee.id">
                    <td>
                        <strong>{{ employee.fullName }}</strong>
                        <div v-if="employee.email" class="employee-email">{{ employee.email }}</div>
                    </td>
                    <td>{{ employee.personnelNumber || '-' }}</td>
                    <td class="text-right">{{ employee.weeklyHours }}</td>
                    <td class="text-right">{{ employee.vacationDays }}</td>
                    <td>{{ employee.federalStateName }}</td>
                    <td>
                        <span :class="['status-badge', employee.isActive ? 'active' : 'inactive']">
                            {{ employee.isActive ? t('worktime', 'Aktiv') : t('worktime', 'Inaktiv') }}
                        </span>
                    </td>
                    <td class="actions-col">
                        <NcButton type="tertiary"
                            :aria-label="t('worktime', 'Bearbeiten')"
                            @click="$emit('edit', employee)">
                            <template #icon>
                                <Pencil :size="20" />
                            </template>
                        </NcButton>
                        <NcButton type="tertiary"
                            :aria-label="t('worktime', 'Löschen')"
                            @click="confirmDelete(employee)">
                            <template #icon>
                                <Delete :size="20" />
                            </template>
                        </NcButton>
                    </td>
                </tr>
            </tbody>
        </table>

        <NcEmptyContent v-else
            :name="t('worktime', 'Keine Mitarbeiter')"
            :description="t('worktime', 'Legen Sie Mitarbeiter an, um die Zeiterfassung zu nutzen.')">
            <template #icon>
                <AccountGroup :size="64" />
            </template>
        </NcEmptyContent>

        <NcDialog v-if="showDeleteDialog"
            :name="t('worktime', 'Mitarbeiter löschen?')"
            @close="showDeleteDialog = false">
            <p>{{ t('worktime', 'Möchten Sie den Mitarbeiter "{name}" wirklich löschen?', { name: employeeToDelete?.fullName }) }}</p>
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
import Delete from 'vue-material-design-icons/Delete.vue'
import AccountGroup from 'vue-material-design-icons/AccountGroup.vue'

export default {
    name: 'EmployeeList',
    components: {
        NcButton,
        NcEmptyContent,
        NcDialog,
        Pencil,
        Delete,
        AccountGroup,
    },
    props: {
        employees: {
            type: Array,
            required: true,
        },
    },
    data() {
        return {
            showDeleteDialog: false,
            employeeToDelete: null,
        }
    },
    methods: {
        confirmDelete(employee) {
            this.employeeToDelete = employee
            this.showDeleteDialog = true
        },
        deleteConfirmed() {
            this.$emit('delete', this.employeeToDelete)
            this.showDeleteDialog = false
            this.employeeToDelete = null
        },
    },
}
</script>

<style scoped>
.employee-list {
    margin-top: 16px;
}

.employees-table {
    width: 100%;
    border-collapse: collapse;
}

.employees-table th,
.employees-table td {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.employees-table th {
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
}

.employees-table tbody tr:hover {
    background: var(--color-background-hover);
}

.employee-email {
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.text-right {
    text-align: right;
}

.actions-col {
    width: 100px;
    text-align: right;
}

.status-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.85em;
}

.status-badge.active {
    background: #2e7d32;
    color: white;
}

.status-badge.inactive {
    background: var(--color-text-maxcontrast);
    color: white;
}

.delete-warning {
    color: var(--color-error);
    font-size: 0.9em;
}
</style>
