import InventoryMovementDetail from "@/components/warehouse/inventory-movement-detail";
import {
  getInventory,
  getInventoryMovements,
} from "@/services/inventory.service";

export default async function WarehouseHistory({
  report = false,
  branchCode = "",
}: {
  report?: boolean;
  branchCode?: string;
}) {
  const title = report ? "Tồn kho hiện tại" : "Lịch sử giao dịch kho";
  try {
    const inventory = report ? await getInventory(branchCode) : [];
    const movements = report ? [] : await getInventoryMovements(branchCode);
    return (
      <>
        <div className="page-heading workspace-heading">
          <div>
            <h1>{title}</h1>

          </div>
        </div>
        <form className="inventory-toolbar panel" method="get">
          <button className="button button-secondary">Tải lại</button>
        </form>
        <p className="data-limit-note">{report ? "Chưa hỗ trợ báo cáo theo kỳ." : "Chỉ hiển thị 100 giao dịch gần nhất."}</p>
        <div className="panel workspace-table-panel">
          {!(report ? inventory.length : movements.length) ? (
            <div className="inventory-empty">Chưa có dữ liệu phù hợp.</div>
          ) : (
            <div className="table-wrap">
              <table className="data-table workspace-table">
                <thead>
                  <tr>
                    {(report
                      ? [
                          "MÃ NVL",
                          "TÊN",
                          "ĐƠN VỊ",
                          "TỔNG TỒN",
                          "KHẢ DỤNG",
                          "TỐI THIỂU",
                        ]
                      : [
                          "MÃ NVL",
                          "LÔ",
                          "VỊ TRÍ",
                          "LOẠI",
                          "THAY ĐỔI",
                          "TỒN SAU",
                          "THỜI ĐIỂM",
                          "THAO TÁC",
                        ]
                    ).map((label) => (
                      <th key={label}>{label}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {report
                    ? inventory.map((item) => (
                        <tr key={item.code}>
                          <td>{item.code}</td>
                          <td>{item.name}</td>
                          <td>{item.unit}</td>
                          <td>{item.totalStock}</td>
                          <td>{item.availableStock}</td>
                          <td>{item.minStock}</td>
                        </tr>
                      ))
                    : movements.map((item, index) => (
                        <tr key={index}>
                          <td>{item.materialCode}</td>
                          <td>{item.lotCode}</td>
                          <td>
                            {item.locationName}
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
                          <td>
                            {new Date(item.createdAt).toLocaleString("vi-VN", {
                              timeZone: "Asia/Ho_Chi_Minh",
                            })}
                          </td>
                          <td><InventoryMovementDetail movement={item}/></td>
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
        <h1>{title}</h1>
        <p>
          {cause instanceof Error ? cause.message : "Chưa tải được dữ liệu."}
        </p>
        <form>
          <button className="button button-primary">Thử lại</button>
        </form>
      </div>
    );
  }
}
