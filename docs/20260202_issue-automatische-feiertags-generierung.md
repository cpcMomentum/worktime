# Issue: Feiertags-Generierung

**Erstellt:** 2026-02-02
**Status:** Erledigt
**Priorität:** -

---

## Entscheidung

Kein Automatismus nötig. Für kleine Firmen reicht es, einmal im Jahr manuell "Feiertage generieren" zu klicken.

---

## Aktueller Stand

- Button "Feiertage generieren" existiert bereits
- `generateAll(year)` generiert alle 16 Bundesländer auf einmal
- Admin klickt einmal pro Jahr → fertig

---

## Änderungen (2026-02-02)

Der ursprünglich geplante Code (`ensureHolidaysExist` bei Mitarbeiter-Erstellung) wurde wieder entfernt, da nicht nötig.

---

## Bundesland-Wechsel

Funktioniert automatisch. Feiertage sind pro Bundesland gespeichert, nicht pro Mitarbeiter. Bei Abfrage wird immer das aktuelle Bundesland des Mitarbeiters verwendet.
