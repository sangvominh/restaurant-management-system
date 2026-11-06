'use client';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Alert, Button, Descriptions, Form, Input, InputNumber, Modal, Select, Space, Table, Tag } from 'antd';
import { apiFetch, readError } from '@/warehouse/session';
import { allowed, useWarehouseUser } from './auth';
import { ArrowDownToLine, ArrowRight, Check, ChevronDown, ChevronLeft, ChevronRight, CirclePlus, Package, RefreshCw, Search } from 'lucide-react';

type Row = Record<string, any>;
const config = {
  receipts: { title: 'Phiếu nhập nguyên vật liệu', endpoint: '/warehouse/receipts', code: 'receiptCode' },
  'material-issues': { title: 'Duyệt xuất nguyên vật liệu', endpoint: '/warehouse/material-issues', code: 'issueCode' },
  'finished-issues': { title: 'Duyệt xuất thành phẩm', endpoint: '/warehouse/finished-goods-issues', code: 'code' },
  'finished-goods': { title: 'Tồn thành phẩm', endpoint: '/products/finished-goods-stock', code: 'code' },
  transactions: { title: 'Lịch sử nguyên vật liệu', endpoint: '/warehouse/inventory-movements', code: 'materialCode' },
};
export type LiveSection = keyof typeof config;
const labels: Record<string,string> = {code:'Mã',issueCode:'Mã phiếu',receiptCode:'Mã phiếu',branchName:'Chi nhánh',branchCode:'Mã chi nhánh',supplierName:'Nhà cung cấp',name:'Tên sản phẩm',quantity:'Số lượng',unit:'Đơn vị',status:'Trạng thái',createdAt:'Ngày tạo',shiftCode:'Ca',totalItems:'Số dòng',materialCode:'Mã nguyên liệu',materialName:'Nguyên liệu',lotCode:'Lô',locationName:'Vị trí',movementType:'Loại giao dịch',quantityBefore:'Tồn trước',quantityChange:'Biến động',quantityAfter:'Tồn sau',note:'Ghi chú',productCode:'Mã sản phẩm',productName:'Sản phẩm',requestedQuantity:'Đề nghị',approvedQuantity:'Đã duyệt',unitName:'Đơn vị',unitPrice:'Đơn giá'};
const display = (value: unknown) => value == null ? '—' : String(value);
const stateLabels: Record<string,string> = {PENDING:'Chờ duyệt',APPROVED:'Đã duyệt',REJECTED:'Từ chối',POSTED:'Hoàn tất',DRAFT:'Bản nháp'};
const descriptions: Record<string,string> = {
  receipts:'Quản lý phiếu nhập và tiếp nhận nguyên vật liệu từ nhà cung cấp.',
  'material-issues':'Xem xét và phê duyệt yêu cầu xuất nguyên vật liệu từ các chi nhánh.',
  'finished-issues':'Duyệt số món nhân viên lấy ra bán theo từng ca. Duyệt phiếu sẽ trừ tồn kho thành phẩm.',
  'finished-goods':'Kiểm soát tồn kho thành phẩm sẵn sàng phân phối đến chi nhánh.',
  transactions:'Tra cứu hoạt động nhập, xuất và điều chỉnh tồn kho.',
};

export default function LivePage({ section }: { section: LiveSection }) {
  const c = config[section];
  const user = useWarehouseUser();
  const [rows,setRows] = useState<Row[]>([]);
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState('');
  const [status,setStatus] = useState('PENDING');
  const [detail,setDetail] = useState<Row>();
  const [action,setAction] = useState<{row:Row;verb:'approve'|'reject'}>();
  const [reason,setReason] = useState('');
  const [busy,setBusy] = useState(false);
  const [create,setCreate] = useState(false);
  const [options,setOptions] = useState<Row>();
  const [query,setQuery] = useState('');
  const [branchFilter,setBranchFilter] = useState('');
  const [page,setPage] = useState(1);
  const [form] = Form.useForm();
  const branch = Form.useWatch('branchCode',form);
  const issues = section === 'material-issues' || section === 'finished-issues';
  const canApprove = allowed(user, section === 'material-issues' ? 'inventory:approve-export' : 'finished-goods:approve-export');
  const filtered = useMemo(()=>rows.filter(row=>(!branchFilter||row.branchCode===branchFilter)&&(!query.trim()||Object.values(row).some(value=>String(value??'').toLocaleLowerCase('vi').includes(query.trim().toLocaleLowerCase('vi'))))),[rows,query,branchFilter]);
  const pageCount=Math.max(1,Math.ceil(filtered.length/8));
  const currentPage=Math.min(page,pageCount);
  const visibleRows=filtered.slice((currentPage-1)*8,currentPage*8);
  const branches=Array.from(new Map(rows.filter(row=>row.branchCode).map(row=>[row.branchCode,row.branchName??row.branchCode])).entries());
  const statusClass=(value:unknown)=>/REJECTED|Dưới/.test(String(value))?'danger':/PENDING|Sắp|DRAFT/.test(String(value))?'warning':'success';
  const cell=(row:Row,key:string)=>key==='createdAt'?new Date(row[key]).toLocaleDateString('vi-VN'):key==='details'?row.details?.map((line:Row)=>`${line.productName}: ${line.requestedQuantity}`).join(', '):display(row[key]);
  function exportCsv() {
    const quote=(value:unknown)=>'"'+String(value??'').replace(/^([=+@-])/,"'$1").replaceAll('"','""')+'"';
    const csv=[keys.map(key=>quote(labels[key]??key)).join(','),...filtered.map(row=>keys.map(key=>quote(cell(row,key))).join(','))].join('\r\n');
    const url=URL.createObjectURL(new Blob(['\uFEFF',csv],{type:'text/csv;charset=utf-8;'}));
    const link=document.createElement('a');link.href=url;link.download=`${section}.csv`;link.click();URL.revokeObjectURL(url);
  }
  const load = useCallback(async () => {
    setLoading(true);setError('');
    try {
      const response=await apiFetch(c.endpoint+(issues?`?status=${status}`:''));
      if(!response.ok)throw new Error(await readError(response,'Không tải được dữ liệu'));
      const body=await response.json();setRows(Array.isArray(body)?body:body.data??[]);
    }catch(e){setError(e instanceof Error?e.message:'Không tải được dữ liệu');}
    finally{setLoading(false);}
  },[c.endpoint,issues,status]);
  useEffect(()=>{void load();},[load]);
  async function openDetail(row:Row) {
    if(section==='receipts'||section==='material-issues') {
      try {
        const response=await apiFetch(`${c.endpoint}/${encodeURIComponent(row[c.code])}`);
        if(!response.ok)throw new Error(await readError(response,'Không tải được chi tiết'));
        setDetail((await response.json()).data);
      }catch(e){setError((e as Error).message);}
    } else setDetail(row);
  }
  async function perform() {
    if(!action)return;
    if(action.verb==='reject'&&!reason.trim()){setError('Vui lòng nhập lý do từ chối.');return;}
    setBusy(true);
    try {
      const response=await apiFetch(`${c.endpoint}/${encodeURIComponent(action.row[c.code])}/${action.verb}`,{
        method:'POST',body:JSON.stringify(action.verb==='reject'?{reason}:{}),
      });
      if(!response.ok)throw new Error(await readError(response,'Không xử lý được phiếu'));
      setAction(undefined);setReason('');await load();
    }catch(e){setError((e as Error).message);}finally{setBusy(false);}
  }
  async function openCreate() {
    try {
      const response=await apiFetch('/warehouse/receipt-options');
      if(!response.ok)throw new Error(await readError(response,'Không tải được danh mục nhập kho'));
      setOptions((await response.json()).data);form.resetFields();form.setFieldsValue({details:[{}]});setCreate(true);
    }catch(e){setError((e as Error).message);}
  }
  async function saveReceipt(values:Row) {
    setBusy(true);
    try {
      const body={...values,details:values.details.map((line:Row)=>({...line,quantity:String(line.quantity),unitPrice:String(line.unitPrice)}))};
      const response=await apiFetch('/warehouse/receipts',{method:'POST',body:JSON.stringify(body)});
      if(!response.ok)throw new Error(await readError(response,'Không tạo được phiếu nhập'));
      setCreate(false);await load();
    }catch(e){setError((e as Error).message);}finally{setBusy(false);}
  }
  const keys=section==='transactions'?['materialCode','lotCode','locationName','movementType','createdAt','quantityBefore','quantityChange','quantityAfter']
    :section==='finished-goods'?['code','name','category','unit','quantity','minimum','status']
    :section==='receipts'?['receiptCode','supplierName','branchName','createdAt','totalItems','status']
    :section==='finished-issues'?['code','branchCode','shiftCode','createdAt','details','status']
    :['issueCode','branchName','createdAt','totalItems','status'];
  return <section><div className="page-heading workspace-heading"><div><div className="eyebrow"><span className="eyebrow-line"/>KHO VẬN <span className="crumb-slash">/</span> QUẢN LÝ KHO</div><h1>{section==='receipts'?'Nhập kho':section==='finished-goods'?'Tồn kho thành phẩm':c.title}</h1><p>{descriptions[section]}</p></div><div className="heading-actions">
    <button className="button button-secondary" onClick={exportCsv}><ArrowDownToLine size={15}/>Xuất danh sách</button>
    {section==='receipts'&&allowed(user,'inventory:import')&&<button className="button button-primary" onClick={()=>void openCreate()}><CirclePlus size={16}/>Tạo phiếu nhập</button>}
  </div></div>
  <div className="workspace-summary">
    <div className="summary-item"><span className="summary-icon"><Package size={18}/></span><div><span>Danh sách đã tải</span><strong>{rows.length}</strong></div></div>
    <div className="summary-item"><span className="summary-icon"><Search size={18}/></span><div><span>Kết quả tìm kiếm</span><strong>{filtered.length}</strong></div></div>
    {issues&&<div className="summary-item"><span className="summary-icon"><Check size={18}/></span><div><span>Trạng thái đang xem</span><strong style={{fontSize:14}}>{stateLabels[status]}</strong></div></div>}
  </div>
  {error&&<Alert type="error" title={error} closable onClose={()=>setError('')}/>}
  <div className="panel workspace-panel">
    {issues&&<div className="tabs-row">{['PENDING','APPROVED','REJECTED'].map(value=><button key={value} className={`tab-button ${status===value?'active':''}`} onClick={()=>{setStatus(value);setPage(1);}}>{stateLabels[value]}</button>)}</div>}
    <div className="table-toolbar"><label className="toolbar-search"><Search size={15}/><input aria-label="Tìm trong danh sách" placeholder="Tìm kiếm theo mã, tên..." value={query} onChange={e=>{setQuery(e.target.value);setPage(1);}}/></label><div className="toolbar-controls">
      {branches.length>0&&<label className="filter-select"><select aria-label="Lọc chi nhánh" value={branchFilter} onChange={e=>{setBranchFilter(e.target.value);setPage(1);}}><option value="">Tất cả chi nhánh</option>{branches.map(([code,name])=><option key={code} value={code}>{name}</option>)}</select><ChevronDown size={14}/></label>}
      <button className="filter-button" onClick={()=>void load()} disabled={loading}><RefreshCw size={14}/>{loading?'Đang tải…':'Tải lại'}</button>
    </div></div>
    <div className="table-wrap"><table className="data-table workspace-table"><thead><tr>{keys.map(key=><th key={key}>{({category:'Nhóm',minimum:'Định mức',details:'Món / số lượng'} as Row)[key]??labels[key]??key}</th>)}<th>Thao tác</th></tr></thead><tbody>{visibleRows.map((row,index)=><tr key={String(row[c.code])+'-'+index}>
      {keys.map((key,position)=><td key={key}>{key==='status'?<span className={`status-pill ${statusClass(row[key])}`}><i/>{stateLabels[row[key]]??display(row[key])}</span>:position===0?<button className="code-link" onClick={()=>void openDetail(row)}>{cell(row,key)}</button>:cell(row,key)}</td>)}
      <td><div style={{display:'flex',gap:6}}><button className="row-action" title="Chi tiết" aria-label={`Chi tiết ${row[c.code]}`} onClick={()=>void openDetail(row)}><ArrowRight size={15}/></button>
        {issues&&canApprove&&row.status==='PENDING'&&<><button className="button button-primary" onClick={()=>{setError('');setAction({row,verb:'approve'});}}>Duyệt</button>
          <button className="button button-secondary" onClick={()=>{setError('');setAction({row,verb:'reject'});}}>Từ chối</button></>}
      </div></td>
    </tr>)}</tbody></table>
    {!visibleRows.length&&<div className="empty-state"><Package size={23}/><strong>{loading?'Đang tải dữ liệu…':'Không tìm thấy dữ liệu'}</strong><span>{loading?'Vui lòng chờ trong giây lát.':'Thử thay đổi từ khóa tìm kiếm hoặc bộ lọc.'}</span></div>}</div>
    <div className="table-pagination"><span>Hiển thị <strong>{filtered.length?(currentPage-1)*8+1:0}–{Math.min(currentPage*8,filtered.length)}</strong> trong <strong>{filtered.length}</strong> kết quả</span><div><button className="page-arrow" aria-label="Trang trước" disabled={currentPage===1} onClick={()=>setPage(currentPage-1)}><ChevronLeft size={16}/></button><button className="page-number">{currentPage}</button><button className="page-arrow" aria-label="Trang sau" disabled={currentPage===pageCount} onClick={()=>setPage(currentPage+1)}><ChevronRight size={16}/></button></div></div>
  </div>
  <Modal open={!!action} title={action?.verb==='approve'?'Xác nhận duyệt phiếu':'Từ chối phiếu'} onCancel={()=>{setAction(undefined);setReason('');}} onOk={()=>void perform()} confirmLoading={busy}>
    <p>{action?.row[c.code]}</p>{action?.verb==='approve'?<p>Duyệt toàn bộ số lượng đề nghị. Hệ thống sẽ kiểm tra tồn trước khi ghi nhận.</p>:<Input.TextArea aria-label="Lý do từ chối" value={reason} onChange={e=>setReason(e.target.value)}/>}
    {error&&<Alert type="error" title={error}/>}
  </Modal>
  <Modal open={!!detail} title="Chi tiết" footer={null} onCancel={()=>setDetail(undefined)} width={850}>
    <Descriptions column={1} items={Object.entries(detail??{}).filter(([,value])=>typeof value!=='object').map(([key,value])=>({key,label:labels[key]??key,children:display(value)}))}/>
    {Array.isArray(detail?.details)&&<Table<Row> pagination={false} dataSource={detail.details} rowKey={(_row,index)=>String(index)} scroll={{x:650}}
      columns={Array.from(new Set(detail.details.flatMap((line:Row)=>Object.keys(line)))).map(key=>({title:labels[String(key)]??String(key),dataIndex:String(key),render:(value:unknown)=>display(value)}))}/>}
    {Array.isArray(detail?.locations)&&<Table<Row> pagination={false} dataSource={detail.locations} rowKey={(_row,index)=>String(index)} columns={['branch','location','quantity'].map(key=>({title:({branch:'Chi nhánh',location:'Vị trí',quantity:'Số lượng'} as Row)[key],dataIndex:key}))}/>}
  </Modal>
  <Modal open={create} title="Tạo phiếu nhập nguyên vật liệu" width={850} onCancel={()=>setCreate(false)} onOk={()=>form.submit()} confirmLoading={busy}>
    <Form form={form} layout="vertical" onFinish={saveReceipt}>
      <Form.Item name="receiptCode" label="Mã phiếu" rules={[{required:true,pattern:/^[A-Z0-9_-]{3,50}$/}]}><Input placeholder="PN-001"/></Form.Item>
      <Form.Item name="supplierCode" label="Nhà cung cấp" rules={[{required:true}]}><Select options={options?.suppliers?.map((s:Row)=>({value:s.code,label:s.name}))}/></Form.Item>
      <Form.Item name="branchCode" label="Chi nhánh" rules={[{required:true}]}><Select onChange={()=>form.setFieldsValue({details:[{}]})} options={options?.branches?.map((s:Row)=>({value:s.code,label:s.name}))}/></Form.Item>
      <Form.Item name="note" label="Ghi chú"><Input/></Form.Item>
      <Form.List name="details">{(fields,{add,remove})=><>{fields.map(field=><div key={field.key} style={{border:'1px solid #ddd',padding:12,marginBottom:12}}>
        <Form.Item name={[field.name,'materialCode']} label="Nguyên vật liệu" rules={[{required:true}]}><Select options={options?.materials?.map((m:Row)=>({value:m.code,label:m.name}))}
          onChange={(code:string)=>{const material=options?.materials?.find((m:Row)=>m.code===code);form.setFieldValue(['details',field.name,'unitName'],material?.unit?.name);form.setFieldValue(['details',field.name,'lotCode'],undefined);}}/></Form.Item>
        <Form.Item shouldUpdate noStyle>{()=>{const code=form.getFieldValue(['details',field.name,'materialCode']);const material=options?.materials?.find((m:Row)=>m.code===code);
          return <Form.Item name={[field.name,'lotCode']} label="Lô nguyên liệu" rules={[{required:true}]}><Select options={material?.lots?.map((l:Row)=>({value:l.lotCode,label:l.lotCode}))}/></Form.Item>;}}</Form.Item>
        <Form.Item name={[field.name,'locationName']} label="Vị trí kho" rules={[{required:true}]}><Select options={options?.branches?.find((b:Row)=>b.code===branch)?.warehouseLocations?.map((l:Row)=>({value:l.name,label:l.name}))}/></Form.Item>
        <Form.Item name={[field.name,'unitName']} label="Đơn vị cơ sở" rules={[{required:true}]}><Input readOnly/></Form.Item>
        <Form.Item name={[field.name,'quantity']} label="Số lượng" rules={[{required:true}]}><InputNumber min={0.001} step={0.001}/></Form.Item>
        <Form.Item name={[field.name,'unitPrice']} label="Đơn giá" rules={[{required:true}]}><InputNumber min={0} precision={2}/></Form.Item>
        {fields.length>1&&<Button onClick={()=>remove(field.name)}>Xóa dòng</Button>}
      </div>)}<Button onClick={()=>add({})}>Thêm nguyên liệu</Button></>}</Form.List>
    </Form>{error&&<Alert type="error" title={error}/>}
  </Modal></section>;
}
