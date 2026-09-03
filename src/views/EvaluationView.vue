<template>
    <div class="evaluation-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Auswertung') }}</h2>
        </div>

        <div class="view-toolbar">
            <div class="layout-seg" role="group" :aria-label="t('worktime', 'Ansicht')">
                <button class="seg-btn" :class="{ active: mode === 'mitarbeiter' }" @click="mode = 'mitarbeiter'">
                    <AccountMultipleIcon :size="18" />
                    {{ t('worktime', 'Mitarbeiter') }}
                </button>
                <button class="seg-btn" :class="{ active: mode === 'projekte' }" @click="mode = 'projekte'">
                    <FolderOutlineIcon :size="18" />
                    {{ t('worktime', 'Projekte') }}
                </button>
            </div>

            <div v-show="mode === 'projekte'" class="layout-seg" role="group" :aria-label="t('worktime', 'Zeitraum')">
                <button v-for="p in periods"
                    :key="p.value"
                    class="seg-btn"
                    :class="{ active: period === p.value }"
                    @click="setPeriod(p.value)">
                    <component :is="p.icon" :size="18" />
                    {{ p.label }}
                </button>
            </div>

            <div class="view-header__nav">
                <YearPicker v-show="mode === 'mitarbeiter'" :year="teamYear" @update="onTeamYearChange" />
                <div v-show="mode === 'projekte'" class="period-nav">
                    <NcButton type="tertiary" :aria-label="t('worktime', 'Zurück')" @click="shiftPeriod(-1)">
                        <template #icon><ChevronLeftIcon :size="20" /></template>
                    </NcButton>
                    <span class="period-nav__label">{{ periodLabel }}</span>
                    <NcButton type="tertiary" :aria-label="t('worktime', 'Weiter')" @click="shiftPeriod(1)">
                        <template #icon><ChevronRightIcon :size="20" /></template>
                    </NcButton>
                </div>
            </div>
        </div>

        <!-- Mitarbeiter: Jahresübersicht (aus „Team" hierher verschoben, #346) -->
        <div v-show="mode === 'mitarbeiter'" class="ev-mitarbeiter">
            <div v-if="teamReport.length > 0" class="ev-kpis">
                <div class="kpi-card">
                    <div class="kpi-lab">{{ t('worktime', 'Mitarbeitende') }}</div>
                    <div class="kpi-num">{{ teamKpis.count }}</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-lab">{{ t('worktime', 'Überstunden gesamt') }}</div>
                    <div class="kpi-num" :class="teamKpis.overtimeMinutes >= 0 ? 'kpi-pos' : 'kpi-neg'">{{ signedHours(teamKpis.overtimeMinutes) }}</div>
                </div>
                <div class="kpi-card">
                    <div class="kpi-lab">{{ t('worktime', 'Urlaub genommen') }}</div>
                    <div class="kpi-num">{{ teamKpis.vacationUsed }} <span class="kpi-sub">/ {{ teamKpis.vacationTotal }} {{ t('worktime', 'Tage') }}</span></div>
                </div>
            </div>
            <NcLoadingIcon v-if="teamLoading" :size="44" />
            <template v-else-if="teamReport.length > 0">
                <div class="ev-subtabs">
                    <div class="layout-seg" role="group">
                        <button class="seg-btn" :class="{ active: teamSubtab === 'overview' }" @click="teamSubtab = 'overview'">
                            <ViewListOutlineIcon :size="18" />
                            {{ t('worktime', 'Übersicht') }}
                        </button>
                        <button class="seg-btn" :class="{ active: teamSubtab === 'months' }" @click="teamSubtab = 'months'">
                            <CalendarTextOutlineIcon :size="18" />
                            {{ t('worktime', 'Monatsdetail') }}
                        </button>
                    </div>
                </div>

                <!-- Übersicht: flache Tabelle, eine Zeile je Mitarbeiter (Projekte-Look) -->
                <div v-show="teamSubtab === 'overview'" class="ev-card">
                    <div v-if="teamDepartmentOptions.length > 1 || teamFilterDepartmentId !== null" class="ev-dept-filter">
                        <label for="teamDeptFilter">{{ t('worktime', 'Abteilung') }}</label>
                        <NcSelect id="teamDeptFilter"
                            v-model="selectedTeamDepartment"
                            :options="teamDepartmentOptions"
                            :placeholder="t('worktime', 'Alle Abteilungen')"
                            label="label"
                            class="ev-dept-select" />
                    </div>
                    <table class="ev-table">
                        <thead>
                            <tr>
                                <th class="sortable" @click="teamSortBy('name')">{{ t('worktime', 'Mitarbeiter') }}{{ teamSortArrow('name') }}</th>
                                <th class="ev-num sortable" @click="teamSortBy('overtime')">{{ t('worktime', 'Überstunden') }}{{ teamSortArrow('overtime') }}</th>
                                <th class="sortable" @click="teamSortBy('vacation')">{{ t('worktime', 'Resturlaub') }}{{ teamSortArrow('vacation') }}</th>
                                <th>{{ t('worktime', 'Status') }}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="row in teamOverviewRows" :key="row.id">
                                <td>
                                    <div class="ev-emp">
                                        <NcAvatar :user="row.userId" :display-name="row.name" :size="30" />
                                        <div>
                                            <div class="ev-emp-name">{{ row.name }}</div>
                                            <div class="ev-emp-sub">{{ weeklyLabel(row.weeklyHours) }} {{ t('worktime', 'Std./Woche') }}</div>
                                        </div>
                                    </div>
                                </td>
                                <td class="ev-num" :class="row.overtimeMinutes >= 0 ? 'kpi-pos' : 'kpi-neg'">{{ signedHours(row.overtimeMinutes) }}</td>
                                <td>
                                    <div class="ev-vac">
                                        <span class="ev-vac-num">{{ row.vacationRemaining }} / {{ row.vacationTotal }}</span>
                                        <span class="ev-vac-track"><span class="ev-vac-fill" :style="{ width: row.vacationPercent + '%' }" /></span>
                                    </div>
                                </td>
                                <td>
                                    <span v-if="row.openMonths > 0" class="ev-stchip ev-stchip--open">{{ t('worktime', 'Offen: {n}', { n: row.openMonths }) }}</span>
                                    <span v-else class="ev-stchip ev-stchip--ok">{{ t('worktime', '✓ aktuell') }}</span>
                                </td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td>{{ t('worktime', 'Team gesamt') }}</td>
                                <td class="ev-num" :class="teamKpis.overtimeMinutes >= 0 ? 'kpi-pos' : 'kpi-neg'">{{ signedHours(teamKpis.overtimeMinutes) }}</td>
                                <td>{{ teamKpis.vacationTotal - teamKpis.vacationUsed }} / {{ teamKpis.vacationTotal }}</td>
                                <td />
                            </tr>
                        </tfoot>
                    </table>
                </div>

                <!-- Monatsdetail: bestehende Monats-Grids -->
                <div v-show="teamSubtab === 'months'">
                    <TeamYearTable :report="filteredTeamReport" :year="teamYear" />
                </div>
            </template>
            <NcEmptyContent v-else :name="t('worktime', 'Kein Team')">
                <template #icon><AccountGroupIcon /></template>
                <template #description>{{ t('worktime', 'Sie haben keine Teammitglieder.') }}</template>
            </NcEmptyContent>
        </div>

        <div v-show="mode === 'projekte'">
        <div class="ev-filter">
            <div class="ev-filter__label">{{ t('worktime', 'Projekte') }}</div>
            <div class="ev-chips">
                <button class="ev-chip ev-chip--all" :class="{ on: !selectedProjects.size }" @click="clearProjects">
                    {{ t('worktime', 'Alle') }}
                </button>
                <button v-for="p in visibleProjects.list"
                    :key="'p' + p.id"
                    class="ev-chip"
                    :class="{ on: selectedProjects.has(p.id) }"
                    :style="chipStyle(p)"
                    @click="toggleProject(p.id)">
                    <span class="ev-cdot" :style="{ background: selectedProjects.has(p.id) ? (p.color ? textColorOn(p.color) : 'var(--color-primary-element-text)') : (p.color || 'var(--color-border-dark)') }" />
                    <span>{{ p.name }}</span>
                    <span v-if="p.customer" class="ev-ccust">· {{ p.customer }}</span>
                    <span v-if="selectedProjects.has(p.id)" class="ev-x">×</span>
                </button>
                <button v-if="visibleProjects.hidden" class="ev-chip ev-chip--more" @click="projectsExpanded = true">
                    {{ t('worktime', '+ {count} weitere', { count: visibleProjects.hidden }) }}
                </button>
                <label class="ev-search">
                    <MagnifyIcon :size="16" />
                    <input v-model="projectSearch" type="text" :placeholder="t('worktime', 'Projekt suchen …')">
                </label>
            </div>
        </div>

        <div v-if="projectDepartmentOptions.length > 1 || projectFilterDepartmentId !== null" class="ev-filter">
            <div class="ev-filter__label">{{ t('worktime', 'Abteilung') }}</div>
            <NcSelect id="projectDeptFilter"
                v-model="selectedProjectDepartment"
                :options="projectDepartmentOptions"
                :placeholder="t('worktime', 'Alle Abteilungen')"
                label="label"
                class="ev-dept-select" />
        </div>

        <div class="ev-filter">
            <div class="ev-filter__label">{{ t('worktime', 'Mitarbeitende') }}</div>
            <div class="ev-chips">
                <button class="ev-chip ev-chip--all" :class="{ on: !selectedEmployees.size }" @click="clearEmployees">
                    {{ t('worktime', 'Alle') }}
                </button>
                <button v-for="e in visibleEmployees.list"
                    :key="'e' + e.id"
                    class="ev-chip ev-chip--emp"
                    :class="{ on: selectedEmployees.has(e.id) }"
                    @click="toggleEmployee(e.id)">
                    <span class="ev-av">{{ initials(e.name) }}</span>
                    <span>{{ e.name }}</span>
                    <span v-if="selectedEmployees.has(e.id)" class="ev-x">×</span>
                </button>
                <button v-if="visibleEmployees.hidden" class="ev-chip ev-chip--more" @click="employeesExpanded = true">
                    {{ t('worktime', '+ {count} weitere', { count: visibleEmployees.hidden }) }}
                </button>
                <label class="ev-search">
                    <MagnifyIcon :size="16" />
                    <input v-model="employeeSearch" type="text" :placeholder="t('worktime', 'Mitarbeiter suchen …')">
                </label>
            </div>
        </div>

        <div class="ev-kpis">
            <div class="kpi-card">
                <div class="kpi-lab">{{ t('worktime', 'Gebuchte Stunden') }}</div>
                <div class="kpi-num">{{ hours(totals.totalMinutes) }}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-lab">{{ t('worktime', 'Projekte') }}</div>
                <div class="kpi-num">{{ totals.projectCount }}</div>
            </div>
            <div class="kpi-card">
                <div class="kpi-lab">{{ t('worktime', 'Mitarbeitende') }}</div>
                <div class="kpi-num">{{ totals.employeeCount }}</div>
            </div>
        </div>

        <div class="ev-tabs">
            <div class="layout-seg" role="group">
                <button class="seg-btn" :class="{ active: tab === 'agg' }" @click="tab = 'agg'">
                    <ChartBarIcon :size="18" />
                    {{ t('worktime', 'Aggregiert') }}
                </button>
                <button class="seg-btn" :class="{ active: tab === 'detail' }" @click="tab = 'detail'">
                    <FormatListBulletedIcon :size="18" />
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

        <NcLoadingIcon v-if="loading || (tab === 'detail' && entriesLoading)" class="ev-loading" :size="32" />

        <!-- Aggregiert: Stunden je Mitarbeiter -->
        <div v-else-if="tab === 'agg' && aggRows.length" class="ev-card">
        <table class="ev-table">
            <thead>
                <tr>
                    <th class="sortable" @click="sortBy('name')">{{ t('worktime', 'Mitarbeiter') }}{{ sortArrow('name') }}</th>
                    <th class="ev-num sortable" @click="sortBy('minutes')">{{ t('worktime', 'Stunden') }}{{ sortArrow('minutes') }}</th>
                    <th>{{ t('worktime', 'Anteil') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="r in aggRows" :key="r.id">
                    <td>
                        <div class="ev-emp-name">{{ r.name }}</div>
                        <div v-if="weeklyLabel(r.weeklyHours)" class="ev-emp-sub">{{ weeklyLabel(r.weeklyHours) }} {{ t('worktime', 'Std./Woche') }}</div>
                    </td>
                    <td class="ev-num">{{ hours(r.minutes) }}</td>
                    <td>
                        <div class="ev-share">
                            <div class="ev-bar"><span :style="{ width: pct(r.minutes) + '%' }" /></div>
                            <span class="ev-muted">{{ pct(r.minutes) }} %</span>
                        </div>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td>{{ t('worktime', 'Gesamt') }}</td>
                    <td class="ev-num">{{ hours(totals.totalMinutes) }}</td>
                    <td class="ev-muted">100 %</td>
                </tr>
            </tfoot>
        </table>
        </div>

        <!-- Einzelbuchungen -->
        <div v-else-if="tab === 'detail' && detailRows.length" class="ev-card">
        <table class="ev-table ev-entries">
            <thead>
                <tr>
                    <th class="sortable" @click="sortBy('date')">{{ t('worktime', 'Datum') }}{{ sortArrow('date') }}</th>
                    <th>{{ t('worktime', 'Projekt') }}</th>
                    <th>{{ t('worktime', 'Kunde') }}</th>
                    <th class="sortable" @click="sortBy('name')">{{ t('worktime', 'Mitarbeiter') }}{{ sortArrow('name') }}</th>
                    <th class="ev-num sortable" @click="sortBy('minutes')">{{ t('worktime', 'Stunden') }}{{ sortArrow('minutes') }}</th>
                    <th>{{ t('worktime', 'Beschreibung') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in detailRows" :key="entry.id">
                    <td>{{ formatDate(entry.date) }}</td>
                    <td class="ev-name">
                        <span class="ev-cdot" :style="{ background: entry.color || 'var(--color-border-dark)' }" />
                        <span>{{ entry.projectName || t('worktime', 'Kein Projekt') }}</span>
                    </td>
                    <td class="ev-muted">{{ entry.customer || '–' }}</td>
                    <td>{{ entry.employeeName || t('worktime', 'Unbekannt') }}</td>
                    <td class="ev-num">{{ hours(entry.minutes) }}</td>
                    <td class="ev-muted">{{ entry.description || '' }}</td>
                </tr>
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="4">{{ t('worktime', 'Gesamt') }}</td>
                    <td class="ev-num">{{ hours(totals.totalMinutes) }}</td>
                    <td />
                </tr>
            </tfoot>
        </table>
        </div>

        <div v-else class="ev-empty">
            {{ t('worktime', 'Für diese Auswahl liegen keine Buchungen vor.') }}
        </div>
        </div>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue'
import DownloadIcon from 'vue-material-design-icons/Download.vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import AccountMultipleIcon from 'vue-material-design-icons/AccountMultiple.vue'
import FolderOutlineIcon from 'vue-material-design-icons/FolderOutline.vue'
import ViewListOutlineIcon from 'vue-material-design-icons/ViewListOutline.vue'
import CalendarTextOutlineIcon from 'vue-material-design-icons/CalendarTextOutline.vue'
import ChartBarIcon from 'vue-material-design-icons/ChartBar.vue'
import FormatListBulletedIcon from 'vue-material-design-icons/FormatListBulleted.vue'
import CalendarMonthOutlineIcon from 'vue-material-design-icons/CalendarMonthOutline.vue'
import CalendarRangeIcon from 'vue-material-design-icons/CalendarRange.vue'
import CalendarOutlineIcon from 'vue-material-design-icons/CalendarOutline.vue'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import { mapGetters } from 'vuex'
import YearPicker from '../components/YearPicker.vue'
import TeamYearTable from '../components/TeamYearTable.vue'
import ReportService from '../services/ReportService.js'
import { formatMinutes } from '../utils/timeUtils.js'
import { formatDate as formatDateUtil, getMonthName } from '../utils/dateUtils.js'
import { textColorOn } from '../utils/colorUtils.js'
import { showErrorMessage } from '../utils/errorHandler.js'
import { departmentFilterOptions, matchesDepartment } from '../utils/departmentFilter.js'

export default {
    name: 'EvaluationView',
    components: {
        NcButton,
        NcLoadingIcon,
        NcEmptyContent,
        NcAvatar,
        NcSelect,
        ChevronLeftIcon,
        ChevronRightIcon,
        DownloadIcon,
        MagnifyIcon,
        AccountGroupIcon,
        AccountMultipleIcon,
        FolderOutlineIcon,
        ViewListOutlineIcon,
        CalendarTextOutlineIcon,
        ChartBarIcon,
        FormatListBulletedIcon,
        CalendarMonthOutlineIcon,
        CalendarRangeIcon,
        CalendarOutlineIcon,
        YearPicker,
        TeamYearTable,
    },
    data() {
        const now = new Date()
        return {
            mode: 'mitarbeiter',
            teamYear: now.getFullYear(),
            teamReport: [],
            teamLoading: false,
            teamSubtab: 'overview',
            teamSort: { key: 'name', dir: 1 },
            year: now.getFullYear(),
            month: now.getMonth() + 1,
            period: 'month',
            tab: 'agg',
            loading: false,
            entriesLoading: false,
            rows: [],
            entries: [],
            entriesLoadedKey: null,
            selectedProjects: new Set(),
            selectedEmployees: new Set(),
            sort: { key: 'minutes', dir: -1 },
            // Chip scaling: only the top N unselected chips are shown by default;
            // the rest is reachable via search or "+ N weitere".
            topN: 8,
            projectSearch: '',
            employeeSearch: '',
            projectsExpanded: false,
            employeesExpanded: false,
            teamFilterDepartmentId: null,
            projectFilterDepartmentId: null,
        }
    },
    computed: {
        ...mapGetters('departments', ['departments']),
        ...mapGetters('employees', ['employees']),
        /** departmentId -> name, for label lookup (client-side join, G2). */
        departmentsById() {
            const map = {}
            for (const d of this.departments) {
                map[d.id] = d
            }
            return map
        },
        departmentName() {
            return (id) => this.departmentsById[id]?.name || this.t('worktime', 'Abteilung')
        },
        /** employeeId -> departmentId, from the (scoped) employees store. */
        employeeDepartmentById() {
            const map = {}
            for (const e of this.employees) {
                map[e.id] = e.departmentId ?? null
            }
            return map
        },
        /**
         * Team report narrowed by the department filter. The filter is a pure
         * subset of the already permission-scoped teamReport — it never adds
         * anyone (#570 P2).
         */
        filteredTeamReport() {
            if (this.teamFilterDepartmentId === null) {
                return this.teamReport
            }
            return this.teamReport.filter(m =>
                matchesDepartment(m.employee?.departmentId ?? null, this.teamFilterDepartmentId),
            )
        },
        teamDepartmentOptions() {
            return departmentFilterOptions(
                this.teamReport,
                m => m.employee?.departmentId ?? null,
                id => this.departmentName(id),
                this.t('worktime', 'Ohne Abteilung'),
            )
        },
        selectedTeamDepartment: {
            get() {
                return this.teamDepartmentOptions.find(o => o.id === this.teamFilterDepartmentId) || null
            },
            set(value) {
                this.teamFilterDepartmentId = value ? value.id : null
            },
        },
        projectDepartmentOptions() {
            return departmentFilterOptions(
                this.employeeChipsRaw,
                e => this.employeeDepartmentById[e.id] ?? null,
                id => this.departmentName(id),
                this.t('worktime', 'Ohne Abteilung'),
            )
        },
        selectedProjectDepartment: {
            get() {
                return this.projectDepartmentOptions.find(o => o.id === this.projectFilterDepartmentId) || null
            },
            set(value) {
                this.projectFilterDepartmentId = value ? value.id : null
            },
        },
        teamKpis() {
            let overtimeMinutes = 0
            let vacationUsed = 0
            let vacationTotal = 0
            for (const m of this.filteredTeamReport) {
                overtimeMinutes += m.totalOvertimeMinutes || 0
                vacationUsed += m.vacationStats?.used || 0
                vacationTotal += m.vacationStats?.total || 0
            }
            return { count: this.filteredTeamReport.length, overtimeMinutes, vacationUsed, vacationTotal }
        },
        teamOverviewRows() {
            const rows = this.filteredTeamReport.map(m => {
                const used = m.vacationStats?.used || 0
                const total = m.vacationStats?.total || 0
                const remaining = total - used
                const openMonths = (m.months || []).filter(mm => mm.status === 'submitted').length
                return {
                    id: m.employee.id,
                    userId: m.employee.userId,
                    name: m.employee.fullName,
                    weeklyHours: m.employee.weeklyHours,
                    overtimeMinutes: m.totalOvertimeMinutes || 0,
                    vacationTotal: total,
                    vacationRemaining: remaining,
                    vacationPercent: total > 0 ? Math.max(0, Math.min(100, Math.round((remaining / total) * 100))) : 0,
                    openMonths,
                }
            })
            const { key, dir } = this.teamSort
            rows.sort((a, b) => {
                let cmp = 0
                if (key === 'overtime') cmp = a.overtimeMinutes - b.overtimeMinutes
                else if (key === 'vacation') cmp = a.vacationRemaining - b.vacationRemaining
                else cmp = a.name.localeCompare(b.name)
                return cmp * dir
            })
            return rows
        },
        periods() {
            return [
                { value: 'month', label: this.t('worktime', 'Monat'), icon: CalendarMonthOutlineIcon },
                { value: 'quarter', label: this.t('worktime', 'Quartal'), icon: CalendarRangeIcon },
                { value: 'year', label: this.t('worktime', 'Jahr'), icon: CalendarOutlineIcon },
            ]
        },
        periodLabel() {
            if (this.period === 'year') return String(this.year)
            if (this.period === 'quarter') return `Q${Math.floor((this.month - 1) / 3) + 1} ${this.year}`
            return `${getMonthName(this.month)} ${this.year}`
        },
        projectChips() {
            const seen = {}
            for (const r of this.rows) {
                if (!seen[r.projectId]) {
                    seen[r.projectId] = {
                        id: r.projectId,
                        name: r.projectName || this.t('worktime', 'Kein Projekt'),
                        customer: r.customer,
                        color: r.color,
                    }
                }
            }
            return Object.values(seen).sort((a, b) => a.name.localeCompare(b.name))
        },
        employeeChipsRaw() {
            const seen = {}
            for (const r of this.rows) {
                if (!seen[r.employeeId]) {
                    seen[r.employeeId] = { id: r.employeeId, name: r.employeeName || this.t('worktime', 'Unbekannt') }
                }
            }
            return Object.values(seen).sort((a, b) => a.name.localeCompare(b.name))
        },
        employeeChips() {
            // Narrow the employee chips to the selected department (subset only).
            return this.employeeChipsRaw.filter(e =>
                matchesDepartment(this.employeeDepartmentById[e.id] ?? null, this.projectFilterDepartmentId),
            )
        },
        projectMinutes() {
            const m = {}
            for (const r of this.rows) m[r.projectId] = (m[r.projectId] || 0) + r.minutes
            return m
        },
        employeeMinutes() {
            const m = {}
            for (const r of this.rows) m[r.employeeId] = (m[r.employeeId] || 0) + r.minutes
            return m
        },
        visibleProjects() {
            return this.buildChips(this.projectChips, this.selectedProjects, this.projectSearch, this.projectsExpanded, this.projectMinutes)
        },
        visibleEmployees() {
            return this.buildChips(this.employeeChips, this.selectedEmployees, this.employeeSearch, this.employeesExpanded, this.employeeMinutes)
        },
        filteredRows() {
            return this.rows.filter(r =>
                (!this.selectedProjects.size || this.selectedProjects.has(r.projectId))
                && (!this.selectedEmployees.size || this.selectedEmployees.has(r.employeeId))
                && matchesDepartment(this.employeeDepartmentById[r.employeeId] ?? null, this.projectFilterDepartmentId),
            )
        },
        totals() {
            const fr = this.filteredRows
            const projects = new Set()
            const employees = new Set()
            let total = 0
            for (const r of fr) {
                total += r.minutes
                if (r.projectId > 0) projects.add(r.projectId)
                employees.add(r.employeeId)
            }
            return { totalMinutes: total, projectCount: projects.size, employeeCount: employees.size }
        },
        aggRows() {
            // Wochenstunden je Mitarbeiter aus dem Team-Report (id + userId als Schlüssel)
            const weeklyByEmp = {}
            for (const m of this.teamReport) {
                if (m.employee?.weeklyHours != null) {
                    weeklyByEmp[m.employee.id] = m.employee.weeklyHours
                    if (m.employee.userId) weeklyByEmp[m.employee.userId] = m.employee.weeklyHours
                }
            }
            const byEmp = {}
            for (const r of this.filteredRows) {
                if (!byEmp[r.employeeId]) {
                    byEmp[r.employeeId] = { id: r.employeeId, name: r.employeeName || this.t('worktime', 'Unbekannt'), minutes: 0, weeklyHours: weeklyByEmp[r.employeeId] ?? null }
                }
                byEmp[r.employeeId].minutes += r.minutes
            }
            const arr = Object.values(byEmp)
            arr.sort((a, b) => this.sort.key === 'name'
                ? this.sort.dir * a.name.localeCompare(b.name)
                : this.sort.dir * (a.minutes - b.minutes))
            return arr
        },
        detailRows() {
            const filtered = this.entries.filter(e =>
                (!this.selectedProjects.size || this.selectedProjects.has(e.projectId))
                && (!this.selectedEmployees.size || this.selectedEmployees.has(e.employeeId)),
            )
            const s = this.sort
            return filtered.slice().sort((a, b) => {
                if (s.key === 'name') return s.dir * (a.employeeName || '').localeCompare(b.employeeName || '')
                if (s.key === 'minutes') return s.dir * (a.minutes - b.minutes)
                return s.dir * a.date.localeCompare(b.date)
            })
        },
    },
    watch: {
        period() { this.refresh() },
        tab(value) { if (value === 'detail') this.ensureEntries() },
    },
    created() {
        this.loadTeamReport()
        this.refresh()
        // Departments back the filter labels; employees provide the
        // employeeId -> departmentId map for the project evaluation. Both are
        // permission-scoped by their endpoints, so the filter can only narrow.
        this.$store.dispatch('departments/fetchDepartments')
        this.$store.dispatch('employees/fetchEmployees')
    },
    methods: {
        textColorOn,
        /**
         * Der aktive Filter-Chip nimmt die Projektfarbe als Hintergrund. Die
         * Schriftfarbe muss der Helligkeit folgen — festes Weiss ergab auf
         * hellen Farben unlesbare Beschriftungen, bei Gold 1,65:1 statt der
         * geforderten 4,5:1 (#548). Weil die Farbe frei waehlbar bleibt,
         * laesst sich das nicht ueber eine engere Palette loesen.
         *
         * @param {object} project Projekt mit optionaler Farbe
         * @return {object} Style-Bindung fuer den Chip
         */
        chipStyle(project) {
            if (!this.selectedProjects.has(project.id)) return {}

            // Projekt ohne Farbe: der aktive Zustand kam vorher gar nicht an,
            // weil .ev-chip.on nur die Schrift auf Weiss setzte — auf dem
            // unveraenderten hellen Hintergrund also weiss auf weiss.
            if (!project.color) {
                return {
                    background: 'var(--color-primary-element)',
                    borderColor: 'var(--color-primary-element)',
                    color: 'var(--color-primary-element-text)',
                }
            }

            return {
                background: project.color,
                borderColor: project.color,
                color: textColorOn(project.color),
            }
        },
        async loadTeamReport() {
            this.teamLoading = true
            try {
                this.teamReport = await ReportService.getTeamYear(this.teamYear) || []
            } catch (error) {
                console.error('Failed to load team report:', error)
                this.teamReport = []
            } finally {
                this.teamLoading = false
            }
        },
        onTeamYearChange(year) {
            this.teamYear = year
            this.loadTeamReport()
        },
        hours(minutes) { return `${formatMinutes(minutes || 0)} h` },
        // Wochenstunden ohne überflüssige Nullen: "40.00" → "40", "37.50" → "37.5"
        weeklyLabel(h) {
            if (h == null || h === '') return ''
            const n = parseFloat(h)
            return Number.isNaN(n) ? '' : String(n)
        },
        signedHours(minutes) {
            const sign = minutes < 0 ? '−' : '+'
            return `${sign}${formatMinutes(Math.abs(minutes || 0))} h`
        },
        teamSortBy(key) {
            if (this.teamSort.key === key) {
                this.teamSort = { key, dir: this.teamSort.dir * -1 }
            } else {
                this.teamSort = { key, dir: 1 }
            }
        },
        teamSortArrow(key) {
            if (this.teamSort.key !== key) return ''
            return this.teamSort.dir === 1 ? ' ▲' : ' ▼'
        },
        formatDate(date) { return formatDateUtil(date) },
        initials(name) {
            return name.split(' ').filter(Boolean).map(w => w[0]).slice(0, 2).join('').toUpperCase()
        },
        /**
         * Chip display list: selected items first (always visible), then the
         * unselected ones filtered by the search and ranked by hours, capped at
         * topN unless searching or expanded.
         */
        buildChips(items, selected, search, expanded, mins) {
            const sel = items.filter(it => selected.has(it.id))
            const q = search.trim().toLowerCase()
            let rest = items.filter(it => !selected.has(it.id))
            if (q) {
                rest = rest.filter(it => it.name.toLowerCase().includes(q)
                    || (it.customer || '').toLowerCase().includes(q))
            }
            rest.sort((a, b) => (mins[b.id] || 0) - (mins[a.id] || 0))
            const limited = (expanded || q) ? rest : rest.slice(0, this.topN)
            return { list: [...sel, ...limited], hidden: rest.length - limited.length }
        },
        pct(minutes) {
            const base = this.totals.totalMinutes || 1
            return Math.round((minutes / base) * 100)
        },
        sortArrow(key) {
            if (this.sort.key !== key) return ''
            return this.sort.dir < 0 ? ' ▼' : ' ▲'
        },
        sortBy(key) {
            if (this.sort.key === key) {
                this.sort = { key, dir: -this.sort.dir }
            } else {
                this.sort = { key, dir: (key === 'name' || key === 'date') ? 1 : -1 }
            }
        },
        toggleProject(id) {
            const s = new Set(this.selectedProjects)
            s.has(id) ? s.delete(id) : s.add(id)
            this.selectedProjects = s
        },
        clearProjects() { this.selectedProjects = new Set() },
        toggleEmployee(id) {
            const s = new Set(this.selectedEmployees)
            s.has(id) ? s.delete(id) : s.add(id)
            this.selectedEmployees = s
        },
        clearEmployees() { this.selectedEmployees = new Set() },
        setPeriod(value) { this.period = value },
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
            this.entries = []
            this.entriesLoadedKey = null
            this.projectSearch = ''
            this.employeeSearch = ''
            this.projectsExpanded = false
            this.employeesExpanded = false
            if (this.tab === 'detail') this.ensureEntries()
        },
        periodKey() { return `${this.year}-${this.month}-${this.period}` },
        async load() {
            this.loading = true
            try {
                const data = await ReportService.getProjectEvaluation({
                    year: this.year, month: this.month, period: this.period,
                })
                this.rows = data?.rows || []
            } catch (error) {
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Laden der Auswertung'))
            } finally {
                this.loading = false
            }
        },
        async ensureEntries() {
            if (this.entriesLoadedKey === this.periodKey()) return
            this.entriesLoading = true
            try {
                const data = await ReportService.getProjectEntries({
                    year: this.year, month: this.month, period: this.period,
                })
                this.entries = data?.entries || []
                this.entriesLoadedKey = this.periodKey()
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
                projectIds: [...this.selectedProjects],
                // With a department filter active, export exactly what is on screen
                // (the department-narrowed rows); otherwise the explicit chip
                // selection. The endpoint stays permission-scoped either way.
                employeeIds: this.projectFilterDepartmentId !== null
                    ? [...new Set(this.filteredRows.map(r => r.employeeId))]
                    : [...this.selectedEmployees],
                mode: this.tab, // 'agg' or 'detail' — export matches the current view
            })
        },
    },
}
</script>

<style scoped>
.evaluation-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1600px;
}

.view-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.view-header h2 {
    margin: 0;
}

.view-toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
}

.view-header__nav {
    margin-left: auto;
    display: flex;
    align-items: center;
}

.layout-seg {
    display: flex;
    background: var(--color-background-dark);
    border-radius: var(--border-radius-element, 8px);
    padding: 3px;
}

.seg-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    background: none;
    border: none;
    padding: 6px 14px;
    border-radius: var(--border-radius-element, 8px);
    cursor: pointer;
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

/* Chip filters */
.ev-filter {
    margin-bottom: 14px;
}

.ev-filter__label {
    color: var(--color-text-maxcontrast);
    font-size: 0.85em;
    margin-bottom: 8px;
}

.ev-dept-filter {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.ev-dept-filter label {
    color: var(--color-text-maxcontrast);
    font-size: 0.85em;
    font-weight: 500;
}

.ev-dept-select {
    min-width: 240px;
}

.ev-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
}

.ev-chip {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    border: 1.5px solid var(--color-border-dark);
    background: var(--color-main-background);
    color: var(--color-main-text);
    border-radius: 999px;
    padding: 6px 13px;
    cursor: pointer;
    font-size: 13px;
    font-weight: 500;
}

.ev-chip:hover {
    background: var(--color-background-hover);
}

/* Farbe und Schriftfarbe kommen aus chipStyle() — die Schrift muss der
   Helligkeit der Projektfarbe folgen, festes Weiss war auf hellen Farben
   unlesbar (#548). */
.ev-chip.on {
    border-color: transparent;
}

/* Erbt die berechnete Schriftfarbe des Chips und daempft sie, statt fest
   halbtransparentes Weiss zu setzen — das war auf hellen Projektfarben
   unlesbar (#548). */
.ev-chip.on .ev-ccust {
    color: inherit;
    opacity: 0.85;
}

.ev-chip--all.on {
    background: var(--color-primary-element);
    border-color: var(--color-primary-element);
    color: var(--color-primary-element-text);
}

.ev-chip--emp.on {
    background: var(--color-text-maxcontrast);
    border-color: var(--color-text-maxcontrast);
}

.ev-cdot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
}

.ev-ccust {
    color: var(--color-text-maxcontrast);
    font-weight: normal;
    font-size: 0.9em;
}

.ev-x {
    margin-left: 2px;
    font-weight: 700;
    opacity: 0.8;
}

.ev-chip--more {
    border-style: dashed;
    color: var(--color-text-maxcontrast);
    font-weight: 600;
}

.ev-search {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    border: 1.5px solid var(--color-border-dark);
    border-radius: 999px;
    padding: 4px 12px;
    background: var(--color-main-background);
    min-width: 190px;
    color: var(--color-text-maxcontrast);
}

.ev-search input {
    border: none;
    outline: none;
    background: none;
    font: inherit;
    font-size: 13px;
    color: var(--color-main-text);
    width: 100%;
}

.ev-av {
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background: var(--color-background-dark);
    color: var(--color-text-maxcontrast);
    font-size: 10px;
    font-weight: 700;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
}

.ev-chip--emp.on .ev-av {
    background: rgba(255, 255, 255, 0.9);
    color: #333;
}

/* KPI cards — same style as the rest of the app (bordered) */
.ev-kpis {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 12px;
    margin: 18px 0 20px;
}

.kpi-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 14px 16px;
}

.kpi-lab {
    color: var(--color-text-maxcontrast);
    font-size: 0.85em;
    margin-bottom: 4px;
}

.kpi-num {
    font-size: 1.5em;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}

.kpi-num.kpi-pos { color: var(--color-success-text, #2f7d49); }
.kpi-num.kpi-neg { color: var(--color-error-text, #b03b33); }

.kpi-sub {
    font-size: 0.62em;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
}

.ev-year {
    margin-bottom: 14px;
}

.ev-subtabs {
    margin-bottom: 14px;
}

/* Umschalter nur so breit wie seine Buttons (nicht volle Breite) */
.ev-subtabs .layout-seg {
    width: max-content;
}

.ev-emp {
    display: flex;
    align-items: center;
    gap: 10px;
}

.ev-emp-name {
    font-weight: 600;
}

.ev-emp-sub {
    font-size: 12.5px;
    color: var(--color-text-maxcontrast);
}

.ev-vac {
    display: flex;
    align-items: center;
    gap: 10px;
}

.ev-vac-num {
    font-variant-numeric: tabular-nums;
    min-width: 56px;
}

.ev-vac-track {
    flex: 0 0 120px;
    width: 120px;
    height: 8px;
    border-radius: 6px;
    background: var(--color-background-dark);
    overflow: hidden;
}

.ev-vac-fill {
    display: block;
    height: 100%;
    border-radius: 6px;
    background: var(--wt-vacation, #4a9d63);
}

/* Status-Pillen wie in den anderen Tabellen (AbsenceRow .status-badge) */
.ev-stchip {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.85em;
}

.ev-stchip--open {
    background: var(--color-warning-hover);
    color: var(--color-warning-text);
}

.ev-stchip--ok {
    background: var(--color-success-hover);
    color: var(--color-success-text);
}

.ev-tabs {
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 14px;
}

.ev-export {
    display: flex;
    gap: 8px;
}

/* Table card — same container as the audit/approval tables. */
.ev-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 8px 16px;
    overflow-x: auto;
}

/* Flat table, consistent with the audit/approval tables in the app. */
.ev-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.ev-table th {
    text-align: left;
    padding: 10px 12px;
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    white-space: nowrap;
}

/* Zahlen-Spalten: Überschrift rechtsbündig wie ihre Werte (sonst Header links, Wert rechts). */
.ev-table th.ev-num {
    text-align: right;
}

/* Mitarbeiter-Übersicht + Aggregiert: Name-Spalte nimmt die Restbreite →
   Werte rechts gruppiert (Name links, Kennzahlen rechts). Einzelbuchungen ausgenommen. */
.ev-table:not(.ev-entries) th:first-child,
.ev-table:not(.ev-entries) td:first-child {
    width: 100%;
}

/* Einzelbuchungen: feste Spaltenbreiten — Projekt/Kunde/Mitarbeiter großzügig,
   Beschreibung dafür schmaler. */
.ev-entries {
    table-layout: fixed;
}

.ev-entries th:nth-child(1) { width: 9%; }   /* Datum */
.ev-entries th:nth-child(2) { width: 21%; }  /* Projekt */
.ev-entries th:nth-child(3) { width: 14%; }  /* Kunde */
.ev-entries th:nth-child(4) { width: 15%; }  /* Mitarbeiter */
.ev-entries th:nth-child(5) { width: 9%; }   /* Stunden */
.ev-entries th:nth-child(6) { width: 32%; }  /* Beschreibung */

.ev-table td {
    padding: 8px 12px;
    border-bottom: 1px solid var(--color-border);
}

.ev-table tbody tr:hover {
    background: var(--color-background-hover);
}

.ev-table th.sortable {
    cursor: pointer;
    user-select: none;
}

.ev-table th.sortable:hover {
    color: var(--color-main-text);
}

.ev-num {
    text-align: right;
    font-variant-numeric: tabular-nums;
}

.ev-name {
    display: flex;
    align-items: center;
    gap: 8px;
}

.ev-muted {
    color: var(--color-text-maxcontrast);
}

.ev-share {
    display: flex;
    align-items: center;
    gap: 10px;
}

.ev-bar {
    height: 6px;
    flex: 0 0 120px;
    width: 120px;
    border-radius: var(--border-radius-element, 8px);
    background: var(--color-background-dark);
    overflow: hidden;
}

.ev-bar > span {
    display: block;
    height: 100%;
    border-radius: var(--border-radius-element, 8px);
    background: var(--color-primary-element);
}

.ev-table tfoot td {
    font-weight: 600;
    border-top: 2px solid var(--color-border-dark, var(--color-border));
    border-bottom: none;
}

.ev-table tfoot tr:hover {
    background: none;
}

.ev-loading,
.ev-empty {
    margin-top: 40px;
    text-align: center;
    color: var(--color-text-maxcontrast);
}
</style>
