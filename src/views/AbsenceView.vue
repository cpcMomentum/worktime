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
                    @delete="confirmDelete"
                    @cancel-absence="confirmCancel" />
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
        async confirmDelete(absence) {
            const confirmed = await confirmAction(
                this.t('worktime', 'Möchten Sie diese Abwesenheit wirklich löschen?'),
                this.t('worktime', 'Abwesenheit löschen'),
                this.t('worktime', 'Löschen'),
                true
            )
            if (confirmed) {
                try {
                    await this.deleteAbsence(absence.id)
                    showSuccessMessage(this.t('worktime', 'Abwesenheit gelöscht'))
                    this.loadData()
                } catch (error) {
                    console.error('Failed to delete absence:', error)
                    showErrorMessage(error.message || this.t('worktime', 'Fehler beim Löschen'))
                }
            }
        },
        async confirmCancel(absence) {
            const confirmed = await confirmAction(
                this.t('worktime', 'Möchten Sie diese Abwesenheit wirklich stornieren?'),
                this.t('worktime', 'Abwesenheit stornieren'),
                this.t('worktime', 'Stornieren'),
                true
            )
            if (confirmed) {
                try {
                    await this.cancelAbsence(absence.id)
                    showSuccessMessage(this.t('worktime', 'Abwesenheit storniert'))
                    this.loadData()
                } catch (error) {
                    console.error('Failed to cancel absence:', error)
                    showErrorMessage(error.message || this.t('worktime', 'Fehler beim Stornieren'))
                }
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
    padding: 16px;
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-large);
}

.vacation-stats h3 {
    margin: 0 0 12px 0;
    font-size: 1em;
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
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.stat .value {
    font-size: 1.1em;
    font-weight: 500;
}

.stat.highlight .value {
    color: var(--color-primary);
    font-weight: 600;
}

.absence-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 16px;
}

.absence-table th,
.absence-table td {
    padding: 14px 12px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.absence-table th {
    font-weight: 600;
    background: var(--color-background-dark);
}
</style>
