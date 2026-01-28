# WorkTime

Nextcloud App zur Arbeitszeiterfassung für Unternehmen.

## Features

- **Zeiterfassung**: Tägliche Arbeitszeiten mit Start, Ende und Pause erfassen
- **Pausenberechnung**: Automatischer Vorschlag gemäß §4 ArbZG (deutsches Arbeitszeitgesetz)
- **Projekterfassung**: Zeiteinträge optional Projekten zuordnen
- **Monatsübersicht**: Soll/Ist-Vergleich mit Überstundenberechnung
- **PDF-Export**: Monatsbericht als PDF herunterladen
- **Abwesenheitsverwaltung**: Urlaub, Krankheit, Sonderurlaub etc.
- **Urlaubskonto**: Automatische Berechnung verbleibender Urlaubstage
- **Feiertage**: Automatische Generierung deutscher Feiertage pro Bundesland
- **Team-Übersicht**: Vorgesetzte sehen Statistiken ihrer Teammitglieder
- **Genehmigungsworkflow**: Optionale Freigabe von Zeiteinträgen und Abwesenheiten

## Voraussetzungen

- Nextcloud 32+
- PHP 8.2+
- MySQL/MariaDB oder PostgreSQL

## Installation

```bash
# In Nextcloud apps Verzeichnis
cd /var/www/nextcloud/apps
git clone https://github.com/cpcMomentum/worktime.git
cd worktime

# PHP Dependencies
composer install --no-dev

# Frontend bauen
npm install
npm run build
```

App aktivieren:
```bash
php occ app:enable worktime
```

## Konfiguration

### Ersteinrichtung

1. Als Admin die App öffnen → Einstellungen
2. Firmennamen und Standard-Bundesland setzen
3. Feiertage für das aktuelle/nächste Jahr generieren
4. Mitarbeiter anlegen (Employees)

### Berechtigungssystem

| Rolle | Beschreibung |
|-------|--------------|
| **Admin** | Voller Zugriff auf alle Funktionen |
| **HR Manager** | Kann Mitarbeiter, Projekte und Feiertage verwalten |
| **Vorgesetzter** | Kann Zeiteinträge/Abwesenheiten seines Teams genehmigen |
| **Mitarbeiter** | Kann eigene Zeiten und Abwesenheiten erfassen |

### Pausenregelung (§4 ArbZG)

Die App schlägt automatisch Pausenzeiten vor:
- **≤6h Arbeitszeit**: Keine Pause erforderlich
- **>6h bis 9h**: 30 Minuten Pause
- **>9h**: 45 Minuten Pause

Die Werte sind in den Einstellungen konfigurierbar.

## Entwicklung

```bash
# Dependencies installieren
composer install
npm install

# Frontend im Watch-Modus
npm run watch

# Tests ausführen
./vendor/bin/phpunit
```

## Datenbank-Tabellen

| Tabelle | Beschreibung |
|---------|--------------|
| `wt_employees` | Mitarbeiter mit Wochenstunden, Urlaubstagen, Bundesland |
| `wt_time_entries` | Zeiteinträge mit Status (draft/submitted/approved/rejected) |
| `wt_absences` | Abwesenheiten (Urlaub, Krankheit etc.) |
| `wt_holidays` | Feiertage pro Bundesland |
| `wt_projects` | Projekte für Zeiterfassung |
| `wt_audit_logs` | Änderungsprotokoll |
| `wt_company_settings` | App-Einstellungen |

## API Endpoints

### Zeiteinträge
- `GET /api/time-entries` - Liste (Filter: year, month)
- `POST /api/time-entries` - Erstellen
- `PUT /api/time-entries/{id}` - Bearbeiten
- `DELETE /api/time-entries/{id}` - Löschen
- `POST /api/time-entries/suggest-break` - Pausenvorschlag

### Abwesenheiten
- `GET /api/absences` - Liste
- `POST /api/absences` - Erstellen
- `PUT /api/absences/{id}` - Bearbeiten
- `DELETE /api/absences/{id}` - Löschen

### Berichte
- `GET /api/reports/monthly` - Monatsstatistik
- `GET /api/reports/pdf` - PDF-Download
- `GET /api/reports/team` - Team-Übersicht

### Administration
- `GET /api/employees` - Mitarbeiter
- `GET /api/projects` - Projekte
- `POST /api/holidays/generate` - Feiertage generieren
- `GET /api/settings` - Einstellungen

## Lizenz

AGPL-3.0-or-later
