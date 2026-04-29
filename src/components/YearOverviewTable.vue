<template>
    <div class="year-overview">
        <div class="year-overview__header">
            <NcButton v-if="!minYear || year > minYear"
                type="tertiary"
                :aria-label="t('worktime', 'Vorheriges Jahr')"
                @click="$emit('previous')">
                <template #icon>
                    <ChevronLeft :size="20" />
                </template>
            </NcButton>
            <span v-else class="nav-spacer" />
            <h3>{{ t('worktime', 'Jahresübersicht') }} {{ year }}</h3>
            <NcButton v-if="!maxYear || year < maxYear"
                type="tertiary"
                :aria-label="t('worktime', 'Nächstes Jahr')"
                @click="$emit('next')">
                <template #icon>
                    <ChevronRight :size="20" />
                </template>
            </NcButton>
            <span v-else class="nav-spacer" />
        </div>
        <p v-if="isEmpty" class="empty-year">
            {{ t('worktime', 'Keine Daten für dieses Jahr vorhanden.') }}
        </p>
        <table v-else class="year-table">
            <thead>
                <tr>
                    <th>{{ t('worktime', 'Monat') }}</th>
                    <th class="text-right">{{ t('worktime', 'Soll') }}</th>
                    <th class="text-right">{{ t('worktime', 'Ist') }}</th>
                    <th class="text-right">{{ t('worktime', 'Überstunden') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="m in allMonths"
                    :key="m.month"
                    :class="{ 'current-month': isCurrentMonth(m.month), 'future-month': isFutureMonth(m.month) }">
                    <td>
                        <router-link v-if="!isFutureMonth(m.month)"
                            :to="'/report?year=' + year + '&month=' + m.month"
                            class="month-link">
                            {{ getMonthName(m.month) }}
                        </router-link>
                        <span v-else>{{ getMonthName(m.month) }}</span>
                    </td>
                    <td class="text-right">
                        <template v-if="!isFutureMonth(m.month)">{{ formatMin(m.targetMinutes) }}</template>
                        <template v-else>–</template>
                    </td>
                    <td class="text-right">
                        <template v-if="!isFutureMonth(m.month)">{{ formatMin(m.actualMinutes) }}</template>
                        <template v-else>–</template>
                    </td>
                    <td class="text-right">
                        <template v-if="!isFutureMonth(m.month)">
                            <span :class="overtimeClass(m.overtimeMinutes)">
                                {{ formatOvertime(m.overtimeMinutes) }}
                            </span>
                        </template>
                        <template v-else>–</template>
                    </td>
                </tr>
            </tbody>
            <tfoot>
                <tr class="total-row">
                    <td>{{ t('worktime', 'Gesamt') }}</td>
                    <td class="text-right">{{ formatMin(totalTarget) }}</td>
                    <td class="text-right">{{ formatMin(totalActual) }}</td>
                    <td class="text-right">
                        <span :class="overtimeClass(totalOvertime)">
                            {{ formatOvertime(totalOvertime) }}
                        </span>
                    </td>
                </tr>
            </tfoot>
        </table>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import { getMonthName, getCurrentYear, getCurrentMonth } from '../utils/dateUtils.js'
import { formatMinutesWithUnit } from '../utils/timeUtils.js'

export default {
    name: 'YearOverviewTable',
    components: {
        NcButton,
        ChevronLeft,
        ChevronRight,
    },
    props: {
        months: {
            type: Array,
            default: () => [],
        },
        year: {
            type: Number,
            required: true,
        },
        minYear: {
            type: Number,
            default: null,
        },
        maxYear: {
            type: Number,
            default: null,
        },
    },
    computed: {
        currentYear() {
            return getCurrentYear()
        },
        currentMonth() {
            return getCurrentMonth()
        },
        allMonths() {
            const result = []
            for (let i = 1; i <= 12; i++) {
                const existing = this.months.find(m => m.month === i)
                result.push(existing || { month: i, targetMinutes: 0, actualMinutes: 0, overtimeMinutes: 0 })
            }
            return result
        },
        isEmpty() {
            if (this.year >= this.currentYear) return false
            return this.months.every(m => (m.actualMinutes || 0) === 0)
        },
        pastMonths() {
            return this.allMonths.filter(m => !this.isFutureMonth(m.month))
        },
        totalTarget() {
            return this.pastMonths.reduce((sum, m) => sum + (m.targetMinutes || 0), 0)
        },
        totalActual() {
            return this.pastMonths.reduce((sum, m) => sum + (m.actualMinutes || 0), 0)
        },
        totalOvertime() {
            return this.pastMonths.reduce((sum, m) => sum + (m.overtimeMinutes || 0), 0)
        },
    },
    methods: {
        getMonthName(month) {
            return getMonthName(month)
        },
        isCurrentMonth(month) {
            return this.year === this.currentYear && month === this.currentMonth
        },
        isFutureMonth(month) {
            if (this.year < this.currentYear) return false
            if (this.year > this.currentYear) return true
            return month > this.currentMonth
        },
        formatMin(minutes) {
            return formatMinutesWithUnit(minutes || 0)
        },
        formatOvertime(minutes) {
            if (!minutes) return formatMinutesWithUnit(0)
            const sign = minutes > 0 ? '+' : ''
            return sign + formatMinutesWithUnit(minutes)
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
.year-overview__header {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
}

.year-overview__header h3 {
    margin: 0;
    font-size: 15px;
    font-weight: 600;
    color: var(--color-main-text);
}

.nav-spacer {
    width: 44px;
}

.empty-year {
    color: var(--color-text-maxcontrast);
    text-align: center;
    padding: 24px 0;
}

.year-table {
    width: 100%;
    border-collapse: collapse;
}

.year-table th,
.year-table td {
    padding: 8px 12px;
    font-variant-numeric: tabular-nums;
}

.year-table th {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    border-bottom: 2px solid var(--color-border);
}

.year-table td {
    border-bottom: none;
}

.year-table tbody tr:nth-child(even) {
    background: var(--color-background-hover);
}

.text-right {
    text-align: right;
}

.month-link {
    color: var(--color-main-text);
    text-decoration: none;
    font-weight: 400;
}

.month-link:hover {
    color: var(--color-primary-element);
    text-decoration: underline;
}

.current-month {
    font-weight: 600;
    background: rgba(0, 130, 200, 0.06);
}

.future-month {
    color: var(--color-text-maxcontrast);
    opacity: 0.5;
}

.total-row {
    font-weight: 700;
}

.total-row td {
    border-top: 2px solid var(--color-border);
}

.total-row td {
    border-bottom: none;
}

.positive {
    color: var(--color-success-text);
}

.negative {
    color: var(--color-error-text);
}
</style>
