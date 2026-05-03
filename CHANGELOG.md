# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

## [0.6.2] - 2026-05-03

### Added
- **Kontextuelle Hilfe (#114, #116)**: Info-Icons (ⓘ) mit Popover-Erklaerungen an 32 Stellen in der App. Dashboard (Soll, Noch offen), Jahresuebersicht (Ueberstunden), Zeiterfassung (Minusstunden, Pausenvorschlag), Admin-Settings (13 Einstellungen), Mitarbeiter-Formular (8 Felder), Genehmigungsuebersicht, Monatsübersicht und User-Settings.
- **Abwesenheitstyp-Legende (#97)**: Legende unter der Abwesenheitstabelle mit Farbpunkten und Erklaerungstexten. Farbpunkte neben Typ-Namen in der Tabelle.

### Fixed
- **Timezone-Bug in Datumsvergleich (#113)**: `toISOString().split('T')[0]` durch `formatDateISO()` ersetzt — UTC-Konvertierung konnte Datum um einen Tag verschieben.
- **Info-Icons einheitlich (#122)**: Alle 32 Icons nutzen identisches Popover-Pattern. Kein Fragezeichen-Cursor mehr beim Hover. HR-Manager Rollen-Info von NcNoteCard-Toggle auf Popover umgebaut.

### Changed
- **getStatusLabel() zentralisiert (#117)**: Duplizierte Methode aus TimeEntryRow und AbsenceRow entfernt, zentrale Funktion aus formatters.js verwendet.
- **ABSENCE_TYPE_LABELS() gecacht (#118)**: Label-Lookup wird einmal pro Abwesenheit aufgerufen statt einmal pro expandiertem Tag.

## [0.6.1] - 2026-04-29

### Fixed
- **Uebersetzungen funktionieren jetzt (#103)**: Fehlende `l10n/*.js`-Dateien ergaenzt (NC laedt nur `.js`, nicht `.json`). Alle hardcoded deutschen Strings durch `t()`-Aufrufe ersetzt. Hardcoded `de-DE` Locale durch NC-Locale ersetzt. 51 fehlende Uebersetzungs-Keys ergaenzt (390 Keys gesamt).
- **Dashboard zeigt korrekte Minusstunden (#98)**: Fuer den aktuellen Monat wird jetzt das proportionale Soll (bis heute) statt des vollen Monatssolls angezeigt. Kein irregulaeres Defizit mehr am Morgen.
- **Stornierte Abwesenheiten in Zeiterfassung (#108)**: Stornierte Abwesenheiten (z.B. zurueckgenommener Freizeitausgleich) werden in der Zeiterfassungsliste nicht mehr angezeigt. In der Abwesenheitsuebersicht bleiben sie mit Status "Storniert" sichtbar.

## [0.6.0] - 2026-04-14

### Fixed
- **KRITISCH (#88)**: App-Update und `occ upgrade` stuerzten auf Nextcloud 33 ab, weil der Repair-Step die seit NC 11 deprecated und in NC 33 entfernte `OC_App::getAppPath()` nutzte. Betroffene User konnten ihre Nextcloud-Instanz nicht mehr aktualisieren. Fix nutzt jetzt die OCP-API `IAppManager::getAppPath()`.
- Abwesenheits-Timeline: jede Abwesenheitsart hat jetzt eine eigene, deutlich unterscheidbare Farbe (#87)
- Irrefuehrender Dialog-Text beim Einreichen des Monats: enthielt "keine Aenderungen moeglich", obwohl Nachtraege durchaus eingereicht werden koennen
- Yes/No-Buttons im Bestaetigungsdialog werden jetzt auf Deutsch angezeigt

### Added
- **Genehmigungsansicht (#68)**: Aufklappbare Detailzeile pro Mitarbeiter mit Datum, Beginn/Ende, Pause, Arbeitszeit, Projekt, Beschreibung und Status. PDF-Monatsbericht direkt aus der Detailansicht herunterladbar.
- **Auto-Genehmigung fuer Krankheit und Kind krank (#74)**: Krankmeldungen gehen ohne Genehmigungsworkflow direkt auf "genehmigt". Vorgesetzte sehen sie als "Zur Kenntnisnahme" in der Genehmigungsuebersicht.
- Benachrichtigungs-Flow fuer Krankmeldungen und stornierte Krankmeldungen

### Changed
- **UI-Konsistenz (#69)**: Team-, Genehmigungs- und Abwesenheitsuebersicht nutzen jetzt einheitliche Typografie, Padding und Kartenstil wie die etablierten Referenz-Views (Dashboard, Zeiterfassung, Meine Einstellungen)
- Icon-Unifikation: Entfernen-Buttons nutzen durchgaengig das Close-Icon (statt gemischt Close/Delete)

## [0.5.1] - 2026-04-12

### Fixed
- Header "Abwesenheitsuebersicht" wurde vom Sidebar-Toggle ueberlagert (padding-left: 50px ergaenzt)
- Monat-Navigation im MonthPicker funktionierte nicht (falsches Event-Binding)

### Changed
- Admin/HR/Supervisor sehen in der Abwesenheitsuebersicht die vollstaendige Typ-Legende

## [0.5.0] - 2026-04-12

### Added
- **Abwesenheitsuebersicht** (#3): Neue Timeline-Ansicht, farbige Balken pro Person
- **Datenschutz-Einstellungen** pro Mitarbeiter: Sichtbarkeit (Alle/Team/Niemand) + Detailgrad (Detailliert/Nur abwesend)
- Auto-Save fuer Einstellungen in "Meine Einstellungen"

### Fixed
- **KRITISCH**: Inkonsistenz zwischen v0.4.2 und v0.4.3/v0.4.4 behoben. In v0.4.2 war die `absence_visibility`-DB-Spalte angelegt worden, v0.4.3/v0.4.4 haben den zugehoerigen Code aber wieder entfernt — was zu "Interner Serverfehler" beim Oeffnen der App fuehrte. Dieses Release stellt den konsistenten Zustand her.

## [0.4.4] - 2026-04-12

### Fixed
- `.htaccess` aus TCPDF vendor/ entfernt — NC entfernt diese Datei bei der Installation automatisch (FilenameValidator), was zu FILE_MISSING Integritaetsfehler seit v0.4.0 fuehrte

## [0.4.3] - 2026-04-12

### Fixed
- TCPDF (vendor/) wieder im Tarball enthalten — war in v0.4.1 und v0.4.2 versehentlich ausgeschlossen, was zu Integritaetsfehlern und nicht funktionierendem PDF-Export fuehrte (#50)

## [0.4.2] - 2026-04-11

### Fixed
- Automatische Bereinigung von Extra-Dateien aus frueheren Releases via RepairStep

## [0.4.1] - 2026-04-11

### Fixed
- Integritaetspruefung: `test-results/` und `appinfo/*.crt` aus Tarball entfernt

## [0.4.0] - 2026-04-11

### Added
- Projektverwaltung UI in den Einstellungen (#41)
- Vollstaendige englische Uebersetzungen und Berechtigungsinfo-Button
- Aufklappbare Soll/Ist-Berechnungsdetails in der Ueberstundenanzeige (#52)
- Abwesenheiten und Feiertage werden in der Tagesliste angezeigt (#53)
- Jahresuebersicht im Dashboard mit 12-Monats-Tabelle (#54)
- Mitarbeiter mit 0 Wochenstunden (Aushilfen auf Abruf) koennen angelegt werden (#61)

### Changed
- Dashboard redesigned: flache Cards, Redundanzen entfernt
- Einheitliches Typografie-System ueber alle Views (15px/13px)
- TCPDF Fonts reduziert (24 MB → 640 KB)
- Neues Arbeitszeitprofil hat heute als Default-Datum

### Fixed
- TCPDF Vendor-Dependency im Release enthalten (#50)

## [0.3.0] - 2026-03-24

### Added
- Arbeitszeitprofile mit Wochenprofil und Stichtag (#39)
- Stunden pro Wochentag individuell konfigurierbar (Mo-So)
- Samstag/Sonntag im Profil-Editor anzeigbar
- Soll-Berechnung nutzt das am jeweiligen Tag gueltige Profil
- Pro-rata Urlaubsberechnung bei Profilwechsel
- Max. Tagesstunden aus Einstellungen als Limit im Profil-Editor
- Feld "Arbeitstage pro Woche" pro Mitarbeiter (manuell, Default 5)
- Kontakt-E-Mail in info.xml

### Fixed
- IDOR-Schutz: update/delete pruefen employeeId-Ownership
- Duplicate-Validierung fuer Profil-Stichtage (valid_from)
- Pausenzeit-Einstellungen werden jetzt korrekt ausgewertet (#43)
- Frontend-Validierung mit visueller Rueckmeldung bei Ueberschreitung der Max-Stunden
- Fehlermeldungen im Profil-Editor zeigen konkrete Validierungsfehler

### Changed
- suggestBreak() und validateBreak() nutzen konfigurierte Werte statt hardcoded 30/45 Min

## [0.2.0] - 2026-03-19

### Added
- Team-Jahresuebersicht mit Ueberstunden, Urlaub und Status pro Mitarbeiter (#32)
- Jahres-Picker Komponente fuer Team-View
- API-Endpoint fuer Jahresberichte (ReportController)

### Fixed
- Korrekte Jahres-Ueberstundenberechnung im Dashboard (#37)
- Beschreibungsspalte in der Zeiteintrags-Ansicht sichtbar (#35)
- Null-Guard fuer employeeId in allen Controllern (#33)
- Verbessertes Onboarding fuer Nutzer ohne Mitarbeiterprofil

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
