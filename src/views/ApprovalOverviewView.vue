<template>
    <div class="approval-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Genehmigungen') }}</h2>
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

        <!-- Zur Kenntnisnahme (Krankmeldungen) -->
        <div v-if="informationalAbsences.length > 0" class="report-section">
            <h3>{{ t('worktime', 'Zur Kenntnisnahme') }} <InfoIcon>{{ t('worktime', 'Diese Abwesenheiten (z.B. Krankheit) werden nur gemeldet und brauchen keine Genehmigung. Sie werden automatisch in der Sollberechnung berücksichtigt.') }}</InfoIcon> ({{ informationalAbsences.length }})</h3>
            <table class="approval-table">
                <thead>
                    <tr>
                        <th>{{ t('worktime', 'Mitarbeiter') }}</th>
                        <th>{{ t('worktime', 'Art') }}</th>
                        <th>{{ t('worktime', 'Zeitraum') }}</th>
                        <th class="center">{{ t('worktime', 'Tage') }}</th>
                        <th>{{ t('worktime', 'Bemerkung') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="absence in informationalAbsences" :key="absence.id">
                        <td class="employee-cell">
                            <NcAvatar :user="absence.employeeUserId"
                                :display-name="absence.employeeName"
                                :size="32" />
                            <span class="employee-name">{{ absence.employeeName }}</span>
                        </td>
                        <td>{{ getAbsenceTypeLabel(absence.type) }}</td>
                        <td>{{ formatDate(absence.startDate) }} - {{ formatDate(absence.endDate) }}</td>
                        <td class="center">{{ absence.days }}</td>
                        <td class="note-cell"><span class="note-text">{{ absence.note || '-' }}</span></td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Ausstehende Abwesenheiten -->
        <div v-if="pendingAbsences.length > 0" class="report-section">
            <h3>{{ t('worktime', 'Ausstehende Urlaubsanträge') }} <InfoIcon>{{ t('worktime', 'Diese Anträge warten auf Ihre Genehmigung oder Ablehnung. Erst nach Genehmigung werden sie vom Urlaubskonto abgezogen.') }}</InfoIcon> ({{ pendingAbsences.length }})</h3>
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
                        <td>{{ getAbsenceTypeLabel(absence.type) }}</td>
                        <td>{{ formatDate(absence.startDate) }} - {{ formatDate(absence.endDate) }}</td>
                        <td class="center">{{ absence.days }}</td>
                        <td class="note-cell"><span class="note-text">{{ absence.note || '-' }}</span></td>
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

        <!-- Zeiteinträge Übersicht (nur bei aktiviertem Genehmigungs-Workflow) -->
        <div v-if="approvalRequired" class="report-section">
            <h3>{{ t('worktime', 'Zeiteinträge') }}</h3>

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
                    <template v-for="item in filteredEmployees">
                    <tr :key="item.employee.id"
                        class="employee-row"
                        :class="{ expanded: expandedEmployeeId === item.employee.id }"
                        @click="toggleDetails(item.employee.id)">
                        <td class="employee-cell">
                            <ChevronDownIcon v-if="expandedEmployeeId === item.employee.id"
                                :size="18"
                                class="chevron-icon" />
                            <ChevronRightIcon v-else
                                :size="18"
                                class="chevron-icon" />
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
                        <td class="center" @click.stop>
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
                            <NcButton v-if="item.monthStatus.approved > 0"
                                type="tertiary"
                                :disabled="reopeningEmployee === item.employee.id"
                                @click="openReopenModal(item.employee)">
                                <template #icon>
                                    <NcLoadingIcon v-if="reopeningEmployee === item.employee.id" :size="20" />
                                    <RestoreIcon v-else :size="20" />
                                </template>
                                {{ t('worktime', 'Genehmigung zurücknehmen') }}
                            </NcButton>
                            <span v-if="!item.monthStatus.canApprove && item.monthStatus.approved === 0" class="no-action">-</span>
                        </td>
                    </tr>
                    <tr v-if="expandedEmployeeId === item.employee.id"
                        :key="`details-${item.employee.id}`"
                        class="details-row">
                        <td colspan="7" class="details-cell">
                            <div class="details-header">
                                <span class="details-title">{{ t('worktime', 'Einträge im Zeitraum') }}</span>
                                <NcButton type="tertiary" @click="downloadPdf(item.employee.id)">
                                    <template #icon>
                                        <FileDocumentIcon :size="18" />
                                    </template>
                                    {{ t('worktime', 'Monatsbericht als PDF') }}
                                </NcButton>
                            </div>
                            <NcLoadingIcon v-if="loadingDetails === item.employee.id" :size="32" />
                            <table v-else-if="mergedDetailItems(item.employee.id).length > 0"
                                class="details-table">
                                <thead>
                                    <tr>
                                        <th>{{ t('worktime', 'Datum') }}</th>
                                        <th>{{ t('worktime', 'Beginn') }}</th>
                                        <th>{{ t('worktime', 'Ende') }}</th>
                                        <th class="center">{{ t('worktime', 'Pause') }}</th>
                                        <th class="center">{{ t('worktime', 'Arbeitszeit') }}</th>
                                        <th>{{ t('worktime', 'Projekt') }}</th>
                                        <th>{{ t('worktime', 'Beschreibung') }}</th>
                                        <th class="center">{{ t('worktime', 'Status') }}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <template v-for="item2 in mergedDetailItems(item.employee.id)">
                                        <tr v-if="item2.kind === 'entry'" :key="`e-${item2.id}`">
                                            <td>{{ formatDate(item2.date) }}</td>
                                            <td>{{ item2.startTime }}</td>
                                            <td>{{ item2.endTime }}</td>
                                            <td class="center">{{ item2.breakMinutes }} min</td>
                                            <td class="center">{{ formatMinutes(item2.workMinutes) }}</td>
                                            <td>{{ projectName(item2.projectId) }}</td>
                                            <td class="description-cell">{{ item2.description || '-' }}</td>
                                            <td class="center">
                                                <span class="status-badge" :class="item2.status">
                                                    {{ statusLabel(item2.status) }}
                                                </span>
                                            </td>
                                        </tr>
                                        <tr v-else :key="`a-${item2.id}`" class="detail-absence-row">
                                            <td class="absence-date-cell">
                                                <span v-if="item2.startDate === item2.endDate">{{ formatDate(item2.startDate) }}</span>
                                                <span v-else>{{ formatDate(item2.startDate) }} – {{ formatDate(item2.endDate) }}</span>
                                            </td>
                                            <td colspan="4" class="absence-info-cell">
                                                <span class="absence-type-badge" :class="item2.type">{{ item2.typeName }}</span>
                                                <span class="absence-days">{{ item2.days }} {{ item2.days === 1 ? t('worktime', 'Tag') : t('worktime', 'Tage') }}</span>
                                            </td>
                                            <td>—</td>
                                            <td class="description-cell">{{ item2.note || '—' }}</td>
                                            <td class="center">
                                                <span class="status-badge" :class="item2.status">
                                                    {{ statusLabel(item2.status) }}
                                                </span>
                                            </td>
                                        </tr>
                                    </template>
                                </tbody>
                            </table>
                            <p v-else class="details-empty">
                                {{ t('worktime', 'Keine Einträge in diesem Monat.') }}
                            </p>
                        </td>
                    </tr>
                    </template>
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

        <!-- Genehmigung zurücknehmen: Begründung (Pflicht) -->
        <NcModal v-if="showReopenModal"
            :name="t('worktime', 'Genehmigung zurücknehmen')"
            @close="closeReopenModal">
            <div class="reopen-modal">
                <h3>{{ t('worktime', 'Genehmigung zurücknehmen für {name}', { name: reopenTarget && reopenTarget.fullName }) }}</h3>
                <p class="reopen-modal__hint">
                    {{ t('worktime', 'Die genehmigten Zeiteinträge dieses Monats werden zur Korrektur wieder auf den Status Entwurf gesetzt und müssen anschließend erneut eingereicht und genehmigt werden. Der Vorgang wird im Audit-Log festgehalten.') }}
                </p>
                <div class="form-group">
                    <label>{{ t('worktime', 'Begründung (Pflicht)') }}</label>
                    <input v-model="reopenReason"
                        type="text"
                        :placeholder="t('worktime', 'Grund für die Rücknahme')"
                        class="input-field"
                        required>
                </div>
                <div class="form-actions">
                    <NcButton type="tertiary" @click="closeReopenModal">
                        {{ t('worktime', 'Abbrechen') }}
                    </NcButton>
                    <NcButton type="primary"
                        :disabled="!reopenReason.trim() || reopeningEmployee !== null"
                        @click="submitReopen">
                        {{ t('worktime', 'Genehmigung zurücknehmen') }}
                    </NcButton>
                </div>
            </div>
        </NcModal>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import ChevronDownIcon from 'vue-material-design-icons/ChevronDown.vue'
import FileDocumentIcon from 'vue-material-design-icons/FileDocument.vue'
import RestoreIcon from 'vue-material-design-icons/Restore.vue'
import { mapGetters } from 'vuex'
import MonthPicker from '../components/MonthPicker.vue'
import ReportService from '../services/ReportService.js'
import TimeEntryService from '../services/TimeEntryService.js'
import AbsenceService from '../services/AbsenceService.js'
import { getCurrentYear, getCurrentMonth, formatDate } from '../utils/dateUtils.js'
import { getAbsenceTypeLabel } from '../utils/formatters.js'
import { formatMinutes } from '../utils/timeUtils.js'
import { showSuccess, showError } from '@nextcloud/dialogs'
import InfoIcon from '../components/InfoIcon.vue'

export default {
    name: 'ApprovalOverviewView',
    components: {
        InfoIcon,
        NcLoadingIcon,
        NcEmptyContent,
        NcAvatar,
        NcButton,
        NcSelect,
        NcModal,
        AccountGroupIcon,
        CheckIcon,
        CloseIcon,
        ChevronRightIcon,
        ChevronDownIcon,
        FileDocumentIcon,
        RestoreIcon,
        MonthPicker,
    },
    data() {
        return {
            year: getCurrentYear(),
            month: getCurrentMonth(),
            employees: [],
            pendingAbsences: [],
            informationalAbsences: [],
            loading: false,
            approvingEmployee: null,
            reopeningEmployee: null,
            showReopenModal: false,
            reopenTarget: null,
            reopenReason: '',
            processingAbsence: null,
            statusFilter: null,
            expandedEmployeeId: null,
            detailEntries: {},
            detailAbsences: {},
            loadingDetails: null,
            statusOptions: [
                { value: 'pending', label: t('worktime', 'Ausstehend (zur Genehmigung)') },
                { value: 'approved', label: t('worktime', 'Vollständig genehmigt') },
                { value: 'draft', label: t('worktime', 'In Bearbeitung') },
                { value: 'empty', label: t('worktime', 'Keine Einträge') },
            ],
        }
    },
    computed: {
        ...mapGetters('projects', ['getProjectById']),
        ...mapGetters('permissions', ['approvalRequired']),
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
        getAbsenceTypeLabel,
        async loadData() {
            this.loading = true
            const results = await Promise.allSettled([
                ReportService.getAllEmployeesStatus(this.year, this.month),
                AbsenceService.getPending(),
                AbsenceService.getInformational(),
            ])
            this.employees = results[0].status === 'fulfilled' ? results[0].value : []
            this.pendingAbsences = results[1].status === 'fulfilled' ? results[1].value : []
            this.informationalAbsences = results[2].status === 'fulfilled' ? results[2].value : []

            results.forEach((r, i) => {
                if (r.status === 'rejected') {
                    const names = ['getAllEmployeesStatus', 'getPending', 'getInformational']
                    console.error(`Failed: ${names[i]}`, r.reason)
                }
            })
            this.loading = false
        },
        formatDate(date) {
            return formatDate(date)
        },
        formatMinutes(minutes) {
            return formatMinutes(minutes)
        },
        projectName(projectId) {
            if (!projectId) return '-'
            const project = this.getProjectById(projectId)
            return project ? project.name : '-'
        },
        statusLabel(status) {
            const labels = {
                draft: t('worktime', 'Entwurf'),
                submitted: t('worktime', 'Eingereicht'),
                approved: t('worktime', 'Genehmigt'),
                rejected: t('worktime', 'Abgelehnt'),
                pending: t('worktime', 'Ausstehend'),
                cancelled: t('worktime', 'Storniert'),
            }
            return labels[status] || status
        },
        calendarDays(startStr, endStr) {
            return Math.round((new Date(endStr) - new Date(startStr)) / 86400000) + 1
        },
        mergedDetailItems(employeeId) {
            const pad = n => String(n).padStart(2, '0')
            const monthStart = `${this.year}-${pad(this.month)}-01`
            const lastDay = new Date(this.year, this.month, 0).getDate()
            const monthEnd = `${this.year}-${pad(this.month)}-${pad(lastDay)}`

            const entries = (this.detailEntries[employeeId] || []).map(e => ({ ...e, kind: 'entry' }))
            const absences = (this.detailAbsences[employeeId] || []).map(a => {
                const clippedStart = a.startDate < monthStart ? monthStart : a.startDate
                const clippedEnd = a.endDate > monthEnd ? monthEnd : a.endDate
                let clippedDays = a.days
                if (a.startDate < monthStart || a.endDate > monthEnd) {
                    const totalCal = this.calendarDays(a.startDate, a.endDate)
                    const clippedCal = this.calendarDays(clippedStart, clippedEnd)
                    clippedDays = totalCal > 0 ? Math.max(1, Math.round(a.days * clippedCal / totalCal)) : a.days
                }
                return { ...a, kind: 'absence', startDate: clippedStart, endDate: clippedEnd, days: clippedDays }
            })

            return [...entries, ...absences].sort((a, b) => {
                const dateA = a.kind === 'entry' ? a.date : a.startDate
                const dateB = b.kind === 'entry' ? b.date : b.startDate
                const cmp = dateA.localeCompare(dateB)
                if (cmp !== 0) return cmp
                if (a.kind === 'absence' && b.kind === 'entry') return -1
                if (a.kind === 'entry' && b.kind === 'absence') return 1
                if (a.kind === 'entry' && b.kind === 'entry') return a.startTime.localeCompare(b.startTime)
                return 0
            })
        },
        async toggleDetails(employeeId) {
            if (this.expandedEmployeeId === employeeId) {
                this.expandedEmployeeId = null
                return
            }
            this.expandedEmployeeId = employeeId
            if (this.detailEntries[employeeId]) {
                return
            }
            this.loadingDetails = employeeId
            try {
                const [entries, absences] = await Promise.all([
                    TimeEntryService.getByEmployee(employeeId, this.year, this.month),
                    AbsenceService.getByEmployee(employeeId, this.year, this.month),
                ])
                this.$set(this.detailEntries, employeeId, entries || [])
                this.$set(this.detailAbsences, employeeId, absences || [])
            } catch (error) {
                console.error('Failed to load details:', error)
                showError(t('worktime', 'Fehler beim Laden der Einträge'))
                this.$set(this.detailEntries, employeeId, [])
                this.$set(this.detailAbsences, employeeId, [])
            } finally {
                this.loadingDetails = null
            }
        },
        downloadPdf(employeeId) {
            ReportService.downloadPdf(employeeId, this.year, this.month)
        },
        onMonthChange({ year, month }) {
            this.year = year
            this.month = month
            this.expandedEmployeeId = null
            this.detailEntries = {}
            this.detailAbsences = {}
            this.loadData()
        },
        async approveMonth(employeeId) {
            this.approvingEmployee = employeeId
            try {
                const result = await TimeEntryService.approveMonth(employeeId, this.year, this.month)
                showSuccess(t('worktime', '{count} Einträge genehmigt', { count: result.approved }))
                this.$delete(this.detailEntries, employeeId)
                this.$delete(this.detailAbsences, employeeId)
                await this.loadData()
            } catch (error) {
                console.error('Failed to approve month:', error)
                showError(t('worktime', 'Fehler beim Genehmigen'))
            } finally {
                this.approvingEmployee = null
            }
        },
        openReopenModal(employee) {
            this.reopenTarget = employee
            this.reopenReason = ''
            this.showReopenModal = true
        },
        closeReopenModal() {
            this.showReopenModal = false
            this.reopenTarget = null
            this.reopenReason = ''
        },
        async submitReopen() {
            if (!this.reopenTarget || !this.reopenReason.trim()) {
                return
            }
            const employeeId = this.reopenTarget.id
            this.reopeningEmployee = employeeId
            try {
                const result = await TimeEntryService.reopenMonth(employeeId, this.year, this.month, this.reopenReason.trim())
                showSuccess(t('worktime', '{count} Einträge zur Korrektur freigegeben', { count: result.reopened }))
                this.closeReopenModal()
                this.$delete(this.detailEntries, employeeId)
                this.$delete(this.detailAbsences, employeeId)
                await this.loadData()
            } catch (error) {
                console.error('Failed to reopen month:', error)
                showError(t('worktime', 'Fehler beim Zurücknehmen der Genehmigung'))
            } finally {
                this.reopeningEmployee = null
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

.report-section {
    margin-bottom: 18px;
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 16px 20px;
}

.report-section h3 {
    margin: 0 0 14px 0;
    font-size: 17px;
    font-weight: 600;
    color: var(--color-main-text);
}

.approval-table-wrapper {
    overflow-x: auto;
}

.approval-table {
    width: 100%;
    border-collapse: collapse;
}

.approval-table th,
.approval-table td {
    padding: 10px 12px;
    text-align: left;
    font-variant-numeric: tabular-nums;
}

.approval-table th {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
}

.approval-table td {
    border-bottom: 1px solid var(--color-border);
}

.approval-table tr:last-child td {
    border-bottom: none;
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
    font-size: 15px;
    font-weight: 500;
}

.count-badge {
    display: inline-block;
    min-width: 24px;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 13px;
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
    font-size: 13px;
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

.actions-cell {
    display: flex;
    gap: 8px;
    justify-content: center;
}

.employee-row {
    cursor: pointer;
    transition: background-color 0.15s;
}

.employee-row:hover {
    background-color: var(--color-background-hover);
}

.employee-row.expanded {
    background-color: var(--color-background-dark);
}

.chevron-icon {
    color: var(--color-text-maxcontrast);
    flex-shrink: 0;
}

.details-row td.details-cell {
    background-color: var(--color-background-hover);
    padding: 16px 24px 20px 54px;
    border-bottom: 1px solid var(--color-border);
}

.details-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
}

.details-title {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.details-table {
    width: 100%;
    border-collapse: collapse;
    background: var(--color-main-background);
    border-radius: 8px;
    overflow: hidden;
}

.details-table th,
.details-table td {
    padding: 8px 12px;
    text-align: left;
    font-size: 13px;
    font-variant-numeric: tabular-nums;
}

.details-table th {
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    background: var(--color-background-dark);
    border-bottom: 1px solid var(--color-border);
}

.details-table td {
    border-bottom: 1px solid var(--color-border);
}

.details-table tr:last-child td {
    border-bottom: none;
}

.details-table th.center,
.details-table td.center {
    text-align: center;
}

.description-cell {
    max-width: 280px;
    white-space: normal;
    overflow-wrap: anywhere;
}

/* Bemerkung (Anzeige): kappt die Spaltenbreite und bricht lange Texte um,
   damit die Tabelle nicht über ihren Container hinauswächst (#275). */
.note-cell .note-text {
    display: inline-block;
    max-width: 22rem;
    white-space: normal;
    overflow-wrap: anywhere;
}

.status-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 500;
}

.status-badge.draft {
    background: var(--color-background-darker);
    color: var(--color-text-maxcontrast);
}

.status-badge.submitted {
    background: var(--color-warning-element-light);
    color: var(--color-warning-text);
}

.status-badge.approved {
    background: var(--color-success-element-light);
    color: var(--color-success-text);
}

.status-badge.rejected {
    background: var(--color-error-element-light);
    color: var(--color-error-text);
}

.details-empty {
    margin: 0;
    padding: 8px 0;
    font-size: 13px;
    color: var(--color-text-maxcontrast);
    font-style: italic;
}

.detail-absence-row {
    background: var(--color-background-hover);
}

.absence-date-cell {
    font-weight: 500;
}

.absence-info-cell {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
}

.absence-type-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 12px;
    font-weight: 600;
    color: #fff;
    background: #2563eb;
}

.absence-type-badge.vacation { background: var(--wt-vacation, #4a9d63); }
.absence-type-badge.sick { background: var(--wt-sick, #cc4b42); }
.absence-type-badge.child_sick { background: var(--wt-child-sick, #d4763a); }
.absence-type-badge.compensatory { background: var(--wt-compensatory, #7c3aed); }
.absence-type-badge.unpaid { background: var(--wt-unpaid, #6b7280); }
.absence-type-badge.special { background: var(--wt-special, #0891b2); }
.absence-type-badge.training { background: var(--wt-holiday, #c98b3a); }

.absence-days {
    font-size: 12px;
    color: var(--color-text-maxcontrast);
}

.reopen-modal {
    padding: 20px 24px 24px;
}

.reopen-modal__hint {
    color: var(--color-text-maxcontrast);
    margin-bottom: 16px;
}

.reopen-modal .form-group {
    margin-bottom: 16px;
}

.reopen-modal .input-field {
    width: 100%;
}

.reopen-modal .form-actions {
    display: flex;
    gap: 8px;
    justify-content: flex-end;
}

</style>
