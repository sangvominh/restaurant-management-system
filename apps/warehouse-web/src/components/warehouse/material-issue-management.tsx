"use client";

import { useEffect, useState, type FormEvent } from "react";
import { Check, Eye, RefreshCw, X } from "lucide-react";
import { WarehouseApiError } from "@/services/api";
import {
  warehouseService,
  type IssueStatus,
  type MaterialIssue,
  type MaterialIssueDetail,
} from "@/services/warehouse-service";

const tabs: Array<{ label: string; value: IssueStatus }> = [
  { label: "Chờ duyệt", value: "PENDING" },
  { label: "Đã duyệt", value: "APPROVED" },
  { label: "Từ chối", value: "REJECTED" },
];
const labelFor = (status: IssueStatus) =>
  status === "PENDING"
    ? "Chờ duyệt"
    : status === "APPROVED"
      ? "Đã duyệt"
      : "Từ chối";
const dateLabel = (value: string) =>
  new Intl.DateTimeFormat("vi-VN", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Asia/Ho_Chi_Minh",
  }).format(new Date(value));

function errorMessage(error: unknown) {
  if (error instanceof WarehouseApiError)
    return error.status === 409
      ? `Phiếu vừa được xử lý hoặc dữ liệu xung đột: ${error.message}`
      : error.status === 404
        ? `Không tìm thấy phiếu: ${error.message}`
        : error.status === 400
          ? `Không thể xử lý phiếu: ${error.message}`
          : error.message;
  return "Không thể tải hoặc xử lý phiếu xuất.";
}

export default function MaterialIssueManagement() {
  const [status, setStatus] = useState<IssueStatus>("PENDING");
  const [issues, setIssues] = useState<MaterialIssue[]>([]);
  const [detail, setDetail] = useState<MaterialIssueDetail | null>(null);
  const [rejecting, setRejecting] = useState<string | null>(null);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [processingCode, setProcessingCode] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  async function load(nextStatus = status) {
    setLoading(true);
    setError("");
    try {
      setIssues(await warehouseService.getMaterialIssues(nextStatus));
    } catch (cause) {
      setError(errorMessage(cause));
      setIssues([]);
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    void load("PENDING");
  }, []);

  async function showDetail(code: string) {
    setError("");
    try {
      setDetail(await warehouseService.getMaterialIssue(code));
    } catch (cause) {
      setError(errorMessage(cause));
    }
  }

  async function approve(code: string) {
    if (
      processingCode ||
      !window.confirm(`Xác nhận duyệt phiếu ${code}? Tồn kho sẽ được cập nhật.`)
    )
      return;
    setProcessingCode(code);
    setError("");
    try {
      await warehouseService.approveMaterialIssue(code);
      setNotice(`Đã duyệt ${code}; tồn kho đã được trừ theo phiếu.`);
      setDetail(null);
      await load();
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setProcessingCode(null);
    }
  }

  async function submitReject(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!rejecting || processingCode) return;
    if (!reason.trim()) {
      setError("Vui lòng nhập lý do từ chối.");
      return;
    }
    setProcessingCode(rejecting);
    setError("");
    try {
      await warehouseService.rejectMaterialIssue(rejecting, reason.trim());
      setNotice(`Đã từ chối ${rejecting}.`);
      setRejecting(null);
      setReason("");
      setDetail(null);
      await load();
    } catch (cause) {
      setError(errorMessage(cause));
    } finally {
      setProcessingCode(null);
    }
  }

  return (
    <>
      <div className="page-heading workspace-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> KHO VẬN{" "}
            <span className="crumb-slash">/</span> DUYỆT XUẤT NVL
          </div>
          <h1>Phê duyệt yêu cầu xuất NVL</h1>
          <p>
            Xem phiếu do phân hệ nhân viên tạo; duyệt hoặc từ chối với lý do.
          </p>
        </div>
        <button
          className="button button-secondary"
          onClick={() => void load()}
          disabled={loading}
        >
          <RefreshCw size={14} /> Tải lại
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
      {error && !rejecting && (
        <div className="form-error" role="alert">
          {error}
        </div>
      )}
      <div className="tabs-row">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            className={`tab-button ${status === tab.value ? "tab-active" : ""}`}
            onClick={() => {
              setStatus(tab.value);
              void load(tab.value);
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="panel workspace-table-panel">
        {loading ? (
          <div className="inventory-empty">Đang tải phiếu xuất…</div>
        ) : issues.length === 0 ? (
          <div className="inventory-empty">
            <strong>
              {error
                ? "Không thể tải danh sách phiếu."
                : "Không có phiếu ở trạng thái này."}
            </strong>
            <span>Phiếu xuất được tạo từ phân hệ nhân viên.</span>
          </div>
        ) : (
          <div className="table-wrap">
            <table className="data-table workspace-table">
              <thead>
                <tr>
                  <th>MÃ PHIẾU</th>
                  <th>CHI NHÁNH</th>
                  <th>NGÀY TẠO</th>
                  <th>SỐ MẶT HÀNG</th>
                  <th>TRẠNG THÁI</th>
                  <th>THAO TÁC</th>
                </tr>
              </thead>
              <tbody>
                {issues.map((item) => (
                  <tr key={item.issueCode}>
                    <td>{item.issueCode}</td>
                    <td>
                      {item.branchName} <small>({item.branchCode})</small>
                    </td>
                    <td>{dateLabel(item.createdAt)}</td>
                    <td>{item.totalItems}</td>
                    <td>{labelFor(item.status)}</td>
                    <td>
                      <button
                        className="row-action"
                        aria-label="Xem chi tiết"
                        onClick={() => void showDetail(item.issueCode)}
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
                  CHI TIẾT PHIẾU · {labelFor(detail.status)}
                </span>
                <h3>{detail.issueCode}</h3>
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
              <span>
                Chi nhánh: {detail.branchName} ({detail.branchCode})
              </span>
              <span>Ngày tạo: {dateLabel(detail.createdAt)}</span>
              {detail.note && <span>Ghi chú: {detail.note}</span>}
            </div>
            <div className="modal-items">
              {detail.details.map((line, index) => (
                <div key={`${line.materialCode}-${line.lotCode}-${index}`}>
                  <span>
                    {line.materialCode} · {line.materialName} · Lô{" "}
                    {line.lotCode}
                  </span>
                  <strong>
                    {line.quantity} {line.unitName} · {line.locationName}
                  </strong>
                </div>
              ))}
            </div>
            {detail.status === "PENDING" && (
              <div className="modal-actions">
                <button
                  className="button button-secondary"
                  disabled={Boolean(processingCode)}
                  onClick={() => {
                    setRejecting(detail.issueCode);
                    setError("");
                  }}
                >
                  Từ chối
                </button>
                <button
                  className="button button-primary"
                  disabled={Boolean(processingCode)}
                  onClick={() => void approve(detail.issueCode)}
                >
                  <Check size={15} />
                  {processingCode === detail.issueCode
                    ? "Đang xử lý…"
                    : "Duyệt phiếu"}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
      {rejecting && (
        <div className="modal-backdrop">
          <form className="modal-card" onSubmit={submitReject}>
            <div className="modal-top">
              <div>
                <span className="modal-kicker">TỪ CHỐI PHIẾU</span>
                <h3>{rejecting}</h3>
              </div>
              <button
                type="button"
                className="icon-button"
                onClick={() => {
                  setRejecting(null);
                  setReason("");
                }}
                aria-label="Đóng"
              >
                <X size={17} />
              </button>
            </div>
            <label className="form-field">
              <span>Lý do từ chối (bắt buộc)</span>
              <textarea
                required
                maxLength={500}
                rows={4}
                value={reason}
                onChange={(event) => setReason(event.target.value)}
                placeholder="Nhập lý do để người gửi biết…"
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
                onClick={() => setRejecting(null)}
              >
                Hủy
              </button>
              <button
                className="button button-primary"
                disabled={Boolean(processingCode)}
              >
                {processingCode === rejecting
                  ? "Đang xử lý…"
                  : "Xác nhận từ chối"}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
