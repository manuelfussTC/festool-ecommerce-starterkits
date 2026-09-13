import {expect, it} from 'vitest';
import {readFileSync} from 'node:fs';
import {parseCSV} from '../src/csv';
import {analyzeReport, WORKSHOP_READY} from '../src/aufgabe';
const load=(f:string)=>parseCSV(readFileSync(new URL('../public/beispiele/'+f,import.meta.url),'utf8'),['artikelnummer']);
it('summiert den Juli und berechnet die gewichtete Gesamtquote', () => {
 const r=analyzeReport(load('report-juli.csv'),500,2,'','');
 expect([r.besuche,r.bestellungen,r.umsatz]).toEqual([2600,83,8440]); expect(r.quote).toBeCloseTo(83/2600*100);
 expect(r.zeilen.filter(z=>z.auffaellig).map(z=>z.artikelnummer)).toEqual(['DEMO-B']);
 expect(r.zeilen.find(z=>z.artikelnummer==='DEMO-C')?.quote).toBeNull();
});
it('filtert auch Summen und benutzt strikte Quote-Grenze sowie inklusive Besuchsgrenze', () => {
 const rows=load('report-juli.csv'); const r=analyzeReport(rows,800,1,'','Schleifer');
 expect([r.besuche,r.bestellungen]).toEqual([1800,48]); expect(r.quote).toBeCloseTo(48/1800*100);
 expect(r.zeilen.some(z=>z.auffaellig)).toBe(false);
 expect(analyzeReport(rows,800,1.01,'beta','').zeilen[0].auffaellig).toBe(true);
 expect(analyzeReport(rows,500,2,'unbekannt','').quote).toBeNull();
});
it('liest August und behandelt null Besuche sowie Quoten über 100 Prozent', () => {
 const r=analyzeReport(load('report-august.csv'),500,2,'',''); expect([r.besuche,r.bestellungen]).toEqual([2200,95]);
 const row={artikelnummer:'X',name:'Test',kategorie:'Test',besuche:'0',bestellungen:'1',umsatz_eur:'1'};
 expect(analyzeReport([row],0,2,'','').quote).toBeNull();
 expect(analyzeReport([{...row,besuche:'1',bestellungen:'2'}],0,2,'','').quote).toBe(200);
});
it('verhindert ungültige Grenzwerte', () => { for(const n of [-1,NaN,Infinity,0.5]) expect(()=>analyzeReport([],n,2,'','')).toThrow(); });
it('schaltet die fertige Oberfläche frei', () => expect(WORKSHOP_READY).toBe(true));
