# Feature: Zentrales PDF-Archiv mit Ordnerauswahl

## Übersicht

Verbesserung der PDF-Archivierung: Zentraler Speicherort im Ordner eines Admins statt verstreut über verschiedene Vorgesetzten-Ordner. Archivierung erfolgt über Background Job, um Berechtigungsprobleme zu vermeiden.

---

## Aktueller Zustand

### Problem

- Archiv-Pfad wird als **Textfeld** eingegeben
- PDF landet im Ordner des **genehmigenden Vorgesetzten**
- Bei mehreren Vorgesetzten: Archiv ist über verschiedene User-Ordner verstreut
- Keine einheitliche Ablage der sensiblen Personaldaten

### Aktuelle Implementierung

```
Vorgesetzter A genehmigt → /home/VorgesetzterA/WorkTime/Archiv/...
Vorgesetzter B genehmigt → /home/VorgesetzterB/WorkTime/Archiv/...
```

**Code-Stellen:**
- `lib/Controller/TimeEntryController.php:337` - verwendet `$this->userId` (Genehmiger)
- `lib/Service/PdfService.php:458` - `getUserFolder($adminUserId)`
- `src/views/SettingsView.vue:183-191` - Textfeld für Pfadeingabe

---

## Gewünschtes Verhalten

### Anforderungen

| Aspekt | Umsetzung |
|--------|-----------|
| **Berechtigung** | Nur Admins können Archiv-Ordner einstellen |
| **UI** | Nextcloud FilePicker (Ordnerauswahl-Dialog) |
| **Speicherort** | Ordner des Admins, der die Einstellung vornimmt |
| **Archivierung** | Alle PDFs landen im selben Ordner (unabhängig vom Genehmiger) |
| **Datenschutz** | Kein Groupfolder - persönliche Daten bleiben beim Admin |
| **Berechtigungen** | Background Job umgeht Berechtigungsprobleme |

### Ziel-Zustand

```
Admin konfiguriert Ordner einmalig (FilePicker)
                ↓
Vorgesetzter genehmigt Monat
                ↓
Archivierungs-Job wird in Queue gestellt
                ↓
Background Job (Cron) schreibt PDF in Admin-Ordner
                ↓
/home/AdminUser/HR-Archiv/2026/Müller_Max/Arbeitszeitnachweis_2026-01.pdf
```

---

## Berechtigungsproblem & Lösung

### Problem bei direkter Archivierung

```
Vorgesetzter genehmigt
        ↓
Code läuft im Kontext des Vorgesetzten
        ↓
Versuch: getUserFolder($adminUserId) → Schreiben in Admin-Ordner
        ↓
❌ Vorgesetzter hat keine Schreibrechte auf Admin-Ordner!
```

### Lösung: Background Job

```
Vorgesetzter genehmigt
        ↓
Job wird in Queue gestellt (Daten: employeeId, year, month, approverInfo)
        ↓
Nextcloud Cron läuft (ohne User-Kontext / als System)
        ↓
✅ PDF wird in Admin-Ordner geschrieben
```

**Vorteile:**
- Keine Berechtigungsprobleme (Cron läuft als System)
- Genehmigung schlägt nicht fehl, wenn Archivierung Probleme hat
- Retry-Möglichkeit bei Fehlern
- Entkopplung von Genehmigung und Archivierung

---

## Technische Umsetzung

### 1. Neue Einstellungen im Backend

**Datei:** `lib/Db/CompanySetting.php`

```php
public const KEY_PDF_ARCHIVE_USER = 'pdf_archive_user';

public const DEFAULTS = [
    // ...
    self::KEY_PDF_ARCHIVE_USER => '', // Leer = nicht konfiguriert
];
```

### 2. Neue Datenbank-Tabelle für Archivierungs-Queue

**Datei:** `lib/Migration/Version000004Date20260130000000.php`

```php
// Tabelle: wt_archive_queue
$table = $schema->createTable('wt_archive_queue');
$table->addColumn('id', Types::INTEGER, ['autoincrement' => true, 'notnull' => true]);
$table->addColumn('employee_id', Types::INTEGER, ['notnull' => true]);
$table->addColumn('year', Types::INTEGER, ['notnull' => true]);
$table->addColumn('month', Types::INTEGER, ['notnull' => true]);
$table->addColumn('approver_id', Types::INTEGER, ['notnull' => false]);
$table->addColumn('approved_at', Types::DATETIME, ['notnull' => true]);
$table->addColumn('status', Types::STRING, ['length' => 20, 'default' => 'pending']);
$table->addColumn('attempts', Types::INTEGER, ['default' => 0]);
$table->addColumn('last_error', Types::TEXT, ['notnull' => false]);
$table->addColumn('created_at', Types::DATETIME, ['notnull' => true]);
$table->addColumn('processed_at', Types::DATETIME, ['notnull' => false]);
$table->setPrimaryKey(['id']);
$table->addIndex(['status'], 'wt_archive_queue_status_idx');
```

### 3. Background Job erstellen

**Datei:** `lib/BackgroundJob/ArchivePdfJob.php`

```php
<?php

namespace OCA\WorkTime\BackgroundJob;

use OCA\WorkTime\Db\ArchiveQueueMapper;
use OCA\WorkTime\Db\CompanySetting;
use OCA\WorkTime\Service\CompanySettingsService;
use OCA\WorkTime\Service\PdfService;
use OCA\WorkTime\Service\EmployeeService;
use OCA\WorkTime\Service\TimeEntryService;
use OCA\WorkTime\Service\AbsenceService;
use OCA\WorkTime\Service\HolidayService;
use OCP\BackgroundJob\TimedJob;
use OCP\AppFramework\Utility\ITimeFactory;
use Psr\Log\LoggerInterface;

class ArchivePdfJob extends TimedJob {

    public function __construct(
        ITimeFactory $time,
        private ArchiveQueueMapper $queueMapper,
        private CompanySettingsService $settingsService,
        private PdfService $pdfService,
        private EmployeeService $employeeService,
        private TimeEntryService $timeEntryService,
        private AbsenceService $absenceService,
        private HolidayService $holidayService,
        private LoggerInterface $logger,
    ) {
        parent::__construct($time);
        // Alle 5 Minuten ausführen
        $this->setInterval(300);
    }

    protected function run($argument): void {
        $archiveUserId = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_USER);
        $archivePath = $this->settingsService->get(CompanySetting::KEY_PDF_ARCHIVE_PATH);

        if (empty($archiveUserId) || empty($archivePath)) {
            return; // Nicht konfiguriert
        }

        // Pending Jobs holen (max 10 pro Durchlauf)
        $pendingJobs = $this->queueMapper->findPending(10);

        foreach ($pendingJobs as $job) {
            try {
                $this->processJob($job, $archiveUserId);
                $job->setStatus('completed');
                $job->setProcessedAt(new \DateTime());
                $this->queueMapper->update($job);
            } catch (\Exception $e) {
                $job->setAttempts($job->getAttempts() + 1);
                $job->setLastError($e->getMessage());

                if ($job->getAttempts() >= 3) {
                    $job->setStatus('failed');
                }

                $this->queueMapper->update($job);
                $this->logger->error('PDF archive failed: ' . $e->getMessage());
            }
        }
    }

    private function processJob($job, string $archiveUserId): void {
        $employee = $this->employeeService->find($job->getEmployeeId());
        $timeEntries = $this->timeEntryService->findByEmployeeAndMonth(
            $job->getEmployeeId(),
            $job->getYear(),
            $job->getMonth()
        );
        $absences = $this->absenceService->findByEmployeeAndMonth(
            $job->getEmployeeId(),
            $job->getYear(),
            $job->getMonth()
        );
        $holidays = $this->holidayService->findByMonth(
            $job->getYear(),
            $job->getMonth(),
            $employee->getFederalState()
        );

        // Stats berechnen + PDF generieren
        // ... (wie bisher)

        $approvalInfo = null;
        if ($job->getApproverId()) {
            $approver = $this->employeeService->find($job->getApproverId());
            $approvalInfo = [
                'approvedBy' => $approver,
                'approvedAt' => $job->getApprovedAt(),
            ];
        }

        $pdfContent = $this->pdfService->generateMonthlyReport(
            $employee,
            $job->getYear(),
            $job->getMonth(),
            $timeEntries,
            $absences,
            $holidays,
            $stats,
            $approvalInfo
        );

        // Als Admin-User speichern (Background Job hat Systemrechte)
        $this->pdfService->archiveMonthlyReport(
            $archiveUserId,
            $employee,
            $job->getYear(),
            $job->getMonth(),
            $pdfContent
        );
    }
}
```

### 4. Job registrieren

**Datei:** `lib/AppInfo/Application.php`

```php
use OCA\WorkTime\BackgroundJob\ArchivePdfJob;
use OCP\BackgroundJob\IJobList;

public function register(IRegistrationContext $context): void {
    // ...
}

public function boot(IBootContext $context): void {
    $container = $context->getAppContainer();
    $jobList = $container->get(IJobList::class);
    $jobList->add(ArchivePdfJob::class);
}
```

### 5. Controller: Job in Queue stellen (statt direkt archivieren)

**Datei:** `lib/Controller/TimeEntryController.php`

```php
public function approveMonth(int $employeeId, int $year, int $month): JSONResponse {
    // ... Genehmigung wie bisher ...

    $result = $this->timeEntryService->approveMonth($employeeId, $year, $month, $this->userId);

    // Archivierungs-Job in Queue stellen (statt direkt ausführen)
    if ($result['approved'] > 0) {
        $this->queueArchiveJob($employeeId, $year, $month);
    }

    return new JSONResponse([
        'status' => 'success',
        'approved' => $result['approved'],
        'skipped' => $result['skipped'],
        'archiveQueued' => $result['approved'] > 0,
    ]);
}

private function queueArchiveJob(int $employeeId, int $year, int $month): void {
    $approverEmployee = $this->permissionService->getEmployeeForUser($this->userId);

    $job = new ArchiveQueue();
    $job->setEmployeeId($employeeId);
    $job->setYear($year);
    $job->setMonth($month);
    $job->setApproverId($approverEmployee?->getId());
    $job->setApprovedAt(new \DateTime());
    $job->setStatus('pending');
    $job->setAttempts(0);
    $job->setCreatedAt(new \DateTime());

    $this->archiveQueueMapper->insert($job);
}
```

### 6. Frontend: FilePicker Integration

**Datei:** `src/views/SettingsView.vue`

```vue
<template>
    <!-- Nur für Admins sichtbar -->
    <section v-if="permissions.canManageSettings" class="settings-section">
        <h3>{{ t('worktime', 'PDF-Archivierung') }}</h3>
        <p class="section-description">
            {{ t('worktime', 'Genehmigte Monatsberichte werden automatisch als PDF archiviert.') }}
        </p>

        <div class="form-group">
            <label>{{ t('worktime', 'Archiv-Ordner') }}</label>

            <div class="folder-picker">
                <NcButton @click="openFolderPicker">
                    <template #icon>
                        <FolderIcon :size="20" />
                    </template>
                    {{ t('worktime', 'Ordner auswählen') }}
                </NcButton>

                <span class="selected-path">
                    {{ settings.pdf_archive_path || t('worktime', 'Nicht konfiguriert') }}
                </span>
            </div>

            <p class="help-text">
                {{ t('worktime', 'PDFs werden in Ihrem persönlichen Ordner gespeichert. Nur Sie haben Zugriff.') }}
            </p>
            <p class="help-text">
                {{ t('worktime', 'Struktur: {path}/{Jahr}/{Nachname_Vorname}/Arbeitszeitnachweis_YYYY-MM.pdf',
                    { path: settings.pdf_archive_path || '...' }) }}
            </p>
        </div>
    </section>
</template>

<script>
import { getFilePickerBuilder } from '@nextcloud/dialogs'

export default {
    methods: {
        async openFolderPicker() {
            const picker = getFilePickerBuilder(t('worktime', 'Archiv-Ordner auswählen'))
                .setMultiSelect(false)
                .setType(1) // CHOOSE_FOLDER
                .allowDirectories()
                .build()

            try {
                const path = await picker.pick()
                this.settings.pdf_archive_path = path
                await this.saveSetting('pdf_archive_path')
                // User-ID wird automatisch im Backend gesetzt
            } catch (e) {
                // Abgebrochen
            }
        }
    }
}
</script>
```

### 7. Backend: User-ID beim Speichern setzen

**Datei:** `lib/Controller/SettingsController.php`

```php
public function update(string $key, ?string $value): JSONResponse {
    // Bei Archiv-Pfad: auch den User speichern
    if ($key === CompanySetting::KEY_PDF_ARCHIVE_PATH) {
        $this->settingsService->set(
            CompanySetting::KEY_PDF_ARCHIVE_USER,
            $this->userId,
            $this->userId
        );
    }

    return $this->settingsService->set($key, $value, $this->userId);
}
```

---

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `lib/Db/CompanySetting.php` | Neue Konstante `KEY_PDF_ARCHIVE_USER` |
| `lib/Db/ArchiveQueue.php` | Neue Entity für Queue |
| `lib/Db/ArchiveQueueMapper.php` | Mapper für Queue |
| `lib/Migration/Version000004Date*.php` | Neue Tabelle `wt_archive_queue` |
| `lib/BackgroundJob/ArchivePdfJob.php` | Neuer Background Job |
| `lib/AppInfo/Application.php` | Job registrieren |
| `lib/Controller/SettingsController.php` | User-ID beim Speichern setzen |
| `lib/Controller/TimeEntryController.php` | Job in Queue stellen statt direkt archivieren |
| `src/views/SettingsView.vue` | FilePicker statt Textfeld |

---

## UI-Mockup

```
┌─────────────────────────────────────────────────────────┐
│ PDF-Archivierung                                        │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Genehmigte Monatsberichte werden automatisch als PDF    │
│ archiviert.                                             │
│                                                         │
│ Archiv-Ordner                                           │
│ ┌──────────────────┐  /HR-Dokumente/Zeitnachweise       │
│ │ Ordner auswählen │                                    │
│ └──────────────────┘                                    │
│                                                         │
│ PDFs werden in Ihrem persönlichen Ordner gespeichert.   │
│ Nur Sie haben Zugriff.                                  │
│                                                         │
│ Struktur: /HR-Dokumente/Zeitnachweise/2026/Müller_Max/  │
│ Arbeitszeitnachweis_2026-01.pdf                         │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Ablauf nach Implementierung

```
1. Admin öffnet Einstellungen
2. Admin klickt "Ordner auswählen" → FilePicker öffnet sich
3. Admin wählt Ordner in seinem persönlichen Bereich
4. Backend speichert: pdf_archive_path + pdf_archive_user

--- später ---

5. Vorgesetzter genehmigt Monat eines Mitarbeiters
6. Job wird in wt_archive_queue eingetragen
7. Cron läuft (alle 5 Minuten)
8. Background Job verarbeitet Queue
9. PDF wird im Admin-Ordner gespeichert
```

---

## Fehlerbehandlung

| Szenario | Verhalten |
|----------|-----------|
| Archiv nicht konfiguriert | Job wird nicht erstellt, Warnung im Log |
| Ordner existiert nicht mehr | Job schlägt fehl, Retry bis 3x, dann `failed` |
| Admin-User gelöscht | Jobs schlagen fehl → Admin muss neu konfigurieren |
| Cron läuft nicht | Jobs sammeln sich in Queue, werden bei nächstem Lauf verarbeitet |

---

## Hinweise

- **Cron erforderlich:** Nextcloud Cron muss aktiv sein (empfohlen: System-Cron)
- **Queue-Monitoring:** Ggf. Admin-UI für fehlgeschlagene Jobs hinzufügen
- **Migration:** Bestehende Einstellung `pdf_archive_path` bleibt, aber ohne `pdf_archive_user` werden keine neuen PDFs archiviert

---

*Erstellt: 30.01.2026*
*Aktualisiert: 30.01.2026 - Background Job Ansatz*
