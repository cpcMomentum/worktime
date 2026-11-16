<!--
  - SPDX-FileCopyrightText: 2026 cpcMomentum
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
    <div class="wt-werkplus">
        <p class="wt-werkplus__hint">
            {{ t('worktime', 'Mit einem WerkPlus-Schlüssel schaltet WorkTime zusätzliche Funktionen frei. Ohne Schlüssel bleibt alles, wie es ist.') }}
            {{ t('worktime', 'Der Schlüssel gilt für alle Werk-Apps dieser Nextcloud und muss nur in einer davon eingetragen werden.') }}
        </p>

        <NcNoteCard v-if="loadError" type="error">
            {{ loadError }}
        </NcNoteCard>

        <template v-if="status">
            <NcNoteCard v-if="status.storeTooNew" type="warning">
                {{ t('worktime', 'Eine andere Werk-App hat die Lizenz in einem neueren Format gespeichert. Bitte aktualisiere WorkTime.') }}
            </NcNoteCard>
            <NcNoteCard v-if="stateNote" :type="stateNote.type">
                {{ stateNote.text }}
            </NcNoteCard>
            <NcNoteCard v-if="trialKey" type="success" class="wt-werkplus__trial-key">
                <p v-if="licenseActive">
                    {{ t('worktime', 'Der Testzeitraum läuft. Das ist dein WerkPlus-Schlüssel:') }}
                </p>
                <p v-else>
                    {{ t('worktime', 'Der Testzeitraum ist gestartet, die Lizenz konnte aber noch nicht geprüft werden. Mit „Jetzt prüfen“ versuchst du es erneut. Das ist dein WerkPlus-Schlüssel:') }}
                </p>
                <p><code>{{ trialKey }}</code></p>
                <p>{{ t('worktime', 'Bitte bewahre ihn sicher auf. Er ist hinterlegt, wird aber nur jetzt vollständig angezeigt.') }}</p>
            </NcNoteCard>
            <NcNoteCard v-if="actionInfo" type="info">
                {{ actionInfo }}
            </NcNoteCard>
            <NcNoteCard v-if="actionError" type="error">
                {{ actionError }}
            </NcNoteCard>
            <NcNoteCard v-else-if="status.lastError" type="warning">
                {{ status.lastError.message }}
            </NcNoteCard>

            <dl v-if="status.keySet" class="wt-werkplus__facts">
                <dt>{{ t('worktime', 'Tarif') }}</dt>
                <dd>{{ tierLabel }}</dd>
                <template v-if="status.licensedEmployees">
                    <dt>{{ t('worktime', 'Lizenzierte Mitarbeitende') }}</dt>
                    <dd>{{ status.licensedEmployees }}</dd>
                </template>
                <template v-if="status.expiresAt">
                    <dt>{{ t('worktime', 'Gültig bis') }}</dt>
                    <dd>{{ formatDate(status.expiresAt) }}</dd>
                </template>
                <dt>{{ t('worktime', 'Letzte erfolgreiche Prüfung') }}</dt>
                <dd>{{ status.lastCheckAt ? formatDateTime(status.lastCheckAt) : t('worktime', 'noch keine') }}</dd>
                <dt>{{ t('worktime', 'Schlüssel') }}</dt>
                <dd>{{ status.keyHint }}</dd>
            </dl>

            <p v-if="!status.canManage && !status.storeTooNew" class="wt-werkplus__hint">
                {{ t('worktime', 'Den Schlüssel können nur Nextcloud-Admins eintragen oder entfernen, weil er für alle Werk-Apps dieser Nextcloud gilt.') }}
            </p>

            <div v-if="canEdit" class="wt-werkplus__field">
                <label for="wt-werkplus-key">{{ t('worktime', 'WerkPlus-Schlüssel') }}</label>
                <input id="wt-werkplus-key"
                    v-model="keyInput"
                    type="text"
                    autocomplete="off"
                    spellcheck="false"
                    :placeholder="status.keySet ? t('worktime', 'gespeichert, leer lassen') : 'wp_…'">
            </div>

            <div v-if="canEdit" class="wt-werkplus__actions">
                <NcButton type="primary" :disabled="busy || (!keyInput.trim() && !status.keySet)" @click="onActivate">
                    {{ status.keySet ? t('worktime', 'Speichern und prüfen') : t('worktime', 'Schlüssel prüfen und speichern') }}
                </NcButton>
                <NcButton v-if="!status.keySet" :disabled="busy" @click="onTrial">
                    {{ t('worktime', '30 Tage testen') }}
                </NcButton>
                <NcButton v-if="status.keySet" :disabled="busy" @click="onRefresh">
                    {{ t('worktime', 'Jetzt prüfen') }}
                </NcButton>
                <NcButton v-if="status.keySet" type="tertiary" :disabled="busy" @click="onRemove">
                    {{ t('worktime', 'Schlüssel entfernen') }}
                </NcButton>
            </div>

            <div class="wt-werkplus__privacy">
                <p class="wt-werkplus__label">
                    {{ t('worktime', 'Was an WerkPlus übertragen wird') }}
                </p>
                <p class="wt-werkplus__hint">
                    {{ t('worktime', 'Eine aus dieser Nextcloud abgeleitete Kennung, die Versionen der aktivierten Werk-Apps und, sobald vorhanden, der Schlüssel. Nicht übertragen werden Arbeitszeiten, Abwesenheiten oder andere Personendaten, Nextcloud-Benutzer- oder Datei-IDs.') }}
                </p>
                <p class="wt-werkplus__hint">
                    {{ t('worktime', 'Die Lizenz wird auf diesem Server geprüft. Ist WerkPlus nicht erreichbar, arbeitet WorkTime normal weiter.') }}
                </p>
                <p class="wt-werkplus__hint">
                    {{ t('worktime', 'Kennung dieser Nextcloud:') }} <code>{{ status.instanceUuid }}</code>
                </p>
            </div>
        </template>
    </div>
</template>

<script>
import { translate as t } from '@nextcloud/l10n'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcNoteCard from '@nextcloud/vue/dist/Components/NcNoteCard.js'
import LicenseService from '../services/LicenseService.js'
import { confirmAction } from '../utils/errorHandler.js'
import { getLocale } from '../utils/dateUtils.js'

// Kein Fehler im eigentlichen Sinn, der Vertrag verlangt eine ruhige Anzeige.
const CALM_CODES = ['TRIAL_ALREADY_USED']

export default {
    name: 'WerkPlusSettings',
    components: { NcButton, NcNoteCard },
    data() {
        return {
            status: null,
            keyInput: '',
            busy: false,
            loadError: '',
            actionError: '',
            actionInfo: '',
            trialKey: '',
        }
    },
    computed: {
        canEdit() {
            return this.status?.canManage === true && !this.status.storeTooNew
        },
        licenseActive() {
            return ['valid', 'grace'].includes(this.status?.state)
        },
        tierLabel() {
            return this.status?.tier === 'werkplus' ? 'WerkPlus' : t('worktime', 'Frei')
        },
        stateNote() {
            const s = this.status
            switch (s?.state) {
            case 'valid':
                return { type: 'success', text: t('worktime', 'WerkPlus ist aktiv.') }
            case 'grace':
                return {
                    type: 'warning',
                    text: t('worktime', 'Die Lizenz ist abgelaufen und konnte noch nicht erneuert werden. Die Funktionen bleiben bis {date} erhalten.', { date: s.graceUntil ? this.formatDate(s.graceUntil) : '' }),
                }
            case 'expired':
                return { type: 'error', text: t('worktime', 'Die Lizenz ist abgelaufen. WorkTime arbeitet im freien Umfang weiter.') }
            case 'invalid':
                return { type: 'error', text: t('worktime', 'Der gespeicherte Lizenznachweis ist ungültig. Bitte prüfe die Lizenz erneut.') }
            default:
                return null
            }
        },
    },
    mounted() {
        this.load()
    },
    methods: {
        formatDate(iso) {
            return new Date(iso).toLocaleDateString(getLocale())
        },
        formatDateTime(iso) {
            return new Date(iso).toLocaleString(getLocale())
        },
        async load() {
            try {
                this.status = await LicenseService.get()
                this.loadError = ''
            } catch (e) {
                this.loadError = e.message || t('worktime', 'Lizenzstatus konnte nicht geladen werden.')
            }
        },
        // Nach einem Fehler den Status neu laden, die Eingabe aber stehen lassen.
        async run(action) {
            this.busy = true
            this.actionError = ''
            this.actionInfo = ''
            try {
                this.status = await action()
                this.keyInput = ''
            } catch (e) {
                const text = e.message || t('worktime', 'WerkPlus hat einen Fehler gemeldet. Bitte versuche es später erneut.')
                if (e.code && CALM_CODES.includes(e.code)) {
                    this.actionInfo = text
                } else {
                    this.actionError = text
                }
                await this.load()
            } finally {
                this.busy = false
            }
        },
        onActivate() {
            this.trialKey = ''
            return this.run(() => LicenseService.activate(this.keyInput.trim()))
        },
        async onTrial() {
            const ok = await confirmAction(
                t('worktime', 'Der Testzeitraum läuft 30 Tage, braucht keine Zahlungsdaten, gilt für alle Werk-Apps dieser Nextcloud und ist je Nextcloud nur einmal möglich. Jetzt starten?'),
                t('worktime', 'WerkPlus 30 Tage testen'),
                t('worktime', 'Testzeitraum starten'),
            )
            if (!ok) {
                return
            }
            this.trialKey = ''
            return this.run(async () => {
                const result = await LicenseService.startTrial()
                this.trialKey = result.key
                return result.status
            })
        },
        onRefresh() {
            return this.run(LicenseService.refresh)
        },
        async onRemove() {
            const ok = await confirmAction(
                t('worktime', 'Der Schlüssel wird für alle Werk-Apps dieser Nextcloud entfernt, sie arbeiten danach im freien Umfang. Den Schlüssel kannst du jederzeit wieder eintragen. Fortfahren?'),
                t('worktime', 'WerkPlus-Schlüssel entfernen'),
                t('worktime', 'Entfernen'),
                true,
            )
            if (!ok) {
                return
            }
            this.trialKey = ''
            return this.run(LicenseService.remove)
        },
    },
}
</script>

<style scoped>
.wt-werkplus__hint {
    color: var(--color-text-maxcontrast);
    margin: 0 0 12px;
}

.wt-werkplus__facts {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 4px 16px;
    margin: 12px 0 16px;
}

/* Nextcloud gibt dt/dd global eine feste Breite, Rechtsbuendigkeit und Innenabstand mit. */
.wt-werkplus__facts dt,
.wt-werkplus__facts dd {
    width: auto;
    margin: 0;
    padding: 0;
    text-align: start;
}

.wt-werkplus__facts dt {
    color: var(--color-text-maxcontrast);
}

.wt-werkplus__field {
    display: flex;
    flex-direction: column;
    gap: 6px;
    max-width: 480px;
    margin-bottom: 16px;
}

.wt-werkplus__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin: 12px 0 20px;
}

.wt-werkplus__label {
    font-weight: 600;
    margin: 0 0 6px;
}

.wt-werkplus__privacy code,
.wt-werkplus__trial-key code {
    user-select: all;
}
</style>
