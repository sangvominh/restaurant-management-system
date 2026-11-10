'use client';
import LineChange from './line-change';
import { can, dispatched, fmt, money, type Sale, type Product, type User } from './sales-api';
export default function ConfirmedItems({ sale, products, user, busy, change }: {
  sale: Sale; products: Product[]; user: User; busy: boolean;
  change: (body: { lineId: string; quantity: string; reason: string }) => Promise<boolean>;
}) {
  const confirmed = sale.lines.filter(l => l.sentAt && Number(l.quantity) > 0);
  if (!confirmed.length) return null;
  return <section className="confirmed-order"><div className="order-section-label"><h3>Đã xác nhận</h3><span>{confirmed.length} dòng món</span></div><p className="order-section-help">Đã giữ lượng cho bàn này. Muốn gọi thêm, chọn món từ thực đơn.</p>
    {confirmed.map(l => {
      const allocation = products.find(p => p.id === l.productId)?.allocations.find(a => a.lineId === l.id);
      const legacy = dispatched(sale, l.id) > 0 || sale.exports.some(e => e.status === 'PENDING');
      return <article className="confirmed-item" key={l.id}><div className="confirmed-item-heading"><div><strong>{l.productName}</strong><small>{fmt(l.quantity)} {l.product.unit.symbol} × {money(l.unitPrice)}</small></div><strong>{money(Number(l.quantity) * Number(l.unitPrice))}</strong></div>{l.note && <p className="confirmed-note">{l.note}</p>}{legacy && <p className="error">Đơn thuộc luồng xuất bán cũ.</p>}{Number(allocation?.missing || 0) > 0 && <p className="error">Tồn cửa hàng đã thay đổi. Đối chiếu món trước khi thu tiền.</p>}{sale.status === 'CONFIRMED' && !legacy && can(user, 'sale:create') && <LineChange line={l} maximum={Number(l.quantity)} busy={busy} apply={change} />}</article>;
    })}
  </section>;
}
