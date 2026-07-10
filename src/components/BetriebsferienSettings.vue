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

            <div v-if="form.target === 'selected'" class="bf-select">
                <input v-model="employeeFilter" type="text" class="input-field bf-filter"
                    :placeholder="t('worktime', 'Mitarbeiter suchen …')">
                <p class="bf-selected-count">
                    {{ t('worktime', '{count} ausgewählt', { count: selectedEmployeeIds.length }) }}
                </p>
                <div class="bf-employees">
                    <NcCheckboxRadioSwitch v-for="emp in filteredEmployees" :key="emp.id"
                        :checked.sync="selectedEmployeeIds" :value="String(emp.id)" name="bf-emp">
                        {{ emp.firstName }} {{ emp.lastName }}
                    </NcCheckboxRadioSwitch>
                    <p v-if="!filteredEmployees.length" class="help-text">
                        {{ t('worktime', 'Kein Mitarbeiter gefunden.') }}
                    </p>
                </div>
            </div>

            <div class="form-group">
                <label>{{ t('worktime', 'Wenn der Resturlaub nicht reicht') }}</label>
                <NcCheckboxRadioSwitch v-for="opt in overageOptions" :key="opt.value"
                    :checked.sync="form.overageHandling" :value="opt.value" name="bf-overage" type="radio">
                    {{ opt.label }}
                </NcCheckboxRadioSwitch>
            </div>

            <div class="form-group">
                <label for="bf-note">{{ t('worktime', 'Bemerkung') }}</label>
                <input id="bf-note" v-model="form.note" type="text" class="input-field"
                    :placeholder="t('worktime', 'z. B. Betriebsferien Weihnachten')">
            </div>

            <p class="help-text">
                {{ t('worktime', 'Mitarbeiter mit bereits erfassten Zeiten im Zeitraum werden nicht gebucht, sondern Ihnen aufgelistet.') }}
            </p>

            <NcButton type="primary" :disabled="!canSubmit || saving" @click="submit">
                {{ t('worktime', 'Betriebsferien eintragen') }}
            </NcButton>
        </div>

        <div v-if="result" class="bf-result">
            <NcNoteCard type="success">
                {{ t('worktime', '{count} Mitarbeiter eingetragen.', { count: result.booked.length }) }}
            </NcNoteCard>
            <NcNoteCard v-if="bookedWithOverage.length" type="info">
                <strong>{{ t('worktime', 'Resturlaub reichte nicht – aufgeteilt gebucht:') }}</strong>
                <ul class="bf-skipped">
                    <li v-for="b in bookedWithOverage" :key="b.employeeId">
                        {{ overageSplitLabel(b) }}
                    </li>
                </ul>
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
                overageHandling: 'skip',
                note: '',
            },
            selectedEmployeeIds: [],
            employeeFilter: '',
            saving: false,
            result: null,
            resultOverageHandling: 'skip',
            central: [],
        }
    },
    computed: {
        activeEmployees() {
            return this.employees.filter(e => e.isActive)
        },
        overageOptions() {
            // #15 Stufe 2: bewusste Admin-Auswahl, keine Rechtswertung durch die App.
            // Die Konsequenz der gewählten Option erklärt die Warnbox darunter.
            return [
                { value: 'skip', label: this.t('worktime', 'Nicht buchen, nur auflisten') },
                { value: 'closure', label: this.t('worktime', 'Bezahlte Freistellung (Betriebsschließung)') },
                { value: 'compensatory', label: this.t('worktime', 'Freizeitausgleich') },
                { value: 'negative', label: this.t('worktime', 'Urlaub ins Minus') },
            ]
        },
        bookedWithOverage() {
            if (!this.result || !this.result.booked) return []
            return this.result.booked.filter(b => (b.overageDays || 0) > 0)
        },
        filteredEmployees() {
            const q = this.employeeFilter.trim().toLowerCase()
            if (!q) return this.activeEmployees
            return this.activeEmployees.filter(e =>
                `${e.firstName} ${e.lastName}`.toLowerCase().includes(q))
        },
        canSubmit() {
            if (!this.form.startDate || !this.form.endDate) return false
            if (this.form.target === 'selected' && this.selectedEmployeeIds.length === 0) return false
            return true
        },
        groups() {
            // #15 Stufe 2: Einträge eines Vorgangs hängen an der centralGroup
            // (Split-Einträge haben unterschiedliche Teilzeiträume). Fallback für
            // Alt-Einträge ohne Gruppe: exakter Zeitraum + Bemerkung.
            const map = {}
            this.central.forEach(a => {
                const key = a.centralGroup || `${a.startDate}|${a.endDate}|${a.note || ''}`
                if (!map[key]) {
                    map[key] = {
                        key,
                        group: a.centralGroup || null,
                        startDate: a.startDate,
                        endDate: a.endDate,
                        note: a.note || '',
                        employeeIds: new Set(),
                    }
                }
                const g = map[key]
                if (a.startDate < g.startDate) g.startDate = a.startDate
                if (a.endDate > g.endDate) g.endDate = a.endDate
                if (!g.note && a.note) g.note = a.note
                g.employeeIds.add(a.employeeId)
            })
            return Object.values(map)
                .map(g => ({
                    ...g,
                    count: g.employeeIds.size,
                    label: this.rangeLabel(g.startDate, g.endDate),
                }))
                .sort((a, b) => b.startDate.localeCompare(a.startDate))
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
                    overageHandling: this.form.overageHandling,
                }
                this.result = await AbsenceService.createCompanyVacation(payload)
                this.resultOverageHandling = payload.overageHandling
                showSuccess(this.t('worktime', 'Betriebsferien eingetragen.'))
                await this.load()
            } catch (error) {
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Eintragen'))
            } finally {
                this.saving = false
            }
        },
        overageSplitLabel(b) {
            const overageName = this.resultOverageHandling === 'compensatory'
                ? this.t('worktime', 'Freizeitausgleich')
                : this.t('worktime', 'Betriebsschließung')
            return this.t('worktime', '{name} – {vacation} Tage Urlaub + {overage} Tage {type}', {
                name: b.name,
                vacation: b.vacationDays,
                overage: b.overageDays,
                type: overageName,
            })
        },
        async remove(group) {
            try {
                await AbsenceService.deleteCompanyVacation(group.startDate, group.endDate, group.group)
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
.bf-select {
    display: flex;
    flex-direction: column;
    gap: 6px;
}
.bf-filter {
    max-width: 400px;
}
.bf-selected-count {
    margin: 0;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
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
