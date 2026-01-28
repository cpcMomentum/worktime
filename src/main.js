import Vue from 'vue'
import App from './App.vue'
import store from './store/index.js'
import { translate, translatePlural } from '@nextcloud/l10n'
import { loadState } from '@nextcloud/initial-state'

// eslint-disable-next-line
__webpack_public_path__ = OC.linkTo('worktime', 'js/')

Vue.prototype.t = translate
Vue.prototype.n = translatePlural

// Get permissions from Nextcloud Initial State API
const permissions = loadState('worktime', 'permissions', {})

// Initialize permissions in store
store.dispatch('permissions/initFromInitialState', permissions)

new Vue({
    store,
    render: h => h(App),
}).$mount('.app-worktime')
