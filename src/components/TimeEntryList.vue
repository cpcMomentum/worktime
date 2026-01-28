<template>
    <div class="time-entry-list">
        <table class="time-entry-table" v-if="entries.length > 0">
            <thead>
                <tr>
                    <th>{{ t('worktime', 'Datum') }}</th>
                    <th>{{ t('worktime', 'Beginn') }}</th>
                    <th>{{ t('worktime', 'Ende') }}</th>
                    <th>{{ t('worktime', 'Pause') }}</th>
                    <th>{{ t('worktime', 'Arbeitszeit') }}</th>
                    <th>{{ t('worktime', 'Projekt') }}</th>
                    <th>{{ t('worktime', 'Status') }}</th>
                    <th>{{ t('worktime', 'Aktionen') }}</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="entry in sortedEntries"
                    :key="entry.id"
                    :class="{ weekend: isWeekend(entry.date), holiday: isHoliday(entry.date) }">
                    <td>{{ formatDate(entry.date) }}</td>
                    <td>{{ entry.startTime }}</td>
                    <td>{{ entry.endTime }}</td>
                    <td>{{ entry.breakMinutes }} min</td>
                    <td>{{ formatMinutes(entry.workMinutes) }}</td>
                    <td>{{ getProjectName(entry.projectId) }}</td>
                    <td>
                        <span class="status-badge" :class="entry.status">
                            {{ getStatusLabel(entry.status) }}
                        </span>
                    </td>
                    <td class="actions">
                        <NcButton type="tertiary"
                            v-if="canEdit(entry)"
                            :aria-label="t('worktime', 'Bearbeiten')"
                            @click="edit(entry)">
                            <template #icon>
                                <PencilIcon :size="20" />
                            </template>
                        </NcButton>
                        <NcButton type="tertiary"
                            v-if="canDelete(entry)"
                            :aria-label="t('worktime', 'Löschen')"
                            @click="confirmDelete(entry)">
                            <template #icon>
                                <DeleteIcon :size="20" />
                            </template>
                        </NcButton>
                    </td>
                </tr>
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
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import ClockIcon from 'vue-material-design-icons/Clock.vue'
import { mapGetters, mapActions } from 'vuex'
import { formatDate, isWeekend } from '../utils/dateUtils.js'
import { formatMinutesWithUnit } from '../utils/timeUtils.js'
import { confirmAction } from '../utils/errorHandler.js'

export default {
    name: 'TimeEntryList',
    components: {
        NcButton,
        NcEmptyContent,
        PencilIcon,
        DeleteIcon,
        ClockIcon,
    },
    props: {
        entries: {
            type: Array,
            default: () => [],
        },
    },
    computed: {
        ...mapGetters('projects', ['getProjectById']),
        ...mapGetters('holidays', ['isHoliday']),
        sortedEntries() {
            return [...this.entries].sort((a, b) => {
                const dateCompare = a.date.localeCompare(b.date)
                if (dateCompare !== 0) return dateCompare
                return a.startTime.localeCompare(b.startTime)
            })
        },
    },
    methods: {
        ...mapActions('timeEntries', ['deleteTimeEntry']),
        formatDate(date) {
            return formatDate(date)
        },
        formatMinutes(minutes) {
            return formatMinutesWithUnit(minutes)
        },
        isWeekend(date) {
            return isWeekend(date)
        },
        getProjectName(projectId) {
            if (!projectId) return '-'
            const project = this.getProjectById(projectId)
            return project?.name || '-'
        },
        getStatusLabel(status) {
            const labels = {
                draft: this.t('worktime', 'Entwurf'),
                submitted: this.t('worktime', 'Eingereicht'),
                approved: this.t('worktime', 'Genehmigt'),
                rejected: this.t('worktime', 'Abgelehnt'),
            }
            return labels[status] || status
        },
        canEdit(entry) {
            return entry.status === 'draft' || entry.status === 'rejected'
        },
        canDelete(entry) {
            return entry.status !== 'approved'
        },
        edit(entry) {
            this.$emit('edit', entry)
        },
        async confirmDelete(entry) {
            const confirmed = await confirmAction(
                this.t('worktime', 'Möchten Sie diesen Eintrag wirklich löschen?')
            )
            if (confirmed) {
                try {
                    await this.deleteTimeEntry(entry.id)
                } catch (error) {
                    console.error('Failed to delete entry:', error)
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
    padding: 12px 8px;
    text-align: left;
    border-bottom: 1px solid var(--color-border);
}

.time-entry-table th {
    font-weight: 600;
    background: var(--color-background-dark);
}

.time-entry-table tr.weekend {
    background: var(--color-background-hover);
}

.time-entry-table tr.holiday {
    background: var(--color-primary-element-light);
}

.status-badge {
    display: inline-block;
    padding: 2px 8px;
    border-radius: 12px;
    font-size: 0.85em;
}

.status-badge.draft {
    background: var(--color-background-dark);
    color: var(--color-text-maxcontrast);
}

.status-badge.submitted {
    background: var(--color-warning-hover);
    color: var(--color-warning-text);
}

.status-badge.approved {
    background: var(--color-success-hover);
    color: var(--color-success-text);
}

.status-badge.rejected {
    background: var(--color-error-hover);
    color: var(--color-error-text);
}

.actions {
    white-space: nowrap;
}
</style>
