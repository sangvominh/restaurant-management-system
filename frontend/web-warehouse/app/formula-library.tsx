'use client';
import { useId, useState } from 'react';
import { Pagination, usePagination } from './list-pagination';
import { StatusBadge } from './status-ui';
export type Formula = { id: string; productId: string; version: number; effectiveAt: string; status: string; product: { id: string; code: string; name: string; unit: { symbol: string } }; lines: { materialId: string }[] };
type Group = { product: Formula['product']; versions: Formula[]; all: Formula[]; current?: Formula };
export default function FormulaLibrary({ all, filtered, stateOf, open, createVersion, editable, busy, resetKey, autoExpand }: { all: Formula[]; filtered: Formula[]; stateOf: (b: Formula) => string; open: (id: string) => void; createVersion: (productId: string) => void; editable: boolean; busy: boolean; resetKey: string; autoExpand: boolean }) {
  const [expandedState, setExpandedState] = useState({ key: resetKey, id: '' });
  const grouped = new Map<string, Group>();
  for (const b of filtered) {
    if (!grouped.has(b.productId)) {
      const versions = all.filter(x => x.productId === b.productId);
      grouped.set(b.productId, { product: b.product, versions: [], all: versions, current: versions.find(x => stateOf(x) === 'CURRENT') });
    }
    grouped.get(b.productId)!.versions.push(b);
  }
  const groups = [...grouped.values()].sort((a, b) => a.product.name.localeCompare(b.product.name, 'vi'));
  const pager = usePagination(groups, resetKey);
  const expandedId = expandedState.key === resetKey ? expandedState.id : autoExpand ? pager.rows[0]?.product.id : '';
  return <><div className="formula-library">{pager.rows.map(group => <FormulaGroup key={group.product.id} group={group} stateOf={stateOf} open={open} createVersion={createVersion} editable={editable} busy={busy} resetKey={resetKey} expanded={expandedId === group.product.id} toggle={() => setExpandedState({ key: resetKey, id: expandedId === group.product.id ? '' : group.product.id })} />)}</div>{!groups.length && <p className="empty">Không có công thức phù hợp.</p>}<Pagination pager={pager} disabled={busy} /></>;
}
function FormulaGroup({ group, stateOf, open, createVersion, editable, busy, resetKey, expanded, toggle }: { group: Group; stateOf: (b: Formula) => string; open: (id: string) => void; createVersion: (id: string) => void; editable: boolean; busy: boolean; resetKey: string; expanded: boolean; toggle: () => void }) {
  const panelId = useId();
  const versions = [...group.versions].sort((a, b) => b.version - a.version);
  const pager = usePagination(versions, resetKey);
  const drafts = group.all.filter(b => b.status === 'DRAFT').length;
  return <section className="formula-group">
    <div className="formula-group-heading"><button className="formula-group-toggle" aria-expanded={expanded} aria-controls={panelId} onClick={toggle}><svg className={expanded ? 'expanded' : ''} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden="true"><path d="m9 5 7 7-7 7" /></svg><span><strong>{group.product.name}</strong><small>{group.product.code} · {group.all.length} phiên bản{drafts ? ` · ${drafts} bản nháp` : ''}</small></span></button>
      <div className="formula-current">{group.current ? <><span className="formula-current-label">Đang dùng <strong>v{group.current.version}</strong></span><small>Từ {new Date(group.current.effectiveAt).toLocaleString('vi-VN')}</small></> : <span className="formula-not-ready">Chưa có công thức có hiệu lực</span>}</div>
      {editable && <button className="row-primary" disabled={busy} onClick={() => createVersion(group.product.id)} aria-label={`Tạo phiên bản công thức mới cho ${group.product.name}`}>+ Phiên bản mới</button>}
    </div>
    <div id={panelId} hidden={!expanded} className="formula-history">
      {group.versions.length !== group.all.length && <p className="formula-match-count">Hiển thị {group.versions.length} / {group.all.length} phiên bản theo bộ lọc</p>}
      <ol className="version-timeline">{pager.rows.map(b => <li key={b.id} className={stateOf(b) === 'CURRENT' ? 'current' : ''}><button className="version-open" disabled={busy} onClick={() => open(b.id)}><span className="version-title"><strong>Phiên bản {b.version}</strong><StatusBadge area="bom" code={stateOf(b)} /></span><span className="version-description">{b.lines.length} nguyên liệu · {b.status === 'DRAFT' ? 'Dự kiến hiệu lực' : 'Hiệu lực từ'} {new Date(b.effectiveAt).toLocaleString('vi-VN')}</span><span className="version-open-label">Xem định mức và thao tác <span aria-hidden="true">→</span></span></button></li>)}</ol>
      {versions.length > 12 && <Pagination pager={pager} disabled={busy} />}
    </div>
  </section>;
}
