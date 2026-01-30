<template>
    <div class="time-entry-form">
        <h3>{{ isEdit ? t('worktime', 'Eintrag bearbeiten') : t('worktime', 'Neuer Eintrag') }}</h3>

        <div class="form-group">
            <label for="date">{{ t('worktime', 'Datum') }}</label>
            <NcDateTimePicker id="date"
                v-model="form.date"
                type="date"
                :format="'DD.MM.YYYY'" />
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="startTime">{{ t('worktime', 'Beginn') }}</label>
                <input id="startTime"
                    v-model="form.startTime"
                    type="time"
                    class="time-input"
                    @change="onTimeChange">
            </div>

            <div class="form-group">
                <label for="endTime">{{ t('worktime', 'Ende') }}</label>
                <input id="endTime"
                    v-model="form.endTime"
                    type="time"
                    class="time-input"
                    @change="onTimeChange">
            </div>
        </div>

        <div class="form-group">
            <label for="breakMinutes">{{ t('worktime', 'Pause (Minuten)') }}</label>
            <input id="breakMinutes"
                v-model.number="form.breakMinutes"
                type="number"
                min="0"
                class="break-input">
            <p v-if="requiredBreak > 0" class="break-hint">
                {{ t('worktime', 'Mindestpause: {minutes} min (§4 ArbZG)', { minutes: requiredBreak }) }}
            </p>
        </div>

        <div class="form-group">
            <label for="project">{{ t('worktime', 'Projekt') }}</label>
            <NcSelect id="project"
                v-model="selectedProject"
                :options="projectOptions"
                :placeholder="t('worktime', 'Projekt auswählen')"
                :clearable="true" />
        </div>

        <div class="form-group">
            <label for="description">{{ t('worktime', 'Beschreibung') }}</label>
            <textarea id="description"
                v-model="form.description"
                class="description-input"
                rows="2" />
        </div>

        <div class="form-info" v-if="calculatedWorkMinutes > 0">
            {{ t('worktime', 'Arbeitszeit: {hours}', { hours: formatMinutes(calculatedWorkMinutes) }) }}
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
import { formatDateISO, getToday } from '../utils/dateUtils.js'
import { formatMinutesWithUnit, calculateWorkMinutes, suggestBreak as suggestBreakUtil } from '../utils/timeUtils.js'
import { showErrorMessage } from '../utils/errorHandler.js'

export default {
    name: 'TimeEntryForm',
    components: {
        NcButton,
        NcSelect,
        NcDateTimePicker,
    },
    props: {
        entry: {
            type: Object,
            default: null,
        },
    },
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
        ...mapGetters('projects', ['activeProjects']),
        requiredBreak() {
            if (!this.form.startTime || !this.form.endTime) return 0
            const grossMinutes = calculateWorkMinutes(this.form.startTime, this.form.endTime, 0)
            return suggestBreakUtil(grossMinutes)
        },
        isEdit() {
            return !!this.entry
        },
        projectOptions() {
            return this.activeProjects.map(p => ({
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
        isValid() {
            return this.form.date && this.form.startTime && this.form.endTime && this.calculatedWorkMinutes > 0
        },
    },
    watch: {
        entry: {
            immediate: true,
            handler(entry) {
                if (entry) {
                    this.form = {
                        date: new Date(entry.date),
                        startTime: entry.startTime,
                        endTime: entry.endTime,
                        breakMinutes: entry.breakMinutes,
                        projectId: entry.projectId,
                        description: entry.description || '',
                    }
                } else {
                    this.resetForm()
                }
            },
        },
    },
    created() {
        this.$store.dispatch('projects/fetchProjects')
    },
    methods: {
        ...mapActions('timeEntries', ['createTimeEntry', 'updateTimeEntry']),
        formatMinutes(minutes) {
            return formatMinutesWithUnit(minutes)
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
            // Automatisch die gesetzlich vorgeschriebene Pause eintragen
            if (this.form.startTime && this.form.endTime) {
                const grossMinutes = calculateWorkMinutes(this.form.startTime, this.form.endTime, 0)
                this.form.breakMinutes = suggestBreakUtil(grossMinutes)
            }
        },
        cancel() {
            this.$emit('cancel')
        },
        async save() {
            try {
                const data = {
                    date: formatDateISO(this.form.date),
                    startTime: this.form.startTime,
                    endTime: this.form.endTime,
                    breakMinutes: this.form.breakMinutes,
                    projectId: this.form.projectId,
                    description: this.form.description || null,
                }

                if (this.isEdit) {
                    await this.updateTimeEntry({ id: this.entry.id, data })
                } else {
                    await this.createTimeEntry(data)
                }

                this.$emit('saved')
            } catch (error) {
                console.error('Failed to save time entry:', error)
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Speichern'))
            }
        },
    },
}
</script>

<style scoped>
.time-entry-form {
    padding: 16px;
}

.time-entry-form h3 {
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

.time-input,
.break-input,
.description-input {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
}

.break-input {
    width: 100px;
}

.break-hint {
    margin-top: 4px;
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.form-info {
    margin: 16px 0;
    padding: 8px 12px;
    background: var(--color-background-dark);
    border-radius: var(--border-radius);
    font-weight: 500;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
}
</style>
