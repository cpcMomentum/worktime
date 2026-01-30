# WorkTime Deployment auf VPS

## Quelle

Die Dateien werden per rsync vom lokalen Rechner gesendet nach:
```
/var/www/nextcloud/custom_apps/worktime/
```

## Nach dem Kopieren ausführen

```bash
# 1. Berechtigungen setzen
sudo chown -R www-data:www-data /var/www/nextcloud/custom_apps/worktime/

# 2. App aktivieren (falls noch nicht aktiv)
sudo -u www-data php /var/www/nextcloud/occ app:enable worktime

# 3. Datenbank-Migrationen ausführen
sudo -u www-data php /var/www/nextcloud/occ maintenance:repair

# 4. Optional: Status prüfen
sudo -u www-data php /var/www/nextcloud/occ app:list | grep worktime
```

## Bei Problemen

```bash
# Logs prüfen
tail -f /var/www/nextcloud/data/nextcloud.log

# App deaktivieren/reaktivieren
sudo -u www-data php /var/www/nextcloud/occ app:disable worktime
sudo -u www-data php /var/www/nextcloud/occ app:enable worktime
```

## Verzeichnisstruktur (was deployed wird)

```
worktime/
├── appinfo/      ← App-Metadaten + Routes
├── css/          ← Stylesheets
├── img/          ← Icons
├── js/           ← Kompiliertes JavaScript
├── l10n/         ← Übersetzungen
├── lib/          ← PHP Backend
├── templates/    ← PHP Templates
└── vendor/       ← PHP Dependencies
```
