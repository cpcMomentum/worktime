<template>
    <div class="dashboard-view">
        <h2 class="dashboard-title">{{ t('worktime', 'Meine Übersicht') }}</h2>

        <NcLoadingIcon v-if="loading" :size="44" />

        <div v-else class="dashboard-content">
            <div class="dashboard-top">
                <div class="dashboard-card">
                    <h3 class="card-title">{{ t('worktime', 'Urlaub') }} {{ year }}</h3>
                    <div class="stat-row">
                        <span class="stat-label">{{ t('worktime', 'Anspruch') }}</span>
                        <span class="stat-value">{{ vacationStats.entitlement }} {{ t('worktime', 'Tage') }}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">{{ t('worktime', 'Genommen') }}</span>
                        <span class="stat-value">{{ vacationStats.taken }} {{ t('worktime', 'Tage') }}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">{{ t('worktime', 'Beantragt') }}</span>
                        <span class="stat-value">{{ vacationStats.pending }} {{ t('worktime', 'Tage') }}</span>
                    </div>
                    <div class="stat-row stat-row--total">
                        <span class="stat-label">{{ t('worktime', 'Verbleibend') }}</span>
                        <span class="stat-value" :class="vacationStats.remaining > 0 ? 'positive' : vacationStats.remaining < 0 ? 'negative' : ''">
                            {{ vacationStats.remaining }} {{ t('worktime', 'Tage') }}
                        </span>
                    </div>
                </div>

                <div class="dashboard-card">
                    <h3 class="card-title">{{ monthName }} {{ year }}</h3>
                    <div class="progress-row">
                        <div class="progress-bar-container">
                            <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
                        </div>
                        <span class="progress-percent">{{ progressPercent }}%</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">{{ t('worktime', 'Soll') }} <InfoIcon>{{ t('worktime', 'Arbeitstage × Tagesstunden, abzüglich Feiertage und Abwesenheiten. Im laufenden Monat anteilig bis heute.') }}</InfoIcon></span>
                        <span class="stat-value">{{ formatMinutesWithUnit(displayTargetMinutes) }}</span>
                    </div>
                    <div class="stat-row">
                        <span class="stat-label">{{ t('worktime', 'Ist') }}</span>
                        <span class="stat-value">{{ formatMinutesWithUnit(monthlyStats.actualMinutes) }}</span>
                    </div>
                    <div class="stat-row stat-row--total">
                        <span class="stat-label">{{ t('worktime', 'Noch offen') }} <InfoIcon>{{ t('worktime', 'Verbleibende Stunden bis zum Monatssoll. Aktualisiert sich mit jedem neuen Zeiteintrag.') }}</InfoIcon></span>
                        <span v-if="remainingMinutes > 0" class="stat-value">
                            {{ formatMinutesWithUnit(remainingMinutes) }}
                        </span>
                        <span v-else class="stat-value positive">{{ t('worktime', 'Soll erreicht') }}</span>
                    </div>
                </div>
            </div>

            <div class="dashboard-card">
                <YearOverviewTable
                    :months="yearlyMonths"
                    :year="year"
                    :min-year="minYear"
                    :max-year="maxYear"
                    :carryover-minutes="carryoverMinutes"
                    @previous="changeYear(-1)"
                    @next="changeYear(1)" />
            </div>
        </div>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import { mapGetters } from 'vuex'
import AbsenceService from '../services/AbsenceService.js'
import ReportService from '../services/ReportService.js'
import YearOverviewTable from '../components/YearOverviewTable.vue'
import { getCurrentYear, getCurrentMonth, getMonthName } from '../utils/dateUtils.js'
import { formatMinutesWithUnit as formatMinutesWithUnitUtil } from '../utils/timeUtils.js'
import InfoIcon from '../components/InfoIcon.vue'

export default {
    name: 'DashboardView',
    components: {
        InfoIcon,
        NcLoadingIcon,
        YearOverviewTable,
    },
    data() {
        return {
            year: getCurrentYear(),
            month: getCurrentMonth(),
            loading: false,
            carryoverMinutes: 0,
            vacationStats: {
                entitlement: 0,
                taken: 0,
                pending: 0,
                remaining: 0,
            },
            yearlyMonths: [],
            monthlyStats: {
                monthlyTargetMinutes: 0,
                proportionalTargetMinutes: 0,
                actualMinutes: 0,
                overtimeMinutes: 0,
            },
        }
    },
    computed: {
        ...mapGetters('permissions', ['employeeId']),
        ...mapGetters('employees', ['currentEmployee']),
        monthName() {
            return getMonthName(this.month)
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
        isCurrentMonth() {
            return this.year === getCurrentYear() && this.month === getCurrentMonth()
        },
        displayTargetMinutes() {
            // Current month: show proportional target (up to today)
            // Past/future months: show full month target
            return this.isCurrentMonth
                ? this.monthlyStats.proportionalTargetMinutes
                : this.monthlyStats.monthlyTargetMinutes
        },
        progressPercent() {
            if (!this.displayTargetMinutes) return 0
            const percent = Math.round((this.monthlyStats.actualMinutes / this.displayTargetMinutes) * 100)
            return Math.min(percent, 100)
        },
        remainingMinutes() {
            return Math.max(0, this.displayTargetMinutes - this.monthlyStats.actualMinutes)
        },
    },
    watch: {
        employeeId: {
            immediate: true,
            handler() {
                if (this.employeeId) {
                    this.loadData()
                }
            },
        },
    },
    mounted() {
        if (this.employeeId) {
            this.loadData()
        }
    },
    methods: {
        async loadData() {
            if (!this.employeeId) return
            this.loading = true
            try {
                const [vacationStats, monthlyReport, overtimeReport] = await Promise.all([
                    AbsenceService.getVacationStats(this.employeeId, this.year),
                    ReportService.getMonthly(this.employeeId, this.year, this.month),
                    ReportService.getOvertime(this.employeeId, this.year),
                ])

                if (vacationStats) {
                    this.vacationStats = {
                        entitlement: vacationStats.total || 0,
                        taken: vacationStats.used || 0,
                        pending: vacationStats.pending || 0,
                        remaining: vacationStats.remaining || 0,
                    }
                }

                if (monthlyReport?.statistics) {
                    this.monthlyStats = {
                        monthlyTargetMinutes: monthlyReport.statistics.adjustedMonthlyTargetMinutes || 0,
                        proportionalTargetMinutes: monthlyReport.statistics.adjustedTargetMinutes || 0,
                        actualMinutes: monthlyReport.statistics.actualMinutes || 0,
                        overtimeMinutes: monthlyReport.statistics.overtimeMinutes || 0,
                    }
                }

                if (overtimeReport) {
                    this.yearlyMonths = overtimeReport.monthly || []
                    this.carryoverMinutes = overtimeReport.carryoverMinutes || 0
                }
            } catch (error) {
                console.error('Failed to load dashboard data:', error)
            } finally {
                this.loading = false
            }
        },
        formatMinutesWithUnit(minutes) {
            return formatMinutesWithUnitUtil(minutes)
        },
        async changeYear(delta) {
            this.year += delta
            await this.loadData()
        },
    },
}
</script>

<style scoped>
.dashboard-view {
    padding: 24px;
    padding-left: 50px;
    max-width: 900px;
}

.dashboard-title {
    margin: 0 0 24px;
}

.dashboard-content {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.dashboard-top {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
}

@media (max-width: 600px) {
    .dashboard-top {
        grid-template-columns: 1fr;
    }
}

.dashboard-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    padding: 20px;
}

.card-title {
    margin: 0 0 12px;
    font-size: 15px;
    font-weight: 600;
    color: var(--color-main-text);
}

.stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 6px 0;
}

.stat-label {
    font-size: 15px;
    color: var(--color-text-maxcontrast);
}

.stat-value {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-main-text);
    font-variant-numeric: tabular-nums;
}

.stat-row--total {
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid var(--color-border);
    font-weight: 600;
}

.stat-value.positive {
    color: var(--color-success-text);
}

.stat-value.negative {
    color: var(--color-error-text);
}



.progress-row {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 16px;
}

.progress-bar-container {
    flex: 1;
    height: 8px;
    background: var(--color-background-dark);
    border-radius: 4px;
    overflow: hidden;
}

.progress-bar {
    height: 100%;
    border-radius: 4px;
    background: var(--color-primary-element);
    transition: width 0.3s ease;
}

.progress-percent {
    font-size: 13px;
    color: var(--color-text-maxcontrast);
    min-width: 36px;
    text-align: right;
}
</style>
