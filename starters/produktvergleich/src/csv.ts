export type Row = Record<string, string>;
// CSV gehört zum fertigen Gerüst. Fachregeln stehen in aufgabe.ts.
export function parseCSV(input: string, required: readonly string[]): Row[] {
  const text = input.replace(/^\uFEFF/, '');
  if (!text.trim()) throw new Error('Die Datei ist leer.');
  const firstLine = text.split(/\r?\n/)[0];
  const delimiter = firstLine.includes(';') ? ';' : ',';
  const records: string[][] = []; let row: string[] = [], cell = '', quoted = false, closed = false;
  const field = () => { row.push(cell.trim()); cell = ''; closed = false; };
  const line = () => { field(); if (row.length > 1 || row[0] !== '') records.push(row); row = []; };
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (quoted) {
      if (c === '"' && text[i+1] === '"') { cell += '"'; i++; }
      else if (c === '"') { quoted = false; closed = true; }
      else cell += c;
    } else if (c === delimiter) field();
    else if (c === '\n' || c === '\r') { if (c === '\r' && text[i+1] === '\n') i++; line(); }
    else if (c === '"' && cell === '' && !closed) quoted = true;
    else if (closed) { if (!/\s/.test(c)) throw new Error('Ungültige CSV: Zeichen nach einem schließenden Anführungszeichen.'); }
    else if (c === '"') throw new Error('Ungültige CSV: Anführungszeichen im ungeschützten Feld.');
    else cell += c;
  }
  if (quoted) throw new Error('Ungültige CSV: Ein Anführungszeichen wurde nicht geschlossen.');
  if (cell || row.length || closed) line();
  const headers = records.shift() ?? [];
  if (headers.some(h => !h) || new Set(headers).size !== headers.length) throw new Error('Spaltennamen müssen gefüllt und eindeutig sein.');
  const missing = required.filter(h => !headers.includes(h));
  if (missing.length) throw new Error('Fehlende Spalten: ' + missing.join(', '));
  if (!records.length) throw new Error('Die CSV enthält keine Datenzeilen.');
  if (records.length > 5000) throw new Error('Bitte höchstens 5.000 Datenzeilen verwenden.');
  return records.map((r, i) => {
    if (r.length !== headers.length) throw new Error(`Datensatz ${i+1}: ${r.length} Werte statt ${headers.length}.`);
    return Object.fromEntries(headers.map((h, n) => [h, r[n]]));
  });
}
export function toCSV(headers: string[], rows: (string | number | null)[][]): string {
  const escape = (value: string | number | null) => {
    let s = value == null ? '' : String(value);
    // Fremde Texte werden in Tabellenprogrammen nicht als Formel ausgeführt.
    if (typeof value === 'string' && /^[\s]*[=+@-]/.test(s)) s = "'" + s;
    return '"' + s.replace(/"/g, '""') + '"';
  };
  return '\uFEFF' + [headers, ...rows].map(r => r.map(escape).join(';')).join('\r\n');
}
export function downloadCSV(filename: string, headers: string[], rows: (string | number | null)[][]) {
  const url = URL.createObjectURL(new Blob([toCSV(headers, rows)], {type:'text/csv;charset=utf-8'}));
  const a = document.createElement('a'); a.href = url; a.download = filename; a.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
export function requireUnique(rows: Row[]) {
  const ids = rows.map(r => r.artikelnummer);
  if (ids.some(id => !id) || new Set(ids).size !== ids.length) throw new Error('Artikelnummern müssen gefüllt und eindeutig sein.');
}
export function numberValue(value: string, label: string): number {
  if (!/^\d+(?:[.,]\d+)?$/.test(value)) throw new Error(label + ': Bitte eine nicht negative Zahl ohne Tausendertrennzeichen verwenden.');
  const n = Number(value.replace(',', '.'));
  if (!Number.isFinite(n)) throw new Error(label + ': Die Zahl ist zu groß.');
  return n;
}
