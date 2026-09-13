# Teilnehmerseite

`festool/` enthält die statische Download-Seite für https://manuel-fuss.de/festool.

Die Seite bündelt die Präsentation als PDF, vier eigenständige Starter-ZIPs, eine kopierbare Claude-Anweisung und die Produktberater-Zusatzaufgabe. Alle Downloads liegen im Unterordner `downloads/`, damit Teilnehmer ohne GitHub-Zugang arbeiten können. Die PowerPoint mit Moderationsnotizen gehört nicht in den öffentlichen Download-Ordner.

Es gibt keinen Build-Schritt und keine externen JavaScript-Abhängigkeiten. Den Ordner `festool` vollständig in das öffentliche Verzeichnis der bestehenden Website kopieren. Die vorhandene Website und deren Routing-Datei beibehalten; existierende Verzeichnisse werden durch Apache direkt ausgeliefert. Zusätzlich den Ordner im `public/`-Quellverzeichnis der Website halten, damit spätere Builds die Seite übernehmen.

Die beiliegende `.htaccess` deaktiviert Verzeichnislisten und Suchmaschinenindexierung. Die Seite ist über den Link öffentlich zugänglich; noindex ist kein Zugriffsschutz. `materialien.json` enthält Größen und SHA-256-Prüfsummen der Downloads.

Bei einer neuen Präsentation die PDF, die Versionsangabe in `materialien.json` und die Prüfsumme gemeinsam aktualisieren. ZIPs nur durch vollständig getestete Pakete ersetzen. Nach dem Upload die kurze Adresse ohne abschließenden Schrägstrich sowie alle PDF- und ZIP-Links abrufen, Dateitypen und Prüfsummen kontrollieren.
