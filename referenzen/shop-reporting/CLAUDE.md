# Arbeitsauftrag für Claude Code: Shop-Reporting

Du arbeitest in einem eigenständigen lokalen Workshop-Projekt für Menschen ohne Entwicklungserfahrung. Antworte auf Deutsch, per Du und erkläre den nächsten sichtbaren Schritt.

## Zuerst lesen

1. `README.json` ist der maschinenlesbare Projektvertrag. Lies ihn ausdrücklich; JSON-Dateien werden nicht automatisch als Anweisung geladen.
2. `README.md` erklärt Start, Ziel, Prüfschritte und Hilfen für Menschen.
3. `DATEN.md`, `src/aufgabe.ts`, `src/App.tsx` und `tests/ziel.test.ts` konkretisieren die Aufgabe.

## Wenn der Mensch „Bau das“ sagt

Lies CLAUDE.md und README.json. Dies ist die fertige Referenzlösung. Installiere mit npm ci, prüfe npm test, npm run test:ziel und npm run build und starte npm run dev. Nenne mir die URL. Ändere keine Fachfunktion ohne neuen Auftrag.

## Vorgehen

- Arbeite ausschließlich im ausgewählten Projekt. Das Kit benötigt keine Dateien aus Nachbarordnern. Referenzlösungen nicht in den Starter kopieren; implementiere die Aufgabenregeln.
- Prüfe zuerst `node --version`, `npm --version` und den Ordner. Empfohlen ist Node.js 24 LTS. Installiere mit `npm ci`.
- Die Referenz ist bereits fertig. Verändere sie nur bei einer konkreten neuen Aufgabe.
- Behalte echte CSV-Verarbeitung, leere Zustände und Fehlermeldungen bei. Keine fest verdrahteten Demo-Ergebnisse oder vorgetäuschten Erfolge.
- Nutze `npm test`, `npm run test:ziel` und `npm run build`. Behebe Fehler und prüfe die Browseroberfläche mit beiden Beispieldateien sowie den Export. Test-Dateien nicht zum Bestehen abschwächen.
- Starte die Vorschau mit `npm run dev` und nenne die tatsächlich angezeigte URL. Der laufende Prozess muss offen bleiben.
- Fasse kurz zusammen, was funktioniert und was noch offen ist. Git-Commit ist lokal möglich; Push oder Deployment nur nach ausdrücklichem Auftrag.
- Zusatzaufgaben erst auf Wunsch. Für Produktberater gelten die Regeln in BONUS.md und BONUS.json.

## Grenzen

Keine externen Dienste, KI-API, Anmeldung, Datenbank, Telemetrie oder Firmenanbindung einbauen. Das fertige Tool arbeitet lokal im Browser. Nur synthetische oder für diesen Zweck freigegebene Daten verwenden. Claude Code selbst benötigt den dafür eingerichteten Zugang und überträgt Inhalte gemäß dessen Einstellungen; die lokale App benötigt ihn nicht.
