<template>
    <tr :class="rowClasses">
        <!-- View Mode -->
        <template v-if="mode === 'view'">
            <td>{{ formatDateRange }}</td>
            <td class="type-cell">
                <span class="type-dot" :class="'type-' + absence.type"></span>
                {{ translatedTypeName }}
            </td>
            <td>{{ absence.days }}</td>
            <td class="note-cell"><span class="note-text">{{ absence.note || '-' }}</span></td>
            <td>
                <span class="status-badge" :class="absence.status">
                    {{ getStatusLabel(absence.status) }}
                </span>
            </td>
            <td v-if="!readonly" class="actions">
                <div v-if="canEdit || canRemove" class="actions-buttons">
                    <NcButton v-if="canEdit"
                        type="tertiary"
                        :aria-label="t('worktime', 'Bearbeiten')"
                        @click="$emit('edit')">
                        <template #icon>
                            <PencilIcon :size="20" />
                        </template>
                    </NcButton>
                    <NcButton v-if="canRemove"
                        type="tertiary"
                        :aria-label="removeLabel"
                        @click="$emit('remove', absence)">
                        <template #icon>
                            <CloseIcon :size="20" />
                        </template>
                    </NcButton>
                </div>
            </td>
        </template>

        <!-- Edit/Create Mode -->
        <!-- Eine einzige, volle Breite spannende Zelle: die Steuerelemente brechen
             per flex-wrap um (kein horizontaler Überlauf über die Card hinaus, #361),
             der lange Hinweistext steht darunter über die volle Breite statt rechts
             abgeschnitten daneben. -->
        <template v-else>
            <td colspan="6" class="edit-cell">
                <div class="edit-form">
                    <div class="edit-fields">
                        <div class="field date-cells">
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
                                    :disabled="form.scope < 1.0"
                                    @input="onEndDateChange" />
                            </div>
                        </div>
                        <div class="field">
                            <NcSelect
                                v-model="selectedType"
                                :options="typeOptions"
                                :clearable="false"
                                class="inline-select type-select" />
                        </div>
                        <div class="field days-cell">
                            <div class="scope-row">
                                <NcSelect
                                    v-model="selectedScope"
                                    :options="scopeOptions"
                                    :clearable="false"
                                    class="scope-select" />
                                <span class="days-value">{{ calculatedDays }} {{ t('worktime', 'Tage') }}</span>
                            </div>
                        </div>
                        <div class="field note-field">
                            <input
                                v-model="form.note"
                                type="text"
                                class="inline-input note-input"
                                :placeholder="t('worktime', 'Bemerkung')"
                                @keydown="onKeydown">
                        </div>
                        <div class="field actions">
                            <div class="actions-buttons">
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
                            </div>
                        </div>
                    </div>
                    <p v-if="showQuotaHint" class="quota-hint">
                        {{ t('worktime', 'Hinweis: ca. {requested} Werktage im Zeitraum (Resturlaub: {available}). Abgezogen werden nur Arbeitstage laut Arbeitszeitmodell.', { available: quotaAvailable.toFixed(1), requested: estimatedDays.toFixed(1) }) }}
                    </p>
                    <p v-else-if="absence && absence.status === 'approved' && absence.type !== 'sick' && absence.type !== 'child_sick'" class="edit-hint">
                        {{ t('worktime', 'Erneute Genehmigung erforderlich') }}
                    </p>
                </div>
            </td>
        </template>
    </tr>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcDateTimePicker from '@nextcloud/vue/dist/Components/NcDateTimePicker.js'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'
import { formatDateISO, getLocale } from '../utils/dateUtils.js'
import { formatDateWithWeekday, getAbsenceTypeLabel, getStatusLabel } from '../utils/formatters.js'

export default {
    name: 'AbsenceRow',
    components: {
        NcButton,
        NcSelect,
        NcDateTimePicker,
        PencilIcon,
        CloseIcon,
        ContentSaveIcon,
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
        vacationStats: {
            type: Object,
            default: null,
        },
    },
    emits: ['edit', 'save', 'cancel', 'remove'],
    data() {
        return {
            form: {
                type: 'vacation',
                startDate: new Date(),
                endDate: new Date(),
                note: '',
                scope: 1.0,
            },
            // Tracks whether the user deliberately picked an end date. While false,
            // the end date follows the start date (single day is the default outcome).
            endTouched: false,
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
        translatedTypeName() {
            if (!this.absence) return ''
            return getAbsenceTypeLabel(this.absence.type)
        },
        formatDateRange() {
            if (!this.absence) return ''
            const start = formatDateWithWeekday(this.absence.startDate)
            const end = formatDateWithWeekday(this.absence.endDate)
            return start === end ? start : `${start} - ${end}`
        },
        typeOptions() {
            // Betriebsschließung ist nicht beantragbar — entsteht nur zentral (#15 Stufe 2).
            return Object.entries(this.absenceTypes)
                .filter(([value]) => value !== 'company_closure')
                .map(([value, label]) => ({
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
            return effectiveDays.toLocaleString(getLocale(), { maximumFractionDigits: 1 })
        },
        estimatedDays() {
            if (!this.form.startDate || !this.form.endDate) return 0
            if (this.form.scope < 1.0) return 0.5
            let days = 0
            const cur = new Date(this.form.startDate)
            const end = new Date(this.form.endDate)
            while (cur <= end) {
                const dow = cur.getDay()
                if (dow !== 0 && dow !== 6) days++
                cur.setDate(cur.getDate() + 1)
            }
            return days * this.form.scope
        },
        quotaAvailable() {
            if (!this.vacationStats) return Infinity
            let available = this.vacationStats.remaining
            if (this.mode === 'edit' && this.absence?.type === 'vacation') {
                available += parseFloat(this.absence.days || 0)
            }
            return available
        },
        showQuotaHint() {
            if (this.form.type !== 'vacation') return false
            if (!this.vacationStats) return false
            return this.estimatedDays > this.quotaAvailable
        },
        isValid() {
            if (!this.form.type || !this.form.startDate || !this.form.endDate) return false
            const start = new Date(this.form.startDate)
            const end = new Date(this.form.endDate)
            // The frontend day estimate ignores the work schedule and holidays, so
            // it must not block submission (a part-timer's whole-week request would
            // be wrongly rejected). The backend validates schedule-aware.
            return start <= end
        },
        canEdit() {
            // Auch genehmigte Abwesenheiten können bearbeitet werden
            // (Backend validiert welche Tage geändert werden dürfen)
            return this.absence && this.absence.status !== 'cancelled'
        },
        canRemove() {
            // Ein einziger "Weg damit"-Button: alle aktiven Abwesenheiten
            // (Backend entscheidet intern, ob echtes Delete oder Cancel mit Audit-Trail)
            return this.absence && this.absence.status !== 'cancelled'
        },
        removeLabel() {
            if (!this.absence) return this.t('worktime', 'Entfernen')
            if (this.absence.status === 'approved'
                && this.absence.type !== 'sick' && this.absence.type !== 'child_sick') {
                return this.t('worktime', 'Stornieren')
            }
            return this.t('worktime', 'Löschen')
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
        getStatusLabel,
        loadAbsence(absence) {
            this.form = {
                type: absence.type,
                startDate: new Date(absence.startDate),
                endDate: new Date(absence.endDate),
                note: absence.note || '',
                scope: absence.scope ?? 1.0,
            }
            // Existing absence already has an explicit end date -> don't auto-clobber it.
            this.endTouched = true
        },
        resetForm() {
            this.form = {
                type: 'vacation',
                startDate: new Date(),
                endDate: new Date(),
                note: '',
                scope: 1.0,
            }
            // Fresh form: end date follows the start until the user picks one.
            this.endTouched = false
        },
        onStartDateChange() {
            // Half day (scope < 1) must always be a single day.
            if (this.form.scope < 1.0) {
                this.form.endDate = new Date(this.form.startDate)
                return
            }
            // Full day: the end date follows the start until the user sets it
            // explicitly, or whenever the start moves past the current end. This
            // prevents the phantom range that occurred when the end stayed on the
            // form default ("today") while the start was moved to an earlier day.
            if (!this.endTouched || this.form.endDate < this.form.startDate) {
                this.form.endDate = new Date(this.form.startDate)
            }
        },
        onEndDateChange() {
            // User deliberately picked an end date -> stop auto-following the start.
            this.endTouched = true
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
    /* Alle Zelltexte oben ausrichten — bei hohen Zeilen (lange Bemerkung) bleibt
       so alles bündig oben statt vertikal zentriert. */
    vertical-align: top;
}

tr.editing {
    background: var(--color-primary-element-light) !important;
}

tr.creating {
    background: var(--color-background-hover) !important;
}

/* Edit-/Create-Zeile: eine volle Breite spannende Zelle (#361). Steuerelemente
   brechen um, der Hinweis steht darunter über die volle Breite. */
.edit-cell {
    padding: 12px;
}

.edit-form {
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.edit-fields {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 12px;
}

.edit-fields .field {
    min-width: 0;
}

/* Speichern/Abbrechen ans Ende der Steuerleiste schieben (wie zuvor rechts). */
.edit-fields .actions {
    margin-left: auto;
}

/* Bemerkungsfeld füllt den verbleibenden Platz, weicht aber auf schmaler
   Breite in die nächste Zeile aus (kein Überlauf). */
.edit-fields .note-field {
    flex: 1 1 14rem;
}

.edit-fields .note-field .note-input {
    width: 100%;
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

/* Bemerkung (Anzeige): kappt die Spaltenbreite und bricht lange Texte um,
   damit die Tabelle nicht über die Kachel hinauswächst (#275). */
.note-cell .note-text {
    display: inline-block;
    max-width: 22rem;
    white-space: normal;
    overflow-wrap: anywhere;
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
    text-align: center;
}

.actions-buttons {
    display: inline-flex;
    justify-content: center;
    gap: 4px;
    white-space: nowrap;
}

/* Aktions-Icons nur bei Hover/Fokus zeigen — aber nur auf Geräten mit Hover.
   Touch/Mobile (kein Hover) zeigt sie weiterhin dauerhaft (Accessibility). */
@media (hover: hover) {
    .actions-buttons {
        opacity: 0;
        transition: opacity 0.1s;
    }

    tr:hover .actions-buttons,
    tr:focus-within .actions-buttons {
        opacity: 1;
    }

    /* Im aktiven Bearbeiten-/Anlegen-Modus muessen Speichern/Abbrechen
       dauerhaft sichtbar sein, nicht erst bei Hover. */
    tr.editing .actions-buttons {
        opacity: 1;
    }
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

/* Hinweise unter der Edit-Zeile: volle Breite, vollständig umgebrochen (#361). */
.edit-hint {
    margin: 0;
    font-size: 0.85em;
    color: var(--color-main-text);
    font-style: italic;
}

.quota-hint {
    margin: 0;
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
    font-weight: 500;
    overflow-wrap: anywhere;
}

/* KEIN display:flex auf dem <td>: eine Flex-Zelle ist nur so hoch wie ihr Text,
   wodurch der border-bottom in hohen Zeilen mittig zeichnet (Linie unter
   "Krankheit"). Normale Tabellenzelle + Dot inline. */
.type-cell {
    overflow-wrap: anywhere;
}

.type-dot {
    display: inline-block;
    width: 10px;
    height: 10px;
    min-width: 10px;
    border-radius: 50%;
    margin-right: 8px;
    vertical-align: middle;
}

.type-dot.type-vacation { background-color: #0082c9; }
.type-dot.type-sick { background-color: #e74c3c; }
.type-dot.type-child_sick { background-color: #f39c12; }
.type-dot.type-special { background-color: #9b59b6; }
.type-dot.type-training { background-color: #2ecc71; }
.type-dot.type-unpaid { background-color: #34495e; }
.type-dot.type-compensatory { background-color: #1abc9c; }
.type-dot.type-company_closure { background-color: #4a7dbd; }

</style>

