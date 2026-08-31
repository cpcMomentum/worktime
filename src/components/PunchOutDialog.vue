<template>
	<NcModal :name="t('worktime', 'Ausstempeln')" @close="$emit('close')">
		<div class="punch-out">
			<h3>{{ t('worktime', 'Zeiteintrag bestätigen') }}</h3>
			<p class="punch-out__hint">
				{{ t('worktime', 'Prüfe die Zeiten und bestätige, um den Zeiteintrag anzulegen.') }}
			</p>

			<NcNoteCard v-if="isOverlong" type="warning">
				{{ t('worktime', 'Du bist seit {hours} h eingestempelt. Bitte prüfe das Ende, bevor du buchst.', { hours: grossHours }) }}
			</NcNoteCard>

			<NcNoteCard v-if="emergencyReasonRequired" type="warning">
				{{ t('worktime', 'An diesem Tag haben Sie genehmigten Urlaub. Diese Zeit wird als Notarbeit im Urlaub gebucht (zusätzlich zum Urlaub). Bitte geben Sie eine Begründung an.') }}
			</NcNoteCard>

			<div class="punch-out__grid">
				<div class="form-group">
					<label for="punch-date">{{ t('worktime', 'Datum') }}</label>
					<input id="punch-date" v-model="form.date" type="date" class="input-field" disabled>
				</div>
				<div class="form-group">
					<label for="punch-start">{{ t('worktime', 'Start') }}</label>
					<input id="punch-start" v-model="form.startTime" type="time" class="input-field" disabled>
				</div>
				<div class="form-group">
					<label for="punch-end">{{ t('worktime', 'Ende') }}</label>
					<input id="punch-end" v-model="form.endTime" type="time" class="input-field">
				</div>
				<div class="form-group">
					<label for="punch-break">{{ t('worktime', 'Pause (Minuten)') }}</label>
					<input id="punch-break" v-model.number="form.breakMinutes" type="number" min="0" class="input-field">
				</div>
			</div>

			<div v-if="projectOptions.length > 0" class="form-group">
				<label for="punch-project">{{ t('worktime', 'Projekt') }}</label>
				<NcSelect id="punch-project"
					v-model="selectedProject"
					:options="projectOptions"
					label="label"
					:placeholder="t('worktime', 'Kein Projekt')" />
			</div>

			<div class="form-group">
				<label for="punch-desc">{{ emergencyReasonRequired ? t('worktime', 'Begründung (erforderlich)') : t('worktime', 'Notiz') }}</label>
				<textarea id="punch-desc"
					v-model="form.description"
					rows="2"
					class="input-field"
					:placeholder="emergencyReasonRequired ? t('worktime', 'Grund für die Notarbeit im Urlaub') : t('worktime', 'Optionale Notiz')" />
			</div>

			<p class="punch-out__net">
				{{ t('worktime', 'Nettozeit: {duration}', { duration: netLabel }) }}
			</p>

			<NcNoteCard v-if="error" type="error">
				{{ error }}
			</NcNoteCard>

			<div class="form-actions">
				<NcButton type="tertiary" :disabled="saving" @click="$emit('close')">
					{{ t('worktime', 'Abbrechen') }}
				</NcButton>
				<NcButton type="primary" :disabled="!isValid || saving" @click="confirm">
					<template v-if="saving" #icon>
						<NcLoadingIcon :size="20" />
					</template>
					{{ t('worktime', 'Buchen') }}
				</NcButton>
			</div>
		</div>
	</NcModal>
</template>

<script>
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import NcNoteCard from '@nextcloud/vue/dist/Components/NcNoteCard.js'
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import TimeEntryService from '../services/TimeEntryService.js'
import SettingsService from '../services/SettingsService.js'

export default {
	name: 'PunchOutDialog',
	components: {
		NcModal,
		NcButton,
		NcSelect,
		NcNoteCard,
		NcLoadingIcon,
	},
	props: {
		punch: {
			type: Object,
			required: true,
		},
		projectOptions: {
			type: Array,
			default: () => [],
		},
	},
	emits: ['booked', 'close'],
	data() {
		return {
			form: {
				date: '',
				startTime: '',
				endTime: '',
				breakMinutes: 0,
				projectId: null,
				description: '',
			},
			maxDailyHours: 10,
			saving: false,
			error: null,
			// #664: true when this punch is emergency work (#626) — a full approved
			// vacation day with the feature on. Set proactively from the punch's
			// emergencyEligible flag, and defensively on a reason_required 409.
			// Drives the hint card and the mandatory reason field.
			emergencyReasonRequired: false,
		}
	},
	computed: {
		selectedProject: {
			get() {
				return this.projectOptions.find((p) => p.id === this.form.projectId) || null
			},
			set(value) {
				this.form.projectId = value?.id || null
			},
		},
		grossMinutes() {
			return this.spanMinutes(this.form.startTime, this.form.endTime)
		},
		netMinutes() {
			return Math.max(0, this.grossMinutes - Math.max(0, this.form.breakMinutes || 0))
		},
		netLabel() {
			const h = Math.floor(this.netMinutes / 60)
			const m = this.netMinutes % 60
			return `${h} h ${String(m).padStart(2, '0')} min`
		},
		grossHours() {
			return (this.grossMinutes / 60).toFixed(1)
		},
		isOverlong() {
			return this.grossMinutes > this.maxDailyHours * 60
		},
		isValid() {
			if (!this.form.date || !this.form.startTime || !this.form.endTime || this.netMinutes <= 0) {
				return false
			}
			// #664: emergency work on a vacation day requires a reason.
			if (this.emergencyReasonRequired && this.form.description.trim() === '') {
				return false
			}
			return true
		},
	},
	async created() {
		this.prefill()
		// #664: the server tags an open punch on a full approved vacation day
		// (emergency work enabled) with emergencyEligible. Surface the hint and the
		// mandatory reason field up front — not only reactively after a 409 — so an
		// emergency booking is never silent, even when a punch-in note pre-fills the
		// description.
		if (this.punch.emergencyEligible) {
			this.emergencyReasonRequired = true
		}
		try {
			const value = await SettingsService.get('max_daily_hours')
			if (value !== undefined && value !== null) {
				this.maxDailyHours = parseFloat(value)
			}
		} catch (e) {
			// Fallback 10h; the server enforces the real threshold anyway.
		}
	},
	methods: {
		prefill() {
			const start = new Date(this.punch.startedAt)
			// Punching out of a running pause ends the entry at pausedAt — the
			// moment work stopped. WorkTime books work, not attendance, so the
			// open pause is discarded rather than counted (#617). A running
			// punch ends now. The user can still correct the end below.
			const end = this.punch.isPaused && this.punch.pausedAt
				? new Date(this.punch.pausedAt)
				: new Date()
			this.form.date = this.toYmd(start)
			this.form.startTime = this.toHm(start)
			this.form.endTime = this.toHm(end)
			this.form.projectId = this.punch.projectId || null
			this.form.description = this.punch.description || ''

			if (this.punch.breakSeconds > 0) {
				this.form.breakMinutes = Math.round(this.punch.breakSeconds / 60)
			} else {
				this.suggestBreak()
			}
		},
		async suggestBreak() {
			try {
				this.form.breakMinutes = await TimeEntryService.suggestBreak(this.form.startTime, this.form.endTime)
			} catch (e) {
				this.form.breakMinutes = 0
			}
		},
		spanMinutes(start, end) {
			if (!start || !end) return 0
			const [sh, sm] = start.split(':').map(Number)
			const [eh, em] = end.split(':').map(Number)
			let span = (eh * 60 + em) - (sh * 60 + sm)
			// Only a genuine overnight (end before start) wraps +24h. Equal times
			// mean a just-started punch — 0, not 24h, so "Buchen" stays disabled
			// until the user corrects the end.
			if (span < 0) span += 24 * 60
			return span
		},
		toYmd(d) {
			const y = d.getFullYear()
			const m = String(d.getMonth() + 1).padStart(2, '0')
			const day = String(d.getDate()).padStart(2, '0')
			return `${y}-${m}-${day}`
		},
		toHm(d) {
			return `${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`
		},
		async confirm() {
			if (!this.isValid || this.saving) return
			this.saving = true
			this.error = null
			try {
				const entry = await this.$store.dispatch('punch/punchOut', {
					employeeId: this.punch.employeeId,
					breakMinutes: this.form.breakMinutes,
					projectId: this.form.projectId,
					description: this.form.description || null,
					endTime: this.form.endTime,
					// The user reviewed the values in this dialog — that is the
					// confirmation the overlong guard asks for.
					confirm: true,
				})
				this.$emit('booked', entry)
			} catch (e) {
				// #664: emergency work on a vacation day needs a reason. The server
				// asks for it via reason_required; reveal the mandatory field and let
				// the user fill it in — the punch stays open in the meantime.
				if (e.code === 'reason_required') {
					this.emergencyReasonRequired = true
				}
				// Server rejected (overlap, locked month, reason, …). The punch stays open.
				this.error = e.message || this.t('worktime', 'Buchen fehlgeschlagen.')
			} finally {
				this.saving = false
			}
		},
	},
}
</script>

<style scoped>
.punch-out {
	padding: 20px 24px 24px;
}

.punch-out__hint {
	color: var(--color-text-maxcontrast);
	margin-bottom: 16px;
}

.punch-out__grid {
	display: grid;
	grid-template-columns: 1fr 1fr;
	gap: 12px 16px;
	margin-bottom: 16px;
}

.punch-out .form-group {
	display: flex;
	flex-direction: column;
	gap: 4px;
	margin-bottom: 12px;
}

.punch-out label {
	font-weight: 600;
	color: var(--color-text-maxcontrast);
}

.punch-out .input-field {
	width: 100%;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius);
	padding: 8px 10px;
	font-family: inherit;
	font-size: 14px;
	background: var(--color-main-background);
	color: var(--color-main-text);
}

.punch-out textarea.input-field {
	resize: vertical;
}

.punch-out .input-field:disabled {
	opacity: 0.6;
	cursor: not-allowed;
}

.punch-out__net {
	font-weight: 600;
	margin: 8px 0 16px;
}

.form-actions {
	display: flex;
	justify-content: flex-end;
	gap: 8px;
}
</style>
