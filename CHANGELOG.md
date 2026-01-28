# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

### Added
- Initiale MVP-Implementierung der WorkTime App
- Zeiterfassung mit Start, Ende, Pause
- Automatischer Pausenvorschlag gemäß §4 ArbZG (deutsches Arbeitszeitgesetz)
- Projektbezogene Zeiterfassung
- Monatsübersicht mit Soll/Ist/Überstunden-Berechnung
- PDF-Export für Monatsberichte (TCPDF)
- Abwesenheitsverwaltung (Urlaub, Krankheit, Sonderurlaub, etc.)
- Urlaubskonto mit automatischer Berechnung verbleibender Tage
- Deutsche Feiertage pro Bundesland (Gauss-Algorithmus für Ostern)
- Team-Übersicht für Vorgesetzte
- Genehmigungsworkflow für Zeiteinträge und Abwesenheiten
- Berechtigungssystem (Admin, HR Manager, Supervisor, Employee)
- Vollständige deutsche und englische Lokalisierung
- Unit-Tests für kritische Business-Logik

### Technical
- 7 Datenbank-Tabellen (wt_employees, wt_time_entries, wt_absences, wt_holidays, wt_projects, wt_audit_logs, wt_company_settings)
- RESTful API mit ~25 Endpoints
- Vue.js 2 Frontend mit Vuex Store
- PHP 8.2+ Backend mit Nextcloud 32 Kompatibilität
