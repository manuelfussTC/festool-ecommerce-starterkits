# Datenformat: Produktdaten-Check

Die Dateien in `public/beispiele/` sind vollständig erfunden. Namen, Preise und Kennzahlen beschreiben keine echten Festool-Produkte. Jede Datei ist ein unabhängiger Datensatz; ein Import ersetzt den vorherigen Inhalt.

UTF-8 (mit oder ohne BOM), eine Kopfzeile, Komma oder Semikolon. Bei Dezimalkomma am besten Semikolon verwenden. Text mit Trennzeichen, Zeilenumbruch oder Anführungszeichen muss in CSV-Anführungszeichen stehen; innere Anführungszeichen verdoppeln. Leere Zeilen ignorieren wir. Spaltennamen sind exakt und eindeutig; zusätzliche Spalten sind erlaubt und werden nicht ausgewertet. Grenzwerte: 2 MB und 5.000 Datensätze. Leerzeichen am Rand werden entfernt.

| Spalte | Bedeutung und Regel |
| --- | --- |
| `artikelnummer` | Pflichtfeld; Leerzeichen am Rand ignorieren. Doppelte Werte exakt und unabhängig von Groß-/Kleinschreibung prüfen. |
| `name` | Pflichtfeld: Produktname. |
| `beschreibung` | Pflichtfeld: kurze Beschreibung. |
| `lieferumfang` | Pflichtfeld: enthaltene Teile. |
| `bildreferenz` | Pflichtfeld: Dateiname oder Textreferenz. Nur auf Vorhandensein prüfen, keine URL aufrufen. |
## Fachregeln

1. Jedes leere Pflichtfeld erzeugt genau einen Eintrag mit Datensatznummer, Artikelnummer, Feld und Grund.
2. Bei doppelten Artikelnummern jede betroffene Zeile zusätzlich markieren; leere Nummern nicht als Duplikat zählen.
3. Datensatz 1 ist die erste Datenzeile nach der Kopfzeile. Mehrzeilige CSV-Felder zählen als ein Datensatz.
4. Die Eingabedaten niemals verändern. Saubere Dateien ausdrücklich mit null Problemen anzeigen.

## Prüfdaten

- produkte-mit-fehlern.csv: 7 Probleme in 4 von 5 Datensätzen.
- produkte-sauber.csv: 0 Probleme in 3 Datensätzen.
- CSV-Export enthält alle angezeigten Probleme und verständliche Spaltennamen.

## Export

UTF-8 mit BOM, Semikolon und geschützten Feldern. Unbekannte Angaben werden ausdrücklich bezeichnet. Texte, die ein Tabellenprogramm als Formel lesen könnte, erhalten ein vorangestelltes Apostroph. CSV-Ausgaben enthalten die aktuellen Ergebnisse, keine ausgeblendeten Originaldatensätze. Der Browser lädt eine Datei herunter; der Eingabedatensatz wird nicht überschrieben.
