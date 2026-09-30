---
id: "HDB-10"
specStatus: "Tổng hợp; xem nhãn từng mục"
codeStatus: "Chưa xác minh triển khai"
owner: "Nhóm dự án"
reviewed: "2026-09-29"
summary: "API & WebSocket"
---

# 10. Hợp đồng API và cập nhật thời gian thực

<DocMeta />

Tất cả đường dẫn dưới đây là **[ĐỀ XUẤT]**, chưa tồn tại trong repo. Dùng tiền tố `/api/v1`. Nhóm phải duyệt DTO/OpenAPI trước khi frontend và backend triển khai độc lập.

## 10.1 Nhóm endpoint

| Nhóm | Ví dụ endpoint | Quyền/điều kiện |
|---|---|---|
| Xác thực | POST `/auth/login`; GET `/auth/me`; POST `/auth/change-password` | Tài khoản hợp lệ; trừ login phải xác thực |
| Quản trị | `/users`, `/roles`, `/areas`, `/tables`, `/menu-items`, `/suppliers` | Kiểm tra permission tương ứng; phân trang/lọc |
| Đặt bàn | GET `/availability`; POST `/reservations`; POST `/reservations/:id/cancel` | Thành viên hoặc nhân viên được cấp quyền |
| Check-in | POST `/reservations/:id/check-in`; POST `/sessions` | Quy tắc cấp quyền mở phiên phải chốt |
| Gọi món | POST `/sessions/:id/orders`; GET `/sessions/:id/orders` | Có quyền đúng phiên; phiên cho phép gọi |
| Bếp | POST `/order-items/:id/start`; POST `/order-items/:id/ready`; POST `/order-items/:id/cancel` | Đúng vai trò và trạng thái |
| Tính tiền | POST `/sessions/:id/checkout`; GET `/invoices/:id` | Quyền thu ngân hoặc quyền xem của khách |
| Thanh toán | POST `/invoices/:id/payments`; POST `/payments/provider-callback` | Callback phải xác minh; chống lặp |
| Thành viên | GET `/me/history`; GET `/me/loyalty` | Chỉ dữ liệu của tài khoản hiện tại |
| Kho | `/inventory-items`, `/units`, `/stock-balances`, `/stock-documents` | Phân quyền đọc/ghi riêng |
| Phiếu kho | POST `/stock-documents/:id/submit`, `/approve`, `/reject`, `/cancel` | Kiểm tra type, trạng thái và quyền |
| Nhập kho | POST `/stock-documents/:id/post` | Chỉ phiếu nhập hợp lệ; không dùng thay approve phiếu xuất |
| Sản xuất | `/boms`; `/production-orders`; POST `/production-orders/:id/complete` | Hoàn tất phải gắn xuất nguyên liệu hợp lệ |
| Báo cáo | GET `/reports/inventory`; GET `/analytics/sales` | Khoảng thời gian hợp lệ, quyền quản lý |

## 10.2 Ví dụ tạo order

```json
{
  "idempotencyKey": "client-request-unique-id",
  "items": [
    { "menuItemId": "menu-item-id", "quantity": 2, "note": "Không hành" }
  ]
}
```

Backend không nhận tổng tiền client làm nguồn đúng. Giá trả về lấy từ cấu hình server và được lưu vào dòng order. Retry cùng khóa/phạm vi và cùng nội dung trả lại kết quả đã tạo; cùng khóa nhưng khác nội dung trả lỗi xung đột.

## 10.3 Quy ước phản hồi

- ID dạng chuỗi; timestamp ISO 8601; thống nhất cách truyền decimal và tiền trước khi viết SDK.
- Danh sách có phân trang, sort và filter được whitelist.
- `400`: dữ liệu không hợp lệ; `401`: chưa xác thực; `403`: không có quyền; `404`: không tìm thấy trong phạm vi được phép; `409`: trạng thái/xung đột nghiệp vụ.
- Lỗi có `code`, `message`, `details` phù hợp và `requestId`; không lộ stack trace hoặc secret.
- Ví dụ mã nghiệp vụ: `INSUFFICIENT_STOCK`, `DOCUMENT_ALREADY_POSTED`, `TABLE_TIME_CONFLICT`, `ORDER_ITEM_ALREADY_STARTED`.
- Với thao tác đã thành công và retry hợp lệ, trả kết quả cũ; không tạo side effect lần hai.

## 10.4 WebSocket

Event đề xuất: `order.created`, `order_item.status_changed`, `production_order.status_changed`, `stock_document.status_changed`, `stock.balance_changed`, `payment.succeeded`.

Envelope tối thiểu: `eventId`, `type`, `entityId`, `occurredAt`, `version`, dữ liệu cần hiển thị. Chỉ phát sau khi transaction commit. Phân room theo quyền của nhân viên hoặc phiên khách; không broadcast dữ liệu mọi bàn cho mọi người.

WebSocket giúp cập nhật nhanh; REST/CSDL vẫn là nguồn trạng thái chuẩn. Khi reconnect, client tải lại trạng thái; event lặp hoặc đến muộn không được làm UI quay về trạng thái cũ. Không tạo event lần hai thành một giao dịch mới.
