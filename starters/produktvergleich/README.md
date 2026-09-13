# Produktvergleich

Zwei oder drei Produkte nebeneinander ansehen und ihre Unterschiede erkennen.

**Dies ist ein startbares Gerüst.** CSV-Import, Beispieldaten, Datenvorschau und Oberfläche sind vorbereitet. Die eigentliche Fachfunktion ist bewusst noch offen und wird von Dir mit Claude Code gebaut.

Die Anwendung läuft für sich auf Deinem Rechner. Sie benötigt keine Shop-, PIM-, ERP- oder Datenbankanbindung und keinen KI-Schlüssel. Alle Beispieldaten sind erfunden. Claude Code hilft bei der Entwicklung; der fertige Prototyp verwendet keine KI. Für die Grundaufgabe sind etwa 30–45 Minuten mit bereits eingerichteter Umgebung vorgesehen; das ist ein Richtwert.

## Der einfachste Weg: Claude den Auftrag geben

1. ZIP vollständig entpacken. Öffne genau diesen Ordner, in dem diese README und `package.json` liegen.
2. Starte Claude Code in diesem Ordner. Im Terminal lautet der Befehl `claude`. Die Installation und der Zugang müssen bereits eingerichtet sein.
3. Kopiere diesen Auftrag in Claude Code (nicht als normalen Terminal-Befehl):

```text
Lies zuerst CLAUDE.md, README.md und README.json in diesem Ordner. Baue die Grundaufgabe „Produktvergleich“ vollständig. Implementiere die Fachlogik in src/aufgabe.ts und verbinde sie mit der vorhandenen Oberfläche. Nutze die mitgelieferten Beispieldaten und arbeite ohne externe Dienste, Anmeldung oder API-Schlüssel. Arbeite die Abnahmekriterien ab und lasse npm test, npm run test:ziel und npm run build erfolgreich durchlaufen. Behebe dabei gefundene Fehler. Starte anschließend die lokale Vorschau und nenne mir die genaue URL. Erkläre mir das Ergebnis kurz ohne Fachjargon. Frag nur nach, wenn dir eine notwendige Entscheidung fehlt. Zusatzaufgaben baust du erst, wenn ich sie ausdrücklich auswähle.
```

Wenn Claude in diesem Projekt gestartet wurde, genügt später auch „Bau die Grundaufgabe aus README.json“. `CLAUDE.md` enthält die automatisch geladenen Projektanweisungen. Der ausführliche Auftrag oben macht den Kontext zusätzlich eindeutig.

## Voraussetzungen einmal prüfen

- Node.js 24 LTS wird empfohlen; dieses Kit setzt mindestens Node 22.12 voraus. npm gehört zur üblichen Node-Installation.
- Claude Code ist installiert, angemeldet und darf diesen Projektordner bearbeiten. Verwende den von Eurer IT vorgesehenen Zugang.
- Für den Download der Pakete ist Internet nötig. Nach der Installation arbeitet die App lokal ohne externe Dienste. Claude-Anfragen benötigen weiterhin den eingerichteten KI-Zugang.
- Du brauchst für ZIP-Download und lokales Ausprobieren kein GitHub-Konto und kein Git.

## Manuell starten: Windows und Mac

**Windows:** ZIP über „Alle extrahieren“ entpacken. Im entpackten Projektordner Rechtsklick → „Im Terminal öffnen“. Alternativ PowerShell öffnen und `cd "C:\Users\DeinName\Downloads\produktvergleich"` eingeben; ersetze den Pfad durch Deinen echten Ordner. Bei einer gesperrten `npm.ps1` kannst Du die mitinstallierte `npm.cmd` statt `npm` verwenden; IT-Vorgaben bleiben bestehen.

**Mac:** ZIP per Doppelklick entpacken. Terminal öffnen, `cd ` (mit Leerzeichen) tippen, den Projektordner aus dem Finder ins Terminal ziehen und Enter drücken. Ein möglicher Pfad lautet `cd "$HOME/Downloads/produktvergleich"`.

Prüfe die Umgebung und führe die Befehle einzeln im normalen Terminal aus:

```sh
node --version
npm --version
npm ci
npm run dev
```

`npm ci` installiert die im Lockfile festgehaltenen Pakete. `npm run dev` startet die Vorschau. Öffne die im Terminal genannte Adresse, meist `http://127.0.0.1:5173`. Falls der Port belegt ist, nennt Vite einen anderen. Das Terminal muss offen bleiben. Mit **Strg+C** stoppst Du den Server.

Für Claude ein **zweites Terminal im selben Ordner** öffnen und dort `claude` starten. Wenn Du später zurückkommst, genügt normalerweise `npm run dev`; erneut installieren musst Du bei geänderten Abhängigkeiten oder einem frisch entpackten Ordner.

## Was bereits funktioniert und was gebaut wird

Vorbereitet sind eine React-Oberfläche, CSV-Import mit verständlichen Fehlermeldungen, Datenvorschau, zwei Beispieldateien, fachliche Bedienelemente und ein CSV-Export-Helfer. Die Funktion in `src/aufgabe.ts` wirft im Starter absichtlich eine Bauaufgabe-Meldung. `WORKSHOP_READY = false` hält die unfertige Ergebnisanzeige gesperrt.

Die Grundaufgabe:

1. Genau 2 oder 3 verschiedene Produkte vergleichen; Auswahl über Artikelnummer.
2. Zeilen für Kategorie, Anwendung, Stromversorgung, Gewicht und Preis anzeigen; Produktnamen stehen im Tabellenkopf.
3. Fehlende Werte als „Keine Angabe“ zeigen. Zahlen vor dem Vergleich normalisieren: 1,50 und 1.5 sind gleich.
4. Unterschiedlich bedeutet: mindestens zwei normalisierte Werte sind verschieden. Zwei fehlende Werte gelten als gleich, fehlend gegen gefüllt als verschieden.
5. CSV-Export enthält genau die gewählten Produkte und die angezeigten Merkmale.

Claude ergänzt `src/aufgabe.ts`, verbindet bei Bedarf die Oberfläche und setzt `WORKSHOP_READY` auf `true`, sobald die Grundfunktion fertig ist. Die Lösung muss aus der geladenen CSV rechnen und mit anderen passenden Dateien funktionieren.

## Im Browser prüfen

1. Lade die erste Beispieldatei über ihren Knopf. Öffne die Datenvorschau.
2. Nutze die Fachfunktion und vergleiche mit den erwarteten Ergebnissen unten.
3. Lade die zweite Beispieldatei. Alle Ergebnisse und Auswahlen müssen zur neuen Datei passen.
4. Lade eine eigene kleine CSV nach `DATEN.md`. Probiere auch eine leere Datei oder eine fehlende Pflichtspalte: Die App muss den Fehler erklären.
5. Exportiere das Ergebnis. Öffne die heruntergeladene CSV in einem Texteditor oder Tabellenprogramm und vergleiche Zeilen und Werte mit der Anzeige.
6. Lade die Seite neu: Es sind absichtlich keine Daten mehr geladen. Die App hat keinen dauerhaften Speicher.

Erwartete Ergebnisse:

- DEMO-A und DEMO-B: Anwendung und Kategorie gleich, Stromversorgung/Gewicht/Preis unterschiedlich.
- DEMO-A und DEMO-C: fehlendes Gewicht sichtbar; Preis 149,00 und 149.0 gilt als gleich.
- Mit produktkatalog-zwei.csv funktioniert die Auswahl ohne Änderungen am Code.

## Automatische Prüfungen

```sh
npm test
npm run test:ziel
npm run build
```

- `npm test` prüft den vorbereiteten CSV-Unterbau und muss schon im Starter bestehen.
- `npm run test:ziel` prüft die gewünschte Fachfunktion. **Im unveränderten Starter schlägt dieser Befehl absichtlich fehl.** Erst die von Claude gebaute Lösung muss ihn bestehen. Das ist keine kaputte Installation.
- `npm run build` prüft TypeScript und erzeugt die lokale Produktionsfassung im Ordner `dist`. Das veröffentlicht nichts. Mit `npm run preview` kannst Du den Build lokal ansehen. `index.html` nicht einfach per Doppelklick öffnen.

Grüne Tests ersetzen nicht den eigenen Browser- und Exportversuch. Die Tests dürfen nicht gelöscht oder abgeschwächt werden, um ein grünes Ergebnis zu bekommen.

## Die wichtigsten Dateien

| Datei | Zweck |
| --- | --- |
| `README.md` | Diese Anleitung für Menschen. |
| `README.json` | Maschinenlesbarer Auftrag mit Regeln, Datenformat, Befehlen und Abnahme. |
| `README.schema.json` | JSON Schema zur Prüfung des Aufgabenvertrags. |
| `CLAUDE.md` / `AGENTS.md` | Hinweise für Claude Code bzw. andere Coding-Assistenten. |
| `DATEN.md` | Bedeutung jeder CSV-Spalte und konkrete Beispielergebnisse. |
| `src/aufgabe.ts` | Die Fachfunktion, an der gebaut wird. |
| `src/App.tsx` / `src/style.css` | Bedienoberfläche und Aussehen. |
| `src/csv.ts` | Vorbereiteter Import und Export. |
| `tests/ziel.test.ts` | Prüffälle für die fertige Fachfunktion. |
| `public/beispiele/` | Zwei unabhängige, erfundene CSV-Beispiele. |
| `package.json` / `package-lock.json` | Startbefehle und festgehaltene Paketversionen. |

React baut die sichtbare Oberfläche. TypeScript ist JavaScript mit zusätzlichen Typprüfungen. Node führt hier die Entwicklungswerkzeuge aus. npm installiert deren Pakete. Vite betreibt die lokale Vorschau. Git kann funktionierende Projektstände festhalten; ein Commit lädt nichts automatisch zu GitHub hoch.

## Wenn etwas hakt

| Meldung oder Situation | Nächster Schritt |
| --- | --- |
| `node`, `npm` oder `claude` nicht gefunden | Installation mit der IT prüfen und ein neues Terminal öffnen. |
| `package.json` fehlt / ENOENT | In den entpackten Kit-Ordner wechseln, nicht in den äußeren Downloadordner. |
| Installation hängt an Proxy oder Zertifikat | Exakte Fehlermeldung mit Micha/IT prüfen; Sicherheitsvorgaben nicht abschalten. |
| Port 5173 belegt | Die tatsächlich angezeigte andere URL öffnen. |
| Browser meldet keine Verbindung | Läuft `npm run dev` noch? Stimmen URL und Port? |
| Die Fachfunktion ist gesperrt | Im Starter normal: Claude muss die Grundaufgabe umsetzen. |
| Rote Fachtests | Vor der Umsetzung beabsichtigt; danach Fehlermeldung an Claude geben. |
| Umlaute oder Spalten falsch | CSV als UTF-8 speichern; Trennzeichen und Kopfzeile mit DATEN.md vergleichen. |
| Meine Daten sind nach Neuladen weg | Gewollt: Die App speichert nichts dauerhaft. CSV erneut laden. |

Ein hilfreicher Folgeauftrag lautet: „Das sollte passieren: … Tatsächlich passiert: … Hier ist die genaue Meldung. Prüfe die Ursache, behebe sie und teste erneut.“

## Für Schnellere

- Bonus: Produktberater mit drei Fragen (BONUS.md).
- Nur Unterschiede anzeigen oder Vergleich drucken.

Erst die Grundaufgabe abschließen, dann eine Erweiterung ausdrücklich auswählen. Keine Unternehmensanbindung nötig.

## Daten und Nutzung

Die App sendet importierte Daten an keinen externen Dienst. Sie hält sie nur im Browser-Speicher bis zum Neuladen. Der Entwicklungsassistent ist davon getrennt: Dateien oder Inhalte, die Du Claude gibst, werden entsprechend dessen Zugang verarbeitet. Für diesen Workshop sind die mitgelieferten erfundenen Daten ausreichend.

Workshop-Code: MIT-Lizenz, siehe LICENSE. Die Projektbezeichnung bezeichnet den Workshop-Kontext und ist keine offizielle Festool-Software oder Herstellerempfehlung.
