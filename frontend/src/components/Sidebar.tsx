import Link from 'next/link';

const navItems = [
  { href: '/', label: '🏠 Dashboard' },
  { href: '/products', label: '📦 Sản phẩm' },
  { href: '/recipes', label: '📋 Công thức' },
  { href: '/export-orders', label: '📝 Phiếu xuất' },
];

export function Sidebar() {
  return (
    <aside style={{
      width: '220px',
      minHeight: '100vh',
      background: '#1a1a2e',
      color: '#eee',
      padding: '24px 0',
      flexShrink: 0,
    }}>
      <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #333', fontWeight: 'bold', fontSize: '16px' }}>
        🍽️ Restaurant Admin
      </div>
      <nav style={{ marginTop: '16px' }}>
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              display: 'block',
              padding: '12px 20px',
              color: '#ccc',
              textDecoration: 'none',
              fontSize: '14px',
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}

