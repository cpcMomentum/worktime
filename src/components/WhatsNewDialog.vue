<template>
    <NcModal v-if="open"
        :label-id="TITLE_ID"
        @close="dismiss">
        <div class="whatsnew">
            <h2 :id="TITLE_ID">{{ title }}</h2>
            <p class="whatsnew__version">{{ t('worktime', 'Version {version}', { version }) }}</p>

            <div v-for="(entry, index) in entries" :key="index" class="whatsnew__entry">
                <div class="whatsnew__icon">
                    <component :is="iconFor(entry.icon)" :size="22" />
                </div>
                <div class="whatsnew__body">
                    <h3 class="whatsnew__entry-title">
                        {{ entry.title }}
                        <span v-if="entry.plus" class="whatsnew__badge">WerkPlus</span>
                    </h3>
                    <p class="whatsnew__entry-text">{{ entry.text }}</p>
                    <p v-if="entry.where" class="whatsnew__where">
                        {{ t('worktime', 'Zu finden unter') }}
                        <b>{{ entry.where }}</b><span v-if="entry.adminOnly">{{ ' ' + t('worktime', '(nur für Administratoren)') }}</span>
                    </p>
                    <a v-if="entry.plus"
                        class="whatsnew__link"
                        :href="WERKPLUS_URL"
                        target="_blank"
                        rel="noreferrer noopener">
                        {{ t('worktime', 'Mehr zu WerkPlus') }}
                    </a>
                </div>
            </div>

            <div class="actions">
                <NcButton type="primary" @click="dismiss">
                    {{ t('worktime', 'Alles klar') }}
                </NcButton>
            </div>
        </div>
    </NcModal>
</template>

<script>
/**
 * „Was ist neu?"-Fenster (#730, Vue-2-Port aus rechnungswerk#308). Zeigt einmal
 * je Nutzer und Version die Neuerungen aus `whatsnew/whatsnew.json`, ist
 * wegklickbar (Knopf, X, Escape) und blockiert nie. Faellt der Abruf aus, bleibt
 * das Fenster einfach aus.
 */
import NcModal from '@nextcloud/vue/dist/Components/NcModal.js'
import NcButton from '@nextcloud/vue/dist/Components/NcButton.js'
import AccountGroupIcon from 'vue-material-design-icons/AccountGroup.vue'
import ChartBarIcon from 'vue-material-design-icons/ChartBar.vue'
import CogIcon from 'vue-material-design-icons/Cog.vue'
import CounterIcon from 'vue-material-design-icons/Counter.vue'
import EmailIcon from 'vue-material-design-icons/Email.vue'
import FileDocumentIcon from 'vue-material-design-icons/FileDocument.vue'
import FolderIcon from 'vue-material-design-icons/Folder.vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import StarIcon from 'vue-material-design-icons/Star.vue'
import TranslateIcon from 'vue-material-design-icons/Translate.vue'
import WhatsNewService from '../services/WhatsNewService.js'
import { shouldOpen } from '../utils/whatsnew.js'

/** Zielseite der WerkPlus-Eintraege (Konzept v1.1, Abschnitt 2). */
const WERKPLUS_URL = 'https://werkwolke.de'

/**
 * NcModal beschriftet sich ueber `name` mit einer eigenen Kopfzeile, die am
 * oberen Bildschirmrand schwebt und dort die Nextcloud-Leiste ueberdeckt. Wir
 * setzen die Ueberschrift selbst in den Dialog und verweisen NcModal per
 * `labelId` darauf — sonst warnt die Komponente zu Recht wegen fehlender
 * Beschriftung.
 */
const TITLE_ID = 'whatsnew-title'

/**
 * Erlaubte Symbole. Bewusst eine feste Liste statt dynamischer Importe: das
 * haelt das Bundle klein und macht einen Tippfehler in der JSON harmlos. Ein
 * Symbol kostet ein Wort in der Datei, ist sprachneutral und veraltet nicht
 * mit der naechsten Oberflaechenaenderung — anders als ein Screenshot.
 */
const ICONS = {
    'account-group': AccountGroupIcon,
    'chart-bar': ChartBarIcon,
    cog: CogIcon,
    counter: CounterIcon,
    email: EmailIcon,
    'file-document': FileDocumentIcon,
    folder: FolderIcon,
    magnify: MagnifyIcon,
    star: StarIcon,
    translate: TranslateIcon,
}

export default {
    name: 'WhatsNewDialog',
    components: {
        NcModal,
        NcButton,
    },
    data() {
        return {
            open: false,
            version: '',
            entries: [],
            WERKPLUS_URL,
            TITLE_ID,
        }
    },
    computed: {
        title() {
            return t('worktime', 'Was ist neu in WorkTime')
        },
    },
    async mounted() {
        try {
            const payload = await WhatsNewService.getPending()
            if (shouldOpen(payload)) {
                this.version = payload.version
                this.entries = payload.entries
                this.open = true
            }
        } catch (e) {
            // Kein Fenster ist besser als eine Fehlermeldung ueber Neuerungen.
        }
    },
    methods: {
        /** Unbekannter oder fehlender Name faellt auf den Stern zurueck. */
        iconFor(name) {
            return ICONS[name] || StarIcon
        },
        async dismiss() {
            this.open = false
            try {
                await WhatsNewService.markSeen()
            } catch (e) {
                // Quittung verloren: das Fenster kommt beim naechsten Start noch
                // einmal. Das ist die harmlosere Seite des Fehlers.
            }
        },
    },
}
</script>

<style scoped>
.whatsnew {
    padding: 24px;
    display: flex;
    flex-direction: column;
    min-width: 0;
}
.whatsnew h2 {
    margin: 0;
}
.whatsnew__version {
    margin: 2px 0 4px;
    color: var(--color-text-maxcontrast);
    font-size: 0.9em;
}
.whatsnew__entry {
    display: flex;
    gap: 14px;
    align-items: flex-start;
    padding: 14px 0;
    border-top: 1px solid var(--color-border);
}
.whatsnew__entry:first-of-type {
    border-top: none;
}
.whatsnew__icon {
    flex: 0 0 auto;
    width: 40px;
    height: 40px;
    margin-top: 2px;
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: var(--color-primary-element-light, #e5f2fa);
    color: var(--color-primary-element, #0082c9);
}
.whatsnew__body {
    flex: 1;
    min-width: 0;
}
.whatsnew__entry-title {
    margin: 0 0 4px;
    font-size: 1.05em;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 8px;
    flex-wrap: wrap;
}
.whatsnew__entry-text {
    margin: 0;
}
.whatsnew__where {
    margin: 6px 0 0;
    font-size: 0.92em;
    color: var(--color-text-maxcontrast);
}
.whatsnew__where b {
    font-weight: 600;
    color: var(--color-main-text);
}
.whatsnew__badge {
    display: inline-flex;
    align-items: center;
    height: 20px;
    padding: 0 9px;
    border-radius: 10px;
    background: var(--color-primary-element, #0082c9);
    color: var(--color-primary-element-text, #fff);
    font-size: 0.75em;
    font-weight: 600;
}
.whatsnew__link {
    display: inline-block;
    margin-top: 8px;
    font-weight: 600;
}
.actions {
    display: flex;
    justify-content: flex-end;
    gap: 8px;
    margin-top: 12px;
}
</style>
