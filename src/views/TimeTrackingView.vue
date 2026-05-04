<template>
    <div class="time-tracking-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Zeiterfassung') }}</h2>
            <div class="header-actions">
                <NcButton type="primary" @click="startCreate">
                    <template #icon>
                        <PlusIcon :size="20" />
                    </template>
                    {{ t('worktime', 'Neuer Eintrag') }}
                </NcButton>
                <MonthPicker :year="selectedMonth.year"
                    :month="selectedMonth.month"
                    @update="onMonthChange" />
            </div>
        </div>

        <OvertimeSummary v-if="statistics"
            :target-minutes="statistics.adjustedTargetMinutes"
            :actual-minutes="statistics.actualMinutes"
            :overtime-minutes="statistics.overtimeMinutes"
            :statistics="statistics" />

        <NcLoadingIcon v-if="loading" :size="44" />

        <TimeEntryList v-else
            ref="entryList"
            :entries="timeEntries"
            :absences="reportAbsences"
            :holidays="reportHolidays"
            :filter-year="selectedMonth.year"
            :filter-month="selectedMonth.month"
            @refresh="loadData" />
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import { mapGetters, mapActions, mapState } from 'vuex'
import MonthPicker from '../components/MonthPicker.vue'
import OvertimeSummary from '../components/OvertimeSummary.vue'
import TimeEntryList from '../components/TimeEntryList.vue'
import ReportService from '../services/ReportService.js'

export default {
    name: 'TimeTrackingView',
    components: {
        NcButton,
        NcLoadingIcon,
        PlusIcon,
        MonthPicker,
        OvertimeSummary,
        TimeEntryList,
    },
    data() {
        return {
            statistics: null,
            reportAbsences: [],
            reportHolidays: [],
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
        employeeId(newVal, oldVal) {
            if (newVal && newVal !== oldVal) {
                this.loadData()
            }
        },
    },
    mounted() {
        this.$store.dispatch('projects/fetchProjects')
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
                this.reportAbsences = (report.absences || []).filter(a => a.status !== 'cancelled')
                this.reportHolidays = report.holidays || []
            } catch (error) {
                console.error('Failed to load statistics:', error)
            }
        },
        onMonthChange({ year, month }) {
            this.setSelectedMonth({ year, month })
        },
        startCreate() {
            this.$refs.entryList?.startCreate()
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

.header-actions :deep(.month-picker) {
    margin-left: auto;
}
</style>
