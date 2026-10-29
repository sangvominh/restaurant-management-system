import type { IssueRequest, Material, ProductionOrder } from "@/types/warehouse";

export const materials: Material[] = [
  { code: "NVL001", name: "Thịt bò Mỹ", category: "Thịt & hải sản", unit: "kg", quantity: 8.5, minimum: 15, location: "Kho lạnh A · Kệ 02", expiry: "28/10/2026", branch: "Chi nhánh Quận 1" },
  { code: "NVL002", name: "Phô mai mozzarella", category: "Sữa & chế phẩm", unit: "kg", quantity: 4, minimum: 10, location: "Kho mát · Kệ 01", expiry: "30/10/2026", branch: "Chi nhánh Thảo Điền" },
  { code: "NVL003", name: "Dầu ô liu extra virgin", category: "Gia vị & dầu", unit: "lít", quantity: 22, minimum: 8, location: "Kho khô · Kệ 05", expiry: "18/03/2027", branch: "Chi nhánh Quận 3" },
  { code: "NVL004", name: "Cà chua bi Đà Lạt", category: "Rau củ quả", unit: "kg", quantity: 6, minimum: 12, location: "Kho mát · Kệ 03", expiry: "27/10/2026", branch: "Chi nhánh Quận 1" },
  { code: "NVL005", name: "Bột mì số 13", category: "Ngũ cốc", unit: "kg", quantity: 48, minimum: 20, location: "Kho khô · Kệ 02", expiry: "12/02/2027", branch: "Chi nhánh Bình Thạnh" },
  { code: "NVL006", name: "Tôm sú loại 1", category: "Thịt & hải sản", unit: "kg", quantity: 3.2, minimum: 8, location: "Kho lạnh A · Kệ 04", expiry: "29/10/2026", branch: "Chi nhánh Thảo Điền" },
  { code: "NVL007", name: "Rau xà lách lolo", category: "Rau củ quả", unit: "kg", quantity: 13, minimum: 10, location: "Kho mát · Kệ 05", expiry: "29/10/2026", branch: "Chi nhánh Quận 3" },
  { code: "NVL008", name: "Sốt cà chua Napoli", category: "Gia vị & dầu", unit: "lít", quantity: 17, minimum: 8, location: "Kho khô · Kệ 07", expiry: "08/05/2027", branch: "Chi nhánh Bình Thạnh" },
];

export const issueRequests: IssueRequest[] = [
  { code: "PX-NVL-0248", branch: "Chi nhánh Quận 1", date: "26/10/2026 · 09:42", requester: "Nguyễn Minh Anh", status: "Chờ duyệt", items: [{ name: "Thịt bò Mỹ", quantity: 4, unit: "kg" }, { name: "Phô mai mozzarella", quantity: 2, unit: "kg" }, { name: "Rau xà lách lolo", quantity: 1.5, unit: "kg" }] },
  { code: "PX-NVL-0247", branch: "Chi nhánh Thảo Điền", date: "26/10/2026 · 08:15", requester: "Trần Gia Hân", status: "Chờ duyệt", items: [{ name: "Tôm sú loại 1", quantity: 2, unit: "kg" }, { name: "Cà chua bi Đà Lạt", quantity: 3, unit: "kg" }] },
  { code: "PX-NVL-0246", branch: "Chi nhánh Quận 3", date: "25/10/2026 · 16:28", requester: "Lê Hoàng Nam", status: "Đã duyệt", items: [{ name: "Bột mì số 13", quantity: 5, unit: "kg" }] },
  { code: "PX-NVL-0245", branch: "Chi nhánh Quận 1", date: "25/10/2026 · 14:05", requester: "Phạm Thuỳ Linh", status: "Từ chối", items: [{ name: "Thịt bò Mỹ", quantity: 20, unit: "kg" }] },
  { code: "PX-NVL-0244", branch: "Chi nhánh Bình Thạnh", date: "25/10/2026 · 11:32", requester: "Đỗ Minh Khang", status: "Đã duyệt", items: [{ name: "Dầu ô liu extra virgin", quantity: 4, unit: "lít" }] },
];

export const productionOrders: ProductionOrder[] = [
  { code: "LSX-0084", product: "Pizza Margherita", quantity: 24, assignee: "Lê Hoàng Nam", materialStatus: "Đủ nguyên liệu", status: "Đang sản xuất", progress: 68 },
  { code: "LSX-0083", product: "Mì Ý sốt bò bằm", quantity: 18, assignee: "Phạm Thuỳ Linh", materialStatus: "Đủ nguyên liệu", status: "Đang sản xuất", progress: 42 },
  { code: "LSX-0082", product: "Salad tôm Địa Trung Hải", quantity: 12, assignee: "Đỗ Minh Khang", materialStatus: "Chờ bổ sung", status: "Chờ nguyên liệu", progress: 0 },
];

export const chartData = [
  { day: "20/10", inbound: 42, outbound: 28 }, { day: "21/10", inbound: 35, outbound: 31 },
  { day: "22/10", inbound: 55, outbound: 38 }, { day: "23/10", inbound: 28, outbound: 34 },
  { day: "24/10", inbound: 64, outbound: 43 }, { day: "25/10", inbound: 48, outbound: 36 },
  { day: "26/10", inbound: 37, outbound: 29 },
];

export const branches = ["Tất cả chi nhánh", "Chi nhánh Quận 1", "Chi nhánh Thảo Điền", "Chi nhánh Quận 3", "Chi nhánh Bình Thạnh"];
