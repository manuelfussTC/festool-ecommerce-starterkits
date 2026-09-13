// Die Fachaufgabe steht in README.json. CSV-Unterbau und Oberfläche sind vorbereitet.
export const WORKSHOP_READY = false;
import {numberValue, type Row} from './csv';
export type ComparisonRow = {merkmal: string; werte: string[]; unterschiedlich: boolean};
export function compareProducts(rows: Row[], selectedIds: string[]): ComparisonRow[] { void rows; void selectedIds; void numberValue; throw new Error("Bauaufgabe: compareProducts in src/aufgabe.ts implementieren."); }
