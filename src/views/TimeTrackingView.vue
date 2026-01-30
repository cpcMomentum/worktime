<template>
    <div class="time-tracking-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Zeiterfassung') }}</h2>
            <div class="header-actions">
                <MonthPicker :year="selectedMonth.year"
                    :month="selectedMonth.month"
                    @update="onMonthChange" />
                <NcButton type="primary" @click="showForm = true">
                    <template #icon>
                        <PlusIcon :size="20" />
                    </template>
                    {{ t('worktime', 'Neuer Eintrag') }}
                </NcButton>
            </div>
        </div>

        <OvertimeSummary v-if="statistics"
            :target-minutes="statistics.adjustedTargetMinutes"
            :actual-minutes="statistics.actualMinutes"
            :overtime-minutes="statistics.overtimeMinutes" />

        <NcLoadingIcon v-if="loading" :size="44" />

        <TimeEntryList v-else
            :entries="timeEntries"
            @edit="editEntry"
            @deleted="loadStatistics" />

        <NcModal v-if="showForm"
            :name="editingEntry ? t('worktime', 'Eintrag bearbeiten') : t('worktime', 'Neuer Eintrag')"
            @close="closeForm">
            <TimeEntryForm :entry="editingEntry"
                @saved="onSaved"
                @cancel="closeForm" />
        </NcModal>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
import MonthPicker from '../components/MonthPicker.vue'
import OvertimeSummary from '../components/OvertimeSummary.vue'
import TimeEntryForm from '../components/TimeEntryForm.vue'
import TimeEntryList from '../components/TimeEntryList.vue'
import ReportService from '../services/ReportService.js'

export default {
    name: 'TimeTrackingView',
    components: {
        NcButton,
        NcModal,
        NcLoadingIcon,
        PlusIcon,
        MonthPicker,
        OvertimeSummary,
        TimeEntryForm,
        TimeEntryList,
    },
    data() {
        return {
            showForm: false,
            editingEntry: null,
            statistics: null,
        }
    },
    computed: {
        ...mapState('timeEntries', ['selectedMonth']),
        ...mapGetters('timeEntries', ['timeEntries', 'loading']),
        ...mapGetters('permissions', ['employeeId']),
    },
    watch: {
        selectedMonth: {
            immediate: true,
            handler() {
                this.loadData()
            },
        },
        employeeId: {
            immediate: true,
            handler() {
                if (this.employeeId) {
                    this.loadData()
                }
            },
        },
    },
    mounted() {
        // Daten bei jedem View-Wechsel neu laden
        if (this.employeeId) {
            this.loadData()
        }
    },
    methods: {
        ...mapActions('timeEntries', ['fetchTimeEntries', 'setSelectedMonth']),
        async loadData() {
            if (!this.employeeId) return
            await this.fetchTimeEntries()
            await this.loadStatistics()
        },
        async loadStatistics() {
            if (!this.employeeId) return
            try {
                const report = await ReportService.getMonthly(
                    this.employeeId,
                    this.selectedMonth.year,
                    this.selectedMonth.month
                )
                this.statistics = report.statistics
            } catch (error) {
                console.error('Failed to load statistics:', error)
            }
        },
        onMonthChange({ year, month }) {
            this.setSelectedMonth({ year, month })
        },
        editEntry(entry) {
            this.editingEntry = entry
            this.showForm = true
        },
        closeForm() {
            this.showForm = false
            this.editingEntry = null
        },
        onSaved() {
            this.closeForm()
            this.loadData()
        },
    },
}
</script>

<style scoped>
.time-tracking-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1200px;
}

.view-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    flex-wrap: wrap;
    gap: 16px;
}

.view-header h2 {
    margin: 0;
}

.header-actions {
    display: flex;
    align-items: center;
    gap: 16px;
}
</style>
