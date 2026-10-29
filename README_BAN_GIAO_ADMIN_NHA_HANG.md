# Bàn giao API hiện có — Admin Nhà Hàng

## 1. Tồn kho và phiếu thành phẩm

- `GET /warehouse/finished-goods-inventory`
- `GET /warehouse/finished-goods-movements`
- `GET /warehouse/finished-goods-receipts`
- `GET /warehouse/finished-goods-receipts/:code`
- `POST /warehouse/finished-goods-receipts/:code/approve`
- `POST /warehouse/finished-goods-receipts/:code/reject`

**Vị trí:**

- Routes: [`backend/src/warehouse/warehouse.controller.ts`](backend/src/warehouse/warehouse.controller.ts)
- Điều phối: [`backend/src/warehouse/warehouse.service.ts`](backend/src/warehouse/warehouse.service.ts)
- Xử lý API: [`backend/src/warehouse/api/finished-goods.api.ts`](backend/src/warehouse/api/finished-goods.api.ts)
- DTO: [`backend/src/warehouse/dto/approve-finished-goods.dto.ts`](backend/src/warehouse/dto/approve-finished-goods.dto.ts), [`backend/src/warehouse/dto/reject-finished-goods.dto.ts`](backend/src/warehouse/dto/reject-finished-goods.dto.ts)

## 2. Công thức món (BOM)

- `POST /warehouse/boms`
- `GET /warehouse/boms`
- `GET /warehouse/boms/:code`
- `POST /warehouse/boms/check-stock`

**Vị trí:**

- Routes: [`backend/src/warehouse/warehouse.controller.ts`](backend/src/warehouse/warehouse.controller.ts)
- Điều phối: [`backend/src/warehouse/warehouse.service.ts`](backend/src/warehouse/warehouse.service.ts)
- Xử lý API: [`backend/src/warehouse/api/bom.api.ts`](backend/src/warehouse/api/bom.api.ts)
- DTO: [`backend/src/warehouse/dto/create-bom.dto.ts`](backend/src/warehouse/dto/create-bom.dto.ts), [`backend/src/warehouse/dto/check-bom-stock.dto.ts`](backend/src/warehouse/dto/check-bom-stock.dto.ts)

**Schema dữ liệu:** [`backend/prisma/schema.prisma`](backend/prisma/schema.prisma)
