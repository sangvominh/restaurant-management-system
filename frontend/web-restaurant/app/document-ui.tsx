'use client';
import { useEffect, useId, useRef, type ReactNode } from 'react';
export function DocumentCard({ type, title, status, tone = '', children, footer, onOpen }: { type: string; title: string; status: string; tone?: string; children: ReactNode; footer: ReactNode; onOpen: () => void }) {
  return <article className="document-card"><button className="document-open" onClick={onOpen} aria-label={`Mở ${type.toLocaleLowerCase('vi')} ${title}`} /><div className="document-top"><span className="document-type">{type}</span><span className={`document-status ${tone}`}>{status}</span></div><h3>{title}</h3><div className="document-summary">{children}</div><div className="document-footer">{footer}<span aria-hidden="true">Xem chi tiết →</span></div></article>;
}
export function Drawer({ title, children, onClose, locked = false }: { title: string; children: ReactNode; onClose: () => void; locked?: boolean }) {
  const heading = useId(), panel = useRef<HTMLElement>(null), closeRef = useRef(onClose), lockedRef = useRef(locked);
  useEffect(() => { closeRef.current = onClose; lockedRef.current = locked; });
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null, overflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden'; panel.current?.focus();
    function key(e: KeyboardEvent) {
      if (e.key === 'Escape' && !lockedRef.current) { e.preventDefault(); closeRef.current(); }
      if (e.key !== 'Tab') return;
      const nodes = [...(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]') || [])].filter(n => n.getClientRects().length);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (!first) { e.preventDefault(); panel.current?.focus(); }
      else if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = overflow; if (previous?.isConnected) previous.focus(); };
  }, []);
  return <div className="drawer-backdrop" onMouseDown={e => { if (e.target === e.currentTarget && !locked) onClose(); }}><section ref={panel} tabIndex={-1} className="document-drawer" role="dialog" aria-modal="true" aria-labelledby={heading}><div className="drawer-heading"><h2 id={heading}>{title}</h2><button disabled={locked} onClick={onClose} aria-label="Đóng chi tiết">×</button></div><div className="drawer-body">{children}</div></section></div>;
}
