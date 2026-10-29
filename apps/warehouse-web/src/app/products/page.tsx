"use client";

import { useEffect, useState, useMemo } from "react";
import {
  ArrowDownAZ,
  ArrowUpDown,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CirclePlus,
  Eye,
  Filter,
  Grid,
  Info,
  Layers,
  List,
  Pencil,
  Plus,
  Search,
  SlidersHorizontal,
  Trash2,
  UtensilsCrossed,
  X,
} from "lucide-react";
import {
  fetchProducts,
  fetchProductDetail,
  fetchProductCategories,
  createProduct,
  updateProduct,
  deleteProduct,
  type ProductItem,
  type ProductDetail,
} from "@/services/product.service";

// Dữ liệu mẫu dự phòng khi chưa kết nối backend
const fallbackProducts: ProductItem[] = [
  {
    id: "p1",
    code: "TP001",
    name: "Pizza Margherita",
    category: "Pizza",
    price: 185000,
    unit: "phần",
    imageUrl: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=500&auto=format&fit=crop",
    description: "Pizza truyền thống phong cách Ý với sốt cà chua, phô mai mozzarella tươi và lá quế tây tươi.",
    status: "ACTIVE",
    totalStock: 42,
    bomCount: 1,
    activeBom: { id: "b1", code: "BOM-001", version: 1, status: "ACTIVE" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p2",
    code: "TP002",
    name: "Sốt bò bằm",
    category: "Sốt & nước dùng",
    price: 120000,
    unit: "kg",
    imageUrl: "https://images.unsplash.com/photo-1572441713132-c542fc4fe282?w=500&auto=format&fit=crop",
    description: "Sốt bò bằm nấu chậm 4 tiếng theo công thức đặc biệt của bếp trưởng.",
    status: "ACTIVE",
    totalStock: 8,
    bomCount: 1,
    activeBom: { id: "b2", code: "BOM-002", version: 1, status: "ACTIVE" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p3",
    code: "TP003",
    name: "Đế bánh pizza",
    category: "Bán thành phẩm",
    price: 35000,
    unit: "cái",
    imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&auto=format&fit=crop",
    description: "Đế bánh pizza ủ men chậm 24h, giòn xốp bên ngoài, mềm dai bên trong.",
    status: "ACTIVE",
    totalStock: 85,
    bomCount: 0,
    activeBom: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p4",
    code: "TP004",
    name: "Tiramisu",
    category: "Tráng miệng",
    price: 65000,
    unit: "phần",
    imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&auto=format&fit=crop",
    description: "Bánh tiramisu hương vị cà phê espresso, rượu rum và phô mai mascarpone béo ngậy.",
    status: "ACTIVE",
    totalStock: 6,
    bomCount: 1,
    activeBom: { id: "b3", code: "BOM-004", version: 1, status: "ACTIVE" },
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p5",
    code: "TP005",
    name: "Mì Ý sốt bò bằm (Bolognese)",
    category: "Mì Ý",
    price: 145000,
    unit: "phần",
    imageUrl: "https://images.unsplash.com/photo-1621996346565-e3d5d6281228?w=500&auto=format&fit=crop",
    description: "Mì Ý sợi dài kết hợp sốt thịt bò bằm hầm cà chua và rắc phô mai Parmesan bột.",
    status: "ACTIVE",
    totalStock: 15,
    bomCount: 1,
    activeBom: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: "p6",
    code: "TP006",
    name: "Salad cá hồi hun khói",
    category: "Khai vị",
    price: 165000,
    unit: "phần",
    imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=500&auto=format&fit=crop",
    description: "Rau xà lách tươi hữu cơ, cá hồi hun khói Nauy, quả bơ và sốt giấm balsamic.",
    status: "INACTIVE",
    totalStock: 0,
    bomCount: 0,
    activeBom: null,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<ProductItem[]>(fallbackProducts);
  const [categories, setCategories] = useState<string[]>(["Pizza", "Mì Ý", "Khai vị", "Tráng miệng", "Sốt & nước dùng", "Bán thành phẩm"]);
  const [loading, setLoading] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  // Bộ lọc & Tìm kiếm
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedStatus, setSelectedStatus] = useState("Tất cả");
  const [priceRange, setPriceRange] = useState("Tất cả");
  const [sortBy, setSortBy] = useState<"createdAt" | "price" | "name">("createdAt");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const pageSize = 8;

  // Modals & Thông báo
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [detailModal, setDetailModal] = useState<ProductDetail | null>(null);
  const [notice, setNotice] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Form State
  const [form, setForm] = useState({
    code: "",
    name: "",
    category: "Pizza",
    price: "",
    unit: "phần",
    imageUrl: "",
    description: "",
    status: "ACTIVE",
  });

  // Tải danh mục & sản phẩm
  async function loadData() {
    try {
      setLoading(true);
      const [res, cats] = await Promise.allSettled([
        fetchProducts({
          search: search || undefined,
          category: selectedCategory !== "Tất cả" ? selectedCategory : undefined,
          status: selectedStatus !== "Tất cả" ? selectedStatus : undefined,
          sortBy,
          sortOrder,
          page,
          limit: 100,
        }),
        fetchProductCategories(),
      ]);

      if (res.status === "fulfilled" && res.value?.data?.length) {
        setProducts(res.value.data);
      }
      if (cats.status === "fulfilled" && cats.value?.length) {
        setCategories(Array.from(new Set([...cats.value, "Pizza", "Mì Ý", "Khai vị", "Tráng miệng"])));
      }
    } catch {
      // Giữ fallback data
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [search, selectedCategory, selectedStatus, sortBy, sortOrder]);

  // Lọc phía client (áp dụng cả khi dùng fallback data)
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      // Tìm kiếm từ khóa
      const matchKeyword =
        !search.trim() ||
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.code.toLowerCase().includes(search.toLowerCase()) ||
        (p.description && p.description.toLowerCase().includes(search.toLowerCase()));

      // Lọc danh mục
      const matchCategory = selectedCategory === "Tất cả" || p.category === selectedCategory;

      // Lọc trạng thái
      const matchStatus = selectedStatus === "Tất cả" || p.status === selectedStatus;

      // Lọc khoảng giá
      let matchPrice = true;
      if (priceRange === "under-50k") matchPrice = p.price < 50000;
      else if (priceRange === "50k-100k") matchPrice = p.price >= 50000 && p.price <= 100000;
      else if (priceRange === "100k-200k") matchPrice = p.price > 100000 && p.price <= 200000;
      else if (priceRange === "over-200k") matchPrice = p.price > 200000;

      return matchKeyword && matchCategory && matchStatus && matchPrice;
    }).sort((a, b) => {
      if (sortBy === "price") {
        return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
      }
      if (sortBy === "name") {
        return sortOrder === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name);
      }
      return sortOrder === "asc"
        ? new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        : new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [products, search, selectedCategory, selectedStatus, priceRange, sortBy, sortOrder]);

  // Phân trang
  const totalPages = Math.ceil(filteredProducts.length / pageSize) || 1;
  const paginatedList = filteredProducts.slice((page - 1) * pageSize, page * pageSize);

  // Thống kê nhanh
  const stats = useMemo(() => {
    const active = products.filter((p) => p.status === "ACTIVE").length;
    const hasBom = products.filter((p) => p.bomCount > 0).length;
    return {
      total: products.length,
      active,
      inactive: products.length - active,
      hasBom,
    };
  }, [products]);

  // Mở modal thêm mới
  function handleOpenCreate() {
    setEditingCode(null);
    setForm({
      code: `TP00${products.length + 1}`,
      name: "",
      category: categories[0] || "Pizza",
      price: "",
      unit: "phần",
      imageUrl: "",
      description: "",
      status: "ACTIVE",
    });
    setErrorMessage("");
    setIsModalOpen(true);
  }

  // Mở modal chỉnh sửa
  function handleOpenEdit(item: ProductItem) {
    setEditingCode(item.code);
    setForm({
      code: item.code,
      name: item.name,
      category: item.category,
      price: item.price.toString(),
      unit: item.unit,
      imageUrl: item.imageUrl || "",
      description: item.description || "",
      status: item.status,
    });
    setErrorMessage("");
    setIsModalOpen(true);
  }

  // Xem chi tiết món ăn
  async function handleOpenDetail(code: string) {
    try {
      const data = await fetchProductDetail(code);
      setDetailModal(data);
    } catch {
      // Nếu API lỗi, lấy thông tin từ list
      const item = products.find((p) => p.code === code);
      if (item) {
        setDetailModal({
          ...item,
          boms: item.activeBom ? [{
            id: item.activeBom.id,
            code: item.activeBom.code,
            version: item.activeBom.version,
            outputQuantity: 1,
            status: item.activeBom.status,
            materialsCount: 4,
            materials: [
              { materialCode: "TEST-NVL001", materialName: "Thịt bò Mỹ", quantity: 0.15, unitName: "kg" },
              { materialCode: "NVL002", materialName: "Phô mai Mozzarella", quantity: 0.1, unitName: "kg" },
              { materialCode: "NVL003", materialName: "Sốt cà chua", quantity: 0.08, unitName: "kg" },
            ],
          }] : [],
          stockLocations: [
            { locationName: "Kho lạnh trung tâm", branchName: "Chi nhánh Quận 1", quantity: item.totalStock },
          ],
        });
      }
    }
  }

  // Lưu món ăn (Thêm mới hoặc Cập nhật)
  async function handleSave() {
    if (!form.name.trim()) {
      setErrorMessage("Vui lòng nhập tên món ăn.");
      return;
    }
    const priceNum = Number(form.price);
    if (isNaN(priceNum) || priceNum < 0) {
      setErrorMessage("Giá bán phải là số hợp lệ và không được âm.");
      return;
    }

    try {
      if (editingCode) {
        await updateProduct(editingCode, {
          name: form.name.trim(),
          category: form.category,
          price: priceNum,
          unit: form.unit.trim(),
          imageUrl: form.imageUrl.trim() || undefined,
          description: form.description.trim() || undefined,
          status: form.status,
        });
        setNotice(`Đã cập nhật món '${form.name}' thành công!`);
      } else {
        await createProduct({
          code: form.code.trim().toUpperCase(),
          name: form.name.trim(),
          category: form.category,
          price: priceNum,
          unit: form.unit.trim(),
          imageUrl: form.imageUrl.trim() || undefined,
          description: form.description.trim() || undefined,
          status: form.status,
        });
        setNotice(`Đã thêm món mới '${form.name}' vào thực đơn!`);
      }
      setIsModalOpen(false);
      loadData();
    } catch (err: any) {
      // Fallback cập nhật local state nếu backend chưa bật
      if (editingCode) {
        setProducts((prev) =>
          prev.map((p) =>
            p.code === editingCode
              ? { ...p, name: form.name, category: form.category, price: priceNum, unit: form.unit, imageUrl: form.imageUrl, description: form.description, status: form.status }
              : p
          )
        );
        setNotice(`Đã cập nhật món '${form.name}' (Dữ liệu cục bộ).`);
      } else {
        const newItem: ProductItem = {
          id: `p-${Date.now()}`,
          code: form.code.toUpperCase(),
          name: form.name,
          category: form.category,
          price: priceNum,
          unit: form.unit,
          imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&auto=format&fit=crop",
          description: form.description,
          status: form.status,
          totalStock: 0,
          bomCount: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        setProducts((prev) => [newItem, ...prev]);
        setNotice(`Đã thêm món mới '${form.name}' (Dữ liệu cục bộ).`);
      }
      setIsModalOpen(false);
    }
  }

  // Xóa món ăn
  async function handleDelete(code: string, name: string) {
    if (!confirm(`Bạn có chắc chắn muốn xóa món '${name}' (${code}) khỏi thực đơn?`)) return;
    try {
      await deleteProduct(code);
      setNotice(`Đã xóa món '${name}' thành công.`);
      loadData();
    } catch (err: any) {
      // Fallback local
      setProducts((prev) => prev.filter((p) => p.code !== code));
      setNotice(`Đã xóa món '${name}' khỏi danh sách.`);
    }
  }

  return (
    <div className="products-container" style={{ padding: "0 4px" }}>
      {/* Tiêu đề & Hành động chính */}
      <div className="page-heading workspace-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> THỰC ĐƠN NHÀ HÀNG <span className="crumb-slash">/</span> QUẢN LÝ MÓN ĂN
          </div>
          <h1>Quản lý Món ăn (Thành phẩm)</h1>
          <p>Xem danh sách, tìm kiếm nâng cao, lọc theo nhóm món và cấu hình định giá bán.</p>
        </div>
        <div className="heading-actions">
          <div style={{ display: "flex", gap: "6px", background: "#f0f1ed", padding: "4px", borderRadius: "8px" }}>
            <button
              onClick={() => setViewMode("grid")}
              className={`button ${viewMode === "grid" ? "button-primary" : "button-secondary"}`}
              style={{ padding: "6px 12px", minHeight: "auto", fontSize: "13px" }}
              title="Dạng lưới thẻ"
            >
              <Grid size={15} /> Lưới
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`button ${viewMode === "table" ? "button-primary" : "button-secondary"}`}
              style={{ padding: "6px 12px", minHeight: "auto", fontSize: "13px" }}
              title="Dạng bảng danh sách"
            >
              <List size={15} /> Bảng
            </button>
          </div>
          <button className="button button-primary" onClick={handleOpenCreate}>
            <Plus size={17} /> Thêm món mới
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
          <span className="summary-icon"><UtensilsCrossed size={17} /></span>
          <div>
            <span>Tổng số món</span>
            <strong>{stats.total.toString().padStart(2, "0")}</strong>
          </div>
        </div>
        <div className="summary-item">
          <span className="summary-icon summary-icon-green"><Check size={17} /></span>
          <div>
            <span>Đang phục vụ</span>
            <strong>{stats.active.toString().padStart(2, "0")}</strong>
          </div>
        </div>
        <div className="summary-item">
          <span className="summary-icon summary-icon-amber"><Layers size={17} /></span>
          <div>
            <span>Đã tạo định mức BOM</span>
            <strong>{stats.hasBom.toString().padStart(2, "0")}</strong>
          </div>
        </div>
        <div className="summary-item">
          <span className="summary-icon summary-icon-red"><span className="alert-glyph">!</span></span>
          <div>
            <span>Tạm ngưng phục vụ</span>
            <strong>{stats.inactive.toString().padStart(2, "0")}</strong>
          </div>
        </div>
      </div>

      {/* Thanh công cụ Tìm kiếm nâng cao, Lọc & Sắp xếp */}
      <div className="panel workspace-table-panel" style={{ marginBottom: "20px" }}>
        <div className="table-toolbar" style={{ flexWrap: "wrap", gap: "12px" }}>
          {/* Tìm kiếm nâng cao */}
          <div className="toolbar-search" style={{ flex: "1 1 260px" }}>
            <Search size={16} />
            <input
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
              placeholder="Tìm theo tên món, mã TP, mô tả..."
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
            {/* Lọc Nhóm món */}
            <label className="filter-select">
              <Filter size={15} />
              <select value={selectedCategory} onChange={(e) => { setSelectedCategory(e.target.value); setPage(1); }}>
                <option>Tất cả</option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <ChevronDown size={13} />
            </label>

            {/* Lọc Trạng thái */}
            <label className="filter-select">
              <SlidersHorizontal size={15} />
              <select value={selectedStatus} onChange={(e) => { setSelectedStatus(e.target.value); setPage(1); }}>
                <option value="Tất cả">Tất cả trạng thái</option>
                <option value="ACTIVE">Đang phục vụ</option>
                <option value="INACTIVE">Tạm ngưng</option>
              </select>
              <ChevronDown size={13} />
            </label>

            {/* Lọc Khoảng giá */}
            <label className="filter-select">
              <select value={priceRange} onChange={(e) => { setPriceRange(e.target.value); setPage(1); }}>
                <option value="Tất cả">Mọi khoảng giá</option>
                <option value="under-50k">Dưới 50.000 ₫</option>
                <option value="50k-100k">50.000 ₫ – 100.000 ₫</option>
                <option value="100k-200k">100.000 ₫ – 200.000 ₫</option>
                <option value="over-200k">Trên 200.000 ₫</option>
              </select>
              <ChevronDown size={13} />
            </label>

            {/* Sắp xếp */}
            <label className="filter-select">
              <ArrowUpDown size={15} />
              <select
                value={`${sortBy}-${sortOrder}`}
                onChange={(e) => {
                  const [field, order] = e.target.value.split("-") as [any, any];
                  setSortBy(field);
                  setSortOrder(order);
                }}
              >
                <option value="createdAt-desc">Mới nhất trước</option>
                <option value="createdAt-asc">Cũ nhất trước</option>
                <option value="price-asc">Giá: Thấp đến cao</option>
                <option value="price-desc">Giá: Cao đến thấp</option>
                <option value="name-asc">Tên món: A → Z</option>
                <option value="name-desc">Tên món: Z → A</option>
              </select>
              <ChevronDown size={13} />
            </label>
          </div>
        </div>

        {/* Nội dung danh sách */}
        {viewMode === "grid" ? (
          /* DẠNG THẺ (CARD GRID) */
          <div style={{ padding: "16px 20px" }}>
            {paginatedList.length === 0 ? (
              <div className="empty-state">
                <UtensilsCrossed size={32} />
                <strong>Không tìm thấy món ăn phù hợp</strong>
                <span>Thử điều chỉnh từ khóa tìm kiếm hoặc bỏ bớt các bộ lọc bên trên.</span>
                <button
                  className="button button-secondary"
                  onClick={() => { setSearch(""); setSelectedCategory("Tất cả"); setSelectedStatus("Tất cả"); setPriceRange("Tất cả"); }}
                >
                  Xóa tất cả bộ lọc
                </button>
              </div>
            ) : (
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "20px",
              }}>
                {paginatedList.map((item) => (
                  <div
                    key={item.code}
                    style={{
                      background: "#ffffff",
                      borderRadius: "12px",
                      border: "1px solid #e7e8e4",
                      overflow: "hidden",
                      display: "flex",
                      flexDirection: "column",
                      transition: "all 0.2s ease",
                      boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                    }}
                  >
                    {/* Ảnh món ăn */}
                    <div style={{ position: "relative", width: "100%", height: "165px", background: "#f5f5f3" }}>
                      {item.imageUrl ? (
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          style={{ width: "100%", height: "100%", objectFit: "cover" }}
                        />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#bbb" }}>
                          <UtensilsCrossed size={40} />
                        </div>
                      )}
                      <span
                        style={{
                          position: "absolute",
                          top: "10px",
                          left: "10px",
                          background: "rgba(0,0,0,0.65)",
                          color: "#fff",
                          padding: "3px 8px",
                          borderRadius: "6px",
                          fontSize: "11px",
                          fontWeight: 600,
                          letterSpacing: "0.5px",
                        }}
                      >
                        {item.code}
                      </span>
                      <span
                        className={`status-pill ${item.status === "ACTIVE" ? "success" : "danger"}`}
                        style={{ position: "absolute", top: "10px", right: "10px" }}
                      >
                        <i /> {item.status === "ACTIVE" ? "Đang bán" : "Tạm ngưng"}
                      </span>
                    </div>

                    {/* Chi tiết nội dung */}
                    <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "6px" }}>
                        <span style={{ fontSize: "12px", color: "#7a8b7b", fontWeight: 600, textTransform: "uppercase" }}>
                          {item.category}
                        </span>
                        <span style={{ fontSize: "16px", fontWeight: 700, color: "#c66b45" }}>
                          {item.price.toLocaleString("vi-VN")} <small style={{ fontSize: "12px" }}>₫</small>
                        </span>
                      </div>

                      <h3 style={{ margin: "0 0 6px", fontSize: "16px", fontWeight: 600, color: "#222" }}>
                        {item.name}
                      </h3>

                      <p style={{
                        fontSize: "13px",
                        color: "#666",
                        margin: "0 0 14px",
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        flex: 1,
                      }}>
                        {item.description || "Chưa có mô tả chi tiết cho món ăn này."}
                      </p>

                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        paddingTop: "12px",
                        borderTop: "1px solid #f0f1ed",
                        fontSize: "12px",
                        color: "#555",
                      }}>
                        <div>
                          Tồn kho: <strong>{item.totalStock}</strong> <small>{item.unit}</small>
                        </div>
                        <div>
                          {item.bomCount > 0 ? (
                            <span style={{ color: "#2b7a4b", fontWeight: 500 }}>
                              ✓ Có định mức BOM
                            </span>
                          ) : (
                            <span style={{ color: "#999" }}>Chưa có BOM</span>
                          )}
                        </div>
                      </div>

                      {/* Các nút thao tác */}
                      <div style={{ display: "flex", gap: "8px", marginTop: "12px" }}>
                        <button
                          className="button button-secondary"
                          style={{ flex: 1, padding: "6px", fontSize: "13px" }}
                          onClick={() => handleOpenDetail(item.code)}
                        >
                          <Eye size={14} /> Chi tiết
                        </button>
                        <button
                          className="button button-secondary"
                          style={{ padding: "6px 10px" }}
                          onClick={() => handleOpenEdit(item)}
                          title="Chỉnh sửa món"
                        >
                          <Pencil size={14} />
                        </button>
                        <button
                          className="button button-secondary"
                          style={{ padding: "6px 10px", color: "#d9534f" }}
                          onClick={() => handleDelete(item.code, item.name)}
                          title="Xóa món"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          /* DẠNG BẢNG (TABLE LIST) */
          <div className="table-wrap">
            <table className="data-table workspace-table">
              <thead>
                <tr>
                  <th style={{ width: "60px" }}>ẢNH</th>
                  <th>MÃ MÓN</th>
                  <th>TÊN MÓN ĂN</th>
                  <th>NHÓM MÓN</th>
                  <th>GIÁ BÁN</th>
                  <th>ĐƠN VỊ</th>
                  <th>TỒN KHO</th>
                  <th>CÔNG THỨC BOM</th>
                  <th>TRẠNG THÁI</th>
                  <th style={{ textAlign: "right" }}>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {paginatedList.map((item) => (
                  <tr key={item.code}>
                    <td>
                      <div style={{ width: "40px", height: "40px", borderRadius: "6px", overflow: "hidden", background: "#f0f0f0" }}>
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                        ) : (
                          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", color: "#aaa" }}>
                            <UtensilsCrossed size={16} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td>
                      <button className="code-link" onClick={() => handleOpenDetail(item.code)}>
                        {item.code}
                      </button>
                    </td>
                    <td>
                      <strong>{item.name}</strong>
                    </td>
                    <td>
                      <span style={{ fontSize: "12px", background: "#f0f4f1", color: "#2f5233", padding: "2px 8px", borderRadius: "4px" }}>
                        {item.category}
                      </span>
                    </td>
                    <td>
                      <strong style={{ color: "#c66b45" }}>
                        {item.price.toLocaleString("vi-VN")} ₫
                      </strong>
                    </td>
                    <td>{item.unit}</td>
                    <td>
                      <strong>{item.totalStock}</strong> <small style={{ color: "#888" }}>{item.unit}</small>
                    </td>
                    <td>
                      {item.bomCount > 0 ? (
                        <span className="status-pill success"><i /> Đã tạo</span>
                      ) : (
                        <span className="status-pill warning"><i /> Chưa có</span>
                      )}
                    </td>
                    <td>
                      <span className={`status-pill ${item.status === "ACTIVE" ? "success" : "danger"}`}>
                        <i /> {item.status === "ACTIVE" ? "Đang bán" : "Tạm ngưng"}
                      </span>
                    </td>
                    <td style={{ textAlign: "right" }}>
                      <div style={{ display: "inline-flex", gap: "6px" }}>
                        <button className="row-action" title="Xem chi tiết" onClick={() => handleOpenDetail(item.code)}>
                          <Eye size={15} />
                        </button>
                        <button className="row-action" title="Sửa thông tin" onClick={() => handleOpenEdit(item)}>
                          <Pencil size={15} />
                        </button>
                        <button className="row-action" title="Xóa món" onClick={() => handleDelete(item.code, item.name)}>
                          <Trash2 size={15} style={{ color: "#d9534f" }} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Phân trang */}
        <div className="table-pagination">
          <span>
            Hiển thị <strong>{filteredProducts.length ? (page - 1) * pageSize + 1 : 0}–{Math.min(page * pageSize, filteredProducts.length)}</strong> trong <strong>{filteredProducts.length}</strong> món ăn
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

      {/* MODAL: THÊM MỚI / CHỈNH SỬA MÓN ĂN */}
      {isModalOpen && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setIsModalOpen(false); }}>
          <div className="modal-card" style={{ maxWidth: "560px" }}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">QUẢN LÝ THỰC ĐƠN</span>
                <h3>{editingCode ? `Chỉnh sửa: ${form.name}` : "Thêm món ăn mới"}</h3>
              </div>
              <button className="icon-button" onClick={() => setIsModalOpen(false)}>
                <X size={18} />
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
              <label className="form-field">
                <span>Mã món (TP...) *</span>
                <input
                  value={form.code}
                  disabled={!!editingCode}
                  onChange={(e) => setForm({ ...form, code: e.target.value })}
                  placeholder="Ví dụ: TP007"
                />
              </label>

              <label className="form-field">
                <span>Nhóm món ăn *</span>
                <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                  <option value="Khác">+ Nhóm mới...</option>
                </select>
              </label>
            </div>

            <label className="form-field">
              <span>Tên món ăn *</span>
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Ví dụ: Pizza Hải Sản Sốt Pesto"
              />
            </label>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <label className="form-field">
                <span>Giá bán (VND) *</span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={form.price}
                  onChange={(e) => setForm({ ...form, price: e.target.value })}
                  placeholder="Ví dụ: 195000"
                />
              </label>

              <label className="form-field">
                <span>Đơn vị tính</span>
                <input
                  value={form.unit}
                  onChange={(e) => setForm({ ...form, unit: e.target.value })}
                  placeholder="phần, cái, đĩa, tô..."
                />
              </label>
            </div>

            <label className="form-field">
              <span>URL Hình ảnh</span>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                placeholder="https://images.unsplash.com/..."
              />
            </label>

            <label className="form-field">
              <span>Mô tả món ăn</span>
              <textarea
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                placeholder="Thành phần đặc trưng, hương vị, lưu ý chế biến..."
              />
            </label>

            <label className="form-field">
              <span>Trạng thái kinh doanh</span>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}>
                <option value="ACTIVE">Đang phục vụ (Hiển thị cho khách và bán)</option>
                <option value="INACTIVE">Tạm ngưng phục vụ (Ẩn khỏi thực đơn)</option>
              </select>
            </label>

            {errorMessage && <p className="form-error">{errorMessage}</p>}

            <div className="modal-actions" style={{ marginTop: "20px" }}>
              <button className="button button-secondary" onClick={() => setIsModalOpen(false)}>
                Hủy bỏ
              </button>
              <button className="button button-primary" onClick={handleSave}>
                <Check size={16} /> {editingCode ? "Lưu thay đổi" : "Tạo món ăn"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL: CHI TIẾT MÓN ĂN & CÔNG THỨC ĐỊNH MỨC (BOM) */}
      {detailModal && (
        <div className="modal-backdrop" onMouseDown={(e) => { if (e.target === e.currentTarget) setDetailModal(null); }}>
          <div className="modal-card" style={{ maxWidth: "650px" }}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">HỒ SƠ MÓN ĂN · {detailModal.code}</span>
                <h3>{detailModal.name}</h3>
              </div>
              <button className="icon-button" onClick={() => setDetailModal(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Thông tin chính */}
            <div style={{ display: "flex", gap: "20px", marginTop: "16px", paddingBottom: "16px", borderBottom: "1px solid #f0f1ed" }}>
              {detailModal.imageUrl && (
                <div style={{ width: "130px", height: "130px", borderRadius: "10px", overflow: "hidden", flexShrink: 0 }}>
                  <img src={detailModal.imageUrl} alt={detailModal.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                </div>
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "13px", color: "#666" }}>Nhóm món: <strong>{detailModal.category}</strong></span>
                  <span className={`status-pill ${detailModal.status === "ACTIVE" ? "success" : "danger"}`}>
                    <i /> {detailModal.status === "ACTIVE" ? "Đang phục vụ" : "Tạm ngưng"}
                  </span>
                </div>
                <div style={{ fontSize: "20px", fontWeight: 700, color: "#c66b45", marginBottom: "8px" }}>
                  {detailModal.price.toLocaleString("vi-VN")} ₫ <small style={{ fontSize: "13px", color: "#666", fontWeight: 400 }}>/ {detailModal.unit}</small>
                </div>
                <p style={{ fontSize: "13px", color: "#555", margin: 0, lineHeight: 1.5 }}>
                  {detailModal.description || "Chưa có mô tả chi tiết."}
                </p>
              </div>
            </div>

            {/* Công thức định mức nguyên liệu (BOM) */}
            <div style={{ marginTop: "16px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <h4 style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#333" }}>
                  📋 Công thức định lượng nguyên vật liệu (BOM)
                </h4>
                <span style={{ fontSize: "12px", color: "#666" }}>
                  {detailModal.boms?.length ? `${detailModal.boms.length} phiên bản` : "Chưa cấu hình"}
                </span>
              </div>

              {detailModal.boms && detailModal.boms.length > 0 ? (
                <div style={{ background: "#fcfcfb", border: "1px solid #ecece8", borderRadius: "8px", padding: "12px" }}>
                  {detailModal.boms.map((bom) => (
                    <div key={bom.id} style={{ marginBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "13px", fontWeight: 600, marginBottom: "6px" }}>
                        <span>{bom.code} (v{bom.version}) · Chuẩn: {bom.outputQuantity} {detailModal.unit}</span>
                        <span className="status-pill success"><i /> {bom.status}</span>
                      </div>
                      <table style={{ width: "100%", fontSize: "12px", borderCollapse: "collapse" }}>
                        <thead>
                          <tr style={{ color: "#777", borderBottom: "1px solid #e5e5e0", textAlign: "left" }}>
                            <th style={{ padding: "4px 0" }}>Nguyên vật liệu</th>
                            <th style={{ padding: "4px 0" }}>Mã NVL</th>
                            <th style={{ padding: "4px 0", textAlign: "right" }}>Định lượng</th>
                          </tr>
                        </thead>
                        <tbody>
                          {bom.materials.map((m, idx) => (
                            <tr key={idx} style={{ borderBottom: "1px solid #f2f2ef" }}>
                              <td style={{ padding: "6px 0", fontWeight: 500 }}>{m.materialName}</td>
                              <td style={{ padding: "6px 0", color: "#888" }}>{m.materialCode}</td>
                              <td style={{ padding: "6px 0", textAlign: "right", fontWeight: 600 }}>
                                {m.quantity} {m.unitName}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  ))}
                </div>
              ) : (
                <div style={{ background: "#fffdf5", border: "1px solid #faeccb", borderRadius: "8px", padding: "12px", fontSize: "13px", color: "#8a6d3b" }}>
                  Món ăn này chưa có công thức định mức (BOM). Bạn có thể vào mục <strong>Sản xuất MRP → Công thức BOM</strong> để thiết lập nguyên vật liệu cấu thành.
                </div>
              )}
            </div>

            {/* Tồn kho tại các chi nhánh */}
            <div style={{ marginTop: "16px" }}>
              <h4 style={{ margin: "0 0 8px", fontSize: "14px", fontWeight: 600, color: "#333" }}>
                📦 Tồn kho thành phẩm hiện tại: <strong>{detailModal.totalStock} {detailModal.unit}</strong>
              </h4>
              {detailModal.stockLocations?.length ? (
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                  {detailModal.stockLocations.map((loc, i) => (
                    <div key={i} style={{ background: "#f8f9f7", padding: "8px 12px", borderRadius: "6px", fontSize: "12px" }}>
                      <div style={{ color: "#777" }}>{loc.branchName} · {loc.locationName}</div>
                      <strong style={{ fontSize: "14px", color: "#2b7a4b" }}>{loc.quantity} {detailModal.unit}</strong>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: "12px", color: "#999", margin: 0 }}>Chưa có thành phẩm nào lưu kho.</p>
              )}
            </div>

            <div className="modal-actions" style={{ marginTop: "24px" }}>
              <button
                className="button button-secondary"
                onClick={() => {
                  const item = products.find((p) => p.code === detailModal.code);
                  if (item) handleOpenEdit(item);
                  setDetailModal(null);
                }}
              >
                <Pencil size={15} /> Chỉnh sửa món
              </button>
              <button className="button button-primary" onClick={() => setDetailModal(null)}>
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
