'use client';
import { useState } from 'react';
import { fmt, money, type Product } from './sales-api';
export default function OrderMenu({ products, selected, disabled, full, add }: {
  products: Product[]; selected: Record<string, number>; disabled: boolean; full: boolean; add: (product: Product) => void;
}) {
  const [search, setSearch] = useState(''), [category, setCategory] = useState(''), [onlyReady, setOnlyReady] = useState(true);
  const categories = [...new Set(products.map(p => p.category.name))].sort((a, b) => a.localeCompare(b, 'vi'));
  const query = search.trim().toLocaleLowerCase('vi');
  const shown = products.filter(p => (!onlyReady || Number(p.available) > 0) && (!category || category === p.category.name) && (p.name + ' ' + p.code).toLocaleLowerCase('vi').includes(query)).sort((a, b) => Number(Number(b.available) > 0) - Number(Number(a.available) > 0) || a.name.localeCompare(b.name, 'vi'));
  return <section className="pos-menu" aria-label="Chọn món"><div className="order-menu-heading"><div><h3>Chọn món</h3><p>Bấm món để thêm vào phần đang chọn bên phải.</p></div><label className="order-stock-toggle"><input type="checkbox" checked={onlyReady} onChange={e => setOnlyReady(e.target.checked)} />Chỉ món còn bán</label></div>
    <input type="search" autoComplete="off" aria-label="Tìm món" placeholder="Tìm tên hoặc mã món…" value={search} onChange={e => setSearch(e.target.value)} />
    <div className="pos-categories" aria-label="Nhóm món"><button className={!category ? 'is-active' : ''} aria-pressed={!category} onClick={() => setCategory('')}>Tất cả</button>{categories.map(c => <button key={c} className={category === c ? 'is-active' : ''} aria-pressed={category === c} onClick={() => setCategory(c)}>{c}</button>)}</div>
    <div className="pos-menu-grid">{shown.map(p => {
      const choosing = selected[p.id] || 0, remaining = Math.max(0, Math.round((Number(p.available) - choosing) * 1000) / 1000);
      const unavailable = disabled || remaining <= 0 || full && !choosing;
      return <button key={p.id} className={'pos-menu-item' + (choosing ? ' is-choosing' : '')} disabled={unavailable} onClick={() => add(p)} aria-label={'Thêm ' + p.name + ', còn chọn được ' + fmt(remaining) + ' ' + p.unit.symbol}>
        <span className="menu-item-top"><strong>{p.name}</strong>{choosing > 0 && <span className="menu-chosen-count">Đang chọn {fmt(choosing)}</span>}</span><span>{money(p.sellingPrice)} <small>/ {p.unit.symbol}</small></span>
        <small className={remaining > 0 ? 'menu-ready' : 'menu-out'}>{Number(p.available) <= 0 ? 'Hết tại cửa hàng' : remaining <= 0 ? 'Đã chọn hết lượng còn bán' : 'Còn chọn được ' + fmt(remaining) + ' ' + p.unit.symbol}</small>
        <span className="menu-add-hint" aria-hidden="true">{remaining > 0 ? '+ Thêm món' : 'Không thể thêm'}</span>
      </button>;
    })}</div>{!shown.length && <div className="pos-empty"><p>{search || category ? 'Không tìm thấy món phù hợp.' : onlyReady ? 'Cửa hàng hiện chưa có món còn bán.' : 'Chưa có món trên thực đơn.'}</p>{(search || category || onlyReady) && <button onClick={() => { setSearch(''); setCategory(''); setOnlyReady(false); }}>Xem toàn bộ thực đơn</button>}</div>}
  </section>;
}

