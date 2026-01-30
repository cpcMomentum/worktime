# Feature: CalDAV-Import mit Bestätigungs-Workflow

## Problem

Mitarbeiter pflegen ihre Termine bereits in externen Kalendern (z.B. Mailbox.org). Die manuelle Übertragung in die Zeiterfassung ist doppelte Arbeit und fehleranfällig.

## Lösung

Automatischer Import von Kalendereinträgen als Zeiteintrags-Vorschläge, die der User nur noch bestätigen muss.

---

## User Flow

### 1. Einrichtung (einmalig)

1. User öffnet Einstellungen in WorkTime
2. Gibt CalDAV-Credentials ein:
   - URL (z.B. `https://dav.mailbox.org/caldav/`)
   - Benutzername
   - Passwort
3. Klickt "Verbindung testen"
4. Wählt einen spezifischen Kalender aus der Liste
5. Speichern

### 2. Automatischer Import (Nacht-Job)

1. Nextcloud Background-Job läuft nachts
2. Für jeden User mit konfiguriertem CalDAV:
   - Kalender abrufen (Termine der letzten X Tage)
   - Pro Tag: Ersten und letzten Termin ermitteln
   - Vorschlag erstellen (Status: pending)
3. Bereits importierte Tage werden übersprungen
4. Tage mit bestehender Abwesenheit (Urlaub/Krankheit) werden übersprungen

### 3. Bestätigung durch User

1. User öffnet WorkTime
2. Sieht Hinweis: "3 neue Vorschläge aus Kalender"
3. Vorschläge werden in Inline-Liste angezeigt:
   ```
   │ Datum    │ Start   │ Ende    │ Pause │ Beschreibung      │         │
   │ 28.01.   │ [08:00] │ [17:00] │ [45]  │ [Meeting + Dev]   │  ✓   ✗  │
   │ 29.01.   │ [09:00] │ [19:00] │ [60]  │ [Workshop Kunde]  │  ✓   ✗  │
   │ 30.01.   │ [08:30] │ [16:30] │ [30]  │ [Bürotag]         │  ✓   ✗  │
   ```
4. User kann Werte direkt in der Zeile anpassen
5. ✓ = Übernehmen als Zeiteintrag (Status: draft)
6. ✗ = Verwerfen (wird nicht mehr vorgeschlagen)

---

## Regeln / Logik

### Termin-Aggregation

- **Ein Vorschlag pro Tag** (nicht pro Termin)
- Start = Beginn des ersten Termins des Tages
- Ende = Ende des letzten Termins des Tages
- Beschreibung = Titel des ersten Termins (oder Zusammenfassung)

### Ganztägige Termine

- **Echte ganztägige Termine** (ohne Uhrzeit, 0:00-23:59): Ignorieren
- **Lange Termine mit Uhrzeit** (z.B. 08:00-20:00 Workshop): Importieren

### Pausen-Automatik

Nach §4 ArbZG:
- \> 6h Arbeitszeit: mind. 30 min Pause
- \> 9h Arbeitszeit: mind. 45 min Pause

Nach §3 ArbZG:
- Max. 10h Nettoarbeitszeit pro Tag
- Bei längeren Tagen: Pause wird automatisch erhöht

**Beispiel:**
```
Termine: 08:00-20:00 (12h brutto)
→ Automatische Pause: 120 min
→ Nettoarbeitszeit: 10h (Maximum)
```

### Abwesenheits-Abgleich

- Tag hat genehmigte Abwesenheit im System → kein Vorschlag
- Tag hat halbe Abwesenheit → Vorschlag wird trotzdem erstellt (User entscheidet)

### Konflikte

- Tag hat bereits manuellen Zeiteintrag → kein Vorschlag
- Bereits importierter Tag → wird nicht erneut vorgeschlagen

---

## Credentials-Speicherung

Best Practice: Nextcloud `ICredentialsManager`

```php
use OCP\Security\ICredentialsManager;

// Speichern (verschlüsselt)
$credentialsManager->store($userId, 'worktime-caldav', [
    'url' => 'https://dav.mailbox.org/caldav/',
    'username' => 'user@mailbox.org',
    'password' => 'geheim',
    'calendar_id' => 'selected-calendar-uri',
]);

// Abrufen
$credentials = $credentialsManager->retrieve($userId, 'worktime-caldav');
```

---

## Daten & Objekte

### Neue Tabelle: `wt_calendar_suggestions`

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | int | Primary Key |
| employee_id | int | FK zu wt_employees |
| date | date | Datum des Vorschlags |
| start_time | string | Vorgeschlagene Startzeit |
| end_time | string | Vorgeschlagene Endzeit |
| break_minutes | int | Berechnete Pause |
| description | string | Aus Kalender-Titel |
| status | string | pending / accepted / rejected |
| source_calendar | string | Kalender-URI |
| created_at | datetime | Import-Zeitpunkt |

---

## Nicht im Scope (MVP)

- Einzeltermine statt Tages-Zusammenfassung
- Projekt-Zuordnung aus Kalender-Kategorien
- Auswertungen pro Kunde/Projekt
- Mehrere Kalender gleichzeitig
- Bidirektionale Sync (Zeiteinträge → Kalender)

---

## Abhängigkeit: UI-Refactoring

Dieses Feature setzt **Inline-Editing** für die Zeiteintrags-Liste voraus.

Siehe: `20260130_Feature-Inline-Editing.md`

---

## Ausblick (spätere Versionen)

1. **Einzeltermin-Import**: Jeder Termin = ein Zeiteintrag
2. **Projekt-Mapping**: Kalender-Kategorie → Projekt
3. **Kunden-Auswertung**: Arbeitszeit pro Projekt/Kunde
4. **Multi-Kalender**: Mehrere Kalender auswählen

---

*Erstellt: 2026-01-30*
