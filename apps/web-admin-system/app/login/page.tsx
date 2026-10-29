'use client';

import React, { useEffect, useState } from 'react';
import { Alert, Button, ConfigProvider, Form, Input } from 'antd';
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';
import { apiFetch, getToken, getUser, hasPermission, readError, saveSession, type AuthUser } from '../lib/api';

/* ---------- Màu (đồng bộ với các trang quản trị) ---------- */
const C = {
  ink: '#1c1612', // nâu espresso: nền cột trái, chữ chính
  brass: '#9a7230', // đồng đậm: focus, liên kết (đủ tương phản trên nền ngà)
  brassLight: '#d9b26a', // đồng sáng: nét vẽ trên nền tối
  ivory: '#faf7f2', // nền form
  text: '#3b3129',
  muted: '#6f6355', // chữ phụ, đạt tương phản AA trên nền ngà
  line: '#c4b184', // gạch chân ô nhập, đậm hơn một chút để nổi trên nền ngả vàng
};

// Sau khi đăng nhập, đưa người dùng tới trang đầu tiên họ được phép xem.
function landingFor(user: AuthUser): string {
  const pages: [string, string][] = [
    ['/', 'dashboard:view'],
    ['/accounts', 'account:manage'],
    ['/roles', 'role:manage'],
    ['/categories', 'category:manage'],
    ['/settings', 'setting:manage'],
    ['/logs', 'audit:view'],
    ['/backup', 'backup:manage'],
    ['/reports', 'report:view'],
  ];
  return pages.find(([, perm]) => hasPermission(user, perm))?.[0] ?? '/';
}

const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600;700&display=swap');

.lg {
  min-height: 100vh;
  display: grid;
  grid-template-columns: minmax(360px, 46fr) 54fr;
  background: ${C.ivory};
  color: ${C.text};
}

/* ----- Cột trái: bàn ăn dưới đèn ----- */
.lg-hero {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 40px 48px 48px;
  overflow: hidden;
  background:
    radial-gradient(ellipse 70% 50% at 50% 0%, rgba(217,178,106,.22), transparent 72%),
    linear-gradient(180deg, #221a14 0%, #15100c 100%);
}
.lg-brand {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #ecd8a8;
  font-size: 15px;
  font-weight: 500;
  letter-spacing: .02em;
}
.lg-stage {
  flex: 1;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.lg-stage svg { width: min(360px, 82%); height: auto; max-height: 100%; overflow: visible; }
.lg-tagline {
  margin: 0;
  max-width: 14em;
  font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  font-size: 34px;
  font-weight: 600;
  line-height: 1.2;
  color: #f1e6d0;
}

/* Một chuyển động duy nhất: nắp cloche nhấc lên khi đăng nhập thành công */
.lg-lid {
  transform-box: fill-box;
  transform-origin: 50% 100%;
  transition: transform .55s cubic-bezier(.3,.7,.2,1);
}
.lg-lid.is-open { transform: translateY(-30px) rotate(-7deg); }
.lg-glow { opacity: 0; transition: opacity .5s .1s ease; }
.lg-glow.is-open { opacity: 1; }

/* ----- Cột phải: form ----- */
.lg-panel {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 32px;
  /* Nền ngà ngả vàng: ánh đèn từ cột trái lan sang, góc dưới phải đậm hơn cho đỡ trống.
     Vùng có chữ giữ đủ sáng để chữ phụ vẫn đạt tương phản AA. */
  background:
    radial-gradient(ellipse 55% 70% at 0% 45%, rgba(217,178,106,.34), transparent 72%),
    radial-gradient(ellipse 60% 45% at 100% 100%, rgba(184,137,59,.26), transparent 70%),
    linear-gradient(180deg, #fbf3df 0%, #f6e9cc 100%);
}
.lg-card { width: 100%; max-width: 380px; }
.lg-title {
  margin: 0 0 8px;
  font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif;
  font-size: 44px;
  font-weight: 600;
  line-height: 1.05;
  color: ${C.ink};
}
.lg-sub { margin: 0 0 32px; font-size: 15px; line-height: 1.55; color: ${C.muted}; }

.lg .ant-form-item-label > label { color: ${C.text}; font-size: 14px; font-weight: 500; }
.lg .ant-input-affix-wrapper,
.lg .ant-input { background: transparent; }
.lg .ant-input-prefix { margin-inline-end: 10px; color: ${C.muted}; }

.lg .lg-submit.ant-btn {
  height: 52px;
  margin-top: 8px;
  border-radius: 10px;
  border: 1px solid ${C.ink};
  background: ${C.ink};
  color: #f1dfb4;
  font-size: 16px;
  font-weight: 600;
  letter-spacing: .02em;
  box-shadow: none;
}
.lg .lg-submit.ant-btn:not(:disabled):hover {
  background: #2e241d;
  border-color: ${C.brassLight};
  color: #fff3d2;
}
.lg .lg-submit.ant-btn:focus-visible { outline: 3px solid ${C.brassLight}; outline-offset: 3px; }

.lg-help { margin: 24px 0 0; font-size: 13.5px; line-height: 1.55; color: ${C.muted}; }

@media (max-width: 880px) {
  .lg { grid-template-columns: 1fr; grid-template-rows: auto 1fr; }
  .lg-hero { padding: 18px 24px; }
  .lg-stage, .lg-tagline { display: none; }
  .lg-panel { align-items: flex-start; padding: 36px 24px 48px; }
  .lg-title { font-size: 38px; }
}
@media (prefers-reduced-motion: reduce) {
  .lg-lid, .lg-glow { transition: none; }
}
`;

/* Chiếc cloche nhỏ làm biểu tượng thương hiệu */
function Cloche({ size = 26 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" aria-hidden="true">
      <path d="M5 22c0-6 4.5-10.5 11-10.5S27 16 27 22" stroke={C.brassLight} strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="16" cy="9" r="1.8" stroke={C.brassLight} strokeWidth="1.4" />
      <path d="M3 25h26" stroke={C.brassLight} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

export default function LoginPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [opened, setOpened] = useState(false); // nắp cloche đã mở (đăng nhập thành công)
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const u = getUser();
    if (getToken() && u) router.replace(landingFor(u));
  }, [router]);

  const onFinish = async (values: { email: string; password: string }) => {
    setLoading(true);
    setError(null);
    let success = false;
    try {
      const res = await apiFetch('/api/auth/login', {
        method: 'POST',
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(await readError(res, 'Đăng nhập thất bại'));
      const data: { accessToken: string; user: AuthUser } = await res.json();
      saveSession(data.accessToken, data.user);
      success = true;
      setOpened(true);
      // Cho nắp cloche kịp nhấc lên; bỏ qua nếu người dùng chọn giảm chuyển động.
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) await wait(550);
      router.replace(landingFor(data.user));
    } catch (e: any) {
      // Lỗi mạng của fetch có message tiếng Anh khó hiểu -> thay bằng câu dễ hiểu.
      setError(e instanceof TypeError ? 'Không kết nối được máy chủ. Hãy kiểm tra backend đang chạy.' : e.message);
    } finally {
      if (!success) setLoading(false);
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: C.brass, borderRadius: 10, fontFamily: 'inherit', colorBorder: C.line },
        components: { Input: { activeBorderColor: C.brass, hoverBorderColor: C.brassLight, activeShadow: 'none' } },
      }}
    >
      <style>{css}</style>
      <main className="lg">
        <section className="lg-hero" aria-label="Giới thiệu">
          <div className="lg-brand">
            <Cloche />
            <span>Quản lý MRP Nhà hàng</span>
          </div>

          <div className="lg-stage" aria-hidden="true">
            {/* SVG:start */}
            <svg viewBox="0 0 360 520" fill="none">
              <defs>
                <linearGradient id="lg-beam" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="#d9b26a" stopOpacity="0.30" />
                  <stop offset="1" stopColor="#d9b26a" stopOpacity="0" />
                </linearGradient>
                <radialGradient id="lg-pool" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0" stopColor="#d9b26a" stopOpacity="0.35" />
                  <stop offset="1" stopColor="#d9b26a" stopOpacity="0" />
                </radialGradient>
              </defs>
              <path d="M180 0v98" stroke="#d9b26a" strokeWidth="1.2" strokeOpacity="0.7" />
              <path d="M140 134c0-24 18-36 40-36s40 12 40 36z" stroke="#d9b26a" strokeWidth="1.5" strokeLinejoin="round" />
              <ellipse cx="180" cy="137" rx="15" ry="4" fill="#ecd8a8" />
              <path d="M154 140h52l124 304H30z" fill="url(#lg-beam)" />
              <ellipse cx="180" cy="452" rx="150" ry="22" fill="url(#lg-pool)" />
              <path d="M24 452h312" stroke="#d9b26a" strokeWidth="1" strokeOpacity="0.35" />
              <ellipse cx="180" cy="444" rx="98" ry="11" stroke="#d9b26a" strokeWidth="1.5" />
              <ellipse cx="180" cy="444" rx="72" ry="7" stroke="#d9b26a" strokeWidth="1" strokeOpacity="0.5" />
              <ellipse className={`lg-glow${opened ? ' is-open' : ''}`} cx="180" cy="438" rx="52" ry="9" fill="#ecd8a8" fillOpacity="0.55" />
              <g className={`lg-lid${opened ? ' is-open' : ''}`}>
                <path d="M98 440c0-62 38-100 82-100s82 38 82 100z" fill="#d9b26a" fillOpacity="0.07" stroke="#d9b26a" strokeWidth="1.6" strokeLinejoin="round" />
                <circle cx="180" cy="329" r="6.5" stroke="#d9b26a" strokeWidth="1.5" />
                <path d="M120 420c2-30 20-54 44-64" stroke="#d9b26a" strokeWidth="1.4" strokeOpacity="0.5" strokeLinecap="round" />
              </g>
            </svg>
            {/* SVG:end */}
          </div>

          <p className="lg-tagline">
            Bếp gọn, kho đủ,
            <br />
            sổ sách rõ.
          </p>
        </section>

        <section className="lg-panel">
          <div className="lg-card">
            <h1 className="lg-title">Đăng nhập</h1>
            <p className="lg-sub">Dùng email và mật khẩu do quản trị viên cấp để vào khu vực quản trị.</p>

            {error && <Alert type="error" showIcon message={error} style={{ marginBottom: 20 }} />}

            <Form layout="vertical" onFinish={onFinish} requiredMark={false} disabled={opened}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  { required: true, message: 'Vui lòng nhập email!' },
                  { type: 'email', message: 'Email không đúng định dạng!' },
                ]}
              >
                <Input
                  variant="underlined"
                  size="large"
                  prefix={<MailOutlined />}
                  placeholder="ten@nhahang.vn"
                  autoComplete="username"
                />
              </Form.Item>
              <Form.Item label="Mật khẩu" name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]}>
                <Input.Password variant="underlined" size="large" prefix={<LockOutlined />} autoComplete="current-password" />
              </Form.Item>
              <Button type="primary" htmlType="submit" size="large" block loading={loading} className="lg-submit">
                Đăng nhập
              </Button>
            </Form>

            <p className="lg-help">Quên mật khẩu? Nhờ quản trị viên đặt lại trong mục Quản lý tài khoản.</p>
          </div>
        </section>
      </main>
    </ConfigProvider>
  );
}
