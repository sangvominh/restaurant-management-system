"use client";

import Link from "next/link";
import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowDownWideNarrow,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Filter,
  PackageSearch,
  RefreshCw,
  Search,
} from "lucide-react";
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
  movements,
  branchCode,
  initialError,
}: {
  initialItems: InventoryListItem[];
  alerts: InventoryListItem[];
  movements: InventoryMovement[];
  branchCode: string;
  initialError?: string;
}) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Tất cả phân loại");
  const [status, setStatus] = useState("Tất cả trạng thái");
  const [sort, setSort] = useState("name-asc");
  const [page, setPage] = useState(1);
  const [branchInput, setBranchInput] = useState(branchCode);
  const [showMovements, setShowMovements] = useState(false);
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
  function applyBranch() {
    const next = new URLSearchParams(window.location.search);
    if (branchInput.trim()) next.set("branchCode", branchInput.trim());
    else next.delete("branchCode");
    router.push(`/inventory${next.size ? `?${next.toString()}` : ""}`);
  }

  return (
    <>
      <div className="page-heading workspace-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> KHO VẬN{" "}
            <span className="crumb-slash">/</span> TỒN KHO NGUYÊN VẬT LIỆU
          </div>
          <h1>Tồn kho nguyên vật liệu</h1>
          <p>
            Theo dõi tồn tổng, tồn khả dụng, hạn lô và cảnh báo từ hệ thống kho.
          </p>
        </div>
        <div className="inventory-live">
          <span className="live-dot" /> Dữ liệu Backend
        </div>
      </div>
      <div className="inventory-toolbar panel" style={{ marginBottom: 12 }}>
        <label className="inventory-search">
          <Search size={15} />
          <input
            value={branchInput}
            onChange={(event) => setBranchInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") applyBranch();
            }}
            placeholder="Mã chi nhánh (để trống = tất cả)"
            aria-label="Lọc theo mã chi nhánh"
          />
        </label>
        <button className="button button-secondary" onClick={applyBranch}>
          Lọc chi nhánh
        </button>
        {branchCode && (
          <button
            className="button button-secondary"
            onClick={() => {
              setBranchInput("");
              router.push("/inventory");
            }}
          >
            Xóa lọc
          </button>
        )}
        <button
          className="button button-secondary"
          onClick={() => setShowMovements((value) => !value)}
        >
          {showMovements ? "Ẩn lịch sử" : "Lịch sử nhập/xuất"} (
          {movements.length})
        </button>
      </div>
      {initialError ? (
        <div className="inventory-error inline-inventory-error">
          <div className="error-mark">
            <CircleAlert size={19} />
          </div>
          <h2>Không thể tải dữ liệu tồn kho.</h2>
          <p>
            Kiểm tra Backend đang chạy tại địa chỉ đã cấu hình rồi thử tải lại.
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
          {showMovements && (
            <section
              className="panel workspace-table-panel"
              style={{ marginBottom: 12 }}
            >
              <div className="panel-header">
                <div>
                  <h2>Lịch sử nhập / xuất nguyên vật liệu</h2>
                  <p>100 giao dịch gần nhất từ Backend.</p>
                </div>
              </div>
              {movements.length === 0 ? (
                <div className="inventory-empty">Chưa có giao dịch kho.</div>
              ) : (
                <div className="table-wrap">
                  <table className="data-table workspace-table">
                    <thead>
                      <tr>
                        <th>MÃ NVL</th>
                        <th>MÃ LÔ</th>
                        <th>VỊ TRÍ</th>
                        <th>LOẠI</th>
                        <th>THAY ĐỔI</th>
                        <th>TỒN SAU</th>
                        <th>THỜI GIAN</th>
                      </tr>
                    </thead>
                    <tbody>
                      {movements.map((item, index) => (
                        <tr
                          key={`${item.materialCode}-${item.lotCode}-${item.createdAt}-${index}`}
                        >
                          <td>{item.materialCode}</td>
                          <td>{item.lotCode}</td>
                          <td>{item.locationName}</td>
                          <td>{item.movementType}</td>
                          <td>{item.quantityChange}</td>
                          <td>{item.quantityAfter}</td>
                          <td>
                            {new Intl.DateTimeFormat("vi-VN", {
                              dateStyle: "short",
                              timeStyle: "short",
                            }).format(new Date(item.createdAt))}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>
          )}
          <div className="panel inventory-panel">
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
                  <table className="data-table inventory-table">
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
                        <th>THAO TÁC</th>
                      </tr>
                    </thead>
                    <tbody>
                      {visibleRows.map((item) => (
                        <tr key={item.code}>
                          <td>
                            <span className="inventory-code">{item.code}</span>
                          </td>
                          <td>
                            <strong className="inventory-name">
                              {item.name}
                            </strong>
                          </td>
                          <td>{item.category}</td>
                          <td>{item.unit}</td>
                          <td>
                            <strong className="stock-amount">
                              {numberFormat.format(item.totalStock)}{" "}
                              <small>{item.unit}</small>
                            </strong>
                          </td>
                          <td>
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
                          </td>
                          <td>
                            {numberFormat.format(item.minStock)}{" "}
                            <span className="table-unit">{item.unit}</span>
                          </td>
                          <td>
                            <span
                              className={`inventory-status ${item.stockStatus === "AVAILABLE" ? "available" : item.stockStatus === "LOW_STOCK" ? "low" : "unknown"}`}
                            >
                              <i />
                              {statusLabel(item.stockStatus)}
                            </span>
                          </td>
                          <td>
                            <Link
                              className="inventory-detail-link"
                              href={`/inventory/${encodeURIComponent(item.code)}${branchCode ? `?branchCode=${encodeURIComponent(branchCode)}` : ""}`}
                            >
                              Xem chi tiết <ArrowRight size={13} />
                            </Link>
                          </td>
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
