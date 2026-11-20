<template>
    <div class="team-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Team') }}</h2>
        </div>

        <div class="view-toolbar">
            <div class="seg" role="group" :aria-label="t('worktime', 'Färbung')">
                <button class="seg-btn" :class="{ active: colorBy === 'status' }" @click="colorBy = 'status'">
                    <FlagOutline :size="18" />
                    {{ t('worktime', 'Nach Status') }}
                </button>
                <button class="seg-btn" :class="{ active: colorBy === 'type' }" @click="colorBy = 'type'">
                    <TagOutline :size="18" />
                    {{ t('worktime', 'Nach Art') }}
                </button>
            </div>

            <div class="view-header__nav">
                <MonthPicker :year="month.year" :month="month.month" @update="onMonthChange" />
            </div>
        </div>

        <NcLoadingIcon v-if="loading" :size="44" />

        <AbsenceTimeline v-else-if="overview.length > 0"
            :employees="overview"
            :year="month.year"
            :month="month.month"
            :holidays="holidays"
            :color-by="colorBy"
            :show-full-legend="isPrivileged" />

        <NcEmptyContent v-else :name="t('worktime', 'Kein Team')">
            <template #icon>
                <AccountGroupIcon />
            </template>
            <template #description>
                {{ t('worktime', 'Aktuell sind keine Team-Abwesenheiten sichtbar.') }}
            </template>
        </NcEmptyContent>
    </div>
</template>

<script>
import NcLoadingIcon from '@nextcloud/vue/components/NcLoadingIcon'
import NcEmptyContent from '@nextcloud/vue/components/NcEmptyContent'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import FlagOutline from 'vue-material-design-icons/FlagOutline.vue'
import TagOutline from 'vue-material-design-icons/TagOutline.vue'
import { mapState } from 'pinia'
import { usePermissionsStore } from '../stores/permissions.ts'
import MonthPicker from '../components/MonthPicker.vue'
import AbsenceTimeline from '../components/AbsenceTimeline.vue'
import AbsenceService from '../services/AbsenceService.js'
import HolidayService from '../services/HolidayService.js'
import { getCurrentYear, getCurrentMonth } from '../utils/dateUtils.js'

export default {
    name: 'TeamView',
    components: {
        NcLoadingIcon,
        NcEmptyContent,
        AccountGroupIcon,
        FlagOutline,
        TagOutline,
        MonthPicker,
        AbsenceTimeline,
    },
    data() {
        return {
            month: { year: getCurrentYear(), month: getCurrentMonth() },
            overview: [],
            holidays: [],
            // Standard: nach Abwesenheits-Art einfärben (Status ist über den
            // Umschalter erreichbar).
            colorBy: 'type',
            loading: false,
        }
    },
    computed: {
        ...mapState(usePermissionsStore, ['isAdmin', 'isHrManager', 'canApprove']),
        isPrivileged() {
            return this.isAdmin || this.isHrManager || this.canApprove
        },
    },
    created() {
        this.load()
    },
    methods: {
        onMonthChange({ year, month }) {
            this.month = { year, month }
            this.load()
        },
        async load() {
            this.loading = true
            try {
                const [overviewRes, holidaysRes] = await Promise.all([
                    AbsenceService.getOverview(this.month.year, this.month.month),
                    HolidayService.getByYear(this.month.year),
                ])
                this.overview = Array.isArray(overviewRes) ? overviewRes : (overviewRes?.data || [])
                const holidayData = Array.isArray(holidaysRes) ? holidaysRes : (holidaysRes?.data || [])
                this.holidays = holidayData.map(h => ({ date: h.date, name: h.name }))
            } catch (error) {
                console.error('Failed to load team overview:', error)
                this.overview = []
            } finally {
                this.loading = false
            }
        },
    },
}
</script>

<style scoped>
.team-view {
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

.seg {
    display: flex;
    background: var(--color-background-dark);
    border-radius: var(--border-radius-element, 8px);
    padding: 3px;
}

.seg-btn {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 13px;
    font-weight: 600;
    color: var(--color-text-maxcontrast);
    background: none;
    border: none;
    padding: 6px 14px;
    border-radius: var(--border-radius-element, 8px);
    cursor: pointer;
}

.seg-btn.active {
    background: var(--color-main-background);
    color: var(--color-primary-element);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}
</style>
