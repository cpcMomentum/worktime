<template>
    <div class="evaluation-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Auswertung') }}</h2>

            <div class="layout-seg" role="group" :aria-label="t('worktime', 'Zeitraum')">
                <button v-for="p in periods"
                    :key="p.value"
                    class="seg-btn"
                    :class="{ active: period === p.value }"
                    @click="setPeriod(p.value)">
                    {{ p.label }}
                </button>
            </div>

            <div class="period-nav">
                <NcButton type="tertiary" :aria-label="t('worktime', 'Zurück')" @click="shiftPeriod(-1)">
                    <template #icon><ChevronLeftIcon :size="20" /></template>
                </NcButton>
                <span class="period-nav__label">{{ periodLabel }}</span>
                <NcButton type="tertiary" :aria-label="t('worktime', 'Weiter')" @click="shiftPeriod(1)">
                    <template #icon><ChevronRightIcon :size="20" /></template>
                </NcButton>
            </div>
        </div>

        <div class="ev-tabs">
            <div class="layout-seg" role="group">
                <button class="seg-btn"
                    :class="{ active: tab === 'summary' }"
                    @click="tab = 'summary'">
                    {{ t('worktime', 'Zusammenfassung') }}
                </button>
                <button class="seg-btn"
                    :class="{ active: tab === 'entries' }"
                    @click="tab = 'entries'">
                    {{ t('worktime', 'Einzelbuchungen') }}
                </button>
            </div>
            <div class="ev-export">
                <NcButton type="secondary" @click="exportData('csv')">
                    <template #icon><DownloadIcon :size="18" /></template>
                    {{ t('worktime', 'CSV') }}
                </NcButton>
                <NcButton type="secondary" @click="exportData('pdf')">
                    <template #icon><DownloadIcon :size="18" /></template>
                    {{ t('worktime', 'PDF') }}
                </NcButton>
            </div>
        </div>

        <div class="ev-kpis">
            <div class="ev-kpi">
                <div class="ev-kpi-label">{{ t('worktime', 'Gebuchte Stunden') }}</div>
                <div class="ev-kpi-value">{{ hours(totals.totalMinutes) }}</div>
            </div>
            <div class="ev-kpi">
                <div class="ev-kpi-label">{{ t('worktime', 'Projekte') }}</div>
                <div class="ev-kpi-value">{{ totals.projectCount }}</div>
            </div>
            <div class="ev-kpi">
                <div class="ev-kpi-label">{{ t('worktime', 'Mitarbeitende') }}</div>
                <div class="ev-kpi-value">{{ totals.employeeCount }}</div>
            </div>
        </div>

        <!-- Zusammenfassung -->
        <template v-if="tab === 'summary'">
            <div class="ev-mode">
                <span class="ev-mode-label">{{ t('worktime', 'Ansicht') }}:</span>
                <div class="layout-seg" role="group">
                    <button class="seg-btn"
                        :class="{ active: mode === 'project' }"
                        @click="mode = 'project'">
                        {{ t('worktime', 'Nach Projekt') }}
                    </button>
                    <button class="seg-btn"
                        :class="{ active: mode === 'employee' }"
                        @click="mode = 'employee'">
                        {{ t('worktime', 'Nach Mitarbeiter') }}
                    </button>
                </div>
            </div>

            <NcLoadingIcon v-if="loading" class="ev-loading" :size="32" />

            <div v-else-if="!groups.length" class="ev-empty">
                {{ t('worktime', 'Für diesen Zeitraum liegen keine Buchungen vor.') }}
            </div>

            <table v-else class="ev-table">
                <thead>
                    <tr>
                        <th>{{ mode === 'project' ? t('worktime', 'Projekt') : t('worktime', 'Mitarbeiter') }}</th>
                        <th class="ev-num">{{ t('worktime', 'Stunden') }}</th>
                        <th class="ev-num">{{ t('worktime', 'Anteil') }}</th>
                        <th class="ev-num">{{ mode === 'project' ? t('worktime', 'Mitarbeitende') : t('worktime', 'Projekte') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <template v-for="group in groups">
                        <tr :key="group.key" class="ev-group-row" @click="toggle(group.key)">
                            <td class="ev-name">
                                <ChevronRightIcon class="ev-caret" :class="{ open: isOpen(group.key) }" :size="16" />
                                <span class="ev-dot" :style="{ background: group.color || 'var(--color-border-dark)' }" />
                                <span>{{ group.name }}</span>
                                <span v-if="group.customer" class="ev-customer">· {{ group.customer }}</span>
                            </td>
                            <td class="ev-num">{{ hours(group.minutes) }}</td>
                            <td class="ev-num">{{ share(group.minutes) }}</td>
                            <td class="ev-num">{{ group.children.length }}</td>
                        </tr>
                        <tr v-for="child in (isOpen(group.key) ? group.children : [])"
                            :key="group.key + '-' + child.key"
                            class="ev-child-row">
                            <td class="ev-name ev-child-name">
                                <span class="ev-dot ev-dot--sm" :style="{ background: child.color || 'var(--color-border-dark)' }" />
                                <span>{{ child.name }}</span>
                            </td>
                            <td class="ev-num">{{ hours(child.minutes) }}</td>
                            <td class="ev-num ev-muted">{{ share(child.minutes, group.minutes) }}</td>
                            <td class="ev-num" />
                        </tr>
                    </template>
                </tbody>
                <tfoot>
                    <tr>
                        <td class="ev-name ev-total">{{ t('worktime', 'Gesamt') }}</td>
                        <td class="ev-num">{{ hours(totals.totalMinutes) }}</td>
                        <td class="ev-num">100 %</td>
                        <td class="ev-num" />
                    </tr>
                </tfoot>
            </table>
        </template>

        <!-- Einzelbuchungen -->
        <template v-else>
            <NcLoadingIcon v-if="entriesLoading" class="ev-loading" :size="32" />

            <div v-else-if="!entries.length" class="ev-empty">
                {{ t('worktime', 'Für diesen Zeitraum liegen keine Buchungen vor.') }}
            </div>

            <table v-else class="ev-table ev-entries">
                <thead>
                    <tr>
                        <th>{{ t('worktime', 'Datum') }}</th>
                        <th>{{ t('worktime', 'Projekt') }}</th>
                        <th>{{ t('worktime', 'Kunde') }}</th>
                        <th>{{ t('worktime', 'Mitarbeiter') }}</th>
                        <th class="ev-num">{{ t('worktime', 'Stunden') }}</th>
                        <th>{{ t('worktime', 'Tätigkeit') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="entry in entries" :key="entry.id">
                        <td>{{ formatDate(entry.date) }}</td>
                        <td class="ev-name">
                            <span class="ev-dot ev-dot--sm" :style="{ background: entry.color || 'var(--color-border-dark)' }" />
                            <span>{{ entry.projectName || t('worktime', 'Kein Projekt') }}</span>
                        </td>
                        <td class="ev-muted">{{ entry.customer || '–' }}</td>
                        <td>{{ entry.employeeName || t('worktime', 'Unbekannt') }}</td>
                        <td class="ev-num">{{ hours(entry.minutes) }}</td>
                        <td class="ev-desc">{{ entry.description || '' }}</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="4" class="ev-total">{{ t('worktime', 'Gesamt') }}</td>
                        <td class="ev-num">{{ hours(totals.totalMinutes) }}</td>
                        <td />
                    </tr>
                </tfoot>
            </table>
        </template>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import DownloadIcon from 'vue-material-design-icons/Download.vue'
import ReportService from '../services/ReportService.js'
import { formatMinutes } from '../utils/timeUtils.js'
import { formatDate as formatDateUtil, getMonthName } from '../utils/dateUtils.js'
import { showErrorMessage } from '../utils/errorHandler.js'

export default {
    name: 'EvaluationView',
    components: {
        NcButton,
        NcLoadingIcon,
        ChevronLeftIcon,
        ChevronRightIcon,
        DownloadIcon,
    },
    data() {
        const now = new Date()
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            period: 'month',
            mode: 'project',
            tab: 'summary',
            loading: false,
            entriesLoading: false,
            totals: { totalMinutes: 0, projectCount: 0, employeeCount: 0 },
            rows: [],
            entries: [],
            openKeys: {},
        }
    },
    computed: {
        periods() {
            return [
                { value: 'month', label: this.t('worktime', 'Monat') },
                { value: 'quarter', label: this.t('worktime', 'Quartal') },
                { value: 'year', label: this.t('worktime', 'Jahr') },
            ]
        },
        periodLabel() {
            if (this.period === 'year') {
                return String(this.year)
            }
            if (this.period === 'quarter') {
                return `Q${Math.floor((this.month - 1) / 3) + 1} ${this.year}`
            }
            return `${getMonthName(this.month)} ${this.year}`
        },
        groups() {
            const byKey = {}
            for (const row of this.rows) {
                const isProject = this.mode === 'project'
                const key = String(isProject ? row.projectId : row.employeeId)
                if (!byKey[key]) {
                    byKey[key] = {
                        key,
                        name: isProject
                            ? (row.projectName || this.t('worktime', 'Kein Projekt'))
                            : (row.employeeName || this.t('worktime', 'Unbekannt')),
                        color: isProject ? row.color : null,
                        customer: isProject ? row.customer : null,
                        minutes: 0,
                        children: [],
                    }
                }
                byKey[key].minutes += row.minutes
                byKey[key].children.push({
                    key: String(isProject ? row.employeeId : row.projectId),
                    name: isProject
                        ? (row.employeeName || this.t('worktime', 'Unbekannt'))
                        : (row.projectName || this.t('worktime', 'Kein Projekt')),
                    // Children carry the project colour for recognition (project side only).
                    color: isProject ? null : row.color,
                    minutes: row.minutes,
                })
            }
            const groups = Object.values(byKey)
            groups.forEach(g => g.children.sort((a, b) => b.minutes - a.minutes))
            groups.sort((a, b) => b.minutes - a.minutes)
            return groups
        },
    },
    watch: {
        period() { this.refresh() },
        mode() { this.openKeys = {} },
        tab(value) { if (value === 'entries') { this.loadEntries() } },
    },
    created() {
        this.refresh()
    },
    methods: {
        hours(minutes) {
            return `${formatMinutes(minutes || 0)} h`
        },
        formatDate(date) {
            return formatDateUtil(date)
        },
        share(minutes, base = this.totals.totalMinutes) {
            if (!base) return '0 %'
            return `${Math.round((minutes / base) * 100)} %`
        },
        isOpen(key) {
            return !!this.openKeys[key]
        },
        toggle(key) {
            this.$set(this.openKeys, key, !this.openKeys[key])
        },
        setPeriod(value) {
            this.period = value
        },
        shiftPeriod(direction) {
            if (this.period === 'year') {
                this.year += direction
            } else if (this.period === 'quarter') {
                this.month += direction * 3
            } else {
                this.month += direction
            }
            while (this.month > 12) { this.month -= 12; this.year += 1 }
            while (this.month < 1) { this.month += 12; this.year -= 1 }
            this.refresh()
        },
        refresh() {
            this.load()
            if (this.tab === 'entries') {
                this.loadEntries()
            }
        },
        async load() {
            this.loading = true
            try {
                const data = await ReportService.getProjectEvaluation({
                    year: this.year,
                    month: this.month,
                    period: this.period,
                })
                if (data) {
                    this.rows = data.rows || []
                    this.totals = data.totals || this.totals
                }
            } catch (error) {
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Laden der Auswertung'))
            } finally {
                this.loading = false
            }
        },
        async loadEntries() {
            this.entriesLoading = true
            try {
                const data = await ReportService.getProjectEntries({
                    year: this.year,
                    month: this.month,
                    period: this.period,
                })
                if (data) {
                    this.entries = data.entries || []
                }
            } catch (error) {
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Laden der Auswertung'))
            } finally {
                this.entriesLoading = false
            }
        },
        exportData(format) {
            ReportService.downloadProjectExport(format, {
                year: this.year,
                month: this.month,
                period: this.period,
            })
        },
    },
}
</script>

<style scoped>
.evaluation-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1000px;
}

/* Header: aligned with the time-tracking view */
.view-header {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
}

.view-header h2 {
    margin: 0;
}

.layout-seg {
    display: flex;
    background: var(--color-background-dark);
    border-radius: var(--border-radius-element, 8px);
    padding: 3px;
}

.seg-btn {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    background: none;
    border: none;
    padding: 6px 14px;
    border-radius: var(--border-radius-element, 8px);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.seg-btn.active {
    background: var(--color-main-background);
    color: var(--color-primary-element);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

.period-nav {
    display: flex;
    align-items: center;
    gap: 8px;
}

.period-nav__label {
    font-size: 1.1em;
    font-weight: 500;
    min-width: 11rem;
    text-align: center;
}

.ev-tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 16px;
}

.ev-export {
    display: flex;
    gap: 8px;
}

.ev-kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 12px;
    margin-bottom: 20px;
}

.ev-kpi {
    background: var(--color-background-hover);
    border-radius: var(--border-radius-large, 12px);
    padding: 12px 16px;
}

.ev-kpi-label {
    color: var(--color-text-maxcontrast);
    font-size: 0.85em;
}

.ev-kpi-value {
    font-size: 1.4em;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}

.ev-mode {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 12px;
}

.ev-mode-label {
    color: var(--color-text-maxcontrast);
}

.ev-table {
    width: 100%;
    border-collapse: collapse;
}

.ev-entries th,
.ev-entries td {
    font-size: 0.9em;
}

.ev-desc {
    color: var(--color-text-maxcontrast);
}

.ev-table th,
.ev-table td {
    padding: 8px 10px;
    border-bottom: 1px solid var(--color-border-light, var(--color-border));
    text-align: left;
}

.ev-table th {
    color: var(--color-text-maxcontrast);
    font-weight: 500;
    font-size: 0.85em;
}

.ev-num {
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.ev-group-row {
    cursor: pointer;
}

.ev-group-row:hover {
    background: var(--color-background-hover);
}

.ev-name {
    display: flex;
    align-items: center;
    gap: 8px;
    font-weight: 500;
}

.ev-caret {
    transition: transform 0.15s ease;
    color: var(--color-text-maxcontrast);
}

.ev-caret.open {
    transform: rotate(90deg);
}

.ev-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}

.ev-dot--sm {
    width: 8px;
    height: 8px;
}

.ev-customer {
    color: var(--color-text-maxcontrast);
    font-weight: normal;
    font-size: 0.9em;
}

.ev-child-row td {
    border-bottom: 1px solid var(--color-border-light, var(--color-border));
    background: var(--color-background-hover);
}

.ev-child-name {
    padding-left: 52px;
    font-weight: normal;
    color: var(--color-main-text);
}

.ev-muted {
    color: var(--color-text-maxcontrast);
}

.ev-total {
    font-weight: 600;
}

.ev-table tfoot td {
    font-weight: 600;
    border-top: 2px solid var(--color-border);
    border-bottom: none;
}

.ev-loading,
.ev-empty {
    margin-top: 40px;
    text-align: center;
    color: var(--color-text-maxcontrast);
}
</style>
