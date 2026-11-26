# API Contract — Customer Web/PWA & React Native App

- **Base URL local:** `http://localhost:3000`
- **Health check:** `GET /health` → trả `{ "status": "ok", "database": "up", "timestamp": "..." }`
- **Format lỗi chung:** HTTP `4xx` trả về JSON `{ "statusCode": 400|401|403|404|409, "message": "Mô tả lỗi tiếng Việt" }`
- **Link QR cho bàn:** trỏ vào `https://<domain-customer-web>/?table=<mã-bàn>` (ví dụ `/?table=BBQ-A01`).

> **Lưu ý khi mới pull code:** Vào thư mục `backend/` chạy `.\node_modules\.bin\prisma.cmd db push --config prisma7.config.ts` và `.\node_modules\.bin\prisma.cmd generate --config prisma7.config.ts` để cập nhật bảng mới (`Customer`, `CustomerOrder`, `CustomerOrderLine`) và 2 cột mới trên `Product` (`description`, `imageUrl`).

---

## 1. Menu & Chi tiết món

### `GET /api/public/categories`
Lấy danh sách danh mục món ăn đang mở bán.

**Response `200`:**
```json
[
  { "id": "uuid", "name": "[BBQ mẫu] Thịt hun khói", "productCount": 4 }
]
```

### `GET /api/public/products?categoryId=&q=`
Lấy thực đơn các món `ACTIVE` đã có giá bán (`sellingPrice > 0`), hỗ trợ lọc theo `categoryId` và tìm kiếm `q` theo tên hoặc mã món.

**Response `200`:**
```json
[
  {
    "id": "uuid",
    "code": "BBQ-TP-RIBS",
    "name": "Sườn heo hun khói",
    "description": null,
    "imageUrl": null,
    "sellingPrice": "690000",
    "unit": { "id": "uuid", "name": "Kilôgam", "symbol": "kg" },
    "category": { "id": "uuid", "name": "[BBQ mẫu] Thịt hun khói" },
    "available": "0.25",
    "inStock": true
  }
]
```
> **Gợi ý UI:** Nếu `inStock === false` (`available === "0"`), hiển thị nhãn **"Tạm hết món"** và khóa nút thêm vào giỏ.

### `GET /api/public/products/:id`
Lấy chi tiết 1 món (dạng object giống 1 phần tử trong mảng `/products`). Nếu món không tồn tại hoặc ngừng bán trả `404`.

---

## 2. QR / Mã bàn, Đặt món & Theo dõi đơn

### `GET /api/public/tables/:code`
Kiểm tra mã bàn quét từ QR hoặc nhập tay (chấp nhận tên bàn như `BBQ-A01` không phân biệt hoa thường, hoặc UUID bàn).

**Response `200`:**
```json
{
  "id": "uuid",
  "code": "BBQ-A01",
  "name": "BBQ-A01",
  "area": "[BBQ mẫu] Trong nhà",
  "status": "ACTIVE"
}
```
- Bàn không tồn tại → `404`
- Bàn ngừng phục vụ (`INACTIVE`) → `409`

### `POST /api/public/orders`
Gửi đơn đặt món từ giỏ hàng.
- **Header tùy chọn:** nếu khách đã đăng nhập, gửi thêm `Authorization: Bearer <token>` để lưu vào lịch sử đơn của tài khoản đó. Khách vãng lai không cần gửi header.
- **Tại bàn:** truyền `tableCode` (ví dụ `"BBQ-A01"`) hoặc `tableId`.
- **Mang đi:** không truyền `tableId`/`tableCode`, bắt buộc truyền ít nhất `customerName` hoặc `customerPhone`.

**Request Body:**
```json
{
  "tableCode": "BBQ-A01",
  "customerName": "Anh Minh",
  "customerPhone": "0909123456",
  "note": "Ít cay",
  "items": [
    { "productId": "uuid", "quantity": 1, "note": "Cắt sẵn" }
  ]
}
```

**Response `201`:**
```json
{
  "id": "uuid",
  "code": "KH-20261125-A1B2C3",
  "orderType": "DINE_IN",
  "status": "PENDING",
  "trackingStatus": "PENDING",
  "trackingLabel": "Chờ nhà hàng xác nhận",
  "customerName": "Anh Minh",
  "customerPhone": "0909123456",
  "note": "Ít cay",
  "rejectReason": null,
  "createdAt": "2026-11-25T03:50:00.000Z",
  "reviewedAt": null,
  "table": { "id": "uuid", "code": "BBQ-A01", "name": "BBQ-A01", "area": "[BBQ mẫu] Trong nhà" },
  "customer": null,
  "saleCode": null,
  "saleStatus": null,
  "reviewedBy": null,
  "total": "690000",
  "lines": [
    {
      "id": "uuid",
      "productId": "uuid",
      "productCode": "BBQ-TP-RIBS",
      "productName": "Sườn heo hun khói",
      "imageUrl": null,
      "unitSymbol": "kg",
      "quantity": "1",
      "unitPrice": "690000",
      "lineTotal": "690000",
      "note": "Cắt sẵn"
    }
  ]
}
```

### `GET /api/public/orders/:code`
Theo dõi trạng thái đơn bằng `code` trả về khi đặt (ví dụ `KH-20261125-A1B2C3`).
- **Cách cập nhật realtime đơn giản:** Web/App gọi lại API này mỗi **5–10 giây** (`polling`) khi màn hình theo dõi đang mở.
- **4 giá trị `trackingStatus` cần hiển thị trên UI:**
  1. `PENDING` → *"Chờ nhà hàng xác nhận"*
  2. `CONFIRMED` → *"Đã xác nhận, đang phục vụ"*
  3. `COMPLETED` → *"Đã hoàn tất"* (khi thu ngân đã thu tiền)
  4. `REJECTED` hoặc `CANCELLED` → *"Nhà hàng đã từ chối"* / *"Đơn đã hủy"* (kèm `rejectReason`)

---

## 3. Tài khoản khách hàng & Lịch sử đơn

### `POST /api/customer/auth/register`
**Body:** `{ "phone": "0909123456", "name": "Nguyễn Văn A", "password": "matkhau123" }` (mật khẩu 6–128 ký tự).
**Response `201`:** `{ "token": "<64-hex>", "customer": { "id": "uuid", "phone": "0909123456", "name": "Nguyễn Văn A", "createdAt": "..." } }`

### `POST /api/customer/auth/login`
**Body:** `{ "phone": "0909123456", "password": "matkhau123" }`
**Response `200`:** `{ "token": "<64-hex>", "customer": { ... } }`

### `GET /api/customer/auth/me`
**Header:** `Authorization: Bearer <token>` → trả thông tin `customer`.

### `POST /api/customer/auth/logout`
**Header:** `Authorization: Bearer <token>` → `{ "message": "Đã đăng xuất" }`.

### `GET /api/customer/orders`
**Header:** `Authorization: Bearer <token>` → trả mảng các đơn khách đã đặt (mới nhất lên đầu), cấu trúc mỗi phần tử giống `/api/public/orders/:code`.

---

## 4. API phía Nhà hàng (`web-restaurant`)

Các API dưới dùng chung `Authorization: Bearer <token>` của nhân viên nhà hàng (`CatalogGuard`):

- `GET /api/restaurant/customer-orders?status=PENDING|APPROVED|REJECTED` — Danh sách đơn khách gửi (mặc định xếp `PENDING` lên đầu).
- `POST /api/restaurant/customer-orders/:id/approve` — Phục vụ duyệt đơn: tự tạo `Sale` mới hoặc **gộp thêm món** vào `Sale` đang mở của bàn đó và giữ tồn kho FEFO.
- `POST /api/restaurant/customer-orders/:id/reject` — Body `{ "reason": "Hết món" }`. Từ chối đơn kèm lý do.
- `PUT /api/restaurant/products/:id/menu-info` — Body `{ "description": "...", "imageUrl": "https://..." }`. Cập nhật mô tả & ảnh món ăn (yêu cầu quyền `product:price`).
