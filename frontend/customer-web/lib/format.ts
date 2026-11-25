import type { ProductItem } from "./types";

const vndFormatter = new Intl.NumberFormat("vi-VN", {
  maximumFractionDigits: 0,
});

/**
 * Chuyển chuỗi Decimal từ API (ví dụ "690000" hoặc "690000.00") sang số an toàn.
 */
export function parseMoney(value: string | number | null | undefined): number {
  if (value === null || value === undefined) return 0;
  const parsed = typeof value === "number" ? value : Number(value);
  if (!Number.isFinite(parsed) || parsed < 0) return 0;
  return Math.round(parsed);
}

/**
 * Định dạng tiền tệ VNĐ dễ đọc theo chuẩn giao diện (ví dụ: 690.000đ).
 */
export function formatVnd(value: string | number | null | undefined): string {
  return `${vndFormatter.format(parseMoney(value))}đ`;
}

export interface ServingUnitDisplay {
  label: "phần" | "lon" | "chai" | "ly" | "cây";
  capitalized: "Phần" | "Lon" | "Chai" | "Ly" | "Cây";
  isCountableNative: boolean;
}

/**
 * Chuẩn hóa đơn vị hiển thị cho khách hàng về 5 đơn vị phục vụ: phần, lon, chai, ly, cây.
 * Các đơn vị định lượng kho như kg, g, gam, lít, ml... được quy về "phần".
 */
export function formatServingUnit(unit?: {
  name?: string | null;
  symbol?: string | null;
} | null): ServingUnitDisplay {
  const rawSymbol = (unit?.symbol || "").trim().toLowerCase();
  const rawName = (unit?.name || "").trim().toLowerCase();
  const tokens = [rawSymbol, rawName];

  if (tokens.some((t) => t === "lon")) {
    return { label: "lon", capitalized: "Lon", isCountableNative: true };
  }
  if (tokens.some((t) => t === "chai")) {
    return { label: "chai", capitalized: "Chai", isCountableNative: true };
  }
  if (tokens.some((t) => t === "ly" || t === "coc" || t === "cốc")) {
    return { label: "ly", capitalized: "Ly", isCountableNative: true };
  }
  if (tokens.some((t) => t === "cay" || t === "cây")) {
    return { label: "cây", capitalized: "Cây", isCountableNative: true };
  }
  if (tokens.some((t) => t === "phan" || t === "phần")) {
    return { label: "phần", capitalized: "Phần", isCountableNative: true };
  }

  return { label: "phần", capitalized: "Phần", isCountableNative: false };
}

/**
 * Chuẩn hóa hiển thị số lượng tồn nguyên cho các đơn vị đếm.
 */
export function formatAvailableCount(available: string): number {
  const num = Number(available);
  if (!Number.isFinite(num) || num <= 0) return 0;
  return Math.floor(num);
}

/**
 * Tính số lượng nguyên tối đa có thể chọn cho 1 món dựa trên trạng thái phục vụ từ API.
 * - Nếu inStock === false hoặc available <= 0: trả 0 (khóa nút thêm vào giỏ).
 * - Nếu inStock === true: cho phép chọn số nguyên >= 1 (giới hạn theo phần nguyên của available nếu >= 1).
 */
export function getMaxOrderableQty(
  product: Pick<ProductItem, "inStock" | "available">,
): number {
  if (!product.inStock) return 0;
  const avail = Number(product.available);
  if (!Number.isFinite(avail) || avail <= 0) return 0;
  if (avail >= 1) {
    return Math.min(99, Math.floor(avail));
  }
  return 1;
}

/**
 * Giải quyết đường dẫn ảnh món ăn nếu API trả đường dẫn tương đối "/..." hoặc URL đầy đủ.
 */
export function resolveProductImageUrl(
  imageUrl: string | null | undefined,
  apiBaseUrl: string,
): string | null {
  if (!imageUrl || !imageUrl.trim()) return null;
  const trimmed = imageUrl.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed;
  }
  if (trimmed.startsWith("/")) {
    return `${apiBaseUrl.replace(/\/+$/, "")}${trimmed}`;
  }
  return null;
}
