# Plan: Genehmigungsworkflow mit Timestamps und PDF-Archivierung

**Status:** Implementiert (2026-01-29)

---

## Übersicht

Erweiterung des bestehenden Genehmigungsworkflows um:
1. Timestamps (submitted_at/by, approved_at/by) an TimeEntry
2. Team-View mit "Monat genehmigen" Button
3. Admin/HR-Übersichtsseite für alle Mitarbeiter
4. PDF-Archivierung bei Genehmigung mit Genehmigungsinfo im PDF

---

## Phase 1: Datenbank & Entity (Timestamps)

### 1.1 Migration erstellen
**Datei:** `lib/Migration/Version000003Date20260130000000.php`

Neue Spalten in `wt_time_entries`:
- `submitted_at` (DATETIME, nullable)
- `submitted_by` (INTEGER, nullable) → Employee-ID des Einreichenden
- `approved_at` (DATETIME, nullable)
- `approved_by` (INTEGER, nullable) → Employee-ID des Genehmigenden

### 1.2 TimeEntry Entity erweitern
**Datei:** `lib/Db/TimeEntry.php`

- 4 neue Properties: `$submittedAt`, `$submittedBy`, `$approvedAt`, `$approvedBy`
- PHPDoc-Annotations für Getter/Setter
- `addType()` im Konstruktor
- `jsonSerialize()` erweitern

---

## Phase 2: Backend-Logik

### 2.1 TimeEntryService anpassen
**Datei:** `lib/Service/TimeEntryService.php`

**submit() / submitMonth():**
```php
$entry->setSubmittedAt(new DateTime());
$entry->setSubmittedBy($submittedByEmployeeId);
```

**approve() / approveMonth():**
```php
$entry->setApprovedAt(new DateTime());
$entry->setApprovedBy($approvedByEmployeeId);
```

### 2.2 TimeEntryController anpassen
**Datei:** `lib/Controller/TimeEntryController.php`

- Employee-ID des aktuellen Users ermitteln
- An Service-Methoden übergeben

### 2.3 Neue Mapper-Methode
**Datei:** `lib/Db/TimeEntryMapper.php`

```php
public function getMonthlyStatusSummary(int $employeeId, int $year, int $month): array
// Returns: ['draft' => n, 'submitted' => n, 'approved' => n, 'rejected' => n]
```

---

## Phase 3: PDF-Archivierung

### 3.1 Neue Einstellung
**Datei:** `lib/Db/CompanySetting.php`

```php
public const KEY_PDF_ARCHIVE_PATH = 'pdf_archive_path';
// Default: '/WorkTime/Archiv'
```

### 3.2 PdfService erweitern
**Datei:** `lib/Service/PdfService.php`

1. **Konstruktor:** `IRootFolder` hinzufügen
2. **generateMonthlyReport():** Neuer Parameter `?array $approvalInfo`
3. **Genehmigungsinfo im PDF:** Nach Signatur-Sektion anzeigen (Genehmiger, Datum)
4. **Neue Methode:** `archiveMonthlyReport()` - Speichert PDF in Nextcloud-Ordner

**Ordnerstruktur:** `{archivePath}/{Jahr}/{Nachname_Vorname}/`
**Dateiname:** `Arbeitszeitnachweis_{YYYY-MM}.pdf`

### 3.3 Archivierung bei Genehmigung
**Datei:** `lib/Service/TimeEntryService.php`

In `approveMonth()` am Ende:
1. PDF mit Approval-Info generieren
2. PDF archivieren
3. Pfad im Audit-Log dokumentieren

---

## Phase 4: Team-View erweitern

### 4.1 ReportController erweitern
**Datei:** `lib/Controller/ReportController.php`

In `team()` pro Mitarbeiter hinzufügen:
```php
'monthStatus' => [
    'draft' => $draftCount,
    'submitted' => $submittedCount,
    'approved' => $approvedCount,
    'canApprove' => $submittedCount > 0,
]
```

### 4.2 TeamView.vue erweitern
**Datei:** `src/views/TeamView.vue`

- Status-Badges pro Mitarbeiter (Entwurf/Eingereicht/Genehmigt)
- "Monat genehmigen" Button (nur wenn `canApprove`)
- `approveMonth()` Methode

---

## Phase 5: Admin/HR-Übersicht

### 5.1 Neuer API-Endpoint
**Datei:** `lib/Controller/ReportController.php`

```php
public function allEmployeesStatus(int $year, int $month): JSONResponse
// Nur für Admin/HR - zeigt alle Mitarbeiter mit Status
```

### 5.2 Neue Route
**Datei:** `appinfo/routes.php`

```php
['name' => 'report#allEmployeesStatus', 'url' => '/api/reports/all-status', 'verb' => 'GET']
```

### 5.3 Neue View
**Datei:** `src/views/ApprovalOverviewView.vue`

- Tabelle aller Mitarbeiter
- MonthPicker (auch Vergangenheit)
- Status-Filter
- Batch-Approve möglich

### 5.4 Navigation & Router
**Dateien:** `src/App.vue`, `src/main.js`

- Neuer Nav-Eintrag "Genehmigungen" (nur Admin/HR)
- Route `/approvals`

---

## Phase 6: Settings-View

### 6.1 PDF-Archiv Einstellung
**Datei:** `src/views/SettingsView.vue`

Neue Sektion:
- Input für Archiv-Ordner
- Hilfetext zur Ordnerstruktur

---

## Implementierungsreihenfolge

| # | Phase | Beschreibung |
|---|-------|--------------|
| 1 | 1.1 | Migration erstellen |
| 2 | 1.2 | TimeEntry Entity erweitern |
| 3 | 2.1-2.2 | Service + Controller anpassen |
| 4 | 2.3 | Mapper-Methode |
| 5 | 3.1 | Setting für Archiv-Pfad |
| 6 | 3.2-3.3 | PdfService + Archivierung |
| 7 | 4.1-4.2 | Team-View mit Genehmigen |
| 8 | 5.1-5.4 | Admin/HR-Übersicht |
| 9 | 6.1 | Settings-View erweitern |
| 10 | - | Übersetzungen (l10n/de.json) |
| 11 | - | Build & Deploy |

---

## Kritische Dateien

**Backend:**
- `lib/Migration/Version000003Date20260130000000.php` (NEU)
- `lib/Db/TimeEntry.php`
- `lib/Db/TimeEntryMapper.php`
- `lib/Db/CompanySetting.php`
- `lib/Service/TimeEntryService.php`
- `lib/Service/PdfService.php`
- `lib/Controller/TimeEntryController.php`
- `lib/Controller/ReportController.php`
- `appinfo/routes.php`

**Frontend:**
- `src/views/TeamView.vue`
- `src/views/ApprovalOverviewView.vue` (NEU)
- `src/views/SettingsView.vue`
- `src/App.vue`
- `src/main.js`
- `src/services/TimeEntryService.js`
- `src/services/ReportService.js`
- `l10n/de.json`

---

## Verifikation

1. **Migration testen:** `php occ app:disable worktime && php occ app:enable worktime`
2. **Timestamps prüfen:** Nach Einreichen/Genehmigen in DB nachschauen
3. **Team-View:** Button erscheint nur bei eingereichten Einträgen
4. **PDF:** Genehmigungsinfo im Dokument sichtbar
5. **Archivierung:** PDF im konfigurierten Ordner vorhanden
6. **Admin-Übersicht:** Alle Mitarbeiter sichtbar, Filter funktioniert

---

*Erstellt: 2026-01-29*
*Implementiert: 2026-01-29*
