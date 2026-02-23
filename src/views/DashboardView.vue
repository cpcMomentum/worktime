<template>
    <div class="dashboard-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Meine Übersicht') }}</h2>
        </div>

        <NcLoadingIcon v-if="loading" :size="44" />

        <div v-else class="dashboard-content">
            <div class="dashboard-cards">
                <div class="dashboard-card vacation-card">
                    <div class="card-header">
                        <CalendarIcon :size="20" />
                        <h3>{{ t('worktime', 'Urlaub') }} {{ year }}</h3>
                    </div>
                    <div class="card-content">
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
                        <div class="stat-row highlight">
                            <span class="stat-label">{{ t('worktime', 'Verbleibend') }}</span>
                            <span class="stat-value">{{ vacationStats.remaining }} {{ t('worktime', 'Tage') }}</span>
                        </div>
                    </div>
                </div>

                <div class="dashboard-card overtime-card">
                    <div class="card-header">
                        <ClockIcon :size="20" />
                        <h3>{{ t('worktime', 'Überstunden') }}</h3>
                    </div>
                    <div class="card-content">
                        <div class="stat-row">
                            <span class="stat-label">{{ t('worktime', 'Jahresstand') }}</span>
                            <span class="stat-value" :class="overtimeClass(overtimeStats.yearTotal)">
                                {{ formatOvertimeMinutes(overtimeStats.yearTotal) }}
                            </span>
                        </div>
                        <div class="stat-row">
                            <span class="stat-label">{{ t('worktime', 'Dieser Monat') }}</span>
                            <span class="stat-value" :class="overtimeClass(monthlyStats.overtimeMinutes)">
                                {{ formatOvertimeMinutes(monthlyStats.overtimeMinutes) }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="dashboard-card progress-card">
                <div class="card-header">
                    <ChartIcon :size="20" />
                    <h3>{{ monthName }} {{ year }}</h3>
                </div>
                <div class="card-content">
                    <div class="progress-stats">
                        <div class="progress-stat">
                            <span class="progress-label">{{ t('worktime', 'Soll') }}</span>
                            <span class="progress-value">{{ formatMinutesWithUnit(monthlyStats.monthlyTargetMinutes) }}</span>
                        </div>
                        <div class="progress-stat">
                            <span class="progress-label">{{ t('worktime', 'Ist') }}</span>
                            <span class="progress-value">{{ formatMinutesWithUnit(monthlyStats.actualMinutes) }}</span>
                        </div>
                    </div>
                    <div class="progress-bar-container">
                        <div class="progress-bar" :style="{ width: progressPercent + '%' }"></div>
                    </div>
                    <div class="progress-info">
                        <span>{{ progressPercent }}%</span>
                        <span v-if="remainingMinutes > 0">
                            {{ t('worktime', 'Noch offen:') }} {{ formatMinutesWithUnit(remainingMinutes) }}
                            ({{ remainingDays }} {{ t('worktime', 'Arbeitstage') }})
                        </span>
                        <span v-else class="complete">{{ t('worktime', 'Soll erreicht') }}</span>
                    </div>
                </div>
            </div>

            <div class="dashboard-card actions-card">
                <div class="card-header">
                    <LightningBoltIcon :size="20" />
                    <h3>{{ t('worktime', 'Schnellaktionen') }}</h3>
                </div>
                <div class="card-content actions-content">
                    <NcButton type="primary" @click="$router.push('/tracking')">
                        <template #icon>
                            <PlusIcon :size="20" />
                        </template>
                        {{ t('worktime', 'Zeit erfassen') }}
                    </NcButton>
                    <NcButton type="secondary" @click="$router.push('/absences')">
                        <template #icon>
                            <CalendarPlusIcon :size="20" />
                        </template>
                        {{ t('worktime', 'Urlaub beantragen') }}
                    </NcButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import ClockIcon from 'vue-material-design-icons/Clock.vue'
import ChartIcon from 'vue-material-design-icons/ChartBar.vue'
import LightningBoltIcon from 'vue-material-design-icons/LightningBolt.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import CalendarPlusIcon from 'vue-material-design-icons/CalendarPlus.vue'
import { mapGetters } from 'vuex'
import AbsenceService from '../services/AbsenceService.js'
import ReportService from '../services/ReportService.js'
import { getCurrentYear, getCurrentMonth, getMonthName } from '../utils/dateUtils.js'
import { formatMinutes } from '../utils/timeUtils.js'

export default {
    name: 'DashboardView',
    components: {
        NcButton,
        NcLoadingIcon,
        CalendarIcon,
        ClockIcon,
        ChartIcon,
        LightningBoltIcon,
        PlusIcon,
        CalendarPlusIcon,
    },
    data() {
        return {
            year: getCurrentYear(),
            month: getCurrentMonth(),
            loading: false,
            vacationStats: {
                entitlement: 0,
                taken: 0,
                pending: 0,
                remaining: 0,
            },
            overtimeStats: {
                yearTotal: 0,
            },
            monthlyStats: {
                monthlyTargetMinutes: 0,
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
        progressPercent() {
            if (!this.monthlyStats.monthlyTargetMinutes) return 0
            const percent = Math.round((this.monthlyStats.actualMinutes / this.monthlyStats.monthlyTargetMinutes) * 100)
            return Math.min(percent, 100)
        },
        remainingMinutes() {
            return Math.max(0, this.monthlyStats.monthlyTargetMinutes - this.monthlyStats.actualMinutes)
        },
        remainingDays() {
            if (!this.currentEmployee?.weeklyHours) return 0
            const dailyMinutes = (this.currentEmployee.weeklyHours * 60) / 5
            return Math.ceil(this.remainingMinutes / dailyMinutes)
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
        // Daten bei jedem View-Wechsel neu laden
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
                        actualMinutes: monthlyReport.statistics.actualMinutes || 0,
                        overtimeMinutes: monthlyReport.statistics.overtimeMinutes || 0,
                    }
                }

                if (overtimeReport) {
                    this.overtimeStats = {
                        yearTotal: overtimeReport.yearTotal || 0,
                    }
                }
            } catch (error) {
                console.error('Failed to load dashboard data:', error)
            } finally {
                this.loading = false
            }
        },
        formatMinutesWithUnit(minutes) {
            return `${formatMinutes(minutes)} Std.`
        },
        formatOvertimeMinutes(minutes) {
            const sign = minutes >= 0 ? '+' : ''
            return `${sign}${formatMinutes(minutes)} Std.`
        },
        overtimeClass(minutes) {
            if (minutes > 0) return 'positive'
            if (minutes < 0) return 'negative'
            return ''
        },
    },
}
</script>

<style scoped>
.dashboard-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1200px;
}

.view-header {
    margin-bottom: 24px;
}

.view-header h2 {
    margin: 0;
}

.dashboard-content {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.dashboard-cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
}

.dashboard-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-large);
    overflow: hidden;
}

.card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 16px;
    background: var(--color-background-dark);
    border-bottom: 1px solid var(--color-border);
}

.card-header h3 {
    margin: 0;
    font-size: 1em;
    font-weight: 600;
}

.card-content {
    padding: 16px;
}

.stat-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid var(--color-border-dark);
}

.stat-row:last-child {
    border-bottom: none;
}

.stat-row.highlight {
    margin-top: 8px;
    padding-top: 12px;
    border-top: 2px solid var(--color-primary-element);
    border-bottom: none;
    font-weight: 600;
}

.stat-label {
    color: var(--color-text-maxcontrast);
}

.stat-value {
    font-weight: 500;
}

.stat-value.positive {
    color: var(--color-success-text);
}

.stat-value.negative {
    color: var(--color-error-text);
}

.progress-card {
    grid-column: 1 / -1;
}

.progress-stats {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
}

.progress-stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.progress-label {
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.progress-value {
    font-size: 1.25em;
    font-weight: 600;
}

.progress-bar-container {
    height: 24px;
    background: var(--color-background-dark);
    border-radius: var(--border-radius);
    overflow: hidden;
    margin-bottom: 8px;
}

.progress-bar {
    height: 100%;
    background: var(--color-primary-element);
    transition: width 0.3s ease;
}

.progress-info {
    display: flex;
    justify-content: space-between;
    font-size: 0.9em;
    color: var(--color-text-maxcontrast);
}

.progress-info .complete {
    color: var(--color-success-text);
    font-weight: 500;
}

.actions-card {
    grid-column: 1 / -1;
}

.actions-content {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}
</style>
