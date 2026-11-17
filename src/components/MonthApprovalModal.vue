<template>
    <NcModal size="large" label-id="wt-month-approval-title" @close="$emit('close')">
        <div class="month-detail">
            <h3 id="wt-month-approval-title">{{ item.employeeName }} · {{ monthLabel }}</h3>

            <div class="month-detail__summary">
                <span>{{ entries.length }} {{ t('worktime', 'Einträge') }}</span>
                <span class="month-detail__total">{{ totalLabel }}</span>
            </div>

            <NcLoadingIcon v-if="loading" :size="44" class="month-detail__loading" />

            <p v-else-if="!entries.length" class="month-detail__empty">
                {{ t('worktime', 'Keine Einträge in diesem Monat.') }}
            </p>

            <div v-else class="month-detail__card">
                <table class="month-table">
                    <thead>
                        <tr>
                            <th>{{ t('worktime', 'Datum') }}</th>
                            <th>{{ t('worktime', 'Zeiten') }}</th>
                            <th class="num">{{ t('worktime', 'Pause') }}</th>
                            <th class="num">{{ t('worktime', 'Stunden') }}</th>
                            <th>{{ t('worktime', 'Projekt') }}</th>
                            <th>{{ t('worktime', 'Beschreibung') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="e in sortedEntries" :key="e.id">
                            <td class="nowrap">{{ formatDate(e.date) }}</td>
                            <td class="nowrap">{{ e.startTime }} – {{ e.endTime }}</td>
                            <td class="num">{{ e.breakMinutes }} {{ t('worktime', 'Min') }}</td>
                            <td class="num">{{ hoursLabel(e.workMinutes) }}</td>
                            <td>{{ projectName(e.projectId) || '–' }}</td>
                            <td class="desc">{{ e.description || '' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div class="month-detail__actions">
                <NcCheckboxRadioSwitch v-if="archiveConfigured"
                    v-model="archiveAfterApprove"
                    class="month-detail__archive-toggle">
                    {{ t('worktime', 'PDF nach dem Genehmigen sofort archivieren') }}
                </NcCheckboxRadioSwitch>
                <NcButton variant="tertiary" @click="downloadPdf">
                    <template #icon><FilePdfBoxIcon :size="18" /></template>
                    {{ t('worktime', 'Monatsbericht als PDF') }}
                </NcButton>
                <NcButton variant="tertiary" @click="$emit('reject')">
                    <template #icon><RestoreIcon :size="18" /></template>
                    {{ t('worktime', 'Zurückweisen') }}
                </NcButton>
                <NcButton variant="primary" @click="$emit('approve', archiveAfterApprove)">
                    <template #icon><CheckIcon :size="18" /></template>
                    {{ t('worktime', 'Genehmigen') }}
                </NcButton>
            </div>
        </div>
    </NcModal>
</template>

<script>
import NcModal from '@nextcloud/vue/components/NcModal'
import NcButton from '@nextcloud/vue/components/NcButton'
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcCheckboxRadioSwitch from '@nextcloud/vue/components/NcCheckboxRadioSwitch'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import RestoreIcon from 'vue-material-design-icons/Restore.vue'
import FilePdfBoxIcon from 'vue-material-design-icons/FilePdfBox.vue'
import { showError } from '@nextcloud/dialogs'
import TimeEntryService from '../services/TimeEntryService.js'
import ProjectService from '../services/ProjectService.js'
import ReportService from '../services/ReportService.js'
import { formatDate, getMonthName } from '../utils/dateUtils.js'
import { formatMinutes } from '../utils/timeUtils.js'

export default {
    name: 'MonthApprovalModal',
    components: {
        NcModal,
        NcButton,
        NcLoadingIcon,
        NcCheckboxRadioSwitch,
        CheckIcon,
        RestoreIcon,
        FilePdfBoxIcon,
    },
    props: {
        item: {
            type: Object,
            required: true,
        },
        archiveConfigured: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['approve', 'reject', 'close'],
    data() {
        return {
            entries: [],
            projects: [],
            loading: true,
            archiveAfterApprove: false,
        }
    },
    computed: {
        monthLabel() {
            return `${getMonthName(this.item.month)} ${this.item.year}`
        },
        sortedEntries() {
            return this.entries.slice().sort((a, b) => {
                const d = (a.date || '').localeCompare(b.date || '')
                return d !== 0 ? d : (a.startTime || '').localeCompare(b.startTime || '')
            })
        },
        totalLabel() {
            const total = this.entries.reduce((sum, e) => sum + (e.workMinutes || 0), 0)
            return `${formatMinutes(total)} h`
        },
    },
    async mounted() {
        try {
            const [entries, projects] = await Promise.all([
                TimeEntryService.getByEmployee(this.item.employeeId, this.item.year, this.item.month),
                ProjectService.getAll(),
            ])
            this.entries = Array.isArray(entries) ? entries : (entries?.data || [])
            this.projects = Array.isArray(projects) ? projects : (projects?.data || [])
        } catch (error) {
            console.error('Failed to load month entries:', error)
            showError(t('worktime', 'Fehler beim Laden der Monatseinträge'))
        } finally {
            this.loading = false
        }
    },
    methods: {
        formatDate,
        downloadPdf() {
            ReportService.downloadPdf(this.item.employeeId, this.item.year, this.item.month)
        },
        projectName(projectId) {
            if (!projectId) return ''
            const project = this.projects.find(p => p.id === projectId)
            return project?.name || project?.displayName || ''
        },
        hoursLabel(minutes) {
            return `${formatMinutes(minutes || 0)} h`
        },
    },
}
</script>

<style scoped>
.month-detail {
    padding: 20px 24px 24px;
}

.month-detail h3 {
    margin: 0 0 6px;
}

.month-detail__summary {
    display: flex;
    align-items: baseline;
    gap: 16px;
    margin-bottom: 16px;
    color: var(--color-text-maxcontrast);
}

.month-detail__total {
    font-weight: 600;
    color: var(--color-main-text);
}

.month-detail__loading {
    margin: 32px auto;
}

.month-detail__empty {
    color: var(--color-text-maxcontrast);
}

/* Tabelle im Card-Look wie Audit/Auswertung */
.month-detail__card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 4px 16px;
    overflow-x: auto;
}

.month-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.month-table th {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    white-space: nowrap;
}

.month-table th.num {
    text-align: right;
}

.month-table td {
    padding: 8px 12px;
    border-bottom: 1px solid var(--color-border);
    vertical-align: top;
}

.month-table tbody tr:last-child td {
    border-bottom: none;
}

.month-table .num {
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.month-table .nowrap {
    white-space: nowrap;
}

.month-table .desc {
    color: var(--color-text-maxcontrast);
    overflow-wrap: anywhere;
}

/* Aktionsleiste bleibt beim Scrollen langer Monate immer sichtbar */
.month-detail__actions {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 8px;
    position: sticky;
    bottom: 0;
    margin: 16px -24px -24px;
    padding: 14px 24px;
    background: var(--color-main-background);
    border-top: 1px solid var(--color-border);
}

/* Archiv-Schalter links, Buttons bleiben rechts */
.month-detail__archive-toggle {
    margin-right: auto;
}
</style>
