"use client";

import { useEffect, useState, useMemo } from "react";
import {
  AlertTriangle,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Clock,
  Copy,
  Eye,
  Filter,
  Layers,
  Pencil,
  Plus,
  Power,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Soup,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  fetchBoms,
  fetchBomsByProduct,
  fetchBomDetail,
  createBom,
  updateBom,
  createBomNextVersion,
  updateBomStatus,
  type BomItem,
  type BomMaterialDetail,
} from "@/services/bom.service";
import { fetchProducts, type ProductItem } from "@/services/product.service";
import { materials } from "@/mock/data";

// Fallback data khi chưa kết nối backend
const fallbackBoms: BomItem[] = [
  {
    code: "BOM-001",
    productCode: "TP001",
    productName: "Pizza Margherita",
    productCategory: "Pizza",
    productPrice: 185000,
    productImage: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop",
    productUnit: "phần",
    version: 1,
    outputQuantity: "1",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    totalMaterials: 3,
    details: [
      { materialCode: "TEST-NVL001", materialName: "Thịt bò Mỹ", unitName: "kg", quantity: "0.15" },
      { materialCode: "NVL002", materialName: "Phô mai Mozzarella", unitName: "kg", quantity: "0.1" },
      { materialCode: "NVL003", materialName: "Sốt cà chua", unitName: "kg", quantity: "0.08" },
    ],
  },
  {
    code: "BOM-002",
    productCode: "TP002",
    productName: "Sốt bò bằm",
    productCategory: "Sốt & nước dùng",
    productPrice: 120000,
    productImage: "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=500&auto=format&fit=crop",
    productUnit: "kg",
    version: 1,
    outputQuantity: "5",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    totalMaterials: 2,
    details: [
      { materialCode: "TEST-NVL001", materialName: "Thịt bò Mỹ", unitName: "kg", quantity: "3.5" },
      { materialCode: "NVL003", materialName: "Sốt cà chua", unitName: "kg", quantity: "1.2" },
    ],
  },
  {
    code: "BOM-004",
    productCode: "TP004",
    productName: "Tiramisu",
    productCategory: "Tráng miệng",
    productPrice: 65000,
    productImage: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop",
    productUnit: "phần",
    version: 1,
    outputQuantity: "1",
    status: "ACTIVE",
    createdAt: new Date().toISOString(),
    totalMaterials: 2,
    details: [
      { materialCode: "NVL002", materialName: "Phô mai Mozzarella", unitName: "kg", quantity: "0.05" },
      { materialCode: "NVL004", materialName: "Bột cacao", unitName: "kg", quantity: "0.02" },
    ],
  },
];

export default function BomManagementPage() {
  const [boms, setBoms] = useState<BomItem[]>(fallbackBoms);
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [loading, setLoading] = useState(false);

  // Bộ lọc & Tìm kiếm
  const [search, setSearch] = useState("");
  const [filterProductCode, setFilterProductCode] = useState("Tất cả");
  const [filterStatus, setFilterStatus] = useState("Tất cả");
  const [page, setPage] = useState(1);
  const pageSize = 6;

  // Thông báo
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Modals
  const [createModal, setCreateModal] = useState(false);
  const [editModal, setEditModal] = useState<BomItem | null>(null);
  const [versionModal, setVersionModal] = useState<BomItem | null>(null);
  const [detailModal, setDetailModal] = useState<BomItem | null>(null);
  const [productLookupModal, setProductLookupModal] = useState<string | null>(null);
  const [productVersionsData, setProductVersionsData] = useState<any | null>(null);

  // Form State cho Tạo mới BOM
  const [newBomForm, setNewBomForm] = useState({
    code: "",
    productCode: "TP001",
    outputQuantity: "1",
    details: [{ materialCode: "TEST-NVL001", unitName: "kg", quantity: "0.5" }],
  });

  // Form State cho Sửa BOM
  const [editForm, setEditForm] = useState<{
    outputQuantity: string;
    status: string;
    details: { materialCode: string; unitName: string; quantity: string }[];
  }>({ outputQuantity: "1", status: "ACTIVE", details: [] });

  // Form State cho Tạo Version mới
  const [versionForm, setVersionForm] = useState<{
    newCode: string;
    outputQuantity: string;
    deactivateOldVersion: boolean;
    details: { materialCode: string; unitName: string; quantity: string }[];
  }>({ newCode: "", outputQuantity: "1", deactivateOldVersion: true, details: [] });

  // Tải dữ liệu từ API
  async function loadData() {
    try {
      setLoading(true);
      const [bomData, productRes] = await Promise.allSettled([
        fetchBoms(
          filterProductCode !== "Tất cả" ? filterProductCode : undefined,
          filterStatus !== "Tất cả" ? filterStatus : undefined,
        ),
        fetchProducts({ limit: 100 }),
      ]);

      if (bomData.status === "fulfilled" && bomData.value?.length) {
        setBoms(bomData.value);
      }
      if (productRes.status === "fulfilled" && productRes.value?.data?.length) {
        setProducts(productRes.value.data);
      }
    } catch {
      // Giữ fallback
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [filterProductCode, filterStatus]);

  // Lọc và tìm kiếm
  const filteredBoms = useMemo(() => {
    return boms.filter((b) => {
      const matchSearch =
        !search.trim() ||
        b.code.toLowerCase().includes(search.toLowerCase()) ||
        b.productCode.toLowerCase().includes(search.toLowerCase()) ||
        (b.productName && b.productName.toLowerCase().includes(search.toLowerCase()));

      const matchProduct = filterProductCode === "Tất cả" || b.productCode === filterProductCode;
      const matchStatus = filterStatus === "Tất cả" || b.status === filterStatus;

      return matchSearch && matchProduct && matchStatus;
    });
  }, [boms, search, filterProductCode, filterStatus]);

  // Phân trang
  const totalPages = Math.ceil(filteredBoms.length / pageSize) || 1;
  const paginatedBoms = filteredBoms.slice((page - 1) * pageSize, page * pageSize);

  // Thống kê nhanh
  const stats = useMemo(() => {
    const active = boms.filter((b) => b.status === "ACTIVE").length;
    const distinctProducts = new Set(boms.map((b) => b.productCode)).size;
    return {
      total: boms.length,
      active,
      inactive: boms.length - active,
      distinctProducts,
    };
  }, [boms]);

  // 1. Mở modal Tạo mới
  function handleOpenCreate() {
    const defaultProduct = products[0]?.code || "TP001";
    setNewBomForm({
      code: `BOM-00${boms.length + 1}`,
      productCode: defaultProduct,
      outputQuantity: "1",
      details: [{ materialCode: "TEST-NVL001", unitName: "kg", quantity: "0.2" }],
    });
    setErrorMessage("");
    setCreateModal(true);
  }

  // 2. Mở modal Chỉnh sửa
  function handleOpenEdit(bom: BomItem) {
    setEditModal(bom);
    setEditForm({
      outputQuantity: bom.outputQuantity,
      status: bom.status,
      details: bom.details.map((d) => ({
        materialCode: d.materialCode,
        unitName: d.unitName,
        quantity: d.quantity,
      })),
    });
    setErrorMessage("");
  }

  // 3. Mở modal Tạo Version mới
  function handleOpenNewVersion(bom: BomItem) {
    const nextVer = bom.version + 1;
    const cleanPrefix = bom.code.replace(/-v\d+$/i, "");
    setVersionModal(bom);
    setVersionForm({
      newCode: `${cleanPrefix}-v${nextVer}`,
      outputQuantity: bom.outputQuantity,
      deactivateOldVersion: true,
      details: bom.details.map((d) => ({
        materialCode: d.materialCode,
        unitName: d.unitName,
        quantity: d.quantity,
      })),
    });
    setErrorMessage("");
  }

  // 4. Mở modal Tra cứu theo ProductCode
  async function handleLookupByProduct(productCode: string) {
    setProductLookupModal(productCode);
    setProductVersionsData(null);
    try {
      const data = await fetchBomsByProduct(productCode);
      setProductVersionsData(data);
    } catch {
      // Fallback
      const related = boms.filter((b) => b.productCode === productCode);
      const prod = products.find((p) => p.code === productCode);
      setProductVersionsData({
        product: prod,
        totalVersions: related.length,
        activeVersion: related.find((b) => b.status === "ACTIVE")?.version || 1,
        data: related,
      });
    }
  }

  // Xử lý Lưu Tạo mới BOM
  async function handleSaveCreate() {
    if (!newBomForm.code.trim()) {
      setErrorMessage("Vui lòng nhập mã công thức BOM.");
      return;
    }
    if (newBomForm.details.length === 0) {
      setErrorMessage("Vui lòng thêm ít nhất 1 loại nguyên vật liệu.");
      return;
    }

    try {
      await createBom(newBomForm);
      setNotice(`Đã tạo công thức '${newBomForm.code}' cho món '${newBomForm.productCode}' thành công!`);
      setCreateModal(false);
      loadData();
    } catch (err: any) {
      // Fallback local
      const prod = products.find((p) => p.code === newBomForm.productCode);
      const item: BomItem = {
        code: newBomForm.code.trim().toUpperCase(),
        productCode: newBomForm.productCode,
        productName: prod?.name || newBomForm.productCode,
        productCategory: prod?.category || "Khác",
        productPrice: prod?.price || 0,
        productImage: prod?.imageUrl || null,
        productUnit: prod?.unit || "phần",
        version: 1,
        outputQuantity: newBomForm.outputQuantity,
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        totalMaterials: newBomForm.details.length,
        details: newBomForm.details.map((d) => ({
          materialCode: d.materialCode,
          materialName: materials.find((m) => m.code === d.materialCode)?.name || d.materialCode,
          unitName: d.unitName,
          quantity: d.quantity,
        })),
      };
      setBoms((prev) => [item, ...prev]);
      setNotice(`Đã tạo công thức '${newBomForm.code}' (Dữ liệu cục bộ).`);
      setCreateModal(false);
    }
  }

  // Xử lý Lưu Chỉnh sửa BOM
  async function handleSaveEdit() {
    if (!editModal) return;
    if (Number(editForm.outputQuantity) <= 0) {
      setErrorMessage("Sản lượng đầu ra phải lớn hơn 0.");
      return;
    }

    try {
      await updateBom(editModal.code, editForm);
      setNotice(`Đã cập nhật công thức '${editModal.code}' thành công!`);
      setEditModal(null);
      loadData();
    } catch (err: any) {
      // Fallback local
      setBoms((prev) =>
        prev.map((b) =>
          b.code === editModal.code
            ? {
                ...b,
                outputQuantity: editForm.outputQuantity,
                status: editForm.status,
                totalMaterials: editForm.details.length,
                details: editForm.details.map((d) => ({
                  materialCode: d.materialCode,
                  materialName: materials.find((m) => m.code === d.materialCode)?.name || d.materialCode,
                  unitName: d.unitName,
                  quantity: d.quantity,
                })),
              }
            : b
        )
      );
      setNotice(`Đã cập nhật công thức '${editModal.code}' (Dữ liệu cục bộ).`);
      setEditModal(null);
    }
  }

  // Xử lý Lưu Tạo Version mới
  async function handleSaveNewVersion() {
    if (!versionModal) return;

    try {
      await createBomNextVersion(versionModal.code, versionForm);
      setNotice(`Đã tạo phiên bản mới v${versionModal.version + 1} cho món '${versionModal.productCode}' thành công!`);
      setVersionModal(null);
      loadData();
    } catch (err: any) {
      // Fallback local
      const nextVer = versionModal.version + 1;
      const newCode = versionForm.newCode || `${versionModal.code}-v${nextVer}`;
      const newBom: BomItem = {
        ...versionModal,
        code: newCode,
        version: nextVer,
        outputQuantity: versionForm.outputQuantity,
        status: "ACTIVE",
        createdAt: new Date().toISOString(),
        totalMaterials: versionForm.details.length,
        details: versionForm.details.map((d) => ({
          materialCode: d.materialCode,
          materialName: materials.find((m) => m.code === d.materialCode)?.name || d.materialCode,
          unitName: d.unitName,
          quantity: d.quantity,
        })),
      };

      setBoms((prev) => [
        newBom,
        ...prev.map((b) =>
          versionForm.deactivateOldVersion && b.productCode === versionModal.productCode && b.code !== newCode
            ? { ...b, status: "ARCHIVED" }
            : b
        ),
      ]);
      setNotice(`Đã tạo phiên bản v${nextVer} (Mã: ${newCode}) thành công!`);
      setVersionModal(null);
    }
  }

  // Xử lý Ngừng áp dụng / Kích hoạt lại
  async function handleToggleStatus(bom: BomItem) {
    const nextStatus = bom.status === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    const actionText = nextStatus === "INACTIVE" ? "ngừng áp dụng" : "kích hoạt áp dụng";

    if (!confirm(`Bạn có chắc chắn muốn ${actionText} công thức '${bom.code}' (v${bom.version})?`)) return;

    try {
      await updateBomStatus(bom.code, nextStatus);
      setNotice(`Đã ${actionText} công thức '${bom.code}' thành công.`);
      loadData();
    } catch (err: any) {
      // Fallback local
      setBoms((prev) =>
        prev.map((b) => {
          if (b.code === bom.code) return { ...b, status: nextStatus };
          // Nếu kích hoạt 1 version, ngừng các version khác của cùng món
          if (nextStatus === "ACTIVE" && b.productCode === bom.productCode) {
            return { ...b, status: "INACTIVE" };
          }
          return b;
        })
      );
      setNotice(`Đã ${actionText} công thức '${bom.code}' (Dữ liệu cục bộ).`);
    }
  }

  return (
    <div className="bom-container" style={{ padding: "0 4px" }}>
      {/* Tiêu đề & Hành động */}
      <div className="page-heading workspace-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> SẢN XUẤT MRP <span className="crumb-slash">/</span> CÔNG THỨC MÓN ĂN
          </div>
          <h1>Cấu hình Công thức Định lượng (BOM)</h1>
          <p>
            Quản lý định mức nguyên vật liệu sản xuất, tạo phiên bản mới (versioning), tra cứu theo món ăn và chuyển trạng thái áp dụng.
          </p>
        </div>
        <div className="heading-actions">
          <button className="button button-primary" onClick={handleOpenCreate}>
            <Plus size={17} /> Tạo công thức mới
          </button>
        </div>
      </div>

      {/* Thông báo thao tác */}
      {notice && (
        <div className="demo-banner success-banner" style={{ margin: "16px 0" }}>
          <div className="demo-icon"><Check size={14} /></div>
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Đóng thông báo">×</button>
        </div>
      )}

      {/* Thẻ thống kê */}
      <div className="workspace-summary">
        <div className="summary-item">
          <span className="summary-icon"><Soup size={17} /></span>
          <div>
            <span>Tổng số công thức</span>
            <strong>{stats.total.toString().padStart(2, "0")}</strong>
          </div>
        </div>
        <div className="summary-item">
          <span className="summary-icon summary-icon-green"><Check size={17} /></span>
          <div>
            <span>Đang áp dụng</span>
            <strong>{stats.active.toString().padStart(2, "0")}</strong>
          </div>
        </div>
        <div className="summary-item">
          <span className="summary-icon summary-icon-amber"><Layers size={17} /></span>
          <div>
            <span>Món ăn đã cấu hình</span>
            <strong>{stats.distinctProducts.toString().padStart(2, "0")}</strong>
          </div>
        </div>
        <div className="summary-item">
          <span className="summary-icon summary-icon-red"><Clock size={17} /></span>
          <div>
            <span>Ngừng áp dụng / Lưu trữ</span>
            <strong>{stats.inactive.toString().padStart(2, "0")}</strong>
          </div>
        </div>
      </div>

      {/* Thanh công cụ Tìm kiếm nâng cao & Lọc theo ProductCode */}
      <div className="panel workspace-table-panel" style={{ marginBottom: "20px" }}>
        <div className="table-toolbar" style={{ flexWrap: "wrap", gap: "12px" }}>
          {/* Tìm kiếm */}
          <div className="toolbar-search" style={{ flex: "1 1 260px" }}>
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Tìm mã BOM, tên món, mã sản phẩm..."
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#888" }}
              >
                <X size={14} />
              </button>
            )}
          </div>

          <div className="toolbar-controls" style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {/* Tra cứu theo Món ăn (productCode) */}
            <label className="filter-select">
              <UtensilsCrossed size={15} />
              <select
                value={filterProductCode}
                onChange={(e) => { setFilterProductCode(e.target.value); setPage(1); }}
              >
                <option value="Tất cả">Tất cả món ăn</option>
                {Array.from(new Set(boms.map((b) => b.productCode))).map((code) => {
                  const b = boms.find((item) => item.productCode === code);
                  return (
                    <option key={code} value={code}>
                      {code} — {b?.productName || code}
                    </option>
                  );
                })}
              </select>
              <ChevronDown size={13} />
            </label>

            {/* Lọc Trạng thái */}
            <label className="filter-select">
              <Filter size={15} />
              <select
                value={filterStatus}
                onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
              >
                <option value="Tất cả">Tất cả trạng thái</option>
                <option value="ACTIVE">Đang áp dụng</option>
                <option value="INACTIVE">Ngừng áp dụng</option>
                <option value="ARCHIVED">Lưu trữ (Bản cũ)</option>
              </select>
              <ChevronDown size={13} />
            </label>
          </div>
        </div>

        {/* Bảng danh sách công thức BOM */}
        <div className="table-wrap">
          <table className="data-table workspace-table">
            <thead>
              <tr>
                <th>MÃ BOM</th>
                <th>MÓN ĂN (THÀNH PHẨM)</th>
                <th>PHIÊN BẢN</th>
                <th>SẢN LƯỢNG CHUẨN</th>
                <th>SỐ NVL CẤU THÀNH</th>
                <th>TRẠNG THÁI</th>
                <th style={{ textAlign: "right", minWidth: "220px" }}>THAO TÁC</th>
              </tr>
            </thead>
            <tbody>
              {paginatedBoms.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: "center", padding: "40px" }}>
                    <div className="empty-state">
                      <Soup size={32} />
                      <strong>Không tìm thấy công thức BOM</strong>
                      <span>Thử điều chỉnh từ khóa tìm kiếm hoặc chọn món ăn khác.</span>
                      <button
                        className="button button-secondary"
                        onClick={() => { setSearch(""); setFilterProductCode("Tất cả"); setFilterStatus("Tất cả"); }}
                      >
                        Xóa bộ lọc
                      </button>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedBoms.map((bom) => (
                  <tr key={bom.code}>
                    <td>
                      <button className="code-link" onClick={() => setDetailModal(bom)}>
                        {bom.code}
                      </button>
                    </td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        {bom.productImage ? (
                          <img
                            src={bom.productImage}
                            alt={bom.productName || bom.productCode}
                            style={{ width: "36px", height: "36px", borderRadius: "6px", objectFit: "cover" }}
                          />
                        ) : (
                          <div style={{ width: "36px", height: "36px", borderRadius: "6px", background: "#f0f0f0", display: "flex", alignItems: "center", justifyContent: "center" }}>
                            <UtensilsCrossed size={16} color="#888" />
                          </div>
                        )}
                        <div>
                          <strong>{bom.productName || bom.productCode}</strong>
                          <div style={{ display: "flex", gap: "6px", alignItems: "center", marginTop: "2px" }}>
                            <span style={{ fontSize: "11px", color: "#666", background: "#f0f1ed", padding: "1px 6px", borderRadius: "4px" }}>
                              {bom.productCode}
                            </span>
                            {/* Nút tra cứu nhanh các version của món này */}
                            <button
                              onClick={() => handleLookupByProduct(bom.productCode)}
                              style={{
                                border: "none",
                                background: "none",
                                fontSize: "11px",
                                color: "#2563eb",
                                cursor: "pointer",
                                textDecoration: "underline",
                                padding: 0,
                              }}
                              title="Tra cứu tất cả phiên bản của món này"
                            >
                              Lịch sử phiên bản →
                            </button>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span style={{
                        display: "inline-block",
                        padding: "2px 8px",
                        borderRadius: "12px",
                        background: bom.status === "ACTIVE" ? "#e6f4ea" : "#f1f3f4",
                        color: bom.status === "ACTIVE" ? "#137333" : "#5f6368",
                        fontWeight: 600,
                        fontSize: "12px",
                      }}>
                        v{bom.version}.0
                      </span>
                    </td>
                    <td>
                      <strong>{bom.outputQuantity}</strong> <small style={{ color: "#777" }}>{bom.productUnit || "phần"}</small>
                    </td>
                    <td>
                      <span style={{ fontSize: "13px" }}>
                        {bom.details.length} nguyên liệu
                      </span>
                    </td>
                    <td>
                      <span className={`status-pill ${
                        bom.status === "ACTIVE" ? "success" : bom.status === "ARCHIVED" ? "danger" : "warning"
                      }`}>
                        <i />
                        {bom.status === "ACTIVE"
                          ? "Đang áp dụng"
                          : bom.status === "ARCHIVED"
                          ? "Đã lưu trữ"
                          : "Ngừng áp dụng"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        {/* Xem chi tiết */}
                        <button
                          className="button button-secondary"
                          style={{ padding: "5px 8px", fontSize: "12px" }}
                          onClick={() => setDetailModal(bom)}
                          title="Xem chi tiết định lượng"
                        >
                          <Eye size={13} /> Xem
                        </button>

                        {/* Sửa công thức */}
                        <button
                          className="button button-secondary"
                          style={{ padding: "5px 8px", fontSize: "12px" }}
                          onClick={() => handleOpenEdit(bom)}
                          title="Chỉnh sửa định lượng NVL"
                        >
                          <Pencil size={13} /> Sửa
                        </button>

                        {/* Tạo Version mới */}
                        <button
                          className="button button-secondary"
                          style={{ padding: "5px 8px", fontSize: "12px", color: "#1d4ed8" }}
                          onClick={() => handleOpenNewVersion(bom)}
                          title="Tạo phiên bản mới (v+1)"
                        >
                          <Copy size={13} /> Bản mới
                        </button>

                        {/* Ngừng áp dụng / Kích hoạt lại */}
                        <button
                          className="button button-secondary"
                          style={{
                            padding: "5px 8px",
                            fontSize: "12px",
                            color: bom.status === "ACTIVE" ? "#b91c1c" : "#15803d",
                          }}
                          onClick={() => handleToggleStatus(bom)}
                          title={bom.status === "ACTIVE" ? "Ngừng áp dụng công thức này" : "Kích hoạt áp dụng công thức này"}
                        >
                          <Power size={13} />
                          {bom.status === "ACTIVE" ? "Ngừng" : "Bật"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Phân trang */}
        <div className="table-pagination">
          <span>
            Hiển thị <strong>{filteredBoms.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredBoms.length)}</strong> trong <strong>{filteredBoms.length}</strong> công thức
          </span>
          <div>
            <button className="page-arrow" disabled={page === 1} onClick={() => setPage((p) => Math.max(1, p - 1))}>
              <ChevronLeft size={16} />
            </button>
            <button className="page-number">{page} / {totalPages}</button>
            <button className="page-arrow" disabled={page >= totalPages} onClick={() => setPage((p) => Math.min(totalPages, p + 1))}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* MODAL 1: TẠO CÔNG THỨC BOM MỚI */}
      {createModal && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setCreateModal(false); }}>
          <div className="modal-card" style={{ maxWidth: "620px" }}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">SẢN XUẤT MRP</span>
                <h3>Thiết lập Công thức Định lượng Mới (BOM)</h3>
              </div>
              <button className="icon-button" onClick={() => setCreateModal(false)}><X size={18} /></button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
              <label className="form-field">
                <span>Mã công thức BOM *</span>
                <input
                  value={newBomForm.code}
                  onChange={(e) => setNewBomForm({ ...newBomForm, code: e.target.value })}
                  placeholder="Ví dụ: BOM-005"
                />
              </label>

              <label className="form-field">
                <span>Món ăn (Thành phẩm) *</span>
                <select
                  value={newBomForm.productCode}
                  onChange={(e) => setNewBomForm({ ...newBomForm, productCode: e.target.value })}
                >
                  {products.map((p) => (
                    <option key={p.code} value={p.code}>
                      {p.code} — {p.name}
                    </option>
                  ))}
                  {products.length === 0 && (
                    <>
                      <option value="TP001">TP001 — Pizza Margherita</option>
                      <option value="TP002">TP002 — Sốt bò bằm</option>
                      <option value="TP005">TP005 — Mì Ý Bolognese</option>
                    </>
                  )}
                </select>
              </label>
            </div>

            <label className="form-field">
              <span>Sản lượng thành phẩm chuẩn đầu ra *</span>
              <input
                type="number"
                min="0.1"
                step="0.1"
                value={newBomForm.outputQuantity}
                onChange={(e) => setNewBomForm({ ...newBomForm, outputQuantity: e.target.value })}
                placeholder="Ví dụ: 1 phần, 5 kg..."
              />
            </label>

            <div className="form-field">
              <span>Định mức nguyên vật liệu cấu thành *</span>
              <div className="form-lines">
                {newBomForm.details.map((line, idx) => (
                  <div key={idx} className="form-line" style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                    <select
                      style={{ flex: 2 }}
                      value={line.materialCode}
                      onChange={(e) => {
                        const val = e.target.value;
                        const mat = materials.find((m) => m.code === val);
                        setNewBomForm({
                          ...newBomForm,
                          details: newBomForm.details.map((d, i) =>
                            i === idx ? { ...d, materialCode: val, unitName: mat?.unit || "kg" } : d
                          ),
                        });
                      }}
                    >
                      {materials.map((m) => (
                        <option key={m.code} value={m.code}>{m.code} — {m.name}</option>
                      ))}
                      {!materials.some((m) => m.code === "TEST-NVL001") && (
                        <option value="TEST-NVL001">TEST-NVL001 — Thịt bò Mỹ</option>
                      )}
                    </select>

                    <input
                      style={{ flex: 1 }}
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={line.quantity}
                      onChange={(e) => {
                        const val = e.target.value;
                        setNewBomForm({
                          ...newBomForm,
                          details: newBomForm.details.map((d, i) =>
                            i === idx ? { ...d, quantity: val } : d
                          ),
                        });
                      }}
                      placeholder="Số lượng"
                    />

                    <input
                      style={{ width: "70px" }}
                      value={line.unitName}
                      disabled
                      placeholder="ĐVT"
                    />

                    <button
                      type="button"
                      className="line-remove"
                      disabled={newBomForm.details.length === 1}
                      onClick={() =>
                        setNewBomForm({
                          ...newBomForm,
                          details: newBomForm.details.filter((_, i) => i !== idx),
                        })
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="add-line-button"
                  onClick={() =>
                    setNewBomForm({
                      ...newBomForm,
                      details: [
                        ...newBomForm.details,
                        { materialCode: materials[0]?.code || "TEST-NVL001", unitName: "kg", quantity: "0.1" },
                      ],
                    })
                  }
                >
                  <CirclePlus size={14} /> Thêm nguyên vật liệu
                </button>
              </div>
            </div>

            {errorMessage && <p className="form-error">{errorMessage}</p>}

            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button className="button button-secondary" onClick={() => setCreateModal(false)}>Hủy</button>
              <button className="button button-primary" onClick={handleSaveCreate}>
                <Check size={16} /> Lưu công thức
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: CHỈNH SỬA CÔNG THỨC BOM */}
      {editModal && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setEditModal(null); }}>
          <div className="modal-card" style={{ maxWidth: "620px" }}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">CHỈNH SỬA CÔNG THỨC · {editModal.code}</span>
                <h3>{editModal.productName || editModal.productCode} (v{editModal.version}.0)</h3>
              </div>
              <button className="icon-button" onClick={() => setEditModal(null)}><X size={18} /></button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
              <label className="form-field">
                <span>Sản lượng chuẩn đầu ra *</span>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={editForm.outputQuantity}
                  onChange={(e) => setEditForm({ ...editForm, outputQuantity: e.target.value })}
                />
              </label>

              <label className="form-field">
                <span>Trạng thái áp dụng</span>
                <select
                  value={editForm.status}
                  onChange={(e) => setEditForm({ ...editForm, status: e.target.value })}
                >
                  <option value="ACTIVE">Đang áp dụng</option>
                  <option value="INACTIVE">Ngừng áp dụng</option>
                  <option value="ARCHIVED">Lưu trữ</option>
                </select>
              </label>
            </div>

            <div className="form-field">
              <span>Danh sách định mức nguyên vật liệu</span>
              <div className="form-lines">
                {editForm.details.map((line, idx) => (
                  <div key={idx} className="form-line" style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                    <select
                      style={{ flex: 2 }}
                      value={line.materialCode}
                      onChange={(e) => {
                        const val = e.target.value;
                        const mat = materials.find((m) => m.code === val);
                        setEditForm({
                          ...editForm,
                          details: editForm.details.map((d, i) =>
                            i === idx ? { ...d, materialCode: val, unitName: mat?.unit || d.unitName } : d
                          ),
                        });
                      }}
                    >
                      {materials.map((m) => (
                        <option key={m.code} value={m.code}>{m.code} — {m.name}</option>
                      ))}
                      {!materials.some((m) => m.code === line.materialCode) && (
                        <option value={line.materialCode}>{line.materialCode}</option>
                      )}
                    </select>

                    <input
                      style={{ flex: 1 }}
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={line.quantity}
                      onChange={(e) => {
                        const val = e.target.value;
                        setEditForm({
                          ...editForm,
                          details: editForm.details.map((d, i) =>
                            i === idx ? { ...d, quantity: val } : d
                          ),
                        });
                      }}
                    />

                    <input style={{ width: "70px" }} value={line.unitName} disabled />

                    <button
                      type="button"
                      className="line-remove"
                      disabled={editForm.details.length === 1}
                      onClick={() =>
                        setEditForm({
                          ...editForm,
                          details: editForm.details.filter((_, i) => i !== idx),
                        })
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="add-line-button"
                  onClick={() =>
                    setEditForm({
                      ...editForm,
                      details: [
                        ...editForm.details,
                        { materialCode: materials[0]?.code || "TEST-NVL001", unitName: "kg", quantity: "0.1" },
                      ],
                    })
                  }
                >
                  <CirclePlus size={14} /> Thêm dòng nguyên vật liệu
                </button>
              </div>
            </div>

            {errorMessage && <p className="form-error">{errorMessage}</p>}

            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button className="button button-secondary" onClick={() => setEditModal(null)}>Hủy</button>
              <button className="button button-primary" onClick={handleSaveEdit}>
                <Check size={16} /> Lưu cập nhật
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 3: TẠO PHIÊN BẢN MỚI (NEW VERSION) */}
      {versionModal && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setVersionModal(null); }}>
          <div className="modal-card" style={{ maxWidth: "620px" }}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">NÂNG CẤP PHIÊN BẢN MỚI</span>
                <h3>Tạo Version {versionModal.version + 1}.0 cho {versionModal.productName || versionModal.productCode}</h3>
              </div>
              <button className="icon-button" onClick={() => setVersionModal(null)}><X size={18} /></button>
            </div>

            <p style={{ fontSize: "13px", color: "#666", margin: "8px 0 16px", background: "#f8f9fa", padding: "10px", borderRadius: "8px" }}>
              💡 Phiên bản mới sẽ kế thừa toàn bộ danh sách nguyên liệu từ <strong>v{versionModal.version}.0</strong>. Bạn có thể gia giảm hoặc thêm bớt định lượng bên dưới.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <label className="form-field">
                <span>Mã phiên bản mới</span>
                <input
                  value={versionForm.newCode}
                  onChange={(e) => setVersionForm({ ...versionForm, newCode: e.target.value })}
                  placeholder="Để trống sẽ tự sinh mã..."
                />
              </label>

              <label className="form-field">
                <span>Sản lượng chuẩn đầu ra</span>
                <input
                  type="number"
                  min="0.1"
                  step="0.1"
                  value={versionForm.outputQuantity}
                  onChange={(e) => setVersionForm({ ...versionForm, outputQuantity: e.target.value })}
                />
              </label>
            </div>

            <div className="form-field" style={{ marginTop: "8px" }}>
              <span>Điều chỉnh định mức nguyên vật liệu cho Version mới</span>
              <div className="form-lines">
                {versionForm.details.map((line, idx) => (
                  <div key={idx} className="form-line" style={{ display: "flex", gap: "8px", marginBottom: "8px" }}>
                    <select
                      style={{ flex: 2 }}
                      value={line.materialCode}
                      onChange={(e) => {
                        const val = e.target.value;
                        const mat = materials.find((m) => m.code === val);
                        setVersionForm({
                          ...versionForm,
                          details: versionForm.details.map((d, i) =>
                            i === idx ? { ...d, materialCode: val, unitName: mat?.unit || d.unitName } : d
                          ),
                        });
                      }}
                    >
                      {materials.map((m) => (
                        <option key={m.code} value={m.code}>{m.code} — {m.name}</option>
                      ))}
                      {!materials.some((m) => m.code === line.materialCode) && (
                        <option value={line.materialCode}>{line.materialCode}</option>
                      )}
                    </select>

                    <input
                      style={{ flex: 1 }}
                      type="number"
                      min="0.01"
                      step="0.01"
                      value={line.quantity}
                      onChange={(e) => {
                        const val = e.target.value;
                        setVersionForm({
                          ...versionForm,
                          details: versionForm.details.map((d, i) =>
                            i === idx ? { ...d, quantity: val } : d
                          ),
                        });
                      }}
                    />

                    <input style={{ width: "70px" }} value={line.unitName} disabled />

                    <button
                      type="button"
                      className="line-remove"
                      disabled={versionForm.details.length === 1}
                      onClick={() =>
                        setVersionForm({
                          ...versionForm,
                          details: versionForm.details.filter((_, i) => i !== idx),
                        })
                      }
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}

                <button
                  type="button"
                  className="add-line-button"
                  onClick={() =>
                    setVersionForm({
                      ...versionForm,
                      details: [
                        ...versionForm.details,
                        { materialCode: materials[0]?.code || "TEST-NVL001", unitName: "kg", quantity: "0.1" },
                      ],
                    })
                  }
                >
                  <CirclePlus size={14} /> Thêm dòng nguyên vật liệu
                </button>
              </div>
            </div>

            <label style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "14px", fontSize: "13px", cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={versionForm.deactivateOldVersion}
                onChange={(e) => setVersionForm({ ...versionForm, deactivateOldVersion: e.target.checked })}
              />
              <span>Tự động chuyển phiên bản cũ (v{versionModal.version}.0) sang trạng thái <strong>Đã lưu trữ (ARCHIVED)</strong></span>
            </label>

            {errorMessage && <p className="form-error">{errorMessage}</p>}

            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button className="button button-secondary" onClick={() => setVersionModal(null)}>Hủy</button>
              <button className="button button-primary" onClick={handleSaveNewVersion}>
                <Check size={16} /> Xuất bản Version mới
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 4: TRA CỨU CÔNG THỨC THEO PRODUCT CODE (LỊCH SỬ CÁC PHIÊN BẢN) */}
      {productLookupModal && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setProductLookupModal(null); }}>
          <div className="modal-card" style={{ maxWidth: "680px" }}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">TRA CỨU CÔNG THỨC THEO MÓN ĂN</span>
                <h3>Mã món: {productLookupModal}</h3>
              </div>
              <button className="icon-button" onClick={() => setProductLookupModal(null)}><X size={18} /></button>
            </div>

            {productVersionsData ? (
              <div style={{ marginTop: "14px" }}>
                {productVersionsData.product && (
                  <div style={{ display: "flex", gap: "14px", padding: "12px", background: "#f8f9f7", borderRadius: "8px", marginBottom: "16px" }}>
                    {productVersionsData.product.imageUrl && (
                      <img
                        src={productVersionsData.product.imageUrl}
                        alt={productVersionsData.product.name}
                        style={{ width: "60px", height: "60px", borderRadius: "8px", objectFit: "cover" }}
                      />
                    )}
                    <div>
                      <h4 style={{ margin: "0 0 4px", fontSize: "16px" }}>{productVersionsData.product.name}</h4>
                      <div style={{ fontSize: "13px", color: "#666" }}>
                        Nhóm món: <strong>{productVersionsData.product.category}</strong> · Giá bán: <strong>{Number(productVersionsData.product.price).toLocaleString("vi-VN")} ₫</strong>
                      </div>
                    </div>
                  </div>
                )}

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
                  <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600 }}>
                    Tất cả các phiên bản BOM ({productVersionsData.data?.length || 0} phiên bản):
                  </h4>
                  <span style={{ fontSize: "12px", color: "#666" }}>
                    Phiên bản đang áp dụng: <strong style={{ color: "#16a34a" }}>v{productVersionsData.activeVersion || 1}.0</strong>
                  </span>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxHeight: "350px", overflowY: "auto" }}>
                  {productVersionsData.data?.map((bomItem: BomItem) => (
                    <div
                      key={bomItem.code}
                      style={{
                        border: bomItem.status === "ACTIVE" ? "2px solid #22c55e" : "1px solid #e5e7eb",
                        borderRadius: "8px",
                        padding: "12px",
                        background: bomItem.status === "ACTIVE" ? "#f0fdf4" : "#fff",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                        <div>
                          <strong style={{ fontSize: "15px" }}>{bomItem.code}</strong>
                          <span style={{ marginLeft: "8px", fontSize: "12px", fontWeight: 600, color: "#4b5563" }}>
                            (Phiên bản v{bomItem.version}.0)
                          </span>
                        </div>
                        <span className={`status-pill ${bomItem.status === "ACTIVE" ? "success" : "danger"}`}>
                          <i /> {bomItem.status === "ACTIVE" ? "ĐANG ÁP DỤNG" : "NGỪNG ÁP DỤNG"}
                        </span>
                      </div>

                      <div style={{ fontSize: "12px", color: "#666", marginBottom: "8px" }}>
                        Sản lượng chuẩn: <strong>{bomItem.outputQuantity}</strong> phần · Số lượng NVL: <strong>{bomItem.details.length}</strong> loại
                      </div>

                      <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ color: "#777", borderBottom: "1px solid #e5e7eb", textAlign: "left" }}>
                            <th style={{ padding: "4px 0" }}>Nguyên vật liệu</th>
                            <th style={{ padding: "4px 0" }}>Mã NVL</th>
                            <th style={{ padding: "4px 0", textAlign: "right" }}>Định lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bomItem.details.map((d, i) => (
                            <tr key={i} style={{ borderBottom: "1px solid #f3f4f6" }}>
                              <td style={{ padding: "4px 0", fontWeight: 500 }}>{d.materialName}</td>
                              <td style={{ padding: "4px 0", color: "#888" }}>{d.materialCode}</td>
                              <td style={{ padding: "4px 0", textAlign: "right", fontWeight: 600 }}>
                                {d.quantity} {d.unitName}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      {bomItem.status !== "ACTIVE" && (
                        <div style={{ textAlign: "right", marginTop: "8px" }}>
                          <button
                            className="button button-secondary"
                            style={{ padding: "4px 10px", fontSize: "12px" }}
                            onClick={() => {
                              handleToggleStatus(bomItem);
                              setProductLookupModal(null);
                            }}
                          >
                            <RotateCcw size={12} /> Tái kích hoạt phiên bản này
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div style={{ padding: "30px", textAlign: "center", color: "#888" }}>Đang tải lịch sử công thức...</div>
            )}

            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button className="button button-primary" onClick={() => setProductLookupModal(null)}>Đóng</button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 5: XEM CHI TIẾT CÔNG THỨC */}
      {detailModal && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setDetailModal(null); }}>
          <div className="modal-card" style={{ maxWidth: "580px" }}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">CHI TIẾT CÔNG THỨC · {detailModal.code}</span>
                <h3>{detailModal.productName || detailModal.productCode}</h3>
              </div>
              <button className="icon-button" onClick={() => setDetailModal(null)}><X size={18} /></button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", background: "#f8f9f7", padding: "12px", borderRadius: "8px", marginTop: "12px" }}>
              <div>Món ăn: <strong>{detailModal.productName || detailModal.productCode}</strong> ({detailModal.productCode})</div>
              <div>Phiên bản: <strong>v{detailModal.version}.0</strong></div>
              <div>Sản lượng đầu ra: <strong>{detailModal.outputQuantity} {detailModal.productUnit || "phần"}</strong></div>
              <div>Trạng thái: <strong>{detailModal.status === "ACTIVE" ? "Đang áp dụng" : "Ngừng áp dụng"}</strong></div>
            </div>

            <h4 style={{ margin: "16px 0 8px", fontSize: "14px" }}>Định lượng nguyên vật liệu cấu thành:</h4>
            <table style={{ width: "100%", fontSize: "13px", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#f3f4f6", textAlign: "left", color: "#555" }}>
                  <th style={{ padding: "8px" }}>Tên nguyên vật liệu</th>
                  <th style={{ padding: "8px" }}>Mã NVL</th>
                  <th style={{ padding: "8px", textAlign: "right" }}>Định mức</th>
                </tr>
              </thead>
              <tbody>
                {detailModal.details.map((d, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid #e5e7eb" }}>
                    <td style={{ padding: "8px", fontWeight: 500 }}>{d.materialName}</td>
                    <td style={{ padding: "8px", color: "#777" }}>{d.materialCode}</td>
                    <td style={{ padding: "8px", textAlign: "right", fontWeight: 600, color: "#c66b45" }}>
                      {d.quantity} {d.unitName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="modal-actions" style={{ marginTop: "24px", display: "flex", justifyContent: "space-between" }}>
              <button
                className="button button-secondary"
                style={{ color: "#2563eb" }}
                onClick={() => {
                  const pCode = detailModal.productCode;
                  setDetailModal(null);
                  handleLookupByProduct(pCode);
                }}
              >
                <Clock size={14} /> Lịch sử các version khác
              </button>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  className="button button-secondary"
                  onClick={() => {
                    const item = detailModal;
                    setDetailModal(null);
                    handleOpenEdit(item);
                  }}
                >
                  <Pencil size={14} /> Chỉnh sửa
                </button>
                <button className="button button-primary" onClick={() => setDetailModal(null)}>
                  Đóng
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

