# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

## [0.1.1] - 2026-02-23

### Added
- Zeiterfassung mit Start, Ende, Pause
- Automatischer Pausenvorschlag gemaess §4 ArbZG
- Projektbezogene Zeiterfassung
- Monatsuebersicht mit Soll/Ist/Ueberstunden-Berechnung
- PDF-Export fuer Monatsberichte (TCPDF)
- Abwesenheitsverwaltung (Urlaub, Krankheit, Sonderurlaub, etc.)
- Urlaubskonto mit automatischer Berechnung verbleibender Tage
- Deutsche Feiertage pro Bundesland (Gauss-Algorithmus fuer Ostern)
- Team-Uebersicht fuer Vorgesetzte
- Genehmigungsworkflow fuer Zeiteintraege und Abwesenheiten
- Berechtigungssystem (Admin, HR Manager, Supervisor, Employee)
- Vollstaendige deutsche und englische Lokalisierung
- E-Mail-Prefill aus Nextcloud-Profil bei Mitarbeiteranlage
- Nextcloud 32 und 33 Kompatibilitaet

### Fixed
- Webpack chunk filenames shortened to avoid hosting provider issues
