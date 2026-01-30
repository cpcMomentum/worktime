<template>
    <div class="monthly-report-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Monatsübersicht') }}</h2>
            <div class="header-actions">
                <MonthPicker :year="year"
                    :month="month"
                    @update="onMonthChange" />
                <NcButton v-if="hasSubmittableEntries"
                    type="primary"
                    @click="confirmSubmitMonth">
                    <template #icon>
                        <SendIcon :size="20" />
                    </template>
                    {{ t('worktime', 'Monat einreichen') }}
                </NcButton>
                <span v-else-if="allEntriesSubmitted && report?.timeEntries?.length > 0" class="status-info">
                    <CheckIcon :size="20" />
                    {{ t('worktime', 'Eingereicht') }}
                </span>
                <NcButton type="secondary" @click="downloadPdf">
                    <template #icon>
                        <DownloadIcon :size="20" />
                    </template>
                    {{ t('worktime', 'PDF herunterladen') }}
                </NcButton>
            </div>
        </div>

        <NcLoadingIcon v-if="loading" :size="44" />

        <div v-else-if="report" class="report-content">
            <div class="report-section">
                <h3>{{ t('worktime', 'Zusammenfassung') }}</h3>
                <div class="stats-grid">
                    <div class="stat-card">
                        <span class="stat-label">{{ t('worktime', 'Arbeitstage') }}</span>
                        <span class="stat-value">{{ report.statistics.workingDays }}</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">{{ t('worktime', 'Feiertage') }}</span>
                        <span class="stat-value">{{ report.statistics.holidayCount }}</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">{{ t('worktime', 'Abwesenheitstage') }}</span>
                        <span class="stat-value">{{ report.statistics.absenceDays }}</span>
                    </div>
                    <div class="stat-card">
                        <span class="stat-label">{{ t('worktime', 'Einträge') }}</span>
                        <span class="stat-value">{{ report.statistics.entryCount }}</span>
                    </div>
                </div>
            </div>

            <OvertimeSummary :target-minutes="report.statistics.targetMinutes"
                :actual-minutes="report.statistics.actualMinutes"
                :overtime-minutes="report.statistics.overtimeMinutes" />

            <div class="report-section">
                <h3>{{ t('worktime', 'Zeiteinträge') }}</h3>
                <TimeEntryList :entries="report.timeEntries" readonly />
            </div>

            <div v-if="report.absences.length > 0" class="report-section">
                <h3>{{ t('worktime', 'Abwesenheiten') }}</h3>
                <table class="absence-table">
                    <thead>
                        <tr>
                            <th>{{ t('worktime', 'Zeitraum') }}</th>
                            <th>{{ t('worktime', 'Art') }}</th>
                            <th>{{ t('worktime', 'Tage') }}</th>
                            <th>{{ t('worktime', 'Status') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="absence in report.absences" :key="absence.id">
                            <td>{{ formatDate(absence.startDate) }} - {{ formatDate(absence.endDate) }}</td>
                            <td>{{ absence.typeName }}</td>
                            <td>{{ absence.days }}</td>
                            <td>{{ getStatusLabel(absence.status) }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div v-if="report.holidays.length > 0" class="report-section">
                <h3>{{ t('worktime', 'Feiertage') }}</h3>
                <ul class="holiday-list">
                    <li v-for="holiday in report.holidays" :key="holiday.id">
                        {{ formatDate(holiday.date) }} - {{ holiday.name }}
                    </li>
                </ul>
            </div>
        </div>

        <NcEmptyContent v-else
            :name="t('worktime', 'Keine Daten')">
            <template #description>
                {{ t('worktime', 'Für diesen Monat liegen keine Daten vor.') }}
            </template>
        </NcEmptyContent>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import DownloadIcon from 'vue-material-design-icons/Download.vue'
import SendIcon from 'vue-material-design-icons/Send.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { confirmAction } from '../utils/errorHandler.js'
import { mapGetters } from 'vuex'
import MonthPicker from '../components/MonthPicker.vue'
import OvertimeSummary from '../components/OvertimeSummary.vue'
import TimeEntryList from '../components/TimeEntryList.vue'
import ReportService from '../services/ReportService.js'
import TimeEntryService from '../services/TimeEntryService.js'
import { formatDate, getCurrentYear, getCurrentMonth } from '../utils/dateUtils.js'

export default {
    name: 'MonthlyReportView',
    components: {
        NcButton,
        NcLoadingIcon,
        NcEmptyContent,
        DownloadIcon,
        SendIcon,
        CheckIcon,
        MonthPicker,
        OvertimeSummary,
        TimeEntryList,
    },
    data() {
        return {
            year: getCurrentYear(),
            month: getCurrentMonth(),
            report: null,
            loading: false,
        }
    },
    computed: {
        ...mapGetters('permissions', ['employeeId']),
        hasSubmittableEntries() {
            if (!this.report?.timeEntries) return false
            return this.report.timeEntries.some(e => e.status === 'draft' || e.status === 'rejected')
        },
        allEntriesSubmitted() {
            if (!this.report?.timeEntries?.length) return false
            return this.report.timeEntries.every(e => e.status !== 'draft' && e.status !== 'rejected')
        },
    },
    watch: {
        employeeId: {
            immediate: true,
            handler() {
                if (this.employeeId) {
                    this.loadReport()
                }
            },
        },
    },
    mounted() {
        // Daten bei jedem View-Wechsel neu laden
        if (this.employeeId) {
            this.loadReport()
        }
    },
    methods: {
        async loadReport() {
            if (!this.employeeId) return
            this.loading = true
            try {
                this.report = await ReportService.getMonthly(this.employeeId, this.year, this.month)
            } catch (error) {
                console.error('Failed to load report:', error)
                this.report = null
            } finally {
                this.loading = false
            }
        },
        onMonthChange({ year, month }) {
            this.year = year
            this.month = month
            this.loadReport()
        },
        formatDate(date) {
            return formatDate(date)
        },
        getStatusLabel(status) {
            const labels = {
                pending: this.t('worktime', 'Ausstehend'),
                approved: this.t('worktime', 'Genehmigt'),
                rejected: this.t('worktime', 'Abgelehnt'),
                cancelled: this.t('worktime', 'Storniert'),
            }
            return labels[status] || status
        },
        downloadPdf() {
            if (!this.employeeId) return
            ReportService.downloadPdf(this.employeeId, this.year, this.month)
        },
        async confirmSubmitMonth() {
            const monthName = new Date(this.year, this.month - 1).toLocaleDateString('de-DE', { month: 'long', year: 'numeric' })

            const confirmed = await confirmAction(
                this.t('worktime', 'Möchten Sie alle Einträge für {month} einreichen? Nach dem Einreichen können Sie keine Änderungen mehr vornehmen.', { month: monthName }),
                this.t('worktime', 'Monat einreichen'),
                this.t('worktime', 'Einreichen'),
                false
            )
            if (!confirmed) {
                return
            }

            try {
                const result = await TimeEntryService.submitMonth(this.employeeId, this.year, this.month)
                showSuccess(this.t('worktime', '{count} Einträge wurden eingereicht.', { count: result.submitted }))
                await this.loadReport()
            } catch (error) {
                console.error('Failed to submit month:', error)
                showError(this.t('worktime', 'Fehler beim Einreichen des Monats.'))
            }
        },
    },
}
</script>

<style scoped>
.monthly-report-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1200px;
}

.view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;
}

.view-header h2 {
    margin: 0;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}

.report-content {
    display: flex;
    flex-direction: column;
    gap: 24px;
}

.report-section h3 {
    margin: 0 0 12px 0;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 16px;
}

.stat-card {
    padding: 16px;
    background: var(--color-background-dark);
    border-radius: var(--border-radius-large);
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.stat-label {
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.stat-value {
    font-size: 1.5em;
    font-weight: 600;
}

.absence-table {
    width: 100%;
    border-collapse: collapse;
}

.absence-table th,
.absence-table td {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.absence-table th {
    font-weight: 600;
    background: var(--color-background-dark);
}

.holiday-list {
    list-style: none;
    padding: 0;
    margin: 0;
}

.holiday-list li {
    padding: 8px 0;
    border-bottom: 1px solid var(--color-border);
}

.status-info {
    display: flex;
    align-items: center;
    gap: 8px;
    color: var(--color-success);
    font-weight: 500;
}
</style>
