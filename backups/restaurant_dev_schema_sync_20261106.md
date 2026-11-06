# Đồng bộ restaurant_dev — 06/11/2026

- Backup: restaurant_dev_before_schema_sync_20261106_211743.dump (pg_dump custom).
- Chạy thử toàn bộ SQL trong transaction rồi rollback trước khi áp dụng.
- Áp dụng 23 migration còn thiếu/đối chiếu; dùng Prisma migrate resolve để ghi nhận các migration đã thực hiện và baseline products tồn tại.
- Prisma migrate status: Database schema is up to date (36 migration trong repository).
- Không reset database, không seed tài khoản hoặc sản phẩm mẫu, không sửa mã Backend/Frontend trong lượt đồng bộ DB.
- Kiểm tra từng dòng qua các cột ban đầu của 30 bảng: không đổi hoặc mất dữ liệu gốc. Migration thêm đơn vị chuẩn dùng ON CONFLICT DO NOTHING.
- Hai bảng điều chỉnh kiểu cũ đều rỗng được giữ tại warehouse_legacy_20261106.material_adjustments và warehouse_legacy_20261106.material_adjustment_details. Các khóa ngoại cũ được PostgreSQL giữ liên kết tới bảng lưu trữ.
- public.material_adjustments dùng cấu trúc hiện tại; bổ sung bảng quyết toán, liên kết movement, bảng Staff và trigger đã có trong migration.
- Không tự tạo Product giả cho BOM/số dư mồ côi. Hai FK boms_product_code_fkey và finished_goods_balances_product_code_fkey ở trạng thái NOT VALID để bảo toàn 4 BOM và 1 bản ghi tồn cũ. FK vẫn kiểm tra dữ liệu mới. Cần bổ sung sản phẩm thật rồi VALIDATE CONSTRAINT sau.
- Baseline products không chạy phần seed 6 món mẫu hoặc INSERT tên/nhóm/giá phỏng đoán của migration cũ.
- Backend 3000 -> restaurant_dev: GET phiếu xuất, WASTE, RETURN, suppliers, materials, receipts, inventory, inventory-movements đều 200.
- Warehouse 3001 đã trỏ lại Backend 3000. Qua proxy: phiếu xuất 1, WASTE 0, RETURN 0; trình duyệt thấy XNVL_TEST_03 và trạng thái rỗng của hoàn trả.
- Không thay đổi restaurant_integration_test hoặc restaurant_staff_demo.
- Script đồng bộ dùng để lưu vết, không chạy lại --apply sau khi đã đồng bộ; script sẽ chặn nếu schema lưu trữ đã tồn tại.

Không chạy migrate reset hoặc db push --accept-data-loss.
