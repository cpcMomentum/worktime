<template>
    <div class="my-settings-view">
        <h2>{{ t('worktime', 'Meine Einstellungen') }}</h2>

        <div class="settings-section">
            <h3>{{ t('worktime', 'Standard-Arbeitszeiten') }}</h3>
            <p class="settings-description">
                {{ t('worktime', 'Diese Zeiten werden beim Anlegen neuer Zeiteinträge vorausgefüllt.') }}
            </p>

            <div class="settings-form">
                <div class="form-row">
                    <div class="form-group">
                        <label for="defaultStartTime">{{ t('worktime', 'Arbeitsbeginn') }}</label>
                        <input id="defaultStartTime"
                            v-model="form.defaultStartTime"
                            type="time"
                            class="time-input"
                            :placeholder="t('worktime', 'z.B. 08:00')">
                    </div>

                    <div class="form-group">
                        <label for="defaultEndTime">{{ t('worktime', 'Arbeitsende') }}</label>
                        <input id="defaultEndTime"
                            v-model="form.defaultEndTime"
                            type="time"
                            class="time-input"
                            :placeholder="t('worktime', 'z.B. 17:00')">
                    </div>
                </div>

                <p class="hint">
                    {{ t('worktime', 'Leer lassen für Standardwerte (08:00 - 17:00).') }}
                </p>

                <div class="form-actions">
                    <NcButton type="tertiary" @click="reset" :disabled="saving">
                        {{ t('worktime', 'Zurücksetzen') }}
                    </NcButton>
                    <NcButton type="primary" @click="save" :disabled="saving || !hasChanges">
                        <template #icon>
                            <NcLoadingIcon v-if="saving" :size="20" />
                        </template>
                        {{ t('worktime', 'Speichern') }}
                    </NcButton>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import { mapGetters, mapActions } from 'vuex'
import { showSuccess, showError } from '@nextcloud/dialogs'

export default {
    name: 'MySettingsView',
    components: {
        NcButton,
        NcLoadingIcon,
    },
    data() {
        return {
            form: {
                defaultStartTime: '',
                defaultEndTime: '',
            },
            originalValues: {
                defaultStartTime: '',
                defaultEndTime: '',
            },
            saving: false,
        }
    },
    computed: {
        ...mapGetters('employees', ['currentEmployee']),
        hasChanges() {
            return this.form.defaultStartTime !== this.originalValues.defaultStartTime
                || this.form.defaultEndTime !== this.originalValues.defaultEndTime
        },
    },
    watch: {
        currentEmployee: {
            immediate: true,
            handler(employee) {
                if (employee) {
                    this.loadFromEmployee(employee)
                }
            },
        },
    },
    methods: {
        ...mapActions('employees', ['updateMyDefaults', 'fetchCurrentEmployee']),
        loadFromEmployee(employee) {
            // Show saved values or defaults (08:00 / 17:00)
            this.form.defaultStartTime = employee.defaultStartTime || '08:00'
            this.form.defaultEndTime = employee.defaultEndTime || '17:00'
            this.originalValues.defaultStartTime = this.form.defaultStartTime
            this.originalValues.defaultEndTime = this.form.defaultEndTime
        },
        reset() {
            this.form.defaultStartTime = this.originalValues.defaultStartTime
            this.form.defaultEndTime = this.originalValues.defaultEndTime
        },
        async save() {
            this.saving = true
            try {
                await this.updateMyDefaults({
                    defaultStartTime: this.form.defaultStartTime || null,
                    defaultEndTime: this.form.defaultEndTime || null,
                })
                this.originalValues.defaultStartTime = this.form.defaultStartTime
                this.originalValues.defaultEndTime = this.form.defaultEndTime
                showSuccess(t('worktime', 'Einstellungen gespeichert'))
            } catch (error) {
                console.error('Failed to save settings:', error)
                showError(t('worktime', 'Fehler beim Speichern der Einstellungen'))
            } finally {
                this.saving = false
            }
        },
    },
}
</script>

<style scoped>
.my-settings-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 600px;
}

.my-settings-view h2 {
    margin: 0 0 24px 0;
}

.settings-section {
    background: var(--color-main-background);
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-large);
    padding: 20px;
}

.settings-section h3 {
    margin: 0 0 8px 0;
}

.settings-description {
    color: var(--color-text-maxcontrast);
    margin: 0 0 20px 0;
}

.settings-form {
    margin-top: 16px;
}

.form-row {
    display: flex;
    gap: 24px;
}

.form-group {
    margin-bottom: 16px;
}

.form-group label {
    display: block;
    margin-bottom: 4px;
    font-weight: 500;
}

.time-input {
    width: 8rem;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
}

.hint {
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
    margin: 0 0 16px 0;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 20px;
}
</style>
