<template>
    <div class="day-list">
        <div class="dl-head">
            <div>{{ t('worktime', 'Tag') }}</div>
            <div>{{ t('worktime', 'Zeiten') }}</div>
            <div class="dl-r">{{ t('worktime', 'Pause') }}</div>
            <div class="dl-r">{{ t('worktime', 'Stunden') }}</div>
        </div>
        <!-- Wrapper-Div bleibt, damit .dl-day:first-child den obersten Trennstrich entfernt -->
        <div>
            <div v-for="day in days"
                :key="day.date"
                class="dl-day"
                :class="{ sel: day.date === selectedDate, weekend: day.isWeekend, empty: !day.entries.length, today: day.isToday, weekstart: isWeekStart(day) }"
                tabindex="0"
                role="button"
                @click="$emit('select', day.date)"
                @keydown.enter="$emit('select', day.date)"
                @keydown.space.prevent="$emit('select', day.date)">
                <div class="dl-d">
                    <span>{{ weekday(day) }} {{ pad(day.day) }}.</span>
                    <span v-if="day.isToday" class="today-badge">{{ t('worktime', 'Heute') }}</span>
                    <small>{{ monthShort }}</small>
                </div>

                <div class="dl-mid">
                    <template v-if="day.entries.length">
                        <span v-if="day.holiday || day.absence"
                            class="dot"
                            :class="day.holiday ? 'holiday' : absenceColorClass(day.absence.type)" />
                        <span class="dl-times">{{ day.firstStart }} – {{ day.lastEnd }}</span>
                        <span v-if="day.entries.length > 1" class="dl-count">
                            {{ t('worktime', '{n} Einträge', { n: day.entries.length }) }}
                        </span>
                    </template>
                    <template v-else-if="day.holiday">
                        <span class="dl-tag"><span class="dot holiday" /> {{ day.holiday.name }}</span>
                    </template>
                    <template v-else-if="day.absence">
                        <span class="dl-tag">
                            <span class="dot" :class="absenceColorClass(day.absence.type)" />
                            {{ day.absence.typeName }}
                        </span>
                    </template>
                    <span v-else class="dl-mut">–</span>
                </div>

                <div class="dl-r dl-pause">{{ pauseLabel(day) }}</div>
                <div class="dl-r dl-hh" :class="{ 'dl-mut': !day.entries.length }">{{ hoursLabel(day) }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDayName, getMonthNameShort } from '../utils/dateUtils.js'
import { formatMinutes } from '../utils/timeUtils.js'
import { getAbsenceColorClass } from '../utils/formatters.js'

export default {
    name: 'DayList',
    props: {
        days: {
            type: Array,
            default: () => [],
        },
        selectedDate: {
            type: String,
            default: null,
        },
        month: {
            type: Number,
            default: null,
        },
    },
    emits: ['select'],
    computed: {
        monthShort() {
            return this.month ? getMonthNameShort(this.month) : ''
        },
    },
    methods: {
        pad(n) {
            return n < 10 ? '0' + n : '' + n
        },
        weekday(day) {
            return getDayName(day.dayOfWeek)
        },
        isWeekStart(day) {
            return day.dayOfWeek === 1
        },
        absenceColorClass: getAbsenceColorClass,
        pauseLabel(day) {
            if (!day.entries.length) return ''
            const total = day.entries.reduce((sum, e) => sum + (e.breakMinutes || 0), 0)
            return this.t('worktime', '{min} Min', { min: total })
        },
        hoursLabel(day) {
            if (!day.entries.length) return '–'
            return `${formatMinutes(day.totalMinutes)} h`
        },
    },
}
</script>

<style scoped>
.day-list {
    font-size: 14px;
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 14px 0 0;
    overflow: hidden;
}

.dl-head,
.dl-day {
    display: grid;
    grid-template-columns: 116px 1fr 92px 84px;
    align-items: center;
    gap: 10px;
}

.dl-head {
    padding: 0 14px 10px;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-main-text);
    border-bottom: 1px solid var(--color-border-dark, var(--color-border));
}

.dl-day {
    padding: 11px 14px;
    border-top: 1px solid var(--color-border-light, var(--color-border));
    background: var(--color-main-background);
    cursor: pointer;
}

.dl-day:first-child {
    border-top: none;
}

/* Wochentrennung: kräftigere Linie am Wochenanfang (Montag) */
.dl-day.weekstart:not(:first-child) {
    border-top: 2px solid var(--color-border-dark, var(--color-border));
}

.dl-day:hover {
    background: var(--color-background-hover);
}

.dl-day:focus-visible {
    outline: 2px solid var(--color-primary-element);
    outline-offset: -2px;
}

.dl-day.sel {
    background: var(--color-primary-element-light);
    box-shadow: inset 3px 0 0 var(--color-primary-element);
}

.dl-day.today .dl-d {
    color: var(--color-primary-element);
}

.today-badge {
    display: inline-block;
    margin-left: 6px;
    padding: 1px 6px;
    background: var(--color-primary-element);
    color: var(--color-primary-element-text, #ffffff);
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.3px;
    border-radius: var(--border-radius-element, 6px);
    vertical-align: middle;
    text-transform: uppercase;
}

/* Leere Tage (inkl. Wochenende/Feiertag ohne Eintrag) dezent und kompakt */
.dl-day.empty {
    padding-top: 8px;
    padding-bottom: 8px;
    font-size: 13px;
}

.dl-day.empty .dl-d,
.dl-day.empty .dl-mid {
    color: var(--color-text-maxcontrast);
}

.dl-day.empty.weekend {
    background: var(--color-background-hover);
    padding-top: 4px;
    padding-bottom: 4px;
}

.dl-day.empty.weekend.sel,
.dl-day.empty.sel {
    background: var(--color-primary-element-light);
}

.dl-d {
    font-weight: 600;
}

.dl-d small {
    display: block;
    font-size: 12px;
    font-weight: 400;
    color: var(--color-text-maxcontrast);
}

.dl-mid {
    min-width: 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.dl-times {
    font-variant-numeric: tabular-nums;
}

.dl-count {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    background: var(--color-background-dark);
    border-radius: var(--border-radius-element, 8px);
    padding: 2px 8px;
}

.dl-tag {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-weight: 600;
}

.dl-mut {
    color: var(--color-text-maxcontrast);
}

.dl-r {
    text-align: right;
}

.dl-pause {
    color: var(--color-main-text);
    font-size: 13px;
}

.dl-hh {
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}

.dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    flex-shrink: 0;
    display: inline-block;
}

.dot.vacation {
    background: var(--wt-vacation);
}

.dot.sick {
    background: var(--wt-sick);
}

.dot.holiday {
    background: var(--wt-holiday);
}

.dot.other {
    background: var(--color-primary-element);
}
</style>
