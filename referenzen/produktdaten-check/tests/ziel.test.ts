import {expect, it} from 'vitest';
import {readFileSync} from 'node:fs';
import {parseCSV} from '../src/csv';
import {checkProducts, WORKSHOP_READY} from '../src/aufgabe';
const load = (file: string) => parseCSV(readFileSync(new URL('../public/beispiele/'+file,import.meta.url),'utf8'),['artikelnummer']);
it('prüft alle fehlenden Pflichtfelder und jede betroffene Duplikatzeile', () => {
 const rows = load('produkte-mit-fehlern.csv'); const snapshot = JSON.stringify(rows); const problems = checkProducts(rows);
 expect(problems).toHaveLength(7); expect(new Set(problems.map(p=>p.datensatz)).size).toBe(4);
 expect(problems.filter(p=>p.grund.includes('mehrfach')).map(p=>p.datensatz)).toEqual([2,4]);
 expect(problems.filter(p=>p.datensatz===5).map(p=>p.feld)).toEqual(['artikelnummer','beschreibung']);
 expect(JSON.stringify(rows)).toBe(snapshot);
});
it('erkennt saubere Dateien, Leerzeichen und leere Eingaben', () => {
 expect(checkProducts(load('produkte-sauber.csv'))).toEqual([]); expect(checkProducts([])).toEqual([]);
 expect(checkProducts([{artikelnummer:' ',name:' ',beschreibung:' ',lieferumfang:' ',bildreferenz:' '}])).toHaveLength(5);
});
it('schaltet die fertige Oberfläche frei', () => expect(WORKSHOP_READY).toBe(true));
