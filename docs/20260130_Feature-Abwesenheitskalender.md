# Feature: Abwesenheitskalender (Nextcloud Calendar Integration)

## Problem

Das Team hat keinen zentralen Überblick, wer wann abwesend ist. Man muss in WorkTime nachschauen oder Kollegen fragen.

## Lösung

Automatische Synchronisation von genehmigten Abwesenheiten in einen gemeinsamen Nextcloud-Kalender. Alle Teammitglieder sehen auf einen Blick, wer abwesend ist.

---

## User Flow

### Einrichtung (Admin, einmalig)

1. Admin öffnet WorkTime Einstellungen
2. Sektion "Kalender-Integration"
3. Wählt/erstellt Kalender "Abwesenheiten"
4. Aktiviert Sync
5. Optional: Bestehende genehmigte Abwesenheiten initial synchronisieren

### Automatischer Sync

1. Vorgesetzter/HR genehmigt Abwesenheitsantrag
2. System erstellt automatisch Kalender-Eintrag
3. Alle mit Kalenderzugriff sehen die Abwesenheit

### Bei Stornierung

1. Mitarbeiter oder HR storniert genehmigte Abwesenheit
2. System löscht Kalender-Eintrag automatisch

---

## Regeln / Logik

### Welche Abwesenheiten werden synchronisiert

| Typ | Sync | Anzeige im Kalender |
|-----|------|---------------------|
| Urlaub | ✅ | "Axel - Urlaub" |
| Krankheit | ✅ | "Axel - Krankheit" |
| Kind krank | ✅ | "Axel - Kind krank" |
| Sonderurlaub | ✅ | "Axel - Sonderurlaub" |
| Fortbildung | ❌ | - |

### Status-Filter

- Nur **genehmigte** Abwesenheiten (`status = approved`)
- Ausstehende (`pending`) werden NICHT synchronisiert
- Abgelehnte (`rejected`) werden NICHT synchronisiert

### Sync-Verhalten

```
Abwesenheit genehmigt
        │
        ▼
  Sofort → Kalender-API
        │
    Erfolg? ──────────────┐
        │                 │
       Ja                Nein
        │                 │
        ▼                 ▼
      Fertig      In Retry-Queue
                         │
                         ▼
                Nacht-Job verarbeitet Queue
                         │
                         ▼
                Prüft auch auf Inkonsistenzen
```

### Kalender-Eintrag Format

```
Titel:       {Vorname} {Nachname} - {Typ}
Ganztägig:   Ja
Start:       Startdatum der Abwesenheit
Ende:        Enddatum der Abwesenheit + 1 Tag (CalDAV Konvention für ganztägige Events)
Beschreibung: (leer oder optional Bemerkung)
```

**Beispiel:**
```
Titel:       Axel Deffner - Urlaub
Datum:       16.02.2026 - 20.02.2026 (ganztägig)
```

### Halbe Tage

Bei halben Abwesenheitstagen:
- Titel: "{Name} - {Typ} (halber Tag)"
- Trotzdem als ganztägiger Eintrag (Kalender zeigt keine halben Tage gut an)

---

## Technische Umsetzung

### Nextcloud Calendar API

Nextcloud bietet `OCP\Calendar\IManager` für Kalender-Zugriff:

```php
use OCP\Calendar\IManager as ICalendarManager;

// Kalender finden
$calendars = $calendarManager->getCalendarsForPrincipal('principals/users/admin');

// Event erstellen via CalDAV
// Nextcloud Calendar nutzt intern Sabre/DAV
```

Alternative: Direkt über CalDAV-Endpunkt:
```
PUT /remote.php/dav/calendars/{user}/{calendar}/{event-uid}.ics
```

### Datenbank-Erweiterung

Neue Spalte in `wt_absences`:

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| calendar_event_uid | varchar(255) | UID des Kalender-Events (für Updates/Löschen) |
| calendar_sync_status | varchar(20) | pending / synced / error |
| calendar_sync_error | text | Fehlermeldung bei Sync-Fehler |

### Neue Tabelle: `wt_calendar_sync_queue`

Für Retry-Mechanismus:

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | int | Primary Key |
| absence_id | int | FK zu wt_absences |
| action | varchar(20) | create / update / delete |
| attempts | int | Anzahl Versuche |
| last_attempt | datetime | Letzter Versuch |
| error_message | text | Letzter Fehler |
| created_at | datetime | Erstellt |

### Service-Struktur

```php
// lib/Service/CalendarSyncService.php

class CalendarSyncService {

    // Bei Genehmigung aufgerufen
    public function syncAbsenceToCalendar(Absence $absence): bool

    // Bei Stornierung aufgerufen
    public function removeAbsenceFromCalendar(Absence $absence): bool

    // Für Retry-Queue
    public function processQueue(): void

    // Initial-Sync aller genehmigten Abwesenheiten
    public function syncAllApproved(): int
}
```

### Background Job

```php
// lib/BackgroundJob/CalendarSyncJob.php

class CalendarSyncJob extends TimedJob {
    // Läuft alle 6 Stunden (oder nachts)
    // - Verarbeitet Retry-Queue
    // - Prüft auf Inkonsistenzen
}
```

---

## Einstellungen (Admin)

Neue Sektion in SettingsView:

```
┌─────────────────────────────────────────────────────────────────┐
│ Kalender-Integration                                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│ Abwesenheitskalender                                            │
│ ┌─────────────────────────────────────────┐                     │
│ │ [v] Abwesenheiten (Firma)              │                     │
│ └─────────────────────────────────────────┘                     │
│                                                                 │
│ [✓] Sync aktiviert                                              │
│                                                                 │
│ Synchronisierte Typen:                                          │
│ [✓] Urlaub                                                      │
│ [✓] Krankheit                                                   │
│ [✓] Kind krank                                                  │
│ [✓] Sonderurlaub                                                │
│ [ ] Fortbildung                                                 │
│                                                                 │
│ [Alle jetzt synchronisieren]  [Sync-Status prüfen]              │
│                                                                 │
│ Letzter Sync: 30.01.2026 08:15 - 12 Einträge synchronisiert     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Betroffene Dateien

```
lib/
├── Service/
│   └── CalendarSyncService.php      → NEU
├── BackgroundJob/
│   └── CalendarSyncJob.php          → NEU
├── Migration/
│   └── Version000005*.php           → NEU (calendar_event_uid Spalte)
└── Controller/
    └── AbsenceController.php        → Erweitern (Sync triggern)

src/
└── views/
    └── SettingsView.vue             → Kalender-Einstellungen
```

---

## Nicht im Scope (MVP)

- Bidirektionaler Sync (Kalender → WorkTime)
- Farbkodierung nach Typ
- Mehrere Kalender (z.B. pro Abteilung)
- Sync von Zeiteinträgen (nur Abwesenheiten)
- Einladungen/Teilnehmer im Kalender-Event

---

## Ausblick (spätere Versionen)

1. **Farbkodierung**: Urlaub = blau, Krankheit = rot
2. **Abteilungskalender**: Pro Team ein eigener Kalender
3. **Pending-Anzeige**: Ausstehende Anträge mit "?" markiert

---

*Erstellt: 2026-01-30*
