# Workflow Arbeitszeiterfassung - Option A

## Kontext

Nextcloud-App zur Arbeitszeiterfassung für deutsche Unternehmen. Ziel ist die Erfüllung der Dokumentationspflichten nach dem BAG-Urteil vom 13.09.2022 (1 ABR 22/21) und § 16 Abs. 2 ArbZG.

---

## Rollen

| Rolle | Beschreibung |
|-------|--------------|
| **Mitarbeiter** | Erfasst eigene Arbeitszeiten |
| **Vorgesetzter** | Genehmigt Arbeitszeiten seiner direkten Teammitglieder |
| **HR-Manager** | Kann alle Mitarbeiter einsehen und genehmigen |
| **Admin** | Vollzugriff auf alle Funktionen |

---

## Workflow-Schritte

### Schritt 1: Erfassung durch Mitarbeiter

Der Mitarbeiter erfasst täglich seine Arbeitszeiten mit folgenden Daten:
- Datum
- Arbeitsbeginn (Uhrzeit)
- Arbeitsende (Uhrzeit)
- Pausendauer (Minuten)
- Optional: Projekt, Beschreibung

**Systemverhalten:**
- Arbeitszeit wird automatisch berechnet (Ende - Beginn - Pause)
- Pausenvalidierung nach § 4 ArbZG (30 Min. bei >6h, 45 Min. bei >9h)
- Eintrag erhält Status `Entwurf`
- Zeitstempel `created_at` wird gesetzt

**Änderbarkeit:** Mitarbeiter kann Einträge im Status `Entwurf` jederzeit bearbeiten oder löschen.

---

### Schritt 2: Monatliche Einreichung durch Mitarbeiter

Am Monatsende reicht der Mitarbeiter alle Einträge des Monats zur Genehmigung ein.

**Systemverhalten:**
- Alle Einträge des Monats wechseln von Status `Entwurf` zu `Eingereicht`
- Folgende Daten werden dokumentiert:
  - `submitted_at`: Zeitstempel der Einreichung
  - `submitted_by`: User-ID des Mitarbeiters
- Aktion wird im Audit-Log protokolliert

**Änderbarkeit:** Nach Einreichung kann der Mitarbeiter keine Änderungen mehr vornehmen.

---

### Schritt 3: Prüfung und Genehmigung durch Vorgesetzten

Der Vorgesetzte sieht in seiner Übersicht alle eingereichten Monate seiner Teammitglieder.

**Anzeige:**
- Name des Mitarbeiters
- Monat/Jahr
- Anzahl Einträge
- Soll-Stunden, Ist-Stunden, Differenz
- Eingereicht am (Datum/Uhrzeit)

**Aktionen:**
- **Genehmigen**: Alle Einträge des Monats werden genehmigt
- **Ablehnen**: Einträge gehen zurück an den Mitarbeiter zur Korrektur

**Bei Genehmigung:**
- Status wechselt von `Eingereicht` zu `Genehmigt`
- Folgende Daten werden dokumentiert:
  - `approved_at`: Zeitstempel der Genehmigung
  - `approved_by`: User-ID des Genehmigenden
- Aktion wird im Audit-Log protokolliert
- Optional: PDF wird automatisch generiert und in Nextcloud abgelegt

**Bei Ablehnung:**
- Status wechselt von `Eingereicht` zu `Abgelehnt`
- Mitarbeiter kann Einträge korrigieren und erneut einreichen

**Änderbarkeit:** Nach Genehmigung können nur noch HR-Manager oder Admin Änderungen vornehmen. Jede Änderung wird im Audit-Log dokumentiert.

---

## Dokumentation und Nachvollziehbarkeit

### An jedem Zeiteintrag gespeichert:

| Feld | Beschreibung |
|------|--------------|
| `date` | Arbeitsdatum |
| `start_time` | Arbeitsbeginn |
| `end_time` | Arbeitsende |
| `break_minutes` | Pausendauer |
| `work_minutes` | Berechnete Arbeitszeit |
| `status` | Entwurf / Eingereicht / Genehmigt / Abgelehnt |
| `created_at` | Erstellungszeitpunkt |
| `updated_at` | Letzte Änderung |
| `submitted_at` | Zeitpunkt der Einreichung |
| `submitted_by` | Wer hat eingereicht |
| `approved_at` | Zeitpunkt der Genehmigung |
| `approved_by` | Wer hat genehmigt |

### Im Audit-Log (separate Tabelle):

| Feld | Beschreibung |
|------|--------------|
| `user_id` | Wer hat die Aktion ausgeführt |
| `action` | create / update / delete / submit / approve / reject |
| `entity_type` | time_entry |
| `entity_id` | ID des betroffenen Eintrags |
| `old_values` | Werte vor der Änderung (JSON) |
| `new_values` | Werte nach der Änderung (JSON) |
| `ip_address` | IP-Adresse des Benutzers |
| `created_at` | Zeitstempel der Aktion |

---

## Aufbewahrung

- Alle Daten werden in der Datenbank gespeichert
- Aufbewahrungsdauer: Mindestens 2 Jahre (konfigurierbar)
- Optional: PDF-Export pro Monat als zusätzliche Archivierung

---

## Zugriffsrechte nach Genehmigung

| Rolle | Lesen | Ändern | Löschen |
|-------|-------|--------|---------|
| Mitarbeiter | Eigene | Nein | Nein |
| Vorgesetzter | Team | Nein | Nein |
| HR-Manager | Alle | Ja (mit Audit-Log) | Nein |
| Admin | Alle | Ja (mit Audit-Log) | Ja (mit Audit-Log) |

---

## Offene Fragen zur rechtlichen Beurteilung

1. Ist die digitale Genehmigung durch den Vorgesetzten (mit Zeitstempel und User-ID) rechtlich gleichwertig zu einer physischen Unterschrift?

2. Sind die dokumentierten Daten (Zeitstempel, User-ID, Audit-Log) ausreichend als Nachweis?

3. Gibt es Anforderungen an die Form der Archivierung (Datenbank vs. PDF vs. physische Dokumente)?

4. Muss der Mitarbeiter die Möglichkeit haben, seine eigenen Aufzeichnungen einzusehen/herunterzuladen?

---

*Erstellt: 2026-01-29*
