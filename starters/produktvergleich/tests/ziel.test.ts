import {expect, it} from 'vitest';
import {readFileSync} from 'node:fs';
import {parseCSV} from '../src/csv';
import {compareProducts, WORKSHOP_READY} from '../src/aufgabe';
const load = (f: string) => parseCSV(readFileSync(new URL('../public/beispiele/'+f,import.meta.url),'utf8'),['artikelnummer']);
it('findet die fachlichen Unterschiede', () => {
 const result=compareProducts(load('produktkatalog.csv'),['DEMO-A','DEMO-B']);
 expect(result.filter(r=>r.unterschiedlich).map(r=>r.merkmal)).toEqual(['Stromversorgung','Gewicht (kg)','Preis (EUR)']);
});
it('normalisiert Zahlen, bewahrt fehlende Werte und Reihenfolge', () => {
 const result=compareProducts(load('produktkatalog.csv'),['DEMO-C','DEMO-A']);
 expect(result.find(r=>r.merkmal==='Gewicht (kg)')?.werte).toEqual(['Keine Angabe','1,5']);
 expect(result.find(r=>r.merkmal==='Preis (EUR)')?.unterschiedlich).toBe(false);
});
it('unterstützt 3 Produkte und einen zweiten Katalog ohne feste Demo-IDs', () => {
 expect(compareProducts(load('produktkatalog-zwei.csv'),['TEST-1','TEST-2','TEST-3'])).toHaveLength(5);
});
it('verhindert unbrauchbare Auswahlen', () => {
 for(const ids of [[],['DEMO-A'],['DEMO-A','DEMO-A'],['DEMO-A','fehlt'],['1','2','3','4']]) expect(()=>compareProducts(load('produktkatalog.csv'),ids)).toThrow();
});
it('schaltet die fertige Oberfläche frei', () => expect(WORKSHOP_READY).toBe(true));
