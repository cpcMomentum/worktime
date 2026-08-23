# Changelog

Alle nennenswerten Änderungen an diesem Projekt werden in dieser Datei dokumentiert.

Das Format basiert auf [Keep a Changelog](https://keepachangelog.com/de/1.0.0/),
und dieses Projekt folgt [Semantic Versioning](https://semver.org/lang/de/).

## [Unreleased]

## [0.16.4] - 2026-08-23

### Added
- **Stempeluhr — Live-Zeiterfassung per Ein- und Ausstempeln (#583, #584, #585)**: In der Zeiterfassung gibt es jetzt eine Stempeluhr. Einstempeln startet einen laufenden Timer mit Pausentaste; Ausstempeln erzeugt daraus einen normalen Zeiteintrag und durchläuft alle Prüfungen (Überlappung, Monatssperre, Pausenvorschlag nach §4 ArbZG, Pflichtfelder). Der laufende Timer liegt serverseitig, ist damit geräteübergreifend und übersteht ein Schließen der App.
- **Erinnerungen der Stempeluhr (#588)**: Optionale Benachrichtigungen „Pause läuft zu lange" und „Ausstempeln vergessen" per Nextcloud-Benachrichtigung (Server-Hintergrundjob).
- **Push-Benachrichtigungen — serverseitige Grundlage (#593)**: Fundament für spätere App-Push-Benachrichtigungen (Geräte-Registrierung, direktes APNs, ohne Drittdienste). Für Nutzer noch ohne sichtbare Funktion — die mobile App folgt separat.

### Fixed
- **„PDF über Zeitraum" schlug mit „CSRF check failed" fehl (#620)**: Der Zeitraum-Export erzeugte kein PDF, sondern die Nextcloud-Fehlerseite „Zugriff verboten – CSRF check failed"; der Monatsbericht funktionierte dagegen. Ursache war ein fehlendes CSRF-Attribut am Zeitraum-Endpunkt. Der Export erzeugt jetzt das PDF. (Danke an Ben v. Haxthausen für die Meldung.)
- **Ausstempeln während einer laufenden Pause buchte die Pause als Arbeitszeit (#617)**: Wer aus einer laufenden Pause ausstempelte, ohne vorher „Weiter" zu drücken, bekam einen Eintrag, der bis zum Ausstempel-Zeitpunkt lief und die offene Pause als Arbeitszeit zählte. Der Eintrag endet jetzt beim Beginn der Pause (Feierabend), die offene Pause wird verworfen; bereits abgeschlossene Pausen bleiben erfasst.
- **Team-Reiter für Admin und HR ohne eigenes Mitarbeiterprofil (#604)**: Admin- und HR-Manager ohne eigenes Profil sahen die Teamübersicht nicht. Der Team-Reiter ist jetzt unabhängig von einem eigenen Profil zugänglich.

## [0.16.3] - 2026-08-18

### Fixed
- **Benachrichtigungen kamen auf Nextcloud 34 ohne Symbol und ohne Verlinkung an (#551)**: Auf Nextcloud 34 fehlte allen WorkTime-Benachrichtigungen das App-Symbol und der Link, mit dem man aus der Benachrichtigung in die App springt. Ursache war eine relative Symbol-Adresse, die Nextcloud 34 nicht mehr akzeptiert. Das Symbol wird jetzt als absolute Adresse gesetzt, Symbol und Verlinkung erscheinen wieder. (Der zugehörige wiederholte Log-Eintrag war bereits mit 0.16.1 verstummt; dies behebt die eigentliche Ursache.)

## [0.16.2] - 2026-08-18

### Fixed
- **Halbe Urlaubstage aus dem Jahresübertrag wurden als ganze verrechnet (#525)**: Ein Übertrag von etwa 12,5 Tagen wurde in Guthaben und Antragsprüfung auf 13 aufgerundet, obwohl die Übersicht den halben Tag korrekt anzeigte. Anzeige und Verrechnung stimmen jetzt überein, der Übertrag zählt exakt mit halben Tagen. Betrifft nur Mitarbeitende mit einem halben Tag im Vorjahresübertrag.

## [0.16.1] - 2026-08-17

### Fixed
- **Update auf 0.16.0 brach bei der Migration ab (#596)**: Auf manchen Instanzen scheiterte das Update mit „Column vacation_transferred is type Bool and also NotNull, so it can not store false". Ursache war eine NOT-NULL-Boolean-Spalte, die Nextcloud je nach Datenbank/Plattform ablehnt. Die Spalte wird jetzt nullable angelegt (Standardwert unverändert), das Update läuft wieder durch. Bereits erfolgreich aktualisierte Instanzen sind nicht betroffen.
- **Wiederholte Log-Warnung des Benachrichtigungs-Notifiers (#551)**: Seit Nextcloud 34 konnte `Notifier::prepare()` eine veraltete `\InvalidArgumentException` bis in den Server durchreichen, was das Log im Minutentakt füllte. Beim Aufbau einer nicht mehr darstellbaren Benachrichtigung wird sie jetzt abgefangen und die Benachrichtigung sauber verworfen.

## [0.16.0] - 2026-08-17

### Added
- **Urlaubsanspruch bei unterjährigem Pensumwechsel zeitanteilig (#571)**: Ändert sich im Laufe des Jahres die Zahl der Arbeitstage pro Woche (etwa Teilzeit ↔ Vollzeit), wird der Jahresurlaub jetzt zeitabschnittsweise über die im Jahr geltenden Arbeitszeitprofile berechnet statt aus einem einzelnen Stichtag-Profil. Damit stimmt der Anspruch bei Pensumänderungen mit der Rechtsprechung überein (BAG 19.03.2019). Betrifft nur Mitarbeitende, deren Pensum sich innerhalb eines Jahres ändert.
- **Teilurlaub im Eintrittsjahr für echte Neueinstellungen (#590)**: Wer unterjährig neu eingestellt wird, erhält für das Eintrittsjahr nur noch den anteiligen Urlaub (Teilurlaub, § 5 BUrlG) statt des vollen Jahresanspruchs. Ein neues Kennzeichen „Resturlaub aus vorheriger Beschäftigung übernehmen" im Mitarbeiter-Formular unterscheidet die echte Neueinstellung (anteilig) von einer Übernahme oder durchgehenden Beschäftigung (voller Anspruch abzüglich bereits genommener Tage). Der übernommene Anteil wird nie negativ (§ 6 BUrlG). Bestehende Mitarbeitende bleiben unverändert — die Umstellung setzt alle mit Eintrittsdatum automatisch auf „Übernahme".
- **Mitarbeiter löschen räumt vollständig auf (#424)**: Beim Löschen eines Mitarbeiters werden jetzt alle abhängigen Daten (Zeiteinträge, Abwesenheiten, Arbeitszeitprofile, Jahresüberträge) transaktional mitentfernt. Vorab zeigt ein Dialog beziffert, was gelöscht wird.
- **Erläuternde Hinweise an folgenreichen Entscheidungen (#239)**: An mehreren wirkungsvollen Stellen (Ruhend-Setzen, Vertretung bei genehmigter Abwesenheit, Monatssperre) erscheinen jetzt kurze Hinweise.
- **Projekte nach Projektcode sortieren (#550)**.

### Fixed
- **Neuer Mitarbeiter mit zukünftigem Eintrittsdatum zeigte die Standardwerte (#581)**: Bis das Eintrittsdatum erreicht war, zeigte die obere Anzeige 40 Std. und 30 Urlaubstage statt der Werte aus dem Arbeitszeitprofil — auch beim Mitarbeitenden selbst, wodurch zu viel Urlaub beantragbar war. Jetzt wird durchgängig das (kommende) Profil angezeigt.
- **Arbeitstage pro Woche gehören ins Arbeitszeitprofil (#578)**: Der Wert wird beim Anlegen respektiert (eine 4-Tage-Woche erzeugt ein Mo–Do-Profil) und beim Bearbeiten nicht mehr aus einem toten Steuerpfad überschrieben.
- **Projektfarbe über den NcColorPicker (#548)**: bessere Farbauswahl und lesbarerer Kontrast der Filter-Chips.

### Security
- webdav auf 5.10.0 angehoben (drei ausgelieferte Sicherheitshinweise geschlossen), axios auf 1.19.0.

### Changed (intern)
- Umstellung der CI-, Pre-Commit-Hook- und l10n-Prüfungen auf nc-app-tooling, Secret-Check im Pre-Commit, nachgezogene Review-Fixes aus älteren Release-Branches sowie diverse aktualisierte Entwicklungs-Abhängigkeiten. Keine Auswirkung auf die Funktion.

## [0.15.3] - 2026-08-02

### Added
- **Bereits verbrauchte Urlaubstage beim Eintritt erfassen (#522)**: Wer unterjährig in die App aufgenommen wird — nach einem Firmenwechsel oder bei der Umstellung auf WorkTime —, bekam bisher den vollen Jahresurlaub gutgeschrieben, auch wenn davon längst Tage genommen waren. Im Mitarbeiter-Formular lässt sich jetzt direkt unter dem Eintrittsdatum eintragen, wie viele Urlaubstage in diesem Jahr bereits verbraucht sind. Der Wert gilt ausschließlich für das Eintrittsjahr, halbe Tage sind möglich, und ab dem Folgejahr greift automatisch wieder der volle Jahresanspruch. Die Urlaubsübersicht weist den Abzug als eigene Zeile aus. Bestehende Mitarbeiter sind nicht betroffen.

### Fixed
- **Mitarbeiter konnte sein eigenes Arbeitszeitprofil nicht abrufen (#526)**: Die Schnittstelle `GET api/employees/{id}/schedules` verlangte Verwaltungsrechte und verweigerte deshalb auch den Zugriff auf die eigenen Daten. In der Weboberfläche fiel das nicht auf, da das Arbeitszeitprofil dort nur in der Mitarbeiterverwaltung angezeigt wird; angebundene Anwendungen konnten das eigene Profil jedoch gar nicht lesen. Lesend greift jetzt dieselbe Prüfung wie an vergleichbaren Stellen: eigene Daten, Unterstellte, Personalverwaltung und Administration. Änderungen am Profil bleiben der Verwaltung vorbehalten.
- **Meldungen bei Abwesenheiten erschienen auf Englisch (#528)**: Wurde ein Urlaubsantrag abgelehnt, weil das Kontingent nicht reicht, erschien die Meldung auch bei deutscher Oberfläche auf Englisch. Betroffen waren sechs Hinweise rund um das Beantragen von Abwesenheiten; sie sind jetzt übersetzt.

### Changed (intern)
- Jahresanspruch, Vorjahresübertrag und der neue Eintrittsjahr-Abzug werden an einer zentralen Stelle zusammengeführt. Urlaubsübersicht, Prüfung beim Beantragen, Betriebsferien und Jahresbericht rechnen dadurch nachweislich identisch.
- Aktualisierung dreier Entwicklungs-Abhängigkeiten. Keine Auswirkung auf die Funktion.

## [0.15.2] - 2026-07-24

### Fixed
- **Interner Serverfehler beim Öffnen der App nach einem Update**: Auf manchen aktualisierten Instanzen ließ sich die Zeiterfassung nicht mehr öffnen (interner Serverfehler), weil eine mit der Vertretungsfunktion (0.15.0) eingeführte Datenbankspalte fehlte, obwohl die zugehörige Datenbankänderung als angewendet vermerkt war. Eine neue, wiederholsichere Datenbankänderung trägt die fehlende Spalte samt Index nachträglich nach. Auf korrekt eingerichteten Instanzen ändert sich nichts.

## [0.15.1] - 2026-07-22

### Fixed
- **Urlaubsantrag trotz ausreichendem Guthaben abgelehnt (#500)**: Beim Beantragen von Urlaub wurde der Jahresübertrag aus dem Vorjahr nicht berücksichtigt. Die Urlaubsübersicht zählte ihn zum Guthaben dazu, die Prüfung beim Beantragen jedoch nicht — dadurch wurde ein Antrag abgelehnt, obwohl die Übersicht genügend freie Tage auswies. Beide rechnen jetzt gleich.
- **Falscher Urlaubsanspruch bei geändertem Arbeitszeitprofil (#501)**: Die Prüfung beim Beantragen von Urlaub und beim zentralen Eintragen von Betriebsferien legte immer den heute gültigen Urlaubsanspruch zugrunde. Für ein zurückliegendes Jahr mit anderem Arbeitszeitprofil, oder unmittelbar nach einem zukünftig gültigen Profilwechsel, wich das vom tatsächlichen Anspruch des jeweiligen Jahres ab — den die Urlaubsübersicht bereits korrekt anzeigte. Prüfung und Anzeige verwenden jetzt durchgehend den jahresgenauen Anspruch.

## [0.15.0] - 2026-07-19

### Added
- **Ruhende Mitarbeiter (#486)**: Mitarbeiter, die vorübergehend oder dauerhaft nicht mehr erfassen, lassen sich jetzt auf „Ruhend" setzen — für Elternzeit und Mutterschutz genauso wie für Langzeiterkrankung oder Ausscheiden. Ruhende Mitarbeiter können keine Zeiten und Abwesenheiten mehr erfassen, bleiben aber in der Mitarbeiterverwaltung sichtbar, und ihre bisherigen Daten lassen sich weiterhin einsehen und exportieren. Der Grund wird am Mitarbeiter hinterlegt und dem Betroffenen als Hinweis angezeigt. Beim Ruhendsetzen weist ein Dialog aus, wer davon betroffen ist: Vertretungszuordnungen auf diese Person werden automatisch gestrichen, Teammitglieder ohne Vorgesetzten werden namentlich genannt. Personalverwaltung und Administration können weiterhin Korrekturen an zurückliegenden Einträgen vornehmen.
- **Vertretung bei Abwesenheit (#343)**: Jeder legt in „Meine Einstellungen → Vertretung" selbst fest, wer ihn vertritt. Ist ein Vorgesetzter abwesend, darf seine Vertretung die Anträge seines Teams genehmigen. Die Vertretung ist automatisch auf die Dauer der erfassten Abwesenheit begrenzt — einmal setzen genügt, ein separates Datum ist nicht nötig.

### Changed
- **Überstunden-Bezeichnungen eindeutig (#430)**: Die Kachel „Überstunden" zeigte den Jahressaldo, das PDF hingegen den Monatswert — bei gleicher Beschriftung. Beide sind jetzt eindeutig benannt („Jahressaldo · Stand heute" beziehungsweise „Überstunden (Monat)"). An der Berechnung ändert sich nichts.

### Fixed
- **Halbtags-Abwesenheiten in Zukunftsmonaten (#443)**: Ein halber Urlaubstag in einem noch nicht begonnenen Monat wurde in der Vorausschau als ganzer Tag gewertet.
- **Freizeitausgleich-Hinweis bei abweichender Wochenstruktur (#443)**: Der Tageshinweis zum Freizeitausgleich rechnete fest mit fünf Arbeitstagen und stimmte damit für Teilzeitkräfte mit anderer Wochenstruktur nicht.

### Security
- **Deaktivierte Mitarbeiter konnten weiter erfassen (#486)**: Die Mitarbeiterverwaltung stellte in Aussicht, dass inaktive Mitarbeiter keine Zeiten mehr erfassen können. Tatsächlich wurden sie lediglich aus Auswahllisten ausgeblendet, während Erfassen, Ändern und Löschen unverändert möglich blieb. Der Schutz greift jetzt serverseitig.

### Hinweis zum Update
Mitarbeiter, die bisher auf „inaktiv" gesetzt waren, gelten nach dem Update als ruhend und können keine Zeiten mehr erfassen. Das entspricht dem, was die Oberfläche bereits zugesagt hatte. Wer weiterhin erfassen soll, wird über die Mitarbeiterverwaltung reaktiviert.

## [0.14.0] - 2026-07-12

### Changed
- **Monatsgenehmigung standardmäßig aus (#472)**: Der Genehmigungsworkflow für Monate ist bei neuen Installationen jetzt standardmäßig ausgeschaltet. Wer ihn nutzen möchte, aktiviert ihn bewusst unter „Einstellungen → Genehmigung". Bestehende Instanzen, die den Workflow bereits verwenden, behalten ihre Einstellung unverändert (eine Migration schreibt den bisherigen Zustand fest, damit nichts stillschweigend umschaltet).

### Fixed
- **Abgelehnter Urlaub verbrauchte weiterhin Urlaubstage (#443)**: Ein vom Vorgesetzten abgelehnter Urlaubsantrag wurde weiter als „verbraucht" gezählt und reduzierte dauerhaft das Urlaubskonto. Dadurch konnten spätere, eigentlich zulässige Anträge fälschlich mit „Nicht genügend Urlaubstage" blockiert werden. Abgelehnte Anträge geben die Tage jetzt wieder frei.
- **Abgelehnte Abwesenheit blockierte einen neuen Antrag (#443)**: Nach einer Ablehnung ließ sich für dieselben Tage kein korrigierter Antrag (oder eine Krankmeldung) mehr anlegen, weil die abgelehnte Abwesenheit noch als Überschneidung galt. Nur noch offene und genehmigte Abwesenheiten blockieren.
- **Halber Feiertag bei bezahlter Abwesenheit falsch verrechnet (#443)**: Lag ein genehmigter Urlaub auf einem halben Feiertag (Heiligabend/Silvester, sofern aktiviert), wurde für diesen Tag ein Minus von etwa vier Stunden im Überstundenkonto erzeugt. Der halbe verbleibende Arbeitstag wird jetzt korrekt durch den Urlaub gedeckt.
- **Doppelzählung bei Genehmigung mit vorhandenen Zeiteinträgen (#443)**: Wurde ein ganztägiger Abwesenheitsantrag genehmigt, obwohl am selben Tag bereits Zeiteinträge erfasst waren, entstanden Phantom-Überstunden. Die Genehmigung prüft diesen Konflikt jetzt und weist mit klarer Meldung darauf hin.
- **Team-Jahresübersicht zählte Feiertage und halbe Tage als Urlaub (#443)**: In der Jahresübersicht pro Monat wurden Feiertage innerhalb eines Urlaubs sowie halbe Urlaubstage als volle Urlaubstage gezählt, was der Jahresbilanz auf demselben Bildschirm widersprach. Die Monatswerte berücksichtigen jetzt Feiertage und den Halbtags-Anteil.
- **Pausenwarnung bei geteiltem Arbeitstag mit Lücke (#443)**: Ein durch eine Pausenlücke geteilter Tag mit mehr als neun Stunden reiner Arbeitszeit löste keine §4-Pausenwarnung aus, während derselbe Tag als ein Eintrag mit erfasster Pause korrekt gewarnt hätte. Die Prüfung bezieht sich jetzt einheitlich auf die reine Arbeitszeit.
- **Arbeitszeitprofile rückwirkend anlegbar (#453)**: Ein Arbeitszeitprofil ließ sich für kein Datum vor dem laufenden Monat anlegen. Das Nachtragen wechselnder Arbeitszeiten (etwa beim Umstieg auf die App) ist jetzt bis zum Eintrittsdatum möglich, ohne bereits genehmigte Zeiträume zu verändern.
- **Fehlende Feiertage werden bei der Berechnung erzeugt (#438)**: In Jahren oder Bundesländern, für die noch keine Feiertage generiert waren, wurde ein Feiertag als Arbeitstag gewertet. Fehlende Feiertage werden jetzt bei Bedarf automatisch ergänzt.
- **Betriebsferien überspringen bestehende Abwesenheiten tagegenau (#454)**: Überschnitt sich ein Betriebsferien-Zeitraum mit einer bereits vorhandenen persönlichen Abwesenheit, werden die betroffenen Tage jetzt sauber übersprungen statt doppelt gebucht.
- **Jahresübertrag-Tabelle ohne horizontalen Scrollbalken (#440)**: Die Tabelle unter „Jahresübertrag" passt sich jetzt der Breite an.
- **Bemerkung des Antragstellers in der Genehmiger-Ansicht (#461)**: Die zu einem Urlaubsantrag erfasste Bemerkung ist jetzt auch für den genehmigenden Vorgesetzten sichtbar.

### Changed (intern)
- Härtung des automatischen Code-Reviews in der CI und Aktualisierung einer Entwicklungs-Abhängigkeit. Keine Auswirkung auf die Funktion.

## [0.13.0] - 2026-07-10

### Added
- **Betriebsferien zentral eintragen (#15)**: Admin und HR können unter „Einstellungen → Betriebsferien" einen Schließungszeitraum für alle aktiven oder einzeln ausgewählte Mitarbeiter als genehmigten Urlaub buchen. Die Buchung ist pro Person arbeitszeit- und feiertagsbewusst (Teilzeit, 4-Tage-Woche und ohnehin freie Tage werden korrekt behandelt), zentral markierte Einträge sind vor Mitarbeiter-Bearbeitung geschützt, und bestehende Betriebsferien lassen sich als Ganzes wieder entfernen. Eine Suche filtert die Mitarbeiterauswahl.
- **Konfigurierbare Behandlung von zu wenig Resturlaub (#15)**: Reicht der Resturlaub eines Mitarbeiters nicht für die Betriebsferien, wählt der Admin pro Vorgang bewusst, wie der Überhang behandelt wird — die App trifft keine rechtliche Wertung: (1) nicht buchen und auflisten, (2) bezahlte Freistellung über den neuen Abwesenheitstyp „Betriebsschließung" (kein Urlaubs- oder Überstundenabzug), (3) Freizeitausgleich (baut Überstunden ab) oder (4) Urlaub ins Minus (Vorgriff auf das Folgejahr). Der Resturlaub wird dabei bis 0 aufgebraucht und nur der Rest nach der gewählten Option gebucht; die Aufteilung ist jahresgenau. Mitarbeiter mit bereits erfassten Zeiten im Zeitraum werden nicht gebucht, sondern aufgelistet.

### Changed
- **Härtung des automatischen Code-Reviews in der CI (#451)**: Rein intern, keine Auswirkung auf die Funktion.

## [0.12.4] - 2026-07-07

### Fixed
- **Maximale tägliche Arbeitszeit wird an der Arbeitszeit statt der Anwesenheit gemessen (#437)**: Die Warnung „Maximale tägliche Arbeitszeit überschritten" bezog sich auf die Anwesenheit (inklusive Pause) statt auf die tatsächliche Arbeitszeit. Ein Tag mit z. B. 9:55 Arbeitszeit (10:40 Anwesenheit, 45 Minuten Pause) löste dadurch fälschlich die Warnung aus. Die 10-Stunden-Grenze (§3 ArbZG) bezieht sich jetzt korrekt auf die Arbeitszeit ohne Pause, analog zur Pausenprüfung aus 0.12.2.
- **Urlaub über den Jahreswechsel wird korrekt behandelt (#439)**: Eine Abwesenheit, die über den Jahreswechsel läuft (z. B. Weihnachtsurlaub vom 29.12. bis 02.01.), fehlte in der persönlichen Abwesenheitsliste und wurde nicht vom Urlaubskonto abgezogen, war in der Team-Ansicht aber sichtbar. Solche Urlaube erscheinen jetzt wieder in der eigenen Liste, bleiben ein einziger Eintrag (bearbeit- und stornierbar) und werden tagegenau auf beide Jahre verteilt angerechnet.

### Changed
- **Release-fokussiertes Code-Review in der CI (#435)**: Rein intern, keine Auswirkung auf die Funktion.

## [0.12.3] - 2026-07-05

### Added
- **Nextcloud 34 („Hub 26 Spring") unterstützt (#402)**: Die App ist jetzt für Nextcloud 34 freigegeben und darauf installierbar. Zuvor blockierte die deklarierte Höchstversion (33) die Installation auf NC 34. Die Kompatibilität wurde geprüft (ausschließlich OCP-APIs, keine der in NC 34 entfernten Legacy-Zugriffe), es waren keine Code-Anpassungen nötig.
- **Überstunden-Auszahlung (#401)**: Manager und HR können angesammelte Überstunden in Geld vergüten. Der ausgezahlte Betrag (in Stunden) reduziert den Überstundensaldo — analog zum Freizeitausgleich. Erfassen und Löschen sind möglich (Korrektur = löschen + neu), jede Aktion wird protokolliert. Neuer Einstellungsbereich „Konten" (Jahresübertrag + Auszahlungen).

### Fixed
- **Auszahlung kann den Saldo nicht mehr überziehen (#426, #428)**: Eine Auszahlung wird jetzt server-seitig gegen den verfügbaren Überstundensaldo geprüft und abgelehnt, wenn sie ihn überschreiten würde. Die Prüfung ist gegen gleichzeitige Anfragen abgesichert (Transaktion mit Sperre auf die betroffene Mitarbeiter-Zeile).

### Changed
- **Test- und CI-Härtung (#405, #21)**: Container-freie PHPUnit-Baseline, Test-Matrix über mehrere PHP-/Nextcloud-Versionen (inkl. Frühwarnung gegen die NC-Entwicklungsversion) und ein Build-/Lint-Gate. Rein intern, keine Auswirkung auf die Funktion.

## [0.12.2] - 2026-06-27

### Fixed
- **Automatische Pausenberechnung nach §4 ArbZG (#403)**: Die gesetzliche Mindestpause wurde anhand der Anwesenheitszeit (Kommen bis Gehen) statt der tatsächlichen Arbeitszeit bestimmt. Bei knapp über 9 Stunden Anwesenheit wurden dadurch 45 statt der ausreichenden 30 Minuten vorgeschlagen und beim Speichern verlangt. Die Schwellen orientieren sich jetzt an der Arbeitszeit ohne Pause (§2 Abs. 1 ArbZG): bei einer Anwesenheit bis 9,5 Stunden genügen 30 Minuten. Gilt für den Pausenvorschlag im Eintragsformular und die Tagesprüfung über mehrere nahtlose Einträge.

### Added
- **Vollständigere tschechische Übersetzung (#259)**: 48 bisher unübersetzte Oberflächentexte wurden ins Tschechische übersetzt.

### Changed
- **Übersetzungs-Konsistenzprüfung (#259)**: Ein Wächter (Pre-Commit-Hook + CI) stellt sicher, dass die Übersetzungskataloge exakt zum Code passen, damit Texte nicht mehr unbemerkt auf den deutschen Quelltext zurückfallen.

## [0.12.1] - 2026-06-26

### Added
- **Aktives Archivieren beim Genehmigen (#323)**: Beim Genehmigen eines Monats lässt sich die PDF jetzt sofort ins Archiv schreiben, mit unmittelbarer Rückmeldung, ob sie neu erstellt, aktualisiert oder ersetzt wurde.

### Fixed
- **Genehmigungen für Vorgesetzte wieder zugänglich (#357)**: Nach dem 0.12.0-Redesign sahen Vorgesetzte (ohne Admin-/HR-Rolle) die Tabs „Genehmigungen" und „Auswertung", konnten sie aber nicht öffnen — ein Klick warf sie zurück auf die Zeiterfassung. Die Zugriffsregeln sind wieder konsistent: Vorgesetzte öffnen jetzt die Genehmigungen, die org-weite Auswertung bleibt Admin/HR vorbehalten, und der Team-Tab ist für alle Mitarbeitenden nutzbar.
- **HR-Manager erreichen die Mitarbeiterverwaltung (#394)**: HR-Managern fehlte der Zugang zu Einstellungen → Mitarbeiter, Projekte und Jahresübertrag, obwohl sie die Berechtigung dafür haben. Der Einstellungs-Bereich ist jetzt auch für HR erreichbar; reine Admin-Bereiche bleiben verborgen.
- **Korrektur genehmigter Monate wieder auffindbar (#387)**: Die Schaltfläche zum erneuten Öffnen eines bereits genehmigten Monats war im 0.12.0-Redesign verloren gegangen und ist wieder da.
- **PDF-Download in der Genehmigung (#394)**: Der direkte „Monatsbericht als PDF"-Button pro Mitarbeiter ist im Monats-Dialog der Genehmigungsansicht wieder verfügbar.
- **Wochenstunden im PDF-Arbeitszeitnachweis (#356)**: Bei mehreren Arbeitszeitprofilen zeigte der PDF-Kopf die falschen Wochenstunden. Es wird jetzt das im jeweiligen Monat gültige Profil verwendet.
- **Genehmigende ohne eigenes Profil (#394)**: Approver bzw. HR ohne eigenen Mitarbeiter-Eintrag landeten beim Start auf einer leeren Zeiterfassung; sie werden jetzt auf eine passende Ansicht geleitet.
- **Englische und tschechische Übersetzungen (#396)**: Mehrere Oberflächentexte erschienen in der englischen und tschechischen Ansicht auf Deutsch, weil Katalogeinträge nicht exakt zum Code passten. Abweichende und fehlende Übersetzungen wurden korrigiert (30 Einträge ergänzt).

## [0.12.0] - 2026-06-25

### Added
- **Monats-Details vor dem Genehmigen (#369)**: In den Genehmigungen öffnet ein Klick auf eine Monatszeile jetzt einen Dialog mit allen Zeiteinträgen des Monats (Datum, Zeiten, Pause, Stunden, Projekt, Beschreibung). So lässt sich ein Monat vor der Freigabe prüfen, ohne die Ansicht zu wechseln; Genehmigen und Zurückweisen sind direkt aus dem Dialog möglich.
- **Monats-Zurückweisung mit Begründung (#368)**: Ein eingereichter Monat kann jetzt mit Angabe eines Grundes zurückgewiesen werden. Die Einträge gehen zur Korrektur an die Mitarbeitenden zurück und können nach Anpassung erneut eingereicht werden.
- **Sichtbarer PDF-Archiv-Status (#323)**: Unter Einstellungen → PDF-Archiv zeigt ein neuer Status-Bereich die zuletzt erfolgreich archivierten Monate sowie ausstehende und fehlgeschlagene Archivierungen. Fehlgeschlagene lassen sich per Klick erneut anstoßen, und schlägt eine automatische Archivierung endgültig fehl, erhält der Archiv-Admin eine Nextcloud-Benachrichtigung statt eines stillen Fehlers.
- **Rekursive Team-Sicht für Vorgesetzte (#347)**: Ein Vorgesetzter sieht jetzt nicht nur die direkt zugeordneten Mitarbeitenden, sondern den gesamten Team-Unterbaum.

### Fixed
- **Veraltete Archiv-PDF nach erneuter Genehmigung (#323)**: Wurde ein genehmigter Monat zurückgenommen, korrigiert und erneut genehmigt, blieb die alte PDF im Archiv liegen. Beim Zurücknehmen wird die archivierte PDF jetzt entfernt und bei der erneuten Genehmigung frisch erzeugt. Damit entspricht das Archiv immer dem aktuell genehmigten Monatsstand.
- **Überstunden-Kontostand in der Monatsansicht (#358)**: Die Kennzahl zeigt jetzt den kumulierten Kontostand statt nur des aktuellen Monatswerts.
- **Abwesenheiten**: Überschneidungen zwischen einer Abwesenheit und erfassten Zeiteinträgen werden jetzt verhindert (#360); beim Anlegen folgt das Enddatum automatisch dem Startdatum (#364); die Inline-Bearbeitung und einige Darstellungsdetails wurden korrigiert (#361, #367).
- **Audit-Log (#362)**: Ein Klick auf einen Eintrag öffnet eine Detailsicht mit den vollständigen alten und neuen Werten; lange Änderungstexte brechen jetzt um statt horizontal zu scrollen.

### Changed
- **Einheitliches Design über alle Ansichten (#369)**: Zeiterfassung, Abwesenheiten, Team, Genehmigungen, Auswertung und Audit-Log folgen jetzt einem gemeinsamen Aufbau (einheitlicher Kopfbereich, Umschalter, Breite, Tabellen im Karten-Look). Das Tabellen-Layout der Auswertung wurde überarbeitet (Spaltenbreiten, Wochenstunden), und die Einstellungs-Ansichten wurden angeglichen.
- **Vollständige tschechische Übersetzung (#354, #355)**: Fehlende tschechische und englische Texte (u. a. in Genehmigungen, Team und Auswertung) wurden ergänzt.

## [0.11.2] - 2026-06-19

### Added
- **Arbeitszeitnachweis über frei wählbaren Zeitraum (#102)**: Neben dem monatlichen Arbeitszeitnachweis lässt sich jetzt ein PDF über einen frei wählbaren Zeitraum erzeugen (z. B. vom 20. bis zum 20.). In der Zeiterfassung öffnet die Aktion „PDF über Zeitraum …" einen Dialog mit Start- und Enddatum; der Nachweis wird über genau diese Spanne gerechnet (Arbeitstage, Abwesenheiten, Soll/Ist), lückenlos auch über Monatsgrenzen hinweg. Die monatliche Übersicht, Genehmigung und Monatssperre bleiben unverändert.

### Fixed
- **Pflichtfelder „Projekt erforderlich" / „Beschreibung erforderlich" hatten keine Wirkung (#329)**: Trotz aktivierter Schalter unter Arbeitszeit-Regeln ließen sich Zeiteinträge ohne Projekt bzw. ohne Beschreibung speichern. Beide Regeln werden jetzt im Frontend (Pflichtmarkierung, Hinweis, gesperrtes Speichern) und im Backend (maßgebliche Validierung) durchgesetzt. Damit niemand ausgesperrt wird, greift die Projektpflicht nur für Mitarbeitende, die tatsächlich mindestens ein auswählbares Projekt haben.

## [0.11.1] - 2026-06-18

### Fixed
- **Genehmigung schlug fehl, wenn der Genehmiger kein eigenes Mitarbeiter-Profil hat (#324)**: Als Admin/HR ließ sich ein beantragter Urlaub nicht genehmigen (Meldung „Fehler beim Genehmigen"), während „Ablehnen" funktionierte. Ursache war, dass das Genehmigen fälschlich voraussetzte, dass der genehmigende Account selbst als Mitarbeiter angelegt ist. Genehmigen funktioniert jetzt auch ohne eigenes Mitarbeiter-Profil.
- **Abwesenheits- und Arbeitstage blieben bei „0" trotz erfasster Abwesenheit (#325)**: Wurde ein Mitarbeiter mit 0 Wochenstunden angelegt, entstand ein Arbeitszeitprofil ohne Arbeitstage, wodurch im Monatsbericht und im Arbeitszeitnachweis-PDF alle Tage (auch genehmigte Krankheits- oder Urlaubstage) mit 0 gezählt wurden. Das Anlegen mit 0 Wochenstunden wird jetzt verhindert; zusätzlich weisen Monatsansicht und PDF auf ein fehlendes Arbeitszeitprofil hin, falls ein Monat 0 Arbeitstage ergibt.
- **Speichern/Abbrechen in der Inline-Bearbeitung von Abwesenheiten (#314)**: Die Buttons standen übereinander statt nebeneinander.

### Added
- **Lückenlose Tagesübersicht im Arbeitszeitnachweis-PDF (#318)**: Der Monatsbericht listet jetzt jeden Kalendertag als eigene Zeile. Abwesenheiten (z. B. Krankheit, Urlaub) erscheinen direkt in der jeweiligen Tageszeile statt nur in einer separaten Übersicht; Wochenenden werden dezent grau dargestellt.

### Changed
- Projekt-Auswertung lädt die Projekt- und Mitarbeiterlisten beim PDF-Export nur noch einmal statt doppelt (#311).

## [0.11.0] - 2026-06-16

### Added
- **Projekt-Auswertung für Admin/HR (#57)**: Eine neue Auswertungsansicht summiert die erfassten Arbeitszeiten je Projekt und Mitarbeiter:in über einen wählbaren Zeitraum. Projekte und Mitarbeitende werden über kompakte Chips (Projektfarbe + Kunde bzw. Initialen) aus- und abgewählt, mit Suche und Top-N-Skalierung für größere Teams. Es gibt eine aggregierte Sicht (Summen) und eine Einzelbuchungssicht, beide sortierbar und im App-Stil als Karten dargestellt. Kennzahlen-Karten (Gesamtzeit, Projekte, Mitarbeitende) fassen den gewählten Zeitraum zusammen. Die Auswertung ist auf Admin/HR beschränkt.
- **CSV- und PDF-Export der Projekt-Auswertung (#57)**: Beide Ansichten lassen sich als CSV oder PDF exportieren. Der Export folgt der Auswahl und der aktiven Registerkarte (aggregiert oder Einzelbuchungen) und dokumentiert im Kopf, welche Projekte und Mitarbeitenden ausgewertet wurden.
- **Projekt-Zuordnung pro Mitarbeiter:in (#58)**: Projekte können gezielt einzelnen Mitarbeitenden zur Buchung freigegeben werden – oder per Schalter „für alle freigeben" allen. So sehen Mitarbeitende in der Zeiterfassung nur die für sie relevanten Projekte.
- **Optionales Kundenfeld an Projekten (#292)**: Projekte können einem Kunden zugeordnet werden. Der Kunde erscheint in der Projekt-Auswertung und als eigene **Projekt-Spalte im monatlichen Arbeitszeitnachweis (PDF)**.

### Fixed
- **Datum im eingebetteten Bearbeiten-Modus nicht änderbar (#302)**: Beim Bearbeiten eines Zeiteintrags direkt in der Tag-/Tabellenansicht ließ sich das Datum nicht mehr anpassen. Das Datumsfeld ist im eingebetteten Bearbeiten-Modus jetzt editierbar.

## [0.10.1] - 2026-06-15

### Fixed
- **Monatssperre griff beim Löschen nicht (#296)**: Das Sperren abgeschlossener Monate (HR-Korrekturworkflow, #148) war beim Anlegen und Ändern aktiv, beim **Löschen** von Zeiteinträgen und Abwesenheiten jedoch nicht – ein abgeschlossener Eintrag konnte ohne Pflichtbegründung und ohne erneutes Öffnen des Monats entfernt werden. Das Löschen prüft jetzt denselben Sperr-Mechanismus: Mitarbeiter werden in abgeschlossenen Monaten blockiert, Admin/HR im Korrektur-Modus müssen eine Begründung (min. 10 Zeichen) angeben, die ins Audit-Log geschrieben wird, und der betroffene Monat wird automatisch zur erneuten Genehmigung geöffnet. Zusätzlich wurde ein Bounds-Guard für die Monatsnamen-Auflösung in den Benachrichtigungen ergänzt.

### Added
- **HR-Korrekturworkflow für abgeschlossene Monate (#148)**: Mitarbeiter sind in abgeschlossenen Monaten (vollständig genehmigt oder vergangenes Kalenderjahr) für Änderungen an Zeiteinträgen und Abwesenheiten gesperrt – mit klarer Meldung „Dieser Zeitraum ist abgeschlossen. Bitte wende dich an HR.". Admin/HR wechseln über einen neuen **„Korrigieren"-Einstieg** in der Mitarbeiterliste in einen **Korrektur-Modus**: Sie arbeiten im Kontext des Mitarbeiters (Kontext-Banner über allen Ansichten) und dürfen auch abgeschlossene Monate ändern. Jede Korrektur in einem abgeschlossenen Monat erfordert eine **Pflichtbegründung (min. 10 Zeichen)**, die im **Audit-Log** gespeichert wird. Der betroffene Monat wird automatisch **zur erneuten Genehmigung geöffnet**, und der Mitarbeiter wird per **Benachrichtigung inklusive Begründung** informiert.

### Changed
- App-Store-Screenshot des HR-Korrektur-Modus ergänzt (#293).
- Verwaisten l10n-String aus der Quota-Umstellung entfernt (#287).

## [0.9.4] - 2026-06-14

### Fixed
- **Abweichende Urlaubstage in Team- und Mitarbeiteransicht (#281)**: Der Jahres-Urlaubsanspruch wurde anteilig über alle Arbeitszeitprofile eines Jahres gemittelt. Zusammen mit dem automatisch angelegten Initial-Profil (Default 30 Tage) und einem später mit Startdatum mitten im Jahr gesetzten Profil entstand ein geblendeter Wert (z. B. 30 + 14 → ~21; „bei 30 Tagen geht's", weil 30 dem Default entspricht). Der Anspruch wird jetzt aus dem am Stichtag gültigen Profil genommen (kein Blending), sodass Profil-Editor, Mitarbeiter- und Team-Ansicht denselben Wert zeigen. Bestehende Daten korrigieren sich nach dem Update automatisch. Pro-rata bleibt für die Soll-Stunden erhalten, wo es korrekt ist.
- **Teilzeit konnte keine ganzen Wochen Urlaub beantragen (#282)**: Die Frontend-Vorab-Prüfung zählte naiv Kalender-Werktage (Mo–Fr) und blockierte das Speichern, sobald diese Zahl den Resturlaub überstieg — bei Teilzeitkräften fälschlich (z. B. 3 Wochen = 15 statt der real abgezogenen 6 Tage). Die unzuverlässige Schätzung blockiert nicht mehr; das Backend prüft autoritativ schedule- und feiertagsgenau und zieht nur die tatsächlichen Arbeitstage ab. Die Quota-Warnung wurde zu einem weichen, korrekt formulierten Hinweis.

## [0.9.3] - 2026-06-12

### Changed
- **0.9er-Design der Abwesenheiten- und Übersichtsseiten (#251, #252)**: Umfassende UI-Überarbeitung aus dem Design-Feedback. Quick Wins (#263): „Ist/Soll"-Label, gekürzte Hilfetexte, PDF-Icon, klarere Überschriften „Urlaub"/„Überstunden", ausgeblendete Null-Überträge. Schrift/Kontrast kräftiger (#266), markierte Zeile mit Akzent verbunden (#267), Wochentrennung + kompakte Nicht-Arbeitstage (#268), Abwesenheiten mit KPI-Hierarchie, Jahr-Picker und Hover-Aktionen (#269), Abwesenheitskonto als Themen-Boxen + Listen-Karte (#270).
- **Überstunden-Berechnung & Formate (#251, #252)**: Der laufende Tag zählt erst zum Soll, sobald Zeit erfasst oder eine Abwesenheit eingetragen ist (kein „Morgen-Minus" mehr). Dauer wird am Bildschirm als HH:MM angezeigt (PDF bleibt dezimal), Jahresurlaub als „Rest / Anspruch", Freizeitausgleich als „Tage (≈h)".

### Fixed
- **Manuell erfasste Feiertage um einen Tag verschoben (#273)**: Beim Speichern wurde das Datum aus dem Datepicker mit `toISOString()` (UTC) umgewandelt; in Zeitzonen östlich von UTC (z. B. CH/DE) wurde aus der lokalen Mitternacht der Vortag, sodass der Feiertag −1 Tag gespeichert wurde. Das Feiertags-Formular nutzt jetzt das zeitzonensichere `formatDateISO`. Dieselbe Umstellung wurde am Default-`Gültig-ab` im Arbeitszeitprofil-Editor vorgenommen.
- **Lange Bemerkungen brechen in Abwesenheits- und Genehmigungstabellen um (#275)**: Bemerkungen ohne natürliche Trennzeichen dehnten die Tabellen über ihren Container hinaus (ererbtes `white-space: nowrap`). Anzeigenotiz-Zellen in `AbsenceRow` und `ApprovalOverviewView` bekommen jetzt einen umbrechenden Wrapper (`max-width 22rem`, `white-space: normal`, `overflow-wrap: anywhere`). Die Beschreibungsspalte in der Detail-Tabelle wechselt konsistent von Ellipsis-Abschneiden auf Zeilenumbruch.

### Internationalisierung
- Fehlende de/en-Übersetzungen für die überarbeiteten Views nachgezogen (#271) und die Locale-Ermittlung auf das zentrale `getLocale()` vereinheitlicht (#272).
- Hilfetext am Feld „Urlaubstage" von „Restanspruch" auf „Resturlaub" vereinheitlicht (#276).

### Intern
- CI: `fetch-depth: 0` für die Claude-Review-Workflows, damit der Diff eine Merge-Basis hat (#264).

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
