<template>
    <div class="approval-view">
        <!-- Ausstehende Abwesenheiten -->
        <div v-if="pendingAbsences.length > 0" class="section absence-section">
            <h3>{{ t('worktime', 'Ausstehende Urlaubsanträge') }} ({{ pendingAbsences.length }})</h3>
            <table class="approval-table">
                <thead>
                    <tr>
                        <th>{{ t('worktime', 'Mitarbeiter') }}</th>
                        <th>{{ t('worktime', 'Art') }}</th>
                        <th>{{ t('worktime', 'Zeitraum') }}</th>
                        <th class="center">{{ t('worktime', 'Tage') }}</th>
                        <th>{{ t('worktime', 'Bemerkung') }}</th>
                        <th class="center">{{ t('worktime', 'Aktionen') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="absence in pendingAbsences" :key="absence.id">
                        <td class="employee-cell">
                            <NcAvatar :user="absence.employeeUserId"
                                :display-name="absence.employeeName"
                                :size="32" />
                            <span class="employee-name">{{ absence.employeeName }}</span>
                        </td>
                        <td>{{ absence.typeName }}</td>
                        <td>{{ formatDate(absence.startDate) }} - {{ formatDate(absence.endDate) }}</td>
                        <td class="center">{{ absence.days }}</td>
                        <td>{{ absence.note || '-' }}</td>
                        <td class="center actions-cell">
                            <NcButton type="primary"
                                :disabled="processingAbsence === absence.id"
                                @click="approveAbsence(absence.id)">
                                <template #icon>
                                    <NcLoadingIcon v-if="processingAbsence === absence.id" :size="20" />
                                    <CheckIcon v-else :size="20" />
                                </template>
                                {{ t('worktime', 'Genehmigen') }}
                            </NcButton>
                            <NcButton type="error"
                                :disabled="processingAbsence === absence.id"
                                @click="rejectAbsence(absence.id)">
                                <template #icon>
                                    <CloseIcon :size="20" />
                                </template>
                                {{ t('worktime', 'Ablehnen') }}
                            </NcButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Zeiteinträge Übersicht -->
        <div class="section">
            <div class="view-header">
                <h2>{{ t('worktime', 'Zeiteinträge') }}</h2>
                <div class="view-header__controls">
                    <NcSelect v-model="statusFilter"
                        :options="statusOptions"
                        :placeholder="t('worktime', 'Alle Status')"
                        :clearable="true"
                        label="label"
                        class="status-filter" />
                    <MonthPicker :year="year"
                        :month="month"
                        :allow-past="true"
                        @update="onMonthChange" />
                </div>
            </div>
        </div>

        <NcLoadingIcon v-if="loading" :size="44" />

        <div v-else-if="filteredEmployees.length > 0" class="approval-table-wrapper">
            <table class="approval-table">
                <thead>
                    <tr>
                        <th>{{ t('worktime', 'Mitarbeiter') }}</th>
                        <th class="center">{{ t('worktime', 'Entwurf') }}</th>
                        <th class="center">{{ t('worktime', 'Eingereicht') }}</th>
                        <th class="center">{{ t('worktime', 'Genehmigt') }}</th>
                        <th class="center">{{ t('worktime', 'Abgelehnt') }}</th>
                        <th class="center">{{ t('worktime', 'Status') }}</th>
                        <th class="center">{{ t('worktime', 'Aktionen') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="item in filteredEmployees" :key="item.employee.id">
                        <td class="employee-cell">
                            <NcAvatar :user="item.employee.userId"
                                :display-name="item.employee.fullName"
                                :size="32" />
                            <span class="employee-name">{{ item.employee.fullName }}</span>
                        </td>
                        <td class="center">
                            <span v-if="item.monthStatus.draft > 0" class="count-badge draft">
                                {{ item.monthStatus.draft }}
                            </span>
                            <span v-else class="count-zero">-</span>
                        </td>
                        <td class="center">
                            <span v-if="item.monthStatus.submitted > 0" class="count-badge submitted">
                                {{ item.monthStatus.submitted }}
                            </span>
                            <span v-else class="count-zero">-</span>
                        </td>
                        <td class="center">
                            <span v-if="item.monthStatus.approved > 0" class="count-badge approved">
                                {{ item.monthStatus.approved }}
                            </span>
                            <span v-else class="count-zero">-</span>
                        </td>
                        <td class="center">
                            <span v-if="item.monthStatus.rejected > 0" class="count-badge rejected">
                                {{ item.monthStatus.rejected }}
                            </span>
                            <span v-else class="count-zero">-</span>
                        </td>
                        <td class="center">
                            <span v-if="item.monthStatus.isFullyApproved" class="overall-status approved">
                                {{ t('worktime', 'Vollständig') }}
                            </span>
                            <span v-else-if="item.monthStatus.total === 0" class="overall-status empty">
                                {{ t('worktime', 'Keine Einträge') }}
                            </span>
                            <span v-else-if="item.monthStatus.canApprove" class="overall-status pending">
                                {{ t('worktime', 'Ausstehend') }}
                            </span>
                            <span v-else class="overall-status draft">
                                {{ t('worktime', 'In Bearbeitung') }}
                            </span>
                        </td>
                        <td class="center">
                            <NcButton v-if="item.monthStatus.canApprove"
                                type="primary"
                                :disabled="approvingEmployee === item.employee.id"
                                @click="approveMonth(item.employee.id)">
                                <template #icon>
                                    <NcLoadingIcon v-if="approvingEmployee === item.employee.id" :size="20" />
                                    <CheckIcon v-else :size="20" />
                                </template>
                                {{ t('worktime', 'Genehmigen') }}
                            </NcButton>
                            <span v-else class="no-action">-</span>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <NcEmptyContent v-else
            :name="t('worktime', 'Keine Mitarbeiter')">
            <template #icon>
                <AccountGroupIcon />
            </template>
            <template #description>
                {{ t('worktime', 'Keine Mitarbeiter mit dem gewählten Filter gefunden.') }}
            </template>
        </NcEmptyContent>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import MonthPicker from '../components/MonthPicker.vue'
import ReportService from '../services/ReportService.js'
import TimeEntryService from '../services/TimeEntryService.js'
import AbsenceService from '../services/AbsenceService.js'
import { getCurrentYear, getCurrentMonth, formatDate } from '../utils/dateUtils.js'
import { showSuccess, showError } from '@nextcloud/dialogs'

export default {
    name: 'ApprovalOverviewView',
    components: {
        NcLoadingIcon,
        NcEmptyContent,
        NcAvatar,
        NcButton,
        NcSelect,
        AccountGroupIcon,
        CheckIcon,
        CloseIcon,
        MonthPicker,
    },
    data() {
        return {
            year: getCurrentYear(),
            month: getCurrentMonth(),
            employees: [],
            pendingAbsences: [],
            loading: false,
            approvingEmployee: null,
            processingAbsence: null,
            statusFilter: null,
            statusOptions: [
                { value: 'pending', label: t('worktime', 'Ausstehend (zur Genehmigung)') },
                { value: 'approved', label: t('worktime', 'Vollständig genehmigt') },
                { value: 'draft', label: t('worktime', 'In Bearbeitung') },
                { value: 'empty', label: t('worktime', 'Keine Einträge') },
            ],
        }
    },
    computed: {
        filteredEmployees() {
            if (!this.statusFilter) {
                return this.employees
            }

            return this.employees.filter(item => {
                const status = item.monthStatus
                switch (this.statusFilter.value) {
                    case 'pending':
                        return status.canApprove
                    case 'approved':
                        return status.isFullyApproved
                    case 'draft':
                        return !status.isFullyApproved && !status.canApprove && status.total > 0
                    case 'empty':
                        return status.total === 0
                    default:
                        return true
                }
            })
        },
    },
    created() {
        this.loadData()
    },
    methods: {
        async loadData() {
            this.loading = true
            try {
                const [employees, absences] = await Promise.all([
                    ReportService.getAllEmployeesStatus(this.year, this.month),
                    AbsenceService.getPending(),
                ])
                this.employees = employees
                this.pendingAbsences = absences
            } catch (error) {
                console.error('Failed to load data:', error)
                this.employees = []
                this.pendingAbsences = []
            } finally {
                this.loading = false
            }
        },
        formatDate(date) {
            return formatDate(date)
        },
        onMonthChange({ year, month }) {
            this.year = year
            this.month = month
            this.loadData()
        },
        async approveMonth(employeeId) {
            this.approvingEmployee = employeeId
            try {
                const result = await TimeEntryService.approveMonth(employeeId, this.year, this.month)
                showSuccess(t('worktime', '{count} Einträge genehmigt', { count: result.approved }))
                await this.loadData()
            } catch (error) {
                console.error('Failed to approve month:', error)
                showError(t('worktime', 'Fehler beim Genehmigen'))
            } finally {
                this.approvingEmployee = null
            }
        },
        async approveAbsence(absenceId) {
            this.processingAbsence = absenceId
            try {
                await AbsenceService.approve(absenceId)
                showSuccess(t('worktime', 'Abwesenheit genehmigt'))
                await this.loadData()
            } catch (error) {
                console.error('Failed to approve absence:', error)
                showError(t('worktime', 'Fehler beim Genehmigen'))
            } finally {
                this.processingAbsence = null
            }
        },
        async rejectAbsence(absenceId) {
            this.processingAbsence = absenceId
            try {
                await AbsenceService.reject(absenceId)
                showSuccess(t('worktime', 'Abwesenheit abgelehnt'))
                await this.loadData()
            } catch (error) {
                console.error('Failed to reject absence:', error)
                showError(t('worktime', 'Fehler beim Ablehnen'))
            } finally {
                this.processingAbsence = null
            }
        },
    },
}
</script>

<style scoped>
.approval-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1400px;
}

.view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 12px;
}

.view-header h2 {
    margin: 0;
}

.view-header__controls {
    display: flex;
    gap: 12px;
    align-items: center;
}

.status-filter {
    min-width: 200px;
}

.approval-table-wrapper {
    overflow-x: auto;
}

.approval-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-main-background);
}

.approval-table th,
.approval-table td {
    padding: 12px;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
}

.approval-table th {
    background: var(--color-background-dark);
    font-weight: 600;
}

.approval-table th.center,
.approval-table td.center {
    text-align: center;
}

.employee-cell {
    display: flex;
    align-items: center;
    gap: 12px;
}

.employee-name {
    font-weight: 500;
}

.count-badge {
    display: inline-block;
    min-width: 24px;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.85em;
    font-weight: 600;
}

.count-badge.draft {
    background: var(--color-background-darker);
    color: var(--color-text-maxcontrast);
}

.count-badge.submitted {
    background: var(--color-warning-element-light);
    color: var(--color-warning-text);
}

.count-badge.approved {
    background: var(--color-success-element-light);
    color: var(--color-success-text);
}

.count-badge.rejected {
    background: var(--color-error-element-light);
    color: var(--color-error-text);
}

.count-zero {
    color: var(--color-text-maxcontrast);
}

.overall-status {
    display: inline-block;
    padding: 4px 10px;
    border-radius: 4px;
    font-size: 0.85em;
    font-weight: 500;
}

.overall-status.approved {
    background: var(--color-success-element-light);
    color: var(--color-success-text);
}

.overall-status.pending {
    background: var(--color-warning-element-light);
    color: var(--color-warning-text);
}

.overall-status.draft {
    background: var(--color-background-darker);
    color: var(--color-text-maxcontrast);
}

.overall-status.empty {
    background: var(--color-background-dark);
    color: var(--color-text-maxcontrast);
}

.no-action {
    color: var(--color-text-maxcontrast);
}

.section {
    margin-bottom: 32px;
}

.absence-section {
    background: var(--color-background-dark);
    padding: 16px;
    border-radius: var(--border-radius-large);
}

.absence-section h3 {
    margin: 0 0 16px 0;
    color: var(--color-primary);
}

.actions-cell {
    display: flex;
    gap: 8px;
    justify-content: center;
}
</style>
