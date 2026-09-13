// Die Fachaufgabe steht in README.json. CSV-Unterbau und Oberfläche sind vorbereitet.
export const WORKSHOP_READY = true;
import type {Row} from './csv';
export type Problem = {datensatz: number; artikelnummer: string; feld: string; grund: string};
export function checkProducts(rows: Row[]): Problem[] {
  const counts = new Map<string, number>();
  for (const row of rows) { const id = row.artikelnummer.trim().toLowerCase(); if (id) counts.set(id, (counts.get(id) ?? 0) + 1); }
  return rows.flatMap((row, i) => {
    const result: Problem[] = [];
    for (const field of ['artikelnummer','name','beschreibung','lieferumfang','bildreferenz']) {
      if (!row[field]?.trim()) result.push({datensatz:i+1, artikelnummer:row.artikelnummer, feld:field, grund:'Pflichtangabe fehlt'});
    }
    if ((counts.get(row.artikelnummer.trim().toLowerCase()) ?? 0) > 1) result.push({datensatz:i+1, artikelnummer:row.artikelnummer, feld:'artikelnummer', grund:'Artikelnummer mehrfach vorhanden'});
    return result;
  });
}
