<template>
    <div class="overtime-summary">
        <div class="kpi-cards" :class="{ 'kpi-cards--two': vacationTotal === null }">
            <!-- Ist / Soll -->
            <div class="kpi-card kpi-card--main">
                <div class="kpi-card__head">
                    <span class="kpi-lab">{{ headLabel }}</span>
                    <NcButton v-if="statistics && period === 'month'"
                        type="tertiary"
                        :aria-label="t('worktime', 'Berechnung anzeigen')"
                        @click="showDetails = !showDetails">
                        <template #icon>
                            <ChevronUp v-if="showDetails" :size="20" />
                            <ChevronDown v-else :size="20" />
                        </template>
                    </NcButton>
                </div>
                <div class="kpi-pm">
                    <span class="kpi-num">{{ hoursLabel(actualMinutes) }} h <small>/ {{ hoursLabel(periodSoll) }} h Soll</small></span>
                    <span class="kpi-pct">{{ percent }} %</span>
                </div>
                <div class="kpi-bar"><span :style="{ width: barWidth + '%' }" /></div>
                <div class="kpi-bf">
                    <span>{{ remainingLabel }}</span>
                    <span :class="pacingPositive ? 'pos' : 'neg'">{{ pacingLabel }}</span>
                </div>
            </div>

            <!-- Urlaub: Rest / Anspruch -->
            <div v-if="vacationTotal !== null" class="kpi-card">
                <div class="kpi-lab">{{ t('worktime', 'Urlaub {year}', { year }) }}</div>
                <div class="kpi-num pos">{{ vacationRemaining ?? 0 }} <small>/ {{ vacationTotal }} {{ t('worktime', 'Tage übrig') }}</small></div>
                <div v-if="vacationSub" class="kpi-sub">{{ vacationSub }}</div>
            </div>

            <!-- Überstunden -->
            <div class="kpi-card">
                <div class="kpi-lab">
                    {{ overtimeMinutes >= 0 ? t('worktime', 'Überstunden') : t('worktime', 'Minusstunden') }}
                    <InfoIcon>{{ t('worktime', 'Das Soll wird anteilig bis gestern berechnet. Der heutige Tag zählt erst mit, sobald du Zeit erfasst.') }}</InfoIcon>
                </div>
                <div class="kpi-num" :class="{ pos: overtimeMinutes > 0, neg: overtimeMinutes < 0 }">
                    {{ overtimeMinutes > 0 ? '+' : '' }}{{ absHoursLabel(overtimeMinutes) }} <small>h</small>
                </div>
                <div class="kpi-sub">{{ t('worktime', 'Stand heute') }}</div>
            </div>
        </div>

        <div v-if="showDetails && statistics" class="overtime-details">
            <div class="overtime-details__section">
                <h4>{{ t('worktime', 'Soll-Berechnung') }}</h4>
                <div class="detail-row">
                    <span>{{ t('worktime', 'Arbeitstage ({count})', { count: statistics.workingDays }) }}</span>
                    <span class="detail-value">{{ formatMinutes(statistics.monthlyTargetMinutes) }}</span>
                </div>
                <div v-if="statistics.holidayCount > 0" class="detail-row info">
                    <span>{{ t('worktime', 'davon Feiertage ({count})', { count: statistics.holidayCount }) }}</span>
                    <span class="detail-value"></span>
                </div>
                <div v-if="statistics.targetReductionDays > 0" class="detail-row subtract">
                    <span>{{ t('worktime', 'Soll-Reduktion ({count} Tage)', { count: statistics.targetReductionDays }) }}</span>
                    <span class="detail-value">-{{ formatMinutes(statistics.monthlyTargetMinutes - statistics.targetMinutes) }}</span>
                </div>
                <div class="detail-row detail-row--total">
                    <span>{{ t('worktime', 'Soll (anteilig bis heute)') }}</span>
                    <span class="detail-value">{{ formatMinutes(targetMinutes) }}</span>
                </div>
            </div>

            <div class="overtime-details__section">
                <h4>{{ t('worktime', 'Ist-Berechnung') }}</h4>
                <div class="detail-row">
                    <span>{{ t('worktime', 'Geleistete Arbeitszeit') }}</span>
                    <span class="detail-value">{{ formatMinutes(statistics.workedMinutes) }}</span>
                </div>
                <div v-if="statistics.paidAbsenceMinutes > 0" class="detail-row add">
                    <span>{{ t('worktime', 'Bezahlte Abwesenheiten ({count} Tage)', { count: statistics.paidAbsenceDays }) }}</span>
                    <span class="detail-value">+{{ formatMinutes(statistics.paidAbsenceMinutes) }}</span>
                </div>
                <div v-if="statistics.compensatoryDays > 0" class="detail-row info">
                    <span>{{ t('worktime', 'Freizeitausgleich ({count} Tage, nicht gutgeschrieben)', { count: statistics.compensatoryDays }) }} <InfoIcon>{{ t('worktime', 'Freizeitausgleich wird nicht als Arbeitszeit gutgeschrieben. Das Soll bleibt bestehen, dadurch sinken die Überstunden.') }}</InfoIcon></span>
                    <span class="detail-value"></span>
                </div>
                <div class="detail-row detail-row--total">
                    <span>{{ t('worktime', 'Ist') }}</span>
                    <span class="detail-value">{{ formatMinutes(actualMinutes) }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'
import { formatMinutesWithUnit, formatMinutes as formatHM } from '../utils/timeUtils.js'
import { getMonthName } from '../utils/dateUtils.js'
import InfoIcon from '../components/InfoIcon.vue'

export default {
    name: 'OvertimeSummary',
    components: {
        InfoIcon,
        NcButton,
        ChevronDown,
        ChevronUp,
    },
    props: {
        targetMinutes: {
            type: Number,
            default: 0,
        },
        actualMinutes: {
            type: Number,
            default: 0,
        },
        overtimeMinutes: {
            type: Number,
            default: 0,
        },
        vacationRemaining: {
            type: Number,
            default: null,
        },
        vacationCarryover: {
            type: Number,
            default: 0,
        },
        vacationTotal: {
            type: Number,
            default: null,
        },
        year: {
            type: Number,
            default: null,
        },
        month: {
            type: Number,
            default: null,
        },
        statistics: {
            type: Object,
            default: null,
        },
        period: {
            type: String,
            default: 'month',
            validator: v => ['month', 'year'].includes(v),
        },
    },
    data() {
        return {
            showDetails: false,
        }
    },
    computed: {
        monthLabel() {
            if (!this.month || !this.year) return ''
            return `${getMonthName(this.month)} ${this.year}`
        },
        headLabel() {
            if (this.period === 'year') {
                return this.t('worktime', 'Ist / Soll · {year}', { year: this.year })
            }
            return this.t('worktime', 'Ist / Soll · {month}', { month: this.monthLabel })
        },
        // Volles Periodensoll (Monat: aus statistics, Jahr: aus prop)
        periodSoll() {
            if (this.period === 'year') return this.targetMinutes
            return this.statistics?.targetMinutes ?? 0
        },
        percent() {
            if (!this.periodSoll) return 0
            return Math.round((this.actualMinutes / this.periodSoll) * 100)
        },
        barWidth() {
            return Math.min(100, Math.max(0, this.percent))
        },
        remaining() {
            return Math.max(0, this.periodSoll - this.actualMinutes)
        },
        remainingLabel() {
            if (this.period === 'year') {
                return this.t('worktime', 'noch {hours} h bis Jahressoll', { hours: this.hoursLabel(this.remaining) })
            }
            return this.t('worktime', 'noch {hours} h bis Monatssoll', { hours: this.hoursLabel(this.remaining) })
        },
        pacingPositive() {
            return this.overtimeMinutes >= 0
        },
        pacingLabel() {
            if (this.pacingPositive) {
                return this.t('worktime', 'anteilig: im Plan')
            }
            return this.t('worktime', '{hours} h unter Plan', { hours: this.absHoursLabel(this.overtimeMinutes) })
        },
        vacationSub() {
            if (this.vacationCarryover > 0) {
                return this.t('worktime', 'inkl. {days} Tage Übertrag', { days: this.vacationCarryover })
            }
            return ''
        },
    },
    methods: {
        formatMinutes(minutes) {
            return formatMinutesWithUnit(minutes)
        },
        hoursLabel(minutes) {
            return formatHM(minutes)
        },
        absHoursLabel(minutes) {
            return formatHM(Math.abs(minutes))
        },
    },
}
</script>

<style scoped>
.overtime-summary {
    margin-bottom: 24px;
}

.kpi-cards {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 12px;
}

.kpi-cards--two {
    grid-template-columns: 2fr 1fr;
}

.kpi-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 14px 16px;
}

.kpi-card__head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
}

.kpi-card__head .button-vue {
    margin: -6px -6px 0 0;
}

.kpi-lab {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-main-text);
}

.kpi-num {
    font-size: 25px;
    font-weight: 700;
    line-height: 1;
    margin-top: 7px;
    font-variant-numeric: tabular-nums;
}

.kpi-num small {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-main-text);
}

.kpi-num.pos {
    color: var(--color-success-text);
}

.kpi-num.neg {
    color: var(--color-error-text);
}

.kpi-sub {
    font-size: 13px;
    color: var(--color-text-maxcontrast);
    margin-top: 6px;
}

.kpi-pm {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin: 4px 0 8px;
}

.kpi-pm .kpi-num {
    font-size: 23px;
    margin-top: 0;
}

.kpi-pct {
    font-weight: 700;
    color: var(--color-primary-element);
    font-size: 14px;
}

.kpi-bar {
    height: 10px;
    border-radius: var(--border-radius-element, 8px);
    background: var(--color-background-dark);
    overflow: hidden;
}

.kpi-bar > span {
    display: block;
    height: 100%;
    border-radius: var(--border-radius-element, 8px);
    background: var(--color-primary-element);
}

.kpi-bf {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    color: var(--color-main-text);
    margin-top: 6px;
}

.kpi-bf .pos {
    color: var(--color-success-text);
    font-weight: 600;
}

.kpi-bf .neg {
    color: var(--color-error-text);
    font-weight: 600;
}

.overtime-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 16px;
    margin-top: 12px;
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    align-items: stretch;
}

.overtime-details__section {
    display: flex;
    flex-direction: column;
}

.overtime-details__section .detail-row--total {
    margin-top: auto;
}

.overtime-details__section h4 {
    margin: 0 0 8px;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-main-text);
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

.detail-row {
    display: flex;
    justify-content: space-between;
    padding: 4px 0;
    font-size: 15px;
}

.detail-row.subtract .detail-value {
    color: var(--color-error-text);
}

.detail-row.info {
    color: var(--color-text-maxcontrast);
    font-size: 13px;
}

.detail-row.add .detail-value {
    color: var(--color-success-text);
}

.detail-row--total {
    margin-top: 4px;
    padding-top: 8px;
    border-top: 1px solid var(--color-border);
    font-weight: 600;
}

.detail-value {
    font-variant-numeric: tabular-nums;
}
</style>
