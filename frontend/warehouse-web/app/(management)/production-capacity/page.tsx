'use client';
import { useEffect, useState } from 'react';
import { Alert, Button, Input, Select, Space, Table, Tag } from 'antd';
import { apiFetch, readError } from '@/lib/api';

interface Branch { code: string; name: string }
interface CapacityItem {
  productCode: string; productName: string; unit: string | null; maxQuantity: string | null;
  status: 'AVAILABLE' | 'SHORTAGE' | 'UNAVAILABLE'; reason: string | null;
}
interface CapacityData { checkedAt: string; items: CapacityItem[] }

export default function ProductionCapacityPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [branchCode, setBranchCode] = useState('');
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [branchesError, setBranchesError] = useState('');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<CapacityData | null>(null);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    let active = true;
    setBranchesError(''); setBranchesLoading(true);
    void (async () => {
      const response = await apiFetch('/warehouse/branches');
      if (!response.ok) throw new Error(await readError(response, 'Không tải được chi nhánh.'));
      const body = await response.json();
      if (active) {
        const rows: Branch[] = body.data;
        setBranches(rows);
        if (rows.length === 1) setBranchCode(rows[0].code);
      }
    })().catch(cause => { if (active) setBranchesError(cause instanceof Error ? cause.message : 'Không tải được chi nhánh.'); })
      .finally(() => { if (active) setBranchesLoading(false); });
    return () => { active = false; };
  }, [reload]);
  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    setData(null); setError(''); setPage(1);
    if (!branchCode) { setLoading(false); return; }
    setLoading(true);
    void (async () => {
      const response = await apiFetch('/warehouse/production-capacity?' + new URLSearchParams({ branchCode }), { signal: controller.signal });
      if (!response.ok) throw new Error(await readError(response, 'Không kiểm tra được khả năng sản xuất.'));
      const body = await response.json();
      if (active) setData(body.data);
    })().catch(cause => { if (active) setError(cause instanceof Error ? cause.message : 'Không kiểm tra được khả năng sản xuất.'); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; controller.abort(); };
  }, [branchCode, reload]);
  const query = search.trim().toLocaleLowerCase('vi');
  const rows = (data?.items ?? []).filter(item => !query || [item.productCode, item.productName].some(value => value.toLocaleLowerCase('vi').includes(query)));
  return <>
    <div className="page-heading"><div><h1>Khả năng sản xuất</h1><p>Kiểm tra số thành phẩm tối đa có thể làm từ nguyên vật liệu còn hạn tại kho.</p></div></div>
    <Space wrap style={{ marginBottom: 16 }}>
      <Select aria-label="Chi nhánh cần kiểm tra" placeholder="Chọn chi nhánh" value={branchCode || undefined} loading={branchesLoading} onChange={setBranchCode} style={{ width: 260 }} options={branches.map(branch => ({ value: branch.code, label: branch.code + ' · ' + branch.name }))} />
      <Input aria-label="Tìm sản phẩm" placeholder="Tìm mã hoặc tên sản phẩm" value={search} onChange={event => { setSearch(event.target.value); setPage(1); }} style={{ width: 240 }} />
      <Button loading={loading || branchesLoading} onClick={() => setReload(value => value + 1)}>Kiểm tra lại</Button>
    </Space>
    {(branchesError || error) && <Alert type="error" showIcon title={branchesError || error} style={{ marginBottom: 12 }} />}
    <p>Mỗi sản phẩm được tính riêng theo công thức đang hoạt động mới nhất. Các sản phẩm có thể dùng chung nguyên liệu nên không cộng các dòng. Kết quả không giữ chỗ hoặc trừ tồn.</p>
    {data && <p>Kiểm tra lúc {new Date(data.checkedAt).toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}.</p>}
    <Table<CapacityItem> rowKey="productCode" dataSource={rows} loading={loading || branchesLoading} scroll={{ x: 850 }}
      locale={{ emptyText: !branchCode ? 'Chọn chi nhánh để kiểm tra.' : 'Không có sản phẩm phù hợp.' }}
      pagination={{ current: page, pageSize: 10, showSizeChanger: false, onChange: setPage }} columns={[
        { title: 'Mã SP', dataIndex: 'productCode' },
        { title: 'Sản phẩm', dataIndex: 'productName' },
        { title: 'Tối đa làm được', render: (_, item) => item.maxQuantity === null ? 'Chưa xác định' : new Intl.NumberFormat('vi-VN').format(BigInt(item.maxQuantity)) + ' ' + (item.unit ?? '') },
        { title: 'Kết quả', render: (_, item) => <><Tag color={item.status === 'AVAILABLE' ? 'green' : item.status === 'SHORTAGE' ? 'orange' : 'default'}>{item.status === 'AVAILABLE' ? 'Đủ nguyên liệu' : item.status === 'SHORTAGE' ? 'Thiếu nguyên liệu' : 'Chưa thể tính'}</Tag>{item.reason && <div>{item.reason}</div>}</> },
      ]} />
  </>;
}
