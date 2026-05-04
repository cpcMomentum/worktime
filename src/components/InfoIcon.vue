<template>
    <NcPopover popup-role="tooltip">
        <template #trigger>
            <InformationOutline class="info-icon" :size="14" />
        </template>
        <div class="info-popup">
            <slot />
        </div>
    </NcPopover>
</template>

<script>
import NcPopover from '@nextcloud/vue/dist/Components/NcPopover.js'
import InformationOutline from 'vue-material-design-icons/InformationOutline.vue'

export default {
    name: 'InfoIcon',
    components: {
        NcPopover,
        InformationOutline,
    },
}
</script>

<style scoped>
:deep(.v-popper),
:deep(.trigger) {
    display: inline !important;
}

.info-icon {
    display: inline;
    vertical-align: middle;
    margin-left: 2px;
    cursor: pointer;
    color: var(--color-text-maxcontrast);
}

.info-icon:hover {
    color: var(--color-primary-element);
}

.info-popup {
    padding: 8px 12px;
    max-width: 280px;
    font-size: 13px;
    line-height: 1.4;
}
</style>
