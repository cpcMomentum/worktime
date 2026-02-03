# Plan: WorkTime App Refactoring

**Erstellt:** 2026-02-02
**Status:** Phase 1 & 2 umgesetzt, Phase 3-5 offen

---

## Umsetzungsstatus

| Phase | Status | Beschreibung |
|-------|--------|--------------|
| Phase 1 | ✅ Umgesetzt | BaseController, Logger in Services |
| Phase 2 | ✅ Umgesetzt | constants.js, formatters.js, Composables |
| Phase 3 | ⏸️ Offen | ValidatorService |
| Phase 4 | ⏸️ Offen | Views auf Composables umstellen |
| Phase 5 | ⏸️ Offen | Code-Cleanup |

---

## Ziel

Code-Qualität verbessern, Nextcloud-Vorgaben einhalten, Best Practices umsetzen.

---

## Analyse-Ergebnis

### Backend (10 Issues gefunden)
- Redundante Auth-Checks in allen Controllern
- Doppeltes Exception-Handling (63× catch-Blöcke)
- Validierung verteilt über Services (private Methoden)
- Permission-Checks inkonsistent (Controller vs. Service)
- Fehlende Input-Validierung auf Controller-Ebene
- Fehlende Typisierung in Mapper-Queries
- AuditLog mit optionaler IRequest Dependency
- Fehlendes Logging in 5 von 6 Controllern
- Zu viele optionale Parameter
- Doppelter Code in Status-Workflows

### Frontend (7 Issues gefunden)
- Code-Duplikation: `formatDate()` 4×, `formatMinutes()` 4×, `getStatusLabel()` 3×
- Doppeltes Error-Handling (Service + Component)
- Fehlende zentrale Konstanten
- Watch-Logik doppelt in Views
- Inkonsistente Lifecycle-Hooks
- Fehlende Composables für wiederverwendbare Logik
- Options API statt Composition API

---

## Refactoring-Phasen

### Phase 1: Backend - Grundlagen (Prio HOCH) ✅

#### 1.1 BaseController erstellen
**Datei:** `lib/Controller/BaseController.php` (NEU)

```php
abstract class BaseController extends OCSController {
    protected function requireAuth(): void {
        if (!$this->userId) {
            throw new NotAuthenticatedException();
        }
    }

    protected function handleException(\Exception $e): JSONResponse {
        if ($e instanceof NotFoundException) {
            return new JSONResponse(['error' => $e->getMessage()], Http::STATUS_NOT_FOUND);
        }
        if ($e instanceof ValidationException) {
            return new JSONResponse(['errors' => $e->getErrors()], Http::STATUS_BAD_REQUEST);
        }
        // ... weitere Exception-Typen
    }
}
```

**Betroffene Dateien:**
- `lib/Controller/TimeEntryController.php` - extends BaseController ✅
- `lib/Controller/AbsenceController.php` - extends BaseController ✅
- `lib/Controller/EmployeeController.php` - extends BaseController ✅
- `lib/Controller/ProjectController.php` - extends BaseController ✅
- `lib/Controller/HolidayController.php` - extends BaseController ✅
- `lib/Controller/SettingsController.php` - extends BaseController ✅
- `lib/Controller/ReportController.php` - extends BaseController ✅

#### 1.2 Logger in alle Services ✅
**Betroffene Dateien:**
- `lib/Service/TimeEntryService.php` - LoggerInterface hinzugefügt ✅
- `lib/Service/AbsenceService.php` - LoggerInterface hinzugefügt ✅
- `lib/Service/EmployeeService.php` - LoggerInterface hinzugefügt ✅
- `lib/Service/ProjectService.php` - LoggerInterface hinzugefügt ✅
- `lib/Service/HolidayService.php` - LoggerInterface hinzugefügt ✅

#### 1.3 Mapper Typisierung
**Betroffene Dateien:**
- `lib/Db/TimeEntryMapper.php` - PARAM_STR/PARAM_INT konsistent
- `lib/Db/AbsenceMapper.php` - PARAM_STR/PARAM_INT konsistent
- `lib/Db/EmployeeMapper.php` - PARAM_STR/PARAM_INT konsistent

---

### Phase 2: Frontend - Utils & Konstanten (Prio HOCH) ✅

#### 2.1 Zentrale Konstanten ✅
**Datei:** `src/constants.js` (NEU)

```javascript
export const ENTRY_STATUS = {
    DRAFT: 'draft',
    SUBMITTED: 'submitted',
    APPROVED: 'approved',
    REJECTED: 'rejected',
}

export const ABSENCE_TYPES = {
    VACATION: 'vacation',
    SICK: 'sick',
    // ...
}

export const STATUS_LABELS = {
    draft: 'Entwurf',
    submitted: 'Eingereicht',
    approved: 'Genehmigt',
    rejected: 'Abgelehnt',
}
```

#### 2.2 Gemeinsame Utils konsolidieren ✅
**Datei:** `src/utils/formatters.js` (NEU)

```javascript
export function formatMinutesToHours(minutes) { ... }
export function formatDate(date, format = 'short') { ... }
export function getStatusLabel(status) { ... }
export function getAbsenceTypeLabel(type) { ... }
```

**Betroffene Dateien (Import ändern):**
- `src/views/TimeTrackingView.vue`
- `src/views/MonthlyReportView.vue` ✅
- `src/views/AbsenceView.vue` ✅
- `src/views/TeamView.vue`
- `src/components/TimeEntryList.vue`
- `src/components/OvertimeSummary.vue`

#### 2.3 Composables erstellt ✅
**Dateien:**
- `src/composables/useMonthNavigation.js` ✅
- `src/composables/useDataLoader.js` ✅
- `src/composables/index.js` ✅

---

### Phase 3: Backend - Validierung (Prio MITTEL) ⏸️

#### 3.1 Validator Service
**Datei:** `lib/Service/ValidatorService.php` (NEU)

```php
class ValidatorService {
    public function validateTimeEntry(array $data): array {
        $errors = [];
        if (empty($data['date'])) {
            $errors['date'] = ['Date is required'];
        }
        // ... weitere Validierungen
        return $errors;
    }

    public function validateEmployee(array $data): array { ... }
    public function validateAbsence(array $data): array { ... }
}
```

**Betroffene Dateien:**
- `lib/Service/TimeEntryService.php` - validate() → ValidatorService
- `lib/Service/EmployeeService.php` - validate() → ValidatorService
- `lib/Service/AbsenceService.php` - inline Validierung → ValidatorService

---

### Phase 4: Frontend - Composables (Prio MITTEL) ⏸️

#### 4.1 useMonthNavigation in Views einbauen
**Betroffene Dateien:**
- `src/views/TimeTrackingView.vue` - Composable nutzen
- `src/views/MonthlyReportView.vue` - Composable nutzen

#### 4.2 useDataLoader in Views einbauen
**Betroffene Dateien:**
- Alle Views mit async Datenladung

---

### Phase 5: Code-Cleanup (Prio NIEDRIG) ⏸️

#### 5.1 Doppelten Status-Workflow Code zusammenführen
**Datei:** `lib/Service/TimeEntryService.php`
- `submit()` + `submitMonth()` → gemeinsame private Methode
- `approve()` + `approveMonth()` → gemeinsame private Methode

#### 5.2 AuditLog IRequest Handling
**Datei:** `lib/Service/AuditLogService.php`
- IRequest verpflichtend machen oder IP im Controller setzen

#### 5.3 Optional Parameter reduzieren
**Betroffene Dateien:**
- `lib/Service/TimeEntryService.php` - `$currentUserId` verpflichtend
- `lib/Service/EmployeeService.php` - `$currentUserId` verpflichtend
- `lib/Service/AbsenceService.php` - `$currentUserId` verpflichtend

---

## Dateien-Übersicht

### Neue Dateien
| Datei | Beschreibung | Status |
|-------|--------------|--------|
| `lib/Controller/BaseController.php` | Gemeinsame Controller-Logik | ✅ |
| `lib/Service/ValidatorService.php` | Zentrale Validierung | ⏸️ |
| `src/constants.js` | Frontend-Konstanten | ✅ |
| `src/composables/useMonthNavigation.js` | Month-Navigation Logic | ✅ |
| `src/composables/useDataLoader.js` | Async Data Loading | ✅ |

### Zu ändernde Dateien
| Datei | Änderung | Status |
|-------|----------|--------|
| 7 Controller | extends BaseController | ✅ |
| 5 Services | Logger hinzufügen | ✅ |
| 3 Mapper | Typisierung konsistent | ⏸️ |
| 6 Vue Views | Utils importieren, Composables nutzen | Teilweise |
| 2 Vue Components | Utils importieren | ⏸️ |
| `src/utils/formatters.js` | Funktionen hinzufügen | ✅ |

---

## Verifikation

1. **Unit Tests ausführen:** `./vendor/bin/phpunit tests/`
2. **Frontend Build:** `npm run build` ✅
3. **App aktivieren:** `php occ app:enable worktime`
4. **Manuelle Tests:**
   - Zeiteintrag erstellen/bearbeiten/löschen
   - Abwesenheit erstellen/genehmigen
   - Monatsbericht anzeigen/PDF exportieren
   - Team-Übersicht prüfen
5. **Deploy auf VPS und Produktivtest**

---

## Nicht im Scope

- Migration zu TypeScript
- Migration zu Composition API (nur neue Composables)
- Komplette Neustrukturierung der Views
- Neue Features
