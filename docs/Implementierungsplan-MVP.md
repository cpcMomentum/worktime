# Implementierungsplan: WorkTime Nextcloud-App (MVP)

## Übersicht

| Aspekt | Details |
|--------|---------|
| App-ID | `worktime` |
| Namespace | `OCA\WorkTime` |
| Nextcloud | 32 |
| PHP | 8.2+ |
| Tabellen-Präfix | `wt_` |
| Referenz | ContractManager-Patterns |

---

## Phase 1: Datenbank-Fundament

### Ziel
Alle 7 Datenbank-Tabellen mit Entities und Mappern erstellen.

### Dateien

**Migration:**
- `lib/Migration/Version000001Date20260127000000.php`
  - Tabellen: `wt_employees`, `wt_time_entries`, `wt_absences`, `wt_holidays`, `wt_projects`, `wt_audit_logs`, `wt_company_settings`

**Entities:**
- `lib/Db/Employee.php`
- `lib/Db/TimeEntry.php`
- `lib/Db/Absence.php`
- `lib/Db/Holiday.php`
- `lib/Db/Project.php`
- `lib/Db/AuditLog.php`
- `lib/Db/CompanySetting.php`

**Mapper:**
- `lib/Db/EmployeeMapper.php`
- `lib/Db/TimeEntryMapper.php`
- `lib/Db/AbsenceMapper.php`
- `lib/Db/HolidayMapper.php`
- `lib/Db/ProjectMapper.php`
- `lib/Db/AuditLogMapper.php`
- `lib/Db/CompanySettingMapper.php`

### Meilenstein
- `php occ app:enable worktime` erstellt Tabellen ohne Fehler

---

## Phase 2: Service-Layer & Berechtigungen

### Ziel
Geschäftslogik, Validierung, Permission-System.

### Dateien

**Exceptions:**
- `lib/Service/NotFoundException.php`
- `lib/Service/ForbiddenException.php`
- `lib/Service/ValidationException.php`

**Services:**
- `lib/Service/PermissionService.php` (wie ContractManager)
- `lib/Service/EmployeeService.php`
- `lib/Service/TimeEntryService.php` (inkl. Pausenberechnung)
- `lib/Service/AbsenceService.php`
- `lib/Service/HolidayService.php` (inkl. Gauss-Algorithmus)
- `lib/Service/ProjectService.php`
- `lib/Service/AuditLogService.php`
- `lib/Service/CompanySettingsService.php`

### Kritische Logik

**Pausenberechnung (§4 ArbZG):**
```
≤6h → 0 min | >6h bis 9h → 30 min | >9h → 45 min
```

**Gauss-Algorithmus für Ostern:**
- Berechnet Ostersonntag für beliebiges Jahr
- Davon abgeleitet: Karfreitag, Ostermontag, Himmelfahrt, Pfingsten, Fronleichnam

**Überstundenberechnung:**
```
Soll = (Wochenstunden / 5) × Arbeitstage - Feiertage - Urlaub
Ist = Summe work_minutes
Überstunden = Ist - Soll
```

### Meilenstein
- Unit-Tests für Gauss (bekannte Osterdaten: 2025=20.04., 2026=05.04., 2027=28.03.)
- Unit-Tests für Pausenberechnung

---

## Phase 3: Controller & API

### Ziel
RESTful API analog zu ContractManager.

### Dateien

**Controller:**
- `lib/Controller/TimeEntryController.php`
- `lib/Controller/AbsenceController.php`
- `lib/Controller/EmployeeController.php`
- `lib/Controller/HolidayController.php`
- `lib/Controller/ProjectController.php`
- `lib/Controller/SettingsController.php`
- `lib/Controller/ReportController.php`

**Routes erweitern:**
- `appinfo/routes.php`

### API-Endpoints (Auszug)

| Methode | Route | Beschreibung |
|---------|-------|--------------|
| GET | `/api/time-entries` | Liste (Filter: month) |
| POST | `/api/time-entries` | Erstellen |
| PUT | `/api/time-entries/{id}` | Bearbeiten |
| DELETE | `/api/time-entries/{id}` | Löschen |
| POST | `/api/time-entries/suggest-break` | Pausenvorschlag |
| GET | `/api/absences` | Abwesenheiten |
| POST | `/api/holidays/generate` | Feiertage generieren |
| GET | `/api/reports/monthly` | Monatsstatistik |
| GET | `/api/reports/pdf` | PDF-Download |
| GET | `/api/reports/team` | Team-Übersicht |
| GET | `/api/settings/permissions` | Berechtigungen |

### Meilenstein
- CRUD für TimeEntry funktioniert via curl/Postman
- Permission-Checks greifen

---

## Phase 4: PDF-Generierung

### Ziel
Monats-PDF mit TCPDF.

### Dateien

**Composer erweitern:**
- `composer.json` → `"tecnickcom/tcpdf": "^6.6"`

**Service:**
- `lib/Service/PdfService.php`

### PDF-Struktur
1. **Header:** Firmenname, Mitarbeiter, Monat/Jahr
2. **Tabelle:** Datum | Beginn | Ende | Pause | Arbeitszeit | Projekt | Bemerkung
3. **Zusammenfassung:** Soll/Ist/Überstunden, Urlaub, Krank
4. **Signaturfelder:** Mitarbeiter / Vorgesetzter / Datum

### Meilenstein
- PDF wird generiert und heruntergeladen
- Alle Daten korrekt formatiert

---

## Phase 5: Frontend

### Ziel
Vollständige Vue.js UI.

### Dateien

**Services:**
- `src/services/TimeEntryService.js`
- `src/services/AbsenceService.js`
- `src/services/EmployeeService.js`
- `src/services/HolidayService.js`
- `src/services/ProjectService.js`
- `src/services/ReportService.js`
- `src/services/SettingsService.js`

**Vuex Store:**
- `src/store/modules/timeEntries.js`
- `src/store/modules/absences.js`
- `src/store/modules/employees.js`
- `src/store/modules/holidays.js`
- `src/store/modules/projects.js`
- `src/store/modules/permissions.js`
- `src/store/index.js` (erweitern)

**Views:**
- `src/views/TimeTrackingView.vue` (Hauptansicht)
- `src/views/MonthlyReportView.vue`
- `src/views/AbsenceView.vue`
- `src/views/TeamView.vue`
- `src/views/SettingsView.vue`

**Components:**
- `src/components/TimeEntryForm.vue`
- `src/components/TimeEntryList.vue`
- `src/components/AbsenceForm.vue`
- `src/components/MonthPicker.vue`
- `src/components/OvertimeSummary.vue`
- `src/components/TeamMemberCard.vue`
- `src/components/EmployeeForm.vue`
- `src/components/HolidayManager.vue`
- `src/components/PermissionPicker.vue`

**Utils:**
- `src/utils/dateUtils.js`
- `src/utils/timeUtils.js`
- `src/utils/errorHandler.js`

**App.vue erweitern:**
- Navigation: Zeiterfassung, Monatsübersicht, Abwesenheiten, Team, Einstellungen

### Meilenstein
- Zeiterfassung funktioniert (Create/Edit)
- Pausenvorschlag wird angezeigt
- Monatsübersicht zeigt Daten
- PDF-Download funktioniert

---

## Phase 6: Tests & Feinschliff

### Ziel
Stabilität, Dokumentation.

### Dateien

**Tests:**
- `tests/Unit/Service/TimeEntryServiceTest.php`
- `tests/Unit/Service/HolidayServiceTest.php`
- `tests/Unit/Service/PermissionServiceTest.php`
- `tests/bootstrap.php` (erweitern)

**Lokalisierung:**
- `l10n/de.json` (erweitern)
- `l10n/en.json` (erweitern)

**Dokumentation:**
- `README.md` (erweitern)
- `CLAUDE.md` (aktualisieren)

### Meilenstein
- Alle Unit-Tests grün
- App voll funktionsfähig in Nextcloud 32

---

## Abhängigkeiten

```
Phase 1 (DB)
    ↓
Phase 2 (Services)
    ↓
Phase 3 (API) ──→ Phase 4 (PDF, parallel möglich)
    ↓
Phase 5 (Frontend)
    ↓
Phase 6 (Tests)
```

---

## Kritische Dateien

| Datei | Warum kritisch |
|-------|----------------|
| `lib/Migration/Version000001Date20260127000000.php` | Fundament - alle 7 Tabellen |
| `lib/Service/HolidayService.php` | Gauss-Algorithmus, Bundesland-Logik |
| `lib/Service/TimeEntryService.php` | Pausen- & Überstundenberechnung |
| `lib/Service/PermissionService.php` | Berechtigungssystem |
| `lib/Service/PdfService.php` | PDF-Generierung mit TCPDF |

---

## Verifikation

### Nach jeder Phase testen:

1. **Phase 1:** `php occ app:enable worktime` - Tabellen erstellt?
2. **Phase 2:** PHPUnit für Services - Berechnungen korrekt?
3. **Phase 3:** curl-Tests für API-Endpoints
4. **Phase 4:** PDF manuell herunterladen und prüfen
5. **Phase 5:** `npm run build` + App im Browser testen
6. **Phase 6:** Vollständiger Durchlauf aller Features

### End-to-End Test:
1. Als Admin: Mitarbeiter anlegen, Feiertage generieren
2. Als Mitarbeiter: Zeiteintrag erstellen, Urlaub eintragen
3. Monatsübersicht prüfen (Soll/Ist/Überstunden)
4. PDF herunterladen und Daten verifizieren
5. Als Vorgesetzter: Team-Übersicht prüfen

---

## Zusammenfassung

| Metrik | Wert |
|--------|------|
| Neue Dateien | ~66 |
| Erweiterte Dateien | ~6 |
| Datenbank-Tabellen | 7 |
| API-Endpoints | ~25 |
| Vue-Components | ~9 |
| Vue-Views | ~5 |
