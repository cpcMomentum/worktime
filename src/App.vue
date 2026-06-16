<template>
	<NcContent app-name="worktime">
		<NcAppNavigation>
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

			<NcAppNavigationItem
				v-if="isAdmin || isHrManager"
				:name="t('worktime', 'Auswertung')"
				to="/evaluation">
				<template #icon>
					<ChartBarIcon :size="20" />
				</template>
			</NcAppNavigationItem>

			<NcAppNavigationItem
				v-if="isAdmin || isHrManager"
				:name="t('worktime', 'Audit-Log')"
				to="/audit">
				<template #icon>
					<ShieldIcon :size="20" />
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
			<!-- HR-Korrektur-Modus (#148): Kontext-Banner über allen Ansichten -->
			<div v-if="isCorrectionMode" class="correction-banner">
				<span class="correction-banner__who">
					<WrenchIcon :size="20" />
					<span class="correction-banner__text">
						{{ t('worktime', 'Korrektur-Modus · {name}', { name: correctionEmployeeName }) }}
						<small>{{ t('worktime', 'Änderungen werden protokolliert und dem Mitarbeiter angezeigt.') }}</small>
					</span>
				</span>
				<NcButton type="tertiary" @click="exitCorrection">
					{{ t('worktime', 'Korrektur beenden') }}
				</NcButton>
			</div>

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
import ClockIcon from 'vue-material-design-icons/Clock.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import CheckDecagramIcon from 'vue-material-design-icons/CheckDecagram.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import AccountCogIcon from 'vue-material-design-icons/AccountCog.vue'
import AlertIcon from 'vue-material-design-icons/Alert.vue'
import ShieldIcon from 'vue-material-design-icons/Shield.vue'
import ChartBarIcon from 'vue-material-design-icons/ChartBar.vue'
import WrenchIcon from 'vue-material-design-icons/Wrench.vue'
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
		ClockIcon,
		CalendarIcon,
		AccountGroupIcon,
		CheckDecagramIcon,
		CogIcon,
		AccountCogIcon,
		AlertIcon,
		ShieldIcon,
		ChartBarIcon,
		WrenchIcon,
	},
	computed: {
		...mapGetters('permissions', ['isEmployee', 'isAdmin', 'isHrManager', 'hasEmployees', 'canManageSettings', 'canApprove', 'isCorrectionMode', 'correctionEmployeeName']),
	},
	created() {
		this.initializeApp()
	},
	methods: {
		...mapActions('employees', ['fetchCurrentEmployee', 'fetchFederalStates']),
		...mapActions('projects', ['fetchProjects']),
		...mapActions('absences', ['fetchAbsenceTypes']),
		...mapActions('permissions', ['endCorrection']),
		exitCorrection() {
			this.endCorrection()
			this.$router.push('/settings').catch(() => {})
		},
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

.correction-banner {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 12px;
	margin: 12px 16px 0;
	padding: 10px 16px;
	background: var(--color-warning-hover, #fbe7d0);
	border: 1px solid var(--color-warning, #c7870e);
	border-left: 4px solid var(--color-warning, #c7870e);
	border-radius: var(--border-radius-large, 8px);
}

.correction-banner__who {
	display: flex;
	align-items: center;
	gap: 10px;
	font-weight: 600;
	color: var(--color-main-text);
}

.correction-banner__text small {
	display: block;
	font-weight: 400;
	color: var(--color-text-maxcontrast);
}
</style>

<!-- Globale Abwesenheits-/Feiertags-Farben (geteilt von DayList, MonthCalendar, DayDetailPanel) -->
<style>
:root {
	--wt-vacation: #4a9d63;
	--wt-sick: #cc4b42;
	--wt-holiday: #c98b3a;
	--wt-child-sick: #d4763a;
	--wt-compensatory: #7c3aed;
	--wt-unpaid: #6b7280;
	--wt-special: #0891b2;
}

/* Trenner zwischen NcSettingsSection-Themen kräftiger (Default --color-border ist kaum sichtbar) */
.settings-section:not(:last-child) {
	border-bottom-color: var(--color-border-dark, var(--color-border)) !important;
}
</style>
