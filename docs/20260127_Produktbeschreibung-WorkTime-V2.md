# Produktbeschreibung: WorkTime - Nextcloud Arbeitszeiterfassung (MVP)

---

## 0. Produktname

**WorkTime**

Nextcloud-App zur gesetzeskonformen Arbeitszeiterfassung für kleine Unternehmen in Deutschland.

---

## 1. Produktvision & Zweck

### Worum geht es im Kern?

Eine Nextcloud-App, die es Mitarbeitern ermöglicht, ihre tägliche Arbeitszeit zu erfassen, und die am Monatsende einen druckbaren Zeitnachweis (PDF) zur manuellen Unterschrift generiert.

### Welches Problem wird gelöst?

- **Gesetzliche Pflicht:** Seit dem BAG-Urteil 2022 müssen alle deutschen Arbeitgeber Arbeitszeiten systematisch erfassen (Beginn, Ende, Dauer)
- **Keine passende Nextcloud-App:** Existierende Apps (TimeManager, Time Tracker) erfüllen nicht die Anforderungen für gesetzeskonforme Arbeitszeiterfassung mit Überstunden, Urlaub und Monatsnachweis
- **Integration:** Unternehmen, die Nextcloud nutzen, wollen keine separate Software für Zeiterfassung

### Für wen ist das Produkt gedacht?

Kleine Unternehmen (bis 20 Mitarbeiter) in der Beratungs-/IT-Branche mit:
- Gleitzeit-Modell
- Mobilem Arbeiten (Home-Office)
- Nextcloud als zentrale Kollaborationsplattform

---

## 2. Zielgruppe & Personas

### Nutzerrollen

| Rolle | Beschreibung | Berechtigungen |
|-------|--------------|----------------|
| **Mitarbeiter** | Erfasst eigene Arbeitszeit | Eigene Zeiten erfassen, eigene Berichte sehen |
| **Vorgesetzter** | Genehmigt Zeiten, sieht Team-Übersicht | Team-Zeiten sehen, Monatsberichte genehmigen |
| **Admin** | Konfiguriert System | Alles + Stammdaten pflegen (Soll-Zeiten, Urlaubstage, Feiertage) |

### Berechtigungssystem (MVP)

Analog zu ContractManager:
- Admin kann im Einstellungsbereich Gruppen und Personen zuweisen
- Vorgesetzter wird pro Mitarbeiter optional zugewiesen (flache Struktur)
- Nextcloud-Admins sind automatisch WorkTime-Admins

### Personas

**Persona 1: Max (Mitarbeiter, Entwickler)**
- Arbeitet 40h/Woche mit Gleitzeit
- Arbeitet 2-3 Tage mobil, Rest im Büro
- Will morgens schnell Start eintragen, abends Ende
- Braucht Übersicht über seine Überstunden

**Persona 2: Sarah (Vorgesetzte, Teamlead)**
- Verantwortlich für 5 Mitarbeiter
- Muss Monatsberichte am Monatsende prüfen und freigeben
- Will schnell sehen, wer noch nicht erfasst hat
- Braucht Übersicht über Urlaub im Team

**Persona 3: Thomas (Admin, Geschäftsführer)**
- Richtet das System ein
- Pflegt Feiertage und Urlaubsansprüche
- Will gesetzeskonforme Dokumentation
- Hat keinen Vorgesetzten (optional)

### Bedürfnisse und Schmerzpunkte

| Bedürfnis | Schmerzpunkt |
|-----------|--------------|
| Schnelle tägliche Erfassung | Komplizierte Tools werden nicht genutzt |
| Übersicht Überstunden | Manuelle Berechnung fehleranfällig |
| Urlaubsübersicht | Separate Excel-Listen |
| Gesetzeskonformität | Unsicherheit ob ausreichend dokumentiert |
| PDF zum Unterschreiben | Digitale Signatur zu kompliziert |

---

## 3. Kernfunktionalitäten

### MVP-Features

| Feature | Beschreibung |
|---------|--------------|
| **Tägliche Zeiterfassung** | Beginn, Ende, Pause erfassen → Arbeitszeit wird berechnet |
| **Pause Auto-Vorausfüllung** | Gesetzliche Mindestpause wird vorgeschlagen (30/45 min), änderbar |
| **Gleitzeit-Berechnung** | Soll-/Ist-Vergleich, Überstunden kumuliert |
| **Überstundenkonto** | Individuell pro Mitarbeiter, Startwert manuell durch Admin, zurücksetzbar |
| **Urlaubsverwaltung** | Urlaubstage beantragen, halbe Tage möglich, Restanspruch sehen |
| **Feiertagsverwaltung** | Automatisch generiert nach Bundesland, Admin kann anpassen, halbe Feiertage möglich |
| **Abwesenheiten** | Krank, Sonderurlaub, Unbezahlter Urlaub erfassen |
| **Projekt-Feld** | Admin kann Projekte vorab anlegen + Freitext wird gespeichert (Autocomplete) |
| **Ort-Feld** | Optional (Büro/Mobil), kein Tracking |
| **Monats-PDF** | Zeitnachweis mit allen Daten + Signaturfeld (PHP serverseitig generiert) |
| **Team-Übersicht** | Vorgesetzte sehen Zeiten des Teams |
| **Admin-Bereich** | Stammdaten pflegen, Berechtigungen wie ContractManager |
| **Änderungsprotokoll** | Wer hat wann was geändert (für Compliance) |

### Explizit NICHT im MVP

| Ausgeschlossen | Begründung |
|----------------|------------|
| Mehrere Zeiteinträge pro Tag | Später hinzufügen |
| Urlaubsgenehmigung-Workflow | Später hinzufügen |
| Kalender-Integration | Später hinzufügen |
| Digitale Signatur | Manuelle Unterschrift auf PDF ist ausreichend |
| Mobile App | Nextcloud Web-App reicht (responsive) |
| Schnittstelle Lohnbuchhaltung | Später |
| iOS Wheel Picker | Nextcloud-Standard-Komponenten verwenden |
| Hierarchische Gruppenstruktur | Später (v2) für größere Unternehmen |

---

## 4. User Flows & Nutzungsszenarien

### User Flow 1: Tägliche Zeiterfassung (Mitarbeiter)

```
1. Mitarbeiter öffnet Nextcloud → WorkTime App
2. Sieht heutiges Datum vorausgewählt
3. Gibt ein:
   - Arbeitsbeginn: 08:30 (NcDateTimePicker)
   - Arbeitsende: 17:15 (NcDateTimePicker)
   - Pause: 45 min (vorausgefüllt basierend auf Arbeitszeit, änderbar)
4. Optional:
   - Projekt auswählen (NcSelect mit Autocomplete)
   - Ort: Büro/Mobil (NcSelect)
   - Bemerkung (NcInputField)
5. System berechnet: 8:00h Arbeitszeit
6. Klick "Speichern"
7. Eintrag erscheint in der Tagesübersicht
```

### User Flow 2: Monatsübersicht prüfen (Mitarbeiter)

```
1. Mitarbeiter wählt Monat (z.B. Januar 2026)
2. Sieht Übersicht:
   - Arbeitstage: 21
   - Soll-Stunden: 168h
   - Ist-Stunden: 172h
   - Überstunden Monat: +4h
   - Überstunden Gesamt: +12h
   - Urlaub genommen: 2 Tage
   - Resturlaub: 26 Tage
3. Kann einzelne Tage anklicken und ggf. korrigieren (aktueller + Vormonat)
```

### User Flow 3: Monats-PDF erstellen (Mitarbeiter/Vorgesetzter)

```
1. Wählt Monat aus
2. Klickt "PDF erstellen"
3. System generiert PDF (serverseitig mit PHP) mit:
   - Kopfzeile: Firma, Mitarbeiter, Monat
   - Tabelle: Datum | Beginn | Ende | Pause | Arbeitszeit | Projekt | Bemerkung
   - Zusammenfassung: Soll/Ist/Überstunden
   - Signaturfelder: Mitarbeiter / Vorgesetzter / Datum
4. PDF wird heruntergeladen
5. Ausdruck, Unterschrift, Ablage (analog)
```

### User Flow 4: Urlaub eintragen (Mitarbeiter)

```
1. Mitarbeiter öffnet "Abwesenheiten"
2. Wählt "Urlaub" als Typ (NcSelect)
3. Gibt Zeitraum ein: 10.02. - 14.02.2026 (NcDateTimePicker)
4. System zeigt: 5 Urlaubstage werden abgezogen
5. Optional: 0.5 Tage für halben Tag (z.B. Heiligabend)
6. Klick "Speichern"
7. Urlaubstage werden in der Monatsübersicht angezeigt
8. Resturlaub wird aktualisiert
```

### User Flow 5: Team-Übersicht (Vorgesetzter)

```
1. Vorgesetzter öffnet "Team-Übersicht"
2. Sieht Liste seiner Mitarbeiter mit:
   - Name | Erfasst heute? | Überstunden Gesamt | Resturlaub
3. Kann einzelnen Mitarbeiter anklicken → sieht dessen Monatsübersicht
4. Kann PDF für Mitarbeiter generieren
```

### User Flow 6: Stammdaten pflegen (Admin)

```
1. Admin öffnet "Einstellungen"
2. Kann bearbeiten:
   - Berechtigungen: Gruppen/Personen zuweisen (wie ContractManager)
   - Mitarbeiter: Soll-Arbeitszeit/Woche, Urlaubsanspruch/Jahr, Bundesland, Vorgesetzter (optional), Überstunden-Startwert
   - Feiertage: Jahr auswählen → "Feiertage generieren" → automatisch erstellt, dann anpassbar
   - Projekte: Vorab anlegen für Autocomplete
   - Firma: Name, Adresse (für PDF-Header)
3. Kann Überstundenkonto eines Mitarbeiters zurücksetzen (mit Dokumentation)
4. Kann Resturlaub manuell anpassen (Übertrag/Verfall)
```

---

## 5. Geschäftslogik & Regeln

### Arbeitszeitberechnung

```
Arbeitszeit = Arbeitsende - Arbeitsbeginn - Pause
```

**Regeln:**
- Arbeitszeit wird auf Minuten genau berechnet
- Negative Arbeitszeit nicht erlaubt (Validierung)
- Maximale Arbeitszeit pro Tag: 10h (gesetzlich, Warnung wenn überschritten)

### Pausen Auto-Vorausfüllung (§ 4 ArbZG)

| Bruttoarbeitszeit | Vorgeschlagene Pause |
|-------------------|---------------------|
| Bis 6h | 0 min |
| Über 6h bis 9h | 30 min |
| Über 9h | 45 min |

Mitarbeiter kann den Wert ändern.

### Überstundenberechnung

```
Überstunden Tag = Ist-Arbeitszeit - Soll-Arbeitszeit (anteilig)
Überstunden Monat = Summe aller Tagesüberstunden
Überstunden Gesamt = Kumuliert seit Erfassungsbeginn (oder letztem Reset)
```

**Soll-Arbeitszeit:**
- Wird pro Mitarbeiter individuell konfiguriert (z.B. 40h, 32h, 20h/Woche)
- Verteilt auf Arbeitstage (Mo-Fr standardmäßig)
- Feiertage und Urlaub reduzieren Soll
- Halbe Feiertage reduzieren Soll um 50%

**Überstundenkonto:**
- Startwert wird durch Admin manuell eingegeben (für bestehende Mitarbeiter)
- Nur Admin kann zurücksetzen
- Grund und Datum werden dokumentiert

### Urlaubsberechnung

```
Resturlaub = Jahresanspruch - Genommene Urlaubstage + Manueller Übertrag
```

**Regeln:**
- Urlaubsanspruch wird jährlich pro Mitarbeiter festgelegt
- Ganze und halbe Urlaubstage möglich (0.5)
- Kein automatischer Verfall am Jahresende
- Admin entscheidet über Übertrag/Verfall (manuell)

### Feiertage

**Automatische Generierung:**
- Admin wählt Jahr und klickt "Feiertage generieren"
- System berechnet alle gesetzlichen Feiertage:
  - Feste Feiertage (Neujahr, Tag der Arbeit, Weihnachten, etc.)
  - Bewegliche Feiertage (Ostern, Pfingsten, Himmelfahrt) via Gauss-Algorithmus
  - Bundesland-spezifische Feiertage (Heilige Drei Könige, Fronleichnam, etc.)
- Admin kann danach anpassen (löschen, hinzufügen, halbe Tage markieren)

**Regeln:**
- Feiertage werden nach Bundesland pro Mitarbeiter hinterlegt
- Ganze Feiertage: Soll-Arbeitszeit = 0
- Halbe Feiertage (Heiligabend, Silvester): Soll-Arbeitszeit = 50%
- Mitarbeiter muss an Feiertagen nicht erfassen
- Falls doch gearbeitet wird: Überstunden

### Projekte

**Mischsystem:**
- Admin kann Projekte vorab anlegen (für Autocomplete)
- Mitarbeiter können auch Freitext eingeben
- Freitext-Eingaben werden gespeichert und erscheinen künftig im Autocomplete
- Admin kann Projekte deaktivieren (erscheinen nicht mehr in Auswahl)

### Abwesenheitstypen

| Typ | Auswirkung |
|-----|------------|
| Urlaub | Soll = 0, Urlaubstage werden abgezogen |
| Krank | Soll = 0, keine Abzüge |
| Sonderurlaub | Soll = 0, keine Abzüge |
| Unbezahlter Urlaub | Soll = 0, keine Abzüge |

### Berechtigungen Zeiteinträge

| Zeitraum | Mitarbeiter | Vorgesetzter | Admin |
|----------|-------------|--------------|-------|
| Aktueller Monat | Bearbeiten | Einsehen | Bearbeiten |
| Vormonat | Bearbeiten | Einsehen | Bearbeiten |
| Ältere Monate | Nur Lesen | Einsehen | Bearbeiten (mit Protokoll) |

**Änderungsprotokoll bei Admin-Änderungen:**
- Wer hat geändert
- Wann wurde geändert
- Alter Wert → Neuer Wert
- Mitarbeiter kann Protokoll einsehen (DSGVO)

### Vorgesetzter

- Vorgesetzter pro Mitarbeiter ist **optional**
- Ohne Vorgesetzten: Urlaub wird direkt eingetragen
- Mit Vorgesetzten: Nur relevant für Team-Übersicht (MVP), Genehmigung später
- Flache Struktur im MVP (ein Vorgesetzter pro Mitarbeiter)

---

## 6. Daten & Objekte

### Datenobjekte

#### Mitarbeiter (Employee)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Eindeutige ID |
| nextcloud_user_id | String | Verknüpfung zu Nextcloud User |
| display_name | String | Anzeigename |
| weekly_hours | Decimal | Soll-Stunden pro Woche (z.B. 40.0, 32.0, 20.0) |
| vacation_days_year | Decimal | Urlaubsanspruch pro Jahr (z.B. 30.0) |
| vacation_days_carried | Decimal | Übertrag aus Vorjahr |
| start_date | Date | Eintrittsdatum (für Überstunden-Startpunkt) |
| federal_state | Enum | Bundesland für Feiertage |
| role | Enum | mitarbeiter / vorgesetzter / admin |
| supervisor_id | UUID | Vorgesetzter (optional, für Team-Zuordnung) |
| overtime_balance | Integer | Aktuelles Überstundenkonto in Minuten (Startwert manuell) |

#### Zeiteintrag (TimeEntry)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Eindeutige ID |
| employee_id | UUID | Zugehöriger Mitarbeiter |
| date | Date | Datum des Eintrags |
| start_time | Time | Arbeitsbeginn |
| end_time | Time | Arbeitsende |
| break_minutes | Integer | Pausendauer in Minuten |
| work_minutes | Integer | Berechnete Arbeitszeit in Minuten |
| project_id | UUID | Projekt (optional, FK zu Project) |
| location | Enum | büro / mobil (optional) |
| note | String | Optionale Bemerkung |
| created_at | DateTime | Erstellungszeitpunkt |
| updated_at | DateTime | Letzter Änderungszeitpunkt |
| updated_by | UUID | Wer hat zuletzt geändert |

#### Abwesenheit (Absence)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Eindeutige ID |
| employee_id | UUID | Zugehöriger Mitarbeiter |
| type | Enum | urlaub / krank / sonderurlaub / unbezahlt |
| start_date | Date | Beginn |
| end_date | Date | Ende |
| days | Decimal | Anzahl Arbeitstage (0.5 möglich) |
| note | String | Optionale Bemerkung |
| created_at | DateTime | Erstellungszeitpunkt |

#### Feiertag (Holiday)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Eindeutige ID |
| date | Date | Datum |
| name | String | Bezeichnung |
| federal_state | Enum | Bundesland (oder "alle") |
| is_half_day | Boolean | Halber Feiertag (Heiligabend, Silvester) |
| year | Integer | Jahr |

#### Projekt (Project)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Eindeutige ID |
| name | String | Projektname (für Autocomplete) |
| active | Boolean | Aktiv/Inaktiv |
| created_by_admin | Boolean | Vom Admin angelegt oder aus Freitext |
| created_at | DateTime | Erstellungszeitpunkt |

#### Änderungsprotokoll (AuditLog)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| id | UUID | Eindeutige ID |
| employee_id | UUID | Betroffener Mitarbeiter |
| changed_by | UUID | Wer hat geändert |
| changed_at | DateTime | Wann |
| entity_type | String | Was wurde geändert (TimeEntry, Absence, etc.) |
| entity_id | UUID | ID des geänderten Eintrags |
| field_name | String | Welches Feld |
| old_value | String | Alter Wert |
| new_value | String | Neuer Wert |

#### Firmeneinstellungen (CompanySettings)

| Feld | Typ | Beschreibung |
|------|-----|--------------|
| company_name | String | Firmenname für PDF |
| company_address | String | Adresse für PDF |
| default_weekly_hours | Decimal | Standard-Wochenarbeitszeit |
| default_vacation_days | Decimal | Standard-Urlaubsanspruch |
| default_federal_state | Enum | Standard-Bundesland |

### Beziehungen

```
Employee 1 ---- n TimeEntry
Employee 1 ---- n Absence
Employee n ---- 1 Employee (Vorgesetzter, optional)
TimeEntry n ---- 1 Project (optional)
Holiday n ---- 1 FederalState
AuditLog n ---- 1 Employee (betroffener MA)
AuditLog n ---- 1 Employee (ändernder MA)
```

### Bundesländer (Enum)

```
baden_wuerttemberg, bayern, berlin, brandenburg, bremen, hamburg,
hessen, mecklenburg_vorpommern, niedersachsen, nordrhein_westfalen,
rheinland_pfalz, saarland, sachsen, sachsen_anhalt, schleswig_holstein, thueringen
```

---

## 7. Technische Rahmenbedingungen

### Nextcloud-Vorgaben

| Bereich | Technologie |
|---------|-------------|
| Backend | PHP 8.2+ |
| Frontend | Vue.js + @nextcloud/vue |
| UI-Komponenten | NcDateTimePicker, NcSelect, NcInputField, NcButton, etc. |
| HTTP | @nextcloud/axios |
| Routing | @nextcloud/router |
| i18n | @nextcloud/l10n |
| Datenbank | Nextcloud DB Abstraction (QBMapper) |
| PDF-Generierung | PHP serverseitig (TCPDF oder ähnlich) |

### Referenzdokumentation

- Developer Manual: https://docs.nextcloud.com/server/latest/developer_manual/
- Vue Components: https://nextcloud-vue-components.netlify.app/
- Lokaler Guide: `/Users/axel/nextcloud_cpcMomentum/AAB_Coding_Projekte/nextcloud-app-dev-guide.md`

---

## 8. Ausblick

### Version 2 (nach MVP)

| Feature | Beschreibung |
|---------|--------------|
| **Mehrere Zeiteinträge pro Tag** | Split für Unterbrechungen |
| **Urlaubsgenehmigung-Workflow** | Antrag → Benachrichtigung an Vorgesetzten → Genehmigung/Ablehnung |
| **Benachrichtigungen** | Erinnerung bei fehlender Erfassung |
| **Kalender-Integration** | Urlaubskalender in Nextcloud Kalender-App synchronisieren |
| **Überstundenabbau** | Gleitzeit-Ausgleich buchen |
| **Hierarchische Gruppenstruktur** | Mehrere Teams mit eigenen Vorgesetzten für größere Unternehmen |

### Version 3 (Zukunft)

| Feature | Beschreibung |
|---------|--------------|
| **Projektzeit-Auswertung** | Reports nach Projekten/Kunden |
| **Export CSV** | Für Lohnbuchhaltung |
| **Schnittstelle DATEV** | Export für Steuerberater |
| **Digitale Signatur** | Qualifizierte elektronische Signatur |
| **Auswertungen** | Statistiken, Trends |

---

## Anhang: Referenzen

- Gesetzliche Recherche: `research/arbeitszeiterfassung/20260126_Arbeitszeiterfassung-Recherche.md`
- Kimai Feature-Referenz: https://www.kimai.org/store/controlling.html
- AI-First Template: `ai-first-approach/workflow/11-TEMPLATE-idea-description.md`
- Nextcloud Dev Guide: `AAB_Coding_Projekte/nextcloud-app-dev-guide.md`

---

## Änderungshistorie

| Version | Datum | Änderungen |
|---------|-------|------------|
| V1 | 2026-01-27 | Initiale Version |
| V2 | 2026-01-27 | Technische Entscheidungen ergänzt: Berechtigungen wie ContractManager, Überstunden-Startwert manuell, Projekte als Mischsystem, PDF serverseitig (PHP), Feiertage automatisch generierbar, hierarchische Gruppen für v2 |
