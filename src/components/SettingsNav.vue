<!--
  - SPDX-FileCopyrightText: 2026 cpcMomentum
  - SPDX-License-Identifier: AGPL-3.0-or-later
-->
<template>
    <nav class="settings-nav" :aria-label="t('worktime', 'Einstellungs-Navigation')">
        <template v-for="group in groups">
            <div v-if="group.items.length" :key="group.label" class="settings-nav-group">
                {{ group.label }}
            </div>
            <button v-for="item in group.items"
                :key="item.id"
                type="button"
                class="settings-nav-item"
                :class="{ active: active === item.id }"
                :aria-current="active === item.id ? 'page' : null"
                @click="$emit('select', item.id)">
                <component :is="item.icon" :size="18" />
                {{ item.label }}
            </button>
        </template>
    </nav>
</template>

<script>
import { translate as t } from '@nextcloud/l10n'

// Gruppen-Navigation fuer Einstellungen und Verwaltung, Werte aus docs/design-system.md, Abschnitt 3.
export default {
    name: 'SettingsNav',
    props: {
        groups: {
            type: Array,
            required: true,
            validator: groups => groups.every(g => Array.isArray(g.items)),
        },
        active: {
            type: String,
            default: null,
        },
    },
    methods: {
        t,
    },
}
</script>

<style scoped>
.settings-nav {
    position: sticky;
    top: 0;
    display: flex;
    flex-direction: column;
    padding: 0 16px 0 0;
    border-right: 1px solid var(--color-border-dark, var(--color-border));
}

.settings-nav-group {
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    color: var(--color-text-maxcontrast);
    padding: 16px 12px 6px;
    border-top: 1px solid var(--color-border-dark, var(--color-border));
    margin-top: 8px;
}

.settings-nav-group:first-child {
    padding-top: 0;
    border-top: none;
    margin-top: 0;
}

.settings-nav-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 9px 12px;
    border: none;
    background: none;
    color: var(--color-main-text);
    font-size: 14px;
    font-weight: 500;
    text-align: left;
    border-radius: var(--border-radius-element, 8px);
    cursor: pointer;
    width: 100%;
    transition: background-color 0.15s;
}

.settings-nav-item :deep(.material-design-icon) {
    color: var(--color-text-maxcontrast);
}

.settings-nav-item:hover {
    background: var(--color-background-hover);
}

.settings-nav-item.active {
    background: var(--color-primary-element-light);
    color: var(--color-primary-element);
    font-weight: 600;
}

.settings-nav-item.active :deep(.material-design-icon) {
    color: var(--color-primary-element);
}

.settings-nav-item:focus-visible {
    outline: 2px solid var(--color-primary-element);
    outline-offset: -2px;
}

@media (max-width: 900px) {
    .settings-nav {
        position: static;
    }
}
</style>
