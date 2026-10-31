"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, RefreshCw, Search, X } from "lucide-react";
import { WarehouseApiError } from "@/services/api";
import {
  warehouseService,
  type Category,
  type CategoryType,
  type MaterialRecord,
  type Unit,
} from "@/services/warehouse-service";

type MaterialForm = {
  code: string;
  name: string;
  categoryCode: string;
  unitName: string;
  minStock: string;
  status: "ACTIVE" | "INACTIVE";
};
type CategoryForm = {
  code: string;
  name: string;
  categoryType: CategoryType;
  status: "ACTIVE" | "INACTIVE";
};
const blankMaterial: MaterialForm = {
  code: "",
  name: "",
  categoryCode: "",
  unitName: "",
  minStock: "0",
  status: "ACTIVE",
};

function errorMessage(error: unknown) {
  if (error instanceof WarehouseApiError)
    return error.status === 409
      ? `Dữ liệu trùng hoặc đang được sử dụng: ${error.message}`
      : error.status === 404
        ? `Không tìm thấy dữ liệu: ${error.message}`
        : error.status === 400
          ? `Thông tin chưa hợp lệ: ${error.message}`
          : error.message;
  return "Không thể xử lý danh mục hoặc nguyên vật liệu.";
}

export default function MaterialManagement() {
  const [materials, setMaterials] = useState<MaterialRecord[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [search, setSearch] = useState("");
  const [materialForm, setMaterialForm] = useState<MaterialForm | null>(null);
  const [categoryForm, setCategoryForm] = useState<CategoryForm | null>(null);
  const [editingMaterial, setEditingMaterial] = useState<string | null>(null);
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async (keyword: string) => {
    setLoading(true);
    setError("");
    try {
      const [nextMaterials, nextCategories, nextUnits] = await Promise.all([
        warehouseService.getMaterials(keyword),
        warehouseService.getCategories(),
        warehouseService.getUnits(),
      ]);
      setMaterials(nextMaterials);
      setCategories(nextCategories);
      setUnits(nextUnits);
    } catch (cause) {
      setError(errorMessage(cause));
      setMaterials([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load("");
  }, [load]);

  async function saveMaterial(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!materialForm || saving) return;
    setSaving(true);
    setError("");
    try {
      const category = categories.find(
        (item) => item.code === materialForm.categoryCode,
      );
      if (editingMaterial) {
        await warehouseService.updateMaterial(editingMaterial, {
          name: materialForm.name.trim(),
          minStock: materialForm.minStock,
          status: materialForm.status,
        });
      } else if (category) {
        await warehouseService.createMaterial({
          code: materialForm.code.trim().toUpperCase(),
          name: materialForm.name.trim(),
          categoryName: category.name,
          categoryType: category.categoryType,
          unitName: materialForm.unitName,
          minStock: materialForm.minStock,
        });
      }
      setNotice(
        editingMaterial
          ? "Đã cập nhật nguyên vật liệu."
          : "Đã thêm nguyên vật liệu.",
      );
      setMaterialForm(null);
      setEditingMaterial(null);
      await load(search);
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  }

  async function saveCategory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!categoryForm || saving) return;
    setSaving(true);
    setError("");
    try {
      if (editingCategory)
        await warehouseService.updateCategory(editingCategory, {
          name: categoryForm.name.trim(),
          status: categoryForm.status,
        });
      else
        await warehouseService.createCategory({
          code: categoryForm.code.trim().toUpperCase(),
          name: categoryForm.name.trim(),
          categoryType: categoryForm.categoryType,
        });
      setNotice(
        editingCategory ? "Đã cập nhật danh mục." : "Đã thêm danh mục.",
      );
      setCategoryForm(null);
      setEditingCategory(null);
      await load(search);
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  }

  function openMaterial(item?: MaterialRecord) {
    setError("");
    if (!item) {
      const category = categories.find((entry) => entry.status === "ACTIVE");
      setEditingMaterial(null);
      setMaterialForm({
        ...blankMaterial,
        categoryCode: category?.code ?? "",
        unitName: units[0]?.name ?? "",
      });
    } else {
      const category = categories.find(
        (entry) => entry.name === item.categoryName,
      );
      setEditingMaterial(item.code);
      setMaterialForm({
        code: item.code,
        name: item.name,
        categoryCode: category?.code ?? "",
        unitName: item.unitName,
        minStock: item.minStock,
        status: item.status,
      });
    }
  }

  return (
    <>
      <div className="page-heading workspace-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> KHO VẬN{" "}
            <span className="crumb-slash">/</span> DANH MỤC NGUYÊN VẬT LIỆU
          </div>
          <h1>Danh mục & nguyên vật liệu</h1>
          <p>Quản lý danh mục, đơn vị tính và định mức tồn tối thiểu.</p>
        </div>
        <div className="heading-actions">
          <button
            className="button button-secondary"
            onClick={() => {
              setError("");
              setEditingCategory(null);
              setCategoryForm({
                code: "",
                name: "",
                categoryType: "MATERIAL",
                status: "ACTIVE",
              });
            }}
          >
            <Plus size={15} /> Thêm danh mục
          </button>
          <button
            className="button button-primary"
            onClick={() => openMaterial()}
          >
            <Plus size={15} /> Thêm nguyên vật liệu
          </button>
        </div>
      </div>
      {notice && (
        <div className="demo-banner success-banner">
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Đóng">
            ×
          </button>
        </div>
      )}
      {error && !materialForm && !categoryForm && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <section className="panel workspace-table-panel">
        <div className="panel-header">
          <div>
            <h2>Danh mục NVL</h2>
            <p>Loại danh mục theo các giá trị Backend hỗ trợ.</p>
          </div>
        </div>
        {loading ? (
          <div className="inventory-empty">Đang tải danh mục…</div>
        ) : categories.length === 0 ? (
          <div className="inventory-empty">
            <strong>Chưa có danh mục.</strong>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table workspace-table">
              <thead>
                <tr>
                  <th>MÃ DANH MỤC</th>
                  <th>TÊN DANH MỤC</th>
                  <th>LOẠI</th>
                  <th>TRẠNG THÁI</th>
                  <th>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((item) => (
                  <tr key={item.code}>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.categoryType}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="row-action"
                        aria-label={`Sửa ${item.code}`}
                        onClick={() => {
                          setEditingCategory(item.code);
                          setCategoryForm({
                            code: item.code,
                            name: item.name,
                            categoryType: item.categoryType,
                            status: item.status,
                          });
                        }}
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
      <section
        className="panel workspace-table-panel"
        style={{ marginTop: 14 }}
      >
        <div className="panel-header">
          <div>
            <h2>Nguyên vật liệu</h2>
            <p>Không chỉnh sửa tồn kho trực tiếp tại danh mục.</p>
          </div>
          <button
            className="button button-secondary"
            onClick={() => void load(search)}
            disabled={loading}
          >
            <RefreshCw size={14} /> Làm mới
          </button>
        </div>
        <div className="table-toolbar">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void load(search);
              }}
              placeholder="Tìm mã hoặc tên nguyên vật liệu"
            />
          </div>
        </div>
        {loading ? (
          <div className="inventory-empty">Đang tải nguyên vật liệu…</div>
        ) : materials.length === 0 ? (
          <div className="inventory-empty">
            <strong>Chưa có nguyên vật liệu phù hợp.</strong>
            <span>Dữ liệu được tải từ Backend.</span>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table workspace-table">
              <thead>
                <tr>
                  <th>MÃ NVL</th>
                  <th>TÊN NVL</th>
                  <th>DANH MỤC</th>
                  <th>ĐƠN VỊ CƠ SỞ</th>
                  <th>TỒN TỐI THIỂU</th>
                  <th>TRẠNG THÁI</th>
                  <th>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {materials.map((item) => (
                  <tr key={item.code}>
                    <td>{item.code}</td>
                    <td>{item.name}</td>
                    <td>{item.categoryName}</td>
                    <td>{item.unitName}</td>
                    <td>{item.minStock}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="row-action"
                        aria-label={`Sửa ${item.code}`}
                        onClick={() => openMaterial(item)}
                      >
                        <Pencil size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {materialForm && (
        <div className="modal-backdrop">
          <form className="modal-card" onSubmit={saveMaterial}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">DANH MỤC NVL</span>
                <h3>
                  {editingMaterial
                    ? `Cập nhật ${editingMaterial}`
                    : "Thêm nguyên vật liệu"}
                </h3>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setMaterialForm(null)}
                aria-label="Đóng"
              >
                <X size={17} />
              </button>
            </div>
            <label className="form-field">
              <span>Mã NVL</span>
              <input
                required
                maxLength={30}
                disabled={Boolean(editingMaterial)}
                value={materialForm.code}
                onChange={(event) =>
                  setMaterialForm({
                    ...materialForm,
                    code: event.target.value.toUpperCase(),
                  })
                }
                placeholder="NVL001"
              />
            </label>
            <label className="form-field">
              <span>Tên nguyên vật liệu</span>
              <input
                required
                maxLength={200}
                value={materialForm.name}
                onChange={(event) =>
                  setMaterialForm({ ...materialForm, name: event.target.value })
                }
              />
            </label>
            {!editingMaterial && (
              <>
                <label className="form-field">
                  <span>Danh mục</span>
                  <select
                    required
                    value={materialForm.categoryCode}
                    onChange={(event) =>
                      setMaterialForm({
                        ...materialForm,
                        categoryCode: event.target.value,
                      })
                    }
                  >
                    <option value="">Chọn danh mục</option>
                    {categories
                      .filter((item) => item.status === "ACTIVE")
                      .map((item) => (
                        <option key={item.code} value={item.code}>
                          {item.code} · {item.name} ({item.categoryType})
                        </option>
                      ))}
                  </select>
                </label>
                <label className="form-field">
                  <span>Đơn vị cơ sở</span>
                  <select
                    required
                    value={materialForm.unitName}
                    onChange={(event) =>
                      setMaterialForm({
                        ...materialForm,
                        unitName: event.target.value,
                      })
                    }
                  >
                    <option value="">Chọn đơn vị</option>
                    {units.map((item) => (
                      <option key={item.id} value={item.name}>
                        {item.name}
                      </option>
                    ))}
                  </select>
                </label>
              </>
            )}
            <label className="form-field">
              <span>Tồn tối thiểu</span>
              <input
                required
                type="number"
                min="0"
                step="0.001"
                value={materialForm.minStock}
                onChange={(event) =>
                  setMaterialForm({
                    ...materialForm,
                    minStock: event.target.value,
                  })
                }
              />
            </label>
            {editingMaterial && (
              <label className="form-field">
                <span>Trạng thái</span>
                <select
                  value={materialForm.status}
                  onChange={(event) =>
                    setMaterialForm({
                      ...materialForm,
                      status: event.target.value as MaterialForm["status"],
                    })
                  }
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </label>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="modal-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setMaterialForm(null)}
              >
                Hủy
              </button>
              <button className="button button-primary" disabled={saving}>
                {saving ? "Đang lưu…" : "Lưu"}
              </button>
            </div>
          </form>
        </div>
      )}

      {categoryForm && (
        <div className="modal-backdrop">
          <form className="modal-card" onSubmit={saveCategory}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">DANH MỤC NGUYÊN VẬT LIỆU</span>
                <h3>
                  {editingCategory
                    ? `Cập nhật ${editingCategory}`
                    : "Thêm danh mục"}
                </h3>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setCategoryForm(null)}
                aria-label="Đóng"
              >
                <X size={17} />
              </button>
            </div>
            <label className="form-field">
              <span>Mã danh mục</span>
              <input
                required
                maxLength={20}
                disabled={Boolean(editingCategory)}
                value={categoryForm.code}
                onChange={(event) =>
                  setCategoryForm({
                    ...categoryForm,
                    code: event.target.value.toUpperCase(),
                  })
                }
                placeholder="DM001"
              />
            </label>
            <label className="form-field">
              <span>Tên danh mục</span>
              <input
                required
                maxLength={100}
                value={categoryForm.name}
                onChange={(event) =>
                  setCategoryForm({ ...categoryForm, name: event.target.value })
                }
              />
            </label>
            {!editingCategory && (
              <label className="form-field">
                <span>Loại danh mục</span>
                <select
                  value={categoryForm.categoryType}
                  onChange={(event) =>
                    setCategoryForm({
                      ...categoryForm,
                      categoryType: event.target.value as CategoryType,
                    })
                  }
                >
                  <option value="MATERIAL">MATERIAL</option>
                  <option value="RAW_MATERIAL">RAW_MATERIAL</option>
                </select>
              </label>
            )}
            {editingCategory && (
              <label className="form-field">
                <span>Trạng thái</span>
                <select
                  value={categoryForm.status}
                  onChange={(event) =>
                    setCategoryForm({
                      ...categoryForm,
                      status: event.target.value as CategoryForm["status"],
                    })
                  }
                >
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="INACTIVE">INACTIVE</option>
                </select>
              </label>
            )}
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="modal-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setCategoryForm(null)}
              >
                Hủy
              </button>
              <button className="button button-primary" disabled={saving}>
                {saving ? "Đang lưu…" : "Lưu"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
