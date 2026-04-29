<template>
    <div class="absence-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Abwesenheiten') }}</h2>
            <NcButton type="primary" @click="startCreate">
                <template #icon>
                    <PlusIcon :size="20" />
                </template>
                {{ t('worktime', 'Neue Abwesenheit') }}
            </NcButton>
        </div>

        <div v-if="vacationStats" class="vacation-stats">
            <h3>{{ t('worktime', 'Urlaubsübersicht') }} {{ currentYear }}</h3>
            <div class="stats-row">
                <div class="stat">
                    <span class="label">{{ t('worktime', 'Gesamt') }}</span>
                    <span class="value">{{ vacationStats.total }} {{ t('worktime', 'Tage') }}</span>
                </div>
                <div class="stat">
                    <span class="label">{{ t('worktime', 'Genommen') }}</span>
                    <span class="value">{{ vacationStats.used }} {{ t('worktime', 'Tage') }}</span>
                </div>
                <div class="stat">
                    <span class="label">{{ t('worktime', 'Ausstehend') }}</span>
                    <span class="value">{{ vacationStats.pending }} {{ t('worktime', 'Tage') }}</span>
                </div>
                <div class="stat highlight">
                    <span class="label">{{ t('worktime', 'Verbleibend') }}</span>
                    <span class="value">{{ vacationStats.remaining }} {{ t('worktime', 'Tage') }}</span>
                </div>
            </div>
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
                <!-- Create Row -->
                <AbsenceRow
                    v-if="isCreating"
                    :absence="null"
                    mode="create"
                    :absence-types="absenceTypes"
                    @save="onCreate"
                    @cancel="cancelCreate" />

                <!-- Existing Absences -->
                <AbsenceRow
                    v-for="absence in sortedAbsences"
                    :key="absence.id"
                    :absence="absence"
                    :mode="editingId === absence.id ? 'edit' : 'view'"
                    :absence-types="absenceTypes"
                    @edit="startEdit(absence.id)"
                    @save="onUpdate"
                    @cancel="cancelEdit"
                    @remove="confirmRemove" />
            </tbody>
        </table>

        <NcEmptyContent v-else
            :name="t('worktime', 'Keine Abwesenheiten')">
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
                    <span class="legend-color type-vacation"></span>
                    <div class="legend-text">
                        <strong>{{ t('worktime', 'Urlaub') }}</strong>
                        <span>{{ t('worktime', 'Bezahlter Erholungsurlaub. Wird vom Urlaubskonto abgezogen.') }}</span>
                    </div>
                </div>
                <div class="legend-item">
                    <span class="legend-color type-sick"></span>
                    <div class="legend-text">
                        <strong>{{ t('worktime', 'Krankheit') }}</strong>
                        <span>{{ t('worktime', 'Krankmeldung. Arbeitszeit gilt als geleistet, keine Urlaubstage.') }}</span>
                    </div>
                </div>
                <div class="legend-item">
                    <span class="legend-color type-child_sick"></span>
                    <div class="legend-text">
                        <strong>{{ t('worktime', 'Kind krank') }}</strong>
                        <span>{{ t('worktime', 'Ihr Kind ist krank. Wie Krankheit, keine Urlaubstage.') }}</span>
                    </div>
                </div>
                <div class="legend-item">
                    <span class="legend-color type-special"></span>
                    <div class="legend-text">
                        <strong>{{ t('worktime', 'Sonderurlaub') }}</strong>
                        <span>{{ t('worktime', 'Bezahlte Freistellung, z.B. Hochzeit, Umzug oder Trauerfall.') }}</span>
                    </div>
                </div>
                <div class="legend-item">
                    <span class="legend-color type-training"></span>
                    <div class="legend-text">
                        <strong>{{ t('worktime', 'Fortbildung') }}</strong>
                        <span>{{ t('worktime', 'Schulung, Seminar oder Konferenz. Zählt als Arbeitszeit.') }}</span>
                    </div>
                </div>
                <div class="legend-item">
                    <span class="legend-color type-unpaid"></span>
                    <div class="legend-text">
                        <strong>{{ t('worktime', 'Unbezahlter Urlaub') }}</strong>
                        <span>{{ t('worktime', 'Freistellung ohne Gehalt. Reduziert die Soll-Stunden.') }}</span>
                    </div>
                </div>
                <div class="legend-item">
                    <span class="legend-color type-compensatory"></span>
                    <div class="legend-text">
                        <strong>{{ t('worktime', 'Freizeitausgleich') }}</strong>
                        <span>{{ t('worktime', 'Überstunden als Freizeit nehmen. Reduziert die Soll-Stunden.') }}</span>
                    </div>
                </div>
            </div>
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
import { getCurrentYear } from '../utils/dateUtils.js'
import { confirmAction, showErrorMessage, showSuccessMessage } from '../utils/errorHandler.js'

export default {
    name: 'AbsenceView',
    components: {
        NcButton,
        NcLoadingIcon,
        NcEmptyContent,
        PlusIcon,
        CalendarIcon,
        AbsenceRow,
    },
    data() {
        return {
            currentYear: getCurrentYear(),
            editingId: null,
            isCreating: false,
        }
    },
    computed: {
        ...mapGetters('absences', ['absences', 'absenceTypes', 'vacationStats', 'loading']),
        ...mapGetters('permissions', ['employeeId']),
        sortedAbsences() {
            return [...this.absences].sort((a, b) => b.startDate.localeCompare(a.startDate))
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
    mounted() {
        if (this.employeeId) {
            this.loadData()
        }
        this.$store.dispatch('absences/fetchAbsenceTypes')
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
            ])
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
            // Genehmigte Urlaube/Sonderurlaube bleiben mit Status "Storniert" in der Liste (Audit-Trail)
            // Pending, rejected und Krankheit werden komplett geloescht
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
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}

.view-header h2 {
    margin: 0;
}

.vacation-stats {
    margin-bottom: 24px;
    padding: 20px;
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: 16px;
}

.vacation-stats h3 {
    margin: 0 0 12px 0;
    font-size: 15px;
    font-weight: 600;
}

.stats-row {
    display: flex;
    gap: 24px;
    flex-wrap: wrap;
}

.stat {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.stat .label {
    font-size: 13px;
    color: var(--color-text-maxcontrast);
}

.stat .value {
    font-size: 15px;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
}

.stat.highlight .value {
    color: var(--color-success-text);
    font-weight: 600;
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
    border-bottom: 2px solid var(--color-border);
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

.type-vacation { background-color: #0082c9; }
.type-sick { background-color: #e74c3c; }
.type-child_sick { background-color: #f39c12; }
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
