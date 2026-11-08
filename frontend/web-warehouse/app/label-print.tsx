'use client';
import { useState } from 'react';
import JsBarcode from 'jsbarcode';
import { Barcode } from './document-print';
export type StockLabel = { reference: string; name: string; code: string; kind: string; expiry?: string | null };
const escape = (v: string) => v.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
export default function LabelPrint({ label }: { label: StockLabel }) {
  const [copies, setCopies] = useState('1'), [layout, setLayout] = useState('A4'), [error, setError] = useState('');
  function print() {
    setError(''); const count = Number(copies);
    if (!Number.isInteger(count) || count < 1 || count > 100) { setError('Chọn từ 1 đến 100 tem.'); return; }
    try {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      JsBarcode(svg, label.reference, { format: 'CODE128', width: 2, height: 65, margin: 14, displayValue: false });
      const popup = window.open('', '_blank', 'width=950,height=750');
      if (!popup) { setError('Hãy cho phép cửa sổ bật lên để in tem.'); return; }
      popup.opener = null;
      const expiry = label.expiry ? new Date(label.expiry).toLocaleDateString('vi-VN', { timeZone: 'UTC' }) : '';
      const content = `<article class="label"><small>${escape(label.kind)}</small><strong>${escape(label.name)}</strong><span>${escape(label.code)}</span>${svg.outerHTML}<code>${escape(label.reference)}</code>${expiry ? `<b>HSD: ${escape(expiry)}</b>` : ''}</article>`;
      popup.document.write(`<!doctype html><html lang="vi"><head><meta charset="utf-8"><title>Tem ${escape(label.code)}</title><style>@page{size:${layout === 'A4' ? 'A4' : '100mm 50mm'};margin:${layout === 'A4' ? '10mm' : '0'}}*{box-sizing:border-box}body{margin:0;color:#000;background:#fff;font-family:Arial,sans-serif}.controls{padding:12px;background:#f1f5f1;margin-bottom:15px;font-size:13px}.controls button{padding:8px 20px}.labels{display:flex;flex-wrap:wrap;gap:${layout === 'A4' ? '3mm' : '0'}}.label{width:100mm;height:50mm;padding:3mm 4mm;border:1px dashed #aaa;display:flex;flex-direction:column;align-items:center;justify-content:center;overflow:hidden;break-inside:avoid;page-break-inside:avoid}.label small{font-size:9px}.label strong{font-size:12px;text-align:center;max-height:10mm;overflow:hidden;margin:1mm 0}.label span{font-size:10px}.label svg{display:block;width:92mm;height:18mm}.label code{font-size:7px;margin-top:1mm}.label b{font-size:10px;margin-top:1mm}@media print{.controls{display:none}${layout === 'ROLL' ? '.label{border:0;break-after:page;page-break-after:always}.label:last-child{break-after:auto;page-break-after:auto}' : ''}}</style></head><body><div class="controls"><button onclick="window.print()">In tem / Lưu PDF</button><p>Tem 100 × 50 mm. Chọn đúng khổ giấy, tỷ lệ 100%, tắt đầu/chân trang của trình duyệt. Kiểm tra một tem bằng máy quét trước khi in nhiều.</p></div><div class="labels">${Array.from({ length: count }, () => content).join('')}</div></body></html>`);
      popup.addEventListener('load', () => { popup.focus(); popup.print(); }, { once: true }); popup.document.close();
    } catch { setError('Không thể tạo tem cho mã này.'); }
  }
  return <div className="label-print"><div className="label-preview"><small>{label.kind}</small><h3>{label.name}</h3><p>{label.code}</p><Barcode value={label.reference} />{label.expiry && <p>HSD: {new Date(label.expiry).toLocaleDateString('vi-VN', { timeZone: 'UTC' })}</p>}</div><div className="form-grid"><label className="field">Số tem<input type="number" min="1" max="100" step="1" value={copies} onChange={e => setCopies(e.target.value)} /></label><label className="field">Giấy in<select value={layout} onChange={e => setLayout(e.target.value)}><option value="A4">A4 · cắt/dán tem 100 × 50 mm</option><option value="ROLL">Giấy tem cuộn 100 × 50 mm</option></select></label></div><p className="hint">In đúng khổ, tỷ lệ 100%. Tem không tự thay đổi số lượng tồn và không phải mã chứng từ.</p>{error && <p className="error" role="alert">{error}</p>}<button className="primary" onClick={print}>In {copies || '…'} tem mã vạch</button></div>;
}
