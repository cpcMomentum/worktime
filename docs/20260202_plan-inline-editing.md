# Plan: Inline-Editing für Zeiteinträge und Abwesenheiten

**Datum:** 2026-02-02
**Status:** Implementiert (zum Testen bereit)
**Feature-Dokument:** `20260130_Feature-Inline-Editing.md`

---

## Ziel

Modal-basierte Bearbeitung ersetzen durch Inline-Editing direkt in der Tabelle:
- Neuer Eintrag: Leere editierbare Zeile erscheint oben
- Bearbeiten: Klick auf ✎ macht Zeile editierbar
- Speichern/Abbrechen direkt in der Zeile

---

## Aktueller Stand

| Komponente | Funktion |
|------------|----------|
| `TimeEntryList.vue` | Nur Anzeige, emittiert `@edit` Event |
| `TimeEntryForm.vue` | Modal-Formular für Create/Update |
| `TimeTrackingView.vue` | Orchestriert List + Modal via `showForm` State |
| `AbsenceView.vue` | Enthält Tabelle + Modal inline |
| `AbsenceForm.vue` | Modal-Formular für Create/Update |

---

## Implementierungsplan

### Phase 1: TimeEntryRow-Komponente (Neue Komponente)

**Neue Datei:** `src/components/TimeEntryRow.vue`

Einzelne Tabellenzeile mit 3 Modi:
- `view` - Nur Anzeige (wie bisher)
- `edit` - Felder editierbar
- `create` - Leere Zeile für neuen Eintrag

**Props:**
```javascript
props: {
  entry: Object,        // null für create
  mode: String,         // 'view' | 'edit' | 'create'
  projects: Array,      // Projekt-Optionen
  readonly: Boolean     // Für Team-View
}
```

**Events:**
- `@save` - Speichern (mit Daten)
- `@cancel` - Abbrechen
- `@delete` - Löschen
- `@edit` - In Edit-Modus wechseln

**Features:**
- Automatische Pausenberechnung bei Zeit-Änderung
- Enter = Speichern, Escape = Abbrechen
- Validierung mit visueller Markierung (rote Border)
- Inline-Inputs für Datum, Zeit, Pause, Projekt, Beschreibung

### Phase 2: TimeEntryList refactoring

**Datei:** `src/components/TimeEntryList.vue`

Änderungen:
1. Verwendet `TimeEntryRow` für jede Zeile
2. Neuer State: `editingId` (welche Zeile wird bearbeitet)
3. Neuer State: `isCreating` (zeigt Create-Zeile an)
4. Methoden: `startEdit(id)`, `startCreate()`, `cancelEdit()`

**Template-Struktur:**
```vue
<table>
  <thead>...</thead>
  <tbody>
    <!-- Create-Zeile (wenn isCreating) -->
    <TimeEntryRow v-if="isCreating"
      :entry="null"
      mode="create"
      @save="onCreate"
      @cancel="cancelCreate" />

    <!-- Bestehende Einträge -->
    <TimeEntryRow v-for="entry in sortedEntries"
      :entry="entry"
      :mode="editingId === entry.id ? 'edit' : 'view'"
      @edit="startEdit(entry.id)"
      @save="onUpdate"
      @cancel="cancelEdit"
      @delete="onDelete" />
  </tbody>
</table>
```

### Phase 3: TimeTrackingView anpassen

**Datei:** `src/views/TimeTrackingView.vue`

Änderungen:
1. Modal-Logik entfernen (`showForm`, `editingEntry`, `NcModal`)
2. Button "Neuer Eintrag" ruft `this.$refs.list.startCreate()` auf
3. TimeEntryForm.vue wird nicht mehr benötigt (später entfernen oder behalten für andere Zwecke)

### Phase 4: AbsenceRow-Komponente (Neue Komponente)

**Neue Datei:** `src/components/AbsenceRow.vue`

Analog zu TimeEntryRow mit:
- Typ-Dropdown
- Datumspicker Von/Bis
- Halber-Tag Checkbox
- Bemerkung

**Besonderheiten:**
- Bei "Halber Tag": Bis = Von (readonly)
- Automatische Tage-Berechnung

### Phase 5: AbsenceView refactoring

**Datei:** `src/views/AbsenceView.vue`

Änderungen:
1. Tabelle auf `AbsenceRow`-Komponenten umstellen
2. Modal-Logik entfernen
3. State: `editingId`, `isCreating`

---

## Detaillierte Komponenten-Spezifikation

### TimeEntryRow.vue

```
┌──────────┬───────┬───────┬───────┬──────────┬───────────────────────┬──────────┐
│ Datum    │ Start │ Ende  │ Pause │ Projekt  │ Beschreibung          │ Aktionen │
├──────────┼───────┼───────┼───────┼──────────┼───────────────────────┼──────────┤
│ [Input]  │[Input]│[Input]│[Input]│ [Select] │ [Input              ] │  💾  ✗   │  ← create/edit
├──────────┼───────┼───────┼───────┼──────────┼───────────────────────┼──────────┤
│ Mo 03.02.│ 08:00 │ 17:00 │ 45    │ Intern   │ Büroarbeit            │  ✎  🗑   │  ← view
└──────────┴───────┴───────┴───────┴──────────┴───────────────────────┴──────────┘
```

**Validierung:**
- Start < Ende
- Pause >= gesetzliches Minimum
- Datum ausgefüllt
- Arbeitszeit > 0

### AbsenceRow.vue

```
┌───────────┬──────────┬──────────┬───────┬────────────────────────────┬───────────┐
│ Typ       │ Von      │ Bis      │ ½ Tag │ Bemerkung                  │ Aktionen  │
├───────────┼──────────┼──────────┼───────┼────────────────────────────┼───────────┤
│ [Select]  │ [Picker] │ [Picker] │ [☐]   │ [Input                   ] │  💾   ✗   │
├───────────┼──────────┼──────────┼───────┼────────────────────────────┼───────────┤
│ Urlaub    │ 15.02.26 │ 20.02.26 │       │ Winterurlaub               │  ✎   🗑   │
└───────────┴──────────┴──────────┴───────┴────────────────────────────┴───────────┘
```

---

## Betroffene Dateien

| Datei | Aktion |
|-------|--------|
| `src/components/TimeEntryRow.vue` | NEU |
| `src/components/TimeEntryList.vue` | Refactoring |
| `src/views/TimeTrackingView.vue` | Anpassen |
| `src/components/AbsenceRow.vue` | NEU |
| `src/views/AbsenceView.vue` | Refactoring |
| `src/components/TimeEntryForm.vue` | Unverändert (vorerst behalten) |
| `src/components/AbsenceForm.vue` | Unverändert (vorerst behalten) |

---

## Tastatur-Navigation

| Taste | Aktion |
|-------|--------|
| `Tab` | Nächstes Feld |
| `Enter` | Speichern (wenn valide) |
| `Escape` | Abbrechen |

---

## Nicht im Scope

- Drag & Drop Sortierung
- Bulk-Edit (mehrere Zeilen)
- Keyboard-Navigation zwischen Zeilen
- CalDAV-Vorschläge (separates Feature)

---

## Reihenfolge der Implementierung

1. **TimeEntryRow.vue** erstellen und isoliert testen
2. **TimeEntryList.vue** refactoren
3. **TimeTrackingView.vue** anpassen
4. Testen: Zeiteinträge CRUD funktioniert
5. **AbsenceRow.vue** erstellen (analog zu TimeEntryRow)
6. **AbsenceView.vue** refactoren
7. Testen: Abwesenheiten CRUD funktioniert
8. Alte Form-Komponenten evaluieren (behalten oder entfernen)

---

## Verifizierung

Nach Implementierung testen:

1. **Zeiteinträge:**
   - [ ] Neuer Eintrag über Button → Zeile erscheint
   - [ ] Werte eingeben, Enter drücken → Gespeichert
   - [ ] Escape drücken → Abgebrochen, Zeile verschwindet
   - [ ] Bestehenden Eintrag bearbeiten (✎) → Zeile editierbar
   - [ ] Pause wird automatisch berechnet
   - [ ] Validierung verhindert Speichern bei Fehler
   - [ ] Löschen funktioniert mit Bestätigung

2. **Abwesenheiten:**
   - [ ] Neue Abwesenheit über Button
   - [ ] Halber Tag → Bis-Datum readonly
   - [ ] Typ-Auswahl funktioniert
   - [ ] Bearbeiten/Löschen funktioniert
   - [ ] Status-abhängige Aktionen (nur pending/rejected editierbar)

3. **Edge Cases:**
   - [ ] Nur eine Zeile gleichzeitig editierbar
   - [ ] Bei Wechsel: Ungespeicherte Änderungen werden still verworfen
   - [ ] Team-View: readonly ohne Aktionen

---

*Erstellt: 2026-02-02*
