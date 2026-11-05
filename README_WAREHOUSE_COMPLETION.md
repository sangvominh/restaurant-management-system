# Kết quả hoàn thiện Warehouse Web

Ngày chốt: 04/11/2026. Nhánh `feat/restaurant_v1`, nền `bfcb1fe`.
Chỉ sửa Admin Kho và hạ tầng kiểm thử liên quan. Chưa commit/push/merge/rebase.

## A. Lỗi đã sửa

| Lỗi | Nguyên nhân | File chính | Cách sửa và bằng chứng |
| --- | --- | --- | --- |
| HSD lùi một ngày | Timestamp nửa đêm +07 bị chuyển sang ngày UTC trước khi ghi cột DATE | `backend/src/warehouse/api/receipt.api.ts` | Ghi ngày UTC 00:00 cho DATE; Form → DB → UI giữ 2099-12-31. Test hôm qua/hôm nay/ngày mai/gần nửa đêm |
| Nhập thêm vào lô hết hạn | Chưa kiểm tra lại HSD của lô cũ khi request bỏ trống HSD | cùng file | Kiểm tra HSD thực tế; chặn cả bỏ trống hoặc gửi ngày mới để vượt kiểm tra; rollback không có phiếu/movement |
| Chi nhánh đóng vẫn cấp phát | Tính khả dụng chưa xét branch; duyệt chưa kiểm tra branch trong transaction | `inventory.api.ts`, `material-issue.api.ts` | Giữ tồn vật lý/lịch sử; khả dụng bằng 0; chặn duyệt sau khi chi nhánh chuyển inactive |
| Chi nhánh/vị trí nhập tay | Form chưa có nguồn lựa chọn và kiểm tra ID | `warehouse-reference.api.ts`, `create-receipt.dto.ts`, `receipt-management.tsx` | Hai API tham chiếu, Select phụ thuộc chi nhánh; kiểm tra ID đúng quan hệ; vẫn nhận code/name cũ |
| Xóa bộ lọc phiếu nhập không tải đúng | Hàm tải dùng state cũ | `receipt-management.tsx` | Truyền bộ lọc rỗng trực tiếp khi reset; browser xác nhận tải lại |
| Dashboard, hao hụt, lịch sử, báo cáo hiển thị mock | Trang chung dùng dữ liệu mẫu | các component Dashboard/History/Adjustment mới | Kết nối API thật; error/empty rõ ràng; không giả số liệu báo cáo theo kỳ |
| Danh mục và NVL khó phân biệt | Cùng hiển thị hai bảng | `material-management.tsx` | Hai tab; thêm/sửa/chi tiết dùng API sẵn có; mã ngắn; chỉ chọn đơn vị gốc |
| Hoàn trả/hao hụt chưa có luồng thật | Nhánh hiện tại và ref `feat/warehouse` không có model/API phù hợp để tái sử dụng | schema, migration, `material-adjustment.api.ts` | Bốn API đọc/duyệt/từ chối; transaction Serializable, kiểm tra nguồn và quyết toán, movement truy vết được |
| Xung đột duyệt trả 500 | adapter-pg có thể trả lỗi 40001 tại COMMIT dưới dạng DriverAdapterError, ngoài P2034 | `material-adjustment.api.ts` | Trả 409 cho transaction conflict; hai phiếu cùng quyết toán một dòng: một 200, một 409, không vượt lượng lĩnh |
| E2E cũ ghi restaurant_dev | Test chưa cô lập DB | `backend/test/warehouse-admin.e2e-spec.ts`, `warehouse-test-database.ts` | Opt-in URL DB test, private schema, kiểm tra tên DB/schema và dọn riêng; cấm restaurant_dev |

Không sửa dữ liệu ngày cũ hàng loạt. Không đổi nghiệp vụ ProductionOrder.

## B. Tiến độ bảy chức năng

| Chức năng | Trước sửa | Sau sửa | Trạng thái |
| --- | --- | --- | --- |
| Nhà cung cấp | Có CRUD, cần kiểm thử UI thao tác xác nhận | Danh sách/tìm/thêm/chi tiết/sửa/xóa NCC chưa nhập; có lịch sử thì hiển thị lỗi | PASS trong môi trường test |
| Danh mục và NVL | Chưa tách tab | Hai tab, tìm/lọc, thêm/sửa/chi tiết; kiểm tra danh mục đang được dùng | PASS |
| Nhập kho | Lỗi ngày/lô/reset, nhập tay vị trí | Chặn lô hết hạn, Select ID từ API, quy đổi đơn vị và reset đúng | PASS |
| Duyệt xuất NVL | Bỏ sót inactive branch | Duyệt/từ chối có xác nhận/lý do; thiếu tồn hoặc branch đóng không cập nhật kho | PASS |
| Tồn kho | Khả dụng gồm chi nhánh đóng | Phân biệt vật lý/khả dụng, lô/HSD, LOW_STOCK, phân trang, lọc chi nhánh | PASS |
| Hao hụt NVL | UI mẫu | STOCK giảm một lần; ISSUED chỉ quyết toán, không trừ/movement lần hai | PASS với fixtures; ISSUED chờ quyết toán Staff thật |
| Hoàn trả NVL | Chưa có | Kiểm tra chứng từ gốc, thực nhận/chất lượng, cộng đúng lô/vị trí, lịch sử xử lý | PASS với fixtures; dữ liệu thật thiếu quyết toán bị BLOCKED |

Dashboard và lịch sử dùng dữ liệu Backend. Báo cáo hiện chỉ là ảnh chụp tồn hiện tại, **chưa phải báo cáo tháng/quý/năm**.

## C. Kiểm thử

| Nhóm | Kết quả thực tế |
| --- | --- |
| Backend Unit Tests (`npm test`) | 17 file, **69/69 PASS** khi chạy lại; đợt trước 64/64 |
| Backend build (`npm run build`) | PASS |
| Prisma validate/generate | PASS |
| Frontend typecheck và production build | PASS |
| Hồi quy API cũ | **43/43 PASS**: 41 ca chính + 2 ca ngày |
| API/DB bổ sung trên schema hồi quy | **11/11 PASS**: 9 ca bổ sung + 2 ca an toàn cuối |
| Kiểm chứng từng đợt trước hồi quy | 4 ca receipt, 4 ca inactive branch, 10 ca xử lý adjustment PASS; hai GET adjustment được kiểm tra riêng |
| Warehouse E2E | **5/5 PASS** khi chạy lại: 4 ca adjustment + 1 ca hồi quy Admin Kho; private schema, không chạy toàn bộ E2E của dự án |
| Trình duyệt UI | **60 PASS, 1 PENDING INTEGRATION**, không dùng HTTP 200 để thay thế kiểm thử giao diện |
| Tương thích khi chưa cài migration mới | API đọc Warehouse cũ vẫn 200; adjustment trả 503 rõ lý do; UI hiển thị lỗi; đã khôi phục bảng test |
| Bảo toàn dữ liệu/phân hệ khác | Count/hash mọi bảng public của hai DB không đổi; hash restaurant-web và backend/.env không đổi |

Các ca có ghi DB chỉ chạy trong schema riêng của **restaurant_staff_demo đang có**, không tạo DB/container/volume. Hai schema thử nghiệm của đợt này và schema E2E được dọn sau khi lưu bằng chứng. Không seed hoặc migrate vào public.

Các kiểm chứng tồn: WASTE STOCK giảm đúng; WASTE ISSUED không trừ lần hai; RETURN chỉ tăng lượng được nhận; không vượt lượng lĩnh sau tiêu hao/hao hụt/hoàn trước; chất lượng không đạt hoặc hết hạn bị chặn; từ chối không ghi tồn/movement; duyệt trùng/đồng thời không làm sai số dư; lỗi sau bước ghi tồn rollback toàn bộ.

### Tiếp tục sau khi tác vụ bị dừng — 04/11/2026

- Đã đọc lại AGENTS, status/diff và toàn bộ `material-adjustment.api.ts`. Bản sửa transaction conflict đã lưu đầy đủ; không cần sửa lại code nghiệp vụ đã hoàn thành.
- Vượt lượng lĩnh chưa quyết toán trả **400**. Đã xử lý/thiếu quyết toán tin cậy/xung đột transaction trả **409**. Nguyên nhân 500 trước đó là adapter-pg trả lỗi tại COMMIT ngoài dạng Prisma P2034; không phải bỏ qua kiểm tra số lượng. Không chuyển lỗi hạ tầng bất kỳ thành lỗi nghiệp vụ.
- Bổ sung unit test tách riêng từng dạng lỗi: `cause.kind`, SQLSTATE 40001/40P01, P2034; xác nhận HTTP status. Kiểm tra cả WASTE và RETURN vượt lượng còn lại trước khi có bất kỳ cập nhật kho nào.
- Thêm `backend/test/warehouse-adjustment.e2e-spec.ts` để giữ ca hồi quy trong repo: vượt quyết toán sau cả hao hụt/hoàn trả trước đó; ba quy tắc tồn; duyệt trùng; chất lượng/quyết toán thiếu; từ chối; hai phiếu khác nhau cùng quyết toán một dòng.
- Khi hai request chồng nhau, giao dịch thua trả 409; nếu đọc sau giao dịch thắng đã commit thì kiểm tra lượng còn lại trả 400. Cả hai đều hợp lệ; test bắt buộc chỉ một phiếu được duyệt và số dư/movement khớp, không chấp nhận 500.
- Typecheck cả source lẫn test phát hiện và đã sửa 3 lỗi còn sót: constructor mock WarehouseService thiếu hai dependency, callback transaction của hai test thiếu kiểu. Chỉ sửa fixture/kiểu, không thay đổi các API đã hoàn thành.
- Chạy lại: **69 Unit Tests, 5 E2E PASS; Backend build và `tsc --noEmit --incremental false` PASS**. Kết quả UI/43 ca API/Frontend build ở các dòng còn lại là bằng chứng đợt trước, không tự tính là đã chạy lại hôm nay.
- Count/hash toàn bộ bảng public `restaurant_dev` và `restaurant_staff_demo` trước/sau không đổi; private schemas E2E đã tự dọn. Không chạy migration chung. Log mới ở thư mục `warehouse-resume-20261104` cạnh thư mục bằng chứng cũ.

Chạy lại E2E: đặt `RUN_WAREHOUSE_DB_E2E=1` và `WAREHOUSE_TEST_DATABASE_URL` trỏ DB test localhost đã có, rồi trong `backend` chạy `npm run test:e2e -- test/warehouse-adjustment.e2e-spec.ts test/warehouse-admin.e2e-spec.ts`. Không dùng URL restaurant_dev; không có URL test thì bộ test chủ động skip.

Bằng chứng máy chạy: `C:/Users/nhanh/.codex/visualizations/2026/10/26/01a17713-435d-7de1-a096-9bdbc3100eb1/warehouse-completion-20261103/`.
Trong đó `regression/ui-results.json`, `api-results.json`, `date-results.json`, `extra-results.json`, `additional-safety-results.json`, `final-safety-verification.json` và ảnh PNG lưu chi tiết. Lần thử đầu của một script bổ sung chạy khi server frontend đang dừng để build nên lỗi kết nối; đã chạy lại đủ sau khi khởi động. Lần đầu test concurrent issued phát hiện lỗi 500 nêu trên, đã sửa và chạy lại đạt.

## D. Phần còn lại

| Mức | Vấn đề | Hướng xử lý |
| --- | --- | --- |
| P0 | Chưa phát hiện trong phạm vi đã test | Không suy rộng thành chứng nhận toàn hệ thống |
| P1 / điều kiện triển khai | Database dùng chung chưa cài migration mới | Lead kiểm tra migration history và duyệt migration trước triển khai. Hiện adjustment trả 503 thay vì giả dữ liệu; không tự chạy migration chung |
| PENDING INTEGRATION | App Nhân viên chưa tạo phiếu và chưa chốt tiêu hao đáng tin cậy | Làm theo contract bàn giao; thiếu quyết toán thì WASTE ISSUED/RETURN bị chặn, không tự giả consumed=0 |
| PENDING INTEGRATION | ProductionOrder vẫn có đường trừ NVL riêng, chưa nối nguồn MaterialIssue | Nhóm MRP thống nhất cấp phát một lần + ghi tiêu hao trên lượng đã lĩnh. Không chạy ghép hai luồng để tránh trừ trùng; module này không được sửa |
| PENDING INTEGRATION | Báo cáo tồn/nhập/xuất theo tháng/quý/năm chưa có API tổng hợp đầy đủ | Hiện chỉ hiển thị tồn hiện tại và thông báo chưa hỗ trợ kỳ; không suy diễn số liệu từ 100 movement gần nhất |
| P2 | Danh sách adjustments giới hạn 100 phiếu, pending Dashboard giới hạn 50 | Khi lượng chứng từ lớn cần API phân trang/tổng số; chưa coi số Dashboard là tổng không giới hạn |
| PENDING kiểm tra dữ liệu | HSD cũ từng bị lưu sai | Người phụ trách đối chiếu chứng từ gốc rồi xử lý có kiểm soát; không tự đổi hàng loạt |

### Migration và tương thích

`20261103160000_material_adjustments` chỉ thêm ba bảng: `material_adjustments`, `material_usage_settlements`, `material_adjustment_movements`. Không sửa/xóa cột hoặc dữ liệu bảng cũ. Bảng liên kết riêng truy vết adjustment ↔ movement; tránh thêm cột scalar vào movement làm client mới lỗi trước migration. Đã validate/generate Prisma và áp migration trên schema test riêng. Đây **không** phải xác nhận migration đã được triển khai trên DB dùng chung.

## E. API và Git

Triển khai theo từng đợt tối đa hai API, kiểm tra trước khi chuyển đợt:

1. `POST /warehouse/receipts`: ngày và lô cũ.
2. `GET /warehouse/inventory`, `GET /warehouse/inventory/alerts`: khả dụng branch.
3. `GET /warehouse/inventory/:code`, `POST /warehouse/material-issues/:code/approve`: chi tiết và chặn cấp phát.
4. Mới: `GET /warehouse/branches`, `GET /warehouse/locations?branchId=UUID`.
5. `POST /warehouse/receipts`: hỗ trợ thêm branchId/locationId; `GET /warehouse/inventory-movements`: thêm branchCode filter/tên chi nhánh.
6. Mới: `GET /warehouse/material-adjustments`, `GET /warehouse/material-adjustments/:code`.
7. Mới: `POST /warehouse/material-adjustments/:code/approve`, `POST /warehouse/material-adjustments/:code/reject`.

API cũ vẫn nhận branchCode/locationName. Không thêm API nhân viên tạo phiếu.

File sửa (đường dẫn từ gốc repo):

- `backend/src/warehouse/api/{receipt,inventory,material-issue}.api.ts`: ba lỗi ưu tiên và lọc lịch sử.
- `backend/src/warehouse/api/{receipt,inventory,material-issue}.api.spec.ts`: cập nhật fixture branch và kỳ vọng ngày đúng.
- `backend/src/warehouse/dto/create-receipt.dto.ts`: ID tùy chọn, tương thích request cũ.
- `backend/src/warehouse/warehouse.{controller,service,module}.ts`: đăng ký/điều phối API mới.
- `backend/src/warehouse/warehouse.service.spec.ts`: bổ sung mock hai dependency mới để typecheck test đầy đủ.
- `backend/prisma/schema.prisma`: ba model mới và backrelations.
- `backend/test/warehouse-admin.e2e-spec.ts`: chạy DB test cô lập.
- `frontend/warehouse-web/src/app/{page.tsx,[section]/page.tsx,inventory/page.tsx,api/warehouse/[...path]/route.ts}`: route dữ liệu thật, proxy allowlist, thông báo lỗi.
- `frontend/warehouse-web/src/components/layout/app-shell.tsx`: menu hoàn trả, bỏ thông tin giả và nút không có chức năng.
- `frontend/warehouse-web/src/components/inventory/inventory-list.tsx`: nhãn lịch sử rõ ràng.
- `frontend/warehouse-web/src/components/warehouse/{supplier,material,receipt,material-issue}-management.tsx`: các sửa UI nêu trên.
- `frontend/warehouse-web/src/services/{api.ts,inventory.service.ts,warehouse-service.ts}`, `src/types/inventory.ts`: contract và lỗi API.

File mới:

- `backend/src/warehouse/api/{warehouse-reference,material-adjustment}.api.ts`.
- `backend/src/warehouse/dto/process-material-adjustment.dto.ts`.
- `backend/prisma/migrations/20261103160000_material_adjustments/migration.sql`.
- `backend/test/warehouse-{receipt,inventory,issue,reference,movements,adjustment-read,adjustment-process}.spec.ts`.
- `backend/test/warehouse-test-database.ts`.
- `backend/test/warehouse-adjustment.e2e-spec.ts`: hồi quy hai API approve/reject trên PostgreSQL test.
- `frontend/warehouse-web/src/components/dashboard/warehouse-dashboard.tsx`.
- `frontend/warehouse-web/src/components/warehouse/{material-adjustment-management,warehouse-history}.tsx`.
- `README_WAREHOUSE_COMPLETION.md`, `README_WAREHOUSE_STAFF_CONTRACT.md`.

Xóa các file mock không còn được dùng: `frontend/warehouse-web/src/components/dashboard/dashboard.tsx`, `src/components/workspace.tsx`, `src/mock/data.ts`, `src/types/warehouse.ts`.

Tất cả thay đổi còn ở working tree để review. Không chỉnh `frontend/restaurant-web`, ProductionOrder, BOM hoặc các app/phân hệ khác. Không commit/push/merge/rebase, không đổi nhánh.
