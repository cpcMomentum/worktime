> Extends: node_modules/nc-app-tooling/docs/design-system.md

# Design-System WorkTime

Es gilt das Design-System der App-Flotte. Hier steht nur, was WorkTime zusätzlich festlegt.

## Seiten

| Seite | Route | Inhalt |
|---|---|---|
| Einstellungen | `/my-settings` | Persönlich: Standard-Arbeitszeiten, Datenschutz, Vertretung (nur Vorgesetzte) |
| Verwaltung | `/settings` | App-weit, für HR, Admins und App-Rollen. Gruppen: Team, Firma, Abläufe, Kalender, Konten, Lizenz |

Die Routen behalten ihre alten Pfade, damit bestehende Links und Benachrichtigungen weiter funktionieren.

## Bausteine

- `src/components/SettingsNav.vue`: Gruppen-Navigation beider Seiten (Abschnitt 3, Navigation).
- `src/components/SettingsCard.vue`: Abschnitt als Karte (Abschnitt 3, Abschnitt).
- `src/components/WerkPlusSettings.vue`: WerkPlus-Abschnitt (Abschnitt 5).

## Eigene Farben

Die Abwesenheitsarten haben fachliche Farben als `--wt-*`-Variablen, festgelegt an einer Stelle in `src/App.vue`.

## Abweichungen

- WorkTime läuft auf Vue 2. Deshalb nutzt die App nicht die gemeinsamen Vue-3-Bausteine, sondern baut sie nach den Werten des Design-Systems nach.
