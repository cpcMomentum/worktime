# Übersetzungen (l10n)

WorkTime nutzt das Nextcloud-Standardformat: pro Sprache ein `*.js`
(`OC.L10N.register`) und ein `*.json` (`translations`-Objekt). **Quellsprache ist
Deutsch** (`de`) — dort ist der Wert gleich dem Schlüssel.

| Sprache | Code | Status |
|---------|------|--------|
| Deutsch | `de` | Quellsprache (vollständig per Konstruktion) |
| Englisch | `en` | gepflegt |
| Tschechisch | `cs` | Community (best-effort) |

## Das Problem, das die Toolchain löst

Der Laufzeit-Lookup `t('worktime', '…')` ist **byte-genau**: Steht im Code ein
typografisches `…` und im Katalog `...`, findet Nextcloud nichts und zeigt den
deutschen Quelltext. Weil die Kataloge früher von Hand gepflegt wurden, sind sie
gedriftet — fehlende Keys, tote Keys, `.js` und `.json` liefen auseinander
(siehe Lehre aus dem 0.12.0-Review, worktime#394 / #259).

## Der Wächter: `scripts/l10n-check.mjs`

Die **Wahrheit** sind die Übersetzungsaufrufe im Code:

- Frontend: `t('worktime', '…')` in `src/**` (`.js`/`.vue`)
- Backend: `$l->t('…')` in `lib/`, `templates/`, `appinfo/` (`.php`)

Daraus wird das kanonische Schlüssel-Set abgeleitet und gegen alle 6 Kataloge
geprüft.

```bash
npm run l10n:check    # prüfen (Exit 1 bei Drift)
npm run l10n:fix      # Kataloge aus dem Code regenerieren
```

**Blockierend** (struktureller Defekt): `.js` ≠ `.json`; `de` weicht vom Code ab;
tote Keys (im Katalog, aber in keinem `t()`-Aufruf).

**Nur Hinweis** (nicht blockierend): `en`/`cs`-Einträge, die noch dem deutschen
Quelltext entsprechen = offene Übersetzungs-Schulden.

`--fix` regeneriert `de` byte-genau aus dem Code, entfernt tote Keys, gleicht
`.js`↔`.json` an und ergänzt fehlende Keys in `en`/`cs` mit deutschem Fallback
(damit nichts kaputtgeht; der Hinweis macht sie als „zu übersetzen" sichtbar).

### Durchgesetzt durch

- **Pre-Commit-Hook** (`.githooks/pre-commit`, Check 2) — bei Änderungen an
  Code-/Katalog-Dateien.
- **CI** (`.github/workflows/l10n-check.yml`) — bei Push/PR.

## Neue Strings hinzufügen

1. Im Code `t('worktime', 'Neuer Text')` bzw. `$l->t('Neuer Text')` verwenden.
2. `npm run l10n:fix` ausführen → `de` ist sofort vollständig, `en`/`cs`
   bekommen den Key (vorerst deutscher Fallback).
3. Übersetzungen in `l10n/{en,cs}.{js,json}` eintragen.
4. `npm run l10n:check` muss grün sein, dann committen.

## Nächster Schritt (geparkt, worktime#259)

Sobald eine **vierte Sprache** dazukommt oder eine Community-Sprache sichtbar
verrottet, lohnt sich die Anbindung an eine Übersetzungsplattform
(**Weblate** = NC-Community-Standard). Dann werden die `*.js`/`*.json` aus
`.po`-Dateien generiert statt von Hand gepflegt, und Freiwillige können online
übersetzen. Bis dahin trägt dieser Wächter die Konsistenz.
