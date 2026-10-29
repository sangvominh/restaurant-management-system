import { ConflictException, Injectable } from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuditService } from '../audit/audit.service';
import { AuthUser } from '../common/auth.decorators';
import { DEMO_INSTALL, DEMO_REMOVE } from './report.demo';

export type Period = 'month' | 'quarter' | 'year';

/**
 * HỢP ĐỒNG DỮ LIỆU: báo cáo chỉ đọc 2 view, không phụ thuộc tên bảng của nhóm khác.
 *   v_report_revenue(paid_at timestamptz, amount numeric)
 *   v_report_stock(occurred_at timestamptz, material_id int, material_name text, unit text,
 *                  movement_type 'import'|'export'|'waste', quantity numeric, value numeric)
 */
const TZ = `'Asia/Ho_Chi_Minh'`;
// Biểu thức nhóm kỳ: chuỗi cố định trong code (không lấy từ người dùng) nên nối chuỗi an toàn.
const BUCKET: Record<Period, string> = {
  month: 'EXTRACT(MONTH FROM d)::int',
  quarter: 'EXTRACT(QUARTER FROM d)::int',
  year: 'EXTRACT(YEAR FROM d)::int',
};

const pad = (n: number) => String(n).padStart(2, '0');
const ymd = (y: number, m: number) => `${y}-${pad(m)}-01`;

function keysOf(period: Period, year: number): number[] {
  if (period === 'month') return Array.from({ length: 12 }, (_, i) => i + 1);
  if (period === 'quarter') return [1, 2, 3, 4];
  return Array.from({ length: 5 }, (_, i) => year - 4 + i);
}
function labelOf(period: Period, key: number): string {
  return period === 'month' ? `Tháng ${key}` : period === 'quarter' ? `Quý ${key}` : `Năm ${key}`;
}
/** Khoảng [start, end) theo ngày địa phương. key = một kỳ cụ thể; bỏ trống = toàn khoảng. */
function rangeOf(period: Period, year: number, key?: number) {
  if (period === 'year') {
    return key ? { start: ymd(key, 1), end: ymd(key + 1, 1) } : { start: ymd(year - 4, 1), end: ymd(year + 1, 1) };
  }
  if (period === 'quarter') {
    if (!key) return { start: ymd(year, 1), end: ymd(year + 1, 1) };
    const sm = (key - 1) * 3 + 1;
    return { start: ymd(year, sm), end: sm + 3 > 12 ? ymd(year + 1, 1) : ymd(year, sm + 3) };
  }
  if (!key) return { start: ymd(year, 1), end: ymd(year + 1, 1) };
  return { start: ymd(year, key), end: key === 12 ? ymd(year + 1, 1) : ymd(year, key + 1) };
}

const REVENUE_BASE = `(SELECT (paid_at AT TIME ZONE ${TZ})::date AS d, amount FROM v_report_revenue) r`;
const STOCK_BASE = `(SELECT (occurred_at AT TIME ZONE ${TZ})::date AS d, material_id, material_name, unit, movement_type,
                            quantity, value FROM v_report_stock) s`;

@Injectable()
export class ReportService {
  constructor(
    @InjectDataSource() private readonly ds: DataSource,
    private readonly audit: AuditService,
  ) {}

  async status() {
    const [row] = await this.ds.query(
      `SELECT to_regclass('public.v_report_revenue') IS NOT NULL AS revenue,
              to_regclass('public.v_report_stock') IS NOT NULL AS stock`,
    );
    let demo = false;
    if (row.revenue) {
      const [d] = await this.ds.query(`SELECT pg_get_viewdef('public.v_report_revenue'::regclass) AS def`);
      demo = String(d.def).includes('demo_invoices');
    }
    return { revenueReady: !!row.revenue, stockReady: !!row.stock, demo };
  }

  async revenue(period: Period, year: number) {
    const st = await this.status();
    if (!st.revenueReady) return { ready: false, period, year, rows: [], totals: null };

    const { start, end } = rangeOf(period, year);
    const data: { key: number; total: number; invoices: number }[] = await this.ds.query(
      `SELECT ${BUCKET[period]} AS key, COALESCE(SUM(amount),0)::float8 AS total, COUNT(*)::int AS invoices
       FROM ${REVENUE_BASE}
       WHERE d >= $1::date AND d < $2::date
       GROUP BY 1`,
      [start, end],
    );
    const byKey = new Map(data.map((r) => [r.key, r]));
    let prev: number | null = null;
    const rows = keysOf(period, year).map((key) => {
      const total = byKey.get(key)?.total ?? 0;
      const invoices = byKey.get(key)?.invoices ?? 0;
      const growth = prev && prev > 0 ? ((total - prev) / prev) * 100 : null;
      prev = total;
      return { key, label: labelOf(period, key), total, invoices, average: invoices ? total / invoices : 0, growth };
    });
    const total = rows.reduce((s, r) => s + r.total, 0);
    const invoices = rows.reduce((s, r) => s + r.invoices, 0);
    const best = rows.reduce((b, r) => (r.total > b.total ? r : b), rows[0]);
    return {
      ready: true,
      demo: st.demo,
      period,
      year,
      rows,
      totals: { total, invoices, average: invoices ? total / invoices : 0, bestLabel: best.total > 0 ? best.label : null },
    };
  }

  /** Nhập - xuất - tồn tính theo GIÁ TRỊ (VND) để cộng được giữa các NVL khác đơn vị. */
  async stock(period: Period, year: number) {
    const st = await this.status();
    if (!st.stockReady) return { ready: false, period, year, rows: [], totals: null };

    const { start, end } = rangeOf(period, year);
    const data: { key: number; imported: number; exported: number; wasted: number }[] = await this.ds.query(
      `SELECT ${BUCKET[period]} AS key,
              COALESCE(SUM(value) FILTER (WHERE movement_type = 'import'), 0)::float8 AS imported,
              COALESCE(SUM(value) FILTER (WHERE movement_type = 'export'), 0)::float8 AS exported,
              COALESCE(SUM(value) FILTER (WHERE movement_type = 'waste'), 0)::float8 AS wasted
       FROM ${STOCK_BASE}
       WHERE d >= $1::date AND d < $2::date
       GROUP BY 1`,
      [start, end],
    );
    const [{ opening }] = await this.ds.query(
      `SELECT COALESCE(SUM(CASE WHEN movement_type = 'import' THEN value ELSE -value END), 0)::float8 AS opening
       FROM ${STOCK_BASE} WHERE d < $1::date`,
      [start],
    );
    const byKey = new Map(data.map((r) => [r.key, r]));
    let running: number = opening;
    const rows = keysOf(period, year).map((key) => {
      const r = byKey.get(key);
      const imported = r?.imported ?? 0;
      const exported = r?.exported ?? 0;
      const wasted = r?.wasted ?? 0;
      const open = running;
      running = open + imported - exported - wasted;
      return { key, label: labelOf(period, key), opening: open, imported, exported, wasted, closing: running };
    });
    return {
      ready: true,
      demo: st.demo,
      period,
      year,
      rows,
      totals: {
        opening: rows[0].opening,
        imported: rows.reduce((s, r) => s + r.imported, 0),
        exported: rows.reduce((s, r) => s + r.exported, 0),
        wasted: rows.reduce((s, r) => s + r.wasted, 0),
        closing: rows[rows.length - 1].closing,
      },
    };
  }

  /** Chi tiết theo từng NVL (SỐ LƯỢNG, theo đơn vị riêng) của một kỳ. */
  async stockMaterials(period: Period, year: number, key: number) {
    const st = await this.status();
    if (!st.stockReady) return [];
    const { start, end } = rangeOf(period, year, key);
    const rows: {
      materialId: number; name: string; unit: string;
      opening: number; imported: number; exported: number; wasted: number;
    }[] = await this.ds.query(
      `SELECT material_id AS "materialId", material_name AS name, unit,
              COALESCE(SUM(CASE WHEN movement_type = 'import' THEN quantity ELSE -quantity END) FILTER (WHERE d < $1::date), 0)::float8 AS opening,
              COALESCE(SUM(quantity) FILTER (WHERE d >= $1::date AND movement_type = 'import'), 0)::float8 AS imported,
              COALESCE(SUM(quantity) FILTER (WHERE d >= $1::date AND movement_type = 'export'), 0)::float8 AS exported,
              COALESCE(SUM(quantity) FILTER (WHERE d >= $1::date AND movement_type = 'waste'), 0)::float8 AS wasted
       FROM ${STOCK_BASE}
       WHERE d < $2::date
       GROUP BY material_id, material_name, unit
       ORDER BY material_name`,
      [start, end],
    );
    return rows.map((r) => ({ ...r, closing: r.opening + r.imported - r.exported - r.wasted }));
  }

  async installDemo(actor: AuthUser) {
    const st = await this.status();
    if ((st.revenueReady || st.stockReady) && !st.demo) {
      throw new ConflictException('Hệ thống đã có nguồn dữ liệu báo cáo thật, không nạp dữ liệu mẫu để tránh ghi đè');
    }
    await this.ds.transaction(async (em) => {
      for (const sql of DEMO_INSTALL) await em.query(sql);
    });
    await this.audit.log(actor, {
      action: 'report.demo_load',
      entityName: 'report',
      description: 'Nạp dữ liệu mẫu cho báo cáo tổng hợp',
    });
    return { message: 'Đã nạp dữ liệu mẫu' };
  }

  async removeDemo(actor: AuthUser) {
    const st = await this.status();
    if ((st.revenueReady || st.stockReady) && !st.demo) {
      throw new ConflictException('Nguồn dữ liệu hiện tại là dữ liệu thật, không xóa');
    }
    await this.ds.transaction(async (em) => {
      for (const sql of DEMO_REMOVE) await em.query(sql);
    });
    await this.audit.log(actor, {
      action: 'report.demo_remove',
      entityName: 'report',
      description: 'Xóa dữ liệu mẫu của báo cáo tổng hợp',
    });
    return { message: 'Đã xóa dữ liệu mẫu' };
  }
}
