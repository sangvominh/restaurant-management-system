'use client';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { ArrowRight, BellRing, CalendarDays, ChevronDown, CircleAlert, ClipboardCheck, Eye, Package, Plus, Soup, Warehouse } from 'lucide-react';
import { apiFetch, readError } from '@/lib/session';
import { portal } from '@/lib/portal';
import { allowed, useWarehouseUser } from '@/lib/auth';

type Row = Record<string, any>;
const statusLabel = (status: string) => ({PENDING:'Chờ duyệt',APPROVED:'Đã duyệt',REJECTED:'Từ chối',ACTIVE:'Đang áp dụng'}[status] ?? status);
export default function Dashboard() {
  const user = useWarehouseUser();
  const [data,setData] = useState<Record<string, Row[]>>({});
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(true);
  const [period,setPeriod] = useState('7');
  const inventory = allowed(user,'inventory:view');
  const receipts = allowed(user,'inventory:import');
  const materials = allowed(user,'inventory:approve-export');
  const finished = portal.pages.some(page => page.path === '/finished-issues') && allowed(user,'finished-goods:approve-export');
  const products = portal.pages.some(page => page.path === '/products') && allowed(user,'product:view');
  const bom = portal.pages.some(page => page.path === '/bom') && allowed(user,'bom:manage');
  useEffect(()=>{
    let active=true;
    const jobs: [string,string][]=[];
    if(inventory) jobs.push(['inventory','/warehouse/inventory'],['movements','/warehouse/inventory-movements']);
    if(receipts) jobs.push(['receipts','/warehouse/receipts']);
    if(materials) jobs.push(['materialIssues','/warehouse/material-issues?status=PENDING']);
    if(finished) jobs.push(['finishedIssues','/warehouse/finished-goods-issues?status=PENDING']);
    if(products) jobs.push(['finishedGoods','/products/finished-goods-stock']);
    if(!inventory&&products) jobs.push(['movements','/warehouse/finished-goods-movements']);
    if(bom) jobs.push(['boms','/warehouse/boms']);
    setLoading(true);
    void Promise.all(jobs.map(async([key,path])=>{
      const response=await apiFetch(path);
      if(!response.ok)throw new Error(await readError(response,'Không tải được tổng quan warehouse'));
      const body=await response.json();return [key,Array.isArray(body)?body:body.data??[]] as const;
    })).then(entries=>{if(active){setData(Object.fromEntries(entries));setError('');}})
      .catch(e=>{if(active)setError(e instanceof Error?e.message:'Không tải được tổng quan warehouse');})
      .finally(()=>{if(active)setLoading(false);});
    return()=>{active=false;};
  },[inventory,receipts,materials,finished,products,bom]);
  const lowStock=(data.inventory??[]).filter(row=>Number(row.totalStock)<=Number(row.minStock));
  const lowFinished=(data.finishedGoods??[]).filter(row=>row.status!=='An toàn');
  const waiting: Row[]=[...(data.materialIssues??[]).map(row=>({...row,code:row.issueCode,path:'/material-issues'})),
    ...(data.finishedIssues??[]).map(row=>({...row,path:'/finished-issues'}))];
  const chartData=useMemo(()=>{
    const dateKey=(value:Date)=>new Intl.DateTimeFormat('en-CA',{timeZone:'Asia/Ho_Chi_Minh',year:'numeric',month:'2-digit',day:'2-digit'}).format(value);
    return Array.from({length:Number(period)},(_,index)=>{
      const date=new Date();date.setDate(date.getDate()-(Number(period)-index-1));
      const moves=(data.movements??[]).filter(row=>dateKey(new Date(row.createdAt))===dateKey(date));
      return {day:date.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit'}),inbound:moves.filter(row=>Number(row.quantityChange)>0).length,outbound:moves.filter(row=>Number(row.quantityChange)<0).length};
    });
  },[data.movements,period]);
  const today=new Date().toLocaleDateString('vi-VN',{timeZone:'Asia/Ho_Chi_Minh'});
  const attention=inventory?lowStock:lowFinished;
  return <>
    <div className="page-heading"><div><div className="eyebrow"><span className="eyebrow-line"/>{today}</div>
      <h1>Xin chào, {user?.name} <span className="wave">✳</span></h1><p>Đây là tình hình kho vận theo quyền được cấp.</p></div>
      <div className="heading-actions"><span className="button button-secondary"><CalendarDays size={16}/>{today}</span>
        {receipts&&<Link className="button button-primary" href="/receipts"><Plus size={17}/>Tạo phiếu nhập</Link>}
      </div></div>
    <div className={`demo-banner ${error?'':'success-banner'}`} role={error?'alert':'status'}><div className="demo-icon"><Eye size={15}/></div>
      <span>{error|| (loading?'Đang tải dữ liệu…':'Dữ liệu được lấy từ hệ thống theo quyền của tài khoản. Các tổng số phản ánh danh sách đã tải.')}</span></div>
    <section className="kpi-grid">
      {inventory&&<Kpi icon={<Warehouse size={18}/>} label="Nguyên liệu đang theo dõi" value={data.inventory?.length??0} note="Danh mục nguyên vật liệu"/>}
      {products&&<Kpi icon={<Package size={18}/>} label="Thành phẩm đang theo dõi" value={data.finishedGoods?.length??0} note="Danh sách thành phẩm"/>}
      {(inventory||products)&&<Kpi icon={<CircleAlert size={18}/>} label={inventory?'NVL đang tồn thấp':'Thành phẩm cần chú ý'} value={attention.length} note="Theo cảnh báo tồn hiện tại" tone="amber"/>}
      {(materials||finished)&&<Kpi icon={<ClipboardCheck size={18}/>} label="Phiếu xuất chờ duyệt" value={waiting.length} note="Phiếu trong danh sách được tải" tone="blue"/>}
      {receipts&&<Kpi icon={<Package size={18}/>} label="Phiếu nhập đã tải" value={data.receipts?.length??0} note="Danh sách phiếu nhập gần đây"/>}
      {bom&&<Kpi icon={<Soup size={18}/>} label="Công thức đã tải" value={data.boms?.length??0} note="Danh sách công thức BOM"/>}
    </section>
    {(inventory||products)&&<section className="dashboard-grid dashboard-grid-primary">
      <div className="panel chart-panel"><div className="panel-header"><div><div className="panel-title-row"><h2>Nhập – xuất kho</h2><span className="subtle-tag">Theo dõi kho</span></div><p>Số lượt biến động trong lịch sử đã tải</p></div>
        <label className="select-wrap"><select aria-label="Khoảng thời gian" value={period} onChange={e=>setPeriod(e.target.value)}><option value="7">7 ngày qua</option><option value="30">30 ngày qua</option></select><ChevronDown size={14}/></label></div>
        <div className="chart-legend"><span><i className="legend-dot inbound"/> Nhập kho <strong>{chartData.reduce((sum,row)=>sum+row.inbound,0)}</strong><small> lượt</small></span><span><i className="legend-dot outbound"/> Xuất kho <strong>{chartData.reduce((sum,row)=>sum+row.outbound,0)}</strong><small> lượt</small></span></div>
        <div className="chart-area"><ResponsiveContainer width="100%" height="100%"><AreaChart data={chartData} margin={{top:12,right:4,left:-24,bottom:0}}><defs><linearGradient id="inboundFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#c66b45" stopOpacity={0.18}/><stop offset="90%" stopColor="#c66b45" stopOpacity={0}/></linearGradient><linearGradient id="outboundFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#97a9a3" stopOpacity={0.13}/><stop offset="90%" stopColor="#97a9a3" stopOpacity={0}/></linearGradient></defs><CartesianGrid stroke="#eff0ee" strokeDasharray="3 4" vertical={false}/><XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill:'#9a9b96',fontSize:11}} dy={8}/><YAxis allowDecimals={false} axisLine={false} tickLine={false} tick={{fill:'#9a9b96',fontSize:11}}/><Tooltip contentStyle={{border:'1px solid #ecece8',borderRadius:10,fontSize:12}}/><Area type="monotone" dataKey="inbound" name="Nhập kho" stroke="#c66b45" strokeWidth={2.3} fill="url(#inboundFill)"/><Area type="monotone" dataKey="outbound" name="Xuất kho" stroke="#96a59f" strokeWidth={2.3} fill="url(#outboundFill)"/></AreaChart></ResponsiveContainer></div></div>
      <div className="panel alerts-panel"><div className="panel-header"><div><div className="panel-title-row"><h2>Cảnh báo tồn kho</h2><span className="count-badge count-red">{attention.length}</span></div><p>{inventory?'Nguyên vật liệu':'Thành phẩm'} cần chú ý</p></div><Link className="text-link" href={inventory?'/inventory':'/finished-goods'}>Xem tất cả <ArrowRight size={14}/></Link></div>
        <div className="alert-list">{attention.slice(0,4).map(row=><div className="alert-row" key={row.code}><div className="material-avatar material-warm"><Package size={17}/></div><div className="alert-main"><strong>{row.name}</strong><span>{row.code} <i>·</i> {row.category}</span></div><div className="alert-stock"><strong className="danger">{row.totalStock??row.quantity} <small>{row.unit}</small></strong><span>Min: {row.minStock??row.minimum}</span></div></div>)}</div>
        {!attention.length&&!loading&&<p style={{padding:20,color:'#858780'}}>Chưa có mặt hàng cần cảnh báo.</p>}
        <Link className="panel-footer-link" href={inventory?'/inventory':'/finished-goods'}>Kiểm tra tồn kho <ArrowRight size={14}/></Link></div>
    </section>}
    <section className="dashboard-grid dashboard-grid-secondary" style={{gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))'}}>
      {(materials||finished)&&<div className="panel approvals-panel"><div className="panel-header"><div><div className="panel-title-row"><h2>Phiếu xuất chờ duyệt</h2><span className="count-badge count-amber">{waiting.length}</span></div><p>Phiếu thuộc chức năng được cấp</p></div></div>
        <div className="table-wrap"><table className="data-table compact-table"><thead><tr><th>MÃ PHIẾU</th><th>CHI NHÁNH</th><th>NGÀY TẠO</th><th>TRẠNG THÁI</th><th/></tr></thead><tbody>{waiting.slice(0,4).map(row=><tr key={row.code}><td><Link className="code-link" href={row.path}>{row.code}</Link></td><td>{row.branchName??row.branchCode}</td><td className="muted-cell">{new Date(row.createdAt).toLocaleDateString('vi-VN')}</td><td><span className="status-pill warning"><i/>{statusLabel(row.status)}</span></td><td><Link className="row-action" href={row.path} aria-label="Xem phiếu"><ArrowRight size={15}/></Link></td></tr>)}</tbody></table></div>
        {!waiting.length&&!loading&&<p style={{padding:20,color:'#858780'}}>Chưa có phiếu chờ duyệt.</p>}
        <Link href={materials?'/material-issues':'/finished-issues'} className="panel-footer-link">Mở danh sách phê duyệt <ArrowRight size={14}/></Link></div>}
      {inventory&&<div className="panel expiry-panel"><div className="panel-header"><div><div className="panel-title-row"><h2>Tra cứu lô hàng</h2><BellRing size={15} className="heading-icon amber-icon"/></div><p>Kiểm tra vị trí và hạn sử dụng</p></div></div><div className="expiry-feature"><div className="expiry-date"><span>THEO DÕI</span><Warehouse size={27}/><small>LÔ HÀNG</small></div><div className="expiry-info"><strong>Hạn sử dụng nguyên liệu</strong><span>Mở chi tiết nguyên liệu để xem từng lô.</span></div></div><Link className="panel-footer-link" href="/inventory">Xem danh sách nguyên liệu <ArrowRight size={14}/></Link></div>}
      {bom&&<div className="panel production-panel"><div className="panel-header"><div><div className="panel-title-row"><h2>Công thức đang áp dụng</h2></div><p>Định lượng theo từng sản phẩm</p></div><Link className="text-link" href="/bom">Xem tất cả <ArrowRight size={14}/></Link></div><div className="production-list">{(data.boms??[]).filter(row=>row.status==='ACTIVE').slice(0,3).map(row=><div className="production-row" key={row.code}><div className="production-product"><div className="production-avatar"><Package size={17}/></div><div><strong>{row.productName??row.productCode}</strong><span>{row.code} <i>·</i> v{row.version}</span></div></div><span className="status-pill success"><i/>Đang áp dụng</span></div>)}</div><Link className="panel-footer-link" href="/bom">Mở công thức BOM <ArrowRight size={14}/></Link></div>}
    </section>
  </>;
}
function Kpi({icon,label,value,note,tone}:{icon:React.ReactNode;label:string;value:number;note:string;tone?:string}) {
  return <div className="kpi-card"><div className="kpi-top"><span className={`kpi-icon ${tone??''}`}>{icon}</span></div><span className="kpi-label">{label}</span><div className="kpi-value-row"><strong>{value.toLocaleString('vi-VN')}</strong></div><span className="kpi-note">{note}</span></div>;
}
