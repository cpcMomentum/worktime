# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

### Fixed
- **Lange Bemerkungen brechen in Abwesenheits- und Genehmigungstabellen um (#275)**: Bemerkungen ohne natürliche Trennzeichen dehnten die Tabellen über ihren Container hinaus (ererbtes `white-space: nowrap`). Anzeigenotiz-Zellen in `AbsenceRow` und `ApprovalOverviewView` bekommen jetzt einen umbrechenden Wrapper (`max-width 22rem`, `white-space: normal`, `overflow-wrap: anywhere`). Die Beschreibungsspalte in der Detail-Tabelle wechselt konsistent von Ellipsis-Abschneiden auf Zeilenumbruch.

## [0.9.2] - 2026-06-07

### Added
- **Tschechische Übersetzung (#258)**: Community-Beitrag von @mysticNicoCZ, deckt rund 94 % der Oberflächentexte ab. Der Plural-Header wurde auf das korrekte tschechische Schema (`nplurals=3`) gesetzt (#260).

### Fixed
- **Mitarbeiterübersicht zeigt das heute gültige Arbeitszeitprofil (#202)**: Wochenstunden und Urlaubstage in der Übersicht stammten aus einem zwischengespeicherten Wert, der an das Profil mit dem neuesten Gültig-ab-Datum gekoppelt war. Ein zukünftig datiertes Profil überschrieb damit die Anzeige, sodass die Übersicht (z. B. 40 Std.) vom tatsächlich gültigen Profil (z. B. 31,5 Std.) abweichen konnte. Das Arbeitszeitprofil ist jetzt die alleinige Quelle: Übersicht, Team-Ansicht und Bearbeiten-Dialog leiten die Werte live aus dem heute gültigen Profil ab. Im Bearbeiten-Dialog werden Wochenstunden und Urlaubstage wieder angezeigt (schreibgeschützt, mit Verweis aufs Arbeitszeitprofil).
- **PDF-Export: lange Bemerkungen brechen sauber um (#203)**: In den Tabellen für Zeiteinträge und Abwesenheiten wurden lange Bemerkungen abgeschnitten und sprengten das Layout. Die Zellen nutzen jetzt dynamische Zeilenhöhen, das Tabellenraster bleibt konsistent.

### Changed
- **Aktive-Profil-Auflösung als Batch-Query (#202)**: Mitarbeiterlisten lösen das gültige Profil in einer einzigen Abfrage auf (kein N+1 mehr). `EmployeeService::update()` nimmt Wochenstunden und Urlaubstage nicht mehr entgegen — diese Werte gehören ausschließlich zum Arbeitszeitprofil.

## [0.9.1] - 2026-06-01

### Security
- **Supervisor sieht nur sein eigenes Team in der Abwesenheitsübersicht (#244)**: Vorher behandelte `AbsenceController::overview()` jeden Supervisor pauschal als privilegiert, sodass `isEmployeeVisibleInOverview()` automatisch alle Mitarbeiter freigab. Supervisoren sahen damit Abwesenheiten ALLER Mitarbeiter, nicht nur ihres Teams — DSGVO-relevant, weil Abwesenheits-Typen Krankheits-Info durchscheinen lassen können. Jetzt: Admin/HR sehen weiterhin alle Mitarbeiter unmaskiert; Supervisoren sehen nur Mitarbeiter, deren `supervisor_id` mit ihrer eigenen Employee-ID übereinstimmt, mit Klartext-Typen nur für die eigenen Team-Mitglieder. Fremde Sichten greifen wie bisher auf die per-Employee-Sichtbarkeitsregel zurück.

### Fixed
- **TypeError bei ungültigem Zeitformat in Zeiteinträgen (#245)**: `DateTime::createFromFormat()` liefert bei ungültigem Format `false` — das wurde ungesichert an `validate(?DateTime)` durchgereicht und ergab unter `declare(strict_types=1)` einen `TypeError` statt einer sauberen `ValidationException`. `?: null`-Guard + Skip-Branch für `checkOverlap()` behoben.
- **TypeError bei unvollständigen Abwesenheits-Daten in der Tageliste (#245)**: Wenn die API eine Abwesenheit ohne `startDate`/`endDate` liefert, crashte die Tageliste mit `TypeError` auf `absence.startDate.split('-')`. Null-Guard ergänzt.

### Changed
- **package.json mit info.xml synchronisiert (#246)**: `package.json` und `package-lock.json` standen nach dem 0.9.0-Release auf 0.8.1. Jetzt konsistent mit `info.xml`, damit Tools und der `/release`-Skill korrekte Vorgängerversion sehen.
- **SPDX-Lizenz-Header in allen PHP-Dateien (#248)**: Allen 67 PHP-Dateien in `lib/` wurde der NC-Standard-Header (`SPDX-FileCopyrightText` + `SPDX-License-Identifier: AGPL-3.0-or-later`) hinzugefügt. App-Lizenz bleibt AGPL-3.0-or-later wie in `info.xml`; das schließt die Convention-Lücke für Auditoren und Forks.
- **Integrity-sauberes Upgrade**: Der `CleanupExtraFiles`-Repair-Step räumt jetzt auch veraltete `worktime-<hash>.js`-Bundle-Dateien aus früheren Releases weg. NC kopiert beim App-Update zwar neue Dateien rein, löscht aber keine alten — bei jedem Upgrade blieben sonst stale `.js` / `.js.map` / `.js.LICENSE.txt` aus der Vorversion liegen, die der Integrity-Check als `EXTRA_FILE` flagged hat. Beim ersten Lauf werden alle `worktime-*`-Bundles entfernt, die nicht in der aktuellen `signature.json` stehen.

## [0.9.0] - 2026-06-01

### Added
- **Sidebar-Navigation in System-Einstellungen (#237)**: Statt langer Scrollseite mit Inhaltsübersicht-TOC zeigt die Settings-View jetzt links eine Sidebar mit gruppierten Sektionen (Team · Firma · Abläufe · Kalender) und rechts nur die ausgewählte Sektion. Aktive Sektion persistiert im URL-Hash (`?sec=…`) für Bookmarks und Browser-Back. Mobile: Sidebar fällt unter den Content. Pattern entspricht NCs eigener Server-Settings-UI.
- **Jahresansicht in Zeiterfassung (#235)**: Der Ansichts-Toggle in der Zeiterfassung erhält einen dritten Modus „Jahr" neben „Liste" und „Kalender". Zeigt eine Monatstabelle mit Soll/Ist/Überstunden, hebt den aktuellen Monat mit „Jetzt"-Pille hervor und springt per Klick auf einen vergangenen Monat zurück in die Liste-Ansicht. KPI-Leiste oben aggregiert auf Jahres-Soll/Ist/Überstunden und Urlaub.
- **Sticky Inhaltsübersicht (Anker-Chips) in System-Einstellungen (#222)**: Horizontale TOC-Leiste am Seitenkopf (in 0.9.0 durch die Sidebar-Navigation ersetzt).

### Changed
- **DayList und MonthCalendar in einheitlicher Card-Optik (#233)**: Tagesliste und Monatskalender erhalten denselben Card-Rahmen (`--color-border-dark`, `--border-radius-large`) wie KPI-Leiste und Detail-Panel. Der Tagesheader sitzt jetzt innerhalb der Card statt freistehend darüber.
- **„Heute"-Pille in DayList (#233)**: Der aktuelle Tag wird durch eine kleine blaue „Heute"-Pille markiert, statt durch einen fehlplatzierten Bullet.
- **Stabiler MonthPicker in Zeiterfassung (#235)**: Der Monatswähler bleibt beim Durchsteppen durch Monate an fester Position, auch wenn sich der Status-Badge (Entwurf/Eingereicht/Genehmigt) und der „Monat einreichen"-Button ein- und ausblenden. Liegt nun direkt neben dem Ansichts-Toggle.
- **PDF-Download in NcActions-Overflow-Menü (#235)**: Der PDF-Download-Button wird ins Drei-Punkte-Menü rechts oben verschoben, um die Toolbar zu entlasten.
- **NcSelect in Persönlichen Einstellungen (#227)**: Die Sichtbarkeit-Dropdowns in „Meine Einstellungen" nutzen NcSelect statt nativer Browser-Selects, einheitlich mit dem Rest der App.
- **Stärkere Eingabe-Borders in System-Einstellungen (#237)**: Text- und Zahlen-Inputs erhalten einen kräftigeren Border (`--color-border-dark` statt blasser NC-Default), um Lesbarkeit zu verbessern.
- **Firmendaten + Standardwerte zusammengeführt (#237)**: Die separate Standardwerte-Sektion mit nur zwei Feldern entfällt; Wochenstunden und Urlaubstage wandern als „Standard-Wochenstunden" und „Standard-Urlaubstage" in die Firmendaten-Sektion.
- **Naming-Konsistenz Sidebar/Headline (#237)**: Section-Überschriften wurden auf die Sidebar-Labels gekürzt („Mitarbeiterverwaltung" → „Mitarbeiter", „Genehmigungs-Workflow" → „Genehmigung", „PDF-Archivierung" → „PDF-Archiv").
- **App-Store-Screenshots auf neuen UI-Stand (#241)**: Alle Screenshots in `appinfo/info.xml` und im `screenshots/`-Ordner aktualisiert. Neuer Jahr-Tab-Screenshot ergänzt, veraltete Übersichts-/Monatsbericht-Screenshots entfernt.

### Fixed
- **YearPicker mit min/max-Bounds**: Die Jahresansicht-Pfeile werden an den Jahresgrenzen (frühestes Eintrittsjahr, aktuelles Jahr + 1) deaktiviert.

## [0.8.1] - 2026-05-27

### Fixed
- **Freizeitausgleich senkt jetzt die Überstunden (#186)**: Ein Freizeitausgleich-Tag wurde als Arbeitszeit gutgeschrieben, während das Soll voll bestehen blieb. Beide Effekte hoben sich auf, der Überstunden-Saldo blieb unverändert. Jetzt bleibt der FZA-Tag im Soll und wird nicht ins Ist gerechnet, dadurch sinkt der Saldo um genau die Tagessollzeit. Korrigiert in beiden Berechnungspfaden (Monatsbericht und archivierte PDFs). Die Aufschlüsselung der Monatsübersicht weist den Freizeitausgleich zusätzlich als eigene Zeile aus.

## [0.8.0] - 2026-05-26

### Added
- **Benachrichtigung bei Rücknahme der Genehmigung (#187)**: Wird die Genehmigung eines Monats zurückgenommen, erhält der betroffene Mitarbeiter eine Nextcloud-Benachrichtigung („Die Genehmigung deiner Zeiteinträge für … wurde zurückgenommen. Bitte erneut einreichen.").
- **Eigener Abschnitt „Genehmigungs-Workflow" mit Konsequenzen-Bestätigung (#188)**: Der Schalter „Genehmigung erforderlich" ist aus den Arbeitszeit-Regeln in einen eigenen Abschnitt mit Beschreibung gezogen. Beim Umschalten erscheint ein Bestätigungsdialog, der die firmenweiten Folgen erklärt; bei Abbruch bleibt der alte Zustand erhalten.
- **Bestätigung für folgenreiche Einstellungen (#189)**: Das Entfernen eines HR-Managers fragt jetzt mit Konsequenz-Hinweis nach (Rechteverlust), und das automatische Generieren der Feiertage zeigt vorab einen Hinweisdialog (alle Bundesländer werden neu erzeugt, manuelle Feiertage bleiben erhalten).

### Fixed
- **Resturlaub-Übertrag im Mitarbeiter-Dashboard (#176)**: Der Resturlaub-Übertrag aus dem Vorjahr wird jetzt im Dashboard-Urlaubskonto als eigene Position „Übertrag Vorjahr" ausgewiesen und in „Verbleibend" eingerechnet (analog zum Überstunden-Übertrag und konsistent zum Bericht).
- **Backend-Texte übersetzbar (#192)**: Benachrichtigungs-Subjects und serverseitige Validierungs-Fehlermeldungen laufen jetzt über die Übersetzungsschicht (IL10N) und erscheinen in der Sprache des jeweiligen Nutzers statt fest auf Deutsch.

## [0.7.3] - 2026-05-22

### Added
- **Genehmigungs-Workflow optional schaltbar (#177)**: Der Schalter `approval_required` ist jetzt wirksam. Bei deaktivierter Genehmigung werden Einreichen-Button, Status-Spalte/-Badges und der Zeiteinträge-Abschnitt der Genehmigungsübersicht ausgeblendet. Stundenzählung bleibt statusunabhängig. Default = bisheriges Verhalten.
- **Genehmigten Monat wieder öffnen (#178, #179)**: Admin, HR-Manager und Vorgesetzte (`canApprove`) können einen genehmigten Monat zur Korrektur zurück auf Entwurf setzen. Begründung ist Pflicht, jede Rücknahme wird im Audit-Log (`reopen`) protokolliert.

### Fixed
- **Urlaubs-Genehmigung bleibt erreichbar wenn Workflow aus (#184)**: Bei deaktiviertem Genehmigungs-Workflow blieb auch die Urlaubs-/Abwesenheits-Genehmigung verborgen. Navigation und Route bleiben jetzt immer erreichbar, nur der Zeiteinträge-Abschnitt wird ausgeblendet.
- **Hilfetexte zu Genehmigung und PDF-Archivierung korrigiert (#183)**: Der Tooltip am Genehmigungs-Schalter behauptete fälschlich, ohne Genehmigung flössen Stunden nicht in die Überstunden ein. Text korrigiert, PDF-Archivierungs-Hilfe ergänzt (alle 4 l10n-Dateien).

## [0.7.2] - 2026-05-19

### Fixed
- **Nicht-existierende CSS-Datei (#170)**: `Util::addStyle` für `css/main.css` aus dem PageController entfernt — die Datei existierte nicht (CSS wird von webpack ins JS-Bundle gebündelt). Im Browser-Konsolen-Log keine MIME-Type-Fehlermeldung mehr.

### Changed
- **App Store Screenshots aktualisiert**: Alle 6 Screenshots durch frische Captures mit sauberen Demo-Daten ersetzt. Zusätzlich neues Audit-Log-Screenshot.
- **App-Beschreibung erweitert**: info.xml beschreibt jetzt die Features aus v0.6.x und v0.7.x (Audit-Log, Jahresübertrag, kontextuelle Hilfe, HR-Manager-Rolle, Mehrsprachigkeit).

## [0.7.1] - 2026-05-17

### Fixed
- **Audit-Log Kontrast (#162)**: Schrift in der Änderungsspalte war kaum lesbar (blasse NC CSS-Variablen). Alle Farben durch explizite Hex-Werte ersetzt (`#b91c1c`, `#15803d`, `#555`).
- **Audit-Log Diff-Anzeige (#163)**: Änderungsspalte zeigte bei `update`-Aktionen den kompletten Objekt-Dump. Jetzt werden nur tatsächlich geänderte Felder als `Feld: alt → neu` angezeigt. Interne Felder (id, employeeId, createdAt, updatedAt) werden ausgeblendet.
- **Monatsübergreifende Abwesenheiten in Genehmigungsansicht (#164)**: Eine Abwesenheit die z.B. vom 27.04–08.05 läuft, zeigte im April-View den gesamten Zeitraum. Jetzt wird der Zeitraum auf den angezeigten Monat geclipt (April: 27.04–30.04, Mai: 01.05–08.05).

## [0.7.0] - 2026-05-17

### Added
- **Audit-Log View (#91)**: Neue Ansicht für Admin und HR-Manager mit vollständigem Änderungsprotokoll. Filterbar nach Monat und Mitarbeiter. Farbige Action-Badges (erstellt, aktualisiert, gelöscht) mit Old→New-Diff-Anzeige.
- **Jahresübertrag für Überstunden und Urlaubstage (#100)**: Offene Überstunden und nicht genommene Urlaubstage aus dem Vorjahr werden automatisch ins neue Jahr übertragen. Konfigurierbar in Admin-Einstellungen. Dashboard und Jahresübersicht zeigen Übertragswerte an.
- **Jahresübertrag UX-Überarbeitung (#144)**: Übertragsstatus in Übersicht, manuelle Korrekturmöglichkeit, verbesserter Workflow für HR-Manager.

### Fixed
- **Genehmigungsansicht zeigt jetzt auch Abwesenheiten (#158)**: In der aufgeklappten Detailzeile werden Urlaub, Krankheit etc. neben Zeiteinträgen angezeigt, sortiert nach Datum mit farbigem Typ-Badge.
- **Urlaubsquoten-Validierung (#147)**: Urlaubsantrag wird beim Erstellen und Bearbeiten gegen das verfügbare Kontingent geprüft. Überschreitung zeigt Warnung im Formular.
- **Eintrittsdatum wird bei Sollberechnung berücksichtigt (#145)**: Monate vor dem Eintrittsdatum liefern 0-Stats statt falscher Minusstunden.
- **FZA-Stunden reduzieren Soll nicht mehr (#149)**: Freizeitausgleich wurde fälschlicherweise vom Monatssoll abgezogen.
- **Pausenvalidierung als Toast (#151)**: Blockierende UI-Sperre bei Pausenverstoß durch informativen Toast-Hinweis ersetzt.
- **Warnhinweise mit lesbarem Kontrast (#146)**: Warntexte nutzen jetzt `--color-main-text` statt kaum lesbarer NC-Standardfarbe.

### Changed
- **Batch-Loading für Team-Abfragen**: Team- und Jahresübersicht laden Daten jetzt in einem Batch-Request mit DB-Indizes statt N+1 Queries.

## [0.6.4] - 2026-05-04

### Fixed
- **v0.6.3 war nicht installierbar**: Tarball enthielt `__MACOSX/`-Ordner (macOS-Metadaten). NC verweigert Installation bei mehr als einem Top-Level-Ordner. v0.6.3 wurde aus dem App Store entfernt. Dieses Release ist inhaltlich identisch mit v0.6.3, aber mit korrektem Tarball.

## [0.6.3] - 2026-05-04 [ZURÜCKGEZOGEN]

### Fixed
- **Release v0.6.2 war nicht installierbar**: Kompilierte JS-Dateien enthielten Git-Merge-Conflict-Marker aus dem manuellen Release-Prozess. v0.6.2 wurde aus dem App Store entfernt. Dieses Release ersetzt es mit sauber gebauten Dateien.

### Changed
- **InfoIcon Wrapper-Komponente (#127)**: Shared `InfoIcon.vue` extrahiert. NcPopover+Icon+CSS an einer Stelle statt 9x dupliziert. ~230 Zeilen CSS-Duplizierung entfernt.
- **Pre-commit Hook erweitert**: Blockiert jetzt auch Conflict-Marker in allen Dateitypen (nicht nur OC\*-Check in PHP).

## [0.6.2] - 2026-05-03 [ZURÜCKGEZOGEN]

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
