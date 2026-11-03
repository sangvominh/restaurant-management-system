"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import {
  warehouseService,
  type IssueStatus,
  type MaterialAdjustment,
} from "@/services/warehouse-service";

const statusLabel = (status: IssueStatus) =>
  status === "PENDING"
    ? "Chờ duyệt"
    : status === "APPROVED"
      ? "Đã duyệt"
      : "Từ chối";
export default function MaterialAdjustmentManagement({
  type,
}: {
  type: "WASTE" | "RETURN";
}) {
  const title =
    type === "RETURN"
      ? "Hoàn trả nguyên vật liệu"
      : "Hao hụt / Hủy nguyên vật liệu";
  const [status, setStatus] = useState<IssueStatus>("PENDING");
  const [rows, setRows] = useState<MaterialAdjustment[]>([]);
  const [detail, setDetail] = useState<MaterialAdjustment | null>(null);
  const [quantity, setQuantity] = useState("");
  const [quality, setQuality] = useState("");
  const [note, setNote] = useState("");
  const [rejecting, setRejecting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setRows(await warehouseService.getAdjustments(type, status));
    } catch (cause) {
      setRows([]);
      setError(
        cause instanceof Error ? cause.message : "Không tải được phiếu.",
      );
    } finally {
      setLoading(false);
    }
  }, [type, status]);
  useEffect(() => {
    void load();
  }, [load]);
  async function open(code: string) {
    setError("");
    try {
      const item = await warehouseService.getAdjustment(code);
      setDetail(item);
      setQuantity(item.quantity);
      setQuality("");
      setNote("");
      setRejecting(false);
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Không tải được chi tiết.",
      );
    }
  }
  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!detail || saving) return;
    if (rejecting && !note.trim()) {
      setError("Phải nhập lý do từ chối.");
      return;
    }
    setSaving(true);
    setError("");
    try {
      if (rejecting)
        await warehouseService.rejectAdjustment(detail.code, note.trim());
      else
        await warehouseService.approveAdjustment(detail.code, {
          acceptedQuantity: quantity,
          ...(type === "RETURN" ? { qualityStatus: quality } : {}),
          ...(note.trim() ? { note: note.trim() } : {}),
        });
      setNotice(`Đã ${rejecting ? "từ chối" : "duyệt"} ${detail.code}.`);
      setDetail(null);
      await load();
    } catch (cause) {
      setError(
        cause instanceof Error ? cause.message : "Không xử lý được phiếu.",
      );
    } finally {
      setSaving(false);
    }
  }
  return (
    <>
      <div className="page-heading workspace-heading">
        <div>
          <h1>{title}</h1>
          <p>
            Phiếu do nhân viên gửi; chỉ thay đổi tồn khi Admin duyệt hợp lệ.
          </p>
        </div>
        <button
          className="button button-secondary"
          disabled={loading}
          onClick={() => void load()}
        >
          Tải lại
        </button>
      </div>
      {notice && (
        <div className="demo-banner success-banner" role="status">
          {notice}
        </div>
      )}
      {error && !detail && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <div className="tabs-row">
        {(["PENDING", "APPROVED", "REJECTED"] as const).map((value) => (
          <button
            key={value}
            className={`tab-button ${status === value ? "tab-active" : ""}`}
            onClick={() => setStatus(value)}
          >
            {statusLabel(value)}
          </button>
        ))}
      </div>
      <div className="panel workspace-table-panel">
        {loading ? (
          <div className="inventory-empty">Đang tải phiếu…</div>
        ) : !rows.length ? (
          <div className="inventory-empty">
            {error
              ? "Chưa tải được dữ liệu."
              : "Chưa có phiếu phù hợp từ nhân viên."}
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table workspace-table">
              <thead>
                <tr>
                  <th>MÃ PHIẾU</th>
                  <th>NVL / LÔ</th>
                  <th>CHI NHÁNH / VỊ TRÍ</th>
                  <th>ĐỀ NGHỊ / ĐÃ DUYỆT</th>
                  <th>NGUỒN</th>
                  <th>TRẠNG THÁI</th>
                  <th>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.code}>
                    <td>{row.code}</td>
                    <td>
                      {row.materialCode} · {row.materialName}
                      <small> · {row.lotCode}</small>
                    </td>
                    <td>
                      {row.branchCode} · {row.locationName}
                    </td>
                    <td>
                      {row.quantity} / {row.acceptedQuantity ?? "—"}{" "}
                      {row.unitName}
                    </td>
                    <td>
                      {row.source === "STOCK"
                        ? "Trong kho"
                        : `Đã lĩnh · ${row.issueCode}`}
                    </td>
                    <td>{statusLabel(row.status)}</td>
                    <td>
                      <button
                        className="code-link"
                        onClick={() => void open(row.code)}
                      >
                        Xem chi tiết
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      {detail && (
        <div className="modal-backdrop">
          <form
            className="modal-card"
            style={{ maxHeight: "90vh", overflowY: "auto" }}
            onSubmit={submit}
            role="dialog"
            aria-label="Chi tiết phiếu điều chỉnh"
          >
            <div className="modal-top">
              <h3>{detail.code}</h3>
              <button
                type="button"
                className="icon-button"
                aria-label="Đóng chi tiết"
                disabled={saving}
                onClick={() => setDetail(null)}
              >
                ×
              </button>
            </div>
            <div className="modal-items">
              <div>
                <span>NVL / lô</span>
                <strong>
                  {detail.materialCode} · {detail.materialName} ·{" "}
                  {detail.lotCode}
                </strong>
              </div>
              <div>
                <span>Chi nhánh / vị trí</span>
                <strong>
                  {detail.branchCode} · {detail.locationName}
                </strong>
              </div>
              <div>
                <span>Hạn sử dụng</span>
                <strong>
                  {detail.expiryDate
                    ? new Date(detail.expiryDate).toLocaleDateString("vi-VN", {
                        timeZone: "UTC",
                      })
                    : "Không có"}
                </strong>
              </div>
              <div>
                <span>Phiếu xuất gốc</span>
                <strong>{detail.issueCode ?? "NVL trong kho"}</strong>
              </div>
              <div>
                <span>Số lượng đề nghị</span>
                <strong>
                  {detail.quantity} {detail.unitName}
                </strong>
              </div>
              {detail.source === "ISSUED" && (
                <>
                  <div>
                    <span>Đã sử dụng (chốt)</span>
                    <strong>{detail.consumedQuantity ?? "Chưa có"}</strong>
                  </div>
                  <div>
                    <span>Còn được quyết toán</span>
                    <strong>
                      {detail.remainingQuantity ?? "Chưa xác định"}
                    </strong>
                  </div>
                </>
              )}
              <div>
                <span>Ngày tạo</span>
                <strong>
                  {new Date(detail.createdAt).toLocaleString("vi-VN", {
                    timeZone: "Asia/Ho_Chi_Minh",
                  })}
                </strong>
              </div>
            </div>
            <p className="modal-description">Lý do gửi: {detail.reason}</p>
            {detail.approvalBlockedReason && detail.status === "PENDING" && (
              <p className="form-error">
                Chờ tích hợp: {detail.approvalBlockedReason}
              </p>
            )}
            {detail.status === "PENDING" ? (
              <>
                {!rejecting && (
                  <>
                    <label className="form-field">
                      <span>
                        Số lượng {type === "RETURN" ? "thực nhận" : "ghi nhận"}{" "}
                        ({detail.unitName})
                      </span>
                      <input
                        type="number"
                        required
                        min="0.001"
                        step="0.001"
                        max={detail.quantity}
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                      />
                    </label>
                    {type === "RETURN" && (
                      <label className="form-field">
                        <span>Chất lượng thực nhận</span>
                        <select
                          required
                          value={quality}
                          onChange={(e) => setQuality(e.target.value)}
                        >
                          <option value="">Chọn kết quả kiểm tra</option>
                          <option value="ACCEPTABLE">Đạt yêu cầu</option>
                          <option value="UNACCEPTABLE">
                            Không đạt yêu cầu
                          </option>
                        </select>
                      </label>
                    )}
                  </>
                )}
                <label className="form-field">
                  <span>
                    {rejecting
                      ? "Lý do từ chối"
                      : "Ghi chú xử lý (bắt buộc nếu lệch số lượng)"}
                  </span>
                  <textarea
                    required={rejecting}
                    maxLength={500}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                </label>
                {error && (
                  <div className="form-error" role="alert">
                    {error}
                  </div>
                )}
                <div className="modal-actions">
                  {rejecting ? (
                    <button
                      type="button"
                      className="button button-secondary"
                      disabled={saving}
                      onClick={() => setRejecting(false)}
                    >
                      Quay lại
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="button button-secondary"
                      disabled={saving}
                      onClick={() => {
                        setRejecting(true);
                        setError("");
                      }}
                    >
                      Từ chối
                    </button>
                  )}
                  <button
                    type="submit"
                    className="button button-primary"
                    disabled={
                      saving || (!rejecting && !!detail.approvalBlockedReason)
                    }
                  >
                    {saving
                      ? "Đang xử lý…"
                      : rejecting
                        ? "Xác nhận từ chối"
                        : "Duyệt phiếu"}
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>Trạng thái: {statusLabel(detail.status)}</p>
                <p>
                  Thực nhận/ghi nhận: {detail.acceptedQuantity ?? "—"}{" "}
                  {detail.unitName}
                </p>
                <p>
                  Chất lượng:{" "}
                  {detail.qualityStatus === "ACCEPTABLE"
                    ? "Đạt yêu cầu"
                    : detail.qualityStatus === "UNACCEPTABLE"
                      ? "Không đạt yêu cầu"
                      : "—"}
                </p>
                <p>Ghi chú xử lý: {detail.decisionNote ?? "—"}</p>
                <p>
                  Thời điểm:{" "}
                  {detail.processedAt
                    ? new Date(detail.processedAt).toLocaleString("vi-VN", {
                        timeZone: "Asia/Ho_Chi_Minh",
                      })
                    : "—"}
                </p>
                {detail.movement && (
                  <p>
                    Giao dịch {detail.movement.movementType}:{" "}
                    {detail.movement.quantityChange} {detail.unitName}
                  </p>
                )}
              </>
            )}
          </form>
        </div>
      )}
    </>
  );
}
