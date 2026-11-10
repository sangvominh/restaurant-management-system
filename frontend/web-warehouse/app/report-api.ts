export type StockRow = { id: string; code: string; name: string; unit: string; status: string; category: string; opening: string; incoming: string; outgoing: string; closing: string; previousOut: string; outChange: string | null; stock: string; trend: { date: string; incoming: string; outgoing: string }[]; breakdown: { label: string; quantity: string }[] };
export type MaterialReport = StockRow & { usable: string; expired: string; minimum: string; openNeed: string; proposedNeed: string; suggestedPurchase: string; consumed: string; coverageDays: string | null; expiring: { code: string; expiry: string; quantity: string }[] };
export type ProductReport = StockRow & { storeStock: string; totalStock: string; exported: string; demand: string; inProduction: string; awaitingInspection: string; forecast: string; suggested: string; hasBom: boolean; actual: string; accepted: string; rejected: string; yieldPercent: string | null; runCount: number };
export type FormulaReport = { id: string; bomId: string; version: number; product: string; material: string; unit: string; expected: string; actual: string; delta: string; deltaPercent: string | null; runCount: number; orderIds: string[] };
export type WasteReport = { id: string; documentId: string; name: string; unit: string; lot: string | null; source: string; quantity: string; at: string; reason: string; by: string };
export type WarehouseReport = { asOf: string; period: { start: string; end: string; observedDays: number; previousStart: string; previousEnd: string; horizon: number }; summary: { receiptCount: number; receiptValue: string; runCount: number; wasteDocuments: number; openOrderCount: number; overdueOrders: number; openShortages: number; purchaseItems: number; productionItems: number; expiredItems: number }; materials: MaterialReport[]; products: ProductReport[]; formulas: FormulaReport[]; wastes: WasteReport[] };
export const num = (v: string | number | null | undefined) => Number(v || 0);
export const fmt = (v: string | number | null | undefined) => num(v).toLocaleString('vi-VN', { maximumFractionDigits: 3 });
export const pct = (v: string | null) => v === null ? '—' : fmt(v) + '%';
export const wasteSource = (v: string) => v === 'TRONG_KHO' ? 'Tại kho' : v === 'DA_CAP' ? 'Tại bếp' : v === 'CUA_HANG' ? 'Tại cửa hàng' : 'Thành phẩm';
export function exportCsv(name: string, headers: string[], rows: (string | number)[][]) {
  const cell = (v: string | number) => { const raw = String(v); const safe = typeof v === 'string' && /^[\s]*[=+@-]/.test(raw) && !/^-?\d+(\.\d+)?$/.test(raw) ? "'" + raw : raw; return '"' + safe.replaceAll('"', '""') + '"'; };
  const blob = new Blob(['\uFEFF' + [headers, ...rows].map(row => row.map(cell).join(',')).join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob), link = document.createElement('a'); link.href = url; link.download = name + '.csv'; link.click(); window.setTimeout(() => URL.revokeObjectURL(url), 1000);
}
