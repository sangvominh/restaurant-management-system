'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, ConfigProvider, Progress, Row, Space, Spin, Tag, Typography, message } from 'antd';
import {
  AlertOutlined,
  ArrowUpOutlined,
  CheckCircleFilled,
  DesktopOutlined,
  ExclamationCircleFilled,
  ReloadOutlined,
  SafetyCertificateOutlined,
  SafetyOutlined,
  SettingOutlined,
  TeamOutlined,
  UserAddOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { apiFetch, readError } from './../lib/api';

const { Text } = Typography;

/* ---------- Design tokens ---------- */
const C = {
  ink: '#1c1612',
  inkSoft: '#2e241d',
  gold: '#b8893b',
  goldLight: '#d9b26a',
  ivory: '#faf7f2',
  card: '#ffffff',
  line: '#ece5d8',
  text: '#3b3129',
  muted: '#8a7d70',
  ok: '#4f8a5b',
  warn: '#c9822b',
  danger: '#b5483a',
};

const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";

/* ---------- Types ---------- */
type LogStatus = 'success' | 'warning';

interface LogItem {
  id: number;
  action: string;
  user: string;
  time: string;
  status: LogStatus;
}

interface Kpi {
  key: string;
  title: string;
  value: number;
  note: string;
  noteTone: 'up' | 'neutral' | 'warn';
  icon: React.ReactNode;
  spark: number[];
}

interface ModuleItem {
  name: string;
  desc: string;
  online: boolean;
}

interface DashboardData {
  restaurantName: string;
  metrics: {
    totalAccounts: number;
    activeAccounts: number;
    lockedAccounts: number;
    totalRoles: number;
    assignedRoles: number;
    totalCategories: number;
    activeCategories: number;
    categoryTypesCount: number;
  };
  logs: LogItem[];
}

const modules: ModuleItem[] = [
  { name: 'Bán hàng & Gọi món', desc: 'POS, đơn tại bàn', online: true },
  { name: 'Quản lý kho', desc: 'Nguyên liệu, nhập xuất', online: true },
  { name: 'Bếp & Pha chế', desc: 'Màn hình bếp (KDS)', online: true },
  { name: 'Nhân sự & Ca làm', desc: 'Chấm công, phân quyền', online: true },
];

/* ---------- Small components ---------- */
function Sparkline({ data, color }: { data: number[]; color: string }) {
  const w = 96;
  const h = 32;
  const max = Math.max(...data, 1);
  const min = Math.min(...data);
  const range = max - min || 1;
  const pts = data
    .map((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - 4 - ((v - min) / range) * (h - 8);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(' ');
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} aria-hidden>
      <polyline fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" points={pts} />
    </svg>
  );
}

function SectionTitle({ title, extra }: { title: string; extra?: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ width: 3, height: 18, background: C.gold, borderRadius: 2 }} />
        <span style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, color: C.ink }}>{title}</span>
      </div>
      {extra}
    </div>
  );
}

function GaugeCard({
  label,
  percent,
  detail,
  color,
  warn,
}: {
  label: string;
  percent: number;
  detail: string;
  color: string;
  warn?: boolean;
}) {
  return (
    <div style={{ textAlign: 'center' }}>
      <Progress
        type="dashboard"
        percent={percent}
        size={112}
        strokeColor={color}
        trailColor="#f1ebe0"
        strokeWidth={7}
        format={(p) => (
          <span style={{ fontFamily: serif, fontSize: 22, fontWeight: 600, color: warn ? C.warn : C.ink }}>{p}%</span>
        )}
      />
      <div style={{ marginTop: -6, fontWeight: 600, color: C.text, fontSize: 13 }}>{label}</div>
      <div style={{ color: C.muted, fontSize: 12 }}>{detail}</div>
    </div>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap');
.rd-card { transition: transform .25s ease, box-shadow .25s ease; }
.rd-card:hover { transform: translateY(-3px); box-shadow: 0 14px 32px -16px rgba(60,40,15,.28) !important; }
.rd-log:hover { background: #fcfaf5; }
`;

/* ---------- Page ---------- */
export default function DashboardPage() {
  const router = useRouter();
  const [today, setToday] = useState<string>('');
  const [greeting, setGreeting] = useState<string>('Xin chào');
  const [loading, setLoading] = useState<boolean>(true);
  const [dashboard, setDashboard] = useState<DashboardData>({
    restaurantName: 'Hệ thống Quản lý MRP',
    metrics: {
      totalAccounts: 0,
      activeAccounts: 0,
      lockedAccounts: 0,
      totalRoles: 0,
      assignedRoles: 0,
      totalCategories: 0,
      activeCategories: 0,
      categoryTypesCount: 0,
    },
    logs: [],
  });

  const fetchDashboard = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/admin/dashboard`);
      if (!res.ok) throw new Error(await readError(res, 'Không tải được dữ liệu tổng quan'));
      const data: DashboardData = await res.json();
      setDashboard(data);
    } catch (error: any) {
      console.error(error);
      message.error(error instanceof TypeError ? 'Không kết nối được với Backend NestJS!' : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const now = new Date();
    setToday(
      now.toLocaleDateString('vi-VN', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }),
    );
    const h = now.getHours();
    setGreeting(h < 11 ? 'Chào buổi sáng' : h < 14 ? 'Chào buổi trưa' : h < 18 ? 'Chào buổi chiều' : 'Chào buổi tối');

    fetchDashboard();
  }, []);

  const { metrics, logs, restaurantName } = dashboard;

  const kpis: Kpi[] = [
    {
      key: 'accounts',
      title: 'Tổng số tài khoản',
      value: metrics.totalAccounts,
      note: `${metrics.activeAccounts} đang hoạt động`,
      noteTone: 'up',
      icon: <UserOutlined />,
      spark: [1, 2, 2, 3, 3, Math.max(metrics.totalAccounts - 1, 1), metrics.totalAccounts],
    },
    {
      key: 'roles',
      title: 'Nhóm quyền',
      value: metrics.totalRoles,
      note: `Đã phân bổ ${metrics.assignedRoles} nhóm`,
      noteTone: 'neutral',
      icon: <SafetyCertificateOutlined />,
      spark: [2, 3, 3, 4, 4, metrics.totalRoles, metrics.totalRoles],
    },
    {
      key: 'categories',
      title: 'Danh mục chung',
      value: metrics.totalCategories,
      note: `${metrics.categoryTypesCount} loại danh mục`,
      noteTone: 'neutral',
      icon: <DesktopOutlined />,
      spark: [2, 3, 4, 4, 5, metrics.totalCategories, metrics.totalCategories],
    },
    {
      key: 'alerts',
      title: 'Tài khoản bị khóa',
      value: metrics.lockedAccounts,
      note: metrics.lockedAccounts > 0 ? 'Cần kiểm tra trạng thái' : 'Không có tài khoản khóa',
      noteTone: metrics.lockedAccounts > 0 ? 'warn' : 'neutral',
      icon: <AlertOutlined />,
      spark: [0, 0, 1, 0, 1, metrics.lockedAccounts, metrics.lockedAccounts],
    },
  ];

  const cardStyle: React.CSSProperties = {
    border: `1px solid ${C.line}`,
    borderRadius: 16,
    background: C.card,
    boxShadow: '0 1px 2px rgba(60,40,15,.04)',
  };

  const toneColor = (t: Kpi['noteTone']) => (t === 'up' ? C.ok : t === 'warn' ? C.warn : C.muted);

  return (
    <ConfigProvider
      theme={{
        token: { colorPrimary: C.gold, borderRadius: 10, colorText: C.text, fontFamily: 'inherit' },
      }}
    >
      <style>{css}</style>
      <div style={{ background: C.ivory, padding: 24, borderRadius: 20, minHeight: '100%' }}>
        {/* ===== Hero ===== */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 20,
            padding: '32px 36px',
            background: `linear-gradient(120deg, ${C.ink} 0%, ${C.inkSoft} 60%, #3d2d20 100%)`,
            color: '#fff',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -60,
              top: -80,
              width: 300,
              height: 300,
              borderRadius: '50%',
              background: `radial-gradient(circle, ${C.gold}55 0%, transparent 70%)`,
            }}
          />
          <div
            style={{
              position: 'relative',
              display: 'flex',
              flexWrap: 'wrap',
              gap: 20,
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div>
              <div
                style={{
                  color: C.goldLight,
                  letterSpacing: 3,
                  fontSize: 11,
                  textTransform: 'uppercase',
                  marginBottom: 8,
                }}
              >
                {restaurantName} {today && `· ${today}`}
              </div>
              <div style={{ fontFamily: serif, fontSize: 30, fontWeight: 600, lineHeight: 1.25 }}>
                {greeting}, Admin
              </div>
              <div style={{ color: 'rgba(255,255,255,.65)', marginTop: 6, fontSize: 14 }}>
                Tổng quan vận hành và bảo mật toàn bộ hệ thống nhà hàng.
              </div>
              <div
                style={{
                  marginTop: 14,
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 8,
                  padding: '4px 12px',
                  borderRadius: 999,
                  background: 'rgba(255,255,255,.08)',
                  border: '1px solid rgba(255,255,255,.14)',
                  fontSize: 12,
                }}
              >
                <span
                  style={{
                    width: 7,
                    height: 7,
                    borderRadius: '50%',
                    background: '#6fcf8a',
                    boxShadow: '0 0 0 3px rgba(111,207,138,.25)',
                  }}
                />
                PostgreSQL & NestJS đang hoạt động ổn định
              </div>
            </div>
            <Space wrap>
              <Button
                size="large"
                icon={<ReloadOutlined />}
                onClick={fetchDashboard}
                loading={loading}
                style={{
                  background: 'rgba(255,255,255,0.1)',
                  borderColor: 'rgba(255,255,255,0.2)',
                  color: '#fff',
                }}
              >
                Làm mới
              </Button>
              <Button
                size="large"
                icon={<UserAddOutlined />}
                onClick={() => router.push('/accounts')}
                style={{ background: C.gold, borderColor: C.gold, color: '#fff', fontWeight: 600 }}
              >
                Thêm tài khoản
              </Button>
              <Button
                size="large"
                icon={<SettingOutlined />}
                ghost
                onClick={() => router.push('/roles')}
                style={{ color: '#fff', borderColor: 'rgba(255,255,255,.35)' }}
              >
                Phân quyền
              </Button>
            </Space>
          </div>
        </div>

        <Spin spinning={loading}>
          {/* ===== KPI ===== */}
          <Row gutter={[16, 16]}>
            {kpis.map((k) => (
              <Col xs={24} sm={12} xl={6} key={k.key}>
                <Card className="rd-card" style={cardStyle} styles={{ body: { padding: 20 } }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: 12,
                        display: 'grid',
                        placeItems: 'center',
                        background: k.key === 'alerts' ? '#fbf0e0' : '#f6efe1',
                        color: k.key === 'alerts' ? C.warn : C.gold,
                        fontSize: 18,
                      }}
                    >
                      {k.icon}
                    </div>
                    <Sparkline data={k.spark} color={k.key === 'alerts' ? C.warn : C.goldLight} />
                  </div>
                  <div style={{ marginTop: 16, color: C.muted, fontSize: 13 }}>{k.title}</div>
                  <div style={{ fontFamily: serif, fontSize: 38, fontWeight: 600, color: C.ink, lineHeight: 1.15 }}>
                    {k.value}
                  </div>
                  <div
                    style={{
                      marginTop: 6,
                      fontSize: 12.5,
                      color: toneColor(k.noteTone),
                      display: 'flex',
                      alignItems: 'center',
                      gap: 4,
                    }}
                  >
                    {k.noteTone === 'up' && <ArrowUpOutlined />}
                    {k.noteTone === 'warn' && <ExclamationCircleFilled />}
                    {k.note}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>

          {/* ===== Server + Modules ===== */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24} lg={14}>
              <Card style={{ ...cardStyle, height: '100%' }} styles={{ body: { padding: 24 } }}>
                <SectionTitle
                  title="Tình trạng máy chủ"
                  extra={
                    <Tag style={{ margin: 0 }}>Số liệu minh họa</Tag>
                  }
                />
                <Row gutter={16} justify="space-around">
                  <Col xs={24} sm={8}>
                    <GaugeCard label="CPU" percent={32} detail="Minh họa (chưa đo thật)" color={`${C.goldLight}`} />
                  </Col>
                  <Col xs={24} sm={8}>
                    <GaugeCard label="RAM" percent={50} detail="8GB / 16GB" color={C.gold} />
                  </Col>
                  <Col xs={24} sm={8}>
                    <GaugeCard
                      label="Tỷ lệ Tài khoản Active"
                      percent={
                        metrics.totalAccounts > 0
                          ? Math.round((metrics.activeAccounts / metrics.totalAccounts) * 100)
                          : 100
                      }
                      detail={`${metrics.activeAccounts}/${metrics.totalAccounts} tài khoản mở`}
                      color={C.ok}
                    />
                  </Col>
                </Row>
              </Card>
            </Col>

            <Col xs={24} lg={10}>
              <Card style={{ ...cardStyle, height: '100%' }} styles={{ body: { padding: 24 } }}>
                <SectionTitle title="Phân hệ" />
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {modules.map((m) => (
                    <div
                      key={m.name}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '12px 14px',
                        border: `1px solid ${C.line}`,
                        borderRadius: 12,
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: 600, color: C.ink, fontSize: 14 }}>{m.name}</div>
                        <div style={{ color: C.muted, fontSize: 12 }}>{m.desc}</div>
                      </div>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 12,
                          color: m.online ? C.ok : C.danger,
                        }}
                      >
                        <CheckCircleFilled /> {m.online ? 'Hoạt động' : 'Ngừng'}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </Col>
          </Row>

          {/* ===== Logs ===== */}
          <Row gutter={[16, 16]} style={{ marginTop: 16 }}>
            <Col xs={24}>
              <Card style={cardStyle} styles={{ body: { padding: 24 } }}>
                <SectionTitle
                  title="Nhật ký hoạt động"
                  extra={
                    <Button type="link" onClick={() => router.push('/accounts')} style={{ color: C.gold, padding: 0 }}>
                      Xem tất cả
                    </Button>
                  }
                />
                <div>
                  {logs.map((item, idx) => {
                    const ok = item.status === 'success';
                    return (
                      <div
                        key={item.id}
                        className="rd-log"
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 14,
                          padding: '14px 8px',
                          borderBottom: idx === logs.length - 1 ? 'none' : `1px solid ${C.line}`,
                          borderRadius: 8,
                        }}
                      >
                        <div
                          style={{
                            width: 36,
                            height: 36,
                            flex: 'none',
                            borderRadius: 10,
                            display: 'grid',
                            placeItems: 'center',
                            background: ok ? '#eef5ef' : '#fbf0e0',
                            color: ok ? C.ok : C.warn,
                          }}
                        >
                          {item.user === 'System' ? <SafetyOutlined /> : <TeamOutlined />}
                        </div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontWeight: 600, color: C.ink, fontSize: 14 }}>{item.action}</div>
                          <Text style={{ color: C.muted, fontSize: 12.5 }}>
                            {item.user} · {item.time}
                          </Text>
                        </div>
                        <Tag
                          bordered={false}
                          color={ok ? 'success' : 'warning'}
                          style={{ margin: 0, borderRadius: 999, padding: '2px 12px' }}
                        >
                          {ok ? 'Thành công' : 'Cảnh báo'}
                        </Tag>
                      </div>
                    );
                  })}
                </div>
              </Card>
            </Col>
          </Row>
        </Spin>
      </div>
    </ConfigProvider>
  );
}