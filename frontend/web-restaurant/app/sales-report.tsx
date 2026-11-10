'use client';
import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { api, fmt, money } from './sales-api';
import { Pagination, usePagination } from './list-pagination';
type Report = { month: string; orders: number; paid: string; cash: string; transfer: string; products: { id: string; name: string; unit: string; quantity: string; revenue: string }[] };
export default function SalesReport() {
  const now = new Date(), initial = now.getFullYear() + '-' + String(now.getMonth() + 1).padStart(2, '0');
  const [month, setMonth] = useState(initial), [applied, setApplied] = useState(initial), [data, setData] = useState<Report>(), [loading, setLoading] = useState(true), [error, setError] = useState('');
  const sequence = useRef(0);
  const load = useCallback(async () => { const n = ++sequence.current; setLoading(true); setError(''); try { const result = await api<Report>('reports/sales?month=' + applied); if (n === sequence.current) setData(result); } catch (e) { if (n === sequence.current) setError(e instanceof Error ? e.message : 'Không tải được báo cáo'); } finally { if (n === sequence.current) setLoading(false); } }, [applied]);
  useEffect(() => { void load(); return () => { sequence.current++; }; }, [load]);
  function submit(e: FormEvent) { e.preventDefault(); if (month === applied) void load(); else setApplied(month); }
  const pager = usePagination(data?.products || [], applied);
  return <section><h2>Bán hàng theo tháng</h2><form className="sales-controls" onSubmit={submit}><label>Tháng thanh toán<input required type="month" min="2000-01" max="9999-12" value={month} onChange={e => setMonth(e.target.value)} /></label><button disabled={loading} className="primary">Xem báo cáo</button></form>{error && <p className="error" role="alert">{error}</p>}{loading ? <p>Đang tổng hợp…</p> : data && !error && <><p><strong>{data.orders}</strong> đơn đã thanh toán · Tổng thu <strong>{money(data.paid)}</strong></p><p>Tiền mặt {money(data.cash)} · Chuyển khoản {money(data.transfer)}</p><small>Theo thời điểm thanh toán, ngày Việt Nam. Không phải lợi nhuận; chưa tính giá vốn, chi phí và hoàn tiền.</small><div className="table-wrap"><table><thead><tr><th>Món</th><th>Lượng bán</th><th>Thành tiền</th></tr></thead><tbody>{pager.rows.map(p => <tr key={p.id}><td>{p.name}</td><td>{fmt(p.quantity)} {p.unit}</td><td>{money(p.revenue)}</td></tr>)}{!data.products.length && <tr><td colSpan={3}>Chưa có đơn đã thanh toán trong tháng.</td></tr>}</tbody></table></div><Pagination pager={pager} /></>}</section>;
}
