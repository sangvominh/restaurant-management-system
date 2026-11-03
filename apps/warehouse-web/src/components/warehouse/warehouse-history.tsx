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
  const title = report ? "Báo cáo tồn kho hiện tại" : "Lịch sử giao dịch kho";
  try {
    const inventory = report ? await getInventory(branchCode) : [];
    const movements = report ? [] : await getInventoryMovements(branchCode);
    return (
      <>
        <div className="page-heading workspace-heading">
          <div>
            <h1>{title}</h1>
            <p>
              {report
                ? "Tổng tồn vật lý và tồn khả dụng theo đơn vị cơ sở của từng NVL."
                : "100 giao dịch gần nhất, gồm cả lịch sử chi nhánh ngừng hoạt động."}
            </p>
          </div>
        </div>
        {report && (
          <div className="demo-banner">
            Chưa hỗ trợ báo cáo kỳ tháng/quý/năm: cần API tổng hợp lịch sử đầy
            đủ. Bảng dưới là số dư hiện tại.
          </div>
        )}
        <form className="inventory-toolbar panel" method="get">
          <label className="form-field">
            <span>Mã chi nhánh (trống = tất cả)</span>
            <input name="branchCode" defaultValue={branchCode} />
          </label>
          <button className="button button-secondary">Lọc / Tải lại</button>
        </form>
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
                          "CHI NHÁNH / VỊ TRÍ",
                          "LOẠI",
                          "THAY ĐỔI",
                          "TỒN SAU",
                          "THỜI ĐIỂM",
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
                            {item.branchCode} · {item.locationName}
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
