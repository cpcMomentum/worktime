# Issue: Betriebsurlaub

**Erstellt:** 2026-02-02
**Status:** Offen (Konzept - Details zu besprechen)
**Priorität:** Niedrig

---

## Ziel

Firma kann Betriebsurlaub festlegen (z.B. Brückentage, zwischen Weihnachten und Neujahr). Diese Tage werden automatisch als Urlaub für alle Mitarbeiter eingetragen.

---

## Abgrenzung zu Feiertagen

| | Feiertag | Betriebsurlaub |
|---|----------|----------------|
| Urlaubsabzug | Nein | Ja |
| Soll-Arbeitszeit | Reduziert | Bleibt gleich |
| Mitarbeiter-Aktion | Keine | Keine (automatisch) |

---

## Offene Fragen

- [ ] Gilt Betriebsurlaub für ALLE Mitarbeiter oder nur bestimmte?
- [ ] Was passiert bei Teilzeit-Mitarbeitern?
- [ ] Was wenn Mitarbeiter an dem Tag sowieso frei hat (z.B. Freitag bei 4-Tage-Woche)?
- [ ] Wird Betriebsurlaub vom Jahresurlaub abgezogen oder ist es zusätzlich?
- [ ] Kann ein Mitarbeiter Betriebsurlaub "ablehnen" (z.B. will arbeiten)?
- [ ] Wie wird es in der UI dargestellt?

---

## Mögliche Umsetzung

### Option A: Als spezieller Absence-Typ

- Neuer Typ `TYPE_COMPANY_HOLIDAY` in `Absence`
- Admin erstellt Betriebsurlaub-Eintrag
- System erstellt automatisch Absence-Einträge für alle Mitarbeiter
- Wird vom Urlaubskonto abgezogen

### Option B: Eigene Tabelle `wt_company_holidays`

- Separate Tabelle für Betriebsurlaub
- Bei Urlaubsberechnung werden diese Tage berücksichtigt
- Keine individuellen Absence-Einträge

---

## Beispiel-Workflow

1. Admin geht in Einstellungen → Betriebsurlaub
2. Klickt "Betriebsurlaub hinzufügen"
3. Wählt Datum (z.B. 02.01.2026 - Brückentag)
4. Optional: Beschreibung
5. Speichern
6. System: Für alle aktiven Mitarbeiter wird 1 Urlaubstag abgezogen

---

## Status

Konzept aufgenommen. Details vor Implementierung besprechen.
