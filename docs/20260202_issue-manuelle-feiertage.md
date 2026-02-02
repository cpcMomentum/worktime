# Issue: Manuelle Feiertage

**Erstellt:** 2026-02-02
**Status:** Offen
**Priorität:** Mittel

---

## Ziel

Admin kann manuell Feiertage für ein spezifisches Bundesland hinzufügen (z.B. regionale Besonderheiten, Brückentage).

---

## Geplante Features

### 1. Manuelle Feiertage erstellen

- Admin kann in der UI einen neuen Feiertag anlegen
- Felder:
  - Datum
  - Name
  - Bundesland (Auswahl oder "Alle")
  - Halber Tag (Ja/Nein)

### 2. Manuelle Feiertage bearbeiten/löschen

- Bestehende (auch automatisch generierte) Feiertage können bearbeitet werden
- Feiertage können gelöscht werden

### 3. Betriebsurlaub (Konzept - später besprechen)

**Idee:** Firma kann Betriebsurlaub festlegen (z.B. zwischen Weihnachten und Neujahr)

**Komplexität:**
- Betriebsurlaub ist kein Feiertag, sondern erzwungener Urlaub
- Muss vom Urlaubskonto abgezogen werden
- Muss bei Soll-Berechnung berücksichtigt werden
- Unterschied zu Feiertag: Mitarbeiter "arbeitet nicht", aber es zählt als Urlaub

**Status:** Konzept aufgenommen, Details später besprechen

---

## Betroffene Dateien

| Datei | Änderung |
|-------|----------|
| `lib/Controller/HolidayController.php` | `create()`, `update()`, `delete()` Methoden |
| `lib/Service/HolidayService.php` | CRUD-Methoden für manuelle Feiertage |
| `src/views/SettingsView.vue` | UI für Feiertags-Verwaltung |

---

## UI-Konzept

In den Einstellungen unter "Feiertage":
- Liste aller Feiertage für ausgewähltes Jahr/Bundesland
- Button "Feiertag hinzufügen"
- Bearbeiten/Löschen-Buttons pro Zeile
- Kennzeichnung: Automatisch generiert vs. Manuell erstellt

---

## Offene Fragen

- [ ] Betriebsurlaub: Wie genau umsetzen? Eigene Tabelle oder als spezieller Absence-Typ?
- [ ] Soll "Alle Bundesländer" bei manuellen Feiertagen möglich sein?
