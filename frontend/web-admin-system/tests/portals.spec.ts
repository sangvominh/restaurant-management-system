import { test, expect, type Page } from '@playwright/test';
const password = process.env.E2E_ADMIN_PASSWORD;
const admin = process.env.E2E_WEB_URL ?? 'http://localhost:3004';
const warehouse = process.env.E2E_WAREHOUSE_URL ?? 'http://localhost:3001';
const sales = process.env.E2E_SALES_URL ?? 'http://localhost:3002';
const hr = process.env.E2E_HR_URL ?? 'http://localhost:3006';
test.skip(!password, 'Cần môi trường kiểm thử riêng với fixture tương ứng; không dùng DB phát triển.');
async function login(page: Page, origin: string, email: string) {
  await page.goto(origin + '/login');
  await page.getByLabel('Email', { exact: true }).fill(email);
  await page.getByLabel('Mật khẩu', { exact: true }).fill(password!);
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
}
test('bốn web có đăng nhập riêng; đăng xuất Kho giữ phiên Admin server', async ({ page, context }) => {
  await login(page, admin, 'owner@demo.local');
  await expect(page).toHaveURL(admin + '/');
  await expect(page.locator('.ant-layout-sider')).not.toContainText('Kho / Nhà hàng');
  const business = await context.newPage();
  for (const origin of [warehouse, sales, hr]) {
    await business.goto(origin + '/');
    await expect(business.getByText('Vui lòng đăng nhập', { exact: true })).toBeVisible();
  }
  await login(business, warehouse, 'warehouse@demo.local');
  await expect(business).toHaveURL(warehouse + '/');
  await business.getByRole('button', { name: 'Đăng xuất', exact: true }).click();
  await expect(business).toHaveURL(warehouse + '/login');
  await page.reload();
  await expect(page.locator('.ant-layout-sider')).toBeVisible();
});
test('Admin server từ chối tài khoản kho và không chứa route nghiệp vụ', async ({ page }) => {
  await login(page, admin, 'warehouse@demo.local');
  await expect(page.locator('.ant-alert')).toBeVisible();
  await expect(page).toHaveURL(admin + '/login');
  for (const route of ['/warehouse/inventory', '/warehouse/restaurant']) {
    const response = await page.goto(admin + route);
    expect(response?.status()).toBe(404);
  }
});
test('Kho có dữ liệu thật và không chứa route bán hàng hoặc quản trị tài khoản', async ({ page }) => {
  await login(page, warehouse, 'warehouse@demo.local');
  await expect(page).toHaveURL(warehouse + '/');
  await page.getByRole('link', { name: 'Tồn kho nguyên vật liệu', exact: true }).click();
  await expect(page.getByText('DEMO-NVL01', { exact: true })).toBeVisible();
  await expect(page.locator('.side-nav')).not.toContainText('Công thức BOM');
  for (const route of ['/products', '/accounts']) {
    const response = await page.goto(warehouse + route);
    expect(response?.status()).toBe(404);
  }
});
test('Bán hàng giữ màn hình thành phẩm, sản phẩm và BOM ở web riêng', async ({ page }) => {
  await login(page, sales, 'restaurant@demo.local');
  await expect(page).toHaveURL(sales + '/');
  await expect(page.locator('main')).toContainText('chưa hoàn thiện');
  await expect(page.locator('.side-nav')).not.toContainText('Nhập nguyên vật liệu');
  for (const route of ['/operations', '/products', '/bom', '/finished-goods', '/finished-issues']) {
    await page.goto(sales + route);
    await expect(page.locator('.sidebar-user-copy')).toContainText('Quản lý nhà hàng Demo');
    await expect(page.locator('.ant-result-403')).toHaveCount(0);
  }
  for (const route of ['/inventory', '/accounts']) {
    const response = await page.goto(sales + route);
    expect(response?.status()).toBe(404);
  }
});
test('Kho và Bán hàng từ chối tài khoản chỉ có quyền của web kia', async ({ page }) => {
  for (const [origin, email] of [[warehouse, 'restaurant@demo.local'], [sales, 'warehouse@demo.local']]) {
    await login(page, origin, email);
    await expect(page.locator('.ant-alert')).toContainText('chưa có quyền');
    await expect(page).toHaveURL(origin + '/login');
  }
});
test('Nhân sự có khung riêng và nêu rõ nghiệp vụ chưa triển khai', async ({ page }) => {
  await login(page, hr, 'warehouse@demo.local');
  await expect(page.locator('.ant-alert')).toContainText('chưa có quyền');
  await login(page, hr, 'owner@demo.local');
  await expect(page).toHaveURL(hr + '/');
  await expect(page.locator('main')).toContainText('chưa triển khai');
  await expect(page.locator('.side-nav a')).toHaveCount(1);
  const response = await page.goto(hr + '/accounts');
  expect(response?.status()).toBe(404);
});
test('form tài khoản Admin server vẫn cấp hồ sơ Staff phục vụ đăng nhập', async ({ page }) => {
  await login(page, admin, 'owner@demo.local');
  await expect(page).toHaveURL(admin + '/');
  await page.goto(admin + '/accounts');
  await page.getByRole('button', { name: /Thêm tài khoản/i }).click();
  await expect(page.getByLabel('Mã nhân viên (để trống nếu không dùng Staff)')).toBeVisible();
  await expect(page.getByLabel('Chi nhánh làm việc')).toBeVisible();
  await expect(page.getByLabel('Vị trí nhân viên')).toBeVisible();
});
