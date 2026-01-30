# Rechtliche Bewertung: Genehmigungsworkflow Arbeitszeiterfassung

**Datum:** 2026-01-29
**Bezug:** Workflow-Arbeitszeiterfassung-Option-A.md
**Kontext:** Prüfung der Gesetzeskonformität des geplanten Genehmigungsworkflows

---

## Kernaussage

**Der geplante Workflow ist gesetzeskonform und sogar strenger als rechtlich erforderlich.**

---

## Rechtliche Grundlagen

### BAG-Urteil 2022 (1 ABR 22/21)

Das Bundesarbeitsgericht bestätigte im September 2022 die Pflicht zur Zeiterfassung in Deutschland. Arbeitgeber sind nach dem Arbeitsschutzgesetz verpflichtet, ein System einzuführen, mit dem die geleistete Arbeitszeit erfasst werden kann.

### § 16 Abs. 2 ArbZG

Der Arbeitgeber ist verpflichtet, die über die werktägliche Arbeitszeit von acht Stunden hinausgehende Arbeitszeit aufzuzeichnen und diese Aufzeichnungen mindestens zwei Jahre aufzubewahren.

### Geplante Neuregelung (Referentenentwurf)

Der Koalitionsvertrag 2025 sieht eine elektronische Aufzeichnungspflicht vor. Der Referentenentwurf enthält Übergangsfristen nach Unternehmensgröße:
- Ab 250 Mitarbeiter: 1 Jahr nach Inkrafttreten
- Ab 50 Mitarbeiter: 2 Jahre nach Inkrafttreten
- Ab 10 Mitarbeiter: 5 Jahre nach Inkrafttreten
- Unter 10 Mitarbeiter: Dauerhaft von elektronischer Pflicht ausgenommen

---

## Offene Fragen und Antworten

### 1. Ist die digitale Genehmigung rechtlich gleichwertig zur physischen Unterschrift?

**Die Frage ist irrelevant** – das BMAS stellt klar:

> **„Unterschriften des Arbeitgebers oder des Arbeitnehmers sind nicht erforderlich."**

**Konsequenz:**
- Die bisherige Praxis (PDF mit Unterschrift) war freiwillig über das gesetzliche Minimum hinaus
- Die digitale Genehmigung mit Zeitstempel + User-ID ist mehr als ausreichend
- Der Arbeitgeber muss nur sicherstellen, dass die Dokumentation korrekt ist

**Quellen:**
- [BMAS FAQ Arbeitszeiterfassung](https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Arbeitnehmerrechte/Arbeitszeitschutz/Fragen-und-Antworten/faq-arbeitszeiterfassung.html)
- [Finom Stundennachweis](https://finom.co/de-de/glossary/stundennachweis/)

---

### 2. Sind Zeitstempel, User-ID und Audit-Log ausreichend als Nachweis?

**Ja, mehr als ausreichend.**

**Gesetzlich gefordert:**
- Dokumentation von Beginn, Ende und Dauer der täglichen Arbeitszeit
- Keine Formvorschrift – kann sogar handschriftlich erfolgen
- Keine Unterschriften erforderlich

**Unser Workflow dokumentiert:**
- Alle Pflichtdaten (Beginn, Ende, Dauer, Pause)
- Wer hat erfasst, wann, von welcher IP
- Wer hat genehmigt, wann
- Vollständiges Änderungsprotokoll (Audit-Log)

Das ist wesentlich mehr als das gesetzliche Minimum.

**Quellen:**
- [§ 16 ArbZG](https://www.gesetze-im-internet.de/arbzg/__16.html)
- [Haufe Arbeitszeitgesetz](https://www.haufe.de/personal/arbeitsrecht/arbeitszeitgesetz-bmas-legt-gesetzentwurf-zur-zeiterfassung-vor_76_592538.html)

---

### 3. Anforderungen an die Form der Archivierung?

**Datenbank ist ausreichend. PDF und physische Dokumente sind nicht erforderlich.**

| Quelle | Frist | Anwendungsfall |
|--------|-------|----------------|
| § 16 ArbZG | 2 Jahre | Überstunden |
| § 17 MiLoG | 2 Jahre | Bestimmte Branchen (Bau, Reinigung, Pflege) |
| § 41 EStG | 6 Jahre | Lohnunterlagen |
| BGB Verjährung | 3 Jahre | Ansprüche (z.B. unbezahlte Überstunden) |
| Handelsrecht | 8 Jahre | Wenn lohnrelevant |

**Empfehlung:**
- Aufbewahrungsdauer: Mindestens 3 Jahre (Verjährung), besser 6 Jahre (Lohnunterlagen)
- PDF-Export ist Nice-to-have, keine gesetzliche Pflicht
- Physische Dokumente sind nicht erforderlich

**Quellen:**
- [Reiner SCT Aufbewahrungsfristen](https://www.reiner-sct.com/zeiterfassung/aufbewahrungsfrist-arbeitszeitnachweise/)
- [Shiftbase Stundenzettel](https://www.shiftbase.com/de/blog/so-lange-musst-du-die-arbeitszeitnachweise-aufbewahren)

---

### 4. Muss der Mitarbeiter Zugang zu seinen Aufzeichnungen haben?

**Ja, aufgrund der DSGVO.**

- Arbeitnehmer haben nach DSGVO ein Auskunftsrecht (Art. 15 DSGVO)
- Mitarbeiter dürfen ihre eigenen Daten einsehen
- Nur berechtigte Personen (HR, Vorgesetzte) dürfen fremde Daten sehen

**Unser Workflow erfüllt das bereits:**
- Mitarbeiter können eigene Daten lesen
- Download-Funktion (PDF) vorhanden

**Quellen:**
- [Dr. Datenschutz Arbeitszeiterfassung](https://www.dr-datenschutz.de/arbeitszeiterfassung-im-unternehmen-und-der-datenschutz/)
- [clockin DSGVO](https://www.clockin.de/blog/zeiterfassung-und-dsgvo-so-gelingt-die-datenschutzkonforme-arbeitszeiterfassung)

---

## Vergleich: Gesetzliche Anforderungen vs. Workflow

| Aspekt | Gesetzlich erforderlich | Unser Workflow | Status |
|--------|------------------------|----------------|--------|
| Beginn/Ende/Dauer erfassen | Ja | Ja | ✓ |
| Unterschrift Mitarbeiter | **Nein** | Optional (PDF) | Übererfüllt |
| Unterschrift Vorgesetzter | **Nein** | Digital (Zeitstempel) | Übererfüllt |
| Formvorschrift | Keine | Datenbank + Audit | Übererfüllt |
| Aufbewahrung | 2-6 Jahre | Konfigurierbar | ✓ |
| Einsicht Mitarbeiter | Ja (DSGVO) | Ja | ✓ |
| Änderungsprotokoll | Empfohlen | Vollständig | Übererfüllt |

---

## DSGVO-Konformität

### Rechtsgrundlage
Die Aufzeichnung der Arbeitszeit ist für die Durchführung des Beschäftigungsverhältnisses erforderlich (§ 26 Abs. 1 BDSG). Eine separate Einwilligung der Arbeitnehmer ist nicht erforderlich.

### Zugriffsberechtigungen
Nur ein eingeschränkter Personenkreis darf auf Zeiterfassungsdaten zugreifen:
- Zuständige Beschäftigte der Personalabteilung
- Zuständige Führungskräfte
- Der jeweilige Mitarbeiter (eigene Daten)

### Speicherbegrenzung
Daten dürfen nur solange aufbewahrt werden, wie sie für die erhobenen Zwecke benötigt werden. Nach Ablauf der Aufbewahrungsfristen müssen sie gelöscht werden.

### Biometrische Daten
Zeiterfassungsgeräte mit biometrischen Daten (Fingerabdruck, Gesichtsscan) sind in der Regel nicht zulässig, da sie als besondere Kategorien personenbezogener Daten nach Art. 9 DSGVO gelten.

---

## Fazit

Der geplante Workflow (Option A) ist **vollständig gesetzeskonform**. Die digitale Genehmigung mit Zeitstempel, User-ID und Audit-Log erfüllt alle rechtlichen Anforderungen und ist sogar nachweissicherer als eine handschriftliche Unterschrift auf Papier.

**Der Genehmigungsworkflow mit Status-Änderungen (Entwurf → Eingereicht → Genehmigt) ist rechtlich nicht erforderlich, aber sinnvoll für:**
- Interne Prozessklarheit
- Nachvollziehbarkeit bei Rückfragen
- Qualitätssicherung der Daten

---

## Optionen für die Implementierung

### Option A: Vollständiger Workflow (wie geplant)
- Entwurf → Eingereicht → Genehmigt/Abgelehnt
- Maximale Nachvollziehbarkeit
- Entspricht bisheriger Unternehmenspraxis

### Option B: Vereinfachter Workflow
- Kein expliziter "Einreichen"-Schritt
- Monat wird automatisch nach Ablauf "abgeschlossen"
- Vorgesetzter prüft bei Bedarf, muss aber nicht aktiv genehmigen
- Gesetzeskonform, aber weniger Prozesssicherheit

**Empfehlung:** Option A beibehalten, da sie die bisherige Unternehmenspraxis digital abbildet und maximale Rechtssicherheit bietet.

---

## Quellen

- [BMAS FAQ Arbeitszeiterfassung](https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Arbeitnehmerrechte/Arbeitszeitschutz/Fragen-und-Antworten/faq-arbeitszeiterfassung.html)
- [§ 16 ArbZG](https://www.gesetze-im-internet.de/arbzg/__16.html)
- [Haufe Arbeitszeitgesetz](https://www.haufe.de/personal/arbeitsrecht/arbeitszeitgesetz-bmas-legt-gesetzentwurf-zur-zeiterfassung-vor_76_592538.html)
- [ActivateHR Digitale Zeiterfassungspflicht](https://activate-hr.de/hr-trends/digitale-zeiterfassungspflicht-2025-das-muessen-sie-wissen/)
- [Crewmeister Zeiterfassungspflicht 2026](https://crewmeister.com/de/magazin/zeiterfassungspflicht-2026-was-sie-wissen-muessen)
- [Reiner SCT Aufbewahrungsfristen](https://www.reiner-sct.com/zeiterfassung/aufbewahrungsfrist-arbeitszeitnachweise/)
- [Dr. Datenschutz Arbeitszeiterfassung](https://www.dr-datenschutz.de/arbeitszeiterfassung-im-unternehmen-und-der-datenschutz/)
- [clockin DSGVO](https://www.clockin.de/blog/zeiterfassung-und-dsgvo-so-gelingt-die-datenschutzkonforme-arbeitszeiterfassung)

---

*Erstellt: 2026-01-29*
