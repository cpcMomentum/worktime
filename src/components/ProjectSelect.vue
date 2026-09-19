<template>
    <NcSelect
        :input-id="inputId"
        :value="selected"
        :options="options"
        :loading="loading"
        :placeholder="placeholder || t('worktime', 'Projekt auswählen')"
        :filterable="false"
        :clearable="clearable"
        :disabled="disabled"
        label="label"
        :class="{ 'input-error': hasError }"
        @search="onSearch"
        @input="onInput">
        <template #option="option">
            <span class="project-option">
                <span class="project-option__label">{{ option.label }}</span>
                <button type="button"
                    class="project-option__star"
                    :class="{ 'is-favorite': option.isFavorite }"
                    :aria-label="option.isFavorite ? t('worktime', 'Aus Favoriten entfernen') : t('worktime', 'Zu Favoriten hinzufügen')"
                    :title="option.isFavorite ? t('worktime', 'Aus Favoriten entfernen') : t('worktime', 'Zu Favoriten hinzufügen')"
                    @mousedown.stop.prevent
                    @click.stop.prevent="toggleFavorite(option)">
                    <Star v-if="option.isFavorite" :size="18" />
                    <StarOutline v-else :size="18" />
                </button>
            </span>
        </template>
    </NcSelect>
</template>

<script>
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
import Star from 'vue-material-design-icons/Star.vue'
import StarOutline from 'vue-material-design-icons/StarOutline.vue'
import ProjectService from '../services/ProjectService.js'

/**
 * #682: Projektauswahl mit server-seitiger Suche.
 *
 * Lädt NICHT die gesamte Projektliste, sondern fragt beim Tippen den
 * Such-Endpoint (entprellt). Skaliert für Instanzen mit hunderten/tausenden
 * Projekten. v-model ist die projectId (Number|null).
 *
 * Bearbeiten-Fall: ist beim Öffnen bereits eine projectId gesetzt, deren
 * Projekt nicht in den aktuellen Treffern liegt, wird es einzeln nachgeladen,
 * damit der Name trotzdem angezeigt wird.
 */
export default {
    name: 'ProjectSelect',
    components: { NcSelect, Star, StarOutline },
    props: {
        // v-model (Vue 2): die gewählte projectId
        value: {
            type: Number,
            default: null,
        },
        inputId: {
            type: String,
            default: undefined,
        },
        placeholder: {
            type: String,
            default: '',
        },
        disabled: {
            type: Boolean,
            default: false,
        },
        clearable: {
            type: Boolean,
            default: true,
        },
        hasError: {
            type: Boolean,
            default: false,
        },
    },
    data() {
        return {
            options: [],
            selected: null,
            loading: false,
            searchTimer: null,
            pendingFavoriteIds: new Set(),
        }
    },
    watch: {
        // Not `immediate`: the initial sync already happens in created() after
        // loadInitial(), so options are populated by the time it runs. An
        // immediate watcher would race it and fire a second, redundant
        // ProjectService.getById() for the edit case (#682).
        value() {
            this.syncSelected()
        },
    },
    async created() {
        await this.loadInitial()
        this.syncSelected()
    },
    beforeDestroy() {
        clearTimeout(this.searchTimer)
    },
    methods: {
        toOption(project) {
            return { id: project.id, label: project.displayName || project.name, isFavorite: project.isFavorite === true }
        },
        // #711: favorites first, otherwise keep the server's (name) order. Stable.
        sortFavoritesFirst(options) {
            return [...options].sort((a, b) => (b.isFavorite === true) - (a.isFavorite === true))
        },
        async loadInitial() {
            this.loading = true
            try {
                const results = await ProjectService.search('', 20) || []
                this.options = this.sortFavoritesFirst(results.map(this.toOption))
                // Parent kann darauf reagieren (z. B. Projekt-Pflicht nur wenn es
                // überhaupt buchbare Projekte gibt, #329).
                this.$emit('loaded', this.options.length)
            } catch (e) {
                console.error('Failed to load projects:', e)
                this.options = []
            } finally {
                this.loading = false
            }
        },
        onSearch(query) {
            // vue-select (@nextcloud/vue-select) ruft @search mit dem Suchtext auf.
            // filterable=false → wir liefern die Treffer selbst vom Server.
            clearTimeout(this.searchTimer)
            this.searchTimer = setTimeout(async () => {
                this.loading = true
                try {
                    const results = await ProjectService.search(query || '', 20) || []
                    let options = this.sortFavoritesFirst(results.map(this.toOption))
                    // Die aktuell gewählte Option sichtbar halten, auch wenn sie
                    // nicht in den Treffern ist.
                    if (this.selected && !options.some(o => o.id === this.selected.id)) {
                        options = [this.selected, ...options]
                    }
                    this.options = options
                } catch (e) {
                    console.error('Failed to search projects:', e)
                    // Treffer unverändert lassen
                } finally {
                    this.loading = false
                }
            }, 250)
        },
        onInput(option) {
            this.selected = option || null
            this.$emit('input', option ? option.id : null)
        },
        // #711: toggle the favorite star without selecting the option. The star
        // flips immediately; re-sorting favorites-first happens on the next
        // open/search so the clicked row does not jump under the cursor.
        //
        // We replace the option object (new array) instead of mutating it in
        // place: NcSelect/vue-select renders from an internal copy of `options`,
        // so an in-place mutation would persist server-side but not re-render
        // the star until the list reloads.
        async toggleFavorite(option) {
            // Guard against a double-click firing add/remove concurrently, which
            // could otherwise resolve out of order and leave the UI showing the
            // wrong state.
            if (this.pendingFavoriteIds.has(option.id)) {
                return
            }
            this.pendingFavoriteIds.add(option.id)
            const next = !option.isFavorite
            try {
                if (next) {
                    await ProjectService.addFavorite(option.id)
                } else {
                    await ProjectService.removeFavorite(option.id)
                }
                this.options = this.options.map(o => (o.id === option.id ? { ...o, isFavorite: next } : o))
                if (this.selected && this.selected.id === option.id) {
                    this.selected = { ...this.selected, isFavorite: next }
                }
            } catch (e) {
                console.error('Failed to toggle project favorite:', e)
            } finally {
                this.pendingFavoriteIds.delete(option.id)
            }
        },
        async syncSelected() {
            const id = this.value
            if (!id) {
                this.selected = null
                return
            }
            if (this.selected && this.selected.id === id) {
                return
            }
            const inOptions = this.options.find(o => o.id === id)
            if (inOptions) {
                this.selected = inOptions
                return
            }
            // Editier-Fall: Projekt einzeln nachladen, um das Label zu zeigen.
            try {
                const project = await ProjectService.getById(id)
                if (project && project.id) {
                    this.selected = this.toOption(project)
                    if (!this.options.some(o => o.id === project.id)) {
                        this.options = [this.selected, ...this.options]
                    }
                }
            } catch (e) {
                console.error('Failed to load project ' + id + ':', e)
                this.selected = { id, label: '#' + id }
            }
        },
    },
}
</script>

<style scoped>
.project-option {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    width: 100%;
}

.project-option__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.project-option__star {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 auto;
    width: 30px;
    height: 30px;
    padding: 0;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--color-text-maxcontrast);
    cursor: pointer;
}

.project-option__star:hover {
    background: var(--color-background-hover);
}

.project-option__star.is-favorite {
    color: #d4a000;
}
</style>
