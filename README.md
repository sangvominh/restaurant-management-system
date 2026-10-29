# 🍽️ Restaurant Admin — Web Management System

Monorepo chứa backend (NestJS) và frontend (Next.js) cho hệ thống quản lý nhà hàng.

## Cấu Trúc

```
web_admin_restaurant/
├── backend/    ← NestJS API (port 3001)
└── frontend/   ← Next.js Admin UI (port 3000)
```

## Khởi Động

### Backend
```bash
cd backend
npm install
npm run start:dev
# API: http://localhost:3001
# Swagger: http://localhost:3001/api
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# UI: http://localhost:3000
```

## Chức Năng

- 📦 **Quản lý sản phẩm** — CRUD, tìm kiếm nâng cao, lọc, sắp xếp, phân trang
- 📋 **Cấu hình công thức** — Định lượng nguyên liệu cho từng thành phẩm
- 📝 **Phiếu xuất thành phẩm** — Nhân viên tạo phiếu, Admin duyệt/từ chối
