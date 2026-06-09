<template>
    <div class="time-tracking-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Zeiterfassung') }}</h2>

            <div v-if="!isNarrow" class="layout-seg" role="group" :aria-label="t('worktime', 'Ansicht')">
                <button class="seg-btn"
                    :class="{ active: layoutMode === 'list' }"
                    @click="setLayout('list')">
                    <FormatListBulletedIcon :size="18" />
                    {{ t('worktime', 'Liste') }}
                </button>
                <button class="seg-btn"
                    :class="{ active: layoutMode === 'calendar' }"
                    @click="setLayout('calendar')">
                    <CalendarIcon :size="18" />
                    {{ t('worktime', 'Kalender') }}
                </button>
                <button class="seg-btn"
                    :class="{ active: layoutMode === 'year' }"
                    @click="setLayout('year')">
                    <ChartBarIcon :size="18" />
                    {{ t('worktime', 'Jahr') }}
                </button>
            </div>

            <MonthPicker v-if="!isYearMode"
                :year="selectedMonth.year"
                :month="selectedMonth.month"
                @update="onMonthChange" />
            <YearPicker v-else
                :year="overviewYear"
                :min="minYear"
                :max="maxYear"
                @update="onYearChange" />

            <div class="header-actions__right">
                <span v-if="monthStatus && !isYearMode" class="month-badge" :class="monthStatus">
                    <span class="badge-dot" />
                    {{ monthStatusLabel }}
                </span>

                <NcButton v-if="!isYearMode && approvalRequired && monthStatus === 'draft' && hasSubmittableEntries"
                    type="secondary"
                    @click="confirmSubmitMonth">
                    <template #icon>
                        <SendIcon :size="20" />
                    </template>
                    {{ t('worktime', 'Monat einreichen') }}
                </NcButton>

                <NcActions v-if="!isYearMode" :aria-label="t('worktime', 'Weitere Aktionen')">
                    <NcActionButton @click="downloadPdf">
                        <template #icon>
                            <FilePdfBox :size="20" />
                        </template>
                        {{ t('worktime', 'PDF Monatsbericht') }}
                    </NcActionButton>
                </NcActions>
            </div>
        </div>

        <div v-if="locked && !isYearMode" class="lock-banner">
            <LockIcon :size="20" />
            {{ t('worktime', 'Monat genehmigt – Einträge gesperrt. Korrektur nur durch HR.') }}
        </div>

        <!-- KPI-Leiste: monatlich (statistics) oder jährlich (yearAggregates) -->
        <OvertimeSummary v-if="!isYearMode && statistics"
            :target-minutes="statistics.adjustedTargetMinutes"
            :actual-minutes="statistics.actualMinutes"
            :overtime-minutes="statistics.overtimeMinutes"
            :vacation-remaining="vacationRemaining"
            :vacation-carryover="vacationCarryover"
            :vacation-total="vacationTotal"
            :year="selectedMonth.year"
            :month="selectedMonth.month"
            :statistics="statistics" />
        <OvertimeSummary v-else-if="isYearMode"
            period="year"
            :target-minutes="yearTargetMinutes"
            :actual-minutes="yearActualMinutes"
            :overtime-minutes="yearOvertimeMinutes"
            :vacation-remaining="vacationRemaining"
            :vacation-carryover="vacationCarryover"
            :vacation-total="vacationTotal"
            :year="overviewYear" />

        <NcLoadingIcon v-if="loading" :size="44" />

        <!-- Jahresansicht: Tabelle als Vollbreiten-Card -->
        <YearOverviewTable v-else-if="isYearMode"
            :months="yearlyMonths"
            :year="overviewYear"
            :carryover-minutes="carryoverMinutes"
            @select-month="selectMonth" />

        <!-- Monatsansicht: Liste/Kalender + Detail-Panel -->
        <div v-else class="zlayout" :class="{ narrow: isNarrow }">
            <div class="zlayout-main">
                <DayList v-if="effectiveLayout === 'list'"
                    :days="days"
                    :month="selectedMonth.month"
                    :selected-date="selectedDate"
                    @select="onSelectDay" />
                <MonthCalendar v-else
                    :days="days"
                    :year="selectedMonth.year"
                    :month="selectedMonth.month"
                    :selected-date="selectedDate"
                    @select="onSelectDay" />
            </div>

            <div v-if="!isNarrow && selectedDay" class="zlayout-panel card">
                <DayDetailPanel :day="selectedDay"
                    :projects="projects"
                    :month-status="monthStatus"
                    @refresh="loadData" />
            </div>
        </div>

        <NcModal v-if="isNarrow && showDayModal && selectedDay"
            size="small"
            @close="showDayModal = false">
            <div class="modal-panel">
                <DayDetailPanel :day="selectedDay"
                    :projects="projects"
                    :month-status="monthStatus"
                    @refresh="loadData" />
            </div>
        </NcModal>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcActions from '@nextcloud/vue/dist/Components/NcActions.js'
import NcActionButton from '@nextcloud/vue/dist/Components/NcActionButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import SendIcon from 'vue-material-design-icons/Send.vue'
import LockIcon from 'vue-material-design-icons/Lock.vue'
import FilePdfBox from 'vue-material-design-icons/FilePdfBox.vue'
import FormatListBulletedIcon from 'vue-material-design-icons/FormatListBulleted.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import ChartBarIcon from 'vue-material-design-icons/ChartBar.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
import { showSuccess, showError } from '@nextcloud/dialogs'
import { confirmAction } from '../utils/errorHandler.js'
import { getCurrentYear, getCurrentMonth, getMonthDays, getToday, formatDateISO, getLocale } from '../utils/dateUtils.js'
import { getAbsenceTypeLabel } from '../utils/formatters.js'
import MonthPicker from '../components/MonthPicker.vue'
import YearPicker from '../components/YearPicker.vue'
import OvertimeSummary from '../components/OvertimeSummary.vue'
import YearOverviewTable from '../components/YearOverviewTable.vue'
import DayList from '../components/DayList.vue'
import MonthCalendar from '../components/MonthCalendar.vue'
import DayDetailPanel from '../components/DayDetailPanel.vue'
import ReportService from '../services/ReportService.js'
import AbsenceService from '../services/AbsenceService.js'
import TimeEntryService from '../services/TimeEntryService.js'

export default {
    name: 'TimeTrackingView',
    components: {
        NcButton,
        NcActions,
        NcActionButton,
        NcLoadingIcon,
        NcModal,
        SendIcon,
        LockIcon,
        FilePdfBox,
        FormatListBulletedIcon,
        CalendarIcon,
        ChartBarIcon,
        MonthPicker,
        YearPicker,
        OvertimeSummary,
        YearOverviewTable,
        DayList,
        MonthCalendar,
        DayDetailPanel,
    },
    data() {
        return {
            statistics: null,
            reportAbsences: [],
            reportHolidays: [],
            vacationRemaining: null,
            vacationCarryover: 0,
            vacationTotal: null,
            yearlyMonths: [],
            carryoverMinutes: 0,
            overviewYear: getCurrentYear(),
            layoutMode: (['list', 'calendar', 'year'].includes(localStorage.getItem('worktime_tracking_layout'))
                ? localStorage.getItem('worktime_tracking_layout')
                : 'list'),
            selectedDate: null,
            isNarrow: false,
            showDayModal: false,
        }
    },
    computed: {
        ...mapState('timeEntries', ['selectedMonth']),
        ...mapGetters('timeEntries', ['timeEntries', 'loading']),
        ...mapGetters('permissions', ['employeeId', 'approvalRequired']),
        ...mapGetters('employees', ['currentEmployee']),
        ...mapGetters('projects', ['activeProjects']),
        projects() {
            return this.activeProjects
        },
        effectiveLayout() {
            if (this.layoutMode === 'year') return 'year'
            return this.isNarrow ? 'list' : this.layoutMode
        },
        isYearMode() {
            return this.layoutMode === 'year'
        },
        yearTargetMinutes() {
            return this.pastYearlyMonths.reduce((sum, m) => sum + (m.targetMinutes || 0), 0)
        },
        yearActualMinutes() {
            return this.pastYearlyMonths.reduce((sum, m) => sum + (m.actualMinutes || 0), 0)
        },
        yearOvertimeMinutes() {
            return this.pastYearlyMonths.reduce((sum, m) => sum + (m.overtimeMinutes || 0), 0) + (this.carryoverMinutes || 0)
        },
        pastYearlyMonths() {
            const cY = getCurrentYear()
            const cM = getCurrentMonth()
            return this.yearlyMonths.filter(m => {
                if (this.overviewYear < cY) return true
                if (this.overviewYear > cY) return false
                return m.month <= cM
            })
        },
        minYear() {
            if (this.currentEmployee?.entryDate) {
                return new Date(this.currentEmployee.entryDate).getFullYear()
            }
            return getCurrentYear()
        },
        maxYear() {
            return getCurrentYear() + 1
        },
        hasSubmittableEntries() {
            return this.timeEntries.some(e => e.status === 'draft' || e.status === 'rejected')
        },
        monthStatus() {
            if (!this.approvalRequired) return null
            const entries = this.timeEntries
            if (!entries.length) return 'draft'
            if (entries.every(e => e.status === 'approved')) return 'approved'
            if (entries.every(e => e.status !== 'draft' && e.status !== 'rejected')) return 'submitted'
            return 'draft'
        },
        locked() {
            return this.monthStatus === 'approved'
        },
        monthStatusLabel() {
            return {
                draft: this.t('worktime', 'Entwurf'),
                submitted: this.t('worktime', 'Eingereicht – wartet auf Genehmigung'),
                approved: this.t('worktime', 'Genehmigt'),
            }[this.monthStatus] || ''
        },
        absenceByDate() {
            const map = {}
            const { year, month } = this.selectedMonth
            for (const absence of this.reportAbsences) {
                if (!absence.startDate || !absence.endDate) continue
                const [sy, sm, sd] = absence.startDate.split('-').map(Number)
                const [ey, em, ed] = absence.endDate.split('-').map(Number)
                const start = new Date(sy, sm - 1, sd)
                const end = new Date(ey, em - 1, ed)
                const typeName = getAbsenceTypeLabel(absence.type)
                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    if (d.getFullYear() !== year || (d.getMonth() + 1) !== month) continue
                    map[formatDateISO(d)] = {
                        type: absence.type || '',
                        typeName,
                        status: absence.status,
                        scope: absence.scope || 1,
                    }
                }
            }
            return map
        },
        days() {
            const { year, month } = this.selectedMonth
            const skeleton = getMonthDays(year, month)
            const entriesByDate = {}
            for (const entry of this.timeEntries) {
                if (!entriesByDate[entry.date]) entriesByDate[entry.date] = []
                entriesByDate[entry.date].push(entry)
            }
            const holidayByDate = {}
            for (const holiday of this.reportHolidays) {
                holidayByDate[holiday.date] = { name: holiday.name }
            }
            const todayStr = getToday()
            return skeleton.map(s => {
                const entries = (entriesByDate[s.date] || [])
                    .slice()
                    .sort((a, b) => a.startTime.localeCompare(b.startTime))
                const totalMinutes = entries.reduce((sum, e) => sum + (e.workMinutes || 0), 0)
                return {
                    ...s,
                    entries,
                    totalMinutes,
                    firstStart: entries.length ? entries[0].startTime : null,
                    lastEnd: entries.length ? entries[entries.length - 1].endTime : null,
                    absence: this.absenceByDate[s.date] || null,
                    holiday: holidayByDate[s.date] || null,
                    isToday: s.date === todayStr,
                    isFuture: s.date > todayStr,
                }
            })
        },
        selectedDay() {
            if (!this.days.length) return null
            return this.days.find(d => d.date === this.selectedDate) || this.days[0]
        },
    },
    watch: {
        selectedMonth: {
            immediate: true,
            handler({ year, month }) {
                this.ensureSelectedDate(year, month)
                this.loadData()
            },
        },
        employeeId(newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                this.loadData()
            }
        },
    },
    mounted() {
        this.$store.dispatch('projects/fetchProjects')
        this.updateIsNarrow()
        window.addEventListener('resize', this.updateIsNarrow)
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.updateIsNarrow)
    },
    methods: {
        ...mapActions('timeEntries', ['fetchTimeEntries', 'setSelectedMonth']),
        updateIsNarrow() {
            this.isNarrow = window.innerWidth <= 920
        },
        ensureSelectedDate(year, month) {
            if (year === getCurrentYear() && month === getCurrentMonth()) {
                this.selectedDate = getToday()
            } else {
                this.selectedDate = formatDateISO(new Date(year, month - 1, 1))
            }
        },
        setLayout(mode) {
            this.layoutMode = mode
            localStorage.setItem('worktime_tracking_layout', mode)
            if (mode === 'year') {
                this.overviewYear = this.selectedMonth.year
                this.loadOvertime()
            }
        },
        onYearChange(year) {
            this.overviewYear = Math.min(this.maxYear, Math.max(this.minYear, year))
            this.loadOvertime()
        },
        onSelectDay(date) {
            this.selectedDate = date
            if (this.isNarrow) {
                this.showDayModal = true
            }
        },
        async loadData() {
            if (!this.employeeId) return
            this.overviewYear = this.selectedMonth.year
            await Promise.all([
                this.fetchTimeEntries(),
                this.loadStatistics(),
                this.loadVacationStats(),
                this.loadOvertime(),
            ])
        },
        async loadOvertime() {
            if (!this.employeeId) return
            try {
                const overtime = await ReportService.getOvertime(this.employeeId, this.overviewYear)
                this.yearlyMonths = overtime?.monthly || []
                this.carryoverMinutes = overtime?.carryoverMinutes || 0
            } catch (error) {
                console.error('Failed to load yearly overview:', error)
            }
        },
        async loadStatistics() {
            if (!this.employeeId) return
            try {
                const report = await ReportService.getMonthly(
                    this.employeeId,
                    this.selectedMonth.year,
                    this.selectedMonth.month
                )
                this.statistics = report.statistics
                this.reportAbsences = (report.absences || []).filter(a => a.status === 'approved')
                this.reportHolidays = report.holidays || []
            } catch (error) {
                console.error('Failed to load statistics:', error)
            }
        },
        async loadVacationStats() {
            if (!this.employeeId) return
            try {
                const stats = await AbsenceService.getVacationStats(this.employeeId, this.selectedMonth.year)
                this.vacationRemaining = stats?.remaining ?? null
                this.vacationCarryover = Math.round(stats?.carryover ?? 0)
                this.vacationTotal = stats?.total ?? null
            } catch (error) {
                console.error('Failed to load vacation stats:', error)
            }
        },
        onMonthChange({ year, month }) {
            this.setSelectedMonth({ year, month })
        },
        selectMonth(month) {
            this.layoutMode = 'list'
            localStorage.setItem('worktime_tracking_layout', 'list')
            this.setSelectedMonth({ year: this.overviewYear, month })
        },
        downloadPdf() {
            if (!this.employeeId) return
            ReportService.downloadPdf(this.employeeId, this.selectedMonth.year, this.selectedMonth.month)
        },
        async confirmSubmitMonth() {
            const monthName = new Date(this.selectedMonth.year, this.selectedMonth.month - 1)
                .toLocaleDateString(getLocale(), { month: 'long', year: 'numeric' })

            const confirmed = await confirmAction(
                this.t('worktime', 'Möchten Sie die Zeiteinträge für {month} einreichen? Die eingereichten Einträge werden zur Genehmigung übermittelt.', { month: monthName }),
                this.t('worktime', 'Monat einreichen'),
                this.t('worktime', 'Einreichen'),
                false
            )
            if (!confirmed) {
                return
            }

            try {
                const result = await TimeEntryService.submitMonth(this.employeeId, this.selectedMonth.year, this.selectedMonth.month)
                showSuccess(this.t('worktime', '{count} Einträge wurden eingereicht.', { count: result.submitted }))
                await this.loadData()
            } catch (error) {
                console.error('Failed to submit month:', error)
                showError(this.t('worktime', 'Fehler beim Einreichen des Monats.'))
            }
        },
    },
}
</script>

<style scoped>
.time-tracking-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1200px;
}

.view-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;
}

.view-header h2 {
    margin: 0;
}

.header-actions__right {
    margin-left: auto;
    display: flex;
    align-items: center;
    gap: 16px;
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

.month-badge {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    font-size: 12.5px;
    font-weight: 600;
    border-radius: var(--border-radius-element, 8px);
    padding: 5px 12px;
}

.month-badge .badge-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: currentColor;
    opacity: 0.7;
}

.month-badge.draft {
    background: var(--color-background-dark);
    color: var(--color-text-maxcontrast);
}

.month-badge.submitted {
    background: var(--color-background-hover);
    color: var(--wt-holiday);
}

.month-badge.approved {
    background: var(--color-background-hover);
    color: var(--wt-vacation);
}

.lock-banner {
    display: flex;
    align-items: center;
    gap: 10px;
    background: var(--color-background-hover);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius);
    padding: 11px 15px;
    margin-bottom: 16px;
    font-size: 14px;
    font-weight: 600;
    color: var(--wt-vacation);
}

.zlayout {
    display: grid;
    grid-template-columns: 1fr 330px;
    gap: 18px;
    align-items: start;
}

.zlayout.narrow {
    grid-template-columns: 1fr;
}

.zlayout-main {
    min-width: 0;
}

.zlayout-panel.card {
    position: sticky;
    top: 8px;
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 18px;
}

.modal-panel {
    padding: 22px;
}
</style>
