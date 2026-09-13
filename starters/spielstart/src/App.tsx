import './style.css';
import spec from '../README.json';
export default function App() {
 return <><header><div className="eyebrow">E-Commerce Werkstatt · Spielrunde</div><h1>Dein erstes Spiel</h1><p>Das Projekt läuft. Als Nächstes baut Claude hier mit Dir „Schraubenfang“.</p></header><main>
 <section><h2>30 Minuten zum Ausprobieren</h2><p>5 Minuten Regeln festlegen, 15 Minuten bauen, 5 Minuten testen, 5 Minuten gegenseitig ausprobieren.</p><div id="game">Hier entsteht Dein Spielfeld.</div></section>
 <section><h2>Der Auftrag für Claude</h2><p>Öffne Claude Code in diesem Projektordner und kopiere diesen Text:</p><pre>{spec.start_prompt}</pre><h3>Die Spielregeln</h3><ol>{spec.task.rules.map(r=><li key={r}>{r}</li>)}</ol></section>
 <footer>Startbares Gerüst · Spiellogik ist noch offen · Keine Anmeldung und keine externen Daten nötig.</footer></main></>;
}
