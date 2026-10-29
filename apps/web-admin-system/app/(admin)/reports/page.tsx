'use client';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Card, Popconfirm, Segmented, Select, Space, Spin, Table, Tabs, Tag, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { DownloadOutlined, ExperimentOutlined, ReloadOutlined } from '@ant-design/icons';
import { apiFetch, getUser, hasPermission, readError } from '../../lib/api';

const C = {
  ink: '#1c1612', gold: '#b8893b', card: '#ffffff', line: '#ece5d8', text: '#3b3129', muted: '#8a7d70',
  ok: '#4f8a5b', danger: '#b5483a', blue: '#4e6e8e',
};
const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";

type Period = 'month' | 'quarter' | 'year';

interface RevenueRow { key: number; label: string; total: number; invoices: number; average: number; growth: number | null }
interface RevenueRes {
  ready: boolean; demo?: boolean;
  rows: RevenueRow[];
  totals: { total: number; invoices: number; average: number; bestLabel: string | null } | null;
}
interface StockRow { key: number; label: string; opening: number; imported: number; exported: number; wasted: number; closing: number }
interface StockRes {
  ready: boolean; demo?: boolean;
  rows: StockRow[];
  totals: { opening: number; imported: number; exported: number; wasted: number; closing: number } | null;
}
interface MaterialRow { materialId: number; name: string; unit: string; opening: number; imported: number; exported: number; wasted: number; closing: number }

const vnd = (n: number) => `${Math.round(n).toLocaleString('vi-VN')} ₫`;
const num = (n: number) => n.toLocaleString('vi-VN', { maximumFractionDigits: 1 });
function compact(n: number) {
  const a = Math.abs(n);
  if (a >= 1e9) return `${(n / 1e9).toFixed(1).replace('.0', '')} tỷ`;
  if (a >= 1e6) return `${(n / 1e6).toFixed(1).replace('.0', '')} tr`;
  if (a >= 1e3) return `${Math.round(n / 1e3)}k`;
  return String(Math.round(n));
}

/* ---------- Biểu đồ SVG tự vẽ (không cần cài thêm thư viện) ---------- */
interface Series { name: string; color: string; values: number[]; type: 'bar' | 'line' }
function Chart({ labels, series }: { labels: string[]; series: Series[] }) {
  const W = 760, H = 300, L = 56, R = 16, T = 16, B = 40;
  const iw = W - L - R, ih = H - T - B;
  const max = Math.max(1, ...series.flatMap((s) => s.values)) * 1.1;
  const bars = series.filter((s) => s.type === 'bar');
  const lines = series.filter((s) => s.type === 'line');
  const slot = iw / labels.length;
  const gw = slot * 0.72;
  const bw = gw / Math.max(1, bars.length);
  const y = (v: number) => T + ih - (v / max) * ih;
  const cx = (i: number) => L + slot * i + slot / 2;
  return (
    <div>
      <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto' }} role="img" aria-label="Biểu đồ báo cáo">
        {[0, 0.25, 0.5, 0.75, 1].map((t) => (
          <g key={t}>
            <line x1={L} x2={W - R} y1={y(max * t)} y2={y(max * t)} stroke={C.line} />
            <text x={L - 8} y={y(max * t) + 4} fontSize="11" textAnchor="end" fill={C.muted}>{compact(max * t)}</text>
          </g>
        ))}
        {labels.map((l, i) => (
          <text key={l} x={cx(i)} y={H - 16} fontSize="11" textAnchor="middle" fill={C.muted}>{l}</text>
        ))}
        {bars.map((s, si) =>
          s.values.map((v, i) => (
            <rect key={`${s.name}${i}`} x={cx(i) - gw / 2 + si * bw} y={y(v)} width={Math.max(2, bw - 2)} height={Math.max(0, T + ih - y(v))} rx="2" fill={s.color}>
              <title>{`${labels[i]} · ${s.name}: ${vnd(v)}`}</title>
            </rect>
          )),
        )}
        {lines.map((s) => (
          <g key={s.name}>
            <polyline fill="none" stroke={s.color} strokeWidth="2.5" points={s.values.map((v, i) => `${cx(i)},${y(v)}`).join(' ')} />
            {s.values.map((v, i) => (
              <circle key={i} cx={cx(i)} cy={y(v)} r="3.5" fill={s.color}>
                <title>{`${labels[i]} · ${s.name}: ${vnd(v)}`}</title>
              </circle>
            ))}
          </g>
        ))}
      </svg>
      <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginTop: 4 }}>
        {series.map((s) => (
          <span key={s.name} style={{ color: C.text, fontSize: 13 }}>
            <span style={{ display: 'inline-block', width: 10, height: 10, background: s.color, borderRadius: 2, marginRight: 6 }} />
            {s.name}
          </span>
        ))}
      </div>
    </div>
  );
}

function Stat({ title, value, sub }: { title: string; value: string; sub?: string }) {
  return (
    <div style={{ flex: '1 1 180px', background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: '16px 20px' }}>
      <div style={{ color: C.muted, fontSize: 12, textTransform: 'uppercase', letterSpacing: '.08em' }}>{title}</div>
      <div style={{ fontFamily: serif, fontSize: 24, color: C.ink, marginTop: 4 }}>{value}</div>
      {sub && <div style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>{sub}</div>}
    </div>
  );
}

function downloadCsv(name: string, header: string[], rows: (string | number)[][]) {
  const esc = (v: string | number) => `"${String(v).replace(/"/g, '""')}"`;
  const csv = '﻿' + [header, ...rows].map((r) => r.map(esc).join(',')).join('\r\n');
  const url = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = name;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const thisYear = new Date().getFullYear();
  const [period, setPeriod] = useState<Period>('month');
  const [year, setYear] = useState<number>(thisYear);
  const [rev, setRev] = useState<RevenueRes | null>(null);
  const [stock, setStock] = useState<StockRes | null>(null);
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState<Record<number, MaterialRow[]>>({});
  const [busy, setBusy] = useState(false);
  const canDemo = hasPermission(getUser(), 'backup:manage');

  const load = useCallback(async () => {
    setLoading(true);
    setDetails({});
    try {
      const qs = `period=${period}&year=${year}`;
      const [a, b] = await Promise.all([
        apiFetch(`/api/admin/reports/revenue?${qs}`),
        apiFetch(`/api/admin/reports/stock?${qs}`),
      ]);
      if (!a.ok) throw new Error(await readError(a, 'Không tải được báo cáo doanh thu'));
      if (!b.ok) throw new Error(await readError(b, 'Không tải được báo cáo nhập - xuất - tồn'));
      setRev(await a.json());
      setStock(await b.json());
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setLoading(false);
    }
  }, [period, year]);

  useEffect(() => {
    load();
  }, [load]);

  const demoCall = async (method: 'POST' | 'DELETE') => {
    setBusy(true);
    try {
      const res = await apiFetch('/api/admin/reports/demo-data', { method });
      if (!res.ok) throw new Error(await readError(res, 'Thao tác thất bại'));
      message.success(method === 'POST' ? 'Đã nạp dữ liệu mẫu' : 'Đã xóa dữ liệu mẫu');
      await load();
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  const loadMaterials = async (key: number) => {
    if (details[key]) return;
    const res = await apiFetch(`/api/admin/reports/stock/materials?period=${period}&year=${year}&key=${key}`);
    if (!res.ok) return message.error(await readError(res, 'Không tải được chi tiết NVL'));
    const data: MaterialRow[] = await res.json();
    setDetails((d) => ({ ...d, [key]: data }));
  };

  const yearOptions = useMemo(
    () => Array.from({ length: 7 }, (_, i) => thisYear - i).map((y) => ({ value: y, label: period === 'year' ? `đến năm ${y}` : `Năm ${y}` })),
    [thisYear, period],
  );

  const notReady = rev && stock && !rev.ready && !stock.ready;
  const isDemo = !!(rev?.demo || stock?.demo);

  const revCols: TableColumnsType<RevenueRow> = [
    { title: 'Kỳ', dataIndex: 'label' },
    { title: 'Số hóa đơn', dataIndex: 'invoices', align: 'right', render: (v) => v.toLocaleString('vi-VN') },
    { title: 'Doanh thu', dataIndex: 'total', align: 'right', render: (v) => <b>{vnd(v)}</b> },
    { title: 'TB / hóa đơn', dataIndex: 'average', align: 'right', render: (v) => (v ? vnd(v) : '—') },
    {
      title: 'So với kỳ trước',
      dataIndex: 'growth',
      align: 'right',
      render: (v: number | null) =>
        v === null ? '—' : <span style={{ color: v >= 0 ? C.ok : C.danger }}>{v >= 0 ? '▲' : '▼'} {Math.abs(v).toFixed(1)}%</span>,
    },
  ];

  const stockCols: TableColumnsType<StockRow> = [
    { title: 'Kỳ', dataIndex: 'label' },
    { title: 'Tồn đầu kỳ', dataIndex: 'opening', align: 'right', render: vnd },
    { title: 'Nhập', dataIndex: 'imported', align: 'right', render: (v) => <span style={{ color: C.ok }}>{vnd(v)}</span> },
    { title: 'Xuất', dataIndex: 'exported', align: 'right', render: (v) => <span style={{ color: C.gold }}>{vnd(v)}</span> },
    { title: 'Hao hụt', dataIndex: 'wasted', align: 'right', render: (v) => <span style={{ color: C.danger }}>{vnd(v)}</span> },
    { title: 'Tồn cuối kỳ', dataIndex: 'closing', align: 'right', render: (v) => <b>{vnd(v)}</b> },
  ];

  const matCols: TableColumnsType<MaterialRow> = [
    { title: 'Nguyên vật liệu', dataIndex: 'name' },
    { title: 'ĐVT', dataIndex: 'unit', width: 70 },
    { title: 'Tồn đầu', dataIndex: 'opening', align: 'right', render: num },
    { title: 'Nhập', dataIndex: 'imported', align: 'right', render: num },
    { title: 'Xuất', dataIndex: 'exported', align: 'right', render: num },
    { title: 'Hao hụt', dataIndex: 'wasted', align: 'right', render: num },
    { title: 'Tồn cuối', dataIndex: 'closing', align: 'right', render: (v) => <b>{num(v)}</b> },
  ];

  const periodName = period === 'month' ? 'thang' : period === 'quarter' ? 'quy' : 'nam';

  return (
    <div>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap');
        .rp-table .ant-table-thead > tr > th { background: #faf6ee !important; color: #8a7d70; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; }
      `}</style>
      <h1 style={{ fontFamily: serif, color: C.ink, margin: '0 0 4px', fontSize: 28 }}>Báo cáo tổng hợp</h1>
      <p style={{ color: C.muted, margin: '0 0 16px' }}>
        Thống kê doanh thu và nguyên vật liệu nhập - xuất - tồn theo tháng, quý, năm.
      </p>

      <Space wrap style={{ marginBottom: 16 }}>
        <Segmented
          value={period}
          onChange={(v) => setPeriod(v as Period)}
          options={[{ value: 'month', label: 'Theo tháng' }, { value: 'quarter', label: 'Theo quý' }, { value: 'year', label: 'Theo năm' }]}
        />
        <Select value={year} onChange={setYear} options={yearOptions} style={{ width: 150 }} />
        <Button icon={<ReloadOutlined />} onClick={load}>Tải lại</Button>
        {isDemo && <Tag color="orange">Đang dùng dữ liệu mẫu</Tag>}
        {isDemo && canDemo && (
          <Popconfirm title="Xóa dữ liệu mẫu?" okText="Xóa" cancelText="Hủy" onConfirm={() => demoCall('DELETE')}>
            <Button size="small" danger loading={busy}>Xóa dữ liệu mẫu</Button>
          </Popconfirm>
        )}
      </Space>

      {loading && !rev ? (
        <div style={{ textAlign: 'center', padding: 80 }}><Spin size="large" /></div>
      ) : notReady ? (
        <Alert
          type="info"
          showIcon
          message="Chưa có nguồn dữ liệu cho báo cáo"
          description={
            <div>
              <p style={{ margin: '4px 0 12px' }}>
                Báo cáo đọc dữ liệu hóa đơn và phiếu nhập/xuất kho của các nhóm khác. Các bảng này chưa tồn tại trong cơ sở dữ liệu.
                Bạn có thể nạp dữ liệu mẫu để xem thử giao diện, sau này thay bằng dữ liệu thật.
              </p>
              {canDemo ? (
                <Button type="primary" icon={<ExperimentOutlined />} loading={busy} onClick={() => demoCall('POST')}>
                  Nạp dữ liệu mẫu
                </Button>
              ) : (
                <span>Nhờ quản trị viên nạp dữ liệu mẫu hoặc kết nối nguồn dữ liệu thật.</span>
              )}
            </div>
          }
        />
      ) : (
        <Spin spinning={loading}>
          <Tabs
            items={[
              {
                key: 'revenue',
                label: 'Doanh thu',
                children: rev && (
                  <div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
                      <Stat title="Tổng doanh thu" value={vnd(rev.totals?.total ?? 0)} />
                      <Stat title="Số hóa đơn" value={(rev.totals?.invoices ?? 0).toLocaleString('vi-VN')} />
                      <Stat title="Trung bình / hóa đơn" value={vnd(rev.totals?.average ?? 0)} />
                      <Stat title="Kỳ cao nhất" value={rev.totals?.bestLabel ?? '—'} />
                    </div>
                    <Card style={{ marginBottom: 16 }} styles={{ body: { padding: 16 } }}>
                      <Chart labels={rev.rows.map((r) => r.label)} series={[{ name: 'Doanh thu', color: C.gold, type: 'bar', values: rev.rows.map((r) => r.total) }]} />
                    </Card>
                    <div className="rp-table">
                      <Table rowKey="key" size="middle" columns={revCols} dataSource={rev.rows} pagination={false} scroll={{ x: 600 }} />
                    </div>
                    <Button
                      style={{ marginTop: 12 }}
                      icon={<DownloadOutlined />}
                      onClick={() =>
                        downloadCsv(`doanh-thu-${periodName}-${year}.csv`, ['Kỳ', 'Số hóa đơn', 'Doanh thu', 'TB/hóa đơn'], rev.rows.map((r) => [r.label, r.invoices, Math.round(r.total), Math.round(r.average)]))
                      }
                    >
                      Xuất CSV
                    </Button>
                  </div>
                ),
              },
              {
                key: 'stock',
                label: 'Nhập - xuất - tồn NVL',
                children: stock && (
                  <div>
                    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 16 }}>
                      <Stat title="Tồn đầu" value={vnd(stock.totals?.opening ?? 0)} />
                      <Stat title="Tổng nhập" value={vnd(stock.totals?.imported ?? 0)} />
                      <Stat title="Tổng xuất" value={vnd(stock.totals?.exported ?? 0)} />
                      <Stat title="Hao hụt" value={vnd(stock.totals?.wasted ?? 0)} />
                      <Stat title="Tồn cuối" value={vnd(stock.totals?.closing ?? 0)} />
                    </div>
                    <Card style={{ marginBottom: 16 }} styles={{ body: { padding: 16 } }}>
                      <Chart
                        labels={stock.rows.map((r) => r.label)}
                        series={[
                          { name: 'Nhập', color: C.ok, type: 'bar', values: stock.rows.map((r) => r.imported) },
                          { name: 'Xuất', color: C.gold, type: 'bar', values: stock.rows.map((r) => r.exported) },
                          { name: 'Tồn cuối kỳ', color: C.ink, type: 'line', values: stock.rows.map((r) => r.closing) },
                        ]}
                      />
                    </Card>
                    <Alert
                      type="info"
                      showIcon
                      style={{ marginBottom: 12 }}
                      message="Bảng và biểu đồ tính theo giá trị (VND) để cộng được giữa các NVL khác đơn vị. Bấm mũi tên đầu dòng để xem số lượng từng NVL của kỳ đó."
                    />
                    <div className="rp-table">
                      <Table
                        rowKey="key"
                        size="middle"
                        columns={stockCols}
                        dataSource={stock.rows}
                        pagination={false}
                        scroll={{ x: 700 }}
                        expandable={{
                          onExpand: (open, r) => open && loadMaterials(r.key),
                          expandedRowRender: (r) =>
                            details[r.key] ? (
                              <Table rowKey="materialId" size="small" columns={matCols} dataSource={details[r.key]} pagination={false} />
                            ) : (
                              <Spin />
                            ),
                        }}
                      />
                    </div>
                    <Button
                      style={{ marginTop: 12 }}
                      icon={<DownloadOutlined />}
                      onClick={() =>
                        downloadCsv(
                          `nhap-xuat-ton-${periodName}-${year}.csv`,
                          ['Kỳ', 'Tồn đầu', 'Nhập', 'Xuất', 'Hao hụt', 'Tồn cuối'],
                          stock.rows.map((r) => [r.label, Math.round(r.opening), Math.round(r.imported), Math.round(r.exported), Math.round(r.wasted), Math.round(r.closing)]),
                        )
                      }
                    >
                      Xuất CSV
                    </Button>
                  </div>
                ),
              },
            ]}
          />
        </Spin>
      )}
    </div>
  );
}
