// Die Fachaufgabe steht in README.json. CSV-Unterbau und Oberfläche sind vorbereitet.
export const WORKSHOP_READY = true;
import {numberValue, type Row} from './csv';
export type ComparisonRow = {merkmal: string; werte: string[]; unterschiedlich: boolean};
export function compareProducts(rows: Row[], selectedIds: string[]): ComparisonRow[] {
  if (selectedIds.length < 2 || selectedIds.length > 3 || new Set(selectedIds).size !== selectedIds.length) throw new Error('Bitte zwei oder drei unterschiedliche Produkte auswählen.');
  const selected = selectedIds.map(id => { const p=rows.find(r=>r.artikelnummer===id); if(!p) throw new Error('Ein gewähltes Produkt fehlt im Katalog.'); return p; });
  const fields = [['kategorie','Kategorie'],['anwendung','Anwendung'],['stromversorgung','Stromversorgung'],['gewicht_kg','Gewicht (kg)'],['preis_eur','Preis (EUR)']];
  return fields.map(([key,label]) => {
    const numeric = key === 'gewicht_kg' || key === 'preis_eur';
    const values = selected.map(p => p[key].trim() === '' ? null : numeric ? numberValue(p[key],label) : p[key].trim());
    return {merkmal:label, werte:values.map(v => v == null ? 'Keine Angabe' : typeof v==='number' ? v.toLocaleString('de-DE',{maximumFractionDigits:2,minimumFractionDigits:key==='preis_eur'?2:0}) : v), unterschiedlich:new Set(values).size > 1};
  });
}
