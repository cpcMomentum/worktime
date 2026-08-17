<template>
    <div class="my-settings-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Meine Einstellungen') }}</h2>
        </div>

        <NcSettingsSection :name="t('worktime', 'Standard-Arbeitszeiten')"
            :description="t('worktime', 'Diese Zeiten werden beim Anlegen neuer Zeiteinträge vorausgefüllt.')">

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
        </NcSettingsSection>

        <NcSettingsSection :name="t('worktime', 'Datenschutz')"
            :description="t('worktime', 'Legen Sie fest, wer Ihre Abwesenheiten in der Abwesenheitsübersicht sehen kann. Vorgesetzte und HR sehen Ihre Abwesenheiten immer.')">

            <div class="settings-form">
                <div class="form-group">
                    <label for="absenceVisibility">{{ t('worktime', 'Abwesenheiten sichtbar für') }}</label>
                    <div class="visibility-row">
                        <NcSelect id="absenceVisibility"
                            v-model="selectedVisibility"
                            :options="visibilityOptions"
                            :clearable="false"
                            :disabled="savingVisibility"
                            class="visibility-select"
                            @input="saveVisibility" />
                        <NcLoadingIcon v-if="savingVisibility" :size="20" />
                        <span v-if="visibilitySaved" class="saved-hint">{{ t('worktime', 'Gespeichert') }}</span>
                    </div>
                </div>

                <div v-if="form.absenceVisibility !== 'none'" class="form-group">
                    <label for="absenceDetail">{{ t('worktime', 'Detailgrad') }} <InfoIcon>{{ t('worktime', 'Legt fest, ob Kollegen in der Abwesenheitsübersicht Ihren Abwesenheitsgrund sehen (z.B. Urlaub) oder nur Abwesend. Vorgesetzte und HR sehen immer den Grund.') }}</InfoIcon></label>
                    <div class="visibility-row">
                        <NcSelect id="absenceDetail"
                            v-model="selectedDetail"
                            :options="detailOptions"
                            :clearable="false"
                            :disabled="savingDetail"
                            class="visibility-select"
                            @input="saveDetail" />
                        <NcLoadingIcon v-if="savingDetail" :size="20" />
                        <span v-if="detailSaved" class="saved-hint">{{ t('worktime', 'Gespeichert') }}</span>
                    </div>
                </div>
            </div>
        </NcSettingsSection>

        <NcSettingsSection v-if="isSupervisor"
            :name="t('worktime', 'Vertretung')"
            :description="t('worktime', 'Wählen Sie eine Person, die Ihre Genehmigungen für Ihr Team übernimmt, während Sie abwesend sind. Die Vertretung wird automatisch aktiv, sobald für Sie eine Abwesenheit genehmigt ist (z. B. Urlaub oder Krankheit) — ohne genehmigte Abwesenheit greift sie nicht. Einmal festgelegt, gilt sie für alle Ihre Abwesenheiten, bis Sie sie ändern.')">

            <div class="settings-form">
                <div class="form-group">
                    <label for="deputy">{{ t('worktime', 'Meine Vertretung bei Genehmigungen') }}</label>
                    <div class="visibility-row">
                        <NcSelect id="deputy"
                            v-model="selectedDeputy"
                            :options="deputyOptions"
                            :placeholder="t('worktime', 'Keine Vertretung')"
                            :disabled="savingDeputy"
                            label="label"
                            class="visibility-select"
                            @input="saveDeputy" />
                        <NcLoadingIcon v-if="savingDeputy" :size="20" />
                        <span v-if="deputySaved" class="saved-hint">{{ t('worktime', 'Gespeichert') }}</span>
                    </div>
                </div>
            </div>
        </NcSettingsSection>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import { mapGetters, mapActions } from 'vuex'
import { showError } from '@nextcloud/dialogs'
import InfoIcon from '../components/InfoIcon.vue'
import EmployeeService from '../services/EmployeeService.js'

export default {
    name: 'MySettingsView',
    components: {
        InfoIcon,
        NcLoadingIcon,
        NcSettingsSection,
        NcSelect,
    },
    data() {
        return {
            form: {
                defaultStartTime: '',
                defaultEndTime: '',
                absenceVisibility: 'none',
                absenceDetail: 'hidden',
                deputyId: null,
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
            savingDeputy: false,
            deputySaved: false,
            colleagues: [],
        }
    },
    computed: {
        ...mapGetters('employees', ['currentEmployee']),
        ...mapGetters('permissions', ['isSupervisor']),
        deputyOptions() {
            const myId = this.currentEmployee?.id
            return this.colleagues
                .filter(c => c.id !== myId)
                .map(c => ({ id: c.id, label: c.fullName }))
        },
        selectedDeputy: {
            get() {
                return this.deputyOptions.find(o => o.id === this.form.deputyId) || null
            },
            set(value) {
                this.form.deputyId = value?.id || null
            },
        },
        visibilityOptions() {
            return [
                { id: 'none', label: this.t('worktime', 'Niemand') },
                { id: 'team', label: this.t('worktime', 'Mein Team') },
                { id: 'all', label: this.t('worktime', 'Alle Mitarbeiter') },
            ]
        },
        detailOptions() {
            return [
                { id: 'hidden', label: this.t('worktime', 'Nur „Abwesend" anzeigen') },
                { id: 'detailed', label: this.t('worktime', 'Grund anzeigen (Urlaub, Fortbildung, ...)') },
            ]
        },
        selectedVisibility: {
            get() {
                return this.visibilityOptions.find(o => o.id === this.form.absenceVisibility) || null
            },
            set(value) {
                this.form.absenceVisibility = value?.id || 'none'
            },
        },
        selectedDetail: {
            get() {
                return this.detailOptions.find(o => o.id === this.form.absenceDetail) || null
            },
            set(value) {
                this.form.absenceDetail = value?.id || 'hidden'
            },
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
    async created() {
        // Load colleagues (id + name only) for the deputy picker (#343).
        this.colleagues = await EmployeeService.getSelectableEmployees() || []
    },
    methods: {
        ...mapActions('employees', ['updateMyDefaults', 'updateMyDeputy']),
        loadFromEmployee(employee) {
            this.form.defaultStartTime = employee.defaultStartTime || '08:00'
            this.form.defaultEndTime = employee.defaultEndTime || '17:00'
            this.form.absenceVisibility = employee.absenceVisibility || 'none'
            this.form.absenceDetail = employee.absenceDetail || 'hidden'
            this.form.deputyId = employee.deputyId ?? null
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
        async saveDeputy() {
            this.savingDeputy = true
            this.deputySaved = false
            try {
                await this.updateMyDeputy(this.form.deputyId)
                this.deputySaved = true
                setTimeout(() => { this.deputySaved = false }, 2000)
            } catch (error) {
                console.error('Failed to save deputy:', error)
                showError(t('worktime', 'Fehler beim Speichern'))
            } finally {
                this.savingDeputy = false
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

.view-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.my-settings-view h2 {
    margin: 0;
}

.settings-form {
    margin-top: 8px;
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
    min-width: 16rem;
}

.saved-hint {
    color: var(--color-success);
    font-size: 13px;
}


</style>
