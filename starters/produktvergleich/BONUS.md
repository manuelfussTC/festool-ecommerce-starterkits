# Zusatzaufgabe: Ein kleiner Produktberater

Für alle, deren Produktvergleich bereits funktioniert. Richtzeit: 60–90 Minuten. Die Referenzlösung der Grundaufgabe enthält diesen Bonus bewusst noch nicht.

Aus drei Antworten soll das Tool bis zu drei passende Produkte aus der vorhandenen CSV auswählen. Ein Kunde muss keine technischen Tabellen durchsuchen. Die Empfehlung bleibt durch sichtbare Regeln nachvollziehbar.

## Auftrag für Claude

```text
Lies BONUS.md und BONUS.json. Erweitere den fertigen Produktvergleich um den beschriebenen Produktberater mit drei Fragen. Nutze die vorhandenen Katalogdaten, explizite Filterregeln und verständliche Gründe. Baue keine KI-API oder externe Anbindung ein. Implementiere automatisierte Tests für alle Bonus-Szenarien und teste anschließend im Browser.
```

## Die drei Fragen

1. Was möchtest Du machen? Schleifen, Sägen oder Bohren.
2. Welche Stromversorgung brauchst Du? Akku, Kabel oder egal.
3. Wie hoch ist Dein Budget in Euro?

## Regeln

- Alle drei gewählten Bedingungen müssen erfüllt sein.
- Nach aufsteigendem Preis sortieren; bei gleichem Preis nach Artikelnummer. Höchstens drei Treffer zeigen.
- Für jeden Treffer die drei erfüllten Regeln anhand der tatsächlichen CSV-Werte erklären. Keine Eignung oder Produkteigenschaft erfinden.
- Fehlendes Gewicht schließt nicht aus; in der Anzeige bleibt es „Keine Angabe“. Anwendung, gewählte Stromversorgung und Preis müssen die Regeln erfüllen.
- Bei keinem Treffer „Kein passendes Produkt in diesem Katalog“ mit Hinweis auf geänderte Suchkriterien zeigen. Keine automatische Lockerung der Regeln.
- Bei einem Treffer eine Ergebnisansicht mit Export anbieten; bei zwei oder drei Treffern zusätzlich den vorhandenen Vergleich verwenden.
- Fragen, Treffer und Begründung exportieren. Grundaufgabe und deren Tests müssen weiterhin funktionieren.

Die Anwendung muss genau passen, bei einer konkreten Stromversorgung auch deren Wert. Preis muss vorhanden und kleiner oder gleich dem Budget sein. Keine der Fragen benutzt eine KI-API. Der Datensatz ist ausdrücklich fiktiv und bildet keine echten Hersteller-Kompatibilitäten oder Beratungsempfehlungen ab.

## Fertig, wenn …

Die Szenarien in `BONUS.json` bestehen automatisiert und im Browser. Zusätzlich die dortigen Randfälle prüfen. Für „Schleifen, egal, bis 150 EUR“ lautet die sortierte Auswahl DEMO-B, DEMO-A, DEMO-C. „Sägen, Akku, bis 200 EUR“ ergibt keinen Treffer. „Bohren, Kabel, bis 100 EUR“ ergibt genau DEMO-E; auch ein einzelner Treffer muss verständlich gezeigt und exportiert werden.

Der Export hält Fragen, Auswahl und Begründung fest. Die bisherigen Funktionen des Produktvergleichs und alle Grundtests bleiben nutzbar.
