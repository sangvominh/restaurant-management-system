"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Pencil, Plus, RefreshCw, Search, Trash2, X } from "lucide-react";
import { WarehouseApiError } from "@/services/api";
import { warehouseService, type Supplier } from "@/services/warehouse-service";

type SupplierForm = {
  code: string;
  name: string;
  phone: string;
  email: string;
  address: string;
};
const emptyForm: SupplierForm = {
  code: "",
  name: "",
  phone: "",
  email: "",
  address: "",
};

function errorMessage(error: unknown) {
  if (error instanceof WarehouseApiError) {
    if (error.status === 409)
      return `Dữ liệu bị trùng hoặc đang được sử dụng: ${error.message}`;
    if (error.status === 404) return `Không tìm thấy dữ liệu: ${error.message}`;
    if (error.status === 400) return `Thông tin chưa hợp lệ: ${error.message}`;
    return error.message;
  }
  return "Đã xảy ra lỗi khi xử lý nhà cung cấp.";
}

export default function SupplierManagement() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [search, setSearch] = useState("");
  const [form, setForm] = useState<SupplierForm | null>(null);
  const [editingCode, setEditingCode] = useState<string | null>(null);
  const [detail, setDetail] = useState<Supplier | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const load = useCallback(async (keyword: string) => {
    setLoading(true);
    setError("");
    try {
      setSuppliers(await warehouseService.getSuppliers(keyword));
    } catch (cause) {
      setError(errorMessage(cause));
      setSuppliers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load("");
  }, [load]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form || saving) return;
    setSaving(true);
    setError("");
    try {
      const data = {
        name: form.name.trim(),
        phone: form.phone.trim() || null,
        email: form.email.trim() || null,
        address: form.address.trim() || null,
      };
      if (editingCode) await warehouseService.updateSupplier(editingCode, data);
      else
        await warehouseService.createSupplier({
          ...data,
          code: form.code.trim(),
        });
      setNotice(
        editingCode ? "Đã cập nhật nhà cung cấp." : "Đã thêm nhà cung cấp.",
      );
      setForm(null);
      setEditingCode(null);
      await load(search);
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  }

  async function remove(supplier: Supplier) {
    if (saving) return;
    if (
      !window.confirm(`Xóa nhà cung cấp ${supplier.code} — ${supplier.name}?`)
    )
      return;
    setSaving(true);
    setError("");
    try {
      await warehouseService.deleteSupplier(supplier.code);
      setNotice("Đã xóa nhà cung cấp.");
      await load(search);
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  }

  async function showDetail(code: string) {
    setError("");
    try {
      setDetail(await warehouseService.getSupplier(code));
    } catch (cause) {
      setError(errorMessage(cause));
    }
  }

  return (
    <>
      <div className="page-heading workspace-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> KHO VẬN{" "}
            <span className="crumb-slash">/</span> NHÀ CUNG CẤP
          </div>
          <h1>Quản lý nhà cung cấp</h1>
          <p>Danh sách nhà cung cấp nguyên vật liệu từ hệ thống kho.</p>
        </div>
        <button
          className="button button-primary"
          onClick={() => {
            setForm({ ...emptyForm });
            setEditingCode(null);
            setError("");
          }}
        >
          <Plus size={16} /> Thêm nhà cung cấp
        </button>
      </div>
      {notice && (
        <div className="demo-banner success-banner">
          <span>{notice}</span>
          <button onClick={() => setNotice("")} aria-label="Đóng">
            ×
          </button>
        </div>
      )}
      {error && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <div className="panel workspace-table-panel">
        <div className="table-toolbar">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") void load(search);
              }}
              placeholder="Tìm mã, tên, điện thoại hoặc email"
            />
          </div>
          <div className="toolbar-controls">
            <button
              className="button button-secondary"
              onClick={() => void load(search)}
              disabled={loading}
            >
              <RefreshCw size={14} /> Tải lại
            </button>
          </div>
        </div>
        {loading ? (
          <div className="inventory-empty">Đang tải nhà cung cấp…</div>
        ) : suppliers.length === 0 ? (
          <div className="inventory-empty">
            <strong>
              {error
                ? "Không thể tải danh sách."
                : "Chưa có nhà cung cấp phù hợp."}
            </strong>
            <span>Dữ liệu hiển thị lấy từ Backend.</span>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table workspace-table">
              <thead>
                <tr>
                  <th>MÃ NCC</th>
                  <th>TÊN NHÀ CUNG CẤP</th>
                  <th>ĐIỆN THOẠI</th>
                  <th>EMAIL</th>
                  <th>ĐỊA CHỈ</th>
                  <th>TRẠNG THÁI</th>
                  <th>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {suppliers.map((supplier) => (
                  <tr key={supplier.code}>
                    <td>
                      <button
                        className="code-link"
                        onClick={() => void showDetail(supplier.code)}
                      >
                        {supplier.code}
                      </button>
                    </td>
                    <td>{supplier.name}</td>
                    <td>{supplier.phone || "—"}</td>
                    <td>{supplier.email || "—"}</td>
                    <td>{supplier.address || "—"}</td>
                    <td>
                      {supplier.status === "ACTIVE"
                        ? "Đang hoạt động"
                        : "Ngừng hoạt động"}
                    </td>
                    <td>
                      <button
                        className="row-action"
                        aria-label="Sửa"
                        title="Sửa"
                        onClick={() => {
                          setEditingCode(supplier.code);
                          setForm({
                            code: supplier.code,
                            name: supplier.name,
                            phone: supplier.phone ?? "",
                            email: supplier.email ?? "",
                            address: supplier.address ?? "",
                          });
                        }}
                      >
                        <Pencil size={14} />
                      </button>
                      <button
                        className="row-action"
                        aria-label="Xóa"
                        title="Xóa"
                        onClick={() => void remove(supplier)}
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {form && (
        <div className="modal-backdrop">
          <form className="modal-card" onSubmit={submit}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">DỮ LIỆU NHÀ CUNG CẤP</span>
                <h3>
                  {editingCode
                    ? `Cập nhật ${editingCode}`
                    : "Thêm nhà cung cấp"}
                </h3>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setForm(null)}
                aria-label="Đóng"
              >
                <X size={17} />
              </button>
            </div>
            <label className="form-field">
              <span>Mã nhà cung cấp</span>
              <input
                required
                maxLength={30}
                disabled={Boolean(editingCode)}
                value={form.code}
                onChange={(event) =>
                  setForm({ ...form, code: event.target.value.toUpperCase() })
                }
                placeholder="NCC001"
              />
            </label>
            <label className="form-field">
              <span>Tên nhà cung cấp</span>
              <input
                required
                maxLength={200}
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
              />
            </label>
            <label className="form-field">
              <span>Điện thoại</span>
              <input
                value={form.phone}
                onChange={(event) =>
                  setForm({ ...form, phone: event.target.value })
                }
              />
            </label>
            <label className="form-field">
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={(event) =>
                  setForm({ ...form, email: event.target.value })
                }
              />
            </label>
            <label className="form-field">
              <span>Địa chỉ</span>
              <textarea
                rows={2}
                value={form.address}
                onChange={(event) =>
                  setForm({ ...form, address: event.target.value })
                }
              />
            </label>
            {error && (
              <p className="form-error" role="alert">
                {error}
              </p>
            )}
            <div className="modal-actions">
              <button
                type="button"
                className="button button-secondary"
                onClick={() => setForm(null)}
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
      {detail && (
        <div
          className="modal-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) setDetail(null);
          }}
        >
          <div className="modal-card">
            <div className="modal-top">
              <div>
                <span className="modal-kicker">CHI TIẾT NHÀ CUNG CẤP</span>
                <h3>{detail.code}</h3>
              </div>
              <button
                className="icon-button"
                onClick={() => setDetail(null)}
                aria-label="Đóng"
              >
                <X size={17} />
              </button>
            </div>
            <div className="modal-items">
              <div>
                <span>Tên</span>
                <strong>{detail.name}</strong>
              </div>
              <div>
                <span>Điện thoại</span>
                <strong>{detail.phone || "—"}</strong>
              </div>
              <div>
                <span>Email</span>
                <strong>{detail.email || "—"}</strong>
              </div>
              <div>
                <span>Địa chỉ</span>
                <strong>{detail.address || "—"}</strong>
              </div>
              <div>
                <span>Trạng thái</span>
                <strong>{detail.status}</strong>
              </div>
            </div>
            <div className="modal-actions">
              <button
                className="button button-primary"
                onClick={() => setDetail(null)}
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
