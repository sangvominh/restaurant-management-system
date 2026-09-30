---
id: GUIDE-CLOUDFLARE
specStatus: Hướng dẫn triển khai
codeStatus: Cần kết nối tài khoản và xác minh URL thực tế
owner: Người quản lý repo
reviewed: '2026-09-29'
summary: Cấu hình Cloudflare Pages cho website tài liệu trong repo hiện tại.
---

# Đưa tài liệu lên Cloudflare

<DocMeta />

Cloudflare lấy source từ repo riêng tư, build thư mục tài liệu và phục vụ kết quả công khai. Repo không cần đổi sang public. Chỉ sau lần deploy thành công mới có URL thật để chia sẻ.

## 1. Chuẩn bị tài khoản

Mở [Cloudflare Dashboard](https://dash.cloudflare.com/). Đăng nhập hoặc tạo tài khoản và xác minh email theo hướng dẫn. Chưa cần mua domain: Pages cấp địa chỉ `*.pages.dev`.

## 2. Kết nối GitHub

1. Vào **Workers & Pages**.
2. Chọn **Create application → Pages → Connect to Git**. Nếu màn hình mặc định giới thiệu Workers, tìm tùy chọn tạo Pages.
3. Kết nối GitHub bằng tài khoản có quyền với repo.
4. Trong bước cài GitHub App, chọn **Only select repositories**, chọn `restaurant-management-system` của `sangvominh`.
5. Xem quyền Cloudflare yêu cầu rồi tự xác nhận **Install & Authorize**.
6. Chọn repo và **Begin setup**.

## 3. Điền cấu hình

| Ô trên Cloudflare | Giá trị cho repo này |
|---|---|
| Project name | `restaurant-project-docs` hoặc tên còn trống bạn chọn |
| Production branch | `main` |
| Framework preset | `VitePress` |
| Root directory / Path | `docs` |
| Build command | `npm run build` |
| Build output directory | `.vitepress/dist` |
| Environment variable | `NODE_VERSION` = `22` |

Đường dẫn output tính từ root `docs`; không nhập `docs/.vitepress/dist` khi đã đặt root là `docs`. Không cấu hình lệnh deploy Wrangler hoặc tạo Worker cho quy trình Pages này.

## 4. Xuất bản và kiểm tra

Chọn **Save and Deploy**. Chờ trạng thái thành công, mở URL Cloudflare cung cấp. Kiểm tra trang chủ, một trang con, tìm kiếm và tải lại trang con trực tiếp. Tên project là gợi ý, không đảm bảo hostname đó còn trống.

Nếu repo trên GitHub chưa có `docs/package.json` và các trang nguồn, phải push các file đã chuẩn bị trước khi deploy.

## 5. Cập nhật về sau

Sửa `docs/content/` → review/merge hoặc push lên `main` → Cloudflare tự build → deploy thành công → tải lại trang web để đọc bản mới. Lần build lỗi không phải bản đã xuất bản; kiểm tra log trong **Deployments**.

Các branch khác có thể tạo bản preview để duyệt trước. Trang production chỉ theo `main` theo cấu hình trên. Có thể giới hạn build theo thay đổi `docs/**` bằng Build watch paths khi cần.

## Xử lý lỗi thường gặp

### Cloudflare Workers Builds

Nếu log có bước `npx wrangler deploy --assets .vitepress/dist`, dự án đang dùng **Workers Builds**. Repo có cấu hình `docs/wrangler.jsonc` để triển khai website tĩnh theo quy trình này.

| Ô trên Cloudflare Workers | Giá trị |
|---|---|
| Worker name | `restaurant-project-docs` |
| Root directory | `docs` |
| Build command | `npm run build` |
| Deploy command | `npx wrangler deploy` |
| Environment variable | `NODE_VERSION` = `22` |

Lệnh deploy cũ `npx wrangler deploy --assets .vitepress/dist` vẫn dùng được. Wrangler đọc `name`, `compatibility_date` và thư mục assets từ `wrangler.jsonc`. Nếu đổi tên Worker trên Dashboard, cập nhật `name` trong file này cho khớp.

Lỗi `A compatibility_date is required` xảy ra ở bước deploy dù build VitePress đã thành công. Push `docs/wrangler.jsonc` lên branch Cloudflare đang theo dõi rồi chạy lại deployment. Không cần tạo lại ứng dụng.

| Biểu hiện | Kiểm tra |
|---|---|
| Không thấy repo | Đúng tài khoản GitHub chưa? App Cloudflare được cấp repo này chưa? |
| Không tìm thấy package.json | Root directory phải là `docs`; source đã push chưa? |
| Không có output | Build thành công chưa? Output là `.vitepress/dist` |
| Báo thiếu metadata hoặc trang không có mục lục | Điền frontmatter và thêm `navigation.json` |
| Broken link | Sửa đường dẫn trong Markdown; không bỏ qua kiểm tra |
| Website vẫn cũ | Commit đã lên `main` chưa? Deployment mới đã success chưa? Tải lại trang |

## Nguồn hướng dẫn

- [Cloudflare: Git integration](https://developers.cloudflare.com/pages/get-started/git-integration/)
- [Cloudflare: VitePress](https://developers.cloudflare.com/pages/framework-guides/deploy-a-vitepress-site/)
- [Cloudflare: Build configuration](https://developers.cloudflare.com/pages/configuration/build-configuration/)
