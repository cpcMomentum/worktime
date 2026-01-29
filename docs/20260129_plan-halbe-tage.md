# Plan: Halbe Tage für Abwesenheiten und Feiertage

## Ziel
Unterstützung für halbe Tage bei Urlaub/Abwesenheiten und Feiertagen (Heiligabend/Silvester), plus Validierung von Arbeitszeit bei Urlaub.

---

## Bestandsanalyse

### Bereits vorhanden
| Komponente | Status |
|------------|--------|
| `Holiday.isHalfDay` Feld | ✅ Existiert (wird nicht genutzt) |
| `Holiday.getWorkDayValue()` | ✅ Gibt 0.5 oder 1.0 zurück |
| `Absence.days` Feld (decimal) | ✅ Kann halbe Werte speichern |

### Fehlt
| Komponente | Status |
|------------|--------|
| `Absence.isHalfDay` Feld | ❌ Fehlt |
| Halbe Tage in Sollberechnung | ❌ Nicht implementiert |
| Firmeneinstellung 24.12./31.12. | ❌ Fehlt |
| Urlaubs-Prüfung bei Zeiteinträgen | ❌ Fehlt |

---

## Implementierungsplan

### Phase 1: Halbe Abwesenheitstage

**1.1 Datenbank-Migration**
- Neues Feld `is_half_day` (TINYINT, default 0) in `wt_absences`

**1.2 Backend: Absence Entity**
- Datei: `lib/Db/Absence.php`
- Neues Feld: `isHalfDay` (bool)
- Getter/Setter hinzufügen

**1.3 Backend: AbsenceService**
- Datei: `lib/Service/AbsenceService.php`
- `create()` und `update()`: Parameter `isHalfDay` hinzufügen
- `calculateWorkingDays()`: Bei `isHalfDay=true` → 0.5 Tage zurückgeben (statt Berechnung)
- Validierung: Halber Tag nur bei Start=Ende erlaubt

**1.4 Backend: AbsenceController**
- Datei: `lib/Controller/AbsenceController.php`
- Parameter `isHalfDay` in `create()` und `update()`

**1.5 Frontend: AbsenceForm**
- Datei: `src/components/AbsenceForm.vue`
- Checkbox "Halber Tag" hinzufügen
- Wenn aktiviert: End-Datum = Start-Datum (readonly)
- Anzeige: "0,5 Tage" statt "1 Tag"

**1.6 Frontend: AbsenceService**
- Datei: `src/services/AbsenceService.js`
- Parameter `isHalfDay` in API-Calls

---

### Phase 2: Halbe Feiertage (Heiligabend/Silvester)

**2.1 Backend: CompanySetting**
- Datei: `lib/Db/CompanySetting.php`
- Neue Konstanten:
  - `KEY_CHRISTMAS_EVE_HALF_DAY` (default: '1')
  - `KEY_NEW_YEARS_EVE_HALF_DAY` (default: '1')

**2.2 Backend: HolidayService**
- Datei: `lib/Service/HolidayService.php`
- `generateHolidays()`: 24.12. und 31.12. als halbe Feiertage hinzufügen (wenn Einstellung aktiv)
- Neue Methode: `generateSpecialDays()` für 24.12./31.12.

**2.3 Backend: Sollberechnung anpassen**
- Datei: `lib/Controller/ReportController.php`
- `countWorkingDays()`: Halbe Feiertage berücksichtigen
  - Ganzer Feiertag → 0 Arbeitstage
  - Halber Feiertag → 0.5 Arbeitstage
- Rückgabetyp: `int` → `float`

**2.4 Frontend: Einstellungen**
- Datei: `src/views/SettingsView.vue`
- Neue Sektion "Sondertage"
- Checkboxen:
  - "Heiligabend (24.12.) als halber Arbeitstag"
  - "Silvester (31.12.) als halber Arbeitstag"

---

### Phase 3: Urlaubs-Prüfung bei Zeiteinträgen

**3.1 Backend: TimeEntryService**
- Datei: `lib/Service/TimeEntryService.php`
- Neue Methode: `checkAbsenceConflict()`
- Prüflogik:
  - Ganzer Urlaubstag → Zeiteintrag blockieren
  - Halber Urlaubstag → Warnung, aber erlauben (max. halber Tag Arbeit)
- Integration in `validate()`

**3.2 Backend: Dependencies**
- `TimeEntryService` benötigt `AbsenceMapper`
- Constructor erweitern

**3.3 Fehlermeldungen**
- "An diesem Tag haben Sie Urlaub. Bitte stornieren Sie zuerst den Urlaub."
- "An diesem Tag haben Sie einen halben Urlaubstag. Maximal X Stunden Arbeitszeit möglich."

---

## Dateien zu ändern

### Backend (PHP)
| Datei | Änderung |
|-------|----------|
| `lib/Migration/Version000004Date*.php` | NEU: Migration für `is_half_day` |
| `lib/Db/Absence.php` | `isHalfDay` Feld |
| `lib/Db/CompanySetting.php` | Neue Konstanten |
| `lib/Service/AbsenceService.php` | Halbe Tage Logik |
| `lib/Service/HolidayService.php` | 24.12./31.12. als halbe Feiertage |
| `lib/Service/TimeEntryService.php` | Urlaubs-Prüfung |
| `lib/Controller/AbsenceController.php` | Parameter `isHalfDay` |
| `lib/Controller/ReportController.php` | Halbe Feiertage in Sollberechnung |

### Frontend (Vue.js)
| Datei | Änderung |
|-------|----------|
| `src/components/AbsenceForm.vue` | Checkbox "Halber Tag" |
| `src/views/AbsenceView.vue` | Anzeige "0,5 Tage" |
| `src/views/SettingsView.vue` | Einstellungen 24.12./31.12. |
| `src/services/AbsenceService.js` | Parameter `isHalfDay` |

---

## Beispiele

### Halber Urlaubstag
```
Urlaub: 24.12.2026, halber Tag (vormittags)
→ days = 0.5
→ Arbeitszeit am 24.12. erlaubt (max. 4h bei 8h/Tag)
```

### Heiligabend/Silvester
```
Einstellung: "24.12. als halber Arbeitstag" = aktiv
→ Feiertag mit isHalfDay = true generiert
→ Soll für 24.12. = 4h statt 8h
```

### Urlaub + Arbeitszeit
```
Ganzer Urlaubstag am 15.01. → Zeiteintrag blockiert
Halber Urlaubstag am 15.01. → Zeiteintrag erlaubt (max. 4h)
```

---

## Verifikation

1. **Migration testen**: `php occ migrations:execute worktime`
2. **Build**: `npm run build`
3. **Deploy**: rsync zum Docker-Container
4. **Tests**:
   - Halben Urlaubstag erstellen → zeigt "0,5 Tage"
   - Arbeitszeit bei ganzem Urlaub → Fehlermeldung
   - Arbeitszeit bei halbem Urlaub → erlaubt (max. halber Tag)
   - Einstellung 24.12. aktivieren → Soll reduziert sich
   - Feiertage neu generieren → 24.12./31.12. als halbe Tage

---

*Erstellt: 2026-01-29*
