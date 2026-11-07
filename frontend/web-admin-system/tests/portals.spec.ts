import { test, expect, type APIRequestContext, type Page } from '@playwright/test';
const api = process.env.E2E_API_URL ?? 'http://localhost:3201';
const adminEmail = process.env.E2E_ADMIN_EMAIL;
const adminPassword = process.env.E2E_ADMIN_PASSWORD;
test.skip(!adminEmail || !adminPassword, 'Set E2E_ADMIN_EMAIL and E2E_ADMIN_PASSWORD for an isolated test database.');
let admin: string;
let b: { email: string; id: number; roleId: number };
let c: { email: string; id: number; roleId: number };
const password = 'BrowserTest@123';
const headers = () => ({ Authorization: `Bearer ${admin}` });
async function requestJson(request: APIRequestContext, path: string, method: string, data?: unknown) {
  const response = await request.fetch(api + path, { method, headers: headers(), data });
  expect(response.ok(), await response.text()).toBeTruthy();
  return response.json();
}
async function login(page: Page, email: string, secret: string) {
  await page.goto('/login');
  await page.getByLabel('Email', { exact: true }).fill(email);
  await page.getByLabel('Mật khẩu', { exact: true }).fill(secret);
  await page.getByRole('button', { name: 'Đăng nhập', exact: true }).click();
}
// Tạo phiên qua API để kiểm thử điểm nối, không triển khai hoặc giả lập form login Warehouse.
async function loginWarehouse(page: Page, email: string, secret: string) {
  const response = await page.request.post(api + '/api/auth/login', {data:{email,password:secret}});
  expect(response.ok()).toBeTruthy();
  const session = await response.json();
  await page.goto('/warehouse');
  await page.evaluate(({accessToken,user}) => {
    localStorage.setItem('warehouse_access_token', accessToken);
    localStorage.setItem('warehouse_auth_user', JSON.stringify(user));
  }, session);
  await page.goto('/warehouse');
}
test.beforeEach(async ({ request }) => {
  const login = await request.post(api + '/api/auth/system-admin/login', { data: {email:adminEmail,password:adminPassword} });
  expect(login.ok()).toBeTruthy();admin = (await login.json()).accessToken;
  const suffix = `${Date.now()}-${Math.random().toString(16).slice(2,7)}`;
  async function create(name:string,permissions:string[]) {
    const role = await requestJson(request, '/api/admin/roles','POST',{name:`${name}-${suffix}`,portal:'warehouse',description:'Temporary browser integration test',permissions});
    const email = `${name}-${suffix}@example.com`;
    const account = await requestJson(request,'/api/admin/accounts','POST',{name,email,password,role:role.name});
    return {email,id:account.id,roleId:role.id};
  }
  b = await create('warehouse', ['inventory:view','inventory:import','inventory:approve-export']);
  c = await create('restaurant', ['product:view','bom:manage','finished-goods:approve-export']);
});
test.afterEach(async ({request}) => {
  for(const account of [b,c]) if(account) {
    await requestJson(request,`/api/admin/accounts/${account.id}`,'DELETE');
    await requestJson(request,`/api/admin/roles/${account.roleId}`,'DELETE');
  }
  if(admin) await request.post(api+'/api/auth/logout',{headers:headers()});
});
test('A dùng login riêng System Admin, Warehouse chờ login riêng thay vì dùng phiên A',async({page,request})=>{
  await login(page,adminEmail!,adminPassword!);
  await expect(page).toHaveURL(/:\d+\/$/);
  const branding=await (await request.get(api+'/api/public/branding')).json();
  await expect(page.locator('.ant-layout-sider')).toContainText(branding.restaurantName);
  await page.goto('/warehouse');
  await expect(page.getByText('Warehouse sử dụng đăng nhập riêng',{exact:true})).toBeVisible();
  await expect(page.locator('.warehouse-portal')).toHaveCount(0);
  await expect(page.getByLabel('Email',{exact:true})).toHaveCount(0);
});
test('Kho và Nhà hàng không đăng nhập được bằng form System Admin',async({page})=>{
  for (const account of [b,c]) {
    await login(page,account.email,password);
    await expect(page.getByRole('alert').filter({hasText:'Trang đăng nhập này chỉ dành cho System Admin'})).toBeVisible();
    await expect(page).toHaveURL(/\/login$/);
    expect(await page.evaluate(()=>localStorage.getItem('system_admin_access_token'))).toBeNull();
    expect(await page.evaluate(()=>localStorage.getItem('warehouse_access_token'))).toBeNull();
  }
});

test('phiên cũ dùng chung không tự mở System Admin hoặc Warehouse',async({page,request})=>{
  const response=await request.post(api+'/api/auth/login',{data:{email:b.email,password}});
  expect(response.ok()).toBeTruthy();const session=await response.json();
  await page.goto('/login');
  await page.evaluate(({accessToken,user})=>{
    localStorage.setItem('access_token',accessToken);localStorage.setItem('auth_user',JSON.stringify(user));
  },session);
  await page.reload();await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByLabel('Email',{exact:true})).toBeVisible();
  await page.goto('/warehouse');
  await expect(page.getByText('Warehouse sử dụng đăng nhập riêng',{exact:true})).toBeVisible();
  await expect(page.locator('.warehouse-portal')).toHaveCount(0);
});

test('đăng xuất mỗi bên chỉ đóng phiên của bên đó, không xóa phiên bên còn lại',async({page})=>{
  await login(page,adminEmail!,adminPassword!);await expect(page).toHaveURL(/:\d+\/$/);
  const adminToken=await page.evaluate(()=>localStorage.getItem('system_admin_access_token'));
  await loginWarehouse(page,b.email,password);
  await expect(page.locator('.side-nav')).toBeVisible();
  await page.getByRole('button',{name:'Đăng xuất',exact:true}).click();
  await expect(page.getByText('Warehouse sử dụng đăng nhập riêng',{exact:true})).toBeVisible();
  expect(await page.evaluate(()=>localStorage.getItem('system_admin_access_token'))).toBe(adminToken);
  await page.goto('/accounts');await expect(page.locator('.ant-layout-sider')).toBeVisible();
  await loginWarehouse(page,b.email,password);
  await expect(page.locator('.side-nav')).toBeVisible();
  const warehouseToken=await page.evaluate(()=>localStorage.getItem('warehouse_access_token'));
  await page.goto('/accounts');await page.getByRole('button',{name:'Đăng xuất',exact:true}).click();
  await expect(page).toHaveURL(/\/login$/);
  expect(await page.evaluate(()=>localStorage.getItem('warehouse_access_token'))).toBe(warehouseToken);
  await page.goto('/warehouse');await expect(page.locator('.side-nav')).toBeVisible();
  await page.evaluate(()=>{
    localStorage.setItem('system_admin_access_token',localStorage.getItem('warehouse_access_token')!);
  });
  await page.goto('/accounts');
  await expect(page.getByText('Khu vực dành riêng cho System Admin',{exact:true})).toBeVisible();
});

test('B vào warehouse, chỉ có menu Kho, không vào BOM hay System Admin',async({page})=>{
  await loginWarehouse(page,b.email,password);
  await expect(page).toHaveURL(/\/warehouse$/);
  const nav=page.locator('.side-nav');
  await expect(nav.getByRole('link',{name:'Tồn kho nguyên vật liệu',exact:true})).toBeVisible();
  await expect(nav.getByRole('link',{name:'Công thức BOM',exact:true})).toHaveCount(0);
  await nav.getByRole('link',{name:'Tồn kho nguyên vật liệu',exact:true}).click();
  await expect(page.locator('.inventory-table').or(page.getByText('Chưa có dữ liệu nguyên vật liệu trong kho.',{exact:true}))).toBeVisible();
  await expect(page.getByText('Không thể tải dữ liệu tồn kho.',{exact:true})).toHaveCount(0);
  await page.goto('/warehouse/bom');
  await expect(page.getByText('Bạn chưa được cấp quyền chức năng này',{exact:true})).toBeVisible();
  await page.goto('/accounts');
  await expect(page).toHaveURL(/\/login$/);
  await expect(page.getByText('Đăng nhập bằng tài khoản System Admin để quản trị hệ thống.',{exact:true})).toBeVisible();
});
test('C có menu Nhà hàng, xem sản phẩm nhưng không có thao tác CRUD hoặc menu Kho',async({page})=>{
  await loginWarehouse(page,c.email,password);
  await expect(page).toHaveURL(/\/warehouse$/);
  const nav=page.locator('.side-nav');
  await expect(nav.getByRole('link',{name:'Công thức BOM',exact:true})).toBeVisible();
  await expect(nav.getByRole('link',{name:'Nhập kho',exact:true})).toHaveCount(0);
  await nav.getByRole('link',{name:'Quản lý món ăn',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Quản lý Món ăn (Thành phẩm)',exact:true})).toBeVisible();
  await expect(page.getByRole('button',{name:/Thêm món/})).toHaveCount(0);
  await expect(page.locator('button[title="Sửa thông tin"]')).toHaveCount(0);
  await expect(page.locator('button[title="Xóa món"]')).toHaveCount(0);
  await page.goto('/warehouse/inventory');
  await expect(page.getByText('Bạn chưa được cấp quyền chức năng này',{exact:true})).toBeVisible();
});
test('đổi checkbox thu hồi phiên đang mở; đăng nhập lại nhận menu mới',async({page,request})=>{
  await loginWarehouse(page,b.email,password);await expect(page).toHaveURL(/\/warehouse$/);
  await requestJson(request,`/api/admin/roles/${b.roleId}`,'PUT',{permissions:['bom:manage']});
  await page.reload();await expect(page.getByText('Warehouse sử dụng đăng nhập riêng',{exact:true})).toBeVisible();
  await loginWarehouse(page,b.email,password);await expect(page).toHaveURL(/\/warehouse$/);
  const nav=page.locator('.side-nav');
  await expect(nav.getByRole('link',{name:'Công thức BOM',exact:true})).toBeVisible();
  await expect(nav.getByRole('link',{name:'Tồn kho nguyên vật liệu',exact:true})).toHaveCount(0);
  await nav.getByRole('link',{name:'Công thức BOM',exact:true}).click();
  await expect(page.getByRole('heading',{name:'Cấu hình Công thức Định lượng (BOM)',exact:true})).toBeVisible();
  await expect(page.getByText('Bạn không có quyền thực hiện thao tác này',{exact:true})).toHaveCount(0);
});
test('khóa tài khoản chặn phiên; Warehouse hết phiên và logout không chuyển sang login System Admin',async({page,request})=>{
  await loginWarehouse(page,b.email,password);await expect(page).toHaveURL(/\/warehouse$/);
  await requestJson(request,`/api/admin/accounts/${b.id}/toggle-status`,'PATCH');
  await page.reload();await expect(page.getByText('Warehouse sử dụng đăng nhập riêng',{exact:true})).toBeVisible();
  await loginWarehouse(page,c.email,password);await expect(page).toHaveURL(/\/warehouse$/);
  await page.getByRole('button',{name:'Đăng xuất',exact:true}).click();
  await expect(page.getByText('Warehouse sử dụng đăng nhập riêng',{exact:true})).toBeVisible();
  expect(await page.evaluate(()=>localStorage.getItem('warehouse_access_token'))).toBeNull();
});
test('nhân viên không vào warehouse chỉ nhờ quyền tồn kho',async({page,request})=>{
  await requestJson(request,`/api/admin/roles/${b.roleId}`,'PUT',{portal:'employee'});
  await loginWarehouse(page,b.email,password);
  await expect(page.getByText('Khu vực chỉ dành cho Kho / Nhà hàng',{exact:true})).toBeVisible();
});
test('A tick quyền trên giao diện vai trò, B đăng nhập lại nhận quyền đó',async({page,request})=>{
  const roles = await requestJson(request,'/api/admin/roles','GET');
  const role = roles.find((r:{id:number})=>r.id===b.roleId);
  await login(page,adminEmail!,adminPassword!);
  await expect(page).toHaveURL(/:\d+\/$/);
  await page.goto('/roles');
  const row=page.getByRole('row').filter({hasText:role.name});
  await row.getByRole('button',{name:/Sửa$/}).click();
  const dialog=page.getByRole('dialog');
  await expect(dialog.getByLabel('Khu vực đăng nhập')).toBeVisible();
  await dialog.getByRole('checkbox',{name:'Cấu hình công thức BOM',exact:true}).check();
  await dialog.getByRole('button',{name:'Lưu thay đổi',exact:true}).click();
  await expect(dialog).toHaveCount(0);
  const saved=(await requestJson(request,'/api/admin/roles','GET')).find((r:{id:number})=>r.id===b.roleId);
  expect(saved.permissions).toContain('bom:manage');
  await page.evaluate(()=>localStorage.clear());
  await loginWarehouse(page,b.email,password);await expect(page).toHaveURL(/\/warehouse$/);
  await expect(page.locator('.side-nav').getByRole('link',{name:'Công thức BOM',exact:true})).toBeVisible();
});
test('API từ chối lưu BOM phải hiển thị lỗi, không báo thành công bằng dữ liệu cục bộ',async({page})=>{
  await loginWarehouse(page,c.email,password);await expect(page).toHaveURL(/\/warehouse$/);
  await page.goto('/warehouse/bom');
  await expect(page.getByRole('heading',{name:'Cấu hình Công thức Định lượng (BOM)',exact:true})).toBeVisible();
  await page.route(api+'/warehouse/boms',async route=>{
    if(route.request().method()==='POST') await route.fulfill({status:403,contentType:'application/json',body:JSON.stringify({message:'Không được phép tạo BOM thử'})});
    else await route.continue();
  });
  await page.getByRole('button',{name:'Tạo công thức mới',exact:true}).click();
  await page.getByPlaceholder('Ví dụ: BOM-005',{exact:true}).fill('BOM-BLOCKED-BROWSER');
  await page.getByRole('button',{name:'Lưu công thức',exact:true}).click();
  await expect(page.getByText('Không được phép tạo BOM thử',{exact:true}).first()).toBeVisible();
  await expect(page.getByPlaceholder('Ví dụ: BOM-005',{exact:true})).toBeVisible();
  await expect(page.getByText(/Dữ liệu cục bộ/)).toHaveCount(0);
});
test('warehouse giữ logo, sidebar, dashboard và bảng theo giao diện gốc',async({page,request})=>{
  await loginWarehouse(page,b.email,password);await expect(page).toHaveURL(/\/warehouse$/);
  const branding=await (await request.get(api+'/api/public/branding')).json();
  await expect(page.locator('.brand-copy strong')).toHaveText(branding.restaurantName);
  await expect(page.locator('.sidebar .brand-mark')).toBeVisible();
  await expect(page.locator('.topbar .breadcrumbs')).toContainText('Dashboard');
  await expect(page.locator('.kpi-grid .kpi-card').first()).toBeVisible();
  await expect(page.locator('.dashboard-grid-primary .chart-panel')).toBeVisible();
  await expect(page.locator('.sidebar-user-copy')).toContainText('warehouse');
  await page.screenshot({path:'test-results/restored-dashboard.png',fullPage:true});
  await page.locator('.side-nav').getByRole('link',{name:'Nhập kho',exact:true}).click();
  await expect(page.locator('.workspace-table')).toBeVisible();
  await expect(page.locator('.table-toolbar .toolbar-search')).toBeVisible();
  await expect(page.getByRole('button',{name:'Tạo phiếu nhập',exact:true})).toBeVisible();
  await page.screenshot({path:'test-results/restored-receipts.png',fullPage:true});
  await page.setViewportSize({width:390,height:844});
  await page.getByRole('button',{name:'Mở menu',exact:true}).click();
  await expect(page.locator('.sidebar-mobile-open')).toBeVisible();
  await page.locator('.side-nav').getByRole('link',{name:'Tồn kho nguyên vật liệu',exact:true}).click();
  await expect(page).toHaveURL(/\/warehouse\/inventory$/);
});
