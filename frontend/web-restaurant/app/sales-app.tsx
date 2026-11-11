'use client';
import { useCallback, useEffect, useState } from 'react';
import { api, can, type Product, type Sale, type User, type DiningTable } from './sales-api';
import TablesPanel from './tables-panel';
import SalesOrders from './sales-orders';
import SalesReport from './sales-report';
import SalesSettings from './sales-settings';
import StoreInventory from './store-inventory';
import SaleEditor from './sale-editor';
import { AppIcon } from './document-ui';
import './sales-management.css';
type Tab = 'tables' | 'sales' | 'store' | 'reports' | 'settings';
export default function SalesApp({ user, logout, logoutBusy }: { user: User; logout: () => Promise<void>; logoutBusy: boolean }) {
 const [tab,setTab]=useState<Tab>('tables');
 const [products,setProducts]=useState<Product[]>([]),[sales,setSales]=useState<Sale[]>([]),[tables,setTables]=useState<DiningTable[]>([]);
 const [loading,setLoading]=useState(true),[error,setError]=useState('');
 const [editing,setEditing]=useState<Sale|null|undefined>(),[initialTableId,setInitialTable]=useState('');
 const load=useCallback(async(quiet=false)=>{
  if(!quiet)setLoading(true);setError('');
  try{const [p,s,t]=await Promise.all([api<Product[]>('products'),api<Sale[]>('sales'),api<DiningTable[]>('tables')]);setProducts(p);setSales(s);setTables(t);}
  catch(e){setError(e instanceof Error?e.message:'Không tải được dữ liệu');throw e;}finally{if(!quiet)setLoading(false);}
 },[]);
 useEffect(()=>{void load().catch(()=>{});},[load]);
 useEffect(()=>{if(editing!==undefined)return;const timer=setInterval(()=>void load(true).catch(()=>{}),15000);return()=>clearInterval(timer);},[load,editing]);
 const saved=()=>load(true);
 const labels:Record<Tab,string>={tables:'Bàn phục vụ',sales:'Đơn bán',reports:'Báo cáo bán hàng',store:'Tồn cửa hàng',settings:'Thiết lập bán hàng'};
 function create(tableId=''){setInitialTable(tableId);setEditing(null);}
 async function openReportSale(id:string){try{const latest=await api<Sale[]>('sales');setSales(latest);const order=latest.find(s=>s.id===id);if(!order)throw new Error('Không tìm thấy đơn');setEditing(order);}catch(e){setError(e instanceof Error?e.message:'Không mở được đơn');}}
 const nav=Object.keys(labels) as Tab[];
 return <div className="shell"><aside><div className="brand">Quản lý nhà hàng</div><nav aria-label="Khu vực làm việc">{nav.filter(t=>(t!=='reports'||can(user,'report:sales'))&&(t!=='store'||can(user,'store:manage'))&&(t!=='settings'||can(user,'product:price'))).map(t=><button key={t} aria-current={tab===t?'page':undefined} className={tab===t?'selected':''} onClick={()=>setTab(t)}><AppIcon name={t==='tables'?'tables':t==='store'||t==='settings'?'products':'sales'}/>{labels[t]}</button>)}</nav><div className="profile"><div><strong>{user.name}</strong><small>{user.username}</small></div><button disabled={logoutBusy} onClick={()=>void logout()}>Đăng xuất</button></div></aside>
 <main><h1 className="sr-only">{labels[tab]}</h1>{error&&<div className="error" role="alert">{error} <button onClick={()=>void load().catch(()=>{})}>Tải lại</button></div>}{loading?<p className="empty">Đang tải…</p>:tab==='store'?<StoreInventory/>:tab==='settings'?<SalesSettings saved={saved}/>:tab==='reports'?<SalesReport open={openReportSale}/>:tab==='sales'?<SalesOrders sales={sales} user={user} open={setEditing} create={()=>create()}/>:<TablesPanel tables={tables} sales={sales} user={user} loading={loading} saved={saved} open={setEditing} create={create}/>}</main>
 {editing!==undefined&&<SaleEditor user={user} sale={editing} products={products} tables={tables.filter(t=>!sales.some(s=>s.tableId===t.id&&['DRAFT','CONFIRMED'].includes(s.status))||t.id===editing?.tableId)} initialTableId={initialTableId} close={()=>setEditing(undefined)} saved={saved}/>}
 </div>;
}


