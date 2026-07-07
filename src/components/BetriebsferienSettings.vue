<template>
    <div class="betriebsferien">
        <div class="bf-form">
            <div class="form-row">
                <div class="form-group">
                    <label>{{ t('worktime', 'Von') }}</label>
                    <NcDateTimePicker v-model="form.startDate" type="date" :format="'DD.MM.YYYY'" />
                </div>
                <div class="form-group">
                    <label>{{ t('worktime', 'Bis') }}</label>
                    <NcDateTimePicker v-model="form.endDate" type="date" :format="'DD.MM.YYYY'" />
                </div>
            </div>

            <div class="form-group">
                <label>{{ t('worktime', 'Für wen') }}</label>
                <NcCheckboxRadioSwitch :checked.sync="form.target" value="all" name="bf-target" type="radio">
                    {{ t('worktime', 'Alle aktiven Mitarbeiter') }}
                </NcCheckboxRadioSwitch>
                <NcCheckboxRadioSwitch :checked.sync="form.target" value="selected" name="bf-target" type="radio">
                    {{ t('worktime', 'Ausgewählte Mitarbeiter') }}
                </NcCheckboxRadioSwitch>
            </div>

            <div v-if="form.target === 'selected'" class="bf-employees">
                <NcCheckboxRadioSwitch v-for="emp in activeEmployees" :key="emp.id"
                    :checked.sync="selectedEmployeeIds" :value="String(emp.id)" name="bf-emp">
                    {{ emp.firstName }} {{ emp.lastName }}
                </NcCheckboxRadioSwitch>
            </div>

            <div class="form-group">
                <label for="bf-note">{{ t('worktime', 'Bemerkung') }}</label>
                <input id="bf-note" v-model="form.note" type="text" class="input-field"
                    :placeholder="t('worktime', 'z. B. Betriebsferien Weihnachten')">
            </div>

            <NcNoteCard type="warning">
                {{ t('worktime', 'Die Betriebsferien werden als genehmigter Urlaub bei den betroffenen Mitarbeitern gebucht und vom Urlaubskonto abgezogen. Mitarbeiter ohne ausreichenden Resturlaub oder mit bereits erfassten Zeiten in dem Zeitraum werden nicht gebucht und Ihnen aufgelistet.') }}
            </NcNoteCard>

            <NcButton type="primary" :disabled="!canSubmit || saving" @click="submit">
                {{ t('worktime', 'Betriebsferien eintragen') }}
            </NcButton>
        </div>

        <div v-if="result" class="bf-result">
            <NcNoteCard type="success">
                {{ t('worktime', '{count} Mitarbeiter eingetragen.', { count: result.booked.length }) }}
            </NcNoteCard>
            <NcNoteCard v-if="result.skipped.length" type="warning">
                <strong>{{ t('worktime', 'Nicht gebucht – bitte einzeln klären:') }}</strong>
                <ul class="bf-skipped">
                    <li v-for="s in result.skipped" :key="s.employeeId">
                        {{ s.name }} – {{ reasonLabel(s.reason) }}
                    </li>
                </ul>
            </NcNoteCard>
        </div>

        <div class="bf-existing">
            <h4>{{ t('worktime', 'Eingetragene Betriebsferien') }}</h4>
            <p v-if="!groups.length" class="help-text">
                {{ t('worktime', 'Noch keine Betriebsferien eingetragen.') }}
            </p>
            <table v-else class="bf-table">
                <thead>
                    <tr>
                        <th>{{ t('worktime', 'Zeitraum') }}</th>
                        <th>{{ t('worktime', 'Bemerkung') }}</th>
                        <th>{{ t('worktime', 'Mitarbeiter') }}</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="g in groups" :key="g.key">
                        <td>{{ g.label }}</td>
                        <td>{{ g.note || '–' }}</td>
                        <td>{{ g.count }}</td>
                        <td class="bf-actions">
                            <NcButton type="tertiary" @click="remove(g)">
                                {{ t('worktime', 'Entfernen') }}
                            </NcButton>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcDateTimePicker from '@nextcloud/vue/dist/Components/NcDateTimePicker.js'
import NcCheckboxRadioSwitch from '@nextcloud/vue/dist/Components/NcCheckboxRadioSwitch.js'
import NcNoteCard from '@nextcloud/vue/dist/Components/NcNoteCard.js'
import AbsenceService from '../services/AbsenceService.js'
import { formatDateISO } from '../utils/dateUtils.js'
import { showSuccess } from '@nextcloud/dialogs'
import { showErrorMessage } from '../utils/errorHandler.js'

export default {
    name: 'BetriebsferienSettings',
    components: {
        NcButton,
        NcDateTimePicker,
        NcCheckboxRadioSwitch,
        NcNoteCard,
    },
    props: {
        employees: {
            type: Array,
            default: () => [],
        },
    },
    data() {
        return {
            form: {
                startDate: null,
                endDate: null,
                target: 'all',
                note: '',
            },
            selectedEmployeeIds: [],
            saving: false,
            result: null,
            central: [],
        }
    },
    computed: {
        activeEmployees() {
            return this.employees.filter(e => e.isActive)
        },
        canSubmit() {
            if (!this.form.startDate || !this.form.endDate) return false
            if (this.form.target === 'selected' && this.selectedEmployeeIds.length === 0) return false
            return true
        },
        groups() {
            const map = {}
            this.central.forEach(a => {
                const key = `${a.startDate}|${a.endDate}|${a.note || ''}`
                if (!map[key]) {
                    map[key] = {
                        key,
                        startDate: a.startDate,
                        endDate: a.endDate,
                        note: a.note || '',
                        count: 0,
                        label: this.rangeLabel(a.startDate, a.endDate),
                    }
                }
                map[key].count++
            })
            return Object.values(map).sort((a, b) => b.startDate.localeCompare(a.startDate))
        },
    },
    mounted() {
        this.load()
    },
    methods: {
        async load() {
            this.central = (await AbsenceService.getCentralAbsences()) || []
        },
        rangeLabel(start, end) {
            const de = s => s.split('-').reverse().join('.')
            return start === end ? de(start) : `${de(start)} – ${de(end)}`
        },
        reasonLabel(reason) {
            if (reason === 'insufficient_vacation') return this.t('worktime', 'nicht genug Resturlaub')
            if (reason === 'time_entry_conflict') return this.t('worktime', 'Zeiteinträge im Zeitraum vorhanden')
            return reason
        },
        async submit() {
            this.saving = true
            this.result = null
            try {
                const payload = {
                    startDate: formatDateISO(this.form.startDate),
                    endDate: formatDateISO(this.form.endDate),
                    employeeIds: this.form.target === 'all' ? null : this.selectedEmployeeIds.map(Number),
                    note: this.form.note || null,
                }
                this.result = await AbsenceService.createCompanyVacation(payload)
                showSuccess(this.t('worktime', 'Betriebsferien eingetragen.'))
                await this.load()
            } catch (error) {
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Eintragen'))
            } finally {
                this.saving = false
            }
        },
        async remove(group) {
            try {
                await AbsenceService.deleteCompanyVacation(group.startDate, group.endDate)
                showSuccess(this.t('worktime', 'Betriebsferien entfernt.'))
                this.result = null
                await this.load()
            } catch (error) {
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Entfernen'))
            }
        },
    },
}
</script>

<style scoped>
.bf-form {
    max-width: 640px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}
.form-row {
    display: flex;
    gap: 16px;
    flex-wrap: wrap;
}
.form-group {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.form-group label {
    font-weight: bold;
}
.bf-employees {
    max-height: 240px;
    overflow-y: auto;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: 8px 12px;
}
.input-field {
    width: 100%;
    max-width: 400px;
}
.bf-result {
    margin-top: 16px;
    max-width: 640px;
}
.bf-skipped {
    margin: 4px 0 0 16px;
    list-style: disc;
}
.bf-existing {
    margin-top: 24px;
}
.bf-table {
    width: 100%;
    max-width: 720px;
    border-collapse: collapse;
}
.bf-table th,
.bf-table td {
    text-align: left;
    padding: 6px 8px;
    border-bottom: 1px solid var(--color-border);
}
.bf-actions {
    text-align: right;
}
.help-text {
    color: var(--color-text-maxcontrast);
}
</style>
