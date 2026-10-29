# Bàn giao Backend — Admin Nhà Hàng

Tài liệu này bàn giao **2 phần** được xác định từ yêu cầu phân hệ Admin Nhà Hàng: (1) quản lý sản phẩm/thành phẩm và luồng xuất thành phẩm để bán; (2) cấu hình công thức món (BOM). Nội dung đối chiếu với mã nguồn hiện tại; API được ghi là “đã có” khi đã tìm thấy route và xử lý tương ứng trong backend, không hàm ý đã được kiểm thử end-to-end.

## Phạm vi và ranh giới

Admin Kho tập trung đúng 5 chức năng: nhà cung cấp, danh mục/nguyên vật liệu, nhập nguyên liệu, duyệt yêu cầu xuất nguyên liệu và theo dõi tồn nguyên liệu. Tài liệu này không chuyển các chức năng đó sang Admin Nhà Hàng.

Các route bên dưới hiện được đặt dưới `/warehouse`. Việc chuyển namespace, chia module hoặc giữ tương thích route cũ cần được thống nhất giữa hai người phụ trách trước khi sửa API. Backend hiện chưa có guard xác thực/phân quyền theo vai trò; cần xử lý trước khi đưa API ra môi trường dùng thật.

---

## Phần 1 — Sản phẩm, tồn thành phẩm và xuất thành phẩm để bán

### API đang có

| Method và route hiện tại | Tình trạng / ý nghĩa |
|---|---|
| `GET /warehouse/finished-goods-inventory?branchCode=BR001&productCode=...` | Có. Đọc tồn thành phẩm theo chi nhánh, có thể lọc theo mã sản phẩm. |
| `GET /warehouse/finished-goods-movements` | Có. Đọc lịch sử nhập thành phẩm, tối đa 100 dòng gần nhất. |
| `GET /warehouse/finished-goods-receipts?status=PENDING` | Có. Danh sách phiếu nhân viên báo hoàn thành sản xuất để nhập thành phẩm vào kho. |
| `GET /warehouse/finished-goods-receipts/:code` | Có. Chi tiết phiếu nhập thành phẩm từ sản xuất. |
| `POST /warehouse/finished-goods-receipts/:code/approve` | Có. Duyệt số lượng thành phẩm đạt và cộng tồn kho. |
| `POST /warehouse/finished-goods-receipts/:code/reject` | Có. Từ chối phiếu nhập thành phẩm, đưa lệnh sản xuất về trạng thái xử lý. |

**Lưu ý nghiệp vụ:** nhóm `finished-goods-receipts` là **nhập thành phẩm từ sản xuất**. Nó không phải phiếu yêu cầu **xuất thành phẩm để bán** được nêu trong yêu cầu Admin Nhà Hàng. Không dùng lại hai API approve/reject này cho luồng xuất bán.

### Còn thiếu trong phần Admin Nhà Hàng

- API quản lý danh mục sản phẩm/thành phẩm bán ra: xem danh sách, tìm kiếm, lọc, sắp xếp, tạo, cập nhật và ngừng kinh doanh. Hiện `productCode` chỉ là chuỗi trong BOM/tồn thành phẩm; chưa có model `Product` hay CRUD sản phẩm.
- API tạo yêu cầu xuất thành phẩm để bán (thường thuộc app nhân viên) và API cho quản lý nhà hàng xem danh sách/chi tiết, duyệt hoặc từ chối yêu cầu đó.
- Model và lịch sử giao dịch xuất thành phẩm; hiện model `FinishedGoodsMovement` chỉ ghi nhận **nhập** thành phẩm khi duyệt phiếu hoàn tất sản xuất.
- Quy tắc chốt tồn theo chi nhánh/vị trí, xử lý yêu cầu đồng thời, chống duyệt lặp và trả lỗi khi không đủ hàng.

### Hợp đồng API nên thiết kế

Đây là đề xuất cho phần còn thiếu, chưa tồn tại trong code:

```text
GET    /restaurant/products?search=&category=&status=&sort=&page=&limit=
GET    /restaurant/products/:code
POST   /restaurant/products
PATCH  /restaurant/products/:code
DELETE /restaurant/products/:code   # ưu tiên ngừng hoạt động nếu đã phát sinh giao dịch

GET    /restaurant/finished-goods-issues?branchCode=&status=&page=&limit=
GET    /restaurant/finished-goods-issues/:code
POST   /restaurant/finished-goods-issues/:code/approve
POST   /restaurant/finished-goods-issues/:code/reject
```

Yêu cầu xuất và duyệt phải ghi movement âm, kiểm tra tồn theo vị trí/chi nhánh, cập nhật tồn và trạng thái trong cùng transaction. Tên route/DTO cuối cùng do người nhận bàn giao chốt với app nhân viên.

---

## Phần 2 — Cấu hình công thức món (BOM)

### API đang có

| Method và route hiện tại | Tình trạng / ý nghĩa |
|---|---|
| `POST /warehouse/boms` | Có. Tạo BOM cùng danh sách nguyên liệu, đơn vị và định lượng. |
| `GET /warehouse/boms` | Có. Danh sách tối đa 50 BOM gần nhất. |
| `GET /warehouse/boms/:code` | Có. Chi tiết BOM theo mã. |
| `POST /warehouse/boms/check-stock` | Có. Ước tính đủ/thiếu nguyên liệu theo BOM, chi nhánh và số lượng cần làm. Đây là kiểm tra tồn phục vụ MRP, không ghi kho. |

Ví dụ payload tạo BOM theo DTO hiện tại:

```json
{
  "code": "BOM-BANHMI-V1",
  "productCode": "BANHMI",
  "outputQuantity": "1",
  "details": [
    { "materialCode": "NVL-BANH", "unitName": "cái", "quantity": "1" },
    { "materialCode": "NVL-CHA", "unitName": "kg", "quantity": "0.12" }
  ]
}
```

Ví dụ kiểm tra tồn:

```json
{
  "bomCode": "BOM-BANHMI-V1",
  "branchCode": "BR001",
  "productionQuantity": "50"
}
```

### Giới hạn hiện tại cần nhận khi bàn giao

- Chỉ có tạo, đọc và kiểm tra tồn; chưa có cập nhật công thức, ngừng kích hoạt/xóa, hoặc API chọn phiên bản hiệu lực.
- `version` có trong CSDL nhưng DTO tạo BOM không nhận phiên bản; cần thống nhất cách tăng phiên bản và giữ lịch sử khi công thức đổi.
- `productCode` hiện là chuỗi, chưa liên kết đến danh mục sản phẩm vì backend chưa có model/API sản phẩm.
- Kiểm tra tồn là tính toán theo lượng nguyên liệu hiện có; việc đặt lệnh sản xuất và cấp phát nguyên liệu thuộc luồng MRP, không phải thao tác cấu hình BOM.

### Hợp đồng API nên bổ sung

```text
PATCH  /restaurant/boms/:code
POST   /restaurant/boms/:code/activate
POST   /restaurant/boms/:code/deactivate
```

Không nên xóa cứng BOM đã được lệnh sản xuất tham chiếu. Khi sửa công thức đã sử dụng, nên tạo phiên bản mới và giữ phiên bản cũ để tra cứu lệnh lịch sử.

---

## Các API ngoài hai phần bàn giao

`/warehouse/production-orders*` phục vụ lệnh sản xuất, kiểm tra/cấp phát nguyên liệu, giao nhân viên và tiến độ. Đây là luồng MRP/nhân viên, không thuộc đúng 5 chức năng Admin Kho trong ảnh và cũng không chuyển sang Admin Nhà Hàng trong lần bàn giao này. Tạm dừng phát triển phần này cho đến khi nhóm chốt owner.

`/warehouse/waste-requests*` xử lý hao hụt phát sinh từ phiếu nhập thành phẩm. Chưa được mô tả trong hai phần bàn giao; tạm dừng và xác nhận chủ nghiệp vụ trước khi mở rộng.

## Tệp mã nguồn tham chiếu

- Route và điều phối: [`backend/src/warehouse/warehouse.controller.ts`](backend/src/warehouse/warehouse.controller.ts), [`backend/src/warehouse/warehouse.service.ts`](backend/src/warehouse/warehouse.service.ts)
- BOM: [`backend/src/warehouse/api/bom.api.ts`](backend/src/warehouse/api/bom.api.ts), [`backend/src/warehouse/dto/create-bom.dto.ts`](backend/src/warehouse/dto/create-bom.dto.ts), [`backend/src/warehouse/dto/check-bom-stock.dto.ts`](backend/src/warehouse/dto/check-bom-stock.dto.ts)
- Tồn thành phẩm và phiếu nhập thành phẩm: [`backend/src/warehouse/api/finished-goods.api.ts`](backend/src/warehouse/api/finished-goods.api.ts)
- Mô hình dữ liệu: [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma)
