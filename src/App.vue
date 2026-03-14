<template>
	<NcContent app-name="worktime">
		<NcAppNavigation>
			<NcAppNavigationItem
				v-if="isEmployee"
				:name="t('worktime', 'Übersicht')"
				to="/"
				:exact="true">
				<template #icon>
					<ViewDashboardIcon :size="20" />
				</template>
			</NcAppNavigationItem>

			<NcAppNavigationItem
				v-if="isEmployee"
				:name="t('worktime', 'Zeiterfassung')"
				to="/tracking">
				<template #icon>
					<ClockIcon :size="20" />
				</template>
			</NcAppNavigationItem>

			<NcAppNavigationItem
				v-if="isEmployee"
				:name="t('worktime', 'Abwesenheiten')"
				to="/absences">
				<template #icon>
					<CalendarIcon :size="20" />
				</template>
			</NcAppNavigationItem>

			<NcAppNavigationItem
				v-if="isEmployee"
				:name="t('worktime', 'Monatsübersicht')"
				to="/report">
				<template #icon>
					<ChartIcon :size="20" />
				</template>
			</NcAppNavigationItem>

			<NcAppNavigationItem
				v-if="canApprove && hasEmployees"
				:name="t('worktime', 'Team')"
				to="/team">
				<template #icon>
					<AccountGroupIcon :size="20" />
				</template>
			</NcAppNavigationItem>

			<NcAppNavigationItem
				v-if="(isAdmin || isHrManager) && hasEmployees"
				:name="t('worktime', 'Genehmigungen')"
				to="/approvals">
				<template #icon>
					<CheckDecagramIcon :size="20" />
				</template>
			</NcAppNavigationItem>

			<template #footer>
				<NcAppNavigationItem
					v-if="isEmployee"
					:name="t('worktime', 'Meine Einstellungen')"
					to="/my-settings">
					<template #icon>
						<AccountCogIcon :size="20" />
					</template>
				</NcAppNavigationItem>
				<NcAppNavigationItem
					v-if="canManageSettings"
					:name="t('worktime', 'Einstellungen')"
					to="/settings">
					<template #icon>
						<CogIcon :size="20" />
					</template>
				</NcAppNavigationItem>
			</template>
		</NcAppNavigation>

		<NcAppContent>
			<!-- Frische Installation: Keine Employees vorhanden, Admin sieht Willkommen (ausser auf /settings) -->
			<div v-if="!hasEmployees && canManageSettings && $route.path !== '/settings'" class="no-employee-warning">
				<NcEmptyContent :name="t('worktime', 'Willkommen bei WorkTime')">
					<template #icon>
						<AccountGroupIcon />
					</template>
					<template #description>
						<p>{{ t('worktime', 'Es sind noch keine Mitarbeiter eingerichtet. Legen Sie unter Einstellungen Mitarbeiter an, um zu starten.') }}</p>
						<NcButton type="primary"
							@click="$router.push('/settings')">
							{{ t('worktime', 'Zu den Einstellungen') }}
						</NcButton>
					</template>
				</NcEmptyContent>
			</div>

			<!-- Normaler User ohne Employee: Hinweis an Admin/HR wenden -->
			<div v-else-if="!isEmployee && !canManageSettings && !canApprove" class="no-employee-warning">
				<NcEmptyContent :name="t('worktime', 'Kein Mitarbeiterprofil')">
					<template #icon>
						<AlertIcon />
					</template>
					<template #description>
						{{ t('worktime', 'Sie haben noch kein Mitarbeiterprofil. Bitte wenden Sie sich an Ihren Administrator oder HR-Manager, um freigeschaltet zu werden.') }}
					</template>
				</NcEmptyContent>
			</div>

			<!-- Alle anderen: normale Ansicht -->
			<router-view v-else />
		</NcAppContent>
	</NcContent>
</template>

<script>
import NcContent from '@nextcloud/vue/dist/Components/NcContent.js'
import NcAppNavigation from '@nextcloud/vue/dist/Components/NcAppNavigation.js'
import NcAppNavigationItem from '@nextcloud/vue/dist/Components/NcAppNavigationItem.js'
import NcAppContent from '@nextcloud/vue/dist/Components/NcAppContent.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import ViewDashboardIcon from 'vue-material-design-icons/ViewDashboard.vue'
import ClockIcon from 'vue-material-design-icons/Clock.vue'
import ChartIcon from 'vue-material-design-icons/ChartBar.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import CheckDecagramIcon from 'vue-material-design-icons/CheckDecagram.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import AccountCogIcon from 'vue-material-design-icons/AccountCog.vue'
import AlertIcon from 'vue-material-design-icons/Alert.vue'
import { mapGetters, mapActions } from 'vuex'

export default {
	name: 'App',
	components: {
		NcContent,
		NcAppNavigation,
		NcAppNavigationItem,
		NcAppContent,
		NcButton,
		NcEmptyContent,
		ViewDashboardIcon,
		ClockIcon,
		ChartIcon,
		CalendarIcon,
		AccountGroupIcon,
		CheckDecagramIcon,
		CogIcon,
		AccountCogIcon,
		AlertIcon,
	},
	computed: {
		...mapGetters('permissions', ['isEmployee', 'isAdmin', 'isHrManager', 'hasEmployees', 'canManageSettings', 'canApprove']),
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
				this.fetchFederalStates(),
				this.fetchProjects(),
				this.fetchAbsenceTypes(),
			])

			// Only fetch employee data if user has an employee profile
			if (this.isEmployee) {
				await this.fetchCurrentEmployee()
			}
		},
	},
}
</script>

<style scoped>
.no-employee-warning {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 100%;
	padding: 40px;
}
</style>
