# Feature: Inline-Editing für Zeiteinträge und Abwesenheiten

## Problem

Aktuell öffnet sich bei Klick auf einen Zeiteintrag oder eine Abwesenheit ein Modal-Fenster zur Bearbeitung. Das ist umständlich und inkonsistent, wenn man mehrere Einträge schnell bearbeiten oder neue erfassen möchte.

## Lösung

Einheitliches Inline-Editing direkt in der Tabelle - für:
- Zeiteinträge (neu, bearbeiten)
- Abwesenheiten (neu, bearbeiten)
- CalDAV-Vorschläge (später, separates Issue)

---

## User Flow

### Neuer Eintrag (Zeiterfassung & Abwesenheiten)

1. User klickt "Neuer Eintrag" / "Neue Abwesenheit"
2. Leere Zeile erscheint in der Liste
3. User füllt Felder direkt in der Zeile aus
4. Automatische Berechnung (Pause bei Zeit, Tage bei Abwesenheit)
5. User klickt 💾 (Speichern) oder drückt Enter
6. Zeile wird zum normalen Eintrag

### Bearbeiten

1. User klickt ✎ (Bearbeiten) in einer Zeile
2. Felder der Zeile werden editierbar
3. User ändert Werte
4. Automatische Berechnung
5. User klickt 💾 (Speichern) oder drückt Enter
6. Änderungen werden gespeichert

### CalDAV-Vorschläge (separater Bereich, späteres Feature)

1. Vorschläge werden in eigener Sektion angezeigt
2. Gleiche Inline-Darstellung
3. ✓ = Übernehmen als Zeiteintrag
4. ✗ = Verwerfen

---

## UI-Design

### Zeiteinträge

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  [+ Neuer Eintrag]                                              Januar 2026    │
├──────────┬───────┬───────┬───────┬──────────┬───────────────────────┬──────────┤
│ Datum    │ Start │ Ende  │ Pause │ Projekt  │ Beschreibung          │ Aktionen │
├──────────┼───────┼───────┼───────┼──────────┼───────────────────────┼──────────┤
│ [30.01.] │ [   ] │ [   ] │ [  ]  │ [v    ]  │ [                   ] │  💾  ✗   │  ← Neue Zeile
├──────────┼───────┼───────┼───────┼──────────┼───────────────────────┼──────────┤
│ Do 30.01.│ 08:00 │ 17:00 │ 45    │ Intern   │ Büroarbeit            │  ✎  🗑   │
│ Mi 29.01.│ 09:00 │ 18:00 │ 60    │ Kunde A  │ Workshop              │  ✎  🗑   │
│ Di 28.01.│ 08:30 │ 16:30 │ 30    │ Intern   │ Meeting + Entwicklung │  ✎  🗑   │
└──────────┴───────┴───────┴───────┴──────────┴───────────────────────┴──────────┘
```

### Abwesenheiten

```
┌──────────────────────────────────────────────────────────────────────────────────┐
│  [+ Neue Abwesenheit]                                                            │
├───────────┬──────────┬──────────┬───────┬────────────────────────────┬───────────┤
│ Typ       │ Von      │ Bis      │ ½ Tag │ Bemerkung                  │ Aktionen  │
├───────────┼──────────┼──────────┼───────┼────────────────────────────┼───────────┤
│ [v     ]  │ [      ] │ [      ] │ [ ]   │ [                        ] │  💾   ✗   │  ← Neue Zeile
├───────────┼──────────┼──────────┼───────┼────────────────────────────┼───────────┤
│ Urlaub    │ 15.02.26 │ 20.02.26 │       │ Winterurlaub               │  ✎   🗑   │
│ Krankheit │ 05.01.26 │ 06.01.26 │       │ Erkältung                  │  ✎   🗑   │
└───────────┴──────────┴──────────┴───────┴────────────────────────────┴───────────┘
```

### Bearbeitungsmodus (nach Klick auf ✎)

```
│ Mi 29.01.│ [09:00]│[18:00]│ [60]  │ [v Kunde]│ [Workshop           ] │  💾  ✗   │
                                                                          ↑ Speichern/Abbrechen
```

### CalDAV-Vorschläge (eigene Sektion, späteres Feature)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│  📅 3 Vorschläge aus Kalender                              [Alle bestätigen]   │
├──────────┬───────┬───────┬───────┬───────────────────────────────┬─────────────┤
│ Datum    │ Start │ Ende  │ Pause │ Beschreibung                  │             │
├──────────┼───────┼───────┼───────┼───────────────────────────────┼─────────────┤
│ Do 30.01.│[08:00]│[17:00]│ [45]  │ [Daily + Projektarbeit]       │  ✓     ✗    │
│ Mi 29.01.│[09:00]│[19:00]│ [60]  │ [Ganztages-Workshop]          │  ✓     ✗    │
│ Di 28.01.│[08:30]│[16:30]│ [30]  │ [Kundentermin]                │  ✓     ✗    │
└──────────┴───────┴───────┴───────┴───────────────────────────────┴─────────────┘
```

---

## Automatische Berechnungen

### Zeiteinträge: Pausenberechnung

1. User ändert Start oder Ende
2. `@change` Event wird gefeuert
3. Pause wird neu berechnet (§4 ArbZG)
4. Pause-Feld wird automatisch aktualisiert
5. Hinweis erscheint unter der Zeile: "Mindestpause: 45 min (§4 ArbZG)"

```javascript
// Pseudocode
onTimeChange(row) {
    const grossMinutes = calculateWorkMinutes(row.startTime, row.endTime, 0)
    row.breakMinutes = suggestBreak(grossMinutes)

    // Bei >10h: Pause erhöhen für max 10h Netto
    if (grossMinutes - row.breakMinutes > 600) {
        row.breakMinutes = grossMinutes - 600
    }
}
```

### Abwesenheiten: Tage-Berechnung

1. User ändert Von oder Bis
2. Arbeitstage werden automatisch berechnet (ohne Wochenende/Feiertage)
3. Bei "Halber Tag" aktiviert: Bis = Von (readonly), Tage = 0.5

```javascript
// Pseudocode
onDateChange(row) {
    if (row.isHalfDay) {
        row.endDate = row.startDate
        row.days = 0.5
    } else {
        row.days = calculateWorkingDays(row.startDate, row.endDate)
    }
}
```

---

## Regeln

### Validierung Zeiteinträge

- Start muss vor Ende liegen
- Pause darf nicht unter gesetzlichem Minimum liegen
- Datum muss gültig sein
- Kein Zeiteintrag bei ganzem Urlaubstag
- Bei Fehlern: Zeile rot markieren, Speichern deaktiviert

### Validierung Abwesenheiten

- Von muss vor oder gleich Bis sein
- Typ muss ausgewählt sein
- Bei Urlaub: Prüfung ob genug Resturlaub
- Bei Fehlern: Zeile rot markieren, Speichern deaktiviert

### Tastatur-Navigation

- Tab: Nächstes Feld
- Enter: Speichern (wenn valide)
- Escape: Abbrechen (Änderungen verwerfen)

### Status-Handling

**Zeiteinträge:**
- Nur Einträge mit Status `draft` oder `rejected` sind editierbar
- Eingereichte Einträge (`submitted`, `approved`) sind read-only
- Read-only Zeilen haben keine ✎ Aktion

**Abwesenheiten:**
- Nur Abwesenheiten mit Status `pending` oder `rejected` sind editierbar
- Genehmigte Abwesenheiten (`approved`) sind read-only
- Stornieren bleibt als separate Aktion

---

## Komponenten-Struktur

### Betroffene Dateien

```
src/
├── components/
│   ├── TimeEntryList.vue      → Refactoring zu Inline-Editing
│   ├── TimeEntryRow.vue       → NEU: Einzelne Zeile (editierbar)
│   ├── TimeEntryForm.vue      → Wird ersetzt durch TimeEntryRow
│   ├── AbsenceList.vue        → NEU: Aus AbsenceView extrahiert
│   ├── AbsenceRow.vue         → NEU: Einzelne Zeile (editierbar)
│   ├── AbsenceForm.vue        → Wird ersetzt durch AbsenceRow
│   └── CalendarSuggestions.vue → NEU: Vorschlags-Sektion (späteres Feature)
└── views/
    ├── TimeTrackingView.vue   → Anpassung der Integration
    └── AbsenceView.vue        → Anpassung der Integration
```

### TimeEntryRow.vue (neu)

Props:
- `entry`: Object (Zeiteintrag oder null für neue Zeile)
- `editable`: Boolean
- `mode`: 'view' | 'edit' | 'create' | 'suggestion'

Events:
- `@save`: Speichern
- `@cancel`: Abbrechen
- `@delete`: Löschen
- `@accept`: Vorschlag annehmen (nur mode=suggestion)
- `@reject`: Vorschlag ablehnen (nur mode=suggestion)

### AbsenceRow.vue (neu)

Props:
- `absence`: Object (Abwesenheit oder null für neue Zeile)
- `editable`: Boolean
- `mode`: 'view' | 'edit' | 'create'

Events:
- `@save`: Speichern
- `@cancel`: Abbrechen
- `@delete`: Löschen
- `@cancel-absence`: Stornieren (genehmigte Abwesenheit zurückziehen)

---

## Nicht im Scope

- Mitarbeiter-Formular (bleibt Modal - zu viele komplexe Felder)
- Drag & Drop Sortierung
- Bulk-Edit (mehrere Zeilen gleichzeitig)
- Keyboard-only Navigation (Tab durch alle Zeilen)

---

## Abhängigkeiten

Dieses Feature ist Voraussetzung für:
- CalDAV-Import (`20260130_Feature-CalDAV-Import.md`)

---

*Erstellt: 2026-01-30*
*Aktualisiert: 2026-01-30 - Abwesenheiten hinzugefügt*
