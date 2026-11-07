import { test, expect } from '@playwright/test';

const password = process.env.E2E_ADMIN_PASSWORD;
test.skip(!password, 'Đặt E2E_ADMIN_PASSWORD bằng DEMO_PASSWORD của project demo riêng.');

async function login(page: import('@playwright/test').Page, email: string) {
  await page.goto('/login');
  await page.getByLabel('Email', { exact: true }).fill(email);
  await page.getByLabel('Mật khẩu', { exact: true }).fill(password!);
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
}

test('chủ hệ thống dùng cùng phiên để vào quản trị, kho và nhà hàng', async ({ page }) => {
  await login(page, 'owner@demo.local');
  await expect(page).toHaveURL(/\/$/);
  await page.goto('/warehouse/inventory');
  await expect(page.locator('.sidebar-user-copy')).toContainText('Quản trị viên hệ thống');
  await page.goto('/warehouse/restaurant');
  await expect(page.locator('.sidebar-user-copy')).toContainText('Quản trị viên hệ thống');
  await expect(page.locator('.ant-result-403')).toHaveCount(0);
});

test('kho dùng cùng trang đăng nhập và không mở được quản trị hệ thống', async ({ page }) => {
  await login(page, 'warehouse@demo.local');
  await expect(page).toHaveURL(/\/warehouse$/);
  await page.goto('/warehouse/inventory');
  await expect(page.locator('.sidebar-user-copy')).toContainText('Quản lý kho Demo');
  await page.goto('/accounts');
  await expect(page.locator('.ant-result-403')).toBeVisible();
});

test('form tài khoản có một hồ sơ Staff với chi nhánh và vị trí', async ({ page }) => {
  await login(page, 'owner@demo.local');
  await page.goto('/accounts');
  await page.getByRole('button', { name: /Thêm tài khoản/i }).click();
  await expect(page.getByLabel('Mã nhân viên (để trống nếu không dùng Staff)')).toBeVisible();
  await expect(page.getByLabel('Chi nhánh làm việc')).toBeVisible();
  await expect(page.getByLabel('Vị trí nhân viên')).toBeVisible();
});
