# Quyền API Kho / Nhà hàng

Mọi API bên dưới cần phiên đăng nhập hợp lệ, portal warehouse và không phải System Admin. Nhiều quyền trong một dòng có nghĩa ít nhất một quyền. Các thao tác chờ chốt quyền luôn bị từ chối.

| API | Quyền |
| --- | --- |
| GET /warehouse/receipt-options | `inventory:import` |
| GET /warehouse/inventory | `inventory:view` |
| GET /warehouse/inventory/:code | `inventory:view` |
| GET /warehouse/bom-materials | `bom:manage` |
| GET /warehouse/bom-products | `bom:manage` |
| POST /warehouse/receipts | `inventory:import` |
| GET /warehouse/receipts | `inventory:import` |
| GET /warehouse/receipts/:code | `inventory:import` |
| GET /warehouse/material-issues | `inventory:approve-export` |
| GET /warehouse/material-issues/:code | `inventory:approve-export` |
| POST /warehouse/material-issues/:code/approve | `inventory:approve-export` |
| POST /warehouse/material-issues/:code/reject | `inventory:approve-export` |
| POST /warehouse/boms | `bom:manage` |
| GET /warehouse/boms | `bom:manage` |
| GET /warehouse/boms/product/:productCode | `bom:manage` |
| GET /warehouse/boms/:code | `bom:manage` |
| PATCH /warehouse/boms/:code | `bom:manage` |
| POST /warehouse/boms/:code/version | `bom:manage` |
| PATCH /warehouse/boms/:code/status | `bom:manage` |
| POST /warehouse/boms/check-stock | `bom:manage` |
| POST /warehouse/production-orders | Đóng — chờ thống nhất quyền |
| GET /warehouse/production-orders | Đóng — chờ thống nhất quyền |
| GET /warehouse/production-orders/:code | Đóng — chờ thống nhất quyền |
| POST /warehouse/production-orders/:code/check-materials | Đóng — chờ thống nhất quyền |
| POST /warehouse/production-orders/:code/confirm | Đóng — chờ thống nhất quyền |
| POST /warehouse/production-orders/:code/issue-materials | Đóng — chờ thống nhất quyền |
| GET /warehouse/production-orders/:code/material-movements | Đóng — chờ thống nhất quyền |
| POST /warehouse/production-orders/:code/cancel | Đóng — chờ thống nhất quyền |
| GET /warehouse/production-orders/:code/progress | Đóng — chờ thống nhất quyền |
| POST /warehouse/production-orders/:code/assign | Đóng — chờ thống nhất quyền |
| POST /warehouse/production-orders/:code/start | Đóng — chờ thống nhất quyền |
| POST /warehouse/production-orders/:code/finished-goods | Đóng — chờ thống nhất quyền |
| GET /warehouse/finished-goods-receipts | Đóng — chờ thống nhất quyền |
| POST /warehouse/finished-goods-receipts/:code/approve | Đóng — chờ thống nhất quyền |
| POST /warehouse/finished-goods-receipts/:code/reject | Đóng — chờ thống nhất quyền |
| GET /warehouse/finished-goods-inventory | `product:view` hoặc `finished-goods:approve-export` |
| GET /warehouse/finished-goods-receipts/:code | Đóng — chờ thống nhất quyền |
| GET /warehouse/finished-goods-movements | `product:view` hoặc `finished-goods:approve-export` |
| GET /warehouse/finished-goods-issues | `finished-goods:approve-export` |
| GET /warehouse/finished-goods-issue-branches | `finished-goods:approve-export` |
| POST /warehouse/finished-goods-issues | `finished-goods:request-export` |
| POST /warehouse/finished-goods-issues/:code/approve | `finished-goods:approve-export` |
| POST /warehouse/finished-goods-issues/:code/reject | `finished-goods:approve-export` |
| GET /warehouse/finished-goods-defects | Đóng — chờ thống nhất quyền |
| POST /warehouse/finished-goods-defects | Đóng — chờ thống nhất quyền |
| POST /warehouse/finished-goods-defects/:code/approve | Đóng — chờ thống nhất quyền |
| POST /warehouse/finished-goods-defects/:code/reject | Đóng — chờ thống nhất quyền |
| GET /warehouse/inventory-movements | `inventory:view` |
| GET /warehouse/waste-requests | Đóng — chờ thống nhất quyền |
| POST /warehouse/waste-requests/:code/approve | Đóng — chờ thống nhất quyền |
| POST /warehouse/waste-requests/:code/reject | Đóng — chờ thống nhất quyền |
| POST /products | Đóng — chờ thống nhất quyền |
| GET /products | `product:view` |
| GET /products/categories | `product:view` |
| GET /products/finished-goods-stock | `product:view` hoặc `finished-goods:approve-export` |
| GET /products/:code | `product:view` |
| PATCH /products/:code | Đóng — chờ thống nhất quyền |
| DELETE /products/:code | Đóng — chờ thống nhất quyền |
