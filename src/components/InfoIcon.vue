<template>
    <span class="info-icon-wrapper">
        <NcPopover popup-role="tooltip">
            <template #trigger>
                <InformationOutline class="info-icon" :size="14" />
            </template>
            <div class="info-popup">
                <slot />
            </div>
        </NcPopover>
    </span>
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

<style>
/* Unscoped: NcPopover's internal .v-popper div must be inline,
   scoped :deep() doesn't reliably penetrate the component boundary */
.info-icon-wrapper .v-popper {
    display: inline !important;
}
</style>

<style scoped>
.info-icon-wrapper {
    display: inline;
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
