// Die Fachaufgabe steht in README.json. CSV-Unterbau und Oberfläche sind vorbereitet.
export const WORKSHOP_READY = false;
import type {Row} from './csv';
export type Problem = {datensatz: number; artikelnummer: string; feld: string; grund: string};
export function checkProducts(rows: Row[]): Problem[] { void rows; throw new Error("Bauaufgabe: checkProducts in src/aufgabe.ts implementieren."); }
