export default function DashboardPage() {
  return (
    <div>
      <h1>📊 Dashboard</h1>
      <p style={{ color: '#666' }}>Chào mừng đến với hệ thống quản lý nhà hàng.</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginTop: '24px' }}>
        {[
          { label: 'Sản phẩm', href: '/products', icon: '📦', desc: 'Quản lý sản phẩm bán ra' },
          { label: 'Công thức', href: '/recipes', icon: '📋', desc: 'Cấu hình định lượng nguyên liệu' },
          { label: 'Phiếu xuất', href: '/export-orders', icon: '📝', desc: 'Duyệt phiếu xuất thành phẩm' },
        ].map((card) => (
          <a
            key={card.href}
            href={card.href}
            style={{
              background: '#fff',
              borderRadius: '8px',
              padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              textDecoration: 'none',
              color: '#333',
              display: 'block',
            }}
          >
            <div style={{ fontSize: '32px' }}>{card.icon}</div>
            <h3 style={{ margin: '12px 0 4px' }}>{card.label}</h3>
            <p style={{ margin: 0, color: '#888', fontSize: '14px' }}>{card.desc}</p>
          </a>
        ))}
      </div>
    </div>
  );
}

