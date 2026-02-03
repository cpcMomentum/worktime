# Plan: Scope-Refactoring (Halbe Tage & Freizeitausgleich)

**Datum:** 2026-02-03
**Status:** ✅ Implementiert
**Basiert auf:** UX-Konzept vom UI-Designer

---

## Ziel

1. **is_half_day → scope**: Boolean durch Dezimalwert ersetzen (0.5 = halber Tag, 1.0 = ganzer Tag)
2. **Freizeitausgleich korrigieren**: Soll-Reduktion statt Ist-Gutschrift
3. **UI vereinfachen**: Dropdown "Ganzer Tag / Halber Tag" statt Checkbox

---

## Übersicht der Änderungen

| Bereich | Datei | Änderung |
|---------|-------|----------|
| Migration | `Version000007*.php` | NEU: scope-Spalte, Datenmigration |
| Entity | `Absence.php` | isHalfDay → scope |
| Entity | `Holiday.php` | isHalfDay → scope |
| Service | `AbsenceService.php` | Parameter + Berechnung |
| Service | `HolidayService.php` | Parameter + Berechnung |
| Controller | `AbsenceController.php` | API-Parameter |
| Controller | `HolidayController.php` | API-Parameter |
| Controller | `ReportController.php` | Freizeitausgleich-Logik |
| Frontend | `AbsenceRow.vue` | Dropdown statt Checkbox |
| Frontend | `SettingsView.vue` | Feiertag-Formular |

---

## Phase 1: Datenbank-Migration

**Neue Datei:** `lib/Migration/Version000007Date20260203000000.php`

```php
// 1. Neue Spalte 'scope' hinzufügen (DECIMAL 3,2)
// 2. Daten migrieren: is_half_day=1 → scope=0.5, is_half_day=0 → scope=1.0
// 3. Alte Spalte 'is_half_day' entfernen

// Für wt_absences
$table->addColumn('scope', Types::DECIMAL, [
    'precision' => 3,
    'scale' => 2,
    'default' => '1.00',
    'notnull' => true,
]);

// Für wt_holidays
$table->addColumn('scope', Types::DECIMAL, [
    'precision' => 3,
    'scale' => 2,
    'default' => '1.00',
    'notnull' => true,
]);
```

**Datenmigration:**
```sql
-- Absences: is_half_day=1 bedeutete "halber Tag"
UPDATE wt_absences SET scope = 0.5 WHERE is_half_day = 1;
UPDATE wt_absences SET scope = 1.0 WHERE is_half_day = 0;

-- Holidays: is_half_day=1 bedeutete "halber Feiertag"
UPDATE wt_holidays SET scope = 0.5 WHERE is_half_day = 1;
UPDATE wt_holidays SET scope = 1.0 WHERE is_half_day = 0;
```

---

## Phase 2: Backend-Entities

### Absence.php

**Änderungen:**
```php
// ALT
protected int $isHalfDay = 0;

// NEU
protected string $scope = '1.00';

// Getter/Setter
public function getScope(): float {
    return (float) $this->scope;
}

public function setScope(float $scope): void {
    $this->scope = (string) $scope;
}

// JSON Serialization
'scope' => $this->getScope(),
// Entfernen: 'isHalfDay'
```

### Holiday.php

**Änderungen:**
```php
// ALT
protected int $isHalfDay = 0;
public function getWorkDayValue(): float {
    return $this->isHalfDay ? 0.5 : 1.0;
}

// NEU
protected string $scope = '1.00';
public function getScope(): float {
    return (float) $this->scope;
}
// getWorkDayValue() entfernen - durch getScope() ersetzt
```

---

## Phase 3: Backend-Services

### AbsenceService.php

**create() und update() Methoden:**
```php
// ALT
public function create(..., bool $isHalfDay = false): Absence {
    if ($isHalfDay) {
        $days = 0.5;
    } else {
        $days = $this->calculateWorkingDays(...);
    }
}

// NEU
public function create(..., float $scope = 1.0): Absence {
    $workingDays = $this->calculateWorkingDays(...);
    $days = $workingDays * $scope;  // z.B. 5 Tage * 0.5 = 2.5 Tage
}
```

### HolidayService.php

**createHoliday() Methode:**
```php
// ALT
private function createHoliday(..., bool $isHalfDay = false): void {
    $holiday->setIsHalfDay($isHalfDay);
}

// NEU
private function createHoliday(..., float $scope = 1.0): void {
    $holiday->setScope($scope);
}
```

**generateHolidays() - Spezielle Tage:**
```php
// Heiligabend und Silvester als halbe Feiertage
$this->createHoliday($year, 12, 24, 'Heiligabend', $state, false, 0.5);
$this->createHoliday($year, 12, 31, 'Silvester', $state, false, 0.5);
```

---

## Phase 4: ReportController - Berechnungslogik

### countWorkingDays() anpassen

```php
// ALT (Zeile 444)
if ($holiday->getIsHalfDay()) {
    $workingDays -= 0.5;
} else {
    $workingDays -= 1.0;
}

// NEU
$workingDays -= $holiday->getScope();
```

### Freizeitausgleich-Logik korrigieren

```php
// ALT: Alle bezahlten Abwesenheiten = Ist-Gutschrift
if ($absence->getType() === Absence::TYPE_UNPAID) {
    $sollReduktion += $minutes;
} else {
    $istGutschrift += $minutes;
}

// NEU: Freizeitausgleich = Soll-Reduktion (wie Unbezahlt)
if ($absence->getType() === Absence::TYPE_UNPAID ||
    $absence->getType() === Absence::TYPE_COMPENSATORY) {
    $sollReduktion += $minutes;
} else {
    $istGutschrift += $minutes;
}
```

### Scope in Berechnung einbeziehen

```php
// ALT
$daysInMonth = $this->countWorkingDays(...);
$minutes = $daysInMonth * $dailyMinutes;

// NEU
$daysInMonth = $this->countWorkingDays(...);
$scopedDays = $daysInMonth * $absence->getScope();
$minutes = $scopedDays * $dailyMinutes;
```

---

## Phase 5: Controller (API)

### AbsenceController.php

```php
// ALT
public function create(
    ...,
    bool $isHalfDay = false
): JSONResponse

// NEU
public function create(
    ...,
    float $scope = 1.0
): JSONResponse {
    // Validierung
    if ($scope < 0 || $scope > 1) {
        return new JSONResponse(['error' => 'Scope must be between 0 and 1'], 400);
    }
}
```

### HolidayController.php

```php
// NEU: scope Parameter für manuelle Feiertage
public function create(
    string $date,
    string $name,
    array $federalStates,
    float $scope = 1.0
): JSONResponse
```

---

## Phase 6: Frontend

### AbsenceRow.vue

**Template:**
```vue
<!-- ALT -->
<NcCheckboxRadioSwitch :checked="form.isHalfDay">
    {{ t('worktime', '½') }}
</NcCheckboxRadioSwitch>

<!-- NEU -->
<NcSelect
    v-model="selectedScope"
    :options="scopeOptions"
    class="scope-select" />
```

**Script:**
```javascript
// Scope-Optionen
const scopeOptions = [
    { id: 1.0, label: 'Ganzer Tag' },
    { id: 0.5, label: 'Halber Tag' },
]

// Computed für Tage-Anzeige
calculatedDays() {
    const workDays = this.countWorkingDays(...)
    const total = workDays * this.form.scope
    return total.toLocaleString('de-DE', { maximumFractionDigits: 1 })
}
```

### SettingsView.vue (Feiertage)

**Feiertag-Formular:**
```vue
<!-- NEU: Scope-Auswahl bei Feiertag-Erstellung -->
<div class="form-group">
    <label>Umfang</label>
    <NcSelect
        v-model="holidayForm.scope"
        :options="scopeOptions" />
</div>
```

**Feiertag-Liste:**
```vue
<!-- ALT -->
<td>{{ holiday.isHalfDay ? 'Ja' : 'Nein' }}</td>

<!-- NEU -->
<td>{{ holiday.scope === 0.5 ? '½ Tag' : '1 Tag' }}</td>
```

---

## Phase 7: Frontend-Services

### AbsenceService.js

```javascript
// ALT
create(data) {
    return api.post('/absences', {
        ...data,
        isHalfDay: data.isHalfDay || false,
    })
}

// NEU
create(data) {
    return api.post('/absences', {
        ...data,
        scope: data.scope || 1.0,
    })
}
```

### HolidayService.js

```javascript
// NEU: scope Parameter
create(data) {
    return api.post('/holidays', {
        ...data,
        scope: data.scope || 1.0,
    })
}
```

---

## Implementierungs-Reihenfolge

1. **Migration erstellen** (DB-Änderung)
2. **Entities anpassen** (Absence.php, Holiday.php)
3. **Services anpassen** (AbsenceService, HolidayService)
4. **ReportController** (Freizeitausgleich + Scope-Berechnung)
5. **Controller** (API-Parameter)
6. **Frontend** (AbsenceRow, SettingsView)
7. **Frontend-Services** (JS API-Calls)
8. **Testen**

---

## Betroffene Dateien (komplett)

**Backend:**
- `lib/Migration/Version000007Date20260203000000.php` (NEU)
- `lib/Db/Absence.php`
- `lib/Db/Holiday.php`
- `lib/Service/AbsenceService.php`
- `lib/Service/HolidayService.php`
- `lib/Controller/AbsenceController.php`
- `lib/Controller/HolidayController.php`
- `lib/Controller/ReportController.php`

**Frontend:**
- `src/components/AbsenceRow.vue`
- `src/components/AbsenceForm.vue` (falls noch verwendet)
- `src/views/SettingsView.vue`
- `src/services/AbsenceService.js`
- `src/services/HolidayService.js`

---

## Verifizierung

### Backend-Tests
- [ ] Migration läuft ohne Fehler
- [ ] Bestehende Daten korrekt migriert (is_half_day → scope)
- [ ] Neue Abwesenheit mit scope=0.5 erstellen
- [ ] Neuer Feiertag mit scope=0.5 erstellen
- [ ] Monatsübersicht zeigt korrekte Soll-Zeit bei halbem Feiertag
- [ ] Freizeitausgleich reduziert Soll-Zeit (nicht Ist-Zeit erhöhen)

### Frontend-Tests
- [ ] Abwesenheit anlegen: Dropdown "Ganzer Tag / Halber Tag"
- [ ] Tage-Anzeige zeigt "0,5" bei halbem Tag
- [ ] Feiertag anlegen: Scope-Auswahl funktioniert
- [ ] Feiertag-Liste zeigt "½ Tag" korrekt an

### Berechnungs-Tests
1. **Halber Urlaubstag:**
   - 1 Tag Urlaub mit scope=0.5 → 0,5 Tage vom Urlaubskonto
   - Ist-Zeit +4h (halber Tag)

2. **Halber Feiertag (Silvester):**
   - Soll-Zeit -4h (nicht -8h)
   - Wer arbeitet: normale Ist-Zeit-Erfassung

3. **Freizeitausgleich:**
   - 1 Tag FZA → Soll-Zeit -8h
   - Keine Ist-Zeit-Gutschrift
   - Überstunden werden effektiv abgebaut

---

*Erstellt: 2026-02-03*
