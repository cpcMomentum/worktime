<template>
    <div class="overtime-summary">
        <div class="overtime-summary__item">
            <span class="label">{{ t('worktime', 'Soll') }}</span>
            <span class="value">{{ formatMinutes(targetMinutes) }}</span>
        </div>
        <div class="overtime-summary__item">
            <span class="label">{{ t('worktime', 'Ist') }}</span>
            <span class="value">{{ formatMinutes(actualMinutes) }}</span>
        </div>
        <div class="overtime-summary__item overtime-summary__item--highlight"
            :class="{ positive: overtimeMinutes > 0, negative: overtimeMinutes < 0 }">
            <span class="label">{{ overtimeMinutes >= 0 ? t('worktime', 'Überstunden') : t('worktime', 'Minusstunden') }}</span>
            <span class="value">{{ formatMinutes(Math.abs(overtimeMinutes)) }}</span>
        </div>
    </div>
</template>

<script>
import { formatMinutesWithUnit } from '../utils/timeUtils.js'

export default {
    name: 'OvertimeSummary',
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
    },
    methods: {
        formatMinutes(minutes) {
            return formatMinutesWithUnit(minutes)
        },
    },
}
</script>

<style scoped>
.overtime-summary {
    display: flex;
    gap: 24px;
    padding: 16px;
    background: var(--color-background-dark);
    border-radius: var(--border-radius-large);
}

.overtime-summary__item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.overtime-summary__item .label {
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.overtime-summary__item .value {
    font-size: 1.2em;
    font-weight: 600;
}

.overtime-summary__item--highlight.positive .value {
    color: #2e7d32;
}

.overtime-summary__item--highlight.negative .value {
    color: #c9302c;
}
</style>
