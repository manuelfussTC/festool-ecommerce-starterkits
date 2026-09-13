# Datenformat: Shop-Reporting

Die Dateien in `public/beispiele/` sind vollständig erfunden. Namen, Preise und Kennzahlen beschreiben keine echten Festool-Produkte. Jede Datei ist ein unabhängiger Datensatz; ein Import ersetzt den vorherigen Inhalt.

UTF-8 (mit oder ohne BOM), eine Kopfzeile, Komma oder Semikolon. Bei Dezimalkomma am besten Semikolon verwenden. Text mit Trennzeichen, Zeilenumbruch oder Anführungszeichen muss in CSV-Anführungszeichen stehen; innere Anführungszeichen verdoppeln. Leere Zeilen ignorieren wir. Spaltennamen sind exakt und eindeutig; zusätzliche Spalten sind erlaubt und werden nicht ausgewertet. Grenzwerte: 2 MB und 5.000 Datensätze. Leerzeichen am Rand werden entfernt.

| Spalte | Bedeutung und Regel |
| --- | --- |
| `artikelnummer` | Pflichtfeld und eindeutig. Eine Zeile pro Artikel und ausgewähltem Zeitraum. |
| `name` | Pflichtfeld: Produktname. |
| `kategorie` | Pflichtfeld; Filter verwendet exakten Wert. |
| `besuche` | Nicht negative ganze Zahl ohne Tausendertrennzeichen. |
| `bestellungen` | Nicht negative ganze Zahl. Gezählt werden Bestellungen, die diesen Artikel enthalten. |
| `umsatz_eur` | Nicht negative Dezimalzahl ohne Tausendertrennzeichen. Fiktiver Artikelumsatz in EUR; Punkt oder Komma. |
## Fachregeln

1. Bestellquote = bestellungen / besuche × 100. Bei 0 Besuchen null/„Nicht berechenbar“, niemals Infinity oder NaN.
2. Bestellquote ist eine Kennzahl dieser CSV, keine allgemeine Shop-Conversion-Rate. Mehrere Bestellungen pro Besuch sind möglich; Werte über 100 % nicht abschneiden.
3. Auffällig: besuche >= Mindestbesuche UND berechenbare Bestellquote < Grenzwert. Standard: 500 Besuche und 2 %.
4. Filter für Suche und Kategorie gelten auch für Summen, auffällige Zeilen und Export.
5. Gesamtquote = Summe Bestellungen / Summe Besuche × 100; kein Durchschnitt der Einzelquoten. Bei Gesamtsumme 0 Besuchen ebenfalls null.
6. Einen Zeitraum pro Import anzeigen; eine neue Datei ersetzt die vorherige. Umsatz ist kein Gewinn und erklärt keine Ursache.

## Prüfdaten

- Juli ohne Filter: 2.600 Besuche, 83 Bestellungen, 8.440 EUR und rund 3,19 % Gesamtquote.
- Standardgrenzen im Juli: nur DEMO-B auffällig (800 Besuche, 8 Bestellungen, 1 %).
- Juli Kategorie Schleifer: 1.800 Besuche, 48 Bestellungen und 2,67 % Quote.
- August ohne Filter: 2.200 Besuche und 95 Bestellungen. DEMO-C mit 0 Besuchen hat keine berechenbare Quote.

## Export

UTF-8 mit BOM, Semikolon und geschützten Feldern. Unbekannte Angaben werden ausdrücklich bezeichnet. Texte, die ein Tabellenprogramm als Formel lesen könnte, erhalten ein vorangestelltes Apostroph. CSV-Ausgaben enthalten die aktuellen Ergebnisse, keine ausgeblendeten Originaldatensätze. Der Browser lädt eine Datei herunter; der Eingabedatensatz wird nicht überschrieben.
