# Datenformat: Produktvergleich

Die Dateien in `public/beispiele/` sind vollständig erfunden. Namen, Preise und Kennzahlen beschreiben keine echten Festool-Produkte. Jede Datei ist ein unabhängiger Datensatz; ein Import ersetzt den vorherigen Inhalt.

UTF-8 (mit oder ohne BOM), eine Kopfzeile, Komma oder Semikolon. Bei Dezimalkomma am besten Semikolon verwenden. Text mit Trennzeichen, Zeilenumbruch oder Anführungszeichen muss in CSV-Anführungszeichen stehen; innere Anführungszeichen verdoppeln. Leere Zeilen ignorieren wir. Spaltennamen sind exakt und eindeutig; zusätzliche Spalten sind erlaubt und werden nicht ausgewertet. Grenzwerte: 2 MB und 5.000 Datensätze. Leerzeichen am Rand werden entfernt.

| Spalte | Bedeutung und Regel |
| --- | --- |
| `artikelnummer` | Pflichtfeld und eindeutig (exakt, Groß-/Kleinschreibung beachten). |
| `name` | Pflichtfeld: Produktname. |
| `kategorie` | Kategorie als Text; darf fehlen. |
| `anwendung` | Für die Bonusaufgabe: schleifen, saegen oder bohren; darf fehlen. |
| `stromversorgung` | akku oder kabel; darf fehlen. |
| `gewicht_kg` | Nicht negative Dezimalzahl ohne Tausendertrennzeichen; höchstens zwei Nachkommastellen, Punkt oder Komma. Leer bedeutet unbekannt. |
| `preis_eur` | Fiktiver Übungspreis in Euro; gleiche Zahlenregeln wie Gewicht. Leer bedeutet unbekannt. |

Gewicht und Preis dürfen höchstens zwei Nachkommastellen haben. Fehlende Zahlen bleiben unbekannt und werden nicht durch null ersetzt.

## Fachregeln

1. Genau 2 oder 3 verschiedene Produkte vergleichen; Auswahl über Artikelnummer.
2. Zeilen für Kategorie, Anwendung, Stromversorgung, Gewicht und Preis anzeigen; Produktnamen stehen im Tabellenkopf.
3. Fehlende Werte als „Keine Angabe“ zeigen. Zahlen vor dem Vergleich normalisieren: 1,50 und 1.5 sind gleich.
4. Unterschiedlich bedeutet: mindestens zwei normalisierte Werte sind verschieden. Zwei fehlende Werte gelten als gleich, fehlend gegen gefüllt als verschieden.
5. CSV-Export enthält genau die gewählten Produkte und die angezeigten Merkmale.

## Prüfdaten

- DEMO-A und DEMO-B: Anwendung und Kategorie gleich, Stromversorgung/Gewicht/Preis unterschiedlich.
- DEMO-A und DEMO-C: fehlendes Gewicht sichtbar; Preis 149,00 und 149.0 gilt als gleich.
- Mit produktkatalog-zwei.csv funktioniert die Auswahl ohne Änderungen am Code.

## Export

UTF-8 mit BOM, Semikolon und geschützten Feldern. Unbekannte Angaben werden ausdrücklich bezeichnet. Texte, die ein Tabellenprogramm als Formel lesen könnte, erhalten ein vorangestelltes Apostroph. CSV-Ausgaben enthalten die aktuellen Ergebnisse, keine ausgeblendeten Originaldatensätze. Der Browser lädt eine Datei herunter; der Eingabedatensatz wird nicht überschrieben.
