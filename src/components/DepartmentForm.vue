<template>
    <div class="department-form">
        <div class="department-form-header">
            <h3>{{ isEdit ? t('worktime', 'Abteilung bearbeiten') : t('worktime', 'Neue Abteilung') }}</h3>
            <NcCheckboxRadioSwitch :checked.sync="form.isActive" type="switch">
                {{ t('worktime', 'Aktiv') }}
            </NcCheckboxRadioSwitch>
        </div>
        <p class="header-hint">{{ t('worktime', 'Inaktive Abteilungen stehen nicht mehr zur Auswahl.') }}</p>

        <div class="form-group">
            <label for="departmentName">{{ t('worktime', 'Name') }} *</label>
            <input id="departmentName"
                v-model="form.name"
                type="text"
                class="input-field"
                required
                @keyup.enter="isValid && save()">
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
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import { mapActions } from 'vuex'
import { showSuccessMessage, showErrorMessage } from '../utils/errorHandler.js'

export default {
    name: 'DepartmentForm',
    components: {
        NcButton,
        NcCheckboxRadioSwitch,
    },
    props: {
        department: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            form: {
                name: '',
                isActive: true,
            },
        }
    },
    computed: {
        isEdit() {
            return !!this.department
        },
        isValid() {
            return this.form.name.trim().length > 0
        },
    },
    watch: {
        department: {
            immediate: true,
            handler(department) {
                if (department) {
                    this.form = {
                        name: department.name || '',
                        isActive: department.isActive ?? true,
                    }
                } else {
                    this.form = { name: '', isActive: true }
                }
            },
        },
    },
    methods: {
        ...mapActions('departments', ['createDepartment', 'updateDepartment']),
        cancel() {
            this.$emit('cancel')
        },
        async save() {
            try {
                const data = {
                    name: this.form.name.trim(),
                    isActive: this.form.isActive,
                }

                if (this.isEdit) {
                    await this.updateDepartment({ id: this.department.id, data })
                    showSuccessMessage(this.t('worktime', 'Abteilung aktualisiert'))
                } else {
                    await this.createDepartment(data)
                    showSuccessMessage(this.t('worktime', 'Abteilung erstellt'))
                }

                this.$emit('saved')
            } catch (error) {
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Speichern'))
            }
        },
    },
}
</script>

<style scoped>
.department-form {
    padding: 20px;
}

.department-form-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 4px;
}

.department-form-header h3 {
    margin: 0;
}

.header-hint {
    margin: 0 0 20px;
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
}

.input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-main-background);
    color: var(--color-main-text);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
}
</style>
