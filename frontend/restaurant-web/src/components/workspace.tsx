"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Check,
  CircleAlert,
  Eye,
  Filter,
  LoaderCircle,
  Package,
  Plus,
  RefreshCw,
  Search,
  X,
  ClipboardCheck,
  PackageCheck,
} from "lucide-react";

type Inventory = {
  productCode: string;
  productName?: string;
  locationName: string;
  quantity: string;
};
type Movement = {
  receiptCode: string;
  orderCode: string;
  productCode: string;
  productName?: string;
  branchCode: string;
  locationName: string;
  quantityBefore: string;
  quantityChange: string;
  quantityAfter: string;
  receiptStatus: string;
  inspectionNote: string | null;
  approvedAt: string | null;
  createdAt: string;
};
type Receipt = {
  receiptCode: string;
  orderCode: string;
  productCode: string;
  branchCode: string;
  plannedQuantity: string;
  reportedQuantity: string;
  acceptedQuantity: string | null;
  status: string;
  note: string | null;
  createdAt: string;
};
type Waste = {
  code: string;
  receiptCode: string;
  orderCode: string;
  productCode: string;
  productName?: string;
  branchCode: string;
  quantity: string;
  reason: string;
  status: string;
  decisionNote: string | null;
  createdAt: string;
  processedAt?: string | null;
};
type BomVersion = {
  code: string;
  version: number;
  status: string;
  createdAt: string;
};
type Bom = {
  code: string;
  productCode: string;
  productName?: string | null;
  version: number;
  outputQuantity: string;
  status: string;
  category?: string;
  description?: string | null;
  price?: string;
  createdAt?: string;
  totalMaterials: number;
  versions?: BomVersion[];
  details: {
    materialCode: string;
    materialName: string;
    unitName: string;
    quantity: string;
  }[];
};
type Material = { code: string; name: string; unitName: string };
type Unit = {
  id: string;
  name: string;
  baseUnitId: string | null;
  conversionFactor: string;
};
type Section = "products" | "exports" | "dishes" | "waste";
type Line = { materialCode: string; quantity: string; unitName: string };
type Modal =
  | { kind: "approve" | "reject"; item: Receipt | Waste }
  | { kind: "bom" }
  | { kind: "dish"; bom: Bom }
  | { kind: "deactivate"; bom: Bom };

function unitsForMaterial(
  materialCode: string,
  materials: Material[],
  units: Unit[],
) {
  const material = materials.find((item) => item.code === materialCode);
  const baseUnit = units.find((unit) => unit.name === material?.unitName);
  if (!baseUnit) return units.filter((unit) => unit.name === material?.unitName);

  return units.filter(
    (unit) => unit.id === baseUnit.id || unit.baseUnitId === baseUnit.id,
  );
}

async function api<T>(
  path: string,
  method = "GET",
  body?: unknown,
): Promise<T> {
  const r = await fetch(`/api/warehouse${path}`, {
    method,
    headers: body ? { "Content-Type": "application/json" } : {},
    body: body ? JSON.stringify(body) : undefined,
    cache: "no-store",
  });
  const j = await r
    .json()
    .catch(() => ({ message: "Phản hồi máy chủ không hợp lệ" }));
  if (!r.ok) {
    const message = Array.isArray(j.message) ? j.message.join(", ") : j.message;
    throw new Error(message ?? `HTTP ${r.status}`);
  }
  return j.data as T;
}

const num = (v: string | number) =>
  new Intl.NumberFormat("vi-VN").format(Number(v));
const money = (v: string | number) =>
  new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(
    Number(v),
  );
const date = (v: string) =>
  new Intl.DateTimeFormat("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(v));
const isReceipt = (item: Receipt | Waste): item is Receipt =>
  "reportedQuantity" in item;
const bomLabel = (status: string) =>
  status === "ACTIVE"
    ? "Đang áp dụng"
    : status === "INACTIVE"
      ? "Ngừng áp dụng"
      : status;
const heading: Record<Section, [string, string]> = {
  products: [
    "Tồn kho thành phẩm",
    "Theo dõi số lượng thành phẩm đã được nghiệm thu và nhập kho.",
  ],
  exports: [
    "Duyệt xuất thành phẩm",
    "Kiểm tra báo cáo hoàn thành ca và chốt số lượng thành phẩm đạt.",
  ],
  dishes: [
    "Quản lý món & công thức",
    "Xem chi tiết món, sửa công thức, tạo version mới hoặc ngừng áp dụng.",
  ],
  waste: [
    "Hủy thành phẩm",
    "Duyệt hoặc từ chối phiếu lỗi; theo dõi hao hụt phát sinh khi nghiệm thu.",
  ],
};

export default function AdminWorkspace() {
  const [section, setSection] = useState<Section>("products");
  const [branch, setBranch] = useState("BR001");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("PENDING");
  const [sort, setSort] = useState("name");
  const [refresh, setRefresh] = useState(0);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [inventory, setInventory] = useState<Inventory[]>([]);
  const [movements, setMovements] = useState<Movement[]>([]);
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [wastes, setWastes] = useState<Waste[]>([]);
  const [wasteHistory, setWasteHistory] = useState<Waste[]>([]);
  const [boms, setBoms] = useState<Bom[]>([]);
  const [materials, setMaterials] = useState<Material[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [modal, setModal] = useState<Modal | null>(null);
  const [form, setForm] = useState<Record<string, string>>({});
  const [lines, setLines] = useState<Line[]>([]);

  useEffect(() => {
    const a = (e: Event) => setSection((e as CustomEvent<Section>).detail);
    const b = (e: Event) => setBranch((e as CustomEvent<string>).detail);
    window.addEventListener("restaurant-section", a);
    window.addEventListener("restaurant-branch", b);
    return () => {
      window.removeEventListener("restaurant-section", a);
      window.removeEventListener("restaurant-branch", b);
    };
  }, []);

  const load = useCallback(async () => {
    setError("");
    try {
      if (section === "products") {
        const [data, history] = await Promise.all([
          api<{ items: Inventory[]; totalItems: number }>(
            `/finished-goods-inventory?branchCode=${encodeURIComponent(branch)}`,
          ),
          api<Movement[]>("/finished-goods-movements"),
        ]);
        setInventory(data.items ?? []);
        setMovements(history);
      } else if (section === "exports") {
        setReceipts(
          await api<Receipt[]>(`/finished-goods-receipts?status=${status}`),
        );
      } else if (section === "waste") {
        const [rows, history] = await Promise.all([
          api<Waste[]>(`/waste-requests?status=${status}`),
          api<Waste[]>("/waste-requests?status=ALL"),
        ]);
        setWastes(rows);
        setWasteHistory(history);
      } else {
        const [r, m, u] = await Promise.all([
          api<Bom[]>("/boms"),
          api<Material[]>("/materials"),
          api<Unit[]>("/units"),
        ]);
        setBoms(r);
        setMaterials(m);
        setUnits(u);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không thể tải dữ liệu");
    }
  }, [section, branch, status, refresh]);

  useEffect(() => {
    void load();
  }, [load]);

  const filteredInventory = useMemo(
    () =>
      inventory
        .filter((x) =>
          `${x.productCode} ${x.productName ?? ""} ${x.locationName}`
            .toLowerCase()
            .includes(query.toLowerCase()),
        )
        .sort((a, b) =>
          sort === "quantity"
            ? Number(b.quantity) - Number(a.quantity)
            : (a.productName || a.productCode).localeCompare(
                b.productName || b.productCode,
                "vi",
              ),
        ),
    [inventory, query, sort],
  );
  const filteredBoms = useMemo(
    () =>
      boms.filter((x) =>
        `${x.productCode} ${x.productName ?? ""} ${x.code}`
          .toLowerCase()
          .includes(query.toLowerCase()),
      ),
    [boms, query],
  );
  const stockHistory = useMemo(
    () =>
      movements.filter(
        (x) =>
          x.branchCode === branch &&
          `${x.productCode} ${x.productName ?? ""} ${x.receiptCode}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [movements, branch, query],
  );
  const approvalHistory = useMemo(
    () =>
      wasteHistory.filter(
        (x) =>
          x.status !== "PENDING" &&
          `${x.code} ${x.productCode} ${x.productName ?? ""} ${x.reason} ${x.decisionNote ?? ""}`
            .toLowerCase()
            .includes(query.toLowerCase()),
      ),
    [wasteHistory, query],
  );

  const close = () => {
    setModal(null);
    setError("");
  };

  const openDish = async (bom: Bom, mode: "view" | "edit" | "version") => {
    setError("");
    setBusy(true);
    try {
      const detail = await api<Bom>(`/boms/${encodeURIComponent(bom.code)}`);
      if (mode === "view") {
        setModal({ kind: "dish", bom: detail });
        return;
      }
      const next =
        Math.max(
          ...(detail.versions ?? [{ version: detail.version }]).map(
            (v) => v.version,
          ),
          detail.version,
        ) + 1;
      setForm({
        mode,
        sourceCode: detail.code,
        productName: detail.productName ?? "",
        productCode: detail.productCode,
        code:
          mode === "version"
            ? `${detail.productCode}-V${next}`.slice(0, 50)
            : detail.code,
        outputQuantity: String(detail.outputQuantity),
        description: detail.description ?? "",
        price: detail.price ?? "",
        category: detail.category ?? "Món ăn",
      });
      setLines(
        detail.details.map((d) => ({
          materialCode: d.materialCode,
          quantity: d.quantity,
          unitName: d.unitName,
        })),
      );
      setModal({ kind: "bom" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Không mở được món");
    } finally {
      setBusy(false);
    }
  };

  const openCreate = (materialCode = "") => {
    setError("");
    const material = materials.find((x) => x.code === materialCode);
    setForm({ mode: "create", outputQuantity: "1", category: "Món ăn" });
    setLines([
      { materialCode, quantity: "", unitName: material?.unitName ?? "" },
    ]);
    setModal({ kind: "bom" });
  };

  const payload = () => ({
    code: form.code?.trim(),
    productCode: form.productCode?.trim(),
    productName: form.productName?.trim(),
    category: form.category?.trim(),
    description: form.description?.trim(),
    price: form.price?.trim() || undefined,
    outputQuantity: form.outputQuantity,
    details: lines.map((l) => ({
      materialCode: l.materialCode,
      unitName: l.unitName,
      quantity: l.quantity,
    })),
  });

  const validateBom = () => {
    if (!form.productName?.trim()) return "Vui lòng nhập tên món.";
    if (
      form.mode === "create" &&
      (!form.productCode?.trim() || !form.code?.trim())
    )
      return "Vui lòng nhập mã món và mã BOM.";
    if (form.mode === "version" && !form.code?.trim())
      return "Vui lòng nhập mã BOM của version mới.";
    if (
      !Number.isFinite(Number(form.outputQuantity)) ||
      Number(form.outputQuantity) <= 0
    )
      return "Sản lượng định mức phải lớn hơn 0.";
    if (form.price && !/^\d{1,15}(\.\d{1,2})?$/.test(form.price.trim()))
      return "Giá bán không hợp lệ.";
    if (materials.length === 0)
      return "Chưa có nguyên vật liệu để lập BOM. Hãy thêm nguyên vật liệu trong hệ thống kho trước.";
    if (
      lines.length === 0 ||
      lines.some(
        (l) =>
          !materials.some((m) => m.code === l.materialCode) ||
          !Number.isFinite(Number(l.quantity)) ||
          Number(l.quantity) <= 0,
      )
    )
      return "Hãy chọn nguyên vật liệu có trong danh sách và nhập định lượng lớn hơn 0.";
    return "";
  };

  const action = async () => {
    if (!modal) return;
    if (modal.kind === "bom") {
      const message = validateBom();
      if (message) {
        setError(message);
        return;
      }
    }
    setBusy(true);
    setError("");
    try {
      if (modal.kind === "approve" && isReceipt(modal.item)) {
        const r = modal.item;
        await api(
          `/finished-goods-receipts/${encodeURIComponent(r.receiptCode)}/approve`,
          "POST",
          {
            acceptedQuantity: form.acceptedQuantity || r.reportedQuantity,
            locationName: form.locationName || "Kho thành phẩm",
            reason: form.reason || undefined,
            wasteReason: form.wasteReason || undefined,
          },
        );
        setNotice(
          `Đã duyệt ${r.receiptCode}; tồn thành phẩm được cộng theo số lượng đạt.`,
        );
      } else if (modal.kind === "reject") {
        if (isReceipt(modal.item))
          await api(
            `/finished-goods-receipts/${encodeURIComponent(modal.item.receiptCode)}/reject`,
            "POST",
            { reason: form.reason },
          );
        else
          await api(
            `/waste-requests/${encodeURIComponent(modal.item.code)}/reject`,
            "POST",
            { reason: form.reason },
          );
        setNotice("Đã từ chối phiếu và ghi nhận lý do.");
      } else if (modal.kind === "approve" && !isReceipt(modal.item)) {
        await api(
          `/waste-requests/${encodeURIComponent(modal.item.code)}/approve`,
          "POST",
        );
        setNotice(
          `Đã ghi nhận hao hụt ${num(modal.item.quantity)} thành phẩm.`,
        );
      } else if (modal.kind === "deactivate") {
        await api(
          `/boms/${encodeURIComponent(modal.bom.code)}/deactivate`,
          "POST",
        );
        setNotice(
          `Đã ngừng áp dụng ${modal.bom.productName || modal.bom.productCode}.`,
        );
      } else if (modal.kind === "bom") {
        const { code, productCode, ...recipe } = payload();
        if (form.mode === "edit")
          await api(
            `/boms/${encodeURIComponent(form.sourceCode)}/update`,
            "POST",
            recipe,
          );
        else if (form.mode === "version")
          await api(
            `/boms/${encodeURIComponent(form.sourceCode)}/new-version`,
            "POST",
            { ...recipe, code },
          );
        else await api("/boms", "POST", { ...recipe, code, productCode });
        setQuery("");
        setNotice(
          form.mode === "edit"
            ? "Đã cập nhật món và BOM."
            : form.mode === "version"
              ? "Đã tạo version mới. Version trước vẫn giữ nguyên cho đến khi ngừng áp dụng."
              : "Đã tạo món và lưu BOM trong cùng một lần.",
        );
      }
      setModal(null);
      setRefresh((x) => x + 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Thao tác thất bại");
    } finally {
      setBusy(false);
    }
  };

  const [title, subtitle] = heading[section];
  const bomTitle =
    form.mode === "edit"
      ? "Sửa món và BOM"
      : form.mode === "version"
        ? "Tạo version mới"
        : "Tạo món và định mức BOM";

  return (
    <div className="content">
      <div className="heading">
        <div>
          <div className="eyebrow">QUẢN TRỊ NHÀ HÀNG / THÀNH PHẨM</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
        </div>
        <button className="action" onClick={() => setRefresh((x) => x + 1)}>
          <RefreshCw size={14} /> Làm mới
        </button>
      </div>
      <div className="stats">
        <div className="stat">
          <div className="stat-top">
            <span>
              {section === "products"
                ? "Thành phẩm"
                : section === "dishes"
                  ? "Món / công thức"
                  : "Phiếu đang hiển thị"}
            </span>
            <i className="stat-icon">
              <Package size={15} />
            </i>
          </div>
          <strong>
            {section === "products"
              ? inventory.length
              : section === "dishes"
                ? boms.length
                : section === "exports"
                  ? receipts.length
                  : wastes.length}
          </strong>
          <small>
            {section === "products"
              ? "Mặt hàng có tồn tại chi nhánh"
              : section === "dishes"
                ? "Danh mục món và định mức BOM"
                : "Kết quả theo trạng thái đã chọn"}
          </small>
        </div>
        <div className="stat">
          <div className="stat-top">
            <span>
              {section === "products"
                ? "Tổng tồn khả dụng"
                : section === "dishes"
                  ? "Đang áp dụng"
                  : "Trạng thái"}
            </span>
            <i className="stat-icon">
              <ClipboardCheck size={15} />
            </i>
          </div>
          <strong>
            {section === "products"
              ? num(inventory.reduce((s, x) => s + Number(x.quantity), 0))
              : section === "dishes"
                ? boms.filter((x) => x.status === "ACTIVE").length
                : status === "PENDING"
                  ? "Chờ duyệt"
                  : status === "APPROVED"
                    ? "Đã duyệt"
                    : "Đã từ chối"}
          </strong>
          <small>
            {section === "products"
              ? "Đơn vị thành phẩm"
              : section === "dishes"
                ? "Công thức còn hiệu lực"
                : "Lọc danh sách bên dưới"}
          </small>
        </div>
        <div className="stat">
          <div className="stat-top">
            <span>Chi nhánh</span>
            <i className="stat-icon">
              <PackageCheck size={15} />
            </i>
          </div>
          <strong>{branch}</strong>
          <small>Dữ liệu dùng chung từ Backend</small>
        </div>
        <div className="stat">
          <div className="stat-top">
            <span>
              {section === "products" || section === "waste"
                ? "Lịch sử duyệt"
                : "Đồng bộ dữ liệu"}
            </span>
            <i className="stat-icon">
              <RefreshCw size={15} />
            </i>
          </div>
          <strong style={{ fontSize: 16 }}>
            {section === "products"
              ? stockHistory.length
              : section === "waste"
                ? approvalHistory.length
                : "Trực tiếp"}
          </strong>
          <small>
            {section === "products"
              ? "Lần nhập kho đã duyệt"
              : section === "waste"
                ? "Phiếu đã xử lý"
                : "API warehouse · không dùng dữ liệu mẫu"}
          </small>
        </div>
      </div>
      {section === "dishes" && (
        <div className="panel" style={{ marginBottom: 14 }}>
          <div className="toolbar">
            <div className="search">
              <Search size={15} />
              <input
                placeholder="Tìm tên/mã món hoặc mã BOM"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <button
              className="action primary push"
              onClick={() => openCreate()}
            >
              <Plus size={15} /> Tạo món & BOM
            </button>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>MÓN</th>
                  <th>MÃ MÓN</th>
                  <th>MÃ BOM</th>
                  <th>VERSION</th>
                  <th>SẢN LƯỢNG ĐỊNH MỨC</th>
                  <th>NGUYÊN VẬT LIỆU</th>
                  <th>TRẠNG THÁI</th>
                </tr>
              </thead>
              <tbody>
                {filteredBoms.map((x) => (
                  <tr key={x.code}>
                    <td>
                      <b>{x.productName || x.productCode}</b>
                    </td>
                    <td className="code">{x.productCode}</td>
                    <td>{x.code}</td>
                    <td>v{x.version}</td>
                    <td>{num(x.outputQuantity)} thành phẩm</td>
                    <td>
                      {x.details
                        .map(
                          (d) =>
                            `${d.materialName} · ${d.quantity} ${d.unitName}`,
                        )
                        .join(" / ")}
                    </td>
                    <td>
                      <div className="stack-actions">
                        <span
                          className={`pill ${x.status === "ACTIVE" ? "ok" : "bad"}`}
                        >
                          {bomLabel(x.status)}
                        </span>
                        <button
                          className="action mini"
                          onClick={() => void openDish(x, "view")}
                        >
                          <Eye size={13} /> Xem
                        </button>
                        {x.status === "ACTIVE" && (
                          <button
                            className="action mini"
                            onClick={() => void openDish(x, "edit")}
                          >
                            Sửa
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!filteredBoms.length && <Empty error={modal ? "" : error} />}
          </div>
        </div>
      )}
      {section === "dishes" && (
        <div className="panel">
          <div className="panel-head">
            <div>
              <h2>Nguyên vật liệu hiện có</h2>
              <p>Chọn một nguyên liệu để bắt đầu tạo món và định mức BOM.</p>
            </div>
            <span className="pill">{materials.length} nguyên liệu</span>
          </div>
          {materials.length ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>MÃ NGUYÊN LIỆU</th>
                    <th>TÊN NGUYÊN LIỆU</th>
                    <th>ĐƠN VỊ</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {materials.map((m) => (
                    <tr key={m.code}>
                      <td className="code">{m.code}</td>
                      <td>{m.name}</td>
                      <td>{m.unitName}</td>
                      <td>
                        <button
                          className="action"
                          onClick={() => openCreate(m.code)}
                        >
                          <Plus size={14} /> Dùng để tạo món & BOM
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty">
              <CircleAlert size={22} />
              <strong>Chưa có nguyên vật liệu</strong>Thêm nguyên vật liệu trong
              hệ thống kho để chọn khi lập BOM.
            </div>
          )}
        </div>
      )}
      {section === "products" && (
        <div className="panel">
          <div className="toolbar">
            <div className="search">
              <Search size={15} />
              <input
                placeholder="Tìm tên món, mã thành phẩm, vị trí kho…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="name">Sắp xếp: tên A–Z</option>
              <option value="quantity">Tồn kho: cao đến thấp</option>
            </select>
            <button
              className="action"
              onClick={() => {
                setQuery("");
                setSort("name");
              }}
            >
              <Filter size={14} /> Xóa lọc
            </button>
          </div>
          <InventoryTable rows={filteredInventory} error={error} />
        </div>
      )}
      {section === "products" && (
        <div className="panel" style={{ marginTop: 14 }}>
          <div className="panel-head">
            <div>
              <h2>Lịch sử duyệt nhập kho</h2>
              <p>
                Các lần nghiệm thu đã duyệt và cộng tồn tại chi nhánh {branch}.
              </p>
            </div>
            <span className="pill">{stockHistory.length} lần duyệt</span>
          </div>
          {stockHistory.length ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>THỜI ĐIỂM DUYỆT</th>
                    <th>TÊN THÀNH PHẨM</th>
                    <th>MÃ</th>
                    <th>PHIẾU / LỆNH</th>
                    <th>VỊ TRÍ</th>
                    <th>TRƯỚC</th>
                    <th>NHẬP</th>
                    <th>SAU</th>
                    <th>GHI CHÚ DUYỆT</th>
                  </tr>
                </thead>
                <tbody>
                  {stockHistory.map((x) => (
                    <tr key={x.receiptCode}>
                      <td>{date(x.approvedAt || x.createdAt)}</td>
                      <td>
                        <b>{x.productName || x.productCode}</b>
                      </td>
                      <td className="code">{x.productCode}</td>
                      <td>
                        <span className="code">{x.receiptCode}</span>
                        <small
                          className="muted"
                          style={{ display: "block", marginTop: 4 }}
                        >
                          {x.orderCode}
                        </small>
                      </td>
                      <td>{x.locationName}</td>
                      <td>{num(x.quantityBefore)}</td>
                      <td>
                        <b>+{num(x.quantityChange)}</b>
                      </td>
                      <td>{num(x.quantityAfter)}</td>
                      <td>{x.inspectionNote || "Đạt, không ghi chú lệch"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty">
              <CircleAlert size={22} />
              <strong>Chưa có lần duyệt nhập kho</strong>Lịch sử xuất hiện sau
              khi phiếu thành phẩm được duyệt.
            </div>
          )}
        </div>
      )}
      {(section === "exports" || section === "waste") && (
        <div className="panel">
          <div className="toolbar">
            <div className="search">
              <Search size={15} />
              <input
                placeholder="Tìm mã phiếu, tên món, lệnh sản xuất…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="PENDING">Chờ duyệt</option>
              <option value="APPROVED">Đã duyệt</option>
              <option value="REJECTED">Đã từ chối</option>
            </select>
            <span className="push muted">
              {section === "exports"
                ? "Phiếu hoàn thành ca"
                : "Phiếu báo thành phẩm lỗi"}
            </span>
          </div>
          {section === "exports" ? (
            <ReceiptTable
              rows={receipts.filter((x) =>
                `${x.receiptCode} ${x.orderCode} ${x.productCode}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )}
              error={error}
              onApprove={(x) => {
                setError("");
                setForm({
                  acceptedQuantity: x.reportedQuantity,
                  locationName: "Kho thành phẩm",
                });
                setModal({ kind: "approve", item: x });
              }}
              onReject={(x) => {
                setError("");
                setForm({});
                setModal({ kind: "reject", item: x });
              }}
            />
          ) : (
            <WasteTable
              rows={wastes.filter((x) =>
                `${x.code} ${x.productCode} ${x.productName ?? ""} ${x.reason}`
                  .toLowerCase()
                  .includes(query.toLowerCase()),
              )}
              error={error}
              onApprove={(x) => {
                setError("");
                setForm({});
                setModal({ kind: "approve", item: x });
              }}
              onReject={(x) => {
                setError("");
                setForm({});
                setModal({ kind: "reject", item: x });
              }}
            />
          )}
        </div>
      )}
      {section === "waste" && (
        <div className="panel" style={{ marginTop: 14 }}>
          <div className="panel-head">
            <div>
              <h2>Lịch sử duyệt hủy thành phẩm</h2>
              <p>Phiếu đã ghi nhận hoặc đã từ chối, kèm lý do xử lý.</p>
            </div>
            <span className="pill">
              {approvalHistory.length} phiếu đã xử lý
            </span>
          </div>
          {approvalHistory.length ? (
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th>THỜI ĐIỂM</th>
                    <th>PHIẾU</th>
                    <th>TÊN THÀNH PHẨM</th>
                    <th>MÃ</th>
                    <th>SỐ LƯỢNG</th>
                    <th>KẾT QUẢ</th>
                    <th>LÝ DO BÁO LỖI</th>
                    <th>QUYẾT ĐỊNH DUYỆT</th>
                  </tr>
                </thead>
                <tbody>
                  {approvalHistory.map((x) => (
                    <tr key={x.code}>
                      <td>
                        {x.processedAt
                          ? date(x.processedAt)
                          : date(x.createdAt)}
                      </td>
                      <td className="code">{x.code}</td>
                      <td>
                        <b>{x.productName || x.productCode}</b>
                      </td>
                      <td className="code">{x.productCode}</td>
                      <td>{num(x.quantity)}</td>
                      <td>
                        <span
                          className={`pill ${x.status === "APPROVED" ? "ok" : "bad"}`}
                        >
                          {x.status === "APPROVED" ? "Đã ghi nhận" : "Từ chối"}
                        </span>
                      </td>
                      <td>{x.reason}</td>
                      <td>
                        {x.decisionNote ||
                          (x.status === "APPROVED"
                            ? "Chấp thuận ghi nhận hao hụt"
                            : "Không có ghi chú")}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="empty">
              <CircleAlert size={22} />
              <strong>Chưa có lịch sử duyệt</strong>Sau khi duyệt hoặc từ chối
              phiếu hủy, quyết định sẽ hiện ở đây.
            </div>
          )}
        </div>
      )}
      {notice && (
        <div className="notice" style={{ marginTop: 14 }}>
          {notice}
          <button
            className="push"
            onClick={() => setNotice("")}
            style={{ float: "right", border: 0, background: "transparent" }}
          >
            ×
          </button>
        </div>
      )}
      {error && !modal && (
        <div className="error" style={{ margin: 14 }}>
          {error}
        </div>
      )}
      {modal && (
        <div
          className="modal-backdrop"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          <div
            className={`modal ${modal.kind === "dish" || modal.kind === "bom" ? "wide" : ""}`}
          >
            <div className="modal-head">
              <h2>
                {modal.kind === "bom"
                  ? bomTitle
                  : modal.kind === "dish"
                    ? "Chi tiết món"
                    : modal.kind === "deactivate"
                      ? "Ngừng áp dụng công thức"
                      : modal.kind === "reject"
                        ? "Từ chối phiếu"
                        : "Xác nhận duyệt phiếu"}
              </h2>
              <button onClick={close}>
                <X size={18} />
              </button>
            </div>
            {error && <div className="error">{error}</div>}
            {modal.kind === "dish" && (
              <DishDetail
                bom={modal.bom}
                onEdit={() => void openDish(modal.bom, "edit")}
                onVersion={() => void openDish(modal.bom, "version")}
                onStop={() => setModal({ kind: "deactivate", bom: modal.bom })}
                onOpenVersion={(code) =>
                  void openDish({ ...modal.bom, code }, "view")
                }
              />
            )}
            {modal.kind === "deactivate" && (
              <>
                <div className="form-grid">
                  <div className="span-2 notice">
                    Ngừng áp dụng{" "}
                    <b>{modal.bom.productName || modal.bom.productCode}</b> ·{" "}
                    {modal.bom.code} · version {modal.bom.version}. Các lệnh đã
                    hoàn thành vẫn giữ nguyên. Không ngừng được nếu còn lệnh
                    đang chạy.
                  </div>
                </div>
                <div className="form-footer">
                  <button className="action" onClick={close}>
                    Hủy
                  </button>
                  <button className="action" onClick={action} disabled={busy}>
                    {busy ? (
                      <LoaderCircle className="spin" size={14} />
                    ) : (
                      <Check size={14} />
                    )}{" "}
                    Ngừng áp dụng
                  </button>
                </div>
              </>
            )}
            {modal.kind === "bom" && (
              <>
                <div className="form-grid">
                  <Field label="Tên món">
                    <input
                      value={form.productName ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, productName: e.target.value })
                      }
                      placeholder="Ví dụ: Bánh mì đặc biệt"
                    />
                  </Field>
                  <Field label="Nhóm món">
                    <input
                      value={form.category ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, category: e.target.value })
                      }
                      placeholder="Món chính"
                    />
                  </Field>
                  <Field label="Mã món / thành phẩm">
                    <input
                      value={form.productCode ?? ""}
                      disabled={form.mode !== "create"}
                      onChange={(e) =>
                        setForm({ ...form, productCode: e.target.value })
                      }
                      placeholder="TP-BANHMI"
                    />
                  </Field>
                  <Field label="Mã công thức BOM">
                    <input
                      value={form.code ?? ""}
                      disabled={form.mode === "edit"}
                      onChange={(e) =>
                        setForm({ ...form, code: e.target.value })
                      }
                      placeholder="BOM-BANHMI-01"
                    />
                  </Field>
                  <Field label="Giá bán">
                    <input
                      value={form.price ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, price: e.target.value })
                      }
                      placeholder="89000"
                    />
                  </Field>
                  <Field label="Sản lượng định mức">
                    <input
                      type="number"
                      min="0.001"
                      step="0.001"
                      value={form.outputQuantity ?? "1"}
                      onChange={(e) =>
                        setForm({ ...form, outputQuantity: e.target.value })
                      }
                    />
                  </Field>
                  <Field label="Mô tả" span>
                    <textarea
                      value={form.description ?? ""}
                      onChange={(e) =>
                        setForm({ ...form, description: e.target.value })
                      }
                      placeholder="Mô tả ngắn cho món"
                    />
                  </Field>
                </div>
                <div className="recipe-lines">
                  {materials.length === 0 && (
                    <div className="notice">
                      Cần có ít nhất một nguyên vật liệu đang hoạt động trong
                      kho trước khi tạo BOM.
                    </div>
                  )}
                  {form.mode === "version" && (
                    <p className="muted">
                      Version mới dùng cùng mã món. Version đang áp dụng không
                      bị tắt cho đến khi bấm Ngừng áp dụng.
                    </p>
                  )}
                  <p className="muted">
                    Định lượng nguyên vật liệu cần cho sản lượng trên.
                  </p>
                  {lines.map((l, i) => (
                    <div className="recipe-line" key={i}>
                      <input
                        list="materials"
                        placeholder="Mã nguyên vật liệu"
                        value={l.materialCode}
                        onChange={(e) => {
                          const next = [...lines];
                          next[i] = {
                            ...next[i],
                            materialCode: e.target.value,
                          };
                          const m = materials.find(
                            (x) => x.code === e.target.value,
                          );
                          next[i].unitName = m?.unitName ?? "";
                          setLines(next);
                        }}
                      />
                      <input
                        type="number"
                        min="0.001"
                        step="0.001"
                        placeholder="SL"
                        value={l.quantity}
                        onChange={(e) => {
                          const next = [...lines];
                          next[i] = { ...next[i], quantity: e.target.value };
                          setLines(next);
                        }}
                      />
                      <select
                        value={l.unitName}
                        onChange={(e) => {
                          const next = [...lines];
                          next[i] = { ...next[i], unitName: e.target.value };
                          setLines(next);
                        }}
                      >
                        <option value="" disabled>
                          Chọn đơn vị
                        </option>
                        {unitsForMaterial(
                          l.materialCode,
                          materials,
                          units,
                        ).map((unit) => (
                          <option key={unit.id} value={unit.name}>
                            {unit.name === "g" ? "g (gram)" : unit.name}
                          </option>
                        ))}
                      </select>
                      <button
                        className="icon-action"
                        onClick={() =>
                          setLines(lines.filter((_, n) => n !== i))
                        }
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ))}
                  <datalist id="materials">
                    {materials.map((m) => (
                      <option key={m.code} value={m.code}>
                        {m.name} · {m.unitName}
                      </option>
                    ))}
                  </datalist>
                  <button
                    className="action"
                    onClick={() =>
                      setLines([
                        ...lines,
                        { materialCode: "", quantity: "", unitName: "" },
                      ])
                    }
                  >
                    <Plus size={14} /> Thêm nguyên vật liệu
                  </button>
                </div>
                <div className="form-footer">
                  <button className="action" onClick={close}>
                    Hủy
                  </button>
                  <button
                    className="action primary"
                    onClick={action}
                    disabled={busy || materials.length === 0}
                  >
                    <Check size={14} />{" "}
                    {form.mode === "edit"
                      ? "Lưu sửa món"
                      : form.mode === "version"
                        ? "Lưu version mới"
                        : "Tạo món & lưu BOM"}
                  </button>
                </div>
              </>
            )}
            {(modal.kind === "approve" || modal.kind === "reject") && (
              <>
                <div className="form-grid">
                  {modal.kind === "approve" && isReceipt(modal.item) && (
                    <>
                      <Field label="Số lượng báo hoàn thành">
                        <input value={modal.item.reportedQuantity} disabled />
                      </Field>
                      <Field label="Số lượng đạt nhập kho">
                        <input
                          type="number"
                          min="0.001"
                          step="0.001"
                          value={form.acceptedQuantity ?? ""}
                          onChange={(e) =>
                            setForm({
                              ...form,
                              acceptedQuantity: e.target.value,
                            })
                          }
                        />
                      </Field>
                      <Field label="Vị trí kho nhận">
                        <input
                          value={form.locationName ?? "Kho thành phẩm"}
                          onChange={(e) =>
                            setForm({ ...form, locationName: e.target.value })
                          }
                        />
                      </Field>
                      <Field label="Ghi chú chênh lệch">
                        <input
                          value={form.reason ?? ""}
                          onChange={(e) =>
                            setForm({ ...form, reason: e.target.value })
                          }
                          placeholder="Bắt buộc nếu số lượng lệch"
                        />
                      </Field>
                      <Field label="Lý do hàng lỗi (nếu có)" span>
                        <input
                          value={form.wasteReason ?? ""}
                          onChange={(e) =>
                            setForm({ ...form, wasteReason: e.target.value })
                          }
                          placeholder="Bắt buộc khi có thành phẩm không đạt"
                        />
                      </Field>
                    </>
                  )}
                  {(modal.kind === "reject" || isReceipt(modal.item)) && (
                    <Field label="Lý do" span>
                      <textarea
                        value={form.reason ?? ""}
                        onChange={(e) =>
                          setForm({ ...form, reason: e.target.value })
                        }
                        placeholder="Nhập lý do xử lý phiếu"
                      />
                    </Field>
                  )}
                  {modal.kind === "approve" && !isReceipt(modal.item) && (
                    <div className="span-2 notice">
                      Chấp thuận sẽ xác nhận hao hụt {num(modal.item.quantity)}{" "}
                      thành phẩm{" "}
                      {modal.item.productName || modal.item.productCode}. Tồn
                      kho đã được ghi giảm tại bước duyệt phiếu thành phẩm đạt.
                    </div>
                  )}
                </div>
                <div className="form-footer">
                  <button className="action" onClick={close}>
                    Hủy
                  </button>
                  <button
                    className={`action ${modal.kind === "reject" ? "" : "primary"}`}
                    onClick={action}
                    disabled={busy}
                  >
                    {busy ? (
                      <LoaderCircle className="spin" size={14} />
                    ) : (
                      <Check size={14} />
                    )}{" "}
                    {modal.kind === "reject"
                      ? "Từ chối phiếu"
                      : "Xác nhận duyệt"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function DishDetail({
  bom,
  onEdit,
  onVersion,
  onStop,
  onOpenVersion,
}: {
  bom: Bom;
  onEdit: () => void;
  onVersion: () => void;
  onStop: () => void;
  onOpenVersion: (code: string) => void;
}) {
  return (
    <div className="dish-detail">
      <div className="detail-grid">
        <div>
          <small>TÊN MÓN</small>
          <b>{bom.productName || bom.productCode}</b>
        </div>
        <div>
          <small>TRẠNG THÁI</small>
          <span className={`pill ${bom.status === "ACTIVE" ? "ok" : "bad"}`}>
            {bomLabel(bom.status)}
          </span>
        </div>
        <div>
          <small>MÃ MÓN</small>
          <b className="code">{bom.productCode}</b>
        </div>
        <div>
          <small>MÃ BOM / VERSION</small>
          <b>
            {bom.code} · v{bom.version}
          </b>
        </div>
        <div>
          <small>NHÓM</small>
          <b>{bom.category || "Món ăn"}</b>
        </div>
        <div>
          <small>GIÁ BÁN</small>
          <b>{bom.price ? money(bom.price) : "Chưa nhập"}</b>
        </div>
        <div>
          <small>SẢN LƯỢNG ĐỊNH MỨC</small>
          <b>{num(bom.outputQuantity)} thành phẩm</b>
        </div>
        <div>
          <small>MÔ TẢ</small>
          <b>{bom.description || "Chưa có mô tả"}</b>
        </div>
      </div>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>NGUYÊN VẬT LIỆU</th>
              <th>MÃ</th>
              <th>ĐỊNH LƯỢNG</th>
              <th>ĐƠN VỊ</th>
            </tr>
          </thead>
          <tbody>
            {bom.details.map((d) => (
              <tr key={d.materialCode}>
                <td>{d.materialName}</td>
                <td className="code">{d.materialCode}</td>
                <td>
                  <b>{d.quantity}</b>
                </td>
                <td>{d.unitName}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!!bom.versions?.length && (
        <div className="version-list">
          <p className="muted">Các version của món</p>
          <div className="stack-actions">
            {bom.versions.map((v) => (
              <button
                key={v.code}
                className="action mini"
                disabled={v.code === bom.code}
                onClick={() => onOpenVersion(v.code)}
              >
                {v.code} · v{v.version} · {bomLabel(v.status)}
              </button>
            ))}
          </div>
        </div>
      )}
      <div className="form-footer">
        {bom.status === "ACTIVE" && (
          <button className="action" onClick={onEdit}>
            Sửa
          </button>
        )}
        <button className="action primary" onClick={onVersion}>
          Version mới
        </button>
        {bom.status === "ACTIVE" && (
          <button className="action" onClick={onStop}>
            Ngừng áp dụng
          </button>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  children,
  span = false,
}: {
  label: string;
  children: React.ReactNode;
  span?: boolean;
}) {
  return (
    <div className={`field ${span ? "span-2" : ""}`}>
      <label>{label}</label>
      {children}
    </div>
  );
}
function Empty({ error }: { error: string }) {
  return (
    <div className="empty">
      <CircleAlert size={22} />
      <strong>
        {error ? "Không tải được dữ liệu" : "Chưa có dữ liệu phù hợp"}
      </strong>
      {error || "Thử đổi bộ lọc hoặc tải lại danh sách."}
    </div>
  );
}
function InventoryTable({ rows, error }: { rows: Inventory[]; error: string }) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>TÊN THÀNH PHẨM</th>
            <th>MÃ THÀNH PHẨM</th>
            <th>VỊ TRÍ KHO</th>
            <th>SỐ LƯỢNG TỒN</th>
            <th>TÌNH TRẠNG</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((x, i) => (
            <tr key={`${x.productCode}-${x.locationName}-${i}`}>
              <td>
                <b>{x.productName || x.productCode}</b>
              </td>
              <td className="code">{x.productCode}</td>
              <td>{x.locationName}</td>
              <td>
                <b>{num(x.quantity)}</b> <span className="muted">đv</span>
              </td>
              <td>
                <span className="pill ok">Đang có hàng</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <Empty error={error} />}
    </div>
  );
}
function ReceiptTable({
  rows,
  error,
  onApprove,
  onReject,
}: {
  rows: Receipt[];
  error: string;
  onApprove: (x: Receipt) => void;
  onReject: (x: Receipt) => void;
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>PHIẾU / LỆNH</th>
            <th>THÀNH PHẨM</th>
            <th>CHI NHÁNH</th>
            <th>KẾ HOẠCH</th>
            <th>BÁO HOÀN THÀNH</th>
            <th>NGÀY GỬI</th>
            <th>TRẠNG THÁI</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((x) => (
            <tr key={x.receiptCode}>
              <td>
                <span className="code">{x.receiptCode}</span>
                <small
                  style={{ display: "block", marginTop: 4 }}
                  className="muted"
                >
                  {x.orderCode}
                </small>
              </td>
              <td>{x.productCode}</td>
              <td>{x.branchCode}</td>
              <td>{num(x.plannedQuantity)}</td>
              <td>
                <b>{num(x.reportedQuantity)}</b>
              </td>
              <td>{date(x.createdAt)}</td>
              <td>
                <span
                  className={`pill ${x.status === "PENDING" ? "wait" : x.status === "APPROVED" ? "ok" : "bad"}`}
                >
                  {x.status === "PENDING"
                    ? "Chờ duyệt"
                    : x.status === "APPROVED"
                      ? "Đã duyệt"
                      : "Từ chối"}
                </span>
              </td>
              <td>
                {x.status === "PENDING" && (
                  <div className="row-actions">
                    <button
                      title="Duyệt phiếu"
                      className="icon-action"
                      onClick={() => onApprove(x)}
                    >
                      <Check size={15} />
                    </button>
                    <button
                      title="Từ chối"
                      className="icon-action"
                      onClick={() => onReject(x)}
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <Empty error={error} />}
    </div>
  );
}
function WasteTable({
  rows,
  error,
  onApprove,
  onReject,
}: {
  rows: Waste[];
  error: string;
  onApprove: (x: Waste) => void;
  onReject: (x: Waste) => void;
}) {
  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>MÃ PHIẾU</th>
            <th>TÊN THÀNH PHẨM</th>
            <th>MÃ</th>
            <th>CHI NHÁNH</th>
            <th>SỐ LƯỢNG LỖI</th>
            <th>LÝ DO</th>
            <th>PHIẾU NGHIỆM THU</th>
            <th>NGÀY GỬI</th>
            <th>TRẠNG THÁI</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {rows.map((x) => (
            <tr key={x.code}>
              <td className="code">{x.code}</td>
              <td>
                <b>{x.productName || x.productCode}</b>
              </td>
              <td className="code">{x.productCode}</td>
              <td>{x.branchCode}</td>
              <td>
                <b>{num(x.quantity)}</b>
              </td>
              <td>{x.reason}</td>
              <td>{x.receiptCode}</td>
              <td>{date(x.createdAt)}</td>
              <td>
                <span
                  className={`pill ${x.status === "PENDING" ? "wait" : x.status === "APPROVED" ? "ok" : "bad"}`}
                >
                  {x.status === "PENDING"
                    ? "Chờ duyệt"
                    : x.status === "APPROVED"
                      ? "Đã ghi nhận"
                      : "Từ chối"}
                </span>
              </td>
              <td>
                {x.status === "PENDING" && (
                  <div className="row-actions">
                    <button
                      title="Ghi nhận hao hụt"
                      className="icon-action"
                      onClick={() => onApprove(x)}
                    >
                      <Check size={15} />
                    </button>
                    <button
                      title="Từ chối"
                      className="icon-action"
                      onClick={() => onReject(x)}
                    >
                      <X size={15} />
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {!rows.length && <Empty error={error} />}
    </div>
  );
}
