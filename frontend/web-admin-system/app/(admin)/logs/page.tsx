'use client';
import React, { useCallback, useEffect, useState } from 'react';
import { Button, DatePicker, Input, Select, Space, Table, Tabs, Tag, message } from 'antd';
import type { TableColumnsType } from 'antd';
import { ReloadOutlined, SearchOutlined } from '@ant-design/icons';
import { apiFetch, readError } from '../../lib/api';

const C = {
  ink: '#1c1612',
  gold: '#b8893b',
  card: '#ffffff',
  line: '#ece5d8',
  text: '#3b3129',
  muted: '#8a7d70',
  ok: '#4f8a5b',
  danger: '#b5483a',
  warn: '#b8893b',
};
const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap');
.rd-table .ant-table { background: transparent; }
.rd-table .ant-table-thead > tr > th {
  background: #faf6ee !important; color: #8a7d70; font-size: 12px;
  text-transform: uppercase; letter-spacing: .08em; font-weight: 600;
  border-bottom: 1px solid #ece5d8 !important;
}
.rd-table .ant-table-tbody > tr > td { border-bottom: 1px solid #f1ebe0; padding: 12px 16px; }
.rd-table .ant-table-tbody > tr:hover > td { background: #fcfaf5 !important; }
.rd-table .ant-table-thead > tr > th::before { display: none !important; }
`;

interface Paged<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}
interface AuditRow {
  id: number;
  loginLogId: number | null;
  accountId: number | null;
  actorName: string;
  action: string;
  entityName: string;
  entityId: string | null;
  description: string;
  createdAt: string;
}
interface LoginRow {
  id: number;
  accountId: number | null;
  email: string;
  ipAddress: string | null;
  status: 'success' | 'failed' | 'locked';
  loginAt: string;
  logoutAt: string | null;
}

const fmt = (iso?: string | null) =>
  iso
    ? new Date(iso).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh', hour12: false })
    : '—';

const ENTITY_LABEL: Record<string, string> = {
  account: 'Tài khoản',
  role: 'Vai trò',
  category: 'Danh mục',
  setting: 'Cấu hình',
  backup: 'Sao lưu',
  report: 'Báo cáo',
};
const STATUS_META: Record<string, { label: string; color: string }> = {
  success: { label: 'Thành công', color: C.ok },
  failed: { label: 'Sai thông tin', color: C.danger },
  locked: { label: 'Tài khoản bị khóa', color: C.warn },
};

function actionColor(action: string) {
  if (action.endsWith('.delete')) return C.danger;
  if (action.endsWith('.create')) return C.ok;
  if (action.endsWith('.lock')) return C.warn;
  return C.gold;
}

/** Bảng có lọc + phân trang phía server, dùng chung cho 2 loại nhật ký. */
function LogPanel<T extends { id: number }>({
  endpoint,
  columns,
  searchPlaceholder,
  filterLabel,
  filterOptions,
  filterParam,
}: {
  endpoint: string;
  columns: TableColumnsType<T>;
  searchPlaceholder: string;
  filterLabel: string;
  filterOptions: { value: string; label: string }[];
  filterParam: string;
}) {
  const [data, setData] = useState<Paged<T>>({ items: [], total: 0, page: 1, pageSize: 10 });
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [search, setSearch] = useState('');
  const [searchInput, setSearchInput] = useState('');
  const [filter, setFilter] = useState<string | undefined>();
  const [range, setRange] = useState<[string, string] | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const qs = new URLSearchParams({ page: String(page), pageSize: String(pageSize) });
      if (search) qs.set('search', search);
      if (filter) qs.set(filterParam, filter);
      if (range) {
        qs.set('from', range[0]);
        qs.set('to', range[1]);
      }
      const res = await apiFetch(`${endpoint}?${qs.toString()}`);
      if (!res.ok) throw new Error(await readError(res, 'Không tải được nhật ký'));
      setData(await res.json());
    } catch (e: any) {
      message.error(e.message || 'Không tải được nhật ký');
    } finally {
      setLoading(false);
    }
  }, [endpoint, page, pageSize, search, filter, range, filterParam]);

  useEffect(() => {
    load();
  }, [load]);

  const resetPage = () => setPage(1);

  return (
    <div>
      <Space wrap style={{ marginBottom: 16 }}>
        <Input.Search
          allowClear
          placeholder={searchPlaceholder}
          prefix={<SearchOutlined />}
          style={{ width: 280 }}
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
            if (!e.target.value) {
              setSearch('');
              resetPage();
            }
          }}
          onSearch={(v) => {
            setSearch(v.trim());
            resetPage();
          }}
        />
        <Select
          allowClear
          placeholder={filterLabel}
          style={{ width: 200 }}
          options={filterOptions}
          value={filter}
          onChange={(v) => {
            setFilter(v);
            resetPage();
          }}
        />
        <DatePicker.RangePicker
          format="DD/MM/YYYY"
          onChange={(d) => {
            setRange(d && d[0] && d[1] ? [d[0].startOf('day').toISOString(), d[1].endOf('day').toISOString()] : null);
            resetPage();
          }}
        />
        <Button icon={<ReloadOutlined />} onClick={load}>
          Tải lại
        </Button>
      </Space>

      <div className="rd-table">
        <Table<T>
          rowKey="id"
          loading={loading}
          columns={columns}
          dataSource={data.items}
          scroll={{ x: 800 }}
          pagination={{
            current: page,
            pageSize,
            total: data.total,
            showSizeChanger: true,
            showTotal: (t) => `${t} bản ghi`,
            onChange: (p, s) => {
              setPage(p);
              setPageSize(s);
            },
          }}
        />
      </div>
    </div>
  );
}

export default function LogsPage() {
  const auditColumns: TableColumnsType<AuditRow> = [
    { title: 'Thời gian', dataIndex: 'createdAt', width: 170, render: (v) => fmt(v) },
    { title: 'Người thực hiện', dataIndex: 'actorName', width: 180 },
    {
      title: 'Thao tác',
      dataIndex: 'action',
      width: 160,
      render: (v: string) => (
        <Tag color={actionColor(v)} style={{ marginInlineEnd: 0 }}>
          {v}
        </Tag>
      ),
    },
    {
      title: 'Đối tượng',
      dataIndex: 'entityName',
      width: 120,
      render: (v: string, r) => `${ENTITY_LABEL[v] ?? v}${r.entityId ? ` #${r.entityId}` : ''}`,
    },
    { title: 'Chi tiết', dataIndex: 'description' },
    { title: 'Phiên', dataIndex: 'loginLogId', width: 80, render: (v) => (v ? `#${v}` : '—') },
  ];

  const loginColumns: TableColumnsType<LoginRow> = [
    { title: 'Đăng nhập lúc', dataIndex: 'loginAt', width: 180, render: (v) => fmt(v) },
    { title: 'Email', dataIndex: 'email' },
    { title: 'Địa chỉ IP', dataIndex: 'ipAddress', width: 150, render: (v) => v || '—' },
    {
      title: 'Kết quả',
      dataIndex: 'status',
      width: 170,
      render: (v: string) => (
        <Tag color={STATUS_META[v]?.color} style={{ marginInlineEnd: 0 }}>
          {STATUS_META[v]?.label ?? v}
        </Tag>
      ),
    },
    {
      title: 'Đăng xuất lúc',
      dataIndex: 'logoutAt',
      width: 180,
      render: (v: string | null, r) => (r.status === 'success' ? (v ? fmt(v) : 'Đang hoạt động / hết hạn') : '—'),
    },
  ];

  return (
    <div>
      <style>{css}</style>
      <h1 style={{ fontFamily: serif, color: C.ink, margin: '0 0 4px', fontSize: 28 }}>Nhật ký hệ thống</h1>
      <p style={{ color: C.muted, margin: '0 0 20px' }}>
        Theo dõi thao tác quản trị và lịch sử đăng nhập. Nhật ký chỉ đọc, không thể chỉnh sửa hay xóa.
      </p>
      <div style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 20 }}>
        <Tabs
          items={[
            {
              key: 'audit',
              label: 'Thao tác quản trị',
              children: (
                <LogPanel<AuditRow>
                  endpoint="/api/admin/audit-logs"
                  columns={auditColumns}
                  searchPlaceholder="Tìm theo người thực hiện, nội dung..."
                  filterLabel="Đối tượng"
                  filterParam="entity"
                  filterOptions={Object.entries(ENTITY_LABEL).map(([value, label]) => ({ value, label }))}
                />
              ),
            },
            {
              key: 'login',
              label: 'Lịch sử đăng nhập',
              children: (
                <LogPanel<LoginRow>
                  endpoint="/api/admin/login-logs"
                  columns={loginColumns}
                  searchPlaceholder="Tìm theo email, IP..."
                  filterLabel="Kết quả"
                  filterParam="status"
                  filterOptions={Object.entries(STATUS_META).map(([value, m]) => ({ value, label: m.label }))}
                />
              ),
            },
          ]}
        />
      </div>
    </div>
  );
}
