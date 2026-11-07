'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  AutoComplete,
  Button,
  ConfigProvider,
  Form,
  Input,
  Modal,
  Popconfirm,
  Select,
  Space,
  Table,
  Tag,
  Tooltip,
  message,
} from 'antd';
import type { TableColumnsType } from 'antd';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { apiFetch, readError } from '../../lib/api';

/* ---------- Design tokens (đồng bộ với Dashboard & Tài khoản) ---------- */
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
  danger: '#b5483a',
};
const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";

/* ---------- Types & API Config ---------- */
type CategoryStatus = 'active' | 'inactive';

interface CategoryRow {
  id: number;
  type: string;
  name: string;
  status: CategoryStatus;
}


/* Mỗi loại danh mục một tông màu nhã nhặn, cùng bảng màu ấm */
const typePalette = [
  { bg: '#f6efe1', fg: '#8a6420' },
  { bg: '#eaf1ec', fg: '#3f6f4b' },
  { bg: '#f3ebe8', fg: '#8a4a3d' },
  { bg: '#ecebf2', fg: '#4e4a7a' },
];

const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap');
.rd-table .ant-table { background: transparent; }
.rd-table .ant-table-thead > tr > th {
  background: #faf6ee !important; color: #8a7d70; font-size: 12px;
  text-transform: uppercase; letter-spacing: .08em; font-weight: 600;
  border-bottom: 1px solid #ece5d8 !important;
}
.rd-table .ant-table-tbody > tr > td { border-bottom: 1px solid #f1ebe0; padding: 14px 16px; }
.rd-table .ant-table-tbody > tr:hover > td { background: #fcfaf5 !important; }
.rd-table .ant-table-thead > tr > th::before { display: none !important; }
`;

export default function CategoriesPage() {
  const [rows, setRows] = useState<CategoryRow[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState('');
  const [typeFilter, setTypeFilter] = useState<string | undefined>();

  // State cho Modal Thêm / Sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<CategoryRow | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  // 1. Lấy danh sách danh mục từ Backend NestJS
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/admin/categories`);
      if (!res.ok) throw new Error(await readError(res, 'Lỗi tải dữ liệu danh mục'));
      const data = await res.json();
      setRows(data);
    } catch (error: any) {
      console.error(error);
      message.error(error instanceof TypeError ? 'Không kết nối được với Backend NestJS!' : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const types = useMemo(() => Array.from(new Set(rows.map((r) => r.type))), [rows]);
  const typeOptions = useMemo(() => types.map((t) => ({ value: t, label: t })), [types]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    return rows.filter(
      (r) => (!k || r.name.toLowerCase().includes(k)) && (!typeFilter || r.type === typeFilter),
    );
  }, [rows, keyword, typeFilter]);

  // 2. Xóa danh mục qua API DELETE
  const handleDelete = async (id: number) => {
    try {
      const res = await apiFetch(`/api/admin/categories/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(await readError(res, 'Xóa thất bại'));
      setRows((prev) => prev.filter((r) => r.id !== id));
      message.success('Đã xóa danh mục thành công');
    } catch (error: any) {
      message.error(error.message || 'Không thể xóa danh mục này!');
    }
  };

  // 3. Mở Modal Thêm / Sửa
  const openCreateModal = () => {
    setEditingRow(null);
    form.resetFields();
    form.setFieldsValue({ status: 'active' });
    setIsModalOpen(true);
  };

  const openEditModal = (row: CategoryRow) => {
    setEditingRow(row);
    form.setFieldsValue({
      type: row.type,
      name: row.name,
      status: row.status,
    });
    setIsModalOpen(true);
  };

  // 4. Lưu danh mục (POST / PUT)
  const handleSaveCategory = async (values: {
    type: string;
    name: string;
    status: CategoryStatus;
  }) => {
    setSubmitting(true);
    try {
      if (editingRow) {
        const res = await apiFetch(`/api/admin/categories/${editingRow.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(await readError(res, 'Cập nhật thất bại'));
        const updated: CategoryRow = await res.json();
        setRows((prev) => prev.map((r) => (r.id === editingRow.id ? updated : r)));
        message.success('Đã cập nhật danh mục');
      } else {
        const res = await apiFetch(`/api/admin/categories`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(await readError(res, 'Thêm mới thất bại'));
        const created: CategoryRow = await res.json();
        setRows((prev) => [...prev, created]);
        message.success('Đã thêm danh mục mới');
      }
      setIsModalOpen(false);
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra!');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: TableColumnsType<CategoryRow> = [
    {
      title: 'Loại danh mục',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const p = typePalette[Math.max(types.indexOf(type), 0) % typePalette.length];
        return (
          <Tag
            bordered={false}
            style={{ background: p.bg, color: p.fg, borderRadius: 999, padding: '2px 12px', margin: 0 }}
          >
            {type}
          </Tag>
        );
      },
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      render: (name: string) => <span style={{ fontWeight: 600, color: C.ink }}>{name}</span>,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: CategoryStatus) => {
        const ok = status === 'active';
        return (
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              color: ok ? C.ok : C.muted,
              fontWeight: 500,
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: ok ? C.ok : C.muted,
                boxShadow: `0 0 0 3px ${ok ? 'rgba(79,138,91,.18)' : 'rgba(138,125,112,.18)'}`,
              }}
            />
            {ok ? 'Hoạt động' : 'Ngừng dùng'}
          </span>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 170,
      align: 'right',
      render: (_, r) => (
        <Space size={4}>
          <Tooltip title="Chỉnh sửa">
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: C.gold }}
              onClick={() => openEditModal(r)}
            >
              Sửa
            </Button>
          </Tooltip>
          <Popconfirm
            title="Xóa danh mục này?"
            description="Các dữ liệu đang dùng danh mục này có thể bị ảnh hưởng."
            okText="Xóa"
            okButtonProps={{ danger: true }}
            cancelText="Hủy"
            onConfirm={() => handleDelete(r.id)}
          >
            <Button type="text" danger icon={<DeleteOutlined />}>
              Xóa
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <ConfigProvider
      theme={{ token: { colorPrimary: C.gold, borderRadius: 10, colorText: C.text, fontFamily: 'inherit' } }}
    >
      <style>{css}</style>
      <div style={{ background: C.ivory, padding: 24, borderRadius: 20, minHeight: '100%' }}>
        {/* Header */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 20,
            padding: '28px 36px',
            background: `linear-gradient(120deg, ${C.ink} 0%, ${C.inkSoft} 60%, #3d2d20 100%)`,
            color: '#fff',
            marginBottom: 20,
          }}
        >
          <div
            style={{
              position: 'absolute',
              right: -60,
              top: -90,
              width: 280,
              height: 280,
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
                Master Data
              </div>
              <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 600 }}>Danh mục chung</div>
              <div
                style={{
                  display: 'flex',
                  gap: 24,
                  marginTop: 14,
                  fontSize: 13,
                  color: 'rgba(255,255,255,.7)',
                }}
              >
                <span>
                  Tổng danh mục: <b style={{ color: '#fff', fontFamily: serif, fontSize: 16 }}>{rows.length}</b>
                </span>
                <span>
                  Số loại: <b style={{ color: C.goldLight, fontFamily: serif, fontSize: 16 }}>{types.length}</b>
                </span>
              </div>
            </div>
            <Space>
              <Button
                size="large"
                icon={<ReloadOutlined />}
                onClick={fetchCategories}
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
                icon={<PlusOutlined />}
                onClick={openCreateModal}
                style={{ background: C.gold, borderColor: C.gold, color: '#fff', fontWeight: 600 }}
              >
                Thêm danh mục
              </Button>
            </Space>
          </div>
        </div>

        {/* Table card */}
        <div
          style={{
            background: C.card,
            border: `1px solid ${C.line}`,
            borderRadius: 16,
            padding: 24,
            boxShadow: '0 1px 2px rgba(60,40,15,.04)',
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 18 }}>
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: C.muted }} />}
              placeholder="Tìm theo tên danh mục"
              style={{ maxWidth: 320 }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Select
              allowClear
              placeholder="Tất cả loại danh mục"
              style={{ minWidth: 200 }}
              options={typeOptions}
              value={typeFilter}
              onChange={(v) => setTypeFilter(v)}
            />
          </div>

          <Table<CategoryRow>
            className="rd-table"
            rowKey="id"
            columns={columns}
            dataSource={filtered}
            loading={loading}
            pagination={{ pageSize: 5, hideOnSinglePage: true }}
            scroll={{ x: 640 }}
            locale={{ emptyText: 'Không có danh mục phù hợp' }}
          />
        </div>

        {/* Modal Thêm / Sửa Danh mục */}
        <Modal
          title={
            <span style={{ fontFamily: serif, fontSize: 20, color: C.ink }}>
              {editingRow ? 'Chỉnh sửa Danh mục' : 'Thêm Danh mục mới'}
            </span>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
          confirmLoading={submitting}
          okText={editingRow ? 'Lưu thay đổi' : 'Thêm danh mục'}
          cancelText="Hủy"
          destroyOnClose
        >
          <Form form={form} layout="vertical" onFinish={handleSaveCategory} style={{ marginTop: 16 }}>
            <Form.Item
              label="Loại danh mục"
              name="type"
              rules={[{ required: true, whitespace: true, message: 'Vui lòng chọn hoặc nhập loại danh mục!' }]}
            >
              <AutoComplete
                size="large"
                options={typeOptions}
                placeholder="Chọn loại có sẵn hoặc nhập mới (VD: Nhóm món ăn, Đơn vị tính...)"
                filterOption={(inputValue, option) =>
                  option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                }
              />
            </Form.Item>

            <Form.Item
              label="Tên danh mục"
              name="name"
              rules={[{ required: true, whitespace: true, message: 'Vui lòng nhập tên danh mục!' }]}
            >
              <Input size="large" placeholder="Ví dụ: Món Tráng Miệng, Thùng, Đang phục vụ..." />
            </Form.Item>

            <Form.Item label="Trạng thái" name="status" initialValue="active">
              <Select
                size="large"
                options={[
                  { value: 'active', label: 'Hoạt động' },
                  { value: 'inactive', label: 'Ngừng dùng' },
                ]}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}