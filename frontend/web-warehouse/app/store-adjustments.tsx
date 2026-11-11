'use client';
import { useCallback, useEffect, useState } from 'react';
import { api } from './catalog-api';
import { Pagination, usePagination } from './list-pagination';
type Doc = { lot: { code: string; expiryDate: string } | null; id: string; kind: string; status: string; quantity: string; reason: string; requestedAt: string; approvedAt: string | null; requestedBy: { name: string }; reviewedBy: { name: string } | null; product: { name: string; unit: { symbol: string } } };
export default function StoreAdjustments() {
  const [docs, setDocs] = useState<Doc[]>([]), [error, setError] = useState(''), [busy, setBusy] = useState(false), [filter, setFilter] = useState('PENDING');
  const load = useCallback(async () => { setError(''); try { setDocs(await api<Doc[]>('store/adjustments')); } catch (e) { setError(e instanceof Error ? e.message : 'Không tải được'); } }, []);
  useEffect(() => { const initial = window.setTimeout(() => void load(), 0); return () => window.clearTimeout(initial); }, [load]);
  async function review(doc: Doc, action: 'approve' | 'reject') {
    if (!window.confirm(action === 'reject' ? 'Từ chối đề nghị?' : doc.kind === 'RETURN' ? 'Đã kiểm tra chất lượng và nhận hàng hoàn? Cửa hàng giảm, kho tăng.' : 'Xác nhận hủy/hao hụt tại cửa hàng? Lượng này không được nhập lại kho.')) return;
    setBusy(true); setError('');
    try { await api('store/adjustments/' + doc.id + '/' + action, 'POST'); await load(); } catch (e) { setError(e instanceof Error ? e.message : 'Không duyệt được'); } finally { setBusy(false); }
  }
  const shown = docs.filter(d => !filter || d.status === filter), pager = usePagination(shown, filter);
  return <section className="panel"><h2>Hoàn / hao hụt tại cửa hàng</h2><div className="list-controls"><button disabled={busy} onClick={() => void load()}>Tải lại</button><select aria-label="Lọc đề nghị cửa hàng" value={filter} onChange={e => setFilter(e.target.value)}><option value="PENDING">Chờ duyệt</option><option value="">Tất cả, gồm lịch sử</option></select></div>{error && <p className="error" role="alert">{error}</p>}<div className="table-wrap"><table><thead><tr><th>Đề nghị</th><th>Thành phẩm</th><th>Số lượng</th><th>Lý do / người lập</th><th>Xử lý</th></tr></thead><tbody>{pager.rows.map(d => <tr key={d.id}><td>{d.kind === 'RETURN' ? 'Hoàn về kho' : 'Hao hụt / hủy'}<small>{d.id.slice(0,8)} · {new Date(d.requestedAt).toLocaleString('vi-VN')}</small></td><td>{d.product.name}{d.lot && <small>Lô {d.lot.code} · HSD {d.lot.expiryDate.slice(0, 10)}</small>}</td><td>{Number(d.quantity).toLocaleString('vi-VN')} {d.product.unit.symbol}</td><td>{d.reason}<small>{d.requestedBy.name}</small></td><td>{d.status === 'PENDING' ? <div className="actions"><button disabled={busy} onClick={() => void review(d, 'reject')}>Từ chối</button><button className="primary" disabled={busy} onClick={() => void review(d, 'approve')}>Duyệt</button></div> : <>{d.status === 'APPROVED' ? 'Đã ghi sổ' : 'Từ chối'}<small>{d.reviewedBy?.name} · {d.approvedAt && new Date(d.approvedAt).toLocaleString('vi-VN')}</small></>}</td></tr>)}</tbody></table></div>{!shown.length && <p className="empty">Không có đề nghị phù hợp.</p>}<Pagination pager={pager} /></section>;
}
