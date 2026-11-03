import Link from "next/link";
import {
  getInventory,
  getInventoryAlerts,
  getInventoryMovements,
} from "@/services/inventory.service";
import { warehouseService } from "@/services/warehouse-service";

export default async function WarehouseDashboard() {
  try {
    const [inventory, alerts, issues, movements] = await Promise.all([
      getInventory(),
      getInventoryAlerts(),
      warehouseService.getMaterialIssues("PENDING"),
      getInventoryMovements(),
    ]);
    return (
      <>
        <div className="page-heading">
          <div>
            <div className="eyebrow">
              {new Date().toLocaleDateString("vi-VN", {
                timeZone: "Asia/Ho_Chi_Minh",
                dateStyle: "full",
              })}
            </div>
            <h1>Tổng quan kho nguyên vật liệu</h1>
            <p>Số liệu trực tiếp từ hệ thống kho.</p>
          </div>
          <Link className="button button-primary" href="/receipts">
            Tạo phiếu nhập
          </Link>
        </div>
        <section className="kpi-grid">
          {[
            [
              "Nguyên vật liệu đang hoạt động",
              inventory.filter((item) => item.status === "ACTIVE").length,
            ],
            ["NVL có tồn khả dụng thấp", alerts.length],
            ["Phiếu xuất chờ (tải tối đa 50)", issues.length],
          ].map(([label, value]) => (
            <div className="kpi-card" key={label}>
              <span className="kpi-label">{label}</span>
              <div className="kpi-value-row">
                <strong>{value}</strong>
              </div>
              <span className="kpi-note">Dữ liệu Backend</span>
            </div>
          ))}
        </section>
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
                      <span>
                        {item.branchCode} · {item.branchName}
                      </span>
                    </div>
                    <span className="status-pill warning">Chờ duyệt</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
        <div className="panel">
          <div className="panel-header">
            <div>
              <h2>Giao dịch kho gần nhất</h2>
              <p>Trong 100 giao dịch gần nhất từ Backend.</p>
            </div>
            <Link className="text-link" href="/transactions">
              Xem lịch sử
            </Link>
          </div>
          {!movements.length ? (
            <div className="inventory-empty">Chưa có giao dịch kho.</div>
          ) : (
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>NVL / LÔ</th>
                    <th>CHI NHÁNH</th>
                    <th>LOẠI</th>
                    <th>THAY ĐỔI</th>
                    <th>TỒN SAU</th>
                  </tr>
                </thead>
                <tbody>
                  {movements.slice(0, 8).map((item, index) => (
                    <tr key={index}>
                      <td>
                        {item.materialCode} · {item.lotCode}
                      </td>
                      <td>{item.branchCode}</td>
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
