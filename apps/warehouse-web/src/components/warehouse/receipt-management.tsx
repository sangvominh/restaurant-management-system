"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Eye, Plus, RefreshCw, Search, X } from "lucide-react";
import { WarehouseApiError } from "@/services/api";
import {
  warehouseService,
  type MaterialRecord,
  type Receipt,
  type ReceiptDetail,
  type Supplier,
  type Unit,
} from "@/services/warehouse-service";

type ReceiptLine = {
  materialCode: string;
  lotCode: string;
  expiryDate: string;
  locationName: string;
  unitName: string;
  quantity: string;
  unitPrice: string;
};
const emptyLine: ReceiptLine = {
  materialCode: "",
  lotCode: "",
  expiryDate: "",
  locationName: "",
  unitName: "",
  quantity: "1",
  unitPrice: "",
};
const dateLabel = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));

function errorMessage(error: unknown) {
  if (error instanceof WarehouseApiError)
    return error.status === 409
      ? `Phiếu bị trùng hoặc giao dịch xung đột: ${error.message}`
      : error.status === 404
        ? `Không tìm thấy dữ liệu: ${error.message}`
        : error.status === 400
          ? `Thông tin chưa hợp lệ: ${error.message}`
          : error.message;
  return "Không thể xử lý phiếu nhập kho.";
}

export default function ReceiptManagement() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [materials, setMaterials] = useState<MaterialRecord[]>([]);
  const [units, setUnits] = useState<Unit[]>([]);
  const [supplierCode, setSupplierCode] = useState("");
  const [branchCode, setBranchCode] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [formOpen, setFormOpen] = useState(false);
  const [receiptCode, setReceiptCode] = useState("");
  const [formSupplier, setFormSupplier] = useState("");
  const [formBranch, setFormBranch] = useState("");
  const [note, setNote] = useState("");
  const [lines, setLines] = useState<ReceiptLine[]>([{ ...emptyLine }]);
  const [detail, setDetail] = useState<ReceiptDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function load() {
    setLoading(true);
    setError("");
    try {
      const data = await warehouseService.getReceipts({
        supplierCode,
        branchCode,
        from,
        to,
      });
      setReceipts(data);
    } catch (cause) {
      setError(errorMessage(cause));
      setReceipts([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Promise.all([
      warehouseService.getSuppliers(),
      warehouseService.getMaterials(),
      warehouseService.getUnits(),
    ])
      .then(([supplierRows, materialRows, unitRows]) => {
        setSuppliers(supplierRows);
        setMaterials(materialRows.filter((item) => item.status === "ACTIVE"));
        setUnits(unitRows);
      })
      .catch((cause: unknown) => setError(errorMessage(cause)));
    void load();
    // Load dropdown data once; list filters are applied explicitly.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function openForm() {
    setError("");
    setReceiptCode("");
    setFormSupplier(suppliers[0]?.code ?? "");
    setFormBranch("");
    setNote("");
    setLines([
      {
        ...emptyLine,
        materialCode: materials[0]?.code ?? "",
        unitName: materials[0]?.unitName ?? "",
      },
    ]);
    setFormOpen(true);
  }

  function updateLine(index: number, update: Partial<ReceiptLine>) {
    setLines((current) =>
      current.map((line, lineIndex) =>
        lineIndex === index ? { ...line, ...update } : line,
      ),
    );
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (saving) return;
    if (
      lines.some(
        (line) =>
          !line.materialCode ||
          !line.lotCode.trim() ||
          !line.locationName.trim() ||
          !line.unitName ||
          Number(line.quantity) <= 0 ||
          Number(line.unitPrice) < 0,
      )
    ) {
      setError(
        "Mỗi dòng cần NVL, mã lô, vị trí, đơn vị, số lượng dương và đơn giá hợp lệ.",
      );
      return;
    }
    setSaving(true);
    setError("");
    try {
      await warehouseService.createReceipt({
        receiptCode: receiptCode.trim().toUpperCase(),
        supplierCode: formSupplier,
        branchCode: formBranch.trim(),
        note: note.trim() || undefined,
        details: lines.map((line) => ({
          materialCode: line.materialCode,
          lotCode: line.lotCode.trim(),
          ...(line.expiryDate ? { expiryDate: line.expiryDate } : {}),
          locationName: line.locationName.trim(),
          unitName: line.unitName,
          quantity: line.quantity,
          unitPrice: line.unitPrice,
        })),
      });
      setNotice("Đã nhập kho. Tồn kho và lịch sử giao dịch đã được cập nhật.");
      setFormOpen(false);
      await load();
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setSaving(false);
    }
  }

  async function showDetail(code: string) {
    setError("");
    try {
      setDetail(await warehouseService.getReceipt(code));
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
            <span className="crumb-slash">/</span> NHẬP KHO
          </div>
          <h1>Quản lý nhập kho NVL</h1>
          <p>
            Tạo và tra cứu phiếu nhập; phiếu được ghi nhận ngay vào tồn kho.
          </p>
        </div>
        <button className="button button-primary" onClick={openForm}>
          <Plus size={16} /> Tạo phiếu nhập
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
      {error && !formOpen && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <div className="panel workspace-table-panel">
        <div className="table-toolbar">
          <div className="toolbar-search">
            <Search size={16} />
            <input
              value={supplierCode}
              onChange={(event) => setSupplierCode(event.target.value)}
              placeholder="Mã nhà cung cấp (lọc)"
              aria-label="Mã nhà cung cấp"
            />
            <input
              value={branchCode}
              onChange={(event) => setBranchCode(event.target.value)}
              placeholder="Mã chi nhánh (lọc)"
              aria-label="Mã chi nhánh"
            />
            <input
              type="date"
              value={from}
              onChange={(event) => setFrom(event.target.value)}
              aria-label="Từ ngày"
            />
            <input
              type="date"
              value={to}
              onChange={(event) => setTo(event.target.value)}
              aria-label="Đến ngày"
            />
            <button
              className="button button-secondary"
              onClick={() => void load()}
              disabled={loading}
            >
              Lọc
            </button>
            <button
              className="row-action"
              onClick={() => {
                setSupplierCode("");
                setBranchCode("");
                setFrom("");
                setTo("");
              }}
              aria-label="Xóa bộ lọc"
            >
              <X size={14} />
            </button>
          </div>
          <div className="toolbar-controls">
            <button
              className="button button-secondary"
              onClick={() => void load()}
              disabled={loading}
            >
              <RefreshCw size={14} /> Tải lại
            </button>
          </div>
        </div>
        {loading ? (
          <div className="inventory-empty">Đang tải phiếu nhập…</div>
        ) : receipts.length === 0 ? (
          <div className="inventory-empty">
            <strong>
              {error
                ? "Không thể tải danh sách."
                : "Chưa có phiếu nhập phù hợp."}
            </strong>
            <span>Danh sách lấy từ PostgreSQL qua Backend.</span>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table workspace-table">
              <thead>
                <tr>
                  <th>MÃ PHIẾU</th>
                  <th>NHÀ CUNG CẤP</th>
                  <th>CHI NHÁNH</th>
                  <th>NGÀY NHẬP</th>
                  <th>SỐ MẶT HÀNG</th>
                  <th>TRẠNG THÁI</th>
                  <th>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {receipts.map((item) => (
                  <tr key={item.receiptCode}>
                    <td>
                      <button
                        className="code-link"
                        onClick={() => void showDetail(item.receiptCode)}
                      >
                        {item.receiptCode}
                      </button>
                    </td>
                    <td>{item.supplierName}</td>
                    <td>
                      {item.branchName} <small>({item.branchCode})</small>
                    </td>
                    <td>{dateLabel(item.createdAt)}</td>
                    <td>{item.totalItems}</td>
                    <td>{item.status}</td>
                    <td>
                      <button
                        className="row-action"
                        aria-label="Xem chi tiết"
                        onClick={() => void showDetail(item.receiptCode)}
                      >
                        <Eye size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {formOpen && (
        <div className="modal-backdrop">
          <form
            className="modal-card"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              width: "min(720px, 100%)",
            }}
            onSubmit={submit}
          >
            <div className="modal-top">
              <div>
                <span className="modal-kicker">PHIẾU NHẬP KHO</span>
                <h3>Tạo phiếu nhập</h3>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => setFormOpen(false)}
                aria-label="Đóng"
              >
                <X size={17} />
              </button>
            </div>
            <label className="form-field">
              <span>Mã phiếu</span>
              <input
                required
                maxLength={50}
                value={receiptCode}
                onChange={(event) =>
                  setReceiptCode(event.target.value.toUpperCase())
                }
                placeholder="PN-20261031-001"
              />
            </label>
            <label className="form-field">
              <span>Nhà cung cấp</span>
              <select
                required
                value={formSupplier}
                onChange={(event) => setFormSupplier(event.target.value)}
              >
                <option value="">Chọn nhà cung cấp</option>
                {suppliers
                  .filter((item) => item.status === "ACTIVE")
                  .map((item) => (
                    <option key={item.code} value={item.code}>
                      {item.code} · {item.name}
                    </option>
                  ))}
              </select>
            </label>
            <label className="form-field">
              <span>Mã chi nhánh</span>
              <input
                required
                value={formBranch}
                onChange={(event) =>
                  setFormBranch(event.target.value.toUpperCase())
                }
                placeholder="Nhập mã chi nhánh đã cấu hình"
              />
            </label>
            {lines.map((line, index) => (
              <fieldset
                key={index}
                style={{
                  border: "1px solid #e8e8e3",
                  borderRadius: 8,
                  padding: 10,
                  margin: "12px 0",
                }}
              >
                <legend>Dòng NVL {index + 1}</legend>
                <label className="form-field">
                  <span>Nguyên vật liệu</span>
                  <select
                    required
                    value={line.materialCode}
                    onChange={(event) => {
                      const material = materials.find(
                        (item) => item.code === event.target.value,
                      );
                      updateLine(index, {
                        materialCode: event.target.value,
                        unitName: material?.unitName ?? "",
                      });
                    }}
                  >
                    <option value="">Chọn NVL</option>
                    {materials.map((item) => (
                      <option key={item.code} value={item.code}>
                        {item.code} · {item.name}
                      </option>
                    ))}
                  </select>
                </label>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2,minmax(0,1fr))",
                    gap: 10,
                  }}
                >
                  <label className="form-field">
                    <span>Mã lô</span>
                    <input
                      required
                      value={line.lotCode}
                      onChange={(event) =>
                        updateLine(index, { lotCode: event.target.value })
                      }
                    />
                  </label>
                  <label className="form-field">
                    <span>Hạn sử dụng</span>
                    <input
                      type="date"
                      value={line.expiryDate}
                      onChange={(event) =>
                        updateLine(index, { expiryDate: event.target.value })
                      }
                    />
                  </label>
                  <label className="form-field">
                    <span>Vị trí kho</span>
                    <input
                      required
                      value={line.locationName}
                      onChange={(event) =>
                        updateLine(index, { locationName: event.target.value })
                      }
                      placeholder="Tên vị trí thuộc chi nhánh"
                    />
                  </label>
                  <label className="form-field">
                    <span>Đơn vị</span>
                    <select
                      required
                      value={line.unitName}
                      onChange={(event) =>
                        updateLine(index, { unitName: event.target.value })
                      }
                    >
                      <option value="">Chọn đơn vị</option>
                      {units.map((unit) => (
                        <option key={unit.id} value={unit.name}>
                          {unit.name}
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="form-field">
                    <span>Số lượng</span>
                    <input
                      required
                      type="number"
                      min="0.001"
                      step="0.001"
                      value={line.quantity}
                      onChange={(event) =>
                        updateLine(index, { quantity: event.target.value })
                      }
                    />
                  </label>
                  <label className="form-field">
                    <span>Đơn giá</span>
                    <input
                      required
                      type="number"
                      min="0"
                      step="0.01"
                      value={line.unitPrice}
                      onChange={(event) =>
                        updateLine(index, { unitPrice: event.target.value })
                      }
                    />
                  </label>
                </div>
                {lines.length > 1 && (
                  <button
                    type="button"
                    className="button button-secondary"
                    onClick={() =>
                      setLines((current) =>
                        current.filter((_, row) => row !== index),
                      )
                    }
                  >
                    Xóa dòng
                  </button>
                )}
              </fieldset>
            ))}
            <button
              type="button"
              className="button button-secondary"
              onClick={() =>
                setLines((current) => [
                  ...current,
                  {
                    ...emptyLine,
                    materialCode: materials[0]?.code ?? "",
                    unitName: materials[0]?.unitName ?? "",
                  },
                ])
              }
            >
              <Plus size={14} /> Thêm dòng NVL
            </button>
            <label className="form-field">
              <span>Ghi chú</span>
              <textarea
                maxLength={500}
                rows={2}
                value={note}
                onChange={(event) => setNote(event.target.value)}
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
                onClick={() => setFormOpen(false)}
              >
                Hủy
              </button>
              <button
                className="button button-primary"
                disabled={
                  saving ||
                  suppliers.length === 0 ||
                  materials.length === 0 ||
                  units.length === 0
                }
              >
                {saving ? "Đang ghi nhận…" : "Nhập kho"}
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
          <div
            className="modal-card"
            style={{
              maxHeight: "90vh",
              overflowY: "auto",
              width: "min(650px, 100%)",
            }}
          >
            <div className="modal-top">
              <div>
                <span className="modal-kicker">
                  CHI TIẾT PHIẾU NHẬP · {detail.status}
                </span>
                <h3>{detail.receiptCode}</h3>
              </div>
              <button
                className="icon-button"
                onClick={() => setDetail(null)}
                aria-label="Đóng"
              >
                <X size={17} />
              </button>
            </div>
            <div className="modal-meta">
              <span>Nhà cung cấp: {detail.supplierName}</span>
              <span>Chi nhánh: {detail.branchName}</span>
              <span>Ngày nhập: {dateLabel(detail.createdAt)}</span>
              {detail.note && <span>Ghi chú: {detail.note}</span>}
            </div>
            <div className="modal-items">
              {detail.details.map((line, index) => (
                <div key={`${line.materialCode}-${line.lotCode}-${index}`}>
                  <span>
                    {line.materialCode} · {line.materialName} · Lô{" "}
                    {line.lotCode} · {line.quantity} {line.unitName}
                  </span>
                  <strong>
                    {Number(line.unitPrice).toLocaleString("vi-VN")} ₫
                  </strong>
                </div>
              ))}
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
