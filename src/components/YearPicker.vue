<template>
    <div class="year-picker">
        <NcButton variant="tertiary"
            :aria-label="t('worktime', 'Vorheriges Jahr')"
            :disabled="min !== null && year <= min"
            @click="$emit('update', year - 1)">
            <template #icon>
                <ChevronLeft :size="20" />
            </template>
        </NcButton>

        <span class="year-picker__label">
            {{ year }}
        </span>

        <NcButton variant="tertiary"
            :aria-label="t('worktime', 'Nächstes Jahr')"
            :disabled="max !== null && year >= max"
            @click="$emit('update', year + 1)">
            <template #icon>
                <ChevronRight :size="20" />
            </template>
        </NcButton>
    </div>
</template>

<script>
import NcButton from '@nextcloud/vue/components/NcButton'
import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue'
import ChevronRight from 'vue-material-design-icons/ChevronRight.vue'

export default {
    name: 'YearPicker',
    emits: ['update'],
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
        min: {
            type: Number,
            default: null,
        },
        max: {
            type: Number,
            default: null,
        },
    },
}
</script>

<style scoped>
.year-picker {
    display: flex;
    align-items: center;
    gap: 8px;
}

.year-picker__label {
    font-size: 1.1em;
    font-weight: 500;
    min-width: 4rem;
    text-align: center;
}
</style>
