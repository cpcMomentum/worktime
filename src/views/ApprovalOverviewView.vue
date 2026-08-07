<template>
    <div class="approval-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Genehmigungen') }}</h2>
        </div>

        <NcLoadingIcon v-if="loading" :size="44" class="loading" />

        <template v-else>
            <div class="view-toolbar status-toolbar">
                <div class="layout-seg" role="group" :aria-label="t('worktime', 'Status')">
                    <button class="seg-btn" :class="{ active: statusView === 'open' }" @click="statusView = 'open'">
                        {{ t('worktime', 'Offen') }}
                    </button>
                    <button class="seg-btn" :class="{ active: statusView === 'approved' }" @click="showApproved()">
                        {{ t('worktime', 'Genehmigt') }}
                    </button>
                </div>
            </div>

            <template v-if="statusView === 'open'">
            <!-- Eingangsliste: Urlaubsanträge + Monatsabschlüsse, älteste zuerst (#344/#240) -->
            <section v-if="inboxItems.length > 0" class="inbox">
                <div class="view-toolbar">
                    <div class="layout-seg" role="group" :aria-label="t('worktime', 'Filter')">
                        <button class="seg-btn" :class="{ active: kindFilter === 'all' }" @click="kindFilter = 'all'">
                            <FormatListBulletedIcon :size="18" />
                            {{ t('worktime', 'Alle') }}
                        </button>
                        <button class="seg-btn" :class="{ active: kindFilter === 'absence' }" @click="kindFilter = 'absence'">
                            <CalendarIcon :size="18" />
                            {{ t('worktime', 'Urlaub') }}
                        </button>
                        <button class="seg-btn" :class="{ active: kindFilter === 'month' }" @click="kindFilter = 'month'">
                            <ClockOutlineIcon :size="18" />
                            {{ t('worktime', 'Zeiten') }}
                        </button>
                    </div>
                </div>

                <div class="approval-card">
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
                        <tr v-for="item in filteredItems"
                            :key="item.key"
                            :class="{ 'row-clickable': item.kind === 'month' }"
                            @click="item.kind === 'month' && openMonthDetail(item)">
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
                            <td class="detail">
                                <div>{{ item.detail }}</div>
                                <div v-if="item.note" class="note-line">
                                    <span class="note-label">{{ t('worktime', 'Bemerkung') }}:</span> {{ item.note }}
                                </div>
                            </td>
                            <td class="actions-col">
                                <div class="actions" @click.stop>
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
                                            @click="openRejectModal(item)">
                                            <template #icon><CloseIcon :size="18" /></template>
                                            {{ t('worktime', 'Zurückweisen') }}
                                        </NcButton>
                                    </template>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </div>
            </section>

            <!-- Zur Kenntnisnahme: gemeldete Abwesenheiten (z.B. Krankheit), keine Genehmigung nötig -->
            <section v-if="informationalAbsences.length > 0" class="info-section">
                <h3>
                    {{ t('worktime', 'Zur Kenntnisnahme') }}
                    <InfoIcon>{{ t('worktime', 'Diese Abwesenheiten (z.B. Krankheit) werden nur gemeldet und brauchen keine Genehmigung. Sie werden automatisch in der Sollberechnung berücksichtigt.') }}</InfoIcon>
                    ({{ informationalAbsences.length }})
                </h3>
                <div class="approval-card">
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
                </div>
            </section>

            <NcEmptyContent v-if="inboxItems.length === 0 && informationalAbsences.length === 0"
                :name="t('worktime', 'Keine offenen Genehmigungen')">
                <template #icon><CheckIcon /></template>
                <template #description>
                    {{ t('worktime', 'Aktuell wartet nichts auf Ihre Genehmigung.') }}
                </template>
            </NcEmptyContent>
            </template>

            <!-- Genehmigte Monate (#387): HR kann eine Genehmigung zurücknehmen (Korrektur) -->
            <template v-else>
                <NcLoadingIcon v-if="approvedLoading" :size="44" class="loading" />
                <div v-else-if="approvedMonths.length" class="approval-card">
                <table class="approval-table">
                    <thead>
                        <tr>
                            <th>{{ t('worktime', 'Mitarbeiter') }}</th>
                            <th>{{ t('worktime', 'Zeitraum') }}</th>
                            <th>{{ t('worktime', 'Genehmigt am') }}</th>
                            <th class="actions-col">{{ t('worktime', 'Aktion') }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="m in visibleApprovedMonths" :key="approvedKey(m)">
                            <td>
                                <div class="who">
                                    <NcAvatar :user="m.employeeUserId" :display-name="m.employeeName" :size="30" />
                                    <span class="employee-name">{{ m.employeeName }}</span>
                                </div>
                            </td>
                            <td class="detail">{{ approvedMonthLabel(m) }} · {{ hoursLabel(m.actualMinutes) }}</td>
                            <td class="detail">{{ m.approvedAt ? formatDate(m.approvedAt) : '–' }}</td>
                            <td class="actions-col">
                                <div class="actions">
                                    <NcButton type="tertiary"
                                        :disabled="reopeningKey === approvedKey(m)"
                                        @click="openReopenApproved(m)">
                                        <template #icon><RestoreIcon :size="18" /></template>
                                        {{ t('worktime', 'Genehmigung zurücknehmen') }}
                                    </NcButton>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div ref="approvedSentinel" class="approved-sentinel"></div>
                </div>
                <NcEmptyContent v-else
                    :name="t('worktime', 'Keine genehmigten Monate')">
                    <template #icon><CheckIcon /></template>
                </NcEmptyContent>
            </template>
        </template>

        <!-- Monat zurückweisen (Grund erforderlich) -->
        <NcModal v-if="showRejectModal" @close="closeRejectModal">
            <div class="reject-modal">
                <h3>{{ t('worktime', 'Monat zurückweisen') }}</h3>
                <p>{{ rejectTarget ? getMonthName(rejectTarget.month) + ' ' + rejectTarget.year + ' – ' + rejectTarget.employeeName : '' }}</p>
                <label for="reject-reason">{{ t('worktime', 'Begründung') }}</label>
                <textarea id="reject-reason" v-model="rejectReason" rows="3"
                    :placeholder="t('worktime', 'Warum wird der Monat zurückgewiesen?')"></textarea>
                <div class="form-actions">
                    <NcButton type="tertiary" @click="closeRejectModal">{{ t('worktime', 'Abbrechen') }}</NcButton>
                    <NcButton type="primary"
                        :disabled="!rejectReason.trim() || rejectingKey !== null"
                        @click="submitReject">
                        {{ t('worktime', 'Zurückweisen') }}
                    </NcButton>
                </div>
            </div>
        </NcModal>

        <!-- Genehmigung zurücknehmen (#387, Grund erforderlich) -->
        <NcModal v-if="showReopenModal" @close="closeReopenModal">
            <div class="reject-modal">
                <h3>{{ t('worktime', 'Genehmigung zurücknehmen') }}</h3>
                <p>{{ reopenTarget ? getMonthName(reopenTarget.month) + ' ' + reopenTarget.year + ' – ' + reopenTarget.employeeName : '' }}</p>
                <p class="reopen-hint">{{ t('worktime', 'Der Monat wird wieder zur Bearbeitung freigegeben. Der Mitarbeiter kann korrigieren und erneut einreichen.') }}</p>
                <label for="reopen-reason">{{ t('worktime', 'Begründung') }}</label>
                <textarea id="reopen-reason" v-model="reopenReason" rows="3"
                    :placeholder="t('worktime', 'Warum wird die Genehmigung zurückgenommen?')"></textarea>
                <div class="form-actions">
                    <NcButton type="tertiary" @click="closeReopenModal">{{ t('worktime', 'Abbrechen') }}</NcButton>
                    <NcButton type="primary"
                        :disabled="!reopenReason.trim() || reopeningKey !== null"
                        @click="submitReopenApproved">
                        {{ t('worktime', 'Genehmigung zurücknehmen') }}
                    </NcButton>
                </div>
            </div>
        </NcModal>

        <!-- Monats-Details vor dem Abnehmen -->
        <MonthApprovalModal v-if="detailItem"
            :item="detailItem"
            :archive-configured="archiveConfigured"
            @approve="onModalApprove"
            @reject="onModalReject"
            @close="detailItem = null" />
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
import FormatListBulletedIcon from 'vue-material-design-icons/FormatListBulleted.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import RestoreIcon from 'vue-material-design-icons/Restore.vue'
import TimeEntryService from '../services/TimeEntryService.js'
import AbsenceService from '../services/AbsenceService.js'
import { formatDate } from '../utils/dateUtils.js'
import { getAbsenceTypeLabel } from '../utils/formatters.js'
import { formatMinutes } from '../utils/timeUtils.js'
import { showSuccess, showError } from '@nextcloud/dialogs'
import InfoIcon from '../components/InfoIcon.vue'
import MonthApprovalModal from '../components/MonthApprovalModal.vue'

export default {
    name: 'ApprovalOverviewView',
    components: {
        InfoIcon,
        MonthApprovalModal,
        NcLoadingIcon,
        NcEmptyContent,
        NcAvatar,
        NcButton,
        NcModal,
        CheckIcon,
        CloseIcon,
        FormatListBulletedIcon,
        CalendarIcon,
        ClockOutlineIcon,
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
            showRejectModal: false,
            rejectTarget: null,
            rejectReason: '',
            rejectingKey: null,
            detailItem: null,
            archiveConfigured: false,
            // Genehmigte Monate (#387)
            statusView: 'open',
            approvedMonths: [],
            approvedLoaded: false,
            approvedLoading: false,
            approvedVisible: 50,
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
                note: a.note || '',
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
        visibleApprovedMonths() {
            return this.approvedMonths.slice(0, this.approvedVisible)
        },
    },
    created() {
        this.loadData()
    },
    beforeDestroy() {
        if (this._approvedObserver) {
            this._approvedObserver.disconnect()
        }
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
        approvedKey(m) {
            return `${m.employeeId}-${m.year}-${m.month}`
        },
        approvedMonthLabel(m) {
            return `${this.getMonthName(m.month)} ${m.year}`
        },
        hoursLabel(minutes) {
            return `${formatMinutes(minutes)} h`
        },
        async showApproved() {
            this.statusView = 'approved'
            if (!this.approvedLoaded) {
                await this.loadApprovedMonths()
            }
            this.$nextTick(() => this.setupApprovedObserver())
        },
        async loadApprovedMonths() {
            this.approvedLoading = true
            try {
                const months = await TimeEntryService.getApprovedMonths()
                this.approvedMonths = months || []
                this.approvedVisible = 50
                this.approvedLoaded = true
            } catch (e) {
                console.error('Failed to load approved months:', e)
            } finally {
                this.approvedLoading = false
            }
        },
        setupApprovedObserver() {
            if (this._approvedObserver) {
                this._approvedObserver.disconnect()
            }
            const el = this.$refs.approvedSentinel
            if (!el || typeof IntersectionObserver === 'undefined') return
            this._approvedObserver = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && this.approvedVisible < this.approvedMonths.length) {
                    this.approvedVisible += 50
                }
            })
            this._approvedObserver.observe(el)
        },
        openReopenApproved(m) {
            this.reopenTarget = m
            this.reopenReason = ''
            this.showReopenModal = true
        },
        closeReopenModal() {
            this.showReopenModal = false
            this.reopenTarget = null
            this.reopenReason = ''
        },
        async submitReopenApproved() {
            if (!this.reopenTarget || !this.reopenReason.trim()) return
            const m = this.reopenTarget
            this.reopeningKey = this.approvedKey(m)
            try {
                const result = await TimeEntryService.reopenMonth(m.employeeId, m.year, m.month, this.reopenReason.trim())
                showSuccess(t('worktime', '{count} Einträge zur Korrektur freigegeben', { count: result.reopened }))
                this.closeReopenModal()
                await this.loadApprovedMonths()
            } catch (error) {
                console.error('Failed to reopen month:', error)
                showError(t('worktime', 'Fehler beim Zurücknehmen der Genehmigung'))
            } finally {
                this.reopeningKey = null
            }
        },
        async loadData() {
            this.loading = true
            const results = await Promise.allSettled([
                AbsenceService.getPending(),
                TimeEntryService.getPendingMonths(),
                AbsenceService.getInformational(),
                TimeEntryService.getArchiveStatus(),
            ])
            this.pendingAbsences = results[0].status === 'fulfilled' ? (results[0].value || []) : []
            this.pendingMonths = results[1].status === 'fulfilled' ? (results[1].value || []) : []
            this.informationalAbsences = results[2].status === 'fulfilled' ? (results[2].value || []) : []
            this.archiveConfigured = results[3].status === 'fulfilled' ? !!(results[3].value?.configured) : false
            // A failed request leaves its list empty, which looks exactly like
            // "nothing to approve". Say so instead of showing a silent gap (#537).
            const failed = results.some(r => r.status === 'rejected')
            results.forEach((r, i) => {
                if (r.status === 'rejected') {
                    const names = ['getPending', 'getPendingMonths', 'getInformational', 'getArchiveStatus']
                    console.error(`Failed: ${names[i]}`, r.reason)
                }
            })
            if (failed) {
                showError(t('worktime', 'Genehmigungsdaten konnten nicht vollständig geladen werden. Die Liste ist möglicherweise unvollständig.'))
            }
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
        openMonthDetail(item) {
            this.detailItem = item
        },
        onModalApprove(withArchive) {
            const item = this.detailItem
            this.detailItem = null
            this.approveMonthItem(item, withArchive)
        },
        onModalReject() {
            const item = this.detailItem
            this.detailItem = null
            // Detail-Modal erst vollständig schließen lassen, bevor der Grund-Dialog
            // öffnet – zwei NcModals im selben Tick brechen das Vue-DOM-Patching.
            setTimeout(() => this.openRejectModal(item), 300)
        },
        async approveMonthItem(item, withArchive = false) {
            this.processingMonth = item.key
            try {
                const result = await TimeEntryService.approveMonth(item.employeeId, item.year, item.month)
                if (withArchive) {
                    await this.archiveAndNotify(item, result.approved)
                } else if (result.archiveQueued) {
                    showSuccess(t('worktime', '{count} Einträge genehmigt – PDF wird im Hintergrund archiviert (kann einige Minuten dauern).', { count: result.approved }))
                } else {
                    showSuccess(t('worktime', '{count} Einträge genehmigt', { count: result.approved }))
                }
                await this.loadData()
            } catch (error) {
                console.error('Failed to approve month:', error)
                showError(t('worktime', 'Fehler beim Genehmigen'))
            } finally {
                this.processingMonth = null
            }
        },
        async archiveAndNotify(item, approvedCount) {
            try {
                const res = await TimeEntryService.archiveNow(item.employeeId, item.year, item.month)
                if (res?.result === 'replaced') {
                    showSuccess(t('worktime', '{count} Einträge genehmigt – PDF im Archiv aktualisiert.', { count: approvedCount }))
                } else if (res?.result === 'created') {
                    showSuccess(t('worktime', '{count} Einträge genehmigt – PDF im Archiv erstellt.', { count: approvedCount }))
                } else {
                    showSuccess(t('worktime', '{count} Einträge genehmigt', { count: approvedCount }))
                }
            } catch (e) {
                console.error('Archive now failed:', e)
                showError(t('worktime', 'Genehmigt, aber Archivierung fehlgeschlagen.'))
            }
        },
        openRejectModal(item) {
            this.rejectTarget = item
            this.rejectReason = ''
            this.showRejectModal = true
        },
        closeRejectModal() {
            this.showRejectModal = false
            this.rejectTarget = null
            this.rejectReason = ''
        },
        async submitReject() {
            if (!this.rejectTarget || !this.rejectReason.trim()) return
            const item = this.rejectTarget
            this.rejectingKey = item.key
            try {
                const result = await TimeEntryService.rejectMonth(item.employeeId, item.year, item.month, this.rejectReason.trim())
                showSuccess(t('worktime', '{count} Einträge zurückgewiesen', { count: result.rejected }))
                this.closeRejectModal()
                await this.loadData()
            } catch (error) {
                console.error('Failed to reject month:', error)
                showError(t('worktime', 'Fehler beim Zurückweisen'))
            } finally {
                this.rejectingKey = null
            }
        },
    },
}
</script>

<style scoped>
.approval-view {
    padding: 20px;
    padding-left: 50px;
    max-width: 1600px;
}

.view-header {
    display: flex;
    align-items: center;
    margin-bottom: 12px;
}

.view-header h2 {
    margin: 0;
}

.view-toolbar {
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;
    margin-bottom: 20px;
}

.view-header__nav {
    margin-left: auto;
    display: flex;
    align-items: center;
}

.loading {
    margin-top: 40px;
}

.layout-seg {
    display: flex;
    background: var(--color-background-dark);
    border-radius: var(--border-radius-element, 8px);
    padding: 3px;
}

.seg-btn {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    background: none;
    border: none;
    padding: 6px 14px;
    border-radius: var(--border-radius-element, 8px);
    cursor: pointer;
    display: inline-flex;
    align-items: center;
    gap: 6px;
}

.seg-btn.active {
    background: var(--color-main-background);
    color: var(--color-primary-element);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}

/* Tabellen in Card wie Audit/Abwesenheit/Auswertung */
.approval-card {
    background: var(--color-main-background);
    border: 1px solid var(--color-border-dark, var(--color-border));
    border-radius: var(--border-radius-large, 12px);
    padding: 8px 16px;
    overflow-x: auto;
    margin-bottom: 24px;
}

.approval-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
}

.approval-table th {
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    padding: 10px 12px;
    border-bottom: 2px solid var(--color-border-dark, var(--color-border));
}

.approval-table td {
    padding: 11px 12px;
    border-bottom: 1px solid var(--color-border);
    vertical-align: middle;
}

.approval-table tbody tr:hover {
    background: var(--color-background-hover);
}

.approval-table tbody tr.row-clickable {
    cursor: pointer;
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

.note-line {
    margin-top: 2px;
    color: var(--color-text-maxcontrast);
    font-style: italic;
    font-size: 0.9em;
    white-space: normal;
    overflow-wrap: anywhere;
}

.note-line .note-label {
    font-style: normal;
    font-weight: 600;
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

.status-toolbar {
    margin-bottom: 16px;
}

.reopen-hint {
    color: var(--color-text-maxcontrast);
    font-size: 13px;
    margin: 4px 0 10px;
}

.approved-sentinel {
    height: 1px;
}

.reject-modal {
    padding: 22px;
    max-width: 460px;
}

.reject-modal h3 {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 6px;
}

.reject-modal p {
    color: var(--color-text-maxcontrast);
    margin-bottom: 14px;
}

.reject-modal label {
    display: block;
    font-size: 12.5px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    margin-bottom: 4px;
}

.reject-modal textarea {
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
