<template>
    <div class="time-entry-list">
        <table class="time-entry-table" v-if="entries.length > 0 || isCreating || hasAbsencesOrHolidays">
            <thead>
                <tr>
                    <th>{{ t('worktime', 'Datum') }}</th>
                    <th>{{ t('worktime', 'Beginn') }}</th>
                    <th>{{ t('worktime', 'Ende') }}</th>
                    <th>{{ t('worktime', 'Pause') }}</th>
                    <th>{{ t('worktime', 'Arbeitszeit') }}</th>
                    <th>{{ t('worktime', 'Projekt') }}</th>
                    <th>{{ t('worktime', 'Beschreibung') }}</th>
                    <th>{{ t('worktime', 'Status') }}</th>
                    <th v-if="!readonly">{{ t('worktime', 'Aktionen') }}</th>
                </tr>
            </thead>
            <tbody>
                <!-- Create Row -->
                <TimeEntryRow
                    v-if="isCreating"
                    :entry="null"
                    mode="create"
                    :projects="projects"
                    @save="onCreate"
                    @cancel="cancelCreate" />

                <!-- Merged list: entries + absences + holidays + week separators -->
                <template v-for="item in mergedList" :key="item._key">
                    <!-- Absence -->
                    <tr v-if="item._type === 'absence'" class="absence-row">
                        <td>{{ formatDateFull(item.date) }}</td>
                        <td :colspan="readonly ? 7 : 8" class="absence-cell">
                            <span class="absence-type-badge" :class="item.absenceType">
                                {{ item.typeName }}
                            </span>
                            <span v-if="item.scope < 1" class="absence-scope">
                                ({{ item.scope === 0.5 ? t('worktime', 'Halber Tag') : item.scope + ' ' + t('worktime', 'Tage') }})
                            </span>
                        </td>
                    </tr>

                    <!-- Holiday -->
                    <tr v-else-if="item._type === 'holiday'" class="holiday-row">
                        <td>{{ formatDateFull(item.date) }}</td>
                        <td :colspan="readonly ? 7 : 8" class="holiday-cell">
                            {{ item.name }}
                        </td>
                    </tr>

                    <!-- Normal time entry -->
                    <TimeEntryRow
                        v-else
                        :entry="item"
                        :mode="editingId === item.id ? 'edit' : 'view'"
                        :projects="projects"
                        :readonly="readonly"
                        :is-holiday="checkIsHoliday(item.date)"
                        @edit="startEdit(item.id)"
                        @save="onUpdate"
                        @cancel="cancelEdit"
                        @delete="confirmDelete" />
                </template>
            </tbody>
        </table>

        <NcEmptyContent v-else
            :name="t('worktime', 'Keine Einträge')">
            <template #icon>
                <ClockIcon />
            </template>
            <template #description>
                {{ t('worktime', 'Für diesen Monat sind keine Zeiteinträge vorhanden.') }}
            </template>
        </NcEmptyContent>
    </div>
</template>

<script>
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import ClockIcon from 'vue-material-design-icons/Clock.vue'
import { mapGetters, mapActions } from 'vuex'
import TimeEntryRow from './TimeEntryRow.vue'
import { confirmAction, showErrorMessage, showSuccessMessage } from '../utils/errorHandler.js'
import { formatDateWithWeekday, formatDateISO } from '../utils/dateUtils.js'
import { getAbsenceTypeLabel } from '../utils/formatters.js'

export default {
    name: 'TimeEntryList',
    components: {
        NcEmptyContent,
        ClockIcon,
        TimeEntryRow,
    },
    props: {
        entries: {
            type: Array,
            default: () => [],
        },
        readonly: {
            type: Boolean,
            default: false,
        },
        absences: {
            type: Array,
            default: () => [],
        },
        holidays: {
            type: Array,
            default: () => [],
        },
        filterYear: {
            type: Number,
            default: null,
        },
        filterMonth: {
            type: Number,
            default: null,
        },
    },
    emits: ['refresh'],
    data() {
        return {
            editingId: null,
            isCreating: false,
        }
    },
    computed: {
        ...mapGetters('projects', ['activeProjects']),
        ...mapGetters('holidays', ['isHoliday']),
        projects() {
            return this.activeProjects
        },
        hasAbsencesOrHolidays() {
            return this.absences.length > 0 || this.holidays.length > 0
        },
        sortedEntries() {
            return [...this.entries].sort((a, b) => {
                const dateCompare = b.date.localeCompare(a.date)
                if (dateCompare !== 0) return dateCompare
                return b.startTime.localeCompare(a.startTime)
            })
        },
        mergedList() {
            const items = []

            // Add time entries
            for (const entry of this.sortedEntries) {
                items.push({ ...entry, _type: 'entry', _date: entry.date, _key: 'entry-' + entry.id })
            }

            // Add absences (expand date range to individual days)
            for (const absence of this.absences) {
                const start = new Date(absence.startDate)
                const end = new Date(absence.endDate)
                const typeName = getAbsenceTypeLabel(absence.type)
                for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
                    const dayOfWeek = d.getDay()
                    // Skip weekends
                    if (dayOfWeek === 0 || dayOfWeek === 6) continue
                    // Filter to selected month
                    if (this.filterYear && this.filterMonth) {
                        if (d.getFullYear() !== this.filterYear || (d.getMonth() + 1) !== this.filterMonth) continue
                    }
                    const dateStr = formatDateISO(d)
                    // Skip if there's already a time entry on this day
                    if (items.some(i => i._type === 'entry' && i._date === dateStr)) continue
                    items.push({
                        _type: 'absence',
                        _date: dateStr,
                        _key: 'absence-' + absence.id + '-' + dateStr,
                        date: dateStr,
                        typeName,
                        absenceType: absence.type || '',
                        scope: absence.scope || 1,
                    })
                }
            }

            // Add holidays
            for (const holiday of this.holidays) {
                const dateStr = holiday.date
                // Skip if there's already a time entry on this day
                if (items.some(i => i._type === 'entry' && i._date === dateStr)) continue
                items.push({
                    _type: 'holiday',
                    _date: dateStr,
                    _key: 'holiday-' + dateStr,
                    date: dateStr,
                    name: holiday.name,
                })
            }

            // Sort by date descending
            items.sort((a, b) => b._date.localeCompare(a._date))

            return items
        },
        isEditing() {
            return this.isCreating || this.editingId !== null
        },
    },
    methods: {
        ...mapActions('timeEntries', ['createTimeEntry', 'updateTimeEntry', 'deleteTimeEntry']),
        checkIsHoliday(date) {
            return this.isHoliday(date)
        },
        formatDateFull(dateStr) {
            return formatDateWithWeekday(dateStr)
        },
        startCreate() {
            this.editingId = null
            this.isCreating = true
        },
        cancelCreate() {
            this.isCreating = false
        },
        startEdit(id) {
            this.isCreating = false
            this.editingId = id
        },
        cancelEdit() {
            this.editingId = null
        },
        async onCreate({ data }) {
            try {
                await this.createTimeEntry(data)
                this.isCreating = false
                showSuccessMessage(this.t('worktime', 'Eintrag erstellt'))
                this.$emit('refresh')
            } catch (error) {
                console.error('Failed to create entry:', error)
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Erstellen'))
            }
        },
        async onUpdate({ id, data }) {
            try {
                await this.updateTimeEntry({ id, data })
                this.editingId = null
                showSuccessMessage(this.t('worktime', 'Eintrag aktualisiert'))
                this.$emit('refresh')
            } catch (error) {
                console.error('Failed to update entry:', error)
                showErrorMessage(error.message || this.t('worktime', 'Fehler beim Speichern'))
            }
        },
        async confirmDelete(entry) {
            const confirmed = await confirmAction(
                this.t('worktime', 'Möchten Sie diesen Eintrag wirklich löschen?'),
                this.t('worktime', 'Eintrag löschen'),
                this.t('worktime', 'Löschen'),
                true
            )
            if (confirmed) {
                try {
                    await this.deleteTimeEntry(entry.id)
                    showSuccessMessage(this.t('worktime', 'Eintrag gelöscht'))
                    this.$emit('refresh')
                } catch (error) {
                    console.error('Failed to delete entry:', error)
                    showErrorMessage(error.message || this.t('worktime', 'Fehler beim Löschen'))
                }
            }
        },
    },
}
</script>

<style scoped>
.time-entry-table {
    width: 100%;
    border-collapse: collapse;
}

.time-entry-table th,
.time-entry-table td {
    padding: 10px 12px;
    text-align: left;
}

.time-entry-table th {
    font-size: 15px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    border-bottom: 2px solid var(--color-border);
}

.time-entry-table td {
    font-size: 15px;
    font-variant-numeric: tabular-nums;
    border-bottom: 1px solid var(--color-border);
}

.absence-row td {
    background: rgba(0, 130, 200, 0.06);
}

.absence-cell {
    display: flex;
    align-items: center;
    gap: 8px;
}

.absence-type-badge {
    display: inline-block;
    padding: 2px 10px;
    border-radius: 12px;
    font-size: 13px;
    font-weight: 600;
    background: #0082c8;
    color: white;
}

.absence-type-badge.sick,
.absence-type-badge.child_sick {
    background: #e67e22;
}

.absence-type-badge.compensatory {
    background: #8e44ad;
}

.absence-type-badge.training {
    background: #27ae60;
}

.absence-type-badge.unpaid {
    background: #95a5a6;
}

.absence-type-badge.special {
    background: #2980b9;
}

.absence-scope {
    font-size: 13px;
    color: var(--color-text-maxcontrast);
}

.holiday-row td {
    background: rgba(0, 0, 0, 0.03);
    color: var(--color-text-maxcontrast);
}
</style>
