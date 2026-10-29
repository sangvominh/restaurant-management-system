'use client';
import React, { useEffect, useMemo, useState } from 'react';
import {
  Avatar,
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
  LockOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  UnlockOutlined,
} from '@ant-design/icons';
import { apiFetch, readError } from '../../lib/api';

/* ---------- Design tokens (đồng bộ với Dashboard) ---------- */
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
type UserStatus = 'active' | 'locked';

interface UserRow {
  id: number;
  name: string;
  email: string;
  role: string;
  status: UserStatus;
}


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

export default function AccountManagementPage() {
  const [users, setUsers] = useState<UserRow[]>([]);
  const [roleNames, setRoleNames] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [keyword, setKeyword] = useState('');
  const [roleFilter, setRoleFilter] = useState<string | undefined>();

  // State phục vụ Modal Thêm / Sửa
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserRow | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [form] = Form.useForm();

  // 1. Lấy danh sách tài khoản từ Backend NestJS
  const fetchAccounts = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/admin/accounts`);
      if (!res.ok) throw new Error(await readError(res, 'Không thể tải dữ liệu'));
      const data = await res.json();
      setUsers(data);
    } catch (error: any) {
      console.error(error);
      message.error(error instanceof TypeError ? 'Không kết nối được với Backend NestJS!' : error.message);
    } finally {
      setLoading(false);
    }
  };

  // Vai trò lấy từ API (không gõ cứng) để vai trò mới tạo ở trang Phân quyền gán được ngay.
  const fetchRoleNames = async () => {
    try {
      const res = await apiFetch('/api/admin/roles');
      if (!res.ok) throw new Error(await readError(res, 'Không tải được danh sách vai trò'));
      const data: { name: string }[] = await res.json();
      setRoleNames(data.map((r) => r.name));
    } catch (error: any) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchAccounts();
    fetchRoleNames();
  }, []);

  // 2. Khóa / Mở khóa tài khoản qua API PATCH
  const toggleLock = async (id: number) => {
    try {
      const res = await apiFetch(`/api/admin/accounts/${id}/toggle-status`, {
        method: 'PATCH',
      });
      if (!res.ok) throw new Error(await readError(res, 'Lỗi cập nhật trạng thái'));
      const updatedUser: UserRow = await res.json();
      setUsers((prev) => prev.map((u) => (u.id === id ? updatedUser : u)));
      message.success(
        updatedUser.status === 'active' ? 'Đã mở khóa tài khoản' : 'Đã khóa tài khoản',
      );
    } catch (error: any) {
      message.error(error.message || 'Thao tác thất bại, vui lòng thử lại!');
    }
  };

  // Xóa tài khoản (server chặn tự xóa mình và xóa quản trị viên cuối cùng)
  const handleDelete = async (id: number) => {
    try {
      const res = await apiFetch(`/api/admin/accounts/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error(await readError(res, 'Xóa thất bại'));
      setUsers((prev) => prev.filter((u) => u.id !== id));
      message.success('Đã xóa tài khoản');
    } catch (error: any) {
      message.error(error.message || 'Không thể xóa tài khoản này!');
    }
  };

  // 3. Mở Modal Thêm mới hoặc Chỉnh sửa
  const openCreateModal = () => {
    setEditingUser(null);
    form.resetFields();
    form.setFieldsValue({ role: roleNames.includes('Nhân viên') ? 'Nhân viên' : undefined });
    setIsModalOpen(true);
  };

  const openEditModal = (user: UserRow) => {
    setEditingUser(user);
    form.setFieldsValue({
      name: user.name,
      email: user.email,
      role: user.role,
    });
    setIsModalOpen(true);
  };

  // 4. Lưu dữ liệu (POST khi thêm mới, PUT khi chỉnh sửa)
  const handleSaveUser = async (values: { name: string; email: string; role: string; password?: string }) => {
    setSubmitting(true);
    try {
      if (editingUser) {
        // Cập nhật tài khoản (chỉ gửi password nếu có nhập = đặt lại mật khẩu)
        const payload = { ...values, password: values.password || undefined };
        const res = await apiFetch(`/api/admin/accounts/${editingUser.id}`, {
          method: 'PUT',
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(await readError(res, 'Cập nhật thất bại'));
        const updated: UserRow = await res.json();
        setUsers((prev) => prev.map((u) => (u.id === editingUser.id ? updated : u)));
        message.success('Đã cập nhật thông tin tài khoản');
      } else {
        // Tạo tài khoản mới
        const res = await apiFetch(`/api/admin/accounts`, {
          method: 'POST',
          body: JSON.stringify(values),
        });
        if (!res.ok) throw new Error(await readError(res, 'Tạo mới thất bại'));
        const created: UserRow = await res.json();
        setUsers((prev) => [created, ...prev]);
        message.success('Đã thêm tài khoản mới');
      }
      setIsModalOpen(false);
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra khi lưu dữ liệu!');
    } finally {
      setSubmitting(false);
    }
  };

  // Tạo danh sách lựa chọn bộ lọc Role linh hoạt từ dữ liệu thực tế
  const roleOptions = useMemo(() => {
    const roles = Array.from(new Set([...roleNames, ...users.map((u) => u.role)]));
    return roles.map((r) => ({ value: r, label: r }));
  }, [users, roleNames]);

  const filtered = useMemo(() => {
    const k = keyword.trim().toLowerCase();
    return users.filter(
      (u) =>
        (!k || u.name.toLowerCase().includes(k) || u.email.toLowerCase().includes(k)) &&
        (!roleFilter || u.role === roleFilter),
    );
  }, [users, keyword, roleFilter]);

  const activeCount = users.filter((u) => u.status === 'active').length;
  const lockedCount = users.length - activeCount;

  const columns: TableColumnsType<UserRow> = [
    {
      title: 'Người dùng',
      key: 'user',
      render: (_, u) => (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Avatar
            style={{
              background: `linear-gradient(135deg, ${C.goldLight}, ${C.gold})`,
              color: '#fff',
              fontFamily: serif,
              fontWeight: 600,
            }}
          >
            {u.name.trim().split(' ').pop()?.charAt(0)}
          </Avatar>
          <div>
            <div style={{ fontWeight: 600, color: C.ink }}>{u.name}</div>
            <div style={{ color: C.muted, fontSize: 12.5 }}>{u.email}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Vai trò',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag
          bordered={false}
          style={{ background: '#f6efe1', color: '#8a6420', borderRadius: 999, padding: '2px 12px', margin: 0 }}
        >
          {role}
        </Tag>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      width: 150,
      render: (status: UserStatus) => {
        const ok = status === 'active';
        return (
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: ok ? C.ok : C.danger, fontWeight: 500 }}>
            <span
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: ok ? C.ok : C.danger,
                boxShadow: `0 0 0 3px ${ok ? 'rgba(79,138,91,.18)' : 'rgba(181,72,58,.16)'}`,
              }}
            />
            {ok ? 'Hoạt động' : 'Bị khóa'}
          </span>
        );
      },
    },
    {
      title: 'Thao tác',
      key: 'action',
      width: 280,
      align: 'right',
      render: (_, u) => {
        const locked = u.status === 'locked';
        return (
          <Space size={4}>
            <Tooltip title="Chỉnh sửa">
              <Button
                type="text"
                icon={<EditOutlined />}
                style={{ color: C.gold }}
                onClick={() => openEditModal(u)}
              >
                Sửa
              </Button>
            </Tooltip>
            <Popconfirm
              title={locked ? 'Mở khóa tài khoản này?' : 'Khóa tài khoản này?'}
              description={locked ? 'Người dùng sẽ đăng nhập lại được.' : 'Người dùng sẽ không thể đăng nhập.'}
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => toggleLock(u.id)}
            >
              <Button
                type="text"
                danger={!locked}
                icon={locked ? <UnlockOutlined /> : <LockOutlined />}
                style={locked ? { color: C.ok } : undefined}
              >
                {locked ? 'Mở khóa' : 'Khóa'}
              </Button>
            </Popconfirm>
            <Popconfirm
              title="Xóa vĩnh viễn tài khoản này?"
              description="Không thể hoàn tác. Nếu chỉ muốn ngăn đăng nhập, hãy dùng Khóa."
              okText="Xóa"
              okButtonProps={{ danger: true }}
              cancelText="Hủy"
              onConfirm={() => handleDelete(u.id)}
            >
              <Button type="text" danger icon={<DeleteOutlined />}>
                Xóa
              </Button>
            </Popconfirm>
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
                Access Management
              </div>
              <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 600 }}>Quản lý Tài khoản</div>
              <div style={{ display: 'flex', gap: 24, marginTop: 14, fontSize: 13, color: 'rgba(255,255,255,.7)' }}>
                <span>
                  Tổng: <b style={{ color: '#fff', fontFamily: serif, fontSize: 16 }}>{users.length}</b>
                </span>
                <span>
                  Hoạt động: <b style={{ color: '#8fd9a3', fontFamily: serif, fontSize: 16 }}>{activeCount}</b>
                </span>
                <span>
                  Bị khóa: <b style={{ color: '#f0a99d', fontFamily: serif, fontSize: 16 }}>{lockedCount}</b>
                </span>
              </div>
            </div>
            <Space>
              <Button
                size="large"
                icon={<ReloadOutlined />}
                onClick={fetchAccounts}
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
                Thêm tài khoản mới
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
              placeholder="Tìm theo tên hoặc email"
              style={{ maxWidth: 320 }}
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Select
              allowClear
              placeholder="Lọc theo vai trò"
              style={{ minWidth: 200 }}
              options={roleOptions}
              value={roleFilter}
              onChange={(v) => setRoleFilter(v)}
            />
          </div>

          <Table<UserRow>
            className="rd-table"
            rowKey="id"
            columns={columns}
            dataSource={filtered}
            loading={loading}
            pagination={{ pageSize: 5, hideOnSinglePage: true }}
            scroll={{ x: 640 }}
            locale={{ emptyText: 'Không tìm thấy tài khoản phù hợp' }}
          />
        </div>

        {/* Modal Thêm / Sửa Tài khoản */}
        <Modal
          title={
            <span style={{ fontFamily: serif, fontSize: 20, color: C.ink }}>
              {editingUser ? 'Chỉnh sửa Tài khoản' : 'Thêm Tài khoản mới'}
            </span>
          }
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
          onOk={() => form.submit()}
          confirmLoading={submitting}
          okText={editingUser ? 'Lưu thay đổi' : 'Tạo tài khoản'}
          cancelText="Hủy"
          destroyOnHidden
        >
          <Form form={form} layout="vertical" onFinish={handleSaveUser} style={{ marginTop: 16 }}>
            <Form.Item
              label="Họ và Tên"
              name="name"
              rules={[{ required: true, whitespace: true, message: 'Vui lòng nhập họ tên!' }]}
            >
              <Input size="large" placeholder="Ví dụ: Nguyễn Văn A" />
            </Form.Item>

            <Form.Item
              label="Địa chỉ Email"
              name="email"
              rules={[
                { required: true, message: 'Vui lòng nhập email!' },
                { type: 'email', message: 'Email không đúng định dạng!' },
              ]}
            >
              <Input size="large" placeholder="Ví dụ: a@gmail.com" />
            </Form.Item>

            <Form.Item
              label="Vai trò (Role)"
              name="role"
              rules={[{ required: true, message: 'Vui lòng chọn vai trò!' }]}
            >
              <Select size="large" options={roleOptions} placeholder="Chọn vai trò phân quyền" />
            </Form.Item>

            <Form.Item
              label={editingUser ? 'Đặt lại mật khẩu (để trống nếu không đổi)' : 'Mật khẩu'}
              name="password"
              rules={[
                { required: !editingUser, message: 'Vui lòng nhập mật khẩu!' },
                { min: 8, message: 'Mật khẩu tối thiểu 8 ký tự!' },
              ]}
            >
              <Input.Password size="large" autoComplete="new-password" placeholder="Ít nhất 8 ký tự" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </ConfigProvider>
  );
}