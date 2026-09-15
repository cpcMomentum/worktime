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
        @input="onInput" />
</template>

<script>
import NcSelect from '@nextcloud/vue/dist/Components/NcSelect.js'
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
    components: { NcSelect },
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
            return { id: project.id, label: project.displayName || project.name }
        },
        async loadInitial() {
            this.loading = true
            try {
                const results = await ProjectService.search('', 20) || []
                this.options = results.map(this.toOption)
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
                    let options = results.map(this.toOption)
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
