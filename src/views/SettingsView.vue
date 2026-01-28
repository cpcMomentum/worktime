<template>
    <div class="settings-view">
        <h2>{{ t('worktime', 'Einstellungen') }}</h2>

        <NcLoadingIcon v-if="loading" :size="44" />

        <div v-else class="settings-content">
            <section v-if="canManageSettings" class="settings-section">
                <h3>{{ t('worktime', 'Firmendaten') }}</h3>
                <div class="form-group">
                    <label for="companyName">{{ t('worktime', 'Firmenname') }}</label>
                    <input id="companyName"
                        v-model="settings.company_name"
                        type="text"
                        class="input-field"
                        @change="saveSetting('company_name')">
                </div>
                <div class="form-group">
                    <label for="defaultState">{{ t('worktime', 'Standard-Bundesland') }}</label>
                    <NcSelect id="defaultState"
                        v-model="selectedFederalState"
                        :options="federalStateOptions"
                        @input="saveSetting('default_federal_state')" />
                </div>
            </section>

            <section v-if="canManageSettings" class="settings-section">
                <h3>{{ t('worktime', 'Standardwerte') }}</h3>
                <div class="form-row">
                    <div class="form-group">
                        <label for="weeklyHours">{{ t('worktime', 'Wochenstunden') }}</label>
                        <input id="weeklyHours"
                            v-model.number="settings.default_weekly_hours"
                            type="number"
                            min="0"
                            max="60"
                            class="input-field input-small"
                            @change="saveSetting('default_weekly_hours')">
                    </div>
                    <div class="form-group">
                        <label for="vacationDays">{{ t('worktime', 'Urlaubstage') }}</label>
                        <input id="vacationDays"
                            v-model.number="settings.default_vacation_days"
                            type="number"
                            min="0"
                            max="60"
                            class="input-field input-small"
                            @change="saveSetting('default_vacation_days')">
                    </div>
                </div>
            </section>

            <section v-if="canManageSettings" class="settings-section">
                <h3>{{ t('worktime', 'Arbeitszeit-Regeln') }}</h3>
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.require_project"
                        @update:checked="saveSettingBool('require_project')">
                        {{ t('worktime', 'Projekt erforderlich') }}
                    </NcCheckboxRadioSwitch>
                </div>
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.require_description"
                        @update:checked="saveSettingBool('require_description')">
                        {{ t('worktime', 'Beschreibung erforderlich') }}
                    </NcCheckboxRadioSwitch>
                </div>
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.allow_future_entries"
                        @update:checked="saveSettingBool('allow_future_entries')">
                        {{ t('worktime', 'Zukünftige Einträge erlauben') }}
                    </NcCheckboxRadioSwitch>
                </div>
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.approval_required"
                        @update:checked="saveSettingBool('approval_required')">
                        {{ t('worktime', 'Genehmigung erforderlich') }}
                    </NcCheckboxRadioSwitch>
                </div>
            </section>

            <section v-if="canManageSettings" class="settings-section">
                <h3>{{ t('worktime', 'Pausenregelung (§4 ArbZG)') }}</h3>
                <p class="section-description">
                    {{ t('worktime', 'Mindestpause gemäß deutschem Arbeitszeitgesetz') }}
                </p>
                <div class="form-row">
                    <div class="form-group">
                        <label for="break6h">{{ t('worktime', 'Bei >6h Arbeitszeit (min)') }}</label>
                        <input id="break6h"
                            v-model.number="settings.min_break_minutes_6h"
                            type="number"
                            min="0"
                            max="120"
                            class="input-field input-small"
                            @change="saveSetting('min_break_minutes_6h')">
                    </div>
                    <div class="form-group">
                        <label for="break9h">{{ t('worktime', 'Bei >9h Arbeitszeit (min)') }}</label>
                        <input id="break9h"
                            v-model.number="settings.min_break_minutes_9h"
                            type="number"
                            min="0"
                            max="120"
                            class="input-field input-small"
                            @change="saveSetting('min_break_minutes_9h')">
                    </div>
                </div>
            </section>

            <section v-if="canManageHolidays" class="settings-section">
                <h3>{{ t('worktime', 'Feiertage generieren') }}</h3>
                <p class="section-description">
                    {{ t('worktime', 'Feiertage für ein Jahr automatisch generieren lassen.') }}
                </p>
                <div class="form-row">
                    <div class="form-group">
                        <label for="holidayYear">{{ t('worktime', 'Jahr') }}</label>
                        <input id="holidayYear"
                            v-model.number="holidayYear"
                            type="number"
                            :min="2020"
                            :max="2050"
                            class="input-field input-small">
                    </div>
                    <NcButton type="secondary" @click="generateHolidays">
                        {{ t('worktime', 'Für alle Bundesländer generieren') }}
                    </NcButton>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import { mapGetters, mapActions } from 'vuex'
import SettingsService from '../services/SettingsService.js'
import HolidayService from '../services/HolidayService.js'
import { showSuccessMessage, showErrorMessage } from '../utils/errorHandler.js'
import { getCurrentYear } from '../utils/dateUtils.js'

export default {
    name: 'SettingsView',
    components: {
        NcLoadingIcon,
        NcButton,
        NcSelect,
        NcCheckboxRadioSwitch,
    },
    data() {
        return {
            loading: false,
            settings: {},
            holidayYear: getCurrentYear() + 1,
        }
    },
    computed: {
        ...mapGetters('permissions', ['canManageSettings', 'canManageHolidays']),
        ...mapGetters('holidays', ['federalStates']),
        federalStateOptions() {
            return Object.entries(this.federalStates).map(([id, label]) => ({ id, label }))
        },
        selectedFederalState: {
            get() {
                return this.federalStateOptions.find(s => s.id === this.settings.default_federal_state) || null
            },
            set(value) {
                this.settings.default_federal_state = value?.id || 'BY'
            },
        },
    },
    created() {
        this.loadSettings()
        this.$store.dispatch('holidays/fetchFederalStates')
    },
    methods: {
        ...mapActions('holidays', ['generateAllHolidays']),
        async loadSettings() {
            this.loading = true
            try {
                const settings = await SettingsService.getAll()
                // Convert string booleans
                this.settings = {
                    ...settings,
                    require_project: settings.require_project === '1',
                    require_description: settings.require_description === '1',
                    allow_future_entries: settings.allow_future_entries === '1',
                    approval_required: settings.approval_required === '1',
                }
            } catch (error) {
                console.error('Failed to load settings:', error)
            } finally {
                this.loading = false
            }
        },
        async saveSetting(key) {
            try {
                await SettingsService.update(key, String(this.settings[key]))
                showSuccessMessage(this.t('worktime', 'Einstellung gespeichert'))
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
        async saveSettingBool(key) {
            try {
                await SettingsService.update(key, this.settings[key] ? '1' : '0')
                showSuccessMessage(this.t('worktime', 'Einstellung gespeichert'))
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
        async generateHolidays() {
            try {
                const result = await this.generateAllHolidays(this.holidayYear)
                showSuccessMessage(
                    this.t('worktime', '{count} Feiertage für {year} generiert', {
                        count: result.totalHolidays,
                        year: this.holidayYear,
                    })
                )
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
    },
}
</script>

<style scoped>
.settings-view {
    padding: 20px;
    max-width: 800px;
}

.settings-view h2 {
    margin: 0 0 20px 0;
}

.settings-section {
    margin-bottom: 32px;
    padding: 20px;
    background: var(--color-background-dark);
    border-radius: var(--border-radius-large);
}

.settings-section h3 {
    margin: 0 0 16px 0;
}

.section-description {
    margin: 0 0 16px 0;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
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
    align-items: flex-end;
    flex-wrap: wrap;
}

.input-field {
    width: 100%;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
}

.input-small {
    width: 120px;
}
</style>
