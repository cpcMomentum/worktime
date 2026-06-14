<template>
	<NcModal :name="t('worktime', 'Korrektur – Begründung')" @close="$emit('close')">
		<div class="correction-reason">
			<h3>{{ t('worktime', 'Begründung für die Korrektur') }}</h3>
			<p class="correction-reason__hint">
				{{ t('worktime', 'Die Änderung wird protokolliert. In abgeschlossenen Monaten ist eine Begründung Pflicht; der Monat wird danach zur erneuten Genehmigung geöffnet.') }}
			</p>
			<div class="form-group">
				<label for="correction-reason-text">{{ t('worktime', 'Begründung (mindestens 10 Zeichen)') }}</label>
				<textarea id="correction-reason-text"
					ref="textarea"
					v-model="reason"
					rows="3"
					class="input-field"
					:placeholder="t('worktime', 'z. B. Stempelfehler nach Rücksprache mit der Mitarbeiterin korrigiert')" />
				<div class="charcount" :class="{ bad: reason.trim().length > 0 && reason.trim().length < 10 }">
					{{ reason.trim().length }} / 10
				</div>
			</div>
			<div class="form-actions">
				<NcButton type="tertiary" @click="$emit('close')">
					{{ t('worktime', 'Abbrechen') }}
				</NcButton>
				<NcButton type="primary"
					:disabled="reason.trim().length < 10"
					@click="confirm">
					{{ t('worktime', 'Korrektur speichern') }}
				</NcButton>
			</div>
		</div>
	</NcModal>
</template>

<script>
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'

export default {
	name: 'CorrectionReasonModal',
	components: {
		NcModal,
		NcButton,
	},
	emits: ['confirm', 'close'],
	data() {
		return {
			reason: '',
		}
	},
	mounted() {
		this.$nextTick(() => this.$refs.textarea?.focus())
	},
	methods: {
		confirm() {
			const reason = this.reason.trim()
			if (reason.length >= 10) {
				this.$emit('confirm', reason)
			}
		},
	},
}
</script>

<style scoped>
.correction-reason {
	padding: 20px 24px 24px;
}

.correction-reason__hint {
	color: var(--color-text-maxcontrast);
	margin-bottom: 16px;
}

.correction-reason .form-group {
	margin-bottom: 16px;
}

.correction-reason .input-field {
	width: 100%;
	border: 1px solid var(--color-border-dark);
	border-radius: var(--border-radius);
	padding: 8px 10px;
	font-family: inherit;
	font-size: 14px;
	resize: vertical;
}

.correction-reason .charcount {
	font-size: 0.85em;
	color: var(--color-text-maxcontrast);
	margin-top: 4px;
}

.correction-reason .charcount.bad {
	color: var(--color-error);
}

.correction-reason .form-actions {
	display: flex;
	gap: 8px;
	justify-content: flex-end;
}
</style>
