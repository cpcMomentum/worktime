<template>
    <div class="time-entry-list">
        <table class="time-entry-table" v-if="entries.length > 0 || isCreating">
            <thead>
                <tr>
                    <th>{{ t('worktime', 'Datum') }}</th>
                    <th>{{ t('worktime', 'Beginn') }}</th>
                    <th>{{ t('worktime', 'Ende') }}</th>
                    <th>{{ t('worktime', 'Pause') }}</th>
                    <th>{{ t('worktime', 'Arbeitszeit') }}</th>
                    <th>{{ t('worktime', 'Projekt') }}</th>
                    <th v-if="!isEditing">{{ t('worktime', 'Status') }}</th>
                    <th v-else>{{ t('worktime', 'Beschreibung') }}</th>
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

                <!-- Existing Entries -->
                <TimeEntryRow
                    v-for="entry in sortedEntries"
                    :key="entry.id"
                    :entry="entry"
                    :mode="editingId === entry.id ? 'edit' : 'view'"
                    :projects="projects"
                    :readonly="readonly"
                    :is-holiday="checkIsHoliday(entry.date)"
                    @edit="startEdit(entry.id)"
                    @save="onUpdate"
                    @cancel="cancelEdit"
                    @delete="confirmDelete" />
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
        sortedEntries() {
            return [...this.entries].sort((a, b) => {
                const dateCompare = b.date.localeCompare(a.date)
                if (dateCompare !== 0) return dateCompare
                return b.startTime.localeCompare(a.startTime)
            })
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
    font-size: 16px;
}

.time-entry-table th,
.time-entry-table td {
    padding: 14px 12px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.time-entry-table th {
    font-weight: 600;
    background: var(--color-background-dark);
}
</style>
