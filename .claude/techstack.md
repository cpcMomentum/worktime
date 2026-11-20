# TechStack Preset: Nextcloud App

> **Preset-ID:** nextcloud-app
> **Beschreibung:** Nextcloud App Entwicklung — PHP Backend (OCP APIs) + Vue.js Frontend (@nextcloud/vue).
> **Erkennungssignal:** `appinfo/info.xml` im Projekt-Root.

---

## 1. Core Stack

### Backend
| Technologie | Version | Zweck |
|-------------|---------|-------|
| PHP | 8.1+ (Type Hints Pflicht) | Sprache |
| Nextcloud OCP APIs | NC 30+ | Framework (KEINE frei waehlbaren Frameworks) |
| Nextcloud IContainer | - | Dependency Injection |

### Frontend
| Technologie | Version | Zweck |
|-------------|---------|-------|
| Vue.js | 3 | Frontend Framework |
| @nextcloud/vue | latest | NC-native UI-Komponenten (NcAppContent, NcButton, etc.) |
| Pinia | - | State Management (Stores in TypeScript unter src/stores/) |
| vue-router | fuer Vue 3 | Routing — **Hash-Mode Pflicht, NICHT History-Mode** |
| @nextcloud/axios | latest | HTTP Client |
| @nextcloud/router | latest | URL-Generierung (generateUrl()) |
| @nextcloud/l10n | latest | Uebersetzungen |

### Database
| Technologie | Zweck |
|-------------|-------|
| MySQL / MariaDB / PostgreSQL / SQLite | Vom Host vorgegeben — NICHT frei waehlbar |
| OCP\IDBConnection Query Builder | Datenbankzugriff — **raw SQL ist VERBOTEN** |
| OCP\Migration\IMigrationStep | Schema-Migrationen in lib/Migration/ |

## 2. Tooling

### PHP
| Tool | Zweck |
|------|-------|
| `php -l` | Syntax-Check (typisch im Docker-Container) |
| PHPUnit + Nextcloud TestCase | Unit Tests |
| psalm / phpstan | Statische Analyse (optional, app-spezifisch) |

### JavaScript
| Tool | Zweck |
|------|-------|
| Vite (vite.config.js, ES-Modul nach js/, Stylesheet nach css/) | Build |
| eslint (@nextcloud/eslint-config) | Linting |
| vitest | Frontend-Tests (tests/frontend/) |
| tsc --noEmit | Typecheck der Stores |

## 3. Infrastructure

| Aspekt | Details |
|--------|---------|
| Container | **NEIN** — App laeuft IN Nextcloud, nicht daneben |
| Lokale Entwicklung | Nextcloud im Docker (OrbStack), Mount nach `/var/www/html/custom_apps/worktime` |
| Deploy: App Store | Tarball + Signatur + REST API Upload |
| Deploy: Inhouse | rsync auf eigene Instanz + `occ upgrade` |
| CI/CD | App Store Release-Pipeline (NICHT GitHub Actions fuer Deploy) |
| Hosting | Nextcloud-Server (self-hosted oder Managed) |

## 4. Auth & Security

| Aspekt | Loesung |
|--------|---------|
| Auth | Vom Host — `OCP\IUserSession` injizieren, `getUser()` nutzen |
| CSRF | NC-Framework erzwingt `requesttoken` Header bei allen Writes |
| XSS | Vue-Rendering safe by default; in PHP: `p()` / `print_unescaped()` |
| SQLi | Nur Query Builder — raw SQL **verboten** |
| Lizenz | **AGPL-3.0-or-later** (App Store Pflicht) |

## 5. Versionierung

- SemVer in `appinfo/info.xml` → `<version>X.Y.Z</version>`
- Synchron in `package.json` → `"version": "X.Y.Z"`
- NC-Kompatibilitaet: `<dependencies><nextcloud min-version="30" max-version="33"/></dependencies>`

## Projektstruktur

```
<app-name>/
├── appinfo/
│   ├── info.xml            # PFLICHT — App-Metadaten
│   ├── routes.php          # URL-Routing (Controller-Mapping)
│   └── signature.json      # Release-Prozess generiert (Integrity-Check)
├── lib/
│   ├── AppInfo/
│   │   └── Application.php # Bootstrapping, DI-Registration
│   ├── Controller/         # extends OCP\AppFramework\Controller
│   ├── Service/            # Business Logic
│   ├── Db/                 # Entities + Mapper (extends QBMapper)
│   ├── Migration/          # Schema-Migrationen + Repair Steps
│   ├── Notification/       # Notifier (optional)
│   ├── Listener/           # Event Listener
│   └── Settings/           # Admin/Personal Settings
├── src/                    # Vue Frontend Source
│   ├── main.js             # Entry
│   ├── App.vue
│   ├── components/
│   ├── views/
│   ├── store/              # Vuex / Pinia
│   └── router.js
├── js/                     # KOMPILIERTES JS (commit Pflicht!)
│   ├── worktime-main.js
│   └── worktime-main.js.map
├── css/                    # Optional
├── templates/              # PHP-Templates (main.php als Vue-Mount-Point)
├── l10n/                   # Uebersetzungen (Transifex)
├── tests/                  # PHPUnit
├── docs/
│   └── produktbeschreibung.md
├── CHANGELOG.md
├── CLAUDE.md
├── composer.json
├── package.json
├── vite.config.js          # Vite-Build, js/ und css/ werden committet
└── README.md
```

## Command Mappings

| Concept | Command |
|---------|---------|
| `lint_frontend` | `npm run lint` |
| `lint_backend` | `docker exec -t nextcloud-dev php -l /var/www/html/custom_apps/worktime/lib/**/*.php` |
| `format_frontend` | `npx prettier --write src/` |
| `format_backend` | `N/A` |
| `typecheck` | `N/A` |
| `test_frontend` | `npm run test` |
| `test_backend` | `docker exec -t nextcloud-dev php /var/www/html/custom_apps/worktime/vendor/bin/phpunit -c /var/www/html/custom_apps/worktime/tests/phpunit.xml` |
| `build_frontend` | `npm run build` |
| `build_backend` | `N/A` |
| `dep_audit_fe` | `npm audit` |
| `dep_audit_be` | `N/A` |
| `install_deps_fe` | `npm install` |
| `install_deps_be` | `composer install` |

> **Hinweis:** `worktime` wird bei `/adopt` durch den tatsaechlichen App-Namen (aus `appinfo/info.xml`) ersetzt. PHP-Lint laeuft im Docker-Container weil PHP auf macOS typisch nicht installiert ist.

## Plugins

| Kategorie | Plugin | Benoetigt? |
|-----------|--------|------------|
| Recherche | `context7` | Ja |
| Security | `security-guidance` | Ja |
| Testing | `playwright` | Optional (NC-Apps nutzen eher manuelles Testing) |
| Type-Check Frontend | `typescript-lsp` | Wenn TypeScript im Vue-Setup |
| UI Design | `frontend-design` | Optional |

## Pflicht-Konventionen

> **Nicht optional** — App Store Ablehnung oder NC-Major-Update-Breakage bei Verstoss.

| Regel | Grund |
|-------|-------|
| Nur `OCP\*` APIs, niemals `OC\*` | `OC\*` ist privat, instabil — Breakage bei jedem Major-Update |
| Kein raw SQL, nur Query Builder | SQL-Injection + DB-Portabilitaet (MySQL/Postgres/SQLite) |
| AGPL-3.0-or-later ueberall | Harte App-Store-Pflicht |
| Kein "Nextcloud" im App-Namen | Marken-Policy |
| Type Hints in PHP | Projektstandard |
| Assets-Pfad: `js/worktime-main.js` | NC laedt JS aus `js/`, nicht aus `dist/` |
| `npm run build` vor Commit bei Vue-Aenderungen | Ohne kompiliertes JS laeuft die App nicht |
| Keine `.htaccess`/`.user.ini` im Release | NC FilenameValidator strippt diese → Signatur bricht |
| Hash-Routing im Vue Router | NC-Apps laufen unter `/apps/worktime/` ohne History-API |

## Nicht-anwendbare ai-first-dev Skills

Diese Skills sind fuer NC-Apps **nicht relevant** und sollten uebersprungen werden:

| Skill | Grund |
|-------|-------|
| `setup-ci`, `setup-deploy` | CI/CD ist App Store Release, nicht GitHub Actions Deploy |
| `setup-logging` | Logging ueber NC-eigenes `OCP\ILogger` |
| `api-sync` | NC-Apps haben keine OpenAPI-Spec |
| `generate-legal-docs` | Lizenz ist fix AGPL |
| `qa` (Playwright) | Optional — manuelles Testing ueblicher bei NC-Apps |

---

## Skill-Konventionen

> **Diese Regeln werden von den bestehenden ai-first-dev Skills automatisch gelesen und angewendet.** Keine separaten Skills noetig — die Methodik bleibt gleich, nur die stack-spezifischen Regeln aendern sich.

### /release

| Regel | Details |
|-------|---------|
| Branch-Pflicht | Release nur von `develop`, nicht von `main` oder Feature-Branches |
| Release-Branch | `release/vX.Y.Z` von `develop` abzweigen |
| Version synchron | `appinfo/info.xml` UND `package.json` muessen gleiche Version haben |
| Build vor Tarball | `npm install && npm run build` auf dem Release-Branch |
| Tarball aus git archive | `git archive HEAD` verwenden, **NICHT** aus Worktree — verhindert Feature-Code-Leaks |
| Sign-Tree bereinigen | `.htaccess`, `.user.ini` aus Sign-Tree entfernen (NC FilenameValidator) |
| Signatur | `openssl dgst -sha512 -sign ~/.nextcloud/certificates/worktime.key` |
| Upgrade-Test PFLICHT | Vorversion installieren → neue Version drueberziehen → Integrity pruefen |
| Whitelist-Check | Tarball darf NUR enthalten: `appinfo`, `lib`, `src`, `js`, `css`, `templates`, `l10n`, `img`, `tests`, `composer.json`, `package.json`, `package-lock.json`, `webpack.config.js`, `CHANGELOG.md`, `README.md`, `LICENSE`, `CLAUDE.md` |
| App Store Upload | `curl -X POST https://apps.nextcloud.com/api/v1/apps/releases` mit Signatur |
| Post-Release Sync | Release-Branch → `main` mergen, dann `main` → `develop` zuruecksyncen |
| Rollback | Defekte Version im App Store loeschen: `curl -X DELETE .../releases/<version>` |

### /prime

| Regel | Details |
|-------|---------|
| Pattern-Check PFLICHT | Vor Implementation IMMER bestehende Views/Komponenten durchsuchen — NC-Apps sind stark konventionsgetrieben. Patterns (z.B. NcAppNavigation-Nutzung) muessen wiederverwendet werden. |
| OCP-API Referenz | Pruefen welche OCP-APIs in der App bereits genutzt werden, um neue Features konsistent zu implementieren |
| API im Container verifizieren | `docker exec -t nextcloud-dev cat /var/www/html/lib/public/<Interface>.php` — nie aus dem Gedaechtnis coden |
| @nextcloud/* pruefen | Frontend-Pakete (@nextcloud/vue, @nextcloud/dialogs) vor Nutzung im `node_modules/` verifizieren |

### /design

| Regel | Details |
|-------|---------|
| Pattern-Check VOR Alternativen | Bestehende Views analysieren BEVOR Alternativen erwogen werden |
| NC-API-Recherche PFLICHT | Design darf nicht auf "irgendeine API" bauen — nur auf real existierende OCP-Interfaces |
| Hash-Routing beachten | Alle Navigations-Designs muessen Hash-Routing beruecksichtigen |
| @nextcloud/vue nutzen | UI-Komponenten aus @nextcloud/vue bevorzugen (NcButton, NcAppContent, NcModal, etc.) |

### /plan (create-plan)

| Regel | Details |
|-------|---------|
| OCP-Interface-Verifikation | **Blocker-Schritt** — Plan kann nicht finalisiert werden bevor alle referenzierten APIs im Docker-Container verifiziert wurden |
| Pattern-Check vorgezogen | Bestehende Patterns analysieren bevor neue Architektur geplant wird |
| Keine verbotenen APIs | Plan darf keine `OC\*` APIs, raw SQL oder History-Routing enthalten |
| Version Impact | Bei Schema-Aenderungen: Migration planen, bei API-Aenderungen: NC-Kompatibilitaetsbereich pruefen |

### /bugfix

| Regel | Details |
|-------|---------|
| Pattern-Check | Vor Fix bestehende Patterns analysieren — oft liegt der Bug in Abweichung vom Pattern |
| Deploy nach Build | Nach jedem Build automatisch in Docker-Container deployen: `docker exec -u www-data nextcloud-dev php occ maintenance:repair` |
| NC-API pruefen | Bei API-bezogenen Bugs: Interface-Signatur im Container verifizieren (APIs aendern sich zwischen NC-Majors) |
| Bool-Handling | Bei DB-Bugs: Bool als SmallInt pruefen (MySQL-Kompatibilitaet) |

### /validate

| Regel | Details |
|-------|---------|
| Build Output pruefen | `npm run build` muss `js/worktime-main.js` erzeugen |
| PHP-Lint im Container | `docker exec -t nextcloud-dev php -l ...` weil PHP auf macOS nicht installiert |
| info.xml validieren | Pflicht-Felder pruefen: id, name, summary, description, version, licence, author, namespace, category, dependencies |
| Version-Sync | info.xml Version == package.json Version |

### /scaffold

| Regel | Details |
|-------|---------|
| Controller | `extends OCP\AppFramework\Controller`, `#[NoAdminRequired]` Attribute, DI ueber Constructor |
| Service + Mapper Paar | Immer zusammen generieren — Controller → Service → Mapper Schichtung |
| Entity | `extends OCP\AppFramework\Db\Entity`, Getter/Setter automatisch, `addType()` im Constructor |
| Migration | `extends SimpleMigrationStep`, Naming: `VersionXXXYYYDateYYYYMMDDHHMMSS`, nur Schema Builder |
| Tabellennamen | Prefix mit App-ID: `worktime_<tablename>` |
| Route hinzufuegen | Neuen Controller in `appinfo/routes.php` registrieren |
| Vue Component | @nextcloud/vue Komponenten nutzen (NcAppContent, NcButton, etc.), Hash-Routing |

### /changelog

| Regel | Details |
|-------|---------|
| Version aus info.xml | Version aus `appinfo/info.xml` lesen, nicht aus package.json |

---

## Agent-Kontext

> **Diese Informationen werden von allen Agenten (code-reviewer, debugger, research-analyst, etc.) gelesen wenn sie an diesem Projekt arbeiten.** Keine separaten NC-Agenten noetig.

### Kern-Wissen fuer alle Agenten

- **Runtime:** Die App laeuft INNERHALB von Nextcloud (PHP), nicht als eigenstaendiger Service
- **Kein Docker fuer die App:** Docker wird nur als Entwicklungsumgebung genutzt (Nextcloud-Instanz im Container)
- **API-Einschraenkung:** Nur `OCP\*` APIs erlaubt, niemals `OC\*` (privat, instabil)
- **DB-Zugriff:** Nur ueber OCP Query Builder, kein raw SQL, kein eigenes ORM
- **Frontend:** Vue 3 mit @nextcloud/vue 9 Komponenten, Hash-Routing, Vite
- **Auth:** Bereitgestellt vom Host — `OCP\IUserSession`, kein eigenes Auth-System
- **Lizenz:** AGPL-3.0-or-later ist Pflicht (App Store)
- **Build-Output committen:** `js/` Verzeichnis mit kompiliertem JS muss committed werden

### Fuer code-reviewer

- Pruefe ob nur `OCP\*` APIs genutzt werden (keine `OC\*`)
- Pruefe ob DB-Zugriff nur ueber Query Builder laeuft
- Pruefe ob Type Hints in PHP vorhanden sind
- Pruefe ob neue Routes in `appinfo/routes.php` registriert sind
- Pruefe ob `#[NoAdminRequired]` korrekt gesetzt ist
- Pruefe ob AGPL-Header in neuen Dateien vorhanden ist

### Fuer debugger

- PHP-Fehler im Docker-Container pruefen: `docker exec -t nextcloud-dev tail -f /var/www/html/data/nextcloud.log`
- OCP-API Signaturen im Container verifizieren bevor Fixes vorgeschlagen werden
- Bool-Handling (MySQL SmallInt vs. Boolean) bei DB-Problemen pruefen
- Bei Integrity-Fehlern: `FILE_MISSING` = Datei im Tarball aber nicht auf Disk, `EXTRA_FILE` = Datei auf Disk aber nicht im Tarball

### Fuer security-auditor

- CSRF wird vom NC-Framework erzwungen (`requesttoken` Header)
- XSS: Vue safe by default, in PHP `p()` / `print_unescaped()` pruefen
- SQL Injection: Nur Query Builder, raw SQL ist verboten
- Keine Secrets in `info.xml` oder committed JS

### Fuer research-analyst

- NC-Dokumentation: https://docs.nextcloud.com/server/latest/developer_manual/
- OCP-APIs verifizieren via: `docker exec -t nextcloud-dev cat /var/www/html/lib/public/<Interface>.php`
- @nextcloud/* Pakete: `node_modules/@nextcloud/<pkg>/` einsehen
- Context7 fuer aktuelle @nextcloud/vue Dokumentation nutzen
