"use client";

import ProductionCapacity from "@/components/inventory/production-capacity";
import Pagination, { usePagination } from "@/components/shared/pagination";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownWideNarrow,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Filter,
  PackageSearch,
  RefreshCw,
  Search,
  X,
} from "lucide-react";
import { getInventoryMovements } from "@/services/inventory.service";
import type { InventoryListItem, InventoryMovement } from "@/types/inventory";

const numberFormat = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 20,
});
const PAGE_SIZE = 8;

function statusLabel(status: string) {
  if (status === "AVAILABLE") return "Đủ hàng";
  if (status === "LOW_STOCK") return "Tồn kho thấp";
  return "Không xác định";
}

export default function InventoryList({
  initialItems,
  alerts,
  branchCode,
  initialError,
}: {
  initialItems: InventoryListItem[];
  alerts: InventoryListItem[];
  branchCode: string;
  initialError?: string;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả phân loại");
  const [status, setStatus] = useState("Tất cả trạng thái");
  const [sort, setSort] = useState("name-asc");
  const [page, setPage] = useState(1);
  const [showMovements, setShowMovements] = useState(false);
  const [showCapacity, setShowCapacity] = useState(false);
  const [history, setHistory] = useState<InventoryMovement[]>([]);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [historyError, setHistoryError] = useState("");
  const [movementType, setMovementType] = useState("");
  const [movementSearch, setMovementSearch] = useState("");
  const [movementFrom, setMovementFrom] = useState("");
  const [movementTo, setMovementTo] = useState("");
  const movementLabels: Record<string, string> = { RECEIPT: "Nhập kho", ISSUE: "Xuất kho", WASTE: "Hao hụt", RETURN: "Hoàn trả" };
  const visibleMovements = history.filter(item => {
    const query = movementSearch.trim().toLocaleLowerCase("vi");
    const day = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(item.createdAt));
    return (!movementType || item.movementType === movementType)
      && (!query || [item.materialCode, item.lotCode, item.orderCode, initialItems.find(material => material.code === item.materialCode)?.name].some(value => value?.toLocaleLowerCase("vi").includes(query)))
      && (!movementFrom || day >= movementFrom) && (!movementTo || day <= movementTo);
  });
  const movementPages = usePagination(visibleMovements, [movementType, movementSearch, movementFrom, movementTo].join("|"));
  async function loadMovements() {
    setHistoryLoading(true);
    setHistoryError("");
    setHistory([]);
    try { setHistory(await getInventoryMovements(branchCode)); }
    catch (cause) { setHistoryError(cause instanceof Error ? cause.message : "Không thể tải lịch sử giao dịch."); }
    finally { setHistoryLoading(false); }
  }
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const categories = useMemo(
    () =>
      Array.from(new Set(initialItems.map((item) => item.category))).sort(
        (a, b) => a.localeCompare(b, "vi"),
      ),
    [initialItems],
  );
  const filtered = useMemo(() => {
    const query = search.trim().toLocaleLowerCase("vi");
    const matches = initialItems.filter(
      (item) =>
        (!query ||
          item.code.toLocaleLowerCase("vi").includes(query) ||
          item.name.toLocaleLowerCase("vi").includes(query)) &&
        (category === "Tất cả phân loại" || item.category === category) &&
        (status === "Tất cả trạng thái" || item.stockStatus === status),
    );
    return matches.sort((a, b) => {
      if (sort === "name-desc") return b.name.localeCompare(a.name, "vi");
      if (sort === "stock-asc") return a.totalStock - b.totalStock;
      if (sort === "stock-desc") return b.totalStock - a.totalStock;
      return a.name.localeCompare(b.name, "vi");
    });
  }, [initialItems, search, category, status, sort]);
  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const visibleRows = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function resetPage<T>(setter: (value: T) => void, value: T) {
    setter(value);
    setPage(1);
  }
  function retry() {
    startTransition(() => router.refresh());
  }

  return (
    <>
      <div className="page-heading workspace-heading">
        <div>
          <h1>Tồn kho nguyên vật liệu</h1>
        </div>
        <div className="inventory-live">
          <span className="live-dot" /> Dữ liệu Backend
        </div>
      </div>
      <div className="heading-actions" style={{ marginBottom: 12 }}>
        <button className="button button-secondary" onClick={() => setShowCapacity(true)}>Kiểm tra định mức</button>
        <button className="button button-secondary" onClick={() => { setShowMovements(true); void loadMovements(); }}>Lịch sử nhập/xuất</button>
      </div>
      {showCapacity && <ProductionCapacity initialBranchCode={branchCode} onClose={() => setShowCapacity(false)}/>}
      {showMovements && (
        <div className="modal-backdrop" onMouseDown={event => { if (event.target === event.currentTarget) setShowMovements(false); }}>
          <section className="modal-card inventory-history-modal" role="dialog" aria-modal="true" aria-label="Lịch sử nhập/xuất NVL" onKeyDown={event => { if (event.key === "Escape") setShowMovements(false); }}>
            <div className="modal-top"><h2>Lịch sử nhập/xuất NVL</h2><button autoFocus className="icon-button" aria-label="Đóng lịch sử" onClick={() => setShowMovements(false)}><X size={18}/></button></div>
            <p>Chỉ lọc trong 100 giao dịch gần nhất. API chưa cung cấp mã phiếu nhập/xuất; mã liên quan dưới đây là yêu cầu chế biến nếu có.</p>
            <div className="history-filters">
              <input aria-label="Tìm giao dịch" placeholder="Mã/tên NVL, lô, mã liên quan" value={movementSearch} onChange={event => setMovementSearch(event.target.value)}/>
              <select aria-label="Loại giao dịch" value={movementType} onChange={event => setMovementType(event.target.value)}><option value="">Tất cả giao dịch</option>{Array.from(new Set(history.map(item => item.movementType))).map(type => <option key={type} value={type}>{movementLabels[type] ?? type}</option>)}</select>
              <label>Từ ngày<input type="date" aria-label="Lịch sử từ ngày" value={movementFrom} onChange={event => setMovementFrom(event.target.value)}/></label>
              <label>Đến ngày<input type="date" aria-label="Lịch sử đến ngày" value={movementTo} onChange={event => setMovementTo(event.target.value)}/></label>
              <button className="button button-secondary" onClick={() => { setMovementSearch(""); setMovementType(""); setMovementFrom(""); setMovementTo(""); }}>Xóa lọc</button>
              <button className="button button-secondary" disabled={historyLoading} onClick={() => void loadMovements()}><RefreshCw size={14}/> Tải lại</button>
            </div>
            {historyLoading ? <div className="inventory-empty" role="status">Đang tải lịch sử…</div> : historyError ? <div className="form-error" role="alert">{historyError}</div> : visibleMovements.length === 0 ? <div className="inventory-empty">Không có giao dịch phù hợp.</div> : (
              <div className="table-wrap"><table className="data-table workspace-table"><thead><tr><th>MÃ LIÊN QUAN</th><th>NGUYÊN VẬT LIỆU</th><th>LÔ / VỊ TRÍ</th><th>LOẠI</th><th>SỐ LƯỢNG THAY ĐỔI</th><th>THỜI GIAN</th></tr></thead><tbody>
                {movementPages.items.map((item, index) => <tr key={index}><td>{item.orderCode ?? "—"}</td><td>{item.materialCode}<small>{initialItems.find(material => material.code === item.materialCode)?.name}</small></td><td>{item.lotCode}<small>{item.locationName}</small></td><td>{movementLabels[item.movementType] ?? item.movementType}</td><td>{numberFormat.format(Number(item.quantityChange))} {initialItems.find(material => material.code === item.materialCode)?.unit}</td><td>{new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(item.createdAt))}</td></tr>)}
              </tbody></table><Pagination {...movementPages.controls} limit={100}/></div>
            )}
          </section>
        </div>
      )}
      {initialError ? (
        <div className="inventory-error inline-inventory-error">
          <div className="error-mark">
            <CircleAlert size={19} />
          </div>
          <h2>Không thể tải dữ liệu tồn kho.</h2>
          <p>
            {initialError}
          </p>
          <button
            className="button button-primary"
            disabled={isPending}
            onClick={retry}
          >
            <RefreshCw size={14} className={isPending ? "spin-icon" : ""} />{" "}
            {isPending ? "Đang thử lại…" : "Thử lại"}
          </button>
        </div>
      ) : (
        <>
          <div className="inventory-stats">
            <div className="inventory-stat">
              <span>Tổng nguyên vật liệu</span>
              <strong>{initialItems.length}</strong>
            </div>
            <div className="inventory-stat">
              <span>Đủ hàng</span>
              <strong className="stock-good">
                {
                  initialItems.filter(
                    (item) => item.stockStatus === "AVAILABLE",
                  ).length
                }
              </strong>
            </div>
            <div className="inventory-stat">
              <span>Tồn kho thấp</span>
              <strong className="stock-low">{alerts.length}</strong>
            </div>
            <div className="inventory-stat">
              <span>Phân loại</span>
              <strong>{categories.length}</strong>
            </div>
          </div>
          {alerts.length > 0 && (
            <section
              className="panel"
              style={{ padding: 14, marginBottom: 12 }}
            >
              <strong className="stock-low">Cảnh báo tồn thấp</strong>
              <p style={{ margin: "6px 0 0", color: "#777", fontSize: 11 }}>
                {alerts
                  .map(
                    (item) =>
                      `${item.code} · khả dụng ${numberFormat.format(item.availableStock)} / tối thiểu ${numberFormat.format(item.minStock)} ${item.unit}`,
                  )
                  .join("; ")}
              </p>
            </section>
          )}
          <div className="panel inventory-panel fit-table-panel">
            <div className="inventory-toolbar">
              <div className="inventory-search">
                <Search size={16} />
                <input
                  value={search}
                  onChange={(event) => resetPage(setSearch, event.target.value)}
                  placeholder="Tìm theo mã hoặc tên nguyên vật liệu"
                  aria-label="Tìm nguyên vật liệu"
                />
                {search && (
                  <button
                    aria-label="Xóa tìm kiếm"
                    onClick={() => resetPage(setSearch, "")}
                  >
                    ×
                  </button>
                )}
              </div>
              <div className="inventory-filters">
                <label className="inventory-select">
                  <Filter size={14} />
                  <select
                    value={category}
                    onChange={(event) =>
                      resetPage(setCategory, event.target.value)
                    }
                  >
                    <option>Tất cả phân loại</option>
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <ChevronDown size={13} />
                </label>
                <label className="inventory-select">
                  <CircleAlert size={14} />
                  <select
                    value={status}
                    onChange={(event) =>
                      resetPage(setStatus, event.target.value)
                    }
                  >
                    <option value="Tất cả trạng thái">Tất cả trạng thái</option>
                    <option value="AVAILABLE">Đủ hàng</option>
                    <option value="LOW_STOCK">Tồn kho thấp</option>
                  </select>
                  <ChevronDown size={13} />
                </label>
                <label className="inventory-select sort-select">
                  <ArrowDownWideNarrow size={14} />
                  <select
                    value={sort}
                    onChange={(event) => resetPage(setSort, event.target.value)}
                  >
                    <option value="name-asc">Tên A–Z</option>
                    <option value="name-desc">Tên Z–A</option>
                    <option value="stock-asc">Tồn kho tăng dần</option>
                    <option value="stock-desc">Tồn kho giảm dần</option>
                  </select>
                  <ChevronDown size={13} />
                </label>
              </div>
            </div>
            {initialItems.length === 0 ? (
              <div className="inventory-empty">
                <PackageSearch size={30} />
                <strong>Chưa có dữ liệu nguyên vật liệu trong kho.</strong>
                <span>
                  Dữ liệu tồn kho sẽ xuất hiện tại đây khi có trong hệ thống.
                </span>
              </div>
            ) : filtered.length === 0 ? (
              <div className="inventory-empty">
                <Search size={25} />
                <strong>Không tìm thấy nguyên vật liệu phù hợp.</strong>
                <span>Thử từ khóa khác hoặc xóa bộ lọc hiện tại.</span>
                <button
                  onClick={() => {
                    setSearch("");
                    setCategory("Tất cả phân loại");
                    setStatus("Tất cả trạng thái");
                    setPage(1);
                  }}
                >
                  Xóa bộ lọc
                </button>
              </div>
            ) : (
              <>
                <div className="table-wrap">
                  <table className="data-table workspace-table inventory-table">
                    <thead>
                      <tr>
                        <th>MÃ NVL</th>
                        <th>TÊN NGUYÊN VẬT LIỆU</th>
                        <th>PHÂN LOẠI</th>
                        <th>ĐƠN VỊ</th>
                        <th>TỔNG TỒN</th>
                        <th>TỒN KHẢ DỤNG</th>
                        <th>TỒN TỐI THIỂU</th>
                        <th>TRẠNG THÁI</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleRows.map((item) => (
                        <tr key={item.code}>
                          <td data-label="Mã NVL"><div className="fit-cell-value">
                            <span className="inventory-code">{item.code}</span>
                          </div></td>
                          <td data-label="Tên nguyên vật liệu"><div className="fit-cell-value">
                            <strong className="inventory-name">
                              {item.name}
                            </strong>
                          </div></td>
                          <td data-label="Phân loại"><div className="fit-cell-value">{item.category}</div></td>
                          <td data-label="Đơn vị"><div className="fit-cell-value">{item.unit}</div></td>
                          <td data-label="Tổng tồn"><div className="fit-cell-value">
                            <strong className="stock-amount">
                              {numberFormat.format(item.totalStock)}{" "}
                              <small>{item.unit}</small>
                            </strong>
                          </div></td>
                          <td data-label="Tồn khả dụng"><div className="fit-cell-value">
                            <strong
                              className={
                                item.stockStatus === "LOW_STOCK"
                                  ? "stock-low"
                                  : "stock-amount"
                              }
                            >
                              {numberFormat.format(item.availableStock)}{" "}
                              <small>{item.unit}</small>
                            </strong>
                          </div></td>
                          <td data-label="Tồn tối thiểu"><div className="fit-cell-value">
                            {numberFormat.format(item.minStock)}{" "}
                            <span className="table-unit">{item.unit}</span>
                          </div></td>
                          <td data-label="Trạng thái"><div className="fit-cell-value">
                            <span
                              className={`inventory-status ${item.stockStatus === "AVAILABLE" ? "available" : item.stockStatus === "LOW_STOCK" ? "low" : "unknown"}`}
                            >
                              <i />
                              {statusLabel(item.stockStatus)}
                            </span>
                          </div></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="inventory-pagination">
                  <span>
                    Hiển thị{" "}
                    <strong>
                      {(page - 1) * PAGE_SIZE + 1}–
                      {Math.min(page * PAGE_SIZE, filtered.length)}
                    </strong>{" "}
                    trong <strong>{filtered.length}</strong> nguyên vật liệu
                  </span>
                  <div>
                    <button
                      aria-label="Trang trước"
                      disabled={page <= 1}
                      onClick={() =>
                        setPage((current) => Math.max(1, current - 1))
                      }
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span>
                      Trang {page} / {pageCount}
                    </span>
                    <button
                      aria-label="Trang sau"
                      disabled={page >= pageCount}
                      onClick={() =>
                        setPage((current) => Math.min(pageCount, current + 1))
                      }
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className="inventory-footnote">
            <span className="hint-icon">i</span>
            <span>Dữ liệu được tải trực tiếp từ hệ thống kho.</span>
            <button onClick={retry} disabled={isPending}>
              <RefreshCw size={13} className={isPending ? "spin-icon" : ""} />{" "}
              Làm mới
            </button>
          </div>
        </>
      )}
    </>
  );
}
