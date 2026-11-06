import { Suspense } from "react";
import WarehousePeriodSummary from "@/components/dashboard/warehouse-period-summary";
import Link from "next/link";
import {
  getInventory,
  getInventoryAlerts,
  getInventoryMovements,
} from "@/services/inventory.service";
import { warehouseService } from "@/services/warehouse-service";

async function DashboardContent() {
  try {
    const [inventory, alerts, issues, movements, receipts] = await Promise.all([
      getInventory(),
      getInventoryAlerts(),
      warehouseService.getMaterialIssues("PENDING"),
      getInventoryMovements(),
      warehouseService.getReceipts(),
    ]);
    const today = new Intl.DateTimeFormat("sv-SE", { timeZone: "Asia/Ho_Chi_Minh" }).format(new Date());
    const firstDay = new Date(today + "T00:00:00+07:00");
    firstDay.setTime(firstDay.getTime() - 4 * 24 * 60 * 60 * 1000);
    const recentMovements = movements.filter(item => new Date(item.createdAt) >= firstDay && new Date(item.createdAt) <= new Date());
    return (
      <>
        <div className="page-heading">
          <div>
            <h1>Tổng quan kho nguyên vật liệu</h1>
          </div>
          <Link className="button button-primary" href="/receipts">
            Tạo phiếu nhập
          </Link>
        </div>
        <section className="kpi-grid warehouse-kpis">
          {[
            [
              "Nguyên vật liệu đang hoạt động",
              inventory.filter((item) => item.status === "ACTIVE").length,
            ],
            ["NVL có tồn khả dụng thấp", alerts.length],
            ["Phiếu xuất chờ (tối đa 50)", issues.length],
            ["Phiếu nhập gần đây (tối đa 50)", receipts.length],
          ].map(([label, value]) => (
            <div className="kpi-card" key={label}>
              <span className="kpi-label">{label}</span>
              <div className="kpi-value-row">
                <strong>{value}</strong>
              </div>
              <span className="kpi-note">Dữ liệu hiện tại</span>
            </div>
          ))}
        </section>
        <Suspense fallback={<div className="inventory-empty" role="status">Đang tổng hợp nhập kho và hao hụt…</div>}><WarehousePeriodSummary receipts={receipts}/></Suspense>
        <section className="dashboard-grid dashboard-grid-primary">
          <div className="panel">
            <div className="panel-header">
              <h2>Cảnh báo tồn kho</h2>
              <Link className="text-link" href="/inventory">
                Xem tồn kho
              </Link>
            </div>
            {!alerts.length ? (
              <div className="inventory-empty">Không có NVL cần cảnh báo.</div>
            ) : (
              <div className="alert-list">
                {alerts.slice(0, 6).map((item) => (
                  <div className="alert-row" key={item.code}>
                    <div className="alert-main">
                      <strong>{item.name}</strong>
                      <span>{item.code}</span>
                    </div>
                    <div className="alert-stock">
                      <strong className="danger">
                        {item.availableStock} {item.unit}
                      </strong>
                      <span>
                        Tối thiểu: {item.minStock} {item.unit}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className="panel">
            <div className="panel-header">
              <h2>Phiếu xuất chờ duyệt</h2>
              <Link className="text-link" href="/material-issues">
                Mở danh sách
              </Link>
            </div>
            {!issues.length ? (
              <div className="inventory-empty">
                Chưa có đề nghị từ nhân viên.
              </div>
            ) : (
              <div className="alert-list">
                {issues.slice(0, 6).map((item) => (
                  <div className="alert-row" key={item.issueCode}>
                    <div className="alert-main">
                      <strong>{item.issueCode}</strong>
                    </div>
                    <span className="status-pill warning">Chờ duyệt</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <div className="panel dashboard-recent-movements">
          <div className="panel-header">
            <div>
              <h2>Giao dịch kho 5 ngày gần nhất</h2>
              <p>Hôm nay và 4 ngày trước, theo giờ Việt Nam. API trả tối đa 100 giao dịch.</p>
            </div>
            <Link className="text-link" href="/transactions">
              Xem lịch sử
            </Link>
          </div>
          {!recentMovements.length ? (
            <div className="inventory-empty">Không có giao dịch trong 5 ngày gần nhất.</div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>NVL / LÔ</th>
                    <th>LOẠI</th>
                    <th>THAY ĐỔI</th>
                    <th>TỒN SAU</th>
                    <th>THỜI GIAN</th>
                  </tr>
                </thead>
                <tbody>
                  {recentMovements.map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.materialCode} · {item.lotCode}
                      </td>
                      <td>
                        {(
                          {
                            RECEIPT: "Nhập kho",
                            ISSUE: "Xuất kho",
                            WASTE: "Hao hụt",
                            RETURN: "Hoàn trả",
                          } as Record<string, string>
                        )[item.movementType] ?? item.movementType}
                      </td>
                      <td>{item.quantityChange}</td>
                      <td>{item.quantityAfter}</td>
                      <td>{new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short", timeZone: "Asia/Ho_Chi_Minh" }).format(new Date(item.createdAt))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </>
    );
  } catch (cause) {
    return (
      <div className="inventory-error" role="alert">
        <h1>Chưa tải được tổng quan kho</h1>
        <p>
          {cause instanceof Error ? cause.message : "Kiểm tra kết nối Backend."}
        </p>
        <form>
          <button className="button button-primary">Thử lại</button>
        </form>
      </div>
    );
  }
}

export default function WarehouseDashboard() {
  return <Suspense fallback={<div className="inventory-empty" role="status">Đang tải tổng quan kho…</div>}><DashboardContent/></Suspense>;
}
