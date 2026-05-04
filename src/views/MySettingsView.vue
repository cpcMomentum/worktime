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
                            :placeholder="t('worktime', 'z.B. 08:00')"
                            @change="saveWorkTimes">
                    </div>

                    <div class="form-group">
                        <label for="defaultEndTime">{{ t('worktime', 'Arbeitsende') }}</label>
                        <input id="defaultEndTime"
                            v-model="form.defaultEndTime"
                            type="time"
                            class="time-input"
                            :placeholder="t('worktime', 'z.B. 17:00')"
                            @change="saveWorkTimes">
                    </div>

                    <div class="save-indicator">
                        <NcLoadingIcon v-if="savingWorkTimes" :size="20" />
                        <span v-if="workTimesSaved" class="saved-hint">{{ t('worktime', 'Gespeichert') }}</span>
                    </div>
                </div>

                <p class="hint">
                    {{ t('worktime', 'Leer lassen für Standardwerte (08:00 - 17:00).') }}
                </p>
            </div>
        </div>

        <div class="settings-section">
            <h3>{{ t('worktime', 'Datenschutz') }}</h3>
            <p class="settings-description">
                {{ t('worktime', 'Legen Sie fest, wer Ihre Abwesenheiten in der Abwesenheitsübersicht sehen kann. Vorgesetzte und HR sehen Ihre Abwesenheiten immer.') }}
            </p>

            <div class="settings-form">
                <div class="form-group">
                    <label for="absenceVisibility">{{ t('worktime', 'Abwesenheiten sichtbar für') }}</label>
                    <div class="visibility-row">
                        <select id="absenceVisibility"
                            v-model="form.absenceVisibility"
                            class="visibility-select"
                            :disabled="savingVisibility"
                            @change="saveVisibility">
                            <option value="none">{{ t('worktime', 'Niemand') }}</option>
                            <option value="team">{{ t('worktime', 'Mein Team') }}</option>
                            <option value="all">{{ t('worktime', 'Alle Mitarbeiter') }}</option>
                        </select>
                        <NcLoadingIcon v-if="savingVisibility" :size="20" />
                        <span v-if="visibilitySaved" class="saved-hint">{{ t('worktime', 'Gespeichert') }}</span>
                    </div>
                </div>

                <div v-if="form.absenceVisibility !== 'none'" class="form-group">
                    <label for="absenceDetail">{{ t('worktime', 'Detailgrad') }} <InfoIcon>{{ t('worktime', 'Legt fest, ob Kollegen in der Abwesenheitsübersicht Ihren Abwesenheitsgrund sehen (z.B. Urlaub) oder nur Abwesend. Vorgesetzte und HR sehen immer den Grund.') }}</InfoIcon></label>
                    <div class="visibility-row">
                        <select id="absenceDetail"
                            v-model="form.absenceDetail"
                            class="visibility-select"
                            :disabled="savingDetail"
                            @change="saveDetail">
                            <option value="hidden">{{ t('worktime', 'Nur \"Abwesend\" anzeigen') }}</option>
                            <option value="detailed">{{ t('worktime', 'Grund anzeigen (Urlaub, Fortbildung, ...)') }}</option>
                        </select>
                        <NcLoadingIcon v-if="savingDetail" :size="20" />
                        <span v-if="detailSaved" class="saved-hint">{{ t('worktime', 'Gespeichert') }}</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import { mapGetters, mapActions } from 'vuex'
import { showError } from '@nextcloud/dialogs'
import InfoIcon from '../components/InfoIcon.vue'

export default {
    name: 'MySettingsView',
    components: {
        InfoIcon,
        NcLoadingIcon,
    },
    data() {
        return {
            form: {
                defaultStartTime: '',
                defaultEndTime: '',
                absenceVisibility: 'none',
                absenceDetail: 'hidden',
            },
            originalValues: {
                defaultStartTime: '',
                defaultEndTime: '',
                absenceVisibility: 'none',
                absenceDetail: 'hidden',
            },
            savingWorkTimes: false,
            workTimesSaved: false,
            savingVisibility: false,
            visibilitySaved: false,
            savingDetail: false,
            detailSaved: false,
        }
    },
    computed: {
        ...mapGetters('employees', ['currentEmployee']),
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
            this.form.defaultStartTime = employee.defaultStartTime || '08:00'
            this.form.defaultEndTime = employee.defaultEndTime || '17:00'
            this.form.absenceVisibility = employee.absenceVisibility || 'none'
            this.form.absenceDetail = employee.absenceDetail || 'hidden'
            this.originalValues.defaultStartTime = this.form.defaultStartTime
            this.originalValues.defaultEndTime = this.form.defaultEndTime
            this.originalValues.absenceVisibility = this.form.absenceVisibility
            this.originalValues.absenceDetail = this.form.absenceDetail
        },
        async saveWorkTimes() {
            this.savingWorkTimes = true
            this.workTimesSaved = false
            try {
                await this.updateMyDefaults({
                    defaultStartTime: this.form.defaultStartTime || null,
                    defaultEndTime: this.form.defaultEndTime || null,
                })
                this.originalValues.defaultStartTime = this.form.defaultStartTime
                this.originalValues.defaultEndTime = this.form.defaultEndTime
                this.workTimesSaved = true
                setTimeout(() => { this.workTimesSaved = false }, 2000)
            } catch (error) {
                console.error('Failed to save work times:', error)
                showError(t('worktime', 'Fehler beim Speichern'))
            } finally {
                this.savingWorkTimes = false
            }
        },
        async saveVisibility() {
            this.savingVisibility = true
            this.visibilitySaved = false
            try {
                await this.updateMyDefaults({
                    absenceVisibility: this.form.absenceVisibility,
                })
                this.originalValues.absenceVisibility = this.form.absenceVisibility
                this.visibilitySaved = true
                setTimeout(() => { this.visibilitySaved = false }, 2000)
            } catch (error) {
                console.error('Failed to save visibility:', error)
                showError(t('worktime', 'Fehler beim Speichern'))
                this.form.absenceVisibility = this.originalValues.absenceVisibility
            } finally {
                this.savingVisibility = false
            }
        },
        async saveDetail() {
            this.savingDetail = true
            this.detailSaved = false
            try {
                await this.updateMyDefaults({
                    absenceDetail: this.form.absenceDetail,
                })
                this.originalValues.absenceDetail = this.form.absenceDetail
                this.detailSaved = true
                setTimeout(() => { this.detailSaved = false }, 2000)
            } catch (error) {
                console.error('Failed to save detail:', error)
                showError(t('worktime', 'Fehler beim Speichern'))
                this.form.absenceDetail = this.originalValues.absenceDetail
            } finally {
                this.savingDetail = false
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

.settings-section + .settings-section {
    margin-top: 24px;
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
    align-items: flex-end;
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

.save-indicator {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
    min-height: 36px;
}

.visibility-row {
    display: flex;
    align-items: center;
    gap: 10px;
}

.visibility-select {
    width: 16rem;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-main-background);
}

.saved-hint {
    color: var(--color-success);
    font-size: 13px;
}


</style>
