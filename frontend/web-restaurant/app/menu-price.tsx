'use client';
import { useState, type FormEvent } from 'react';
import { api, type Product } from './sales-api';
export default function MenuPrice({ product, saved }: { product: Product; saved: () => Promise<void> }) {
  const [price, setPrice] = useState(product.sellingPrice), [busy, setBusy] = useState(false), [error, setError] = useState('');
  async function submit(e: FormEvent) { e.preventDefault(); setBusy(true); setError(''); try { await api(`products/${product.id}/price`, 'PUT', { price }); await saved(); } catch (e) { setError(e instanceof Error ? e.message : 'Không lưu được giá'); } finally { setBusy(false); } }
  return <details className="menu-price"><summary>Chỉnh giá</summary><form onSubmit={submit}><fieldset disabled={busy}><label>Giá mới (VND)<input required aria-label={'Giá bán ' + product.name} type="number" min="0" step="0.01" value={price} onChange={e => setPrice(e.target.value)} /></label><small>Áp dụng cho lần gọi món mới; giữ giá đã chốt trên đơn cũ.</small>{error && <p className="error" role="alert">{error}</p>}<button disabled={Number(price) === Number(product.sellingPrice)}>Lưu giá</button></fieldset></form></details>;
}
