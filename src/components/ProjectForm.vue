<template>
    <div class="project-form">
        <h3>{{ isEdit ? t('worktime', 'Projekt bearbeiten') : t('worktime', 'Neues Projekt') }}</h3>

        <div class="form-row">
            <div class="form-group">
                <label for="projectName">{{ t('worktime', 'Name') }} *</label>
                <input id="projectName"
                    v-model="form.name"
                    type="text"
                    class="input-field"
                    required>
            </div>
            <div class="form-group">
                <label for="projectCode">{{ t('worktime', 'Projektcode') }}</label>
                <input id="projectCode"
                    v-model="form.code"
                    type="text"
                    class="input-field"
                    :placeholder="t('worktime', 'z.B. PRJ-001')">
            </div>
        </div>

        <div class="form-group">
            <label for="projectCustomer">{{ t('worktime', 'Kunde') }}</label>
            <input id="projectCustomer"
                v-model="form.customer"
                type="text"
                class="input-field"
                :placeholder="t('worktime', 'Optional, z.B. für die Auswertung')">
        </div>

        <div class="form-group">
            <label for="projectDescription">{{ t('worktime', 'Beschreibung') }}</label>
            <textarea id="projectDescription"
                v-model="form.description"
                class="input-field textarea-field"
                rows="3" />
        </div>

        <div class="form-group">
            <label for="projectColor">{{ t('worktime', 'Farbe') }}</label>
            <div class="color-picker-row">
                <input id="projectColor"
                    v-model="form.color"
                    type="color"
                    class="color-input">
                <NcButton v-if="form.color"
                    type="tertiary"
                    @click="form.color = null">
                    {{ t('worktime', 'Zurücksetzen') }}
                </NcButton>
            </div>
        </div>

        <div class="form-group">
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
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import { mapActions } from 'vuex'
import { showSuccessMessage, showErrorMessage } from '../utils/errorHandler.js'

export default {
    name: 'ProjectForm',
    components: {
        NcButton,
        NcCheckboxRadioSwitch,
    },
    props: {
        project: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            form: {
                name: '',
                code: null,
                description: null,
                customer: null,
                color: null,
                isActive: true,
                isBillable: true,
            },
        }
    },
    computed: {
        isEdit() {
            return !!this.project
        },
        isValid() {
            return this.form.name.trim().length > 0
        },
    },
    watch: {
        project: {
            immediate: true,
            handler(project) {
                if (project) {
                    this.form = {
                        name: project.name || '',
                        code: project.code || null,
                        description: project.description || null,
                        customer: project.customer || null,
                        color: project.color || null,
                        isActive: project.isActive ?? true,
                        isBillable: project.isBillable ?? true,
                    }
                } else {
                    this.resetForm()
                }
            },
        },
    },
    methods: {
        ...mapActions('projects', ['createProject', 'updateProject']),
        resetForm() {
            this.form = {
                name: '',
                code: null,
                description: null,
                customer: null,
                color: null,
                isActive: true,
                isBillable: true,
            }
        },
        cancel() {
            this.$emit('cancel')
        },
        async save() {
            try {
                const data = {
                    name: this.form.name.trim(),
                    code: this.form.code?.trim() || null,
                    description: this.form.description?.trim() || null,
                    customer: this.form.customer?.trim() || null,
                    color: this.form.color || null,
                    isActive: this.form.isActive,
                    isBillable: this.form.isBillable,
                }

                if (this.isEdit) {
                    await this.updateProject({ id: this.project.id, data })
                    showSuccessMessage(this.t('worktime', 'Projekt aktualisiert'))
                } else {
                    await this.createProject(data)
                    showSuccessMessage(this.t('worktime', 'Projekt erstellt'))
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
.project-form {
    padding: 20px;
}

.project-form h3 {
    margin-top: 0;
    margin-bottom: 16px;
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
    align-items: flex-start;
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

.textarea-field {
    resize: vertical;
    font-family: inherit;
}

.color-picker-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

.color-input {
    width: 48px;
    height: 36px;
    padding: 2px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    cursor: pointer;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
}
</style>
