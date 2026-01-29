<template>
    <div class="absence-form">
        <h3>{{ isEdit ? t('worktime', 'Abwesenheit bearbeiten') : t('worktime', 'Neue Abwesenheit') }}</h3>

        <div class="form-group">
            <label for="type">{{ t('worktime', 'Art') }}</label>
            <NcSelect id="type"
                v-model="selectedType"
                :options="typeOptions"
                :placeholder="t('worktime', 'Art auswählen')"
                :clearable="false" />
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="startDate">{{ t('worktime', 'Von') }}</label>
                <NcDateTimePicker id="startDate"
                    v-model="form.startDate"
                    type="date"
                    :format="'DD.MM.YYYY'" />
            </div>

            <div class="form-group">
                <label for="endDate">{{ t('worktime', 'Bis') }}</label>
                <NcDateTimePicker id="endDate"
                    v-model="form.endDate"
                    type="date"
                    :format="'DD.MM.YYYY'" />
            </div>
        </div>

        <div class="form-group">
            <label for="note">{{ t('worktime', 'Bemerkung') }}</label>
            <textarea id="note"
                v-model="form.note"
                class="note-input"
                rows="2" />
        </div>

        <div class="form-actions">
            <NcButton type="tertiary" @click="cancel">
                {{ t('worktime', 'Abbrechen') }}
            </NcButton>
            <NcButton type="primary" :disabled="!isValid" @click="save">
                {{ t('worktime', 'Speichern') }}
            </NcButton>
        </div>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcDateTimePicker from '@nextcloud/vue/dist/Components/NcDateTimePicker.js'
import { mapGetters, mapActions } from 'vuex'
import { formatDateISO } from '../utils/dateUtils.js'

export default {
    name: 'AbsenceForm',
    components: {
        NcButton,
        NcSelect,
        NcDateTimePicker,
    },
    props: {
        absence: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            form: {
                type: 'vacation',
                startDate: new Date(),
                endDate: new Date(),
                note: '',
            },
        }
    },
    computed: {
        ...mapGetters('absences', ['absenceTypes']),
        isEdit() {
            return !!this.absence
        },
        typeOptions() {
            return Object.entries(this.absenceTypes).map(([value, label]) => ({
                id: value,
                label,
            }))
        },
        selectedType: {
            get() {
                return this.typeOptions.find(t => t.id === this.form.type) || null
            },
            set(value) {
                this.form.type = value?.id || 'vacation'
            },
        },
        isValid() {
            return this.form.type && this.form.startDate && this.form.endDate &&
                this.form.startDate <= this.form.endDate
        },
    },
    watch: {
        absence: {
            immediate: true,
            handler(absence) {
                if (absence) {
                    this.form = {
                        type: absence.type,
                        startDate: new Date(absence.startDate),
                        endDate: new Date(absence.endDate),
                        note: absence.note || '',
                    }
                } else {
                    this.resetForm()
                }
            },
        },
    },
    created() {
        this.$store.dispatch('absences/fetchAbsenceTypes')
    },
    methods: {
        ...mapActions('absences', ['createAbsence', 'updateAbsence']),
        resetForm() {
            this.form = {
                type: 'vacation',
                startDate: new Date(),
                endDate: new Date(),
                note: '',
            }
        },
        cancel() {
            this.$emit('cancel')
        },
        async save() {
            try {
                const data = {
                    type: this.form.type,
                    startDate: formatDateISO(this.form.startDate),
                    endDate: formatDateISO(this.form.endDate),
                    note: this.form.note || null,
                }

                if (this.isEdit) {
                    await this.updateAbsence({ id: this.absence.id, data })
                } else {
                    await this.createAbsence(data)
                }

                this.$emit('saved')
            } catch (error) {
                console.error('Failed to save absence:', error)
            }
        },
    },
}
</script>

<style scoped>
.absence-form {
    padding: 16px;
}

.absence-form h3 {
    margin: 0 0 16px 0;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
}

.form-row {
    display: flex;
    gap: 16px;
}

.form-row .form-group {
    flex: 1;
}

.note-input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
}
</style>

<style>
/* Unscoped: Fix DatePicker popup visibility in modal */
.modal-wrapper .modal-container {
    overflow: visible !important;
}

.modal-wrapper .modal-container__content {
    overflow: visible !important;
}
</style>
