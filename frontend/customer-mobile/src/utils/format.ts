export const MAX_CART_LINES = 50;
export const MAX_ITEM_NOTE_LENGTH = 300;
export const MAX_ORDER_NOTE_LENGTH = 500;

const WEIGHT_OR_VOLUME_SYMBOLS = new Set(['kg', 'kilogam', 'kilôgam', 'l', 'lit', 'lít']);

/**
 * Chuyển chuỗi Decimal từ Backend sang số thực an toàn.
 */
export function parseDecimal(value: string | number | null | undefined): number {
  if (typeof value === 'number') {
    return Number.isFinite(value) ? value : 0;
  }
  if (typeof value !== 'string') {
    return 0;
  }
  const trimmed = value.trim();
  if (!trimmed) {
    return 0;
  }
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : 0;
}

/**
 * Làm tròn tối đa 3 chữ số thập phân để khớp quy tắc số lượng của Backend
 * và triệt tiêu sai số dấu phẩy động (ví dụ 0.25 + 0.5).
 */
export function roundQuantity(value: number): number {
  if (!Number.isFinite(value) || value <= 0) {
    return 0;
  }
  return Math.round((value + Number.EPSILON) * 1000) / 1000;
}

/**
 * Nhận diện đơn vị cân/đong (bán lẻ thập phân như 0.25 kg) so với đơn vị đếm rời (lon, phần).
 */
export function isWeightOrVolumeUnit(unitSymbol: string): boolean {
  return WEIGHT_OR_VOLUME_SYMBOLS.has(unitSymbol.trim().toLocaleLowerCase('vi'));
}

/**
 * Bước nhảy tăng/giảm mặc định trên bộ chọn số lượng.
 */
export function getQuantityStep(unitSymbol: string): number {
  return isWeightOrVolumeUnit(unitSymbol) ? 0.25 : 1;
}

/**
 * Số lượng mặc định khi khách bấm thêm mới một món vào giỏ.
 */
export function getDefaultAddQuantity(unitSymbol: string, available: string | number): number {
  const maxAvailable = roundQuantity(parseDecimal(available));
  if (maxAvailable <= 0) {
    return 0;
  }
  const step = getQuantityStep(unitSymbol);
  return maxAvailable >= step ? step : maxAvailable;
}

/**
 * Các mức định lượng gợi ý nhanh trên màn Chi tiết món (chỉ giữ mức <= tồn khả dụng).
 */
export function getQuickQuantityPresets(
  unitSymbol: string,
  available: string | number,
): number[] {
  const maxAvailable = roundQuantity(parseDecimal(available));
  if (maxAvailable <= 0) {
    return [];
  }
  const basePresets = isWeightOrVolumeUnit(unitSymbol) ? [0.25, 0.5, 1] : [1, 2, 3];
  const valid = basePresets.filter(q => q <= maxAvailable);
  if (valid.length === 0) {
    return [maxAvailable];
  }
  return valid;
}

/**
 * Kẹp số lượng trong ngưỡng [0, available] và làm tròn chuẩn.
 */
export function clampQuantityToAvailable(
  quantity: number,
  available: string | number,
): number {
  const maxAvailable = roundQuantity(parseDecimal(available));
  if (maxAvailable <= 0 || quantity <= 0) {
    return 0;
  }
  return roundQuantity(Math.min(quantity, maxAvailable));
}

/**
 * Kiểm tra món có đang ở ngưỡng sắp hết tại cửa hàng hay không.
 */
export function isLowStock(unitSymbol: string, available: string | number): boolean {
  const qty = parseDecimal(available);
  if (qty <= 0) {
    return false;
  }
  const threshold = isWeightOrVolumeUnit(unitSymbol) ? 1 : 5;
  return qty <= threshold;
}

/**
 * Định dạng số lượng hiển thị gọn gàng theo chuẩn Việt Nam (tối đa 3 số lẻ).
 */
export function formatQuantity(value: string | number): string {
  const num = roundQuantity(parseDecimal(value));
  return num.toLocaleString('vi-VN', { maximumFractionDigits: 3 });
}

/**
 * Tính thành tiền của 1 dòng món (làm tròn 2 chữ số lẻ khớp với Prisma Decimal(18, 2)).
 */
export function calculateLineTotal(unitPrice: string | number, quantity: number): number {
  const price = parseDecimal(unitPrice);
  const qty = roundQuantity(quantity);
  if (price <= 0 || qty <= 0) {
    return 0;
  }
  return Math.round((price * qty + Number.EPSILON) * 100) / 100;
}

/**
 * Định dạng tiền tệ VNĐ (ví dụ: 690.000 ₫).
 */
export function formatVnd(value: string | number): string {
  const amount = Math.round(parseDecimal(value));
  return `${amount.toLocaleString('vi-VN')} ₫`;
}
