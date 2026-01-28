<template>
    <NcContent app-name="worktime">
        <NcAppNavigation>
            <NcAppNavigationItem :name="t('worktime', 'Zeiterfassung')"
                :class="{ active: currentView === 'tracking' }"
                @click="currentView = 'tracking'">
                <template #icon>
                    <ClockIcon :size="20" />
                </template>
            </NcAppNavigationItem>

            <NcAppNavigationItem :name="t('worktime', 'Monatsübersicht')"
                :class="{ active: currentView === 'report' }"
                @click="currentView = 'report'">
                <template #icon>
                    <ChartIcon :size="20" />
                </template>
            </NcAppNavigationItem>

            <NcAppNavigationItem :name="t('worktime', 'Abwesenheiten')"
                :class="{ active: currentView === 'absences' }"
                @click="currentView = 'absences'">
                <template #icon>
                    <CalendarIcon :size="20" />
                </template>
            </NcAppNavigationItem>

            <NcAppNavigationItem v-if="canApprove"
                :name="t('worktime', 'Team')"
                :class="{ active: currentView === 'team' }"
                @click="currentView = 'team'">
                <template #icon>
                    <AccountGroupIcon :size="20" />
                </template>
            </NcAppNavigationItem>

            <template #footer>
                <NcAppNavigationItem v-if="canManageSettings"
                    :name="t('worktime', 'Einstellungen')"
                    :class="{ active: currentView === 'settings' }"
                    @click="currentView = 'settings'">
                    <template #icon>
                        <CogIcon :size="20" />
                    </template>
                </NcAppNavigationItem>
            </template>
        </NcAppNavigation>

        <NcAppContent>
            <div v-if="!isEmployee && !canManageSettings" class="no-employee-warning">
                <NcEmptyContent :name="t('worktime', 'Kein Mitarbeiterprofil')">
                    <template #icon>
                        <AlertIcon />
                    </template>
                    <template #description>
                        {{ t('worktime', 'Sie haben noch kein Mitarbeiterprofil. Bitte wenden Sie sich an Ihren Administrator.') }}
                    </template>
                </NcEmptyContent>
            </div>

            <TimeTrackingView v-else-if="currentView === 'tracking'" />
            <MonthlyReportView v-else-if="currentView === 'report'" />
            <AbsenceView v-else-if="currentView === 'absences'" />
            <TeamView v-else-if="currentView === 'team'" />
            <SettingsView v-else-if="currentView === 'settings'" />
        </NcAppContent>
    </NcContent>
</template>

<script>
import NcContent from '@nextcloud/vue/dist/Components/NcContent.js'
import NcAppNavigation from '@nextcloud/vue/dist/Components/NcAppNavigation.js'
import NcAppNavigationItem from '@nextcloud/vue/dist/Components/NcAppNavigationItem.js'
import NcAppContent from '@nextcloud/vue/dist/Components/NcAppContent.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import ClockIcon from 'vue-material-design-icons/Clock.vue'
import ChartIcon from 'vue-material-design-icons/ChartBar.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import AlertIcon from 'vue-material-design-icons/Alert.vue'
import { mapGetters, mapActions } from 'vuex'
import TimeTrackingView from './views/TimeTrackingView.vue'
import MonthlyReportView from './views/MonthlyReportView.vue'
import AbsenceView from './views/AbsenceView.vue'
import TeamView from './views/TeamView.vue'
import SettingsView from './views/SettingsView.vue'

export default {
    name: 'App',
    components: {
        NcContent,
        NcAppNavigation,
        NcAppNavigationItem,
        NcAppContent,
        NcEmptyContent,
        ClockIcon,
        ChartIcon,
        CalendarIcon,
        AccountGroupIcon,
        CogIcon,
        AlertIcon,
        TimeTrackingView,
        MonthlyReportView,
        AbsenceView,
        TeamView,
        SettingsView,
    },
    data() {
        return {
            currentView: 'tracking',
        }
    },
    computed: {
        ...mapGetters('permissions', ['isEmployee', 'canManageSettings', 'canApprove']),
    },
    created() {
        this.initializeApp()
    },
    methods: {
        ...mapActions('employees', ['fetchCurrentEmployee', 'fetchFederalStates']),
        ...mapActions('projects', ['fetchProjects']),
        ...mapActions('absences', ['fetchAbsenceTypes']),
        async initializeApp() {
            // Load initial data
            await Promise.all([
                this.fetchCurrentEmployee(),
                this.fetchFederalStates(),
                this.fetchProjects(),
                this.fetchAbsenceTypes(),
            ])
        },
    },
}
</script>

<style scoped>
.active {
    background-color: var(--color-primary-element-light);
}

.no-employee-warning {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 40px;
}
</style>
