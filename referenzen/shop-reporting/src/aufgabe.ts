// Die Fachaufgabe steht in README.json. CSV-Unterbau und Oberfläche sind vorbereitet.
export const WORKSHOP_READY = true;
import {numberValue, type Row} from './csv';
export type ReportLine = {artikelnummer:string; name:string; kategorie:string; besuche:number; bestellungen:number; umsatz:number; quote:number|null; auffaellig:boolean};
export type Report = {zeilen:ReportLine[]; besuche:number; bestellungen:number; umsatz:number; quote:number|null};
export function analyzeReport(rows: Row[], minVisits: number, maxRate: number, search: string, category: string): Report {
  if (!Number.isSafeInteger(minVisits) || minVisits < 0 || !Number.isFinite(maxRate) || maxRate < 0) throw new Error('Grenzwerte müssen nicht negativ sein; Mindestbesuche müssen eine ganze Zahl sein.');
  const needle = search.trim().toLocaleLowerCase('de-DE');
  const zeilen = rows.filter(r => (!category || r.kategorie===category) && (r.artikelnummer+' '+r.name).toLocaleLowerCase('de-DE').includes(needle)).map(r => {
    const besuche=numberValue(r.besuche,'Besuche'), bestellungen=numberValue(r.bestellungen,'Bestellungen'), umsatz=numberValue(r.umsatz_eur,'Umsatz');
    const quote=besuche===0 ? null : bestellungen/besuche*100;
    return {artikelnummer:r.artikelnummer, name:r.name, kategorie:r.kategorie, besuche,bestellungen,umsatz,quote,auffaellig:besuche>=minVisits && quote!==null && quote<maxRate};
  });
  const besuche=zeilen.reduce((n,r)=>n+r.besuche,0), bestellungen=zeilen.reduce((n,r)=>n+r.bestellungen,0), umsatz=zeilen.reduce((n,r)=>n+r.umsatz,0);
  return {zeilen,besuche,bestellungen,umsatz,quote:besuche===0?null:bestellungen/besuche*100};
}
