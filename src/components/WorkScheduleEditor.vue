<template>
    <div class="work-schedule-editor">
        <h4>{{ t('worktime', 'Arbeitszeitprofile') }}</h4>

        <NcLoadingIcon v-if="loading" :size="28" />

        <div v-else>
            <table v-if="schedules.length > 0" class="schedules-table">
                <thead>
                    <tr>
                        <th>{{ t('worktime', 'Gültig ab') }}</th>
                        <th class="text-right">{{ t('worktime', 'Mo') }}</th>
                        <th class="text-right">{{ t('worktime', 'Di') }}</th>
                        <th class="text-right">{{ t('worktime', 'Mi') }}</th>
                        <th class="text-right">{{ t('worktime', 'Do') }}</th>
                        <th class="text-right">{{ t('worktime', 'Fr') }}</th>
                        <th class="text-right">{{ t('worktime', 'Sa') }}</th>
                        <th class="text-right">{{ t('worktime', 'So') }}</th>
                        <th class="text-right">{{ t('worktime', 'Woche') }}</th>
                        <th class="text-right">{{ t('worktime', 'Urlaub') }}</th>
                        <th class="actions-col">{{ t('worktime', 'Aktionen') }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="schedule in schedules" :key="schedule.id">
                        <td>{{ formatDate(schedule.validFrom) }}</td>
                        <td class="text-right">{{ schedule.monHours }}</td>
                        <td class="text-right">{{ schedule.tueHours }}</td>
                        <td class="text-right">{{ schedule.wedHours }}</td>
                        <td class="text-right">{{ schedule.thuHours }}</td>
                        <td class="text-right">{{ schedule.friHours }}</td>
                        <td class="text-right">{{ schedule.satHours }}</td>
                        <td class="text-right">{{ schedule.sunHours }}</td>
                        <td class="text-right"><strong>{{ schedule.weeklyHours }}</strong></td>
                        <td class="text-right">{{ schedule.vacationDays }}</td>
                        <td class="actions-col">
                            <NcButton type="tertiary"
                                :aria-label="t('worktime', 'Bearbeiten')"
                                @click="startEdit(schedule)">
                                <template #icon>
                                    <Pencil :size="20" />
                                </template>
                            </NcButton>
                            <NcButton v-if="schedules.length > 1"
                                type="tertiary"
                                :aria-label="t('worktime', 'Löschen')"
                                @click="confirmDelete(schedule)">
                                <template #icon>
                                    <Close :size="20" />
                                </template>
                            </NcButton>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div v-if="!showForm" class="add-button">
                <NcButton type="secondary" @click="startCreate">
                    <template #icon>
                        <Plus :size="20" />
                    </template>
                    {{ t('worktime', 'Neues Profil') }}
                </NcButton>
            </div>

            <div v-if="showForm" class="schedule-form">
                <h5>{{ editingSchedule ? t('worktime', 'Profil bearbeiten') : t('worktime', 'Neues Profil anlegen') }}</h5>

                <div v-if="!editingSchedule" class="form-group">
                    <label>{{ t('worktime', 'Gültig ab') }} *</label>
                    <NcDateTimePicker v-model="form.validFrom"
                        type="date"
                        :format="'DD.MM.YYYY'"
                        :disabled-date="disablePastDates" />
                </div>

                <div class="day-hours-row">
                    <div v-for="day in weekdays" :key="day.key" class="day-input">
                        <label>{{ day.label }}</label>
                        <input v-model.number="form.dayHours[day.key]"
                            type="number"
                            min="0"
                            :max="maxDailyHours"
                            step="0.5"
                            :class="['input-field', 'input-small', { 'input-error': form.dayHours[day.key] > maxDailyHours }]">
                    </div>
                </div>
                <p class="hint">{{ t('worktime', 'Max. {hours} Std./Tag', { hours: maxDailyHours }) }}</p>

                <div class="form-row">
                    <div class="form-group">
                        <label>{{ t('worktime', 'Wochenstunden (berechnet)') }}</label>
                        <input :value="calculatedWeeklyHours"
                            type="text"
                            class="input-field input-small"
                            disabled>
                    </div>
                    <div class="form-group">
                        <label>{{ t('worktime', 'Urlaubstage') }} *</label>
                        <input v-model.number="form.vacationDays"
                            type="number"
                            min="0"
                            max="60"
                            class="input-field input-small">
                    </div>
                </div>

                <div class="form-actions">
                    <NcButton type="tertiary" @click="cancelForm">
                        {{ t('worktime', 'Abbrechen') }}
                    </NcButton>
                    <NcButton type="primary" :disabled="!isFormValid" @click="saveForm">
                        {{ t('worktime', 'Speichern') }}
                    </NcButton>
                </div>
            </div>
        </div>

        <NcDialog v-if="showDeleteDialog"
            :name="t('worktime', 'Profil löschen?')"
            @close="showDeleteDialog = false">
            <p>{{ t('worktime', 'Möchten Sie dieses Arbeitszeitprofil wirklich löschen?') }}</p>
            <template #actions>
                <NcButton type="tertiary" @click="showDeleteDialog = false">
                    {{ t('worktime', 'Abbrechen') }}
                </NcButton>
                <NcButton type="error" @click="deleteConfirmed">
                    {{ t('worktime', 'Löschen') }}
                </NcButton>
            </template>
        </NcDialog>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcDateTimePicker from '@nextcloud/vue/dist/Components/NcDateTimePicker.js'
import NcDialog from '@nextcloud/vue/dist/Components/NcDialog.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import Close from 'vue-material-design-icons/Close.vue'
import Plus from 'vue-material-design-icons/Plus.vue'
import { mapGetters, mapActions } from 'vuex'
import { showError } from '@nextcloud/dialogs'
import { formatDateISO, getLocale } from '../utils/dateUtils.js'
import SettingsService from '../services/SettingsService.js'

export default {
    name: 'WorkScheduleEditor',
    components: {
        NcButton,
        NcDateTimePicker,
        NcDialog,
        NcLoadingIcon,
        Pencil,
        Close,
        Plus,
    },
    props: {
        employeeId: {
            type: Number,
            required: true,
        },
    },
    data() {
        return {
            showForm: false,
            editingSchedule: null,
            showDeleteDialog: false,
            scheduleToDelete: null,
            maxDailyHours: 10,
            form: this.getEmptyForm(),
            weekdays: [
                { key: 'mon', label: this.t('worktime', 'Mo') },
                { key: 'tue', label: this.t('worktime', 'Di') },
                { key: 'wed', label: this.t('worktime', 'Mi') },
                { key: 'thu', label: this.t('worktime', 'Do') },
                { key: 'fri', label: this.t('worktime', 'Fr') },
                { key: 'sat', label: this.t('worktime', 'Sa') },
                { key: 'sun', label: this.t('worktime', 'So') },
            ],
        }
    },
    computed: {
        ...mapGetters('workSchedules', ['schedules', 'loading']),
        calculatedWeeklyHours() {
            const h = this.form.dayHours
            return (h.mon + h.tue + h.wed + h.thu + h.fri + (h.sat || 0) + (h.sun || 0)).toFixed(1)
        },
        minValidFrom() {
            const d = new Date()
            d.setDate(1)
            d.setHours(0, 0, 0, 0)
            return d
        },
        isFormValid() {
            const h = this.form.dayHours
            const total = h.mon + h.tue + h.wed + h.thu + h.fri + h.sat + h.sun
            const allWithinLimit = Object.values(h).every(v => v >= 0 && v <= this.maxDailyHours)
            return total >= 0
                && allWithinLimit
                && this.form.vacationDays >= 0
                && (this.editingSchedule || this.form.validFrom)
        },
    },
    watch: {
        employeeId: {
            immediate: true,
            async handler(id) {
                if (id) {
                    this.fetchSchedules(id)
                    try {
                        const val = await SettingsService.get('max_daily_hours')
                        if (val) {
                            this.maxDailyHours = parseFloat(val)
                        }
                    } catch (e) {
                        // Fallback bleibt bei 10
                    }
                }
            },
        },
    },
    methods: {
        ...mapActions('workSchedules', ['fetchSchedules', 'createSchedule', 'updateSchedule', 'deleteSchedule']),
        getEmptyForm() {
            return {
                validFrom: new Date(),
                dayHours: { mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, sat: 0, sun: 0 },
                vacationDays: 30,
            }
        },
        disablePastDates(date) {
            return date < this.minValidFrom
        },
        formatDate(dateStr) {
            if (!dateStr) return '-'
            const d = new Date(dateStr + 'T00:00:00')
            return d.toLocaleDateString(getLocale())
        },
        startCreate() {
            this.editingSchedule = null
            this.form = this.getEmptyForm()
            this.showForm = true
        },
        startEdit(schedule) {
            this.editingSchedule = schedule
            this.form = {
                validFrom: null,
                dayHours: {
                    mon: schedule.monHours,
                    tue: schedule.tueHours,
                    wed: schedule.wedHours,
                    thu: schedule.thuHours,
                    fri: schedule.friHours,
                    sat: schedule.satHours || 0,
                    sun: schedule.sunHours || 0,
                },
                vacationDays: schedule.vacationDays,
            }
            this.showForm = true
        },
        cancelForm() {
            this.showForm = false
            this.editingSchedule = null
        },
        async saveForm() {
            try {
                const data = {
                    dayHours: this.form.dayHours,
                    vacationDays: this.form.vacationDays,
                }

                if (this.editingSchedule) {
                    await this.updateSchedule({
                        employeeId: this.employeeId,
                        id: this.editingSchedule.id,
                        data,
                    })
                } else {
                    data.validFrom = this.form.validFrom
                        ? formatDateISO(this.form.validFrom)
                        : new Date().toISOString().slice(0, 10)
                    await this.createSchedule({
                        employeeId: this.employeeId,
                        data,
                    })
                }

                this.showForm = false
                this.editingSchedule = null
                this.$emit('updated')
            } catch (error) {
                console.error('Failed to save schedule:', error)
                const data = error?.response?.data
                let msg = t('worktime', 'Fehler beim Speichern des Profils')
                if (data?.errors) {
                    msg = Object.values(data.errors).flat().join(', ')
                } else if (data?.message) {
                    msg = data.message
                }
                showError(msg)
            }
        },
        confirmDelete(schedule) {
            this.scheduleToDelete = schedule
            this.showDeleteDialog = true
        },
        async deleteConfirmed() {
            try {
                await this.deleteSchedule({
                    employeeId: this.employeeId,
                    id: this.scheduleToDelete.id,
                })
                this.$emit('updated')
            } catch (error) {
                console.error('Failed to delete schedule:', error)
                showError(t('worktime', 'Fehler beim Löschen des Profils'))
            } finally {
                this.showDeleteDialog = false
                this.scheduleToDelete = null
            }
        },
    },
}
</script>

<style scoped>
.work-schedule-editor {
    margin-top: 16px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
}

.work-schedule-editor h4 {
    margin: 0 0 12px 0;
    font-size: 1em;
}

.schedules-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 12px;
    font-size: 0.9em;
}

.schedules-table th,
.schedules-table td {
    padding: 8px 10px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.schedules-table th {
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
}

.text-right {
    text-align: right;
}

th.actions-col {
    width: 5.5rem;
    text-align: center;
}

td.actions-col {
    display: flex;
    justify-content: center;
    gap: 2px;
}

.add-button {
    margin-top: 8px;
}

.schedule-form {
    background: var(--color-background-dark);
    padding: 16px;
    border-radius: var(--border-radius);
    margin-top: 12px;
}

.schedule-form h5 {
    margin: 0 0 12px 0;
}

.day-hours-row {
    display: flex;
    gap: 6px;
    margin-bottom: 16px;
}

.day-input {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.day-input label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
    font-size: 0.9em;
    text-align: center;
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

.input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-main-background);
    color: var(--color-main-text);
    text-align: center;
}

.input-small {
    width: 3.5rem;
}

.hint {
    margin: -8px 0 12px 0;
    font-size: 0.8em;
    color: var(--color-text-maxcontrast);
}

.input-error {
    border-color: var(--color-error, #dc2626) !important;
    background-color: var(--color-error-element-light, #fef2f2) !important;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
}
</style>
