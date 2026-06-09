<template>
    <div class="settings-view">
        <h2>{{ t('worktime', 'Einstellungen') }}</h2>

        <NcLoadingIcon v-if="loading" :size="44" />

        <div v-else class="settings-layout">
            <nav class="settings-nav" :aria-label="t('worktime', 'Einstellungs-Navigation')">
                <template v-for="group in navGroups" :key="group.label">
                    <div v-if="group.items.length" class="settings-nav-group">
                        {{ group.label }}
                    </div>
                    <button v-for="item in group.items"
                        :key="item.id"
                        class="settings-nav-item"
                        :class="{ active: activeSection === item.id }"
                        @click="setActiveSection(item.id)">
                        <component :is="item.icon" :size="18" />
                        {{ item.label }}
                    </button>
                </template>
            </nav>

            <div class="settings-content">

            <NcSettingsSection v-if="canManageEmployees"
                v-show="activeSection === 'sec-mitarbeiter'"
                id="sec-mitarbeiter" :name="t('worktime', 'Mitarbeiter')">
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

            <NcSettingsSection v-if="canManageProjects"
                v-show="activeSection === 'sec-projekte'"
                id="sec-projekte" :name="t('worktime', 'Projekte')">
                <div class="section-header-actions">
                    <NcButton type="primary" @click="openNewProjectForm">
                        <template #icon>
                            <Plus :size="20" />
                        </template>
                        {{ t('worktime', 'Neues Projekt') }}
                    </NcButton>
                </div>

                <ProjectList
                    :projects="allProjects"
                    @edit="editProject"
                    @delete="handleDeleteProject" />

                <NcModal v-if="showProjectForm"
                    :name="editingProject ? t('worktime', 'Projekt bearbeiten') : t('worktime', 'Neues Projekt')"
                    @close="closeProjectForm">
                    <ProjectForm
                        :project="editingProject"
                        @saved="onProjectSaved"
                        @cancel="closeProjectForm" />
                </NcModal>
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                v-show="activeSection === 'sec-berechtigungen'"
                id="sec-berechtigungen" :name="t('worktime', 'Berechtigungen')">
                <div class="form-group">
                    <label>{{ t('worktime', 'HR-Manager') }} <InfoIcon>{{ t('worktime', 'Admin: Volle Rechte (automatisch). HR-Manager: Mitarbeiter verwalten und Anträge genehmigen (manuell zuweisen). Vorgesetzter: Genehmigt Zeiten seines Teams (automatisch). Mitarbeiter: Eigene Zeiten erfassen (automatisch).') }}</InfoIcon></label>
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
                v-show="activeSection === 'sec-firmendaten'"
                id="sec-firmendaten" :name="t('worktime', 'Firmendaten')"
                :description="t('worktime', 'Stammdaten und Standardwerte, die für neue Mitarbeiter vorausgewählt werden.')">
                <div class="form-group">
                    <label for="companyName">{{ t('worktime', 'Firmenname') }}</label>
                    <input id="companyName"
                        v-model="settings.company_name"
                        type="text"
                        class="input-field"
                        @change="saveSetting('company_name')">
                </div>
                <div class="form-group">
                    <label for="defaultState">{{ t('worktime', 'Standard-Bundesland') }} <InfoIcon>{{ t('worktime', 'Neue Mitarbeiter bekommen dieses Bundesland automatisch zugewiesen. Jeder Mitarbeiter kann ein eigenes Bundesland haben — das bestimmt, welche Feiertage für ihn gelten.') }}</InfoIcon></label>
                    <NcSelect id="defaultState"
                        v-model="selectedFederalState"
                        :options="federalStateOptions"
                        @input="saveSetting('default_federal_state')" />
                </div>
                <div class="form-row">
                    <div class="form-group">
                        <label for="weeklyHours">{{ t('worktime', 'Standard-Wochenstunden') }} <InfoIcon>{{ t('worktime', 'Neue Mitarbeiter bekommen diese Wochenstunden voreingestellt. Sie können im Mitarbeiterprofil individuell angepasst werden.') }}</InfoIcon></label>
                        <input id="weeklyHours"
                            v-model.number="settings.default_weekly_hours"
                            type="number"
                            min="0"
                            max="60"
                            class="input-field input-small"
                            @change="saveSetting('default_weekly_hours')">
                    </div>
                    <div class="form-group">
                        <label for="vacationDays">{{ t('worktime', 'Standard-Urlaubstage') }} <InfoIcon>{{ t('worktime', 'Neue Mitarbeiter bekommen diesen Urlaubsanspruch voreingestellt. Der tatsächliche Anspruch wird im Mitarbeiterprofil festgelegt.') }}</InfoIcon></label>
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
                v-show="activeSection === 'sec-arbeitszeit'"
                id="sec-arbeitszeit" :name="t('worktime', 'Arbeitszeit-Regeln')">
                <div class="form-group">
                    <label for="maxDailyHours">{{ t('worktime', 'Maximale tägliche Arbeitszeit (Stunden)') }} <InfoIcon>{{ t('worktime', 'Wenn ein Zeiteintrag diesen Wert überschreitet, wird eine Warnung angezeigt. Nach §3 ArbZG sind maximal 10 Stunden erlaubt.') }}</InfoIcon></label>
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
                        {{ t('worktime', 'Projekt erforderlich') }} <InfoIcon>{{ t('worktime', 'Wenn aktiv, muss bei jedem Zeiteintrag ein Projekt ausgewählt werden — sonst lässt sich der Eintrag nicht speichern.') }}</InfoIcon>
                    </NcCheckboxRadioSwitch>
                </div>
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.require_description"
                        @update:checked="saveSettingBool('require_description')">
                        {{ t('worktime', 'Beschreibung erforderlich') }} <InfoIcon>{{ t('worktime', 'Wenn aktiv, muss bei jedem Zeiteintrag eine Beschreibung eingetragen werden — sonst lässt sich der Eintrag nicht speichern.') }}</InfoIcon>
                    </NcCheckboxRadioSwitch>
                </div>
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.allow_future_entries"
                        @update:checked="saveSettingBool('allow_future_entries')">
                        {{ t('worktime', 'Zukünftige Einträge erlauben') }} <InfoIcon>{{ t('worktime', 'Wenn deaktiviert, können Mitarbeiter nur für heute oder vergangene Tage Zeiten eintragen — nicht im Voraus.') }}</InfoIcon>
                    </NcCheckboxRadioSwitch>
                </div>
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                v-show="activeSection === 'sec-genehmigung'"
                id="sec-genehmigung" :name="t('worktime', 'Genehmigung')"
                :description="t('worktime', 'Steuert firmenweit, ob erfasste Zeiten durch Vorgesetzte freigegeben werden müssen. Diese Einstellung betrifft alle Mitarbeitenden.')">
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.approval_required"
                        @update:checked="confirmApprovalToggle">
                        {{ t('worktime', 'Genehmigung erforderlich') }} <InfoIcon>{{ t('worktime', 'Wenn aktiv, durchlaufen Zeiteinträge einen Freigabe-Workflow: Mitarbeitende reichen den Monat ein, Vorgesetzte genehmigen ihn. Ist die Option deaktiviert, entfällt dieser Schritt und die erfassten Zeiten gelten direkt. Die Stundenberechnung ist in beiden Fällen gleich.') }}</InfoIcon>
                    </NcCheckboxRadioSwitch>
                </div>
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageSettings"
                v-show="activeSection === 'sec-pausen'"
                id="sec-pausen" :name="t('worktime', 'Pausenregelung (§4 ArbZG)')"
                :description="t('worktime', 'Mindestpause gemäß deutschem Arbeitszeitgesetz')">
                <div class="form-row">
                    <div class="form-group">
                        <label for="break6h">{{ t('worktime', 'Bei >6h Arbeitszeit (min)') }} <InfoIcon>{{ t('worktime', 'Gesetzliche Mindestpause bei mehr als 6 Stunden Arbeitszeit. Wird beim Anlegen eines Zeiteintrags automatisch als Vorschlag eingetragen.') }}</InfoIcon></label>
                        <input id="break6h"
                            v-model.number="settings.min_break_minutes_6h"
                            type="number"
                            min="0"
                            max="120"
                            class="input-field input-small"
                            @change="saveSetting('min_break_minutes_6h')">
                    </div>
                    <div class="form-group">
                        <label for="break9h">{{ t('worktime', 'Bei >9h Arbeitszeit (min)') }} <InfoIcon>{{ t('worktime', 'Gesetzliche Mindestpause bei mehr als 9 Stunden Arbeitszeit. Wird beim Anlegen eines Zeiteintrags automatisch als Vorschlag eingetragen.') }}</InfoIcon></label>
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
                v-show="activeSection === 'sec-pdf'"
                id="sec-pdf" :name="t('worktime', 'PDF-Archiv')"
                :description="t('worktime', 'Genehmigte Monatsberichte werden automatisch als PDF archiviert.')">
                <div class="form-group">
                    <label>{{ t('worktime', 'Archiv-Ordner') }} <InfoIcon>{{ t('worktime', 'Wenn ein Monat genehmigt wird, speichert WorkTime automatisch einen PDF-Bericht in diesem Ordner. Der Ordner liegt in Ihrem persönlichen Speicher — nur Sie als Admin haben Zugriff. Die automatische Archivierung greift nur bei aktivierter Genehmigung; ist sie deaktiviert, nutzen Sie den PDF-Export in der Monatsübersicht.') }}</InfoIcon></label>
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
                v-show="activeSection === 'sec-sondertage'"
                id="sec-sondertage" :name="t('worktime', 'Sondertage')"
                :description="t('worktime', 'Definieren Sie, ob Heiligabend und Silvester als halbe Arbeitstage gelten.')">
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.christmas_eve_half_day"
                        @update:checked="saveSettingBool('christmas_eve_half_day')">
                        {{ t('worktime', 'Heiligabend (24.12.) als halber Arbeitstag') }} <InfoIcon>{{ t('worktime', 'Wenn aktiviert, wird das Tagessoll am 24.12. halbiert. Beispiel: Bei 8 Std./Tag werden nur 4 Std. als Soll angerechnet.') }}</InfoIcon>
                    </NcCheckboxRadioSwitch>
                </div>
                <div class="form-group">
                    <NcCheckboxRadioSwitch :checked.sync="settings.new_years_eve_half_day"
                        @update:checked="saveSettingBool('new_years_eve_half_day')">
                        {{ t('worktime', 'Silvester (31.12.) als halber Arbeitstag') }} <InfoIcon>{{ t('worktime', 'Wenn aktiviert, wird das Tagessoll am 31.12. halbiert. Beispiel: Bei 8 Std./Tag werden nur 4 Std. als Soll angerechnet.') }}</InfoIcon>
                    </NcCheckboxRadioSwitch>
                </div>
                <p class="help-text">
                    {{ t('worktime', 'Hinweis: Änderungen wirken sich auf neu generierte Feiertage aus. Generieren Sie die Feiertage erneut, um die Änderungen anzuwenden.') }}
                </p>
            </NcSettingsSection>

            <NcSettingsSection v-if="canManageHolidays"
                v-show="activeSection === 'sec-feiertage'"
                id="sec-feiertage" :name="t('worktime', 'Feiertage verwalten')"
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
                                            <Close :size="20" />
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

            <NcSettingsSection v-if="canManageEmployees"
                v-show="activeSection === 'sec-jahresuebertrag'"
                id="sec-jahresuebertrag" :name="t('worktime', 'Jahresübertrag')"
                :description="t('worktime', 'Überstunden und Resturlaub aus dem Vorjahr händisch übertragen. Durchgeführte Überträge sind verbindlich und unveränderbar.')">
                <div class="form-row">
                    <div class="form-group">
                        <select v-model.number="carryoverYear"
                            class="input-field"
                            @change="loadCarryovers">
                            <option v-for="y in carryoverYearOptions" :key="y" :value="y">
                                {{ y - 1 }} → {{ y }}
                            </option>
                        </select>
                    </div>
                    <div v-if="carryoverSourceYearStatus" class="form-group carryover-year-status">
                        <span v-if="carryoverSourceYearStatus === 'closed'" class="year-status year-status--closed">
                            ✓ {{ t('worktime', 'Alle Monate {year} genehmigt', { year: carryoverYear - 1 }) }}
                        </span>
                        <span v-else-if="carryoverSourceYearStatus === 'open'" class="year-status year-status--open">
                            ⚠ {{ t('worktime', '{year}: Noch offene Monate', { year: carryoverYear - 1 }) }}
                        </span>
                    </div>
                </div>
                <table v-if="carryoverEmployees.length > 0" class="carryover-table">
                    <thead>
                        <tr>
                            <th>{{ t('worktime', 'Mitarbeiter') }}</th>
                            <th>{{ t('worktime', 'Überstunden') }}<br>{{ t('worktime', 'Ist') }}</th>
                            <th>{{ t('worktime', 'Überstunden') }}<br>{{ t('worktime', 'Übertrag') }}</th>
                            <th>{{ t('worktime', 'Resturlaub') }}<br>{{ t('worktime', 'Ist') }}</th>
                            <th>{{ t('worktime', 'Resturlaub') }}<br>{{ t('worktime', 'Übertrag') }}</th>
                            <th>{{ t('worktime', 'Bemerkung') }}</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="emp in carryoverEmployees" :key="emp.employeeId"
                            :class="{ 'carryover-row--locked': emp.isLocked }">
                            <td>{{ emp.fullName }}</td>
                            <td class="text-right carryover-actual">
                                <span v-if="emp.wasActive" :class="emp.actualOvertimeHours >= 0 ? 'value-positive' : 'value-negative'">
                                    {{ formatHours(emp.actualOvertimeHours) }}
                                </span>
                                <span v-else class="value-na">–</span>
                            </td>
                            <td class="text-right">
                                <input v-if="!emp.isLocked"
                                    v-model.number="emp.overtimeHours"
                                    type="number"
                                    step="0.5"
                                    class="input-field input-small carryover-input"
                                    @change="autoSaveCarryover(emp)">
                                <span v-else class="carryover-locked-value">{{ formatHours(emp.overtimeHours) }}</span>
                            </td>
                            <td class="text-right carryover-actual">
                                <span v-if="emp.wasActive">{{ emp.actualVacationRemaining }}</span>
                                <span v-else class="value-na">–</span>
                            </td>
                            <td class="text-right">
                                <input v-if="!emp.isLocked"
                                    v-model.number="emp.vacationDays"
                                    type="number"
                                    step="0.5"
                                    min="0"
                                    class="input-field input-small carryover-input"
                                    @change="autoSaveCarryover(emp)">
                                <span v-else class="carryover-locked-value">{{ emp.vacationDays }}</span>
                            </td>
                            <td class="carryover-note-cell">
                                <textarea v-if="!emp.isLocked"
                                    v-model="emp.note"
                                    class="input-field carryover-note"
                                    rows="1"
                                    @input="resizeTextarea($event)"
                                    @change="autoSaveCarryover(emp)"></textarea>
                                <span v-else class="carryover-locked-note">{{ emp.note || '–' }}</span>
                            </td>
                            <td class="carryover-actions">
                                <NcButton v-if="emp.hasValues && !emp.isLocked"
                                    type="primary"
                                    :aria-label="t('worktime', 'Übertrag durchführen')"
                                    @click="lockCarryover(emp)">
                                    {{ t('worktime', 'Übertrag durchführen') }}
                                </NcButton>
                                <span v-else-if="emp.isLocked" class="carryover-locked-label">
                                    🔒 {{ t('worktime', 'Durchgeführt') }}
                                    <NcButton type="tertiary"
                                        :aria-label="t('worktime', 'Korrektur')"
                                        @click="openCancelModal(emp)">
                                        {{ t('worktime', 'Korrektur') }}
                                    </NcButton>
                                </span>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <!-- Cancel/Correction Modal -->
                <NcModal v-if="showCancelModal"
                    :name="t('worktime', 'Übertrag korrigieren')"
                    @close="closeCancelModal">
                    <div class="cancel-modal">
                        <h3>{{ t('worktime', 'Übertrag korrigieren für {name}', { name: cancellingEmployee?.fullName }) }}</h3>
                        <p class="cancel-modal__hint">
                            {{ t('worktime', 'Der bestehende Übertrag wird storniert und durch die neuen Werte ersetzt. Beide Einträge bleiben im Audit-Log erhalten.') }}
                        </p>
                        <div class="form-group">
                            <label>{{ t('worktime', 'Neue Überstunden (Std.)') }}</label>
                            <input v-model.number="cancelForm.overtimeHours"
                                type="number"
                                step="0.5"
                                class="input-field input-small">
                        </div>
                        <div class="form-group">
                            <label>{{ t('worktime', 'Neuer Resturlaub (Tage)') }}</label>
                            <input v-model.number="cancelForm.vacationDays"
                                type="number"
                                step="0.5"
                                min="0"
                                class="input-field input-small">
                        </div>
                        <div class="form-group">
                            <label>{{ t('worktime', 'Begründung (Pflicht)') }}</label>
                            <input v-model="cancelForm.reason"
                                type="text"
                                :placeholder="t('worktime', 'Grund für die Korrektur')"
                                class="input-field"
                                required>
                        </div>
                        <div class="form-actions">
                            <NcButton type="tertiary" @click="closeCancelModal">
                                {{ t('worktime', 'Abbrechen') }}
                            </NcButton>
                            <NcButton type="primary"
                                :disabled="!cancelForm.reason.trim()"
                                @click="submitCancel">
                                {{ t('worktime', 'Stornieren & Ersetzen') }}
                            </NcButton>
                        </div>
                    </div>
                </NcModal>
            </NcSettingsSection>

            </div>
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
import Close from 'vue-material-design-icons/Close.vue'
import CalendarBlank from 'vue-material-design-icons/CalendarBlank.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import ChevronDown from 'vue-material-design-icons/ChevronDown.vue'
import KeyVariant from 'vue-material-design-icons/KeyVariant.vue'
import OfficeBuilding from 'vue-material-design-icons/OfficeBuilding.vue'
import ClockCheckOutline from 'vue-material-design-icons/ClockCheckOutline.vue'
import CheckDecagram from 'vue-material-design-icons/CheckDecagram.vue'
import CoffeeOutline from 'vue-material-design-icons/CoffeeOutline.vue'
import FilePdfBox from 'vue-material-design-icons/FilePdfBox.vue'
import StarOutline from 'vue-material-design-icons/StarOutline.vue'
import CalendarStar from 'vue-material-design-icons/CalendarStar.vue'
import SwapHorizontalBold from 'vue-material-design-icons/SwapHorizontalBold.vue'
import { getFilePickerBuilder, FilePickerType, DialogBuilder } from '@nextcloud/dialogs'
import { mapGetters, mapActions } from 'vuex'
import SettingsService from '../services/SettingsService.js'
import HolidayService from '../services/HolidayService.js'
import EmployeeForm from '../components/EmployeeForm.vue'
import EmployeeList from '../components/EmployeeList.vue'
import ProjectForm from '../components/ProjectForm.vue'
import ProjectList from '../components/ProjectList.vue'
import { showSuccessMessage, showErrorMessage } from '../utils/errorHandler.js'
import { getCurrentYear, getLocale } from '../utils/dateUtils.js'
import YearlyCarryoverService from '../services/YearlyCarryoverService.js'
import ReportService from '../services/ReportService.js'
import InfoIcon from '../components/InfoIcon.vue'

function round2(value) {
    return Math.round(value * 100) / 100
}

export default {
    name: 'SettingsView',
    components: {
        InfoIcon,
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
        Close,
        CalendarBlank,
        ChevronRight,
        ChevronDown,
        KeyVariant,
        OfficeBuilding,
        ClockCheckOutline,
        CheckDecagram,
        CoffeeOutline,
        FilePdfBox,
        StarOutline,
        CalendarStar,
        SwapHorizontalBold,
        EmployeeForm,
        EmployeeList,
        ProjectForm,
        ProjectList,
    },
    data() {
        return {
            loading: false,
            settings: {},
            activeSection: null,
            holidayYear: getCurrentYear(),
            showEmployeeForm: false,
            editingEmployee: null,
            showProjectForm: false,
            editingProject: null,
            availablePrincipals: [],
            hrManagers: [],
            previousHrManagers: [],
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
                { id: 1.0, label: this.t('worktime', 'Ganzer Tag') },
                { id: 0.5, label: this.t('worktime', 'Halber Tag') },
            ],
            // Grouped holiday view
            expandedGroups: [],
            // Yearly carryover
            carryoverYear: getCurrentYear(),
            carryoverEmployees: [],
            carryoverSourceYearStatus: null,
            showCancelModal: false,
            cancellingEmployee: null,
            cancelForm: {
                overtimeHours: 0,
                vacationDays: 0,
                reason: '',
            },
        }
    },
    computed: {
        ...mapGetters('permissions', ['canManageSettings', 'canManageHolidays', 'canManageEmployees', 'canManageProjects']),
        ...mapGetters('holidays', ['federalStates']),
        ...mapGetters('employees', { employees: 'employees' }),
        ...mapGetters('projects', { allProjects: 'projects' }),
        carryoverYearOptions() {
            const current = getCurrentYear()
            const years = []
            for (let y = current - 3; y <= current + 1; y++) {
                years.push(y)
            }
            return years
        },
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
        navGroups() {
            const group = (label, items) => ({ label, items: items.filter(i => i.visible) })
            return [
                group(this.t('worktime', 'Team'), [
                    { id: 'sec-mitarbeiter', label: this.t('worktime', 'Mitarbeiter'), icon: 'AccountGroup', visible: this.canManageEmployees },
                    { id: 'sec-projekte', label: this.t('worktime', 'Projekte'), icon: 'Folder', visible: this.canManageProjects },
                    { id: 'sec-berechtigungen', label: this.t('worktime', 'Berechtigungen'), icon: 'KeyVariant', visible: this.canManageSettings },
                ]),
                group(this.t('worktime', 'Firma'), [
                    { id: 'sec-firmendaten', label: this.t('worktime', 'Firmendaten'), icon: 'OfficeBuilding', visible: this.canManageSettings },
                    { id: 'sec-arbeitszeit', label: this.t('worktime', 'Arbeitszeit-Regeln'), icon: 'ClockCheckOutline', visible: this.canManageSettings },
                ]),
                group(this.t('worktime', 'Abläufe'), [
                    { id: 'sec-genehmigung', label: this.t('worktime', 'Genehmigung'), icon: 'CheckDecagram', visible: this.canManageSettings },
                    { id: 'sec-pausen', label: this.t('worktime', 'Pausenregelung'), icon: 'CoffeeOutline', visible: this.canManageSettings },
                    { id: 'sec-pdf', label: this.t('worktime', 'PDF-Archiv'), icon: 'FilePdfBox', visible: this.canManageSettings },
                ]),
                group(this.t('worktime', 'Kalender'), [
                    { id: 'sec-sondertage', label: this.t('worktime', 'Sondertage'), icon: 'StarOutline', visible: this.canManageSettings },
                    { id: 'sec-feiertage', label: this.t('worktime', 'Feiertage'), icon: 'CalendarStar', visible: this.canManageHolidays },
                    { id: 'sec-jahresuebertrag', label: this.t('worktime', 'Jahresübertrag'), icon: 'SwapHorizontalBold', visible: this.canManageEmployees },
                ]),
            ]
        },
        availableSectionIds() {
            return this.navGroups.flatMap(g => g.items.map(i => i.id))
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
        if (this.canManageProjects) {
            this.fetchProjects(true)
        }
        if (this.canManageEmployees) {
            this.loadCarryovers()
        }
        this.initActiveSection()
    },
    watch: {
        availableSectionIds: {
            immediate: false,
            handler(ids) {
                if (!this.activeSection || !ids.includes(this.activeSection)) {
                    this.activeSection = ids[0] || null
                }
            },
        },
    },
    methods: {
        ...mapActions('holidays', ['generateAllHolidays']),
        ...mapActions('employees', ['deleteEmployee']),
        ...mapActions('projects', ['fetchProjects', 'deleteProject']),
        setActiveSection(id) {
            this.activeSection = id
            if (typeof window !== 'undefined' && window.history?.replaceState) {
                const target = '#/settings?sec=' + encodeURIComponent(id)
                if (window.location.hash !== target) {
                    window.history.replaceState(null, '', target)
                }
            }
        },
        initActiveSection() {
            const hash = window.location.hash || ''
            const match = hash.match(/sec=([^&]+)/)
            const fromUrl = match ? decodeURIComponent(match[1]) : null
            const ids = this.availableSectionIds
            if (fromUrl && ids.includes(fromUrl)) {
                this.activeSection = fromUrl
            } else if (ids.length) {
                this.activeSection = ids[0]
            }
        },
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
        confirmApprovalToggle(newValue) {
            const title = newValue
                ? this.t('worktime', 'Genehmigung aktivieren')
                : this.t('worktime', 'Genehmigung deaktivieren')
            const message = newValue
                ? this.t('worktime', 'Ab jetzt müssen Zeiten eingereicht und durch Vorgesetzte freigegeben werden.')
                : this.t('worktime', 'Der Freigabe-Schritt entfällt für alle Mitarbeitenden. Erfasste Zeiten gelten dann direkt. Bereits genehmigte Einträge bleiben gesperrt und können im Aus-Modus nicht mehr aufgemacht werden.')

            const dialog = new DialogBuilder()
                .setName(title)
                .setText(message)
                .setButtons([
                    {
                        label: this.t('worktime', 'Abbrechen'),
                        type: 'secondary',
                        callback: () => {
                            this.settings.approval_required = !newValue
                        },
                    },
                    {
                        label: this.t('worktime', 'Fortfahren'),
                        type: 'primary',
                        callback: () => {
                            this.saveSettingBool('approval_required')
                        },
                    },
                ])
                .build()

            dialog.show()
        },
        generateHolidays() {
            const dialog = new DialogBuilder()
                .setName(this.t('worktime', 'Feiertage neu erstellen'))
                .setText(this.t('worktime', 'Die automatisch erzeugten Feiertage für {year} werden für alle Bundesländer neu erstellt. Manuell angelegte Feiertage bleiben erhalten.', { year: this.holidayYear }))
                .setButtons([
                    {
                        label: this.t('worktime', 'Abbrechen'),
                        type: 'secondary',
                        callback: () => {},
                    },
                    {
                        label: this.t('worktime', 'Fortfahren'),
                        type: 'primary',
                        callback: () => {
                            this.runGenerateHolidays()
                        },
                    },
                ])
                .build()

            dialog.show()
        },
        async runGenerateHolidays() {
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
            const wasEditing = !!this.editingEmployee
            this.closeEmployeeForm()
            await this.$store.dispatch('employees/fetchEmployees')
            await this.$store.dispatch('permissions/fetchPermissions')
            showSuccessMessage(
                wasEditing
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
        openNewProjectForm() {
            this.editingProject = null
            this.showProjectForm = true
        },
        editProject(project) {
            this.editingProject = project
            this.showProjectForm = true
        },
        closeProjectForm() {
            this.showProjectForm = false
            this.editingProject = null
        },
        async onProjectSaved() {
            this.closeProjectForm()
            await this.fetchProjects(true)
        },
        async handleDeleteProject(project) {
            try {
                await this.deleteProject(project.id)
                showSuccessMessage(this.t('worktime', 'Projekt gelöscht'))
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
                this.previousHrManagers = [...managers]
            } catch (error) {
                console.error('Failed to load HR managers:', error)
            }
        },
        saveHrManagers() {
            const removed = this.previousHrManagers.filter(id => !this.hrManagers.includes(id))
            if (removed.length === 0) {
                this.persistHrManagers()
                return
            }

            const names = removed
                .map(id => this.principalOptions.find(p => p.id === id)?.label || id)
                .join(', ')

            const text = removed.length === 1
                ? this.t('worktime', '{names} verliert damit die HR-Manager-Rechte (Mitarbeiter verwalten, Zeiten genehmigen). Fortfahren?', { names })
                : this.t('worktime', '{names} verlieren damit die HR-Manager-Rechte (Mitarbeiter verwalten, Zeiten genehmigen). Fortfahren?', { names })

            const dialog = new DialogBuilder()
                .setName(this.t('worktime', 'HR-Manager entfernen'))
                .setText(text)
                .setButtons([
                    {
                        label: this.t('worktime', 'Abbrechen'),
                        type: 'secondary',
                        callback: () => {
                            this.hrManagers = [...this.previousHrManagers]
                        },
                    },
                    {
                        label: this.t('worktime', 'Entfernen'),
                        type: 'error',
                        callback: () => {
                            this.persistHrManagers()
                        },
                    },
                ])
                .build()

            dialog.show()
        },
        async persistHrManagers() {
            try {
                await SettingsService.setHrManagers(this.hrManagers)
                this.previousHrManagers = [...this.hrManagers]
                showSuccessMessage(this.t('worktime', 'HR-Manager gespeichert'))
            } catch (error) {
                showErrorMessage(error.message)
                this.hrManagers = [...this.previousHrManagers]
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
            return date.toLocaleDateString(getLocale(), { day: '2-digit', month: '2-digit', year: 'numeric' })
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

        // Yearly Carryover
        async loadCarryovers() {
            try {
                const sourceYear = this.carryoverYear - 1
                const [carryovers, teamYearData] = await Promise.all([
                    YearlyCarryoverService.getByYear(this.carryoverYear),
                    ReportService.getTeamYear(sourceYear),
                ])

                const carryoverMap = {}
                ;(carryovers || []).forEach(c => { carryoverMap[c.employeeId] = c })

                // wasActive: must have schedule in source year AND real time entries
                // Schedule check comes from backend (wasActiveInSourceYear)
                // Real data check: at least one month with submitted/approved/rejected status
                const scheduleMap = {}
                ;(carryovers || []).forEach(c => { scheduleMap[c.employeeId] = c.wasActiveInSourceYear || false })

                const realDataMap = {}
                ;(teamYearData || []).forEach(r => {
                    const hasRealData = r.months?.some(m =>
                        m.status === 'submitted' || m.status === 'approved' || m.status === 'rejected'
                    ) || false
                    realDataMap[r.employee.id] = hasRealData
                    // If has real data, also counts as having schedule
                    if (hasRealData && !(r.employee.id in scheduleMap)) {
                        scheduleMap[r.employee.id] = true
                    }
                })

                const activityMap = {}
                for (const empId of Object.keys({ ...scheduleMap, ...realDataMap })) {
                    activityMap[empId] = (scheduleMap[empId] || false) && (realDataMap[empId] || false)
                }

                // Build actuals from team-year report
                // totalOvertimeMinutes includes carryover — subtract for pure year value
                const actualsMap = {}
                ;(teamYearData || []).forEach(r => {
                    const pureOvertimeMinutes = (r.totalOvertimeMinutes || 0) - (r.carryoverMinutes || 0)
                    actualsMap[r.employee.id] = {
                        overtimeHours: round2(pureOvertimeMinutes / 60),
                        vacationRemaining: r.vacationStats?.remaining ?? null,
                    }
                })

                // Year closed status — only for employees with real data
                let allClosed = true
                let hasAnyRealData = false
                ;(teamYearData || []).forEach(r => {
                    if (realDataMap[r.employee.id]) {
                        hasAnyRealData = true
                        r.months?.forEach(m => {
                            if (m.overtimeMinutes !== null && m.status !== 'approved') {
                                allClosed = false
                            }
                        })
                    }
                })
                this.carryoverSourceYearStatus = hasAnyRealData ? (allClosed ? 'closed' : 'open') : null

                this.carryoverEmployees = this.employees.map(emp => {
                    const existing = carryoverMap[emp.id]
                    const wasActive = activityMap[emp.id] || false
                    const actuals = actualsMap[emp.id] || {}
                    const overtimeHours = existing ? existing.overtimeHours : 0
                    const vacationDays = existing ? existing.vacationDays : 0
                    const note = existing ? (existing.note || '') : ''
                    return {
                        employeeId: emp.id,
                        carryoverId: existing ? existing.id : null,
                        fullName: `${emp.firstName} ${emp.lastName}`,
                        overtimeHours,
                        vacationDays,
                        note,
                        isLocked: existing ? existing.isLocked : false,
                        wasActive,
                        actualOvertimeHours: wasActive ? (actuals.overtimeHours ?? null) : null,
                        actualVacationRemaining: wasActive ? (actuals.vacationRemaining ?? null) : null,
                        hasValues: !!(existing && (existing.overtimeMinutes !== 0 || existing.vacationDays !== 0 || existing.note)),
                    }
                })
            } catch (error) {
                console.error('Failed to load carryovers:', error)
            }
        },
        async autoSaveCarryover(emp) {
            try {
                const result = await YearlyCarryoverService.upsert(
                    emp.employeeId,
                    this.carryoverYear,
                    Math.round((emp.overtimeHours || 0) * 60),
                    emp.vacationDays || 0,
                    emp.note || null,
                )
                emp.carryoverId = result.id
                emp.hasValues = !!(result.overtimeMinutes !== 0 || result.vacationDays !== 0 || result.note)
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
        async lockCarryover(emp) {
            if (!emp.carryoverId) return
            try {
                await YearlyCarryoverService.lock(emp.carryoverId)
                emp.isLocked = true
                showSuccessMessage(this.t('worktime', 'Übertrag durchgeführt'))
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
        openCancelModal(emp) {
            this.cancellingEmployee = emp
            this.cancelForm = {
                overtimeHours: emp.overtimeHours,
                vacationDays: emp.vacationDays,
                reason: '',
            }
            this.showCancelModal = true
        },
        closeCancelModal() {
            this.showCancelModal = false
            this.cancellingEmployee = null
        },
        async submitCancel() {
            if (!this.cancellingEmployee?.carryoverId) return
            try {
                await YearlyCarryoverService.cancel(
                    this.cancellingEmployee.carryoverId,
                    Math.round(this.cancelForm.overtimeHours * 60),
                    this.cancelForm.vacationDays,
                    this.cancelForm.reason,
                )
                showSuccessMessage(this.t('worktime', 'Übertrag korrigiert'))
                this.closeCancelModal()
                await this.loadCarryovers()
            } catch (error) {
                showErrorMessage(error.message)
            }
        },
        resizeTextarea(event) {
            const el = event.target
            el.style.height = 'auto'
            el.style.height = el.scrollHeight + 'px'
        },
        formatHours(value) {
            if (value === null || value === undefined) return '–'
            const sign = value >= 0 ? '+' : ''
            return `${sign}${value.toFixed(1)}`
        },
    },
}
</script>

<style scoped>
.settings-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1100px;
}

.settings-view h2 {
    margin: 0 0 20px 0;
}

.settings-layout {
    display: grid;
    grid-template-columns: 240px 1fr;
    gap: 24px;
    align-items: start;
}

/* Sektion ist im Sidebar-Layout immer allein sichtbar – Trenner unten weg */
.settings-content :deep(.settings-section) {
    border-bottom: none !important;
    padding-bottom: 0;
}

/* Stärkere Eingabe-Borders – NC-Default ist zu blass */
.settings-content :deep(input[type="text"]),
.settings-content :deep(input[type="number"]),
.settings-content :deep(input[type="date"]),
.settings-content :deep(input[type="time"]),
.settings-content :deep(textarea) {
    border: 1px solid var(--color-border-dark, var(--color-border));
}

.settings-content :deep(input[type="text"]:focus),
.settings-content :deep(input[type="number"]:focus),
.settings-content :deep(input[type="date"]:focus),
.settings-content :deep(input[type="time"]:focus),
.settings-content :deep(textarea:focus) {
    border-color: var(--color-primary-element);
}

.settings-nav {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 0 16px 0 0;
    border-right: 1px solid var(--color-border-dark, var(--color-border));
}

.settings-nav-group {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--color-text-maxcontrast);
    padding: 16px 12px 6px;
    border-top: 1px solid var(--color-border-dark, var(--color-border));
    margin-top: 8px;
}

.settings-nav-group:first-child {
    padding-top: 0;
    border-top: none;
    margin-top: 0;
}

.settings-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border: none;
    background: none;
    color: var(--color-main-text);
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    border-radius: var(--border-radius-element, 8px);
    cursor: pointer;
    width: 100%;
    transition: background-color 0.15s;
}

.settings-nav-item :deep(.material-design-icon) {
    color: var(--color-text-maxcontrast);
}

.settings-nav-item:hover {
    background: var(--color-background-hover);
}

.settings-nav-item.active {
    background: var(--color-primary-element-light);
    color: var(--color-primary-element);
    font-weight: 600;
}

.settings-nav-item.active :deep(.material-design-icon) {
    color: var(--color-primary-element);
}

.settings-nav-item:focus-visible {
    outline: 2px solid var(--color-primary-element);
    outline-offset: -2px;
}

@media (max-width: 900px) {
    .settings-layout {
        grid-template-columns: 1fr;
    }
    .settings-nav {
        position: static;
    }
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
    width: 8rem;
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
    color: var(--color-text-maxcontrast);
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
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

.carryover-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 12px;
}

.carryover-table th,
.carryover-table td {
    padding: 8px 10px;
    border-bottom: 1px solid var(--color-border);
    text-align: left;
    vertical-align: middle;
}

.carryover-table th {
    font-weight: 600;
    font-size: 13px;
    color: var(--color-text-maxcontrast);
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
}

.carryover-input {
    width: 80px !important;
    text-align: right;
}

.carryover-note-cell {
    min-width: 200px;
}

.carryover-note {
    width: 100% !important;
    resize: none;
    overflow: hidden;
    font-family: inherit;
    font-size: inherit;
}

.carryover-saved {
    color: var(--color-success);
    font-weight: 600;
}

.carryover-actual {
    color: var(--color-text-maxcontrast);
}

.carryover-row--locked {
    background: var(--color-background-hover);
}

.carryover-locked-value,
.carryover-locked-note {
    color: var(--color-text-maxcontrast);
}

.carryover-locked-label {
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    color: var(--color-text-maxcontrast);
}

.carryover-actions {
    white-space: nowrap;
}

.carryover-year-status {
    align-self: center;
}

.year-status {
    font-size: 13px;
}

.year-status--closed {
    color: var(--color-success);
}

.year-status--open {
    color: var(--color-warning);
}

.value-positive {
    color: var(--color-success);
}

.value-negative {
    color: var(--color-error);
}

.value-na {
    color: var(--color-text-maxcontrast);
}

.cancel-modal {
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.cancel-modal__hint {
    color: var(--color-text-maxcontrast);
    font-size: 13px;
    margin: 0;
}

.text-right {
    text-align: right !important;
}
</style>
