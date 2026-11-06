import WarehousePeriodCharts from "@/components/dashboard/warehouse-period-charts";
import { warehouseService, type MaterialAdjustment, type Receipt, type ReceiptDetail } from "@/services/warehouse-service";

const dayFormat = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" });

export function reportPeriods(now: Date) {
  const today = dayFormat.format(now);
  return [
    { label: "Hôm nay", from: today },
    { label: "Tháng này", from: today.slice(0, 7) + "-01" },
    { label: "Năm nay", from: today.slice(0, 4) + "-01-01" },
  ].map(period => ({ ...period, to: today }));
}

export function summarizePeriod(
  period: { from: string; to: string },
  receipts: Receipt[],
  details: Array<ReceiptDetail | null>,
  waste: MaterialAdjustment[] | null,
) {
  const inPeriod = (date: string) => {
    const day = dayFormat.format(new Date(date));
    return day >= period.from && day <= period.to;
  };
  const selected = receipts.map((receipt, index) => ({ receipt, detail: details[index] }))
    .filter(({ receipt }) => receipt.status === "POSTED" && inPeriod(receipt.createdAt));
  const oldest = receipts.at(-1);
  const receiptComplete = receipts.length < 50 || (oldest && dayFormat.format(new Date(oldest.createdAt)) < period.from);
  const moneyKnown = receiptComplete && selected.every(({ detail }) => detail !== null && detail !== undefined);
  const amount = moneyKnown ? selected.reduce((total, { detail }) =>
    total + detail!.details.reduce((sum, line) => sum + Number(line.quantity) * Number(line.unitPrice), 0), 0) : null;
  const wasteKnown = waste !== null && waste.length < 100 && waste.every(item => item.processedAt && item.acceptedQuantity !== null);
  const approved = wasteKnown ? waste.filter(item => item.status === "APPROVED" && inPeriod(item.processedAt!)) : [];
  const quantities: Record<string, number> = {};
  for (const item of approved) quantities[item.unitName] = (quantities[item.unitName] ?? 0) + Number(item.acceptedQuantity);
  return { amount, receiptCount: moneyKnown ? selected.length : null, wasteCount: wasteKnown ? approved.length : null, quantities };
}

export default async function WarehousePeriodSummary({ receipts }: { receipts: Receipt[] }) {
  const periods = reportPeriods(new Date());
  const [wasteResult, detailResults] = await Promise.all([
    warehouseService.getAdjustments("WASTE", "APPROVED").then(rows => rows).catch(() => null),
    Promise.all(receipts.map(receipt => receipt.status === "POSTED" && dayFormat.format(new Date(receipt.createdAt)) >= periods[2].from
      ? warehouseService.getReceipt(receipt.receiptCode).catch(() => null)
      : Promise.resolve(null))),
  ]);
  const rows = periods.map(period => ({ ...period, ...summarizePeriod(period, receipts, detailResults, wasteResult) }));
  return <WarehousePeriodCharts rows={rows}/>;
}
