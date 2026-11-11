export const todayVN = () => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());
export const shiftDay = (date: string, days: number) => new Date(Date.parse(date + 'T00:00:00Z') + days * 86400000).toISOString().slice(0,10);
export function datePreset(preset: string) { const today = todayVN(); return { start: preset === 'yesterday' ? shiftDay(today,-1) : preset === 'week' ? shiftDay(today,-6) : preset === 'month' ? today.slice(0,7) + '-01' : today, end: preset === 'yesterday' ? shiftDay(today,-1) : today }; }
export const dateVN = (date: string) => new Date(date).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
export const dayVN = (date: string) => new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date(date));
export function exportSalesCsv(name: string, headers: string[], rows: (string | number)[][]) {
 const cell = (v: string | number) => { let text = String(v); if (typeof v === 'string' && /^[=+@-]/.test(text)) text = "'" + text; return '"' + text.replaceAll('"','""') + '"'; };
 const blob = new Blob(['\uFEFF' + [headers,...rows].map(row => row.map(cell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8' });
 const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href=url;link.download=name+'.csv';link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);
}

