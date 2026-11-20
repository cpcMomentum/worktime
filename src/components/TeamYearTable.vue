<template>
    <div class="team-year-table">
        <div v-for="member in report"
            :key="member.employee.id"
            class="member-card">
            <!-- Header: Name + weekly hours -->
            <div class="member-card__header">
                <NcAvatar :user="member.employee.userId"
                    :display-name="member.employee.fullName"
                    :size="44" />
                <span class="member-card__name">{{ member.employee.fullName }}</span>
                <span class="member-card__hours">{{ member.employee.weeklyHours }} {{ t('worktime', 'Std./Woche') }}</span>
            </div>

            <!-- Data table -->
            <table>
                <thead>
                    <tr class="month-header">
                        <th class="col-label">{{ t('worktime', 'Art') }}</th>
                        <th v-for="m in 12"
                            :key="m"
                            class="col-month">
                            {{ getMonthNameShort(m) }}
                        </th>
                        <th class="col-total">{{ t('worktime', 'Gesamt') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Row 1: Vacation -->
                    <tr class="row-data">
                        <td class="col-label">{{ t('worktime', 'Urlaub') }}</td>
                        <td v-for="m in member.months"
                            :key="m.month"
                            class="col-month">
                            <span v-if="m.vacationDays > 0" class="vacation-days">{{ m.vacationDays }}</span>
                        </td>
                        <td class="col-total">
                            <strong>{{ member.vacationStats.used }}/{{ member.vacationStats.total }}</strong>
                        </td>
                    </tr>
                    <!-- Row 2: Overtime -->
                    <tr class="row-data">
                        <td class="col-label">{{ t('worktime', 'Stunden') }}</td>
                        <td v-for="m in member.months"
                            :key="m.month"
                            class="col-month"
                            :class="overtimeClass(m.overtimeMinutes)">
                            <span v-if="m.overtimeMinutes !== null">{{ formatOvertimeShort(m.overtimeMinutes) }}</span>
                        </td>
                        <td class="col-total" :class="overtimeClass(member.totalOvertimeMinutes)">
                            <strong>{{ formatOvertimeShort(member.totalOvertimeMinutes) }}</strong>
                        </td>
                    </tr>
                    <!-- Row 3: Status -->
                    <tr class="row-data">
                        <td class="col-label">{{ t('worktime', 'Status') }}</td>
                        <td v-for="m in member.months"
                            :key="m.month"
                            class="col-month">
                            <CheckCircleIcon v-if="m.status === 'approved'"
                                :size="20"
                                class="status-icon status-approved"
                                :title="t('worktime', 'Genehmigt')" />
                            <ClockOutlineIcon v-else-if="m.status === 'submitted'"
                                :size="20"
                                class="status-icon status-submitted"
                                :title="t('worktime', 'Eingereicht')" />
                            <CloseCircleIcon v-else-if="m.status === 'rejected'"
                                :size="20"
                                class="status-icon status-rejected"
                                :title="t('worktime', 'Abgelehnt')" />
                        </td>
                        <td class="col-total" />
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import NcAvatar from '@nextcloud/vue/components/NcAvatar'
import CheckCircleIcon from 'vue-material-design-icons/CheckCircle.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import CloseCircleIcon from 'vue-material-design-icons/CloseCircle.vue'
import { getMonthNameShort } from '../utils/dateUtils.js'
import { formatMinutes } from '../utils/timeUtils.js'

export default {
    name: 'TeamYearTable',
    components: {
        NcAvatar,
        CheckCircleIcon,
        ClockOutlineIcon,
        CloseCircleIcon,
    },
    props: {
        report: {
            type: Array,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
    },
    methods: {
        getMonthNameShort,
        formatOvertimeShort(minutes) {
            if (minutes === null || minutes === undefined) return '--'
            const sign = minutes >= 0 ? '+' : ''
            return sign + formatMinutes(minutes)
        },
        overtimeClass(minutes) {
            if (minutes === null || minutes === undefined) return ''
            if (minutes > 0) return 'positive'
            if (minutes < 0) return 'negative'
            return ''
        },
    },
}
</script>

<style scoped>
.team-year-table {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

/* Member card – same pattern as dashboard-card / stat-card */
.member-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 20px;
    overflow-x: auto;
}

.member-card__header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 16px;
}

.member-card__name {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-main-text);
}

.member-card__hours {
    font-size: 13px;
    color: var(--color-text-maxcontrast);
}

table {
    width: 100%;
    border-collapse: collapse;
}

/* Month column headers – match reference tables (maxcontrast text, 2px divider) */
.month-header th {
    padding: 10px 4px;
    text-align: center;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
    white-space: nowrap;
}

/* Label column (first col) */
.col-label {
    text-align: left;
    padding: 10px 12px 10px 0 !important;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    white-space: nowrap;
    min-width: 60px;
}

/* Month data columns */
.col-month {
    text-align: center;
    min-width: 44px;
    padding: 9px 3px;
    font-size: 12.5px;
    font-variant-numeric: tabular-nums;
}

/* Total column */
.col-total {
    text-align: center;
    min-width: 62px;
    padding: 9px 4px;
    font-size: 12.5px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    border-left: 1px solid var(--color-border);
}

/* Data rows */
.row-data td {
    border-bottom: 1px solid var(--color-border);
}

.row-data:last-child td {
    border-bottom: none;
}

/* Vacation */
.vacation-days {
    font-weight: 600;
}

/* Overtime colors */
.positive {
    color: var(--color-success-text);
}

.negative {
    color: var(--color-error-text);
}

/* Status icons */
.status-icon {
    display: inline-flex;
}

.status-approved {
    color: var(--wt-vacation, #4a9d63);
}

.status-submitted {
    color: var(--wt-holiday, #c98b3a);
}

.status-submitted.clickable {
    cursor: pointer;
}

.status-submitted.clickable:hover {
    color: #a06d00;
}

.status-rejected {
    color: var(--wt-sick, #cc4b42);
}

.muted {
    color: var(--color-text-maxcontrast);
}
</style>
