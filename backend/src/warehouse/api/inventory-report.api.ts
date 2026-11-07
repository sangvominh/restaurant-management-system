import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '../../generated/prisma/client.js';
import { PrismaService } from '../../prisma/prisma.service.js';

export interface InventoryReportQuery {
  itemType?: string; period?: string; year?: string; month?: string; quarter?: string;
}
export function inventoryReportPeriod(query: InventoryReportQuery, now = new Date()) {
  const local = new Intl.DateTimeFormat('sv-SE', { timeZone: 'Asia/Ho_Chi_Minh' }).format(now);
  const itemType = query.itemType ?? 'MATERIAL', period = query.period ?? 'MONTH';
  const year = Number(query.year ?? local.slice(0, 4)), month = Number(query.month ?? local.slice(5, 7));
  const quarter = Number(query.quarter ?? Math.ceil(Number(local.slice(5, 7)) / 3));
  if (!['MATERIAL', 'PRODUCT'].includes(itemType) || !['MONTH', 'QUARTER', 'YEAR'].includes(period))
    throw new BadRequestException('Loại hàng hoặc kỳ báo cáo không hợp lệ');
  if (!Number.isInteger(year) || year < 2000 || year > 2100 ||
      (period === 'MONTH' && (!Number.isInteger(month) || month < 1 || month > 12)) ||
      (period === 'QUARTER' && (!Number.isInteger(quarter) || quarter < 1 || quarter > 4)))
    throw new BadRequestException('Năm, tháng hoặc quý không hợp lệ');
  const firstMonth = period === 'YEAR' ? 0 : period === 'QUARTER' ? (quarter - 1) * 3 : month - 1;
  const months = period === 'YEAR' ? 12 : period === 'QUARTER' ? 3 : 1;
  const start = new Date(Date.UTC(year, firstMonth, 1) - 7 * 3600000);
  const end = new Date(Date.UTC(year, firstMonth + months, 1) - 7 * 3600000);
  if (start > now) throw new BadRequestException('Kỳ báo cáo chưa bắt đầu');
  return { itemType, period, year, month: period === 'MONTH' ? month : null,
    quarter: period === 'QUARTER' ? quarter : null, start, end, asOf: now };
}
export interface ReportRow {
  code: string; name: string; unit: string; opening: string | null; received: string; issued: string;
  wasted: string; returned: string; otherChange: string; closing: string | null;
  historyComplete: boolean; missingMetadata: boolean;
}
@Injectable()
export class InventoryReportApi {
  constructor(private readonly prisma: PrismaService) {}
  async getReport(query: InventoryReportQuery) {
    const period = inventoryReportPeriod(query), material = period.itemType === 'MATERIAL';
    const metadata = material ? Prisma.sql`
      SELECT m.id::text item_id,m.code,m.name,u.name unit,false missing_metadata
      FROM materials m JOIN units u ON u.id=m.unit_id` : Prisma.sql`
      SELECT k.item_id,k.item_id code,COALESCE(p.name,'Chưa liên kết sản phẩm') name,
        COALESCE(p.unit,'Chưa có đơn vị') unit,p.code IS NULL missing_metadata
      FROM (SELECT code item_id FROM products UNION SELECT product_code FROM finished_goods_balances
        UNION SELECT product_code FROM finished_goods_movements) k LEFT JOIN products p ON p.code=k.item_id`;
    const balances = material ? Prisma.sql`
      SELECT l.material_id::text item_id,b.material_lot_id::text||':'||b.location_id::text stock_key,b.quantity
      FROM material_balances b JOIN material_lots l ON l.id=b.material_lot_id` : Prisma.sql`
      SELECT product_code item_id,product_code||':'||location_id::text stock_key,quantity FROM finished_goods_balances`;
    const movements = material ? Prisma.sql`
      SELECT l.material_id::text item_id,m.material_lot_id::text||':'||m.location_id::text stock_key,
        m.id,m.created_at,m.quantity_before,m.quantity_change,m.quantity_after,m.movement_type kind
      FROM inventory_movements m JOIN material_lots l ON l.id=m.material_lot_id` : Prisma.sql`
      SELECT product_code item_id,product_code||':'||location_id::text stock_key,
        id,created_at,quantity_before,quantity_change,quantity_after,
        CASE WHEN receipt_id IS NOT NULL THEN 'RECEIPT' WHEN issue_detail_id IS NOT NULL THEN 'ISSUE'
          WHEN defect_id IS NOT NULL THEN 'WASTE' ELSE 'OTHER' END kind FROM finished_goods_movements`;
    // One snapshot, all rows: period totals never use capped list APIs.
    const rows = await this.prisma.$queryRaw<ReportRow[]>(Prisma.sql`
      WITH bounds AS (SELECT ${period.start}::timestamptz start_at,${period.end}::timestamptz end_at,${period.asOf}::timestamptz as_of),
      metadata AS (${metadata}),balances AS (${balances}),movements AS (${movements}),
      ordered AS (SELECT *,LAG(quantity_after) OVER (PARTITION BY stock_key ORDER BY created_at,id) previous_after FROM movements),
      rollup AS (
        SELECT item_id,stock_key,MIN(created_at) first_at,
          (ARRAY_AGG(quantity_before ORDER BY created_at,id))[1] first_before,
          (ARRAY_AGG(quantity_after ORDER BY created_at DESC,id DESC))[1] latest,
          BOOL_OR((previous_after IS NOT NULL AND previous_after<>quantity_before)
            OR quantity_before+quantity_change<>quantity_after OR created_at>as_of) broken,
          COALESCE(SUM(quantity_change) FILTER (WHERE created_at>=start_at),0) after_start,
          COALESCE(SUM(quantity_change) FILTER (WHERE created_at>=end_at),0) after_end,
          COALESCE(SUM(quantity_change) FILTER (WHERE created_at>=start_at AND created_at<end_at AND kind='RECEIPT'),0) received,
          COALESCE(-SUM(quantity_change) FILTER (WHERE created_at>=start_at AND created_at<end_at AND kind='ISSUE'),0) issued,
          COALESCE(-SUM(quantity_change) FILTER (WHERE created_at>=start_at AND created_at<end_at AND kind='WASTE'),0) wasted,
          COALESCE(SUM(quantity_change) FILTER (WHERE created_at>=start_at AND created_at<end_at AND kind='RETURN'),0) returned,
          COALESCE(SUM(quantity_change) FILTER (WHERE created_at>=start_at AND created_at<end_at AND kind NOT IN ('RECEIPT','ISSUE','WASTE','RETURN')),0) other_change
        FROM ordered CROSS JOIN bounds GROUP BY item_id,stock_key
      ),
      stock AS (
        SELECT COALESCE(b.item_id,r.item_id) item_id,COALESCE(b.stock_key,r.stock_key) stock_key,
          COALESCE(b.quantity,0) current_quantity,r.first_at,r.first_before,r.after_start,r.after_end,
          r.received,r.issued,r.wasted,r.returned,r.other_change,
          (r.first_at IS NULL AND COALESCE(b.quantity,0)=0) OR
          (r.first_at IS NOT NULL AND NOT r.broken AND r.latest=COALESCE(b.quantity,0)) valid
        FROM balances b FULL JOIN rollup r USING(item_id,stock_key)
      ),
      endpoints AS (
        SELECT s.stock_key,s.item_id,
          CASE WHEN valid AND (first_at IS NULL OR first_at<=start_at OR first_before=0)
            THEN current_quantity-COALESCE(after_start,0) END opening,
          CASE WHEN end_at>as_of THEN current_quantity
            WHEN valid AND (first_at IS NULL OR first_at<end_at OR first_before=0)
            THEN current_quantity-COALESCE(after_end,0) END closing,
          received,issued,wasted,returned,other_change FROM stock s CROSS JOIN bounds
      )
      SELECT m.code,m.name,m.unit,m.missing_metadata "missingMetadata",
        CASE WHEN BOOL_OR(e.stock_key IS NOT NULL AND e.opening IS NULL) THEN NULL ELSE COALESCE(SUM(e.opening),0)::text END opening,
        COALESCE(SUM(e.received),0)::text received,COALESCE(SUM(e.issued),0)::text issued,
        COALESCE(SUM(e.wasted),0)::text wasted,COALESCE(SUM(e.returned),0)::text returned,
        COALESCE(SUM(e.other_change),0)::text "otherChange",
        CASE WHEN BOOL_OR(e.stock_key IS NOT NULL AND e.closing IS NULL) THEN NULL ELSE COALESCE(SUM(e.closing),0)::text END closing,
        NOT COALESCE(BOOL_OR(e.stock_key IS NOT NULL AND (e.opening IS NULL OR e.closing IS NULL)),false) "historyComplete"
      FROM metadata m LEFT JOIN endpoints e ON e.item_id=m.item_id
      GROUP BY m.code,m.name,m.unit,m.missing_metadata ORDER BY m.code
    `);
    const warnings: string[] = [];
    if (rows.some(row => !row.historyComplete))
      warnings.push('Một số số dư thiếu lịch sử hoặc không khớp giao dịch. Các mốc tồn chưa xác minh hiển thị “Chưa đủ lịch sử”, không suy đoán bằng 0.');
    if (rows.some(row => row.missingMetadata))
      warnings.push('Có mã thành phẩm chưa liên kết danh mục sản phẩm; tên và đơn vị chưa xác định.');
    return { message: 'Báo cáo nhập xuất tồn theo kỳ', data: { period, rows, warnings } };
  }
}
