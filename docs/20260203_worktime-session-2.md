# Session-Zusammenfassung: WorkTime

**Datum:** 03.02.2026 (Nachmittag)

---

## Problem

Nach VPS-Deployment zeigten Zeiterfassung, Abwesenheiten und Monatsübersicht "Keine Einträge". Browser-Konsole zeigte 404-Fehler für `/api/employees/me`.

---

## Analyse

Lange Fehlersuche mit verschiedenen Hypothesen:
- OCSController vs Controller (war nicht das Problem)
- OCS-APIREQUEST Header (war nicht das Problem)
- Migrationen nicht ausgeführt (war nicht das Problem)

**Tatsächliche Ursache:** Der eingeloggte User "admin" hatte keinen Eintrag in der `wt_employees` Tabelle.

| Nextcloud-User | WorkTime-Employee |
|----------------|-------------------|
| admin | ❌ Nicht angelegt |
| AxDe | ✅ Existiert |
| JeTi | ✅ Existiert |
| LeDa | ✅ Existiert |

Nach Login als "AxDe" funktionierte alles.

---

## Erkenntnis

**Kein Code-Problem.** Die App verhält sich korrekt - ein User ohne Employee-Eintrag kann keine Zeiterfassung nutzen.

**UX-Problem:** Die App zeigt einen kryptischen 404-Fehler statt einer verständlichen Meldung.

---

## Änderungen

Keine Code-Änderungen notwendig. Versehentliche Änderungen wurden rückgängig gemacht.

---

## Offene Punkte

| Issue | Beschreibung |
|-------|--------------|
| #17 (neu) | Bessere Fehlermeldung für User ohne Employee-Eintrag |
| #11 | Team-Übersicht als monatsübergreifende Liste |
| #12 | PDF-Formatierung (Datumszeile) |

---

## Lessons Learned

1. **Erst Daten prüfen, dann Code debuggen** - Der "Fehler" war fehlende Daten, nicht fehlerhafter Code
2. **User-Kontext beachten** - Als welcher User ist man eingeloggt?
3. **Systematisch vorgehen** - Logs lesen, bevor Code geändert wird

---

*Erstellt: 03.02.2026*
