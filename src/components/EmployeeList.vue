<template>
    <div class="employee-list">
        <div v-if="hasDepartments && employees.length > 0" class="list-filter">
            <label for="employeeDeptFilter">{{ t('worktime', 'Abteilung') }}</label>
            <NcSelect id="employeeDeptFilter"
                v-model="selectedFilterDepartment"
                :options="departmentFilterOptions"
                :placeholder="t('worktime', 'Alle Abteilungen')"
                label="label"
                class="dept-filter-select" />
        </div>

        <table v-if="employees.length > 0" class="employees-table">
            <thead>
                <tr>
                    <th>{{ t('worktime', 'Name') }}</th>
                    <th>{{ t('worktime', 'Personalnr.') }}</th>
                    <th class="text-right">{{ t('worktime', 'Wochenstd.') }}</th>
                    <th class="text-right">{{ t('worktime', 'Urlaubstage') }}</th>
                    <th>{{ t('worktime', 'Bundesland') }}</th>
                    <th v-if="hasDepartments">{{ t('worktime', 'Abteilung') }}</th>
                    <th>{{ t('worktime', 'Status') }}</th>
                    <th class="actions-col">{{ t('worktime', 'Aktionen') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="employee in filteredEmployees" :key="employee.id">
                    <td>
                        <strong>{{ employee.fullName }}</strong>
                        <div v-if="employee.email" class="employee-email">{{ employee.email }}</div>
                    </td>
                    <td>{{ employee.personnelNumber || '-' }}</td>
                    <td class="text-right">{{ employee.weeklyHours }}</td>
                    <td class="text-right">{{ employee.vacationDays }}</td>
                    <td>{{ employee.federalStateName }}</td>
                    <td v-if="hasDepartments">{{ departmentName(employee.departmentId) }}</td>
                    <td>
                        <span :class="['status-badge', employee.isActive ? 'active' : 'inactive']">
                            {{ employee.isActive ? t('worktime', 'Aktiv') : t('worktime', 'Ruhend') }}
                        </span>
                        <div v-if="!employee.isActive && employee.lockedReason" class="locked-reason">
                            {{ employee.lockedReason }}
                        </div>
                    </td>
                    <td class="actions-col">
                        <NcButton type="tertiary"
                            :aria-label="t('worktime', 'Korrigieren')"
                            :title="t('worktime', 'Zeiten/Abwesenheiten dieses Mitarbeiters korrigieren')"
                            @click="$emit('correct', employee)">
                            <template #icon>
                                <Wrench :size="20" />
                            </template>
                        </NcButton>
                        <NcButton type="tertiary"
                            :aria-label="employee.isActive ? t('worktime', 'Ruhend setzen') : t('worktime', 'Reaktivieren')"
                            :title="employee.isActive ? t('worktime', 'Mitarbeiter ruhend setzen: keine neue Erfassung mehr, Daten bleiben einsehbar') : t('worktime', 'Mitarbeiter wieder aktiv setzen')"
                            @click="employee.isActive ? confirmResting(employee) : $emit('reactivate', employee)">
                            <template #icon>
                                <SleepIcon v-if="employee.isActive" :size="20" />
                                <SleepOffIcon v-else :size="20" />
                            </template>
                        </NcButton>
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
                                <Close :size="20" />
                            </template>
                        </NcButton>
                    </td>
                </tr>
            </tbody>
        </table>

        <p v-if="employees.length > 0 && filteredEmployees.length === 0" class="no-filter-match">
            {{ t('worktime', 'Keine Mitarbeitenden in dieser Abteilung.') }}
        </p>

        <NcEmptyContent v-if="employees.length === 0"
            :name="t('worktime', 'Keine Mitarbeiter')"
            :description="t('worktime', 'Legen Sie Mitarbeiter an, um die Zeiterfassung zu nutzen.')">
            <template #icon>
                <AccountGroup :size="64" />
            </template>
        </NcEmptyContent>

        <NcDialog v-if="showRestingDialog"
            :name="t('worktime', 'Mitarbeiter ruhend setzen?')"
            @close="closeRestingDialog">
            <p>
                {{ t('worktime', '"{name}" kann dann keine Zeiten und Abwesenheiten mehr erfassen. Bestehende Daten bleiben einsehbar und exportierbar.', { name: employeeToRest?.fullName }) }}
                <InfoIcon>{{ t('worktime', 'Gedacht für Elternzeit, Mutterschutz, Langzeiterkrankung oder Ausscheiden. Der Mitarbeiter bleibt in der Verwaltung sichtbar und sieht seine eigenen Daten weiterhin, kann aber nichts mehr erfassen. Personalverwaltung und Administration können zurückliegende Einträge weiterhin korrigieren. Jederzeit umkehrbar.') }}</InfoIcon>
            </p>

            <NcTextField :value.sync="restingReason"
                maxlength="500"
                :label="t('worktime', 'Grund (optional)')"
                :placeholder="t('worktime', 'z. B. Elternzeit, Langzeiterkrankung, ausgeschieden')" />

            <div class="resting-from">
                <label for="resting-from">{{ t('worktime', 'Ruhend ab') }}</label>
                <input id="resting-from" v-model="restingFrom" type="date" class="resting-from__input">
                <p class="resting-from__hint">{{ t('worktime', 'Ab diesem Tag fällt kein Sollstunden-Zuwachs mehr an. Standard: heute.') }}</p>
            </div>

            <p v-if="impactLoading" class="impact-loading">{{ t('worktime', 'Auswirkungen werden geprüft …') }}</p>

            <div v-if="impact && impact.deputyFor.length > 0" class="impact-block">
                <strong>{{ t('worktime', 'Vertretung wird gestrichen bei:') }}</strong>
                <ul>
                    <li v-for="person in impact.deputyFor" :key="'d' + person.id">{{ person.fullName }}</li>
                </ul>
            </div>

            <div v-if="impact && impact.supervisorOf.length > 0" class="impact-block impact-warning">
                <strong>{{ t('worktime', 'Diese Mitarbeiter haben dann keinen Vorgesetzten mehr:') }}</strong>
                <ul>
                    <li v-for="person in impact.supervisorOf" :key="'s' + person.id">{{ person.fullName }}</li>
                </ul>
                <p>{{ t('worktime', 'Ihre Genehmigungen laufen dann nur noch über Admin oder Personalverwaltung.') }}</p>
            </div>

            <template #actions>
                <NcButton type="tertiary" @click="closeRestingDialog">
                    {{ t('worktime', 'Abbrechen') }}
                </NcButton>
                <NcButton type="primary" @click="restingConfirmed">
                    {{ t('worktime', 'Ruhend setzen') }}
                </NcButton>
            </template>
        </NcDialog>

        <NcDialog v-if="showDeleteDialog"
            :name="t('worktime', 'Mitarbeiter löschen?')"
            @close="closeDeleteDialog">
            <p>{{ t('worktime', 'Möchten Sie den Mitarbeiter "{name}" wirklich löschen?', { name: employeeToDelete?.fullName }) }}</p>

            <p v-if="deleteImpactLoading" class="impact-loading">{{ t('worktime', 'Umfang wird ermittelt …') }}</p>

            <div v-if="deletionRows.length > 0" class="impact-block">
                <strong>{{ t('worktime', 'Mitgelöscht werden:') }}</strong>
                <ul class="deletion-counts">
                    <li v-for="row in deletionRows" :key="row.key">
                        <span>{{ row.label }}</span>
                        <span class="deletion-count">{{ row.count }}</span>
                    </li>
                </ul>
            </div>

            <p v-else-if="deleteImpact && !deleteImpactLoading">
                {{ t('worktime', 'Zu diesem Mitarbeiter sind keine weiteren Daten erfasst.') }}
            </p>

            <div v-if="deleteImpact && deleteImpact.supervisorOf.length > 0" class="impact-block impact-warning">
                <strong>{{ t('worktime', 'Diese Mitarbeiter haben dann keinen Vorgesetzten mehr:') }}</strong>
                <ul>
                    <li v-for="person in deleteImpact.supervisorOf" :key="'ds' + person.id">{{ person.fullName }}</li>
                </ul>
                <p>{{ t('worktime', 'Ihre Genehmigungen laufen dann nur noch über Admin oder Personalverwaltung.') }}</p>
            </div>

            <div v-if="deleteImpact && deleteImpact.deputyFor.length > 0" class="impact-block">
                <strong>{{ t('worktime', 'Vertretung wird gestrichen bei:') }}</strong>
                <ul>
                    <li v-for="person in deleteImpact.deputyFor" :key="'dd' + person.id">{{ person.fullName }}</li>
                </ul>
            </div>

            <NcNoteCard type="warning">
                {{ t('worktime', 'Diese Aktion kann nicht rückgängig gemacht werden. Für Arbeitszeitnachweise können Aufbewahrungspflichten gelten — prüfen Sie das, bevor Sie löschen.') }}
            </NcNoteCard>

            <NcNoteCard type="info">
                {{ t('worktime', 'Für ausgeschiedene Mitarbeiter ist meist „Ruhend setzen“ richtig: Die Erfassung wird beendet, die Daten bleiben einsehbar und exportierbar.') }}
            </NcNoteCard>

            <template #actions>
                <NcButton type="tertiary" @click="closeDeleteDialog">
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
import NcNoteCard from '@nextcloud/vue/dist/Components/NcNoteCard.js'
import NcTextField from '@nextcloud/vue/dist/Components/NcTextField.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import { mapGetters } from 'vuex'
import InfoIcon from './InfoIcon.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import Close from 'vue-material-design-icons/Close.vue'
import AccountGroup from 'vue-material-design-icons/AccountGroup.vue'
import Wrench from 'vue-material-design-icons/Wrench.vue'
import SleepIcon from 'vue-material-design-icons/Sleep.vue'
import SleepOffIcon from 'vue-material-design-icons/SleepOff.vue'
import EmployeeService from '../services/EmployeeService.js'

export default {
    name: 'EmployeeList',
    components: {
        NcButton,
        NcEmptyContent,
        NcDialog,
        NcNoteCard,
        NcTextField,
        NcSelect,
        InfoIcon,
        Pencil,
        Close,
        AccountGroup,
        Wrench,
        SleepIcon,
        SleepOffIcon,
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
            deleteImpact: null,
            deleteImpactLoading: false,
            showRestingDialog: false,
            employeeToRest: null,
            restingReason: '',
            restingFrom: '',
            impact: null,
            impactLoading: false,
            filterDepartmentId: null,
        }
    },
    computed: {
        ...mapGetters('departments', ['departments']),
        hasDepartments() {
            return this.departments.length > 0
        },
        departmentsById() {
            const map = {}
            for (const d of this.departments) {
                map[d.id] = d
            }
            return map
        },
        departmentFilterOptions() {
            // Only departments that actually occur on an employee, plus a bucket
            // for the unassigned — filtering by an empty department is pointless.
            const usedIds = new Set(this.employees.map(e => e.departmentId).filter(id => id != null))
            const options = this.departments
                .filter(d => usedIds.has(d.id))
                .map(d => ({ id: d.id, label: d.name }))
            if (this.employees.some(e => e.departmentId == null)) {
                options.push({ id: 0, label: this.t('worktime', 'Ohne Abteilung') })
            }
            return options
        },
        selectedFilterDepartment: {
            get() {
                return this.departmentFilterOptions.find(o => o.id === this.filterDepartmentId) || null
            },
            set(value) {
                this.filterDepartmentId = value ? value.id : null
            },
        },
        filteredEmployees() {
            if (this.filterDepartmentId === null) {
                return this.employees
            }
            if (this.filterDepartmentId === 0) {
                return this.employees.filter(e => e.departmentId == null)
            }
            return this.employees.filter(e => e.departmentId === this.filterDepartmentId)
        },
        /**
         * The record counts worth showing: everything the backend reports as
         * greater than zero, in a fixed order so the dialog does not reshuffle
         * between employees. Empty tables are left out — listing eight rows of
         * "0" buries the two numbers that matter.
         */
        deletionRows() {
            if (!this.deleteImpact) {
                return []
            }

            const labels = [
                ['timeEntries', this.t('worktime', 'Zeiteinträge')],
                ['absences', this.t('worktime', 'Abwesenheiten')],
                ['workSchedules', this.t('worktime', 'Arbeitszeitprofile')],
                ['carryovers', this.t('worktime', 'Jahresüberträge')],
                ['payouts', this.t('worktime', 'Überstunden-Auszahlungen')],
                ['projectAssignments', this.t('worktime', 'Projektzuordnungen')],
                ['archiveJobs', this.t('worktime', 'Archiv-Aufträge')],
                ['auditLogs', this.t('worktime', 'Protokolleinträge')],
            ]

            return labels
                .filter(([key]) => (this.deleteImpact.counts[key] || 0) > 0)
                .map(([key, label]) => ({ key, label, count: this.deleteImpact.counts[key] }))
        },
    },
    created() {
        // Departments back the column join and the filter. EmployeeList is used by
        // employee managers, so the /all endpoint is permitted.
        if (!this.departments.length) {
            this.$store.dispatch('departments/fetchDepartments', true)
        }
    },
    methods: {
        departmentName(departmentId) {
            if (departmentId == null) {
                return '–'
            }
            return this.departmentsById[departmentId]?.name || '–'
        },
        async confirmResting(employee) {
            this.employeeToRest = employee
            this.restingReason = ''
            // #497: default the resting start to today (local), editable by the admin.
            this.restingFrom = new Date().toLocaleDateString('en-CA')
            this.impact = null
            this.showRestingDialog = true
            this.impactLoading = true

            try {
                const impact = await EmployeeService.getRestingImpact(employee.id)
                if (this.employeeToRest === employee) {
                    this.impact = impact
                }
            } catch (e) {
                // The dialog stays usable without the preview; the server-side
                // clearing happens regardless of what we managed to show here.
                if (this.employeeToRest === employee) {
                    this.impact = null
                }
            } finally {
                if (this.employeeToRest === employee) {
                    this.impactLoading = false
                }
            }
        },
        closeRestingDialog() {
            this.showRestingDialog = false
            this.employeeToRest = null
            this.restingReason = ''
            this.restingFrom = ''
            this.impact = null
        },
        restingConfirmed() {
            this.$emit('rest', { employee: this.employeeToRest, reason: this.restingReason, restingFrom: this.restingFrom || null })
            this.closeRestingDialog()
        },
        async confirmDelete(employee) {
            this.employeeToDelete = employee
            this.deleteImpact = null
            this.showDeleteDialog = true
            this.deleteImpactLoading = true

            try {
                const impact = await EmployeeService.getDeletionImpact(employee.id)
                if (this.employeeToDelete === employee) {
                    this.deleteImpact = impact
                }
            } catch (e) {
                // Without the preview the dialog still works, it just warns in
                // general terms instead of naming numbers.
                if (this.employeeToDelete === employee) {
                    this.deleteImpact = null
                }
            } finally {
                if (this.employeeToDelete === employee) {
                    this.deleteImpactLoading = false
                }
            }
        },
        closeDeleteDialog() {
            this.showDeleteDialog = false
            this.employeeToDelete = null
            this.deleteImpact = null
            this.deleteImpactLoading = false
        },
        deleteConfirmed() {
            this.$emit('delete', this.employeeToDelete)
            this.closeDeleteDialog()
        },
    },
}
</script>

<style scoped>
.list-filter {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 16px;
}

.list-filter label {
    font-weight: 500;
    color: var(--color-text-maxcontrast);
}

.dept-filter-select {
    min-width: 240px;
}

.no-filter-match {
    margin: 16px 4px;
    color: var(--color-text-maxcontrast);
}

.employee-list {
    margin-top: 16px;
    /* Die vierte Aktion (#486) sprengt bei schmalem Fenster die Breite —
       die Tabelle scrollt in sich statt die Seite zu verschieben. */
    overflow-x: auto;
}

.employees-table {
    width: 100%;
    min-width: 56rem;
    border-collapse: collapse;
}

.employees-table th,
.employees-table td {
    padding: 12px 16px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.employees-table th {
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
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

th.actions-col {
    width: 9rem;
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

.locked-reason {
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
    margin-top: 2px;
}

.resting-from {
    margin-top: 12px;
}

.resting-from__input {
    display: block;
    margin-top: 4px;
}

.resting-from__hint {
    color: var(--color-text-maxcontrast);
    font-size: 0.85em;
    margin-top: 2px;
}

.impact-loading {
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
}

.impact-block {
    margin-top: 12px;
}

.impact-block ul {
    margin: 4px 0 0 16px;
    list-style: disc;
}

.impact-warning {
    color: var(--color-error-text);
}

/* Zahlenliste statt Aufzaehlung: die Menge ist hier die Aussage, deshalb
   rechtsbuendig in einer eigenen Spalte statt hinter dem Label im Fliesstext.
   Selektor bewusst mit .impact-block davor: `.impact-block ul` (0,0,1,1)
   schlaegt sonst `.deletion-counts` (0,0,1,0) und die Punkte blieben stehen
   (#424). */
.impact-block ul.deletion-counts {
    margin: 4px 0 16px 0;
    list-style: none;
    max-width: 22rem;
}

.impact-block ul.deletion-counts li {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 2px 0;
}

.deletion-count {
    font-variant-numeric: tabular-nums;
    font-weight: 600;
}
</style>
