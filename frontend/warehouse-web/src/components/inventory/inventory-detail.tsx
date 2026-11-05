"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import {
  ArrowLeft,
  CalendarDays,
  MapPin,
  Package,
  RefreshCw,
  Warehouse,
} from "lucide-react";
import type { InventoryDisplayDetail } from "@/types/inventory";

const numberFormat = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 20,
});
const dateFormat = new Intl.DateTimeFormat("vi-VN", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "UTC",
});

function formatDate(value: string | null) {
  if (!value) return "Không có hạn sử dụng";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? value : dateFormat.format(date);
}

export default function InventoryDetailView({
  inventory,
  code,
  error,
}: {
  inventory?: InventoryDisplayDetail;
  code?: string;
  error?: string;
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const retry = () => startTransition(() => router.refresh());
  if (!inventory)
    return (
      <>
        <Link href="/inventory" className="back-link">
          <ArrowLeft size={15} /> Quay lại tồn kho
        </Link>
        <div className="inventory-error detail-error">
          <div className="error-mark">
            {error?.startsWith("Không tìm thấy") ? "?" : "!"}
          </div>
          <h2>{error ?? "Không thể tải dữ liệu tồn kho."}</h2>
          <p>
            {error?.startsWith("Không tìm thấy")
              ? "Kiểm tra lại mã nguyên vật liệu hoặc quay về danh sách tồn kho."
              : "Kiểm tra Backend đang hoạt động rồi tải lại thông tin nguyên vật liệu."}
          </p>
          <div className="error-actions">
            {error?.startsWith("Không tìm thấy") ? (
              <Link href="/inventory" className="button button-secondary">
                Về danh sách kho
              </Link>
            ) : (
              <button
                className="button button-primary"
                onClick={retry}
                disabled={isPending}
              >
                <RefreshCw size={14} className={isPending ? "spin-icon" : ""} />
                {isPending ? "Đang thử lại…" : "Thử lại"}
              </button>
            )}
          </div>
          {code && <span className="error-code">Mã tra cứu: {code}</span>}
        </div>
      </>
    );

  const statusAvailable = inventory.stockStatus === "AVAILABLE";
  return (
    <>
      <Link href="/inventory" className="back-link">
        <ArrowLeft size={15} /> Quay lại tồn kho
      </Link>
      <div className="page-heading inventory-detail-heading">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-line" /> TỒN KHO{" "}
            <span className="crumb-slash">/</span> CHI TIẾT NGUYÊN VẬT LIỆU
          </div>
          <h1>{inventory.name}</h1>
          <p>
            {inventory.code} <span className="crumb-slash">·</span>{" "}
            {inventory.category}
          </p>
        </div>
        <span
          className={`inventory-status detail-status ${statusAvailable ? "available" : "low"}`}
        >
          <i />
          {statusAvailable ? "Đủ hàng" : "Tồn kho thấp"}
        </span>
      </div>
      <div className="inventory-detail-stats">
        <div className="inventory-detail-stat">
          <span className="detail-stat-icon">
            <Package size={17} />
          </span>
          <div>
            <span>Tổng tồn kho</span>
            <strong>
              {numberFormat.format(inventory.totalStock)}{" "}
              <small>{inventory.unit}</small>
            </strong>
          </div>
        </div>
        <div className="inventory-detail-stat">
          <span className="detail-stat-icon green-detail-icon">
            <Package size={17} />
          </span>
          <div>
            <span>Tồn khả dụng</span>
            <strong>
              {numberFormat.format(inventory.availableStock)}{" "}
              <small>{inventory.unit}</small>
            </strong>
          </div>
        </div>
        <div className="inventory-detail-stat">
          <span className="detail-stat-icon amber-detail-icon">
            <Warehouse size={17} />
          </span>
          <div>
            <span>Tồn tối thiểu</span>
            <strong>
              {numberFormat.format(inventory.minStock)}{" "}
              <small>{inventory.unit}</small>
            </strong>
          </div>
        </div>
        <div className="inventory-detail-stat">
          <span className="detail-stat-icon green-detail-icon">
            <MapPin size={17} />
          </span>
          <div>
            <span>Số lô đang theo dõi</span>
            <strong>{inventory.lots.length}</strong>
          </div>
        </div>
      </div>
      <section className="panel lots-panel">
        <div className="panel-header">
          <div>
            <h2>Chi tiết lô hàng và vị trí lưu kho</h2>
            <p>Tồn tổng và khả dụng theo lô, chi nhánh và vị trí kho.</p>
          </div>
        </div>
        {inventory.lots.length === 0 ? (
          <div className="inventory-empty compact-empty">
            <Package size={25} />
            <strong>Nguyên vật liệu chưa có lô tồn kho.</strong>
            <span>
              Tổng tồn kho hiện tại: {numberFormat.format(inventory.totalStock)}{" "}
              {inventory.unit}
            </span>
          </div>
        ) : (
          <div className="lot-list">
            {inventory.lots.map((lot, index) => (
              <article className="lot-card" key={`${lot.lotCode}-${index}`}>
                <div className="lot-heading">
                  <div>
                    <span className="lot-code-label">MÃ LÔ · {lot.status}</span>
                    <strong>
                      {lot.lotCode}
                      {!lot.isAvailable && (
                        <small className="stock-low"> · Không khả dụng</small>
                      )}
                    </strong>
                  </div>
                  <div className="lot-expiry">
                    <CalendarDays size={14} />
                    <span>Hạn sử dụng</span>
                    <strong>{formatDate(lot.expiryDate)}</strong>
                  </div>
                  <div className="lot-total">
                    <span>Tổng / khả dụng</span>
                    <strong>
                      {numberFormat.format(lot.totalStock)} /{" "}
                      {numberFormat.format(lot.availableStock)}{" "}
                      <small>{inventory.unit}</small>
                    </strong>
                  </div>
                </div>
                {lot.locations.length > 0 ? (
                  <div className="lot-locations">
                    {lot.locations.map((location, locationIndex) => (
                      <div
                        className="lot-location-row"
                        key={`${location.branchCode}-${location.locationName}-${locationIndex}`}
                      >
                        <span className="location-icon">
                          <MapPin size={14} />
                        </span>
                        <div className="location-copy">
                          <strong>{location.locationName}</strong>
                          <span>
                            {location.branchName} ({location.branchCode})
                          </span>
                        </div>
                        <span className="location-quantity">
                          {numberFormat.format(location.quantity)} /{" "}
                          {numberFormat.format(location.availableQuantity)}{" "}
                          <small>{inventory.unit} tổng / khả dụng</small>
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="lot-no-locations">
                    Chưa có vị trí tồn kho được ghi nhận cho lô này.
                  </div>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}
