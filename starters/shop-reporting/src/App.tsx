import {useMemo, useState} from 'react';
import {parseCSV, requireUnique, numberValue, downloadCSV, type Row} from './csv';
import {WORKSHOP_READY, analyzeReport} from './aufgabe';
import spec from '../README.json';
import './style.css';
const message=(e:unknown)=>e instanceof Error?e.message:'Die Datei konnte nicht verarbeitet werden.';
function validate(rows:Row[]) {
 requireUnique(rows);
 for(const [i,r] of rows.entries()) {
 if(!r.name) throw new Error(`Datensatz ${i+1}: Der Name fehlt.`);
if(!r.kategorie) throw new Error(`Datensatz ${i+1}: Die Kategorie fehlt.`);
for(const field of ["besuche","bestellungen"]) if(!Number.isSafeInteger(numberValue(r[field],field))) throw new Error(field+": Eine ganze, sicher darstellbare Zahl ist erforderlich.");
numberValue(r.umsatz_eur,"Umsatz");
}
 return rows;
}

function Feature({rows}: {rows:Row[]}) {
 const [search,setSearch]=useState(''), [category,setCategory]=useState(''), [min,setMin]=useState('500'),[max,setMax]=useState('2');
 const computed=useMemo(()=>{if(!WORKSHOP_READY || !rows.length)return {data:null,error:''};try {
   if(!min.trim() || !max.trim()) throw new Error('Bitte beide Grenzwerte ausfüllen.');
   return {data:analyzeReport(rows,Number(min),Number(max.replace(',','.')),search,category),error:''};
 } catch(e){return {data:null,error:message(e)};}},[rows,min,max,search,category]);
 const data=computed.data;
 const fmt=(n:number)=>n.toLocaleString('de-DE',{maximumFractionDigits:2});
 const rate=(n:number|null)=>n===null?'Nicht berechenbar':fmt(n)+' %';
 return <section><h2>2. Shop-Zahlen auswerten</h2><p>Bestellquote = Bestellungen ÷ Besuche × 100. Ein Hinweis bedeutet Prüfbedarf und erklärt noch keine Ursache.</p>
 <div className="toolbar"><label>Produkt suchen<input value={search} type="search" placeholder="Name oder Artikelnummer" onChange={e=>setSearch(e.target.value)}/></label>
 <label>Kategorie<select value={category} onChange={e=>setCategory(e.target.value)}><option value="">Alle Kategorien</option>{[...new Set(rows.map(r=>r.kategorie))].sort().map(c=><option key={c}>{c}</option>)}</select></label>
 <label>Mindestens Besuche<input type="number" min="0" step="1" value={min} onChange={e=>setMin(e.target.value)}/></label>
 <label>Quote kleiner als (%)<input type="number" min="0" step="0.1" value={max} onChange={e=>setMax(e.target.value)}/></label></div>
 {computed.error && <p role="alert" className="error">{computed.error}</p>}
 {data && <><div className="stats" aria-live="polite"><span><strong>{fmt(data.besuche)}</strong>Besuche</span><span><strong>{fmt(data.bestellungen)}</strong>Bestellungen</span><span><strong>{rate(data.quote)}</strong>Gesamtquote</span><span><strong>{fmt(data.umsatz)} €</strong>Umsatz</span></div>
 <p>Produkte mit Hinweis: {data.zeilen.filter(r=>r.auffaellig).length} von {data.zeilen.length}.</p>
 {data.zeilen.length>0 ? <div className="table-wrap"><table><thead><tr><th>Produkt</th><th>Besuche</th><th>Bestellungen</th><th>Quote</th><th>Umsatz</th><th>Hinweis</th></tr></thead><tbody>{data.zeilen.map(r=><tr className={r.auffaellig?'different':''} key={r.artikelnummer}><th>{r.name}<br/><small>{r.artikelnummer}</small></th><td>{fmt(r.besuche)}</td><td>{fmt(r.bestellungen)}</td><td>{rate(r.quote)}</td><td>{fmt(r.umsatz)} €</td><td>{r.auffaellig?'Viele Besuche, niedrige Quote':r.quote===null?'Quote nicht berechenbar':'Kein Hinweis'}</td></tr>)}</tbody></table></div> : <p className="empty">Keine Produkte passen zu den Filtern.</p>}
 <button className="secondary" onClick={()=>downloadCSV('shop-reporting.csv',['Artikelnummer','Name','Kategorie','Besuche','Bestellungen','Umsatz EUR','Bestellquote %','Hinweis'],data.zeilen.map(r=>[r.artikelnummer,r.name,r.kategorie,r.besuche,r.bestellungen,r.umsatz,r.quote===null?'Nicht berechenbar':Number(r.quote.toFixed(4)),r.auffaellig?'Viele Besuche, niedrige Quote':'']))}>Gefiltertes Ergebnis als CSV</button></>}
 {!WORKSHOP_READY && <p className="empty">Import und Filteroberfläche stehen. Claude ergänzt Kennzahlen und Hinweisregeln in src/aufgabe.ts.</p>}
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
