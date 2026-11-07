'use client';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Descriptions, Input, Modal, Tag, Upload, message } from 'antd';
import { CloudDownloadOutlined, InboxOutlined, WarningOutlined } from '@ant-design/icons';
import { apiFetch, clearSession, getUser, isSystemAdmin, readError } from '../../lib/api';

const C = { ink: '#1c1612', gold: '#b8893b', card: '#ffffff', line: '#ece5d8', text: '#3b3129', muted: '#8a7d70', danger: '#b5483a' };
const serif = "'Playfair Display', Georgia, 'Times New Roman', serif";
const CONFIRM_WORD = 'PHỤC HỒI';

interface Preview {
  summary: { roles: number; accounts: number; categories: number; settings: number; exportedAt: string | null; exportedBy: string | null };
  warnings: string[];
}

const card: React.CSSProperties = { background: C.card, border: `1px solid ${C.line}`, borderRadius: 12, padding: 24 };

function download(data: unknown, prefix: string) {
  const stamp = new Date().toISOString().replace(/[:T]/g, '-').slice(0, 19);
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${prefix}-${stamp}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

async function fetchBackup() {
  const res = await apiFetch('/api/admin/backup/export');
  if (!res.ok) throw new Error(await readError(res, 'Không sao lưu được'));
  return res.json();
}

export default function BackupPage() {
  const [canRestore, setCanRestore] = useState(false);
  useEffect(() => { setCanRestore(isSystemAdmin(getUser())); }, []);
  const [exporting, setExporting] = useState(false);
  const [parsed, setParsed] = useState<unknown>(null);
  const [fileName, setFileName] = useState('');
  const [preview, setPreview] = useState<Preview | null>(null);
  const [checking, setChecking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState('');
  const [restoring, setRestoring] = useState(false);

  const doExport = async () => {
    setExporting(true);
    try {
      const data = await fetchBackup();
      download(data, 'sao-luu-admin');
      message.success('Đã tạo bản sao lưu');
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setExporting(false);
    }
  };

  const onFile = async (file: File) => {
    setPreview(null);
    setError(null);
    setParsed(null);
    setFileName(file.name);
    setChecking(true);
    try {
      const json = JSON.parse(await file.text());
      const res = await apiFetch('/api/admin/backup/restore?dryRun=true', { method: 'POST', body: JSON.stringify(json) });
      if (!res.ok) throw new Error(await readError(res, 'Tệp không hợp lệ'));
      setParsed(json);
      setPreview(await res.json());
    } catch (e: any) {
      setError(e instanceof SyntaxError ? 'Tệp không phải JSON hợp lệ' : e.message);
    } finally {
      setChecking(false);
    }
    return false; // không upload lên server theo kiểu mặc định
  };

  const doRestore = async () => {
    setRestoring(true);
    try {
      // Tự tải về bản sao lưu của dữ liệu hiện tại trước khi ghi đè, để còn đường quay lại.
      download(await fetchBackup(), 'tu-dong-truoc-khi-phuc-hoi');
      const res = await apiFetch('/api/admin/backup/restore', { method: 'POST', body: JSON.stringify(parsed) });
      if (!res.ok) throw new Error(await readError(res, 'Phục hồi thất bại'));
      setOpen(false);
      Modal.success({
        title: 'Phục hồi thành công',
        content: 'Đã phục hồi cấu hình và tài khoản. Mọi phiên đăng nhập đã kết thúc; bạn cần đăng nhập lại.',
        okText: 'Đăng nhập lại',
        onOk: () => {
          clearSession();
          window.location.href = '/login';
        },
      });
    } catch (e: any) {
      message.error(e.message);
    } finally {
      setRestoring(false);
    }
  };

  return (
    <div>
      <h1 style={{ fontFamily: serif, color: C.ink, margin: '0 0 4px', fontSize: 28 }}>Sao lưu & Phục hồi</h1>
      <p style={{ color: C.muted, margin: '0 0 20px' }}>
        Lưu toàn bộ dữ liệu quản trị ra một tệp để cất giữ, và đưa hệ thống về đúng trạng thái đó khi cần.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 20 }}>
        <div style={card}>
          <h3 style={{ fontFamily: serif, color: C.ink, marginTop: 0 }}>Sao lưu</h3>
          <p style={{ color: C.text }}>
            Tải về một tệp JSON gồm: <b>tài khoản</b>, <b>vai trò & quyền</b>, <b>danh mục</b>, <b>cấu hình hệ thống</b>.
          </p>
          <Alert
            type="warning"
            showIcon
            style={{ marginBottom: 16 }}
            message="Tệp chứa mật khẩu đã băm của mọi tài khoản. Hãy cất ở nơi an toàn, không gửi công khai hay đưa lên GitHub."
          />
          <Button type="primary" icon={<CloudDownloadOutlined />} loading={exporting} onClick={doExport}>
            Tải bản sao lưu
          </Button>
        </div>

        <div style={card}>
          <h3 style={{ fontFamily: serif, color: C.ink, marginTop: 0 }}>Phục hồi</h3>
          <p style={{ color: C.text }}>
            Chọn tệp sao lưu. Hệ thống kiểm tra tệp trước và cho xem nội dung, chưa thay đổi gì cho đến khi bạn xác nhận.
          </p>
          {!canRestore && <Alert type="info" showIcon message="Chỉ Admin hệ thống được phục hồi tài khoản và quyền." style={{ marginBottom: 12 }} />}
          <Upload.Dragger accept=".json,application/json" maxCount={1} showUploadList={false} beforeUpload={onFile} disabled={checking || !canRestore}>
            <p className="ant-upload-drag-icon"><InboxOutlined /></p>
            <p className="ant-upload-text">{checking ? 'Đang kiểm tra...' : 'Bấm hoặc kéo tệp .json vào đây'}</p>
          </Upload.Dragger>

          {error && <Alert type="error" showIcon style={{ marginTop: 16 }} message={`${fileName}: ${error}`} />}

          {preview && (
            <div style={{ marginTop: 16 }}>
              <Tag color="green">Tệp hợp lệ</Tag> <span style={{ color: C.muted }}>{fileName}</span>
              <Descriptions size="small" column={1} bordered style={{ marginTop: 12 }}>
                <Descriptions.Item label="Sao lưu lúc">
                  {preview.summary.exportedAt ? new Date(preview.summary.exportedAt).toLocaleString('vi-VN') : '—'}
                  {preview.summary.exportedBy ? ` bởi ${preview.summary.exportedBy}` : ''}
                </Descriptions.Item>
                <Descriptions.Item label="Tài khoản">{preview.summary.accounts}</Descriptions.Item>
                <Descriptions.Item label="Vai trò">{preview.summary.roles}</Descriptions.Item>
                <Descriptions.Item label="Danh mục">{preview.summary.categories}</Descriptions.Item>
              </Descriptions>
              {preview.warnings.map((w) => (
                <Alert key={w} type="warning" showIcon style={{ marginTop: 12 }} message={w} />
              ))}
              <Button danger type="primary" icon={<WarningOutlined />} style={{ marginTop: 16 }} onClick={() => { setWord(''); setOpen(true); }}>
                Phục hồi từ tệp này
              </Button>
            </div>
          )}
        </div>
      </div>

      <Modal
        open={open}
        title="Xác nhận phục hồi dữ liệu"
        okText="Phục hồi"
        cancelText="Hủy"
        okButtonProps={{ danger: true, disabled: word !== CONFIRM_WORD, loading: restoring }}
        onOk={doRestore}
        onCancel={() => !restoring && setOpen(false)}
        destroyOnHidden
      >
        <p>
          Tài khoản, vai trò, danh mục và cấu hình sẽ được <b style={{ color: C.danger }}>phục hồi</b> từ tệp.
          Tài khoản không có trong tệp sẽ bị khóa. Nhật ký được giữ lại và mọi phiên đăng nhập bị thu hồi.
          Hệ thống sẽ tự tải về một bản sao lưu của dữ liệu hiện tại trước khi ghi đè.
        </p>
        <p>Gõ <b>{CONFIRM_WORD}</b> để xác nhận:</p>
        <Input value={word} onChange={(e) => setWord(e.target.value)} placeholder={CONFIRM_WORD} />
      </Modal>
    </div>
  );
}
