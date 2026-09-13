import {useMemo, useState} from 'react';
import {parseCSV, requireUnique, numberValue, downloadCSV, type Row} from './csv';
import {WORKSHOP_READY, checkProducts} from './aufgabe';
import spec from '../README.json';
import './style.css';
const message=(e:unknown)=>e instanceof Error?e.message:'Die Datei konnte nicht verarbeitet werden.';
function validate(rows:Row[]) {
 void requireUnique; void numberValue;
 return rows;
}

function Feature({rows}: {rows:Row[]}) {
 const [result,setResult]=useState<ReturnType<typeof checkProducts>|null>(null);
 const [error,setError]=useState('');
 function check() { try {setResult(checkProducts(rows)); setError('');} catch(e) {setError(message(e));setResult(null);} }
 return <section><h2>2. Produktdaten prüfen</h2>
 <p>Pflichtangaben und doppelte Artikelnummern finden. Die Bildreferenz wird nur auf Vorhandensein geprüft.</p>
 <button disabled={!WORKSHOP_READY || !rows.length} onClick={check}>Daten prüfen</button>
 {error && <div role="alert" className="error">{error}</div>}
 {result!==null && <><div className="stats" aria-live="polite"><span><strong>{rows.length}</strong>Datensätze</span><span><strong>{result.length}</strong>Probleme</span><span><strong>{new Set(result.map(p=>p.datensatz)).size}</strong>betroffene Datensätze</span></div>
 {result.length===0 ? <p>Keine Probleme nach den hinterlegten Regeln gefunden.</p> : <div className="table-wrap"><table><thead><tr><th>Datensatz</th><th>Artikelnummer</th><th>Feld</th><th>Grund</th></tr></thead><tbody>{result.map((p,i)=><tr key={i}><td>{p.datensatz}</td><td>{p.artikelnummer || 'Fehlt'}</td><td>{p.feld}</td><td>{p.grund}</td></tr>)}</tbody></table></div>}
 <button className="secondary" onClick={()=>downloadCSV('produktdaten-probleme.csv',['Datensatz','Artikelnummer','Feld','Grund'],result.map(p=>[p.datensatz,p.artikelnummer,p.feld,p.grund]))}>Problemliste als CSV</button></>}
 {!WORKSHOP_READY && <p className="empty">Die Prüfung ist die Bauaufgabe. Claude ergänzt sie in src/aufgabe.ts.</p>}
 </section>;
}

export default function App() {
 const [rows,setRows]=useState<Row[]>([]), [source,setSource]=useState(''), [error,setError]=useState(''), [busy,setBusy]=useState(false), [version,setVersion]=useState(0);
 async function load(read:()=>Promise<string>,name:string) {
  setBusy(true);setError('');setRows([]);setSource('');setVersion(v=>v+1);
  try { const content=await read(); setRows(validate(parseCSV(content,spec.data.required_columns)));setSource(name); }
  catch(e) {setError(message(e));} finally {setBusy(false);}
 }
 return <><header><div className="eyebrow">E-Commerce Werkstatt · {spec.kind==='reference'?'Referenzlösung':'Starter-Kit'}</div><h1>{spec.title}</h1><p>{spec.summary}</p></header><main>
 {!WORKSHOP_READY ? <aside className="notice"><strong>Das Gerüst läuft. Die Fachfunktion baust du mit Claude.</strong><p>Öffne Claude Code in diesem Projektordner und verwende den Auftrag aus README.md. Die Bauaufgabe steht zusätzlich strukturiert in README.json.</p></aside> : <aside className="notice"><strong>Fachfunktion aktiv</strong><p>Probiere beide Beispieldateien aus und kontrolliere das Ergebnis mit der Checkliste in README.md.</p></aside>}
 <section><h2>1. Beispieldaten oder eigene CSV laden</h2><p>Alle mitgelieferten Daten sind erfunden. Jede Datei ersetzt den bisherigen Inhalt. Die App verarbeitet Daten im Browser und speichert sie nicht dauerhaft.</p>
 <div className="toolbar">{spec.data.samples.map(file=><button className="secondary" disabled={busy} key={file} onClick={()=>load(async()=>{const response=await fetch('./beispiele/'+file);if(!response.ok)throw new Error('Beispieldatei fehlt. Bitte mit npm run dev starten.');return response.text();},file)}>{file}</button>)}</div>
 <label>Eigene CSV (höchstens 2 MB und 5.000 Datensätze)<input type="file" accept=".csv,text/csv" disabled={busy} onChange={e=>{const file=e.target.files?.[0]; e.target.value='';if(file)void load(()=>{if(file.size>2_000_000)throw new Error('Die Datei ist größer als 2 MB.');return file.text();},file.name);}}/></label>
 {busy && <p role="status">Daten werden geladen …</p>}{error && <div role="alert" className="error">{error}</div>}
 {rows.length>0 && <><p aria-live="polite"><strong>{rows.length} Datensätze geladen</strong> · {source}</p><details><summary>Datenvorschau (erste {Math.min(8,rows.length)} Datensätze)</summary><div className="table-wrap"><table><thead><tr>{spec.data.required_columns.map(h=><th key={h}>{h}</th>)}</tr></thead><tbody>{rows.slice(0,8).map((r,i)=><tr key={i}>{spec.data.required_columns.map(h=><td key={h}>{r[h] || '—'}</td>)}</tr>)}</tbody></table></div></details></>}
 <details><summary>CSV-Format und Beispieldateien</summary><p>UTF-8, eine Kopfzeile, Komma oder Semikolon als Trennzeichen. Dezimalkommas in einer kommagetrennten Datei müssen in Anführungszeichen stehen. Leere Zeilen werden ignoriert. Alle Spaltennamen müssen vorhanden sein.</p><code>{spec.data.required_columns.join(';')}</code><p>Details zu jedem Feld stehen in DATEN.md.</p><div className="toolbar">{spec.data.samples.map(f=><a className="download" href={'./beispiele/'+f} download key={f}>{f} herunterladen</a>)}</div></details>
 </section><Feature key={version} rows={rows}/>
 <footer>Lokales Übungsprojekt · Keine Verbindung zu Shop, PIM, ERP oder einer KI-API · Nach dem Neuladen bitte die CSV erneut laden.</footer>
 </main></>;
}
