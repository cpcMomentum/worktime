<template>
    <div class="settings-view">
        <h2>{{ t('worktime', 'Einstellungen') }}</h2>

        <NcLoadingIcon v-if="loading" :size="44" />

        <div v-else class="settings-content">
            <NcSettingsSection v-if="canManageEmployees"
                :name="t('worktime', 'Mitarbeiterverwaltung')">
                <div class="section-header-actions">
                    <NcButton type="primary" @click="openNewEmployeeForm">
                        <template #icon>
                            <Plus :size="20" />
                        </template>
                        {{ t('worktime', 'Neuer Mitarbeiter') }}
                    </NcButton>
                </div>

                <EmployeeList
                    :employees="employees"
                    @edit="editEmployee"
                    @delete="handleDeleteEmployee" />

                <NcModal v-if="showEmployeeForm"
                    :name="editingEmployee ? t('worktime', 'Mitarbeiter bearbeiten') : t('worktime', 'Neuer Mitarbeiter')"
                    @close="closeEmployeeForm">
                    <EmployeeForm
                        :employee="editingEmployee"
                        @saved="onEmployeeSaved"
                        @cancel="closeEmployeeForm" />
                </NcModal>
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                :name="t('worktime', 'Berechtigungen')"
                :description="t('worktime', 'HR-Manager können Mitarbeiter verwalten und Anträge genehmigen.')">
                <div class="form-group">
                    <label>{{ t('worktime', 'HR-Manager') }}</label>
                    <NcSelect
                        v-model="selectedHrManagers"
                        :options="principalOptions"
                        :multiple="true"
                        :close-on-select="false"
                        :placeholder="t('worktime', 'Benutzer oder Gruppen auswählen')"
                        label="label"
                        @input="saveHrManagers">
                        <template #option="{ label, sublabel, type }">
                            <div class="principal-option">
                                <AccountGroup v-if="type === 'group'" :size="20" />
                                <Account v-else :size="20" />
                                <span class="principal-label">{{ label }}</span>
                                <span class="principal-sublabel">{{ sublabel }}</span>
                            </div>
                        </template>
                    </NcSelect>
                </div>
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                :name="t('worktime', 'Firmendaten')">
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
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                :name="t('worktime', 'Standardwerte')">
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
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                :name="t('worktime', 'Arbeitszeit-Regeln')">
                <div class="form-group">
                    <label for="maxDailyHours">{{ t('worktime', 'Maximale tägliche Arbeitszeit (Stunden)') }}</label>
                    <input id="maxDailyHours"
                        v-model.number="settings.max_daily_hours"
                        type="number"
                        min="1"
                        max="24"
                        step="0.5"
                        class="input-field input-small"
                        @change="saveSetting('max_daily_hours')">
                    <p class="help-text">
                        {{ t('worktime', 'Nach §3 ArbZG sind maximal 10 Stunden erlaubt (Ausnahmen möglich).') }}
                    </p>
                </div>
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
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                :name="t('worktime', 'Pausenregelung (§4 ArbZG)')"
                :description="t('worktime', 'Mindestpause gemäß deutschem Arbeitszeitgesetz')">
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
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                :name="t('worktime', 'PDF-Archivierung')"
                :description="t('worktime', 'Genehmigte Monatsberichte werden automatisch als PDF archiviert.')">
                <div class="form-group">
                    <label>{{ t('worktime', 'Archiv-Ordner') }}</label>
                    <div class="folder-picker">
                        <NcButton type="secondary" @click="openFolderPicker">
                            <template #icon>
                                <Folder :size="20" />
                            </template>
                            {{ t('worktime', 'Ordner auswählen') }}
                        </NcButton>
                        <span class="selected-path">
                            {{ settings.pdf_archive_path || t('worktime', 'Nicht konfiguriert') }}
                        </span>
                    </div>
                    <p class="help-text">
                        {{ t('worktime', 'PDFs werden in Ihrem persönlichen Ordner gespeichert. Nur Sie haben Zugriff.') }}
                    </p>
                    <p class="help-text">
                        {{ t('worktime', 'Struktur: {path}/{Jahr}/{Nachname_Vorname}/Arbeitszeitnachweis_YYYY-MM.pdf', { path: settings.pdf_archive_path || '...' }) }}
                    </p>
                </div>
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                :name="t('worktime', 'Sondertage')"
                :description="t('worktime', 'Definieren Sie, ob Heiligabend und Silvester als halbe Arbeitstage gelten.')">
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.christmas_eve_half_day"
                        @update:checked="saveSettingBool('christmas_eve_half_day')">
                        {{ t('worktime', 'Heiligabend (24.12.) als halber Arbeitstag') }}
                    </NcCheckboxRadioSwitch>
                </div>
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.new_years_eve_half_day"
                        @update:checked="saveSettingBool('new_years_eve_half_day')">
                        {{ t('worktime', 'Silvester (31.12.) als halber Arbeitstag') }}
                    </NcCheckboxRadioSwitch>
                </div>
                <p class="help-text">
                    {{ t('worktime', 'Hinweis: Änderungen wirken sich auf neu generierte Feiertage aus. Generieren Sie die Feiertage erneut, um die Änderungen anzuwenden.') }}
                </p>
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageHolidays"
                :name="t('worktime', 'Feiertage verwalten')"
                :description="t('worktime', 'Feiertage anzeigen, hinzufügen, bearbeiten und löschen.')">
                <div class="form-row holiday-filters">
                    <div class="form-group">
                        <label for="holidayYear">{{ t('worktime', 'Jahr') }}</label>
                        <input id="holidayYear"
                            v-model.number="holidayYear"
                            type="number"
                            :min="2020"
                            :max="2050"
                            class="input-field input-small"
                            @change="loadHolidays">
                    </div>
                    <div class="form-group">
                        <label for="holidayStateFilter">{{ t('worktime', 'Bundesland') }}</label>
                        <NcSelect id="holidayStateFilter"
                            v-model="selectedHolidayStateFilter"
                            :options="holidayStateFilterOptions"
                            @input="filterHolidays" />
                    </div>
                    <NcButton type="secondary" @click="generateHolidays">
                        {{ t('worktime', 'Auto-Generieren') }}
                    </NcButton>
                    <NcButton type="primary" @click="openHolidayForm(null)">
                        <template #icon>
                            <Plus :size="20" />
                        </template>
                        {{ t('worktime', 'Feiertag hinzufügen') }}
                    </NcButton>
                </div>

                <NcLoadingIcon v-if="loadingHolidays" :size="32" />

                <table v-else-if="groupedHolidays.length > 0" class="holiday-table">
                    <thead>
                        <tr>
                            <th class="col-expand"></th>
                            <th>{{ t('worktime', 'Datum') }}</th>
                            <th>{{ t('worktime', 'Name') }}</th>
                            <th>{{ t('worktime', 'Bundesländer') }}</th>
                            <th>{{ t('worktime', 'Umfang') }}</th>
                            <th>{{ t('worktime', 'Typ') }}</th>
                            <th>{{ t('worktime', 'Aktionen') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <template v-for="group in groupedHolidays">
                            <tr :key="group.key" class="holiday-row" @click="toggleGroupExpand(group.key)">
                                <td class="col-expand">
                                    <ChevronRight v-if="!expandedGroups.includes(group.key)" :size="20" />
                                    <ChevronDown v-else :size="20" />
                                </td>
                                <td>{{ formatDate(group.date) }}</td>
                                <td>{{ group.name }}</td>
                                <td>
                                    <span class="state-count">{{ group.states.length }} {{ t('worktime', 'Bundesländer') }}</span>
                                </td>
                                <td>{{ group.scope < 1.0 ? t('worktime', '½ Tag') : t('worktime', '1 Tag') }}</td>
                                <td>
                                    <span :class="['holiday-type', group.isManual ? 'manual' : 'auto']">
                                        {{ group.isManual ? t('worktime', 'Manuell') : t('worktime', 'Auto') }}
                                    </span>
                                </td>
                                <td class="actions" @click.stop>
                                    <NcButton type="tertiary"
                                        :aria-label="t('worktime', 'Bearbeiten')"
                                        @click="openHolidayGroupForm(group)">
                                        <template #icon>
                                            <Pencil :size="20" />
                                        </template>
                                    </NcButton>
                                    <NcButton type="tertiary"
                                        :aria-label="t('worktime', 'Löschen')"
                                        @click="confirmDeleteHolidayGroup(group)">
                                        <template #icon>
                                            <Delete :size="20" />
                                        </template>
                                    </NcButton>
                                </td>
                            </tr>
                            <tr v-if="expandedGroups.includes(group.key)" :key="group.key + '-details'" class="holiday-details-row">
                                <td colspan="7">
                                    <div class="state-chips">
                                        <span v-for="state in group.states" :key="state" class="state-chip">
                                            {{ federalStates[state] || state }}
                                        </span>
                                    </div>
                                </td>
                            </tr>
                        </template>
                    </tbody>
                </table>

                <NcEmptyContent v-else
                    :name="t('worktime', 'Keine Feiertage')"
                    :description="t('worktime', 'Keine Feiertage für diese Auswahl gefunden.')">
                    <template #icon>
                        <CalendarBlank :size="64" />
                    </template>
                </NcEmptyContent>

                <NcModal v-if="showHolidayForm"
                    :name="editingHoliday ? t('worktime', 'Feiertag bearbeiten') : t('worktime', 'Neuer Feiertag')"
                    @close="closeHolidayForm">
                    <div class="holiday-form-modal">
                        <h3>{{ editingHoliday ? t('worktime', 'Feiertag bearbeiten') : t('worktime', 'Neuer Feiertag') }}</h3>
                        <div class="form-group">
                            <label for="holidayDate">{{ t('worktime', 'Datum') }}</label>
                            <NcDateTimePicker id="holidayDate"
                                v-model="holidayFormData.date"
                                type="date"
                                :format="'DD.MM.YYYY'" />
                        </div>
                        <div class="form-group">
                            <label for="holidayName">{{ t('worktime', 'Name') }}</label>
                            <input id="holidayName"
                                v-model="holidayFormData.name"
                                type="text"
                                class="input-field"
                                :placeholder="t('worktime', 'z.B. Brückentag')">
                        </div>
                        <div v-if="!editingHoliday" class="form-group">
                            <label>{{ t('worktime', 'Bundesländer') }}</label>
                            <div class="state-selection">
                                <NcButton type="tertiary" @click="selectAllStates">
                                    {{ t('worktime', 'Alle auswählen') }}
                                </NcButton>
                                <NcButton type="tertiary" @click="deselectAllStates">
                                    {{ t('worktime', 'Alle abwählen') }}
                                </NcButton>
                            </div>
                            <div class="state-checkboxes">
                                <NcCheckboxRadioSwitch v-for="(label, id) in federalStates"
                                    :key="id"
                                    :checked="holidayFormData.federalStates.includes(id)"
                                    @update:checked="toggleState(id, $event)">
                                    {{ label }}
                                </NcCheckboxRadioSwitch>
                            </div>
                        </div>
                        <div v-else class="form-group">
                            <label>{{ t('worktime', 'Bundesländer') }}</label>
                            <div class="state-chips readonly">
                                <span v-for="state in holidayFormData.federalStates" :key="state" class="state-chip">
                                    {{ federalStates[state] || state }}
                                </span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label>{{ t('worktime', 'Umfang') }}</label>
                            <NcSelect
                                v-model="selectedHolidayScope"
                                :options="scopeOptions"
                                :clearable="false" />
                        </div>
                        <div class="form-actions">
                            <NcButton type="tertiary" @click="closeHolidayForm">
                                {{ t('worktime', 'Abbrechen') }}
                            </NcButton>
                            <NcButton type="primary"
                                :disabled="!isHolidayFormValid"
                                @click="saveHoliday">
                                {{ editingHoliday ? t('worktime', 'Speichern') : t('worktime', 'Erstellen') }}
                            </NcButton>
                        </div>
                    </div>
                </NcModal>

                </NcSettingsSection>
        </div>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import NcSettingsSection from '@nextcloud/vue/dist/Components/NcSettingsSection.js'
import NcDateTimePicker from '@nextcloud/vue/dist/Components/NcDateTimePicker.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import Plus from 'vue-material-design-icons/Plus.vue'
import Account from 'vue-material-design-icons/Account.vue'
import AccountGroup from 'vue-material-design-icons/AccountGroup.vue'
import Folder from 'vue-material-design-icons/Folder.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'
import Delete from 'vue-material-design-icons/Delete.vue'
import CalendarBlank from 'vue-material-design-icons/CalendarBlank.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import { getFilePickerBuilder, FilePickerType, DialogBuilder } from '@nextcloud/dialogs'
import { mapGetters, mapActions } from 'vuex'
import SettingsService from '../services/SettingsService.js'
import HolidayService from '../services/HolidayService.js'
import EmployeeForm from '../components/EmployeeForm.vue'
import EmployeeList from '../components/EmployeeList.vue'
import { showSuccessMessage, showErrorMessage } from '../utils/errorHandler.js'
import { getCurrentYear } from '../utils/dateUtils.js'

export default {
    name: 'SettingsView',
    components: {
        NcLoadingIcon,
        NcButton,
        NcSelect,
        NcCheckboxRadioSwitch,
        NcModal,
        NcSettingsSection,
        NcDateTimePicker,
        NcEmptyContent,
        Plus,
        Account,
        AccountGroup,
        Folder,
        Pencil,
        Delete,
        CalendarBlank,
        ChevronRight,
        ChevronDown,
        EmployeeForm,
        EmployeeList,
    },
    data() {
        return {
            loading: false,
            settings: {},
            holidayYear: getCurrentYear(),
            showEmployeeForm: false,
            editingEmployee: null,
            availablePrincipals: [],
            hrManagers: [],
            // Holiday management
            holidays: [],
            loadingHolidays: false,
            selectedHolidayStateFilter: null,
            showHolidayForm: false,
            editingHoliday: null,
            holidayFormData: {
                date: null,
                name: '',
                federalStates: [],
                scope: 1.0,
            },
            scopeOptions: [
                { id: 1.0, label: 'Ganzer Tag' },
                { id: 0.5, label: 'Halber Tag' },
            ],
            // Grouped holiday view
            expandedGroups: [],
        }
    },
    computed: {
        ...mapGetters('permissions', ['canManageSettings', 'canManageHolidays', 'canManageEmployees']),
        ...mapGetters('holidays', ['federalStates']),
        ...mapGetters('employees', { employees: 'employees' }),
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
        principalOptions() {
            return this.availablePrincipals.map(p => ({
                id: p.id,
                label: p.label,
                sublabel: p.sublabel,
                type: p.type,
            }))
        },
        selectedHrManagers: {
            get() {
                return this.hrManagers
                    .map(id => this.principalOptions.find(p => p.id === id))
                    .filter(p => p !== undefined)
            },
            set(value) {
                this.hrManagers = value.map(p => p.id)
            },
        },
        holidayStateFilterOptions() {
            return [
                { id: null, label: this.t('worktime', 'Alle Bundesländer') },
                ...this.federalStateOptions,
            ]
        },
        filteredHolidays() {
            if (!this.selectedHolidayStateFilter || !this.selectedHolidayStateFilter.id) {
                return this.holidays
            }
            return this.holidays.filter(h => h.federalState === this.selectedHolidayStateFilter.id)
        },
        isHolidayFormValid() {
            if (!this.holidayFormData.date || !this.holidayFormData.name.trim()) {
                return false
            }
            if (!this.editingHoliday && this.holidayFormData.federalStates.length === 0) {
                return false
            }
            return true
        },
        selectedHolidayScope: {
            get() {
                return this.scopeOptions.find(s => s.id === this.holidayFormData.scope) || this.scopeOptions[0]
            },
            set(value) {
                this.holidayFormData.scope = value?.id ?? 1.0
            },
        },
        groupedHolidays() {
            const groups = {}
            for (const holiday of this.filteredHolidays) {
                const key = `${holiday.date}_${holiday.name}`
                if (!groups[key]) {
                    groups[key] = {
                        key,
                        date: holiday.date,
                        name: holiday.name,
                        scope: holiday.scope ?? 1.0,
                        isManual: holiday.isManual,
                        states: [],
                        holidays: [],
                    }
                }
                groups[key].states.push(holiday.federalState)
                groups[key].holidays.push(holiday)
                // If any holiday in the group is manual, mark the group as manual
                if (holiday.isManual) {
                    groups[key].isManual = true
                }
            }
            return Object.values(groups).sort((a, b) => a.date.localeCompare(b.date))
        },
    },
    created() {
        this.loadSettings()
        this.$store.dispatch('holidays/fetchFederalStates')
        if (this.canManageEmployees) {
            this.$store.dispatch('employees/fetchEmployees')
        }
        if (this.canManageSettings) {
            this.loadHrManagers()
        }
        if (this.canManageHolidays) {
            this.loadHolidays()
        }
    },
    methods: {
        ...mapActions('holidays', ['generateAllHolidays']),
        ...mapActions('employees', ['deleteEmployee']),
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
                    christmas_eve_half_day: settings.christmas_eve_half_day === '1',
                    new_years_eve_half_day: settings.new_years_eve_half_day === '1',
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
                await this.loadHolidays()
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
        openNewEmployeeForm() {
            this.editingEmployee = null
            this.showEmployeeForm = true
        },
        editEmployee(employee) {
            this.editingEmployee = employee
            this.showEmployeeForm = true
        },
        closeEmployeeForm() {
            this.showEmployeeForm = false
            this.editingEmployee = null
        },
        async onEmployeeSaved() {
            this.closeEmployeeForm()
            await this.$store.dispatch('employees/fetchEmployees')
            showSuccessMessage(
                this.editingEmployee
                    ? this.t('worktime', 'Mitarbeiter aktualisiert')
                    : this.t('worktime', 'Mitarbeiter erstellt')
            )
        },
        async handleDeleteEmployee(employee) {
            try {
                await this.deleteEmployee(employee.id)
                showSuccessMessage(this.t('worktime', 'Mitarbeiter gelöscht'))
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
        async loadHrManagers() {
            try {
                const [principals, managers] = await Promise.all([
                    SettingsService.getAvailablePrincipals(),
                    SettingsService.getHrManagers(),
                ])
                this.availablePrincipals = principals
                this.hrManagers = managers
            } catch (error) {
                console.error('Failed to load HR managers:', error)
            }
        },
        async saveHrManagers() {
            try {
                await SettingsService.setHrManagers(this.hrManagers)
                showSuccessMessage(this.t('worktime', 'HR-Manager gespeichert'))
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
        async openFolderPicker() {
            try {
                const picker = getFilePickerBuilder(this.t('worktime', 'Archiv-Ordner auswählen'))
                    .setMultiSelect(false)
                    .setType(FilePickerType.Choose)
                    .allowDirectories(true)
                    .build()

                const path = await picker.pick()
                if (path) {
                    this.settings.pdf_archive_path = path
                    await this.saveSetting('pdf_archive_path')
                }
            } catch (error) {
                // User cancelled the picker - this is not an error
                if (error?.message !== 'User cancelled') {
                    console.error('Folder picker error:', error)
                }
            }
        },
        // Holiday management methods
        async loadHolidays() {
            this.loadingHolidays = true
            try {
                this.holidays = await HolidayService.getByYear(this.holidayYear)
            } catch (error) {
                console.error('Failed to load holidays:', error)
                this.holidays = []
            } finally {
                this.loadingHolidays = false
            }
        },
        filterHolidays() {
            // filteredHolidays is a computed property, so this just triggers reactivity
        },
        formatDate(dateStr) {
            if (!dateStr) return ''
            const date = new Date(dateStr)
            return date.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' })
        },
        openHolidayForm(holiday) {
            this.editingHoliday = holiday
            if (holiday) {
                this.holidayFormData = {
                    date: new Date(holiday.date),
                    name: holiday.name,
                    federalStates: [holiday.federalState],
                    scope: holiday.scope ?? 1.0,
                }
            } else {
                this.holidayFormData = {
                    date: null,
                    name: '',
                    federalStates: Object.keys(this.federalStates),
                    scope: 1.0,
                }
            }
            this.showHolidayForm = true
        },
        closeHolidayForm() {
            this.showHolidayForm = false
            this.editingHoliday = null
        },
        selectAllStates() {
            this.holidayFormData.federalStates = Object.keys(this.federalStates)
        },
        deselectAllStates() {
            this.holidayFormData.federalStates = []
        },
        toggleState(stateId, checked) {
            if (checked) {
                if (!this.holidayFormData.federalStates.includes(stateId)) {
                    this.holidayFormData.federalStates.push(stateId)
                }
            } else {
                this.holidayFormData.federalStates = this.holidayFormData.federalStates.filter(s => s !== stateId)
            }
        },
        async saveHoliday() {
            try {
                const dateStr = this.holidayFormData.date instanceof Date
                    ? this.holidayFormData.date.toISOString().split('T')[0]
                    : this.holidayFormData.date

                if (this.editingHoliday) {
                    // Check if editing a group (multiple holidays)
                    const holidayIds = this.editingHoliday.groupHolidayIds || [this.editingHoliday.id]
                    for (const id of holidayIds) {
                        await HolidayService.update(id, {
                            date: dateStr,
                            name: this.holidayFormData.name,
                            scope: this.holidayFormData.scope,
                        })
                    }
                    showSuccessMessage(
                        this.t('worktime', '{count} Feiertag(e) aktualisiert', { count: holidayIds.length })
                    )
                } else {
                    await HolidayService.create({
                        date: dateStr,
                        name: this.holidayFormData.name,
                        federalStates: this.holidayFormData.federalStates,
                        scope: this.holidayFormData.scope,
                    })
                    showSuccessMessage(this.t('worktime', 'Feiertag erstellt'))
                }
                this.closeHolidayForm()
                await this.loadHolidays()
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
        toggleGroupExpand(key) {
            const index = this.expandedGroups.indexOf(key)
            if (index === -1) {
                this.expandedGroups.push(key)
            } else {
                this.expandedGroups.splice(index, 1)
            }
        },
        openHolidayGroupForm(group) {
            // For editing a group, we edit the first holiday as representative
            // User can only change date, name, scope (applied to all holidays in group)
            const firstHoliday = group.holidays[0]
            this.editingHoliday = {
                ...firstHoliday,
                // Store all holiday IDs for bulk update
                groupHolidayIds: group.holidays.map(h => h.id),
            }
            this.holidayFormData = {
                date: new Date(firstHoliday.date),
                name: firstHoliday.name,
                federalStates: group.states,
                scope: firstHoliday.scope ?? 1.0,
            }
            this.showHolidayForm = true
        },
        async confirmDeleteHolidayGroup(group) {
            const message = this.t('worktime', 'Möchten Sie den Feiertag "{name}" ({count} Bundesländer) wirklich löschen?', {
                name: group.name,
                count: group.states.length,
            })

            const dialog = new DialogBuilder()
                .setName(this.t('worktime', 'Feiertag löschen'))
                .setText(message)
                .setButtons([
                    {
                        label: this.t('worktime', 'Abbrechen'),
                        type: 'secondary',
                        callback: () => {},
                    },
                    {
                        label: this.t('worktime', 'Löschen'),
                        type: 'error',
                        callback: async () => {
                            await this.deleteHolidayGroup(group)
                        },
                    },
                ])
                .build()

            dialog.show()
        },
        async deleteHolidayGroup(group) {
            if (!group) return
            try {
                // Delete all holidays in the group
                for (const holiday of group.holidays) {
                    await HolidayService.delete(holiday.id)
                }
                showSuccessMessage(
                    this.t('worktime', '{count} Feiertag(e) gelöscht', {
                        count: group.holidays.length,
                    })
                )
                await this.loadHolidays()
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
    padding-left: 50px;
    max-width: 800px;
}

.settings-view h2 {
    margin: 0 0 20px 0;
}

.section-header-actions {
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

.principal-option {
    display: flex;
    align-items: center;
    gap: 8px;
}

.principal-label {
    font-weight: 500;
}

.principal-sublabel {
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
}

.help-text {
    margin-top: 4px;
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.folder-picker {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.selected-path {
    font-family: monospace;
    color: var(--color-text-maxcontrast);
    padding: 4px 8px;
    background: var(--color-background-hover);
    border-radius: var(--border-radius);
}

/* Holiday management styles */
.holiday-filters {
    margin-bottom: 16px;
}

.holiday-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 16px;
}

.holiday-table th,
.holiday-table td {
    padding: 8px 12px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.holiday-table th {
    font-weight: 600;
    background: var(--color-background-hover);
}

.holiday-table td.actions {
    display: flex;
    gap: 4px;
    white-space: nowrap;
}

.holiday-type {
    display: inline-block;
    padding: 2px 8px;
    border-radius: var(--border-radius);
    font-size: 0.85em;
}

.holiday-type.auto {
    background: var(--color-background-dark);
    color: var(--color-text-maxcontrast);
}

.holiday-type.manual {
    background: var(--color-primary-element-light);
    color: var(--color-primary-element);
}

.holiday-form-modal {
    padding: 20px;
    min-width: 400px;
}

.holiday-form-modal h3 {
    margin-top: 0;
    margin-bottom: 20px;
}

.state-selection {
    display: flex;
    gap: 8px;
    margin-bottom: 8px;
}

.state-checkboxes {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    gap: 4px;
    max-height: 200px;
    overflow-y: auto;
    padding: 8px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
}

.readonly-value {
    display: block;
    padding: 8px;
    background: var(--color-background-hover);
    border-radius: var(--border-radius);
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 20px;
    padding-top: 16px;
    border-top: 1px solid var(--color-border);
}

/* Grouped holiday view styles */
.col-expand {
    width: 32px;
    cursor: pointer;
}

.holiday-row {
    cursor: pointer;
}

.holiday-row:hover {
    background: var(--color-background-hover);
}

.holiday-details-row {
    background: var(--color-background-dark);
}

.holiday-details-row td {
    padding: 12px;
}

.state-count {
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
}

.state-chips {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
}

.state-chips.readonly {
    padding: 8px;
    background: var(--color-background-hover);
    border-radius: var(--border-radius);
}

.state-chip {
    display: inline-block;
    padding: 4px 10px;
    background: var(--color-primary-element-light);
    color: var(--color-primary-element);
    border-radius: 12px;
    font-size: 0.85em;
}
</style>
