<template>
    <div class="team-view">
        <div class="view-header">
            <h2>{{ t('worktime', 'Team') }}</h2>
            <div class="team-head">
                <MonthPicker :year="month.year" :month="month.month" @update="onMonthChange" />
                <div class="seg" role="group" :aria-label="t('worktime', 'Färbung')">
                    <button class="seg-btn" :class="{ active: colorBy === 'status' }" @click="colorBy = 'status'">
                        {{ t('worktime', 'Nach Status') }}
                    </button>
                    <button class="seg-btn" :class="{ active: colorBy === 'type' }" @click="colorBy = 'type'">
                        {{ t('worktime', 'Nach Art') }}
                    </button>
                </div>
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
import NcLoadingIcon from '@nextcloud/vue/dist/Components/NcLoadingIcon.js'
import NcEmptyContent from '@nextcloud/vue/dist/Components/NcEmptyContent.js'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import { mapGetters } from 'vuex'
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
        ...mapGetters('permissions', ['isAdmin', 'isHrManager', 'canApprove']),
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
    max-width: var(--wt-content-max-width);
}

.view-header {
    margin-bottom: 20px;
}

.view-header h2 {
    margin: 0 0 12px;
}

.team-head {
    display: flex;
    align-items: center;
    gap: 12px;
    flex-wrap: wrap;
}

.seg {
    display: flex;
    background: var(--color-background-dark);
    border-radius: var(--border-radius);
    padding: 3px;
}

.seg-btn {
    font-size: 13px;
    font-weight: 600;
    color: var(--color-main-text);
    background: none;
    border: none;
    padding: 6px 14px;
    border-radius: var(--border-radius);
    cursor: pointer;
}

.seg-btn.active {
    background: var(--color-main-background);
    color: var(--color-primary-element);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12);
}
</style>
