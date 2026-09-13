# Shop-Reporting - Referenzlösung

Produkte mit vielen Besuchen und wenigen Bestellungen in einer CSV erkennen.

**Diese Fassung ist fertig und dient zum Zeigen, Testen und Helfen.** Für die Bauaufgabe verwende den gleichnamigen Starter.

Die Anwendung läuft für sich auf Deinem Rechner. Sie benötigt keine Shop-, PIM-, ERP- oder Datenbankanbindung und keinen KI-Schlüssel. Alle Beispieldaten sind erfunden. Claude Code hilft bei der Entwicklung; der fertige Prototyp verwendet keine KI. Für die Grundaufgabe sind etwa 30–45 Minuten mit bereits eingerichteter Umgebung vorgesehen; das ist ein Richtwert.

## Der einfachste Weg: Claude den Auftrag geben

1. ZIP vollständig entpacken. Öffne genau diesen Ordner, in dem diese README und `package.json` liegen.
2. Starte Claude Code in diesem Ordner. Im Terminal lautet der Befehl `claude`. Die Installation und der Zugang müssen bereits eingerichtet sein.
3. Kopiere diesen Auftrag in Claude Code (nicht als normalen Terminal-Befehl):

```text
Lies CLAUDE.md und README.json. Dies ist die fertige Referenzlösung. Installiere mit npm ci, prüfe npm test, npm run test:ziel und npm run build und starte npm run dev. Nenne mir die URL. Ändere keine Fachfunktion ohne neuen Auftrag.
```

Wenn Claude in diesem Projekt gestartet wurde, genügt später auch „Bau die Grundaufgabe aus README.json“. `CLAUDE.md` enthält die automatisch geladenen Projektanweisungen. Der ausführliche Auftrag oben macht den Kontext zusätzlich eindeutig.

## Voraussetzungen einmal prüfen

- Node.js 24 LTS wird empfohlen; dieses Kit setzt mindestens Node 22.12 voraus. npm gehört zur üblichen Node-Installation.
- Claude Code ist installiert, angemeldet und darf diesen Projektordner bearbeiten. Verwende den von Eurer IT vorgesehenen Zugang.
- Für den Download der Pakete ist Internet nötig. Nach der Installation arbeitet die App lokal ohne externe Dienste. Claude-Anfragen benötigen weiterhin den eingerichteten KI-Zugang.
- Du brauchst für ZIP-Download und lokales Ausprobieren kein GitHub-Konto und kein Git.

## Manuell starten: Windows und Mac

**Windows:** ZIP über „Alle extrahieren“ entpacken. Im entpackten Projektordner Rechtsklick → „Im Terminal öffnen“. Alternativ PowerShell öffnen und `cd "C:\Users\DeinName\Downloads\shop-reporting"` eingeben; ersetze den Pfad durch Deinen echten Ordner. Bei einer gesperrten `npm.ps1` kannst Du die mitinstallierte `npm.cmd` statt `npm` verwenden; IT-Vorgaben bleiben bestehen.

**Mac:** ZIP per Doppelklick entpacken. Terminal öffnen, `cd ` (mit Leerzeichen) tippen, den Projektordner aus dem Finder ins Terminal ziehen und Enter drücken. Ein möglicher Pfad lautet `cd "$HOME/Downloads/shop-reporting"`.

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

Vorbereitet sind eine React-Oberfläche, CSV-Import mit verständlichen Fehlermeldungen, Datenvorschau, zwei Beispieldateien, fachliche Bedienelemente und ein CSV-Export-Helfer. Die Fachlogik ist in dieser Referenz bereits implementiert.

Die Grundaufgabe:

1. Bestellquote = bestellungen / besuche × 100. Bei 0 Besuchen null/„Nicht berechenbar“, niemals Infinity oder NaN.
2. Bestellquote ist eine Kennzahl dieser CSV, keine allgemeine Shop-Conversion-Rate. Mehrere Bestellungen pro Besuch sind möglich; Werte über 100 % nicht abschneiden.
3. Auffällig: besuche >= Mindestbesuche UND berechenbare Bestellquote < Grenzwert. Standard: 500 Besuche und 2 %.
4. Filter für Suche und Kategorie gelten auch für Summen, auffällige Zeilen und Export.
5. Gesamtquote = Summe Bestellungen / Summe Besuche × 100; kein Durchschnitt der Einzelquoten. Bei Gesamtsumme 0 Besuchen ebenfalls null.
6. Einen Zeitraum pro Import anzeigen; eine neue Datei ersetzt die vorherige. Umsatz ist kein Gewinn und erklärt keine Ursache.

Keine zusätzliche Implementierung nötig: Diese Version dient als Muster.

## Im Browser prüfen

1. Lade die erste Beispieldatei über ihren Knopf. Öffne die Datenvorschau.
2. Nutze die Fachfunktion und vergleiche mit den erwarteten Ergebnissen unten.
3. Lade die zweite Beispieldatei. Alle Ergebnisse und Auswahlen müssen zur neuen Datei passen.
4. Lade eine eigene kleine CSV nach `DATEN.md`. Probiere auch eine leere Datei oder eine fehlende Pflichtspalte: Die App muss den Fehler erklären.
5. Exportiere das Ergebnis. Öffne die heruntergeladene CSV in einem Texteditor oder Tabellenprogramm und vergleiche Zeilen und Werte mit der Anzeige.
6. Lade die Seite neu: Es sind absichtlich keine Daten mehr geladen. Die App hat keinen dauerhaften Speicher.

Erwartete Ergebnisse:

- Juli ohne Filter: 2.600 Besuche, 83 Bestellungen, 8.440 EUR und rund 3,19 % Gesamtquote.
- Standardgrenzen im Juli: nur DEMO-B auffällig (800 Besuche, 8 Bestellungen, 1 %).
- Juli Kategorie Schleifer: 1.800 Besuche, 48 Bestellungen und 2,67 % Quote.
- August ohne Filter: 2.200 Besuche und 95 Bestellungen. DEMO-C mit 0 Besuchen hat keine berechenbare Quote.

## Automatische Prüfungen

```sh
npm test
npm run test:ziel
npm run build
```

- `npm test` prüft den vorbereiteten CSV-Unterbau und muss schon im Starter bestehen.
- `npm run test:ziel` prüft die gewünschte Fachfunktion. In dieser Referenz muss dieser Befehl bestehen.
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

- Vorherigen Monat getrennt laden und Differenzen zeigen.
- Sortierung nach Quote, Besuchen oder Umsatz ergänzen.

Erst die Grundaufgabe abschließen, dann eine Erweiterung ausdrücklich auswählen. Keine Unternehmensanbindung nötig.

## Daten und Nutzung

Die App sendet importierte Daten an keinen externen Dienst. Sie hält sie nur im Browser-Speicher bis zum Neuladen. Der Entwicklungsassistent ist davon getrennt: Dateien oder Inhalte, die Du Claude gibst, werden entsprechend dessen Zugang verarbeitet. Für diesen Workshop sind die mitgelieferten erfundenen Daten ausreichend.

Workshop-Code: MIT-Lizenz, siehe LICENSE. Die Projektbezeichnung bezeichnet den Workshop-Kontext und ist keine offizielle Festool-Software oder Herstellerempfehlung.
