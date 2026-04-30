<template>
    <div class="overtime-summary">
        <div class="overtime-summary__row">
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
                <span class="label">{{ overtimeMinutes >= 0 ? t('worktime', 'Überstunden') : t('worktime', 'Minusstunden') }} <NcPopover popup-role="tooltip"><template #trigger><InformationOutline class="info-icon" :size="14" /></template><div class="info-popup">{{ t('worktime', 'Das Soll wird anteilig bis heute berechnet. Noch nicht erfasste Arbeitstage erscheinen als Minusstunden.') }}</div></NcPopover></span>
                <span class="value">{{ formatMinutes(Math.abs(overtimeMinutes)) }}</span>
            </div>
            <NcButton v-if="statistics"
                type="tertiary"
                class="overtime-summary__toggle"
                :aria-label="t('worktime', 'Berechnung anzeigen')"
                @click="showDetails = !showDetails">
                <template #icon>
                    <ChevronUp v-if="showDetails" :size="20" />
                    <ChevronDown v-else :size="20" />
                </template>
            </NcButton>
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
                    <span>{{ t('worktime', 'Soll') }}</span>
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
import NcPopover from '@nextcloud/vue/dist/Components/NcPopover.js'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import ChevronUp from 'vue-material-design-icons/ChevronUp.vue'
import InformationOutline from 'vue-material-design-icons/InformationOutline.vue'
import { formatMinutesWithUnit } from '../utils/timeUtils.js'

export default {
    name: 'OvertimeSummary',
    components: {
        NcButton,
        NcPopover,
        ChevronDown,
        ChevronUp,
        InformationOutline,
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
        statistics: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            showDetails: false,
        }
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
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: 16px;
    margin-bottom: 24px;
}

.overtime-summary__row {
    display: flex;
    gap: 24px;
    padding: 16px;
    align-items: center;
}

.overtime-summary__item {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.overtime-summary__item .label {
    font-size: 15px;
    color: var(--color-text-maxcontrast);
}

.overtime-summary__item .value {
    font-size: 15px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}

.overtime-summary__item--highlight.positive .value {
    color: var(--color-success-text);
}

.overtime-summary__item--highlight.negative .value {
    color: var(--color-error-text);
}

.overtime-summary__toggle {
    margin-left: auto;
}

.overtime-details {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    padding: 12px 16px 16px;
    border-top: 1px solid var(--color-border);
    align-items: stretch;
}

.overtime-details__section {
    padding: 0;
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
    color: var(--color-text-maxcontrast);
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

.label :deep(.v-popper),
.label :deep(.trigger) {
    display: inline !important;
}

.info-icon {
    display: inline;
    vertical-align: middle;
    margin-left: 2px;
    cursor: help;
    color: var(--color-text-maxcontrast);
}

.info-icon:hover {
    color: var(--color-primary-element);
}

.info-popup {
    padding: 8px 12px;
    max-width: 280px;
    font-size: 13px;
    line-height: 1.4;
}
</style>
