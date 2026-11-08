'use client';
import { useEffect, useId, useRef, type ReactNode } from 'react';

const paths = {
  accounts: 'M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M13 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0M17 8h5M19.5 5.5v5',
  roles: 'M12 3 3 7v5c0 5 9 9 9 9s9-4 9-9V7ZM8 12l3 3 5-6',
  employees: 'M4 3h16v18H4ZM8 3v18M11 8h6M11 12h6M11 16h4',
  search: 'M21 21l-5-5M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0',
  plus: 'M12 5v14M5 12h14', edit: 'm15 4 5 5M4 20l4-1L21 6l-4-4L4 15ZM13 20h8',
  trash: 'M3 6h18M9 6V3h6v3M5 6l1 15h12l1-15M10 10v7M14 10v7',
  logout: 'M9 4H4v16h5M10 12h11M17 8l4 4-4 4',
};
export function Icon({ name }: { name: keyof typeof paths }) {
  return <svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round"><path d={paths[name]} /></svg>;
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
      const nodes = [...(panel.current?.querySelectorAll<HTMLElement>('button:not(:disabled),input:not(:disabled),select:not(:disabled),textarea:not(:disabled),a[href],[tabindex="0"]') || [])].filter(n => !n.matches(':disabled') && n.getClientRects().length);
      const first = nodes[0], last = nodes[nodes.length - 1];
      if (!first) { e.preventDefault(); panel.current?.focus(); }
      else if (e.shiftKey && (document.activeElement === first || document.activeElement === panel.current)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && (document.activeElement === last || document.activeElement === panel.current)) { e.preventDefault(); first.focus(); }
    }
    document.addEventListener('keydown', key);
    return () => { document.removeEventListener('keydown', key); document.body.style.overflow = overflow; if (previous?.isConnected) previous.focus(); };
  }, []);
  return <div className="drawer-backdrop" onMouseDown={e => { if (e.target === e.currentTarget && !locked) onClose(); }}><section ref={panel} tabIndex={-1} className="editor-drawer" role="dialog" aria-modal="true" aria-labelledby={heading}><div className="drawer-heading"><h2 id={heading}>{title}</h2><button className="icon-button" disabled={locked} onClick={onClose} aria-label="Đóng">×</button></div><div className="drawer-body">{children}</div></section></div>;
}

