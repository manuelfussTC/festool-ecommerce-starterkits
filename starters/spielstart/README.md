# Spielstart

Dieses Paket ist ein startbares React-Projekt für die gemeinsame Spielrunde. Das Spiel selbst baust Du mit Claude Code. Ziel: In etwa 30 Minuten etwas Spielbares haben. Du brauchst keine Firmenanbindung und kein GitHub-Konto.

## Mit Claude starten

ZIP vollständig entpacken. Öffne ein Terminal genau in dem Ordner, in dem diese README und package.json liegen. Starte `claude` und kopiere den folgenden Auftrag in Claude Code:

```text
Lies zuerst CLAUDE.md, README.md und README.json in diesem Ordner. Baue das Spiel Schraubenfang vollständig nach der beschriebenen Aufgabe. Nutze die mitgelieferten Beispieldaten und arbeite ohne externe Dienste, Anmeldung oder API-Schlüssel. Prüfe die Spielregeln im Browser. Behebe dabei gefundene Fehler. Starte anschließend die lokale Vorschau und nenne mir die genaue URL. Erkläre mir das Ergebnis kurz ohne Fachjargon. Frag nur nach, wenn dir eine notwendige Entscheidung fehlt. Zusatzaufgaben baust du erst, wenn ich sie ausdrücklich auswähle.
```

## Manuell starten

Vorausgesetzt sind Node.js 24 LTS (mindestens 22.12), npm sowie ein eingerichteter Claude-Code-Zugang. Für npm ci ist ein Paketdownload nötig. Die fertige App braucht keine externe Verbindung. Claude selbst verwendet den eingerichteten KI-Zugang.

Unter Windows ZIP mit „Alle extrahieren“ entpacken und im Projektordner „Im Terminal öffnen“ wählen. Unter Mac im Terminal `cd ` tippen, den entpackten Ordner hineinziehen und Enter drücken. Dann im normalen Terminal einzeln:

```sh
node --version
npm --version
npm ci
npm run dev
```

Öffne die angezeigte URL, meist http://127.0.0.1:5173. Halte dieses Terminal offen. Claude kannst Du in einem zweiten Terminal im gleichen Ordner mit `claude` starten. Mit Strg+C stoppst Du die Vorschau. Unter Windows kann bei gesperrter npm.ps1 die npm.cmd verwendet werden. Bei Proxy- oder Installationsfehlern die IT fragen; deren Vorgaben beibehalten.

## Grundaufgabe: Schraubenfang

1. Ein Korb bewegt sich mit den Pfeiltasten nach links und rechts und bleibt im Spielfeld.
2. Schrauben fallen von oben. Jede gefangene Schraube gibt genau einen Punkt; verpasste Schrauben verschwinden ohne Punkt.
3. Eine Runde dauert 30 Sekunden. Danach stoppen Bewegung und Punkte, der Endstand bleibt sichtbar.
4. Neustart setzt Punkte und Zeit zurück. Vorherige Timer dürfen nicht weiterlaufen.
5. Startseite erklärt Steuerung, Start, Zeit und Punkte. Das Spiel läuft ohne externe Bilder oder Dienste.

Die Oberfläche in src/App.tsx zeigt zunächst nur den Auftrag. Claude baut Spielzustand und Bedienung. Alternativ kannst Du vor dem Bauen ausdrücklich Reaktionstest, Memory oder Quiz wählen und die Regeln gemeinsam ändern. Danach README.json und Tests auf die neue Spielidee abstimmen.

## Fertig prüfen

Starte eine Runde, bewege den Korb, fange eine Schraube und überprüfe den Punktestand. Warte volle 30 Sekunden: Bewegung und Punkte müssen stoppen. Starte dreimal neu: Jede Runde beginnt bei null Punkten und 30 Sekunden. Lass eine andere Person ohne Erklärung spielen.

```sh
npm test
npm run test:ziel
npm run build
```

Der Basistest prüft den vorbereiteten Auftrag. Der Fachtest schlägt **im Starter absichtlich fehl** und fordert echte Tests für Spielregeln. Claude ersetzt diesen ausdrücklich markierten Platzhalter durch aussagekräftige Tests. Die Grundtests der Fach-Starter haben bereits konkrete Abnahmen und dürfen nicht geändert werden, um eine falsche Lösung durchzulassen. Ein grüner Build veröffentlicht nichts. Zum lokalen Prüfen des Builds dient npm run preview.

## Dateien verstehen

- README.json: maschinenlesbarer Auftrag und Abnahme. README.schema.json prüft dessen Struktur.
- CLAUDE.md: Projektanweisungen, die Claude Code beim Start im Ordner lädt.
- src/App.tsx: sichtbare React-Anwendung. src/style.css: Farben und Abstände.
- tests/ziel.test.ts: Platz für echte Regeln-Tests. package.json: Befehle und Werkzeuge; package-lock.json: konkrete Versionen.

React organisiert die Oberfläche, Node führt Entwicklungswerkzeuge aus, npm installiert Pakete, Vite zeigt die Vorschau. Git ist optional und speichert ausgewählte Projektstände als Commits. Ein Commit lädt nichts automatisch hoch.

## Hilfe

„package.json fehlt“: Prüfe den Ordner. „Befehl nicht gefunden“: Installation prüfen und Terminal neu öffnen. Browser lädt nicht: Läuft npm run dev und ist die URL richtig? Der Port kann von 5173 abweichen. Gib Claude die genaue Fehlermeldung zusammen mit gewünschtem und tatsächlichem Verhalten.

## Extra

Wenn die Runde stabil läuft: Touch-Steuerung ergänzen. Keine neue Anmeldung oder Datenbank nötig. Code unter MIT-Lizenz (LICENSE); das Projekt ist eine Workshop-Übung und keine offizielle Festool-Software.
