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
        </div>

        <!-- ============ MEIN KONTO ============ -->
        <div v-show="tab === 'konto'">
            <div class="konto-yearbar">
                <YearPicker :year="currentYear" :max="thisYear" @update="onYearChange" />
            </div>
            <div class="konto-stats">
            <section v-if="vacationStats" class="konto-box">
                <h3>{{ t('worktime', 'Urlaub') }}</h3>
                <div class="konto-hero" :class="vacationStats.remaining >= 0 ? 'konto-hero--pos' : 'konto-hero--neg'">
                    {{ vacationStats.remaining }} <small>/ {{ vacationStats.total }} {{ t('worktime', 'Tage übrig') }}</small>
                </div>
                <div class="vac-progress"
                    role="progressbar"
                    :aria-valuenow="vacationStats.used"
                    :aria-valuemin="0"
                    :aria-valuemax="vacationStats.total">
                    <div class="vac-progress__fill" :style="{ width: vacationUsedPercent + '%' }" />
                </div>
                <div class="konto-barlab">
                    {{ t('worktime', '{used} von {total} Tagen genommen', { used: vacationStats.used, total: vacationStats.total }) }}
                </div>
                <div class="konto-substats">
                    <div class="substat">
                        <span class="substat__l">{{ t('worktime', 'Anspruch') }}</span>
                        <span class="substat__v">{{ vacationBase }}</span>
                    </div>
                    <div class="substat">
                        <span class="substat__l">{{ t('worktime', 'Genommen') }}</span>
                        <span class="substat__v">{{ vacationStats.used }}<small v-if="vacationStats.pending > 0"> {{ t('worktime', '+ {days} beantragt', { days: vacationStats.pending }) }}</small></span>
                    </div>
                    <div class="substat">
                        <span class="substat__l">{{ t('worktime', 'Übertrag Vorjahr') }}</span>
                        <span class="substat__v">{{ vacationCarryover !== 0 ? vacationCarryover : '–' }}</span>
                    </div>
                </div>
            </section>

            <section v-if="overtime" class="konto-box">
                <h3>
                    {{ t('worktime', 'Überstunden') }}
                    <InfoIcon>{{ t('worktime', 'Freizeitausgleich reduziert die Überstunden automatisch.') }}</InfoIcon>
                </h3>
                <div class="konto-hero" :class="overtimeSaldoMin >= 0 ? 'konto-hero--pos' : 'konto-hero--neg'">
                    {{ signedHours(overtimeSaldoMin) }}
                </div>
                <div class="konto-barlab">{{ t('worktime', 'Stand heute') }}</div>
                <div class="konto-substats">
                    <div class="substat">
                        <span class="substat__l">{{ t('worktime', 'Freizeitausgleich') }}</span>
                        <span class="substat__v">{{ compensatoryDays }} {{ t('worktime', 'Tage') }}<small v-if="compensatoryDays > 0"> (≈{{ compensatoryHoursLabel }})</small></span>
                    </div>
                    <div class="substat">
                        <span class="substat__l">{{ t('worktime', 'Übertrag Vorjahr') }}</span>
                        <span class="substat__v">{{ overtimeCarryMin !== 0 ? signedHours(overtimeCarryMin) : '–' }}</span>
                    </div>
                </div>
            </section>
            </div>

            <div class="absence-card">
            <div class="list-head">
                <h3 class="list-title">{{ t('worktime', 'Meine Abwesenheiten') }}</h3>
                <NcButton type="primary" @click="startCreate">
                    <template #icon>
                        <PlusIcon :size="20" />
                    </template>
                    {{ t('worktime', 'Neue Abwesenheit') }}
                </NcButton>
            </div>
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
            </div>

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

        <CorrectionReasonModal v-if="pendingCorrection"
            @confirm="onReasonConfirm"
            @close="pendingCorrection = null" />
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
import CorrectionReasonModal from '../components/CorrectionReasonModal.vue'
import MonthPicker from '../components/MonthPicker.vue'
import YearPicker from '../components/YearPicker.vue'
import AbsenceTimeline from '../components/AbsenceTimeline.vue'
import InfoIcon from '../components/InfoIcon.vue'
import { getCurrentYear, getCurrentMonth } from '../utils/dateUtils.js'
import { formatMinutes } from '../utils/timeUtils.js'
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
        CorrectionReasonModal,
        MonthPicker,
        YearPicker,
        AbsenceTimeline,
        InfoIcon,
    },
    data() {
        return {
            tab: 'konto',
            currentYear: getCurrentYear(),
            editingId: null,
            isCreating: false,
            overtime: null,
            pendingCorrection: null,
            teamMonth: { year: getCurrentYear(), month: getCurrentMonth() },
            teamOverview: [],
            teamHolidays: [],
            teamLoading: false,
            teamLoaded: false,
        }
    },
    computed: {
        ...mapGetters('absences', ['absences', 'absenceTypes', 'vacationStats', 'loading']),
        ...mapGetters('permissions', ['activeEmployeeId', 'isAdmin', 'isHrManager', 'canApprove', 'isCorrectionMode']),
        isPrivileged() {
            return this.isAdmin || this.isHrManager || this.canApprove
        },
        thisYear() {
            return getCurrentYear()
        },
        vacationUsedPercent() {
            const total = this.vacationStats?.total
            if (!total || total <= 0) return 0
            const used = this.vacationStats.used || 0
            return Math.min(100, Math.max(0, Math.round((used / total) * 100)))
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
        compensatoryHoursLabel() {
            const daily = this.overtime?.dailyMinutes ?? 0
            return formatMinutes(Math.round(this.compensatoryDays * daily))
        },
    },
    watch: {
        activeEmployeeId: {
            immediate: true,
            handler() {
                if (this.activeEmployeeId) {
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
        onYearChange(year) {
            this.currentYear = year
            this.loadData()
        },
        async loadData() {
            await Promise.all([
                this.fetchAbsences(this.currentYear),
                this.fetchVacationStats(this.currentYear),
                this.loadOvertime(),
            ])
        },
        async loadOvertime() {
            if (!this.activeEmployeeId) return
            try {
                this.overtime = await ReportService.getOvertime(this.activeEmployeeId, this.currentYear)
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
        signedHours(minutes) {
            const sign = minutes < 0 ? '−' : '+'
            return `${sign}${formatMinutes(Math.abs(minutes))} h`
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
        onCreate({ data }) {
            // In HR correction mode, capture a mandatory reason before saving.
            if (this.isCorrectionMode) {
                this.pendingCorrection = { mode: 'create', data }
                return
            }
            this.doCreate(data)
        },
        onUpdate({ id, data }) {
            if (this.isCorrectionMode) {
                this.pendingCorrection = { mode: 'update', id, data }
                return
            }
            this.doUpdate(id, data)
        },
        onReasonConfirm(reason) {
            const pending = this.pendingCorrection
            this.pendingCorrection = null
            if (!pending) return
            if (pending.mode === 'create') {
                this.doCreate({ ...pending.data, reason })
            } else if (pending.mode === 'update') {
                this.doUpdate(pending.id, { ...pending.data, reason })
            } else if (pending.mode === 'delete') {
                this.doDeleteAbsence(pending.id, reason)
            }
        },
        async doDeleteAbsence(id, reason) {
            try {
                await this.deleteAbsence({ id, reason })
                showSuccessMessage(this.t('worktime', 'Abwesenheit gelöscht'))
                this.loadData()
            } catch (error) {
                console.error('Failed to delete absence:', error)
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Entfernen'))
            }
        },
        async doCreate(data) {
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
        async doUpdate(id, data) {
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

            // In HR correction mode, deleting requires a mandatory reason (storno keeps its own flow).
            if (!shouldCancel && this.isCorrectionMode) {
                this.pendingCorrection = { mode: 'delete', id: absence.id }
                return
            }

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

.konto-yearbar {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 12px;
}

/* Urlaub- und Überstunden-Box nebeneinander (#252.9), auf schmalen Screens gestapelt */
.konto-stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    align-items: stretch;
}

@media (max-width: 880px) {
    .konto-stats {
        grid-template-columns: 1fr;
    }
}

/* Konto-Box: ein Thema (Urlaub/Überstunden) als eigene Box,
   Hero-Wert oben + kleine Stützwerte unten (Sprache der Zeiterfassungs-KPI-Cards) */
.konto-box {
    display: flex;
    flex-direction: column;
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 16px;
}

.konto-box h3 {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 15px;
    font-weight: 600;
    margin: 0 0 12px;
}

.konto-hero {
    font-size: 34px;
    font-weight: 700;
    line-height: 1;
    font-variant-numeric: tabular-nums;
}

.konto-hero small {
    font-size: 16px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
}

.konto-hero--pos { color: var(--color-success-text); }
.konto-hero--neg { color: var(--color-error-text); }

.konto-barlab {
    font-size: 12.5px;
    color: var(--color-text-maxcontrast);
    margin-top: 6px;
}

.konto-substats {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
    margin-top: 16px;
}

.substat__l {
    display: block;
    font-size: 12.5px;
    color: var(--color-text-maxcontrast);
}

.substat__v {
    display: block;
    font-size: 16px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
    margin-top: 2px;
}

.substat__v small {
    font-size: 12.5px;
    font-weight: 400;
    color: var(--color-text-maxcontrast);
}

/* Urlaubs-Auslastung als dezente Progressbar (#252.4) */
.vac-progress {
    margin-top: 12px;
    height: 8px;
    border-radius: var(--border-radius-element, 8px);
    background: var(--color-background-dark);
    overflow: hidden;
}

.vac-progress__fill {
    height: 100%;
    border-radius: var(--border-radius-element, 8px);
    background: var(--wt-vacation, var(--color-primary-element));
}

/* Abwesenheitsliste als eigene Karte (konsistent zur Zeiterfassungs-Liste),
   mit klarem Abstand zu den Konto-Boxen darüber */
.absence-card {
    margin-top: 24px;
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 8px 16px 16px;
}

/* Kopfzeile der Abwesenheitsliste mit Aktion (#252.10) */
.list-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 4px 0 12px;
}

.list-head .list-title {
    margin: 0;
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
    color: var(--color-main-text);
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
