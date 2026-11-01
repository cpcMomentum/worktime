<template>
    <div class="day-hours-input">
        <div class="day-hours-row">
            <div v-for="day in weekdays" :key="day.key" class="day-input">
                <label :for="inputId(day.key)">{{ day.label }}</label>
                <input :id="inputId(day.key)"
                    v-model="raw[day.key]"
                    type="number"
                    min="0"
                    :max="maxDailyHours"
                    step="0.25"
                    :class="['input-field', 'input-day', { 'input-error': isAboveMax(day.key) }]"
                    @input="emitDay(day.key)">
            </div>
        </div>
        <p class="hint">{{ t('worktime', 'Max. {hours} Std./Tag', { hours: maxDailyHours }) }}</p>

        <div class="form-group">
            <label :for="inputId('total')">{{ t('worktime', 'Wochenstunden (berechnet)') }}</label>
            <input :id="inputId('total')"
                :value="weeklyTotal"
                type="text"
                class="input-field input-total"
                disabled>
        </div>
    </div>
</template>

<script>
import { getLocale } from '../utils/dateUtils.js'
import { DAY_KEYS, normalize, sum } from '../utils/dayHours.js'

let instanceCounter = 0

// v-model: { mon..sun } as numbers; an emptied field counts as 0.
export default {
    name: 'DayHoursInput',
    props: {
        value: {
            type: Object,
            required: true,
        },
        maxDailyHours: {
            type: Number,
            required: true,
        },
    },
    data() {
        instanceCounter++
        return {
            uid: instanceCounter,
            // Typed text, kept while editing so a cleared field does not jump to "0".
            raw: this.toRaw(this.value),
            weekdays: [
                { key: 'mon', label: this.t('worktime', 'Mo') },
                { key: 'tue', label: this.t('worktime', 'Di') },
                { key: 'wed', label: this.t('worktime', 'Mi') },
                { key: 'thu', label: this.t('worktime', 'Do') },
                { key: 'fri', label: this.t('worktime', 'Fr') },
                { key: 'sat', label: this.t('worktime', 'Sa') },
                { key: 'sun', label: this.t('worktime', 'So') },
            ],
        }
    },
    computed: {
        weeklyTotal() {
            return sum(this.value).toLocaleString(getLocale(), { maximumFractionDigits: 2 })
        },
    },
    watch: {
        value: {
            deep: true,
            handler(value) {
                DAY_KEYS.forEach((key) => {
                    if (normalize(this.raw[key]) !== normalize(value[key])) {
                        this.raw[key] = value[key]
                    }
                })
            },
        },
    },
    methods: {
        toRaw(value) {
            return Object.fromEntries(DAY_KEYS.map(key => [key, value[key]]))
        },
        inputId(key) {
            return `day-hours-${this.uid}-${key}`
        },
        isAboveMax(key) {
            return normalize(this.raw[key]) > this.maxDailyHours
        },
        emitDay(key) {
            this.$emit('input', { ...this.value, [key]: normalize(this.raw[key]) })
        },
    },
}
</script>

<style scoped>
.day-hours-row {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
}

.day-input {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.day-input label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    font-size: 0.9em;
    text-align: center;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
}

.input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-main-background);
    color: var(--color-main-text);
    text-align: center;
}

/* Room for quarter hours ("7,75") next to the spin buttons. */
.input-day {
    width: 4.5rem;
}

.input-total {
    width: 5rem;
}

.hint {
    margin: -8px 0 12px 0;
    font-size: 0.8em;
    color: var(--color-text-maxcontrast);
}

.input-error {
    border-color: var(--color-error, #dc2626) !important;
    background-color: var(--color-error-element-light, #fef2f2) !important;
}
</style>
