<template>
    <div class="employee-form">
        <h3>{{ isEdit ? t('worktime', 'Mitarbeiter bearbeiten') : t('worktime', 'Neuer Mitarbeiter') }}</h3>

        <div class="form-group">
            <label for="ncUser">{{ t('worktime', 'Nextcloud-Benutzer') }}</label>
            <NcSelect id="ncUser"
                v-model="selectedUser"
                :options="userOptions"
                :placeholder="t('worktime', 'Benutzer auswählen')"
                :clearable="false"
                :disabled="isEdit"
                label="label" />
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="firstName">{{ t('worktime', 'Vorname') }} *</label>
                <input id="firstName"
                    v-model="form.firstName"
                    type="text"
                    class="input-field"
                    required>
            </div>
            <div class="form-group">
                <label for="lastName">{{ t('worktime', 'Nachname') }} *</label>
                <input id="lastName"
                    v-model="form.lastName"
                    type="text"
                    class="input-field"
                    required>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="email">{{ t('worktime', 'E-Mail') }}</label>
                <input id="email"
                    v-model="form.email"
                    type="email"
                    class="input-field">
            </div>
            <div class="form-group">
                <label for="personnelNumber">{{ t('worktime', 'Personalnummer') }}</label>
                <input id="personnelNumber"
                    v-model="form.personnelNumber"
                    type="text"
                    class="input-field">
            </div>
        </div>

        <div v-if="!isEdit" class="form-group">
            <label>{{ t('worktime', 'Arbeitszeit pro Tag') }} <InfoIcon>{{ t('worktime', 'Stunden je Wochentag laut Vertrag. Daraus berechnet WorkTime das tägliche Soll, die Wochenstunden und die Arbeitstage. Spätere Änderungen im Arbeitszeitprofil des Mitarbeiters.') }}</InfoIcon> *</label>
            <DayHoursInput v-model="form.dayHours" :max-daily-hours="maxDailyHours" />
            <p v-if="!hasWorkingHours" class="field-hint field-hint--error">
                {{ t('worktime', 'Mindestens ein Wochentag braucht Arbeitsstunden. Für eine vorübergehende Auszeit (z. B. Elternzeit) eine Abwesenheit erfassen statt 0 Stunden.') }}
            </p>
        </div>

        <div v-if="!isEdit" class="form-row">
            <div class="form-group">
                <label for="vacationDays">{{ t('worktime', 'Urlaubstage') }} <InfoIcon>{{ t('worktime', 'Voller Jahresanspruch bei diesem Arbeitsmuster. Nicht anteilig eintragen, WorkTime rechnet das Eintrittsjahr selbst anteilig.') }}</InfoIcon> *</label>
                <input id="vacationDays"
                    v-model.number="form.vacationDays"
                    type="number"
                    min="0"
                    max="60"
                    class="input-field input-small"
                    required>
            </div>
        </div>

        <div v-if="isEdit" class="form-row">
            <div class="form-group">
                <label>{{ t('worktime', 'Wochenstunden') }} <InfoIcon>{{ t('worktime', 'Aktuell gültiger Wert aus dem Arbeitszeitprofil. Zum Ändern unten das Profil bearbeiten oder ein neues anlegen.') }}</InfoIcon></label>
                <input :value="form.weeklyHours"
                    type="text"
                    class="input-field input-small"
                    disabled>
            </div>
            <div class="form-group">
                <label>{{ t('worktime', 'Urlaubstage') }} <InfoIcon>{{ t('worktime', 'Aktuell gültiger Wert aus dem Arbeitszeitprofil. Zum Ändern unten das Profil bearbeiten oder ein neues anlegen.') }}</InfoIcon></label>
                <input :value="form.vacationDays"
                    type="text"
                    class="input-field input-small"
                    disabled>
            </div>
        </div>
        <p v-if="isEdit" class="field-hint">
            {{ t('worktime', 'Wochenstunden und Urlaubstage ergeben sich aus dem Arbeitszeitprofil unten und werden dort gepflegt.') }}
        </p>

        <div v-if="isEdit" class="form-row">
            <div class="form-group">
                <label>{{ t('worktime', 'Arbeitstage pro Woche') }} <InfoIcon>{{ t('worktime', 'Aktuell gültiger Wert aus dem Arbeitszeitprofil. Zum Ändern unten das Profil bearbeiten oder ein neues anlegen.') }}</InfoIcon></label>
                <input :value="form.workingDaysPerWeek"
                    type="text"
                    class="input-field input-small"
                    disabled>
            </div>
        </div>

        <div class="form-group">
            <label for="federalState">{{ t('worktime', 'Bundesland') }} <InfoIcon>{{ t('worktime', 'Legt fest, welche gesetzlichen Feiertage für diesen Mitarbeiter gelten. Bayern hat z.B. mehr Feiertage als Hamburg.') }}</InfoIcon> *</label>
            <NcSelect id="federalState"
                v-model="selectedFederalState"
                :options="federalStateOptions"
                :clearable="false"
                label="label" />
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="supervisor">{{ t('worktime', 'Vorgesetzter') }} <InfoIcon>{{ t('worktime', 'Diese Person kann die Zeiteinträge und Abwesenheitsanträge dieses Mitarbeiters einsehen und genehmigen.') }}</InfoIcon></label>
                <NcSelect id="supervisor"
                    v-model="selectedSupervisor"
                    :options="supervisorOptions"
                    :placeholder="t('worktime', 'Kein Vorgesetzter')"
                    label="label" />
            </div>
            <div class="form-group">
                <label for="department">{{ t('worktime', 'Abteilung') }} <InfoIcon>{{ t('worktime', 'Ordnet den Mitarbeiter einer Organisationseinheit zu. Rein organisatorisch – unabhängig vom Vorgesetzten und ohne Einfluss auf Berechtigungen.') }}</InfoIcon></label>
                <NcSelect id="department"
                    v-model="selectedDepartment"
                    :options="departmentOptions"
                    :placeholder="t('worktime', 'Keine Abteilung')"
                    label="label" />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="entryDate">{{ t('worktime', 'Eintrittsdatum') }} <InfoIcon>{{ t('worktime', 'Ab diesem Datum erscheint der Mitarbeiter in der Zeiterfassung. Für Monate davor werden keine Sollstunden berechnet.') }}</InfoIcon></label>
                <NcDateTimePicker id="entryDate"
                    v-model="form.entryDate"
                    type="date"
                    :format="'DD.MM.YYYY'" />
            </div>
            <div v-if="isEdit" class="form-group">
                <label for="exitDate">{{ t('worktime', 'Austrittsdatum') }} <InfoIcon>{{ t('worktime', 'Ab diesem Datum kann der Mitarbeiter keine neuen Einträge mehr erfassen. Alle bisherigen Daten bleiben erhalten.') }}</InfoIcon></label>
                <NcDateTimePicker id="exitDate"
                    v-model="form.exitDate"
                    type="date"
                    :format="'DD.MM.YYYY'" />
            </div>
        </div>

        <div v-if="entryYear" class="form-row">
            <div class="form-group">
                <NcCheckboxRadioSwitch :checked.sync="form.vacationTransferred">
                    {{ t('worktime', 'Resturlaub aus vorheriger Beschäftigung übernehmen') }}
                </NcCheckboxRadioSwitch>
                <p class="field-hint">
                    {{ t('worktime', 'An: der volle Jahresanspruch gilt, abzüglich der bereits genommenen Tage (interner Wechsel, Umstieg auf diese App). Aus: echte Neueinstellung — nur anteilig für die Monate ab Eintritt (Teilurlaub).') }}
                </p>
            </div>
        </div>

        <div v-if="entryYear" class="form-row">
            <div class="form-group">
                <label for="vacationDaysUsed">{{ t('worktime', 'Davon {year} anderswo bereits gewährt/genommen', { year: entryYear }) }} <InfoIcon>{{ t('worktime', 'Urlaubstage, die im Eintrittsjahr bereits genommen oder ausbezahlt wurden — beim vorherigen Arbeitgeber oder vor der Umstellung auf diese App. Bei Übernahme werden sie vom vollen Anspruch abgezogen, bei Neueinstellung begrenzen sie den anteiligen Anspruch (§ 6). Ab dem Folgejahr gilt wieder der volle Jahresanspruch. Halbe Tage sind möglich.') }}</InfoIcon></label>
                <input id="vacationDaysUsed"
                    v-model="form.vacationDaysUsed"
                    type="number"
                    min="0"
                    step="0.5"
                    class="input-field input-small">
            </div>
        </div>

        <WorkScheduleEditor v-if="isEdit && employee"
            :employee-id="employee.id"
            :entry-date="employee.entryDate || null"
            @updated="$emit('schedule-updated')" />

        <div class="form-actions">
            <NcButton type="tertiary" @click="cancel">
                {{ t('worktime', 'Abbrechen') }}
            </NcButton>
            <NcButton type="primary" :disabled="!isValid || saving" @click="save">
                {{ t('worktime', 'Speichern') }}
            </NcButton>
        </div>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcDateTimePicker from '@nextcloud/vue/dist/Components/NcDateTimePicker.js'
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import WorkScheduleEditor from './WorkScheduleEditor.vue'
import { mapGetters, mapActions } from 'vuex'
import { formatDateISO } from '../utils/dateUtils.js'
import { sum } from '../utils/dayHours.js'
import { showErrorMessage } from '../utils/errorHandler.js'
import SettingsService from '../services/SettingsService.js'
import InfoIcon from '../components/InfoIcon.vue'
import DayHoursInput from './DayHoursInput.vue'

export default {
    name: 'EmployeeForm',
    components: {
        InfoIcon,
        NcButton,
        NcSelect,
        NcDateTimePicker,
        NcCheckboxRadioSwitch,
        WorkScheduleEditor,
        DayHoursInput,
    },
    props: {
        employee: {
            type: Object,
            default: null,
        },
        // Standard-Bundesland aus den Firmendaten (#337): Vorauswahl fuer neue
        // Mitarbeitende. Bleibt frei aenderbar; im Bearbeiten-Modus wird das am
        // Mitarbeiter gespeicherte Bundesland verwendet.
        defaultFederalState: {
            type: String,
            default: 'BY',
        },
    },
    data() {
        return {
            form: this.emptyForm(),
            maxDailyHours: 10,
            saving: false,
        }
    },
    computed: {
        ...mapGetters('employees', ['employees', 'federalStates', 'availableUsers']),
        ...mapGetters('departments', ['departments']),
        isEdit() {
            return !!this.employee
        },
        /**
         * Jahr des Eintritts — der neue Verbrauchswert gilt ausschliesslich fuer
         * dieses eine Jahr, deshalb wird es im Label mitgenannt (#522).
         */
        entryYear() {
            return this.form.entryDate ? new Date(this.form.entryDate).getFullYear() : null
        },
        /**
         * Leeres Feld heisst "nichts hinterlegt", nicht 0 — beides rechnet gleich,
         * aber null haelt Bestandsdatensaetze unangetastet.
         */
        normalizedVacationDaysUsed() {
            const value = this.form.vacationDaysUsed
            if (value === null || value === '' || Number.isNaN(Number(value))) {
                return null
            }
            return Number(value) > 0 ? Number(value) : null
        },
        userOptions() {
            return this.availableUsers.map(u => ({
                id: u.user,
                label: u.displayName + (u.subname ? ` (${u.subname})` : ''),
                email: u.subname || '',
            }))
        },
        selectedUser: {
            get() {
                if (this.isEdit && this.employee) {
                    return {
                        id: this.employee.userId,
                        label: this.employee.fullName,
                    }
                }
                return this.userOptions.find(u => u.id === this.form.userId) || null
            },
            set(value) {
                this.form.userId = value?.id || ''
                // Pre-fill name from display name if empty
                if (value && !this.form.firstName && !this.form.lastName) {
                    const parts = value.label.split(' ')
                    if (parts.length >= 2) {
                        this.form.firstName = parts[0]
                        this.form.lastName = parts.slice(1).join(' ').replace(/\s*\(.*\)$/, '')
                    }
                }
                // Pre-fill email from NC profile if empty
                if (value?.email && !this.form.email) {
                    this.form.email = value.email
                }
            },
        },
        federalStateOptions() {
            return Object.entries(this.federalStates).map(([id, label]) => ({ id, label }))
        },
        selectedFederalState: {
            get() {
                return this.federalStateOptions.find(s => s.id === this.form.federalState) || null
            },
            set(value) {
                this.form.federalState = value?.id || 'BY'
            },
        },
        supervisorOptions() {
            return this.employees
                .filter(e => !this.employee || e.id !== this.employee.id)
                .filter(e => e.isActive)
                .map(e => ({
                    id: e.id,
                    label: e.fullName,
                }))
        },
        selectedSupervisor: {
            get() {
                return this.supervisorOptions.find(s => s.id === this.form.supervisorId) || null
            },
            set(value) {
                this.form.supervisorId = value?.id || null
            },
        },
        departmentOptions() {
            // Keep an already-assigned but now-inactive department in the list so
            // editing and saving the employee does not silently drop the assignment.
            return this.departments
                .filter(d => d.isActive || d.id === this.form.departmentId)
                .map(d => ({
                    id: d.id,
                    label: d.name,
                }))
        },
        selectedDepartment: {
            get() {
                return this.departmentOptions.find(d => d.id === this.form.departmentId) || null
            },
            set(value) {
                this.form.departmentId = value?.id || null
            },
        },
        hasWorkingHours() {
            return sum(this.form.dayHours) > 0
        },
        isValid() {
            const baseValid = (this.isEdit || this.form.userId)
                && this.form.firstName.trim()
                && this.form.lastName.trim()
                && this.form.federalState
            if (this.isEdit) {
                return baseValid
            }
            // Same rules as the server: every day 0..max, at least one working hour.
            const daysValid = Object.values(this.form.dayHours).every(h => h >= 0 && h <= this.maxDailyHours)
            return baseValid && daysValid && this.hasWorkingHours
                && this.form.vacationDays >= 0 && this.form.vacationDays <= 365
        },
    },
    watch: {
        employee: {
            immediate: true,
            handler(employee) {
                if (employee) {
                    this.form = {
                        userId: employee.userId,
                        firstName: employee.firstName,
                        lastName: employee.lastName,
                        email: employee.email || '',
                        personnelNumber: employee.personnelNumber || '',
                        weeklyHours: employee.weeklyHours,
                        vacationDays: employee.vacationDays,
                        workingDaysPerWeek: employee.workingDaysPerWeek ?? 5,
                        supervisorId: employee.supervisorId,
                        departmentId: employee.departmentId ?? null,
                        federalState: employee.federalState,
                        entryDate: employee.entryDate ? new Date(employee.entryDate) : null,
                        exitDate: employee.exitDate ? new Date(employee.exitDate) : null,
                        vacationDaysUsed: employee.vacationDaysUsed ?? null,
                        vacationTransferred: employee.vacationTransferred ?? false,
                    }
                } else {
                    this.resetForm()
                }
            },
        },
    },
    created() {
        this.$store.dispatch('employees/fetchFederalStates')
        this.$store.dispatch('employees/fetchEmployees')
        this.$store.dispatch('departments/fetchDepartments', true)
        if (!this.isEdit) {
            this.$store.dispatch('employees/fetchAvailableUsers')
            this.loadMaxDailyHours()
        }
    },
    methods: {
        ...mapActions('employees', ['createEmployee', 'updateEmployee']),
        emptyForm() {
            return {
                userId: '',
                firstName: '',
                lastName: '',
                email: '',
                personnelNumber: '',
                weeklyHours: 40,
                vacationDays: 30,
                workingDaysPerWeek: 5,
                dayHours: { mon: 8, tue: 8, wed: 8, thu: 8, fri: 8, sat: 0, sun: 0 },
                supervisorId: null,
                departmentId: null,
                federalState: this.defaultFederalState,
                entryDate: null,
                exitDate: null,
                vacationDaysUsed: null,
                vacationTransferred: false,
            }
        },
        resetForm() {
            this.form = this.emptyForm()
        },
        async loadMaxDailyHours() {
            try {
                const value = parseFloat(await SettingsService.get('max_daily_hours'))
                if (value > 0) {
                    this.maxDailyHours = value
                }
            } catch (e) {
                // keep the default of 10
            }
        },
        cancel() {
            this.$emit('cancel')
        },
        async save() {
            if (this.saving) {
                return
            }
            this.saving = true
            try {
                const data = {
                    userId: this.form.userId,
                    firstName: this.form.firstName.trim(),
                    lastName: this.form.lastName.trim(),
                    email: this.form.email.trim() || null,
                    personnelNumber: this.form.personnelNumber.trim() || null,
                    weeklyHours: this.form.weeklyHours,
                    vacationDays: this.form.vacationDays,
                    workingDaysPerWeek: this.form.workingDaysPerWeek,
                    supervisorId: this.form.supervisorId,
                    departmentId: this.form.departmentId,
                    federalState: this.form.federalState,
                    entryDate: this.form.entryDate ? formatDateISO(this.form.entryDate) : null,
                    exitDate: this.form.exitDate ? formatDateISO(this.form.exitDate) : null,
                    vacationDaysUsed: this.entryYear ? this.normalizedVacationDaysUsed : null,
                    vacationTransferred: this.entryYear ? this.form.vacationTransferred : false,
                }

                if (this.isEdit) {
                    await this.updateEmployee({ id: this.employee.id, data })
                } else {
                    // The server derives weekly hours and working days from the day pattern.
                    delete data.weeklyHours
                    delete data.workingDaysPerWeek
                    data.dayHours = this.form.dayHours
                    await this.createEmployee(data)
                }

                this.$emit('saved')
            } catch (error) {
                console.error('Failed to save employee:', error)
                // handleApiError() puts the server text into error.message; raw axios errors have none worth showing.
                const fromServer = error && !error.isAxiosError && error.message
                showErrorMessage(fromServer || this.t('worktime', 'Fehler beim Speichern des Mitarbeiters'))
            } finally {
                this.saving = false
            }
        },
    },
}
</script>

<style scoped>
.employee-form {
    padding: 16px;
}

.employee-form h3 {
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

.input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-main-background);
    color: var(--color-main-text);
}

.input-small {
    width: 8rem;
}

.field-hint {
    margin: -8px 0 16px 0;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
}

.field-hint--error {
    color: var(--color-error, #dc2626);
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
