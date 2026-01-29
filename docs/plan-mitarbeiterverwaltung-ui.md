# Implementierungsplan: Mitarbeiterverwaltungs-UI

**Status:** Umgesetzt am 2026-01-29

## Übersicht

**Feature:** Admin-UI zum Anlegen, Bearbeiten und Löschen von Mitarbeitern
**App:** WorkTime
**Ort:** Neue Section in SettingsView.vue (nur für Admins/HR sichtbar)

---

## Design-Entscheidungen

1. **UI-Struktur:** Neue Section in SettingsView.vue (konsistent mit anderen Einstellungen)
2. **Formular:** Modal-Dialog für Erstellen/Bearbeiten (wie bei Abwesenheiten)
3. **Liste:** HTML-Tabelle mit Aktions-Buttons
4. **User-Auswahl:** NcSelect mit Backend-Endpunkt für verfügbare NC-User

---

## Neue Dateien

### 1. `src/components/EmployeeForm.vue`

Formular-Komponente für Erstellen/Bearbeiten eines Mitarbeiters.

**Felder:**
| Feld | Komponente | Pflicht | Nur bei Edit |
|------|-----------|---------|--------------|
| Nextcloud User | NcSelect | ✓ | disabled |
| Vorname | input text | ✓ | |
| Nachname | input text | ✓ | |
| E-Mail | input email | | |
| Personalnummer | input text | | |
| Wochenstunden | input number (default 40) | ✓ | |
| Urlaubstage | input number (default 30) | ✓ | |
| Vorgesetzter | NcSelect (andere Mitarbeiter) | | |
| Bundesland | NcSelect (FEDERAL_STATES) | ✓ | |
| Eintrittsdatum | NcDateTimePicker | | |
| Austrittsdatum | NcDateTimePicker | | ✓ |
| Aktiv | NcCheckboxRadioSwitch | | ✓ |

**Events:** `@saved`, `@cancel`

### 2. `src/components/EmployeeList.vue`

Tabellen-Komponente zur Anzeige aller Mitarbeiter.

**Spalten:** Name, Personalnr., Wochenstunden, Urlaubstage, Bundesland, Status, Aktionen
**Events:** `@edit(employee)`, `@delete(employee)`

---

## Geänderte Dateien

### Backend (PHP)

| Datei | Änderung |
|-------|----------|
| `lib/Db/EmployeeMapper.php` | `getAllUserIds()` Methode hinzugefügt |
| `lib/Service/EmployeeService.php` | IUserManager injiziert, `getAvailableUsers()` Methode |
| `lib/Controller/EmployeeController.php` | `availableUsers()` Methode |
| `appinfo/routes.php` | Route `/api/employees/available-users` |

### Frontend (JS/Vue)

| Datei | Änderung |
|-------|----------|
| `src/services/EmployeeService.js` | `getAvailableUsers()` Methode |
| `src/store/modules/employees.js` | State/Mutation/Action für availableUsers |
| `src/views/SettingsView.vue` | Neue Section "Mitarbeiterverwaltung" mit Modal |
| `l10n/de.json` | Neue Übersetzungsstrings |

---

## Implementierungsdetails

### Backend: getAllUserIds() (EmployeeMapper.php:114-128)

```php
public function getAllUserIds(): array {
    $qb = $this->db->getQueryBuilder();
    $qb->select('user_id')->from($this->getTableName());
    $result = $qb->executeQuery();
    $userIds = [];
    while ($row = $result->fetch()) {
        $userIds[] = $row['user_id'];
    }
    $result->closeCursor();
    return $userIds;
}
```

### Backend: getAvailableUsers() (EmployeeService.php:218-241)

```php
public function getAvailableUsers(): array {
    $existingUserIds = $this->employeeMapper->getAllUserIds();
    $users = [];
    $this->userManager->callForAllUsers(function ($user) use (&$users, $existingUserIds) {
        $uid = $user->getUID();
        if (!in_array($uid, $existingUserIds, true)) {
            $users[] = [
                'user' => $uid,
                'displayName' => $user->getDisplayName(),
                'subname' => $user->getEMailAddress() ?? '',
            ];
        }
    });
    usort($users, fn($a, $b) => strcasecmp($a['displayName'], $b['displayName']));
    return $users;
}
```

### Route (routes.php:39)

```php
['name' => 'employee#availableUsers', 'url' => '/api/employees/available-users', 'verb' => 'GET'],
```

---

## Verifizierung

1. **Backend testen:**
   ```bash
   curl -u admin:admin "http://localhost:8080/apps/worktime/api/employees/available-users" \
     -H "OCS-APIREQUEST: true"
   ```

2. **Frontend testen:**
   - Einstellungen öffnen → Mitarbeiterverwaltung sichtbar (als Admin)
   - "Neuer Mitarbeiter" → Formular öffnet sich
   - User auswählen, Pflichtfelder ausfüllen → Speichern
   - Mitarbeiter erscheint in Liste
   - Bearbeiten → Formular mit Daten
   - Löschen → Bestätigungsdialog → Mitarbeiter entfernt

---

*Erstellt: 2026-01-29*
*Status: Implementiert*
