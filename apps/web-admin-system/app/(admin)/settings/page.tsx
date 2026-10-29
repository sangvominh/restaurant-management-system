'use client';
import React, { useEffect, useState } from 'react';
import { Button, Col, ConfigProvider, Form, Input, InputNumber, Row, Select, Space, Spin, message } from 'antd';
import { BankOutlined, ReloadOutlined, SaveOutlined, SettingOutlined } from '@ant-design/icons';
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
  warn: '#c9822b',
};
const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";

/* ---------- Types & initial values ---------- */
interface SettingsValues {
  restaurantName: string;
  email: string;
  phone?: string;
  currency: 'VND' | 'USD';
  tax: number;
}

const defaultValues: SettingsValues = {
  restaurantName: 'Hệ thống Quản lý MRP',
  email: 'admin@mrpsystem.vn',
  phone: '0901234567',
  currency: 'VND',
  tax: 8,
};


const css = `
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600;700&display=swap');
.rd-form .ant-form-item-label > label { color: #8a7d70; font-size: 12.5px; font-weight: 600; letter-spacing: .02em; }
`;

function SectionCard({
  icon,
  title,
  desc,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        background: C.card,
        border: `1px solid ${C.line}`,
        borderRadius: 16,
        padding: 24,
        height: '100%',
        boxShadow: '0 1px 2px rgba(60,40,15,.04)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 22 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 11,
            display: 'grid',
            placeItems: 'center',
            background: '#f6efe1',
            color: C.gold,
            fontSize: 16,
          }}
        >
          {icon}
        </div>
        <div>
          <div style={{ fontFamily: serif, fontSize: 18, fontWeight: 600, color: C.ink, lineHeight: 1.2 }}>
            {title}
          </div>
          <div style={{ color: C.muted, fontSize: 12.5 }}>{desc}</div>
        </div>
      </div>
      {children}
    </div>
  );
}

export default function SettingsPage() {
  const [form] = Form.useForm<SettingsValues>();
  const [savedValues, setSavedValues] = useState<SettingsValues>(defaultValues);
  const [loading, setLoading] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [saving, setSaving] = useState(false);

  // 1. Tải cấu hình hiện tại từ PostgreSQL
  const fetchSettings = async () => {
    setLoading(true);
    try {
      const res = await apiFetch(`/api/admin/settings`);
      if (!res.ok) throw new Error(await readError(res, 'Không tải được cấu hình'));
      const data = await res.json();
      const loaded: SettingsValues = {
        restaurantName: data.restaurantName,
        email: data.email,
        phone: data.phone || '',
        currency: data.currency,
        tax: Number(data.tax),
      };
      setSavedValues(loaded);
      form.setFieldsValue(loaded);
      setDirty(false);
    } catch (error: any) {
      console.error(error);
      message.error(error instanceof TypeError ? 'Không kết nối được với Backend NestJS!' : error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  // 2. Lưu cấu hình xuống PostgreSQL qua API PUT
  const handleFinish = async (values: SettingsValues) => {
    setSaving(true);
    try {
      const res = await apiFetch(`/api/admin/settings`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (!res.ok) throw new Error(await readError(res, 'Lưu cấu hình thất bại'));
      const updated = await res.json();
      const nextSaved: SettingsValues = {
        restaurantName: updated.restaurantName,
        email: updated.email,
        phone: updated.phone || '',
        currency: updated.currency,
        tax: Number(updated.tax),
      };
      setSavedValues(nextSaved);
      form.setFieldsValue(nextSaved);
      message.success('Đã lưu cấu hình hệ thống vào PostgreSQL');
      setDirty(false);
    } catch (error: any) {
      message.error(error.message || 'Có lỗi xảy ra khi lưu cấu hình!');
    } finally {
      setSaving(false);
    }
  };

  // 3. Hoàn tác về giá trị đã lưu gần nhất trong DB
  const handleReset = () => {
    form.setFieldsValue(savedValues);
    setDirty(false);
  };

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
          <div style={{ position: 'relative' }}>
            <div
              style={{
                color: C.goldLight,
                letterSpacing: 3,
                fontSize: 11,
                textTransform: 'uppercase',
                marginBottom: 8,
              }}
            >
              System Configuration
            </div>
            <div style={{ fontFamily: serif, fontSize: 28, fontWeight: 600 }}>Cấu hình Hệ thống</div>
            <div style={{ color: 'rgba(255,255,255,.65)', marginTop: 6, fontSize: 14 }}>
              Thiết lập thông tin doanh nghiệp và các thông số vận hành mặc định.
            </div>
          </div>
        </div>

        <Spin spinning={loading}>
          <Form<SettingsValues>
            className="rd-form"
            form={form}
            layout="vertical"
            requiredMark={false}
            initialValues={defaultValues}
            onValuesChange={() => setDirty(true)}
            onFinish={handleFinish}
          >
            <Row gutter={[16, 16]}>
              <Col xs={24} lg={12}>
                <SectionCard
                  icon={<BankOutlined />}
                  title="Thông tin chung"
                  desc="Hiển thị trên hóa đơn và email hệ thống"
                >
                  <Form.Item
                    label="Tên nhà hàng / Doanh nghiệp"
                    name="restaurantName"
                    rules={[{ required: true, whitespace: true, message: 'Vui lòng nhập tên' }]}
                  >
                    <Input size="large" placeholder="Nhập tên nhà hàng..." />
                  </Form.Item>
                  <Form.Item
                    label="Email liên hệ"
                    name="email"
                    rules={[
                      { required: true, message: 'Vui lòng nhập email' },
                      { type: 'email', message: 'Email không hợp lệ' },
                    ]}
                  >
                    <Input size="large" placeholder="Nhập email..." />
                  </Form.Item>
                  <Form.Item
                    label="Số điện thoại Hotline"
                    name="phone"
                    rules={[{ pattern: /^(0|\+84)\d{9,10}$/, message: 'Số điện thoại không hợp lệ' }]}
                  >
                    <Input size="large" placeholder="Nhập hotline..." />
                  </Form.Item>
                </SectionCard>
              </Col>

              <Col xs={24} lg={12}>
                <SectionCard
                  icon={<SettingOutlined />}
                  title="Cấu hình Vận hành"
                  desc="Áp dụng cho toàn bộ giao dịch mới"
                >
                  <Form.Item label="Tiền tệ mặc định" name="currency">
                    <Select
                      size="large"
                      options={[
                        { value: 'VND', label: 'Việt Nam Đồng (VND)' },
                        { value: 'USD', label: 'US Dollar (USD)' },
                      ]}
                    />
                  </Form.Item>
                  <Form.Item
                    label="Thuế VAT mặc định (%)"
                    name="tax"
                    rules={[{ required: true, message: 'Vui lòng nhập thuế suất' }]}
                    extra={
                      <span style={{ color: C.muted }}>
                        Chỉ áp dụng cho đơn mới, không đổi hóa đơn đã phát hành.
                      </span>
                    }
                  >
                    <InputNumber size="large" min={0} max={100} step={0.5} style={{ width: '100%' }} suffix="%" />
                  </Form.Item>
                </SectionCard>
              </Col>
            </Row>

            {/* Action bar */}
            <div
              style={{
                marginTop: 16,
                background: C.card,
                border: `1px solid ${C.line}`,
                borderRadius: 16,
                padding: '16px 24px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <span style={{ fontSize: 13, color: dirty ? C.warn : C.muted }}>
                {dirty ? 'Bạn có thay đổi chưa được lưu' : 'Mọi thay đổi đã được lưu'}
              </span>
              <Space>
                <Button size="large" icon={<ReloadOutlined />} disabled={!dirty} onClick={handleReset}>
                  Hoàn tác
                </Button>
                <Button
                  size="large"
                  type="primary"
                  htmlType="submit"
                  icon={<SaveOutlined />}
                  loading={saving}
                  disabled={!dirty}
                  style={{ fontWeight: 600 }}
                >
                  Lưu cấu hình
                </Button>
              </Space>
            </div>
          </Form>
        </Spin>
      </div>
    </ConfigProvider>
  );
}