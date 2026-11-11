'use client';
import { useEffect, useId, useRef, type ReactNode } from 'react';
export function DocumentCard({ type, title, status, tone = '', children, footer, onOpen }: { type: string; title: string; status: string; tone?: string; reference?: string; children: ReactNode; footer: ReactNode; onOpen: () => void }) {
  return <article className="document-card"><button className="document-open" onClick={onOpen} title={status} aria-label={`Mở ${type.toLocaleLowerCase('vi')} ${title} · ${status}`} /><span className={`card-corner-status ${tone}`} role="img" aria-label={status} title={status}><svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{tone === 'done' ? <path d="m5 12 4 4L19 6" /> : tone === 'pending' ? <><circle cx="12" cy="12" r="8" /><path d="M12 7v5l3 2" /></> : tone === 'rejected' ? <path d="m6 6 12 12M6 18 18 6" /> : tone === 'draft' ? <path d="m5 16 10-10 3 3L8 19H5ZM14 7l3 3" /> : tone === 'info' ? <><path d="m9 5 10 7-10 7Z" /></> : <path d="M6 12h12" />}</svg></span><h3>{title}</h3><div className="document-summary">{children}</div><div className="document-footer">{footer}<span aria-hidden="true">Xem chi tiết →</span></div></article>;
}
export function Drawer({ title, children, onClose, locked = false, form = false }: { title: string; children: ReactNode; onClose: () => void; locked?: boolean; form?: boolean }) {
  const heading = useId(), panel = useRef<HTMLElement>(null), closeRef = useRef(onClose), lockedRef = useRef(locked);
  useEffect(() => { closeRef.current = onClose; lockedRef.current = locked; });
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; panel.current?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === 'Escape' && !lockedRef.current) { e.preventDefault(); closeRef.current(); }
      if (e.key !== 'Tab') return;
      const nodes = [...(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]') || [])].filter(n => !n.matches(':disabled') && n.getClientRects().length);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (!first) { e.preventDefault(); panel.current?.focus(); }
      else if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = overflow; if (previous?.isConnected) previous.focus(); };
  }, []);
  return <div className="drawer-backdrop" onMouseDown={e => { if (e.target === e.currentTarget && !locked) onClose(); }}><section ref={panel} tabIndex={-1} className={form ? "document-drawer form-dialog" : "document-drawer"} role="dialog" aria-modal="true" aria-labelledby={heading}><div className="drawer-heading"><h2 id={heading}>{title}</h2>{!form && <button disabled={locked} onClick={onClose} aria-label="Đóng">×</button>}</div><div className="drawer-body">{children}</div></section></div>;
}
export function AppIcon({name}:{name:'tables'|'sales'|'kitchen'|'products'}) {
 const paths={tables:'M4 7h16v10H4ZM7 3v4M17 3v4M7 17v4M17 17v4',sales:'M5 3h14v18l-3-2-4 2-4-2-3 2ZM8 8h8M8 12h6',kitchen:'M7 13a4 4 0 1 1-2-7 5 5 0 0 1 9-1 4 4 0 1 1 3 8v7H7ZM7 16h10',products:'M4 4h6v6H4ZM14 4h6v6h-6ZM4 14h6v6H4ZM14 14h6v6h-6Z'};
 return <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name]}/></svg>;
}

