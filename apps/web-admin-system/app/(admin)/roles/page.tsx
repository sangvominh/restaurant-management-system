'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Button,
  Checkbox,
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
  LockFilled,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
} from '@ant-design/icons';
import { apiFetch, readError } from '../../lib/api';

/* ---------- Design tokens (đồng bộ với các trang khác) ---------- */
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
interface RoleRow {
  id: number;
  name: string;
  description: string;
  usersCount: number;
  isSystem?: boolean; // vai trò hệ thống: không được xóa / đổi tên / đổi quyền
  permissions: string[]; // ['*'] = toàn quyền
}

interface PermissionItem {
  key: string;
  label: string;
  group: string;
}

interface RoleDefault { name: string; permissions: string[]; }


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

export default function RolesPage() {
  const [roles, setRoles] = useState<RoleRow[]>([]);
  const [catalog, setCatalog] = useState<PermissionItem[]>([]);
  const [defaults, setDefaults] = useState<RoleDefault[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState('');

  // State phục vụ Modal Thêm / Sửa Vai trò
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleRow | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  // 1. Lấy danh sách Vai trò từ Backend NestJS
  const fetchRoles = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/admin/roles`);
      if (!res.ok) throw new Error(await readError(res, 'Lỗi tải danh sách vai trò'));
      const data = await res.json();
      setRoles(data);
    } catch (error: any) {
      console.error(error);
      message.error(error instanceof TypeError ? 'Không kết nối được với Backend NestJS!' : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Danh mục quyền do backend định nghĩa (common/permissions.ts) để hai phía luôn khớp nhau.
  const fetchCatalog = async () => {
    try {
      const [res, presets] = await Promise.all([
        apiFetch('/api/admin/permissions'), apiFetch('/api/admin/roles/defaults'),
      ]);
      if (!res.ok) throw new Error(await readError(res, 'Không tải được danh mục quyền'));
      if (!presets.ok) throw new Error(await readError(presets, 'Không tải được mẫu vai trò'));
      setCatalog(await res.json());
      setDefaults(await presets.json());
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchRoles();
    fetchCatalog();
  }, []);

  const totalUsers = roles.reduce((sum, r) => sum + r.usersCount, 0);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    return roles.filter(
      (r) => !k || r.name.toLowerCase().includes(k) || r.description.toLowerCase().includes(k),
    );
  }, [roles, keyword]);

  // 2. Xóa vai trò qua API DELETE
  const handleDelete = async (id: number) => {
    try {
      const res = await apiFetch(`/api/admin/roles/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) throw new Error(await readError(res, 'Xóa thất bại'));
      setRoles((prev) => prev.filter((r) => r.id !== id));
      message.success('Đã xóa vai trò thành công');
    } catch (error: any) {
      message.error(error.message || 'Không thể xóa vai trò này!');
    }
  };

  // 3. Mở Modal Thêm / Sửa
  const openCreateModal = () => {
    setEditingRole(null);
    form.resetFields();
    form.setFieldsValue({ permissions: [] });
    setIsModalOpen(true);
  };

  const openEditModal = (role: RoleRow) => {
    setEditingRole(role);
    form.setFieldsValue({
      name: role.name,
      description: role.description,
      permissions: role.permissions.includes('*') ? catalog.map((p) => p.key) : role.permissions,
    });
    setIsModalOpen(true);
  };

  // 4. Lưu Vai trò (POST hoặc PUT)
  const handleSaveRole = async (values: { name: string; description: string; permissions?: string[] }) => {
    setSubmitting(true);
    try {
      if (editingRole) {
        const res = await apiFetch(`/api/admin/roles/${editingRole.id}`, {
          method: 'PUT',
          // Vai trò hệ thống: server từ chối đổi quyền/tên nên không gửi permissions.
          body: JSON.stringify(
            editingRole.isSystem ? { description: values.description } : values,
          ),
        });
        if (!res.ok) throw new Error(await readError(res, 'Cập nhật thất bại'));
        const updated: RoleRow = await res.json();
        setRoles((prev) => prev.map((r) => (r.id === editingRole.id ? updated : r)));
        message.success('Đã cập nhật vai trò');
      } else {
        const res = await apiFetch(`/api/admin/roles`, {
          method: 'POST',
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(await readError(res, 'Tạo mới thất bại'));
        const created: RoleRow = await res.json();
        setRoles((prev) => [...prev, created]);
        message.success('Đã thêm vai trò mới');
      }
      setIsModalOpen(false);
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra!');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: TableColumnsType<RoleRow> = [
    {
      title: 'Vai trò',
      key: 'name',
      render: (_, r) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 11,
              display: 'grid',
              placeItems: 'center',
              background: r.isSystem ? `linear-gradient(135deg, ${C.goldLight}, ${C.gold})` : '#f6efe1',
              color: r.isSystem ? '#fff' : C.gold,
              fontSize: 16,
            }}
          >
            <SafetyCertificateOutlined />
          </div>
          <div>
            <div style={{ fontWeight: 600, color: C.ink, display: 'flex', alignItems: 'center', gap: 8 }}>
              {r.name}
              {r.isSystem && (
                <Tooltip title="Vai trò hệ thống, không thể xóa">
                  <LockFilled style={{ color: C.goldLight, fontSize: 12 }} />
                </Tooltip>
              )}
            </div>
            <div style={{ color: C.muted, fontSize: 12.5 }}>{r.description}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Quyền',
      key: 'permissions',
      width: 130,
      render: (_, r) => (
        <Tag
          bordered={false}
          style={{ background: r.permissions.includes('*') ? '#f6efe1' : '#eef3ee', color: r.permissions.includes('*') ? '#8a6420' : '#3f6f4b', borderRadius: 999, padding: '2px 12px', margin: 0 }}
        >
          {r.permissions.includes('*') ? 'Toàn quyền' : `${r.permissions.length} quyền`}
        </Tag>
      ),
    },
    {
      title: 'Số lượng User',
      dataIndex: 'usersCount',
      key: 'usersCount',
      width: 180,
      sorter: (a, b) => a.usersCount - b.usersCount,
      render: (n: number) => (
        <Tag
          bordered={false}
          icon={<TeamOutlined />}
          style={{ background: '#f6efe1', color: '#8a6420', borderRadius: 999, padding: '2px 12px', margin: 0 }}
        >
          {n} người dùng
        </Tag>
      ),
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 170,
      align: 'right',
      render: (_, r) => {
        const blockedReason = r.isSystem
          ? 'Vai trò hệ thống không thể xóa'
          : r.usersCount > 0
            ? `Còn ${r.usersCount} người dùng đang giữ vai trò này`
            : '';
        return (
          <Space size={4}>
            <Button
              type="text"
              icon={<EditOutlined />}
              style={{ color: C.gold }}
              onClick={() => openEditModal(r)}
            >
              Sửa
            </Button>
            {blockedReason ? (
              <Tooltip title={blockedReason}>
                <Button type="text" danger disabled icon={<DeleteOutlined />}>
                  Xóa
                </Button>
              </Tooltip>
            ) : (
              <Popconfirm
                title="Xóa vai trò này?"
                okText="Xóa"
                okButtonProps={{ danger: true }}
                cancelText="Hủy"
                onConfirm={() => handleDelete(r.id)}
              >
                <Button type="text" danger icon={<DeleteOutlined />}>
                  Xóa
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];

  return (
    <ConfigProvider theme={{ token: { colorPrimary: C.gold, borderRadius: 10, colorText: C.text, fontFamily: 'inherit' } }}>
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
          <div style={{ position: 'relative', display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ color: C.goldLight, letterSpacing: 3, fontSize: 11, textTransform: 'uppercase', marginBottom: 8 }}>
                Roles & Permissions
              </div>
              <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 600 }}>Phân quyền & Vai trò</div>
              <div style={{ display: 'flex', gap: 24, marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,.7)' }}>
                <span>
                  Số vai trò: <b style={{ color: '#fff', fontFamily: serif, fontSize: 16 }}>{roles.length}</b>
                </span>
                <span>
                  Người dùng được gán: <b style={{ color: C.goldLight, fontFamily: serif, fontSize: 16 }}>{totalUsers}</b>
                </span>
              </div>
            </div>
            <Space>
              <Button
                size="large"
                icon={<ReloadOutlined />}
                onClick={fetchRoles}
                loading={loading}
                style={{ background: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.2)', color: '#fff' }}
              >
                Làm mới
              </Button>
              <Button
                size="large"
                icon={<PlusOutlined />}
                onClick={openCreateModal}
                style={{ background: C.gold, borderColor: C.gold, color: '#fff', fontWeight: 600 }}
              >
                Thêm Vai trò mới
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
          <div style={{ marginBottom: 18 }}>
            <Input
              allowClear
              prefix={<SearchOutlined style={{ color: C.muted }} />}
              placeholder="Tìm theo tên hoặc mô tả vai trò"
              style={{ maxWidth: 340 }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
          </div>

          <Table<RoleRow>
            className="rd-table"
            rowKey="id"
            columns={columns}
            dataSource={filtered}
            loading={loading}
            pagination={false}
            scroll={{ x: 640 }}
            locale={{ emptyText: 'Không tìm thấy vai trò phù hợp' }}
          />
        </div>

        {/* Modal Thêm / Sửa Vai trò */}
        <Modal
          title={
            <span style={{ fontFamily: serif, fontSize: 20, color: C.ink }}>
              {editingRole ? 'Chỉnh sửa Vai trò' : 'Thêm Vai trò mới'}
            </span>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
          confirmLoading={submitting}
          okText={editingRole ? 'Lưu thay đổi' : 'Tạo vai trò'}
          cancelText="Hủy"
          destroyOnHidden
          width={560}
        >
          <Form form={form} layout="vertical" onFinish={handleSaveRole} style={{ marginTop: 16 }}>
            <Form.Item
              label="Tên vai trò"
              name="name"
              rules={[{ required: true, whitespace: true, message: 'Vui lòng nhập tên vai trò!' }]}
            >
              <Input size="large" disabled={!!editingRole?.isSystem} placeholder="Ví dụ: Bếp trưởng, Tổ trưởng phục vụ..." />
            </Form.Item>

            <Form.Item
              label="Mô tả quyền hạn"
              name="description"
              rules={[{ required: true, whitespace: true, message: 'Vui lòng nhập mô tả cho vai trò!' }]}
            >
              <Input.TextArea
                rows={3}
                placeholder="Mô tả ngắn gọn nhiệm vụ và phạm vi truy cập của vai trò này"
              />
            </Form.Item>

            {!editingRole?.isSystem && (
              <Form.Item label="Mẫu quyền theo vai trò (tùy chọn)"
                extra="Chọn mẫu để thay các ô đang tick, sau đó bạn có thể tick thêm hoặc bỏ tick bất kỳ quyền nghiệp vụ nào.">
                <Select placeholder="Chọn mẫu quyền ban đầu" value={undefined}
                  options={defaults.map((item) => ({ label: item.name, value: item.name }))}
                  onChange={(name) => {
                    const preset = defaults.find((item) => item.name === name);
                    if (preset) form.setFieldsValue({ permissions: [...preset.permissions] });
                  }} />
              </Form.Item>
            )}

            <Form.Item
              label="Quyền của vai trò"
              name="permissions"
              extra={editingRole?.isSystem
                ? 'System Admin luôn có toàn quyền. Quyền quản trị hệ thống không thể cấp cho vai trò khác.'
                : 'Chỉ các quyền nghiệp vụ được cấp ở đây. Tài khoản, phân quyền, báo cáo và khu vực System Admin luôn dành riêng cho System Admin.'}
            >
              <Checkbox.Group disabled={!!editingRole?.isSystem} style={{ display: 'block' }}>
                {Array.from(new Set(catalog.map((p) => p.group))).map((group) => (
                  <div key={group} style={{ marginBottom: 10 }}>
                    <div style={{ color: C.muted, fontSize: 12, fontWeight: 600, marginBottom: 4 }}>{group}</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                      {catalog
                        .filter((p) => p.group === group)
                        .map((p) => (
                          <Checkbox key={p.key} value={p.key}>
                            {p.label}
                          </Checkbox>
                        ))}
                    </div>
                  </div>
                ))}
              </Checkbox.Group>
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}
