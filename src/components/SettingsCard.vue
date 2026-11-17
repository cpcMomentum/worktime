<!--
  - SPDX-FileCopyrightText: 2026 cpcMomentum
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
    <section class="wt-settings-card">
        <h3 class="wt-settings-card__title">
            {{ name }}
        </h3>
        <p v-if="description" class="wt-settings-card__description">
            {{ description }}
        </p>
        <slot />
    </section>
</template>

<script>
// Werte fest aus nc-app-tooling docs/design-system.md, Abschnitt 3.
export default {
    name: 'SettingsCard',
    props: {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            default: '',
        },
    },
}
</script>

<style scoped>
.wt-settings-card {
    border: 1px solid var(--color-border);
    border-radius: var(--border-radius-large);
    padding: 18px 20px;
    background: var(--color-main-background);
}

.wt-settings-card__title {
    margin: 0 0 8px;
    font-size: 13px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--color-text-maxcontrast);
}

.wt-settings-card__description {
    margin: 0 0 16px;
    color: var(--color-text-maxcontrast);
}
</style>
