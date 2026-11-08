'use client';
import { useEffect, useState } from 'react';
import { Alert, Button, Input, Select, Space, Table } from 'antd';
import { apiFetch, readError } from '@/lib/api';

interface ReportRow {
  code: string; name: string; unit: string; opening: string | null; received: string;
  issued: string; wasted: string; returned: string; otherChange: string; closing: string | null;
}
interface ReportData {
  period: { asOf: string }; rows: ReportRow[]; warnings: string[];
}
const numbers = new Intl.NumberFormat('vi-VN', { maximumFractionDigits: 3 });
const quantity = (value: string | null) => value === null ? 'Chưa đủ lịch sử' : numbers.format(Number(value));

export default function InventoryReportPage() {
  const today = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).format(new Date());
  const [itemType, setItemType] = useState('MATERIAL');
  const [period, setPeriod] = useState('MONTH');
  const [year, setYear] = useState(Number(today.slice(0, 4)));
  const [month, setMonth] = useState(Number(today.slice(5, 7)));
  const [quarter, setQuarter] = useState(Math.ceil(Number(today.slice(5, 7)) / 3));
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  const [data, setData] = useState<ReportData | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const controller = new AbortController();
    let active = true;
    setData(null); setError(''); setLoading(true); setPage(1);
    const query = new URLSearchParams({ itemType, period, year: String(year) });
    if (period === 'MONTH') query.set('month', String(month));
    if (period === 'QUARTER') query.set('quarter', String(quarter));
    void (async () => {
      const response = await apiFetch('/warehouse/reports/inventory?' + query, { signal: controller.signal });
      if (!response.ok) throw new Error(await readError(response, 'Không tải được báo cáo.'));
      const body = await response.json();
      if (active) setData(body.data);
    })().catch(cause => { if (active) setError(cause instanceof Error ? cause.message : 'Không tải được báo cáo.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; controller.abort(); };
  }, [itemType, period, year, month, quarter, reload]);
  const query = search.trim().toLocaleLowerCase('vi');
  const rows = (data?.rows ?? []).filter(row => !query || [row.code, row.name].some(value => value.toLocaleLowerCase('vi').includes(query)));
  const columns = [
    { title: 'Mã', dataIndex: 'code', width: 130 },
    { title: 'Tên', dataIndex: 'name', width: 200 },
    { title: 'Đơn vị', dataIndex: 'unit', width: 90 },
    ...[
      ['opening', 'Tồn đầu'], ['received', 'Nhập'], ['issued', 'Xuất'], ['wasted', 'Hao hụt'],
      ['returned', 'Hoàn trả'], ['otherChange', 'Biến động khác'], ['closing', 'Tồn cuối / lưu kho'],
    ].map(([dataIndex, title]) => ({ title, dataIndex, width: 140, render: quantity })),
  ];
  return <>
    <div className="page-heading"><div><h1>Báo cáo nhập xuất tồn</h1><p>Thống kê nguyên vật liệu và thành phẩm theo tháng, quý, năm.</p></div>
      <Button loading={loading} onClick={() => setReload(value => value + 1)}>Tải lại</Button></div>
    <Space wrap style={{ marginBottom: 16 }}>
      <Select aria-label="Loại hàng" value={itemType} onChange={setItemType} style={{ width: 180 }} options={[{ value: 'MATERIAL', label: 'Nguyên vật liệu' }, { value: 'PRODUCT', label: 'Thành phẩm' }]} />
      <Select aria-label="Kỳ báo cáo" value={period} onChange={setPeriod} style={{ width: 110 }} options={[{ value: 'MONTH', label: 'Tháng' }, { value: 'QUARTER', label: 'Quý' }, { value: 'YEAR', label: 'Năm' }]} />
      <Select aria-label="Năm báo cáo" value={year} onChange={setYear} style={{ width: 100 }} options={Array.from({ length: Number(today.slice(0, 4)) - 1999 }, (_, i) => ({ value: Number(today.slice(0, 4)) - i, label: String(Number(today.slice(0, 4)) - i) }))} />
      {period === 'MONTH' && <Select aria-label="Tháng báo cáo" value={month} onChange={setMonth} style={{ width: 110 }} options={Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: 'Tháng ' + (i + 1) }))} />}
      {period === 'QUARTER' && <Select aria-label="Quý báo cáo" value={quarter} onChange={setQuarter} style={{ width: 100 }} options={[1, 2, 3, 4].map(value => ({ value, label: 'Quý ' + value }))} />}
      <Input aria-label="Tìm mã hoặc tên" placeholder="Tìm mã hoặc tên" value={search} onChange={event => { setSearch(event.target.value); setPage(1); }} style={{ width: 220 }} />
    </Space>
    {error && <Alert type="error" showIcon title={error} style={{ marginBottom: 12 }} />}
    {data?.warnings.map(warning => <Alert key={warning} type="warning" showIcon title={warning} style={{ marginBottom: 12 }} />)}
    {data && <p>Theo giờ Việt Nam, tổng hợp mọi vị trí kho. Cập nhật lúc {new Date(data.period.asOf).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}. Với kỳ đang mở, tồn cuối là số dư hiện tại.</p>}
    <Table rowKey="code" columns={columns} dataSource={rows} loading={loading} scroll={{ x: 1400 }}
      pagination={{ current: page, pageSize: 10, showSizeChanger: false, onChange: setPage }} />
  </>;
}
