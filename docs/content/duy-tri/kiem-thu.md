---
title: Kiểm thử
description: Lệnh kiểm tra từng ứng dụng và các luồng nghiệp vụ cần đối chiếu.
---

# Kiểm thử

Cài dependency trong ứng dụng cần kiểm tra. Các lệnh dưới đây chạy từ root repository; mỗi package dùng dependency riêng.

## Backend

```sh
npm --prefix backend run prisma:validate
npm --prefix backend run build
npm --prefix backend test -- --maxWorkers=1
```

Các test tích hợp dùng DB thật chỉ chạy khi được bật bằng biến môi trường riêng. Test bị skip không được tính là đạt.

Những bộ API/migration sau dùng PostgreSQL nhúng trong bộ nhớ, không nạp fixture vào DB phát triển. Sau khi build backend, chạy trong thư mục `backend`:

```sh
npx vitest run --config vitest.config.e2e.ts test/foundation-migration.e2e-spec.ts test/foundation.e2e-spec.ts test/system-admin.e2e-spec.ts test/integration-upgrade.e2e-spec.ts test/legacy-demo-cleanup.e2e-spec.ts --maxWorkers=1
```

## Frontend

```sh
npm --prefix frontend/web-admin-system run typecheck
npm --prefix frontend/warehouse-web run typecheck
npm --prefix frontend/sales-web run typecheck
npm --prefix frontend/hr-web run typecheck
npm --prefix frontend/staff-app run typecheck
npm --prefix frontend/guest-web run typecheck
```

Chạy `npm run build` trong frontend đang sửa để kiểm tra bản production. Không cần cài hoặc build frontend khác.

Browser spec của Admin chạy bằng `npm run test:browser` trong `frontend/web-admin-system`. Bộ này cần API, frontend và tài khoản kiểm thử theo các biến `E2E_*` trong spec; có ca đổi tài khoản/cấu hình nên chỉ dùng môi trường kiểm thử riêng.

## Kiểm tra thủ công

- Admin: đăng nhập, tạo tài khoản đúng quyền, đổi quyền hoặc khóa tài khoản rồi kiểm tra phiên cũ bị thu hồi.
- Bốn web quản lý: đăng nhập riêng; đăng xuất Kho không làm mất phiên Admin. Route của frontend khác trả 404.
- Kho và Staff: ghi tồn trước/sau khi nhập nguyên liệu, đề nghị cấp bếp và duyệt; đối chiếu hai nơi và lịch sử biến động.
- Chế biến: thử lô còn hạn, hết hạn, thiếu hạn và thiếu số lượng. Chỉ lượng hợp lệ được dùng; gọi lại cùng thao tác không trừ kho hai lần.
- Thành phẩm: gửi phiếu, duyệt hoặc từ chối, đối chiếu lượng báo, lượng chấp nhận và tồn. Kiểm tra từng đợt của lệnh sản xuất.
- Hao hụt và hoàn trả: đối chiếu lượng giữ, tồn khả dụng và nguồn lĩnh trước/sau quyết định.
- API bán hàng: đối chiếu hóa đơn đã thanh toán với báo cáo doanh thu. Các màn hình còn là khung không được ghi nhận là tính năng đã nghiệm thu.

Ghi dữ liệu đầu vào, thao tác, kết quả mong đợi và thực tế. Build thành công hoặc trang trả HTTP 200 chưa chứng minh nghiệp vụ đúng.
