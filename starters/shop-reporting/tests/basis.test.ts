import {describe, it, expect} from 'vitest';
import {parseCSV, toCSV, requireUnique, numberValue} from '../src/csv';
describe('Der vorbereitete CSV-Unterbau', () => {
  it('liest BOM, Semikolon, Komma, leere Felder, CRLF und geschützte Zeilenumbrüche', () => {
    expect(parseCSV('\uFEFFid;text\r\n1;"A;B\nC"\r\n2;', ['id','text'])).toEqual([{id:'1',text:'A;B\nC'},{id:'2',text:''}]);
    expect(parseCSV('id,text\n1,"Ein ""Zitat"""', ['id'])[0].text).toBe('Ein "Zitat"');
  });
  it('meldet unbrauchbare Dateien verständlich', () => {
    for (const text of ['', 'id\n', 'a;a\n1;2', 'a;b\n1', 'a\n"offen', 'a\n"zu"rest', 'a\nf"alsch']) expect(() => parseCSV(text,['a'])).toThrow();
    expect(() => parseCSV('a\n1',['b'])).toThrow('Fehlende Spalten: b');
    expect(() => parseCSV('a\n' + '1\n'.repeat(5001),['a'])).toThrow('5.000');
  });
  it('schützt Text beim Tabellenexport und erhält Zahlen sowie Sonderzeichen', () => {
    const csv = toCSV(['Text','Zahl'], [['=1+1',-2],['a;"b"\nc',null]]);
    expect(parseCSV(csv, ['Text'])[0]).toEqual({Text:"'=1+1",Zahl:'-2'});
    expect(parseCSV(csv, ['Text'])[1].Text).toBe('a;"b"\nc');
  });
  it('prüft Zahlen und eindeutige Kennungen', () => {
    expect(numberValue('1,25','Gewicht')).toBe(1.25);
    for(const n of ['', '-2', '1.000,20', 'NaN', 'Infinity']) expect(() => numberValue(n,'Zahl')).toThrow();
    expect(() => requireUnique([{artikelnummer:'A'},{artikelnummer:'A'}])).toThrow();
  });
});
