# Prüfplan

## Vor Veröffentlichung

- Jedes Kit aus eigenem Ordner installieren (npm ci), Basistests und Build prüfen.
- Im unveränderten Starter prüfen, dass Fachtests erwartungsgemäß fehlschlagen und die Oberfläche nichts als bereits fertig ausgibt.
- In jeder Referenz alle Fachtests bestehen. Beide Beispiel-CSV-Dateien im Browser laden und deren erwartete Ergebnisse mit README.json vergleichen.
- CSV-Import mit Kopfzeilenfehlern, leeren Dateien, Zitaten, Umlauten, Zeilenumbrüchen und fehlenden Werten prüfen.
- Auswahl, Filter, Grenzwerte, leere Ergebnisse und Export überprüfen; Export mit Anzeige vergleichen.
- Mindestens ein frisch entpacktes Starter-ZIP ohne Nachbarordner installieren, bauen und starten. Alle ZIPs auf eigene Anleitungen, Lockfile und Beispieldateien prüfen.
- README.json jedes Projekts gegen README.schema.json validieren. Lokale relative Links und Release-Dateinamen prüfen.

## Nach Veröffentlichung

GitHub-Repository und Release tatsächlich abrufen. ZIPs erneut herunterladen, Prüfsummen und Inhalte mit den lokalen Veröffentlichungsartefakten vergleichen. CI für alle sieben Projekte überprüfen.

Browser- und Betriebssystemgrenzen offen benennen: Lokale macOS-Prüfungen bestätigen keine unternehmensspezifische Windows-Konfiguration. Diese wird vor dem Workshop durch Micha/IT geklärt.
