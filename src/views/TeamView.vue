<template>
    <div class="team-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Team') }}</h2>
            <MonthPicker :year="year"
                :month="month"
                @update="onMonthChange" />
        </div>

        <NcLoadingIcon v-if="loading" :size="44" />

        <div v-else-if="teamReport.length > 0" class="team-grid">
            <div v-for="member in teamReport"
                :key="member.employee.id"
                class="team-card">
                <div class="team-card__header">
                    <NcAvatar :user="member.employee.userId"
                        :display-name="member.employee.fullName"
                        :size="44" />
                    <div class="team-card__info">
                        <span class="name">{{ member.employee.fullName }}</span>
                        <span class="details">{{ member.employee.weeklyHours }} Std./Woche</span>
                    </div>
                </div>

                <!-- Status Badges -->
                <div v-if="member.monthStatus" class="team-card__status">
                    <span v-if="member.monthStatus.draft > 0" class="status-badge status-draft">
                        {{ member.monthStatus.draft }} {{ t('worktime', 'Entwurf') }}
                    </span>
                    <span v-if="member.monthStatus.submitted > 0" class="status-badge status-submitted">
                        {{ member.monthStatus.submitted }} {{ t('worktime', 'Eingereicht') }}
                    </span>
                    <span v-if="member.monthStatus.approved > 0" class="status-badge status-approved">
                        {{ member.monthStatus.approved }} {{ t('worktime', 'Genehmigt') }}
                    </span>
                    <span v-if="member.monthStatus.rejected > 0" class="status-badge status-rejected">
                        {{ member.monthStatus.rejected }} {{ t('worktime', 'Abgelehnt') }}
                    </span>
                </div>

                <div class="team-card__stats">
                    <div class="stat">
                        <span class="label">{{ t('worktime', 'Soll') }}</span>
                        <span class="value">{{ formatMinutes(member.statistics.adjustedTargetMinutes) }}</span>
                    </div>
                    <div class="stat">
                        <span class="label">{{ t('worktime', 'Ist') }}</span>
                        <span class="value">{{ formatMinutes(member.statistics.actualMinutes) }}</span>
                    </div>
                    <div class="stat" :class="{ positive: member.statistics.overtimeMinutes > 0, negative: member.statistics.overtimeMinutes < 0 }">
                        <span class="label">{{ t('worktime', 'Differenz') }}</span>
                        <span class="value">{{ formatMinutes(member.statistics.overtimeMinutes) }}</span>
                    </div>
                </div>
                <div class="team-card__details">
                    <span>{{ member.statistics.entryCount }} {{ t('worktime', 'Einträge') }}</span>
                    <span v-if="member.statistics.absenceDays > 0">
                        {{ member.statistics.absenceDays }} {{ t('worktime', 'Abwesenheitstage') }}
                    </span>
                </div>

                <!-- Approve Month Button -->
                <div v-if="member.monthStatus && member.monthStatus.canApprove" class="team-card__actions">
                    <NcButton type="primary"
                        :disabled="approvingEmployee === member.employee.id"
                        @click="approveMonth(member.employee.id)">
                        <template #icon>
                            <NcLoadingIcon v-if="approvingEmployee === member.employee.id" :size="20" />
                            <CheckIcon v-else :size="20" />
                        </template>
                        {{ t('worktime', 'Monat genehmigen') }}
                    </NcButton>
                </div>
            </div>
        </div>

        <NcEmptyContent v-else
            :name="t('worktime', 'Kein Team')">
            <template #icon>
                <AccountGroupIcon />
            </template>
            <template #description>
                {{ t('worktime', 'Sie haben keine Teammitglieder.') }}
            </template>
        </NcEmptyContent>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import MonthPicker from '../components/MonthPicker.vue'
import ReportService from '../services/ReportService.js'
import TimeEntryService from '../services/TimeEntryService.js'
import { formatMinutesWithUnit } from '../utils/timeUtils.js'
import { getCurrentYear, getCurrentMonth } from '../utils/dateUtils.js'
import { showSuccess, showError } from '@nextcloud/dialogs'

export default {
    name: 'TeamView',
    components: {
        NcLoadingIcon,
        NcEmptyContent,
        NcAvatar,
        NcButton,
        AccountGroupIcon,
        CheckIcon,
        MonthPicker,
    },
    data() {
        return {
            year: getCurrentYear(),
            month: getCurrentMonth(),
            teamReport: [],
            loading: false,
            approvingEmployee: null,
        }
    },
    created() {
        this.loadTeamReport()
    },
    methods: {
        async loadTeamReport() {
            this.loading = true
            try {
                this.teamReport = await ReportService.getTeam(this.year, this.month)
            } catch (error) {
                console.error('Failed to load team report:', error)
                this.teamReport = []
            } finally {
                this.loading = false
            }
        },
        onMonthChange({ year, month }) {
            this.year = year
            this.month = month
            this.loadTeamReport()
        },
        formatMinutes(minutes) {
            return formatMinutesWithUnit(minutes)
        },
        async approveMonth(employeeId) {
            this.approvingEmployee = employeeId
            try {
                const result = await TimeEntryService.approveMonth(employeeId, this.year, this.month)
                showSuccess(t('worktime', '{count} Einträge genehmigt', { count: result.approved }))
                // Reload to update status badges
                await this.loadTeamReport()
            } catch (error) {
                console.error('Failed to approve month:', error)
                showError(t('worktime', 'Fehler beim Genehmigen'))
            } finally {
                this.approvingEmployee = null
            }
        },
    },
}
</script>

<style scoped>
.team-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1200px;
}

.view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.view-header h2 {
    margin: 0;
}

.team-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 16px;
}

.team-card {
    padding: 16px;
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-large);
}

.team-card__header {
    display: flex;
    gap: 12px;
    margin-bottom: 12px;
}

.team-card__info {
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.team-card__info .name {
    font-weight: 600;
}

.team-card__info .details {
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.team-card__status {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 12px;
}

.status-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.75em;
    font-weight: 500;
}

.status-draft {
    background: var(--color-background-darker);
    color: var(--color-text-maxcontrast);
}

.status-submitted {
    background: var(--color-warning-element-light);
    color: var(--color-warning-text);
}

.status-approved {
    background: var(--color-success-element-light);
    color: var(--color-success-text);
}

.status-rejected {
    background: var(--color-error-element-light);
    color: var(--color-error-text);
}

.team-card__stats {
    display: flex;
    gap: 16px;
    margin-bottom: 12px;
}

.team-card__stats .stat {
    display: flex;
    flex-direction: column;
    gap: 2px;
}

.team-card__stats .label {
    font-size: 0.75em;
    color: var(--color-text-maxcontrast);
}

.team-card__stats .value {
    font-weight: 500;
}

.team-card__stats .positive .value {
    color: var(--color-success-text);
}

.team-card__stats .negative .value {
    color: var(--color-error-text);
}

.team-card__details {
    display: flex;
    gap: 16px;
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
    margin-bottom: 12px;
}

.team-card__actions {
    padding-top: 12px;
    border-top: 1px solid var(--color-border);
}
</style>
