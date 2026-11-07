"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { warehouseRequest } from "@/services/api";
import { warehouseService, type WarehouseBranch } from "@/services/warehouse-service";
import Pagination, { usePagination } from "@/components/shared/pagination";

interface CapacityData {
  branchCode: string; branchName: string; checkedAt: string;
  items: Array<{ productCode: string; productName: string; unit: string | null; maxQuantity: string | null;
    status: "AVAILABLE" | "SHORTAGE" | "UNAVAILABLE"; reason: string | null }>;
}
export default function ProductionCapacity({ initialBranchCode, onClose }: { initialBranchCode: string; onClose: () => void }) {
  const [branches, setBranches] = useState<WarehouseBranch[]>([]);
  const [branchCode, setBranchCode] = useState("");
  const [branchesLoading, setBranchesLoading] = useState(true);
  const [checking, setChecking] = useState(false);
  const [data, setData] = useState<CapacityData | null>(null);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [reload, setReload] = useState(0);
  useEffect(() => {
    let active = true;
    warehouseService.getBranches().then(rows => {
      if (!active) return;
      setBranches(rows);
      setBranchCode(rows.some(row => row.code === initialBranchCode) ? initialBranchCode : rows.length === 1 ? rows[0].code : "");
    }).catch(cause => { if (active) setError(cause instanceof Error ? cause.message : "Không tải được kho."); })
      .finally(() => { if (active) setBranchesLoading(false); });
    return () => { active = false; };
  }, [initialBranchCode]);
  useEffect(() => {
    setData(null); setError("");
    if (!branchCode) { setChecking(false); return; }
    let active = true;
    const controller = new AbortController();
    setChecking(true);
    warehouseRequest<CapacityData>("/production-capacity?" + new URLSearchParams({ branchCode }), { signal: controller.signal })
      .then(result => { if (active) setData(result); })
      .catch(cause => { if (active) setError(cause instanceof Error ? cause.message : "Không kiểm tra được định mức."); })
      .finally(() => { if (active) setChecking(false); });
    return () => { active = false; controller.abort(); };
  }, [branchCode, reload]);
  const query = search.trim().toLocaleLowerCase("vi");
  const items = (data?.items ?? []).filter(item => !query || [item.productCode, item.productName].some(value => value.toLocaleLowerCase("vi").includes(query)));
  const pages = usePagination(items, branchCode + "|" + query);
  return <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) onClose(); }}>
    <div className="modal-card capacity-modal" role="dialog" aria-modal="true" aria-label="Kiểm tra định mức" onKeyDown={event => { if (event.key === "Escape") onClose(); }}>
      <div className="modal-top"><h2>Kiểm tra khả năng tạo sản phẩm</h2><button autoFocus className="icon-button" aria-label="Đóng kiểm tra định mức" onClick={onClose}><X size={18}/></button></div>
      <div className="capacity-toolbar">
        {branches.length === 1 ? <strong>Kho: {branches[0].name}</strong> : <label className="form-field"><span>Kho cần kiểm tra</span><select aria-label="Kho cần kiểm tra" value={branchCode} disabled={branchesLoading} onChange={event => setBranchCode(event.target.value)}><option value="">Chọn kho</option>{branches.map(branch => <option key={branch.code} value={branch.code}>{branch.code} · {branch.name}</option>)}</select></label>}
        <input aria-label="Tìm sản phẩm có thể tạo" placeholder="Tìm mã hoặc tên sản phẩm" value={search} onChange={event => setSearch(event.target.value)}/>
        <button className="button button-secondary" disabled={!branchCode || checking || branchesLoading} onClick={() => setReload(value => value + 1)}>Kiểm tra lại</button>
      </div>
      <p className="data-limit-note">Tính theo NVL trong kho còn hạn và đủ điều kiện cấp phát. Mỗi sản phẩm được tính riêng, không cộng các dòng vì có thể dùng chung NVL. Không giữ chỗ hoặc trừ tồn.</p>
      {error && <p className="form-error" role="alert">{error}</p>}
      {data && <p className="data-limit-note">Kiểm tra lúc {new Date(data.checkedAt).toLocaleString("vi-VN", { timeZone: "Asia/Ho_Chi_Minh" })}.</p>}
      {branchesLoading || checking ? <div className="inventory-empty" role="status">Đang kiểm tra…</div> : !branchCode ? <div className="inventory-empty">{branches.length ? "Chọn kho để kiểm tra." : "Chưa có kho hoạt động."}</div> : !data ? <div className="inventory-empty">Chưa có kết quả kiểm tra.</div> : !items.length ? <div className="inventory-empty">{data.items.length ? "Không tìm thấy sản phẩm phù hợp." : "Chưa có sản phẩm có định mức đang hoạt động."}</div> :
        <div className="panel workspace-table-panel fit-table-panel report-fit-panel"><div className="table-wrap">
          <table className="data-table workspace-table"><thead><tr><th>MÃ SP</th><th>SẢN PHẨM</th><th>TỐI ĐA LÀM ĐƯỢC</th><th>KẾT QUẢ</th></tr></thead><tbody>{pages.items.map(item => <tr key={item.productCode}>
            <td data-label="Mã SP"><div className="fit-cell-value">{item.productCode}</div></td><td data-label="Sản phẩm"><div className="fit-cell-value">{item.productName}</div></td>
            <td data-label="Tối đa làm được"><div className="fit-cell-value">{item.maxQuantity === null ? "0" : new Intl.NumberFormat("vi-VN").format(BigInt(item.maxQuantity)) + " " + (item.unit ?? "")}</div></td>
            <td data-label="Kết quả"><div className="fit-cell-value">{item.status === "UNAVAILABLE" ? "Đang chờ nhập kho" : item.status === "SHORTAGE" ? (item.reason ?? "Thiếu NVL. Đang chờ nhập kho.") : "Đủ NVL theo tồn hiện tại"}</div></td>
          </tr>)}</tbody></table><Pagination {...pages.controls}/>
        </div></div>}
    </div>
  </div>;
}
