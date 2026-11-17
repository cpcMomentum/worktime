# WorkTime – View-Konsistenz-Standard

Verbindlicher Aufbau für alle Admin-/Benutzer-Views. Neue Views und Umbauten
folgen diesem Standard, damit die App einheitlich wirkt (Epic #369).

## Header

Überschrift steht allein in einem `.view-header`, darunter – falls vorhanden –
eine `.view-toolbar` mit Filtern/Umschaltern; Zeit-Navigation immer rechts.

```css
.view-header   { display: flex; align-items: center; margin-bottom: 12px; }
.view-header h2 { margin: 0; }   /* keine eigene Größe/kein eigener Margin pro View */

.view-toolbar  { display: flex; align-items: center; flex-wrap: wrap; gap: 16px; margin-bottom: 20px; }
.view-header__nav { margin-left: auto; display: flex; align-items: center; }  /* Zeit-Nav rechts */
```

## Container-Breiten (nach Inhaltstyp, nicht pauschal)

| Typ | max-width | Views |
|-----|-----------|-------|
| Daten/Tabellen/Auswertung | `1600px` | Zeiterfassung, Abwesenheiten, Team, Genehmigungen, Auswertung, Audit-Log |
| Settings mit Sidebar | `1100px` | Einstellungen, Verwaltung (`settings-layout` = `240px 1fr`; Regeln: `docs/design-system.md`) |

Alle Views: `padding: 20px; padding-left: 50px;`

## Umschalt-/Filter-Element

Ein Standard: **Icon-Segmented-Buttons** (`.seg-btn`), 13px / `font-weight: 600`,
Icon 18px. Keine Chips, kein NcSelect als Filter.

## Tabellen im Card-Look

Tabellen stehen in einem Card-Wrapper – nie „nackt".

```css
background: var(--color-main-background);
border: 1px solid var(--color-border-dark, var(--color-border));
border-radius: var(--border-radius-large, 12px);
```

`th`: `font-weight: 600`, `font-size: 14px`, `color: var(--color-text-maxcontrast)`,
Padding `10px 12px` (oder `8px 12px`). Numerische Spalten rechtsbündig.

## Loading-Icons

| Kontext | Größe |
|---------|-------|
| Haupt-Loading (initiales Laden der View) | `:size="44"` |
| Sekundär (Detail-Tab/Teilbereich) | `:size="32"` |
| Inline-Indikator (z.B. neben einem Toggle) | `:size="20"` |

## Empty State

`NcEmptyContent` mit Icon.

---

*Erstellt: 2026-06-25 – Abschluss Epic #369*
