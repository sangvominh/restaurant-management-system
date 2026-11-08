'use client';
import { useEffect, useRef, useState } from 'react';
import JsBarcode from 'jsbarcode';
export type PrintDocument = { title: string; reference: string; status: string; draft?: boolean; fields: [string, string][]; columns: string[]; rows: string[][]; totals?: [string, string][]; note?: string | null; signatures: string[] };
const options = { format: 'CODE128', width: 2, height: 55, displayValue: false, margin: 12, background: '#ffffff', lineColor: '#000000' };
export function Barcode({ value, compact = false }: { value: string; compact?: boolean }) {
  const ref = useRef<SVGSVGElement>(null);
  const [error, setError] = useState(false);
  useEffect(() => { try { if (ref.current) JsBarcode(ref.current, value, options); setError(false); } catch { setError(true); } }, [value]);
  return <div className={`document-barcode${compact ? ' compact' : ''}`} title={value}>{error ? <small>Không thể tạo mã vạch cho mã này.</small> : <svg ref={ref} role="img" aria-label={`Mã vạch ${value}`} />}{!compact && <code>{value}</code>}</div>;
}
const esc = (v: string) => v.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export function DocumentTools({ document: doc, disabled = false }: { document: PrintDocument; disabled?: boolean }) {
  const [error, setError] = useState('');
  function print() {
    setError('');
    try {
      const svg = window.document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      JsBarcode(svg, doc.reference, options);
      const popup = window.open('', '_blank', 'width=1000,height=850');
      if (!popup) { setError('Trình duyệt đang chặn cửa sổ in. Hãy cho phép mở cửa sổ bật lên rồi thử lại.'); return; }
      popup.opener = null;
      const cells = (values: string[], tag: string) => values.map(v => `<${tag}>${esc(v)}</${tag}>`).join('');
      popup.document.write(`<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>${esc(doc.title)} — ${esc(doc.reference)}</title><style>
        @page{size:A4;margin:15mm}*{box-sizing:border-box}body{font:12px Arial,sans-serif;color:#111;margin:0}header{display:flex;justify-content:space-between;gap:20px;border-bottom:2px solid #222;padding-bottom:16px;margin-bottom:20px}h1{font-size:23px;margin:5px 0 10px;text-transform:uppercase}.reference{overflow-wrap:anywhere;font-size:11px}.barcode{width:85mm;text-align:right}.barcode svg{width:100%;height:20mm}.barcode code{display:block;font-size:10px;overflow-wrap:anywhere}.draft{border:1px dashed #555;padding:10px;text-align:center;font-weight:bold;margin:16px 0}.fields{display:grid;grid-template-columns:1fr 1fr;gap:10px 24px;margin-bottom:20px}.fields div{line-height:1.6;overflow-wrap:anywhere}table{border-collapse:collapse;width:100%;margin:15px 0}th,td{border:1px solid #aaa;padding:9px 8px;text-align:left;line-height:1.5;white-space:pre-line;overflow-wrap:anywhere}thead{display:table-header-group}tr{break-inside:avoid}th{background:#f1f1f1}.totals{margin-left:auto;width:60%;break-inside:avoid}.totals p{display:flex;justify-content:space-between;gap:20px;font-weight:bold}.note{white-space:pre-wrap;line-height:1.7}.signatures{display:flex;justify-content:space-around;gap:20px;text-align:center;margin-top:35px;break-inside:avoid}.signatures div{flex:1;min-height:105px}.signatures small{display:block;margin-top:8px;font-style:italic}.footer{margin-top:20px;border-top:1px solid #bbb;padding-top:10px;font-size:10px;color:#666}.print-control{margin-bottom:20px;padding:10px;background:#f1f4f1}.print-control button{padding:8px 20px;cursor:pointer}@media print{.print-control{display:none}}
      </style></head><body><div class="print-control"><button onclick="window.print()">In / Lưu PDF</button></div><header><div><h1>${esc(doc.title)}</h1><div class="reference">${esc(doc.reference)}</div><p>Trạng thái: <strong>${esc(doc.status)}</strong></p></div><div class="barcode">${svg.outerHTML}<code>${esc(doc.reference)}</code></div></header>${doc.draft ? '<div class="draft">BẢN NHÁP — CHƯA XÁC NHẬN NGHIỆP VỤ</div>' : ''}<div class="fields">${doc.fields.map(([label, value]) => `<div><strong>${esc(label)}:</strong> ${esc(value)}</div>`).join('')}</div><table><thead><tr><th>STT</th>${cells(doc.columns, 'th')}</tr></thead><tbody>${doc.rows.map((row, i) => `<tr><td>${i + 1}</td>${cells(row, 'td')}</tr>`).join('')}</tbody></table><div class="totals">${(doc.totals || []).map(([label, value]) => `<p><span>${esc(label)}</span><span>${esc(value)}</span></p>`).join('')}</div>${doc.note ? `<p class="note"><strong>Ghi chú:</strong> ${esc(doc.note)}</p>` : ''}<div class="signatures">${doc.signatures.map(s => `<div><strong>${esc(s)}</strong><small>(Ký, ghi rõ họ tên)</small></div>`).join('')}</div><p class="footer">In từ hệ thống · ${esc(new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' }))}</p></body></html>`);
      popup.addEventListener('load', () => { popup.focus(); popup.print(); }, { once: true });
      popup.document.close();
    } catch { setError('Không thể tạo bản in. Vui lòng kiểm tra mã chứng từ.'); }
  }
  return <div className="document-tools"><Barcode value={doc.reference} /><button disabled={disabled} onClick={print}>In phiếu / PDF</button>{error && <p className="error" role="alert">{error}</p>}</div>;
}
