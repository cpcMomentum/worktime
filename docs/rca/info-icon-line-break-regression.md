# RCA: Info-Icon Zeilenumbruch Regression

**Datum:** 2026-05-04
**Betroffen seit:** v0.6.2 (Commit 26e3167)
**Entdeckt:** v0.6.4 auf nc.bedethi.com

## Symptom

Info-Icons (i) rutschen in allen Views auf eine neue Zeile statt inline neben dem Label zu bleiben. Betrifft Dashboard, Monatsübersicht, Jahresübersicht, Settings, EmployeeForm — überall wo InfoIcon verwendet wird.

## Five Whys

1. **Warum rutscht das Icon auf eine neue Zeile?**
   NcPopover rendert ein `<div class="v-popper">` — Block-Level, erzwingt Zeilenumbruch.

2. **Warum wird das div nicht auf inline gesetzt?**
   Die CSS-Regel `:deep(.v-popper) { display: inline !important }` in InfoIcon.vue greift nicht.

3. **Warum greift `:deep()` nicht?**
   In Vue 2 scoped CSS: `:deep()` setzt den scoped-Selektor `[data-v-xxx]` auf das *Eltern-Element* und erlaubt Zugriff auf Kind-Elemente. Aber InfoIcon.vue hat kein Eltern-Element im Template das das Attribut traegt — `NcPopover` ist das Root-Element, und Vue setzt das scoped-Attribut auf die Root-Komponente, aber `.v-popper` ist *innerhalb* von NcPopover gerendert, nicht als direktes Kind.

4. **Warum hat das vorher funktioniert?**
   Vor dem Refactoring (Commit ae61503) stand die CSS-Regel direkt in DashboardView.vue als `.stat-label :deep(.v-popper)`. Das funktionierte, weil `.stat-label` das scoped-Attribut trug und `:deep()` dann korrekt in NcPopover greifen konnte.

5. **Warum ist der Fehler beim Refactoring nicht aufgefallen?**
   Das Refactoring (Commit 26e3167, "extract InfoIcon wrapper component") wurde ohne visuellen Test im Browser durchgefuehrt. Die CSS-Regel wurde 1:1 kopiert, aber der Kontext (Parent-Selektor) ging verloren.

## Root Cause

**CSS-Scoping-Kontext ging beim Refactoring verloren.** Die `:deep()` Regel braucht ein scoped Eltern-Element als Anker. Beim Extrahieren in eine eigene Komponente ohne Wrapper-Element fehlte dieser Anker.

## Fix

1. Wrapper `<span class="info-icon-wrapper">` um NcPopover hinzugefuegt
2. Unscoped CSS-Block fuer `.info-icon-wrapper .v-popper { display: inline !important }` — durchdringt die Komponentengrenze zuverlaessig
3. Scoped CSS fuer alle anderen Regeln beibehalten

## Praevention

- Bei CSS-Refactorings die `:deep()` Regeln enthalten: immer visuell im Browser pruefen
- `:deep()` ohne Parent-Selektor in scoped CSS funktioniert nicht zuverlaessig bei Drittanbieter-Komponenten
- Fuer Drittanbieter-Komponenten-Styling: unscoped CSS-Block mit spezifischem Wrapper-Selektor verwenden
