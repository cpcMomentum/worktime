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

- Nextcloud 33 bis 35
- PHP 8.2+
- MySQL/MariaDB oder PostgreSQL

## Installation

### Über den App Store (empfohlen)

In Nextcloud als Admin unter **Apps** nach „WorkTime“ suchen und auf **Herunterladen und aktivieren** klicken. Alternativ auf der Kommandozeile:

```bash
sudo -u www-data php occ app:install worktime
```

### Manuell, ohne App Store

Das signierte Paket `worktime-vX.Y.Z.tar.gz` von der [Releases-Seite](https://github.com/cpcMomentum/worktime/releases) laden und in das App-Verzeichnis entpacken (meist `custom_apps/`, bei manchen Installationen `apps/`):

```bash
cd /var/www/nextcloud/custom_apps
sudo -u www-data tar xzf /pfad/zu/worktime-vX.Y.Z.tar.gz
sudo -u www-data php /var/www/nextcloud/occ app:enable worktime
```

`composer` und `npm` sind dafür nicht nötig: Das Paket enthält die PHP-Abhängigkeiten (`vendor/`, unter anderem für den PDF-Export) und das fertig gebaute Frontend (`js/`, `css/`).

## Konfiguration

### Ersteinrichtung

1. Als Admin die App öffnen → Verwaltung
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

Die Werte sind in der Verwaltung konfigurierbar.

## Entwicklung

Nur für die Arbeit am Code, nicht für den Betrieb. Ein `git clone` gehört auf eine Entwicklungsinstanz, nicht auf ein Produktivsystem.

```bash
git clone https://github.com/cpcMomentum/worktime.git
cd worktime

# Abhängigkeiten inklusive Entwicklungswerkzeuge (PHPUnit)
composer install
npm ci

# Frontend bauen (nach jeder Änderung in src/)
npm run build

# Tests
./vendor/bin/phpunit --testsuite Unit
npm test
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

WorkTime ist kostenlos und Open Source. Wer die Weiterentwicklung
unterstützen möchte, findet mit WerkPlus optionale Zusatzfunktionen für alle
Werk-Apps. Welche es für WorkTime gibt, steht auf
https://werkwolke.de/funktionen#worktime

Den WerkPlus-Schlüssel tragen Nextcloud-Admins unter Verwaltung › WerkPlus ein. Er gilt
für alle Werk-Apps dieser Nextcloud. Ohne Schlüssel nimmt WorkTime keinen Kontakt zum
Lizenzserver auf. Mit Schlüssel oder Testzeitraum werden nur eine aus der Nextcloud
abgeleitete Kennung, die Versionen der aktivierten Werk-Apps und der Schlüssel übertragen,
keine Arbeitszeiten, Abwesenheiten oder Personendaten. Die Lizenz wird auf dem eigenen
Server geprüft; ist der Lizenzserver nicht erreichbar, arbeitet WorkTime normal weiter.
