<template>
    <div class="evaluation-view">
        <div class="ev-head">
            <div>
                <h2>{{ t('worktime', 'Auswertung') }}</h2>
                <p class="ev-sub">{{ t('worktime', 'Stunden nach Projekt oder Mitarbeiter') }}</p>
            </div>
        </div>

        <div class="ev-controls">
            <div class="ev-seg">
                <button v-for="p in periods"
                    :key="p.value"
                    class="ev-seg-btn"
                    :class="{ active: period === p.value }"
                    @click="setPeriod(p.value)">
                    {{ p.label }}
                </button>
            </div>

            <div class="ev-period-nav">
                <NcButton type="tertiary" :aria-label="t('worktime', 'Zurück')" @click="shiftPeriod(-1)">
                    <template #icon><ChevronLeftIcon :size="20" /></template>
                </NcButton>
                <span class="ev-period-label">{{ periodLabel }}</span>
                <NcButton type="tertiary" :aria-label="t('worktime', 'Weiter')" @click="shiftPeriod(1)">
                    <template #icon><ChevronRightIcon :size="20" /></template>
                </NcButton>
            </div>

            <NcCheckboxRadioSwitch :checked.sync="billableOnly">
                {{ t('worktime', 'nur abrechenbare Stunden') }}
            </NcCheckboxRadioSwitch>
        </div>

        <div class="ev-kpis">
            <div class="ev-kpi">
                <div class="ev-kpi-label">{{ t('worktime', 'Gebuchte Stunden') }}</div>
                <div class="ev-kpi-value">{{ hours(totals.totalMinutes) }}</div>
            </div>
            <div class="ev-kpi">
                <div class="ev-kpi-label">{{ t('worktime', 'davon abrechenbar') }}</div>
                <div class="ev-kpi-value">{{ hours(totals.billableMinutes) }}</div>
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

        <div class="ev-mode">
            <span class="ev-mode-label">{{ t('worktime', 'Ansicht') }}:</span>
            <div class="ev-seg">
                <button class="ev-seg-btn"
                    :class="{ active: mode === 'project' }"
                    @click="mode = 'project'">
                    {{ t('worktime', 'Nach Projekt') }}
                </button>
                <button class="ev-seg-btn"
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
                            <span v-if="group.color" class="ev-dot" :style="{ background: group.color }" />
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
                        <td class="ev-name ev-child-name">{{ child.name }}</td>
                        <td class="ev-num">{{ hours(child.minutes) }}</td>
                        <td class="ev-num ev-muted">{{ share(child.minutes, group.minutes) }}</td>
                        <td class="ev-num" />
                    </tr>
                </template>
            </tbody>
            <tfoot>
                <tr>
                    <td class="ev-name">{{ t('worktime', 'Gesamt') }}</td>
                    <td class="ev-num">{{ hours(totals.totalMinutes) }}</td>
                    <td class="ev-num">100 %</td>
                    <td class="ev-num" />
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import ReportService from '../services/ReportService.js'
import { formatMinutes } from '../utils/timeUtils.js'
import { showErrorMessage } from '../utils/errorHandler.js'

export default {
    name: 'EvaluationView',
    components: {
        NcButton,
        NcCheckboxRadioSwitch,
        NcLoadingIcon,
        ChevronLeftIcon,
        ChevronRightIcon,
    },
    data() {
        const now = new Date()
        return {
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            period: 'month',
            billableOnly: false,
            mode: 'project',
            loading: false,
            totals: { totalMinutes: 0, billableMinutes: 0, projectCount: 0, employeeCount: 0 },
            rows: [],
            periodLabelFromApi: '',
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
            return this.periodLabelFromApi
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
        period() { this.load() },
        billableOnly() { this.load() },
        mode() { this.openKeys = {} },
    },
    created() {
        this.load()
    },
    methods: {
        hours(minutes) {
            return `${formatMinutes(minutes || 0)} h`
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
            this.load()
        },
        async load() {
            this.loading = true
            try {
                const data = await ReportService.getProjectEvaluation({
                    year: this.year,
                    month: this.month,
                    period: this.period,
                    billableOnly: this.billableOnly,
                })
                if (data) {
                    this.rows = data.rows || []
                    this.totals = data.totals || this.totals
                    this.periodLabelFromApi = data.period?.label || ''
                }
            } catch (error) {
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Laden der Auswertung'))
            } finally {
                this.loading = false
            }
        },
    },
}
</script>

<style scoped>
.evaluation-view {
    padding: 20px;
    max-width: 960px;
}

.ev-head h2 {
    margin: 0;
}

.ev-sub {
    color: var(--color-text-maxcontrast);
    margin: 2px 0 16px;
}

.ev-controls {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 16px;
    margin-bottom: 16px;
}

.ev-seg {
    display: inline-flex;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-pill, 16px);
    overflow: hidden;
}

.ev-seg-btn {
    border: none;
    background: var(--color-main-background);
    color: var(--color-main-text);
    padding: 6px 14px;
    cursor: pointer;
    font-size: 0.9em;
}

.ev-seg-btn.active {
    background: var(--color-primary-element);
    color: var(--color-primary-element-text);
}

.ev-period-nav {
    display: flex;
    align-items: center;
    gap: 4px;
}

.ev-period-label {
    min-width: 96px;
    text-align: center;
    font-weight: 600;
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

.ev-customer {
    color: var(--color-text-maxcontrast);
    font-weight: normal;
    font-size: 0.9em;
}

.ev-child-row td {
    border-bottom: 1px solid var(--color-border-light, var(--color-border));
}

.ev-child-name {
    padding-left: 34px;
    font-weight: normal;
    color: var(--color-text-maxcontrast);
}

.ev-muted {
    color: var(--color-text-maxcontrast);
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
