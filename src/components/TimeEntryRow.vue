<template>
    <tr :class="rowClasses">
        <!-- View Mode -->
        <template v-if="mode === 'view'">
            <td>{{ formatDate(entry.date) }}</td>
            <td>{{ entry.startTime }}</td>
            <td>{{ entry.endTime }}</td>
            <td>{{ entry.breakMinutes }} min</td>
            <td>{{ formatMinutes(entry.workMinutes) }}</td>
            <td>{{ getProjectName(entry.projectId) }}</td>
            <td>
                <span class="status-badge" :class="entry.status">
                    {{ getStatusLabel(entry.status) }}
                </span>
            </td>
            <td v-if="!readonly" class="actions">
                <NcButton type="tertiary"
                    v-if="canEdit"
                    :aria-label="t('worktime', 'Bearbeiten')"
                    @click="$emit('edit')">
                    <template #icon>
                        <PencilIcon :size="20" />
                    </template>
                </NcButton>
                <NcButton type="tertiary"
                    v-if="canDelete"
                    :aria-label="t('worktime', 'Löschen')"
                    @click="$emit('delete', entry)">
                    <template #icon>
                        <DeleteIcon :size="20" />
                    </template>
                </NcButton>
            </td>
        </template>

        <!-- Edit/Create Mode -->
        <template v-else>
            <td>
                <NcDateTimePicker
                    v-model="form.date"
                    type="date"
                    :format="'DD.MM.YYYY'"
                    class="inline-picker" />
            </td>
            <td>
                <input
                    ref="startTimeInput"
                    v-model="form.startTime"
                    type="time"
                    class="inline-input time-input"
                    :class="{ invalid: !isStartTimeValid }"
                    @change="onTimeChange"
                    @keydown="onKeydown">
            </td>
            <td>
                <input
                    v-model="form.endTime"
                    type="time"
                    class="inline-input time-input"
                    :class="{ invalid: !isEndTimeValid }"
                    @change="onTimeChange"
                    @keydown="onKeydown">
            </td>
            <td>
                <input
                    v-model.number="form.breakMinutes"
                    type="number"
                    min="0"
                    class="inline-input break-input"
                    :class="{ invalid: !isBreakValid }"
                    @keydown="onKeydown">
                <span v-if="breakHint" class="break-hint">{{ breakHint }}</span>
            </td>
            <td class="work-minutes-cell">
                {{ calculatedWorkMinutes > 0 ? formatMinutes(calculatedWorkMinutes) : '-' }}
            </td>
            <td>
                <NcSelect
                    v-model="selectedProject"
                    :options="projectOptions"
                    :placeholder="t('worktime', 'Projekt')"
                    :clearable="true"
                    class="inline-select" />
            </td>
            <td>
                <input
                    v-model="form.description"
                    type="text"
                    class="inline-input description-input"
                    :placeholder="t('worktime', 'Beschreibung')"
                    @keydown="onKeydown">
            </td>
            <td class="actions">
                <NcButton type="primary"
                    :disabled="!isValid"
                    :aria-label="t('worktime', 'Speichern')"
                    @click="save">
                    <template #icon>
                        <ContentSaveIcon :size="20" />
                    </template>
                </NcButton>
                <NcButton type="tertiary"
                    :aria-label="t('worktime', 'Abbrechen')"
                    @click="$emit('cancel')">
                    <template #icon>
                        <CloseIcon :size="20" />
                    </template>
                </NcButton>
            </td>
        </template>
    </tr>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcDateTimePicker from '@nextcloud/vue/dist/Components/NcDateTimePicker.js'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import { formatDateWithWeekday, formatDateISO, isWeekend } from '../utils/dateUtils.js'
import { formatMinutesWithUnit, calculateWorkMinutes, suggestBreak } from '../utils/timeUtils.js'

export default {
    name: 'TimeEntryRow',
    components: {
        NcButton,
        NcSelect,
        NcDateTimePicker,
        PencilIcon,
        DeleteIcon,
        ContentSaveIcon,
        CloseIcon,
    },
    props: {
        entry: {
            type: Object,
            default: null,
        },
        mode: {
            type: String,
            default: 'view',
            validator: (value) => ['view', 'edit', 'create'].includes(value),
        },
        projects: {
            type: Array,
            default: () => [],
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        isHoliday: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['edit', 'save', 'cancel', 'delete'],
    data() {
        return {
            form: {
                date: new Date(),
                startTime: '08:00',
                endTime: '17:00',
                breakMinutes: 30,
                projectId: null,
                description: '',
            },
        }
    },
    computed: {
        rowClasses() {
            return {
                'editing': this.mode !== 'view',
                'creating': this.mode === 'create',
                'weekend': this.entry && isWeekend(this.entry.date),
                'holiday': this.isHoliday,
            }
        },
        projectOptions() {
            return this.projects.map(p => ({
                id: p.id,
                label: p.displayName || p.name,
            }))
        },
        selectedProject: {
            get() {
                return this.projectOptions.find(p => p.id === this.form.projectId) || null
            },
            set(value) {
                this.form.projectId = value?.id || null
            },
        },
        calculatedWorkMinutes() {
            if (!this.form.startTime || !this.form.endTime) return 0
            return calculateWorkMinutes(this.form.startTime, this.form.endTime, this.form.breakMinutes)
        },
        requiredBreak() {
            if (!this.form.startTime || !this.form.endTime) return 0
            const grossMinutes = calculateWorkMinutes(this.form.startTime, this.form.endTime, 0)
            return suggestBreak(grossMinutes)
        },
        breakHint() {
            if (this.requiredBreak > 0 && this.form.breakMinutes < this.requiredBreak) {
                return this.t('worktime', 'Min: {min}', { min: this.requiredBreak })
            }
            return null
        },
        isStartTimeValid() {
            return !!this.form.startTime
        },
        isEndTimeValid() {
            if (!this.form.endTime) return false
            if (!this.form.startTime) return true
            return this.form.endTime > this.form.startTime
        },
        isBreakValid() {
            return this.form.breakMinutes >= 0 && this.form.breakMinutes >= this.requiredBreak
        },
        isValid() {
            return this.form.date &&
                this.isStartTimeValid &&
                this.isEndTimeValid &&
                this.isBreakValid &&
                this.calculatedWorkMinutes > 0
        },
        canEdit() {
            return this.entry && (this.entry.status === 'draft' || this.entry.status === 'rejected')
        },
        canDelete() {
            return this.entry && this.entry.status !== 'approved'
        },
    },
    watch: {
        entry: {
            immediate: true,
            handler(entry) {
                if (entry && this.mode === 'edit') {
                    this.loadEntry(entry)
                }
            },
        },
        mode: {
            immediate: true,
            handler(mode) {
                if (mode === 'edit' && this.entry) {
                    this.loadEntry(this.entry)
                } else if (mode === 'create') {
                    this.resetForm()
                    this.$nextTick(() => {
                        this.$refs.startTimeInput?.focus()
                    })
                }
            },
        },
    },
    methods: {
        formatDate(date) {
            return formatDateWithWeekday(date)
        },
        formatMinutes(minutes) {
            return formatMinutesWithUnit(minutes)
        },
        getProjectName(projectId) {
            if (!projectId) return '-'
            const project = this.projects.find(p => p.id === projectId)
            return project?.name || project?.displayName || '-'
        },
        getStatusLabel(status) {
            const labels = {
                draft: this.t('worktime', 'Entwurf'),
                submitted: this.t('worktime', 'Eingereicht'),
                approved: this.t('worktime', 'Genehmigt'),
                rejected: this.t('worktime', 'Abgelehnt'),
            }
            return labels[status] || status
        },
        loadEntry(entry) {
            this.form = {
                date: new Date(entry.date),
                startTime: entry.startTime,
                endTime: entry.endTime,
                breakMinutes: entry.breakMinutes,
                projectId: entry.projectId,
                description: entry.description || '',
            }
        },
        resetForm() {
            this.form = {
                date: new Date(),
                startTime: '08:00',
                endTime: '17:00',
                breakMinutes: 30,
                projectId: null,
                description: '',
            }
        },
        onTimeChange() {
            if (this.form.startTime && this.form.endTime) {
                const grossMinutes = calculateWorkMinutes(this.form.startTime, this.form.endTime, 0)
                const suggested = suggestBreak(grossMinutes)
                if (this.form.breakMinutes < suggested) {
                    this.form.breakMinutes = suggested
                }
            }
        },
        onKeydown(event) {
            if (event.key === 'Enter' && this.isValid) {
                event.preventDefault()
                this.save()
            } else if (event.key === 'Escape') {
                event.preventDefault()
                this.$emit('cancel')
            }
        },
        save() {
            if (!this.isValid) return

            const data = {
                date: formatDateISO(this.form.date),
                startTime: this.form.startTime,
                endTime: this.form.endTime,
                breakMinutes: this.form.breakMinutes,
                projectId: this.form.projectId,
                description: this.form.description || null,
            }

            this.$emit('save', {
                id: this.entry?.id,
                data,
                isCreate: this.mode === 'create',
            })
        },
    },
}
</script>

<style scoped>
tr.editing {
    background: var(--color-primary-element-light) !important;
}

tr.creating {
    background: var(--color-background-hover) !important;
}

tr.weekend {
    background: var(--color-background-hover);
}

tr.holiday {
    background: var(--color-primary-element-light);
}

.inline-input {
    width: 100%;
    padding: 6px 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-main-background);
}

.inline-input.invalid {
    border-color: var(--color-error);
}

.time-input {
    width: 90px;
}

.break-input {
    width: 70px;
}

.description-input {
    min-width: 150px;
}

.inline-picker {
    width: 120px;
}

.inline-select {
    min-width: 120px;
}

.work-minutes-cell {
    font-weight: 500;
}

.break-hint {
    display: block;
    font-size: 0.75em;
    color: var(--color-warning);
    margin-top: 2px;
}

.actions {
    display: flex;
    justify-content: center;
    gap: 4px;
    white-space: nowrap;
}

.status-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.85em;
}

.status-badge.draft {
    background: var(--color-background-dark);
    color: var(--color-text-maxcontrast);
}

.status-badge.submitted {
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
</style>
