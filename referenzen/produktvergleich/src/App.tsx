import {useMemo, useState} from 'react';
import {parseCSV, requireUnique, numberValue, downloadCSV, type Row} from './csv';
import {WORKSHOP_READY, compareProducts} from './aufgabe';
import spec from '../README.json';
import './style.css';
const message=(e:unknown)=>e instanceof Error?e.message:'Die Datei konnte nicht verarbeitet werden.';
function validate(rows:Row[]) {
 requireUnique(rows);
 for(const [i,r] of rows.entries()) {
 if(!r.name) throw new Error(`Datensatz ${i+1}: Der Name fehlt.`);
for(const field of ["gewicht_kg","preis_eur"]) if(r[field]) { numberValue(r[field],field); if(!/^\d+(?:[.,]\d{1,2})?$/.test(r[field])) throw new Error(field+": Höchstens zwei Nachkommastellen verwenden."); }
}
 return rows;
}

function Feature({rows}: {rows:Row[]}) {
 const [selected,setSelected]=useState<string[]>([]), [search,setSearch]=useState(''), [onlyDiff,setOnlyDiff]=useState(false);
 const computed=useMemo(()=>{ if(!WORKSHOP_READY || selected.length<2) return {data:null,error:''}; try{return {data:compareProducts(rows,selected),error:''};} catch(e){return {data:null,error:message(e)};} },[rows,selected]);
 const visible=rows.filter(r=>(r.artikelnummer+' '+r.name).toLocaleLowerCase('de-DE').includes(search.toLocaleLowerCase('de-DE')));
 const chosen=selected.map(id=>rows.find(r=>r.artikelnummer===id)!);
 const comparison=computed.data?.filter(r=>!onlyDiff || r.unterschiedlich) ?? [];
 function toggle(id:string) {setSelected(old=>old.includes(id)?old.filter(x=>x!==id):old.length<3?[...old,id]:old);}
 return <section><h2>2. Zwei oder drei Produkte auswählen</h2>
 <div className="toolbar"><label>Produkt suchen<input type="search" value={search} onChange={e=>setSearch(e.target.value)} placeholder="Name oder Artikelnummer" /></label><button className="secondary" onClick={()=>setSelected([])}>Auswahl leeren</button><span aria-live="polite">{selected.length} von 3 ausgewählt</span></div>
 {selected.length>0 && <p>Gewählt: {chosen.map(r=>r.name).join(', ')}</p>}
 <div className="table-wrap"><table><thead><tr><th>Auswahl</th><th>Produkt</th><th>Artikelnummer</th><th>Kategorie</th></tr></thead><tbody>{visible.map(p=><tr key={p.artikelnummer}><td><input aria-label={p.name+' auswählen'} type="checkbox" checked={selected.includes(p.artikelnummer)} disabled={!selected.includes(p.artikelnummer)&&selected.length>=3} onChange={()=>toggle(p.artikelnummer)} /></td><td>{p.name}</td><td>{p.artikelnummer}</td><td>{p.kategorie || 'Keine Angabe'}</td></tr>)}</tbody></table></div>
 {!visible.length && <p>Keine Produkte für diese Suche.</p>}
 {computed.error && <p role="alert" className="error">{computed.error}</p>}
 {WORKSHOP_READY && selected.length<2 && <p className="empty">Bitte mindestens zwei Produkte auswählen.</p>}
 {computed.data && <><h3>Vergleich</h3><label className="check"><input type="checkbox" checked={onlyDiff} onChange={e=>setOnlyDiff(e.target.checked)} />Nur Unterschiede anzeigen</label>
 <div className="table-wrap"><table><thead><tr><th>Merkmal</th>{chosen.map(p=><th key={p.artikelnummer}>{p.name}<br/><small>{p.artikelnummer}</small></th>)}</tr></thead><tbody>{comparison.map(r=><tr className={r.unterschiedlich?'different':''} key={r.merkmal}><th>{r.merkmal}{r.unterschiedlich?' *':''}</th>{r.werte.map((v,i)=><td className={v==='Keine Angabe'?'missing':''} key={i}>{v}</td>)}</tr>)}</tbody></table></div>
 {!comparison.length && <p>Bei diesen Merkmalen gibt es keine Unterschiede.</p>}<p className="muted">* Unterschiedliche Werte sind gelb hinterlegt. Preise und Produkte sind frei erfunden.</p>
 <button className="secondary" onClick={()=>downloadCSV('produktvergleich.csv',['Merkmal',...chosen.map(p=>p.name+' ('+p.artikelnummer+')')],comparison.map(r=>[r.merkmal,...r.werte]))}>Angezeigten Vergleich als CSV</button></>}
 {!WORKSHOP_READY && <p className="empty">Auswahl und Suche funktionieren bereits. Die Vergleichslogik ist die Bauaufgabe in src/aufgabe.ts.</p>}
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
