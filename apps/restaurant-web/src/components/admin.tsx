"use client";

import { useEffect, useState, type ReactNode } from "react";
import { Bell, Boxes, ChefHat, ClipboardCheck, FileWarning, PackageCheck, ChevronRight, CookingPot } from "lucide-react";

const sections = [
  { id: "dishes", label: "Quản lý món", icon: CookingPot },
  { id: "products", label: "Tồn kho thành phẩm", icon: Boxes },
  { id: "exports", label: "Duyệt xuất thành phẩm", icon: ClipboardCheck },
  { id: "waste", label: "Hủy thành phẩm", icon: FileWarning },
];

export default function Admin({ children }: { children: ReactNode }) {
  const [active, setActive] = useState("products");
  const [branch, setBranch] = useState("BR001");
  useEffect(() => {
    const onNav = (event: Event) => setActive((event as CustomEvent<string>).detail);
    window.addEventListener("restaurant-section", onNav);
    return () => window.removeEventListener("restaurant-section", onNav);
  }, []);
  return <div className="shell"><aside className="sidebar"><div className="brand"><div className="brand-icon"><ChefHat size={21}/></div><div><strong>Mộc</strong><small>NHÀ HÀNG · QUẢN TRỊ</small></div></div><div className="nav-label">VẬN HÀNH NHÀ HÀNG</div><nav className="nav">{sections.map(({ id,label,icon:Icon })=><button key={id} className={active===id?"active":""} onClick={()=>{setActive(id);window.dispatchEvent(new CustomEvent("restaurant-section",{detail:id}))}}><Icon size={17}/><span>{label}</span></button>)}</nav><div className="side-bottom"><div className="avatar">AM</div><div><b>Admin Mộc</b><small>Quản lý nhà hàng</small></div></div></aside><main className="main"><header className="topbar"><span className="crumb">Nhà hàng</span><ChevronRight size={14}/><span className="crumb"><b>{sections.find(s=>s.id===active)?.label}</b></span><div className="top-right"><input className="branch" value={branch} onChange={e=>{setBranch(e.target.value);window.dispatchEvent(new CustomEvent("restaurant-branch",{detail:e.target.value}))}} aria-label="Mã chi nhánh" title="Nhập mã chi nhánh"/><Bell size={17}/><div className="avatar">AM</div></div></header>{children}<footer className="footer"><span>Mộc Nhà hàng · Quản lý sản xuất và thành phẩm</span><span className="live">● Backend kết nối qua API dùng chung</span></footer></main></div>;
}
