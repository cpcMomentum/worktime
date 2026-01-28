<template>
    <div class="month-picker">
        <NcButton type="tertiary"
            :aria-label="t('worktime', 'Vorheriger Monat')"
            @click="previousMonth">
            <template #icon>
                <ChevronLeft :size="20" />
            </template>
        </NcButton>

        <span class="month-picker__label">
            {{ monthName }} {{ year }}
        </span>

        <NcButton type="tertiary"
            :aria-label="t('worktime', 'Nächster Monat')"
            @click="nextMonth">
            <template #icon>
                <ChevronRight :size="20" />
            </template>
        </NcButton>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'
import { getMonthName } from '../utils/dateUtils.js'

export default {
    name: 'MonthPicker',
    components: {
        NcButton,
        ChevronLeft,
        ChevronRight,
    },
    props: {
        year: {
            type: Number,
            required: true,
        },
        month: {
            type: Number,
            required: true,
        },
    },
    computed: {
        monthName() {
            return getMonthName(this.month)
        },
    },
    methods: {
        previousMonth() {
            let newMonth = this.month - 1
            let newYear = this.year
            if (newMonth < 1) {
                newMonth = 12
                newYear--
            }
            this.$emit('update', { year: newYear, month: newMonth })
        },
        nextMonth() {
            let newMonth = this.month + 1
            let newYear = this.year
            if (newMonth > 12) {
                newMonth = 1
                newYear++
            }
            this.$emit('update', { year: newYear, month: newMonth })
        },
    },
}
</script>

<style scoped>
.month-picker {
    display: flex;
    align-items: center;
    gap: 8px;
}

.month-picker__label {
    font-size: 1.1em;
    font-weight: 500;
    min-width: 150px;
    text-align: center;
}
</style>
