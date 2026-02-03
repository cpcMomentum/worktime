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

        <div class="form-row">
            <div class="form-group">
                <label for="weeklyHours">{{ t('worktime', 'Wochenstunden') }} *</label>
                <input id="weeklyHours"
                    v-model.number="form.weeklyHours"
                    type="number"
                    min="0"
                    max="60"
                    step="0.5"
                    class="input-field input-small"
                    required>
            </div>
            <div class="form-group">
                <label for="vacationDays">{{ t('worktime', 'Urlaubstage') }} *</label>
                <input id="vacationDays"
                    v-model.number="form.vacationDays"
                    type="number"
                    min="0"
                    max="60"
                    class="input-field input-small"
                    required>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="federalState">{{ t('worktime', 'Bundesland') }} *</label>
                <NcSelect id="federalState"
                    v-model="selectedFederalState"
                    :options="federalStateOptions"
                    :clearable="false"
                    label="label" />
            </div>
            <div class="form-group">
                <label for="supervisor">{{ t('worktime', 'Vorgesetzter') }}</label>
                <NcSelect id="supervisor"
                    v-model="selectedSupervisor"
                    :options="supervisorOptions"
                    :placeholder="t('worktime', 'Kein Vorgesetzter')"
                    label="label" />
            </div>
        </div>

        <div class="form-row">
            <div class="form-group">
                <label for="entryDate">{{ t('worktime', 'Eintrittsdatum') }}</label>
                <NcDateTimePicker id="entryDate"
                    v-model="form.entryDate"
                    type="date"
                    :format="'DD.MM.YYYY'" />
            </div>
            <div v-if="isEdit" class="form-group">
                <label for="exitDate">{{ t('worktime', 'Austrittsdatum') }}</label>
                <NcDateTimePicker id="exitDate"
                    v-model="form.exitDate"
                    type="date"
                    :format="'DD.MM.YYYY'" />
            </div>
        </div>

        <div v-if="isEdit" class="form-group">
            <NcCheckboxRadioSwitch :checked.sync="form.isActive">
                {{ t('worktime', 'Aktiv') }}
            </NcCheckboxRadioSwitch>
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
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import { mapGetters, mapActions } from 'vuex'
import { formatDateISO } from '../utils/dateUtils.js'

export default {
    name: 'EmployeeForm',
    components: {
        NcButton,
        NcSelect,
        NcDateTimePicker,
        NcCheckboxRadioSwitch,
    },
    props: {
        employee: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            form: {
                userId: '',
                firstName: '',
                lastName: '',
                email: '',
                personnelNumber: '',
                weeklyHours: 40,
                vacationDays: 30,
                supervisorId: null,
                federalState: 'BY',
                entryDate: null,
                exitDate: null,
                isActive: true,
            },
        }
    },
    computed: {
        ...mapGetters('employees', ['employees', 'federalStates', 'availableUsers']),
        isEdit() {
            return !!this.employee
        },
        userOptions() {
            return this.availableUsers.map(u => ({
                id: u.user,
                label: u.displayName + (u.subname ? ` (${u.subname})` : ''),
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
        isValid() {
            return (this.isEdit || this.form.userId) &&
                this.form.firstName.trim() &&
                this.form.lastName.trim() &&
                this.form.federalState &&
                this.form.weeklyHours > 0 &&
                this.form.vacationDays >= 0
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
                        supervisorId: employee.supervisorId,
                        federalState: employee.federalState,
                        entryDate: employee.entryDate ? new Date(employee.entryDate) : null,
                        exitDate: employee.exitDate ? new Date(employee.exitDate) : null,
                        isActive: employee.isActive,
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
        if (!this.isEdit) {
            this.$store.dispatch('employees/fetchAvailableUsers')
        }
    },
    methods: {
        ...mapActions('employees', ['createEmployee', 'updateEmployee']),
        resetForm() {
            this.form = {
                userId: '',
                firstName: '',
                lastName: '',
                email: '',
                personnelNumber: '',
                weeklyHours: 40,
                vacationDays: 30,
                supervisorId: null,
                federalState: 'BY',
                entryDate: null,
                exitDate: null,
                isActive: true,
            }
        },
        cancel() {
            this.$emit('cancel')
        },
        async save() {
            try {
                const data = {
                    userId: this.form.userId,
                    firstName: this.form.firstName.trim(),
                    lastName: this.form.lastName.trim(),
                    email: this.form.email.trim() || null,
                    personnelNumber: this.form.personnelNumber.trim() || null,
                    weeklyHours: this.form.weeklyHours,
                    vacationDays: this.form.vacationDays,
                    supervisorId: this.form.supervisorId,
                    federalState: this.form.federalState,
                    entryDate: this.form.entryDate ? formatDateISO(this.form.entryDate) : null,
                    exitDate: this.form.exitDate ? formatDateISO(this.form.exitDate) : null,
                    isActive: this.form.isActive,
                }

                if (this.isEdit) {
                    await this.updateEmployee({ id: this.employee.id, data })
                } else {
                    await this.createEmployee(data)
                }

                this.$emit('saved')
            } catch (error) {
                console.error('Failed to save employee:', error)
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

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
}
</style>
