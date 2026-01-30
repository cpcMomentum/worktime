# Feature: Persönliche Standard-Arbeitszeiten

## Übersicht

Mitarbeiter können ihre eigenen Standard-Arbeitszeiten (Start/Ende) einstellen, die beim Anlegen neuer Zeiteinträge vorausgefüllt werden.

---

## Aktueller Zustand

- Beim Anlegen eines neuen Zeiteintrags sind Start- und Endzeit leer
- User muss jedes Mal manuell eingeben
- Keine persönlichen Präferenzen möglich

---

## Gewünschtes Verhalten

### Anforderungen

| Aspekt | Umsetzung |
|--------|-----------|
| **Berechtigung** | Jeder User kann nur seine eigenen Werte ändern |
| **Menüpunkt** | "Einstellungen" - für alle User sichtbar |
| **Felder** | Standard-Startzeit, Standard-Endzeit |
| **Effekt** | Vorausfüllung beim neuen Zeiteintrag |
| **Optional** | Werte sind optional - wenn leer, keine Vorausfüllung |

### User Flow

```
1. User öffnet "Meine Einstellungen" (neuer Menüpunkt)
2. User trägt ein: Start 08:30, Ende 17:00
3. User speichert

--- später ---

4. User klickt "Neuer Zeiteintrag"
5. Formular öffnet sich mit vorausgefüllten Werten:
   - Startzeit: 08:30
   - Endzeit: 17:00
   - Pause: (automatisch berechnet)
6. User passt ggf. an und speichert
```

---

## Technische Umsetzung

### 1. Datenbank erweitern

**Migration:** Neue Spalten in `wt_employees`

```php
// Version000005Date...
if (!$table->hasColumn('default_start_time')) {
    $table->addColumn('default_start_time', Types::TIME, [
        'notnull' => false,
    ]);
}

if (!$table->hasColumn('default_end_time')) {
    $table->addColumn('default_end_time', Types::TIME, [
        'notnull' => false,
    ]);
}
```

### 2. Entity erweitern

**Datei:** `lib/Db/Employee.php`

```php
protected ?DateTime $defaultStartTime = null;
protected ?DateTime $defaultEndTime = null;

// In constructor:
$this->addType('defaultStartTime', 'time');
$this->addType('defaultEndTime', 'time');
```

### 3. API-Endpunkt

**Datei:** `lib/Controller/EmployeeController.php`

```php
#[NoAdminRequired]
public function updateMySettings(
    ?string $defaultStartTime = null,
    ?string $defaultEndTime = null
): JSONResponse {
    // Nur eigene Einstellungen ändern
    $employee = $this->employeeService->findByUserId($this->userId);

    return $this->employeeService->update(
        $employee->getId(),
        defaultStartTime: $defaultStartTime,
        defaultEndTime: $defaultEndTime
    );
}

#[NoAdminRequired]
public function getMySettings(): JSONResponse {
    $employee = $this->employeeService->findByUserId($this->userId);

    return new JSONResponse([
        'defaultStartTime' => $employee->getDefaultStartTime()?->format('H:i'),
        'defaultEndTime' => $employee->getDefaultEndTime()?->format('H:i'),
    ]);
}
```

### 4. Frontend: Neuer View "Meine Einstellungen"

**Datei:** `src/views/MySettingsView.vue`

```vue
<template>
    <div class="my-settings-view">
        <h2>{{ t('worktime', 'Meine Einstellungen') }}</h2>

        <section class="settings-section">
            <h3>{{ t('worktime', 'Standard-Arbeitszeiten') }}</h3>
            <p class="section-description">
                {{ t('worktime', 'Diese Werte werden beim Anlegen neuer Zeiteinträge vorausgefüllt.') }}
            </p>

            <div class="form-row">
                <div class="form-group">
                    <label>{{ t('worktime', 'Arbeitsbeginn') }}</label>
                    <input type="time" v-model="defaultStartTime" />
                </div>
                <div class="form-group">
                    <label>{{ t('worktime', 'Arbeitsende') }}</label>
                    <input type="time" v-model="defaultEndTime" />
                </div>
            </div>

            <NcButton type="primary" @click="save">
                {{ t('worktime', 'Speichern') }}
            </NcButton>
        </section>
    </div>
</template>
```

### 5. Navigation erweitern

**Datei:** `src/App.vue`

```vue
<!-- "Einstellungen" für alle User sichtbar -->
<!-- Admin-spezifische Einstellungen werden im gleichen View angezeigt, -->
<!-- aber nur für Admins sichtbar (v-if="canManageSettings") -->
<NcAppNavigationItem
    :name="t('worktime', 'Einstellungen')"
    :class="{ active: currentView === 'settings' }"
    @click="currentView = 'settings'">
    <template #icon>
        <CogIcon :size="20" />
    </template>
</NcAppNavigationItem>
```

**Hinweis:** Der bestehende Einstellungs-View wird erweitert:
- Persönliche Einstellungen (für alle User)
- Admin-Einstellungen (nur für Admins, bereits vorhanden)

### 6. TimeEntryForm anpassen

**Datei:** `src/components/TimeEntryForm.vue`

```javascript
// Beim Öffnen für neuen Eintrag:
async loadDefaults() {
    if (this.isNewEntry) {
        const settings = await EmployeeService.getMySettings()
        if (settings.defaultStartTime) {
            this.startTime = settings.defaultStartTime
        }
        if (settings.defaultEndTime) {
            this.endTime = settings.defaultEndTime
        }
    }
}
```

---

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `lib/Migration/Version000005Date*.php` | Neue Spalten |
| `lib/Db/Employee.php` | Neue Properties |
| `lib/Controller/EmployeeController.php` | Neue Endpunkte |
| `appinfo/routes.php` | Neue Routen |
| `src/views/MySettingsView.vue` | Neuer View |
| `src/App.vue` | Navigation erweitern |
| `src/components/TimeEntryForm.vue` | Defaults laden |
| `src/services/EmployeeService.js` | Neue API-Calls |

---

## UI-Mockup

```
┌─────────────────────────────────────────────────────────┐
│ Einstellungen                                           │
├─────────────────────────────────────────────────────────┤
│                                                         │
│ Standard-Arbeitszeiten                                  │
│ Diese Werte werden beim Anlegen neuer Zeiteinträge     │
│ vorausgefüllt.                                          │
│                                                         │
│ Arbeitsbeginn          Arbeitsende                      │
│ ┌─────────────┐        ┌─────────────┐                  │
│ │ 08:30       │        │ 17:00       │                  │
│ └─────────────┘        └─────────────┘                  │
│                                                         │
│ ┌────────────┐                                          │
│ │ Speichern  │                                          │
│ └────────────┘                                          │
│                                                         │
└─────────────────────────────────────────────────────────┘
```

---

## Hinweise

- **Optional:** Beide Felder sind optional - wenn leer, keine Vorausfüllung
- **Keine Admin-Berechtigung:** Jeder User kann nur seine eigenen Werte ändern
- **Kein Überschreiben:** Wenn ein Eintrag bearbeitet wird, werden die tatsächlichen Werte angezeigt, nicht die Defaults

---

*Erstellt: 30.01.2026*
