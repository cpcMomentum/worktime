<template>
    <div class="absence-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Abwesenheit') }}</h2>
            <div class="seg" role="group" :aria-label="t('worktime', 'Ansicht')">
                <button class="seg-btn" :class="{ active: tab === 'konto' }" @click="tab = 'konto'">
                    {{ t('worktime', 'Mein Konto') }}
                </button>
                <button class="seg-btn" :class="{ active: tab === 'team' }" @click="switchToTeam">
                    {{ t('worktime', 'Team') }}
                </button>
            </div>
            <div class="header-spacer" />
            <NcButton v-if="tab === 'konto'" type="primary" @click="startCreate">
                <template #icon>
                    <PlusIcon :size="20" />
                </template>
                {{ t('worktime', 'Neue Abwesenheit') }}
            </NcButton>
        </div>

        <!-- ============ MEIN KONTO ============ -->
        <div v-show="tab === 'konto'">
            <section v-if="vacationStats" class="acard-section">
                <h3>{{ t('worktime', 'Urlaub') }}</h3>
                <div class="acards acards--4">
                    <div class="acard">
                        <div class="acard__lab">{{ t('worktime', 'Anspruch') }}</div>
                        <div class="acard__val">{{ vacationBase }}</div>
                    </div>
                    <div class="acard">
                        <div class="acard__lab">{{ t('worktime', 'Übertrag Vorjahr') }}</div>
                        <div v-if="vacationCarryover !== 0" class="acard__val">{{ vacationCarryover }}</div>
                        <div v-else class="acard__none">{{ t('worktime', 'Kein Übertrag aus Vorjahr') }}</div>
                    </div>
                    <div class="acard">
                        <div class="acard__lab">{{ t('worktime', 'Genommen') }}</div>
                        <div class="acard__val">{{ vacationStats.used }}</div>
                        <div v-if="vacationStats.pending > 0" class="acard__sub">
                            {{ t('worktime', '+ {days} beantragt', { days: vacationStats.pending }) }}
                        </div>
                    </div>
                    <div class="acard acard--hl">
                        <div class="acard__lab">{{ t('worktime', 'Verbleibend') }}</div>
                        <div class="acard__val acard__val--pos">{{ vacationStats.remaining }}</div>
                    </div>
                </div>
            </section>

            <section v-if="overtime" class="acard-section">
                <h3>{{ t('worktime', 'Überstunden') }}</h3>
                <div class="acards acards--3">
                    <div class="acard">
                        <div class="acard__lab">{{ t('worktime', 'Saldo') }}</div>
                        <div class="acard__val" :class="overtimeValClass(overtimeSaldoMin)">{{ signedHours(overtimeSaldoMin) }}</div>
                    </div>
                    <div class="acard">
                        <div class="acard__lab">{{ t('worktime', 'Freizeitausgleich genommen') }}</div>
                        <div class="acard__val">{{ compensatoryDays }} {{ t('worktime', 'Tage') }}</div>
                    </div>
                    <div class="acard">
                        <div class="acard__lab">{{ t('worktime', 'Übertrag Vorjahr') }}</div>
                        <div v-if="overtimeCarryMin !== 0" class="acard__val" :class="overtimeValClass(overtimeCarryMin)">{{ signedHours(overtimeCarryMin) }}</div>
                        <div v-else class="acard__none">{{ t('worktime', 'Kein Übertrag aus Vorjahr') }}</div>
                    </div>
                </div>
                <p class="acard-hint">
                    {{ t('worktime', 'Freizeitausgleich reduziert die Überstunden automatisch.') }}
                </p>
            </section>

            <h3 class="list-title">{{ t('worktime', 'Meine Abwesenheiten') }}</h3>
            <NcLoadingIcon v-if="loading" :size="44" />
            <table v-else-if="absences.length > 0 || isCreating" class="absence-table">
                <thead>
                    <tr>
                        <th>{{ t('worktime', 'Zeitraum') }}</th>
                        <th>{{ t('worktime', 'Art') }}</th>
                        <th>{{ t('worktime', 'Tage') }}</th>
                        <th>{{ t('worktime', 'Bemerkung') }}</th>
                        <th>{{ t('worktime', 'Status') }}</th>
                        <th>{{ t('worktime', 'Aktionen') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <AbsenceRow
                        v-if="isCreating"
                        :absence="null"
                        mode="create"
                        :absence-types="absenceTypes"
                        :vacation-stats="vacationStats"
                        @save="onCreate"
                        @cancel="cancelCreate" />
                    <AbsenceRow
                        v-for="absence in sortedAbsences"
                        :key="absence.id"
                        :absence="absence"
                        :mode="editingId === absence.id ? 'edit' : 'view'"
                        :absence-types="absenceTypes"
                        :vacation-stats="vacationStats"
                        @edit="startEdit(absence.id)"
                        @save="onUpdate"
                        @cancel="cancelEdit"
                        @remove="confirmRemove" />
                </tbody>
            </table>
            <NcEmptyContent v-else :name="t('worktime', 'Keine Abwesenheiten')">
                <template #icon>
                    <CalendarIcon />
                </template>
                <template #description>
                    {{ t('worktime', 'Sie haben noch keine Abwesenheiten eingetragen.') }}
                </template>
            </NcEmptyContent>

            <div class="absence-legend">
                <h3>{{ t('worktime', 'Abwesenheitstypen') }}</h3>
                <div class="legend-grid">
                    <div class="legend-item">
                        <span class="legend-color type-vacation" />
                        <div class="legend-text">
                            <strong>{{ t('worktime', 'Urlaub') }}</strong>
                            <span>{{ t('worktime', 'Bezahlter Erholungsurlaub. Wird vom Urlaubskonto abgezogen.') }}</span>
                        </div>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color type-sick" />
                        <div class="legend-text">
                            <strong>{{ t('worktime', 'Krankheit') }}</strong>
                            <span>{{ t('worktime', 'Krankmeldung. Arbeitszeit gilt als geleistet, keine Urlaubstage.') }}</span>
                        </div>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color type-child_sick" />
                        <div class="legend-text">
                            <strong>{{ t('worktime', 'Kind krank') }}</strong>
                            <span>{{ t('worktime', 'Ihr Kind ist krank. Wie Krankheit, keine Urlaubstage.') }}</span>
                        </div>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color type-special" />
                        <div class="legend-text">
                            <strong>{{ t('worktime', 'Sonderurlaub') }}</strong>
                            <span>{{ t('worktime', 'Bezahlte Freistellung, z.B. Hochzeit, Umzug oder Trauerfall.') }}</span>
                        </div>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color type-training" />
                        <div class="legend-text">
                            <strong>{{ t('worktime', 'Fortbildung') }}</strong>
                            <span>{{ t('worktime', 'Schulung, Seminar oder Konferenz. Zählt als Arbeitszeit.') }}</span>
                        </div>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color type-unpaid" />
                        <div class="legend-text">
                            <strong>{{ t('worktime', 'Unbezahlter Urlaub') }}</strong>
                            <span>{{ t('worktime', 'Freistellung ohne Gehalt. Reduziert die Soll-Stunden.') }}</span>
                        </div>
                    </div>
                    <div class="legend-item">
                        <span class="legend-color type-compensatory" />
                        <div class="legend-text">
                            <strong>{{ t('worktime', 'Freizeitausgleich') }}</strong>
                            <span>{{ t('worktime', 'Überstunden als Freizeit nehmen. Reduziert die Überstunden.') }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- ============ TEAM ============ -->
        <div v-show="tab === 'team'">
            <div class="team-head">
                <MonthPicker :year="teamMonth.year" :month="teamMonth.month" @update="onTeamMonthChange" />
            </div>
            <NcLoadingIcon v-if="teamLoading" :size="44" />
            <AbsenceTimeline v-else
                :employees="teamOverview"
                :year="teamMonth.year"
                :month="teamMonth.month"
                :holidays="teamHolidays"
                :show-full-legend="isPrivileged" />
        </div>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import { mapGetters, mapActions } from 'vuex'
import AbsenceRow from '../components/AbsenceRow.vue'
import MonthPicker from '../components/MonthPicker.vue'
import AbsenceTimeline from '../components/AbsenceTimeline.vue'
import { getCurrentYear, getCurrentMonth, getLocale } from '../utils/dateUtils.js'
import { confirmAction, showErrorMessage, showSuccessMessage } from '../utils/errorHandler.js'
import ReportService from '../services/ReportService.js'
import AbsenceService from '../services/AbsenceService.js'
import HolidayService from '../services/HolidayService.js'

export default {
    name: 'AbsenceView',
    components: {
        NcButton,
        NcLoadingIcon,
        NcEmptyContent,
        PlusIcon,
        CalendarIcon,
        AbsenceRow,
        MonthPicker,
        AbsenceTimeline,
    },
    data() {
        return {
            tab: 'konto',
            currentYear: getCurrentYear(),
            editingId: null,
            isCreating: false,
            overtime: null,
            teamMonth: { year: getCurrentYear(), month: getCurrentMonth() },
            teamOverview: [],
            teamHolidays: [],
            teamLoading: false,
            teamLoaded: false,
        }
    },
    computed: {
        ...mapGetters('absences', ['absences', 'absenceTypes', 'vacationStats', 'loading']),
        ...mapGetters('permissions', ['employeeId', 'isAdmin', 'isHrManager', 'canApprove']),
        isPrivileged() {
            return this.isAdmin || this.isHrManager || this.canApprove
        },
        sortedAbsences() {
            return [...this.absences].sort((a, b) => b.startDate.localeCompare(a.startDate))
        },
        vacationCarryover() {
            return Math.round(this.vacationStats?.carryover ?? 0)
        },
        vacationBase() {
            if (!this.vacationStats) return 0
            return Math.round((this.vacationStats.total ?? 0) - (this.vacationStats.carryover ?? 0))
        },
        overtimeSaldoMin() {
            return this.overtime?.totalOvertimeMinutes ?? 0
        },
        overtimeCarryMin() {
            return this.overtime?.carryoverMinutes ?? 0
        },
        compensatoryDays() {
            return this.absences
                .filter(a => a.type === 'compensatory' && a.status === 'approved')
                .reduce((sum, a) => sum + (Number(a.days) || 0), 0)
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
    methods: {
        ...mapActions('absences', [
            'fetchAbsences',
            'fetchVacationStats',
            'createAbsence',
            'updateAbsence',
            'deleteAbsence',
            'cancelAbsence',
        ]),
        async loadData() {
            await Promise.all([
                this.fetchAbsences(this.currentYear),
                this.fetchVacationStats(this.currentYear),
                this.loadOvertime(),
            ])
        },
        async loadOvertime() {
            if (!this.employeeId) return
            try {
                this.overtime = await ReportService.getOvertime(this.employeeId, this.currentYear)
            } catch (error) {
                console.error('Failed to load overtime stats:', error)
            }
        },
        switchToTeam() {
            this.tab = 'team'
            if (!this.teamLoaded) {
                this.loadTeam()
            }
        },
        onTeamMonthChange({ year, month }) {
            this.teamMonth = { year, month }
            this.loadTeam()
        },
        async loadTeam() {
            this.teamLoading = true
            try {
                const [overviewRes, holidaysRes] = await Promise.all([
                    AbsenceService.getOverview(this.teamMonth.year, this.teamMonth.month),
                    HolidayService.getByYear(this.teamMonth.year),
                ])
                this.teamOverview = Array.isArray(overviewRes) ? overviewRes : (overviewRes?.data || [])
                const holidayData = Array.isArray(holidaysRes) ? holidaysRes : (holidaysRes?.data || [])
                this.teamHolidays = holidayData.map(h => ({ date: h.date, name: h.name }))
                this.teamLoaded = true
            } catch (error) {
                console.error('Failed to load absence overview', error)
                this.teamOverview = []
            } finally {
                this.teamLoading = false
            }
        },
        overtimeValClass(minutes) {
            return { 'acard__val--pos': minutes > 0, 'acard__val--neg': minutes < 0 }
        },
        signedHours(minutes) {
            const hours = (Math.abs(minutes) / 60).toLocaleString(getLocale(), { minimumFractionDigits: 1, maximumFractionDigits: 1 })
            const sign = minutes < 0 ? '−' : '+'
            return `${sign}${hours} h`
        },
        startCreate() {
            this.editingId = null
            this.isCreating = true
        },
        cancelCreate() {
            this.isCreating = false
        },
        startEdit(id) {
            this.isCreating = false
            this.editingId = id
        },
        cancelEdit() {
            this.editingId = null
        },
        async onCreate({ data }) {
            try {
                await this.createAbsence(data)
                this.isCreating = false
                showSuccessMessage(this.t('worktime', 'Abwesenheit erstellt'))
                this.loadData()
            } catch (error) {
                console.error('Failed to create absence:', error)
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Erstellen'))
            }
        },
        async onUpdate({ id, data }) {
            try {
                await this.updateAbsence({ id, data })
                this.editingId = null
                showSuccessMessage(this.t('worktime', 'Abwesenheit aktualisiert'))
                this.loadData()
            } catch (error) {
                console.error('Failed to update absence:', error)
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Speichern'))
            }
        },
        async confirmRemove(absence) {
            const shouldCancel = absence.status === 'approved'
                && absence.type !== 'sick' && absence.type !== 'child_sick'

            const question = shouldCancel
                ? this.t('worktime', 'Diese Abwesenheit stornieren? Sie bleibt mit Status "Storniert" sichtbar.')
                : this.t('worktime', 'Diese Abwesenheit löschen?')
            const title = shouldCancel
                ? this.t('worktime', 'Abwesenheit stornieren')
                : this.t('worktime', 'Abwesenheit löschen')
            const button = shouldCancel
                ? this.t('worktime', 'Stornieren')
                : this.t('worktime', 'Löschen')

            const confirmed = await confirmAction(question, title, button, true)
            if (!confirmed) return

            try {
                if (shouldCancel) {
                    await this.cancelAbsence(absence.id)
                    showSuccessMessage(this.t('worktime', 'Abwesenheit storniert'))
                } else {
                    await this.deleteAbsence(absence.id)
                    showSuccessMessage(this.t('worktime', 'Abwesenheit gelöscht'))
                }
                this.loadData()
            } catch (error) {
                console.error('Failed to remove absence:', error)
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Entfernen'))
            }
        },
    },
}
</script>

<style scoped>
.absence-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1200px;
}

.view-header {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-bottom: 20px;
}

.view-header h2 {
    margin: 0;
}

.header-spacer {
    flex: 1;
}

/* Segment-Umschalter (NC-Control-Form, konsistent mit Zeiten) */
.seg {
    display: flex;
    background: var(--color-background-dark);
    border-radius: var(--border-radius-element, 8px);
    padding: 3px;
}

.seg-btn {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    background: none;
    border: none;
    padding: 6px 16px;
    border-radius: var(--border-radius-element, 8px);
    cursor: pointer;
}

.seg-btn.active {
    background: var(--color-main-background);
    color: var(--color-primary-element);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

/* Stat-Cards (konsistent mit KPI-Cards) */
.acard-section {
    margin-bottom: 20px;
}

.acard-section h3 {
    font-size: 15px;
    font-weight: 600;
    margin: 0 0 12px;
}

.acards {
    display: grid;
    gap: 12px;
}

.acards--4 {
    grid-template-columns: repeat(4, 1fr);
}

.acards--3 {
    grid-template-columns: repeat(3, 1fr);
}

.acard {
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 14px 16px;
}

.acard--hl {
    border-color: var(--wt-vacation, #4a9d63);
}

.acard__lab {
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
}

.acard__val {
    font-size: 24px;
    font-weight: 700;
    margin-top: 5px;
    font-variant-numeric: tabular-nums;
}

.acard__val--pos {
    color: var(--color-success-text);
}

.acard__val--neg {
    color: var(--color-error-text);
}

.acard__sub {
    font-size: 12.5px;
    color: var(--color-text-maxcontrast);
    margin-top: 4px;
}

.acard__none {
    font-size: 13px;
    color: var(--color-text-maxcontrast);
    margin-top: 8px;
    line-height: 1.3;
}

.acard-hint {
    margin-top: 10px;
    font-size: 13px;
    color: var(--color-text-maxcontrast);
}

.list-title {
    font-size: 15px;
    font-weight: 600;
    margin: 4px 0 12px;
}

.team-head {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 16px;
}

.absence-table {
    width: 100%;
    border-collapse: collapse;
}

.absence-table th,
.absence-table td {
    padding: 10px 12px;
    text-align: left;
}

.absence-table th {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
}

.absence-table td {
    font-variant-numeric: tabular-nums;
    border-bottom: 1px solid var(--color-border);
}

.absence-legend {
    margin-top: 32px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
}

.absence-legend h3 {
    font-size: 15px;
    font-weight: 600;
    margin-bottom: 12px;
}

.legend-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 12px;
}

.legend-item {
    display: flex;
    align-items: flex-start;
    gap: 10px;
}

.legend-color {
    width: 12px;
    height: 12px;
    min-width: 12px;
    border-radius: 50%;
    margin-top: 3px;
}

.type-vacation { background-color: #4a9d63; }
.type-sick { background-color: #cc4b42; }
.type-child_sick { background-color: #e0863a; }
.type-special { background-color: #9b59b6; }
.type-training { background-color: #2ecc71; }
.type-unpaid { background-color: #34495e; }
.type-compensatory { background-color: #1abc9c; }

.legend-text {
    display: flex;
    flex-direction: column;
    gap: 2px;
    font-size: 13px;
    line-height: 1.4;
}

.legend-text strong {
    font-weight: 600;
    color: var(--color-main-text);
}

.legend-text span {
    color: var(--color-text-maxcontrast);
}
</style>
