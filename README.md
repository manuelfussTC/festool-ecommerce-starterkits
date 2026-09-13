# E-Commerce Starter-Kits

Drei kleine Werkzeuge zum Selberbauen mit Claude Code. Für den Festool-Workshop am 15. September 2026, vorbereitet von Manuel Fuß.

**Jedes Kit funktioniert für sich.** Du lädst ein ZIP herunter, entpackst es und gibst Claude den vorbereiteten Auftrag. Keine Shop-, PIM-, ERP- oder Datenbankanbindung. Die fertigen Apps brauchen keinen KI-Schlüssel und keinen Login. Alle Beispieldaten sind frei erfunden.

## Ein Kit auswählen

| Kit | Was Du damit baust | Download |
| --- | --- | --- |
| [Produktdaten-Check](starters/produktdaten-check/README.md) | Produkt-CSV prüfen: Pflichtangaben, doppelte Artikelnummern, Fehlerliste. Einfachster Einstieg. | [ZIP](https://github.com/manuelfussTC/festool-ecommerce-starterkits/releases/latest/download/produktdaten-check.zip) |
| [Produktvergleich](starters/produktvergleich/README.md) | Zwei oder drei Produkte auswählen, Unterschiede sehen, Vergleich exportieren. | [ZIP](https://github.com/manuelfussTC/festool-ecommerce-starterkits/releases/latest/download/produktvergleich.zip) |
| [Shop-Reporting](starters/shop-reporting/README.md) | CSV auswerten und Produkte mit vielen Besuchen und niedriger Bestellquote finden. | [ZIP](https://github.com/manuelfussTC/festool-ecommerce-starterkits/releases/latest/download/shop-reporting.zip) |
| [Spielstart](starters/spielstart/README.md) | Kleines Spiel „Schraubenfang“ für die gemeinsame 30-Minuten-Spielrunde. | [ZIP](https://github.com/manuelfussTC/festool-ecommerce-starterkits/releases/latest/download/spielstart.zip) |

Für ein Fachbeispiel sind etwa 30–45 Minuten mit eingerichteter Umgebung vorgesehen. Die Zeit hängt von Erfahrung und gewählten Erweiterungen ab. Die Kits sind **Gerüste**, keine bereits fertigen Fachanwendungen. Die vollständigen [Referenzlösungen](referenzen/) liegen getrennt für Demonstration und Hilfe vor ([Referenzen als ZIP](https://github.com/manuelfussTC/festool-ecommerce-starterkits/releases/latest/download/referenzloesungen.zip)).

## Ohne Entwicklungserfahrung loslegen

1. Lade genau ein Starter-ZIP aus der Tabelle herunter. Dafür ist kein GitHub-Konto nötig.
2. Entpacke es vollständig und öffne den enthaltenen Projektordner. Darin liegen README.md, README.json und package.json.
3. Starte Claude Code in diesem Ordner und kopiere den Auftrag aus der README. Kurzform:

```text
Lies CLAUDE.md, README.md und README.json. Baue die dort beschriebene Grundaufgabe vollständig. Verwende die vorhandene Oberfläche und Beispieldaten. Prüfe die Abnahmekriterien und die Tests, behebe Fehler und starte die lokale Vorschau. Nenne mir die genaue URL und erkläre das Ergebnis kurz ohne Fachjargon.
```

Node.js 24 LTS, npm und ein eingerichteter Claude-Code-Zugang müssen vorhanden sein. Die Einzelanleitungen erklären die Schritte für Windows und Mac. Beim ersten Installieren werden Pakete aus dem Internet geladen; Claude Code benötigt seinen eingerichteten Zugang. Die App selbst verarbeitet Daten lokal im Browser und speichert sie nicht dauerhaft.

Für einen manuellen Start im jeweiligen Kit-Ordner:

```sh
npm ci
npm run dev
```

Die im Terminal angezeigte Adresse öffnen, meistens http://127.0.0.1:5173. Terminal offen lassen. Ein zweites Terminal im selben Ordner ist für `claude`. Mit Strg+C stoppst Du die Vorschau.

## Was vorbereitet ist

Jedes Fach-Kit bringt Import, Datenvorschau, Bedienelemente, CSV-Export-Helfer, zwei Beispieldateien und Fachtests mit. Die einzige gezielt offene Stelle ist die Kernlogik in src/aufgabe.ts; sie wird über WORKSHOP_READY nach Umsetzung freigeschaltet. Die Fachtests sind im unveränderten Starter absichtlich rot. In README.md steht genau, was gebaut und geprüft werden soll.

- **README.md:** ausführlich für Menschen, inklusive Fehlersuche und Begriffen.
- **README.json:** strukturierter Auftrag, Datenvertrag, Befehle, Regeln, Abnahme und Erweiterungen.
- **README.schema.json:** Schema für den maschinenlesbaren Auftrag.
- **CLAUDE.md / AGENTS.md:** Projektanweisungen für Coding-Assistenten.
- **DATEN.md:** Feldbedeutungen, erlaubte Werte und erwartete Beispielergebnisse.

Claude lädt CLAUDE.md im Projektkontext; die Anweisung dort fordert ausdrücklich das Lesen der JSON-Datei. Das Spiel-Kit hat statt CSV-Daten klare Spielregeln und einen markierten Platzhalter für anschließend zu implementierende Spieltests.

## Für Schnellere

Der [Produktberater-Bonus](starters/produktvergleich/BONUS.md) erweitert den fertigen Produktvergleich: Drei Fragen stellen, passende Produkte anhand sichtbarer Regeln auswählen, die Auswahl erklären und exportieren. Die Szenarien stehen zusätzlich in BONUS.json. Auch diese Aufgabe kommt ohne externe Systeme aus. Richtzeit: weitere 60–90 Minuten.

## Für Manuel und Moderation

Die drei Referenzlösungen unter `referenzen/` sind eigenständige, fertige Grundaufgaben. Jede hat ihre eigene Anleitung und ihr eigenes Lockfile. Auch dort im jeweiligen Unterordner `npm ci` und `npm run dev` ausführen. Der Produktberater bleibt eine Bonusaufgabe und ist in der Referenz der Grundaufgabe nicht implementiert.

Empfohlene Demonstration: Beim Daten-Check 7 Probleme in 4 Datensätzen finden; im Produktvergleich Alpha/Beta gegenüberstellen; beim Juli-Reporting DEMO-B mit 800 Besuchen und 1 % Bestellquote zeigen. Die jeweilige zweite CSV zeigt, dass keine Ergebnisse fest eingebaut sind. [Moderationshilfe](docs/MODERATION.md).

## Repository statt einzelnes ZIP

```sh
git clone https://github.com/manuelfussTC/festool-ecommerce-starterkits.git
cd festool-ecommerce-starterkits/starters/produktdaten-check
npm ci
npm run dev
```

Im Hauptordner gibt es bewusst keine gemeinsame Anwendung und keine gemeinsamen Laufzeit-Abhängigkeiten. Einzelne Projekte können kopiert, als ZIP weitergegeben und unabhängig weiterentwickelt werden. Git hält Projektstände fest; GitHub ist der Download- und Codeablageort. Der Upload ist kein Hosting der Apps.

## Qualität prüfen

In jedem Kit: `npm test` für den vorbereiteten Unterbau, `npm run test:ziel` für die fertige Fachaufgabe und `npm run build` für Typprüfung und Build. Im Starter schlagen Fachtests bis zur Umsetzung beabsichtigt fehl. Die Referenzen müssen alle drei Prüfungen bestehen. Die GitHub-Prüfung unterscheidet diese Zustände. [Prüfplan](docs/PRUEFPLAN.md).

Code unter [MIT-Lizenz](LICENSE). Namen, Preise, Kennzahlen und Kataloge sind synthetische Übungsdaten. Dies ist keine offizielle Festool-Software. Die Workshop-Kits enthalten keine internen Unterlagen oder Firmenzugänge.
