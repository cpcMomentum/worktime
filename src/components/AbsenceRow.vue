<template>
    <tr :class="rowClasses">
        <!-- View Mode -->
        <template v-if="mode === 'view'">
            <td>{{ formatDateRange }}</td>
            <td>{{ absence.typeName }}</td>
            <td>{{ absence.days }}</td>
            <td>{{ absence.note || '-' }}</td>
            <td>
                <span class="status-badge" :class="absence.status">
                    {{ getStatusLabel(absence.status) }}
                </span>
            </td>
            <td v-if="!readonly" class="actions">
                <NcButton v-if="canEdit"
                    type="tertiary"
                    :aria-label="t('worktime', 'Bearbeiten')"
                    @click="$emit('edit')">
                    <template #icon>
                        <PencilIcon :size="20" />
                    </template>
                </NcButton>
                <NcButton v-if="canCancel"
                    type="tertiary"
                    :aria-label="t('worktime', 'Stornieren')"
                    @click="$emit('cancel-absence', absence)">
                    <template #icon>
                        <CancelIcon :size="20" />
                    </template>
                </NcButton>
                <NcButton v-if="canDelete"
                    type="tertiary"
                    :aria-label="t('worktime', 'Löschen')"
                    @click="$emit('delete', absence)">
                    <template #icon>
                        <DeleteIcon :size="20" />
                    </template>
                </NcButton>
            </td>
        </template>

        <!-- Edit/Create Mode -->
        <template v-else>
            <td class="date-cells">
                <div class="date-row">
                    <NcDateTimePicker
                        v-model="form.startDate"
                        type="date"
                        :format="'DD.MM.YYYY'"
                        class="inline-picker"
                        @input="onStartDateChange" />
                    <span class="date-separator">-</span>
                    <NcDateTimePicker
                        v-model="form.endDate"
                        type="date"
                        :format="'DD.MM.YYYY'"
                        class="inline-picker"
                        :disabled="form.scope < 1.0" />
                </div>
            </td>
            <td>
                <NcSelect
                    v-model="selectedType"
                    :options="typeOptions"
                    :clearable="false"
                    class="inline-select type-select" />
            </td>
            <td class="days-cell">
                <div class="scope-row">
                    <NcSelect
                        v-model="selectedScope"
                        :options="scopeOptions"
                        :clearable="false"
                        class="scope-select" />
                    <span class="days-value">{{ calculatedDays }}</span>
                </div>
            </td>
            <td>
                <input
                    v-model="form.note"
                    type="text"
                    class="inline-input note-input"
                    :placeholder="t('worktime', 'Bemerkung')"
                    @keydown="onKeydown">
            </td>
            <td>
                <!-- Placeholder for status column in edit mode -->
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
import CancelIcon from 'vue-material-design-icons/Cancel.vue'
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import { formatDateISO } from '../utils/dateUtils.js'
import { formatDateWithWeekday } from '../utils/formatters.js'

export default {
    name: 'AbsenceRow',
    components: {
        NcButton,
        NcSelect,
        NcDateTimePicker,
        PencilIcon,
        DeleteIcon,
        CancelIcon,
        ContentSaveIcon,
        CloseIcon,
    },
    props: {
        absence: {
            type: Object,
            default: null,
        },
        mode: {
            type: String,
            default: 'view',
            validator: (value) => ['view', 'edit', 'create'].includes(value),
        },
        absenceTypes: {
            type: Object,
            default: () => ({}),
        },
        readonly: {
            type: Boolean,
            default: false,
        },
    },
    emits: ['edit', 'save', 'cancel', 'delete', 'cancel-absence'],
    data() {
        return {
            form: {
                type: 'vacation',
                startDate: new Date(),
                endDate: new Date(),
                note: '',
                scope: 1.0,
            },
            scopeOptions: [
                { id: 1.0, label: this.t('worktime', 'Ganzer Tag') },
                { id: 0.5, label: this.t('worktime', 'Halber Tag') },
            ],
        }
    },
    computed: {
        rowClasses() {
            return {
                'editing': this.mode !== 'view',
                'creating': this.mode === 'create',
            }
        },
        formatDateRange() {
            if (!this.absence) return ''
            const start = formatDateWithWeekday(this.absence.startDate)
            const end = formatDateWithWeekday(this.absence.endDate)
            return start === end ? start : `${start} - ${end}`
        },
        typeOptions() {
            return Object.entries(this.absenceTypes).map(([value, label]) => ({
                id: value,
                label,
            }))
        },
        selectedType: {
            get() {
                return this.typeOptions.find(t => t.id === this.form.type) || this.typeOptions[0]
            },
            set(value) {
                this.form.type = value?.id || 'vacation'
            },
        },
        selectedScope: {
            get() {
                return this.scopeOptions.find(s => s.id === this.form.scope) || this.scopeOptions[0]
            },
            set(value) {
                const newScope = value?.id ?? 1.0
                this.form.scope = newScope
                // Half day (scope < 1) must be single day
                if (newScope < 1.0) {
                    this.form.endDate = new Date(this.form.startDate)
                }
            },
        },
        calculatedDays() {
            if (!this.form.startDate || !this.form.endDate) return '-'

            const start = new Date(this.form.startDate)
            const end = new Date(this.form.endDate)
            let workingDays = 0

            for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                const dayOfWeek = d.getDay()
                if (dayOfWeek !== 0 && dayOfWeek !== 6) {
                    workingDays++
                }
            }

            // Apply scope: e.g., 5 days * 0.5 = 2.5
            const effectiveDays = workingDays * this.form.scope
            return effectiveDays.toLocaleString('de-DE', { maximumFractionDigits: 1 })
        },
        isValid() {
            if (!this.form.type || !this.form.startDate || !this.form.endDate) return false
            const start = new Date(this.form.startDate)
            const end = new Date(this.form.endDate)
            return start <= end
        },
        canEdit() {
            return this.absence && (this.absence.status === 'pending' || this.absence.status === 'rejected')
        },
        canCancel() {
            return this.absence && this.absence.status === 'approved'
        },
        canDelete() {
            return this.absence && (this.absence.status === 'pending' || this.absence.status === 'rejected')
        },
    },
    watch: {
        absence: {
            immediate: true,
            handler(absence) {
                if (absence && this.mode === 'edit') {
                    this.loadAbsence(absence)
                }
            },
        },
        mode: {
            immediate: true,
            handler(mode) {
                if (mode === 'edit' && this.absence) {
                    this.loadAbsence(this.absence)
                } else if (mode === 'create') {
                    this.resetForm()
                }
            },
        },
    },
    methods: {
        getStatusLabel(status) {
            const labels = {
                pending: this.t('worktime', 'Ausstehend'),
                approved: this.t('worktime', 'Genehmigt'),
                rejected: this.t('worktime', 'Abgelehnt'),
                cancelled: this.t('worktime', 'Storniert'),
            }
            return labels[status] || status
        },
        loadAbsence(absence) {
            this.form = {
                type: absence.type,
                startDate: new Date(absence.startDate),
                endDate: new Date(absence.endDate),
                note: absence.note || '',
                scope: absence.scope ?? 1.0,
            }
        },
        resetForm() {
            this.form = {
                type: 'vacation',
                startDate: new Date(),
                endDate: new Date(),
                note: '',
                scope: 1.0,
            }
        },
        onStartDateChange() {
            // Half day (scope < 1) must be single day
            if (this.form.scope < 1.0) {
                this.form.endDate = new Date(this.form.startDate)
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
                type: this.form.type,
                startDate: formatDateISO(this.form.startDate),
                endDate: formatDateISO(this.form.endDate),
                note: this.form.note || null,
                scope: this.form.scope,
            }

            this.$emit('save', {
                id: this.absence?.id,
                data,
                isCreate: this.mode === 'create',
            })
        },
    },
}
</script>

<style scoped>
tr {
    border-bottom: 1px solid var(--color-border);
}

tr td {
    padding: 14px 12px;
    font-size: 16px;
    border-bottom: 1px solid var(--color-border);
}

tr.editing {
    background: var(--color-primary-element-light) !important;
}

tr.creating {
    background: var(--color-background-hover) !important;
}

.date-cells {
    min-width: 16rem;
}

.date-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.date-separator {
    color: var(--color-text-maxcontrast);
}

.inline-input {
    width: 100%;
    padding: 0.375rem 0.5rem;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-main-background);
}

.note-input {
    min-width: 10rem;
}

.inline-picker {
    width: 8rem;
}

.inline-select {
    min-width: 8rem;
}

.type-select {
    min-width: 6.5rem;
}

.days-cell {
    min-width: 11rem;
}

.scope-row {
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.scope-select {
    min-width: 7rem;
}

.days-value {
    font-weight: 500;
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
</style>
