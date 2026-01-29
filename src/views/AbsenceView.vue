<template>
    <div class="absence-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Abwesenheiten') }}</h2>
            <NcButton type="primary" @click="showForm = true">
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

        <table v-else-if="absences.length > 0" class="absence-table">
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
                <tr v-for="absence in sortedAbsences" :key="absence.id">
                    <td>{{ formatDate(absence.startDate) }} - {{ formatDate(absence.endDate) }}</td>
                    <td>{{ absence.typeName }}</td>
                    <td>{{ absence.days }}</td>
                    <td>{{ absence.note || '-' }}</td>
                    <td>
                        <span class="status-badge" :class="absence.status">
                            {{ getStatusLabel(absence.status) }}
                        </span>
                    </td>
                    <td class="actions">
                        <NcButton v-if="canEdit(absence)"
                            type="tertiary"
                            :aria-label="t('worktime', 'Bearbeiten')"
                            @click="editAbsence(absence)">
                            <template #icon>
                                <PencilIcon :size="20" />
                            </template>
                        </NcButton>
                        <NcButton v-if="canCancel(absence)"
                            type="tertiary"
                            :aria-label="t('worktime', 'Stornieren')"
                            @click="confirmCancel(absence)">
                            <template #icon>
                                <CancelIcon :size="20" />
                            </template>
                        </NcButton>
                        <NcButton v-if="canDelete(absence)"
                            type="tertiary"
                            :aria-label="t('worktime', 'Löschen')"
                            @click="confirmDelete(absence)">
                            <template #icon>
                                <DeleteIcon :size="20" />
                            </template>
                        </NcButton>
                    </td>
                </tr>
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

        <NcModal v-if="showForm"
            :name="editingAbsence ? t('worktime', 'Abwesenheit bearbeiten') : t('worktime', 'Neue Abwesenheit')"
            @close="closeForm">
            <AbsenceForm :absence="editingAbsence"
                @saved="onSaved"
                @cancel="closeForm" />
        </NcModal>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import CancelIcon from 'vue-material-design-icons/Cancel.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import { mapGetters, mapActions } from 'vuex'
import AbsenceForm from '../components/AbsenceForm.vue'
import { formatDate, getCurrentYear } from '../utils/dateUtils.js'
import { confirmAction } from '../utils/errorHandler.js'

export default {
    name: 'AbsenceView',
    components: {
        NcButton,
        NcModal,
        NcLoadingIcon,
        NcEmptyContent,
        PlusIcon,
        PencilIcon,
        DeleteIcon,
        CancelIcon,
        CalendarIcon,
        AbsenceForm,
    },
    data() {
        return {
            showForm: false,
            editingAbsence: null,
            currentYear: getCurrentYear(),
        }
    },
    computed: {
        ...mapGetters('absences', ['absences', 'vacationStats', 'loading']),
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
    methods: {
        ...mapActions('absences', ['fetchAbsences', 'fetchVacationStats', 'deleteAbsence', 'cancelAbsence']),
        async loadData() {
            await Promise.all([
                this.fetchAbsences(this.currentYear),
                this.fetchVacationStats(this.currentYear),
            ])
        },
        formatDate(date) {
            return formatDate(date)
        },
        getStatusLabel(status) {
            const labels = {
                pending: this.t('worktime', 'Ausstehend'),
                approved: this.t('worktime', 'Genehmigt'),
                rejected: this.t('worktime', 'Abgelehnt'),
                cancelled: this.t('worktime', 'Storniert'),
            }
            return labels[status] || status
        },
        canEdit(absence) {
            return absence.status === 'pending' || absence.status === 'rejected'
        },
        canCancel(absence) {
            return absence.status === 'approved'
        },
        canDelete(absence) {
            return absence.status === 'pending' || absence.status === 'rejected'
        },
        editAbsence(absence) {
            this.editingAbsence = absence
            this.showForm = true
        },
        closeForm() {
            this.showForm = false
            this.editingAbsence = null
        },
        onSaved() {
            this.closeForm()
            this.loadData()
        },
        async confirmCancel(absence) {
            const confirmed = await confirmAction(
                this.t('worktime', 'Möchten Sie diese Abwesenheit wirklich stornieren?')
            )
            if (confirmed) {
                try {
                    await this.cancelAbsence(absence.id)
                    this.loadData()
                } catch (error) {
                    console.error('Failed to cancel absence:', error)
                }
            }
        },
        async confirmDelete(absence) {
            const confirmed = await confirmAction(
                this.t('worktime', 'Möchten Sie diese Abwesenheit wirklich löschen?')
            )
            if (confirmed) {
                try {
                    await this.deleteAbsence(absence.id)
                    this.loadData()
                } catch (error) {
                    console.error('Failed to delete absence:', error)
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
    background: var(--color-background-dark);
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
}

.absence-table th,
.absence-table td {
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.absence-table th {
    font-weight: 600;
    background: var(--color-background-dark);
}

.status-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.85em;
}

.status-badge.pending {
    background: var(--color-warning-hover);
    color: var(--color-warning-text);
}

.status-badge.approved {
    background: var(--color-success-hover);
    color: var(--color-success-text);
}

.status-badge.rejected {
    background: var(--color-error-hover);
    color: var(--color-error-text);
}

.status-badge.cancelled {
    background: var(--color-background-dark);
    color: var(--color-text-maxcontrast);
}

.actions {
    white-space: nowrap;
}
</style>
