<template>
    <div class="approval-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Genehmigungen') }}</h2>
        </div>

        <NcLoadingIcon v-if="loading" :size="44" class="loading" />

        <template v-else>
            <!-- Eingangsliste: Urlaubsanträge + Monatsabschlüsse, älteste zuerst (#344/#240) -->
            <section v-if="inboxItems.length > 0" class="inbox">
                <p class="inbox-hint">
                    {{ t('worktime', 'Älteste zuerst – auch aus früheren Monaten.') }}
                </p>
                <div class="chips">
                    <button class="chip" :class="{ active: kindFilter === 'all' }" @click="kindFilter = 'all'">
                        {{ t('worktime', 'Alle') }} {{ inboxItems.length }}
                    </button>
                    <button class="chip" :class="{ active: kindFilter === 'absence' }" @click="kindFilter = 'absence'">
                        {{ t('worktime', 'Urlaub') }} {{ absenceCount }}
                    </button>
                    <button class="chip" :class="{ active: kindFilter === 'month' }" @click="kindFilter = 'month'">
                        {{ t('worktime', 'Zeiten') }} {{ monthCount }}
                    </button>
                </div>

                <table class="approval-table">
                    <thead>
                        <tr>
                            <th>{{ t('worktime', 'Mitarbeiter') }}</th>
                            <th>{{ t('worktime', 'Art') }}</th>
                            <th>{{ t('worktime', 'Details') }}</th>
                            <th class="actions-col">{{ t('worktime', 'Aktion') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="item in filteredItems" :key="item.key">
                            <td>
                                <div class="who">
                                    <NcAvatar :user="item.employeeUserId" :display-name="item.employeeName" :size="30" />
                                    <span class="employee-name">{{ item.employeeName }}</span>
                                </div>
                            </td>
                            <td>
                                <span class="kind" :class="item.kind">
                                    <span class="kind-dot"></span>
                                    {{ item.kind === 'month' ? t('worktime', 'Monat') : item.typeLabel }}
                                </span>
                            </td>
                            <td class="detail">{{ item.detail }}</td>
                            <td class="actions-col">
                                <div class="actions">
                                    <template v-if="item.kind === 'absence'">
                                        <NcButton type="primary"
                                            :disabled="processingAbsence === item.id"
                                            @click="approveAbsence(item.id)">
                                            <template #icon><CheckIcon :size="18" /></template>
                                            {{ t('worktime', 'Genehmigen') }}
                                        </NcButton>
                                        <NcButton type="tertiary"
                                            :disabled="processingAbsence === item.id"
                                            @click="rejectAbsence(item.id)">
                                            <template #icon><CloseIcon :size="18" /></template>
                                            {{ t('worktime', 'Ablehnen') }}
                                        </NcButton>
                                    </template>
                                    <template v-else>
                                        <NcButton type="primary"
                                            :disabled="processingMonth === item.key"
                                            @click="approveMonthItem(item)">
                                            <template #icon><CheckIcon :size="18" /></template>
                                            {{ t('worktime', 'Genehmigen') }}
                                        </NcButton>
                                        <NcButton type="tertiary"
                                            :disabled="processingMonth === item.key"
                                            @click="openReopenModal(item)">
                                            <template #icon><RestoreIcon :size="18" /></template>
                                            {{ t('worktime', 'Zurückweisen') }}
                                        </NcButton>
                                    </template>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <!-- Zur Kenntnisnahme: gemeldete Abwesenheiten (z.B. Krankheit), keine Genehmigung nötig -->
            <section v-if="informationalAbsences.length > 0" class="info-section">
                <h3>
                    {{ t('worktime', 'Zur Kenntnisnahme') }}
                    <InfoIcon>{{ t('worktime', 'Diese Abwesenheiten (z.B. Krankheit) werden nur gemeldet und brauchen keine Genehmigung. Sie werden automatisch in der Sollberechnung berücksichtigt.') }}</InfoIcon>
                    ({{ informationalAbsences.length }})
                </h3>
                <table class="approval-table">
                    <tbody>
                        <tr v-for="absence in informationalAbsences" :key="'info-' + absence.id">
                            <td>
                                <div class="who">
                                    <NcAvatar :user="absence.employeeUserId" :display-name="absence.employeeName" :size="30" />
                                    <span class="employee-name">{{ absence.employeeName }}</span>
                                </div>
                            </td>
                            <td><span class="kind sick"><span class="kind-dot"></span>{{ getAbsenceTypeLabel(absence.type) }}</span></td>
                            <td class="detail">{{ formatDate(absence.startDate) }} – {{ formatDate(absence.endDate) }} · {{ absence.days }} {{ t('worktime', 'Tage') }}</td>
                            <td class="actions-col"></td>
                        </tr>
                    </tbody>
                </table>
            </section>

            <NcEmptyContent v-if="inboxItems.length === 0 && informationalAbsences.length === 0"
                :name="t('worktime', 'Keine offenen Genehmigungen')">
                <template #icon><CheckIcon /></template>
                <template #description>
                    {{ t('worktime', 'Aktuell wartet nichts auf Ihre Genehmigung.') }}
                </template>
            </NcEmptyContent>
        </template>

        <!-- Monat zurückweisen (Grund erforderlich) -->
        <NcModal v-if="showReopenModal" @close="closeReopenModal">
            <div class="reopen-modal">
                <h3>{{ t('worktime', 'Monat zurückweisen') }}</h3>
                <p>{{ reopenTarget ? getMonthName(reopenTarget.month) + ' ' + reopenTarget.year + ' – ' + reopenTarget.employeeName : '' }}</p>
                <label for="reopen-reason">{{ t('worktime', 'Begründung') }}</label>
                <textarea id="reopen-reason" v-model="reopenReason" rows="3"
                    :placeholder="t('worktime', 'Warum wird die Genehmigung zurückgenommen?')"></textarea>
                <div class="form-actions">
                    <NcButton type="tertiary" @click="closeReopenModal">{{ t('worktime', 'Abbrechen') }}</NcButton>
                    <NcButton type="primary"
                        :disabled="!reopenReason.trim() || reopeningKey !== null"
                        @click="submitReopen">
                        {{ t('worktime', 'Genehmigung zurücknehmen') }}
                    </NcButton>
                </div>
            </div>
        </NcModal>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import NcAvatar from '@nextcloud/vue/dist/Components/NcAvatar.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import RestoreIcon from 'vue-material-design-icons/Restore.vue'
import TimeEntryService from '../services/TimeEntryService.js'
import AbsenceService from '../services/AbsenceService.js'
import { formatDate } from '../utils/dateUtils.js'
import { getAbsenceTypeLabel } from '../utils/formatters.js'
import { formatMinutes } from '../utils/timeUtils.js'
import { showSuccess, showError } from '@nextcloud/dialogs'
import InfoIcon from '../components/InfoIcon.vue'

export default {
    name: 'ApprovalOverviewView',
    components: {
        InfoIcon,
        NcLoadingIcon,
        NcEmptyContent,
        NcAvatar,
        NcButton,
        NcModal,
        CheckIcon,
        CloseIcon,
        RestoreIcon,
    },
    data() {
        return {
            pendingAbsences: [],
            pendingMonths: [],
            informationalAbsences: [],
            loading: false,
            kindFilter: 'all',
            processingAbsence: null,
            processingMonth: null,
            showReopenModal: false,
            reopenTarget: null,
            reopenReason: '',
            reopeningKey: null,
        }
    },
    computed: {
        absenceItems() {
            return this.pendingAbsences.map(a => ({
                key: 'a-' + a.id,
                kind: 'absence',
                id: a.id,
                employeeName: a.employeeName,
                employeeUserId: a.employeeUserId,
                typeLabel: getAbsenceTypeLabel(a.type),
                detail: `${formatDate(a.startDate)} – ${formatDate(a.endDate)} · ${a.days} ${t('worktime', 'Tage')}`,
                waitingSince: (a.createdAt || a.startDate || '').slice(0, 10),
            }))
        },
        monthItems() {
            return this.pendingMonths.map(m => ({
                key: `m-${m.employeeId}-${m.year}-${m.month}`,
                kind: 'month',
                employeeId: m.employeeId,
                year: m.year,
                month: m.month,
                employeeName: m.employeeName,
                employeeUserId: m.employeeUserId,
                detail: `${this.getMonthName(m.month)} ${m.year} · ${formatMinutes(m.actualMinutes)} h · ${m.entryCount} ${t('worktime', 'Einträge')}`,
                waitingSince: (m.submittedAt || `${m.year}-${String(m.month).padStart(2, '0')}-01`).slice(0, 10),
            }))
        },
        inboxItems() {
            return [...this.absenceItems, ...this.monthItems]
                .sort((a, b) => a.waitingSince.localeCompare(b.waitingSince))
        },
        absenceCount() {
            return this.absenceItems.length
        },
        monthCount() {
            return this.monthItems.length
        },
        filteredItems() {
            if (this.kindFilter === 'all') return this.inboxItems
            return this.inboxItems.filter(i => i.kind === this.kindFilter)
        },
    },
    created() {
        this.loadData()
    },
    methods: {
        getAbsenceTypeLabel,
        formatDate,
        getMonthName(month) {
            const names = [
                t('worktime', 'Januar'), t('worktime', 'Februar'), t('worktime', 'März'),
                t('worktime', 'April'), t('worktime', 'Mai'), t('worktime', 'Juni'),
                t('worktime', 'Juli'), t('worktime', 'August'), t('worktime', 'September'),
                t('worktime', 'Oktober'), t('worktime', 'November'), t('worktime', 'Dezember'),
            ]
            return names[month - 1] || String(month)
        },
        async loadData() {
            this.loading = true
            const results = await Promise.allSettled([
                AbsenceService.getPending(),
                TimeEntryService.getPendingMonths(),
                AbsenceService.getInformational(),
            ])
            this.pendingAbsences = results[0].status === 'fulfilled' ? (results[0].value || []) : []
            this.pendingMonths = results[1].status === 'fulfilled' ? (results[1].value || []) : []
            this.informationalAbsences = results[2].status === 'fulfilled' ? (results[2].value || []) : []
            results.forEach((r, i) => {
                if (r.status === 'rejected') {
                    const names = ['getPending', 'getPendingMonths', 'getInformational']
                    console.error(`Failed: ${names[i]}`, r.reason)
                }
            })
            this.loading = false
        },
        async approveAbsence(absenceId) {
            this.processingAbsence = absenceId
            try {
                await AbsenceService.approve(absenceId)
                showSuccess(t('worktime', 'Abwesenheit genehmigt'))
                await this.loadData()
            } catch (error) {
                console.error('Failed to approve absence:', error)
                showError(t('worktime', 'Fehler beim Genehmigen'))
            } finally {
                this.processingAbsence = null
            }
        },
        async rejectAbsence(absenceId) {
            this.processingAbsence = absenceId
            try {
                await AbsenceService.reject(absenceId)
                showSuccess(t('worktime', 'Abwesenheit abgelehnt'))
                await this.loadData()
            } catch (error) {
                console.error('Failed to reject absence:', error)
                showError(t('worktime', 'Fehler beim Ablehnen'))
            } finally {
                this.processingAbsence = null
            }
        },
        async approveMonthItem(item) {
            this.processingMonth = item.key
            try {
                const result = await TimeEntryService.approveMonth(item.employeeId, item.year, item.month)
                showSuccess(t('worktime', '{count} Einträge genehmigt', { count: result.approved }))
                await this.loadData()
            } catch (error) {
                console.error('Failed to approve month:', error)
                showError(t('worktime', 'Fehler beim Genehmigen'))
            } finally {
                this.processingMonth = null
            }
        },
        openReopenModal(item) {
            this.reopenTarget = item
            this.reopenReason = ''
            this.showReopenModal = true
        },
        closeReopenModal() {
            this.showReopenModal = false
            this.reopenTarget = null
            this.reopenReason = ''
        },
        async submitReopen() {
            if (!this.reopenTarget || !this.reopenReason.trim()) return
            const item = this.reopenTarget
            this.reopeningKey = item.key
            try {
                const result = await TimeEntryService.reopenMonth(item.employeeId, item.year, item.month, this.reopenReason.trim())
                showSuccess(t('worktime', '{count} Einträge zur Korrektur freigegeben', { count: result.reopened }))
                this.closeReopenModal()
                await this.loadData()
            } catch (error) {
                console.error('Failed to reopen month:', error)
                showError(t('worktime', 'Fehler beim Zurücknehmen der Genehmigung'))
            } finally {
                this.reopeningKey = null
            }
        },
    },
}
</script>

<style scoped>
.approval-view {
    padding: 20px;
    padding-left: 50px;
    max-width: var(--wt-content-max-width);
}

.view-header {
    margin-bottom: 16px;
}

.view-header h2 {
    font-size: 22px;
    font-weight: 600;
}

.loading {
    margin-top: 40px;
}

.inbox-hint {
    font-size: 12.5px;
    color: #9a6c25;
    background: var(--color-warning-element-light, #fdf6e3);
    border: 1px solid var(--color-warning, #c8932a);
    border-radius: var(--border-radius);
    padding: 8px 12px;
    margin-bottom: 12px;
    display: inline-block;
}

.chips {
    display: flex;
    gap: 8px;
    margin-bottom: 12px;
}

.chip {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-main-text);
    background: var(--color-background-dark);
    border: none;
    border-radius: var(--border-radius);
    padding: 6px 13px;
    cursor: pointer;
}

.chip.active {
    background: var(--color-primary-element-light);
    color: var(--color-primary-element);
}

.approval-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
    margin-bottom: 24px;
}

.approval-table th {
    text-align: left;
    font-size: 12px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    padding: 9px 10px;
    border-bottom: 1px solid var(--color-border);
}

.approval-table td {
    padding: 11px 10px;
    border-bottom: 1px solid var(--color-border-light, var(--color-border));
    vertical-align: middle;
}

.who {
    display: flex;
    align-items: center;
    gap: 9px;
}

.employee-name {
    font-weight: 600;
}

.kind {
    font-size: 11.5px;
    font-weight: 600;
    border-radius: var(--border-radius);
    padding: 3px 9px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
}

.kind-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
}

.kind.absence {
    background: var(--color-background-hover);
    color: #2f7d49;
}

.kind.absence .kind-dot {
    background: #4a9d63;
}

.kind.month {
    background: var(--color-primary-element-light);
    color: var(--color-primary-element);
}

.kind.month .kind-dot {
    background: var(--color-primary-element);
}

.kind.sick {
    background: var(--color-background-hover);
    color: #b03b33;
}

.kind.sick .kind-dot {
    background: #cc4b42;
}

.detail {
    color: var(--color-main-text);
}

.actions-col {
    /* Links ausgerichtet: "Genehmigen" ist in jeder Zeile gleich breit und
       startet dadurch immer an der gleichen Stelle (unabhängig davon, ob der
       zweite Button "Ablehnen" oder "Zurückweisen" heißt). */
    text-align: left;
    white-space: nowrap;
    width: 1%;
}

.actions {
    display: flex;
    gap: 6px;
    justify-content: flex-start;
}

.info-section h3 {
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    gap: 6px;
}

.reopen-modal {
    padding: 22px;
    max-width: 460px;
}

.reopen-modal h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6px;
}

.reopen-modal p {
    color: var(--color-text-maxcontrast);
    margin-bottom: 14px;
}

.reopen-modal label {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    margin-bottom: 4px;
}

.reopen-modal textarea {
    width: 100%;
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius);
    padding: 9px 11px;
    font-family: inherit;
    font-size: 14px;
}

.form-actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 16px;
}
</style>
