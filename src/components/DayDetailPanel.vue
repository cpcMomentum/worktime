<template>
    <div class="day-panel">
        <h3 class="dp-title">{{ dayTitle }}</h3>
        <p class="dp-sub">{{ subtitle }}</p>

        <!-- Kontext-Hinweis: Feiertag / Abwesenheit (Erfassen bleibt möglich) -->
        <div v-if="day.holiday" class="dp-note holiday">
            <CalendarStarIcon :size="18" />
            {{ t('worktime', 'Feiertag') }}: {{ day.holiday.name }}
        </div>
        <template v-else-if="day.absence">
            <div class="dp-note" :class="absenceColorClass(day.absence.type)">
                {{ day.absence.typeName }}<span v-if="day.absence.scope < 1"> ({{ scopeLabel }})</span>
            </div>
            <NcButton type="tertiary" class="dp-open-abs" @click="goToAbsence">
                {{ t('worktime', 'In „Abwesenheit" öffnen') }}
            </NcButton>
        </template>

        <!-- Erfassung: immer möglich (auch an Feiertag/Wochenende/Abwesenheit) -->
        <div v-if="formMode" class="dp-form">
            <TimeEntryForm embedded
                :entry="editingEntry"
                :preset-date="day.date"
                @saved="onSaved"
                @cancel="closeForm" />
        </div>
        <template v-else>
            <ul v-if="day.entries.length" class="dp-entries">
                <li v-for="entry in day.entries" :key="entry.id" class="dp-entry">
                    <div class="dp-entry-main">
                        <div class="dp-entry-time">{{ entry.startTime }} – {{ entry.endTime }}</div>
                        <div class="dp-entry-meta">
                            <span>{{ hoursLabel(entry.workMinutes) }}</span>
                            <span class="dp-dot-sep">·</span>
                            <span>{{ t('worktime', '{min} Min Pause', { min: entry.breakMinutes }) }}</span>
                            <template v-if="projectName(entry.projectId)">
                                <span class="dp-dot-sep">·</span>
                                <span>{{ projectName(entry.projectId) }}</span>
                            </template>
                        </div>
                        <div v-if="entry.description" class="dp-entry-desc">{{ entry.description }}</div>
                    </div>
                    <div v-if="!readonly" class="dp-entry-actions">
                        <NcButton type="tertiary"
                            :aria-label="t('worktime', 'Bearbeiten')"
                            @click="startEdit(entry)">
                            <template #icon><PencilIcon :size="18" /></template>
                        </NcButton>
                        <NcButton type="tertiary"
                            :aria-label="t('worktime', 'Löschen')"
                            @click="confirmDelete(entry)">
                            <template #icon><DeleteIcon :size="18" /></template>
                        </NcButton>
                    </div>
                </li>
            </ul>
            <p v-else-if="!day.holiday && !day.absence && !readonly" class="dp-empty">
                {{ t('worktime', 'Noch nichts erfasst.') }}
            </p>

            <div v-if="readonly" class="dp-locked">
                <LockIcon :size="16" />
                {{ lockedMessage }}
            </div>
            <NcButton v-else type="primary" wide class="dp-add" @click="startAdd">
                <template #icon><PlusIcon :size="20" /></template>
                {{ t('worktime', 'Eintrag hinzufügen') }}
            </NcButton>
        </template>

        <CorrectionReasonModal v-if="pendingDeleteEntry"
            @confirm="onDeleteReasonConfirm"
            @close="pendingDeleteEntry = null" />
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import LockIcon from 'vue-material-design-icons/Lock.vue'
import CalendarStarIcon from 'vue-material-design-icons/CalendarStar.vue'
import { mapActions, mapGetters } from 'vuex'
import TimeEntryForm from './TimeEntryForm.vue'
import CorrectionReasonModal from './CorrectionReasonModal.vue'
import { formatDateWithWeekday } from '../utils/dateUtils.js'
import { formatMinutes } from '../utils/timeUtils.js'
import { getAbsenceColorClass } from '../utils/formatters.js'
import { confirmAction, showErrorMessage, showSuccessMessage } from '../utils/errorHandler.js'

export default {
    name: 'DayDetailPanel',
    components: {
        NcButton,
        PlusIcon,
        PencilIcon,
        DeleteIcon,
        LockIcon,
        CalendarStarIcon,
        TimeEntryForm,
        CorrectionReasonModal,
    },
    props: {
        day: {
            type: Object,
            required: true,
        },
        projects: {
            type: Array,
            default: () => [],
        },
        monthStatus: {
            type: String,
            default: null,
        },
    },
    emits: ['refresh'],
    data() {
        return {
            formMode: null, // 'add' | 'edit' | null
            editingEntry: null,
            pendingDeleteEntry: null,
        }
    },
    computed: {
        ...mapGetters('permissions', ['isCorrectionMode']),
        dayTitle() {
            return formatDateWithWeekday(this.day.date)
        },
        subtitle() {
            if (this.day.entries.length) {
                return this.t('worktime', 'Erfasst: {hours}', { hours: this.hoursLabel(this.day.totalMinutes) })
            }
            return this.t('worktime', 'Tag ausgewählt')
        },
        scopeLabel() {
            const scope = this.day.absence?.scope ?? 1
            return scope === 0.5
                ? this.t('worktime', 'Halber Tag')
                : this.t('worktime', '{scope} Tage', { scope })
        },
        readonly() {
            // In HR correction mode the lock is bypassed (a reason is required on save).
            if (this.isCorrectionMode) {
                return false
            }
            return this.monthStatus === 'submitted' || this.monthStatus === 'approved'
        },
        lockedMessage() {
            if (this.monthStatus === 'approved') {
                return this.t('worktime', 'Monat genehmigt – gesperrt. Korrektur nur durch HR.')
            }
            return this.t('worktime', 'Eingereicht – Bearbeitung erst nach Genehmigung oder Ablehnung möglich.')
        },
    },
    watch: {
        // Beim Wechsel des ausgewählten Tages offene Formulare schließen
        'day.date'() {
            this.closeForm()
        },
    },
    methods: {
        ...mapActions('timeEntries', ['deleteTimeEntry']),
        hoursLabel(minutes) {
            return `${formatMinutes(minutes)} h`
        },
        projectName(projectId) {
            if (!projectId) return ''
            const project = this.projects.find(p => p.id === projectId)
            return project?.name || project?.displayName || ''
        },
        absenceColorClass: getAbsenceColorClass,
        startAdd() {
            this.editingEntry = null
            this.formMode = 'add'
        },
        startEdit(entry) {
            this.editingEntry = entry
            this.formMode = 'edit'
        },
        closeForm() {
            this.formMode = null
            this.editingEntry = null
        },
        onSaved() {
            this.closeForm()
            this.$emit('refresh')
        },
        async confirmDelete(entry) {
            // In HR correction mode, capture a mandatory reason instead of the plain confirm.
            if (this.isCorrectionMode) {
                this.pendingDeleteEntry = entry
                return
            }
            const confirmed = await confirmAction(
                this.t('worktime', 'Möchten Sie diesen Eintrag wirklich löschen?'),
                this.t('worktime', 'Eintrag löschen'),
                this.t('worktime', 'Löschen'),
                true,
            )
            if (!confirmed) return
            this.doDelete(entry, null)
        },
        onDeleteReasonConfirm(reason) {
            const entry = this.pendingDeleteEntry
            this.pendingDeleteEntry = null
            if (entry) {
                this.doDelete(entry, reason)
            }
        },
        async doDelete(entry, reason) {
            try {
                await this.deleteTimeEntry({ id: entry.id, reason })
                showSuccessMessage(this.t('worktime', 'Eintrag gelöscht'))
                this.$emit('refresh')
            } catch (error) {
                console.error('Failed to delete entry:', error)
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Löschen'))
            }
        },
        goToAbsence() {
            this.$router.push('/absences')
        },
    },
}
</script>

<style scoped>
.day-panel {
    display: flex;
    flex-direction: column;
}

.dp-title {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
}

.dp-sub {
    color: var(--color-main-text);
    font-size: 13px;
    margin: 2px 0 14px;
}

.dp-note {
    border-radius: var(--border-radius);
    padding: 12px 14px;
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    gap: 9px;
}

.dp-note.holiday {
    background: var(--color-background-hover);
    color: var(--wt-holiday);
}

.dp-note.vacation {
    background: var(--color-background-hover);
    color: var(--wt-vacation);
}

.dp-note.sick {
    background: var(--color-background-hover);
    color: var(--wt-sick);
}

.dp-note.other {
    background: var(--color-background-hover);
    color: var(--color-primary-element);
}

.dp-open-abs {
    margin: -4px 0 12px;
}

.dp-entries {
    list-style: none;
    padding: 0;
    margin: 0 0 12px;
}

.dp-entry {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding: 10px 0;
    border-bottom: 1px solid var(--color-border-light, var(--color-border));
}

.dp-entry:first-child {
    border-top: 1px solid var(--color-border-light, var(--color-border));
}

.dp-entry-main {
    flex: 1;
    min-width: 0;
}

.dp-entry-time {
    font-weight: 600;
    font-size: 14px;
    font-variant-numeric: tabular-nums;
}

.dp-entry-meta {
    color: var(--color-main-text);
    font-size: 13px;
    margin-top: 2px;
}

.dp-dot-sep {
    margin: 0 4px;
}

.dp-entry-desc {
    font-size: 12.5px;
    margin-top: 3px;
    color: var(--color-main-text);
}

.dp-entry-actions {
    display: flex;
    gap: 2px;
    flex-shrink: 0;
}

.dp-empty {
    color: var(--color-text-maxcontrast);
    font-style: italic;
    font-size: 13px;
    margin: 0 0 12px;
}

.dp-form {
    margin-top: 4px;
}

.dp-locked {
    display: flex;
    align-items: center;
    gap: 8px;
    background: var(--color-background-hover);
    border-radius: var(--border-radius);
    padding: 10px 12px;
    font-size: 13px;
    color: var(--color-text-maxcontrast);
}
</style>
