<template>
    <div class="project-form">
        <div class="project-form-header">
            <h3>{{ isEdit ? t('worktime', 'Projekt bearbeiten') : t('worktime', 'Neues Projekt') }}</h3>
            <NcCheckboxRadioSwitch :checked.sync="form.isActive" type="switch">
                {{ t('worktime', 'Aktiv') }}
            </NcCheckboxRadioSwitch>
        </div>
        <p class="header-hint">{{ t('worktime', 'Inaktive Projekte stehen nicht mehr zur Auswahl.') }}</p>

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
            <label class="form-group-label">{{ t('worktime', 'Farbe') }}</label>
            <div class="color-picker-row">
                <!-- NcColorPicker statt <input type="color">: Letzteres oeffnet auf
                     macOS den Farbdialog des Betriebssystems, den die Seite nicht
                     wieder schliessen kann (#548). Der Default-Slot ist der
                     Trigger des Popovers. -->
                <NcColorPicker v-model="form.color"
                    clearable
                    advanced-fields
                    @submit="onColorSubmit">
                    <button type="button"
                        class="color-trigger"
                        :style="colorTriggerStyle">
                        <span v-if="form.color">{{ form.color.toUpperCase() }}</span>
                        <span v-else>{{ t('worktime', 'Farbe wählen') }}</span>
                    </button>
                </NcColorPicker>
                <NcButton v-if="form.color"
                    type="tertiary"
                    @click="form.color = null">
                    {{ t('worktime', 'Zurücksetzen') }}
                </NcButton>
            </div>
            <p class="field-hint">
                {{ t('worktime', 'Kennzeichnet das Projekt in Listen und in der Auswertung. Neben der Palette sind auch eigene Farben möglich.') }}
            </p>
        </div>

        <div class="form-group">
            <label class="form-group-label">{{ t('worktime', 'Buchungsberechtigung') }}</label>
            <NcCheckboxRadioSwitch :checked.sync="bookingMode"
                value="all"
                name="project-booking"
                type="radio">
                {{ t('worktime', 'Alle Mitarbeitenden') }}
            </NcCheckboxRadioSwitch>
            <NcCheckboxRadioSwitch :checked.sync="bookingMode"
                value="selected"
                name="project-booking"
                type="radio">
                {{ t('worktime', 'Nur ausgewählte Mitarbeitende') }}
            </NcCheckboxRadioSwitch>

            <div v-if="bookingMode === 'selected'" class="member-select">
                <NcSelect id="projectMembers"
                    v-model="selectedMembers"
                    :options="employeeOptions"
                    :multiple="true"
                    :close-on-select="false"
                    :placeholder="t('worktime', 'Mitarbeitende auswählen')" />
            </div>
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
import NcColorPicker from '@nextcloud/vue/dist/Components/NcColorPicker.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import { mapActions, mapGetters } from 'vuex'
import { nextUnusedColor, textColorOn } from '../utils/colorUtils.js'
import { showSuccessMessage, showErrorMessage } from '../utils/errorHandler.js'

export default {
    name: 'ProjectForm',
    components: {
        NcButton,
        NcCheckboxRadioSwitch,
        NcColorPicker,
        NcSelect,
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
                allEmployees: true,
                memberIds: [],
            },
        }
    },
    computed: {
        ...mapGetters('employees', ['employees']),
        ...mapGetters('projects', ['projects']),
        isEdit() {
            return !!this.project
        },
        colorTriggerStyle() {
            if (!this.form.color) return {}
            // Textfarbe folgt der Helligkeit, sonst ist der Hexwert auf hellen
            // Palettenfarben nicht lesbar (#548).
            return {
                background: this.form.color,
                borderColor: this.form.color,
                color: textColorOn(this.form.color),
            }
        },
        isValid() {
            return this.form.name.trim().length > 0
        },
        employeeOptions() {
            // Resting employees cannot be newly assigned to projects (#486), but an
            // already-assigned resting employee must stay in the list — otherwise
            // editing and saving the project would silently drop their membership.
            return this.employees
                .filter(e => e.isActive || this.form.memberIds.includes(e.id))
                .map(e => ({
                    id: e.id,
                    label: `${e.firstName} ${e.lastName}`.trim() || e.userId,
                }))
        },
        selectedMembers: {
            get() {
                return this.employeeOptions.filter(o => this.form.memberIds.includes(o.id))
            },
            set(value) {
                this.form.memberIds = (value || []).map(o => o.id)
            },
        },
        bookingMode: {
            get() {
                return this.form.allEmployees ? 'all' : 'selected'
            },
            set(value) {
                this.form.allEmployees = value === 'all'
            },
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
                        allEmployees: project.allEmployees ?? true,
                        memberIds: Array.isArray(project.memberIds) ? [...project.memberIds] : [],
                    }
                } else {
                    this.resetForm()
                }
            },
        },
    },
    created() {
        // Employees are needed for the assignment multi-select.
        if (!this.employees.length) {
            this.$store.dispatch('employees/fetchEmployees')
        }
    },
    methods: {
        ...mapActions('projects', ['createProject', 'updateProject']),
        resetForm() {
            this.form = {
                name: '',
                code: null,
                description: null,
                customer: null,
                // Beim Anlegen vorbelegen, damit niemand ueber die Farbe
                // nachdenken muss. Erst wenn die Palette ausgeschoepft ist,
                // wiederholen sich Farben (#548).
                color: nextUnusedColor(this.projects),
                isActive: true,
                isBillable: true,
                allEmployees: true,
                memberIds: [],
            }
        },
        onColorSubmit(color) {
            // NcColorPicker meldet die Auswahl zusaetzlich per submit; ohne
            // Wert bedeutet das "geleert".
            this.form.color = color || null
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
                    allEmployees: this.form.allEmployees,
                    memberIds: this.form.allEmployees ? [] : this.form.memberIds,
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

.project-form-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 4px;
}

.project-form-header h3 {
    margin: 0;
}

.header-hint {
    margin: 0 0 20px;
    font-size: 0.85em;
    color: var(--color-text-maxcontrast);
}

.form-group-label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
}

.member-select {
    margin-top: 8px;
    padding-left: 28px;
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

/* Trigger des NcColorPicker-Popovers. Zeigt die aktuelle Farbe als Flaeche;
   die Schriftfarbe folgt der Helligkeit, damit der Hexwert auf Gold und
   Whiskey genauso lesbar bleibt wie auf Lila (#548). */
.color-trigger {
    min-width: 96px;
    height: 36px;
    padding: 0 12px;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    background: var(--color-main-background);
    color: var(--color-main-text);
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 500;
    font-variant-numeric: tabular-nums;
}

.color-trigger:hover {
    border-color: var(--color-primary-element);
}

.field-hint {
    margin: 4px 0 0;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
}
</style>
