import Link from "next/link";
import InventoryMovementDetail from "@/components/warehouse/inventory-movement-detail";
import {
  getInventory,
  getInventoryMovements,
} from "@/services/inventory.service";

export default async function WarehouseHistory({
  report = false,
  branchCode = "",
  page: requestedPage = 1,
}: {
  report?: boolean;
  branchCode?: string;
  page?: number;
}) {
  const title = report ? "Tồn kho hiện tại" : "Lịch sử giao dịch kho";
  try {
    const inventory = report ? await getInventory(branchCode) : [];
    const movements = report ? [] : await getInventoryMovements(branchCode);
    const total = report ? inventory.length : movements.length;
    const pageCount = Math.max(1, Math.ceil(total / 10));
    const page = Number.isInteger(requestedPage) ? Math.max(1, Math.min(requestedPage, pageCount)) : 1;
    const pageLink = (next: number) => "?" + new URLSearchParams({ ...(branchCode ? { branchCode } : {}), page: String(next) });
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
                    ? inventory.slice((page - 1) * 10, page * 10).map((item) => (
                        <tr key={item.code}>
                          <td>{item.code}</td>
                          <td>{item.name}</td>
                          <td>{item.unit}</td>
                          <td>{item.totalStock}</td>
                          <td>{item.availableStock}</td>
                          <td>{item.minStock}</td>
                        </tr>
                      ))
                    : movements.slice((page - 1) * 10, page * 10).map((item, index) => (
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
              <nav className="list-pagination" aria-label="Phân trang"><span>Hiển thị {(page - 1) * 10 + 1}–{Math.min(page * 10, total)} / {total}</span><div>{page > 1 ? <Link className="button button-secondary" aria-label="Trang trước" href={pageLink(page - 1)}>Trước</Link> : <button className="button button-secondary" disabled>Trước</button>}<span>Trang {page} / {pageCount}</span>{page < pageCount ? <Link className="button button-secondary" aria-label="Trang sau" href={pageLink(page + 1)}>Sau</Link> : <button className="button button-secondary" disabled>Sau</button>}</div></nav>
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
