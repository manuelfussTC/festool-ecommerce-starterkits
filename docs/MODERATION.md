# Moderationshilfe

## Vor dem Termin

Jedes gewünschte Kit und die Referenz lokal installieren: im jeweiligen Ordner npm ci. Mit der IT prüfen, dass Node.js 24 LTS, npm und Claude Code auf den Teilnehmerrechnern bereitstehen. Ein Paketdownload und der freigegebene Claude-Zugang sind erforderlich. Die lokale Prüfung des Autors ersetzt keinen Test auf Firmenlaptops.

Die vier Starter-ZIPs vorhalten. Ein ZIP pro Teilnehmer reicht; es enthält keine Referenzlösung. Die drei vollständigen Referenzen sind gesondert als Download verfügbar. Für eine Demo genau die gewünschte Referenz starten. Startet mehr als ein Projekt zugleich, nennt Vite abweichende Ports.

## Zwei bis drei kurze Demonstrationen

1. Produktdaten-Check: produkte-mit-fehlern.csv laden, prüfen, 7 Probleme in 4 Datensätzen zeigen, Fehlerliste herunterladen. Danach saubere Datei mit 0 Problemen.
2. Produktvergleich: DEMO-A und DEMO-B wählen; unterschiedliche Stromversorgung, Gewicht und Preis zeigen. DEMO-C demonstriert fehlendes Gewicht und gleichen Preis in anderem Zahlenformat. Vergleich exportieren.
3. Shop-Reporting: Juli laden. 2.600 Besuche, 83 Bestellungen, rund 3,19 % Gesamtquote. DEMO-B ist bei 500 Mindestbesuchen und weniger als 2 % auffällig. Auf Schleifer filtern, dann August laden. Die Gesamtquote ist aus Summen berechnet.

Diese Daten sind erfunden. Die Beispiele zeigen mögliche Werkzeuge fürs E-Commerce-Team und behaupten keine aktuellen Festool-Probleme. Die tatsächlichen Fachregeln bestimmt das Team bei einer späteren eigenen Anwendung.

## Einstieg und freie Arbeit

Spielrunde: 5 Minuten Regeln, 15 Minuten bauen, 5 Minuten testen, 5 Minuten gegenseitig ausprobieren. Danach eigenes Problem wählen oder eines der drei Fach-Kits. Für den leichtesten Einstieg eignet sich Produktdaten-Check.

Wenn jemand „rote Tests“ meldet, zuerst unterscheiden: npm test muss schon im Gerüst grün sein; npm run test:ziel ist im Starter absichtlich rot und wird erst durch die fertige Fachfunktion grün. Beim Spiel werden die echten Spieltests erst während der Umsetzung gebaut.

Schnellere Teilnehmer erweitern den Produktvergleich um den Berater aus BONUS.md. Bei drei Produkten mit gleichen Eigenschaften, fehlendem Gewicht und keinem Treffer lohnt sich das gemeinsame Testen. Ein sauberer Neustart und verständliche Fehlermeldungen sind auch sinnvolle Verbesserungen.
