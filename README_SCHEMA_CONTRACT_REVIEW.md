# Kiểm tra schema và contract tích hợp

**Cập nhật:** phần dưới là khảo sát trước khi sửa. Luồng dùng chung phiếu đã được nối và kiểm thử trên DB test; xem [báo cáo hiện tại](README_SHARED_MATERIAL_ADJUSTMENTS.md).

Ngày kiểm tra: 05/11/2026. Nhánh feat/restaurant_v2 tại workspace ổ D.

## Phạm vi và môi trường

- Được phép tạo restaurant_integration_test trên PostgreSQL local hiện có.
- Chỉ migrate/ghi fixture trong DB test này; không migrate, seed, reset hay ghi restaurant_dev/restaurant_staff_demo.
- Không tạo container/volume. Không đổi connection của các giao diện đang mở.
- Không sửa migration đã áp dụng, Prisma schema, Backend nghiệp vụ hoặc UI.
- Các thay đổi di chuyển frontend từ lượt trước được giữ nguyên.

## Kết quả

| Kiểm tra | Kết quả |
| --- | --- |
| prisma migrate deploy trên DB mới | 31/31 migration thành công |
| Bảng/cột yêu cầu bởi code gộp | Có đầy đủ trong DB test |
| Backfill bảy danh mục cũ | Giữ nguyên ID/tên; mã mới không rỗng, không trùng |
| Nâng cấp BOM cũ mã UNMAPPED-LEGACY | Tái hiện FK 23503; rollback giữ dữ liệu fixture |
| Nâng cấp BOM cũ mã TP001 | Cũng bị FK 23503; FK được thêm trước seed Product |
| Bộ test migration | 4 PASS |
| HTTP GET /warehouse/inventory và /warehouse/boms trên DB test | 200; chỉ xác nhận truy cập schema, chưa nghiệm thu toàn bộ nghiệp vụ |
| Typecheck / build Backend | PASS |
| Dọn fixture/schema tạm | Không còn fixture của lượt chạy hoặc schema integration_schema_* |

**BLOCKED với nâng cấp DB có BOM cũ:** migration 20261029200000_add_product_table thêm FK sang bảng Product đang trống trước khi seed. Cần kiểm kê/mapping sản phẩm và kế hoạch chuyển đổi được review riêng; không sửa checksum migration cũ hoặc chạy thẳng lên DB dùng chung.

## Kiểm chứng contract hiện tại bằng HTTP thật

Session và toàn bộ dữ liệu là fixture UUID riêng trong DB test, không bỏ qua AuthGuard. Không gọi Admin duyệt/từ chối.

| Luồng | Staff gửi | Tồn khi gửi | Admin Kho nhận |
| --- | --- | --- | --- |
| Hao hụt STOCK: POST /api/staff/material-waste → GET /warehouse/material-adjustments?type=WASTE | 201, PENDING | Kho giữ 10 | Không thấy mã phiếu |
| Hoàn trả ISSUED: POST /api/staff/material-returns → GET /warehouse/material-adjustments?type=RETURN | 201, PENDING | Kho giữ 10; bếp giữ 5; reserved_return=2 | Không thấy mã phiếu |

Không phát sinh InventoryMovement. Script dọn đúng UUID fixture sau khi kiểm tra.

Nguyên nhân đã xác minh: Staff lưu StaffMaterialWaste/StaffMaterialReturn; Admin đọc MaterialAdjustment. Đây là khoảng trống liên thông contract, tách biệt với lỗi thiếu schema trước đó. Script trả exit code khác 0 khi Admin không nhận phiếu; **không đánh dấu PASS toàn luồng**.

## Đề xuất contract — chưa triển khai

1. Dùng MaterialAdjustment làm chứng từ chung để giữ API Admin Kho đã có. Staff vẫn giữ sổ tồn bếp và phân bổ nguồn; tránh hai phiếu độc lập có thể được duyệt hai lần.
2. Giữ namespace /api/staff cho gửi phiếu, /warehouse/material-adjustments cho Admin đọc/xử lý. Server lấy người gửi/chi nhánh từ session và lưu truy vết; server sinh mã, đặt PENDING.
3. STOCK WASTE: balanceId xác định lô/vị trí; quantity/unit quy đổi về đơn vị gốc. Không giảm tồn khi gửi.
4. ISSUED WASTE và RETURN: bắt buộc issueDetailId hợp lệ, khớp người/chi nhánh/lô. Không suy đoán dòng xuất chỉ từ lotId. Một phiếu gắn một dòng xuất.
5. RETURN giữ condition, conditionConfirmed và note; Admin vẫn phải kiểm tra chất lượng/hạn. Quantity là chuỗi số dương, tối đa ba số lẻ; giới hạn lý do cần khớp MaterialAdjustment (500 ký tự).
6. Khi PENDING chỉ giữ lượng khả dụng theo sổ bếp; không thay đổi lượng vật lý hoặc tạo movement kho. Cần nối xử lý giữ/chốt/nhả lượng vào cùng transaction khi triển khai Admin sau này.

**Cần chốt trước khi code:** Kho hiện yêu cầu MaterialUsageSettlement đã kết thúc, còn Staff theo dõi nguồn/tiêu hao đang diễn ra. Chọn chốt nguồn trước khi duyệt, hoặc cho quyết toán từng phần trong ca và sửa quy tắc tương ứng. Không mặc định lượng đã dùng bằng 0 hoặc tự tạo settlement từ con số chưa chốt.

Sau khi chốt, triển khai tối đa hai API mỗi đợt, kiểm thử Staff gửi → Admin đọc đúng cùng mã/trạng thái/số lượng trước khi sửa UI.

## File kiểm thử và cách chạy

- backend/test/integration-schema.e2e-spec.ts: chỉ bật bằng RUN_INTEGRATION_SCHEMA_E2E=1; URL phải trỏ đúng restaurant_integration_test. Fixture nâng cấp nằm trong transaction riêng và luôn rollback.
- backend/scripts/check-staff-warehouse-contract.mjs: khóa target DB; dùng Backend đã build, session thật và fixture riêng; Admin chỉ GET.

Trong terminal có DATABASE_URL đã trỏ đúng DB test (không đổi backend/.env dùng chung):

```bash
cd backend
WAREHOUSE_TEST_DATABASE_URL="$DATABASE_URL" RUN_INTEGRATION_SCHEMA_E2E=1 npm run test:e2e -- test/integration-schema.e2e-spec.ts
npm run build
node scripts/check-staff-warehouse-contract.mjs
```

Không bật các suite PostgreSQL khác hoặc script reset/seed tự động khi chưa kiểm tra target.
