// Die Fachaufgabe steht in README.json. CSV-Unterbau und Oberfläche sind vorbereitet.
export const WORKSHOP_READY = false;
import {numberValue, type Row} from './csv';
export type ReportLine = {artikelnummer:string; name:string; kategorie:string; besuche:number; bestellungen:number; umsatz:number; quote:number|null; auffaellig:boolean};
export type Report = {zeilen:ReportLine[]; besuche:number; bestellungen:number; umsatz:number; quote:number|null};
export function analyzeReport(rows: Row[], minVisits: number, maxRate: number, search: string, category: string): Report { void rows; void minVisits; void maxRate; void search; void category; void numberValue; throw new Error("Bauaufgabe: analyzeReport in src/aufgabe.ts implementieren."); }
