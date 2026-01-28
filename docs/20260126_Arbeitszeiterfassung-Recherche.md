# Arbeitszeiterfassung - Recherche

## Kontext

- **Branche:** Beratung und IT
- **Unternehmensgröße:** Bis 10-20 Mitarbeiter
- **Arbeitsmodell:** Gleitzeit, mobiles Arbeiten (kein Schichtbetrieb)
- **Ziel:** Nextcloud-App für gesetzeskonforme Arbeitszeiterfassung
- **Output:** PDF-Zeitnachweis zur manuellen Unterschrift

---

## Teil 1: Gesetzliche Anforderungen Deutschland

### Rechtsgrundlage

| Quelle | Relevanz |
|--------|----------|
| **EuGH-Urteil (Mai 2019)** | EU-weite Pflicht zur systematischen Arbeitszeiterfassung |
| **BAG-Urteil (13.09.2022)** | Konkretisierung für Deutschland - gilt sofort, ohne Übergangsfrist |
| **§ 3 Abs. 2 Nr. 1 ArbSchG** | Arbeitgeber müssen System zur Arbeitszeiterfassung einführen |
| **Koalitionsvertrag 2025** | Elektronische Zeiterfassung wird verpflichtend, Gesetz erwartet 2026 |

### Was muss dokumentiert werden (Pflichtangaben)

Laut BAG-Urteil müssen folgende Daten erfasst werden:

| Pflichtangabe | Beschreibung |
|---------------|--------------|
| **Beginn** | Uhrzeit Arbeitsbeginn |
| **Ende** | Uhrzeit Arbeitsende |
| **Dauer** | Gesamte tägliche Arbeitszeit |
| **Pausen** | Implizit durch Beginn/Ende/Dauer ableitbar |

**Wichtig:** Die Dokumentation muss **zeitnah** erfolgen (möglichst am selben Tag).

### Wer ist verantwortlich?

- **Arbeitgeber** ist verantwortlich für die Erfassung
- **Delegation möglich:** Arbeitnehmer können selbst erfassen
- **Kontrollpflicht:** Arbeitgeber muss die Erfassung kontrollieren

### Sonderregelungen für kleine Unternehmen

| Unternehmensgröße | Pflicht | Form |
|-------------------|---------|------|
| **Unter 10 Mitarbeiter** | Ja, Erfassung ist Pflicht | Analog erlaubt (Papier, Excel) |
| **Ab 10 Mitarbeiter** | Ja, Erfassung ist Pflicht | Elektronisch (nach Gesetz 2026) |

**Für euch (bis 10-20 MA):**
- Arbeitszeiterfassung ist **jetzt schon Pflicht**
- Unter 10 MA: Analoge Erfassung reicht (aber elektronisch ist besser)
- Ab 10 MA: Elektronische Erfassung wird verpflichtend (voraussichtlich 2026)

### Ausnahmen

| Personengruppe | Erfassungspflicht |
|----------------|-------------------|
| Leitende Angestellte (§ 18 Abs. 1 Nr. 1 ArbZG) | Nein |
| Geschäftsführer/Vorstände | Nein |
| Alle anderen Arbeitnehmer | Ja |

### Aufbewahrungspflicht

- **Mindestens 2 Jahre** müssen Arbeitszeitaufzeichnungen aufbewahrt werden
- Bei bestimmten Branchen (Bau, Gastro) gelten strengere Regeln

### Sanktionen

- Verstöße können mit **Bußgeldern bis zu 30.000 €** geahndet werden
- Arbeitsschutzbehörden können Einsicht verlangen

### Vertrauensarbeitszeit

- **Bleibt möglich**, solange Beginn, Ende und Pausenzeiten dokumentiert werden
- Die Erfassung kann durch den Arbeitnehmer selbst erfolgen

---

## Teil 2: Anforderungen an euer System

Basierend auf den gesetzlichen Vorgaben und euren Anforderungen:

### Mindestanforderungen

| Anforderung | Umsetzung |
|-------------|-----------|
| Beginn, Ende, Dauer erfassen | Tägliche Eingabe durch Mitarbeiter |
| Zeitnahe Dokumentation | Eingabe am selben Tag oder zeitnah |
| Nachvollziehbarkeit | Änderungen protokollieren |
| Kontrollmöglichkeit | Vorgesetzter kann Einträge einsehen |
| Archivierung | Mindestens 2 Jahre aufbewahren |

### Zusätzliche Anforderungen (eure Wünsche)

| Anforderung | Details |
|-------------|---------|
| Gleitzeit | Soll-Arbeitszeit definierbar, Über-/Unterzeit berechnen |
| Überstunden | Kumulierte Überstundenkonten pro Mitarbeiter |
| Urlaub | Urlaubsanspruch, genommene Tage, Resturlaub |
| Feiertage | Bundesland-spezifische Feiertage berücksichtigen |
| Mobiles Arbeiten | Kennzeichnung ob Büro/Mobil (optional) |
| Monatsbericht | PDF-Export mit allen Daten des Monats |
| Signatur | Feld für manuelle Unterschrift (MA + Vorgesetzter) |

---

## Teil 3: Existierende Nextcloud Apps

### 1. TimeManager

**URL:** https://apps.nextcloud.com/apps/timemanager

| Aspekt | Details |
|--------|---------|
| Kompatibilität | Nextcloud 13-32 |
| Letzte Aktualisierung | Vor ~4 Monaten |
| Rating | 10/10 |
| Entwickler | Thomas Ebert |

**Features:**
- Zeiterfassung nach Clients, Projekten, Tasks
- Statistiken und Berichte
- Zeiteinträge mit Start/Ende oder Dauer
- Sharing von Clients/Projekten im Team
- Checkbox für "abgerechnet"

**Limitierungen:**
- Keine Überstundenberechnung
- Kein Urlaubsmanagement
- Kein PDF-Monatsexport mit Signaturfeld
- Primär für Projektzeit, nicht Arbeitszeitnachweis

**Bewertung:** Gute Basis, aber **nicht ausreichend** für gesetzeskonforme Arbeitszeiterfassung.

---

### 2. Time Tracker

**URL:** https://apps.nextcloud.com/apps/timetracker

| Aspekt | Details |
|--------|---------|
| Kompatibilität | Nextcloud 14-33 |
| Letzte Aktualisierung | Vor ~3 Monaten |
| Rating | 8/10 |
| Entwickler | MTier Ltd. |

**Features:**
- Einfache Zeiterfassung
- Aggregation nach Projekten/Clients

**Limitierungen:**
- Sehr basic
- Keine Überstunden, kein Urlaub
- Kein strukturierter Export

**Bewertung:** Zu simpel für eure Anforderungen.

---

### Fazit Nextcloud Apps

**Keine der existierenden Nextcloud-Apps erfüllt die Anforderungen** für eine gesetzeskonforme Arbeitszeiterfassung mit Überstunden, Urlaub und Monatsnachweis.

---

## Teil 4: Open Source Alternativen (Standalone)

### 1. Kimai (Empfehlung)

**URL:** https://www.kimai.org / https://github.com/kimai/kimai

| Aspekt | Details |
|--------|---------|
| Lizenz | MIT (Open Source) |
| Technologie | PHP 8.1+, Symfony, MySQL/MariaDB |
| Deployment | Docker, Self-hosted, oder SaaS |
| Aktiv gepflegt | Ja, sehr aktiv |

**Features (Basis - kostenlos):**
- Zeiterfassung mit Beginn, Ende, Dauer
- Multi-User mit Rollen und Teams
- Projekte, Kunden, Aktivitäten
- Export: PDF, Excel, CSV, HTML
- LDAP/SAML SSO-Integration
- 2FA
- API (JSON)
- Über 30 Sprachen (inkl. Deutsch)

**Features (Controlling Plugin - kostenpflichtig ~99€):**
- **Überstundenkonten** (Plus/Minus pro Mitarbeiter)
- **Urlaubsverwaltung** (Anspruch, genommen, Rest)
- **Krankmeldungen**
- **Feiertage** (pro Bundesland/Gruppe)
- **Monatliche Genehmigung** mit PDF-Export
- Identifikation fehlender Tage

**Docker-Installation:**
```bash
# Beispiel docker-compose.yml
version: '3.5'
services:
  kimai:
    image: kimai/kimai2:apache
    ports:
      - "8001:8080"
    environment:
      - DATABASE_URL=mysql://kimai:kimai@db/kimai
      - TRUSTED_HOSTS=localhost,kimai.example.com
    volumes:
      - kimai_var:/opt/kimai/var
    depends_on:
      - db

  db:
    image: mariadb:10.11
    environment:
      - MYSQL_DATABASE=kimai
      - MYSQL_USER=kimai
      - MYSQL_PASSWORD=kimai
      - MYSQL_ROOT_PASSWORD=root
    volumes:
      - kimai_db:/var/lib/mysql

volumes:
  kimai_var:
  kimai_db:
```

**Nextcloud-Integration:**
- Keine direkte Nextcloud-App
- Aber: Beide können denselben LDAP/SAML-Provider nutzen (SSO)
- Kimai kann neben Nextcloud auf demselben Server laufen

**Bewertung:** ⭐⭐⭐⭐⭐ Beste Option - erfüllt alle Anforderungen

---

### 2. solidtime

**URL:** https://www.solidtime.io / https://github.com/solidtime-io/solidtime

| Aspekt | Details |
|--------|---------|
| Lizenz | AGPL v3 |
| Technologie | Laravel (PHP), Vue.js |
| Deployment | Docker, Self-hosted, oder SaaS |

**Features:**
- Moderne UI
- Projekte, Tasks, Clients
- Import von Toggl/Clockify
- Self-hosted möglich

**Limitierungen:**
- Noch relativ neu
- Weniger Features als Kimai
- Kein explizites Controlling-Plugin für Überstunden/Urlaub

**Bewertung:** ⭐⭐⭐ Modern, aber weniger ausgereift als Kimai

---

### 3. titra

**URL:** https://github.com/kromitgmbh/titra

| Aspekt | Details |
|--------|---------|
| Lizenz | MIT |
| Technologie | Node.js, Meteor |

**Features:**
- Zeiterfassung
- Projektmanagement
- Reports und Graphen
- Docker-Compose Setup

**Limitierungen:**
- Kleinere Community
- Weniger Dokumentation

**Bewertung:** ⭐⭐⭐ Funktional, aber weniger etabliert

---

### 4. Anuko Time Tracker

**URL:** https://github.com/anuko/timetracker

| Aspekt | Details |
|--------|---------|
| Lizenz | BSD |
| Technologie | PHP, MySQL |

**Features:**
- Einfache Zeiterfassung
- Reports
- Rechnungsstellung

**Limitierungen:**
- Ältere Codebasis
- Weniger aktive Entwicklung

**Bewertung:** ⭐⭐ Veraltet

---

## Teil 5: Empfehlung

### Option A: Kimai als eigenständige Lösung (Empfohlen)

**Vorteile:**
- Erfüllt alle gesetzlichen Anforderungen
- Controlling-Plugin deckt Überstunden, Urlaub, Feiertage ab
- PDF-Monatsberichte mit Signaturfeld
- Aktiv gepflegt, große Community
- Kann auf eurem Hetzner-Server neben Nextcloud laufen
- SSO-Integration möglich (gleicher Login wie Nextcloud)

**Nachteile:**
- Kein "in Nextcloud integriert"
- Controlling-Plugin kostet ~99€ einmalig
- Separates System zu pflegen

**Aufwand:**
- Docker-Setup: Gering
- Konfiguration: Mittel
- Wartung: Gering (Updates via Docker)

---

### Option B: Eigene Nextcloud-App entwickeln

**Vorteile:**
- Vollständig in Nextcloud integriert
- Exakt auf eure Bedürfnisse zugeschnitten

**Nachteile:**
- Erheblicher Entwicklungsaufwand
- Wartung und Updates selbst
- Keine Community-Unterstützung

**Aufwand:**
- Entwicklung: Hoch (mehrere Wochen/Monate)
- Wartung: Hoch

---

### Meine Empfehlung

**Kimai** ist die pragmatische Lösung:

1. **Sofort einsatzbereit** - Docker-Container hochfahren, fertig
2. **Gesetzeskonform** - Erfüllt alle Anforderungen
3. **Controlling-Plugin** - Überstunden, Urlaub, Feiertage, Monatsberichte
4. **Kosteneffizient** - Open Source + 99€ für Plugin vs. Eigenentwicklung
5. **Zukunftssicher** - Aktive Entwicklung, große Community

Eine eigene Nextcloud-App zu entwickeln macht nur Sinn, wenn ihr spezifische Anforderungen habt, die Kimai nicht erfüllt - was nach meiner Recherche nicht der Fall ist.

---

## Nächste Schritte

Falls Kimai in Frage kommt:

1. **Test-Installation** auf dem Hetzner-Server (Docker)
2. **Controlling-Plugin** evaluieren (30 Tage Trial verfügbar)
3. **Workflow definieren:** Wer erfasst wann? Wer genehmigt?
4. **PDF-Template** für Monatsnachweis anpassen
5. **Optional:** SSO-Integration mit Nextcloud über LDAP/SAML

Falls eigene Nextcloud-App gewünscht:

1. **Anforderungsdokument** erstellen
2. **Technisches Konzept** (Datenbankmodell, API, UI)
3. **Entwicklungsplan** mit Phasen
4. **Kimai als Referenz** für Features nutzen

---

## Quellen

### Gesetzliche Grundlagen
- [BMAS FAQ Arbeitszeiterfassung](https://www.bmas.de/DE/Arbeit/Arbeitsrecht/Arbeitnehmerrechte/Arbeitszeitschutz/Fragen-und-Antworten/faq-arbeitszeiterfassung.html)
- [Clockodo - Zeiterfassungspflicht](https://www.clockodo.com/de/ratgeber/arbeitszeiterfassung-ist-pflicht/)
- [Handwerksblatt - Elektronische Zeiterfassung](https://www.handwerksblatt.de/themen-specials/arbeitszeit-erfassen-aber-wie/elektronische-erfassung-der-arbeitszeit-wird-pflicht)
- [Factorial - Arbeitszeiterfassungsgesetz 2025](https://factorialhr.de/blog/arbeitszeiterfassungsgesetz/)

### Nextcloud Apps
- [TimeManager](https://apps.nextcloud.com/apps/timemanager)
- [Time Tracker](https://apps.nextcloud.com/apps/timetracker)

### Open Source Tools
- [Kimai](https://www.kimai.org/)
- [Kimai GitHub](https://github.com/kimai/kimai)
- [Kimai Controlling Plugin](https://www.kimai.org/store/controlling.html)
- [solidtime](https://github.com/solidtime-io/solidtime)
- [titra](https://github.com/kromitgmbh/titra)
