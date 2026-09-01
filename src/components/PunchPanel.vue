<template>
	<div class="punch-panel" :class="{ 'punch-panel--running': isPunchedIn }">
		<!-- Not punched in -->
		<template v-if="!isPunchedIn">
			<div class="punch-panel__idle">
				<div class="punch-panel__idle-fields">
					<NcSelect v-if="projectOptions.length > 0"
						v-model="selectedProject"
						class="punch-panel__project"
						:options="projectOptions"
						label="label"
						:placeholder="t('worktime', 'Projekt (optional)')" />
					<input v-model="note"
						type="text"
						class="punch-panel__note"
						:placeholder="t('worktime', 'Notiz (optional)')">
				</div>
				<NcButton type="primary" :disabled="busy" @click="doPunchIn">
					<template #icon>
						<PlayIcon :size="20" />
					</template>
					{{ t('worktime', 'Einstempeln') }}
				</NcButton>
			</div>
		</template>

		<!-- Running / paused -->
		<template v-else>
			<div class="punch-panel__running">
				<div class="punch-panel__clock">
					<ClockIcon :size="22" />
					<span class="punch-panel__time">{{ elapsedLabel }}</span>
					<span v-if="isPunchPaused" class="punch-panel__paused-badge">
						{{ t('worktime', 'In Pause') }}
					</span>
				</div>
				<div class="punch-panel__actions">
					<NcButton v-if="!isPunchPaused" type="secondary" :disabled="busy" @click="doPause">
						<template #icon>
							<PauseIcon :size="20" />
						</template>
						{{ t('worktime', 'Pause') }}
					</NcButton>
					<NcButton v-else type="secondary" :disabled="busy" @click="doResume">
						<template #icon>
							<PlayIcon :size="20" />
						</template>
						{{ t('worktime', 'Weiter') }}
					</NcButton>
					<NcButton type="primary" :disabled="busy" @click="openPunchOut">
						<template #icon>
							<StopIcon :size="20" />
						</template>
						{{ t('worktime', 'Ausstempeln') }}
					</NcButton>
					<NcButton type="tertiary" :disabled="busy" @click="doDiscard">
						<template #icon>
							<DeleteIcon :size="20" />
						</template>
						{{ t('worktime', 'Verwerfen') }}
					</NcButton>
				</div>
			</div>
		</template>

		<NcNoteCard v-if="error" type="error" class="punch-panel__error">
			{{ error }}
		</NcNoteCard>

		<!-- The dialog binds a snapshot, not the live activePunch: punch-out clears
		     activePunch, and gating the dialog's v-if on it would tear the dialog
		     down before its "booked" event can fire (the refresh would be lost). -->
		<PunchOutDialog v-if="showPunchOut && punchSnapshot"
			:punch="punchSnapshot"
			:project-options="projectOptions"
			@booked="onBooked"
			@close="closePunchOut" />
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcNoteCard from '@nextcloud/vue/dist/Components/NcNoteCard.js'
import ClockIcon from 'vue-material-design-icons/Clock.vue'
import PlayIcon from 'vue-material-design-icons/Play.vue'
import PauseIcon from 'vue-material-design-icons/Pause.vue'
import StopIcon from 'vue-material-design-icons/Stop.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import PunchOutDialog from './PunchOutDialog.vue'
import { confirmAction } from '../utils/errorHandler.js'

export default {
	name: 'PunchPanel',
	components: {
		NcButton,
		NcSelect,
		NcNoteCard,
		ClockIcon,
		PlayIcon,
		PauseIcon,
		StopIcon,
		DeleteIcon,
		PunchOutDialog,
	},
	props: {
		employeeId: {
			type: Number,
			required: true,
		},
		projectOptions: {
			type: Array,
			default: () => [],
		},
	},
	emits: ['booked'],
	data() {
		return {
			now: Date.now(),
			timer: null,
			showPunchOut: false,
			punchSnapshot: null,
			note: '',
			projectId: null,
			busy: false,
			error: null,
		}
	},
	computed: {
		...mapGetters('punch', ['activePunch', 'isPunchedIn', 'isPunchPaused']),
		selectedProject: {
			get() {
				return this.projectOptions.find((p) => p.id === this.projectId) || null
			},
			set(value) {
				this.projectId = value?.id || null
			},
		},
		elapsedLabel() {
			if (!this.activePunch?.startedAt) return '00:00:00'
			const started = new Date(this.activePunch.startedAt).getTime()
			const seconds = Math.max(0, Math.floor((this.now - started) / 1000))
			const h = Math.floor(seconds / 3600)
			const m = Math.floor((seconds % 3600) / 60)
			const s = seconds % 60
			return [h, m, s].map((n) => String(n).padStart(2, '0')).join(':')
		},
	},
	watch: {
		employeeId() {
			this.refresh()
		},
	},
	mounted() {
		this.refresh()
		this.timer = setInterval(() => {
			this.now = Date.now()
		}, 1000)
	},
	beforeDestroy() {
		if (this.timer) clearInterval(this.timer)
	},
	methods: {
		async refresh() {
			try {
				await this.$store.dispatch('punch/fetchActivePunch', this.employeeId)
			} catch (e) {
				// Non-fatal: the panel simply shows the idle state.
			}
		},
		async doPunchIn() {
			this.busy = true
			this.error = null
			try {
				await this.$store.dispatch('punch/punchIn', {
					employeeId: this.employeeId,
					projectId: this.projectId,
					description: this.note || null,
				})
				this.note = ''
				this.projectId = null
			} catch (e) {
				this.error = e.message || this.t('worktime', 'Einstempeln fehlgeschlagen.')
			} finally {
				this.busy = false
			}
		},
		async doPause() {
			this.busy = true
			this.error = null
			try {
				await this.$store.dispatch('punch/punchPause', this.employeeId)
			} catch (e) {
				this.error = e.message || this.t('worktime', 'Pause fehlgeschlagen.')
			} finally {
				this.busy = false
			}
		},
		async doResume() {
			this.busy = true
			this.error = null
			try {
				await this.$store.dispatch('punch/punchResume', this.employeeId)
			} catch (e) {
				this.error = e.message || this.t('worktime', 'Fortsetzen fehlgeschlagen.')
			} finally {
				this.busy = false
			}
		},
		openPunchOut() {
			// Snapshot the punch so the dialog survives punch-out clearing activePunch.
			this.punchSnapshot = this.activePunch
			this.showPunchOut = true
		},
		closePunchOut() {
			this.showPunchOut = false
			this.punchSnapshot = null
		},
		onBooked() {
			this.closePunchOut()
			this.$emit('booked')
		},
		async doDiscard() {
			// #613: discarding books nothing and cannot be undone — confirm first.
			const ok = await confirmAction(
				this.t('worktime', 'Die laufende Stempelung wird ohne Buchung verworfen. Fortfahren?'),
				this.t('worktime', 'Stempelung verwerfen'),
				this.t('worktime', 'Verwerfen'),
				true,
			)
			if (!ok) return
			this.busy = true
			this.error = null
			try {
				await this.$store.dispatch('punch/punchDiscard', this.employeeId)
			} catch (e) {
				this.error = e.message || this.t('worktime', 'Verwerfen fehlgeschlagen.')
			} finally {
				this.busy = false
			}
		},
	},
}
</script>

<style scoped>
.punch-panel {
	border: 1px solid var(--color-border);
	border-radius: var(--border-radius-large, 8px);
	background: var(--color-background-hover);
	padding: 12px 16px;
	margin-bottom: 16px;
}

.punch-panel--running {
	border-left: 4px solid var(--color-success, #46ba61);
}

.punch-panel__idle,
.punch-panel__running {
	display: flex;
	align-items: center;
	justify-content: space-between;
	gap: 16px;
	flex-wrap: wrap;
}

.punch-panel__idle-fields {
	display: flex;
	align-items: center;
	gap: 12px;
	flex: 1;
	flex-wrap: wrap;
}

.punch-panel__project {
	min-width: 200px;
}

.punch-panel__note {
	flex: 1;
	min-width: 160px;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius);
	padding: 8px 10px;
	background: var(--color-main-background);
	color: var(--color-main-text);
}

.punch-panel__clock {
	display: flex;
	align-items: center;
	gap: 10px;
}

.punch-panel__time {
	font-size: 1.6em;
	font-weight: 600;
	font-variant-numeric: tabular-nums;
	color: var(--color-main-text);
}

.punch-panel__paused-badge {
	padding: 2px 10px;
	border-radius: var(--border-radius-pill, 16px);
	background: var(--color-warning, #c7870e);
	color: #fff;
	font-size: 0.85em;
	font-weight: 600;
}

.punch-panel__actions {
	display: flex;
	gap: 8px;
}

.punch-panel__error {
	margin-top: 12px;
}
</style>
