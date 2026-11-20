import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router/index.js'
import { usePermissionsStore } from './stores/permissions.ts'
import { shouldRestoreLastView } from './utils/settingsSection.js'
import { registerModalEscape } from './utils/modalEscape.js'
import { translate, translatePlural } from '@nextcloud/l10n'
import { loadState } from '@nextcloud/initial-state'
import '@nextcloud/dialogs/style.css'

const app = createApp(App)
// Pinia vor dem Router: der Routen-Waechter liest den Berechtigungs-Store
app.use(createPinia())

app.config.globalProperties.t = translate
app.config.globalProperties.n = translatePlural

const permissionsStore = usePermissionsStore()
permissionsStore.initFromInitialState(loadState('worktime', 'permissions', {}))
permissionsStore.setApprovalRequired(loadState('worktime', 'approvalRequired', false))
permissionsStore.setRequiredFields({
	requireProject: loadState('worktime', 'requireProject', false),
	requireDescription: loadState('worktime', 'requireDescription', false),
})
permissionsStore.setHourlySickEnabled(loadState('worktime', 'hourlySickEnabled', false))
permissionsStore.setEmergencyWorkEnabled(loadState('worktime', 'emergencyWorkEnabled', false))

app.use(router)

// Letzte Ansicht wiederherstellen, wenn die URL keine eigene Route nennt
const savedView = localStorage.getItem('worktime_last_view')
if (shouldRestoreLastView(window.location.hash, savedView)) {
	router.push(savedView).catch(() => {})
}

app.mount('.app-worktime')
registerModalEscape()
